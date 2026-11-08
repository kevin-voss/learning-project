//! Snapshot tests of the flagship renders (plan §5.6, §10 row 7): one
//! error per family — T0 lex, T1 parse, T2 type, T3 runtime — plus a
//! multi-parse-error batch, pinned as plain-text fixtures in
//! `tests/snapshots/`. No snapshot crate: strings compare directly, and
//! a mismatch prints expected vs actual.
//!
//! **Update recipe:** after a *deliberate* wording change, review the
//! failing diff, then run `TIC_UPDATE_SNAPSHOTS=1 cargo test --lib
//! snapshots` to rewrite the fixtures, and commit them with the change.
//! The env var exists only for that — never set it just to go green.
//!
//! The renders go through [`crate::cli::render_failure`], the exact
//! function `dispatch` prints — what these tests pin is what students
//! see on stderr.

use crate::cli;
use crate::diagnostics::TicError;
use crate::{checker, lexer, parser};

/// Compare `actual` against the fixture at `path` (already
/// `include_str!`-ed as `expected`); on mismatch, print both halves.
/// With `TIC_UPDATE_SNAPSHOTS=1` in the environment, rewrite the file
/// instead — the sanctioned way to update after a deliberate change.
fn snap(path: &str, expected: &str, actual: &str) {
    if std::env::var("TIC_UPDATE_SNAPSHOTS").is_ok() {
        std::fs::write(path, actual).unwrap_or_else(|e| panic!("rewrite {path}: {e}"));
        return;
    }
    assert!(
        expected == actual,
        "\nsnapshot mismatch: {path}\n--- expected ---\n{expected}\n--- actual ---\n{actual}\n--- \
         how to update: review the diff, then `TIC_UPDATE_SNAPSHOTS=1 cargo test --lib snapshots` ---\n"
    );
}

/// One error, rendered the way the CLI prints it.
fn render_one(err: TicError, name: &str, src: &str) -> String {
    cli::render_failure(&cli::Failure {
        errors: vec![err],
        more: 0,
        file: Some((name.to_string(), src.to_string())),
    })
}

/// A batch (the parse-recovery / multi-checker shape), with the
/// "…and N more" tail.
fn render_batch(errors: Vec<TicError>, more: usize, name: &str, src: &str) -> String {
    cli::render_failure(&cli::Failure {
        errors,
        more,
        file: Some((name.to_string(), src.to_string())),
    })
}

/// Full pipeline through the interpreter, capturing program output and
/// keeping the runtime error (the fixtures' T3 needs a real run).
fn run_until_error(src: &str) -> TicError {
    struct StringWriter(pub String);
    impl crate::interp::Writer for StringWriter {
        fn write(&mut self, text: &str) {
            self.0.push_str(text);
        }
    }
    let tokens = lexer::tokenize(src).expect("the T3 fixture lexes");
    let program = parser::parse(&tokens).expect("the T3 fixture parses");
    let checked = checker::check(&program).expect("the T3 fixture type-checks");
    let mut sink = StringWriter(String::new());
    crate::interp::run(&checked, src, &mut sink, crate::interp::RunOptions::default())
        .expect_err("the T3 fixture stops on its teaching error")
}

// ---- one flagship per family ---------------------------------------------

#[test]
fn t0_lex_unterminated_string() {
    let src = "str s = \"oops\n";
    let err = lexer::tokenize(src).expect_err("the T0 fixture fails to lex");
    snap(
        "tests/snapshots/T0_lex_unterminated_string.txt",
        include_str!("../../tests/snapshots/T0_lex_unterminated_string.txt"),
        &render_one(err, "unterminated.tic", src),
    );
}

#[test]
fn t1_parse_unexpected_token() {
    let src = "i32 x = 1;\nprint(x);\ni32 = 3;\n";
    let tokens = lexer::tokenize(src).unwrap();
    let errors = parser::parse(&tokens).expect_err("the T1 fixture fails to parse");
    assert_eq!(errors.errors.len(), 1);
    snap(
        "tests/snapshots/T1_parse_unexpected_token.txt",
        include_str!("../../tests/snapshots/T1_parse_unexpected_token.txt"),
        &render_one(errors.errors.into_iter().next().unwrap(), "unexpected.tic", src),
    );
}

