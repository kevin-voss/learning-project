//! The error-program suite (PLAN §9 row "Error tests", §10 row 9):
//! small programs that **must fail**, each pinned to its T-code, a
//! message snippet (the `docs/errors.md` wording) and the §7 exit code
//! — asserted at two levels:
//!
//! * the **library pipeline** — the exact stage, code, message and
//!   family, and
//! * the **built binary** — the process exit code, with the code and
//!   message on stderr: the CLI-level coverage the unit banks
//!   (checker / interp / objects / snapshots) don't have.
//!
//! Coverage: every family T0–T4, 51 of the 54 codes in docs/errors.md.
//! The three deliberate gaps:
//!
//! * **T2002** — the parser refuses `final i32 MAX;` first (T1001);
//!   the checker's twin is a defensive backstop no source text reaches.
//! * **T3006** — "internal error" is for bugs in Tic itself; by
//!   definition no student program may produce it (that is its promise).
//! * **T4001** — nothing is unimplemented once the REPL (phase 8)
//!   lands; the code stays for future roadmap stages.

// At the repo's five-files-per-directory cap: harness here, the case
// banks in compile (T0+T1) / types (T2) / runtime (T3) / cli (T4).
mod cli;
mod compile;
mod runtime;
mod types;

use tic::diagnostics::TicError;
use tic::Writer;

/// Which pipeline stage raised the error — part of each case's contract
/// (a runtime stop must have checked clean first, and so on).
#[derive(Debug, PartialEq, Eq, Clone, Copy)]
pub(crate) enum Stage {
    Lex,
    Parse,
    Check,
    Run,
}

/// One error program and everything it must produce.
pub(crate) struct Case {
    /// The T-code the error must carry, e.g. `"T0001"`.
    pub(crate) code: &'static str,
    /// The program text (`String` — the nesting case is generated).
    pub(crate) src: String,
    /// A fragment the headline must contain.
    pub(crate) snippet: &'static str,
    /// Where the program must fail.
    pub(crate) stage: Stage,
    /// The §7 process exit code. The error's *family* decides it
    /// (docs/errors.md): compile stages exit 1, the runtime family 2 —
    /// wherever in the pipeline the error fired (T3005 is the one code
    /// that can fire at parse time *and* exit 2).
    pub(crate) exit: u8,
}

/// Build a case for a compile-stage failure (exit 1).
fn compile_case(code: &'static str, src: &str, snippet: &'static str, stage: Stage) -> Case {
    let exit = match stage {
        Stage::Run => 2,
        _ => 1,
    };
    Case { code, src: src.to_string(), snippet, stage, exit }
}

/// Every case, all families (the built-binary loop runs these).
fn all_cases() -> Vec<Case> {
    let mut all = compile::cases();
    all.extend(types::cases());
    all.extend(runtime::cases());
    all.extend(runtime::deep_cases());
    all
}

/// A Writer that swallows output: error programs may print before they
/// stop, and none of it matters to the verdict.
struct Discard;

impl Writer for Discard {
    fn write(&mut self, _text: &str) {}
}

/// Run the full pipeline and report the first error, with its stage.
fn pipeline(src: &str) -> (Stage, TicError) {
    let tokens = match tic::tokenize(src) {
        Err(err) => return (Stage::Lex, err),
        Ok(tokens) => tokens,
    };
    let program = match tic::parse(&tokens) {
        Err(errors) => {
            let err = errors
                .errors
                .into_iter()
                .next()
                .expect("a failed parse reports at least one error");
            return (Stage::Parse, err);
        }
        Ok(program) => program,
    };
    let checked = match tic::check(&program) {
        Err(errors) => {
            return (
                Stage::Check,
                errors.into_iter().next().expect("a failed check reports at least one error"),
            )
        }
        Ok(checked) => checked,
    };
    match tic::interp::run(&checked, src, &mut Discard, tic::RunOptions::default()) {
        Err(err) => (Stage::Run, err),
        Ok(()) => panic!("this program must fail somewhere: {src:?}"),
    }
}

/// Assert one case's full library-level contract.
fn assert_verdict(case: &Case, stage: Stage, err: &TicError) {
    assert_eq!(
        err.error_code(),
        case.code,
        "{:?}: wrong code at {stage:?} — {}",
        case.src,
        err.message()
    );
    assert_eq!(stage, case.stage, "{:?}: wrong stage ([{}] {})", case.src, case.code, err.message());
    assert!(
        err.message().contains(case.snippet),
        "{:?}: message {:?} must contain {:?}",
        case.src,
        err.message(),
        case.snippet
    );
    assert_eq!(
        err.family().exit_code(),
        case.exit,
        "{:?}: the {} family's exit code",
        case.src,
        case.code
    );
}

/// The shared entry: run one case through the library pipeline.
pub(crate) fn assert_case(case: &Case) {
    let (stage, err) = pipeline(&case.src);
    assert_verdict(case, stage, &err);
}

/// The deep-recursion twins: a 1000-frame run legitimately needs more
/// stack than a test thread gets, so the case runs on a 64 MiB thread
/// (the CLI gives its runner thread the same headroom).
pub(crate) fn assert_case_big_stack(case: &Case) {
    let src = case.src.clone();
    let (stage, err) = std::thread::scope(|scope| {
        std::thread::Builder::new()
            .stack_size(64 * 1024 * 1024)
            .spawn_scoped(scope, move || pipeline(&src))
            .expect("spawn the big-stack test thread")
            .join()
            .expect("the big-stack test thread must not panic")
    });
    assert_verdict(case, stage, &err);
}

/// The deliverable's own bar, pinned: every family present, well past
/// fifteen distinct codes (T4 is binary-only — `cli.rs` carries it).
#[test]
fn the_suite_covers_every_family_and_fifteen_plus_codes() {
    let cases = all_cases();
    let codes: Vec<&str> = cases.iter().map(|c| c.code).collect();
    for family in ["T0", "T1", "T2", "T3"] {
        assert!(
            codes.iter().any(|code| code.starts_with(family)),
            "the {family} family must have a case"
        );
    }
    let distinct = codes
        .iter()
        .copied()
        .collect::<std::collections::BTreeSet<_>>()
        .len();
    assert!(distinct >= 15, "at least 15 distinct codes, got {distinct}");
}

/// Every case through the **built binary**: the process exit code, and
/// stderr carrying both the T-code and the message snippet — the way a
/// student actually meets each error.
#[test]
fn every_case_fails_the_same_way_through_the_built_binary() {
    use std::process::Command;
    for case in all_cases() {
        let path = std::env::temp_dir().join(format!("tic-p9-errors-{}-{name}.tic", std::process::id(), name = case.code));
        std::fs::write(&path, &case.src).unwrap_or_else(|e| panic!("write {}: {e}", path.display()));
        let output = Command::new(env!("CARGO_BIN_EXE_tic"))
            .arg(&path)
            .current_dir(env!("CARGO_MANIFEST_DIR"))
            .output()
            .unwrap_or_else(|e| panic!("run the binary on {}: {e}", path.display()));
        let _ = std::fs::remove_file(&path);
        assert_eq!(
            output.status.code(),
            Some(case.exit as i32),
            "{:?}: exit code through the binary",
            case.src
        );
        let stderr = String::from_utf8_lossy(&output.stderr);
        assert!(
            stderr.contains(case.code),
            "{:?}: stderr must carry {}:\n{stderr}",
            case.src,
            case.code
        );
        assert!(
            stderr.contains(case.snippet),
            "{:?}: stderr must contain {:?}:\n{stderr}",
            case.src,
            case.snippet
        );
    }
}
