//! The tree-walking interpreter (plan §5.5, §6.1) — phases 4–5: scalars,
//! control flow, functions, recursion and top-level execution on the
//! checker's [`CheckedProgram`], plus the memory layer (arrays with
//! reference semantics, pointers via slot `Rc`s, and the §2.5 builtins
//! that need them).
//!
//! Layout (repo rule: ≤5 files per directory):
//!
//! * `value.rs` — [`Value`], [`Width`] (width-checked arithmetic tags),
//!   [`Slot`] (the §4.4 pointer target) and the print formats.
//! * `env.rs` — the runtime scope chain; every variable is an
//!   `Rc<RefCell<Value>>` **slot** (the pointer trick `&x` builds on).
//! * `memory.rs` — arrays and pointers: bounds-checked element access,
//!   `&place` / `*p` read+write, array construction and `copy`.
//! * `builtins.rs` — the §2.5 table: `print` + the math toolbox (phase 4)
//!   and `len push pop insert remove range size_of random copy input`
//!   (phase 5).
//! * `eval/` — the walker itself: `mod` (statements + assignment),
//!   `expr` (expressions + short-circuiting), `ops` (width-checked
//!   arithmetic, casts, pointer identity), `calls` (frames, depth cap),
//!   `objects` (phase 6: `new`, methods, `this`, fields, objs, enums).
//!
//! Two guards keep P1's "never a native crash" promise true:
//!
//! * **Tic call depth** is capped at `--max-depth` (default 1000) — the
//!   friendly T3003 instead of a Rust stack overflow.
//! * **Nesting depth** ([`NEST_LIMIT`]) caps how deep one function's
//!   expression/statement tree may recurse *inside* the walker; it resets
//!   at every call boundary, so the two limits never fight.
//!
//! All output flows through the [`Writer`] trait — the test seam now and
//! the WASM playground seam later (§5.5). [`RunOptions::random_seed`] is
//! the matching input seam: it pins [`Rng`] so `random(a, b)` tests run
//! deterministically (unseeded = real entropy).
//!
//! `input(prompt)` reads real stdin in v1 — the one input path with no
//! seam yet. The REPL (phase 8) shares that stdin deliberately: a snippet
//! calling `input()` reads the same terminal rustyline prompts on.

mod builtins;
mod env;
mod eval;
mod memory;
mod value;

pub use value::{ClassInstance, ObjData, Slot, Value, Width};

use crate::checker::types::{CheckedProgram, TicType};
use crate::diagnostics::TicError;
use env::Env;

/// How deep one function's expression/statement nesting may go before the
/// walker refuses — a conservative Rust-stack guard (§12), far past any
/// hand-written program.
pub(crate) const NEST_LIMIT: u32 = 1024;

/// Where all program output goes: `print`, and later the WASM playground.
/// `write_line` is the convenience every caller actually wants.
pub trait Writer {
    fn write(&mut self, text: &str);
    fn write_line(&mut self, text: &str) {
        self.write(text);
        self.write("\n");
    }
}

/// The default [`Writer`]: stdout, never panicking on a closed pipe.
pub struct StdoutWriter;

impl Writer for StdoutWriter {
    fn write(&mut self, text: &str) {
        use std::io::Write;
        let mut out = std::io::stdout().lock();
        let _ = out.write_all(text.as_bytes()); // a closed pipe ends quietly, not with a panic
    }
}

/// How a statement finished (§5.5): plain fall-through, or a `return`
/// unwinding outward. No break/continue in v1.
#[derive(Debug, Clone, PartialEq)]
pub(crate) enum Flow {
    Normal,
    Return(Value),
}

/// Knobs for [`run`]: the `--max-depth` recursion limit, `--trace`, and
/// the optional seed that pins [`Rng`] (tests want deterministic
/// `random(a, b)`; the default is real entropy).
#[derive(Debug, Clone, Copy)]
pub struct RunOptions {
    pub max_depth: u32,
    pub trace: bool,
    /// `Some(seed)` makes every `random(a, b)` call reproducible.
    pub random_seed: Option<u64>,
}

impl Default for RunOptions {
    fn default() -> Self {
        RunOptions { max_depth: 1000, trace: false, random_seed: None } // §7 defaults
    }
}

