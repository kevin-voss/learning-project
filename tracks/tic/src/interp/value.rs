//! Runtime values (plan §4.4): every scalar a Tic program can hold while
//! it runs, plus the [`Width`] tag that makes arithmetic width-checked
//! (§2.6 rule 1) — `i8 big = 127; big + 1` carries `Width::I8` on both
//! operands, so the add can refuse instead of wrapping.
//!
//! Phase 5 added the reference-shaped half of §4.4's sketch:
//!
//! * **[`Value::Array`]** — fixed `T[N]` and dynamic `T[]` arrays, one
//!   shared box of element **slots** (`Rc<RefCell<…>>`), so assignment
//!   shares the *box* (reference semantics) and `&arr[i]` can hand out
//!   the element's own slot. `TicType` rides along so `copy` preserves
//!   the fixed/dynamic distinction.
//! * **[`Value::Pointer`]** — `&x`: a clone of the variable's own slot
//!   `Rc` (§4.4's pointer trick — a pointer to a function local stays
//!   valid after the function returns; dangling is impossible).
//! * **[`Value::Null`]** — the pointer that points nowhere; `T*`'s zero.
//!
//! Phase 6 completes it with the last three §4.4 variants:
//!
//! * **[`Value::Instance`]** — a class instance: one shared box whose
//!   fields are **slots** laid out in the checker's class layout order
//!   (the same trick as array elements — `&box.field` hands out the
//!   field's own slot, and `box.field = …` writes through it).
//! * **[`Value::Object`]** — an obj literal's box plus the checker's
//!   interned [`ShapeId`]; field slots are stored sorted by field name
//!   (the shape's own order — the one order that never lies, §5.4).
//! * **[`Value::EnumValue`]** — one picked variant of an enum; prints as
//!   the bare variant name and compares by enum + variant.
//!
//! `Display` is the *print format* (§2.5 / the example fixtures): ints
//! plain, floats shortest round-trip with `.0` forced on whole numbers
//! (students must see `4.0`, not `4`), bools as `true`/`false`, chars as
//! the character, strs unquoted, arrays as `[1, 2, 3]` (strs and chars
//! quoted inside so the elements stay readable), pointers as `ptr`, null
//! as `null`, instances as `Counter { count: 5 }`, objs as
//! `{ enabled: true }` (strs/chars quoted inside), enums as the bare
//! variant name (`Green`).

use crate::checker::types::{ShapeId, TicType};
use crate::diagnostics::TicError;
use crate::util::Span;
use std::cell::RefCell;
use std::fmt;
use std::rc::Rc;

/// Where one variable (or array element) lives: shared, mutable,
/// address-takeable. This *is* §4.4's pointer target — `&x` clones the
/// same `Rc` the environment reads and writes through.
pub type Slot = Rc<RefCell<Value>>;

/// One class instance (§2.1 `ClassName`): the class it belongs to (for
/// messages and printing) and its fields as **slots** in the checker's
/// `CheckedClass.fields` order, each with its name — so `box.field`,
/// `box.field = …` and `&box.field` all name the field's own slot
/// (exactly like `arr[i]`), and printing can spell the fields out
/// without the program's tables.
///
/// (`PartialEq` here only feeds Rust-level `assert_eq!` in tests; a Tic
/// program's `==` on instances is *identity*, decided in
/// `eval/ops.rs::binary` — same deal as arrays since phase 5.)
#[derive(Debug, PartialEq)]
pub struct ClassInstance {
    pub class: String,
    pub fields: Vec<(String, Slot)>,
}

/// One obj's data (§5.4): field slots stored sorted by field name —
/// the shape's own `BTreeMap` order, so two literals with the same
/// fields store (and print) identically whatever order they were
/// written in. (`PartialEq` is Rust-test plumbing only; Tic programs
/// never compare objs — the checker forbids it, §2.3.)
#[derive(Debug, PartialEq)]
pub struct ObjData {
    pub fields: Vec<(String, Slot)>,
}

