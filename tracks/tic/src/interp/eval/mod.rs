//! Statement evaluation (plan §5.5): declarations into slots, assignments
//! (plain and compound — through variables, array elements, `*p` and
//! `box.field` alike), if / while / for with proper scoping, `return` via
//! [`Flow`], and blocks — plus the `--trace` after-step.

mod calls;
mod expr;
mod objects;
pub(super) mod ops;

use crate::ast::{AssignOp, Block, Expr, Stmt};
use crate::diagnostics::TicError;
use crate::util::Span;

use super::{Flow, Interp, NEST_LIMIT};

/// Every statement carries a span; the walker's guard needs one, so this
/// is the statement-side twin of `Expr::span()`.
fn stmt_span(stmt: &Stmt) -> Span {
    match stmt {
        Stmt::VarDecl { span, .. }
        | Stmt::Assign { span, .. }
        | Stmt::If { span, .. }
        | Stmt::While { span, .. }
        | Stmt::For { span, .. }
        | Stmt::Return { span, .. }
        | Stmt::ExprStmt { span, .. } => *span,
        Stmt::Block(block) => block.span,
    }
}

impl Interp<'_, '_> {
    /// Execute one statement. The nesting guard (§12) and the `--trace`
    /// step (naming this statement's line) wrap every statement uniformly.
    pub(crate) fn eval_stmt(&mut self, stmt: &Stmt) -> Result<Flow, TicError> {
        if self.frames >= NEST_LIMIT {
            return Err(TicError::TooDeeplyNested { span: stmt_span(stmt) });
        }
        self.frames += 1;
        let flow = self.eval_stmt_inner(stmt);
        self.frames -= 1;
        if flow.is_ok() {
            self.trace_step(stmt_span(stmt));
        }
        flow
    }

    fn eval_stmt_inner(&mut self, stmt: &Stmt) -> Result<Flow, TicError> {
        match stmt {
            Stmt::VarDecl { name, init, .. } => self.eval_var_decl(name, init.as_ref()),
            Stmt::Assign { target, op, value, span } => self.eval_assign(target, *op, value, *span),
            Stmt::If { cond, then_branch, else_branch, .. } => {
                if self.truthy(cond)? {
                    self.eval_block(then_branch)
                } else if let Some(else_stmt) = else_branch {
                    self.eval_stmt(else_stmt.as_ref())
                } else {
                    Ok(Flow::Normal)
                }
            }
            Stmt::While { cond, body, .. } => self.eval_while(cond, body),
            Stmt::For { init, cond, update, body, .. } => {
                self.eval_for(init.as_deref(), cond.as_ref(), update.as_deref(), body)
            }
            // `return expr;` carries the value; bare `return;` carries
            // Unit, which `call_function` turns into the zero value.
            Stmt::Return { value, .. } => Ok(Flow::Return(match value {
                Some(expr) => self.eval_expr(expr)?,
                None => super::Value::Unit,
            })),
            Stmt::Block(block) => self.eval_block(block),
            Stmt::ExprStmt { expr, .. } => {
                self.eval_expr(expr)?;
                Ok(Flow::Normal)
            }
        }
    }

    /// `type name [= expr];` — the value moves into a **fresh slot** of
    /// the current scope; without an initializer it is §2.1's zero value
    /// (through `zero_of`, which knows the program's enums and shapes).
    fn eval_var_decl(
        &mut self,
        name: &crate::ast::Ident,
        init: Option<&Expr>,
    ) -> Result<Flow, TicError> {
        let ty = self
            .program
            .decl_types
            .get(name.span)
            .ok_or_else(|| self.internal(name.span, format!("`{}` has no recorded declaration type", name.name)))?
            .clone();
        let value = match init {
            Some(expr) => self.eval_expr(expr)?,
            None => self.zero_of(&ty, name.span)?,
        };
        self.env.declare(&name.name, value, name.span)?;
        Ok(Flow::Normal)
    }

    /// `target op value;` — every store writes *through an existing slot*
    /// (`x = …` never re-boxes `x`; `arr[i] = …` and `*p = …` write the
    /// slot the element/pointer names), which is what keeps `&x`-style
    /// pointers sound. Compound ops reuse the binary rules with the
    /// slot's own width.
    fn eval_assign(
        &mut self,
        target: &Expr,
        op: AssignOp,
        value: &Expr,
        span: Span,
    ) -> Result<Flow, TicError> {
        match target {
            Expr::Ident(name) => {
                let slot = self
                    .env
                    .slot_of(&name.name)
                    .ok_or_else(|| self.internal(name.span, format!("variable `{}` vanished", name.name)))?;
                self.assign_slot(&slot, op, value, span)?;
                Ok(Flow::Normal)
            }
            Expr::Index { obj, index, .. } => {
                self.eval_index_store(obj, index, op, value, span)?;
                Ok(Flow::Normal)
            }
            Expr::Unary { op: crate::ast::UnaryOp::Deref, operand, .. } => {
                self.eval_deref_store(operand, op, value, span)?;
                Ok(Flow::Normal)
            }
            Expr::Field { obj, name, .. } => {
                self.eval_field_store(obj, name, op, value, span)?;
                Ok(Flow::Normal)
            }
            other => return Err(self.internal(other.span(), "a non-place reached assignment")),
        }
    }

    fn eval_while(&mut self, cond: &Expr, body: &Block) -> Result<Flow, TicError> {
        while self.truthy(cond)? {
            let flow = self.eval_block(body)?;
            if let Flow::Return(_) = flow {
                return Ok(flow); // a `return` unwinds through the loop
            }
        }
        Ok(Flow::Normal)
    }

    /// `for (init; cond; update) body` — one scope holds the loop
    /// variable, so it is visible in cond/update/body and gone after.
    fn eval_for(
        &mut self,
        init: Option<&Stmt>,
        cond: Option<&Expr>,
        update: Option<&Stmt>,
        body: &Block,
    ) -> Result<Flow, TicError> {
        self.env.push();
        if let Some(init) = init {
            self.eval_stmt(init)?;
        }
        let mut flow = Flow::Normal;
        loop {
            let keep_going = match cond {
                Some(cond) => self.truthy(cond)?,
                None => true,
            };
            if !keep_going {
                break;
            }
            flow = self.eval_block(body)?;
            if let Flow::Return(_) = flow {
                break;
            }
            if let Some(update) = update {
                self.eval_stmt(update)?;
            }
        }
        self.env.pop();
        Ok(flow)
    }

    /// A block executes in its own scope; a `return` unwinds straight
    /// through it (the scope pops on the way out).
    pub(crate) fn eval_block(&mut self, block: &Block) -> Result<Flow, TicError> {
        self.env.push();
        let mut flow = Flow::Normal;
        for stmt in &block.stmts {
            flow = self.eval_stmt(stmt)?;
            if let Flow::Return(_) = flow {
                break;
            }
        }
        self.env.pop();
        Ok(flow)
    }

    /// Conditions are bools (the checker guarantees it); anything else at
    /// runtime is a Tic bug.
    pub(crate) fn truthy(&mut self, cond: &Expr) -> Result<bool, TicError> {
        match self.eval_expr(cond)? {
            super::Value::Bool(b) => Ok(b),
            other => Err(self.internal(cond.span(), format!("a {} was used as a condition", other))),
        }
    }

    pub(crate) fn internal(&self, span: Span, what: impl Into<String>) -> TicError {
        TicError::InternalError { span, what: what.into() }
    }
}
