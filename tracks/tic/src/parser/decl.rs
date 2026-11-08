//! Declarations and types — both passes of the parser's declaration story.
//!
//! **Pass 1** lives here too: [`hoist_decls`] walks the token stream once
//! and collects every top-level `function` / `class` / `enum` name into a
//! [`NameTable`]. That table is what disambiguates `Counter c = …` (a
//! declaration — `Counter` is a known class) from an expression statement,
//! and it is why students may call a function declared later in the file.
//!
//! **Pass 2** rules here: `function` / `class` / `enum` declarations (§3)
//! and the `type` grammar — a base name plus at most one `[]` / `[N]` /
//! `*` suffix.

use super::errors;
use super::Parser;
use crate::ast::*;
use crate::diagnostics::TicError;
use crate::lexer::{Token, TokenKind};
use crate::util::Span;
use std::collections::HashMap;

// ---- pass 1: the declaration name table ----------------------------------

/// What a hoisted top-level name is declared as.
#[derive(Debug, Clone, PartialEq)]
pub enum NameKind {
    Function,
    /// `init_arity` is the parameter count of the class's `init` method,
    /// if it has one — ready for the checker's `new Counter(…)` calls.
    Class { init_arity: Option<usize> },
    Enum,
}

/// Every top-level declaration name in the file, keyed by name.
#[derive(Debug, Default)]
pub struct NameTable {
    names: HashMap<String, NameKind>,
}

impl NameTable {
    fn insert(&mut self, name: String, kind: NameKind) {
        self.names.insert(name, kind);
    }

    pub fn kind(&self, name: &str) -> Option<NameKind> {
        self.names.get(name).cloned()
    }

    /// Only classes and enums are usable as *types*.
    pub fn is_type_name(&self, name: &str) -> bool {
        matches!(self.kind(name), Some(NameKind::Class { .. } | NameKind::Enum))
    }

    /// The class/enum names, for "did you mean" hints on unknown types.
    pub fn type_names(&self) -> Vec<String> {
        self.names
            .iter()
            .filter(|(_, kind)| matches!(kind, NameKind::Class { .. } | NameKind::Enum))
            .map(|(name, _)| name.clone())
            .collect()
    }
}

/// Walk the tokens and collect declaration names. Robust to broken input:
/// malformed declarations simply are not hoisted — pass 2 reports them.
pub(super) fn hoist_decls(tokens: &[Token]) -> NameTable {
    let mut names = NameTable::default();
    let mut depth = 0usize; // brace nesting
    let mut open_class: Option<String> = None; // class whose body we are in

    for i in 0..tokens.len() {
        match &tokens[i].kind {
            TokenKind::LBrace => depth += 1,
            TokenKind::RBrace => {
                depth = depth.saturating_sub(1);
                if depth == 0 {
                    open_class = None;
                }
            }
            TokenKind::Function if depth == 0 => {
                if let Some(name) = ident_after(tokens, i) {
                    names.insert(name, NameKind::Function);
                }
            }
            TokenKind::Class if depth == 0 => {
                if let Some(name) = ident_after(tokens, i) {
                    names.insert(name.clone(), NameKind::Class { init_arity: None });
                    open_class = Some(name);
                }
            }
            // A method: only interesting when it is `init`, whose arity
            // the checker needs for `new Counter(…)` calls.
            TokenKind::Function
                if depth == 1
                    && open_class.is_some()
                    && ident_after(tokens, i).as_deref() == Some("init")
                    && kind_at(tokens, i + 2) == Some(&TokenKind::LParen) =>
            {
                let class = open_class.clone().expect("checked above");
                let arity = count_params(tokens, i + 3);
                names.insert(class, NameKind::Class { init_arity: Some(arity) });
            }
            TokenKind::Enum if depth == 0 => {
                if let Some(name) = ident_after(tokens, i) {
                    names.insert(name, NameKind::Enum);
                }
            }
            _ => {}
        }
    }
    names
}

