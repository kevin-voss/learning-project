//! Memory semantics through the public API (plan §10 row 5): fixed and
//! dynamic arrays (reference semantics, bounds checks, the dynamic
//! toolbox, `range`/`copy`/`len`/`size_of`), pointers (`&x`/`*p`, null,
//! identity, the outlived-local guarantee), and seeded `random`. The
//! error twin of the successful cases lives inline — every T3007/T3008
//! is pinned with its wording.

use super::{error_of, output_of, run_src};
use tic::diagnostics::TicError;
use tic::interp::RunOptions;

fn seeded(seed: u64) -> RunOptions {
    RunOptions { random_seed: Some(seed), ..RunOptions::default() }
}

/// The checker's verdict on a program that must NOT run — for the
/// compile-side half of the memory contract (fixed size lock, no str
/// indexing).
fn checker_errors(src: &str) -> Vec<TicError> {
    let tokens = tic::tokenize(src).expect("the program lexes");
    let program = tic::parse(&tokens).expect("the program parses");
    tic::check(&program).expect_err("the checker must reject this program")
}

// ---- fixed arrays: zero-init, literals, locked size ----------------------------

#[test]
fn fixed_arrays_zero_initialize_and_lock_their_size() {
    assert_eq!(
        output_of("i32[3] a;\nprint(len(a), a[0], a[1], a[2]);\n"),
        "3 0 0 0\n"
    );
    assert_eq!(output_of("i32[3] a = [1, 2, 3];\nprint(a[0], a[2]);\n"), "1 3\n");
    // writes go through the element's own slot
    assert_eq!(
        output_of("i32[2] a = [1, 2];\na[0] = 9;\na[1] += 5;\nprint(a[0], a[1]);\n"),
        "9 7\n"
    );
    // the size lock is a *compile* error for the growing builtins…
    let errors = checker_errors("i32[3] a = [1, 2, 3];\npush(a, 4);\n");
    assert!(
        errors.iter().all(|e| e.error_code().starts_with("T2")),
        "push on a fixed array must be a checker error, got {errors:?}"
    );
    // …and the runtime keeps its guard anyway (unit-tested in memory.rs:
    // as_dyn_array refuses a fixed array cleanly).
}

#[test]
fn fixed_array_literal_size_must_match_exactly() {
    let errors = checker_errors("i32[3] a = [1, 2];\n");
    assert_eq!(errors[0].error_code(), "T2003");
    assert!(errors[0].message().contains("2 element"), "{}", errors[0].message());
}

// ---- dynamic arrays: the toolbox -------------------------------------------------

#[test]
fn the_dynamic_toolbox_grows_and_shrinks() {
    let out = output_of(
        "i32[] nums = [8, 3, 5];\n\
         push(nums, 1);\n\
         insert(nums, 0, 9);\n\
         print(len(nums), nums[0]);\n\
         pop(nums);\n\
         remove(nums, 0);\n\
         print(len(nums), nums[0]);\n",
    );
    assert_eq!(out, "5 9\n3 8\n");
    // insert at the very end is allowed (index == len)
    assert_eq!(
        output_of("i32[] a = [1];\ninsert(a, 1, 2);\nprint(a[1]);\n"),
        "2\n"
    );
    // the empty dynamic array is the zero value (§2.1)
    assert_eq!(output_of("i32[] a = [];\nprint(len(a));\n"), "0\n");
}

#[test]
fn pop_and_remove_return_the_removed_element() {
    // The documented choice: both hand back what they took out (only
    // `pop`'s static type lets a program store it; `print` shows both).
    assert_eq!(output_of("i32[] a = [1, 2, 3];\ni32 last = pop(a);\nprint(last, len(a));\n"), "3 2\n");
    assert_eq!(output_of("i32[] a = [1, 2, 3];\nprint(remove(a, 1), len(a));\n"), "2 2\n");
}

