//! **Tic** — a tiny, statically-typed, C-like teaching language,
//! interpreted in Rust with zero `unsafe`.
//!
//! Pipeline (plan §4.1): lexer → parser → checker → interpreter.
//! This crate currently implements phases 0–4 (scaffold, lexer, parser,
//! checker, scalar interpreter); later phases plug into the same module
//! tree. See `PLAN.md` §10.
//!
//! The crate is a library *and* a binary: `main.rs` is a thin wrapper so
//! every stage can be unit-tested without spawning a process.

#![forbid(unsafe_code)]

pub mod ast;
pub mod checker;
pub mod cli;
pub mod diagnostics;
pub mod interp;
pub mod lexer;
pub mod parser;
pub mod util;

pub use ast::Program;
pub use checker::{check, CheckedProgram};
pub use diagnostics::TicError;
pub use interp::{run, RunOptions, Writer};
pub use lexer::{tokenize, Lexer, Token, TokenKind};
pub use parser::{parse, ParseErrors};
pub use util::span::Span;
