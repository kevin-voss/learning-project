//! Scalar semantics through the public API: print formats, zero values,
//! slots and scoping, control flow, functions, casts, str rules and the
//! math toolbox — the "everything runs fine" bank (the failures live in
//! `runtime_errors.rs`).

use super::{output_of, run_src};
use tic::interp::RunOptions;

// ---- print: the §2.5 contract ------------------------------------------------

#[test]
fn print_formats_every_scalar_family() {
    assert_eq!(
        output_of("print(42, -7, 0);\nprint(4.0, 0.5, -0.25);\nprint(true, false);\n"),
        "42 -7 0\n4.0 0.5 -0.25\ntrue false\n"
    );
    // chars as the character, strs unquoted, floats keep their `.0`
    assert_eq!(output_of("print('A', \"str\", 3.5);\n"), "A str 3.5\n");
    // float literals default to f64, int literals to i32 (§2.1)
    assert_eq!(output_of("print(7 / 2, 7.0 / 2.0);\n"), "3 3.5\n");
}

#[test]
fn print_with_no_arguments_prints_one_empty_line() {
    assert_eq!(output_of("print();\n"), "\n");
}

// ---- declarations, slots, scoping ---------------------------------------------

#[test]
fn declarations_without_an_initializer_hold_the_zero_value() {
    // §2.1's zero column: 0 / 0.0 / false / '\0' / "" — the NUL char is a
    // real byte of output and the empty str is an empty field.
    assert_eq!(
        output_of("i32 a;\ni64 b;\nf64 c;\nbool d;\nchar e;\nstr f;\nprint(a, b, c, d, e, f);\n"),
        "0 0 0.0 false \u{0} \n"
    );
    assert_eq!(output_of("i8 a; u8 b; f32 c; print(a, b, c);\n"), "0 0 0.0\n");
}

#[test]
fn assignment_writes_through_the_variable_and_compound_ops_keep_the_width() {
    assert_eq!(
        output_of("i32 x = 1;\nx = 2;\nx += 10;\nx -= 3;\nx *= 4;\nx /= 2;\nprint(x);\n"),
        "18\n"
    );
    // assignment from inside a block reaches the OUTER slot (the scope
    // chain walks outward — the §4.4 slot world phase 5 points into)
    assert_eq!(output_of("i32 x = 1;\nif (true) { x = 5; }\nprint(x);\n"), "5\n");
    // str compound assignment concatenates, Java-style
    assert_eq!(output_of("str s = \"a\";\ns += \"b\";\ns += 1;\ns += 4.0;\nprint(s);\n"), "ab14.0\n");
}

#[test]
fn blocks_scope_and_shadow() {
    assert_eq!(
        output_of("i32 x = 1;\n{\n    i32 x = 2;\n    print(x);\n}\nprint(x);\n"),
        "2\n1\n"
    );
    // a while body's declarations reset every iteration
    assert_eq!(
        output_of("i32 n = 2;\nwhile (n > 0) {\n    i32 fresh = n;\n    print(fresh);\n    n -= 1;\n}\n"),
        "2\n1\n"
    );
}

#[test]
fn the_for_variable_lives_only_inside_the_loop() {
    assert_eq!(output_of("for (i32 i = 0; i < 3; i += 1) { print(i); }\n"), "0\n1\n2\n");
    // gone afterwards — the CHECKER draws that line (compile-side scope)
    let tokens = tic::tokenize("for (i32 i = 0; i < 1; i += 1) { }\nprint(i);\n").unwrap();
    let program = tic::parse(&tokens).unwrap();
    let errors = tic::check(&program).unwrap_err();
    assert!(
        errors.iter().any(|e| e.error_code() == "T2005"),
        "using the loop variable after the loop is a compile error"
    );
}

// ---- control flow --------------------------------------------------------------

