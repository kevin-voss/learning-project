//! Operator typing (plan §5.3 row 2, §2.3): binary and unary operators,
//! literal "anchoring" (a numeric literal takes the other side's type),
//! the `==`/`!=` compatibility table, and the hints that name the cast
//! that would fix each failure.

use crate::ast::{BinaryOp, Expr, UnaryOp};
use crate::checker::Checker;
use crate::diagnostics::TicError;
use crate::util::Span;

impl Checker {
    pub(super) fn infer_binary(
        &mut self,
        op: BinaryOp,
        lhs: &Expr,
        rhs: &Expr,
        expected: Option<&crate::checker::types::TicType>,
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        match op {
            BinaryOp::Or | BinaryOp::And => {
                let (lt, rt) = self.infer_anchored_pair(lhs, rhs, None);
                if (lt != TicType::Bool && lt != TicType::Dynamic)
                    || (rt != TicType::Bool && rt != TicType::Dynamic)
                {
                    self.error(TicError::InvalidOperands {
                        span,
                        op: op.symbol().into(),
                        lhs: lt.name(),
                        rhs: rt.name(),
                        hint: Some(
                            "`&&` and `||` combine bools — comparisons like `x > 0` make one"
                                .into(),
                        ),
                    });
                }
                TicType::Bool
            }
            BinaryOp::Eq | BinaryOp::NotEq => self.infer_equality(op, lhs, rhs, span),
            BinaryOp::Lt | BinaryOp::Gt | BinaryOp::LtEq | BinaryOp::GtEq => {
                // §2.3: numerics of one type, or char with char.
                let (lt, rt) = self.infer_anchored_pair(lhs, rhs, None);
                let ok = (lt.is_numeric() && lt == rt)
                    || (lt == TicType::Char && rt == TicType::Char)
                    || lt == TicType::Dynamic
                    || rt == TicType::Dynamic;
                if !ok {
                    self.error(TicError::InvalidOperands {
                        span,
                        op: op.symbol().into(),
                        lhs: lt.name(),
                        rhs: rt.name(),
                        hint: Some(if lt == TicType::Str || rt == TicType::Str {
                            "text compares for equality with `==` / `!=`, not with < >".into()
                        } else {
                            format!(
                                "compare two values of one type — cast a char first: `i32(c) {} …`",
                                op.symbol()
                            )
                        }),
                    });
                }
                TicType::Bool
            }
            BinaryOp::Add => {
                // §2.3: str on the LEFT concatenates; `x + str` is an error.
                let (lt, rt) = self.infer_anchored_pair(lhs, rhs, expected);
                if lt == TicType::Str {
                    return TicType::Str; // the rhs was inferred by the pair helper
                }
                if rt == TicType::Str {
                    self.error(TicError::InvalidOperands {
                        span,
                        op: "+".into(),
                        lhs: lt.name(),
                        rhs: rt.name(),
                        hint: Some(
                            "put the str on the LEFT — `\"…\" + x` converts x, not the other way"
                                .into(),
                        ),
                    });
                    return TicType::Dynamic;
                }
                self.finish_numeric(op, lt, rt, span)
            }
            BinaryOp::Sub | BinaryOp::Mul | BinaryOp::Div | BinaryOp::Mod => {
                let (lt, rt) = self.infer_anchored_pair(lhs, rhs, expected);
                if lt == TicType::Str || rt == TicType::Str {
                    self.error(TicError::InvalidOperands {
                        span,
                        op: op.symbol().into(),
                        lhs: lt.name(),
                        rhs: rt.name(),
                        hint: Some(
                            "str only combines with `+` (str on the left) — text has no `- * / %`"
                                .into(),
                        ),
                    });
                    return TicType::Dynamic;
                }
                self.finish_numeric(op, lt, rt, span)
            }
        }
    }

