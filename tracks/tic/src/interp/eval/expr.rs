//! Expression evaluation (plan §5.5): literals (typed by the checker's
//! recorded, *adapted* types), names through their slots, operators via
//! `ops`, calls via `calls`, and the §12 nesting guard.
//!
//! `&&` and `||` live *here*, not in `ops`, because short-circuiting
//! means the right side must not even be evaluated — example 03's
//! `false && (1 / 0 > 0)` must print `false`, never divide by zero.

use super::ops;
use super::super::value::Width;
use crate::ast::{BinaryOp, Expr, UnaryOp};
use crate::diagnostics::TicError;

use super::super::{Interp, NEST_LIMIT, Value};

impl Interp<'_, '_> {
    /// Evaluate one expression. The guard brackets every node so the
    /// counter measures *active* nesting (siblings settle back down).
    pub(crate) fn eval_expr(&mut self, expr: &Expr) -> Result<Value, TicError> {
        if self.frames >= NEST_LIMIT {
            return Err(TicError::TooDeeplyNested { span: expr.span() });
        }
        self.frames += 1;
        let value = self.eval_expr_inner(expr);
        self.frames -= 1;
        value
    }

    fn eval_expr_inner(&mut self, expr: &Expr) -> Result<Value, TicError> {
        match expr {
            // Literals take the width the checker *adapted* them to:
            // `i8 big = 127;` records i8 for the `127`, and a literal
            // that does not fit (`i8 x = 200;` slipped past the checker
            // on purpose) refuses right here.
            Expr::IntLit { value, span } => {
                let width = self.int_width_of(expr, *span)?;
                if !width.fits_int(*value) {
                    return Err(TicError::NumericOverflow {
                        span: *span,
                        detail: format!("{} overflow ({value} is out of range)", width.name()),
                    });
                }
                Ok(Value::Int(*value, width))
            }
            Expr::FloatLit { value, .. } => {
                let width = match self.ty_of(expr) {
                    crate::checker::types::TicType::F32 => Width::F32,
                    _ => Width::F64,
                };
                Ok(Value::Float(*value, width))
            }
            Expr::StrLit { value, .. } => Ok(Value::str(value.clone())),
            Expr::CharLit { value, .. } => Ok(Value::Char(*value)),
            Expr::BoolLit { value, .. } => Ok(Value::Bool(*value)),
            // null is a pointer *value* (§2.1): it only ever reached
            // checking in pointer contexts, and it may be compared,
            // printed and stored — only following it errors.
            Expr::NullLit { .. } => Ok(Value::Null),
            // `this` is an ordinary slot in the method's frame (bound by
            // `call_checked`, which runs in calls.rs) — reading it is a
            // plain variable read. The checker keeps `this` inside
            // methods, so a missing slot is a Tic bug.
            Expr::This { span } => match self.env.slot_of("this") {
                Some(slot) => super::super::env::read_slot(&slot, *span),
                None => Err(self.internal(
                    *span,
                    "`this` reached the interpreter outside a method — the checker enforces methods-only",
                )),
            },
            Expr::Ident(name) => self.env.get(&name.name, name.span),
            Expr::Binary { op, lhs, rhs, span } => match op {
                // Short-circuit: the right side runs only if it must.
                BinaryOp::And => {
                    if self.truthy(lhs)? {
                        self.truthy(rhs).map(Value::Bool)
                    } else {
                        Ok(Value::Bool(false))
                    }
                }
                BinaryOp::Or => {
                    if self.truthy(lhs)? {
                        Ok(Value::Bool(true))
                    } else {
                        self.truthy(rhs).map(Value::Bool)
                    }
                }
                _ => {
                    let lhs = self.eval_expr(lhs)?;
                    let rhs = self.eval_expr(rhs)?;
                    ops::binary(*op, lhs, rhs, *span)
                }
            },
            Expr::Unary { op, operand, span } => match op {
                // &place clones the place's slot; *p reads through it
                // (memory.rs owns both — bounds/null checks live there).
                UnaryOp::AddrOf => self.eval_addr_of(operand, *span),
                UnaryOp::Deref => self.eval_deref_read(operand, *span),
                UnaryOp::Not | UnaryOp::Neg => {
                    let value = self.eval_expr(operand)?;
                    ops::unary(*op, value, *span)
                }
            },
            Expr::Call { callee, args, span } => self.eval_call(callee, args, *span),
            // Bounds-checked read through the element's own slot.
            Expr::Index { obj, index, span } => self.eval_index_read(obj, index, *span),
            // `box.field` — a field, or an enum variant (`State.Idle`,
            // whose head names an enum, not a variable). objects.rs owns
            // both paths (fields are slots; enums resolve to their value).
            Expr::Field { obj, name, span } => self.eval_field_read(obj, name, *span),
            // `[a, b, c]` builds the *declared* kind: the checker recorded
            // the literal's type from its expectation (`i32[3] a = [1, 2, 3]`
            // is fixed, `i32[] b = [1, 2, 3]` is growable) or, without one,
            // a dynamic array of the anchored element type.
            Expr::ArrayLit { elems, .. } => {
                let ty = self.ty_of(expr).clone();
                let mut values = Vec::with_capacity(elems.len());
                for elem in elems {
                    values.push(self.eval_expr(elem)?);
                }
                Ok(super::super::memory::new_array(values, &ty))
            }
            // `{ retries: 3, enabled: true }` — shape from the checker,
            // field slots built name-sorted (§5.4, objects.rs).
            Expr::ObjLit { span, .. } => self.eval_obj_lit(expr, *span),
            Expr::Cast { expr: inner, span, .. } => {
                let value = self.eval_expr(inner)?;
                let target = self.ty_of(expr);
                ops::cast(value, target, *span)
            }
            // `Expr::TypeName` only ever appears as `size_of`'s argument;
            // `size_of` stops at its phase-5 error before args evaluate.
            Expr::TypeName { span, .. } => Err(self.internal(
                *span,
                "a type name reached the interpreter (only size_of takes one)".to_string(),
            )),
            // `new Counter(args)` — allocate, zero-init, run `init`
            // (objects.rs).
            Expr::New { class, args, span } => self.eval_new(class, args, *span),
        }
    }

    /// The int width the checker recorded for an int literal (defaults
    /// defensively — every visited expression has a recorded type).
    fn int_width_of(&self, expr: &Expr, span: crate::util::Span) -> Result<Width, TicError> {
        match Width::of_type(self.ty_of(expr)) {
            Some(width) if !width.is_float() => Ok(width),
            _ => Err(self.internal(span, "an int literal without an int type")),
        }
    }
}