#[test]
fn if_else_if_else_picks_the_matching_branch() {
    let src = "i32 s = 87;\nif (s >= 90) {\n    print(\"A\");\n} else if (s >= 80) {\n    print(\"B\");\n} else {\n    print(\"C\");\n}\n";
    assert_eq!(output_of(src), "B\n");
    assert_eq!(output_of("if (false) { print(\"no\"); } else { print(\"yes\"); }\n"), "yes\n");
}

#[test]
fn nested_loops_and_while_countdown_work() {
    let src = "for (i32 i = 1; i <= 2; i += 1) {\n    for (i32 j = 1; j <= 2; j += 1) {\n        print(i, j);\n    }\n}\n";
    assert_eq!(output_of(src), "1 1\n1 2\n2 1\n2 2\n");
    assert_eq!(
        output_of("i32 n = 3;\nwhile (n > 0) {\n    n -= 1;\n}\nprint(n);\n"),
        "0\n"
    );
}

#[test]
fn and_and_or_short_circuit_past_a_division_by_zero() {
    // example 03's trick: the right side never runs when the left decides
    assert_eq!(output_of("print(false && (1 / 0 > 0));\nprint(true || (1 / 0 > 0));\n"), "false\ntrue\n");
    // …and really DO run when they must (that side divides by zero)
    let err = super::error_of("print(true && (1 / 0 > 0));\n");
    assert_eq!(err.error_code(), "T3002");
}

// ---- operators on scalars --------------------------------------------------------

#[test]
fn integer_math_is_exact_and_signed_division_truncates() {
    assert_eq!(output_of("print(7 / 2, -7 / 2, 7 % 2, -7 % 2);\n"), "3 -3 1 -1\n");
    assert_eq!(output_of("i8 a = 10;\nprint(a + 117, a * 12);\n"), "127 120\n");
    assert_eq!(output_of("u8 a = 200;\nprint(a + 55);\n"), "255\n");
}

#[test]
fn comparisons_cover_numbers_chars_and_bools() {
    assert_eq!(
        output_of("print(1 < 2, 2 <= 2, 3 > 4, 4 >= 5, 1 == 1, 1 != 1);\n"),
        "true true false false true false\n"
    );
    assert_eq!(
        output_of("print(1.5 < 2.5, 'a' < 'b', 'A' == 'A', 'a' != 'b');\n"),
        "true true true true\n"
    );
    assert_eq!(output_of("print(!true, !(1 > 2));\n"), "false true\n");
}

#[test]
fn str_concatenates_from_the_string_side_and_compares_by_content() {
    assert_eq!(
        output_of("print(\"n = \" + 42, \"f \" + 4.0, \"b \" + true, \"c \" + 'A');\n"),
        "n = 42 f 4.0 b true c A\n"
    );
    // two separately-built strs with the same text are equal (§2.3)
    assert_eq!(
        output_of("str a = \"he\" + \"llo\";\nstr b = \"hell\" + \"o\";\nprint(a == b, a != b);\n"),
        "true false\n"
    );
}

// ---- casts (§2.5's table) ----------------------------------------------------------

#[test]
fn casts_cover_the_readme_table() {
    assert_eq!(output_of("print(i32(2.7), i32(-2.7));\n"), "2 -2\n"); // truncates
    assert_eq!(output_of("print(f64(3));\n"), "3.0\n");
    assert_eq!(output_of("print(char(65), i32('A'));\n"), "A 65\n");
    assert_eq!(output_of("print(str(42), str(4.0), str(true), str('x'));\n"), "42 4.0 true x\n");
    assert_eq!(output_of("print(i32(\"123\"), f64(\"3.5\"));\n"), "123 3.5\n");
}

#[test]
fn width_changing_casts_apply_the_target_range() {
    assert_eq!(output_of("print(u8(200), i8(100), i64(1));\n"), "200 100 1\n");
    assert_eq!(output_of("i32 wide = 1000;\nprint(i16(wide));\n"), "1000\n");
    // floats narrow honestly: an f32 keeps the f32 spelling
    assert_eq!(output_of("f32 h = 0.1;\nprint(h, f32(1.5));\n"), "0.1 1.5\n");
}

