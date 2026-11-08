//! The compile-time scope stack (plan §5.3): one frame per block, the
//! global frame at the bottom, duplicate detection inside a frame, and
//! shadowing allowed between frames.
//!
//! Only *variables* live here. Functions, classes and enums are
//! file-level and never shadowed by each other; a local variable may
//! shadow them (lookup order is: innermost scope outward, then the
//! checker's declaration tables).

use crate::util::Span;
use crate::checker::types::TicType;
use std::collections::HashMap;

/// One declared variable.
#[derive(Debug, Clone)]
pub struct Symbol {
    pub ty: TicType,
    pub is_final: bool,
    /// Where it was declared — reported by duplicate errors.
    pub span: Span,
}

/// The kind a name already has, for duplicate messages.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DeclKind {
    Variable,
    Function,
    Class,
    Enum,
    Field,
    Method,
    Variant,
    Param,
}

impl DeclKind {
    /// "…is already a variable" / "…is already a field".
    pub fn describe(self) -> &'static str {
        match self {
            DeclKind::Variable => "a variable",
            DeclKind::Function => "a function",
            DeclKind::Class => "a class",
            DeclKind::Enum => "an enum",
            DeclKind::Field => "a field",
            DeclKind::Method => "a method",
            DeclKind::Variant => "a variant",
            DeclKind::Param => "a parameter",
        }
    }
}

/// What went wrong when declaring a name.
#[derive(Debug, Clone)]
pub struct DeclConflict {
    pub first: Span,
    pub first_kind: DeclKind,
}

/// A stack of `{ name → Symbol }` frames. The checker pushes one frame
/// per block / function / `for`, and the bottom frame holds the globals.
#[derive(Debug)]
pub struct ScopeStack {
    frames: Vec<HashMap<String, Symbol>>,
}

impl ScopeStack {
    /// A scope stack with the (empty) global frame already pushed.
    pub fn new() -> Self {
        Self { frames: vec![HashMap::new()] }
    }

    pub fn push(&mut self) {
        self.frames.push(HashMap::new());
    }

    pub fn pop(&mut self) {
        self.frames
            .pop()
            .expect("the global frame is never popped");
    }

    /// Declare a name in the *current* frame; `Err` when this frame (or,
    /// for the global frame, the declaration tables — checked by the
    /// caller) already owns it.
    pub fn declare(
        &mut self,
        name: &str,
        ty: TicType,
        is_final: bool,
        span: Span,
    ) -> Result<(), DeclConflict> {
        let frame = self
            .frames
            .last_mut()
            .expect("the global frame is never popped");
        if let Some(existing) = frame.get(name) {
            return Err(DeclConflict {
                first: existing.span,
                first_kind: DeclKind::Variable,
            });
        }
        frame.insert(name.to_string(), Symbol { ty, is_final, span });
        Ok(())
    }

    /// How many frames are open (1 = only the global frame).
    pub fn depth(&self) -> usize {
        self.frames.len()
    }

    /// Every variable name in any frame — "did you mean" candidates.
    pub fn names(&self) -> Vec<String> {
        self.frames
            .iter()
            .flat_map(|frame| frame.keys().cloned())
            .collect()
    }

    /// Innermost-first lookup.
    pub fn lookup(&self, name: &str) -> Option<&Symbol> {
        self.frames.iter().rev().find_map(|frame| frame.get(name))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::checker::types::TicType;

    fn span(n: usize) -> Span {
        Span::new(n, n + 1)
    }

    #[test]
    fn declares_and_lookups_through_frames() {
        let mut scopes = ScopeStack::new();
        assert!(scopes.declare("x", TicType::I32, false, span(1)).is_ok());
        scopes.push();
        assert!(scopes.declare("x", TicType::Str, false, span(2)).is_ok());
        assert_eq!(scopes.lookup("x").unwrap().ty, TicType::Str, "inner wins");
        scopes.pop();
        assert_eq!(scopes.lookup("x").unwrap().ty, TicType::I32);
    }

    #[test]
    fn same_frame_duplicates_are_rejected() {
        let mut scopes = ScopeStack::new();
        assert!(scopes.declare("y", TicType::I32, false, span(1)).is_ok());
        let conflict = scopes.declare("y", TicType::I32, false, span(9)).unwrap_err();
        assert_eq!(conflict.first, span(1));
        assert_eq!(conflict.first_kind, DeclKind::Variable);
    }

    #[test]
    fn final_flags_survive_the_lookup() {
        let mut scopes = ScopeStack::new();
        scopes.declare("MAX", TicType::I32, true, span(3)).unwrap();
        assert!(scopes.lookup("MAX").unwrap().is_final);
    }
}