    /// Infer both sides of an operator. A numeric literal on one side
    /// takes the other side's type *first*, so `big + 1` is i8 arithmetic
    /// and `score >= 90` compares i32s; when both sides are literals an
    /// outer numeric expectation flows in (`i8 x = 1 + 2;`), else the
    /// §2.1 defaults (i32 / f64) apply.
    pub(super) fn infer_anchored_pair(
        &mut self,
        lhs: &Expr,
        rhs: &Expr,
        expected: Option<&crate::checker::types::TicType>,
    ) -> (crate::checker::types::TicType, crate::checker::types::TicType) {
        match (is_num_lit(lhs), is_num_lit(rhs)) {
            (true, false) => {
                let rt = self.infer(rhs, None);
                let lt = self.infer(lhs, Some(&rt));
                (lt, rt)
            }
            (false, true) => {
                let lt = self.infer(lhs, None);
                let rt = self.infer(rhs, Some(&lt));
                (lt, rt)
            }
            (true, true) => match expected.filter(|t| t.is_numeric()) {
                Some(t) => (self.infer(lhs, Some(t)), self.infer(rhs, Some(t))),
                None => (self.infer(lhs, None), self.infer(rhs, None)),
            },
            (false, false) => (self.infer(lhs, None), self.infer(rhs, None)),
        }
    }

    /// The shared tail of arithmetic: same numeric type on both sides.
    fn finish_numeric(
        &mut self,
        op: BinaryOp,
        lt: crate::checker::types::TicType,
        rt: crate::checker::types::TicType,
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        if lt == rt && lt.is_numeric() {
            return lt;
        }
        if matches!(lt, TicType::Dynamic) || matches!(rt, TicType::Dynamic) {
            return TicType::Dynamic; // a bare-obj field: the runtime decides
        }
        self.error(TicError::InvalidOperands {
            span,
            op: op.symbol().into(),
            lhs: lt.name(),
            rhs: rt.name(),
            hint: Some(numeric_hint(op, &lt, &rt)),
        });
        TicType::Dynamic
    }

    /// `==` / `!=` (§2.3): same-type primitives, str, same enum,
    /// same-type pointers, same-class instances — never obj shapes.
    fn infer_equality(
        &mut self,
        op: BinaryOp,
        lhs: &Expr,
        rhs: &Expr,
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        let (lt, rt) = self.infer_anchored_pair(lhs, rhs, None);
        // `null` peeks: it only ever compares with a pointer.
        for (is_null, other) in [
            (matches!(lhs, Expr::NullLit { .. }), &rt),
            (matches!(rhs, Expr::NullLit { .. }), &lt),
        ] {
            if is_null && !matches!(other, TicType::Pointer(_) | TicType::Dynamic) {
                self.error(TicError::InvalidEquality {
                    span,
                    op: op.symbol().into(),
                    lhs: "null".into(),
                    rhs: other.name(),
                    hint: "null is a pointer value — it only compares with a pointer: `p == null`"
                        .into(),
                });
                return TicType::Bool;
            }
        }
        if eq_ok(&lt, &rt) {
            return TicType::Bool;
        }
        self.error(TicError::InvalidEquality {
            span,
            op: op.symbol().into(),
            lhs: lt.name(),
            rhs: rt.name(),
            hint: equality_hint(&lt, &rt),
        });
        TicType::Bool
    }

    /// Compound assignment (`x += e`): `x op e` must type-check with
    /// `x`'s type on the left — str keeps the `str + anything` rule,
    /// numerics require the same type (the literal adapts).
    pub(crate) fn arith_with_lhs_type(
        &mut self,
        op: BinaryOp,
        lhs_ty: &crate::checker::types::TicType,
        value: &Expr,
    ) {
        use crate::checker::types::TicType;
        if op == BinaryOp::Add && *lhs_ty == TicType::Str {
            self.infer(value, None); // `s += x` is `s = s + x`: str + anything
            return;
        }
        let vt = self.infer(value, Some(lhs_ty));
        if !(*lhs_ty == TicType::Dynamic || (*lhs_ty == vt && lhs_ty.is_numeric())) {
            self.error(TicError::InvalidOperands {
                span: value.span(),
                op: format!("{}=", op.symbol()),
                lhs: lhs_ty.name(),
                rhs: vt.name(),
                hint: Some(numeric_hint(op, lhs_ty, &vt)),
            });
        }
    }

