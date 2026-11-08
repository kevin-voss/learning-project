//! The runtime-error bank (plan §2.6, P1): every way a *well-typed*
//! program can still stop — width overflow, division by zero, too much
//! recursion, casts that only fail at run time, and the nesting guard.
//! Every error is a friendly T3xxx with a span; nothing ever panics.

use super::{check_src, run_src, run_src_big_stack, VecWriter};
use tic::diagnostics::TicError;
use tic::interp::{run, RunOptions};

/// The friendly outcome of running `src`.
fn err_of(src: &str) -> TicError {
    match run_src(src, RunOptions::default()) {
        Err(err) => err,
        Ok(out) => panic!("expected a runtime error, got output {out:?}"),
    }
}

// ---- §2.6 rule 1: width-checked arithmetic ------------------------------------

#[test]
fn overflow_at_every_width_uses_the_plans_wording() {
    let cases = [
        ("i8", "127", "i8 overflow (127 + 1)"),
        ("i16", "32767", "i16 overflow (32767 + 1)"),
        ("i32", "2147483647", "i32 overflow (2147483647 + 1)"),
        ("i64", "9223372036854775807", "i64 overflow (9223372036854775807 + 1)"),
        ("u8", "255", "u8 overflow (255 + 1)"),
        ("u16", "65535", "u16 overflow (65535 + 1)"),
        ("u32", "4294967295", "u32 overflow (4294967295 + 1)"),
        ("u64", "9223372036854775807", "u64 overflow (9223372036854775807 + 1)"),
    ];
    for (ty, max, detail) in cases {
        let src = format!("{ty} a = {max};\nprint(a + 1);\n");
        let err = err_of(&src);
        assert_eq!(err.error_code(), "T3001", "{ty}");
        assert!(err.message().contains(detail), "{ty}: {}", err.message());
        assert_eq!(err.family().exit_code(), 2, "{ty}: runtime errors exit 2");
    }
}

#[test]
fn subtraction_and_multiplication_overflow_too() {
    // unsigned arithmetic cannot go below zero
    let err = err_of("u8 a = 0;\nprint(a - 1);\n");
    assert!(err.message().contains("u8 overflow (0 - 1)"), "{}", err.message());
    // the i64 op can succeed while the declared width refuses
    let err = err_of("i32 a = 100000;\nprint(a * a);\n");
    assert!(err.message().contains("i32 overflow (100000 * 100000)"), "{}", err.message());
}

#[test]
fn compound_assignment_overflow_uses_the_slots_width() {
    let err = err_of("i8 a = 127;\na += 1;\n");
    assert_eq!(err.error_code(), "T3001");
    assert!(err.message().contains("i8 overflow (127 + 1)"), "{}", err.message());
}

#[test]
fn literals_that_do_not_fit_refuse_at_the_declaration() {
    // the checker deliberately passes `i8 x = 200;` (P1: a runtime lesson)
    let err = err_of("i8 a = 200;\n");
    assert_eq!(err.error_code(), "T3001");
    assert!(err.message().contains("i8 overflow (200 is out of range)"), "{}", err.message());
}

#[test]
fn negation_and_abs_overflow_name_the_operation() {
    // -128 is spelled `-127 - 1` because the literal 128 would refuse first
    let err = err_of("i8 m = -127 - 1;\nprint(-m);\n");
    assert_eq!(err.error_code(), "T3001");
    assert!(err.message().contains("i8 overflow (-(-128))"), "{}", err.message());
    let err = err_of("i8 m = -127 - 1;\nprint(abs(m));\n");
    assert!(err.message().contains("i8 overflow (abs of -128)"), "{}", err.message());
}

// ---- division by zero (§2.3; no constant folding — §5.3) --------------------------

#[test]
fn division_by_zero_is_caught_for_ints_floats_and_remainder() {
    let cases = [
        ("print(1 / 0);\n", "integer division by zero"),
        ("print(1 % 0);\n", "integer remainder by zero"),
        ("print(1.0 / 0.0);\n", "float division by zero"),
        ("print(1.0 % 0.0);\n", "float remainder by zero"),
    ];
    for (src, detail) in cases {
        let err = err_of(src);
        assert_eq!(err.error_code(), "T3002", "{src}");
        assert_eq!(err.message(), detail);
        assert_eq!(err.family().exit_code(), 2);
    }
    // the divisor can also be a variable that happens to hold zero
    let err = err_of("i32 d = 0;\nprint(5 / d);\n");
    assert!(err.message().contains("integer division by zero"));
}

// ---- casts that only fail while running (§2.5) ----------------------------------

#[test]
fn cast_failures_name_the_offending_text() {
    let cases = [
        ("print(i32(\"abc\"));\n", "`abc` is not a valid i32"),
        ("print(f64(\"x\"));\n", "`x` is not a valid f64"),
    ];
    for (src, detail) in cases {
        let err = err_of(src);
        assert_eq!(err.error_code(), "T3004", "{src}");
        assert_eq!(err.message(), detail, "{src}");
    }
}

#[test]
fn casts_that_parse_but_do_not_fit_overflow() {
    let err = err_of("print(i8(\"300\"));\n"); // parses, then the width refuses
    assert_eq!(err.error_code(), "T3001");
    assert!(err.message().contains("i8 overflow"), "{}", err.message());
    let err = err_of("print(i32(3000000000.5));\n"); // float too large for i32
    assert_eq!(err.error_code(), "T3001");
    assert!(err.message().contains("i32 overflow"), "{}", err.message());
}