#[test]
fn bounds_checks_name_the_index_and_the_length() {
    // read past the end
    let err = error_of("i32[3] a = [1, 2, 3];\nprint(a[3]);\n");
    assert_eq!(err.error_code(), "T3007");
    assert_eq!(err.family().exit_code(), 2);
    assert_eq!(
        err.message(),
        "index 3 is out of bounds — the array has 3 elements (indexes 0..2)"
    );
    // write past the end
    let err = error_of("i32[3] a = [1, 2, 3];\na[3] = 9;\n");
    assert_eq!(err.error_code(), "T3007");
    // negative index (computed, not literal — no constant folding)
    let err = error_of("i32[3] a = [1, 2, 3];\ni32 i = 0 - 2;\nprint(a[i]);\n");
    assert_eq!(err.error_code(), "T3007");
    assert!(err.message().contains("index -2"), "{}", err.message());
    // pop/remove on empty, insert beyond the end
    assert_eq!(error_of("i32[] a = [];\npop(a);\n").message(), "cannot pop from an empty array");
    let err = error_of("i32[] a = [1];\ninsert(a, 5, 0);\n");
    assert_eq!(err.error_code(), "T3007");
    assert!(err.message().contains("cannot insert at index 5"), "{}", err.message());
    let err = error_of("i32[] a = [1];\nremove(a, 1);\n");
    assert!(err.message().contains("cannot remove index 1"), "{}", err.message());
}

#[test]
fn range_makes_i32_dynamic_arrays_in_all_three_shapes() {
    assert_eq!(output_of("i32[] r = range(4);\nprint(len(r), r[0], r[3]);\n"), "4 0 3\n");
    assert_eq!(output_of("i32[] r = range(2, 5);\nprint(len(r), r[0], r[2]);\n"), "3 2 4\n");
    assert_eq!(
        output_of("i32[] r = range(0, 10, 3);\nprint(len(r));\nprint(r[0], r[1], r[2], r[3]);\n"),
        "4\n0 3 6 9\n"
    );
    // a negative step counts down (documented defensive support)
    assert_eq!(
        output_of("i32[] r = range(5, 2, -1);\nprint(len(r));\nprint(r[0], r[2]);\n"),
        "3\n5 3\n"
    );
    // step 0 is refused with a friendly error
    let err = error_of("i32[] r = range(0, 5, 0);\n");
    assert_eq!(err.error_code(), "T3007");
    assert!(err.message().contains("step cannot be 0"), "{}", err.message());
    // an empty range is a legal empty array
    assert_eq!(output_of("i32[] r = range(0);\nprint(len(r));\n"), "0\n");
}

#[test]
fn size_of_matches_the_readme_byte_table() {
    assert_eq!(
        output_of(
            "print(size_of(i8), size_of(u8), size_of(bool));\n\
             print(size_of(i16), size_of(u16));\n\
             print(size_of(i32), size_of(u32), size_of(f32), size_of(char));\n\
             print(size_of(i64), size_of(u64), size_of(f64));\n"
        ),
        "1 1 1\n2 2\n4 4 4 4\n8 8 8\n"
    );
    // size_of(str) is a compile error (a str's size varies)
    assert_eq!(checker_errors("print(size_of(str));\n")[0].error_code(), "T2017");
}

// ---- printing arrays, len, copy ---------------------------------------------------

#[test]
fn arrays_print_in_the_stable_bracketed_format() {
    assert_eq!(output_of("i32[] a = [1, 2, 3];\nprint(a);\n"), "[1, 2, 3]\n");
    assert_eq!(output_of("i32[] a = [];\nprint(a);\n"), "[]\n");
    // strs and chars are quoted inside so elements stay readable
    assert_eq!(output_of("str[] a = [\"x y\", \"z\"];\nprint(a);\n"), "[\"x y\", \"z\"]\n");
    assert_eq!(output_of("char[] a = ['o', 'k'];\nprint(a);\n"), "['o', 'k']\n");
    // pointers print as addresses, null as null
    assert_eq!(output_of("i32 x = 1;\ni32* p = &x;\nprint(p == null);\n"), "false\n");
}

