//! The REPL (plan §6.2, §7): bare `tic` opens an interactive session.
//!
//! One loop: read a line; while braces or brackets are still open (or a
//! block comment is) keep reading (multi-line snippets); meta commands
//! (`:quit :help :tokens :ast :env`) are answered directly; anything else
//! is a snippet — lexed, parsed, checked and run **in context**: every
//! accepted snippet is appended to a *session source*, the whole session
//! is re-checked, and only the new tail executes in the session's
//! persistent [`interp::Session`] (variables, functions, classes and
//! enums declared earlier are all still in scope). A snippet that fails
//! at any stage renders §5.6-style against the session source and is
//! rolled back — an error never kills the session.
//!
//! The core ([`Repl::feed`]) consumes lines and writes to a [`Writer`],
//! so [`run_scripted`] drives whole sessions without a terminal (the
//! test seam, plan §9); [`run_interactive`] is the only piece that
//! touches rustyline or stdin.

use std::process::ExitCode;

use super::{dump_tokens, render_failure, Failure, TREE_STACK};
use crate::ast;
use crate::checker;
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::interp::{self, Session, Value, Writer};
use crate::lexer::{self, Token, TokenKind};
use crate::parser;

/// The file name snippet errors render under.
const FILE: &str = "repl";
/// The meta commands, for `:help` and did-you-mean on typos.
const COMMANDS: [&str; 5] = ["help", "quit", "tokens", "ast", "env"];

/// What one fed line asked the loop to do.
#[derive(Debug, PartialEq)]
pub(crate) enum Control {
    Continue,
    Quit,
}

/// The first line a session prints, then the `:help` body re-shown on
/// request (§6.2: banner + `:help` on start).
const BANNER: &str = concat!(
    "Tic ",
    env!("CARGO_PKG_VERSION"),
    " — a tiny statically-typed C-like language (the REPL).\n",
    "Every line is checked and run in one shared session; ",
    "declarations and variables persist across lines.\n",
);

const HELP: &str = concat!(
    "  :help    this help\n",
    "  :quit    leave the REPL (Ctrl-D works too)\n",
    "  :tokens  the token stream of the last snippet — or :tokens <tic code>\n",
    "  :ast     the syntax tree of the last snippet — or :ast <tic code>\n",
    "  :env     the variables alive right now\n",
);

/// One REPL session: the persistent run state plus the source bookkeeping
/// that makes each snippet check *in context* of everything accepted so
/// far. Never constructed against a terminal directly — see
/// [`run_scripted`] / [`run_interactive`].
pub(crate) struct Repl {
    session: Session,
    /// Every accepted snippet so far. A new snippet is checked as
    /// `source + snippet`; a snippet that fails anywhere is not appended,
    /// so the session only ever contains code that ran.
    source: String,
    /// How many top-level decls/stmts of `source` are committed — the new
    /// snippet is everything past these indices.
    committed_stmts: usize,
    committed_decls: usize,
    /// Lines of the snippet currently being assembled (multi-line input).
    pending: Vec<String>,
    /// The last completed snippet's text — what a bare `:tokens`/`:ast` shows.
    last_input: Option<String>,
    max_depth: u32,
}

impl Repl {
    pub(crate) fn new(max_depth: u32) -> Repl {
        Repl {
            session: Session::new(),
            source: String::new(),
            committed_stmts: 0,
            committed_decls: 0,
            pending: Vec::new(),
            last_input: None,
            max_depth,
        }
    }

    /// True while a multi-line snippet is still being assembled — the
    /// interactive prompt switches to the continuation form.
    pub(crate) fn is_continuing(&self) -> bool {
        !self.pending.is_empty()
    }

