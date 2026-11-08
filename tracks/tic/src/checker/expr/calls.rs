//! Call, cast and `new` inference (plan §5.3): user functions, methods,
//! the §2.5 built-in table, the README cast table, and `new Class(…)`
//! forwarding to `init`.

use super::BUILTINS;
use crate::ast::{AstType, Expr, Ident};
use crate::checker::scalar_base;
use crate::checker::types::CheckedParam;
use crate::checker::Checker;
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::util::Span;

impl Checker {
    // ---- calls -------------------------------------------------------------------

    pub(super) fn infer_call(
        &mut self,
        callee: &Expr,
        args: &[Expr],
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        match callee {
            Expr::Ident(name) => self.call_named(name, args, span),
            Expr::Field { obj, name, .. } => self.call_method(obj, name, args, span),
            other => {
                let t = self.infer(other, None);
                for arg in args {
                    self.infer(arg, None); // keep finding errors
                }
                self.error(TicError::NotCallable {
                    span: other.span(),
                    what: format!("this {} expression", t.name()),
                });
                TicType::Dynamic
            }
        }
    }

    fn call_named(&mut self, name: &Ident, args: &[Expr], span: Span) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        // User functions shadow builtins.
        if let Some((params, return_ty)) = self
            .functions
            .iter()
            .find(|f| f.name == name.name)
            .map(|f| (f.params.clone(), f.return_ty.clone()))
        {
            return self.check_call_args(&name.name, &params, &return_ty, args, span);
        }
        if let Some(symbol) = self.scopes.lookup(&name.name) {
            let what = format!("`{}` (a {} variable)", name.name, symbol.ty.name());
            for arg in args {
                self.infer(arg, None);
            }
            self.error(TicError::NotCallable { span, what });
            return TicType::Dynamic;
        }
        let what = if self.classes.iter().any(|c| c.name == name.name) {
            Some("a class")
        } else if self.enums.iter().any(|e| e.name == name.name) {
            Some("an enum")
        } else {
            None
        };
        if let Some(what) = what {
            for arg in args {
                self.infer(arg, None);
            }
            self.error(TicError::NotCallable { span, what: format!("`{}` ({what})", name.name) });
            return TicType::Dynamic;
        }
        if let Some(t) = self.call_builtin(&name.name, args, span) {
            return t;
        }
        let mut candidates: Vec<&str> =
            self.functions.iter().map(|f| f.name.as_str()).collect();
        candidates.extend(BUILTINS);
        self.error(TicError::UnknownFunction {
            span,
            name: name.name.clone(),
            suggestion: did_you_mean(&name.name, &candidates),
            note: None,
        });
        TicType::Dynamic
    }

    /// `obj.method(args)` — methods live on classes only in v1.
    fn call_method(
        &mut self,
        obj: &Expr,
        name: &Ident,
        args: &[Expr],
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::{ShapeId, TicType};
        let owner = self.infer(obj, None);
        let class = match owner {
            TicType::Class(ref c) => c.clone(),
            TicType::Dynamic => {
                for arg in args {
                    self.infer(arg, None);
                }
                return TicType::Dynamic; // bare-obj: runtime decides
            }
            ref other => {
                for arg in args {
                    self.infer(arg, None);
                }
                // A known obj shape: suggest its fields — objs hold
                // fields, not methods (§5.4), so the parens are usually
                // the whole mistake.
                let (suggestion, note) = match other {
                    TicType::Obj(id) if *id != ShapeId::BARE => {
                        let fields: Vec<String> = self
                            .shapes
                            .get(*id)
                            .map(|s| s.fields.keys().cloned().collect())
                            .unwrap_or_default();
                        let suggestion = did_you_mean(
                            &name.name,
                            &fields.iter().map(String::as_str).collect::<Vec<_>>(),
                        );
                        let note = match &suggestion {
                            Some(near) => format!(
                                "objs hold fields, not methods — did you mean `.{near}`? read it without the `(…)`: `box.{near}`"
                            ),
                            None => format!(
                                "objs hold fields, not methods — read this one without the `(…)`: `box.{}`",
                                name.name
                            ),
                        };
                        (suggestion, Some(note))
                    }
                    _ => (None, None),
                };
                self.error(TicError::UnknownMethod {
                    span: name.span,
                    owner: other.name(),
                    method: name.name.clone(),
                    suggestion,
                    note,
                });
                return TicType::Dynamic;
            }
        };
        let Some(index) = self.classes.iter().position(|c| c.name == class) else {
            return TicType::Dynamic;
        };
        let display = format!("{class}.{}", name.name);
        if let Some((params, return_ty)) = self.classes[index]
            .method(&name.name)
            .map(|m| (m.params.clone(), m.return_ty.clone()))
        {
            return self.check_call_args(&display, &params, &return_ty, args, span);
        }
        for arg in args {
            self.infer(arg, None);
        }
        let field_ty = self.classes[index].field(&name.name).cloned();
        let methods: Vec<String> =
            self.classes[index].methods.iter().map(|m| m.name.clone()).collect();
        match field_ty {
            // Calling a field: it is data, not a function.
            Some(t) => self.error(TicError::NotCallable {
                span: name.span,
                what: format!("`.{m}` (a {t} field)", m = name.name),
            }),
            None => self.error(TicError::UnknownMethod {
                span: name.span,
                owner: format!("class {class}"),
                method: name.name.clone(),
                suggestion: did_you_mean(
                    &name.name,
                    &methods.iter().map(String::as_str).collect::<Vec<_>>(),
                ),
                note: None,
            }),
        }
        TicType::Dynamic
    }

    /// Arity + per-argument types against a resolved signature. Returns
    /// the callee's return type either way (poison continues usefully).
    fn check_call_args(
        &mut self,
        display: &str,
        params: &[CheckedParam],
        return_ty: &crate::checker::types::TicType,
        args: &[Expr],
        span: Span,
    ) -> crate::checker::types::TicType {
        if args.len() != params.len() {
            self.error(TicError::WrongArity {
                span,
                name: display.to_string(),
                expected: params.len(),
                found: args.len(),
            });
        }
        for (i, (arg, param)) in args.iter().zip(params).enumerate() {
            self.check_against(
                arg,
                &param.ty,
                &format!("argument {} of `{display}`", i + 1),
                arg.span(),
            );
        }
        return_ty.clone()
    }

    // ---- casts and new -------------------------------------------------------

    pub(super) fn infer_cast(
        &mut self,
        ty: &AstType,
        expr: &Expr,
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        let from = self.infer(expr, None);
        let Some(target) = scalar_base(ty) else {
            self.error(TicError::InvalidCast {
                span,
                to: ty.to_source(),
                from: from.name(),
                hint: "casts work on the scalar types — i8…u64, f32, f64, bool, char, str".into(),
            });
            return TicType::Dynamic;
        };
        if !cast_ok(&from, &target) {
            self.error(TicError::InvalidCast {
                span,
                to: target.name(),
                from: from.name(),
                hint: cast_reject_hint(&target, &from),
            });
            // Keep the target: downstream code keeps type-checking.
            return target;
        }
        target
    }

    /// `new Class(args)` — the arguments go to the class's `init`.
    pub(super) fn infer_new(
        &mut self,
        class: &Ident,
        args: &[Expr],
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        let Some(index) = self.classes.iter().position(|c| c.name == class.name) else {
            let classes: Vec<String> = self.classes.iter().map(|c| c.name.clone()).collect();
            for arg in args {
                self.infer(arg, None);
            }
            self.error(TicError::UnknownClass {
                span: class.span,
                name: class.name.clone(),
                suggestion: did_you_mean(
                    &class.name,
                    &classes.iter().map(String::as_str).collect::<Vec<_>>(),
                ),
            });
            return TicType::Dynamic;
        };
        let init = self.classes[index]
            .init
            .and_then(|i| self.classes[index].methods.get(i))
            .map(|m| (m.params.clone(), m.return_ty.clone()));
        match init {
            Some((params, _)) => {
                self.check_call_args(&class.name, &params, &TicType::Unit, args, span);
            }
            None => {
                if !args.is_empty() {
                    self.error(TicError::WrongArity {
                        span,
                        name: class.name.clone(),
                        expected: 0,
                        found: args.len(),
                    });
                    for arg in args {
                        self.infer(arg, None);
                    }
                }
            }
        }
        TicType::Class(class.name.clone())
    }
}

