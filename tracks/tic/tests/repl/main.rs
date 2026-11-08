//! Scripted REPL sessions (plan §9, phase 8): whole conversations —
//! multi-line snippets, persistent declarations, `:meta` commands, error
//! recovery — driven through `tic::cli::repl::run_scripted` with a
//! [`Writer`] that collects the output. No terminal involved: the rustyline
//! edge is the only interactive piece, and the binary test at the bottom
//! pins its wiring.

use std::io::Write;
use std::process::{Command, Stdio};

use tic::cli::repl::run_scripted;
use tic::interp::Writer;

/// Collects everything the REPL writes — banner, echoes, dumps, errors.
struct Page(String);

impl Page {
    fn new() -> Page {
        Page(String::new())
    }
}

impl Writer for Page {
    fn write(&mut self, text: &str) {
        self.0.push_str(text);
    }
}

/// Run `lines` as one session: `(everything written, exit code)`.
fn session(lines: &[&str]) -> (String, u8) {
    let mut page = Page::new();
    let code = run_scripted(lines.iter().map(|line| line.to_string()), &mut page, 1000);
    (page.0, code)
}

/// The banner + `:help` block every session opens with — subtracted so
/// the assertions below target the conversation itself.
fn header() -> String {
    session(&[]).0
}

/// The session's output after the banner/help.
fn body(lines: &[&str]) -> String {
    let (out, code) = session(lines);
    assert_eq!(code, 0, "a scripted session always exits 0");
    out.strip_prefix(&header())
        .unwrap_or_else(|| panic!("session should open with the banner:\n{out}"))
        .to_string()
}

// ---- the session opens with banner + :help (§6.2) --------------------------

#[test]
fn the_banner_and_help_open_the_session() {
    let (out, code) = session(&[]);
    assert_eq!(code, 0);
    assert!(out.starts_with("Tic "), "banner first: {out}");
    for command in [":help", ":quit", ":tokens", ":ast", ":env"] {
        assert!(out.contains(command), "help must list {command}: {out}");
    }
}

// ---- values: echo, quiet, persistence ---------------------------------------

#[test]
fn a_lone_expression_prints_its_value() {
    assert_eq!(body(&["1 + 2"]), "3\n");
    assert_eq!(body(&["\"hi\""]), "hi\n");
    assert_eq!(body(&["3.0 / 2.0"]), "1.5\n");
}

#[test]
fn assignments_declarations_and_unit_calls_stay_quiet() {
    // §6.2: only a lone expression echoes; everything else is silent
    // (and a Unit result — like `print`'s — is never echoed).
    assert_eq!(body(&["i32 x = 5;", "x = 6;", "x += 1;", "print(\"go\")"]), "go\n");
}

#[test]
fn a_snippet_without_a_semicolon_still_parses() {
    // The lone `1 + 2` has no `;` — the session terminates it for the
    // parser, and the next snippet starts clean.
    assert_eq!(body(&["5 * 5", "i32 x = 2;", "x + 1"]), "25\n3\n");
}

#[test]
fn variables_persist_and_mutate_across_lines() {
    assert_eq!(body(&["i32 x = 1;", "x += 41;", "x * 1"]), "42\n");
}

#[test]
fn values_of_every_shape_echo() {
    assert_eq!(body(&["i32[] a = [1, 2];", "a"]), "[1, 2]\n");
    assert_eq!(body(&["true || false"]), "true\n");
}

#[test]
fn the_session_rolls_a_runtime_error_back_but_keeps_earlier_state() {
    // `y` dies with the failed snippet (it is not in the session source
    // either, so redeclaring it works); `x` survives; the error renders
    // §5.6-style against the session source.
    let out = body(&[
        "i32 x = 10;",
        "i32 y = 5; print(1 / 0);",
        ":env",
        "i32 y = 6;",
        ":env",
    ]);
    assert!(out.contains("T3002"), "the runtime error renders: {out}");
    assert!(out.contains("integer division by zero"), "{out}");
    assert!(out.contains("x = 10"), "earlier declarations persist: {out}");
    // (an `:env` line is exactly `y = 5`; the error's own source excerpt
    // reads `i32 y = 5; …` and so never matches this)
    assert!(!out.contains("\ny = 5\n"), "the failed snippet's y is rolled back");
    assert!(out.contains("y = 6"), "redeclaring y works after the rollback");
}