    /// Feed one input line (§6.2): a meta command when it starts a fresh
    /// line with `:`, otherwise a line of Tic — assembled into a snippet
    /// until its braces/brackets balance, then checked and run.
    pub(crate) fn feed(&mut self, line: &str, writer: &mut dyn Writer) -> Control {
        if self.pending.is_empty() {
            let trimmed = line.trim();
            if trimmed.is_empty() {
                return Control::Continue; // a blank line just re-prompts
            }
            if let Some(command) = trimmed.strip_prefix(':') {
                return self.meta(command, writer);
            }
        }
        self.pending.push(line.to_string());
        let text = self.pending.join("\n");
        let tokens = match lexer::tokenize(&text) {
            Ok(tokens) => tokens,
            // A block comment opened but not closed: the next line may
            // close it — keep reading (§6.2 multi-line).
            Err(err) if needs_more_input(&err) => return Control::Continue,
            // Any other lex error more input cannot fix — an unterminated
            // string *does* error here: Tic strings cannot span lines
            // (the lexer ends them at the newline), so closing it on the
            // next line was never an option. Show it and move on.
            Err(err) => {
                let text = self.complete(text);
                self.report(Failure::sourced(err, FILE, &text), writer);
                return Control::Continue;
            }
        };
        if open_depth(&tokens) > 0 {
            return Control::Continue; // braces/brackets/parens still open
        }
        let text = self.complete(text);
        if tokens.len() > 1 {
            // Whitespace/comments alone (just `Eof`) run and keep nothing.
            self.process(&text, writer);
        }
        Control::Continue
    }

    /// A snippet is complete: remember its text, clear the assembly.
    fn complete(&mut self, text: String) -> String {
        self.pending.clear();
        self.last_input = Some(text.clone());
        text
    }

    /// Lex + parse + check + run one completed snippet in session context
    /// (§6.2). Any failure renders against the combined source and rolls
    /// the append back; success commits the snippet to the session.
    fn process(&mut self, text: &str, writer: &mut dyn Writer) {
        let combined = self.combine(text);
        let tokens = match lexer::tokenize(&combined) {
            Ok(tokens) => tokens,
            Err(err) => return self.report(Failure::sourced(err, FILE, &combined), writer),
        };
        let (program, errors) = parser::parse_recovering(&tokens);
        if errors.total > 0 {
            return self.report(Failure::parse(errors, FILE, &combined), writer);
        }
        let checked = match checker::check(&program) {
            Ok(checked) => checked,
            Err(errors) => {
                return self.report(Failure::checked(errors, FILE, &combined), writer);
            }
        };
        let from = self.committed_stmts;
        let new_stmts = checked.stmts.len() - from;
        // §6.2: a snippet that is one lone expression prints its value;
        // everything else stays quiet (assignments, declarations, calls
        // whose result is Unit — `Display` is the print format).
        let echo = new_stmts == 1
            && matches!(checked.stmts.last(), Some(ast::Stmt::ExprStmt { .. }));
        let opts =
            interp::RunOptions { max_depth: self.max_depth, ..interp::RunOptions::default() };
        match self.session.run_snippet(&checked, &combined, writer, opts, from) {
            Ok(Some(value)) if echo && !matches!(value, Value::Unit) => {
                writer.write_line(&value.to_string());
            }
            Ok(_) => {}
            Err(err) => return self.report(Failure::sourced(err, FILE, &combined), writer),
        }
        // Commit: the snippet's code is now part of the session.
        self.source = combined;
        self.committed_stmts = program.stmts.len();
        self.committed_decls = program.decls.len();
    }

    /// The source a new snippet is checked against: the session so far
    /// (self-terminating — snippets are committed *with* their `;`), a
    /// newline, then the snippet. A snippet that does not end in `;` or
    /// `}` (a lone expression) gets a terminating `;` **on its own line**,
    /// where a trailing `// comment` cannot swallow it.
    fn combine(&self, text: &str) -> String {
        let mut combined =
            if self.source.is_empty() { String::new() } else { format!("{}\n", self.source) };
        combined.push_str(text);
        if !ends_terminated(text) {
            combined.push_str("\n;");
        }
        combined
    }

    fn report(&self, failure: Failure, writer: &mut dyn Writer) {
        writer.write(&render_failure(&failure));
    }

    // ---- meta commands (§6.2) ---------------------------------------------