/// Which of the ten numeric widths a [`Value`] carries. This is the type
/// the *checker* fixed for the expression, travelling with the number.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Width {
    I8,
    I16,
    I32,
    I64,
    U8,
    U16,
    U32,
    U64,
    F32,
    F64,
}

impl Width {
    /// The width of a numeric [`TicType`] — `None` for everything else.
    pub fn of_type(ty: &TicType) -> Option<Width> {
        Some(match ty {
            TicType::I8 => Width::I8,
            TicType::I16 => Width::I16,
            TicType::I32 => Width::I32,
            TicType::I64 => Width::I64,
            TicType::U8 => Width::U8,
            TicType::U16 => Width::U16,
            TicType::U32 => Width::U32,
            TicType::U64 => Width::U64,
            TicType::F32 => Width::F32,
            TicType::F64 => Width::F64,
            _ => return None,
        })
    }

    /// The width spelled the way the student wrote it.
    pub fn name(self) -> &'static str {
        match self {
            Width::I8 => "i8",
            Width::I16 => "i16",
            Width::I32 => "i32",
            Width::I64 => "i64",
            Width::U8 => "u8",
            Width::U16 => "u16",
            Width::U32 => "u32",
            Width::U64 => "u64",
            Width::F32 => "f32",
            Width::F64 => "f64",
        }
    }

    /// `(min, max)` an integer width holds. Values live in an `i64`, so
    /// `u64` tops out at `i64::MAX` (§4.4 stores `Int(i64, Width)` — no
    /// Tic literal can even name anything bigger).
    pub fn int_range(self) -> Option<(i64, i64)> {
        Some(match self {
            Width::I8 => (i8::MIN as i64, i8::MAX as i64),
            Width::I16 => (i16::MIN as i64, i16::MAX as i64),
            Width::I32 => (i32::MIN as i64, i32::MAX as i64),
            Width::I64 => (i64::MIN, i64::MAX),
            Width::U8 => (0, u8::MAX as i64),
            Width::U16 => (0, u16::MAX as i64),
            Width::U32 => (0, u32::MAX as i64),
            Width::U64 => (0, i64::MAX),
            Width::F32 | Width::F64 => return None,
        })
    }

    pub fn is_float(self) -> bool {
        matches!(self, Width::F32 | Width::F64)
    }

    /// Does `v` fit this integer width? (§2.6 rule 1's "range clamp".)
    pub fn fits_int(self, v: i64) -> bool {
        match self.int_range() {
            Some((min, max)) => v >= min && v <= max,
            None => false,
        }
    }
}

/// One runtime value (§4.4). Scalars copy; arrays and pointers are
/// references — cloning a [`Value`] shares the box, never the data.
#[derive(Debug, Clone, PartialEq)]
pub enum Value {
    Int(i64, Width),
    Float(f64, Width),
    Bool(bool),
    Char(char),
    Str(Rc<String>),
    Unit,
    /// A fixed `T[N]` or dynamic `T[]` array: the shared element slots
    /// plus the array's own type (fixed/dynamic travels with the value so
    /// `copy` can preserve it and the size-lock can be re-checked).
    Array(Rc<RefCell<Vec<Slot>>>, TicType),
    /// A pointer to one slot. `&x` clones the slot's `Rc`; `*p` reads and
    /// writes through it. Identity is `Rc::ptr_eq` (§2.3).
    Pointer(Slot),
    /// The `null` pointer — comparable, printable, but never followable.
    Null,
    /// A class instance: one shared box, cloned to *share* (§2.1
    /// reference semantics). `==` is identity — `Rc::ptr_eq`.
    Instance(Rc<RefCell<ClassInstance>>),
    /// An obj literal's box plus the checker-interned shape id (§5.4).
    /// Sharing the `Rc` shares the obj; the shape id travels for
    /// messages, while the actual field list is always re-checked on
    /// use (a bare-`obj` parameter may hold any shape).
    Object(Rc<RefCell<ObjData>>, ShapeId),
    /// One value of an enum: which enum, which variant. Prints as the
    /// bare variant name; `==` compares both names (§2.1).
    EnumValue { enum_name: String, variant: String },
}