    pub(super) fn infer_unary(
        &mut self,
        op: UnaryOp,
        operand: &Expr,
        expected: Option<&crate::checker::types::TicType>,
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        match op {
            UnaryOp::Not => {
                let t = self.infer(operand, None);
                if t != TicType::Bool && t != TicType::Dynamic {
                    self.error(TicError::InvalidOperands {
                        span,
                        op: "!".into(),
                        lhs: t.name(),
                        rhs: t.name(),
                        hint: Some("`!` flips a bool — comparisons like `x > 0` make one".into()),
                    });
                }
                TicType::Bool
            }
            UnaryOp::Neg => {
                let t = self.infer(operand, expected.filter(|t| t.is_numeric()));
                if !t.is_numeric() && t != TicType::Dynamic {
                    self.error(TicError::InvalidOperands {
                        span,
                        op: "-".into(),
                        lhs: t.name(),
                        rhs: t.name(),
                        hint: Some(if t == TicType::Char {
                            "a char is a code point, not a number — negate `i32(c)`".into()
                        } else {
                            "negation is for numbers".into()
                        }),
                    });
                    return TicType::Dynamic;
                }
                t
            }
            // §5.3: `&` only on places (variables, fields, indexes, `*p`).
            UnaryOp::AddrOf => {
                let is_place = matches!(
                    operand,
                    Expr::Ident(_)
                        | Expr::Field { .. }
                        | Expr::Index { .. }
                        | Expr::Unary { op: UnaryOp::Deref, .. }
                );
                if !is_place {
                    self.error(TicError::AddrOfNonPlace { span });
                    return TicType::Dynamic;
                }
                let t = self.infer(operand, None);
                TicType::Pointer(Box::new(t))
            }
            UnaryOp::Deref => {
                let t = self.infer(operand, None);
                match t {
                    TicType::Pointer(pointee) => *pointee,
                    TicType::Dynamic => TicType::Dynamic,
                    ref other => {
                        self.error(TicError::DerefOfNonPointer {
                            span,
                            found: other.name(),
                        });
                        TicType::Dynamic
                    }
                }
            }
        }
    }

}

/// A numeric literal (possibly negated) — the width-polymorphic ones.
pub(super) fn is_num_lit(expr: &Expr) -> bool {
    match expr {
        Expr::IntLit { .. } | Expr::FloatLit { .. } => true,
        Expr::Unary { op: UnaryOp::Neg, operand, .. } => {
            matches!(**operand, Expr::IntLit { .. } | Expr::FloatLit { .. })
        }
        _ => false,
    }
}

/// §2.3: `==`/`!=` compatibility (never for obj shapes or arrays).
fn eq_ok(lt: &crate::checker::types::TicType, rt: &crate::checker::types::TicType) -> bool {
    use crate::checker::types::TicType;
    if matches!(lt, TicType::Dynamic) || matches!(rt, TicType::Dynamic) {
        return true;
    }
    match (lt, rt) {
        (TicType::Obj(_), TicType::Obj(_)) => false,
        (TicType::Class(a), TicType::Class(b)) => a == b,
        (TicType::Enum(a), TicType::Enum(b)) => a == b,
        (TicType::Pointer(a), TicType::Pointer(b)) => a == b,
        (l, r) => l.is_scalar() && l == r,
    }
}

