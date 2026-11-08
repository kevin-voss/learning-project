//! CLI surface (plan §7) and the pipeline dispatch.
//!
//! ```text
//! tic <file>              check + run (the only command students need)
//! tic run <file>          same, explicit
//! tic check <file>        type-check only; prints nothing on success
//! tic --tokens <file>     dump the token stream (x-ray)
//! tic --ast <file>        dump the pretty-printed AST (x-ray)
//! tic --trace <file>      run + print variables after every statement
//! tic --max-depth <n>     recursion limit (default 1000)
//! tic                     REPL (interactive session — `:help` inside)
//! ```
//!
//! Exit codes (§7): `0` success · `1` compile errors (lex/parse/type) and
//! usage errors · `2` runtime errors (interpreter arrives in phase 4).
//!
//! Stages that later phases implement return a clean T4xxx
//! "not implemented yet (phase N)" error — the CLI stays testable at
//! every phase instead of panicking.

use clap::{Parser, Subcommand};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::ExitCode;

use crate::ast;
use crate::checker;
use crate::diagnostics::{self, TicError};
use crate::interp;
use crate::lexer::{self, Token};
use crate::parser;

pub mod repl;

#[derive(Debug, Parser)]
#[command(
    name = "tic",
    version,
    about = "Tic — a tiny, statically-typed, C-like teaching language",
    after_help = "Examples:\n  tic                      the REPL (type :help inside)\n  tic hello.tic            check + run\n  tic check hello.tic      type-check only\n  tic --tokens hello.tic   see what the lexer sees"
)]
pub struct Cli {
    /// File to check and run (shortcut for `tic run <file>`)
    pub file: Option<PathBuf>,

    #[command(subcommand)]
    pub command: Option<Command>,

    /// Dump the token stream of FILE (x-ray)
    #[arg(long, value_name = "FILE")]
    pub tokens: Option<PathBuf>,

    /// Dump the pretty-printed AST of FILE (x-ray)
    #[arg(long, value_name = "FILE")]
    pub ast: Option<PathBuf>,

    /// Run FILE and print variables after every statement (x-ray)
    #[arg(long, value_name = "FILE")]
    pub trace: Option<PathBuf>,

    /// Recursion depth limit
    #[arg(long, default_value_t = 1000)]
    pub max_depth: u32,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    /// Check and run a file
    Run { file: PathBuf },
    /// Type-check a file without running it
    Check { file: PathBuf },
}

/// What the user actually asked for, after reconciling flags — exactly one.
#[derive(Debug, PartialEq)]
enum Mode {
    Repl,
    Run(PathBuf),
    Check(PathBuf),
    Tokens(PathBuf),
    Ast(PathBuf),
    Trace(PathBuf),
}

/// Errors plus (optionally) the source file they came from, so `dispatch`
/// can render them the §5.6 way. Usually one error; the parser recovers
/// statement-by-statement (§5.2), so a parse failure can carry many.
/// (Crate-visible so the diagnostics snapshot tests can render failures
/// exactly the way the CLI prints them.)
#[derive(Debug)]
pub(crate) struct Failure {
    /// The errors to show — for parse failures, capped at
    /// [`parser::MAX_SHOWN`] by the parser itself.
    pub(crate) errors: Vec<TicError>,
    /// Errors found but not shown ("…and N more — fix these first").
    pub(crate) more: usize,
    /// (file name, full source) — `None` for errors with no location.
    pub(crate) file: Option<(String, String)>,
}

impl Failure {
    fn plain(err: TicError) -> Self {
        Self { errors: vec![err], more: 0, file: None }
    }

    fn sourced(err: TicError, name: &str, src: &str) -> Self {
        Self {
            errors: vec![err],
            more: 0,
            file: Some((name.to_string(), src.to_string())),
        }
    }

    fn parse(errors: parser::ParseErrors, name: &str, src: &str) -> Self {
        Self {
            more: errors.total - errors.errors.len(),
            errors: errors.errors,
            file: Some((name.to_string(), src.to_string())),
        }
    }

    /// A batch of type errors (the checker, like the parser, reports all
    /// of them in one run), capped at [`parser::MAX_SHOWN`].
    fn checked(errors: Vec<TicError>, name: &str, src: &str) -> Self {
        let shown = errors.len().min(parser::MAX_SHOWN);
        Self {
            more: errors.len() - shown,
            errors: errors[..shown].to_vec(),
            file: Some((name.to_string(), src.to_string())),
        }
    }

