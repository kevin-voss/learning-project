//! Phase 9 integration harness (PLAN §9 row "Integration", §10 row 9):
//! **every** `examples/*/*.tic` runs through the public library API
//! (`tic::interp::run` with a Vec-backed Writer) and must match its
//! `expected/` twin byte for byte. Clean examples exit 0; the two
//! teaching-error examples (02, 05) print all their successful output
//! first and then stop on their planned runtime error — exit 2, the
//! `.stderr_contains` word in the message. `binary.rs` runs the same
//! pack through the built binary, the way a student does.
//!
//! Discovery is dynamic (a new `examples/<group>/<name>.tic` joins the
//! pack automatically), and the found set is pinned to the README's
//! examples map so the student contract and reality cannot drift apart.

mod binary;

use tic::checker::CheckedProgram;
use tic::diagnostics::TicError;
use tic::interp::{run, RunOptions, Writer};

/// One discovered example plus its fixtures.
pub(crate) struct Example {
    /// `basics/01_hello` — the group folder and stem, as the README's
    /// examples map spells it.
    pub(crate) id: String,
    /// Path to the `.tic` file, relative to the crate root.
    pub(crate) path: String,
    /// Source text.
    pub(crate) src: String,
    /// The exact stdout the pack promises.
    pub(crate) stdout: String,
    /// `Some(code)` when the example ends in a planned teaching error.
    pub(crate) exit: Option<i32>,
    /// Lines the runtime error's message must contain.
    pub(crate) stderr_contains: Vec<String>,
}

/// Every `examples/*/*.tic` with its fixtures, group order then name
/// order — deterministic run after run.
pub(crate) fn examples() -> Vec<Example> {
    let mut found: Vec<Example> = Vec::new();
    let mut groups: Vec<_> = std::fs::read_dir("examples")
        .expect("examples/ ships with the repo — run tests from the crate root")
        .flatten()
        .map(|entry| entry.path())
        .filter(|path| path.is_dir())
        .collect();
    groups.sort();
    for group in groups {
        let group_name = group.file_name().expect("a dir entry has a name");
        let group_name = group_name.to_string_lossy().to_string();
        let mut tics: Vec<_> = std::fs::read_dir(&group)
            .unwrap_or_else(|e| panic!("read {}: {e}", group.display()))
            .flatten()
            .map(|entry| entry.path())
            .filter(|path| path.extension().is_some_and(|ext| ext == "tic"))
            .collect();
        tics.sort();
        for tic_path in tics {
            let stem = tic_path.file_stem().expect("a .tic file has a stem");
            let stem = stem.to_string_lossy().to_string();
            let expected = group.join("expected");
            let read = |ext: &str| {
                std::fs::read_to_string(expected.join(format!("{stem}.{ext}")))
                    .unwrap_or_else(|e| panic!("{group_name}/{stem} needs expected/{stem}.{ext}: {e}"))
            };
            found.push(Example {
                id: format!("{group_name}/{stem}"),
                path: tic_path.display().to_string(),
                src: std::fs::read_to_string(&tic_path)
                    .unwrap_or_else(|e| panic!("read {}: {e}", tic_path.display())),
                stdout: read("stdout"),
                exit: std::fs::read_to_string(expected.join(format!("{stem}.exit")))
                    .ok()
                    .map(|text| text.trim().parse::<i32>().expect(".exit holds one number")),
                stderr_contains: std::fs::read_to_string(
                    expected.join(format!("{stem}.stderr_contains")),
                )
                .map(|text| {
                    text.lines().filter(|line| !line.is_empty()).map(str::to_string).collect()
                })
                .unwrap_or_default(),
            });
        }
    }
    assert!(!found.is_empty(), "no examples found under examples/*/");
    found
}

/// The test seam: everything the program prints lands in this String.
struct VecWriter(String);

impl Writer for VecWriter {
    fn write(&mut self, text: &str) {
        self.0.push_str(text);
    }
}