// ---- functions ------------------------------------------------------------------------

#[test]
fn functions_bind_arguments_and_return_early() {
    let src = "function sign(i32 n) -> i32 {\n    if (n > 0) {\n        return 1;\n    }\n    if (n < 0) {\n        return -1;\n    }\n    return 0;\n}\nprint(sign(-5), sign(0), sign(9));\n";
    assert_eq!(output_of(src), "-1 0 1\n");
}

#[test]
fn functions_can_be_called_before_their_definition_site() {
    // two-pass collection (§2.6 rule 6): `double` is already callable
    assert_eq!(
        output_of("print(double(21));\nfunction double(i32 x) -> i32 {\n    return x * 2;\n}\n"),
        "42\n"
    );
}

#[test]
fn globals_are_visible_inside_functions() {
    assert_eq!(
        output_of("i32 g = 7;\nfunction read_g() -> i32 {\n    return g;\n}\nprint(read_g());\n"),
        "7\n"
    );
}

#[test]
fn falling_off_the_end_or_a_bare_return_gives_the_zero_value() {
    // the phase-3 decision: no error, the return type's zero value
    assert_eq!(
        output_of(
            "function f(i32 n) -> i32 {\n    if (n > 0) {\n        return 5;\n    }\n    return;\n}\nfunction g() -> str {\n    if (false) {\n        return \"x\";\n    }\n}\nfunction h() -> bool {\n    if (false) {\n        return true;\n    }\n}\nprint(f(1), f(0), g(), h());\n"
        ),
        "5 0  false\n" // g() is the empty str: one space, then nothing
    );
}

#[test]
fn unit_functions_do_their_work_and_return_unit() {
    let src = "function say(str s) {\n    print(s);\n    return;\n}\nsay(\"hi\");\n";
    assert_eq!(output_of(src), "hi\n");
}

#[test]
fn recursion_computes_factorial_and_fibonacci() {
    let src = "function fact(i32 n) -> i32 {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * fact(n - 1);\n}\nprint(fact(10));\n";
    assert_eq!(output_of(src), "3628800\n");
}

#[test]
fn user_functions_shadow_builtins() {
    // §2.5: a user `abs` wins over the builtin — the checker resolved it
    assert_eq!(
        output_of("function abs(i32 x) -> i32 {\n    return x;\n}\nprint(abs(-9));\n"),
        "-9\n"
    );
}

#[test]
fn a_top_level_return_simply_ends_the_program() {
    assert_eq!(output_of("print(\"a\");\nreturn;\nprint(\"b\");\n"), "a\n");
}

// ---- final is compile-side only ----------------------------------------------------

#[test]
fn final_is_enforced_by_the_checker_never_re_checked_at_runtime() {
    // reassigning a final never reaches the interpreter…
    let tokens = tic::tokenize("final i32 M = 1;\nM = 2;\n").unwrap();
    let program = tic::parse(&tokens).unwrap();
    let errors = tic::check(&program).unwrap_err();
    assert!(
        errors.iter().any(|e| e.error_code() == "T2021"),
        "reassignment must be a compile error, got {errors:?}"
    );
    // …and a program that respects its finals just runs (the runtime
    // treats final slots exactly like every other slot)
    assert_eq!(output_of("final i32 M = 3;\nprint(M * M);\n"), "9\n");
}

// ---- the phase-4 math toolbox --------------------------------------------------------