/// The tiny random stream behind `random(a, b)` (§2.5): SplitMix64, hand
/// rolled on purpose — one screenful of well-understood math, no crates,
/// fully deterministic when seeded. Seeded per run, never per call, so a
/// seeded program produces its whole sequence reproducibly.
pub(crate) struct Rng {
    state: u64,
}

impl Rng {
    pub(crate) fn new(seed: Option<u64>) -> Rng {
        Rng { state: seed.unwrap_or_else(os_entropy) }
    }

    /// The next uniform u64 (SplitMix64).
    pub(crate) fn next_u64(&mut self) -> u64 {
        self.state = self.state.wrapping_add(0x9E37_79B9_7F4A_7C15);
        let mut z = self.state;
        z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
        z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
        z ^ (z >> 31)
    }
}

/// Unseeded default: a per-process random value from the standard
/// library's seeded hasher (no extra crates, no unsafe).
fn os_entropy() -> u64 {
    use std::collections::hash_map::RandomState;
    use std::hash::{BuildHasher, Hasher};
    let mut hasher = RandomState::new().build_hasher();
    hasher.write_u64(0x7469_6321); // "tic!"
    hasher.finish()
}

/// Run a checked program top to bottom (§2.6 rule 6): declarations were
/// collected by the checker, so the top-level statements execute in
/// source order with every function already callable.
///
/// `source` is the text the program came from: `--trace` uses it to name
/// the line of each step, and the REPL (phase 8) will pass each snippet.
pub fn run(
    program: &CheckedProgram,
    source: &str,
    writer: &mut dyn Writer,
    opts: RunOptions,
) -> Result<(), TicError> {
    let mut interp = Interp::new(program, source, writer, opts);
    for stmt in &program.stmts {
        if let Flow::Return(_) = interp.eval_stmt(stmt)? {
            break; // a top-level `return;` simply ends the program
        }
    }
    Ok(())
}

/// A REPL session's persistent state (plan §6.2, phase 8): the one
/// environment that survives from snippet to snippet. The REPL appends
/// each accepted snippet to a session source, re-checks the whole thing
/// (so a snippet is checked *in context* of every earlier declaration),
/// then asks the session to run only the new tail — here, in this env.
pub struct Session {
    env: Env,
}

impl Session {
    /// A session with no variables yet.
    pub fn new() -> Session {
        Session { env: Env::new() }
    }

    /// Run the top-level statements from index `from` on — the new tail of
    /// a re-checked session source — in the session's persistent env.
    ///
    /// The snippet's declarations land in a **child scope**: promoted into
    /// the session globals when every statement succeeds, dropped when one
    /// fails — so after a runtime error the env matches the source the
    /// REPL rolls back to (side effects on *existing* variables persist;
    /// they go through shared slots, never re-boxed). Returns the value of
    /// the last top-level expression statement run, for the REPL's echo.
    ///
    /// A top-level `return` (fine in a file, where it ends the program) is
    /// refused: in the REPL it would strand the statements after it.
    pub fn run_snippet(
        &mut self,
        program: &CheckedProgram,
        source: &str,
        writer: &mut dyn Writer,
        opts: RunOptions,
        from: usize,
    ) -> Result<Option<Value>, TicError> {
        let mut interp = Interp::new(program, source, writer, opts);
        std::mem::swap(&mut interp.env, &mut self.env);
        interp.env.push(); // the snippet scope (see above)
        let mut outcome = Ok(());
        let mut last_value = None;
        for stmt in program.stmts.iter().skip(from) {
            // An expression statement's value is the REPL's echo — the
            // file-mode walker discards it, so evaluate + trace it here.
            let step = match stmt {
                crate::ast::Stmt::ExprStmt { expr, span } => {
                    match interp.eval_expr(expr) {
                        Ok(value) => {
                            interp.trace_step(*span);
                            last_value = Some(value);
                            Ok(Flow::Normal)
                        }
                        Err(err) => Err(err),
                    }
                }
                other => interp.eval_stmt(other),
            };
            match step {
                Ok(Flow::Normal) => {}
                Ok(Flow::Return(_)) => {
                    outcome = Err(TicError::Usage {
                        message: "return at the top level ends a whole program, not one \
                                  REPL snippet — put it inside a function"
                            .into(),
                    });
                    break;
                }
                Err(err) => {
                    outcome = Err(err);
                    break;
                }
            }
        }
        if outcome.is_ok() {
            interp.env.promote(); // the snippet's declarations become globals
        } else {
            interp.env.pop(); // …or vanish with the rolled-back snippet
        }
        std::mem::swap(&mut interp.env, &mut self.env);
        outcome.map(|_| last_value)
    }

