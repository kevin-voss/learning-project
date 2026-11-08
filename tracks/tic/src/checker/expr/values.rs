//! Value-level inference (plan §5.3): indexing, field/method access on
//! classes, enums and obj shapes (§5.4), and the array/obj literals —
//! including the obj-shape interning that makes field order not matter.

use super::ops::is_num_lit;
use crate::ast::{Expr, Ident};
use crate::checker::types::TicType;
use crate::checker::Checker;
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::util::Span;
use std::collections::BTreeMap;
use std::collections::HashMap;

impl Checker {
    // ---- indexing, fields -------------------------------------------------------

    pub(super) fn infer_index(&mut self, obj: &Expr, index: &Expr) -> TicType {
        let obj_ty = self.infer(obj, None);
        let idx_ty = self.infer(index, None);
        if !idx_ty.is_int() && idx_ty != TicType::Dynamic {
            self.error(TicError::IndexNotInt { span: index.span(), found: idx_ty.name() });
        }
        match obj_ty {
            TicType::FixedArray(elem, _) | TicType::DynArray(elem) => *elem,
            TicType::Dynamic => TicType::Dynamic,
            ref other => {
                self.error(TicError::IndexNonArray { span: obj.span(), found: other.name() });
                TicType::Dynamic
            }
        }
    }

    /// `obj.name`: a class field, an enum variant (`State.Idle` — the
    /// name of an enum, not a variable), or an obj-shape field.
    pub(super) fn infer_field(&mut self, obj: &Expr, name: &Ident) -> crate::checker::types::TicType {
        use crate::checker::types::{ShapeId, TicType};
        // Enum variant: `State.Idle` — the head is an enum *name* (a local
        // variable shadows it, per the scope rules).
        if let Expr::Ident(head) = obj {
            if self.scopes.lookup(&head.name).is_none() {
                if let Some(enum_) = self.enums.iter().find(|e| e.name == head.name) {
                    let (enum_name, variants) = (enum_.name.clone(), enum_.variants.clone());
                    return if variants.iter().any(|v| v == &name.name) {
                        TicType::Enum(enum_name)
                    } else {
                        let suggestion = did_you_mean(
                            &name.name,
                            &variants.iter().map(String::as_str).collect::<Vec<_>>(),
                        );
                        self.error(TicError::UnknownEnumVariant {
                            span: name.span,
                            enum_name: enum_name.clone(),
                            variant: name.name.clone(),
                            suggestion,
                        });
                        TicType::Enum(enum_name)
                    };
                }
                if self.classes.iter().any(|c| c.name == head.name) {
                    self.error(TicError::UnknownField {
                        span: name.span,
                        owner: format!("class {}", head.name),
                        field: name.name.clone(),
                        suggestion: None,
                        note: Some(format!(
                            "`{c}` is the class itself — use an instance: `instance.{f}`",
                            c = head.name,
                            f = name.name
                        )),
                    });
                    return TicType::Dynamic;
                }
                return self.infer_ident(head); // reports the unknown name
            }
        }
        let owner = self.infer(obj, None);
        match owner {
            TicType::Class(ref class) => self.class_field_type(class, name),
            TicType::Obj(id) if id != ShapeId::BARE => {
                let shape = self.shapes.get(id).cloned();
                match shape.and_then(|s| s.fields.get(&name.name).cloned()) {
                    Some(t) => t,
                    None => {
                        let fields: Vec<String> = self
                            .shapes
                            .get(id)
                            .map(|s| s.fields.keys().cloned().collect())
                            .unwrap_or_default();
                        let suggestion = did_you_mean(
                            &name.name,
                            &fields.iter().map(String::as_str).collect::<Vec<_>>(),
                        );
                        self.error(TicError::UnknownField {
                            span: name.span,
                            owner: "this obj".into(),
                            field: name.name.clone(),
                            suggestion,
                            note: None,
                        });
                        TicType::Dynamic
                    }
                }
            }
            // A bare `obj` (§5.4) or a bare-obj field: runtime check.
            TicType::Obj(ShapeId::BARE) | TicType::Dynamic => TicType::Dynamic,
            ref other => {
                self.unknown_field(other, name);
                TicType::Dynamic
            }
        }
    }

