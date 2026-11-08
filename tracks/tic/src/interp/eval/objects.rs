//! Phase 6 evaluation (plan §2.1 `ClassName` / `EnumName` / `obj` rows,
//! §5.4, §6.4): classes (`new`, `init`, `this`, methods), enum variant
//! values, and obj literals.
//!
//! The one structural idea, shared with phase 5's arrays: **fields are
//! slots**. A class instance is one shared `Rc<RefCell<ClassInstance>>`
//! box holding each field's own slot; every field read, write and
//! `&box.field` goes through [`Interp::field_slot`], the single lookup —
//! so assignment and argument passing share the *box* (reference
//! semantics, §2.1), `==` is identity, and a pointer to a field watches
//! exactly that field, like `&arr[i]` watches one element.
//!
//! `this` is an ordinary slot in the method's frame holding the instance
//! value — `this.count = 1` is a plain field write through the shared
//! box, and the depth cap covers methods like any other call.

use super::super::env::read_slot;
use super::super::value::{ClassInstance, ObjData, Slot, Value};
use super::super::Interp;
use crate::ast::{AssignOp, Expr, Ident};
use crate::checker::types::{ShapeId, TicType};
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::util::Span;
use std::cell::RefCell;
use std::rc::Rc;

impl Interp<'_, '_> {
    // ---- the one field lookup ---------------------------------------------------

    /// The slot one field lives in — the lookup every field read, field
    /// write and `&box.field` goes through (memory.rs's pointer arm
    /// included, hence `pub(crate)`). Instances find their layout by name
    /// (the box carries it); objs carry their fields directly. A missing
    /// field on an obj is the §5.4 runtime check: T3009.
    pub(crate) fn field_slot(
        &self,
        container: &Value,
        field: &str,
        span: Span,
    ) -> Result<Slot, TicError> {
        match container {
            Value::Instance(instance) => {
                let inst = instance.try_borrow().map_err(|_| {
                    TicError::InternalError {
                        span,
                        what: "an instance was still borrowed when Tic tried to read a field".into(),
                    }
                })?;
                // The checker proved the class has this field; a miss is
                // a Tic bug (the layout and the box were built together).
                inst.fields
                    .iter()
                    .find(|(name, _)| name == field)
                    .map(|(_, slot)| Rc::clone(slot))
                    .ok_or_else(|| {
                        TicError::InternalError {
                            span,
                            what: format!(
                                "instance of {} lost its `{field}` field between checking and running",
                                inst.class
                            ),
                        }
                    })
            }
            Value::Object(data, _) => {
                let obj = data.try_borrow().map_err(|_| {
                    TicError::InternalError {
                        span,
                        what: "an obj was still borrowed when Tic tried to read a field".into(),
                    }
                })?;
                obj.fields
                    .iter()
                    .find(|(name, _)| name == field)
                    .map(|(_, slot)| Rc::clone(slot))
                    .ok_or_else(|| missing_field(span, "field", field, &obj.fields))
            }
            other => Err(TicError::InternalError {
                span,
                what: format!(
                    "a field read on {} reached the interpreter (the checker guarantees instances and objs)",
                    other.kind()
                ),
            }),
        }
    }

    // ---- field read / write -------------------------------------------------------

    /// `box.field` — through the field's own slot. `State.Idle` (the head
    /// names an enum, not a variable) resolves to the variant value here
    /// too: the same disambiguation the checker performs.
    pub(super) fn eval_field_read(
        &mut self,
        obj: &Expr,
        name: &Ident,
        span: Span,
    ) -> Result<Value, TicError> {
        if let Some(value) = self.enum_variant_value(obj, name) {
            return value;
        }
        let container = self.eval_expr(obj)?;
        let slot = self.field_slot(&container, &name.name, name.span)?;
        read_slot(&slot, span)
    }

    /// `box.field = v` / `box.field op= v` — one store path through the
    /// field's slot (a pointer taken with `&box.field` sees the change).
    pub(super) fn eval_field_store(
        &mut self,
        obj: &Expr,
        name: &Ident,
        op: AssignOp,
        value: &Expr,
        span: Span,
    ) -> Result<(), TicError> {
        let container = self.eval_expr(obj)?;
        let slot = self.field_slot(&container, &name.name, name.span)?;
        self.assign_slot(&slot, op, value, span)
    }

