//! The §2.5 built-in table, phases 4–5: `print` and the math toolbox
//! `sqrt abs floor ceil pow min max`, plus the memory-era roster —
//! `len`, the dynamic-array toolbox `push pop insert remove`, `range`,
//! `size_of` (the README byte table), `random` (seedable via
//! [`RunOptions`](super::RunOptions)), `copy` and `input`. Every
//! signature is exactly the one the checker fixed in phase 3; user
//! functions shadow every name here.
//!
//! Choices the checker could not express, fixed here (documented in
//! NOTES.md): `pop`/`remove` **return the removed element** (`remove`'s
//! *static* type stays unit, so only `print(pop(a))`-style uses show
//! it); `range` counts up with a positive step and down with a negative
//! one, refusing 0; `random(a, b)` is inclusive on both ends.
//!
//! `input(prompt)` writes the prompt through the [`Writer`] and reads
//! one line from real stdin (trimmed of its newline; EOF reads as `""`)
//! — the one input path with no seam yet.

use super::memory::{self, cells_ref, cells_mut};
use super::value::{Value, Width};
use super::Interp;
use crate::ast::{BaseTy, Expr, TypeSuffix};
use crate::checker::types::TicType;
use crate::diagnostics::TicError;
use crate::util::Span;

/// The builtin roster — the same 18 names the checker's table has
/// (`checker::expr::BUILTINS`); kept in sync by test.
pub(crate) const BUILTIN_NAMES: [&str; 18] = [
    "print", "input", "len", "push", "pop", "insert", "remove", "range", "size_of", "sqrt",
    "abs", "floor", "ceil", "pow", "min", "max", "random", "copy",
];

pub(crate) fn is_builtin(name: &str) -> bool {
    BUILTIN_NAMES.contains(&name)
}

