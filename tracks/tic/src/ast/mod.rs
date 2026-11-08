//! The abstract syntax tree (plan §4.4).
//!
//! Every node carries the [`Span`] of the source text it came from, so the
//! checker (phase 3) and interpreter can underline exactly what they are
//! complaining about. The tree is purely *syntactic*: types here are the
//! written [`AstType`] (base name + one array/pointer suffix), and the
//! checker turns them into its own resolved `TicType`.
//!
//! A [`Program`] is split in two because Tic runs in two passes (§5.2):
//! `decls` are every top-level `function` / `class` / `enum` in source
//! order (collected first, so later declarations are usable earlier), and
//! `stmts` are the top-level statements that run top to bottom.

use crate::util::Span;
use std::fmt;

pub mod display;
pub mod ops;

pub use ops::*;

/// A whole parsed file: declarations first, then the statements to run.
#[derive(Debug, Clone, PartialEq)]
pub struct Program {
    pub decls: Vec<Decl>,
    pub stmts: Vec<Stmt>,
}

/// An identifier together with where it was written.
#[derive(Debug, Clone, PartialEq)]
pub struct Ident {
    pub name: String,
    pub span: Span,
}

impl Ident {
    pub fn new(name: impl Into<String>, span: Span) -> Self {
        Self { name: name.into(), span }
    }
}

// ---- declarations ---------------------------------------------------------

/// A top-level `function` / `class` / `enum` (§3 `declaration`).
#[derive(Debug, Clone, PartialEq)]
pub enum Decl {
    Function(FunctionDecl),
    Class(ClassDecl),
    Enum(EnumDecl),
}

/// `function name(params) [-> type] { … }` — `return_ty: None` means the
/// function returns unit (`function init() { … }` in the examples).
#[derive(Debug, Clone, PartialEq)]
pub struct FunctionDecl {
    pub name: Ident,
    pub params: Vec<Param>,
    pub return_ty: Option<AstType>,
    pub body: Block,
    pub span: Span,
}

/// One `type name` in a parameter list.
#[derive(Debug, Clone, PartialEq)]
pub struct Param {
    pub ty: AstType,
    pub name: Ident,
    pub span: Span,
}

/// `class Name { fields… methods… }` — methods are [`FunctionDecl`]s whose
/// bodies may use `this`.
#[derive(Debug, Clone, PartialEq)]
pub struct ClassDecl {
    pub name: Ident,
    pub fields: Vec<FieldDecl>,
    pub methods: Vec<FunctionDecl>,
    pub span: Span,
}

/// One `type name;` line inside a class body.
#[derive(Debug, Clone, PartialEq)]
pub struct FieldDecl {
    pub ty: AstType,
    pub name: Ident,
    pub span: Span,
}

/// `enum Name { Variant, … }` — variants are plain names; qualified uses
/// (`State.Idle`) are field accesses in expressions.
#[derive(Debug, Clone, PartialEq)]
pub struct EnumDecl {
    pub name: Ident,
    pub variants: Vec<Ident>,
    pub span: Span,
}

// ---- types (syntactic) ----------------------------------------------------

/// A type as it was *written*: a base name plus at most one array/pointer
/// suffix (§3 `type`). Resolving it is the checker's job.
#[derive(Debug, Clone, PartialEq)]
pub struct AstType {
    pub base: BaseTy,
    pub suffix: TypeSuffix,
    pub span: Span,
}

impl AstType {
    /// A plain base type with no suffix.
    pub fn base(base: BaseTy, span: Span) -> Self {
        Self { base, suffix: TypeSuffix::None, span }
    }

    /// The type spelled the way the student wrote it (`i32[5]`, `i32*`).
    pub fn to_source(&self) -> String {
        let mut out = self.base.to_source();
        out.push_str(match self.suffix {
            TypeSuffix::None => "",
            TypeSuffix::DynArray => "[]",
            TypeSuffix::FixedArray(n) => return format!("{out}[{n}]"),
            TypeSuffix::Pointer => "*",
        });
        out
    }
}

