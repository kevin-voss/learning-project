//! Statement parsing (§2.4, §3 `statement`) plus the assignment rule.
//!
//! The interesting part is *dispatch*: a statement that starts with an
//! identifier may be a declaration (`Counter c = …`), a multiplication
//! (`x * y;`) or junk (`Foo x;` with no class `Foo`). Tic resolves this
//! structurally, with the pass-1 [`NameTable`](super::NameTable):
//!
//! * `IDENT IDENT`, `IDENT [N] IDENT`, or a *known* type followed by `*`
//!   → declaration (an unknown head name is a T1002 "unknown type"),
//! * everything else → expression-or-assignment statement.
//!
//! Assignments are parsed structurally too: parse an expression, and if an
//! assignment operator follows, insist the expression is an lvalue — that
//! is what makes `*p = 5` (deref) work while `*p * 2` stays multiplication.

use super::errors;
use super::Parser;
use crate::ast::*;
use crate::diagnostics::TicError;
use crate::lexer::TokenKind;
use crate::util::Span;

impl<'t> Parser<'t> {
    /// One statement (§3 `statement`), minus the lone `;` the surrounding
    /// list loops consume themselves.
    pub(super) fn parse_stmt(&mut self) -> Result<Stmt, TicError> {
        let kind = self.peek().clone();
        match kind {
            TokenKind::Final => self.parse_var_decl(true, true),
            TokenKind::If => self.parse_if(),
            TokenKind::While => self.parse_while(),
            TokenKind::For => self.parse_for(),
            TokenKind::Return => self.parse_return(),
            TokenKind::LBrace => Ok(Stmt::Block(self.parse_block()?)),
            // `i32 x;` is a declaration; `i32(x);` is a cast expression.
            k if k.is_type_keyword() && *self.peek_at(1) != TokenKind::LParen => {
                self.parse_var_decl(false, true)
            }
            TokenKind::Ident(_) => self.parse_ident_start_stmt(),
            _ => self.parse_expr_or_assign_stmt(),
        }
    }

    /// Statements that begin with a name: declaration or expression?
    fn parse_ident_start_stmt(&mut self) -> Result<Stmt, TicError> {
        let TokenKind::Ident(name) = self.peek().clone() else {
            unreachable!("dispatch only calls this on Ident");
        };
        let known_type = self.names.is_type_name(&name);
        let next_is_name = matches!(self.peek_at(1), TokenKind::Ident(_));
        let bracket_decl = *self.peek_at(1) == TokenKind::LBracket && self.bracket_then_name(1);

        if known_type && (next_is_name || *self.peek_at(1) == TokenKind::Star || bracket_decl) {
            return self.parse_var_decl(false, true);
        }
        // `Foo x` with unknown `Foo` is never a valid expression either —
        // say what is actually wrong instead of "expected `;`".
        if next_is_name || bracket_decl {
            let span = self.span();
            let candidates = self.names.type_names();
            return Err(errors::unknown_type(span, &name, &candidates));
        }
        // Not a declaration shape — including `x * y` (multiplication)
        // and `Counter * p` when `Counter` is unknown: still an expression.
        self.parse_expr_or_assign_stmt()
    }

    /// Could a declaration start here? (`for`-inits ask the same question.)
    fn at_decl(&self) -> bool {
        match self.peek() {
            TokenKind::Final => true,
            k if k.is_type_keyword() => *self.peek_at(1) != TokenKind::LParen,
            TokenKind::Ident(name) => {
                let known = self.names.is_type_name(name);
                let next_is_name = matches!(self.peek_at(1), TokenKind::Ident(_));
                let star = *self.peek_at(1) == TokenKind::Star;
                let bracket = *self.peek_at(1) == TokenKind::LBracket && self.bracket_then_name(1);
                known && (next_is_name || star || bracket)
            }
            _ => false,
        }
    }