    fn meta(&mut self, command: &str, writer: &mut dyn Writer) -> Control {
        let (name, arg) = match command.find(char::is_whitespace) {
            Some(at) => (&command[..at], command[at..].trim()),
            None => (command.trim(), ""),
        };
        match name {
            "quit" => return Control::Quit,
            "help" => writer.write(HELP),
            "tokens" => self.show_tokens(arg, writer),
            "ast" => self.show_ast(arg, writer),
            "env" => self.show_env(writer),
            _ => {
                let guess = did_you_mean(name, &COMMANDS)
                    .map_or_else(String::new, |s| format!(" (did you mean `:{s}`?)"));
                self.report(
                    Failure::plain(TicError::Usage {
                        message: format!(
                            "`:{name}` is not a REPL command{guess} — type :help to see them all"
                        ),
                    }),
                    writer,
                );
            }
        }
        Control::Continue
    }

    /// `:env` — every variable alive in the session, name-sorted, the
    /// same `name = value` format `--trace` prints.
    fn show_env(&self, writer: &mut dyn Writer) {
        let vars = self.session.snapshot();
        if vars.is_empty() {
            writer.write_line("(no variables yet)");
            return;
        }
        for (name, value) in vars {
            writer.write_line(&format!("{name} = {value}"));
        }
    }

    /// `:tokens` — the lexer's view (context-free, so the raw text is
    /// tokenized directly) of the argument or the last snippet.
    fn show_tokens(&mut self, arg: &str, writer: &mut dyn Writer) {
        let Some(text) = self.snippet_text(arg, writer) else { return };
        match lexer::tokenize(&text) {
            Ok(tokens) => writer.write(&dump_tokens(&tokens, &text)),
            Err(err) => self.report(Failure::sourced(err, FILE, &text), writer),
        }
    }

    /// `:ast` — the parser's view of the argument or the last snippet,
    /// parsed **in session context** (a `Counter c = …` declaration needs
    /// the class on the hoisted name table) but never run or committed.
    fn show_ast(&mut self, arg: &str, writer: &mut dyn Writer) {
        let Some(text) = self.snippet_text(arg, writer) else { return };
        let combined = self.combine(&text);
        let tokens = match lexer::tokenize(&combined) {
            Ok(tokens) => tokens,
            Err(err) => return self.report(Failure::sourced(err, FILE, &combined), writer),
        };
        let (program, errors) = parser::parse_recovering(&tokens);
        let snippet = ast::Program {
            decls: program.decls.get(self.committed_decls..).unwrap_or(&[]).to_vec(),
            stmts: program.stmts.get(self.committed_stmts..).unwrap_or(&[]).to_vec(),
        };
        writer.write(&ast::display::dump(&snippet));
        if errors.total > 0 {
            self.report(Failure::parse(errors, FILE, &combined), writer);
        }
    }

    /// The text a bare `:tokens`/`:ast` means: the argument, else the last
    /// completed snippet — or a friendly nudge when there is neither.
    fn snippet_text(&self, arg: &str, writer: &mut dyn Writer) -> Option<String> {
        if !arg.is_empty() {
            return Some(arg.to_string());
        }
        let last = self.last_input.as_deref().map(str::trim).filter(|t| !t.is_empty());
        last.map(|t| t.to_string()).or_else(|| {
            self.report(
                Failure::plain(TicError::Usage {
                    message: "nothing to show yet — enter some Tic code first, \
                              or pass it along: `:tokens 1 + 2`"
                        .into(),
                }),
                writer,
            );
            None
        })
    }
}

/// Net unclosed `{`/`[`/`(` over a token stream — the multi-line detector.
/// Strings, chars and comments are single tokens (or skipped), so only
/// real brackets count; a negative or zero sum means the snippet is as
/// balanced as it will ever be.
fn open_depth(tokens: &[Token]) -> i32 {
    let mut depth = 0;
    for token in tokens {
        match token.kind {
            TokenKind::LBrace | TokenKind::LBracket | TokenKind::LParen => depth += 1,
            TokenKind::RBrace | TokenKind::RBracket | TokenKind::RParen => depth -= 1,
            _ => {}
        }
    }
    depth
}

