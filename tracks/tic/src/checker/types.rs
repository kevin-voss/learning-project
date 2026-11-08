//! The checker's type world (plan §4.4, §5.4): [`TicType`] (what a value's
//! type *is* once the written [`crate::ast::AstType`] is resolved),
//! [`Shape`] / [`ShapeTable`] (the anonymous obj types, interned so that
//! "same fields, same types" is one `ShapeId`), and the [`CheckedProgram`]
//! the interpreter consumes — plus the side tables that attach resolved
//! types back onto the AST.
//!
//! Two additions beyond §4.4's sketch, both deliberate:
//!
//! * **No `Null` type.** A `null` literal only type-checks in pointer
//!   contexts (`i32* p = null;`, `p == null`); pointer-ness is a type,
//!   null-ness is a *value*. `Dynamic` covers the rest.
//! * **`Dynamic`** — the static type of a field read on a *bare* `obj`
//!   (a parameter declared just `obj`, §5.4's one dynamic escape hatch).
//!   It is compatible with everything; the runtime re-checks.

use crate::ast::{Block, Stmt};
use crate::util::Span;
use std::collections::{BTreeMap, HashMap};
use std::fmt;

/// A resolved type. Names (`Class`, `Enum`) are compared by name; obj
/// types by interned shape; arrays and pointers structurally.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TicType {
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
    Bool,
    Char,
    Str,
    /// `T[N]` — size locked at the declaration.
    FixedArray(Box<TicType>, usize),
    /// `T[]` — growable, reference semantics.
    DynArray(Box<TicType>),
    /// An anonymous obj type. [`ShapeId::BARE`] is the *bare* `obj` (a
    /// declared type with no known shape — runtime field checks).
    Obj(ShapeId),
    /// A class instance (by class name).
    Class(String),
    /// One value of an enum (by enum name).
    Enum(String),
    /// `T*`.
    Pointer(Box<TicType>),
    /// The type of `return;` and of functions without `-> type`.
    Unit,
    /// "Not statically known" — only reachable through a bare `obj`
    /// field. Compatible with everything; checked at runtime.
    Dynamic,
}

impl TicType {
    /// Any of the eight integer types.
    pub fn is_int(&self) -> bool {
        matches!(
            self,
            TicType::I8
                | TicType::I16
                | TicType::I32
                | TicType::I64
                | TicType::U8
                | TicType::U16
                | TicType::U32
                | TicType::U64
        )
    }

    pub fn is_float(&self) -> bool {
        matches!(self, TicType::F32 | TicType::F64)
    }

    pub fn is_numeric(&self) -> bool {
        self.is_int() || self.is_float()
    }

    /// The single-value types a cast or `size_of` can name.
    pub fn is_scalar(&self) -> bool {
        self.is_numeric() || matches!(self, TicType::Bool | TicType::Char | TicType::Str)
    }

    pub fn is_array(&self) -> bool {
        matches!(self, TicType::FixedArray(..) | TicType::DynArray(..))
    }

    /// Element type if this is an array.
    pub fn elem(&self) -> Option<&TicType> {
        match self {
            TicType::FixedArray(elem, _) | TicType::DynArray(elem) => Some(elem),
            _ => None,
        }
    }

    /// The type as a short noun for messages: `i32`, `i32[5]`, `i32[]`,
    /// `Counter`, `i32*`. Obj shapes render as `obj` here — use
    /// [`render_with`] when the field list matters.
    pub fn name(&self) -> String {
        match self {
            TicType::I8 => "i8".into(),
            TicType::I16 => "i16".into(),
            TicType::I32 => "i32".into(),
            TicType::I64 => "i64".into(),
            TicType::U8 => "u8".into(),
            TicType::U16 => "u16".into(),
            TicType::U32 => "u32".into(),
            TicType::U64 => "u64".into(),
            TicType::F32 => "f32".into(),
            TicType::F64 => "f64".into(),
            TicType::Bool => "bool".into(),
            TicType::Char => "char".into(),
            TicType::Str => "str".into(),
            TicType::FixedArray(elem, n) => format!("{}[{n}]", elem.name()),
            TicType::DynArray(elem) => format!("{}[]", elem.name()),
            TicType::Obj(_) => "obj".into(),
            TicType::Class(name) => name.clone(),
            TicType::Enum(name) => name.clone(),
            TicType::Pointer(pointee) => format!("{}*", pointee.name()),
            TicType::Unit => "unit".into(),
            TicType::Dynamic => "an unknown type (from a bare obj field)".into(),
        }
    }