    /// From `offset` tokens ahead (a `[`): does the matching `]` sit right
    /// before a name? That is `T[5] x` — a fixed-array declaration — rather
    /// than `arr[i]` used as an expression.
    fn bracket_then_name(&self, offset: usize) -> bool {
        let mut depth = 0usize;
        let mut i = self.pos + offset;
        loop {
            match self.kind_at(i) {
                Some(TokenKind::LBracket) => depth += 1,
                Some(TokenKind::RBracket) => {
                    depth -= 1;
                    if depth == 0 {
                        return matches!(self.kind_at(i + 1), Some(TokenKind::Ident(_)));
                    }
                }
                Some(TokenKind::Eof) | None => return false,
                _ => {}
            }
            i += 1;
        }
    }

    fn kind_at(&self, i: usize) -> Option<&TokenKind> {
        self.tokens.get(i).map(|t| &t.kind)
    }

    // ---- declarations-as-statements ---------------------------------------

    /// `[final] type name [= expr][;]` — `semi: false` for a `for`-init.
    fn parse_var_decl(&mut self, is_final: bool, semi: bool) -> Result<Stmt, TicError> {
        let start = self.span();
        if is_final {
            self.bump(); // the `final` keyword
        }
        let ty = self.parse_type()?;
        let name = self.expect_ident()?;
        let init = if self.eat(TokenKind::Assign) {
            Some(self.parse_expr()?)
        } else {
            None
        };
        if is_final && init.is_none() {
            return Err(errors::unexpected(
                self.span(),
                "`=` — a `final` must be given a value right here",
                &errors::found_desc(self.peek()),
            ));
        }
        let end = if semi {
            self.expect_semi()?
        } else {
            self.prev_span()
        };
        Ok(Stmt::VarDecl { ty, name, init, is_final, span: start.to(end) })
    }

    // ---- control flow ------------------------------------------------------

    /// `if (cond) block [else (if | block)]` — parens and braces are
    /// mandatory, which is why there is no dangling-`else` ambiguity.
    fn parse_if(&mut self) -> Result<Stmt, TicError> {
        let start = self.bump(); // `if`
        self.expect(TokenKind::LParen)?;
        let cond = self.parse_expr()?;
        self.expect(TokenKind::RParen)?;
        let then_branch = self.parse_block()?;
        let else_branch = if self.eat(TokenKind::Else) {
            if self.at(TokenKind::If) {
                Some(Box::new(self.parse_if()?)) // else-if chains nest
            } else {
                Some(Box::new(Stmt::Block(self.parse_block()?)))
            }
        } else {
            None
        };
        Ok(Stmt::If { cond, then_branch, else_branch, span: start.to(self.prev_span()) })
    }

    fn parse_while(&mut self) -> Result<Stmt, TicError> {
        let start = self.bump(); // `while`
        self.expect(TokenKind::LParen)?;
        let cond = self.parse_expr()?;
        self.expect(TokenKind::RParen)?;
        let body = self.parse_block()?;
        Ok(Stmt::While { cond, body, span: start.to(self.prev_span()) })
    }

    /// `for ([decl|assign]; [cond]; [assign]) block` — any part may be empty.
    fn parse_for(&mut self) -> Result<Stmt, TicError> {
        let start = self.bump(); // `for`
        self.expect(TokenKind::LParen)?;
        let init = if self.at(TokenKind::Semi) {
            None
        } else if self.at_decl() {
            Some(Box::new(self.parse_var_decl(false, false)?))
        } else {
            Some(Box::new(self.parse_assign()?))
        };
        self.expect(TokenKind::Semi)?;
        let cond = if self.at(TokenKind::Semi) {
            None
        } else {
            Some(self.parse_expr()?)
        };
        self.expect(TokenKind::Semi)?;
        let update = if self.at(TokenKind::RParen) {
            None
        } else {
            Some(Box::new(self.parse_assign()?))
        };
        self.expect(TokenKind::RParen)?;
        let body = self.parse_block()?;
        Ok(Stmt::For { init, cond, update, body, span: start.to(self.prev_span()) })
    }

    /// `return [expr];` — `return;` for unit functions.
    fn parse_return(&mut self) -> Result<Stmt, TicError> {
        let start = self.bump(); // `return`
        let value = if self.at(TokenKind::Semi) {
            None
        } else {
            Some(self.parse_expr()?)
        };
        let end = self.expect_semi()?;
        Ok(Stmt::Return { value, span: start.to(end) })
    }