fn ident_after(tokens: &[Token], i: usize) -> Option<String> {
    match kind_at(tokens, i + 1) {
        Some(TokenKind::Ident(name)) => Some(name.clone()),
        _ => None,
    }
}

fn kind_at(tokens: &[Token], i: usize) -> Option<&TokenKind> {
    tokens.get(i).map(|t| &t.kind)
}

/// Number of parameters in the list that opens at `open` (a `(`), by
/// counting top-level commas: `(a, b)` → 2, `(a)` → 1, `()` → 0.
fn count_params(tokens: &[Token], open: usize) -> usize {
    if kind_at(tokens, open + 1) == Some(&TokenKind::RParen) {
        return 0;
    }
    let mut depth = 0usize;
    let mut commas = 0usize;
    let mut i = open;
    while let Some(kind) = kind_at(tokens, i) {
        match kind {
            TokenKind::LParen | TokenKind::LBracket | TokenKind::LBrace => depth += 1,
            TokenKind::RParen | TokenKind::RBracket | TokenKind::RBrace => {
                depth = depth.saturating_sub(1);
                if depth == 0 {
                    break;
                }
            }
            TokenKind::Comma if depth == 1 => commas += 1,
            TokenKind::Eof => break,
            _ => {}
        }
        i += 1;
    }
    commas + 1
}

// ---- pass 2: declaration & type rules -------------------------------------

impl<'t> Parser<'t> {
    /// §3 `declaration` — the caller dispatches on the leading keyword.
    pub(super) fn parse_decl(&mut self) -> Result<Decl, TicError> {
        match self.peek() {
            TokenKind::Function => self.parse_function(),
            TokenKind::Class => self.parse_class(),
            TokenKind::Enum => self.parse_enum(),
            _ => Err(errors::unexpected(
                self.span(),
                "`function`, `class` or `enum`",
                &errors::found_desc(self.peek()),
            )),
        }
    }

    /// `function name(params) [-> type] { … }` — the return type is
    /// *optional*: without `->` the function returns unit (`return;` and
    /// falling off the end are legal). The plan's §8.3 example needs this.
    pub(super) fn parse_function(&mut self) -> Result<Decl, TicError> {
        let start = self.bump(); // `function`
        let name = self.expect_ident()?;
        self.expect(TokenKind::LParen)?;
        let params = self.parse_params()?;
        self.expect(TokenKind::RParen)?;
        let return_ty = if self.eat(TokenKind::Arrow) {
            Some(self.parse_type()?)
        } else {
            None
        };
        let body = self.parse_block()?;
        let span = start.to(body.span);
        Ok(Decl::Function(FunctionDecl { name, params, return_ty, body, span }))
    }

    fn parse_params(&mut self) -> Result<Vec<Param>, TicError> {
        let mut params = Vec::new();
        if self.at(TokenKind::RParen) {
            return Ok(params);
        }
        loop {
            let start = self.span();
            let ty = self.parse_type()?;
            let name = self.expect_ident()?;
            params.push(Param { ty, name, span: start.to(self.prev_span()) });
            if !self.eat(TokenKind::Comma) {
                break;
            }
        }
        Ok(params)
    }

    /// `class Name { field… method… }` — members recover individually, so
    /// one bad field does not cost the whole class.
    pub(super) fn parse_class(&mut self) -> Result<Decl, TicError> {
        let start = self.bump(); // `class`
        let name = self.expect_ident()?;
        self.expect(TokenKind::LBrace)?;
        let mut fields = Vec::new();
        let mut methods = Vec::new();
        loop {
            match self.peek() {
                TokenKind::RBrace => {
                    let end = self.bump();
                    return Ok(Decl::Class(ClassDecl {
                        name,
                        fields,
                        methods,
                        span: start.to(end),
                    }));
                }
                TokenKind::Eof => {
                    return Err(errors::unexpected(
                        self.span(),
                        "`}` to close the class body",
                        "end of file",
                    ))
                }
                TokenKind::Function => match self.parse_function() {
                    Ok(Decl::Function(method)) => methods.push(method),
                    Ok(_) => unreachable!("parse_function always returns a Function"),
                    Err(err) => self.recover(err),
                },
                _ => match self.parse_field() {
                    Ok(field) => fields.push(field),
                    Err(err) => self.recover(err),
                },
            }
        }
    }