    /// `State.Idle` — `Some(Some(value))` when the head names an enum (a
    /// variable would shadow it, per the scope rules), `Some(Err(..))` on
    /// the impossible missing variant, `None` when this is a real field
    /// access (the common case).
    fn enum_variant_value(
        &mut self,
        obj: &Expr,
        name: &Ident,
    ) -> Option<Result<Value, TicError>> {
        let Expr::Ident(head) = obj else { return None };
        if self.env.slot_of(&head.name).is_some() {
            return None; // a variable shadows the enum name
        }
        let enum_ = self.program.enums.iter().find(|e| e.name == head.name)?;
        if enum_.variants.iter().any(|v| v == &name.name) {
            Some(Ok(Value::EnumValue {
                enum_name: enum_.name.clone(),
                variant: name.name.clone(),
            }))
        } else {
            // The checker verified the variant (T2010); landing here is a
            // Tic bug, kept friendly anyway.
            Some(Err(self.internal(
                name.span,
                format!("enum `{}` lost its variant `{}` between checking and running", head.name, name.name),
            )))
        }
    }

    // ---- objs (§5.4) ---------------------------------------------------------------

    /// `{ retries: 3, enabled: true }` — evaluate the field expressions,
    /// box each into its own slot, store sorted by field name (the
    /// shape's own order — the one order that never lies, and two
    /// literals with the same fields print identically whatever order
    /// they were written in).
    pub(super) fn eval_obj_lit(&mut self, expr: &Expr, span: Span) -> Result<Value, TicError> {
        let Expr::ObjLit { fields, .. } = expr else {
            return Err(self.internal(span, "a non-literal reached eval_obj_lit"));
        };
        let shape = match self.ty_of(expr) {
            TicType::Obj(id) => *id,
            other => {
                return Err(self.internal(
                    span,
                    format!("an obj literal recorded as {} reached the interpreter", other.name()),
                ))
            }
        };
        let mut values: Vec<(String, Value)> = Vec::with_capacity(fields.len());
        for (name, value) in fields {
            values.push((name.name.clone(), self.eval_expr(value)?));
        }
        values.sort_by(|a, b| a.0.cmp(&b.0));
        let slots = values
            .into_iter()
            .map(|(name, value)| (name, Rc::new(RefCell::new(value))))
            .collect();
        Ok(Value::Object(Rc::new(RefCell::new(ObjData { fields: slots })), shape))
    }

    // ---- classes --------------------------------------------------------------------

    /// `new Counter(args)` (§2.6 rule 4): allocate the box, zero-init
    /// every field (§2.1's zero column), then run `init` with the args —
    /// `this` bound to the fresh instance. The box is reference-counted
    /// and never freed by hand; sharing it is sharing the instance.
    pub(super) fn eval_new(
        &mut self,
        class: &Ident,
        args: &[Expr],
        span: Span,
    ) -> Result<Value, TicError> {
        let Some(index) = self.program.classes.iter().position(|c| c.name == class.name) else {
            return Err(self.internal(
                span,
                format!("class `{}` vanished between checking and running", class.name),
            ));
        };
        // Zero-init first (clone the layout out: `zero_of` needs `&self`,
        // not a borrow of the program through `self`).
        let layout: Vec<(String, TicType)> = self.program.classes[index]
            .fields
            .iter()
            .map(|(name, ty)| (name.clone(), ty.clone()))
            .collect();
        let mut fields = Vec::with_capacity(layout.len());
        for (name, ty) in &layout {
            let zero = self.zero_of(ty, span)?;
            fields.push((name.clone(), Rc::new(RefCell::new(zero))));
        }
        let instance = Rc::new(RefCell::new(ClassInstance {
            class: class.name.clone(),
            fields,
        }));
        let value = Value::Instance(Rc::clone(&instance));
        // `new` forwards its arguments to `init` (absent: fields keep
        // their zero values and the args list must be empty — checked).
        if let Some(init) = self.program.classes[index].init {
            let mut values = Vec::with_capacity(args.len());
            for arg in args {
                values.push(self.eval_expr(arg)?);
            }
            self.call_checked(
                &self.program.classes[index].methods[init],
                values,
                Some(value.clone()),
                span,
            )?;
        }
        Ok(value)
    }

