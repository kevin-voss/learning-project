//! Call evaluation (plan §5.5, §2.6 rules 5–6): argument binding into a
//! fresh frame, `return` via [`Flow`], the `--max-depth` recursion cap,
//! and falling off the end of a function as the zero value of its return
//! type (the phase-3 decision).
//!
//! User functions shadow builtins (§2.5) — the checker resolved the name
//! one way or the other; the interpreter just asks in the same order.
//!
//! Phase 6's methods ride the same skeleton ([`Interp::call_checked`]):
//! a method is a function whose frame gets one extra slot first —
//! **`this`, holding the receiver instance** — so `this.field` reads and
//! `this.field = …` writes go through the shared box exactly like any
//! other name, and the depth cap covers methods like any other call.

use super::super::builtins;
use super::super::{Flow, Interp, Value};
use crate::ast::Expr;
use crate::diagnostics::TicError;
use crate::util::Span;

impl Interp<'_, '_> {
    pub(crate) fn eval_call(
        &mut self,
        callee: &Expr,
        args: &[Expr],
        span: Span,
    ) -> Result<Value, TicError> {
        let name = match callee {
            Expr::Ident(name) => name,
            // `box.method(…)` — objects.rs owns the receiver rules (the
            // checker lets bare-obj receivers through for the runtime to
            // decide, §5.4).
            Expr::Field { obj, name, .. } => {
                return self.eval_method_call(obj, name, args, span)
            }
            other => {
                return Err(self.internal(other.span(), "a non-name callee reached the interpreter"))
            }
        };
        // User functions shadow builtins (the checker's lookup order).
        if let Some(index) = self.program.functions.iter().position(|f| f.name == name.name) {
            // Copy the program reference out so `func` borrows for `'p`,
            // not out of `&mut self` — recursion needs no AST clones.
            let program = self.program;
            let mut values = Vec::with_capacity(args.len());
            for arg in args {
                values.push(self.eval_expr(arg)?);
            }
            return self.call_checked(&program.functions[index], values, None, span);
        }
        if builtins::is_builtin(&name.name) {
            return self.call_builtin(&name.name, args, span);
        }
        Err(self.internal(span, format!("call to `{}` passed checking but has no runtime home", name.name)))
    }

    /// Run one function or method: a frame of parameter slots (with
    /// `this` bound first when a receiver was given), the body in it, and
    /// the flow out. Functions may be called before their definition site
    /// — `program.functions` was collected two passes ago.
    pub(super) fn call_checked(
        &mut self,
        func: &crate::checker::types::CheckedFunction,
        args: Vec<Value>,
        this: Option<Value>,
        span: Span,
    ) -> Result<Value, TicError> {
        if self.call_depth >= self.max_depth {
            return Err(TicError::TooMuchRecursion { span, depth: self.max_depth });
        }
        self.call_depth += 1;
        // The nesting guard is per function: a fresh budget per frame —
        // and the caller's budget is restored on *every* path out, or an
        // error unwinding through the caller would miscount it.
        let saved_frames = self.frames;
        self.frames = 0;
        self.env.push();
        let outcome = self.run_body(func, args, this);
        self.env.pop();
        self.frames = saved_frames;
        self.call_depth -= 1;
        let flow = outcome?;
        match flow {
            // `return expr;` — the value as-is. A Unit here is bare
            // `return;`, which means the zero value like falling off end.
            Flow::Return(value) if !matches!(value, Value::Unit) => Ok(value),
            _ => self.zero_return_value(func, span),
        }
    }

    /// The value a function produces when it ends without `return expr;`
    /// (falling off the end, or a bare `return;`): §2.1's zero column.
    /// One return type has **no** zero — a bare `obj` — and phase 6 left
    /// that on the T3006 internal backstop. It is not a Tic bug: the
    /// student wrote a pass-through `-> obj` function whose shape is only
    /// known at runtime, so it gets its own friendly error (T3010).
    fn zero_return_value(
        &self,
        func: &crate::checker::types::CheckedFunction,
        span: Span,
    ) -> Result<Value, TicError> {
        if let crate::checker::types::TicType::Obj(id) = &func.return_ty {
            if *id == crate::checker::types::ShapeId::BARE {
                return Err(TicError::MissingReturnValue {
                    span,
                    function: func.name.clone(),
                    ty: "obj".into(),
                });
            }
        }
        self.zero_of(&func.return_ty, span)
    }

    /// Bind `this` (when present) and the parameters, then execute the
    /// statements (the fallible middle of a call, isolated so the frame
    /// always unwinds cleanly).
    fn run_body(
        &mut self,
        func: &crate::checker::types::CheckedFunction,
        args: Vec<Value>,
        this: Option<Value>,
    ) -> Result<Flow, TicError> {
        if let Some(instance) = this {
            // `this` is an ordinary slot holding the instance value:
            // `this.count = 1` writes the field's slot inside the shared
            // box, and even `&this.field` addresses it (§6.4).
            self.env.declare("this", instance, func.span)?;
        }
        for (param, value) in func.params.iter().zip(args) {
            self.env.declare(&param.name, value, param.span)?;
        }
        let mut flow = Flow::Normal;
        for stmt in &func.body.stmts {
            flow = self.eval_stmt(stmt)?;
            if let Flow::Return(_) = flow {
                break;
            }
        }
        Ok(flow)
    }
}
