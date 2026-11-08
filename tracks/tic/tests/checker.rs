//! Checker integration tests (phase 3, plan §9): every example program
//! in `examples/` must type-check to completion, and a bank of small
//! broken programs must each be rejected with the right T2xxx code —
//! the fixtures are chosen to parse cleanly, so what fails is *types*.

use std::fs;
use std::path::PathBuf;

use tic::checker::{check, CheckedProgram};
use tic::diagnostics::TicError;
use tic::{lexer, parser};

// ---- helpers --------------------------------------------------------------

fn parse_clean(src: &str) -> tic::Program {
    let tokens = lexer::tokenize(src).expect("fixture lexes");
    let program = parser::parse(&tokens);
    match program {
        Ok(program) => program,
        Err(errors) => panic!(
            "fixture must parse cleanly (it tests the checker):\n  first: {:?}",
            errors.errors[0]
        ),
    }
}

/// The full pipeline up to the checker: every error is a T2xxx.
fn type_errors(src: &str) -> Vec<TicError> {
    let program = parse_clean(src);
    match check(&program) {
        Ok(_) => panic!("expected type errors, but this checked clean"),
        Err(errors) => {
            assert!(
                errors.iter().all(|e| e.error_code().starts_with("T2")),
                "non-T2 error leaked: {:?}",
                errors.iter().map(TicError::error_code).collect::<Vec<_>>()
            );
            errors
        }
    }
}

/// `Ok` result or panic with every error code found.
fn checks_clean(src: &str) -> CheckedProgram {
    let program = parse_clean(src);
    match check(&program) {
        Ok(checked) => checked,
        Err(errors) => panic!(
            "expected this to check clean, got: {:?}",
            errors.iter().map(|e| (e.error_code(), e.message())).collect::<Vec<_>>()
        ),
    }
}

fn first_code(errors: &[TicError]) -> String {
    errors[0].error_code()
}

// ---- the teaching pack (§10 row 3: "all examples type-check") --------------

const EXAMPLES: [&str; 9] = [
    "examples/basics/01_hello.tic",
    "examples/basics/02_types_and_memory.tic",
    "examples/basics/03_control_flow.tic",
    "examples/building/04_functions_recursion.tic",
    "examples/building/05_pointers.tic",
    "examples/building/06_arrays_sorting.tic",
    "examples/objects/07_classes.tic",
    "examples/objects/08_enums_and_obj.tic",
    "examples/objects/99_capstone.tic",
];

#[test]
fn all_nine_examples_type_check() {
    for rel in EXAMPLES {
        let path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(rel);
        let src = fs::read_to_string(&path)
            .unwrap_or_else(|e| panic!("cannot read {}: {e}", path.display()));
        checks_clean(&src);
    }
}

/// §5.4 in action on example 08: `user` and `also_user` write the same
/// fields in different orders — one interned shape.
#[test]
fn obj_shapes_intern_order_free_in_example_08() {
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(EXAMPLES[7]);
    let src = fs::read_to_string(&path).expect("example 08 is readable");
    let checked = checks_clean(&src);
    assert_eq!(checked.shapes.len(), 1, "user and also_user share one shape");
}

// ---- the reject bank ------------------------------------------------------
//
// (name, program, the T2xxx it must produce). One #[test] walks the
// table so a new case is one line; the assert message names the case.

