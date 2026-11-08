//! Stage 1 of the checker (plan §5.3): collecting every declaration's
//! *signature* before any body is walked — the static half of Tic's
//! two-pass design. Split out of `mod.rs` in phase 7 (the file had
//! outgrown the ~400-line soft cap; this was checker/'s free slot).
//!
//! Two sweeps, mirroring the parser's hoist: **every name is reserved
//! first** (so a function may take a `Counter` parameter declared later
//! in the file), then signatures and class layouts are resolved with all
//! names in hand.

use super::scope::DeclKind;
use super::types::{self, TicType};
use super::Checker;
use crate::ast::Decl;
use crate::diagnostics::TicError;
use crate::util::Span;
use std::collections::HashMap;

impl Checker {
    /// Collect every declaration in two sweeps, mirroring the parser's
    /// two-pass design: **every name is reserved first** (so a function
    /// may take a `Counter` parameter declared later in the file), then
    /// signatures and class layouts are resolved with all names in hand.
    pub(crate) fn collect_decls(&mut self, decls: &[Decl]) {
        for decl in decls {
            match decl {
                Decl::Enum(e) => {
                    if self.reserve_name(&e.name.name, DeclKind::Enum, e.name.span) {
                        let mut variants = Vec::new();
                        let mut seen: HashMap<String, Span> = HashMap::new();
                        for v in &e.variants {
                            if let Some(first) = seen.insert(v.name.clone(), v.span) {
                                self.duplicate(v.span, &v.name, DeclKind::Variant, first);
                            } else {
                                variants.push(v.name.clone());
                            }
                        }
                        self.enums.push(types::CheckedEnum {
                            name: e.name.name.clone(),
                            variants,
                            span: e.span,
                        });
                    }
                }
                Decl::Class(c) => {
                    if self.reserve_name(&c.name.name, DeclKind::Class, c.name.span) {
                        self.classes.push(types::CheckedClass {
                            name: c.name.name.clone(),
                            fields: Vec::new(),
                            field_index: HashMap::new(),
                            methods: Vec::new(),
                            method_index: HashMap::new(),
                            init: None,
                            span: c.span,
                        });
                    }
                }
                Decl::Function(f) => {
                    if self.reserve_name(&f.name.name, DeclKind::Function, f.name.span) {
                        self.functions.push(types::CheckedFunction {
                            name: f.name.name.clone(),
                            params: Vec::new(), // resolved in the second sweep
                            return_ty: TicType::Unit,
                            body: f.body.clone(),
                            span: f.span,
                        });
                    }
                }
            }
        }
        // Second sweep, now that every class/enum name exists.
        for decl in decls {
            match decl {
                Decl::Function(f) => {
                    let resolved = self.bare_function(f);
                    if let Some(index) =
                        self.functions.iter().position(|g| g.name == f.name.name)
                    {
                        self.functions[index].params = resolved.params;
                        self.functions[index].return_ty = resolved.return_ty;
                    }
                }
                Decl::Class(c) => self.fill_class(c),
                Decl::Enum(_) => {}
            }
        }
    }

    /// A signature-only `CheckedFunction` (body cloned for later walks).
    pub(super) fn bare_function(&mut self, f: &crate::ast::FunctionDecl) -> types::CheckedFunction {
        let params = f
            .params
            .iter()
            .map(|p| types::CheckedParam {
                name: p.name.name.clone(),
                ty: self.resolve_type(&p.ty),
                span: p.name.span,
            })
            .collect();
        types::CheckedFunction {
            name: f.name.name.clone(),
            params,
            return_ty: match &f.return_ty {
                Some(ty) => self.resolve_type(ty),
                None => TicType::Unit, // no `-> type` means unit
            },
            body: f.body.clone(),
            span: f.span,
        }
    }

    /// Resolve one class: field layout, method signatures, `init`.
    fn fill_class(&mut self, decl: &crate::ast::ClassDecl) {
        let Some(index) = self.classes.iter().position(|c| c.name == decl.name.name) else {
            return; // duplicate class name — the first one wins
        };
        let mut fields: Vec<(String, TicType, Span)> = Vec::new();
        let mut field_index: HashMap<String, usize> = HashMap::new();
        for field in &decl.fields {
            let ty = self.resolve_type(&field.ty);
            if field_index.contains_key(&field.name.name) {
                let first = field_index[&field.name.name];
                self.duplicate(field.name.span, &field.name.name, DeclKind::Field, fields[first].2);
                continue;
            }
            field_index.insert(field.name.name.clone(), fields.len());
            fields.push((field.name.name.clone(), ty, field.name.span));
        }
        let mut methods: Vec<types::CheckedFunction> = Vec::new();
        let mut method_index: HashMap<String, usize> = HashMap::new();
        let mut init = None;
        for method in &decl.methods {
            let checked = self.bare_function(method);
            if let Some(first) = field_index.get(&checked.name) {
                self.duplicate(
                    checked.span,
                    &checked.name,
                    DeclKind::Method,
                    fields[*first].2,
                );
                continue;
            }
            if let Some(first) = method_index.get(&checked.name) {
                let first_span = methods[*first].span;
                self.duplicate(checked.span, &checked.name, DeclKind::Method, first_span);
                continue;
            }
            if checked.name == "init" {
                if checked.return_ty != TicType::Unit {
                    self.error(TicError::TypeMismatch {
                        span: checked.span,
                        context: "`init` runs on `new` and returns nothing".into(),
                        expected: "no `-> type` (unit)".into(),
                        found: checked.return_ty.name(),
                        hint: Some("drop the return type — `function init(…) { … }`".into()),
                    });
                }
                init = Some(methods.len());
            }
            method_index.insert(checked.name.clone(), methods.len());
            methods.push(checked);
        }
        let fields = fields.into_iter().map(|(name, ty, _)| (name, ty)).collect();
        let class = &mut self.classes[index];
        class.fields = fields;
        class.field_index = field_index;
        class.methods = methods;
        class.method_index = method_index;
        class.init = init;
    }
}