#[test]
fn len_counts_str_code_points_and_array_elements() {
    assert_eq!(output_of("print(len(\"tic\"), len(\"\"));\n"), "3 0\n");
    // a char is a whole code point: h é l l o = 5
    assert_eq!(output_of("print(len(\"héllo\"));\n"), "5\n");
    assert_eq!(output_of("i32[7] a;\nprint(len(a));\n"), "7\n");
}

#[test]
fn assignment_shares_and_copy_copies() {
    // aliasing is visible through both names…
    assert_eq!(
        output_of("i32[] data = [1, 2];\ni32[] alias = data;\nalias[0] = 99;\nprint(data[0]);\n"),
        "99\n"
    );
    // …fixed arrays are shared the same way (reference semantics, §2.1)
    assert_eq!(
        output_of("i32[2] a = [1, 2];\ni32[2] b = a;\nb[0] = 99;\nprint(a[0]);\n"),
        "99\n"
    );
    // …and through function arguments (reference semantics, §2.1)
    assert_eq!(
        output_of(
            "function bump(i32[] a) {\n    a[0] += 1;\n}\n\
             i32[] xs = [5];\nbump(xs);\nprint(xs[0]);\n"
        ),
        "6\n"
    );
    // copy builds a truly separate array…
    assert_eq!(
        output_of(
            "i32[] data = [1, 2];\ni32[] snap = copy(data);\nsnap[0] = 40;\n\
             push(snap, 3);\nprint(data[0], len(data), len(snap));\n"
        ),
        "1 2 3\n"
    );
    // …and preserves the fixed/dynamic distinction of a fixed array
    assert_eq!(
        output_of("i32[3] a = [1, 2, 3];\ni32[3] b = copy(a);\nb[0] = 9;\nprint(a[0], b[0], len(b));\n"),
        "1 9 3\n"
    );
}

#[test]
fn str_indexing_is_rejected_by_the_checker() {
    // README is the contract: indexing is for arrays (`s[i]` is T2019)
    assert_eq!(checker_errors("str s = \"hi\";\nprint(s[0]);\n")[0].error_code(), "T2019");
}

// ---- pointers: &x, *p, null, identity ---------------------------------------------

#[test]
fn pointers_read_and_write_through_the_slot() {
    assert_eq!(
        output_of("i32 x = 42;\ni32* p = &x;\nprint(*p);\n*p = 99;\nprint(x);\n*p += 1;\nprint(x);\n"),
        "42\n99\n100\n"
    );
}

#[test]
fn two_pointers_can_watch_one_box() {
    assert_eq!(
        output_of("i32 x = 99;\ni32* p = &x;\ni32* q = &x;\n*q += 1;\nprint(*p, *q, x);\n"),
        "100 100 100\n"
    );
}

#[test]
fn pointer_equality_compares_slot_identity() {
    assert_eq!(
        output_of(
            "i32 x = 1;\ni32 y = 1;\ni32* p = &x;\ni32* q = &x;\ni32* r = &y;\n\
             print(p == q, p == r, p != r);\n"
        ),
        "true false true\n"
    );
    // null compares safely with pointers and with itself
    assert_eq!(
        output_of("i32 x = 1;\ni32* p = &x;\ni32* n = null;\nprint(n == null, p == null, p != n, n == n);\n"),
        "true false true true\n"
    );
}

#[test]
fn dereferencing_null_stops_the_program_read_and_write() {
    let err = error_of("i32* p = null;\nprint(*p);\n");
    assert_eq!(err.error_code(), "T3008");
    assert_eq!(err.family().exit_code(), 2);
    assert_eq!(err.message(), "null pointer dereference");
    let err = error_of("i32* p = null;\n*p = 5;\n");
    assert_eq!(err.error_code(), "T3008");
    // the render names the file and line, like every teaching error
    let src = "i32* p = null;\nprint(*p);\n";
    let rendered = tic::diagnostics::render(&error_of(src), "null.tic", src);
    assert!(rendered.contains("T3008"), "{rendered}");
    assert!(rendered.contains("null pointer dereference"), "{rendered}");
    assert!(rendered.contains("null.tic:2:7"), "{rendered}");
}

