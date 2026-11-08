//! Diagnostics — the teacher's voice (plan §5.6).
//!
//! Every error Tic can raise is one [`TicError`] variant carrying a code
//! (`T0xxx` lex, `T1xxx` parse, `T2xxx` type, `T3xxx` runtime, `T4xxx`
//! CLI/usage), a plain-language message, an optional span label and an
//! optional hint. Rendering goes through miette so students see the same
//! friendly box for every pipeline stage.

pub mod hints;
mod text;

use crate::util::Span;
use miette::{Diagnostic, LabeledSpan};
use std::fmt;

/// Which pipeline stage failed. Decides the error's code family (§5.6)
/// and the process exit code (§7): only [`Family::Runtime`] exits 2.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Family {
    Lex,
    Parse,
    Type,
    Runtime,
    Cli,
}

impl Family {
    pub fn code_prefix(self) -> &'static str {
        match self {
            Family::Lex => "T0",
            Family::Parse => "T1",
            Family::Type => "T2",
            Family::Runtime => "T3",
            Family::Cli => "T4",
        }
    }

    /// §7: `0` success · `1` compile/usage · `2` runtime.
    pub fn exit_code(self) -> u8 {
        match self {
            Family::Runtime => 2,
            _ => 1,
        }
    }
}

/// Every error in Tic. Variants arrive with their phase; the code numbers
/// are stable once shipped (tests depend on them).
#[derive(Debug, Clone)]
pub enum TicError {
    // ---- T0xxx: lexer --------------------------------------------------
    /// A `"` was never closed before the line/file ended.
    UnterminatedString { span: Span },
    /// A `'` was never closed before the line/file ended.
    UnterminatedChar { span: Span },
    /// `''` — nothing between the quotes.
    EmptyCharLiteral { span: Span },
    /// `'ab'` — more than one character.
    MultiCharLiteral { span: Span },
    /// `\q` — an escape Tic does not define.
    UnknownEscape { span: Span, ch: char },
    /// `~`, `^`, a lone `|`, or any non-ASCII letter in an identifier.
    UnknownCharacter { span: Span, ch: char },
    /// `1.2.3`, `123abc`, `1_` — text that starts like a number but is not one.
    InvalidNumber { span: Span, text: String },
    /// A literal that does not fit in `i64` / `f64`.
    NumberTooLarge { span: Span, text: String },
    /// One of §2.2's reserved-for-future words (`match`, `import`, …).
    ReservedWord { span: Span, word: String },
    /// A `/*` that never found its `*/`.
    UnterminatedComment { span: Span },

    // ---- T1xxx: parser ----------------------------------------------------
    /// A token that cannot appear where the grammar needs something else.
    UnexpectedToken { span: Span, expected: String, found: String },
    /// `Foo x` where `Foo` is not a declared class or enum — Tic's only
    /// named types. `suggestion` is the did-you-mean guess, if any.
    UnknownType { span: Span, name: String, suggestion: Option<String> },
    /// `1 = 2` — the left side of an assignment is not something you can
    /// assign into (a variable, field, index or `*pointer`).
    InvalidAssignmentTarget { span: Span },
    /// The *second* `=` of `x = y = 5` — assignment is a statement in Tic,
    /// not an expression, so it cannot nest. `op` is the operator found.
    AssignmentNotExpression { span: Span, op: String },
    /// `i32** p` / `i32[][3] a` — a second `[]`, `[N]` or `*` on one type.
    TypeSuffixNotAllowed { span: Span },

