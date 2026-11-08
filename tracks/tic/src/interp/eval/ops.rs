//! Operator and cast evaluation (plan §2.6 rule 1, §2.5's cast table):
//! every integer step is `checked_*` plus a per-width range clamp, so
//! `i8 127 + 1` stops the program with `i8 overflow (127 + 1)` instead of
//! wrapping like C. There is **no constant folding** — the checker let
//! `1 / 0` through on purpose, so division by zero is caught here, at
//! runtime, exactly when the student's program reaches it.
//!
//! Widths travel *on the values* (`Value::Int(i64, Width)`), so no
//! side-table lookup is needed to know which clamp applies.

use super::super::value::{Value, Width};
use crate::ast::{BinaryOp, UnaryOp};
use crate::checker::types::TicType;
use crate::diagnostics::TicError;
use crate::util::Span;
use std::rc::Rc;

/// A bug shield: the checker guarantees both operands of numeric
/// arithmetic carry the same type, so a mismatch is Tic's fault.
fn internal(span: Span, what: impl Into<String>) -> TicError {
    TicError::InternalError { span, what: what.into() }
}

fn overflow(span: Span, detail: String) -> TicError {
    TicError::NumericOverflow { span, detail }
}

/// "i8 overflow (127 + 1)" — §2.6 rule 1's exact wording.
fn binary_overflow(span: Span, width: Width, a: i64, op: &str, b: i64) -> TicError {
    overflow(span, format!("{} overflow ({a} {op} {b})", width.name()))
}

fn out_of_range(span: Span, width: Width, v: i64) -> TicError {
    overflow(span, format!("{} overflow ({v} is out of range)", width.name()))
}

// ---- binary operators --------------------------------------------------------