const REJECTS: &[(&str, &str, &str)] = &[
    // declarations (§5.3 row 1)
    ("duplicate variable", "i32 x = 1; i32 x = 2;", "T2001"),
    ("duplicate function", "function f() { } function f() { }", "T2001"),
    ("duplicate parameter", "function f(i32 a, str a) { }", "T2001"),
    ("duplicate class field", "class C { i32 a; str a; }", "T2001"),
    ("duplicate enum variant", "enum E { A, A }", "T2001"),
    ("global vs function name", "function f() { } i32 f = 1;", "T2001"),
    ("final reassignment", "final i32 M = 1;\nM = 2;", "T2021"),
    ("type-mismatch initializer", "i32 x = \"hello\";", "T2003"),
    ("int literal does not become a float", "f64 x = 7;", "T2003"),
    ("int literal does not become a char", "char c = 65;", "T2003"),
    ("obj variable from a number", "obj o = 5;", "T2003"),
    // §2.1: obj and class types have NO zero value — the initializer is
    // part of the declaration (an enum's zero IS its first variant, so
    // `enum E { A } E e;` stays legal — see the accept tests).
    ("obj without an initializer", "obj o;", "T2003"),
    ("class instance without an initializer", "class C { i32 a; }\nC c;", "T2003"),
    ("unit call used as a value", "function f() { } i32 x = f();", "T2003"),
    // conditions (§5.3 row 3)
    ("non-bool if condition", "if (1) { }", "T2004"),
    ("non-bool while condition", "while (\"x\") { }", "T2004"),
    // calls (§5.3 row 4)
    ("wrong function arity", "function f(i32 a) -> i32 { return a; }\nf(1, 2);", "T2007"),
    ("argument type mismatch", "function f(i32 a) -> i32 { return a; }\nf(\"x\");", "T2003"),
    ("wrong method arity", "class C { function m(i32 a) -> i32 { return a; } }\nC c = new C();\nprint(c.m());", "T2007"),
    ("wrong new/init arity", "class C { function init(i32 a) { } }\nprint(new C());", "T2007"),
    ("new with args but no init", "class C { }\nprint(new C(1));", "T2007"),
    ("unknown function", "foo(1);", "T2006"),
    ("calling a variable", "i32 x = 1;\nx(2);", "T2026"),
    ("input wants a str prompt", "print(input(3));", "T2003"),
    ("len of a number", "print(len(3));", "T2003"),
    ("pop on a fixed array", "i32[2] a = [1, 2];\npop(a);", "T2003"),
    // returns (§5.3 row 4)
    ("return type mismatch", "function f() -> i32 { return \"x\"; }", "T2003"),
    ("return value from a unit function", "function f() { return 1; }", "T2003"),
    // names, fields, methods, classes, enums
    ("unknown variable", "print(y);", "T2005"),
    ("unknown class field", "class C { i32 a; }\nC c = new C();\nprint(c.b);", "T2008"),
    ("unknown obj field (read)", "obj o = { x: 1 };\nprint(o.y);", "T2008"),
    ("method used as a field", "class C { function m() -> i32 { return 1; } }\nC c = new C();\nprint(c.m);", "T2008"),
    ("unknown method", "class C { }\nC c = new C();\nc.m();", "T2009"),
    ("method on a scalar", "i32 x = 1;\nx.foo();", "T2009"),
    ("unknown class", "print(new Cx());", "T2011"),
    ("unknown enum variant", "enum E { A }\nprint(E.B);", "T2010"),
    ("assignment to a function name", "function f() { }\nf = 1;", "T2022"),
    ("this outside a method", "function f() -> i32 { return this.x; }", "T2025"),
    // operators (§2.3, §5.3 row 2)
    ("i32 plus f64", "i32 a = 1; f64 b = 2.0; print(a + b);", "T2012"),
    ("number plus str", "print(1 + \"x\");", "T2012"),
    ("char plus char", "print('a' + 'b');", "T2012"),
    ("minus on str", "str s = \"a\"; print(s - s);", "T2012"),
    ("str with relational", "print(\"a\" < \"b\");", "T2012"),
    ("non-bool && operand", "print(1 && true);", "T2012"),
    ("negating a bool", "print(-true);", "T2012"),
    ("cross-enum equality", "enum A { X } enum B { Y }\nprint(A.X == B.Y);", "T2013"),
    ("obj equality", "obj a = { x: 1 }; obj b = { x: 2 };\nprint(a == b);", "T2013"),
    ("array equality", "i32[] a = [1]; i32[] b = [1];\nprint(a == b);", "T2013"),
    ("null against a number", "print(null == 1);", "T2013"),
    ("i32 against str equality", "print(1 == \"a\");", "T2013"),
    // pointers (§5.3 row 8)
    ("address-of a value", "i32 x = 1;\ni32* p = &(x + 1);", "T2015"),
    ("deref of a non-pointer", "i32 x = 1;\nprint(*x);", "T2014"),
    ("null into an i32", "i32 x = null;", "T2003"),
    // casts (§2.5) and size_of (README)
    ("bool from a number", "print(bool(1));", "T2016"),
    ("int from a bool", "print(i32(true));", "T2016"),
    ("size_of on obj", "print(size_of(obj));", "T2017"),
    ("size_of on a class", "class C { }\nprint(size_of(C));", "T2017"),
    ("type name as a value", "print(i32);", "T2018"),
    // indexing and arrays (§5.3 row 5)
    ("index on a non-array", "i32 x = 1;\nprint(x[0]);", "T2019"),
    ("non-integer index", "i32[2] a = [1, 2];\nprint(a[\"x\"]);", "T2020"),
    ("array element mismatch", "i32[2] a = [1, \"x\"];", "T2003"),
    ("fixed-array size mismatch", "i32[3] a = [1, 2];", "T2003"),
    // obj shapes (§5.4)
    ("unknown-field write on a known obj", "obj a = { x: 1 };\na.y = 2;", "T2023"),
    ("shape mismatch on assignment", "obj a = { x: 1 }; obj b = { y: \"s\" };\na = b;", "T2024"),
    (
        "returns do not unify to one shape",
        "function f() -> obj {\n    if (true) { return { a: 1 }; }\n    return { b: 2 };\n}",
        "T2024",
    ),
];

