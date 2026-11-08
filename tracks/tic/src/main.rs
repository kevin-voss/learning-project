//! Entry point: parse the command line with clap, then dispatch to
//! [`tic::cli`]. Everything interesting lives in the library so it stays
//! unit-testable.
//!
//! Plan: §4.3 (`main.rs — clap setup → dispatch to cli::`), §7.

#![forbid(unsafe_code)]

use clap::Parser;
use std::process::ExitCode;
use tic::cli::Cli;

fn main() -> ExitCode {
    // `try_parse` instead of `parse` so we control the exit code: the plan
    // reserves exit code 2 for *runtime* errors, so clap usage errors are
    // reported with code 1 instead of clap's default 2.
    let cli = match Cli::try_parse() {
        Ok(cli) => cli,
        Err(err) => {
            let _ = err.print(); // --help/--version to stdout, errors to stderr
            return if err.use_stderr() {
                ExitCode::from(1)
            } else {
                ExitCode::SUCCESS
            };
        }
    };
    tic::cli::dispatch(cli)
}
