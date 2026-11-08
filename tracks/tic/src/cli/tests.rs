//! CLI unit tests (plan §9): argument parsing, mode resolution,
//! exit-code mapping and the clean "not implemented yet" placeholders.

use super::*;
use clap::error::ErrorKind;

fn parse(args: &[&str]) -> Result<Cli, clap::Error> {
    let argv: Vec<&str> = std::iter::once("tic").chain(args.iter().copied()).collect();
    Cli::try_parse_from(argv)
}

/// A scratch .tic file under the system temp dir (no extra deps needed).
fn scratch(name: &str, src: &str) -> PathBuf {
    let path = std::env::temp_dir().join(format!("tic-cli-{}-{name}", std::process::id()));
    fs::write(&path, src).expect("scratch file must be writable");
    path
}

// ---- argument parsing ---------------------------------------------------

#[test]
fn parses_every_documented_form() {
    for args in [
        vec!["hello.tic"],
        vec!["run", "hello.tic"],
        vec!["check", "hello.tic"],
        vec!["--tokens", "hello.tic"],
        vec!["--ast", "hello.tic"],
        vec!["--trace", "hello.tic"],
        vec!["--max-depth", "2000", "hello.tic"],
    ] {
        assert!(parse(&args).is_ok(), "should parse: {args:?}");
    }
}

#[test]
fn defaults_and_values() {
    let cli = parse(&["hello.tic"]).unwrap();
    assert_eq!(cli.file, Some(PathBuf::from("hello.tic")));
    assert_eq!(cli.max_depth, 1000); // §7 default
    assert!(cli.command.is_none() && cli.tokens.is_none());

    let cli = parse(&["--tokens", "a.tic"]).unwrap();
    assert_eq!(cli.tokens, Some(PathBuf::from("a.tic")));

    let cli = parse(&["check", "a.tic"]).unwrap();
    assert!(matches!(cli.command, Some(Command::Check { .. })));

    let cli = parse(&["--max-depth", "7", "--tokens", "a.tic"]).unwrap();
    assert_eq!(cli.max_depth, 7);
}

#[test]
fn help_and_version_are_clap_display_errors() {
    assert_eq!(
        parse(&["--help"]).unwrap_err().kind(),
        ErrorKind::DisplayHelp
    );
    assert_eq!(
        parse(&["--version"]).unwrap_err().kind(),
        ErrorKind::DisplayVersion
    );
}

#[test]
fn nonsense_arguments_are_rejected() {
    assert!(parse(&["--max-depth", "abc"]).is_err()); // not a number
    assert!(parse(&["--tokens"]).is_err()); // missing value
    assert!(parse(&["run"]).is_err()); // missing file
    assert!(parse(&["--max-depth", "0", "a.tic"]).is_ok()); // parsed, rejected in execute
}

// ---- mode resolution ------------------------------------------------------

#[test]
fn no_arguments_means_repl() {
    assert_eq!(resolve_mode(&parse(&[]).unwrap()).unwrap(), Mode::Repl);
    assert_eq!(
        resolve_mode(&parse(&["--max-depth", "9"]).unwrap()).unwrap(),
        Mode::Repl
    );
}

#[test]
fn each_form_resolves_to_its_mode() {
    let cases: [(&[&str], Mode); 6] = [
        (&["a.tic"], Mode::Run(PathBuf::from("a.tic"))),
        (&["run", "a.tic"], Mode::Run(PathBuf::from("a.tic"))),
        (&["check", "a.tic"], Mode::Check(PathBuf::from("a.tic"))),
        (&["--tokens", "a.tic"], Mode::Tokens(PathBuf::from("a.tic"))),
        (&["--ast", "a.tic"], Mode::Ast(PathBuf::from("a.tic"))),
        (&["--trace", "a.tic"], Mode::Trace(PathBuf::from("a.tic"))),
    ];
    for (args, expected) in cases {
        assert_eq!(
            resolve_mode(&parse(args).unwrap()).unwrap(),
            expected,
            "args: {args:?}"
        );
    }
}

#[test]
fn asking_for_two_modes_at_once_is_a_usage_error() {
    let cli = parse(&["--tokens", "a.tic", "--ast", "a.tic"]).unwrap();
    assert!(matches!(resolve_mode(&cli), Err(TicError::Usage { .. })));
    let cli = parse(&["--tokens", "a.tic", "run", "b.tic"]).unwrap();
    assert!(matches!(resolve_mode(&cli), Err(TicError::Usage { .. })));
}

// ---- execution: exit codes and clean phase placeholders -------------------