#[test]
fn every_reject_case_reports_its_t2_code() {
    for (name, src, code) in REJECTS {
        let errors = type_errors(src);
        let codes: Vec<String> = errors.iter().map(TicError::error_code).collect();
        assert!(codes.iter().any(|c| c == code), "{name}: wanted {code} in {codes:?}\n  src: {src}");
    }
}

#[test]
fn reject_bank_covers_the_required_thirty() {
    // The task list in §10 row 3 — keep the bank well past it.
    assert!(REJECTS.len() >= 30, "only {} reject cases", REJECTS.len());
}

// ---- errors that teach: hints and spans ------------------------------------

#[test]
fn i32_plus_f64_names_the_cast() {
    let errors = type_errors("i32 a = 1; f64 b = 2.0; print(a + b);");
    assert_eq!(first_code(&errors), "T2012");
    let hint = errors[0].hint().expect("T2012 always carries a hint");
    assert!(hint.contains("f64(x) + y"), "hint should name the cast: {hint}");
    assert!(errors[0].label().is_some(), "span underlines the operator");
}

#[test]
fn num_plus_str_points_to_the_str_side() {
    let errors = type_errors("print(1 + \"x\");");
    let hint = errors[0].hint().expect("hint");
    assert!(hint.contains("LEFT"), "hint: {hint}");
}

#[test]
fn unknown_field_write_suggests_the_close_field() {
    let errors = type_errors("obj a = { x: 1 };\na.xy = 2;");
    assert_eq!(first_code(&errors), "T2023");
    let hint = errors[0].hint().expect("hint");
    assert!(hint.contains("did you mean `.x`"), "hint: {hint}");
}

#[test]
fn shape_mismatch_spells_both_shapes() {
    let errors = type_errors("obj a = { x: 1 }; obj b = { y: \"s\" };\na = b;");
    assert_eq!(first_code(&errors), "T2024");
    let message = errors[0].message();
    assert!(message.contains("x: i32") && message.contains("y: str"), "message: {message}");
}

// ---- accept side: the subtle rules that must NOT be errors ------------------

#[test]
fn int_literals_are_width_polymorphic() {
    // `big + 1` is i8 arithmetic (the runtime overflow in example 02).
    checks_clean("i8 big = 127; i8 sum = big + 1; print(sum);");
    checks_clean("u8 small = 200; u8 widened = 1 + small;");
    checks_clean("i8 x = 1 + 2;"); // both literals take the expected i8
}

#[test]
fn typed_values_never_convert() {
    // The mirror of the two cases above: variables stay their type.
    checks_clean("i32 a = 1; i32 b = a + 2;");
}

#[test]
fn str_on_the_left_concats_anything() {
    checks_clean("str s = \"n = \" + 42;\ns += \"!\";\nprint(s, \"ok\" + 'c');");
}

#[test]
fn bare_obj_parameters_defer_to_runtime() {
    checks_clean(
        "function greet(obj u) -> str {\n    return \"hello, \" + u.name;\n}\nobj user = { name: \"Ada\" };\nprint(greet(user));",
    );
}

#[test]
fn equal_shapes_are_assignable_in_any_order() {
    checks_clean(
        "obj a = { x: 1, y: \"s\" };\nobj b = { y: \"s\", x: 2 };\na = b;\nprint(a.y);",
    );
}

#[test]
fn pointer_returns_and_null_comparisons() {
    checks_clean(
        "function make() -> i32* {\n    i32 n = 7;\n    return &n;\n}\ni32* p = make();\nprint(p == null);",
    );
}