impl Interp<'_, '_> {
    pub(crate) fn call_builtin(
        &mut self,
        name: &str,
        args: &[Expr],
        span: Span,
    ) -> Result<Value, TicError> {
        match name {
            "print" => {
                // Space-separated values + one newline (§2.5), all
                // through the Writer seam.
                let mut parts: Vec<String> = Vec::with_capacity(args.len());
                for arg in args {
                    parts.push(self.eval_expr(arg)?.to_string());
                }
                self.writer.write_line(&parts.join(" "));
                Ok(Value::Unit)
            }
            "input" => {
                let prompt = match self.eval_arg(args, span)? {
                    Value::Str(s) => s.to_string(),
                    other => {
                        return Err(self.internal(span, format!("input's prompt must be a str, got {}", other.kind())))
                    }
                };
                self.writer.write(&prompt);
                let mut line = String::new();
                match std::io::stdin().read_line(&mut line) {
                    Ok(_) => {}
                    Err(err) => {
                        return Err(self.internal(span, format!("reading input failed: {err}")))
                    }
                }
                // trim the trailing newline only (`\n`, or `\r\n`)
                let line = line.strip_suffix('\n').unwrap_or(&line);
                let line = line.strip_suffix('\r').unwrap_or(line);
                Ok(Value::str(line))
            }
            "len" => match self.eval_arg(args, span)? {
                // len(str) counts code points — chars are whole code
                // points in Tic (§2.1), so that *is* the length.
                Value::Str(s) => Ok(Value::Int(s.chars().count() as i64, Width::I32)),
                Value::Array(cells, _) => {
                    Ok(Value::Int(cells_ref(&cells, span)?.len() as i64, Width::I32))
                }
                other => Err(self.internal(span, format!("len on {}", other.kind()))),
            },
            "push" => {
                let array = self.eval_arg(args, span)?;
                let value = self.eval_arg(&args[1..], span)?;
                let (cells, _) = memory::as_dyn_array(&array, name, span)?;
                cells_mut(&cells, span)?.push(memory::slot_of(value));
                Ok(Value::Unit)
            }
            "pop" => {
                let array = self.eval_arg(args, span)?;
                let (cells, _) = memory::as_dyn_array(&array, name, span)?;
                let slot = cells_mut(&cells, span)?.pop().ok_or_else(|| TicError::OutOfBounds {
                    span,
                    detail: "cannot pop from an empty array".into(),
                })?;
                super::env::read_slot(&slot, span)
            }
            "insert" => {
                let array = self.eval_arg(args, span)?;
                let (cells, _) = memory::as_dyn_array(&array, name, span)?;
                let index = self.int_arg(&args[1..], span)?;
                let value = self.eval_arg(&args[2..], span)?;
                let len = cells_ref(&cells, span)?.len();
                if index < 0 || index as usize > len {
                    return Err(TicError::OutOfBounds {
                        span,
                        detail: format!(
                            "cannot insert at index {index} — the array has {len} element{s}, so 0..{len} works",
                            s = if len == 1 { "" } else { "s" },
                        ),
                    });
                }
                cells_mut(&cells, span)?.insert(index as usize, memory::slot_of(value));
                Ok(Value::Unit)
            }
            "remove" => {
                let array = self.eval_arg(args, span)?;
                let (cells, _) = memory::as_dyn_array(&array, name, span)?;
                let index = self.int_arg(&args[1..], span)?;
                let len = cells_ref(&cells, span)?.len();
                if index < 0 || index as usize >= len {
                    return Err(TicError::OutOfBounds {
                        span,
                        detail: if len == 0 {
                            format!("cannot remove index {index} — the array is empty")
                        } else {
                            format!(
                                "cannot remove index {index} — the array has {len} element{s} (indexes 0..{last})",
                                s = if len == 1 { "" } else { "s" },
                                last = len - 1,
                            )
                        },
                    });
                }
                let slot = cells_mut(&cells, span)?.remove(index as usize);
                super::env::read_slot(&slot, span)
            }
            "range" => {
                let (start, stop, step) = match args.len() {
                    1 => (0, self.int_arg(args, span)?, 1),
                    2 => (self.int_arg(args, span)?, self.int_arg(&args[1..], span)?, 1),
                    _ => (
                        self.int_arg(args, span)?,
                        self.int_arg(&args[1..], span)?,
                        self.int_arg(&args[2..], span)?,
                    ),
                };
                if step == 0 {
                    return Err(TicError::OutOfBounds {
                        span,
                        detail: "range step cannot be 0 — try 1 to count up or -1 to count down".into(),
                    });
                }
                let mut values = Vec::new();
                let mut i = start;
                while (step > 0 && i < stop) || (step < 0 && i > stop) {
                    if !Width::I32.fits_int(i) {
                        return Err(TicError::NumericOverflow {
                            span,
                            detail: format!("i32 overflow (range produced {i})"),
                        });
                    }
                    values.push(Value::Int(i, Width::I32));
                    i = match i.checked_add(step) {
                        Some(next) => next,
                        None => break, // the i64 edge: the range simply ends
                    };
                }
                Ok(memory::new_array(values, &TicType::DynArray(Box::new(TicType::I32))))
            }
            // size_of(T): the README's fixed byte table, scalar types only.
            "size_of" => {
                let Expr::TypeName { ty, .. } = args
                    .first()
                    .ok_or_else(|| self.internal(span, "size_of reached the interpreter without its argument"))?
                else {
                    return Err(self.internal(span, "size_of's argument must be a type name"));
                };
                let bytes = match (&ty.base, ty.suffix) {
                    (BaseTy::I8 | BaseTy::U8 | BaseTy::Bool, TypeSuffix::None) => 1,
                    (BaseTy::I16 | BaseTy::U16, TypeSuffix::None) => 2,
                    (BaseTy::I32 | BaseTy::U32 | BaseTy::F32 | BaseTy::Char, TypeSuffix::None) => 4,
                    (BaseTy::I64 | BaseTy::U64 | BaseTy::F64, TypeSuffix::None) => 8,
                    // the checker's SizeOfArg (T2017) already stopped every
                    // other shape — str included
                    _ => {
                        return Err(self.internal(span, format!(
                            "size_of({}) reached the interpreter — the checker only passes scalar type names",
                            ty.to_source(),
                        )))
                    }
                };
                Ok(Value::Int(bytes, Width::I32))
            }
            "random" => {
                // Inclusive both ends (§2.5); the smaller number first.
                let a = self.int_arg(args, span)?;
                let b = self.int_arg(&args[1..], span)?;
                if a > b {
                    return Err(TicError::OutOfBounds {
                        span,
                        detail: format!("random needs its smaller number first — random({b}, {a}) picks from {b} through {a}"),
                    });
                }
                let span_len = (b as i128 - a as i128 + 1) as u128; // always >= 1
                let pick = a as i128 + (self.rng.next_u64() as i128 % span_len as i128);
                let pick = pick as i64;
                if !Width::I32.fits_int(pick) {
                    return Err(TicError::NumericOverflow {
                        span,
                        detail: format!("i32 overflow (random picked {pick})"),
                    });
                }
                Ok(Value::Int(pick, Width::I32))
            }
            "copy" => {
                let array = self.eval_arg(args, span)?;
                memory::copy_array(&array, span)
            }
            "sqrt" | "floor" | "ceil" => {
                let f = self.f64_arg(args, span)?;
                Ok(Value::Float(
                    match name {
                        "sqrt" => f.sqrt(),
                        "floor" => f.floor(),
                        _ => f.ceil(),
                    },
                    Width::F64,
                ))
            }
            "pow" => {
                let base = self.f64_arg(args, span)?;
                let exp = self.f64_arg(&args[1..], span)?;
                Ok(Value::Float(base.powf(exp), Width::F64))
            }
            "abs" => match self.eval_arg(args, span)? {
                Value::Int(v, width) => v
                    .checked_abs()
                    .filter(|a| width.fits_int(*a))
                    .map(|a| Value::Int(a, width))
                    .ok_or_else(|| TicError::NumericOverflow {
                        span,
                        detail: format!("{} overflow (abs of {v})", width.name()),
                    }),
                Value::Float(v, width) => Ok(Value::Float(v.abs(), width)),
                other => Err(self.internal(span, format!("abs on a {other}"))),
            },
            "min" | "max" => {
                let lhs = self.eval_arg(args, span)?;
                let rhs = self.eval_arg(&args[1..], span)?;
                let take_lhs = match name {
                    "min" => le(&lhs, &rhs, span, self)?,
                    _ => le(&rhs, &lhs, span, self)?,
                };
                Ok(if take_lhs { lhs } else { rhs })
            }
            // The roster is closed and the checker rejects unknown names.
            _ => Err(TicError::NotImplemented { what: name_to_what(name), phase: 5 }),
        }
    }