#[test]
fn t2_type_mismatch() {
    // PLAN §5.6's own example program.
    let src = "i32 x = \"hello\";\n";
    let tokens = lexer::tokenize(src).unwrap();
    let program = parser::parse(&tokens).unwrap();
    let errors = checker::check(&program).expect_err("the T2 fixture fails to check");
    assert_eq!(errors.len(), 1);
    snap(
        "tests/snapshots/T2_type_mismatch.txt",
        include_str!("../../tests/snapshots/T2_type_mismatch.txt"),
        &render_one(errors.into_iter().next().unwrap(), "counter.tic", src),
    );
}

#[test]
fn t3_runtime_overflow() {
    // PLAN §2.6's example: the i8 that cannot hold 128.
    let src = "i8 big = 127;\nprint(big + 1);\n";
    let err = run_until_error(src);
    assert_eq!(err.error_code(), "T3001");
    snap(
        "tests/snapshots/T3_runtime_overflow.txt",
        include_str!("../../tests/snapshots/T3_runtime_overflow.txt"),
        &render_one(err, "overflow.tic", src),
    );
}

#[test]
fn t1_parse_error_batch_caps_at_ten() {
    // §5.2: recovery shows *all* the errors one run found — capped at
    // MAX_SHOWN (10) with the "…and N more — fix these first" tail.
    let src = "i32 x = ;\n".repeat(12);
    let tokens = lexer::tokenize(&src).unwrap();
    let errors = parser::parse(&tokens).expect_err("the batch fixture fails to parse");
    assert_eq!(errors.errors.len(), 10, "the parser itself caps at MAX_SHOWN");
    let more = errors.total - errors.errors.len();
    assert_eq!(more, 2);
    snap(
        "tests/snapshots/T1_parse_error_batch.txt",
        include_str!("../../tests/snapshots/T1_parse_error_batch.txt"),
        &render_batch(errors.errors, more, "many.tic", &src),
    );
}

// ---- multi-error coherence checks (no fixture, structural asserts) -------

#[test]
fn a_parse_batch_renders_every_error_with_source_and_caret() {
    let src = "i32 x = ;\nstr y = ;\nprint(x;\n";
    let tokens = lexer::tokenize(src).unwrap();
    let errors = parser::parse(&tokens).expect_err("three bad statements");
    assert!(errors.errors.len() >= 3, "each statement reports its own error");
    let out = render_batch(errors.errors.clone(), 0, "batch.tic", src);
    // coherent batch: one code+message block per error, each with its own
    // source line and caret — and one shared help line per error.
    assert_eq!(out.matches("T1001").count(), errors.errors.len());
    assert_eq!(out.matches("batch.tic:").count(), errors.errors.len(), "every error names its spot: {out}");
    assert!(out.matches('`').count() >= errors.errors.len(), "labels present");
}

#[test]
fn a_lex_error_preempts_parsing_so_batches_never_mix_families() {
    // The lexer stops at its first error (phase-0 design: after an
    // unterminated string, later tokens are guesswork), so a lex+parse
    // mixed batch cannot occur — the lex error renders alone, coherent.
    let src = "str s = \"oops\ni32 = ;\n";
    let err = lexer::tokenize(src).expect_err("the lex error wins");
    assert_eq!(err.error_code(), "T0001");
    let out = render_one(err, "mixed.tic", src);
    assert_eq!(out.matches("T0001").count(), 1);
    assert!(!out.contains("T1001"), "no parse noise after a lex error");
}

#[test]
fn runtime_renders_show_the_line_and_caret_for_every_teaching_error() {
    // §10 row 7's "runtime errors print the offending line + caret":
    // overflow, null deref, bounds — the three §2.6 lessons.
    for (code, src, needle) in [
        ("T3001", "i8 big = 127;\nprint(big + 1);\n", "big + 1"),
        ("T3008", "i32* p = null;\nprint(*p);\n", "*p"),
        ("T3007", "i32[3] a = [1, 2, 3];\nprint(a[3]);\n", "a[3]"),
    ] {
        let err = run_until_error(src);
        assert_eq!(err.error_code(), code, "{src}");
        let name = format!("{code}.tic");
        let out = render_one(err, &name, src);
        assert!(out.contains(&format!("{name}:2:")), "file and line named: {out}");
        assert!(out.contains(needle), "the source line is shown: {out}");
        assert!(out.contains('^') || out.contains('|'), "a caret underline: {out}");
        assert!(out.contains("help:"), "a hint: {out}");
    }
}