    /// Bytes a scalar type occupies (README's `size_of` table); `None`
    /// for non-scalars. `char` is 4 — a whole Unicode code point.
    pub fn scalar_size(&self) -> Option<u32> {
        Some(match self {
            TicType::I8 | TicType::U8 | TicType::Bool => 1,
            TicType::I16 | TicType::U16 => 2,
            TicType::I32 | TicType::U32 | TicType::F32 | TicType::Char => 4,
            TicType::I64 | TicType::U64 | TicType::F64 => 8,
            _ => return None,
        })
    }
}

impl fmt::Display for TicType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.name())
    }
}

// ---- obj shapes (§5.4) ------------------------------------------------------

/// An interned reference to an obj shape. `BARE` (0) is reserved: the
/// declared-bare `obj` whose fields are checked at runtime.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct ShapeId(pub usize);

impl ShapeId {
    /// The bare `obj` type — a shape we do not know statically.
    pub const BARE: ShapeId = ShapeId(0);
}

/// An obj literal's type: field names → field types, in a `BTreeMap` so
/// two shapes are equal exactly when their field *sets* match — field
/// order in the literal never matters (§5.4).
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Shape {
    pub fields: BTreeMap<String, TicType>,
}

impl Shape {
    pub fn new(fields: impl IntoIterator<Item = (String, TicType)>) -> Self {
        Self { fields: fields.into_iter().collect() }
    }

    /// The shape spelled out for messages: `{ name: str, level: i32 }`
    /// (fields in name order — that is the one order that never lies).
    pub fn describe(&self) -> String {
        let fields: Vec<String> = self
            .fields
            .iter()
            .map(|(name, ty)| format!("{name}: {}", ty.name()))
            .collect();
        format!("{{{}}}", fields.join(", "))
    }
}

/// Interning table for shapes (§5.4): literals with the same field set
/// get the same [`ShapeId`], so "equal shape" is pointer-equal.
#[derive(Debug, Clone, Default)]
pub struct ShapeTable {
    /// `shapes[i]` is `ShapeId(i as usize + 1)`; index 0 is reserved for
    /// [`ShapeId::BARE`].
    shapes: Vec<Shape>,
}

impl ShapeTable {
    /// Register `shape`, reusing the id of an equal shape if there is one.
    pub fn intern(&mut self, shape: Shape) -> ShapeId {
        if let Some(i) = self.shapes.iter().position(|s| *s == shape) {
            return ShapeId(i + 1);
        }
        self.shapes.push(shape);
        ShapeId(self.shapes.len())
    }

    /// The shape behind an id — `None` for [`ShapeId::BARE`] (unknown).
    pub fn get(&self, id: ShapeId) -> Option<&Shape> {
        if id == ShapeId::BARE {
            None
        } else {
            self.shapes.get(id.0 - 1)
        }
    }

    pub fn len(&self) -> usize {
        self.shapes.len()
    }

    pub fn is_empty(&self) -> bool {
        self.shapes.is_empty()
    }

    /// Render a type for a message, spelling obj shapes out.
    pub fn render(&self, ty: &TicType) -> String {
        match ty {
            TicType::Obj(id) => match self.get(*id) {
                Some(shape) => format!("obj {}", shape.describe()),
                None => "obj (shape not known here)".into(),
            },
            TicType::FixedArray(elem, n) => format!("{}[{n}]", self.render(elem)),
            TicType::DynArray(elem) => format!("{}[]", self.render(elem)),
            TicType::Pointer(pointee) => format!("{}*", self.render(pointee)),
            other => other.name(),
        }
    }
}

// ---- the checked program (the interpreter's input) --------------------------

/// The type of one expression, keyed by the expression's span — phase 4
/// looks up `expr_types[expr.span()]` while walking the same tree.
#[derive(Debug, Clone, Default)]
pub struct ExprTypes {
    map: HashMap<Span, TicType>,
}

impl ExprTypes {
    pub fn insert(&mut self, span: Span, ty: TicType) {
        self.map.insert(span, ty);
    }

    pub fn get(&self, span: Span) -> Option<&TicType> {
        self.map.get(&span)
    }

    /// The recorded type, for callers that know the checker visited the
    /// expression (it records every one it walks).
    pub fn expect(&self, span: Span) -> &TicType {
        self.map
            .get(&span)
            .expect("the checker records a type for every expression it visits")
    }

    pub fn len(&self) -> usize {
        self.map.len()
    }
}

/// Resolved types of variable declarations, keyed by the declaration's
/// *name* span (works for params, locals, globals and `for` variables).
#[derive(Debug, Clone, Default)]
pub struct DeclTypes {
    map: HashMap<Span, TicType>,
}

impl DeclTypes {
    pub fn insert(&mut self, span: Span, ty: TicType) {
        self.map.insert(span, ty);
    }

    pub fn get(&self, span: Span) -> Option<&TicType> {
        self.map.get(&span)
    }
}