#[test]
fn math_builtins_follow_the_phase3_signatures() {
    // sqrt/floor/ceil/pow: f64 in, f64 out
    assert_eq!(output_of("print(sqrt(9.0), sqrt(0.0));\n"), "3.0 0.0\n");
    assert_eq!(output_of("print(floor(2.7), ceil(2.1), floor(-2.7));\n"), "2.0 3.0 -3.0\n");
    assert_eq!(output_of("print(pow(2.0, 10.0), pow(2.0, 0.5));\n"), "1024.0 1.4142135623730951\n");
    // abs/min/max: same numeric type in and out
    assert_eq!(output_of("print(abs(-5), abs(5), abs(-2.5));\n"), "5 5 2.5\n");
    assert_eq!(output_of("print(min(3, 7), max(3, 7), min(1.5, 0.5));\n"), "3 7 0.5\n");
}

// ---- the phase-5/6 boundary from the running side ------------------------------------

#[test]
fn the_memory_builtins_run_for_real_since_phase_5() {
    // len and random answered clean phase-5 placeholders until this
    // phase; now they run. (input is exercised only through real stdin,
    // so it stays untested here — see NOTES.md.)
    assert_eq!(output_of("i32 n = len(\"hi\");\nprint(n);\n"), "2\n");
    let opts = RunOptions { random_seed: Some(7), ..RunOptions::default() };
    let out = run_src("print(random(1, 1));\n", opts).unwrap();
    assert_eq!(out, "1\n", "a one-value range always picks it, seeded or not");
}

// ---- the value/print-format unit bank -------------------------------------------
// Moved here from `src/interp/value.rs` in phase 7: every case uses only
// public API, and the relocation brought value.rs under the repo's
// ~400-line soft cap (no module slot could be freed in src/interp/ —
// it sits at the five-file hard cap).

use std::cell::RefCell;
use std::rc::Rc;
use tic::checker::{ShapeId, TicType};
use tic::interp::{ClassInstance, ObjData, Slot, Value, Width};
use tic::Span;

#[test]
fn floats_print_shortest_with_a_dot_on_whole_numbers() {
    assert_eq!(Value::Float(4.0, Width::F64).to_string(), "4.0");
    assert_eq!(Value::Float(3.5, Width::F64).to_string(), "3.5");
    assert_eq!(Value::Float(-0.0, Width::F64).to_string(), "-0.0");
    // Rust's `{}` never switches to exponent form, so even a huge float
    // prints digit-for-digit — with the forced `.0`.
    assert!(Value::Float(1e21, Width::F64).to_string().ends_with(".0"));
    assert_eq!(Value::Float(f64::INFINITY, Width::F64).to_string(), "inf");
    assert_eq!(Value::Float(f64::NAN, Width::F64).to_string(), "NaN");
    // 0.1_f32 keeps the f32 spelling, not the f64 tail
    assert_eq!(Value::Float(0.1_f32 as f64, Width::F32).to_string(), "0.1");
}

#[test]
fn scalars_print_per_the_fixture_rules() {
    assert_eq!(Value::Int(-5, Width::I32).to_string(), "-5");
    assert_eq!(Value::Bool(true).to_string(), "true");
    assert_eq!(Value::Bool(false).to_string(), "false");
    assert_eq!(Value::Char('A').to_string(), "A");
    assert_eq!(Value::str("hello").to_string(), "hello");
    assert_eq!(Value::Unit.to_string(), "()");
    assert_eq!(Value::Null.to_string(), "null");
}

#[test]
fn arrays_print_in_the_stable_bracketed_format() {
    let ints = Value::Array(
        Rc::new(RefCell::new(vec![
            Rc::new(RefCell::new(Value::Int(1, Width::I32))),
            Rc::new(RefCell::new(Value::Int(2, Width::I32))),
            Rc::new(RefCell::new(Value::Int(3, Width::I32))),
        ])),
        TicType::DynArray(Box::new(TicType::I32)),
    );
    assert_eq!(ints.to_string(), "[1, 2, 3]");
    // empty dynamic array
    let empty = Value::Array(
        Rc::new(RefCell::new(Vec::new())),
        TicType::DynArray(Box::new(TicType::I32)),
    );
    assert_eq!(empty.to_string(), "[]");
    // strs and chars are quoted inside so elements stay readable
    let mixed = Value::Array(
        Rc::new(RefCell::new(vec![
            Rc::new(RefCell::new(Value::str("a b"))),
            Rc::new(RefCell::new(Value::Char('c'))),
        ])),
        TicType::DynArray(Box::new(TicType::Str)),
    );
    assert_eq!(mixed.to_string(), "[\"a b\", 'c']");
    // a pointer prints as an address noun, null as null
    let ptr = Value::Pointer(Rc::new(RefCell::new(Value::Int(42, Width::I32))));
    assert_eq!(ptr.to_string(), "ptr");
}