#[test]
fn functions_see_classes_declared_later() {
    // The two-sweep signature collection: `Counter` is hoisted.
    checks_clean(
        "function first(Counter c) -> i32 { return c.count; }\nclass Counter { i32 count; }\nCounter c = new Counter();\nprint(first(c));",
    );
}

#[test]
fn casts_from_the_readme_table() {
    checks_clean(
        "char a = 'A';\nprint(i32(a), i32(2.7), f64(7), f64(7) / f64(2), char(97), str(42), u8(200));",
    );
}

#[test]
fn shadowing_between_scopes_is_legal() {
    checks_clean("i32 x = 1;\n{ str x = \"s\"; print(x); }\nprint(x);");
}

#[test]
fn builtin_pipeline_type_checks() {
    checks_clean(
        "i32[] a = range(3);\npush(a, len(a));\nprint(a[0], len(\"abc\"), len(copy(a)));",
    );
}

// ---- did-you-mean: every unknown-name site, near-miss + far-miss ----------
// Phase 7 (§10 row 7): a close candidate must be suggested; a far miss
// must not produce a nonsense suggestion. Near-miss = the hint names the
// candidate; far-miss = the hint has no "did you mean" at all.

/// The first hint that mentions `did you mean`, or the first hint.
fn hint_of(errors: &[TicError]) -> String {
    errors.first().expect("at least one error").hint().unwrap_or_default()
}

#[test]
fn unknown_variable_suggests_an_in_scope_name() {
    let errors = type_errors("i32 count = 1;\nprint(cont);\n");
    assert_eq!(first_code(&errors), "T2005");
    let hint = hint_of(&errors);
    assert!(hint.contains("did you mean `count`"), "{hint}");
}

#[test]
fn unknown_variable_far_miss_stays_quiet() {
    let errors = type_errors("i32 count = 1;\nprint(zzzzzzz);\n");
    let hint = hint_of(&errors);
    assert!(!hint.contains("did you mean"), "no nonsense guess: {hint}");
    assert!(hint.contains("declare"), "still teaches: {hint}");
}

#[test]
fn unknown_variable_near_a_builtin_learns_to_call_it() {
    // `prnt` is not a variable — the closest name is the builtin `print`,
    // and the hint teaches that builtins are called, not read.
    let errors = type_errors("i32 x = prnt;\n");
    assert_eq!(first_code(&errors), "T2005");
    let hint = hint_of(&errors);
    assert!(hint.contains("print"), "{hint}");
    assert!(hint.contains("call it"), "{hint}");
}

#[test]
fn unknown_function_suggests_the_builtin_roster() {
    let errors = type_errors("prnt(1);\n");
    assert_eq!(first_code(&errors), "T2006");
    let hint = hint_of(&errors);
    assert!(hint.contains("did you mean `print`"), "{hint}");
    // and a user function is suggested when it is the closer name
    let errors = type_errors("function double(i32 x) -> i32 { return x * 2; }\nprint(doubl(2));\n");
    let hint = hint_of(&errors);
    assert!(hint.contains("did you mean `double`"), "{hint}");
}

#[test]
fn unknown_function_far_miss_stays_quiet() {
    let errors = type_errors("zzzzzz(1);\n");
    assert!(!hint_of(&errors).contains("did you mean"));
}

#[test]
fn unknown_method_suggests_the_class_methods() {
    let errors = type_errors(
        "class C { i32 x; function bump() -> i32 { return 1; } }\nC c = new C();\nprint(c.bumm());\n",
    );
    assert_eq!(first_code(&errors), "T2009");
    assert!(hint_of(&errors).contains("did you mean `.bump(…)`"), "{}", hint_of(&errors));
    // far miss: no method is close, so none is guessed
    let errors = type_errors(
        "class C { i32 x; function bump() -> i32 { return 1; } }\nC c = new C();\nprint(c.zzzzz());\n",
    );
    assert!(!hint_of(&errors).contains("did you mean"), "{}", hint_of(&errors));
}

#[test]
fn method_call_on_a_known_obj_shape_points_at_the_field() {
    // objs hold fields, not methods (§5.4): the hint teaches the parens
    // are the mistake, and a near-miss field is named.
    let errors = type_errors("obj config = { retries: 3 };\nprint(config.retires());\n");
    assert_eq!(first_code(&errors), "T2009");
    let hint = hint_of(&errors);
    assert!(hint.contains("did you mean `.retries`"), "{hint}");
    assert!(hint.contains("without the `(…)`"), "{hint}");
    // exact field name: still the parens lesson, no distance guess needed
    let errors = type_errors("obj config = { retries: 3 };\nprint(config.retries());\n");
    let hint = hint_of(&errors);
    assert!(hint.contains("without the `(…)`"), "{hint}");
}