/// One checked parameter: name, resolved type, and where it was written.
#[derive(Debug, Clone)]
pub struct CheckedParam {
    pub name: String,
    pub ty: TicType,
    pub span: Span,
}

/// A checked function or method: resolved signature plus the original
/// body. Methods are the same shape — `this` is not among the params.
#[derive(Debug, Clone)]
pub struct CheckedFunction {
    pub name: String,
    pub params: Vec<CheckedParam>,
    pub return_ty: TicType,
    pub body: Block,
    pub span: Span,
}

/// A checked class: field layout, method table, and which method (if
/// any) is `init` — the one `new` forwards its arguments to.
#[derive(Debug, Clone)]
pub struct CheckedClass {
    pub name: String,
    /// Fields in declaration order.
    pub fields: Vec<(String, TicType)>,
    pub field_index: HashMap<String, usize>,
    /// Methods in declaration order (init included, if present).
    pub methods: Vec<CheckedFunction>,
    pub method_index: HashMap<String, usize>,
    /// Index into `methods` of the `init` method.
    pub init: Option<usize>,
    pub span: Span,
}

impl CheckedClass {
    pub fn field(&self, name: &str) -> Option<&TicType> {
        self.field_index.get(name).map(|&i| &self.fields[i].1)
    }

    pub fn method(&self, name: &str) -> Option<&CheckedFunction> {
        self.method_index.get(name).map(|&i| &self.methods[i])
    }
}

/// A checked enum: its closed set of variants, in order.
#[derive(Debug, Clone)]
pub struct CheckedEnum {
    pub name: String,
    pub variants: Vec<String>,
    pub span: Span,
}

/// Everything the interpreter needs, with every name and type resolved:
/// signatures, class layouts, enum variants, obj shapes, the top-level
/// statements, and the expression/declaration type side tables.
#[derive(Debug, Clone, Default)]
pub struct CheckedProgram {
    pub functions: Vec<CheckedFunction>,
    pub classes: Vec<CheckedClass>,
    pub enums: Vec<CheckedEnum>,
    pub shapes: ShapeTable,
    /// Top-level statements in run order (a clone of the AST's list).
    pub stmts: Vec<Stmt>,
    pub expr_types: ExprTypes,
    pub decl_types: DeclTypes,
}

impl CheckedProgram {
    pub fn function(&self, name: &str) -> Option<&CheckedFunction> {
        self.functions.iter().find(|f| f.name == name)
    }

    pub fn class(&self, name: &str) -> Option<&CheckedClass> {
        self.classes.iter().find(|c| c.name == name)
    }

    pub fn enum_(&self, name: &str) -> Option<&CheckedEnum> {
        self.enums.iter().find(|e| e.name == name)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn shapes_intern_order_free() {
        let mut table = ShapeTable::default();
        let a = table.intern(Shape::new([
            ("name".to_string(), TicType::Str),
            ("level".to_string(), TicType::I32),
        ]));
        let b = table.intern(Shape::new([
            ("level".to_string(), TicType::I32),
            ("name".to_string(), TicType::Str),
        ]));
        let c = table.intern(Shape::new([("name".to_string(), TicType::Str)]));
        assert_eq!(a, b, "field order must not matter");
        assert_ne!(a, c);
        assert_eq!(table.len(), 2);
        assert!(table.get(ShapeId::BARE).is_none());
    }

    #[test]
    fn type_names_render() {
        assert_eq!(TicType::I32.to_string(), "i32");
        assert_eq!(TicType::FixedArray(Box::new(TicType::I32), 5).to_string(), "i32[5]");
        assert_eq!(TicType::DynArray(Box::new(TicType::I32)).to_string(), "i32[]");
        assert_eq!(
            TicType::Pointer(Box::new(TicType::F64)).to_string(),
            "f64*"
        );
        assert_eq!(TicType::Class("Counter".into()).to_string(), "Counter");
    }

    #[test]
    fn scalar_sizes_match_the_readme_table() {
        let cases = [
            (TicType::I8, 1),
            (TicType::U8, 1),
            (TicType::Bool, 1),
            (TicType::I16, 2),
            (TicType::I32, 4),
            (TicType::F32, 4),
            (TicType::Char, 4),
            (TicType::I64, 8),
            (TicType::F64, 8),
        ];
        for (ty, bytes) in cases {
            assert_eq!(ty.scalar_size(), Some(bytes), "{ty}");
        }
        assert_eq!(TicType::Str.scalar_size(), None);
        assert_eq!(TicType::Class("C".into()).scalar_size(), None);
    }

    #[test]
    fn shape_describe_lists_fields_in_name_order() {
        let shape = Shape::new([
            ("zebra".to_string(), TicType::I32),
            ("alpha".to_string(), TicType::Str),
        ]);
        assert_eq!(shape.describe(), "{alpha: str, zebra: i32}");
    }
}
