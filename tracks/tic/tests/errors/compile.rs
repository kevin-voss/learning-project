//! The compile-stage banks: **T0xxx lex** and **T1xxx parse** (exit 1,
//! before anything runs). Sources are one-liners a student actually
//! types; snippets quote `docs/errors.md`'s wording.

use super::{assert_case, compile_case, Case, Stage};

pub(crate) fn cases() -> Vec<Case> {
    vec![
        // ---- T0xxx: the lexer ------------------------------------------------
        compile_case("T0001", "str s = \"abc;", "unterminated string literal", Stage::Lex),
        // The quote left dangling at end of line — unterminated before any
        // content arrives (a `'a;` collects `a;` first and lands on T0004).
        compile_case("T0002", "char c = '\n", "unterminated char literal", Stage::Lex),
        compile_case("T0003", "char c = '';", "empty char literal", Stage::Lex),
        compile_case("T0004", "char c = 'ab';", "a char literal can hold exactly one character", Stage::Lex),
        compile_case("T0005", r#"str s = "a\qb";"#, "unknown escape sequence", Stage::Lex),
        compile_case("T0006", "i32 x = 1 ~ 2;", "unknown character", Stage::Lex),
        compile_case("T0007", "i32 x = 1.2.3;", "invalid number", Stage::Lex),
        compile_case("T0008", "i64 x = 99999999999999999999;", "is too large", Stage::Lex),
        compile_case("T0009", "i32 match = 1;", "is reserved for a future Tic version", Stage::Lex),
        compile_case("T0010", "/* never closed", "unterminated block comment", Stage::Lex),
        // ---- T1xxx: the parser ----------------------------------------------
        compile_case("T1001", "i32 x = ;", "expected an expression", Stage::Parse),
        // `final x;` with no value: the parser demands the `=` first — which
        // is why the checker's defensive T2002 twin has no reachable source
        // (see the suite header).
        compile_case("T1001", "final i32 MAX;", "a `final` must be given a value", Stage::Parse),
        compile_case("T1002", "Countre c = null;", "unknown type `Countre`", Stage::Parse),
        compile_case("T1003", "1 = 2;", "left side of an assignment", Stage::Parse),
        compile_case("T1004", "i32 x = 1; i32 y = 2; x = y = 5;", "cannot be chained", Stage::Parse),
        compile_case("T1005", "i32[][] a;", "suffix is allowed on a type", Stage::Parse),
    ]
}

#[test]
fn lex_and_parse_cases_fail_as_documented() {
    for case in cases() {
        assert_case(&case);
    }
}
