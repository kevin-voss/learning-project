//! The memory layer (plan §4.4, §6.4): arrays and pointers, the two
//! reference-shaped values of phase 5.
//!
//! * **Arrays are boxes of element *slots*** (`Rc<RefCell<Vec<Slot>>>`):
//!   the array itself is one shared box (assignment shares it — reference
//!   semantics, §2.1), and every element is its own slot, so `&arr[i]`
//!   can hand out a pointer that keeps watching that element. Bounds are
//!   checked on every access (§2.6 rule 2, T3007).
//! * **Pointers are slot `Rc`s**: `&x` clones the slot the variable lives
//!   in — the §4.4 pointer trick. Following `null` stops the program
//!   (§2.6 rule 3, T3008); a pointer to a function local stays valid
//!   after the return because the `Rc` keeps the slot alive (no
//!   dangling, ever).
//!
//! Every `RefCell` borrow — the array's cell vector *and* each slot —
//! goes through the friendly paths ([`read_slot`]/[`write_slot`] and the
//! `cells_ref`/`cells_mut` twins), so a double borrow can only ever be a
//! friendly T3006, never a Rust panic (§5.5).

use super::env::{read_slot, write_slot};
use super::eval::ops;
use super::value::{Slot, Value};
use super::Interp;
use crate::ast::{AssignOp, BinaryOp, Expr, UnaryOp};
use crate::checker::types::TicType;
use crate::diagnostics::TicError;
use crate::util::Span;
use std::cell::{Ref, RefCell, RefMut};
use std::rc::Rc;

/// One array's shared element slots.
pub(super) type Cells = Rc<RefCell<Vec<Slot>>>;

fn internal(span: Span, what: impl Into<String>) -> TicError {
    TicError::InternalError { span, what: what.into() }
}

// ---- the friendly borrow paths ------------------------------------------------

/// Borrow an array's element list for reading — the array-side twin of
/// [`read_slot`] (T3006 on a double borrow, never a panic).
pub(super) fn cells_ref(cells: &Cells, span: Span) -> Result<Ref<'_, Vec<Slot>>, TicError> {
    cells.try_borrow().map_err(|_| {
        internal(span, "an array was still borrowed when Tic tried to read it")
    })
}

/// The mutable twin (push/pop/insert/remove).
pub(super) fn cells_mut(cells: &Cells, span: Span) -> Result<RefMut<'_, Vec<Slot>>, TicError> {
    cells.try_borrow_mut().map_err(|_| {
        internal(span, "an array was still borrowed when Tic tried to change it")
    })
}

// ---- construction ------------------------------------------------------------

/// Box one value into a fresh element slot.
pub(super) fn slot_of(value: Value) -> Slot {
    Rc::new(RefCell::new(value))
}

/// A new array of `ty` (fixed or dynamic) holding `values`, each in its
/// own slot.
pub(super) fn new_array(values: Vec<Value>, ty: &TicType) -> Value {
    let cells: Vec<Slot> = values.into_iter().map(slot_of).collect();
    Value::Array(Rc::new(RefCell::new(cells)), ty.clone())
}

/// `copy(arr)` (§2.5): a *shallow* copy — a brand-new array of fresh
/// element slots holding the same values. Scalars copy by value;
/// reference values inside (pointers, and instances in phase 6) stay
/// shared, exactly as documented.
pub(super) fn copy_array(array: &Value, span: Span) -> Result<Value, TicError> {
    let (cells, ty) = as_array(array, span)?;
    let elements = cells_ref(&cells, span)?;
    let mut values = Vec::with_capacity(elements.len());
    for element in elements.iter() {
        values.push(read_slot(element, span)?);
    }
    Ok(new_array(values, &ty))
}

// ---- array value views ---------------------------------------------------------

/// The shared cells of an array value. Non-arrays reaching here is a Tic
/// bug (the checker guarantees indexable operands are arrays).
pub(super) fn as_array(value: &Value, span: Span) -> Result<(Cells, TicType), TicError> {
    match value {
        Value::Array(cells, ty) => Ok((Rc::clone(cells), ty.clone())),
        other => Err(internal(
            span,
            format!("indexing {} reached the interpreter (the checker guarantees arrays)", other.kind()),
        )),
    }
}

/// The same, for the growing builtins — a fixed array must never reach
/// them (the checker rejects it, T2003); if one does anyway, it stops
/// here cleanly instead of corrupting the size lock.
pub(super) fn as_dyn_array(
    value: &Value,
    builtin: &str,
    span: Span,
) -> Result<(Cells, TicType), TicError> {
    match as_array(value, span)? {
        pair @ (.., TicType::DynArray(_)) => Ok(pair),
        (_, TicType::FixedArray(_, n)) => Err(internal(
            span,
            format!(
                "`{builtin}` reached a fixed array of {n} elements — its size is locked; the checker should have stopped this"
            ),
        )),
        (_, other) => Err(internal(span, format!("`{builtin}` reached a non-array ({})", other.name()))),
    }
}

