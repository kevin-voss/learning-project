//! Diagnostics unit tests: code families, exit codes, label/hint coverage
//! for every lexer + parser error, and the §5.6 rendering.

use super::*;
use TicError::{self as E};

#[test]
fn codes_match_families() {
    assert_eq!(E::UnterminatedString { span: Span::new(0, 1) }.error_code(), "T0001");
    assert_eq!(E::UnterminatedComment { span: Span::new(0, 2) }.error_code(), "T0010");
    assert_eq!(E::NotImplemented { what: "the REPL", phase: 8 }.error_code(), "T4001");
    assert_eq!(E::Usage { message: "no".into() }.error_code(), "T4003");
}

#[test]
fn parse_error_codes_are_t1xxx() {
    assert_eq!(
        E::UnexpectedToken {
            span: Span::new(0, 1),
            expected: "`;`".into(),
            found: "`x`".into(),
        }
        .error_code(),
        "T1001"
    );
    assert_eq!(
        E::UnknownType { span: Span::new(0, 3), name: "Foo".into(), suggestion: None }.error_code(),
        "T1002"
    );
    assert_eq!(E::InvalidAssignmentTarget { span: Span::new(0, 1) }.error_code(), "T1003");
    assert_eq!(
        E::AssignmentNotExpression { span: Span::new(6, 7), op: "=".into() }.error_code(),
        "T1004"
    );
    assert_eq!(E::TypeSuffixNotAllowed { span: Span::new(4, 5) }.error_code(), "T1005");
}

#[test]
fn families_map_to_exit_codes() {
    assert_eq!(Family::Lex.exit_code(), 1);
    assert_eq!(Family::Parse.exit_code(), 1);
    assert_eq!(Family::Type.exit_code(), 1);
    assert_eq!(Family::Cli.exit_code(), 1);
    assert_eq!(Family::Runtime.exit_code(), 2);
}

#[test]
fn every_error_has_a_hint_and_source_errors_have_labels() {
    let all = vec![
        E::UnterminatedString { span: Span::new(0, 1) },
        E::UnterminatedChar { span: Span::new(0, 1) },
        E::EmptyCharLiteral { span: Span::new(0, 2) },
        E::MultiCharLiteral { span: Span::new(0, 3) },
        E::UnknownEscape { span: Span::new(0, 2), ch: 'q' },
        E::UnknownCharacter { span: Span::new(0, 1), ch: '~' },
        E::InvalidNumber { span: Span::new(0, 5), text: "1.2.3".into() },
        E::NumberTooLarge { span: Span::new(0, 20), text: "9…9".into() },
        E::ReservedWord { span: Span::new(0, 5), word: "match".into() },
        E::UnterminatedComment { span: Span::new(0, 2) },
        // parser (phase 2)
        E::UnexpectedToken { span: Span::new(0, 1), expected: "`;`".into(), found: "`}`".into() },
        E::UnknownType { span: Span::new(0, 3), name: "Foo".into(), suggestion: None },
        E::UnknownType {
            span: Span::new(0, 5),
            name: "Countre".into(),
            suggestion: Some("Counter".into()),
        },
        E::InvalidAssignmentTarget { span: Span::new(0, 1) },
        E::AssignmentNotExpression { span: Span::new(6, 7), op: "+=".into() },
        E::TypeSuffixNotAllowed { span: Span::new(4, 5) },
        // CLI
        E::NotImplemented { what: "type checking", phase: 3 },
        E::CannotReadFile { path: "x.tic".into(), cause: "nope".into() },
        E::Usage { message: "pick one".into() },
    ];
    for err in &all {
        assert!(err.hint().is_some(), "{} needs a hint", err.error_code());
        // Everything except the T4xxx family is tied to a source location.
        if err.family() != Family::Cli {
            assert!(err.label().is_some(), "{} needs a label", err.error_code());
        }
    }
}

#[test]
fn unknown_type_hint_names_the_suggestion() {
    let err = E::UnknownType {
        span: Span::new(0, 7),
        name: "Countre".into(),
        suggestion: Some("Counter".into()),
    };
    assert!(err.hint().unwrap().contains("did you mean `Counter`"));
}

