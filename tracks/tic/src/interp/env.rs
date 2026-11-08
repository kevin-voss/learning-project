//! The runtime scope chain (plan §4.4, §6.4): a stack of frames, one per
//! block / function / `for`, with the globals at the bottom.
//!
//! **Every variable is a slot** — an `Rc<RefCell<Value>>` — never a bare
//! `Value`. That is the §4.4 "pointer trick" phase 5 builds `&x` on: the
//! environment hands out clones of the *slot*, so a pointer and the
//! variable keep watching one box. Phase 4 only ever reads and writes
//! through slots, but they are the shape of the world from day one.
//!
//! Every `RefCell` borrow goes through [`read_slot`] / [`write_slot`],
//! which turn a double borrow into a friendly internal error (§5.5) — a
//! Rust panic must never reach a student.

use super::value::{Slot, Value};
use crate::diagnostics::TicError;
use crate::util::Span;
use std::collections::HashMap;

/// The scope chain. Lookup walks from the innermost scope outward; names
/// may shadow across frames, never within one (the checker guarantees
/// that — a runtime duplicate is an internal error, not a Tic error).
pub struct Env {
    scopes: Vec<HashMap<String, Slot>>,
}

impl Env {
    /// A fresh environment with one (global) frame.
    pub fn new() -> Env {
        Env { scopes: vec![HashMap::new()] }
    }

    /// Open a new scope (block, function body, `for`).
    pub fn push(&mut self) {
        self.scopes.push(HashMap::new());
    }

    /// Close the innermost scope. The global frame never pops.
    pub fn pop(&mut self) {
        if self.scopes.len() > 1 {
            self.scopes.pop();
        }
    }

    /// Fold the innermost scope into its parent (the REPL's snippet scope,
    /// phase 8): the names a snippet declared become session globals once
    /// the whole snippet succeeded. The checker guarantees no duplicates,
    /// so a same-name entry can only be a shadow the snippet replaces.
    pub(crate) fn promote(&mut self) {
        if let Some(inner) = self.scopes.pop() {
            let parent = self
                .scopes
                .last_mut()
                .expect("Env::new opens the global scope");
            for (name, slot) in inner {
                parent.insert(name, slot);
            }
        }
    }

    /// Declare a variable in the *current* scope, owning its own slot.
    pub fn declare(&mut self, name: &str, value: Value, span: Span) -> Result<(), TicError> {
        let scope = self
            .scopes
            .last_mut()
            .expect("Env::new opens the global scope");
        if scope.contains_key(name) {
            return Err(TicError::InternalError {
                span,
                what: format!("`{name}` was declared twice at runtime — the checker should have caught this"),
            });
        }
        scope.insert(name.to_string(), std::rc::Rc::new(std::cell::RefCell::new(value)));
        Ok(())
    }

    /// The slot a name lives in (innermost match), cloned — phase 5's
    /// `&x` will clone this same `Rc`.
    pub fn slot_of(&self, name: &str) -> Option<Slot> {
        self.scopes
            .iter()
            .rev()
            .find_map(|scope| scope.get(name).cloned())
    }

    /// Read a named variable.
    pub fn get(&self, name: &str, span: Span) -> Result<Value, TicError> {
        let slot = self.slot_of(name).ok_or_else(|| TicError::InternalError {
            span,
            what: format!("variable `{name}` vanished between checking and running"),
        })?;
        read_slot(&slot, span)
    }

    /// Overwrite a named variable in place (its slot keeps its identity).
    /// Phase 4's assignments go through `slot_of` + `write_slot` (they
    /// already hold the slot); the REPL (phase 8) and REPL-style seams
    /// use this name-based path.
    #[allow(dead_code)] // phase-5+ helper, kept with the slot API it belongs to
    pub fn set(&self, name: &str, value: Value, span: Span) -> Result<(), TicError> {
        let slot = self.slot_of(name).ok_or_else(|| TicError::InternalError {
            span,
            what: format!("variable `{name}` vanished between checking and running"),
        })?;
        write_slot(&slot, value, span)
    }

