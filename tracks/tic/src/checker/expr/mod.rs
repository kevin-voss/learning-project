//! Expression inference (plan §5.3): every [`Expr`] gets a [`TicType`],
//! recorded in the side table phase 4 reads. The rules that shape this
//! file:
//!
//! * **Literals are polymorphic, variables never convert.** An int
//!   literal takes the expected int type (`i8 big = 127; big + 1` is i8
//!   arithmetic), a float literal takes f32/f64 — but a *typed* value
//!   never silently widens, narrows or crosses int/float (`i32 + f64` is
//!   an error with a cast hint, `f64 x = 7;` wants `7.0` or `f64(7)`).
//! * **`str` on the LEFT of `+` concatenates** anything; `x + str` with
//!   a non-str left side is the classic mistake and gets its own hint.
//! * **`==`/`!=`** work for same-type primitives, `str`, same-enum
//!   values, same-type pointers (identity) and same-class instances —
//!   never for obj shapes.
//! * **`obj` fields** are checked against the interned shape when it is
//!   known and *deferred to runtime* on a bare `obj` (§5.4) — those read
//!   as [`TicType::Dynamic`], which is compatible with everything.

mod builtins;
mod calls;
mod ops;
mod values;

use super::Checker;
use crate::ast::{Expr, Ident};
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::util::Span;

/// The built-in function names (§2.5), for arity tables and "did you mean".
pub(crate) const BUILTINS: [&str; 18] = [
    "print", "input", "len", "push", "pop", "insert", "remove", "range", "size_of", "sqrt",
    "abs", "floor", "ceil", "pow", "min", "max", "random", "copy",
];

impl Checker {
    /// Infer `expr`'s type, optionally under an *expectation* (the
    /// declared type it is flowing into — what makes literals adapt),
    /// and record it for the interpreter.
    pub(crate) fn infer(&mut self, expr: &Expr, expected: Option<&super::types::TicType>) -> super::types::TicType {
        let ty = self.infer_inner(expr, expected);
        self.expr_types.insert(expr.span(), ty.clone());
        ty
    }

    /// Infer `expr` and require the result to fit `expected` (reporting
    /// where it does not). `context` names the spot for the message
    /// ("the initializer of `x`", "argument 1 of `f`", …).
    pub(crate) fn check_against(
        &mut self,
        expr: &Expr,
        expected: &super::types::TicType,
        context: &str,
        span: Span,
    ) -> super::types::TicType {
        // `null` is a pointer value (§2.1): only pointer contexts take it.
        if let Expr::NullLit { .. } = expr {
            if !matches!(expected, super::types::TicType::Pointer(_) | super::types::TicType::Dynamic) {
                self.error(TicError::TypeMismatch {
                    span: expr.span(),
                    context: context.to_string(),
                    expected: expected.name(),
                    found: "null".into(),
                    hint: Some(
                        "null is a pointer value — declare the pointer first: `i32* p = null;`"
                            .into(),
                    ),
                });
                let found = super::types::TicType::Dynamic;
                self.expr_types.insert(expr.span(), found.clone());
                return found;
            }
            self.expr_types.insert(expr.span(), expected.clone());
            return expected.clone();
        }
        let found = self.infer(expr, Some(expected));
        if !self.assign_ok(expected, &found) {
            self.mismatch(span, context, expected, &found);
        }
        found
    }

    /// Structural "may `found` flow into `expected`?" — `Dynamic` (a
    /// bare-obj field, §5.4) and a bare `obj` slot accept anything,
    /// because the runtime re-checks; everything else must be equal.
    pub(crate) fn assign_ok(&self, expected: &super::types::TicType, found: &super::types::TicType) -> bool {
        use super::types::{ShapeId, TicType};
        if matches!(expected, TicType::Dynamic) || matches!(found, TicType::Dynamic) {
            return true;
        }
        match (expected, found) {
            // A bare `obj` is the runtime-checked escape hatch, both ways.
            (TicType::Obj(e), TicType::Obj(f)) => {
                *e == ShapeId::BARE || *f == ShapeId::BARE || e == f
            }
            _ => expected == found,
        }
    }

