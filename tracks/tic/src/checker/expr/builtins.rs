//! The §2.5 built-in function table: the signatures the checker
//! enforces (`print` takes any values, `len` is str/array → i32, the
//! dynamic-array toolbox, `range` → `i32[]`, `size_of` takes a scalar
//! type name, the math box, `copy`). User functions shadow builtins —
//! this table is the fallback.

use super::ops::numeric_hint;
use super::super::scalar_base;
use crate::ast::{BinaryOp, Expr};
use crate::checker::Checker;
use crate::diagnostics::TicError;
use crate::util::Span;

impl Checker {
    // ---- builtins (§2.5) ---------------------------------------------------------

    pub(super) fn call_builtin(
        &mut self,
        name: &str,
        args: &[Expr],
        span: Span,
    ) -> Option<crate::checker::types::TicType> {
        use crate::checker::types::TicType;
        let ty = match name {
            // print(a, b, …) — any values; the interpreter stringifies.
            "print" => {
                for arg in args {
                    self.infer(arg, None);
                }
                TicType::Unit
            }
            "input" => {
                if self.builtin_arity(name, args, 1, span) {
                    let t = self.infer(&args[0], None);
                    if t != TicType::Str && t != TicType::Dynamic {
                        self.builtin_arg_mismatch(name, 1, "a str (the prompt)", &t, args[0].span());
                    }
                }
                TicType::Str
            }
            "len" => {
                if self.builtin_arity(name, args, 1, span) {
                    let t = self.infer(&args[0], None);
                    if !t.is_array() && t != TicType::Str && t != TicType::Dynamic {
                        self.builtin_arg_mismatch(
                            name,
                            1,
                            "a str or an array",
                            &t,
                            args[0].span(),
                        );
                    }
                }
                TicType::I32
            }
            // The dynamic-array toolbox: fixed arrays never grow (§2.1).
            "push" => {
                if self.builtin_arity(name, args, 2, span) {
                    let elem = self.dyn_array_arg(name, &args[0]);
                    match elem {
                        Some(elem) => {
                            self.check_against(&args[1], &elem, "the value pushed", args[1].span());
                        }
                        None => {
                            self.infer(&args[1], None);
                        }
                    }
                }
                TicType::Unit
            }
            "pop" => {
                if self.builtin_arity(name, args, 1, span) {
                    match self.dyn_array_arg(name, &args[0]) {
                        Some(elem) => elem,
                        None => TicType::Dynamic,
                    }
                } else {
                    TicType::Dynamic
                }
            }
            "insert" => {
                if self.builtin_arity(name, args, 3, span) {
                    if let Some(elem) = self.dyn_array_arg(name, &args[0]) {
                        self.int_arg(name, &args[1]);
                        self.check_against(&args[2], &elem, "the value inserted", args[2].span());
                    }
                }
                TicType::Unit
            }
            "remove" => {
                if self.builtin_arity(name, args, 2, span) {
                    if self.dyn_array_arg(name, &args[0]).is_some() {
                        self.int_arg(name, &args[1]);
                    }
                }
                TicType::Unit
            }
            "range" => {
                if !(1..=3).contains(&args.len()) {
                    // WrongArity's message names one count, but range takes
                    // three shapes — spell them out instead.
                    self.error(TicError::TypeMismatch {
                        span,
                        context: "the arguments of `range`".into(),
                        expected: "1, 2 or 3 ints — range(n), range(a, b), range(a, b, step)".into(),
                        found: format!("{} argument(s)", args.len()),
                        hint: Some("range(5) counts 0..4; range(2, 5) is 2 3 4; range adds a step as the third".into()),
                    });
                    for arg in args {
                        self.infer(arg, None);
                    }
                } else {
                    for arg in args {
                        self.int_arg(name, arg);
                    }
                }
                TicType::DynArray(Box::new(TicType::I32))
            }
            // size_of(T): one *scalar type name* argument (README table).
            "size_of" => {
                self.size_of_arg(args, span);
                TicType::I32
            }
            "sqrt" | "floor" | "ceil" => {
                if self.builtin_arity(name, args, 1, span) {
                    let t = self.infer(&args[0], Some(&TicType::F64));
                    if !t.is_float() && t != TicType::Dynamic {
                        self.builtin_arg_mismatch(name, 1, "an f64", &t, args[0].span());
                    }
                }
                TicType::F64
            }
            "abs" => {
                if self.builtin_arity(name, args, 1, span) {
                    let t = self.infer(&args[0], None);
                    if !t.is_numeric() && t != TicType::Dynamic {
                        self.builtin_arg_mismatch(name, 1, "a number", &t, args[0].span());
                    } else {
                        return Some(t);
                    }
                }
                TicType::Dynamic
            }
            "pow" => {
                if self.builtin_arity(name, args, 2, span) {
                    for arg in args {
                        let t = self.infer(arg, Some(&TicType::F64));
                        if !t.is_float() && t != TicType::Dynamic {
                            self.builtin_arg_mismatch(name, 1, "an f64", &t, arg.span());
                        }
                    }
                }
                TicType::F64
            }
            "min" | "max" => {
                if self.builtin_arity(name, args, 2, span) {
                    let (lt, rt) = self.infer_anchored_pair(&args[0], &args[1], None);
                    if !(lt == rt && lt.is_numeric()) && lt != TicType::Dynamic {
                        self.error(TicError::InvalidOperands {
                            span,
                            op: name.into(),
                            lhs: lt.name(),
                            rhs: rt.name(),
                            hint: Some(numeric_hint(BinaryOp::Add, &lt, &rt)),
                        });
                    } else {
                        return Some(lt);
                    }
                }
                TicType::Dynamic
            }
            "random" => {
                if self.builtin_arity(name, args, 2, span) {
                    self.int_arg(name, &args[0]);
                    self.int_arg(name, &args[1]);
                }
                TicType::I32
            }
            "copy" => {
                if self.builtin_arity(name, args, 1, span) {
                    let t = self.infer(&args[0], None);
                    if !t.is_array() && t != TicType::Dynamic {
                        self.builtin_arg_mismatch(name, 1, "an array", &t, args[0].span());
                    } else {
                        return Some(t);
                    }
                }
                TicType::Dynamic
            }
            _ => return None,
        };
        Some(ty)
    }