    /// Every variable visible right now, name-sorted, formatted for
    /// `--trace` (and the REPL's `:env`): all scopes flattened, the
    /// innermost declaration of a name wins. An unreadable slot (a Tic
    /// bug) degrades to a marker instead of failing the run.
    pub fn visible_snapshot(&self) -> Vec<(String, String)> {
        // Insert outer scopes first so inner ones overwrite: the innermost
        // declaration of a name is the one a program would read.
        let mut by_name: HashMap<&str, &Slot> = HashMap::new();
        for scope in &self.scopes {
            for (name, slot) in scope {
                by_name.insert(name, slot); // inner scopes overwrite outer
            }
        }
        let mut pairs: Vec<(String, String)> = by_name
            .into_iter()
            .map(|(name, slot)| {
                let text = match slot.try_borrow() {
                    Ok(value) => value.to_string(),
                    Err(_) => "(unreadable)".to_string(),
                };
                (name.to_string(), text)
            })
            .collect();
        pairs.sort();
        pairs
    }
}

/// Read a slot's value (cloned out) — §5.5's central borrow helper.
pub fn read_slot(slot: &Slot, span: Span) -> Result<Value, TicError> {
    slot.try_borrow().map(|value| value.clone()).map_err(|_| TicError::InternalError {
        span,
        what: "a value was still borrowed when Tic tried to read it".into(),
    })
}

/// Write a slot in place — same guarantee, `try_borrow_mut`.
pub fn write_slot(slot: &Slot, value: Value, span: Span) -> Result<(), TicError> {
    slot.try_borrow_mut()
        .map(|mut slot| *slot = value)
        .map_err(|_| TicError::InternalError {
            span,
            what: "a value was still borrowed when Tic tried to write it".into(),
        })
}

#[cfg(test)]
mod tests {
    use super::*;

    fn span() -> Span {
        Span::point(0)
    }

    #[test]
    fn declare_lookup_and_shadow() {
        let mut env = Env::new();
        env.declare("x", Value::Int(1, super::super::value::Width::I32), span())
            .unwrap();
        env.push();
        env.declare("x", Value::Int(2, super::super::value::Width::I32), span())
            .unwrap();
        assert_eq!(env.get("x", span()).unwrap().to_string(), "2");
        env.pop();
        assert_eq!(env.get("x", span()).unwrap().to_string(), "1");
    }

    #[test]
    fn set_keeps_the_slot_identity() {
        let mut env = Env::new();
        env.declare("n", Value::Int(1, super::super::value::Width::I32), span())
            .unwrap();
        let slot_before = env.slot_of("n").unwrap();
        env.set("n", Value::Int(9, super::super::value::Width::I32), span())
            .unwrap();
        let slot_after = env.slot_of("n").unwrap();
        assert!(std::rc::Rc::ptr_eq(&slot_before, &slot_after), "assignment must not re-box the variable");
        assert_eq!(env.get("n", span()).unwrap().to_string(), "9");
    }

    #[test]
    fn duplicate_in_one_scope_is_a_friendly_internal_error() {
        let mut env = Env::new();
        env.declare("d", Value::Unit, span()).unwrap();
        let err = env.declare("d", Value::Unit, span()).unwrap_err();
        assert!(matches!(err, TicError::InternalError { .. }));
        assert_eq!(err.error_code(), "T3006");
    }

    #[test]
    fn snapshot_shadows_innermost_and_lists_sorted() {
        let mut env = Env::new();
        env.declare("b", Value::Int(2, super::super::value::Width::I32), span())
            .unwrap();
        env.declare("a", Value::str("hi"), span()).unwrap();
        env.push();
        env.declare("inner", Value::Bool(true), span()).unwrap();
        // All visible variables, inner scope included, name-sorted.
        assert_eq!(
            env.visible_snapshot(),
            vec![
                ("a".to_string(), "hi".to_string()),
                ("b".to_string(), "2".to_string()),
                ("inner".to_string(), "true".to_string()),
            ]
        );
        // Shadowing: the innermost `b` is the one a program would read.
        env.declare("b", Value::Int(9, super::super::value::Width::I32), span())
            .unwrap();
        assert_eq!(
            env.visible_snapshot(),
            vec![
                ("a".to_string(), "hi".to_string()),
                ("b".to_string(), "9".to_string()),
                ("inner".to_string(), "true".to_string()),
            ]
        );
        env.pop();
        assert_eq!(
            env.visible_snapshot(),
            vec![
                ("a".to_string(), "hi".to_string()),
                ("b".to_string(), "2".to_string())
            ]
        );
    }

    #[test]
    fn the_global_scope_never_pops() {
        let mut env = Env::new();
        env.pop();
        env.declare("g", Value::Unit, span()).unwrap(); // still usable
    }
}