#[test]
fn int_ranges_match_the_widths() {
    assert!(Width::I8.fits_int(127));
    assert!(!Width::I8.fits_int(128));
    assert!(!Width::I8.fits_int(-129));
    assert!(Width::U8.fits_int(255));
    assert!(!Width::U8.fits_int(256));
    assert!(!Width::U8.fits_int(-1));
    assert!(Width::U64.fits_int(i64::MAX)); // stored in an i64 (§4.4)
    assert!(!Width::F64.fits_int(0)); // floats have no int range
}

#[test]
fn zeros_follow_the_21_table() {
    let span = Span::point(0);
    assert_eq!(Value::zero(&TicType::I8, span).unwrap(), Value::Int(0, Width::I8));
    assert_eq!(Value::zero(&TicType::F64, span).unwrap(), Value::Float(0.0, Width::F64));
    assert_eq!(Value::zero(&TicType::Str, span).unwrap(), Value::str(""));
    assert_eq!(Value::zero(&TicType::Unit, span).unwrap(), Value::Unit);
    // a pointer's zero is null, arrays zero per §2.1
    assert_eq!(
        Value::zero(&TicType::Pointer(Box::new(TicType::I32)), span).unwrap(),
        Value::Null
    );
    let dyn_zero = Value::zero(&TicType::DynArray(Box::new(TicType::I32)), span).unwrap();
    assert_eq!(dyn_zero.to_string(), "[]");
    let fixed = Value::zero(&TicType::FixedArray(Box::new(TicType::I64), 3), span).unwrap();
    assert_eq!(fixed.to_string(), "[0, 0, 0]");
    // each element is its own slot (aliasing never crosses arrays)
    if let Value::Array(cells, _) = fixed {
        let slots = cells.borrow();
        assert!(!Rc::ptr_eq(&slots[0], &slots[1]));
    }
}

#[test]
fn instances_objs_and_enums_print_in_the_stable_formats() {
    // Counter { count: 5, label: "x" } — class name, named fields,
    // strs and chars quoted inside.
    let instance = Value::Instance(Rc::new(RefCell::new(ClassInstance {
        class: "Counter".to_string(),
        fields: vec![
            ("count".to_string(), Rc::new(RefCell::new(Value::Int(5, Width::I32)))),
            ("label".to_string(), Rc::new(RefCell::new(Value::str("x")))),
        ],
    })));
    assert_eq!(instance.to_string(), "Counter { count: 5, label: \"x\" }");
    // { enabled: true } — objs print their stored (name-sorted) order.
    let obj = Value::Object(
        Rc::new(RefCell::new(ObjData {
            fields: vec![
                ("enabled".to_string(), Rc::new(RefCell::new(Value::Bool(true)))),
            ],
        })),
        ShapeId(1),
    );
    assert_eq!(obj.to_string(), "{ enabled: true }");
    // enums print the bare variant name (fixture 08 depends on this)
    let light = Value::EnumValue {
        enum_name: "Light".to_string(),
        variant: "Green".to_string(),
    };
    assert_eq!(light.to_string(), "Green");
    // a slot is address-takeable storage (the &x target) — type-level smoke
    let slot: Slot = Rc::new(RefCell::new(Value::Unit));
    assert_eq!(slot.borrow().to_string(), "()");
}