// ---- multi-line input (§6.2) -------------------------------------------------

#[test]
fn a_function_defined_across_lines_is_callable_afterwards() {
    let out = body(&[
        "function double(i32 n) -> i32 {",
        "    return n * 2;",
        "}",
        "double(21)",
    ]);
    assert_eq!(out, "42\n");
}

#[test]
fn blank_lines_inside_a_snippet_are_fine() {
    let out = body(&["function f() -> i32 {", "", "    return 7;", "}", "f()"]);
    assert_eq!(out, "7\n");
}

#[test]
fn an_unterminated_string_is_an_immediate_error() {
    // Tic strings cannot span lines, so closing it on the next line was
    // never an option — the error shows at once and the session lives on.
    let out = body(&["str s = \"oops", "1 + 1"]);
    assert!(out.contains("T0001"), "{out}");
    assert!(out.contains("cannot span lines"), "{out}");
    assert!(out.ends_with("2\n"), "the session continues: {out}");
}

#[test]
fn comments_alone_do_nothing() {
    assert_eq!(body(&["// just a comment", "1 + 1"]), "2\n");
}

// ---- declarations persist in context -----------------------------------------

#[test]
fn classes_and_enums_declared_earlier_are_in_scope() {
    let out = body(&[
        "enum State { Idle, Done }",
        "class Box { i32 n; function bump() -> i32 { this.n += 1; return this.n; } }",
        "Box b = new Box();",
        "b.bump();",
        "b.bump();",
        "State s = State.Done;",
        "s == State.Done",
    ]);
    assert!(out.starts_with("1\n"), "first bump: {out}");
    assert!(out.contains("\n2\n"), "second bump: {out}");
    assert!(out.ends_with("true\n"), "the enum is in scope: {out}");
}

#[test]
fn redeclaring_a_name_is_a_friendly_error_not_a_crash() {
    let out = body(&["i32 x = 1;", "i32 x = 2;", "x + 1"]);
    assert!(out.contains("T2001"), "{out}");
    assert!(out.contains("declared twice"), "{out}");
    assert!(out.ends_with("2\n"), "the session continues: {out}");
}

#[test]
fn a_snippet_is_checked_against_the_whole_session() {
    // `nope` was never declared — and a *previous* bad line (rejected,
    // rolled back) does not leak into the session.
    let out = body(&["i32 nope2 = 1;", "nope + 1", "nope2"]);
    assert!(out.contains("T2005"), "unknown variable: {out}");
    assert!(out.ends_with("1\n"), "the session continues: {out}");
}

// ---- meta commands -------------------------------------------------------------

#[test]
fn env_lists_the_variables_alive() {
    let out = body(&["i32 age = 3;", "str who = \"Ada\"", ":env"]);
    assert!(out.contains("age = 3\n"), "{out}");
    assert!(out.contains("who = Ada\n"), "{out}");
}

#[test]
fn env_before_anything_is_a_friendly_nudge() {
    assert_eq!(body(&[":env"]), "(no variables yet)\n");
}

#[test]
fn tokens_dumps_the_stream_of_the_argument_or_the_last_snippet() {
    let with_arg = body(&[":tokens 1 + 2"]);
    assert!(with_arg.contains("Int"), "{with_arg}");
    assert!(with_arg.contains("Plus"), "{with_arg}");
    let of_last = body(&["b.bump();", ":tokens"]);
    assert!(of_last.contains("Dot"), "{of_last}");
    assert!(of_last.contains("Semi"), "{of_last}");
}

#[test]
fn ast_dumps_the_tree_parsed_in_session_context() {
    // `P p = new P();` only parses when `P` is on the hoisted name table.
    let out = body(&["class P { i32 x; }", ":ast P p = new P();"]);
    assert!(out.contains("new P"), "{out}");
    let of_last = body(&["1 + 2", ":ast"]);
    assert!(of_last.contains("binary +"), "{of_last}");
    assert!(of_last.contains("int 2"), "{of_last}");
}

