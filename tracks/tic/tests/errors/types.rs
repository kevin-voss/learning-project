//! The **T2xxx type-checker** bank (exit 1): every code reachable from
//! source text — 25 of 26 (T2002 is the parser's T1001 twin; see the
//! suite header). The checker's unit bank (`tests/checker.rs`) already
//! rejects these shapes at the library level; what this adds is the
//! full-pipeline verdict — the stage, the code, the message and the
//! exit code a student meets at the CLI.

use super::{assert_case, compile_case, Case, Stage};

pub(crate) fn cases() -> Vec<Case> {
    vec![
        compile_case("T2001", "i32 x = 1; i32 x = 2;", "is declared twice", Stage::Check),
        compile_case("T2003", "i32 x = \"hi\";", "but i32 was expected", Stage::Check),
        compile_case("T2004", "i32 x = 1; if (x) { print(x); }", "a condition must be a bool", Stage::Check),
        compile_case("T2005", "i32 total = 41; print(totall);", "unknown variable", Stage::Check),
        compile_case("T2006", "prnt(1);", "unknown function", Stage::Check),
        compile_case(
            "T2007",
            "function f(i32 a) -> i32 { return a; } print(f(1, 2));",
            "takes 1 argument, but 2 were given",
            Stage::Check,
        ),
        compile_case(
            "T2008",
            "class C { i32 n; } C c = new C(); print(c.cont);",
            "has no field",
            Stage::Check,
        ),
        compile_case(
            "T2009",
            "class C { i32 n; } C c = new C(); c.bumm();",
            "has no method",
            Stage::Check,
        ),
        compile_case(
            "T2010",
            "enum State { Idle, Done } State s = State.Idel;",
            "has no variant",
            Stage::Check,
        ),
        compile_case(
            "T2011",
            "class Counter { i32 n; } Counter c = new Countre();",
            "unknown class",
            Stage::Check,
        ),
        compile_case("T2012", "print(1 + 2.5);", "cannot combine i32 and f64", Stage::Check),
        compile_case("T2013", "enum A { X } enum B { Y } print(A.X == B.Y);", "cannot compare", Stage::Check),
        compile_case("T2014", "i32 x = 1; print(*x);", "follows a pointer", Stage::Check),
        compile_case("T2015", "i32* p = &(1 + 2);", "takes the address of a place", Stage::Check),
        compile_case("T2016", "print(bool(1));", "cannot be cast to bool", Stage::Check),
        compile_case("T2017", "print(size_of(str));", "size_of takes a scalar type name", Stage::Check),
        compile_case("T2018", "i32 x = i32;", "is a type name, not a value", Stage::Check),
        compile_case("T2019", "i32 x = 1; print(x[0]);", "only arrays can be indexed", Stage::Check),
        compile_case(
            "T2020",
            "i32[2] a = [1, 2]; print(a[1.5]);",
            "index must be an integer type",
            Stage::Check,
        ),
        compile_case("T2021", "final i32 M = 1; M = 2;", "is `final`", Stage::Check),
        compile_case("T2022", "function f() { } f = 1;", "is a function, not a variable", Stage::Check),
        compile_case("T2023", "obj o = { a: 1 }; o.b = 2;", "objs cannot grow new fields", Stage::Check),
        compile_case(
            "T2024",
            "obj a = { x: 1, y: 2 }; obj b = { x: 1 }; a = b;",
            "does not match",
            Stage::Check,
        ),
        compile_case("T2025", "print(this);", "`this` only exists inside a class method", Stage::Check),
        compile_case("T2026", "i32 x = 1; x();", "is not a function", Stage::Check),
    ]
}

#[test]
fn type_error_cases_fail_as_documented() {
    for case in cases() {
        assert_case(&case);
    }
}