    /// One `type name;` inside a class body.
    fn parse_field(&mut self) -> Result<FieldDecl, TicError> {
        let start = self.span();
        let ty = self.parse_type()?;
        let name = self.expect_ident()?;
        let end = self.expect(TokenKind::Semi)?;
        Ok(FieldDecl { ty, name, span: start.to(end) })
    }

    /// `enum Name { A, B, C }` — no trailing comma (unlike the collection
    /// literals, the §3 grammar does not allow one here).
    pub(super) fn parse_enum(&mut self) -> Result<Decl, TicError> {
        let start = self.bump(); // `enum`
        let name = self.expect_ident()?;
        self.expect(TokenKind::LBrace)?;
        let mut variants = vec![self.expect_ident()?];
        while self.eat(TokenKind::Comma) {
            variants.push(self.expect_ident()?);
        }
        let end = self.expect(TokenKind::RBrace)?;
        Ok(Decl::Enum(EnumDecl { name, variants, span: start.to(end) }))
    }

    // ---- types (§3 `type`) -------------------------------------------------

    /// `base_type` + at most one of `[]`, `[N]`, `*`. A second suffix is a
    /// T1005 — Tic v1 has no arrays of arrays or pointers to pointers.
    pub(super) fn parse_type(&mut self) -> Result<AstType, TicError> {
        let (base, base_span) = self.parse_base_type()?;
        let suffix = match self.peek() {
            TokenKind::LBracket => {
                self.bump();
                if self.eat(TokenKind::RBracket) {
                    TypeSuffix::DynArray
                } else {
                    let size = match self.peek() {
                        TokenKind::Int(value) => {
                            let value = *value;
                            self.bump();
                            value
                        }
                        _ => {
                            return Err(errors::unexpected(
                                self.span(),
                                "an array size like `[5]`, or `[]` for a growable array",
                                &errors::found_desc(self.peek()),
                            ))
                        }
                    };
                    self.expect(TokenKind::RBracket)?;
                    TypeSuffix::FixedArray(size.max(0) as usize)
                }
            }
            TokenKind::Star => {
                self.bump();
                TypeSuffix::Pointer
            }
            _ => TypeSuffix::None,
        };
        if matches!(self.peek(), TokenKind::LBracket | TokenKind::Star) {
            return Err(TicError::TypeSuffixNotAllowed { span: self.span() });
        }
        Ok(AstType { base, suffix, span: base_span.to(self.prev_span()) })
    }

    /// The 14 builtin type keywords, or any identifier (a class/enum name —
    /// whether it exists is the checker's question).
    pub(super) fn parse_base_type(&mut self) -> Result<(BaseTy, Span), TicError> {
        let base = match self.peek() {
            TokenKind::TyI8 => BaseTy::I8,
            TokenKind::TyI16 => BaseTy::I16,
            TokenKind::TyI32 => BaseTy::I32,
            TokenKind::TyI64 => BaseTy::I64,
            TokenKind::TyU8 => BaseTy::U8,
            TokenKind::TyU16 => BaseTy::U16,
            TokenKind::TyU32 => BaseTy::U32,
            TokenKind::TyU64 => BaseTy::U64,
            TokenKind::TyF32 => BaseTy::F32,
            TokenKind::TyF64 => BaseTy::F64,
            TokenKind::TyBool => BaseTy::Bool,
            TokenKind::TyChar => BaseTy::Char,
            TokenKind::TyStr => BaseTy::Str,
            TokenKind::TyObj => BaseTy::Obj,
            TokenKind::Ident(name) => {
                let name = name.clone();
                let span = self.bump();
                return Ok((BaseTy::Named(name), span));
            }
            _ => {
                return Err(errors::unexpected(
                    self.span(),
                    "a type",
                    &errors::found_desc(self.peek()),
                ))
            }
        };
        Ok((base, self.bump()))
    }
}