#[test]
fn tokens_mode_dumps_the_stream_and_exits_zero() {
    let file = scratch("ok.tic", "i32 x = 42;\n");
    let cli = parse(&["--tokens", file.to_str().unwrap()]).unwrap();
    assert!(execute(cli).is_ok());
}

#[test]
fn a_lex_error_fails_with_t0_code_and_exit_one() {
    let file = scratch("bad.tic", "i32 x = 1.2.3;\n");
    let cli = parse(&["--tokens", file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.first().error_code(), "T0007");
    assert_eq!(failure.first().family().exit_code(), 1);
    assert!(failure.file.is_some()); // rendered with the source
}

#[test]
fn check_mode_type_checks_and_exits_zero_silently() {
    let file = scratch("ok2.tic", "i32 x = 42;\n");
    let cli = parse(&["check", file.to_str().unwrap()]).unwrap();
    assert!(execute(cli).is_ok(), "a valid program checks clean (§7: no output)");
}

#[test]
fn run_and_trace_execute_programs_for_real_now() {
    // No `print` in the program: the run writes nothing, so the test log
    // stays clean while proving the phase-4 interpreter is wired in.
    let file = scratch("ok3.tic", "i32 x = 42;\nx += 1;\n");
    let path = file.to_str().unwrap();
    for args in [
        vec![path.to_string()],
        vec!["run".into(), path.to_string()],
        vec!["--trace".into(), path.to_string()],
    ] {
        let refs: Vec<&str> = args.iter().map(String::as_str).collect();
        assert!(execute(parse(&refs).unwrap()).is_ok(), "args: {refs:?}");
    }
}

#[test]
fn runtime_errors_exit_two_with_the_source_rendered() {
    let file = scratch("ovf.tic", "i8 big = 127;\nprint(big + 1);\n");
    let cli = parse(&[file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.first().error_code(), "T3001");
    assert_eq!(failure.first().family().exit_code(), 2, "§7: runtime errors exit 2");
    assert!(failure.file.is_some(), "rendered with file + line");
    assert!(failure.first().message().contains("i8 overflow (127 + 1)"));
}

#[test]
fn max_depth_reaches_the_interpreter() {
    let src = "function down(i32 n) -> i32 {\n    if (n <= 0) { return 0; }\n    return down(n - 1);\n}\ni32 x = down(4);\n";
    let file = scratch("deep.tic", src);
    let path = file.to_str().unwrap();
    // 5 calls fit exactly in --max-depth 5 …
    let cli = parse(&["--max-depth", "5", path]).unwrap();
    assert!(execute(cli).is_ok());
    // … and 6 do not (down(5) nests one call deeper).
    let deeper = scratch("deeper.tic", &src.replace("down(4)", "down(5)"));
    let cli = parse(&["--max-depth", "5", deeper.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.first().error_code(), "T3003");
    assert_eq!(failure.first().family().exit_code(), 2);
}

#[test]
fn class_enum_and_obj_programs_run_for_real_now() {
    // Phase 6: every language feature is live — classes (`new`, `init`,
    // `this`, methods), enums and obj literals all execute end to end.
    // The programs print nothing here; the example fixtures pin stdout.
    let cases = [
        "enum State { Idle, Running }\nState s = State.Idle;\nprint(s == State.Idle);\n",
        "obj o = { a: 1 };\nprint(o.a);\n",
        "class C { i32 x; function bump() -> i32 { this.x += 1; return this.x; } }\nC c = new C();\nprint(c.bump());\n",
    ];
    for src in cases {
        let file = scratch("phase6-runs.tic", src);
        let cli = parse(&[file.to_str().unwrap()]).unwrap();
        assert!(execute(cli).is_ok(), "src must run: {src}");
    }
}

#[test]
fn type_errors_come_back_in_one_run_with_t2_codes() {
    let file = scratch("broken2.tic", "i32 x = \"hi\";\nstr y = 1;\nif (2) { }\n");
    let cli = parse(&["run", file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.errors.len(), 3, "every type error at once");
    assert_eq!(failure.more, 0);
    assert!(failure.errors.iter().all(|e| e.family() == crate::diagnostics::Family::Type));
    assert_eq!(failure.errors[0].error_code(), "T2003");
    assert_eq!(failure.errors[2].error_code(), "T2004");
    assert_eq!(failure.first().family().exit_code(), 1);
    assert!(failure.file.is_some()); // rendered with the source
}

#[test]
fn check_mode_reports_type_errors_with_exit_one() {
    let file = scratch("bad3.tic", "i32 x = \"hi\";\n");
    let cli = parse(&["check", file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.first().error_code(), "T2003");
    assert_eq!(failure.first().family().exit_code(), 1);
    assert!(failure.file.is_some());
}

#[test]
fn ast_mode_dumps_the_pretty_tree() {
    let file = scratch("tree.tic", "i32 x = 1 + 2;\nprint(x);\n");
    let path = file.to_str().unwrap();
    // Both flag spellings clap supports: `--ast FILE` and `--ast=FILE`.
    let joined = format!("--ast={path}");
    for args in [vec!["--ast".to_string(), path.to_string()], vec![joined]] {
        let refs: Vec<&str> = args.iter().map(String::as_str).collect();
        let cli = parse(&refs).unwrap();
        assert!(execute(cli).is_ok(), "args: {refs:?}");
        let dump = run_ast(&file).expect("parses");
        assert!(dump.starts_with("program\n"), "dump:\n{dump}");
        assert!(dump.contains("var_decl i32 x"), "dump:\n{dump}");
        assert!(dump.contains("binary +"), "dump:\n{dump}");
        assert!(dump.contains("call"), "dump:\n{dump}");
    }
}

#[test]
fn parse_errors_all_come_back_in_one_run() {
    let file = scratch("broken.tic", "i32 x = ;\nprint(x);\ni32 = 3;\n");
    let cli = parse(&["run", file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert!(failure.errors.len() >= 2, "want every error at once");
    assert_eq!(failure.more, 0);
    assert!(failure.errors.iter().all(|e| e.family() == crate::diagnostics::Family::Parse));
    assert_eq!(failure.first().family().exit_code(), 1);
}

#[test]
fn more_than_ten_parse_errors_are_summarized() {
    let broken = "i32 x = ;\n".repeat(12);
    let file = scratch("many.tic", &broken);
    let cli = parse(&["--ast", file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.errors.len(), 10);
    assert_eq!(failure.more, 2);
}

#[test]
fn run_still_reports_lex_errors_first() {
    let file = scratch("bad2.tic", "str s = \"oops\n");
    let cli = parse(&["run", file.to_str().unwrap()]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert_eq!(failure.first().error_code(), "T0001");
}

#[test]
fn repl_mode_is_owned_by_dispatch_not_an_error() {
    // Phase 8: bare `tic` opens the interactive REPL in `dispatch` (it
    // owns the exit codes: :quit/Ctrl-D → 0, Ctrl-C → 130). The
    // non-interactive `execute` path succeeds quietly; scripted whole
    // sessions are tested in tests/repl via `repl::run_scripted`.
    assert!(execute(parse(&[]).unwrap()).is_ok());
}

#[test]
fn ctrl_c_at_the_repl_prompt_exits_130() {
    // §7's exit-code table promises 130 for Ctrl-C. rustyline only reports
    // `Interrupted` from a real TTY in raw mode, so the test simulates the
    // exact error value the interactive loop receives and pins the mapping
    // it applies (`interactive_loop` → `readline_error_exit`).
    use crate::cli::repl::readline_error_exit;
    assert_eq!(readline_error_exit(rustyline::error::ReadlineError::Interrupted), 130);
    assert_eq!(readline_error_exit(rustyline::error::ReadlineError::Eof), 0, "Ctrl-D exits 0");
}

#[test]
fn unreadable_file_is_a_clean_cli_error() {
    let cli = parse(&["--tokens", "/definitely/not/here.tic"]).unwrap();
    let failure = execute(cli).unwrap_err();
    assert!(matches!(failure.first(), TicError::CannotReadFile { .. }));
    assert_eq!(failure.first().family().exit_code(), 1);
}

#[test]
fn zero_max_depth_is_rejected() {
    let failure = execute(parse(&["--max-depth", "0", "a.tic"]).unwrap()).unwrap_err();
    assert!(matches!(failure.first(), TicError::Usage { .. }));
}

// ---- the --tokens dump format ----------------------------------------------

#[test]
fn dump_tokens_format_is_stable() {
    let src = "i32 x = 42;";
    let tokens = crate::lexer::tokenize(src).unwrap();
    let expected = [
        line("TyI32", "i32", "0..3"),
        line("Ident", "x", "4..5"),
        line("Assign", "=", "6..7"),
        line("Int", "42", "8..10"),
        line("Semi", ";", "10..11"),
        line("Eof", "", "11..11"),
    ]
    .concat();
    assert_eq!(dump_tokens(&tokens, src), expected);
}

/// The stable layout, spelled out independently of `dump_tokens`:
/// kind left-aligned in a 14-wide column, one space, quoted lexeme,
/// one space, then `start..end` byte offsets.
fn line(kind: &str, lexeme: &str, span: &str) -> String {
    assert!(kind.len() <= 14, "kind column is 14 wide");
    format!(
        "{kind}{}{lexeme:?} {span}\n",
        " ".repeat(15 - kind.len())
    )
}