/// Full pipeline up to the interpreter's input: every example must lex,
/// parse and type-check cleanly before it can earn its fixture.
fn check_src(src: &str) -> CheckedProgram {
    let tokens = tic::tokenize(src).expect("the example lexes");
    let program = tic::parse(&tokens).expect("the example parses");
    tic::check(&program).expect("the example type-checks")
}

/// The pack IS the README's examples map: same three folders, same nine
/// programs (README, "The examples"). A file added or renamed here must
/// take the README with it — that is the point of the pin.
#[test]
fn the_pack_is_the_readmes_examples_map() {
    let pack = examples();
    let ids: Vec<&str> = pack.iter().map(|e| e.id.as_str()).collect();
    assert_eq!(
        ids,
        [
            "basics/01_hello",
            "basics/02_types_and_memory",
            "basics/03_control_flow",
            "building/04_functions_recursion",
            "building/05_pointers",
            "building/06_arrays_sorting",
            "objects/07_classes",
            "objects/08_enums_and_obj",
            "objects/99_capstone",
        ],
        "examples/*/*.tic must match the README's examples map"
    );
}

/// Fixture hygiene: every example has a `.stdout`; only the planned
/// teaching errors have an `.exit`, and each of those names its
/// `.stderr_contains` word.
#[test]
fn fixtures_are_complete_and_paired() {
    for example in examples() {
        match example.exit {
            Some(_) => assert!(
                !example.stderr_contains.is_empty(),
                "{}: a .exit fixture needs a .stderr_contains word",
                example.id
            ),
            None => assert!(
                example.stderr_contains.is_empty(),
                "{}: a clean example must not carry a .stderr_contains fixture",
                example.id
            ),
        }
    }
}

/// The clean majority: run, exit 0, stdout byte-exact.
#[test]
fn clean_examples_match_their_stdout_byte_for_byte() {
    for example in examples().into_iter().filter(|e| e.exit.is_none()) {
        let checked = check_src(&example.src);
        let mut writer = VecWriter(String::new());
        run(&checked, &example.src, &mut writer, RunOptions::default())
            .unwrap_or_else(|err| panic!("{} must run clean: [{}] {}", example.id, err.error_code(), err));
        assert_eq!(writer.0, example.stdout, "{}: stdout must be byte-exact", example.id);
    }
}

/// The two planned teaching errors: every successful print happens
/// first, then the run stops with the fixture's exit code and the
/// `.stderr_contains` word in the message (README: "they still exit 2
/// with all their successful output printed first").
#[test]
fn teaching_error_examples_print_everything_then_stop() {
    let error_examples: Vec<Example> =
        examples().into_iter().filter(|e| e.exit.is_some()).collect();
    assert_eq!(error_examples.len(), 2, "exactly 02 and 05 end in teaching errors");
    for example in error_examples {
        let checked = check_src(&example.src);
        let mut writer = VecWriter(String::new());
        let err = run(&checked, &example.src, &mut writer, RunOptions::default())
            .expect_err(&format!("{} must stop on its teaching error", example.id));
        let expected_exit = u8::try_from(example.exit.unwrap()).expect(".exit fits a process code");
        assert_eq!(err.family().exit_code(), expected_exit, "{}: exit code", example.id);
        assert_eq!(writer.0, example.stdout, "{}: stdout up to the error", example.id);
        for word in &example.stderr_contains {
            assert!(
                err.message().contains(word.as_str()),
                "{}: message {:?} must contain {word:?}",
                example.id,
                err.message()
            );
        }
    }
}

/// Sanity for the harness itself: the pipeline helper refuses bad input
/// (guards against the loops above vacuously passing).
#[test]
fn the_pipeline_helper_actually_fails_broken_programs() {
    let tokens = tic::tokenize("i32 x = \"no\";").expect("lexes");
    let program = tic::parse(&tokens).expect("parses");
    assert!(tic::check(&program).is_err(), "a broken program must not reach run");
    let err = TicError::UnterminatedString { span: tic::Span::new(0, 1) };
    assert_eq!(err.family().exit_code(), 1);
}