/// The README cast table: numeric ↔ numeric, char ↔ int, scalar → str,
/// str → int/float (a runtime parse). Everything else is T2016.
fn cast_ok(from: &crate::checker::types::TicType, to: &crate::checker::types::TicType) -> bool {
    use crate::checker::types::TicType;
    if from == &TicType::Dynamic || from == to {
        return true; // bare-obj value: runtime decides; identity is a no-op
    }
    if from.is_numeric() && to.is_numeric() {
        return true;
    }
    if (from.is_int() && to == &TicType::Char) || (from == &TicType::Char && to.is_int()) {
        return true;
    }
    if from.is_scalar() && to == &TicType::Str {
        return true; // str(42), str('a'), str(2.5), str(true)
    }
    if from == &TicType::Str && (to.is_int() || to.is_float()) {
        return true; // i32("123") — parses at runtime (README)
    }
    false
}

/// The hint for a rejected cast, named by why it failed.
fn cast_reject_hint(to: &crate::checker::types::TicType, from: &crate::checker::types::TicType) -> String {
    use crate::checker::types::TicType;
    if to == &TicType::Bool || from == &TicType::Bool {
        return "a bool is not made by casting — it comes from comparisons (`x > 0`)".into();
    }
    if to == &TicType::Char && from.is_float() {
        return "cast a whole code point: `char(i32(f))`".into();
    }
    if from == &TicType::Char && to.is_float() {
        return "cast to the code first: `f64(i32(c))`".into();
    }
    if from == &TicType::Str && to == &TicType::Char {
        return "a str can hold many characters — keep chars in a `char[]` array".into();
    }
    "allowed casts: numeric ↔ numeric · char ↔ int · scalar → str · str → int or float".into()
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::checker::types::TicType;

    #[test]
    fn cast_table_matches_the_readme() {
        // allowed
        for (from, to) in [
            (TicType::I32, TicType::F64),
            (TicType::F64, TicType::I32),
            (TicType::I8, TicType::U64),
            (TicType::Char, TicType::I32),
            (TicType::I32, TicType::Char),
            (TicType::Bool, TicType::Str),
            (TicType::F64, TicType::Str),
            (TicType::Str, TicType::I32),
            (TicType::Str, TicType::F32),
            (TicType::I32, TicType::I32),
        ] {
            assert!(cast_ok(&from, &to), "{from} -> {to} should be allowed");
        }
        // rejected
        for (from, to) in [
            (TicType::I32, TicType::Bool), // bool(1)
            (TicType::Bool, TicType::I32), // i32(true)
            (TicType::Str, TicType::Bool), // bool("true")
            (TicType::Str, TicType::Char), // char("a")
            (TicType::F64, TicType::Char), // char(2.5)
            (TicType::Char, TicType::F64), // f64('a')
            (TicType::Str, TicType::Class("C".into())),
        ] {
            assert!(!cast_ok(&from, &to), "{from} -> {to} should be rejected");
        }
    }
}