#[test]
fn renders_code_label_and_hint_like_the_plan() {
    // "str s = " is 8 bytes, so the string literal starts at 8.
    let src = "str s = \"oops";
    let err = E::UnterminatedString { span: Span::new(8, 14) };
    let out = render(&err, "bad.tic", src);
    assert!(out.contains("T0001"), "code missing:\n{out}");
    assert!(out.contains("unterminated string"), "message missing:\n{out}");
    assert!(out.contains("bad.tic"), "file name missing:\n{out}");
    assert!(out.contains("closing"), "hint missing:\n{out}");
}

#[test]
fn renders_a_parse_error_with_expected_and_found() {
    let src = "i32 x = ;";
    // The `;` sits at byte offset 8.
    let err = E::UnexpectedToken {
        span: Span::new(8, 9),
        expected: "an expression".into(),
        found: "`;`".into(),
    };
    let out = render(&err, "semi.tic", src);
    assert!(out.contains("T1001"), "code missing:\n{out}");
    assert!(out.contains("expected an expression"), "message missing:\n{out}");
    assert!(out.contains("statement forms"), "hint missing:\n{out}");
}

#[test]
fn plain_render_skips_the_source_box() {
    let err = E::NotImplemented { what: "the REPL", phase: 8 };
    let out = render_plain(&err);
    assert!(out.contains("T4001"));
    assert!(out.contains("REPL"));
}

// ---- the error-code reference (docs/errors.md) ---------------------------
//
// Phase 7 (§10 row 7): every T0xxx–T4xxx code with its family, its
// plain-language message and its typical cause, in `docs/errors.md`.
// The page is GENERATED from the enum — [`every_variant`] walks one
// representative of every `TicError` variant and [`typical_cause`] is
// an exhaustive match (a new variant breaks compilation until it gets
// a cause) — so the reference cannot drift from the code.
//
// **Update recipe:** after adding a variant (or deliberately rewording
// a message), extend `every_variant`/`typical_cause`, then run
// `TIC_UPDATE_ERROR_DOCS=1 cargo test --lib error_docs` and commit
// `docs/errors.md` with the change. Never edit the file by hand.