    // ---- T2xxx: type checker (phase 3) --------------------------------------
    /// The same name declared twice in one scope (or twice at top level).
    /// `first` is where the earlier declaration lives, `what` names its
    /// kind ("a variable", "a function", "a field", …).
    DuplicateDecl { span: Span, name: String, first: Span, what: String },
    /// `final x;` with no value — defensive: the parser also rejects this.
    FinalNeedsInit { span: Span, name: String },
    /// A value of one type used where another was promised. `context`
    /// names the spot ("the initializer of `x`", "argument 1 of `f`",
    /// "the return value"), `hint` carries a cast suggestion when one
    /// applies.
    TypeMismatch {
        span: Span,
        context: String,
        expected: String,
        found: String,
        hint: Option<String>,
    },
    /// An `if` / `while` / `for` condition that is not a bool.
    NotBoolCondition { span: Span, found: String },
    /// A name with no matching variable. `note` explains near-misses the
    /// checker recognises ("`State` is an enum — write `State.Idle`").
    UnknownVariable {
        span: Span,
        name: String,
        suggestion: Option<String>,
        note: Option<String>,
    },
    /// A call to a name that is not a function (or not declared at all).
    UnknownFunction {
        span: Span,
        name: String,
        suggestion: Option<String>,
        note: Option<String>,
    },
    /// A call (or `new`) with the wrong number of arguments.
    WrongArity { span: Span, name: String, expected: usize, found: usize },
    /// `obj.name` where the class or known obj shape has no such field.
    UnknownField {
        span: Span,
        owner: String,
        field: String,
        suggestion: Option<String>,
        note: Option<String>,
    },
    /// `obj.name(…)` where the class has no such method. `note` explains
    /// near-misses the checker recognises ("objs hold fields, not
    /// methods — read it without the `(…)`").
    UnknownMethod {
        span: Span,
        owner: String,
        method: String,
        suggestion: Option<String>,
        note: Option<String>,
    },
    /// `Enum.Name` where the enum declares no variant `Name`.
    UnknownEnumVariant {
        span: Span,
        enum_name: String,
        variant: String,
        suggestion: Option<String>,
    },
    /// `new Name(…)` with no class `Name`.
    UnknownClass { span: Span, name: String, suggestion: Option<String> },
    /// A binary or unary operator applied to types it does not accept
    /// (`i32 + f64`, `i32 + str`, `bool - bool`, …).
    InvalidOperands {
        span: Span,
        op: String,
        lhs: String,
        rhs: String,
        hint: Option<String>,
    },
    /// `==` / `!=` between values that do not compare (cross-enum, objs,
    /// arrays, bool against a number, …).
    InvalidEquality { span: Span, op: String, lhs: String, rhs: String, hint: String },
    /// `*x` where `x` is not a pointer.
    DerefOfNonPointer { span: Span, found: String },
    /// `&x` where `x` is not a place (a variable, field, index or `*p`).
    AddrOfNonPlace { span: Span },
    /// A cast the cast table does not allow (`bool(1)`, `i32(c)`, …).
    InvalidCast { span: Span, to: String, from: String, hint: String },
    /// A `size_of` argument that is not a scalar type name.
    SizeOfArg { span: Span, found: String },
    /// A bare type name used where a value is expected (`x = i32;`).
    TypeNameNotValue { span: Span, name: String },
    /// Indexing something that is not an array.
    IndexNonArray { span: Span, found: String },
    /// An array index that is not an integer.
    IndexNotInt { span: Span, found: String },
    /// Assigning to a `final` name.
    AssignToFinal { span: Span, name: String },
    /// Assigning to something that is not a variable (a function, class,
    /// enum or `this`).
    NotAssignable { span: Span, name: String, what: String },
    /// Writing a field that a known obj shape does not have — objs cannot
    /// grow new fields.
    AddObjField { span: Span, field: String, suggestion: Option<String> },
    /// Two different obj shapes where one was expected (assignment,
    /// argument, return, or two returns from one function).
    ShapeMismatch { span: Span, context: String, expected: String, found: String },
    /// `this` outside a class method.
    ThisOutsideMethod { span: Span },
    /// Calling something that is not a function (a variable, a field, …).
    NotCallable { span: Span, what: String },