impl Value {
    /// A str value without spelling `Rc::new(String::from(...))` everywhere.
    pub fn str(text: impl Into<String>) -> Value {
        Value::Str(Rc::new(text.into()))
    }

    /// The str contents, if this is one.
    pub fn as_str(&self) -> Option<&str> {
        match self {
            Value::Str(s) => Some(s),
            _ => None,
        }
    }

    /// The plain-language noun for error messages: `an int`, `an array`,
    /// `a pointer`, `null`, …
    pub fn kind(&self) -> &'static str {
        match self {
            Value::Int(..) => "an int",
            Value::Float(..) => "a float",
            Value::Bool(_) => "a bool",
            Value::Char(_) => "a char",
            Value::Str(_) => "a str",
            Value::Unit => "unit",
            Value::Array(..) => "an array",
            Value::Pointer(_) => "a pointer",
            Value::Null => "null",
            Value::Instance(_) => "a class instance",
            Value::Object(..) => "an obj",
            Value::EnumValue { .. } => "an enum value",
        }
    }

    /// The value a declaration with no initializer (or a function that
    /// never reaches `return`) holds: §2.1's zero column. Fixed arrays
    /// build `n` zero elements, dynamic arrays start empty, a pointer
    /// starts `null`; objs/classes/enums belong to phase 6.
    pub fn zero(ty: &TicType, span: Span) -> Result<Value, TicError> {
        if let Some(width) = Width::of_type(ty) {
            return Ok(if width.is_float() {
                Value::Float(0.0, width)
            } else {
                Value::Int(0, width)
            });
        }
        Ok(match ty {
            TicType::Bool => Value::Bool(false),
            TicType::Char => Value::Char('\0'),
            TicType::Str => Value::str(""),
            TicType::Unit => Value::Unit,
            TicType::FixedArray(elem, n) => {
                let mut cells = Vec::with_capacity(*n);
                for _ in 0..*n {
                    let zero = Value::zero(elem, span)?;
                    cells.push(Rc::new(RefCell::new(zero)));
                }
                Value::Array(Rc::new(RefCell::new(cells)), ty.clone())
            }
            // §2.1: a dynamic array's zero value is the empty array.
            TicType::DynArray(_) => {
                Value::Array(Rc::new(RefCell::new(Vec::new())), ty.clone())
            }
            TicType::Pointer(_) => Value::Null,
            // Obj/class/enum zeros need the program's tables (an enum's
            // zero is its FIRST variant, §2.1) — the interpreter routes
            // through its own `zero_of`, which resolves these first. A
            // *bare* obj (no known shape) has no zero value at all: the
            // checker rejects `obj x;` without an initializer, so landing
            // here means an internal slip.
            TicType::Obj(_) => {
                return Err(TicError::InternalError {
                    span,
                    what: "an obj zero value reached Value::zero — the interpreter builds objs from literals and known shapes (a bare obj has none, §2.1)".into(),
                })
            }
            TicType::Class(_) => {
                return Err(TicError::InternalError {
                    span,
                    what: "a class zero value reached Value::zero — `new` always builds instances and the checker requires one (§2.1)".into(),
                })
            }
            TicType::Enum(_) => {
                return Err(TicError::InternalError {
                    span,
                    what: "an enum zero value reached Value::zero — the first variant lives in the declaration (§2.1); the interpreter resolves it".into(),
                })
            }
            TicType::Dynamic => return Err(TicError::InternalError {
                span,
                what: "a bare-obj value reached a zero initialization — bare obj fields have no zero value (the checker routes around this)".into(),
            }),
            // The ten numeric types returned via `Width::of_type` above,
            // which mirrors exactly that set.
            _ => return Err(TicError::InternalError {
                span,
                what: "a numeric type fell through Value::zero's early return".into(),
            }),
        })
    }
}