/// One representative of every `TicError` variant, with example values
/// chosen so `message()` reads like a real student program.
fn every_variant() -> Vec<TicError> {
    let span = || Span::new(0, 1);
    vec![
        // T0 — lex
        E::UnterminatedString { span: span() },
        E::UnterminatedChar { span: span() },
        E::EmptyCharLiteral { span: span() },
        E::MultiCharLiteral { span: span() },
        E::UnknownEscape { span: span(), ch: 'q' },
        E::UnknownCharacter { span: span(), ch: '~' },
        E::InvalidNumber { span: span(), text: "1.2.3".into() },
        E::NumberTooLarge { span: span(), text: "99999999999999999999".into() },
        E::ReservedWord { span: span(), word: "match".into() },
        E::UnterminatedComment { span: span() },
        // T1 — parse
        E::UnexpectedToken { span: span(), expected: "an expression".into(), found: "`;`".into() },
        E::UnknownType { span: span(), name: "Countre".into(), suggestion: Some("Counter".into()) },
        E::InvalidAssignmentTarget { span: span() },
        E::AssignmentNotExpression { span: span(), op: "=".into() },
        E::TypeSuffixNotAllowed { span: span() },
        // T2 — type
        E::DuplicateDecl {
            span: span(),
            name: "x".into(),
            first: Span::new(0, 1),
            what: "a variable".into(),
        },
        E::FinalNeedsInit { span: span(), name: "MAX".into() },
        E::TypeMismatch {
            span: span(),
            context: "the initializer of `x`".into(),
            expected: "i32".into(),
            found: "str".into(),
            hint: Some("Tic never converts silently — cast it: `i32(value)`".into()),
        },
        E::NotBoolCondition { span: span(), found: "i32".into() },
        E::UnknownVariable {
            span: span(),
            name: "cont".into(),
            suggestion: Some("count".into()),
            note: None,
        },
        E::UnknownFunction {
            span: span(),
            name: "prnt".into(),
            suggestion: Some("print".into()),
            note: None,
        },
        E::WrongArity { span: span(), name: "double".into(), expected: 1, found: 2 },
        E::UnknownField {
            span: span(),
            owner: "class Counter".into(),
            field: "cont".into(),
            suggestion: Some("count".into()),
            note: None,
        },
        E::UnknownMethod {
            span: span(),
            owner: "class Counter".into(),
            method: "bumm".into(),
            suggestion: Some("bump".into()),
            note: None,
        },
        E::UnknownEnumVariant {
            span: span(),
            enum_name: "State".into(),
            variant: "Idel".into(),
            suggestion: Some("Idle".into()),
        },
        E::UnknownClass { span: span(), name: "Countre".into(), suggestion: Some("Counter".into()) },
        E::InvalidOperands {
            span: span(),
            op: "+".into(),
            lhs: "i32".into(),
            rhs: "f64".into(),
            hint: Some("Tic never converts silently — cast it: `f64(value)`".into()),
        },
        E::InvalidEquality {
            span: span(),
            op: "==".into(),
            lhs: "State".into(),
            rhs: "Light".into(),
            hint: "enums only compare within their own enum".into(),
        },
        E::DerefOfNonPointer { span: span(), found: "i32".into() },
        E::AddrOfNonPlace { span: span() },
        E::InvalidCast {
            span: span(),
            to: "bool".into(),
            from: "i32".into(),
            hint: "a bool is not made by casting — it comes from comparisons (`x > 0`)".into(),
        },
        E::SizeOfArg { span: span(), found: "str".into() },
        E::TypeNameNotValue { span: span(), name: "i32".into() },
        E::IndexNonArray { span: span(), found: "i32".into() },
        E::IndexNotInt { span: span(), found: "f64".into() },
        E::AssignToFinal { span: span(), name: "MAX".into() },
        E::NotAssignable { span: span(), name: "double".into(), what: "a function".into() },
        E::AddObjField { span: span(), field: "leval".into(), suggestion: Some("level".into()) },
        E::ShapeMismatch {
            span: span(),
            context: "the assignment to `user`".into(),
            expected: "{ name: str }".into(),
            found: "{ name: str, level: i32 }".into(),
        },
        E::ThisOutsideMethod { span: span() },
        E::NotCallable { span: span(), what: "`x` (an i32 variable)".into() },
        // T3 — runtime
        E::NumericOverflow { span: span(), detail: "i8 overflow (127 + 1)".into() },
        E::DivisionByZero { span: span(), what: "integer division" },
        E::TooMuchRecursion { span: span(), depth: 1000 },
        E::CastFailed { span: span(), to: "i32".into(), text: "abc".into() },
        E::TooDeeplyNested { span: span() },
        E::InternalError { span: span(), what: "a value the checker guaranteed was not there".into() },
        E::OutOfBounds {
            span: span(),
            detail: "index 3 is out of bounds — the array has 3 elements (indexes 0..2)".into(),
        },
        E::NullDeref { span: span() },
        E::MissingField {
            span: span(),
            kind: "field",
            name: "nmae".into(),
            fields: vec!["level".into(), "name".into()],
            suggestion: Some("name".into()),
        },
        E::MissingReturnValue { span: span(), function: "pass".into(), ty: "obj".into() },
        // T4 — CLI
        E::NotImplemented { what: "the REPL", phase: 8 },
        E::CannotReadFile { path: "hello.tic".into(), cause: "no such file or directory".into() },
        E::Usage { message: "pick one mode — you asked for `tic run <file>` and `--tokens` at once".into() },
    ]
}

