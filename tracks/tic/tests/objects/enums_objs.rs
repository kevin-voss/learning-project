//! The enums + objs half of the phase-6 bank: enum values (print as the
//! bare variant, compare within their enum, zero = first variant), obj
//! literals (§5.4: reads, updates, one shared box), the bare-obj runtime
//! field/method checks (T3009, the §5.4 escape hatch), the pinned print
//! formats, and §2.1's zero column for every field type.

use super::{error_of, output_of};

// ---- enums ---------------------------------------------------------------------

#[test]
fn enums_print_the_bare_variant_and_compare_within() {
    let out = output_of(
        "
enum Light { Red, Yellow, Green }\n
Light a = Light.Green;\n
Light b = Light.Green;\n
Light c = Light.Red;\n
print(a);\n
print(a == b, a != b);\n
print(a == c, a != c);\n
",
    );
    assert_eq!(out, "Green\ntrue false\nfalse true\n");
}

#[test]
fn enums_travel_through_functions_and_class_fields() {
    let out = output_of(
        "
enum Light { Red, Green }\n
function pick(Light l) -> str {\n    if (l == Light.Red) { return \"stop\"; }\n    return \"go\";\n}\n
enum St { Idle, Done }\n
class C { St s; }\n
C c = new C();\n
print(pick(Light.Red), pick(Light.Green));\n
print(c.s, c.s == St.Idle);\n
",
    );
    assert_eq!(out, "stop go\nIdle true\n");
}

#[test]
fn an_enum_declaration_without_init_starts_at_the_first_variant() {
    // §2.1: an enum's zero value IS its first variant.
    let out = output_of(
        "
enum St { On, Off }\n
St s;\n
print(s, s == St.On);\n
",
    );
    assert_eq!(out, "On true\n");
}

#[test]
fn an_enum_returning_function_that_falls_off_returns_the_first_variant() {
    let out = output_of(
        "
enum St { On, Off }\n
function f() -> St { if (false) { return St.Off; } }\n
St s = f();\n
print(s);\n
",
    );
    assert_eq!(out, "On\n");
}

// ---- objs (§5.4) -----------------------------------------------------------------

#[test]
fn obj_literals_read_and_update_through_one_shared_box() {
    let out = output_of(
        "
obj o = { retries: 3, enabled: true };\n
print(o.retries, o.enabled);\n
o.retries = 5;\n
o.retries += 1;\n
print(o.retries);\n
obj alias = o;\n
alias.retries = 0;\n
print(o.retries);\n
",
    );
    assert_eq!(out, "3 true\n6\n0\n");
}

#[test]
fn bare_obj_parameters_read_and_write_the_callers_obj() {
    let out = output_of(
        "
function bump(obj u) { u.level = u.level + 1; }\n
obj user = { name: \"Ada\", level: 3 };\n
bump(user);\n
bump(user);\n
print(user.level);\n
",
    );
    assert_eq!(out, "5\n");
}

#[test]
fn bare_obj_missing_field_read_names_the_fields_and_suggests() {
    let err = error_of(
        "
function read(obj u) -> i32 { return u.nmae; }\n
obj user = { name: \"Ada\", level: 3 };\n
print(read(user));\n
",
    );
    assert_eq!(err.error_code(), "T3009");
    assert_eq!(err.family().exit_code(), 2);
    let msg = err.message();
    assert!(msg.contains("`nmae`"), "{msg}");
    // the fields the obj actually has, in the stored (name-sorted) order
    assert!(msg.contains("level, name"), "{msg}");
    let hint = err.hint().unwrap();
    assert!(hint.contains("name"), "a did-you-mean for the typo: {hint}");
}

#[test]
fn bare_obj_missing_field_write_is_the_same_friendly_error() {
    let err = error_of(
        "
function set(obj u) { u.nmae = \"x\"; }\n
obj user = { name: \"Ada\" };\n
set(user);\n
",
    );
    assert_eq!(err.error_code(), "T3009");
    assert!(err.message().contains("`nmae`"), "{}", err.message());
}

#[test]
fn bare_obj_far_miss_stays_quiet_on_the_runtime_path_too() {
    // The runtime twin of the checker far-miss tests: nothing the obj
    // has is close, so no guess is offered — the fields are still named.
    let err = error_of(
        "
function read(obj u) -> i32 { return u.zzzzzz; }\n
obj user = { name: \"Ada\", level: 3 };\n
print(read(user));\n
",
    );
    assert_eq!(err.error_code(), "T3009");
    let hint = err.hint().unwrap();
    assert!(!hint.contains("did you mean"), "no nonsense guess: {hint}");
    assert!(hint.contains("while the program runs"), "still teaches: {hint}");
}

#[test]
fn a_method_call_on_a_bare_obj_is_rejected_at_runtime() {
    // objs have fields only (no methods in v1). Calling a method on an
    // `obj` *parameter* is a compile error (T2009), but through a bare
    // obj *field* the receiver's type is Dynamic — the checker hands it
    // to the runtime (§5.4), which names what the obj does have.
    let err = error_of(
        "
function m(obj u) -> i32 { return u.o.bump(); }\n
obj outer = { o: { x: 1 } };\n
print(m(outer));\n
",
    );
    assert_eq!(err.error_code(), "T3009");
    let msg = err.message();
    assert!(msg.contains("method `bump`"), "{msg}");
    assert!(msg.contains("x"), "the fields it does have: {msg}");
}

#[test]
fn a_method_missing_on_an_instance_through_a_bare_obj_is_friendly() {
    // `u.c` is Dynamic, so the method could only be checked at runtime;
    // the instance's class does not have it.
    let err = error_of(
        "
class C { i32 x; }\n
function call(obj u) -> i32 { return u.c.zap(); }\n
obj o = { c: new C() };\n
print(call(o));\n
",
    );
    assert_eq!(err.error_code(), "T3009");
    assert!(err.message().contains("zap"), "{}", err.message());
}

#[test]
fn an_obj_returning_function_that_falls_off_yields_the_zero_shape() {
    // The checker refines a `-> obj` function's return type to the one
    // shape its returns agree on (§5.4), so the fall-off zero is that
    // shape with every field zeroed — not an error.
    let out = output_of(
        "
function mk() -> obj { if (false) { return { x: 1, f: 2.0 }; } }\n
obj o = mk();\n
print(o.x, o.f);\n
",
    );
    assert_eq!(out, "0 0.0\n");
}

#[test]
fn a_bare_passthrough_obj_function_that_falls_off_is_t3010_not_internal() {
    // Phase 6's known edge, closed in phase 7: every `return` hands a
    // *bare* obj through, so no shape unifies and the checker leaves the
    // return type bare — falling off the end cannot invent a zero obj.
    // That is a lesson about the student's program (T3010), not a Tic
    // bug (the T3006 backstop it used to hit).
    let err = error_of(
        "
function pass(obj u) -> obj { if (false) { return u; } }\n
obj o = { x: 1 };\n
obj r = pass(o);\n
",
    );
    assert_eq!(err.error_code(), "T3010");
    assert_eq!(err.family().exit_code(), 2);
    let msg = err.message();
    assert!(msg.contains("`pass` ended without returning a value"), "{msg}");
    assert!(msg.contains("no zero value"), "{msg}");
    let hint = err.hint().unwrap();
    assert!(hint.contains("return …;"), "{hint}");
    assert!(!hint.contains("bug in Tic"), "not the T3006 backstop: {hint}");
}

// ---- print formats (pinned; the fixtures never print these) -----------------------

#[test]
fn instances_print_the_class_name_and_named_fields() {
    let out = output_of(
        r#"
class P { i32 n; str s; }
P p = new P();
p.n = 5;
p.s = "hi";
print(p);
"#,
    );
    assert_eq!(out, "P { n: 5, s: \"hi\" }\n");
}

#[test]
fn objs_print_fields_in_name_sorted_order_whatever_the_literal_order() {
    let out = output_of(
        "
obj o = { retries: 3, enabled: true, tag: 'x' };\n
print(o);\n
",
    );
    assert_eq!(out, "{ enabled: true, retries: 3, tag: 'x' }\n");
}

// ---- zero values for every field type (§2.1) ---------------------------------------

#[test]
fn every_field_type_starts_at_its_zero_value() {
    let out = output_of(
        "
enum St { On, Off }\n
class Z {\n    i8 a;\n    i32 b;\n    f64 c;\n    bool d;\n    char e;\n    str f;\n    i32[2] g;\n    i32[] h;\n    i32* i;\n    St j;\n}\n
Z z = new Z();\n
print(z.a, z.b, z.c, z.d);\n
print(i32(z.e), len(z.f));\n
print(z.g, len(z.h));\n
print(z.i == null, z.i);\n
print(z.j, z.j == St.On);\n
",
    );
    assert_eq!(out, "0 0 0.0 false\n0 0\n[0, 0] 0\ntrue null\nOn true\n");
}
