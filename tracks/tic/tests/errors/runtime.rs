//! The **T3xxx runtime** bank (exit 2): programs that lex, parse and
//! type-check cleanly, then stop on a friendly runtime lesson — plus
//! the two depth guards, which need a big stack at the library level
//! (`assert_case_big_stack`) and run through the CLI's own sized runner
//! in the built-binary loop. T3006 is intentionally absent: an
//! "internal error" no student program can produce is the whole point
//! of the code.

use super::{assert_case, assert_case_big_stack, compile_case, Case, Stage};

pub(crate) fn cases() -> Vec<Case> {
    vec![
        compile_case(
            "T3001",
            "i8 b = 127; print(b + 1);",
            "runtime overflow: i8 overflow (127 + 1)",
            Stage::Run,
        ),
        compile_case("T3002", "print(1 / 0);", "integer division by zero", Stage::Run),
        compile_case("T3004", "print(i32(\"abc\"));", "is not a valid i32", Stage::Run),
        compile_case("T3007", "i32[] a = [1, 2]; print(a[5]);", "out of bounds", Stage::Run),
        compile_case("T3008", "i32* p = null; print(*p);", "null pointer dereference", Stage::Run),
        compile_case(
            "T3009",
            "function f(obj u) -> i32 { return u.nmae; } obj o = { name: \"a\" }; print(f(o));",
            "has no field `nmae`",
            Stage::Run,
        ),
        compile_case(
            "T3010",
            "function pass(obj u) -> obj { if (1 == 2) { return u; } }\nobj o = { name: \"a\" };\nprint(pass(o).name);",
            "ended without returning a value",
            Stage::Run,
        ),
    ]
}

/// The depth guards — the §12 promise in two shapes. Both run on a
/// 64 MiB thread: a legitimate 1000-frame recursion does not fit a
/// default test-thread stack, and neither does the parser's walk over
/// an 1100-level nest before its guard fires.
pub(crate) fn deep_cases() -> Vec<Case> {
    vec![
        Case {
            code: "T3003",
            src: "function loop(i32 n) -> i32 { return loop(n + 1); }\nprint(loop(0));\n"
                .to_string(),
            snippet: "too much recursion",
            stage: Stage::Run,
            exit: 2,
        },
        // 1100 nested `(1 + …)` levels: past the parser's grammar-
        // recursion cap (phase 9's guard), so the refusal now happens at
        // parse — the same T3005 the walker would raise, raised before
        // the native stack is ever at risk. The family (runtime) decides
        // the exit code: 2, even though the program never ran.
        Case {
            code: "T3005",
            src: deep_nest(),
            snippet: "nested too deeply",
            stage: Stage::Parse,
            exit: 2,
        },
    ]
}

fn deep_nest() -> String {
    let mut src = String::from("print(");
    for _ in 0..1100 {
        src.push_str("(1 + ");
    }
    src.push('1');
    for _ in 0..1100 {
        src.push(')');
    }
    src.push_str(");");
    src
}

#[test]
fn runtime_error_cases_fail_as_documented() {
    for case in cases() {
        assert_case(&case);
    }
}

#[test]
fn the_depth_guards_fire_as_documented() {
    for case in deep_cases() {
        assert_case_big_stack(&case);
    }
}