    /// Field read on a class instance; a method name gets a "call it" note.
    fn class_field_type(&mut self, class: &str, name: &Ident) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        let Some(index) = self.classes.iter().position(|c| c.name == class) else {
            return TicType::Dynamic;
        };
        if let Some(ty) = self.classes[index].field(&name.name).cloned() {
            return ty;
        }
        let is_method = self.classes[index].method(&name.name).is_some();
        let fields: Vec<String> =
            self.classes[index].fields.iter().map(|(n, _)| n.clone()).collect();
        let suggestion =
            did_you_mean(&name.name, &fields.iter().map(String::as_str).collect::<Vec<_>>());
        self.error(TicError::UnknownField {
            span: name.span,
            owner: format!("class {class}"),
            field: name.name.clone(),
            suggestion,
            note: is_method.then(|| {
                format!("`.{m}` is a method — call it: `.{m}(…)`", m = name.name)
            }),
        });
        TicType::Dynamic
    }

    /// `x.field` where `x` is not a class or obj — the shared "nothing
    /// has that field" error (used by reads and writes alike).
    pub(crate) fn unknown_field(&mut self, owner: &crate::checker::types::TicType, name: &Ident) {
        use crate::checker::types::TicType;
        let note = if matches!(owner, TicType::Pointer(_)) {
            Some("follow the pointer first: `(*p).field`".into())
        } else if matches!(owner, TicType::Enum(_)) {
            Some("variants live on the enum's name (`State.Idle`), not on a value".into())
        } else {
            None
        };
        self.error(TicError::UnknownField {
            span: name.span,
            owner: owner.name(),
            field: name.name.clone(),
            suggestion: None,
            note,
        });
    }

    // ---- calls -----------------------------------------------------------------

    pub(super) fn infer_array_lit(
        &mut self,
        elems: &[Expr],
        expected: Option<&crate::checker::types::TicType>,
        span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::TicType;
        // With an array expectation the elements check against it —
        // literals adapt (`i32[5] a = [80, 90, …]`), and a fixed size
        // must be met exactly.
        match expected {
            Some(t @ TicType::FixedArray(elem, n)) => {
                for e in elems {
                    self.check_against(e, elem, "an element of the array literal", e.span());
                }
                if elems.len() != *n {
                    self.error(TicError::TypeMismatch {
                        span,
                        context: "the array literal".into(),
                        expected: format!("{} elements ({t})", n),
                        found: format!("{} element(s)", elems.len()),
                        hint: Some(
                            "count the elements — a fixed array's size is locked at the declaration"
                                .into(),
                        ),
                    });
                }
                return t.clone();
            }
            Some(t @ TicType::DynArray(elem)) => {
                for e in elems {
                    self.check_against(e, elem, "an element of the array literal", e.span());
                }
                return t.clone();
            }
            _ => {}
        }
        // No expectation: anchor on the first non-literal element (so
        // `[big, 1]` anchors on `big`'s type), check the rest against it.
        let anchor = elems.iter().enumerate().find(|(_, e)| !is_num_lit(e));
        let elem_ty = match anchor {
            Some((i, _)) => {
                let t = self.infer(&elems[i], None);
                for (j, e) in elems.iter().enumerate() {
                    if j != i {
                        self.check_against(e, &t, "an element of the array literal", e.span());
                    }
                }
                t
            }
            None => match elems.first() {
                Some(first) => {
                    let t = self.infer(first, None);
                    for e in &elems[1..] {
                        self.check_against(e, &t, "an element of the array literal", e.span());
                    }
                    t
                }
                None => {
                    self.error(TicError::TypeMismatch {
                        span,
                        context: "the array literal".into(),
                        expected: "a declared array type".into(),
                        found: "an empty list".into(),
                        hint: Some("write the type on the left — `i32[] a = [];`".into()),
                    });
                    return TicType::Dynamic;
                }
            },
        };
        TicType::DynArray(Box::new(elem_ty))
    }

    /// §5.4: an obj literal's shape is its field names + field types,
    /// interned order-free.
    pub(super) fn infer_obj_lit(
        &mut self,
        fields: &[(Ident, Expr)],
        _span: Span,
    ) -> crate::checker::types::TicType {
        use crate::checker::types::{Shape, TicType};
        let mut shape = BTreeMap::new();
        let mut seen: HashMap<String, Span> = HashMap::new();
        for (name, value) in fields {
            let ty = self.infer(value, None);
            if let Some(first) = seen.insert(name.name.clone(), name.span) {
                self.error(TicError::DuplicateDecl {
                    span: name.span,
                    name: name.name.clone(),
                    first,
                    what: "a field of this obj".into(),
                });
            } else {
                shape.insert(name.name.clone(), ty);
            }
        }
        let id = self.shapes.intern(Shape { fields: shape });
        TicType::Obj(id)
    }
}