    /// Evaluate argument 0 (a helper because every builtin starts the
    /// same way and arity was already checked).
    fn eval_arg(&mut self, args: &[Expr], span: Span) -> Result<Value, TicError> {
        let arg = args
            .first()
            .ok_or_else(|| self.internal(span, "a builtin reached the interpreter without its argument"))?;
        self.eval_expr(arg)
    }

    /// The int-arg helper `range`/`random`/`insert`/`remove` need (any
    /// int width — the checker allows all eight — read as plain i64).
    fn int_arg(&mut self, args: &[Expr], span: Span) -> Result<i64, TicError> {
        match self.eval_arg(args, span)? {
            Value::Int(v, _) => Ok(v),
            other => Err(self.internal(span, format!("{} reached an int builtin's argument", other.kind()))),
        }
    }

    /// The float-arg helper the checker fixed for `sqrt/floor/ceil/pow`.
    fn f64_arg(&mut self, args: &[Expr], span: Span) -> Result<f64, TicError> {
        match self.eval_arg(args, span)? {
            Value::Float(v, _) => Ok(v),
            other => Err(self.internal(span, format!("a {other} reached a float builtin"))),
        }
    }
}

/// `min`/`max` order without duplicating the width plumbing.
fn le(lhs: &Value, rhs: &Value, span: Span, interp: &Interp<'_, '_>) -> Result<bool, TicError> {
    match (lhs, rhs) {
        (Value::Int(a, aw), Value::Int(b, bw)) if aw == bw => Ok(a <= b),
        (Value::Float(a, _), Value::Float(b, _)) => Ok(a <= b),
        _ => Err(interp.internal(span, "min/max reached the interpreter with mixed operands")),
    }
}

/// The stubs keep their `&'static` spelling for the NotImplemented arm.
fn name_to_what(name: &str) -> &'static str {
    // The call site only reaches here for phase-5 names.
    for builtin in BUILTIN_NAMES {
        if builtin == name {
            return builtin;
        }
    }
    "this built-in"
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn the_roster_matches_the_checkers_18_names() {
        assert_eq!(BUILTIN_NAMES.len(), 18);
        for name in ["print", "sqrt", "abs", "min", "max", "pow", "floor", "ceil"] {
            assert!(is_builtin(name), "{name} must be recognized");
        }
        for name in ["input", "len", "push", "pop", "insert", "remove", "range", "size_of", "random", "copy"] {
            assert!(is_builtin(name), "{name} must be recognized");
        }
        assert!(!is_builtin("println"));
    }

    #[test]
    fn the_rng_is_deterministic_when_seeded() {
        let mut a = super::super::Rng::new(Some(42));
        let mut b = super::super::Rng::new(Some(42));
        for _ in 0..8 {
            assert_eq!(a.next_u64(), b.next_u64());
        }
        let mut c = super::super::Rng::new(Some(43));
        assert_ne!(a.next_u64(), c.next_u64(), "different seeds must diverge");
        // unseeded still produces values (range coverage is asserted in
        // the integration tests through random(a, b))
        assert_ne!(super::super::Rng::new(None).next_u64(), 0);
    }
}
