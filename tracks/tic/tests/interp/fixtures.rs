//! The acceptance fixtures (plan §10 rows 4–6): `01_hello`,
//! `03_control_flow` and `04_functions_recursion` run clean and match
//! their `expected/*.stdout` **byte for byte**; `02_types_and_memory`
//! and `05_pointers` print all their successful output first and then
//! stop on their teaching runtime error (exit 2, stderr names it);
//! `06_arrays_sorting` runs clean; and the phase-6 trio — `07_classes`,
//! `08_enums_and_obj` and the capstone — runs clean too. The error
//! examples and the objects trio are also run through the **built
//! binary** to pin stdout + stderr + exit code the way a student sees
//! them. Plus the stable `--trace` format.

use super::output_of;
use tic::diagnostics::TicError;
use tic::interp::{run, RunOptions};

fn read(path: &str) -> String {
    std::fs::read_to_string(path).unwrap_or_else(|e| panic!("read {path}: {e}"))
}

fn assert_fixture_matches(tic_path: &str, stdout_path: &str) {
    let src = read(tic_path);
    let expected = read(stdout_path);
    let out = super::run_src(&src, RunOptions::default())
        .unwrap_or_else(|err| panic!("{tic_path} must run: [{}] {}", err.error_code(), err.message()));
    assert_eq!(out, expected, "{tic_path} must match {stdout_path} byte for byte");
}

#[test]
fn hello_example_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/basics/01_hello.tic",
        "examples/basics/expected/01_hello.stdout",
    );
}

#[test]
fn control_flow_example_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/basics/03_control_flow.tic",
        "examples/basics/expected/03_control_flow.stdout",
    );
}

#[test]
fn functions_recursion_example_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/building/04_functions_recursion.tic",
        "examples/building/expected/04_functions_recursion.stdout",
    );
}

#[test]
fn arrays_sorting_example_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/building/06_arrays_sorting.tic",
        "examples/building/expected/06_arrays_sorting.stdout",
    );
}

/// The two teaching-error examples: every successful print happens
/// first, then the run stops with the named runtime error (exit 2).
#[test]
fn types_and_memory_prints_everything_then_overflows() {
    let (out, err) = run_until_error("examples/basics/02_types_and_memory.tic");
    assert_eq!(out, read("examples/basics/expected/02_types_and_memory.stdout"));
    assert_eq!(err.error_code(), "T3001");
    assert_eq!(err.family().exit_code(), 2);
    assert!(err.message().contains("overflow"), "{}", err.message());
}

#[test]
fn pointers_prints_everything_then_derefs_null() {
    let (out, err) = run_until_error("examples/building/05_pointers.tic");
    assert_eq!(out, read("examples/building/expected/05_pointers.stdout"));
    assert_eq!(err.error_code(), "T3008");
    assert_eq!(err.family().exit_code(), 2);
    assert!(err.message().contains("null"), "{}", err.message());
}

/// Run a fixture through the public API, keeping the output the program
/// managed to print *before* its runtime error.
fn run_until_error(tic_path: &str) -> (String, TicError) {
    let src = read(tic_path);
    let checked = super::check_src(&src);
    let mut writer = super::VecWriter(String::new());
    let err = run(&checked, &src, &mut writer, RunOptions::default())
        .expect_err("{tic_path} must stop on its teaching runtime error");
    (writer.0, err)
}

/// The same two error examples through the **built binary**: byte-exact
/// stdout on stdout, the teaching word on stderr, exit code 2 (§7).
#[test]
fn teaching_error_examples_work_through_the_built_binary() {
    let cases: [(&str, &str, &str, &str); 2] = [
        (
            "examples/basics/02_types_and_memory.tic",
            "examples/basics/expected/02_types_and_memory.stdout",
            "examples/basics/expected/02_types_and_memory.exit",
            "examples/basics/expected/02_types_and_memory.stderr_contains",
        ),
        (
            "examples/building/05_pointers.tic",
            "examples/building/expected/05_pointers.stdout",
            "examples/building/expected/05_pointers.exit",
            "examples/building/expected/05_pointers.stderr_contains",
        ),
    ];
    for (tic, stdout, exit, stderr_contains) in cases {
        let output = std::process::Command::new(env!("CARGO_BIN_EXE_tic"))
            .arg(tic)
            .output()
            .unwrap_or_else(|e| panic!("run the built binary on {tic}: {e}"));
        assert_eq!(
            String::from_utf8_lossy(&output.stdout),
            read(stdout),
            "{tic}: stdout must match byte for byte"
        );
        assert_eq!(
            output.status.code(),
            Some(read(exit).trim().parse::<i32>().unwrap()),
            "{tic}: exit code must match {exit}"
        );
        let stderr = String::from_utf8_lossy(&output.stderr);
        for word in read(stderr_contains).lines().filter(|l| !l.is_empty()) {
            assert!(stderr.contains(word), "{tic}: stderr must contain {word:?}: {stderr}");
        }
    }
}