    /// Report `found` where `expected` was wanted: obj shapes get their
    /// own error with both shapes spelled out (§5.4), numeric pairs get
    /// a cast hint.
    pub(crate) fn mismatch(
        &mut self,
        span: Span,
        context: &str,
        expected: &super::types::TicType,
        found: &super::types::TicType,
    ) {
        use super::types::{ShapeId, TicType};
        if let (TicType::Obj(e), TicType::Obj(f)) = (expected, found) {
            if *e != ShapeId::BARE && *f != ShapeId::BARE {
                let (expected, found) =
                    (self.shapes.render(&TicType::Obj(*e)), self.shapes.render(&TicType::Obj(*f)));
                self.error(TicError::ShapeMismatch { span, context: context.into(), expected, found });
                return;
            }
        }
        self.error(TicError::TypeMismatch {
            span,
            context: context.into(),
            expected: expected.name(),
            found: found.name(),
            hint: cast_hint(expected, found),
        });
    }

    // ---- the big dispatch ---------------------------------------------------

    fn infer_inner(
        &mut self,
        expr: &Expr,
        expected: Option<&super::types::TicType>,
    ) -> super::types::TicType {
        use super::types::TicType;
        match expr {
            // §2.1: int literals default to i32, floats to f64 — and adapt
            // to the expected type of the SAME family only (never int→float).
            Expr::IntLit { .. } => match expected {
                Some(t) if t.is_int() => t.clone(),
                _ => TicType::I32,
            },
            Expr::FloatLit { .. } => match expected {
                Some(t @ (TicType::F32 | TicType::F64)) => t.clone(),
                _ => TicType::F64,
            },
            Expr::StrLit { .. } => TicType::Str,
            Expr::CharLit { .. } => TicType::Char,
            Expr::BoolLit { .. } => TicType::Bool,
            // Null-ness is a value-level concern (§4.4 note): a bare
            // `null` reads as Dynamic; pointer contexts pin it above.
            Expr::NullLit { .. } => match expected {
                Some(t @ TicType::Pointer(_)) => t.clone(),
                _ => TicType::Dynamic,
            },
            Expr::This { span } => match &self.current_class {
                Some(class) => TicType::Class(class.clone()),
                None => {
                    self.error(TicError::ThisOutsideMethod { span: *span });
                    TicType::Dynamic
                }
            },
            Expr::Ident(name) => self.infer_ident(name),
            Expr::Binary { op, lhs, rhs, span } => {
                self.infer_binary(*op, lhs, rhs, expected, *span)
            }
            Expr::Unary { op, operand, span } => self.infer_unary(*op, operand, expected, *span),
            Expr::Call { callee, args, span } => self.infer_call(callee, args, *span),
            Expr::Index { obj, index, .. } => self.infer_index(obj, index),
            Expr::Field { obj, name, .. } => self.infer_field(obj, name),
            Expr::ArrayLit { elems, span } => self.infer_array_lit(elems, expected, *span),
            Expr::ObjLit { fields, span } => self.infer_obj_lit(fields, *span),
            Expr::Cast { ty, expr, span } => self.infer_cast(ty, expr, *span),
            // `Expr::TypeName` is legal only as `size_of`'s argument —
            // handled there; anywhere else it is a type used as a value.
            Expr::TypeName { ty, span } => {
                self.error(TicError::TypeNameNotValue { span: *span, name: ty.to_source() });
                TicType::Dynamic
            }
            Expr::New { class, args, span } => self.infer_new(class, args, *span),
        }
    }

    // ---- names ------------------------------------------------------------

    /// A bare name in expression position: a variable, or (with a
    /// teaching note) a function/class/enum/builtin used as a value.
    fn infer_ident(&mut self, name: &Ident) -> super::types::TicType {
        use super::types::TicType;
        if let Some(symbol) = self.scopes.lookup(&name.name) {
            return symbol.ty.clone();
        }
        self.unknown_variable(&name.name, name.span);
        TicType::Dynamic
    }