/// The "typical cause" column. Exhaustive on purpose: adding a variant
/// breaks this match until the row's cause is written.
fn typical_cause(err: &TicError) -> &'static str {
    match err {
        E::UnterminatedString { .. } => "the closing `\"` never came — Tic strings cannot span lines",
        E::UnterminatedChar { .. } => "a `'` without its closing `'` on the same line",
        E::EmptyCharLiteral { .. } => "`''` — the empty text is `\"\"` (a str)",
        E::MultiCharLiteral { .. } => "`'ab'` — a char holds exactly one character",
        E::UnknownEscape { .. } => "`\\q` — Tic defines \\n \\t \\r \\0 \\\\ \\\" \\'",
        E::UnknownCharacter { .. } => "`~`, `^`, a lone `|` or non-ASCII text in the source",
        E::InvalidNumber { .. } => "`1.2.3`, `123abc` or `1_` — text that starts like a number",
        E::NumberTooLarge { .. } => "more digits than an i64/f64 literal can hold",
        E::ReservedWord { .. } => "`match`, `import`, … — saved for a future Tic version",
        E::UnterminatedComment { .. } => "a `/*` with no matching `*/`",
        E::UnexpectedToken { .. } => "the statement matches none of the forms — usually a missing `;`, `(` or `{`",
        E::UnknownType { .. } => "`Countre x;` — the class/enum is not declared, or a builtin type is misspelled",
        E::InvalidAssignmentTarget { .. } => "`1 = 2;` — the left side is not a place you can assign into",
        E::AssignmentNotExpression { .. } => "`x = y = 5;` — assignment is a statement, it cannot chain",
        E::TypeSuffixNotAllowed { .. } => "`i32[][]` or `i32**` — one `[]`, `[N]` or `*` per type, maximum",
        E::DuplicateDecl { .. } => "the same name declared twice in one scope (or twice at top level)",
        E::FinalNeedsInit { .. } => "`final i32 MAX;` with no `= value` on the same line",
        E::TypeMismatch { .. } => "a value of one type where another was promised (`i32 x = \"hi\";`)",
        E::NotBoolCondition { .. } => "`if (x)` — conditions must be bool; comparisons make bools",
        E::UnknownVariable { .. } => "a typo, or the name is declared later / in another scope",
        E::UnknownFunction { .. } => "a typo in the name — or a builtin misspelled (`prnt`)",
        E::WrongArity { .. } => "too few or too many arguments at the call site",
        E::UnknownField { .. } => "a misspelled field, or the field belongs to another class/shape",
        E::UnknownMethod { .. } => "a misspelled method — or calling a field with `(…)`",
        E::UnknownEnumVariant { .. } => "`State.Idel` — the enum declares no such variant",
        E::UnknownClass { .. } => "`new Countre()` — no class with that name is declared",
        E::InvalidOperands { .. } => "mixing types (`i32 + f64`, `num + str`) — Tic never converts silently",
        E::InvalidEquality { .. } => "comparing values `==` cannot compare (cross-enum, objs, arrays)",
        E::DerefOfNonPointer { .. } => "`*x` where `x` is not a pointer",
        E::AddrOfNonPlace { .. } => "`&(1 + 2)` — `&` needs a variable, field, index or `*p`",
        E::InvalidCast { .. } => "a cast outside the cast table (`bool(1)`, `char(\"a\")`)",
        E::SizeOfArg { .. } => "`size_of(str)` or `size_of(x)` — it takes one scalar type name",
        E::TypeNameNotValue { .. } => "using `i32` where a value is expected (only size_of takes a type)",
        E::IndexNonArray { .. } => "`x[0]` where `x` is not an array",
        E::IndexNotInt { .. } => "`a[1.5]` — the index must be an integer type",
        E::AssignToFinal { .. } => "assigning to a `final` name a second time",
        E::NotAssignable { .. } => "assigning to a function, class, enum or `this`",
        E::AddObjField { .. } => "`o.leval = 1` — an obj's shape is fixed by its literal",
        E::ShapeMismatch { .. } => "two obj literals with different field sets where one shape was expected",
        E::ThisOutsideMethod { ..} => "`this` in a plain function or at top level",
        E::NotCallable { .. } => "calling a variable or a value that is not a function",
        E::NumericOverflow { .. } => "arithmetic past the type's largest value (`i8 big = 127; big + 1`)",
        E::DivisionByZero { .. } => "the divisor was 0 (or 0.0) when the program ran",
        E::TooMuchRecursion { .. } => "recursion past `--max-depth` (default 1000) — usually a missing base case",
        E::CastFailed { .. } => "`i32(\"abc\")` — the text does not parse as the target type at runtime",
        E::TooDeeplyNested { .. } => "one expression nested deeper than the walker will go (1024)",
        E::InternalError { .. } => "a bug in Tic itself — please report it; never the student's fault",
        E::OutOfBounds { .. } => "an index past the end (or a pop/remove on an empty array)",
        E::NullDeref { .. } => "following a `null` pointer with `*p`",
        E::MissingField { .. } => "a bare-`obj` field/method the arriving obj does not have",
        E::MissingReturnValue { .. } => "a `-> obj` pass-through function that fell off its end",
        E::NotImplemented { .. } => "a phase of the roadmap not built yet",
        E::CannotReadFile { .. } => "wrong path, or the file is not readable",
        E::Usage { .. } => "two modes at once, an unknown flag, `--max-depth 0`",
    }
}