#[test]
fn classes_example_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/objects/07_classes.tic",
        "examples/objects/expected/07_classes.stdout",
    );
}

#[test]
fn enums_and_obj_example_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/objects/08_enums_and_obj.tic",
        "examples/objects/expected/08_enums_and_obj.stdout",
    );
}

/// THE milestone (§10 row 6, §8.3): the capstone uses nearly everything —
/// `final`, enums, a class with `init` and a method, `while` on a method
/// call, instance identity through `==`, and an obj literal.
#[test]
fn the_capstone_matches_its_fixture_exactly() {
    assert_fixture_matches(
        "examples/objects/99_capstone.tic",
        "examples/objects/expected/99_capstone.stdout",
    );
}

/// The phase-6 examples through the **built binary**: byte-exact stdout,
/// exit 0 — the way a student runs them (§7).
#[test]
fn objects_examples_work_through_the_built_binary() {
    let cases = [
        ("examples/objects/07_classes.tic", "examples/objects/expected/07_classes.stdout"),
        ("examples/objects/08_enums_and_obj.tic", "examples/objects/expected/08_enums_and_obj.stdout"),
        ("examples/objects/99_capstone.tic", "examples/objects/expected/99_capstone.stdout"),
    ];
    for (tic, stdout) in cases {
        let output = std::process::Command::new(env!("CARGO_BIN_EXE_tic"))
            .arg(tic)
            .output()
            .unwrap_or_else(|e| panic!("run the built binary on {tic}: {e}"));
        assert_eq!(
            String::from_utf8_lossy(&output.stdout),
            read(stdout),
            "{tic}: stdout must match byte for byte"
        );
        assert_eq!(output.status.code(), Some(0), "{tic}: a clean run exits 0");
    }
}

#[test]
fn trace_names_the_line_and_the_variables_it_changed() {
    // The phase-7 x-ray format: `[trace] line N: …` after every executed
    // statement (nested statements included), listing the variables that
    // statement *changed* — new, reassigned, or gone when a scope closed.
    // `(no changes)` marks a statement that only read.
    let out = super::run_src(
        "i32 x = 1;\nprint(x);\n{ i32 y = 2; }\n",
        RunOptions { trace: true, ..RunOptions::default() },
    )
    .unwrap();
    assert_eq!(
        out,
        "[trace] line 1: x = 1\n\
         1\n\
         [trace] line 2: (no changes)\n\
         [trace] line 3: y = 2\n\
         [trace] line 3: y (out of scope)\n",
        "one trace line per executed statement, program output interleaved"
    );
}

#[test]
fn trace_shows_reassignments_and_loop_turns_deterministically() {
    // A loop shows only what each turn changed, in name order — the
    // stable, readable shape §7 promises (same program, same lines).
    // Iteration 1's `total += 0` leaves the value at 0, so that step
    // honestly reads `(no changes)`; the for's scope closing shows
    // `i (out of scope)`. (Loop and if bodies trace their statements;
    // only a *standalone* `{ … }` block adds its own after-line — see
    // the test above.)
    let out = super::run_src(
        "i32 total = 0;\nfor (i32 i = 0; i < 2; i += 1) { total += i; }\nprint(total);\n",
        RunOptions { trace: true, ..RunOptions::default() },
    )
    .unwrap();
    assert_eq!(
        out,
        "[trace] line 1: total = 0\n\
         [trace] line 2: i = 0\n\
         [trace] line 2: (no changes)\n\
         [trace] line 2: i = 1\n\
         [trace] line 2: total = 1\n\
         [trace] line 2: i = 2\n\
         [trace] line 2: i (out of scope)\n\
         1\n\
         [trace] line 3: (no changes)\n",
        "deterministic loop trace"
    );
}

#[test]
fn runtime_errors_render_with_file_and_line_like_compile_errors() {
    let src = "i8 big = 127;\nprint(big + 1);\n";
    let err = super::error_of(src);
    let rendered = tic::diagnostics::render(&err, "ovf.tic", src);
    assert!(rendered.contains("T3001"), "{rendered}");
    assert!(rendered.contains("i8 overflow (127 + 1)"), "{rendered}");
    assert!(rendered.contains("ovf.tic:2:7"), "the file and line must be named: {rendered}");
}

#[test]
fn overflow_and_depth_family_exit_codes() {
    assert_eq!(super::error_of("i8 b = 127; print(b + 1);").family().exit_code(), 2);
    assert_eq!(super::error_of("print(1 / 0);").family().exit_code(), 2);
    assert_eq!(
        matches!(super::error_of("print(i32(\"x\"));"), TicError::CastFailed { .. }),
        true
    );
    // A clean program still produces only its own output (no trailing noise).
    assert_eq!(output_of("print(\"done\");"), "done\n");
}