    /// T2015 with the teaching notes: a known non-variable name explains
    /// itself; a plain typo gets a did-you-mean over every name the
    /// student might have meant — in-scope variables first, then the
    /// file's functions/classes/enums and the built-ins.
    pub(crate) fn unknown_variable(&mut self, name: &str, span: Span) {
        if let Some(note) = self.note_for_name(name) {
            self.error(TicError::UnknownVariable {
                span,
                name: name.to_string(),
                suggestion: None,
                note: Some(note),
            });
            return;
        }
        let scope_names = self.scopes.names();
        let mut candidates: Vec<&str> = scope_names.iter().map(String::as_str).collect();
        candidates.extend(self.functions.iter().map(|f| f.name.as_str()));
        candidates.extend(self.classes.iter().map(|c| c.name.as_str()));
        candidates.extend(self.enums.iter().map(|e| e.name.as_str()));
        candidates.extend(BUILTINS);
        let suggestion = did_you_mean(name, &candidates);
        // A near-miss of a function/class/enum/builtin teaches the same
        // lesson as the exact spelling: it is not a variable.
        let note = suggestion
            .as_deref()
            .and_then(|near| self.note_for_name(near));
        self.error(TicError::UnknownVariable {
            span,
            name: name.to_string(),
            suggestion,
            note,
        });
    }

    /// The "this name is not a variable, it is a …" note for T2015, or
    /// `None` when `name` is nothing the program declared.
    fn note_for_name(&self, name: &str) -> Option<String> {
        if self.functions.iter().any(|f| f.name == name) {
            Some(format!("`{name}` is a function — to use its value, call it: `{name}(…)`"))
        } else if self.classes.iter().any(|c| c.name == name) {
            Some(format!("`{name}` is a class — make an instance: `new {name}(…)`"))
        } else if self.enums.iter().any(|e| e.name == name) {
            Some(format!("`{name}` is an enum — pick a variant: `{name}.…`"))
        } else if BUILTINS.contains(&name) {
            Some(format!("`{name}` is a built-in function — call it: `{name}(…)`"))
        } else {
            None
        }
    }
}

/// The hint on a TypeMismatch between scalar families.
fn cast_hint(expected: &super::types::TicType, found: &super::types::TicType) -> Option<String> {
    use super::types::TicType;
    if expected.is_numeric() && found.is_numeric() {
        return Some(format!(
            "Tic never converts silently — cast it: `{}(value)`",
            expected.name()
        ));
    }
    if expected == &TicType::Char && found.is_int() {
        return Some("a char literal is `'A'` — or cast a code point: `char(65)`".into());
    }
    if expected == &TicType::Str && found.is_scalar() {
        return Some("convert to text first: `str(value)`".into());
    }
    if expected.is_numeric() && found == &TicType::Str {
        return Some(format!(
            "`{}(\"123\")` parses at runtime — it fails unless the text is a number",
            expected.name()
        ));
    }
    if matches!(expected, TicType::Pointer(_)) {
        return Some("make a pointer with `&x`, or pass `null`".into());
    }
    None
}
#[cfg(test)]
mod tests {
    use super::*;
    use crate::checker::types::TicType;

    #[test]
    fn mismatch_hints_name_a_cast_or_a_literal_fix() {
        assert_eq!(
            cast_hint(&TicType::F64, &TicType::I32),
            Some("Tic never converts silently — cast it: `f64(value)`".into())
        );
        assert_eq!(
            cast_hint(&TicType::Char, &TicType::I32),
            Some("a char literal is `'A'` — or cast a code point: `char(65)`".into())
        );
        assert!(cast_hint(&TicType::Obj(crate::checker::types::ShapeId(1)), &TicType::I32).is_none());
        let _ = TicType::Unit; // silence: TicType used only in the asserts above
    }
}