#[test]
fn unknown_commands_get_a_did_you_mean() {
    let near = body(&[":tokns"]);
    assert!(near.contains("not a REPL command"), "{near}");
    assert!(near.contains("did you mean `:tokens`"), "{near}");
    let far = body(&[":zzz"]);
    assert!(far.contains("not a REPL command"), "{far}");
    assert!(!far.contains("did you mean"), "no guess for a far miss: {far}");
}

#[test]
fn quit_stops_the_session_and_the_exit_is_clean() {
    let (out, code) = session(&["1 + 2", ":quit", "3 + 4"]);
    assert_eq!(code, 0);
    assert!(out.ends_with("3\n"), "the line before :quit ran: {out}");
    assert!(!out.contains('7'), "nothing after :quit runs: {out}");
}

#[test]
fn a_top_level_return_is_refused_with_a_lesson() {
    let out = body(&["return;", "1 + 1"]);
    assert!(out.contains("top level"), "{out}");
    assert!(out.ends_with("2\n"), "the session continues: {out}");
}

// ---- the interpreter's guards still hold inside the REPL ----------------------

#[test]
fn max_depth_is_enforced_in_a_snippet() {
    // Runs on a big-stack thread (the interactive REPL sizes its own the
    // same way); the friendly T3003 must be the verdict.
    let lines: Vec<String> = vec![
        "function down(i32 n) -> i32 { if (n <= 0) { return 0; } return down(n - 1); }"
            .to_string(),
        "down(5000)".to_string(),
    ];
    let handle = std::thread::Builder::new()
        .stack_size(64 * 1024 * 1024)
        .spawn(move || {
            let mut page = Page::new();
            run_scripted(lines, &mut page, 1000);
            page.0
        })
        .expect("big-stack thread");
    let out = handle.join().expect("session thread");
    assert!(out.contains("T3003"), "the recursion cap renders: {out}");
}

#[test]
fn deep_nesting_renders_its_guard_error_and_the_session_lives() {
    // A parse-time T3005 (the phase-9 nesting guard) must render like any
    // other error — never a crash — and the session keeps going. Runs on a
    // big-stack thread like the interactive loop sizes for itself; the
    // guard fires long before the meter's 1024 on this pile of parens.
    let deep = format!("print({}1{});", "(".repeat(1100), ")".repeat(1100));
    let lines: Vec<String> = vec![deep, "1 + 1".to_string()];
    let handle = std::thread::Builder::new()
        .stack_size(64 * 1024 * 1024)
        .spawn(move || {
            let mut page = Page::new();
            run_scripted(lines, &mut page, 1000);
            page.0
        })
        .expect("big-stack thread");
    let out = handle.join().expect("session thread");
    assert!(out.contains("T3005"), "the nesting guard renders: {out}");
    assert!(out.contains("nested too deeply"), "{out}");
    assert!(out.ends_with("2\n"), "the session continues: {out}");
}

// ---- the binary edge ----------------------------------------------------------

#[test]
fn the_bare_binary_opens_the_repl() {
    let mut child = Command::new(env!("CARGO_BIN_EXE_tic"))
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("the tic binary builds");
    child
        .stdin
        .take()
        .expect("stdin was piped")
        .write_all(b"1 + 1\n:quit\n")
        .expect("the REPL reads piped lines");
    let output = child.wait_with_output().expect("the REPL exits on :quit");
    assert!(output.status.success(), "exit 0 on :quit");
    let text = String::from_utf8(output.stdout).expect("utf-8 output");
    assert!(text.contains("the REPL"), "the banner opens the session: {text}");
    assert!(text.contains("\n2\n"), "the expression echoed: {text}");
}

#[test]
fn stdin_ending_without_quit_also_exits_zero() {
    // Ctrl-D at the prompt = stdin gone: a clean exit 0 (§6.2), same as
    // `:quit` — the session simply stops where the input did.
    let mut child = Command::new(env!("CARGO_BIN_EXE_tic"))
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("the tic binary builds");
    child
        .stdin
        .take()
        .expect("stdin was piped")
        .write_all(b"2 * 21\n")
        .expect("the REPL reads piped lines");
    let output = child.wait_with_output().expect("the REPL exits at end of input");
    assert!(output.status.success(), "end of input is a clean exit 0");
    let text = String::from_utf8(output.stdout).expect("utf-8 output");
    assert!(text.contains("\n42\n"), "the line before end-of-input ran: {text}");
}