impl fmt::Display for AstType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(&self.to_source())
    }
}

/// The 14 builtin base types plus class/enum names (§2.1, §3 `base_type`).
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BaseTy {
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
    Obj,
    /// A class or enum name. Whether it exists is checked in phase 3.
    Named(String),
}

impl BaseTy {
    pub fn to_source(&self) -> String {
        match self {
            BaseTy::I8 => "i8",
            BaseTy::I16 => "i16",
            BaseTy::I32 => "i32",
            BaseTy::I64 => "i64",
            BaseTy::U8 => "u8",
            BaseTy::U16 => "u16",
            BaseTy::U32 => "u32",
            BaseTy::U64 => "u64",
            BaseTy::F32 => "f32",
            BaseTy::F64 => "f64",
            BaseTy::Bool => "bool",
            BaseTy::Char => "char",
            BaseTy::Str => "str",
            BaseTy::Obj => "obj",
            BaseTy::Named(name) => return name.clone(),
        }
        .into()
    }

    /// The builtin type names, for "did you mean" hints on unknown types.
    pub fn builtin_names() -> [&'static str; 14] {
        [
            "i8", "i16", "i32", "i64", "u8", "u16", "u32", "u64", "f32", "f64", "bool", "char",
            "str", "obj",
        ]
    }
}

/// The (at most one) suffix after a base type (§3 `type`).
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TypeSuffix {
    /// `T` — a plain value.
    None,
    /// `T[]` — dynamic array.
    DynArray,
    /// `T[N]` — fixed array.
    FixedArray(usize),
    /// `T*` — pointer.
    Pointer,
}

// ---- statements -----------------------------------------------------------

/// Every statement form (§2.4, §3 `statement`). Assignment is a statement,
/// never an expression.
#[derive(Debug, Clone, PartialEq)]
pub enum Stmt {
    /// `type name [= expr];` — `final` when `is_final` (init then required).
    VarDecl {
        ty: AstType,
        name: Ident,
        init: Option<Expr>,
        is_final: bool,
        span: Span,
    },
    /// `target op value;` with `op` one of `= += -= *= /=`.
    Assign {
        target: Expr,
        op: AssignOp,
        value: Expr,
        span: Span,
    },
    /// `if (cond) { … } [else if … | else { … }]` — braces mandatory, so
    /// there is no dangling `else`. `else_branch` holds the nested `if`
    /// statement for an else-if chain, or a block statement for `else`.
    If {
        cond: Expr,
        then_branch: Block,
        else_branch: Option<Box<Stmt>>,
        span: Span,
    },
    While { cond: Expr, body: Block, span: Span },
    /// `for (init; cond; update) { … }` — any of the three may be absent.
    /// `init` is a var-decl or an assignment; `update` an assignment.
    For {
        init: Option<Box<Stmt>>,
        cond: Option<Expr>,
        update: Option<Box<Stmt>>,
        body: Block,
        span: Span,
    },
    /// `return [expr];` — no value in a unit function.
    Return { value: Option<Expr>, span: Span },
    Block(Block),
    /// An expression evaluated for its effect (`print(…)`, calls, …).
    ExprStmt { expr: Expr, span: Span },
}

/// `{ statements… }` — a scope. Function bodies and every branch body.
#[derive(Debug, Clone, PartialEq)]
pub struct Block {
    pub stmts: Vec<Stmt>,
    pub span: Span,
}

// ---- expressions ----------------------------------------------------------