    fn first(&self) -> &TicError {
        &self.errors[0]
    }
}

impl From<TicError> for Failure {
    fn from(err: TicError) -> Self {
        Failure::plain(err)
    }
}

/// Entry point: run one invocation, return the process exit code.
pub fn dispatch(cli: Cli) -> ExitCode {
    // The REPL owns its loop *and* its exit codes (`:quit`/Ctrl-D → 0,
    // Ctrl-C → 130), so it runs here rather than through `execute`.
    if matches!(resolve_mode(&cli), Ok(Mode::Repl)) {
        return repl::run_interactive(cli.max_depth);
    }
    match execute(cli) {
        Ok(()) => ExitCode::SUCCESS,
        Err(failure) => {
            eprint!("{}", render_failure(&failure));
            ExitCode::from(failure.first().family().exit_code())
        }
    }
}

/// Render a whole failure exactly the way the CLI prints it: every error
/// §5.6-style (code, source line, label, hint), then the
/// "…and N more — fix these first" line. Shared with the snapshot tests,
/// so what they pin is what students see.
pub(crate) fn render_failure(failure: &Failure) -> String {
    let mut out = String::new();
    for err in &failure.errors {
        let rendered = match &failure.file {
            Some((name, src)) => diagnostics::render(err, name, src),
            None => diagnostics::render_plain(err),
        };
        if rendered.is_empty() {
            continue;
        }
        out.push_str(&rendered);
        if !rendered.ends_with('\n') {
            out.push('\n');
        }
    }
    if failure.more > 0 {
        out.push_str(&format!("…and {} more — fix these first\n", failure.more));
    }
    out
}

pub(crate) fn execute(cli: Cli) -> Result<(), Failure> {
    if cli.max_depth == 0 {
        return Err(TicError::Usage {
            message: "--max-depth must be at least 1".into(),
        }
        .into());
    }
    let mode = resolve_mode(&cli)?;
    let trace = matches!(mode, Mode::Trace(_));
    match mode {
        // Bare `tic` never reaches this arm in `dispatch` (the REPL runs
        // there, interactively); a non-interactive caller has nothing
        // sensible to do without a terminal, so succeed quietly. Scripted
        // sessions go through `repl::run_scripted` (see tests/repl).
        Mode::Repl => Ok(()),
        Mode::Tokens(path) => {
            let (name, src) = read_source(&path)?;
            let tokens = lexer::tokenize(&src).map_err(|e| Failure::sourced(e, &name, &src))?;
            print!("{}", dump_tokens(&tokens, &src));
            Ok(())
        }
        Mode::Ast(path) => {
            let tree = on_sized_stack(TREE_STACK, move || run_ast(&path))?;
            print!("{tree}");
            Ok(())
        }
        // run / check / trace all lex + parse + type-check for real;
        // run and trace then hand the CheckedProgram to the interpreter
        // (phase 4). A runtime error is T3xxx → exit 2.
        Mode::Check(path) => on_sized_stack(TREE_STACK, move || {
            let (name, src) = read_source(&path)?;
            let program = parse_source(&name, &src)?;
            check_source(&program, &name, &src)?;
            Ok(()) // §7: check prints nothing on success
        }),
        Mode::Run(path) | Mode::Trace(path) => on_sized_stack(
            TREE_STACK + 16 * 1024 * cli.max_depth as usize,
            move || {
                let (name, src) = read_source(&path)?;
                let program = parse_source(&name, &src)?;
                let checked = check_source(&program, &name, &src)?;
                let mut out = interp::StdoutWriter;
                interp::run(
                    &checked,
                    &src,
                    &mut out,
                    interp::RunOptions {
                        max_depth: cli.max_depth,
                        trace,
                        ..interp::RunOptions::default()
                    },
                )
                .map_err(|e| Failure::sourced(e, &name, &src))
            },
        ),
    }
}

/// Stack for every pipeline stage that recurses over the student's
/// program tree (parse, check, the `--ast` printer). Their recursion is
/// capped by the parser's [`parser::MAX_NEST`] and the walker's own
/// guards — this sizing (measured with debug-build headroom, where
/// frames are widest) is what guarantees those friendly caps always win
/// the race against the native stack (§12). Reserved, not committed.
/// (Crate-visible: the REPL sizes its loop's thread the same way.)
pub(crate) const TREE_STACK: usize = 64 * 1024 * 1024;

