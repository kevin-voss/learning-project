//! The same pack through the **built binary** (`CARGO_BIN_EXE_tic`) —
//! the §7 contract exactly as a student sees it: process exit codes
//! (0 clean · 1 compile · 2 runtime), stdout byte-exact, stderr naming
//! the lesson, the `--max-depth` flag end-to-end, and a smoke run of
//! every x-ray flag (`--tokens`, `--ast`, `--trace`).

use std::path::PathBuf;
use std::process::{Command, Output};

use super::examples;

/// Run the built binary with `args`, from the crate root.
fn tic(args: &[&str]) -> Output {
    Command::new(env!("CARGO_BIN_EXE_tic"))
        .args(args)
        .current_dir(env!("CARGO_MANIFEST_DIR"))
        .output()
        .unwrap_or_else(|e| panic!("run the built binary with {args:?}: {e}"))
}

/// Write `src` to a uniquely named temp file (removed by the caller).
fn temp_program(name: &str, src: &str) -> PathBuf {
    let path = std::env::temp_dir().join(format!(
        "tic-p9-{}-{name}.tic",
        std::process::id()
    ));
    std::fs::write(&path, src).unwrap_or_else(|e| panic!("write {}: {e}", path.display()));
    path
}

/// Every example through the binary: exit code (the fixture's, else 0),
/// stdout byte-exact, stderr carrying the teaching word when planned.
#[test]
fn every_example_through_the_built_binary() {
    for example in examples() {
        let output = tic(&[&example.path]);
        let expected_exit = example.exit.unwrap_or(0);
        assert_eq!(
            output.status.code(),
            Some(expected_exit),
            "{}: exit code must be {expected_exit}",
            example.id
        );
        assert_eq!(
            String::from_utf8_lossy(&output.stdout),
            example.stdout,
            "{}: stdout must be byte-exact through the binary",
            example.id
        );
        if example.exit.is_some() {
            let stderr = String::from_utf8_lossy(&output.stderr);
            for word in &example.stderr_contains {
                assert!(
                    stderr.contains(word.as_str()),
                    "{}: stderr must contain {word:?}: {stderr}",
                    example.id
                );
            }
        }
    }
}

/// The §7 exit-code table, one real program per row.
#[test]
fn exit_codes_are_success_compile_runtime() {
    let clean = temp_program("clean", "print(\"ok\");\n");
    let compile = temp_program("compile", "i32 x = \"no\";\n");
    let runtime = temp_program("runtime", "print(1 / 0);\n");
    let cases = [(&clean, 0, ""), (&compile, 1, "T2"), (&runtime, 2, "T3")];
    for (path, code, family) in cases {
        let output = tic(&[&path.display().to_string()]);
        assert_eq!(output.status.code(), Some(code), "{}", path.display());
        if !family.is_empty() {
            let stderr = String::from_utf8_lossy(&output.stderr);
            assert!(stderr.contains(family), "{path:?}: stderr must name a {family} code: {stderr}");
        }
    }
    for path in [clean, compile, runtime] {
        let _ = std::fs::remove_file(path);
    }
}

/// `--max-depth` moves the recursion wall for the SAME program (§7):
/// 50 frames fit under 100 but not under 10 — the friendly T3003 both
/// times, never a native crash.
#[test]
fn max_depth_takes_effect_end_to_end() {
    let program = temp_program(
        "count",
        "function count(i32 n) -> i32 {\n    if (n <= 0) { return 0; }\n    return count(n - 1);\n}\nprint(count(50));\n",
    );
    let path = program.display().to_string();

    let refused = tic(&["--max-depth", "10", &path]);
    assert_eq!(refused.status.code(), Some(2));
    let stderr = String::from_utf8_lossy(&refused.stderr);
    assert!(stderr.contains("T3003"), "the friendly recursion error: {stderr}");
    assert!(stderr.contains("too much recursion"), "{stderr}");

    let fine = tic(&["--max-depth", "100", &path]);
    assert_eq!(fine.status.code(), Some(0));
    assert_eq!(String::from_utf8_lossy(&fine.stdout), "0\n");

    let _ = std::fs::remove_file(program);
}

/// `--tokens`: the stable one-token-per-line dump (kind, lexeme, span).
#[test]
fn tokens_flag_dumps_the_token_stream() {
    let output = tic(&["--tokens", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(0));
    let stdout = String::from_utf8_lossy(&output.stdout);
    // The lexeme is Debug-printed, so embedded quotes come backslash-
    // escaped — match inside the lexeme instead.
    for needle in ["TyStr", "Ident", "\"name\"", "Hello", "Eof"] {
        assert!(stdout.contains(needle), "--tokens must show {needle}:\n{stdout}");
    }
}

/// `--ast`: the pretty-printed tree of the same program.
#[test]
fn ast_flag_dumps_the_tree() {
    let output = tic(&["--ast", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(0));
    let stdout = String::from_utf8_lossy(&output.stdout);
    for needle in ["program", "var_decl", "expr_stmt", "call"] {
        assert!(stdout.contains(needle), "--ast must show {needle}:\n{stdout}");
    }
}

/// `--trace`: the program's output interleaved with the phase-7 trace
/// format — `[trace] line N: …` naming what each statement changed.
#[test]
fn trace_flag_runs_and_traces() {
    let output = tic(&["--trace", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(0));
    assert_eq!(
        String::from_utf8_lossy(&output.stdout),
        "[trace] line 2: name = World\nHello, World!\n[trace] line 3: (no changes)\n",
        "the stable --trace format"
    );
}

/// `tic check` prints nothing on success (§7) — and still exits 0.
#[test]
fn check_is_silent_on_success() {
    let output = tic(&["check", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(0));
    assert!(output.stdout.is_empty(), "check prints nothing: {:?}", output.stdout);
    assert!(output.stderr.is_empty(), "check prints nothing: {:?}", output.stderr);
}

/// `--help` and `--version` are part of the one-binary contract.
#[test]
fn help_and_version_work() {
    let help = tic(&["--help"]);
    assert_eq!(help.status.code(), Some(0));
    let help = String::from_utf8_lossy(&help.stdout);
    for flag in ["--tokens", "--ast", "--trace", "--max-depth"] {
        assert!(help.contains(flag), "--help must mention {flag}:\n{help}");
    }
    let version = tic(&["--version"]);
    assert_eq!(version.status.code(), Some(0));
    assert!(String::from_utf8_lossy(&version.stdout).contains("tic"), "version names the tool");
}