    /// Every variable alive in the session, name-sorted `(name, value)`
    /// pairs — the `:env` x-ray, in the same format `--trace` prints.
    pub fn snapshot(&self) -> Vec<(String, String)> {
        self.env.visible_snapshot()
    }
}

impl Default for Session {
    fn default() -> Self {
        Self::new()
    }
}

/// The walker itself. `program` is a *shared* reference with its own
/// lifetime `'p`, so statement/expression nodes borrowed from it stay
/// usable while `env` / `writer` mutate — no AST cloning per call.
pub(crate) struct Interp<'p, 'w> {
    pub(crate) program: &'p CheckedProgram,
    pub(crate) env: Env,
    pub(crate) writer: &'w mut dyn Writer,
    pub(crate) max_depth: u32,
    /// Active Tic function calls (the `--max-depth` meter).
    pub(crate) call_depth: u32,
    /// Active walker frames *within the current function* — the §12 guard.
    pub(crate) frames: u32,
    pub(crate) trace: bool,
    /// The `random(a, b)` stream (seeded via [`RunOptions`]).
    pub(crate) rng: Rng,
    /// Byte offset where each source line starts (built only when
    /// `--trace` is on — it is the line-number lookup).
    line_starts: Vec<usize>,
    /// The variables the last `--trace` step saw — the diff baseline.
    last_vars: Vec<(String, String)>,
}

impl<'p, 'w> Interp<'p, 'w> {
    fn new(
        program: &'p CheckedProgram,
        source: &str,
        writer: &'w mut dyn Writer,
        opts: RunOptions,
    ) -> Interp<'p, 'w> {
        let line_starts = if opts.trace {
            let mut starts = vec![0usize];
            starts.extend(
                source
                    .bytes()
                    .enumerate()
                    .filter(|(_, b)| *b == b'\n')
                    .map(|(i, _)| i + 1),
            );
            starts
        } else {
            Vec::new()
        };
        Interp {
            program,
            env: Env::new(),
            writer,
            max_depth: opts.max_depth,
            call_depth: 0,
            frames: 0,
            trace: opts.trace,
            rng: Rng::new(opts.random_seed),
            line_starts,
            last_vars: Vec::new(),
        }
    }

    /// The checker's recorded type of an expression — literals carry
    /// their **adapted** type (`i8 big = 127; big + 1` records i8), which
    /// is exactly what width-checked arithmetic needs.
    pub(crate) fn ty_of(&self, expr: &crate::ast::Expr) -> &'p TicType {
        self.program.expr_types.expect(expr.span())
    }

    /// 1-based source line of a byte offset (a `--trace` lookup).
    fn line_of(&self, offset: usize) -> usize {
        match self.line_starts.binary_search(&offset) {
            Ok(index) => index + 1,
            Err(index) => index,
        }
    }

    /// The `--trace` step (§7, phase-7 polish): after every executed
    /// statement, one stable line — the statement's line number and the
    /// variables the statement *changed* (new, reassigned, or gone with
    /// a closed scope). `(no changes)` when the statement only read.
    pub(crate) fn trace_step(&mut self, span: crate::util::Span) {
        if !self.trace {
            return;
        }
        let line = self.line_of(span.start);
        let now = self.env.visible_snapshot();
        let mut parts: Vec<(String, String)> = Vec::new();
        for (name, value) in &now {
            let was = self.last_vars.iter().find(|(n, _)| n == name);
            if !matches!(was, Some((_, prev)) if prev == value) {
                parts.push((name.clone(), format!("{name} = {value}")));
            }
        }
        for (name, _) in &self.last_vars {
            if !now.iter().any(|(n, _)| n == name) {
                parts.push((name.clone(), format!("{name} (out of scope)")));
            }
        }
        parts.sort_by(|a, b| a.0.cmp(&b.0));
        self.last_vars = now;
        let text = if parts.is_empty() {
            "(no changes)".to_string()
        } else {
            parts.into_iter().map(|(_, text)| text).collect::<Vec<_>>().join(", ")
        };
        self.writer.write_line(&format!("[trace] line {line}: {text}"));
    }
}