/// Run `work` on a thread with `stack` bytes of stack, mapping thread
/// failures onto the friendly T4xxx path. `work` borrows freely — the
/// scope keeps the caller's locals alive for the join.
fn on_sized_stack<T: Send>(
    stack: usize,
    work: impl FnOnce() -> Result<T, Failure> + Send,
) -> Result<T, Failure> {
    std::thread::scope(|scope| {
        let runner = std::thread::Builder::new()
            .stack_size(stack)
            .spawn_scoped(scope, work)
            .map_err(|cause| {
                Failure::plain(TicError::Usage {
                    message: format!(
                        "cannot start the run thread (try a smaller --max-depth): {cause}"
                    ),
                })
            })?;
        match runner.join() {
            Ok(result) => result,
            Err(_) => Err(Failure::plain(TicError::Usage {
                message: "the run thread died unexpectedly — this is a Tic bug".into(),
            })),
        }
    })
}

/// `--ast`: read, lex, parse, return the pretty-printed tree.
fn run_ast(path: &Path) -> Result<String, Failure> {
    let (name, src) = read_source(path)?;
    let program = parse_source(&name, &src)?;
    Ok(ast::display::dump(&program))
}

/// Lex + parse a source file, mapping the first failure into a [`Failure`]
/// (all of them, for parse errors).
fn parse_source(name: &str, src: &str) -> Result<ast::Program, Failure> {
    let tokens = lexer::tokenize(src).map_err(|e| Failure::sourced(e, name, src))?;
    parser::parse(&tokens).map_err(|errors| Failure::parse(errors, name, src))
}

/// Type-check a parsed program (§5.3): `Err` carries every T2xxx the
/// checker found; the interpreter consumes the [`checker::CheckedProgram`].
fn check_source(
    program: &ast::Program,
    name: &str,
    src: &str,
) -> Result<checker::CheckedProgram, Failure> {
    checker::check(program).map_err(|errors| Failure::checked(errors, name, src))
}

/// Fold the CLI's overlapping flags into exactly one [`Mode`].
fn resolve_mode(cli: &Cli) -> Result<Mode, TicError> {
    let mut picked: Vec<(&str, Mode)> = Vec::new();
    if let Some(file) = &cli.file {
        picked.push(("`tic <file>`", Mode::Run(file.clone())));
    }
    match &cli.command {
        Some(Command::Run { file }) => picked.push(("`tic run <file>`", Mode::Run(file.clone()))),
        Some(Command::Check { file }) => {
            picked.push(("`tic check <file>`", Mode::Check(file.clone())))
        }
        None => {}
    }
    if let Some(file) = &cli.tokens {
        picked.push(("`--tokens`", Mode::Tokens(file.clone())));
    }
    if let Some(file) = &cli.ast {
        picked.push(("`--ast`", Mode::Ast(file.clone())));
    }
    if let Some(file) = &cli.trace {
        picked.push(("`--trace`", Mode::Trace(file.clone())));
    }

    match picked.len() {
        0 => Ok(Mode::Repl),
        1 => Ok(picked
            .into_iter()
            .next()
            .expect("checked for exactly one mode")
            .1),
        _ => {
            let names: Vec<&str> = picked.iter().map(|(name, _)| *name).collect();
            Err(TicError::Usage {
                message: format!(
                    "pick one mode — you asked for {} at once",
                    names.join(" and ")
                ),
            })
        }
    }
}

fn read_source(path: &Path) -> Result<(String, String), Failure> {
    fs::read_to_string(path)
        .map(|src| (path.display().to_string(), src))
        .map_err(|cause| {
            Failure::plain(TicError::CannotReadFile {
                path: path.display().to_string(),
                cause: cause.to_string(),
            })
        })
}

/// The stable `--tokens` dump: one token per line — kind, raw lexeme, span.
/// The lexeme is the raw source text, so escapes and quotes are visible
/// exactly as the student wrote them (P5: x-ray, not magic).
pub fn dump_tokens(tokens: &[Token], src: &str) -> String {
    use std::fmt::Write as _;
    let mut out = String::new();
    for token in tokens {
        let lexeme = &src[token.span.start..token.span.end];
        writeln!(out, "{:<14} {:?} {}", token.kind.name(), lexeme, token.span)
            .expect("writing to a String cannot fail");
    }
    out
}

#[cfg(test)]
mod tests;