    /// `{ statements… }` — the one grammar rule every body uses. Errors
    /// inside recover per-statement, so one bad line keeps its block.
    /// Nested blocks recurse through `parse_stmt`, so the body carries the
    /// [`MAX_NEST`](super::MAX_NEST) meter.
    pub(super) fn parse_block(&mut self) -> Result<Block, TicError> {
        let start = self.expect(TokenKind::LBrace)?;
        self.enter_nest()?;
        let mut stmts = Vec::new();
        loop {
            match self.peek() {
                TokenKind::RBrace | TokenKind::Eof => break,
                TokenKind::Semi => {
                    self.bump();
                }
                _ => match self.parse_stmt() {
                    Ok(stmt) => stmts.push(stmt),
                    Err(err) => self.recover(err),
                },
            }
        }
        self.nest -= 1;
        let end = self.expect(TokenKind::RBrace)?;
        Ok(Block { stmts, span: start.to(end) })
    }

    // ---- expression vs assignment ------------------------------------------

    /// `expr;` or `lvalue op= expr;` — parse the expression first, then
    /// decide (§3's structural resolution of `*p = 5` vs `*p * 2`).
    fn parse_expr_or_assign_stmt(&mut self) -> Result<Stmt, TicError> {
        let expr = self.parse_expr()?;
        if let Some(op) = assign_op_of(self.peek()) {
            self.bump();
            if !is_lvalue(&expr) {
                return Err(TicError::InvalidAssignmentTarget { span: expr.span() });
            }
            let value = self.parse_expr()?;
            let end = self.expect_semi()?;
            let span = expr.span().to(end);
            Ok(Stmt::Assign { target: expr, op, value, span })
        } else {
            let end = self.expect_semi()?;
            let span = expr.span().to(end);
            Ok(Stmt::ExprStmt { expr, span })
        }
    }

    /// `lvalue op= expr` with no `;` — the `for`-init/update forms.
    fn parse_assign(&mut self) -> Result<Stmt, TicError> {
        let expr = self.parse_expr()?;
        let op = match assign_op_of(self.peek()) {
            Some(op) => {
                self.bump();
                op
            }
            None => {
                return Err(errors::unexpected(
                    self.span(),
                    "an assignment like `i = 0` or `i += 1`",
                    &errors::found_desc(self.peek()),
                ))
            }
        };
        if !is_lvalue(&expr) {
            return Err(TicError::InvalidAssignmentTarget { span: expr.span() });
        }
        let value = self.parse_expr()?;
        let span = expr.span().to(self.prev_span());
        Ok(Stmt::Assign { target: expr, op, value, span })
    }

    /// Expect the `;` that ends a statement — with a dedicated, friendly
    /// error when what follows is another `=`: `x = y = 5` (T1004).
    fn expect_semi(&mut self) -> Result<Span, TicError> {
        if self.at(TokenKind::Semi) {
            Ok(self.bump())
        } else if let Some(op) = assign_op_of(self.peek()) {
            Err(TicError::AssignmentNotExpression { span: self.span(), op: op.symbol().into() })
        } else {
            Err(errors::unexpected(
                self.span(),
                "`;`",
                &errors::found_desc(self.peek()),
            ))
        }
    }
}

/// The assignment operator of a token, if it is one.
fn assign_op_of(kind: &TokenKind) -> Option<AssignOp> {
    match kind {
        TokenKind::Assign => Some(AssignOp::Set),
        TokenKind::PlusAssign => Some(AssignOp::Add),
        TokenKind::MinusAssign => Some(AssignOp::Sub),
        TokenKind::StarAssign => Some(AssignOp::Mul),
        TokenKind::SlashAssign => Some(AssignOp::Div),
        _ => None,
    }
}

/// §3 `lvalue`: a name, a `.field`, an `[index]`, or a `*deref`. The plan
/// allows exactly these four — `1 = 2` and `f() = 2` are T1003 errors.
fn is_lvalue(expr: &Expr) -> bool {
    matches!(
        expr,
        Expr::Ident(_) | Expr::Field { .. } | Expr::Index { .. } | Expr::Unary {
            op: UnaryOp::Deref,
            ..
        }
    )
}
