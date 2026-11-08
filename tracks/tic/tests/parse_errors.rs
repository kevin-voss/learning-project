//! Parser error tests (plan §9): every T1xxx code, the §3 ambiguity
//! rejections, and §5.2 error recovery — several errors in one run, good
//! statements surviving, and the 10-shown display cap.

use tic::ast::*;
use tic::diagnostics::TicError;
use tic::{lexer, parser};

/// All recorded errors for `src` (already capped for display).
fn errs(src: &str) -> Vec<TicError> {
    let tokens = lexer::tokenize(src).expect("test source lexes");
    parser::parse(&tokens).expect_err("should NOT parse").errors
}

fn first_err(src: &str) -> TicError {
    errs(src).into_iter().next().expect("at least one error")
}

#[test]
fn unknown_type_is_t1002_with_a_did_you_mean() {
    // Unknown name in declaration shape → the dedicated teaching error,
    // not a generic "expected `;`".
    match first_err("Foo x;") {
        TicError::UnknownType { name, suggestion, .. } => {
            assert_eq!(name, "Foo");
            assert_eq!(suggestion, None); // nothing close in an empty file
        }
        other => panic!("unknown type, got {other:?}"),
    }
    assert_eq!(first_err("Foo x;").error_code(), "T1002");
    // A declared class feeds the did-you-mean machinery.
    let err = first_err("class Counter { i32 n; }\nCountre c;\n");
    match err {
        TicError::UnknownType { suggestion: Some(near), .. } => assert_eq!(near, "Counter"),
        other => panic!("suggestion, got {other:?}"),
    }
    // The same shape via a fixed-array type.
    assert!(matches!(first_err("Foo[3] xs;"), TicError::UnknownType { .. }));
}

#[test]
fn a_bare_obj_literal_at_statement_start_is_a_block_and_fails() {
    // `{` at statement start is always a block — obj literals only exist
    // in expression position, so `{ a: 1 };` fails inside the block.
    assert!(!errs("{ a: 1 };").is_empty());
}

#[test]
fn chained_assignment_is_t1004() {
    assert!(matches!(first_err("x = y = 5;"), TicError::AssignmentNotExpression { .. }));
    assert_eq!(first_err("x = y = 5;").error_code(), "T1004");
}

#[test]
fn non_lvalue_assignment_targets_are_t1003() {
    assert!(matches!(first_err("1 = 2;"), TicError::InvalidAssignmentTarget { .. }));
    assert!(matches!(first_err("f() = 2;"), TicError::InvalidAssignmentTarget { .. }));
}

#[test]
fn stacked_type_suffixes_are_t1005() {
    assert_eq!(first_err("i32** p;").error_code(), "T1005");
    assert_eq!(first_err("i32[][5] a;").error_code(), "T1005");
    assert_eq!(first_err("i32[1][2] a;").error_code(), "T1005");
}

#[test]
fn final_without_init_is_rejected() {
    let err = first_err("final i32 MAX;");
    assert_eq!(err.error_code(), "T1001");
}

#[test]
fn enums_reject_a_trailing_comma() {
    // Only the two collection literals allow one — the §3 grammar is strict.
    assert!(!errs("enum E { A, B, }").is_empty());
}

#[test]
fn missing_semicolon_is_a_plain_t1001_at_eof() {
    let err = first_err("i32 x = 5");
    let TicError::UnexpectedToken { expected, found, .. } = err else {
        panic!("unexpected token, got {err:?}");
    };
    assert_eq!(expected, "`;`");
    assert_eq!(found, "end of file");
}

// ---- recovery (§5.2) --------------------------------------------------------

#[test]
fn recovery_reports_every_error_and_keeps_good_statements() {
    let src = "i32 x = ;\nprint(x);\ni32 = 3;\nprint(\"done\");\n";
    let tokens = lexer::tokenize(src).unwrap();
    let (program, outcome) = parser::parse_recovering(&tokens);
    assert!(outcome.total >= 2, "want at least 2 errors, got {}", outcome.total);
    assert!(outcome.errors.len() >= 2);
    let printed: usize = program
        .stmts
        .iter()
        .filter(|s| matches!(s, Stmt::ExprStmt { expr: Expr::Call { .. }, .. }))
        .count();
    assert_eq!(printed, 2, "both print statements should survive recovery");
}

#[test]
fn display_caps_at_ten_errors_and_counts_the_rest() {
    let src = "i32 x = ;\n".repeat(12);
    let tokens = lexer::tokenize(&src).unwrap();
    let outcome = parser::parse(&tokens).unwrap_err();
    assert_eq!(outcome.total, 12);
    assert_eq!(outcome.errors.len(), parser::MAX_SHOWN);
}

#[test]
fn errors_inside_a_block_do_not_kill_the_block() {
    let src = "if (true) {\n  i32 ok = 1;\n  i32 bad = ;\n  ok = 2;\n}";
    let tokens = lexer::tokenize(src).unwrap();
    assert!(parser::parse(&tokens).is_err()); // the bad line is reported…
    let (program, _) = parser::parse_recovering(&tokens); // …but the if survives.
    match &program.stmts[0] {
        Stmt::If { then_branch, .. } => assert_eq!(then_branch.stmts.len(), 2),
        other => panic!("if survived, got {other:?}"),
    }
}

#[test]
fn a_stray_closing_brace_is_skipped_not_looped_on() {
    // The classic recovery infinite-loop trap: the sync must always advance.
    let src = "}\nprint(1);\n}";
    let (program, outcome) = parser::parse_recovering(&lexer::tokenize(src).unwrap());
    assert_eq!(program.stmts.len(), 1, "the print between the strays survives");
    assert_eq!(outcome.total, 2, "both stray braces are reported");
}
