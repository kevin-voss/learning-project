//! Expression parsing (§3 `expr`): precedence via grammar layering, one
//! function per level, `or` at the bottom of the chain down to `primary`.
//!
//! ```text
//! or → and → equality → comparison → additive → multiplicative → unary
//!     → postfix (calls, indexing, `.field`) → primary
//! ```
//!
//! Two rules live here that the §3 table calls out specially: a base-type
//! keyword followed by `(` is a **cast** (`i32(x)` — the keyword spelling
//! makes it unambiguous), and a `{` is an obj literal only in expression
//! position (statement start is always a block, by construction).

use super::errors;
use super::Parser;
use crate::ast::*;
use crate::diagnostics::TicError;
use crate::lexer::TokenKind;

impl<'t> Parser<'t> {
    /// §3 `expr` — an `or_expr`, behind the [`MAX_NEST`](super::MAX_NEST)
    /// meter: every nested parenthesis re-enters here, so the friendly
    /// T3005 fires before the native stack can run out (§12).
    pub(super) fn parse_expr(&mut self) -> Result<Expr, TicError> {
        self.enter_nest()?;
        let expr = self.parse_or();
        self.nest -= 1;
        expr
    }

    fn parse_or(&mut self) -> Result<Expr, TicError> {
        let mut lhs = self.parse_and()?;
        while self.at(TokenKind::OrOr) {
            self.bump();
            let rhs = self.parse_and()?;
            let span = lhs.span().to(rhs.span());
            lhs = Expr::Binary { op: BinaryOp::Or, lhs: Box::new(lhs), rhs: Box::new(rhs), span };
        }
        Ok(lhs)
    }

    fn parse_and(&mut self) -> Result<Expr, TicError> {
        let mut lhs = self.parse_equality()?;
        while self.at(TokenKind::AndAnd) {
            self.bump();
            let rhs = self.parse_equality()?;
            let span = lhs.span().to(rhs.span());
            lhs = Expr::Binary { op: BinaryOp::And, lhs: Box::new(lhs), rhs: Box::new(rhs), span };
        }
        Ok(lhs)
    }

    fn parse_equality(&mut self) -> Result<Expr, TicError> {
        let lhs = self.parse_comparison()?;
        let op = match self.peek() {
            TokenKind::EqEq => BinaryOp::Eq,
            TokenKind::NotEq => BinaryOp::NotEq,
            _ => return Ok(lhs),
        };
        self.bump();
        let rhs = self.parse_comparison()?;
        let span = lhs.span().to(rhs.span());
        Ok(Expr::Binary { op, lhs: Box::new(lhs), rhs: Box::new(rhs), span })
    }

    fn parse_comparison(&mut self) -> Result<Expr, TicError> {
        let lhs = self.parse_additive()?;
        let op = match self.peek() {
            TokenKind::Lt => BinaryOp::Lt,
            TokenKind::Gt => BinaryOp::Gt,
            TokenKind::LtEq => BinaryOp::LtEq,
            TokenKind::GtEq => BinaryOp::GtEq,
            _ => return Ok(lhs),
        };
        self.bump();
        let rhs = self.parse_additive()?;
        let span = lhs.span().to(rhs.span());
        Ok(Expr::Binary { op, lhs: Box::new(lhs), rhs: Box::new(rhs), span })
    }

    fn parse_additive(&mut self) -> Result<Expr, TicError> {
        let mut lhs = self.parse_multiplicative()?;
        while matches!(self.peek(), TokenKind::Plus | TokenKind::Minus) {
            let op = if self.at(TokenKind::Plus) { BinaryOp::Add } else { BinaryOp::Sub };
            self.bump();
            let rhs = self.parse_multiplicative()?;
            let span = lhs.span().to(rhs.span());
            lhs = Expr::Binary { op, lhs: Box::new(lhs), rhs: Box::new(rhs), span };
        }
        Ok(lhs)
    }