/// One line about each family, for the section headers.
fn family_blurb(family: Family) -> &'static str {
    match family {
        Family::Lex => "reading the text — the lexer turns characters into tokens",
        Family::Parse => "reading the tokens — the parser builds the program tree",
        Family::Type => "before anything runs — the checker proves the program statically sound",
        Family::Runtime => "while it runs — the interpreter's friendly stops",
        Family::Cli => "using tic itself — command-line and file problems",
    }
}

fn family_name(family: Family) -> &'static str {
    match family {
        Family::Lex => "lex",
        Family::Parse => "parse",
        Family::Type => "type",
        Family::Runtime => "runtime",
        Family::Cli => "CLI / usage",
    }
}

/// The whole `docs/errors.md` page, generated from [`every_variant`].
fn error_docs_page() -> String {
    let variants = every_variant();
    let mut out = String::new();
    out.push_str("# Tic error codes\n\n");
    out.push_str(
        "Every error Tic reports carries a code, a plain-language message, the source\n\
         line with a caret, and a hint — the [README](../README.md) shows the shape.\n\
         Codes are stable: the family letter says which stage failed, and the number\n\
         never changes meaning.\n\n",
    );
    out.push_str("| Family | Stage | Exit code |\n|---|---|---|\n");
    for family in [Family::Lex, Family::Parse, Family::Type, Family::Runtime, Family::Cli] {
        out.push_str(&format!(
            "| {} | {} | {} |\n",
            family.code_prefix(),
            family_name(family),
            family.exit_code(),
        ));
    }
    out.push_str("\nRuntime errors (T3xxx) are the only family that exits 2; every other\nfamily exits 1. Compile errors report as many as one run can find — up to\n10 shown, then `…and N more — fix these first`.\n\n---\n\n");
    for family in [Family::Lex, Family::Parse, Family::Type, Family::Runtime, Family::Cli] {
        out.push_str(&format!(
            "## {} — {} errors\n\n*{}*\n\n| Code | What it says | Typical cause |\n|---|---|---|\n",
            family.code_prefix(),
            family_name(family),
            family_blurb(family),
        ));
        for err in variants.iter().filter(|e| e.family() == family) {
            out.push_str(&format!(
                "| {} | {} | {} |\n",
                err.error_code(),
                err.message(),
                typical_cause(err),
            ));
        }
        out.push('\n');
    }
    out.push_str(
        "---\n\n*This page is generated from the `TicError` enum in\n\
         `src/diagnostics/mod.rs`; a test rewrites it whenever the enum grows:\n\
         `TIC_UPDATE_ERROR_DOCS=1 cargo test --lib error_docs`. Don't edit by hand.*\n",
    );
    out
}

#[test]
fn error_docs_reference_cannot_drift_from_the_enum() {
    let page = error_docs_page();
    let path = "docs/errors.md";
    if std::env::var("TIC_UPDATE_ERROR_DOCS").is_ok() {
        std::fs::write(path, &page).unwrap_or_else(|e| panic!("rewrite {path}: {e}"));
        return;
    }
    let doc = include_str!("../../docs/errors.md");
    assert!(
        doc == page,
        "\ndocs/errors.md is out of date with the TicError enum.\n--- on disk ---\n{doc}\n--- generated ---\n{page}\n--- how to update: extend every_variant/typical_cause if needed, then `TIC_UPDATE_ERROR_DOCS=1 cargo test --lib error_docs` ---\n"
    );
}

#[test]
fn every_variant_has_a_unique_code_in_its_family() {
    let variants = every_variant();
    let mut seen = std::collections::BTreeSet::new();
    for err in &variants {
        let code = err.error_code();
        assert!(
            code.starts_with(err.family().code_prefix()),
            "{code} is filed under the wrong family"
        );
        assert!(seen.insert(code.clone()), "{code} appears twice in the docs walk");
    }
    // One row per code currently in the codebase (54): 10 lex + 5 parse
    // + 26 type + 10 runtime + 3 CLI.
    assert_eq!(seen.len(), 54, "codes: {seen:?}");
}