    // ---- T3xxx: runtime (interpreter, phase 4) ---------------------------
    /// Width-checked arithmetic refused to run: `detail` spells the whole
    /// story, e.g. `i8 overflow (127 + 1)` (§2.6 rule 1).
    NumericOverflow { span: Span, detail: String },
    /// `1 / 0`, `1 % 0`, `1.0 / 0.0` — `what` names the operation
    /// ("integer division", "float remainder", …).
    DivisionByZero { span: Span, what: &'static str },
    /// Recursion deeper than `--max-depth` (§2.6 rule 5). `depth` is the
    /// limit that was hit.
    TooMuchRecursion { span: Span, depth: u32 },
    /// A cast that only fails while the program runs: `i32("abc")` parses,
    /// `char(1114112)` is not a code point. `text` is the offending input.
    CastFailed { span: Span, to: String, text: String },
    /// An expression nested deeper than the interpreter will walk — the
    /// Rust-stack guard (§12) that keeps "never a native crash" true.
    TooDeeplyNested { span: Span },
    /// The interpreter tripped over itself (§5.5): a double `RefCell`
    /// borrow, a value the checker guaranteed but was not there. A bug in
    /// Tic, never in the student's program.
    InternalError { span: Span, what: String },
    /// An array access the bounds check refused (§2.6 rule 2): `detail`
    /// spells the whole story, naming the index and the length (or why
    /// the array has nothing to give: `cannot pop from an empty array`).
    OutOfBounds { span: Span, detail: String },
    /// Following a `null` pointer (§2.6 rule 3) — read or write, `*p`.
    NullDeref { span: Span },
    /// A `.name` lookup on a bare `obj` — the §5.4 escape hatch only the
    /// runtime can check: the obj does not have that field (objs have no
    /// methods at all in v1, so a method call lands here too). `fields`
    /// lists what the receiver *does* have (its fields — or, for a
    /// method missing on an instance, its class's methods), so the error
    /// can teach.
    MissingField {
        span: Span,
        /// "field" or "method" — which kind of member was looked up.
        kind: &'static str,
        name: String,
        fields: Vec<String>,
        suggestion: Option<String>,
    },
    /// A function promised a value that has **no zero value** (a bare
    /// `obj`, §2.1) and reached its end without returning one (phase 6's
    /// known edge, now its own friendly code instead of the T3006
    /// internal backstop). `span` is the call that got no value back.
    MissingReturnValue { span: Span, function: String, ty: String },

    // ---- T4xxx: CLI / usage ---------------------------------------------
    /// A pipeline stage that a later phase implements (keeps every phase
    /// testable instead of panicking).
    NotImplemented { what: &'static str, phase: u8 },
    /// The file could not be read.
    CannotReadFile { path: String, cause: String },
    /// The user asked for something nonsensical (e.g. two modes at once).
    Usage { message: String },
}

impl TicError {
    /// Which family (and therefore code prefix / exit code) this error is.
    pub fn family(&self) -> Family {
        match self {
            TicError::UnterminatedString { .. }
            | TicError::UnterminatedChar { .. }
            | TicError::EmptyCharLiteral { .. }
            | TicError::MultiCharLiteral { .. }
            | TicError::UnknownEscape { .. }
            | TicError::UnknownCharacter { .. }
            | TicError::InvalidNumber { .. }
            | TicError::NumberTooLarge { .. }
            | TicError::ReservedWord { .. }
            | TicError::UnterminatedComment { .. } => Family::Lex,
            TicError::UnexpectedToken { .. }
            | TicError::UnknownType { .. }
            | TicError::InvalidAssignmentTarget { .. }
            | TicError::AssignmentNotExpression { .. }
            | TicError::TypeSuffixNotAllowed { .. } => Family::Parse,
            TicError::DuplicateDecl { .. }
            | TicError::FinalNeedsInit { .. }
            | TicError::TypeMismatch { .. }
            | TicError::NotBoolCondition { .. }
            | TicError::UnknownVariable { .. }
            | TicError::UnknownFunction { .. }
            | TicError::WrongArity { .. }
            | TicError::UnknownField { .. }
            | TicError::UnknownMethod { .. }
            | TicError::UnknownEnumVariant { .. }
            | TicError::UnknownClass { .. }
            | TicError::InvalidOperands { .. }
            | TicError::InvalidEquality { .. }
            | TicError::DerefOfNonPointer { .. }
            | TicError::AddrOfNonPlace { .. }
            | TicError::InvalidCast { .. }
            | TicError::SizeOfArg { .. }
            | TicError::TypeNameNotValue { .. }
            | TicError::IndexNonArray { .. }
            | TicError::IndexNotInt { .. }
            | TicError::AssignToFinal { .. }
            | TicError::NotAssignable { .. }
            | TicError::AddObjField { .. }
            | TicError::ShapeMismatch { .. }
            | TicError::ThisOutsideMethod { .. }
            | TicError::NotCallable { .. } => Family::Type,
            TicError::NumericOverflow { .. }
            | TicError::DivisionByZero { .. }
            | TicError::TooMuchRecursion { .. }
            | TicError::CastFailed { .. }
            | TicError::TooDeeplyNested { .. }
            | TicError::InternalError { .. }
            | TicError::OutOfBounds { .. }
            | TicError::NullDeref { .. }
            | TicError::MissingField { .. }
            | TicError::MissingReturnValue { .. } => Family::Runtime,
            TicError::NotImplemented { .. }
            | TicError::CannotReadFile { .. }
            | TicError::Usage { .. } => Family::Cli,
        }
    }

    /// The stable error code, e.g. `T0001` or `T4001` (family + index).
    pub fn error_code(&self) -> String {
        let index: u16 = match self {
            TicError::UnterminatedString { .. } => 1,
            TicError::UnterminatedChar { .. } => 2,
            TicError::EmptyCharLiteral { .. } => 3,
            TicError::MultiCharLiteral { .. } => 4,
            TicError::UnknownEscape { .. } => 5,
            TicError::UnknownCharacter { .. } => 6,
            TicError::InvalidNumber { .. } => 7,
            TicError::NumberTooLarge { .. } => 8,
            TicError::ReservedWord { .. } => 9,
            TicError::UnterminatedComment { .. } => 10,
            TicError::UnexpectedToken { .. } => 1,
            TicError::UnknownType { .. } => 2,
            TicError::InvalidAssignmentTarget { .. } => 3,
            TicError::AssignmentNotExpression { .. } => 4,
            TicError::TypeSuffixNotAllowed { .. } => 5,
            TicError::DuplicateDecl { .. } => 1,
            TicError::FinalNeedsInit { .. } => 2,
            TicError::TypeMismatch { .. } => 3,
            TicError::NotBoolCondition { .. } => 4,
            TicError::UnknownVariable { .. } => 5,
            TicError::UnknownFunction { .. } => 6,
            TicError::WrongArity { .. } => 7,
            TicError::UnknownField { .. } => 8,
            TicError::UnknownMethod { .. } => 9,
            TicError::UnknownEnumVariant { .. } => 10,
            TicError::UnknownClass { .. } => 11,
            TicError::InvalidOperands { .. } => 12,
            TicError::InvalidEquality { .. } => 13,
            TicError::DerefOfNonPointer { .. } => 14,
            TicError::AddrOfNonPlace { .. } => 15,
            TicError::InvalidCast { .. } => 16,
            TicError::SizeOfArg { .. } => 17,
            TicError::TypeNameNotValue { .. } => 18,
            TicError::IndexNonArray { .. } => 19,
            TicError::IndexNotInt { .. } => 20,
            TicError::AssignToFinal { .. } => 21,
            TicError::NotAssignable { .. } => 22,
            TicError::AddObjField { .. } => 23,
            TicError::ShapeMismatch { .. } => 24,
            TicError::ThisOutsideMethod { .. } => 25,
            TicError::NotCallable { .. } => 26,
            TicError::NumericOverflow { .. } => 1,
            TicError::DivisionByZero { .. } => 2,
            TicError::TooMuchRecursion { .. } => 3,
            TicError::CastFailed { .. } => 4,
            TicError::TooDeeplyNested { .. } => 5,
            TicError::InternalError { .. } => 6,
            TicError::OutOfBounds { .. } => 7,
            TicError::NullDeref { .. } => 8,
            TicError::MissingField { .. } => 9,
            TicError::MissingReturnValue { .. } => 10,
            TicError::NotImplemented { .. } => 1,
            TicError::CannotReadFile { .. } => 2,
            TicError::Usage { .. } => 3,
        };
        format!("{}{:03}", self.family().code_prefix(), index)
    }
}

// The three "teacher's voice" methods — `message`, `label` and `hint` —
// live in the sibling `text.rs` impl block, one arm per variant.

impl fmt::Display for TicError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}", self.message())
    }
}