    fn parse_multiplicative(&mut self) -> Result<Expr, TicError> {
        let mut lhs = self.parse_unary()?;
        while matches!(
            self.peek(),
            TokenKind::Star | TokenKind::Slash | TokenKind::Percent
        ) {
            let op = match self.peek() {
                TokenKind::Star => BinaryOp::Mul,
                TokenKind::Slash => BinaryOp::Div,
                _ => BinaryOp::Mod,
            };
            self.bump();
            let rhs = self.parse_unary()?;
            let span = lhs.span().to(rhs.span());
            lhs = Expr::Binary { op, lhs: Box::new(lhs), rhs: Box::new(rhs), span };
        }
        Ok(lhs)
    }

    /// `!x  -x  &x  *x` — right-associative (so `*p = 5` yields a deref the
    /// statement layer can assign through, and `- -x` nests). The chain
    /// recurses without re-entering `parse_expr`, so it carries its own
    /// [`MAX_NEST`](super::MAX_NEST) meter arm.
    fn parse_unary(&mut self) -> Result<Expr, TicError> {
        let op = match self.peek() {
            TokenKind::Bang => UnaryOp::Not,
            TokenKind::Minus => UnaryOp::Neg,
            TokenKind::Amp => UnaryOp::AddrOf,
            TokenKind::Star => UnaryOp::Deref,
            _ => return self.parse_postfix(),
        };
        self.enter_nest()?;
        let op_span = self.bump();
        let operand = self.parse_unary();
        self.nest -= 1;
        let operand = operand?;
        let span = op_span.to(operand.span());
        Ok(Expr::Unary { op, operand: Box::new(operand), span })
    }

    /// §3 `postfix`: calls, indexing, `.field` — left-associative, so
    /// `f(1)[2].g` reads inside-out.
    fn parse_postfix(&mut self) -> Result<Expr, TicError> {
        let mut expr = self.parse_primary()?;
        loop {
            match self.peek() {
                TokenKind::LParen => {
                    self.bump();
                    let args = self.parse_args(TokenKind::RParen)?;
                    let end = self.expect(TokenKind::RParen)?;
                    let span = expr.span().to(end);
                    expr = Expr::Call { callee: Box::new(expr), args, span };
                }
                TokenKind::LBracket => {
                    self.bump();
                    let index = self.parse_expr()?;
                    let end = self.expect(TokenKind::RBracket)?;
                    let span = expr.span().to(end);
                    expr = Expr::Index { obj: Box::new(expr), index: Box::new(index), span };
                }
                TokenKind::Dot => {
                    self.bump();
                    let name = self.expect_ident()?;
                    let span = expr.span().to(name.span);
                    expr = Expr::Field { obj: Box::new(expr), name, span };
                }
                _ => break,
            }
        }
        Ok(expr)
    }

    /// §3 `primary`: literals, names, grouping, the two literal forms and
    /// the two "type-flavoured" expressions (cast, type-as-argument).
    fn parse_primary(&mut self) -> Result<Expr, TicError> {
        let span = self.span();
        match self.peek().clone() {
            TokenKind::Int(value) => {
                self.bump();
                Ok(Expr::IntLit { value, span })
            }
            TokenKind::Float(value) => {
                self.bump();
                Ok(Expr::FloatLit { value, span })
            }
            TokenKind::Str(value) => {
                self.bump();
                Ok(Expr::StrLit { value, span })
            }
            TokenKind::Char(value) => {
                self.bump();
                Ok(Expr::CharLit { value, span })
            }
            TokenKind::True => {
                self.bump();
                Ok(Expr::BoolLit { value: true, span })
            }
            TokenKind::False => {
                self.bump();
                Ok(Expr::BoolLit { value: false, span })
            }
            TokenKind::Null => {
                self.bump();
                Ok(Expr::NullLit { span })
            }
            TokenKind::This => {
                self.bump();
                Ok(Expr::This { span })
            }
            TokenKind::Ident(name) => {
                self.bump();
                Ok(Expr::Ident(Ident::new(name, span)))
            }
            // Grouping `(expr)` — the inner expression keeps its own span.
            TokenKind::LParen => {
                self.bump();
                let expr = self.parse_expr()?;
                self.expect(TokenKind::RParen)?;
                Ok(expr)
            }
            // Array literal `[a, b, c]` — `[]` too (a fresh empty array).
            TokenKind::LBracket => self.parse_array_lit(),
            // Obj literal `{ field: expr, … }` — reachable only here, in
            // expression position; statement-start `{` never gets this far.
            TokenKind::LBrace => self.parse_obj_lit(),
            TokenKind::New => self.parse_new(),
            // A base-type keyword: cast when `(` follows (`i32(x)`), else a
            // type used as a value — legal only as an argument, e.g.
            // `size_of(i32)`; the checker polices that.
            k if k.is_type_keyword() && *self.peek_at(1) == TokenKind::LParen => {
                self.parse_cast()
            }
            k if k.is_type_keyword() => {
                let (base, base_span) = self.parse_base_type()?;
                Ok(Expr::TypeName { ty: AstType::base(base, base_span), span: base_span })
            }
            _ => Err(errors::unexpected(
                span,
                "an expression",
                &errors::found_desc(self.peek()),
            )),
        }
    }