/// Whether a snippet already ends in `;` or `}` (skipping `Eof`) and so
/// needs no terminator appended. A lex failure reads as "terminated" —
/// the caller reports the real error.
fn ends_terminated(text: &str) -> bool {
    match lexer::tokenize(text) {
        Ok(tokens) => tokens
            .iter()
            .rev()
            .find(|token| !matches!(token.kind, TokenKind::Eof))
            .is_some_and(|token| matches!(token.kind, TokenKind::Semi | TokenKind::RBrace)),
        Err(_) => true,
    }
}

/// The lex errors more input could still fix (§6.2): a `/*` block
/// comment still open (they may span lines). Strings and chars may not —
/// the lexer ends them at the newline — so their "unterminated" errors
/// are shown immediately; unbalanced braces/brackets are the token-depth
/// case in [`open_depth`].
fn needs_more_input(err: &TicError) -> bool {
    matches!(err, TicError::UnterminatedComment { .. })
}

/// Drive a whole session from input lines into `writer` — the testability
/// seam: full multi-line sessions, `:meta` commands and error recovery,
/// all without a terminal. Stops at `:quit` (remaining lines unread) or
/// when the lines run out; both are a clean exit 0.
pub fn run_scripted(
    lines: impl IntoIterator<Item = String>,
    writer: &mut dyn Writer,
    max_depth: u32,
) -> u8 {
    let mut repl = Repl::new(max_depth);
    writer.write(BANNER);
    writer.write(HELP);
    for line in lines {
        if repl.feed(&line, writer) == Control::Quit {
            break;
        }
    }
    0
}

/// The interactive edge: rustyline for reading (with history), the shared
/// [`Repl`] core for everything else. The loop runs on a stack sized for
/// the whole pipeline (like `execute`'s stages, §12) so a deeply nested
/// or deeply recursing snippet still raises its friendly cap instead of a
/// native crash. Exit 0 on `:quit`/Ctrl-D · 130 on Ctrl-C.
pub fn run_interactive(max_depth: u32) -> ExitCode {
    let stack = TREE_STACK + 16 * 1024 * max_depth as usize;
    let code = std::thread::scope(|scope| {
        std::thread::Builder::new()
            .stack_size(stack)
            .spawn_scoped(scope, || interactive_loop(max_depth))
            .map(|runner| runner.join().unwrap_or(130))
            .unwrap_or(130) // the thread would not start: fail loudly-ish
    });
    ExitCode::from(code as u8)
}

/// §7's exit code for the ways the readline edge can end: Ctrl-C
/// (`ReadlineError::Interrupted`) exits **130**; every other end — Ctrl-D,
/// a closed stdin, an editor failure — is the clean 0 of `:quit`.
/// Isolated as a function so the mapping is testable without a terminal
/// (rustyline only reports `Interrupted` from a real TTY in raw mode).
pub(crate) fn readline_error_exit(err: rustyline::error::ReadlineError) -> u8 {
    match err {
        rustyline::error::ReadlineError::Interrupted => 130,
        _ => 0,
    }
}

fn interactive_loop(max_depth: u32) -> u8 {
    let mut repl = Repl::new(max_depth);
    let mut out = interp::StdoutWriter;
    out.write(BANNER);
    out.write(HELP);
    let mut editor = match rustyline::DefaultEditor::new() {
        Ok(editor) => editor,
        // No line editing available — plain stdin lines still work.
        Err(_) => {
            for line in std::io::stdin().lines().map_while(Result::ok) {
                if repl.feed(&line, &mut out) == Control::Quit {
                    break;
                }
            }
            return 0;
        }
    };
    loop {
        let prompt = if repl.is_continuing() { "... " } else { "> " };
        match editor.readline(prompt) {
            Ok(line) => {
                if !line.trim().is_empty() {
                    let _ = editor.add_history_entry(line.trim());
                }
                if repl.feed(&line, &mut out) == Control::Quit {
                    return 0;
                }
            }
            Err(err) => return readline_error_exit(err), // Ctrl-C → 130 (§7); Ctrl-D and friends → 0
        }
    }
}