#[test]
fn a_pointer_to_a_function_local_outlives_the_call() {
    // §4.4's safety guarantee: the slot's Rc keeps it alive — no
    // dangling, ever. Read AND write after the return.
    assert_eq!(
        output_of(
            "function make() -> i32* {\n    i32 n = 7;\n    return &n;\n}\n\
             i32* r = make();\nprint(*r);\n*r += 1;\nprint(*r);\n"
        ),
        "7\n8\n"
    );
    // two calls make two distinct boxes (identity, not a shared cache)
    assert_eq!(
        output_of(
            "function make() -> i32* {\n    i32 n = 7;\n    return &n;\n}\n\
             i32* a = make();\ni32* b = make();\n*a = 1;\n*b = 2;\nprint(*a, *b, a == b);\n"
        ),
        "1 2 false\n"
    );
}

#[test]
fn pointers_pass_to_functions_and_swap() {
    assert_eq!(
        output_of(
            "function swap(i32* a, i32* b) {\n    i32 tmp = *a;\n    *a = *b;\n    *b = tmp;\n}\n\
             i32 x = 1;\ni32 y = 2;\nswap(&x, &y);\nprint(x, y);\n"
        ),
        "2 1\n"
    );
}

#[test]
fn element_pointers_work_and_survive_their_element_leaving() {
    // &arr[i] is the element's own slot: writes through either name show
    assert_eq!(
        output_of(
            "i32[] a = [10, 20];\ni32* p = &a[1];\n*p += 5;\nprint(a[1]);\na[1] = 0;\nprint(*p);\n"
        ),
        "25\n0\n"
    );
    // popping the element detaches the slot but never dangles it
    assert_eq!(
        output_of(
            "i32[] a = [10, 20];\ni32* p = &a[1];\npop(a);\nprint(*p);\n*p = 5;\nprint(*p, len(a));\n"
        ),
        "20\n5 1\n"
    );
    // bounds are checked before the pointer exists
    let err = error_of("i32[] a = [1];\ni32* p = &a[1];\n");
    assert_eq!(err.error_code(), "T3007");
}

// ---- random: seedable, inclusive -------------------------------------------------

#[test]
fn seeded_random_is_deterministic_and_inclusive() {
    let src = "i32 d1 = random(1, 6);\ni32 d2 = random(1, 6);\nprint(d1, d2);\n";
    let first = run_src(src, seeded(42)).unwrap();
    let again = run_src(src, seeded(42)).unwrap();
    assert_eq!(first, again, "the same seed must reproduce the sequence");
    // with a fixed seed the draws are pinned — assert every value stays
    // inside its own inclusive bounds over 60 varied ranges
    let mut draws = String::new();
    for i in 0..60 {
        let lo = i % 10;
        let hi = lo + 3;
        draws.push_str(&format!("print(random({lo}, {hi}));\n"));
    }
    let out = run_src(&draws, seeded(7)).unwrap();
    let values: Vec<i32> = out
        .lines()
        .map(|line| line.trim().parse::<i32>().unwrap())
        .collect();
    assert_eq!(values.len(), 60);
    for (i, v) in values.iter().enumerate() {
        let lo = (i as i32) % 10;
        assert!(*v >= lo && *v <= lo + 3, "draw {i} = {v} must be in {lo}..={}", lo + 3);
    }
}

#[test]
fn random_with_a_draw_each_end_hits_both_ends() {
    // range(2, 5) semantics: with both ends reachable, a long seeded run
    // must eventually produce each of them (inclusive both ends).
    let mut program = String::new();
    for _ in 0..80 {
        program.push_str("print(random(2, 3));\n");
    }
    let out = run_src(&program, seeded(99)).unwrap();
    let text = out.replace('\n', " ");
    assert!(text.contains('2') && text.contains('3'), "both ends reachable: {text}");
}

#[test]
fn random_refuses_reversed_bounds_with_a_friendly_error() {
    let err = error_of("i32 x = random(5, 2);\n");
    assert_eq!(err.error_code(), "T3007");
    assert!(err.message().contains("smaller number first"), "{}", err.message());
}