/// `4.0` must not print as `4`, but `3.5`, `1e300`, `inf` and `NaN` stay
/// exactly as Rust's shortest round-trip `{}` spells them.
fn with_dot_spelled(text: String) -> String {
    let needs_dot = !text.contains('.') && !text.contains('e') && !text.contains("inf") && !text.contains("NaN");
    if needs_dot {
        format!("{text}.0")
    } else {
        text
    }
}

/// How one element prints inside an array: strs and chars get their
/// quotes so `["a b", 'c']` stays readable; everything else prints as
/// itself.
fn display_element(value: &Value) -> String {
    match value {
        Value::Str(s) => format!("\"{s}\""),
        Value::Char(c) => format!("'{c}'"),
        other => other.to_string(),
    }
}

impl fmt::Display for Value {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Value::Int(v, _) => write!(f, "{v}"),
            // An f32 must print with f32's shortest round-trip, so narrow
            // before formatting — `0.1_f32` shown as f64 would grow tails.
            Value::Float(v, Width::F32) => f.write_str(&with_dot_spelled(format!("{}", *v as f32))),
            Value::Float(v, _) => f.write_str(&with_dot_spelled(format!("{v}"))),
            Value::Bool(b) => write!(f, "{b}"),
            Value::Char(c) => write!(f, "{c}"),
            Value::Str(s) => f.write_str(s),
            Value::Unit => f.write_str("()"),
            // A value a student can print and re-type: `[1, 2, 3]`.
            Value::Array(cells, _) => {
                let mut out = String::from("[");
                match cells.try_borrow() {
                    Ok(elements) => {
                        for (i, slot) in elements.iter().enumerate() {
                            if i > 0 {
                                out.push_str(", ");
                            }
                            out.push_str(&match slot.try_borrow() {
                                Ok(value) => display_element(&value),
                                Err(_) => "(unreadable)".to_string(),
                            });
                        }
                    }
                    Err(_) => out.push_str("(unreadable)"),
                }
                out.push(']');
                f.write_str(&out)
            }
            // A pointer is an address, not the value behind it — showing
            // `42` would teach the wrong lesson.
            Value::Pointer(_) => f.write_str("ptr"),
            Value::Null => f.write_str("null"),
            // `Counter { count: 5, label: "x" }` — the class name plus
            // its named fields, strs/chars quoted inside (the element
            // rules).
            Value::Instance(instance) => {
                let mut out = String::new();
                match instance.try_borrow() {
                    Ok(inst) => {
                        out.push_str(&inst.class);
                        out.push(' ');
                        out.push_str(&format_named_fields(&inst.fields));
                    }
                    Err(_) => out.push_str("(unreadable)"),
                }
                f.write_str(&out)
            }
            // `{ enabled: true }` — field names in the stored (name-
            // sorted) order, values like array elements.
            Value::Object(data, _) => {
                let mut out = String::new();
                match data.try_borrow() {
                    Ok(obj) => out.push_str(&format_named_fields(&obj.fields)),
                    Err(_) => out.push_str("{ (unreadable) }"),
                }
                f.write_str(&out)
            }
            // The bare variant name (§2.1): `print(c.state)` shows `Done`.
            Value::EnumValue { variant, .. } => f.write_str(variant),
        }
    }
}

/// `{ count: 5, label: "x" }` — the named-field body shared by the
/// instance and obj print formats (values with the element rules).
fn format_named_fields(fields: &[(String, Slot)]) -> String {
    let pairs: Vec<String> = fields
        .iter()
        .map(|(name, slot)| {
            let value = match slot.try_borrow() {
                Ok(value) => display_element(&value),
                Err(_) => "(unreadable)".to_string(),
            };
            format!("{name}: {value}")
        })
        .collect();
    format!("{{ {} }}", pairs.join(", "))
}