    /// §3 `cast`: `base_type "(" expr ")"` — builtin keywords only; a user
    /// class/enum name before `(` is a plain call, never a cast.
    fn parse_cast(&mut self) -> Result<Expr, TicError> {
        let (base, base_span) = self.parse_base_type()?;
        self.expect(TokenKind::LParen)?;
        let expr = self.parse_expr()?;
        let end = self.expect(TokenKind::RParen)?;
        let span = base_span.to(end);
        Ok(Expr::Cast { ty: AstType::base(base, base_span), expr: Box::new(expr), span })
    }

    /// §3 `new_expr`: `new ClassName(args…)`.
    fn parse_new(&mut self) -> Result<Expr, TicError> {
        let start = self.bump(); // `new`
        let class = self.expect_ident()?;
        self.expect(TokenKind::LParen)?;
        let args = self.parse_args(TokenKind::RParen)?;
        let end = self.expect(TokenKind::RParen)?;
        Ok(Expr::New { class, args, span: start.to(end) })
    }

    /// `[ expr {"," expr} [","] ]` — trailing comma allowed (like obj
    /// literals); the element type is the checker's business.
    fn parse_array_lit(&mut self) -> Result<Expr, TicError> {
        let start = self.expect(TokenKind::LBracket)?;
        let mut elems = Vec::new();
        if self.at(TokenKind::RBracket) {
            let end = self.bump();
            return Ok(Expr::ArrayLit { elems, span: start.to(end) });
        }
        loop {
            elems.push(self.parse_expr()?);
            if !self.eat(TokenKind::Comma) {
                break;
            }
            if self.at(TokenKind::RBracket) {
                break; // trailing comma
            }
        }
        let end = self.expect(TokenKind::RBracket)?;
        Ok(Expr::ArrayLit { elems, span: start.to(end) })
    }

    /// `{ name: expr {"," name: expr} [","] }` — at least one field: an obj
    /// with no fields has no shape to infer, so `{}` is a parse error.
    fn parse_obj_lit(&mut self) -> Result<Expr, TicError> {
        let start = self.expect(TokenKind::LBrace)?;
        let mut fields = Vec::new();
        loop {
            let name = self.expect_ident()?;
            self.expect(TokenKind::Colon)?;
            let value = self.parse_expr()?;
            fields.push((name, value));
            if !self.eat(TokenKind::Comma) {
                break;
            }
            if self.at(TokenKind::RBrace) {
                break; // trailing comma
            }
        }
        if fields.is_empty() {
            unreachable!("the loop always parses at least one field");
        }
        let end = self.expect(TokenKind::RBrace)?;
        Ok(Expr::ObjLit { fields, span: start.to(end) })
    }

    /// `expr {"," expr}` for call arguments — no trailing comma here, the
    /// §3 grammar only grants that to the two literals.
    fn parse_args(&mut self, close: TokenKind) -> Result<Vec<Expr>, TicError> {
        if self.at(close) || self.at(TokenKind::Eof) {
            return Ok(Vec::new());
        }
        let mut args = vec![self.parse_expr()?];
        while self.eat(TokenKind::Comma) {
            args.push(self.parse_expr()?);
        }
        Ok(args)
    }
}
