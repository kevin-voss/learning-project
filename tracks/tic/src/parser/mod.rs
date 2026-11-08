//! The parser (plan §5.2): recursive descent over the §3 EBNF, in two passes.
//!
//! **Pass 1** ([`hoist_decls`](decl::hoist_decls), in the `decl` module)
//! walks the token stream once and collects every top-level `function` /
//! `class` / `enum` name into a name table. That table is what
//! disambiguates `Counter c = …` (a declaration — `Counter` is a known
//! class) from an expression statement, *before* anything is parsed, and
//! it is why students may call a function declared later in the file.
//!
//! **Pass 2** is one function per grammar rule, split across the `decl`
//! (declarations, types), [`stmt`] and [`expr`] modules. On a
//! statement-level error the parser records the T1xxx diagnostic, skips
//! to the next `;` or `}`, and continues — one run shows all errors.

mod decl;
mod errors;
mod expr;
mod stmt;

pub use decl::{NameKind, NameTable};
pub use errors::{ParseErrors, MAX_SHOWN};

use crate::ast::Program;
use crate::diagnostics::TicError;
use crate::lexer::{Token, TokenKind};
use decl::hoist_decls;

/// How deep the grammar recursion may go (nested parentheses, unary
/// chains, nested blocks) before the parser refuses — the parser's half
/// of the §12 "never a native stack overflow" promise, and the same
/// number the walker's `NEST_LIMIT` uses. Past it the parser raises the
/// same friendly `T3005` the walker would, long before its own frames
/// can exhaust the native stack.
pub(crate) const MAX_NEST: u32 = 1024;

/// Parse a token stream (ending in `Eof`). `Err` carries every parse error
/// found — up to [`MAX_SHOWN`] of them plus the total count.
pub fn parse(tokens: &[Token]) -> Result<Program, ParseErrors> {
    let (program, errors) = parse_recovering(tokens);
    if errors.total == 0 {
        Ok(program)
    } else {
        Err(errors)
    }
}

/// Parse and keep the partial program *even when errors were found* —
/// what recovery is for. `ParseErrors::total == 0` means the parse was
/// clean. The REPL (phase 8) and tests use this to inspect what survived.
pub fn parse_recovering(tokens: &[Token]) -> (Program, ParseErrors) {
    let mut parser = Parser::new(tokens);
    let program = parser.parse_program();
    let errors = parser.finish().unwrap_or(ParseErrors { errors: Vec::new(), total: 0 });
    (program, errors)
}

/// The recursive-descent parser itself. Fields are crate-private; the
/// grammar rules that need them live in the sibling modules.
pub(crate) struct Parser<'t> {
    tokens: &'t [Token],
    pos: usize,
    names: NameTable,
    errors: Vec<TicError>,
    total: usize,
    /// Active grammar-recursion levels — the [`MAX_NEST`] meter.
    nest: u32,
}

impl<'t> Parser<'t> {
    fn new(tokens: &'t [Token]) -> Self {
        Self {
            tokens,
            pos: 0,
            names: hoist_decls(tokens),
            errors: Vec::new(),
            total: 0,
            nest: 0,
        }
    }

    /// Enter one level of grammar recursion (a sub-expression, a unary
    /// chain link, a block). Every refused level unwinds balanced: the
    /// caller decrements only when this returned `Ok`, so error recovery
    /// continues from the same depth it entered with.
    fn enter_nest(&mut self) -> Result<(), TicError> {
        if self.nest >= MAX_NEST {
            return Err(TicError::TooDeeplyNested { span: self.span() });
        }
        self.nest += 1;
        Ok(())
    }

    // ---- cursor ---------------------------------------------------------

    /// The current token kind (`pos` always stops on `Eof`).
    fn peek(&self) -> &TokenKind {
        &self.tokens[self.pos].kind
    }

    /// The token `n` positions ahead (`Eof` past the end).
    fn peek_at(&self, n: usize) -> &TokenKind {
        self.tokens.get(self.pos + n).map(|t| &t.kind).unwrap_or(&TokenKind::Eof)
    }

    /// Span of the current token.
    fn span(&self) -> crate::util::Span {
        self.tokens[self.pos].span
    }

    /// Span of the most recently consumed token.
    fn prev_span(&self) -> crate::util::Span {
        self.tokens[self.pos - 1].span
    }

    fn at(&self, kind: TokenKind) -> bool {
        *self.peek() == kind
    }

    /// Consume the current token (the `Eof` at the end is never passed).
    fn bump(&mut self) -> crate::util::Span {
        let span = self.tokens[self.pos].span;
        if self.pos + 1 < self.tokens.len() {
            self.pos += 1;
        }
        span
    }

    fn eat(&mut self, kind: TokenKind) -> bool {
        if self.at(kind) {
            self.bump();
            true
        } else {
            false
        }
    }

    fn expect(&mut self, kind: TokenKind) -> Result<crate::util::Span, TicError> {
        if self.at(kind.clone()) {
            Ok(self.bump())
        } else {
            Err(errors::unexpected(
                self.span(),
                &errors::expected_desc(&kind),
                &errors::found_desc(self.peek()),
            ))
        }
    }

    fn expect_ident(&mut self) -> Result<crate::ast::Ident, TicError> {
        if let TokenKind::Ident(name) = self.peek() {
            let name = name.clone();
            let span = self.bump();
            Ok(crate::ast::Ident::new(name, span))
        } else {
            Err(errors::unexpected(self.span(), "a name", &errors::found_desc(self.peek())))
        }
    }

    // ---- error recovery (§5.2) -------------------------------------------

    /// Record an error; only the first [`MAX_SHOWN`] are kept for display.
    fn record(&mut self, err: TicError) {
        self.total += 1;
        if self.errors.len() < MAX_SHOWN {
            self.errors.push(err);
        }
    }

    /// Skip to just past the next `;`, or stop before a `}` so the block
    /// loop can close properly. Always advances at least one token.
    fn synchronize(&mut self) {
        let start = self.pos;
        while !matches!(self.peek(), TokenKind::Semi | TokenKind::RBrace | TokenKind::Eof) {
            self.bump();
        }
        if self.at(TokenKind::Semi) {
            self.bump(); // the `;` belongs to the broken statement
        }
        if self.pos == start {
            self.bump(); // error sat on the `}`/`;` itself: skip it
        }
    }

    /// Record + synchronize, shared by every statement-list loop.
    fn recover(&mut self, err: TicError) {
        self.record(err);
        self.synchronize();
    }

    /// `Some(errors)` when anything went wrong, for [`parse`].
    fn finish(self) -> Option<ParseErrors> {
        if self.total == 0 {
            None
        } else {
            Some(ParseErrors { errors: self.errors, total: self.total })
        }
    }

    // ---- program ----------------------------------------------------------

    /// Top level: declarations go into `decls`, everything else into `stmts`
    /// (source order within each — the two-pass split the plan calls for).
    fn parse_program(&mut self) -> Program {
        let mut program = Program { decls: Vec::new(), stmts: Vec::new() };
        loop {
            match self.peek() {
                TokenKind::Eof => break,
                TokenKind::Semi => {
                    self.bump(); // a lone `;` is an empty statement: nothing to keep
                }
                TokenKind::Function | TokenKind::Class | TokenKind::Enum => {
                    match self.parse_decl() {
                        Ok(decl) => program.decls.push(decl),
                        Err(err) => self.recover(err),
                    }
                }
                _ => match self.parse_stmt() {
                    Ok(stmt) => program.stmts.push(stmt),
                    Err(err) => self.recover(err),
                },
            }
        }
        program
    }
}