impl std::error::Error for TicError {}

impl Diagnostic for TicError {
    fn code(&self) -> Option<Box<dyn fmt::Display + '_>> {
        Some(Box::new(self.error_code()))
    }

    fn labels(&self) -> Option<Box<dyn Iterator<Item = LabeledSpan> + '_>> {
        self.label().map(|(span, text)| {
            let labeled = LabeledSpan::new(Some(text), span.start, span.len());
            Box::new(std::iter::once(labeled)) as Box<dyn Iterator<Item = LabeledSpan> + '_>
        })
    }

    fn help(&self) -> Option<Box<dyn fmt::Display + '_>> {
        self.hint().map(|hint| Box::new(hint) as Box<dyn fmt::Display + '_>)
    }
}

/// Render an error that came from a source file, §5.6-style: code, message,
/// file name, line, label and hint, via miette's fancy handler.
pub fn render(err: &TicError, file_name: &str, source: &str) -> String {
    render_with(err, Some((file_name, source)))
}

/// Render an error with no source location (T4xxx usage errors).
pub fn render_plain(err: &TicError) -> String {
    render_with(err, None)
}

fn render_with(err: &TicError, source: Option<(&str, &str)>) -> String {
    use miette::{GraphicalReportHandler, NamedSource, Report};

    let handler = GraphicalReportHandler::new();
    let report = Report::new(err.clone());
    let report = match source {
        Some((name, src)) => {
            report.with_source_code(NamedSource::new(name.to_string(), src.to_string()))
        }
        None => report,
    };
    let mut out = String::new();
    handler
        .render_report(&mut out, report.as_ref())
        .expect("rendering into a String cannot fail");
    out
}

#[cfg(test)]
mod snapshots;
#[cfg(test)]
mod tests;