/// Bounds check (§2.6 rule 2): an int index into `len` elements. The
/// error names the index *and* the length (T3007).
pub(super) fn check_index(index: &Value, len: usize, span: Span) -> Result<usize, TicError> {
    let i = match index {
        Value::Int(i, _) => *i,
        other => return Err(internal(span, format!("{} used as an array index", other.kind()))),
    };
    if i < 0 || i as usize >= len {
        let detail = if len == 0 {
            format!("index {i} is out of bounds — the array is empty")
        } else {
            format!(
                "index {i} is out of bounds — the array has {len} element{s} (indexes 0..{last})",
                s = if len == 1 { "" } else { "s" },
                last = len - 1,
            )
        };
        return Err(TicError::OutOfBounds { span, detail });
    }
    Ok(i as usize)
}

impl Interp<'_, '_> {
    // ---- element read / write -------------------------------------------------

    /// `obj[index]` — bounds-checked read through the element's own slot.
    pub(super) fn eval_index_read(
        &mut self,
        obj: &Expr,
        index: &Expr,
        span: Span,
    ) -> Result<Value, TicError> {
        let array = self.eval_expr(obj)?;
        let (cells, _) = as_array(&array, span)?;
        let idx = self.eval_expr(index)?;
        let elements = cells_ref(&cells, span)?;
        let slot = {
            let i = check_index(&idx, elements.len(), span)?;
            Rc::clone(&elements[i])
        };
        drop(elements);
        read_slot(&slot, span)
    }

    /// `obj[index] = v` / `obj[index] op= v` — write *through* the element
    /// slot, so a pointer taken with `&arr[i]` sees the change.
    pub(super) fn eval_index_store(
        &mut self,
        obj: &Expr,
        index: &Expr,
        op: AssignOp,
        value: &Expr,
        span: Span,
    ) -> Result<(), TicError> {
        let array = self.eval_expr(obj)?;
        let (cells, _) = as_array(&array, span)?;
        let idx = self.eval_expr(index)?;
        let elements = cells_ref(&cells, span)?;
        let slot = {
            let i = check_index(&idx, elements.len(), span)?;
            Rc::clone(&elements[i])
        };
        drop(elements);
        self.assign_slot(&slot, op, value, span)
    }

    // ---- pointer read / write ---------------------------------------------------

    /// `*p` — read through the slot; `null` stops the program (T3008).
    pub(super) fn eval_deref_read(&mut self, operand: &Expr, span: Span) -> Result<Value, TicError> {
        match self.eval_expr(operand)? {
            Value::Pointer(slot) => read_slot(&slot, span),
            Value::Null => Err(TicError::NullDeref { span }),
            other => Err(internal(
                span,
                format!("`*` on {} reached the interpreter (the checker guarantees pointers)", other.kind()),
            )),
        }
    }

    /// `*p = v` / `*p op= v` — write through the slot (null → T3008).
    pub(super) fn eval_deref_store(
        &mut self,
        operand: &Expr,
        op: AssignOp,
        value: &Expr,
        span: Span,
    ) -> Result<(), TicError> {
        match self.eval_expr(operand)? {
            Value::Pointer(slot) => self.assign_slot(&slot, op, value, span),
            Value::Null => Err(TicError::NullDeref { span }),
            other => Err(internal(
                span,
                format!("`*` on {} reached the interpreter (the checker guarantees pointers)", other.kind()),
            )),
        }
    }

