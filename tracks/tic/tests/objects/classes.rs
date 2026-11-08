//! The classes half of the phase-6 bank: `new` (with and without
//! `init`, with and without args), `this`, methods (returning values or
//! unit, calling each other, recursing under the depth cap), reference
//! semantics through assignment AND arguments, identity `==`/`!=`, and
//! field slots — including `&this.field`-style pointers (plan §2.1,
//! §6.4).

use super::{error_of_opts, output_of, run_src};
use tic::interp::RunOptions;

#[test]
fn new_runs_parameterized_init_and_methods_read_this() {
    let out = output_of(
        r#"
class Counter {
    i32 count;
    str label;
    function init(str name) { this.count = 0; this.label = name; }
    function bump(i32 by) -> i32 { this.count += by; return this.count; }
    function describe() -> str { return this.label + " is at " + this.count; }
}
Counter c = new Counter("clicks");
print(c.describe());
print(c.bump(2), c.bump(3));
"#,
    );
    assert_eq!(out, "clicks is at 0\n2 5\n");
}

#[test]
fn absent_init_leaves_the_zero_values_in_place() {
    let out = output_of(
        "
class P {\n    i32 n;\n    str s;\n}\n
P p = new P();\n
print(p.n, len(p.s));\n
",
    );
    assert_eq!(out, "0 0\n");
}

#[test]
fn init_can_skip_fields_and_run_extra_logic() {
    // init does not have to touch every field: whatever it leaves alone
    // keeps the zero value it was born with.
    let out = output_of(
        r#"
class C {
    i32 touched;
    i32 untouched;
    function init() { this.touched = 42; }
}
C c = new C();
print(c.touched, c.untouched);
"#,
    );
    assert_eq!(out, "42 0\n");
}

#[test]
fn methods_returning_unit_still_have_side_effects() {
    let out = output_of(
        "
class C {\n    i32 x;\n    function set(i32 v) { this.x = v; }\n}\n
C c = new C();\n
c.set(7);\n
print(c.x);\n
",
    );
    assert_eq!(out, "7\n");
}

#[test]
fn a_method_can_call_another_method_on_this() {
    let out = output_of(
        "
class C {\n    i32 x;\n
    function inc() -> i32 { this.x += 1; return this.x; }\n
    function twice() -> i32 { this.inc(); return this.inc(); }\n
}\n
C c = new C();\n
print(c.twice());\n
",
    );
    assert_eq!(out, "2\n");
}

#[test]
fn method_recursion_runs_to_completion_by_default() {
    let src = "
class C {\n    function down(i32 n) -> i32 {\n        if (n <= 0) { return 0; }\n        return this.down(n - 1);\n    }\n}\n
C c = new C();\n
print(c.down(3));\n
";
    assert_eq!(output_of(src), "0\n");
}

#[test]
fn method_recursion_past_the_depth_cap_is_friendly() {
    let src = "
class C {\n    function down(i32 n) -> i32 {\n        if (n <= 0) { return 0; }\n        return this.down(n - 1);\n    }\n}\n
C c = new C();\n
print(c.down(5));\n
";
    // c.down(5) needs 6 frames; --max-depth 6 fits exactly …
    let ok = run_src(src, RunOptions { max_depth: 6, ..RunOptions::default() });
    assert!(ok.is_ok(), "{ok:?}");
    // … and --max-depth 5 stops the sixth warmly (T3003, §2.6 rule 5).
    let err = error_of_opts(src, RunOptions { max_depth: 5, ..RunOptions::default() });
    assert_eq!(err.error_code(), "T3003");
    assert_eq!(err.family().exit_code(), 2);
}

// ---- reference semantics + identity ------------------------------------------

#[test]
fn assignment_shares_one_box_so_aliases_see_mutations() {
    let out = output_of(
        "
class C {\n    i32 x;\n    function set(i32 v) { this.x = v; }\n}\n
C a = new C();\n
C b = a;\n
b.set(7);\n
print(a.x);\n
",
    );
    assert_eq!(out, "7\n");
}

#[test]
fn instances_passed_as_arguments_share_too() {
    let out = output_of(
        "
class C {\n    i32 x;\n    function bump() { this.x += 1; }\n}\n
function twice(C c) { c.bump(); c.bump(); }\n
C mine = new C();\n
twice(mine);\n
print(mine.x);\n
",
    );
    assert_eq!(out, "2\n");
}

#[test]
fn instance_equality_is_identity_not_content() {
    // Two boxes with identical fields are still two boxes (§2.1).
    let out = output_of(
        "
class C {\n    i32 x;\n}\n
C a = new C();\n
C b = a;\n
C other = new C();\n
print(a == b, a != b);\n
print(a == other, a != other);\n
",
    );
    assert_eq!(out, "true false\nfalse true\n");
}

// ---- fields as slots: reads, writes, pointers ---------------------------------

#[test]
fn field_reads_and_plain_and_compound_writes_work_from_outside() {
    let out = output_of(
        "
class C {\n    i32 n;\n}\n
C c = new C();\n
c.n = 5;\n
c.n += 2;\n
c.n *= 2;\n
print(c.n);\n
",
    );
    assert_eq!(out, "14\n");
}

#[test]
fn a_pointer_to_a_field_watches_exactly_that_field() {
    // `&this.field` from a method and `&c.field` at top level hand out
    // the field's own slot — reads AND writes go through (§6.4).
    let out = output_of(
        "
class C {\n    i32 x;\n    function init() { this.x = 7; }\n    function pin() -> i32* { return &this.x; }\n}\n
C c = new C();\n
i32* p = c.pin();\n
print(*p);\n
*p = 9;\n
print(c.x);\n
i32* q = &c.x;\n
*q += 1;\n
print(c.x);\n
",
    );
    assert_eq!(out, "7\n9\n10\n");
}