    /// `box.method(args)`. The receiver is evaluated once; a bare-obj
    /// receiver is the §5.4 runtime case (objs have fields only, so any
    /// method call on one is T3009 — the error names what it does have).
    pub(super) fn eval_method_call(
        &mut self,
        obj: &Expr,
        name: &Ident,
        args: &[Expr],
        span: Span,
    ) -> Result<Value, TicError> {
        let receiver = self.eval_expr(obj)?;
        let Value::Instance(instance) = &receiver else {
            if let Value::Object(data, _) = &receiver {
                let fields = data.try_borrow().map_err(|_| {
                    self.internal(span, "an obj was still borrowed when Tic tried to call a method on it")
                })?;
                let names: Vec<String> =
                    fields.fields.iter().map(|(n, _)| n.clone()).collect();
                return Err(TicError::MissingField {
                    span: name.span,
                    kind: "method",
                    name: name.name.clone(),
                    suggestion: did_you_mean(&name.name, &names.iter().map(String::as_str).collect::<Vec<_>>()),
                    fields: names,
                });
            }
            return Err(self.internal(
                name.span,
                format!(
                    "a method call on {} reached the interpreter (the checker guarantees instances)",
                    receiver.kind()
                ),
            ));
        };
        let class_name = instance
            .try_borrow()
            .map(|inst| inst.class.clone())
            .map_err(|_| {
                self.internal(span, "an instance was still borrowed when Tic tried to call a method on it")
            })?;
        let Some(class) = self.program.classes.iter().position(|c| c.name == class_name) else {
            return Err(self.internal(
                span,
                format!("class `{class_name}` vanished between checking and running"),
            ));
        };
        let Some(&method) = self.program.classes[class].method_index.get(&name.name) else {
            // The checker verified the method on Class-typed receivers
            // (T2009); a Dynamic receiver holding an instance without it
            // lands here — kept friendly, with the class's real method
            // list so the error can teach.
            let methods: Vec<String> = self.program.classes[class]
                .methods
                .iter()
                .map(|m| m.name.clone())
                .collect();
            return Err(TicError::MissingField {
                span: name.span,
                kind: "method",
                name: name.name.clone(),
                suggestion: did_you_mean(&name.name, &methods.iter().map(String::as_str).collect::<Vec<_>>()),
                fields: methods,
            });
        };
        let mut values = Vec::with_capacity(args.len());
        for arg in args {
            values.push(self.eval_expr(arg)?);
        }
        self.call_checked(
            &self.program.classes[class].methods[method],
            values,
            Some(receiver),
            span,
        )
    }

    // ---- the program-aware zero ---------------------------------------------------

    /// §2.1's zero column with the program's tables in hand: an enum's
    /// zero is its **first** variant (only the declaration knows it), and
    /// a *known* obj shape's zero is its fields zero-filled (a bare obj
    /// has no shape to build — the checker rejects `obj x;`). Everything
    /// else delegates to [`Value::zero`].
    pub(super) fn zero_of(&self, ty: &TicType, span: Span) -> Result<Value, TicError> {
        match ty {
            TicType::Enum(name) => self
                .program
                .enums
                .iter()
                .find(|e| e.name == *name)
                .and_then(|e| e.variants.first())
                .map(|variant| Value::EnumValue {
                    enum_name: name.clone(),
                    variant: variant.clone(),
                })
                .ok_or_else(|| {
                    self.internal(
                        span,
                        format!("enum `{name}` vanished between checking and running"),
                    )
                }),
            // A known shape's zero: every field at its own zero, stored in
            // the shape's `BTreeMap` order — the same name-sorted order
            // obj literals store — so a fallen-off `-> obj` function
            // yields the shape's zero-filled obj, not an error.
            TicType::Obj(id) if *id != ShapeId::BARE => {
                let shape = self.program.shapes.get(*id).ok_or_else(|| {
                    self.internal(span, format!("shape {id:?} vanished between checking and running"))
                })?;
                let mut fields = Vec::with_capacity(shape.fields.len());
                for (name, field_ty) in &shape.fields {
                    let zero = self.zero_of(field_ty, span)?;
                    fields.push((name.clone(), Rc::new(RefCell::new(zero))));
                }
                Ok(Value::Object(Rc::new(RefCell::new(ObjData { fields })), *id))
            }
            _ => Value::zero(ty, span),
        }
    }

    // The shared method-call seam lives in `calls.rs` (`call_checked`):
    // frames, the depth cap and `this` binding are the same machinery
    // as a plain function call, so there is one skeleton for both.
}

/// The §5.4 runtime check: a `.name` lookup the static pass could not
/// perform (the obj arrived through a bare `obj`), on an obj that does
/// not have it. The error names the field *and* the fields that exist,
/// with a did-you-mean when one is close (T3009).
fn missing_field(
    span: Span,
    kind: &'static str,
    field: &str,
    fields: &[(String, Slot)],
) -> TicError {
    let names: Vec<&str> = fields.iter().map(|(n, _)| n.as_str()).collect();
    TicError::MissingField {
        span,
        kind,
        name: field.to_string(),
        // stable order: the obj's stored (name-sorted) fields
        fields: names.iter().map(|s| s.to_string()).collect(),
        suggestion: did_you_mean(field, &names),
    }
}