#[test]
fn char_casts_reject_non_code_points() {
    // 1114112 is past U+10FFFF; 55296 (0xD800) is a UTF-16 surrogate
    for n in ["1114112", "55296"] {
        let err = err_of(&format!("print(char({n}));\n"));
        assert_eq!(err.error_code(), "T3004");
        assert_eq!(err.message(), format!("`{n}` is not a valid char"));
    }
}

// ---- §2.6 rule 5: the recursion cap -----------------------------------------------

/// The countdown used by every depth test.
fn down(calls: &str) -> String {
    format!(
        "function down(i32 n) -> i32 {{\n    if (n <= 0) {{\n        return 0;\n    }}\n    return down(n - 1);\n}}\nprint(down({calls}));\n"
    )
}

#[test]
fn recursion_stops_at_the_default_depth_of_1000() {
    // 999 nested calls fit exactly in the default budget of 1000…
    let out = run_src_big_stack(&down("999"), RunOptions::default()).expect("999 calls fit");
    assert_eq!(out, "0\n");
    // …one more refuses, with the friendly T3003 (never a stack overflow)
    let err = match run_src_big_stack(&down("1000"), RunOptions::default()) {
        Err(err) => err,
        Ok(out) => panic!("down(1000) must refuse, got {out:?}"),
    };
    assert_eq!(err.error_code(), "T3003");
    assert_eq!(err.message(), "too much recursion — the program went 1000 calls deep");
    assert_eq!(err.family().exit_code(), 2);
}

#[test]
fn recursion_honors_a_custom_max_depth() {
    let three = RunOptions { max_depth: 3, ..RunOptions::default() };
    assert_eq!(run_src(&down("2"), three).unwrap(), "0\n");
    let err = run_src(&down("3"), three).unwrap_err();
    assert_eq!(err.error_code(), "T3003");
    assert!(err.message().contains("went 3 calls deep"), "{}", err.message());
}

#[test]
fn mutual_recursion_shares_the_same_budget() {
    let src = "function ping(i32 n) -> i32 {\n    return pong(n - 1);\n}\nfunction pong(i32 n) -> i32 {\n    if (n <= 0) {\n        return 0;\n    }\n    return ping(n - 1);\n}\nprint(ping(4));\n";
    let three = RunOptions { max_depth: 3, ..RunOptions::default() };
    let err = run_src(src, three).unwrap_err();
    assert_eq!(err.error_code(), "T3003");
}

// ---- the Rust-stack guard (§12) -----------------------------------------------------

#[test]
fn absurdly_nested_expressions_stop_at_the_nesting_guard() {
    // 1100 nested `1 + (…)` — deeper than both the parser's grammar-
    // recursion cap (phase 9) and the walker's per-function nesting
    // budget, so it must refuse with T3005 — whichever guard sees it
    // first — instead of blowing the Rust stack. Run on a big stack so
    // only Tic's own guards can fire.
    let mut src = String::from("print(");
    for _ in 0..1100 {
        src.push_str("(1 + ");
    }
    src.push('1');
    for _ in 0..1100 {
        src.push(')');
    }
    src.push_str(");");
    let src = src;
    let err = std::thread::scope(|scope| {
        std::thread::Builder::new()
            .stack_size(64 * 1024 * 1024)
            .spawn_scoped(scope, move || pipeline_error(&src))
            .expect("spawn the big-stack test thread")
            .join()
            .expect("the big-stack test thread must not panic")
    });
    assert_eq!(err.error_code(), "T3005");
    assert_eq!(err.family().exit_code(), 2);
}

/// The first error from any pipeline stage — the nesting guard may fire
/// in the parser now, before the walker ever sees the tree.
fn pipeline_error(src: &str) -> TicError {
    let tokens = tic::tokenize(src).expect("the test program lexes");
    let program = match tic::parse(&tokens) {
        Ok(program) => program,
        Err(errors) => {
            return errors
                .errors
                .into_iter()
                .next()
                .expect("a failed parse reports at least one error")
        }
    };
    let checked = match tic::check(&program) {
        Ok(checked) => checked,
        Err(errors) => return errors.into_iter().next().expect("type errors are not empty"),
    };
    let mut writer = super::VecWriter(String::new());
    match tic::interp::run(&checked, src, &mut writer, RunOptions::default()) {
        Err(err) => err,
        Ok(()) => panic!("expected an error somewhere in the pipeline"),
    }
}

// ---- the run contract around errors ------------------------------------------------

#[test]
fn output_printed_before_the_error_is_kept() {
    // example 02's contract: everything above the failing line ran fine
    let src = "print(\"one\");\nprint(\"two\");\ni8 big = 127;\nprint(big + 1);\n";
    let checked = check_src(src);
    let mut writer = VecWriter(String::new());
    let err = run(&checked, src, &mut writer, RunOptions::default()).unwrap_err();
    assert_eq!(err.error_code(), "T3001");
    assert_eq!(writer.0, "one\ntwo\n");
}

#[test]
fn every_runtime_error_family_exits_two() {
    for src in [
        "i8 a = 127;\nprint(a + 1);\n",
        "print(1 / 0);\n",
        "print(i32(\"x\"));\n",
        "i8 m = -127 - 1;\nprint(-m);\n",
    ] {
        assert_eq!(err_of(src).family().exit_code(), 2, "{src}");
    }
}
