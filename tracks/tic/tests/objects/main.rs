//! Phase-6 interpreter tests (plan §10 row 6): classes (`new`, `init`,
//! `this`, methods), enum values, and obj literals — through the public
//! API (`tic::interp::run` + a `Vec`-writing `Writer`), like the
//! `tests/interp` bank. This is its own integration target because
//! `tests/interp/` sits at the repo's five-files-per-directory cap, so
//! the phase-6 bank carries its own (compact) copy of that harness.
//!
//! * `classes.rs` — `new`/`init`/`this`, reference semantics, identity,
//!   field slots and pointers to fields, method recursion.
//! * `enums_objs.rs` — enum values and obj literals (§5.4), the bare-obj
//!   runtime field checks (T3009), print formats, and §2.1's zero column.
//!
//! The three example fixtures (07 / 08 / 99) live in
//! `tests/interp/fixtures.rs` beside the other acceptance fixtures.

mod classes;
mod enums_objs;

use tic::checker::CheckedProgram;
use tic::diagnostics::TicError;
use tic::interp::{run, RunOptions, Writer};

struct VecWriter(pub String);

impl Writer for VecWriter {
    fn write(&mut self, text: &str) {
        self.0.push_str(text);
    }
}

pub(crate) fn check_src(src: &str) -> CheckedProgram {
    let tokens = tic::tokenize(src).expect("the test program lexes");
    let program = tic::parse(&tokens).expect("the test program parses");
    tic::check(&program).expect("the test program type-checks")
}

pub(crate) fn run_src(src: &str, opts: RunOptions) -> Result<String, TicError> {
    let checked = check_src(src);
    let mut writer = VecWriter(String::new());
    run(&checked, src, &mut writer, opts).map(|()| writer.0)
}

pub(crate) fn output_of(src: &str) -> String {
    match run_src(src, RunOptions::default()) {
        Ok(out) => out,
        Err(err) => panic!("expected success, got [{}] {}", err.error_code(), err.message()),
    }
}

pub(crate) fn error_of(src: &str) -> TicError {
    match run_src(src, RunOptions::default()) {
        Err(err) => err,
        Ok(out) => panic!("expected a runtime error, got output {out:?}"),
    }
}

pub(crate) fn error_of_opts(src: &str, opts: RunOptions) -> TicError {
    match run_src(src, opts) {
        Err(err) => err,
        Ok(out) => panic!("expected a runtime error, got output {out:?}"),
    }
}