/// Evaluate `lhs op rhs` for already-evaluated operands (short-circuiting
/// happens one layer up, in `expr.rs`, which must not touch `rhs` early).
pub(super) fn binary(op: BinaryOp, lhs: Value, rhs: Value, span: Span) -> Result<Value, TicError> {
    use BinaryOp::*;
    // str on the LEFT of `+` converts the right side (§2.1; the checker
    // rejects `x + str`, so only this side can arrive here).
    if op == Add {
        if let Some(s) = lhs.as_str() {
            return Ok(Value::str(format!("{s}{rhs}")));
        }
    }
    let arithmetic = matches!(op, Add | Sub | Mul | Div | Mod);
    match (&lhs, &rhs) {
        (Value::Int(a, aw), Value::Int(b, bw)) if aw == bw => {
            let width = *aw;
            if arithmetic {
                Ok(Value::Int(int_math(op, *a, *b, width, span)?, width))
            } else {
                Ok(Value::Bool(compare(op, a.cmp(b))))
            }
        }
        (Value::Float(a, aw), Value::Float(b, bw)) if aw == bw => {
            let width = *aw;
            match op {
                Div if *b == 0.0 => Err(TicError::DivisionByZero { span, what: "float division" }),
                Mod if *b == 0.0 => Err(TicError::DivisionByZero { span, what: "float remainder" }),
                Add => Ok(Value::Float(a + b, width)),
                Sub => Ok(Value::Float(a - b, width)),
                Mul => Ok(Value::Float(a * b, width)),
                Div => Ok(Value::Float(a / b, width)),
                Mod => Ok(Value::Float(a % b, width)),
                _ => Ok(Value::Bool(float_compare(op, *a, *b))),
            }
        }
        (Value::Bool(a), Value::Bool(b)) => match op {
            Eq => Ok(Value::Bool(a == b)),
            NotEq => Ok(Value::Bool(a != b)),
            // `<` on bools is a compile error; reaching this is a Tic bug.
            _ => Err(internal(span, format!("`{}` on bools reached the interpreter", op.symbol()))),
        },
        (Value::Char(a), Value::Char(b)) => match op {
            Eq => Ok(Value::Bool(a == b)),
            NotEq => Ok(Value::Bool(a != b)),
            Lt | Gt | LtEq | GtEq => Ok(Value::Bool(compare(op, a.cmp(b)))),
            _ => Err(internal(span, format!("`{}` on chars reached the interpreter", op.symbol()))),
        },
        (Value::Str(a), Value::Str(b)) => match op {
            // str comparison is by content (§2.3)
            Eq => Ok(Value::Bool(a.as_str() == b.as_str())),
            NotEq => Ok(Value::Bool(a.as_str() != b.as_str())),
            _ => Err(internal(span, "text has no ordering operators at runtime")),
        },
        // Pointers compare by *identity* (§2.3): same slot or not —
        // `&x == &x` is true, `&x == &y` is false, null equals null, and
        // a live pointer never equals null.
        (Value::Pointer(a), Value::Pointer(b)) => match op {
            Eq => Ok(Value::Bool(Rc::ptr_eq(a, b))),
            NotEq => Ok(Value::Bool(!Rc::ptr_eq(a, b))),
            _ => Err(internal(span, format!("`{}` on pointers reached the interpreter", op.symbol()))),
        },
        (Value::Null, Value::Null) => match op {
            Eq => Ok(Value::Bool(true)),
            NotEq => Ok(Value::Bool(false)),
            _ => Err(internal(span, format!("`{}` on nulls reached the interpreter", op.symbol()))),
        },
        (Value::Pointer(_), Value::Null) | (Value::Null, Value::Pointer(_)) => match op {
            Eq => Ok(Value::Bool(false)),
            NotEq => Ok(Value::Bool(true)),
            _ => Err(internal(span, format!("`{}` on a pointer and null reached the interpreter", op.symbol()))),
        },
        // Instances compare by *identity* (§2.1, §2.3) — the same box or
        // not. `c == alias` is true (they ARE one instance); two `new`s
        // are false however similar their fields.
        (Value::Instance(a), Value::Instance(b)) => match op {
            Eq => Ok(Value::Bool(Rc::ptr_eq(a, b))),
            NotEq => Ok(Value::Bool(!Rc::ptr_eq(a, b))),
            _ => Err(internal(span, format!("`{}` on class instances reached the interpreter", op.symbol()))),
        },
        // Enum values compare within their enum (§2.1) — same enum, then
        // variant names. Cross-enum comparison is a compile error
        // (T2013), so reaching that at runtime is a Tic bug.
        (
            Value::EnumValue { enum_name: enum_a, variant: variant_a },
            Value::EnumValue { enum_name: enum_b, variant: variant_b },
        ) => match op {
            Eq => (enum_a == enum_b)
                .then(|| Value::Bool(variant_a == variant_b))
                .ok_or_else(|| internal(span, format!("`==` on `{enum_a}` and `{enum_b}` values reached the interpreter"))),
            NotEq => (enum_a == enum_b)
                .then(|| Value::Bool(variant_a != variant_b))
                .ok_or_else(|| internal(span, format!("`!=` on `{enum_a}` and `{enum_b}` values reached the interpreter"))),
            _ => Err(internal(span, format!("`{}` on enum values reached the interpreter", op.symbol()))),
        },
        (l, r) => Err(internal(
            span,
            format!("`{}` on {} and {} reached the interpreter", op.symbol(), l.kind(), r.kind()),
        )),
    }
}

/// The `checked_*` core of integer math. `i / i` is truncating integer
/// division (§2.1's teaching moment); `i % 0` and `MIN / -1` refuse.
fn int_math(op: BinaryOp, a: i64, b: i64, width: Width, span: Span) -> Result<i64, TicError> {
    let symbol = op.symbol();
    let checked = match op {
        BinaryOp::Add => a.checked_add(b),
        BinaryOp::Sub => a.checked_sub(b),
        BinaryOp::Mul => a.checked_mul(b),
        BinaryOp::Div => {
            if b == 0 {
                return Err(TicError::DivisionByZero { span, what: "integer division" });
            }
            a.checked_div(b) // i64::MIN / -1 overflows — refuse it too
        }
        BinaryOp::Mod => {
            if b == 0 {
                return Err(TicError::DivisionByZero { span, what: "integer remainder" });
            }
            a.checked_rem(b)
        }
        _ => return Err(internal(span, "comparison routed into int_math")),
    };
    let result = checked
        // The i64 op can succeed while the *width* refuses (i8 127 + 1:
        // the i64 add is fine, i8 is not) — either way the student sees
        // the operands, §2.6's exact wording: "i8 overflow (127 + 1)".
        .ok_or_else(|| binary_overflow(span, width, a, symbol, b))?;
    if !width.fits_int(result) {
        return Err(binary_overflow(span, width, a, symbol, b));
    }
    Ok(result)
}