    /// `size_of`'s one argument must be a *scalar type name* (a
    /// [`Expr::TypeName`]); the README's fixed-size table decides which.
    fn size_of_arg(&mut self, args: &[Expr], span: Span) {
        if args.len() != 1 {
            self.error(TicError::WrongArity { span, name: "size_of".into(), expected: 1, found: args.len() });
            for arg in args {
                self.infer(arg, None); // also reports a misplaced TypeName
            }
            return;
        }
        match &args[0] {
            Expr::TypeName { ty, .. } => {
                let fixed = scalar_base(ty).filter(|t| t.scalar_size().is_some());
                if fixed.is_none() {
                    self.error(TicError::SizeOfArg { span: args[0].span(), found: ty.to_source() });
                }
            }
            other => {
                let t = self.infer(other, None);
                self.error(TicError::SizeOfArg { span: other.span(), found: t.name() });
            }
        }
    }

    /// True arity check for a fixed-arity builtin (reports once).
    fn builtin_arity(&mut self, name: &str, args: &[Expr], expected: usize, span: Span) -> bool {
        if args.len() != expected {
            self.error(TicError::WrongArity { span, name: name.into(), expected, found: args.len() });
            for arg in args {
                self.infer(arg, None);
            }
            return false;
        }
        true
    }

    fn builtin_arg_mismatch(
        &mut self,
        name: &str,
        which: usize,
        expected: &str,
        found: &crate::checker::types::TicType,
        span: Span,
    ) {
        self.error(TicError::TypeMismatch {
            span,
            context: format!("argument {which} of `{name}`"),
            expected: expected.into(),
            found: found.name(),
            hint: None,
        });
    }

    /// A dynamic-array (`T[]`) argument; fixed arrays and everything else
    /// get the teaching mismatch.
    fn dyn_array_arg(&mut self, name: &str, arg: &Expr) -> Option<crate::checker::types::TicType> {
        use crate::checker::types::TicType;
        let t = self.infer(arg, None);
        match t {
            TicType::DynArray(elem) => Some(*elem),
            TicType::Dynamic => Some(TicType::Dynamic),
            ref other => {
                self.builtin_arg_mismatch(
                    name,
                    1,
                    "a dynamic array (`i32[]`-style, not `i32[5]`)",
                    other,
                    arg.span(),
                );
                None
            }
        }
    }

    fn int_arg(&mut self, name: &str, arg: &Expr) {
        use crate::checker::types::TicType;
        let t = self.infer(arg, Some(&TicType::I32));
        if !t.is_int() && t != TicType::Dynamic {
            self.builtin_arg_mismatch(name, 1, "an integer", &t, arg.span());
        }
    }
}