/// Every expression form (§3 `expr`, precedence encoded by the parser's
/// grammar layering). Every variant carries its span.
#[derive(Debug, Clone, PartialEq)]
pub enum Expr {    IntLit { value: i64, span: Span },
    FloatLit { value: f64, span: Span },
    StrLit { value: String, span: Span },
    CharLit { value: char, span: Span },
    BoolLit { value: bool, span: Span },
    /// `null` — the zero pointer.
    NullLit { span: Span },
    /// `this` inside a method body.
    This { span: Span },
    /// A named value. Class/enum names also start here until the checker
    /// tells them apart (`State.Idle` is a field access on `State`).
    Ident(Ident),
    /// `lhs op rhs` — precedence per §2.3.
    Binary {
        op: BinaryOp,
        lhs: Box<Expr>,
        rhs: Box<Expr>,
        span: Span,
    },
    /// `!x`, `-x`, `&x` (address-of), `*x` (deref).
    Unary {
        op: UnaryOp,
        operand: Box<Expr>,
        span: Span,
    },
    /// `callee(args…)` — callee is any postfix expression.
    Call {
        callee: Box<Expr>,
        args: Vec<Expr>,
        span: Span,
    },
    /// `obj[index]`.
    Index {
        obj: Box<Expr>,
        index: Box<Expr>,
        span: Span,
    },
    /// `obj.name` — a field, a method (before a call postfix) or an enum
    /// variant (`State.Idle`).
    Field {
        obj: Box<Expr>,
        name: Ident,
        span: Span,
    },
    /// `[a, b, c]` — element type comes from context (checker).
    ArrayLit { elems: Vec<Expr>, span: Span },
    /// `{ retries: 3, enabled: true }` — only in expression position; a
    /// `{` at statement start is always a block.
    ObjLit { fields: Vec<(Ident, Expr)>, span: Span },
    /// `i32(x)`, `char(65)`, … — casts are syntax, not builtin calls.
    Cast { ty: AstType, expr: Box<Expr>, span: Span },
    /// A base type used where an expression is expected — the only legal
    /// use is as an argument, e.g. `size_of(i32)`. Restricted by the
    /// checker; the grammar has no other way to spell that argument.
    TypeName { ty: AstType, span: Span },
    /// `new ClassName(args…)`.
    New {
        class: Ident,
        args: Vec<Expr>,
        span: Span,
    },
}

impl Expr {
    /// Where this expression was written — the checker and interpreter
    /// underline it when a node misbehaves.
    pub fn span(&self) -> Span {
        match self {
            Expr::IntLit { span, .. }
            | Expr::FloatLit { span, .. }
            | Expr::StrLit { span, .. }
            | Expr::CharLit { span, .. }
            | Expr::BoolLit { span, .. }
            | Expr::NullLit { span }
            | Expr::This { span }
            | Expr::Binary { span, .. }
            | Expr::Unary { span, .. }
            | Expr::Call { span, .. }
            | Expr::Index { span, .. }
            | Expr::Field { span, .. }
            | Expr::ArrayLit { span, .. }
            | Expr::ObjLit { span, .. }
            | Expr::Cast { span, .. }
            | Expr::TypeName { span, .. }
            | Expr::New { span, .. } => *span,
            Expr::Ident(name) => name.span,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn types_round_trip_to_source() {
        let span = Span::new(0, 1);
        let cases = [
            (AstType::base(BaseTy::I32, span), "i32"),
            (AstType::base(BaseTy::Named("Counter".into()), span), "Counter"),
        ];
        for (ty, text) in cases {
            assert_eq!(ty.to_source(), text);
            assert_eq!(ty.to_string(), text);
        }
        assert_eq!(
            AstType { base: BaseTy::I32, suffix: TypeSuffix::FixedArray(5), span }.to_source(),
            "i32[5]"
        );
        assert_eq!(
            AstType { base: BaseTy::I32, suffix: TypeSuffix::DynArray, span }.to_source(),
            "i32[]"
        );
        assert_eq!(
            AstType { base: BaseTy::Named("Counter".into()), suffix: TypeSuffix::Pointer, span }
                .to_source(),
            "Counter*"
        );
    }

    #[test]
    fn builtin_names_cover_the_14_base_types() {
        assert_eq!(BaseTy::builtin_names().len(), 14);
        assert!(BaseTy::builtin_names().contains(&"i32"));
        assert!(BaseTy::builtin_names().contains(&"obj"));
    }
}
