//! Interpreter integration tests (plan §9) — the acceptance layer:
//! the example fixtures byte-for-byte (01–06, with 02/05's teaching
//! runtime errors), the scalar/memory "runs fine" banks, and the
//! runtime-error bank (overflow, bounds, null, division, recursion,
//! casts).
//!
//! Everything goes through the **public API** (`tic::interp::run` with a
//! `Vec`-writing [`Writer`]) — the same seam the WASM playground will
//! use.

mod fixtures;
mod memory;
mod runtime_errors;
mod scalars;

use tic::checker::CheckedProgram;
use tic::diagnostics::TicError;
use tic::interp::{run, RunOptions, Writer};

/// The test seam: everything the program prints lands in this String.
pub(crate) struct VecWriter(pub String);

impl Writer for VecWriter {
    fn write(&mut self, text: &str) {
        self.0.push_str(text);
    }
}

/// Full pipeline up to the interpreter's input.
pub(crate) fn check_src(src: &str) -> CheckedProgram {
    let tokens = tic::tokenize(src).expect("the test program lexes");
    let program = tic::parse(&tokens).expect("the test program parses");
    tic::check(&program).expect("the test program type-checks")
}

/// Run `src` through the public API, capturing output.
pub(crate) fn run_src(src: &str, opts: RunOptions) -> Result<String, TicError> {
    let checked = check_src(src);
    let mut writer = VecWriter(String::new());
    run(&checked, src, &mut writer, opts).map(|()| writer.0)
}

/// The successful twin of [`run_src`]: output, or a panic naming the error.
pub(crate) fn output_of(src: &str) -> String {
    match run_src(src, RunOptions::default()) {
        Ok(out) => out,
        Err(err) => panic!("expected success, got [{}] {}", err.error_code(), err.message()),
    }
}

/// The failing twin: the error itself.
pub(crate) fn error_of(src: &str) -> TicError {
    match run_src(src, RunOptions::default()) {
        Err(err) => err,
        Ok(out) => panic!("expected a runtime error, got output {out:?}"),
    }
}

/// Run on a thread with a big stack: the default `--max-depth` of 1000
/// legitimately nests a thousand interpreter frames, which does not fit
/// the 2 MiB test-thread stack. (The CLI gives its runner thread a
/// depth-sized stack for exactly this reason.)
pub(crate) fn run_src_big_stack(src: &str, opts: RunOptions) -> Result<String, TicError> {
    let src = src.to_string();
    std::thread::scope(|scope| {
        std::thread::Builder::new()
            .stack_size(64 * 1024 * 1024)
            .spawn_scoped(scope, move || run_src(&src, opts))
            .expect("spawn the big-stack test thread")
            .join()
            .expect("the big-stack test thread must not panic")
    })
}