    /// `&place` (§4.4): clone the slot the place lives in. The checker
    /// only lets `&` onto places — a variable, an element, a field
    /// (phase 6) or `*p` — and exactly those shapes are handled here.
    pub(super) fn eval_addr_of(&mut self, place: &Expr, span: Span) -> Result<Value, TicError> {
        match place {
            // &x — the variable's own slot (a pointer to a function local
            // stays valid after the return: the Rc keeps it alive).
            Expr::Ident(name) => self
                .env
                .slot_of(&name.name)
                .map(|slot| Value::Pointer(slot))
                .ok_or_else(|| {
                    self.internal(name.span, format!("variable `{}` vanished between checking and running", name.name))
                }),
            // &arr[i] — the element's own slot (arrays are boxes of slots).
            Expr::Index { obj, index, .. } => {
                let array = self.eval_expr(obj)?;
                let (cells, _) = as_array(&array, span)?;
                let idx = self.eval_expr(index)?;
                let elements = cells_ref(&cells, span)?;
                let slot = {
                    let i = check_index(&idx, elements.len(), index.span())?;
                    Rc::clone(&elements[i])
                };
                Ok(Value::Pointer(slot))
            }
            // &*p — the pointer itself; a null one stops here (T3008),
            // exactly like reading `*p` would.
            Expr::Unary { op: UnaryOp::Deref, operand, .. } => {
                match self.eval_expr(operand)? {
                    Value::Pointer(slot) => Ok(Value::Pointer(slot)),
                    Value::Null => Err(TicError::NullDeref { span }),
                    other => Err(internal(span, format!("`&*` on {} reached the interpreter", other.kind()))),
                }
            }
            // &box.field — the field's own slot (instances and objs are
            // boxes of field slots, objects.rs). A pointer taken here
            // watches exactly that field, like `&arr[i]` watches one
            // element — including through `this.field` inside a method.
            Expr::Field { obj, name, .. } => {
                let container = self.eval_expr(obj)?;
                let slot = self.field_slot(&container, &name.name, name.span)?;
                Ok(Value::Pointer(slot))
            }
            other => Err(self.internal(
                other.span(),
                "`&` on something the checker does not call a place reached the interpreter",
            )),
        }
    }

    // ---- the shared store -------------------------------------------------------

    /// Write `value` through one slot, plain or compound — the single
    /// store path for `x = …`, `arr[i] = …` and `*p = …` alike
    /// (`x += 1` is `x = x + 1` at the slot's own width).
    pub(super) fn assign_slot(
        &mut self,
        slot: &Slot,
        op: AssignOp,
        value: &Expr,
        span: Span,
    ) -> Result<(), TicError> {
        let new_value = if op == AssignOp::Set {
            self.eval_expr(value)?
        } else {
            let current = read_slot(slot, span)?;
            let rhs = self.eval_expr(value)?;
            let binop = match op {
                AssignOp::Add => BinaryOp::Add,
                AssignOp::Sub => BinaryOp::Sub,
                AssignOp::Mul => BinaryOp::Mul,
                AssignOp::Div => BinaryOp::Div,
                AssignOp::Set => unreachable!("handled above"),
            };
            ops::compound(current, binop, rhs, span)?
        };
        write_slot(slot, new_value, span)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn s() -> Span {
        Span::point(0)
    }

    #[test]
    fn bounds_errors_name_the_index_and_the_length() {
        let idx = Value::Int(3, crate::interp::Width::I32);
        let err = check_index(&idx, 3, s()).unwrap_err();
        assert_eq!(err.error_code(), "T3007");
        assert_eq!(
            err.message(),
            "index 3 is out of bounds — the array has 3 elements (indexes 0..2)"
        );
        let err = check_index(&Value::Int(-1, crate::interp::Width::I32), 3, s()).unwrap_err();
        assert!(err.message().contains("index -1"), "{}", err.message());
        let err = check_index(&Value::Int(0, crate::interp::Width::I32), 0, s()).unwrap_err();
        assert!(err.message().contains("the array is empty"), "{}", err.message());
        assert!(check_index(&Value::Int(2, crate::interp::Width::I32), 3, s()).is_ok());
    }

    #[test]
    fn fixed_arrays_refuse_the_growing_builtins_cleanly() {
        let fixed = Value::Array(
            Rc::new(RefCell::new(vec![slot_of(Value::Int(1, crate::interp::Width::I32))])),
            TicType::FixedArray(Box::new(TicType::I32), 1),
        );
        let err = as_dyn_array(&fixed, "push", s()).unwrap_err();
        assert_eq!(err.error_code(), "T3006");
        assert!(err.message().contains("size is locked"), "{}", err.message());
    }

    #[test]
    fn copy_builds_fresh_slots_with_the_same_values() {
        let arr = new_array(
            vec![Value::Int(1, crate::interp::Width::I32), Value::Int(2, crate::interp::Width::I32)],
            &TicType::DynArray(Box::new(TicType::I32)),
        );
        let copied = copy_array(&arr, s()).unwrap();
        let (a, b) = match (&arr, &copied) {
            (Value::Array(a, _), Value::Array(b, _)) => (a, b),
            _ => panic!("both must be arrays"),
        };
        assert!(!Rc::ptr_eq(a, b), "copy must not alias the original");
        assert!(!Rc::ptr_eq(&a.borrow()[0], &b.borrow()[0]), "elements are fresh slots");
        assert_eq!(arr.to_string(), copied.to_string());
        // writes through one never reach the other
        if let Value::Array(cells, _) = &copied {
            cells.borrow_mut()[0].replace(Value::Int(9, crate::interp::Width::I32));
        }
        assert_eq!(arr.to_string(), "[1, 2]");
        assert_eq!(copied.to_string(), "[9, 2]");
    }
}