fn compare(op: BinaryOp, ord: std::cmp::Ordering) -> bool {
    use std::cmp::Ordering::*;
    match op {
        BinaryOp::Lt => ord == Less,
        BinaryOp::Gt => ord == Greater,
        BinaryOp::LtEq => ord != Greater,
        BinaryOp::GtEq => ord != Less,
        BinaryOp::Eq => ord == Equal,
        BinaryOp::NotEq => ord != Equal,
        _ => false,
    }
}

fn float_compare(op: BinaryOp, a: f64, b: f64) -> bool {
    use BinaryOp::*;
    match op {
        Lt => a < b,
        Gt => a > b,
        LtEq => a <= b,
        GtEq => a >= b,
        Eq => a == b,     // NaN semantics fall out naturally
        NotEq => a != b,
        _ => false,
    }
}

/// The read-modify-write half of `x += 1` (and friends): `compound` is
/// `x = x op value`. `s += x` keeps the str-on-the-left rule. Shared by
/// every store path (variables, `arr[i]`, `*p`) via `memory::assign_slot`.
pub(crate) fn compound(cur: Value, op: BinaryOp, value: Value, span: Span) -> Result<Value, TicError> {
    if op == BinaryOp::Add {
        if let Some(s) = cur.as_str() {
            return Ok(Value::str(format!("{s}{value}")));
        }
    }
    binary(op, cur, value, span)
}

// ---- unary operators ---------------------------------------------------------

pub(super) fn unary(op: UnaryOp, operand: Value, span: Span) -> Result<Value, TicError> {
    match (op, &operand) {
        (UnaryOp::Not, Value::Bool(b)) => Ok(Value::Bool(!b)),
        (UnaryOp::Neg, Value::Int(v, width)) => v
            .checked_neg()
            .filter(|n| width.fits_int(*n))
            .map(|n| Value::Int(n, *width))
            .ok_or_else(|| overflow(span, format!("{} overflow (-({v}))", width.name()))),
        (UnaryOp::Neg, Value::Float(v, width)) => Ok(Value::Float(-v, *width)),
        _ => Err(internal(span, format!("`{}` on a {} reached the interpreter", op.symbol(), operand.kind()))),
    }
}

// ---- casts (§2.5's table) ------------------------------------------------------

/// Cast `value` to the scalar `target` the checker fixed for this cast
/// expression. Numeric ↔ numeric (truncating toward zero, range-checked),
/// char ↔ int (code point), scalar → str, and str → int/float via a
/// **runtime parse** whose failure names the offending text.
pub(super) fn cast(value: Value, target: &TicType, span: Span) -> Result<Value, TicError> {
    match target {
        TicType::I8 | TicType::I16 | TicType::I32 | TicType::I64 | TicType::U8
        | TicType::U16 | TicType::U32 | TicType::U64 => {
            let width = Width::of_type(target)
                .filter(|w| !w.is_float())
                .ok_or_else(|| internal(span, "an int cast target lost its width"))?;
            Ok(Value::Int(to_int(value, width, span)?, width))
        }
        TicType::F32 | TicType::F64 => {
            let width = Width::of_type(target)
                .filter(|w| w.is_float())
                .ok_or_else(|| internal(span, "a float cast target lost its width"))?;
            Ok(Value::Float(to_float(value, width, span)?, width))
        }
        TicType::Char => to_char(value, span),
        TicType::Str => Ok(Value::str(value.to_string())),
        other => Err(internal(span, format!("a cast to {} reached phase 4", other.name()))),
    }
}