fn equality_hint(lt: &crate::checker::types::TicType, rt: &crate::checker::types::TicType) -> String {
    use crate::checker::types::TicType;
    match (lt, rt) {
        (TicType::Obj(_), TicType::Obj(_)) => {
            "objs have no `==` — compare field by field: `a.name == b.name`".into()
        }
        (TicType::Enum(a), TicType::Enum(b)) => format!(
            "each enum compares only with itself — `{a}` and `{b}` are different enums"
        ),
        (TicType::Class(a), TicType::Class(b)) => {
            format!("instances of different classes are never equal — `{a}` vs `{b}`")
        }
        (l, r) if l.is_array() || r.is_array() => {
            "arrays do not compare with `==` — compare lengths (`len(a) == len(b)`) or loop element by element".into()
        }
        (l, r) if l == &TicType::Str || r == &TicType::Str => {
            "text compares with text — convert first: `str(x)`".into()
        }
        (l, r) if matches!(l, TicType::Pointer(_)) || matches!(r, TicType::Pointer(_)) => {
            "pointers compare with pointers of the same type (and `null`)".into()
        }
        _ => "`==` compares two values of the same type".into(),
    }
}

/// The hint for `i32 + f64`-style failures: name the cast that unifies.
pub(super) fn numeric_hint(op: BinaryOp, lt: &crate::checker::types::TicType, rt: &crate::checker::types::TicType) -> String {
    use crate::checker::types::TicType;
    if lt.is_numeric() && rt.is_numeric() {
        // Suggest the wider side so the cast never loses data — a float if
        // one is present, else the larger integer width.
        let target = if lt.is_float() && !rt.is_float() {
            lt
        } else if rt.is_float() && !lt.is_float() {
            rt
        } else if width_rank(rt) > width_rank(lt) {
            rt
        } else {
            lt
        };
        return format!(
            "Tic never converts silently — cast one side so both are {}: `{}(x) {} y`",
            target.name(),
            target.name(),
            op.symbol()
        );
    }
    if lt == &TicType::Char || rt == &TicType::Char {
        return format!(
            "a char is a code point, not a number — cast it first: `i32(c) {} …`",
            op.symbol()
        );
    }
    if lt == &TicType::Bool || rt == &TicType::Bool {
        return "bools are for logic (`&&`, `||`, `!`) — numbers are for arithmetic".into();
    }
    "arithmetic needs two numbers of the same type".into()
}

/// Rough bit-width of a numeric type, for "cast to the wider side" hints.
fn width_rank(t: &crate::checker::types::TicType) -> u8 {
    use crate::checker::types::TicType;
    match t {
        TicType::I8 | TicType::U8 => 8,
        TicType::I16 | TicType::U16 => 16,
        TicType::I32 | TicType::U32 | TicType::F32 => 32,
        TicType::I64 | TicType::U64 | TicType::F64 => 64,
        _ => 0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::checker::types::TicType;

    #[test]
    fn equality_rules_follow_23() {
        assert!(eq_ok(&TicType::I8, &TicType::I8));
        assert!(eq_ok(&TicType::Str, &TicType::Str));
        assert!(eq_ok(&TicType::Enum("L".into()), &TicType::Enum("L".into())));
        assert!(eq_ok(
            &TicType::Pointer(Box::new(TicType::I32)),
            &TicType::Pointer(Box::new(TicType::I32))
        ));
        assert!(eq_ok(&TicType::Class("C".into()), &TicType::Class("C".into())));
        assert!(!eq_ok(&TicType::Enum("A".into()), &TicType::Enum("B".into())));
        assert!(!eq_ok(
            &TicType::Obj(crate::checker::types::ShapeId(1)),
            &TicType::Obj(crate::checker::types::ShapeId(1))
        ), "obj shapes never compare");
        assert!(!eq_ok(&TicType::I32, &TicType::Str));
        assert!(!eq_ok(&TicType::I32, &TicType::F64));
    }

    #[test]
    fn numeric_hints_name_the_cast() {
        let hint = numeric_hint(BinaryOp::Add, &TicType::I32, &TicType::F64);
        assert!(hint.contains("f64(x) + y"), "{hint}");
        // i8 + i64 suggests the WIDER side, so the cast never truncates.
        let hint = numeric_hint(BinaryOp::Add, &TicType::I8, &TicType::I64);
        assert!(hint.contains("i64(x) + y"), "{hint}");
    }
}