#[test]
fn unknown_class_field_suggests_the_close_field() {
    let errors = type_errors(
        "class C { i32 count; str label; }\nC c = new C();\nprint(c.cont);\n",
    );
    assert_eq!(first_code(&errors), "T2008");
    assert!(hint_of(&errors).contains("did you mean `.count`"), "{}", hint_of(&errors));
    let errors = type_errors(
        "class C { i32 count; str label; }\nC c = new C();\nprint(c.zzzzz);\n",
    );
    assert!(!hint_of(&errors).contains("did you mean"), "{}", hint_of(&errors));
}

#[test]
fn unknown_obj_shape_field_read_suggests_the_close_field() {
    let errors = type_errors("obj o = { name: \"Ada\", level: 3 };\nprint(o.nmae);\n");
    assert_eq!(first_code(&errors), "T2008");
    assert!(hint_of(&errors).contains("did you mean `.name`"), "{}", hint_of(&errors));
    let errors = type_errors("obj o = { name: \"Ada\", level: 3 };\nprint(o.zzzzzz);\n");
    assert!(!hint_of(&errors).contains("did you mean"), "{}", hint_of(&errors));
}

#[test]
fn unknown_obj_shape_field_write_suggests_too() {
    // T2023: writing a field a known shape does not have.
    let errors = type_errors("obj o = { name: \"Ada\" };\no.nmae = \"x\";\n");
    assert_eq!(first_code(&errors), "T2023");
    assert!(hint_of(&errors).contains("did you mean `.name`"), "{}", hint_of(&errors));
    let errors = type_errors("obj o = { name: \"Ada\" };\no.zzzzzz = \"x\";\n");
    assert!(!hint_of(&errors).contains("did you mean"), "{}", hint_of(&errors));
}

#[test]
fn unknown_enum_variant_suggests_the_close_variant() {
    let errors = type_errors("enum State { Idle, Running, Done }\nprint(State.Idel == State.Idle);\n");
    assert_eq!(first_code(&errors), "T2010");
    assert!(hint_of(&errors).contains("did you mean `State.Idle`"), "{}", hint_of(&errors));
    let errors = type_errors("enum State { Idle, Running, Done }\nprint(State.Zzzz);\n");
    assert!(!hint_of(&errors).contains("did you mean"), "{}", hint_of(&errors));
}

#[test]
fn unknown_class_in_new_suggests_the_declared_class() {
    let errors =
        type_errors("class Counter { i32 x; }\nCounter c = new Countre();\n");
    assert_eq!(first_code(&errors), "T2011");
    assert!(hint_of(&errors).contains("did you mean `new Counter(…)`"), "{}", hint_of(&errors));
    let errors = type_errors("class Counter { i32 x; }\nCounter c = new Zzzzzz();\n");
    assert!(!hint_of(&errors).contains("did you mean"), "{}", hint_of(&errors));
}

#[test]
fn unknown_type_in_a_signature_suggests_too() {
    // The parser catches `Foo x` statements (T1002 there); parameter and
    // field positions reach the *checker's* resolver — same teaching.
    let program = parse_clean("class Counter { i32 x; }\nfunction f(Countre c) -> i32 { return 1; }\n");
    let errors = check(&program).expect_err("the unknown parameter type is a T1002");
    assert!(errors.iter().any(|e| e.error_code() == "T1002"), "codes: {:?}",
        errors.iter().map(TicError::error_code).collect::<Vec<_>>());
    let hint = errors.iter().find(|e| e.error_code() == "T1002").unwrap().hint().unwrap();
    assert!(hint.contains("did you mean `Counter`"), "{hint}");
    // far miss: the builtin-type roster hint, no guess
    let program = parse_clean("function g(Zzzzzzz c) -> i32 { return 1; }\n");
    let errors = check(&program).expect_err("unknown type in a signature");
    let hint = errors.iter().find(|e| e.error_code() == "T1002").unwrap().hint().unwrap();
    assert!(!hint.contains("did you mean"), "{hint}");
    assert!(hint.contains("builtin types"), "{hint}");
}