/// Anything → integer: int width-changes are range-checked, floats
/// **truncate toward zero** (`i32(2.7)` is 2, `i32(-2.7)` is -2), chars
/// give their code point, strs must parse.
fn to_int(value: Value, width: Width, span: Span) -> Result<i64, TicError> {
    let raw = match &value {
        Value::Int(v, _) => *v,
        Value::Float(v, _) => {
            if !v.is_finite() {
                return Err(overflow(span, format!("{} overflow ({v} is out of range)", width.name())));
            }
            let t = v.trunc(); // toward zero, never rounding
            if t < i64::MIN as f64 || t > i64::MAX as f64 {
                return Err(overflow(span, format!("{} overflow ({v} is out of range)", width.name())));
            }
            t as i64
        }
        Value::Char(c) => *c as i64,
        Value::Str(s) => s
            .parse::<i64>()
            .map_err(|_| TicError::CastFailed { span, to: width.name().to_string(), text: s.to_string() })?,
        _ => return Err(internal(span, format!("a cast from {} to {}", value.kind(), width.name()))),
    };
    if !width.fits_int(raw) {
        return Err(out_of_range(span, width, raw));
    }
    Ok(raw)
}

/// Anything → float: ints widen exactly, floats change width (f64 → f32
/// narrows), strs must parse (an f32 target parses as f32 directly, so
/// the spelling stays f32-shortest).
fn to_float(value: Value, width: Width, span: Span) -> Result<f64, TicError> {
    Ok(match &value {
        Value::Int(v, _) => *v as f64,
        Value::Float(v, from) => match (from, width) {
            (Width::F32, Width::F32) | (Width::F64, Width::F64) => *v,
            (Width::F64, Width::F32) => *v as f32 as f64, // narrow honestly
            _ => *v,                                      // f32 → f64 is exact
        },
        Value::Str(s) => {
            let parsed = if width == Width::F32 {
                s.parse::<f32>().map(|f| f as f64)
            } else {
                s.parse::<f64>()
            };
            parsed.map_err(|_| TicError::CastFailed { span, to: width.name().to_string(), text: s.to_string() })?
        }
        _ => return Err(internal(span, format!("a cast from {} to {}", value.kind(), width.name()))),
    })
}

