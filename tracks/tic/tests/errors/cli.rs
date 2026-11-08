//! The **T4xxx CLI/usage** bank (exit 1): mistakes made on the command
//! line, not in a program — so these run only through the **built
//! binary** (there is no library-level source to feed the pipeline).
//! T4001 ("not implemented yet") has no case: once the REPL lands,
//! nothing on the roadmap is missing — see the suite header.

use std::process::Command;

/// Run the built binary with `args` from the crate root.
fn tic(args: &[&str]) -> std::process::Output {
    Command::new(env!("CARGO_BIN_EXE_tic"))
        .args(args)
        .current_dir(env!("CARGO_MANIFEST_DIR"))
        .output()
        .unwrap_or_else(|e| panic!("run the built binary with {args:?}: {e}"))
}

#[test]
fn missing_file_is_t4002_exit_1() {
    let output = tic(&["no/such/file.tic"]);
    assert_eq!(output.status.code(), Some(1));
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("T4002"), "{stderr}");
    assert!(stderr.contains("cannot read"), "{stderr}");
    assert!(stderr.contains("no/such/file.tic"), "the error names the path: {stderr}");
}

#[test]
fn two_modes_at_once_is_t4003_exit_1() {
    // A file argument AND --tokens: two modes, one invocation.
    let output = tic(&["examples/basics/01_hello.tic", "--tokens", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(1));
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("T4003"), "{stderr}");
    assert!(stderr.contains("pick one mode"), "{stderr}");
}

#[test]
fn max_depth_zero_is_t4003_exit_1() {
    let output = tic(&["--max-depth", "0", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(1));
    let stderr = String::from_utf8_lossy(&output.stderr);
    assert!(stderr.contains("T4003"), "{stderr}");
    assert!(stderr.contains("--max-depth must be at least 1"), "{stderr}");
}

/// An unknown flag is clap's own usage error: no T-code, but still exit
/// 1 — exit 2 stays reserved for runtime errors (phase 0+1 deviation
/// 10, deliberately pinned here).
#[test]
fn unknown_flag_exits_1_not_claps_2() {
    let output = tic(&["--nope", "examples/basics/01_hello.tic"]);
    assert_eq!(output.status.code(), Some(1));
    assert!(!output.stderr.is_empty(), "clap explains the unknown flag on stderr");
}