/// Anything → char: chars stay, ints must be a real code point
/// (`char(65)` → `'A'`); anything else the checker already rejected.
fn to_char(value: Value, span: Span) -> Result<Value, TicError> {
    match &value {
        Value::Char(c) => Ok(Value::Char(*c)),
        Value::Int(v, _) => u32::try_from(*v)
            .ok()
            .and_then(char::from_u32) // rejects surrogates and > U+10FFFF
            .map(Value::Char)
            .ok_or_else(|| TicError::CastFailed { span, to: "char".to_string(), text: v.to_string() }),
        _ => Err(internal(span, format!("a cast from {} to char", value.kind()))),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn s() -> Span {
        Span::point(0)
    }

    fn i(v: i64, w: Width) -> Value {
        Value::Int(v, w)
    }

    #[test]
    fn i8_refuses_127_plus_1_with_the_plans_wording() {
        let err = binary(
            BinaryOp::Add,
            i(127, Width::I8),
            i(1, Width::I8),
            s(),
        )
        .unwrap_err();
        assert_eq!(err.error_code(), "T3001");
        assert_eq!(err.message(), "runtime overflow: i8 overflow (127 + 1)");
    }

    #[test]
    fn unsigned_widths_clamp_their_results() {
        assert_eq!(
            binary(BinaryOp::Add, i(200, Width::U8), i(55, Width::U8), s()).unwrap(),
            i(255, Width::U8)
        );
        let err = binary(BinaryOp::Add, i(255, Width::U8), i(1, Width::U8), s()).unwrap_err();
        assert!(err.message().contains("u8 overflow (255 + 1)"), "{}", err.message());
        // unsigned arithmetic never goes below zero
        let err = binary(BinaryOp::Sub, i(0, Width::U16), i(1, Width::U16), s()).unwrap_err();
        assert!(err.message().contains("u16 overflow"), "{}", err.message());
    }

    #[test]
    fn division_by_zero_int_float_and_remainder() {
        for (op, what) in [
            (BinaryOp::Div, "integer division"),
            (BinaryOp::Mod, "integer remainder"),
        ] {
            let err = binary(op, i(7, Width::I32), i(0, Width::I32), s()).unwrap_err();
            assert_eq!(err.error_code(), "T3002");
            assert_eq!(err.message(), format!("{what} by zero"));
        }
        let err = binary(BinaryOp::Div, Value::Float(7.0, Width::F64), Value::Float(0.0, Width::F64), s())
            .unwrap_err();
        assert_eq!(err.message(), "float division by zero");
        let err = binary(BinaryOp::Mod, Value::Float(7.0, Width::F64), Value::Float(0.0, Width::F64), s())
            .unwrap_err();
        assert_eq!(err.message(), "float remainder by zero");
    }

    #[test]
    fn integer_division_truncates_toward_zero() {
        assert_eq!(binary(BinaryOp::Div, i(7, Width::I32), i(2, Width::I32), s()).unwrap(), i(3, Width::I32));
        assert_eq!(binary(BinaryOp::Div, i(-7, Width::I32), i(2, Width::I32), s()).unwrap(), i(-3, Width::I32));
    }

    #[test]
    fn negation_overflow_is_caught() {
        let err = unary(UnaryOp::Neg, i(-128, Width::I8), s()).unwrap_err();
        assert!(err.message().contains("i8 overflow (-(-128))"), "{}", err.message());
    }

    #[test]
    fn str_concatenates_from_the_string_side_only() {
        let out = binary(BinaryOp::Add, Value::str("n = "), i(42, Width::I32), s()).unwrap();
        assert_eq!(out.to_string(), "n = 42");
        let out = binary(BinaryOp::Add, Value::str("f "), Value::Float(4.0, Width::F64), s()).unwrap();
        assert_eq!(out.to_string(), "f 4.0");
    }

    #[test]
    fn str_equality_is_by_content() {
        let a = Value::str("ab");
        let b = Value::str("a");
        let b = binary(BinaryOp::Add, b, Value::str("b"), s()).unwrap(); // a different Rc
        assert_eq!(binary(BinaryOp::Eq, a, b, s()).unwrap(), Value::Bool(true));
    }

    #[test]
    fn casts_truncate_parse_and_range_check() {
        let cast_to = |v: Value, ty: &TicType| cast(v, ty, s());
        assert_eq!(
            cast_to(Value::Float(2.7, Width::F64), &TicType::I32).unwrap(),
            i(2, Width::I32)
        );
        assert_eq!(
            cast_to(Value::Float(-2.7, Width::F64), &TicType::I32).unwrap(),
            i(-2, Width::I32)
        );
        assert_eq!(
            cast_to(Value::str("123"), &TicType::I32).unwrap(),
            i(123, Width::I32)
        );
        assert_eq!(
            cast_to(Value::str("3.5"), &TicType::F64).unwrap(),
            Value::Float(3.5, Width::F64)
        );
        assert_eq!(cast_to(Value::Char('A'), &TicType::I32).unwrap(), i(65, Width::I32));
        assert_eq!(
            cast_to(i(97, Width::I32), &TicType::Char).unwrap(),
            Value::Char('a')
        );
        assert_eq!(
            cast_to(i(42, Width::I32), &TicType::Str).unwrap().to_string(),
            "42"
        );
        // failures name the text
        let err = cast_to(Value::str("abc"), &TicType::I32).unwrap_err();
        assert_eq!(err.error_code(), "T3004");
        assert_eq!(err.message(), "`abc` is not a valid i32");
        // parsed but out of width
        let err = cast_to(Value::str("300"), &TicType::I8).unwrap_err();
        assert!(err.message().contains("i8 overflow"), "{}", err.message());
        // a float too large for the target
        let err = cast_to(Value::Float(1e300, Width::F64), &TicType::I32).unwrap_err();
        assert!(err.message().contains("i32 overflow"), "{}", err.message());
        // a code point that is not one
        let err = cast_to(i(0xD800, Width::I32), &TicType::Char).unwrap_err();
        assert_eq!(err.message(), "`55296` is not a valid char");
    }
}
