//! Statement checking (plan §5.3): declarations (no duplicates, `final`
//! keeps its value, initializers match), assignments (only lvalues, only
//! matching types, `+=` and friends follow the binary-op rules),
//! conditions must be bool, and `return` must match the signature —
//! plus `AstType` → `TicType` resolution.

use super::scope::DeclKind;
use super::types::{ShapeId, TicType};
use super::Checker;
use crate::ast::{self, AstType, AssignOp, BaseTy, BinaryOp, Expr, Stmt, TypeSuffix};
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::util::Span;

impl Checker {
    /// Check a list of statements in the current scope.
    pub(crate) fn check_stmts(&mut self, stmts: &[Stmt]) {
        for stmt in stmts {
            self.check_stmt(stmt);
        }
    }

    /// Check a block: a fresh scope for its statements.
    pub(crate) fn check_block(&mut self, block: &ast::Block) {
        self.scopes.push();
        self.check_stmts(&block.stmts);
        self.scopes.pop();
    }

    pub(crate) fn check_stmt(&mut self, stmt: &Stmt) {
        match stmt {
            Stmt::VarDecl { ty, name, init, is_final, span } => {
                self.check_var_decl(ty, name, init, *is_final, *span);
            }
            Stmt::Assign { target, op, value, .. } => {
                self.check_assign(target, *op, value);
            }
            Stmt::If { cond, then_branch, else_branch, .. } => {
                self.check_condition(cond, "an `if` condition");
                self.check_block(then_branch);
                if let Some(else_stmt) = else_branch {
                    self.check_stmt(else_stmt); // nested `if` or block
                }
            }
            Stmt::While { cond, body, .. } => {
                self.check_condition(cond, "a `while` condition");
                self.check_block(body);
            }
            Stmt::For { init, cond, update, body, .. } => {
                self.scopes.push(); // the loop variable lives here
                if let Some(init) = init {
                    self.check_stmt(init);
                }
                if let Some(cond) = cond {
                    self.check_condition(cond, "a `for` condition");
                }
                if let Some(update) = update {
                    self.check_stmt(update);
                }
                self.check_block(body);
                self.scopes.pop();
            }
            Stmt::Return { value, span } => {
                self.check_return(value.as_ref(), *span);
            }
            Stmt::Block(block) => self.check_block(block),
            Stmt::ExprStmt { expr, .. } => {
                self.infer(expr, None); // any type; used for its effect
            }
        }
    }

    // ---- declarations ------------------------------------------------------

    /// Resolve a written type. Unknown names get a T1-style "unknown
    /// type" error (the parser usually catches these first; parameter
    /// and field positions are the gap) and poison to `Dynamic`.
    pub(crate) fn resolve_type(&mut self, ty: &AstType) -> TicType {
        let base = match &ty.base {
            BaseTy::I8 => TicType::I8,
            BaseTy::I16 => TicType::I16,
            BaseTy::I32 => TicType::I32,
            BaseTy::I64 => TicType::I64,
            BaseTy::U8 => TicType::U8,
            BaseTy::U16 => TicType::U16,
            BaseTy::U32 => TicType::U32,
            BaseTy::U64 => TicType::U64,
            BaseTy::F32 => TicType::F32,
            BaseTy::F64 => TicType::F64,
            BaseTy::Bool => TicType::Bool,
            BaseTy::Char => TicType::Char,
            BaseTy::Str => TicType::Str,
            BaseTy::Obj => TicType::Obj(ShapeId::BARE),
            BaseTy::Named(name) => {
                if self.classes.iter().any(|c| &c.name == name) {
                    TicType::Class(name.clone())
                } else if self.enums.iter().any(|e| &e.name == name) {
                    TicType::Enum(name.clone())
                } else {
                    let suggestion = did_you_mean(
                        name,
                        &super::type_name_candidates(self)
                            .iter()
                            .map(String::as_str)
                            .collect::<Vec<_>>(),
                    );
                    self.error(TicError::UnknownType {
                        span: ty.span,
                        name: name.clone(),
                        suggestion,
                    });
                    TicType::Dynamic
                }
            }
        };
        match ty.suffix {
            TypeSuffix::None => base,
            TypeSuffix::DynArray => TicType::DynArray(Box::new(base)),
            TypeSuffix::FixedArray(n) => TicType::FixedArray(Box::new(base), n),
            TypeSuffix::Pointer => TicType::Pointer(Box::new(base)),
        }
    }

    fn check_var_decl(
        &mut self,
        ty: &AstType,
        name: &ast::Ident,
        init: &Option<Expr>,
        is_final: bool,
        span: Span,
    ) {
        let declared = self.resolve_type(ty);
        if is_final && init.is_none() {
            self.error(TicError::FinalNeedsInit { span, name: name.name.clone() });
        }
        // §2.1's zero column: `obj` and class types have NO zero value —
        // they must be created (`obj x = { … }`, `C c = new C()`). An
        // enum's zero is its first variant, so `Light l;` stays legal.
        // (`final` decls already got their own error above.)
        if !is_final && init.is_none() {
            match &declared {
                TicType::Obj(id) if *id == ShapeId::BARE => self.error(TicError::TypeMismatch {
                    span,
                    context: format!("the declaration of `{}`", name.name),
                    expected: "an initializer — `obj x = { field: value }`".into(),
                    found: "nothing (obj has no zero value)".into(),
                    hint: Some(
                        "objs are built from literals — every obj starts life as `{ … }`".into(),
                    ),
                }),
                TicType::Class(c) => self.error(TicError::TypeMismatch {
                    span,
                    context: format!("the declaration of `{}`", name.name),
                    expected: format!("an initializer — `{c} c = new {c}(…)`"),
                    found: format!("nothing (`{c}` has no zero value)"),
                    hint: Some(format!(
                        "instances come from `new`: `{} c = new {}();`",
                        name.name, c
                    )),
                }),
                _ => {}
            }
        }
        // An `obj` declared variable is refined to its literal's shape —
        // `{ retries: 3 }` makes `config` a *known* shape (§5.4). A bare
        // initializer (a param typed `obj`) leaves it bare.
        let var_ty = match init {
            None => declared.clone(),
            Some(expr) => {
                if matches!(declared, TicType::Obj(ShapeId::BARE)) {
                    let found = self.infer(expr, None);
                    match found {
                        TicType::Obj(id) if id != ShapeId::BARE => TicType::Obj(id),
                        TicType::Dynamic => TicType::Obj(ShapeId::BARE),
                        other => {
                            if !self.assign_ok(&declared, &other) {
                                self.mismatch(
                                    expr.span(),
                                    &format!("the initializer of `{}`", name.name),
                                    &declared,
                                    &other,
                                );
                            }
                            TicType::Obj(ShapeId::BARE)
                        }
                    }
                } else {
                    let context = format!("the initializer of `{}`", name.name);
                    self.check_against(expr, &declared, &context, expr.span());
                    declared
                }
            }
        };
        self.decl_types.insert(name.span, var_ty.clone());
        // Globals share the top-level namespace with functions, classes
        // and enums; locals may shadow them.
        if self.at_global_scope() {
            if let Some((first, kind)) = self.decl_names.get(name.name.as_str()).cloned() {
                self.duplicate(name.span, &name.name, DeclKind::Variable, first);
                let _ = kind;
                return;
            }
        }
        if let Err(conflict) = self.scopes.declare(&name.name, var_ty, is_final, name.span) {
            self.duplicate(name.span, &name.name, DeclKind::Variable, conflict.first);
        }
    }

    // ---- conditions and returns --------------------------------------------

    /// `if` / `while` / `for` conditions must be bool (a bare-obj
    /// `Dynamic` is re-checked at runtime).
    pub(crate) fn check_condition(&mut self, expr: &Expr, what: &str) {
        let ty = self.infer(expr, None);
        if !matches!(ty, TicType::Bool | TicType::Dynamic) {
            self.error(TicError::NotBoolCondition { span: expr.span(), found: ty.name() });
            let _ = what;
        }
    }

    fn check_return(&mut self, value: Option<&Expr>, span: Span) {
        let Some(expr) = value else {
            // `return;` — fine in a unit function; in a value-returning
            // one it means the zero value (like falling off the end).
            self.returns.push((span, TicType::Unit));
            return;
        };
        if matches!(self.current_return, TicType::Unit) {
            let found = self.infer(expr, None);
            self.error(TicError::TypeMismatch {
                span: expr.span(),
                context: "the return value".into(),
                expected: "no value — this function returns nothing".into(),
                found: found.name(),
                hint: Some("drop the expression: `return;` — or give the function a `-> type`".into()),
            });
            return;
        }
        let ty = self.check_against(expr, &self.current_return.clone(), "the return value", expr.span());
        self.returns.push((span, ty));
    }

    // ---- assignment ----------------------------------------------------------

    fn check_assign(&mut self, target: &Expr, op: AssignOp, value: &Expr) {
        let target_ty = self.lvalue_type(target);
        match op {
            AssignOp::Set => {
                self.check_against(value, &target_ty, "the assignment", value.span());
            }
            AssignOp::Add | AssignOp::Sub | AssignOp::Mul | AssignOp::Div => {
                let binop = match op {
                    AssignOp::Add => BinaryOp::Add,
                    AssignOp::Sub => BinaryOp::Sub,
                    AssignOp::Mul => BinaryOp::Mul,
                    AssignOp::Div => BinaryOp::Div,
                    AssignOp::Set => unreachable!("handled above"),
                };
                self.arith_with_lhs_type(binop, &target_ty, value);
            }
        }
    }

    /// The type a value must have to be assigned into `target`. Handles
    /// every lvalue form the parser admits; reports and poisons on bad
    /// targets (`final` names, functions used as variables, …).
    fn lvalue_type(&mut self, target: &Expr) -> TicType {
        match target {
            Expr::Ident(name) => match self.scopes.lookup(&name.name) {
                Some(symbol) => {
                    let (ty, is_final) = (symbol.ty.clone(), symbol.is_final);
                    if is_final {
                        self.error(TicError::AssignToFinal {
                            span: name.span,
                            name: name.name.clone(),
                        });
                    }
                    ty
                }
                None => self.unknown_assign_target(&name.name, name.span),
            },
            Expr::Field { obj, name, .. } => self.field_write_type(obj, name),
            Expr::Index { .. } => self.infer(target, None),
            Expr::Unary { op: crate::ast::UnaryOp::Deref, .. } => self.infer(target, None),
            other => {
                // The parser's lvalue check should make this unreachable.
                self.error(TicError::NotAssignable {
                    span: other.span(),
                    name: other.span().to_string(),
                    what: "this expression".into(),
                });
                TicType::Dynamic
            }
        }
    }

    /// Assignment to a bare name that is not a variable — usually a
    /// function, class or enum used as if it were one.
    fn unknown_assign_target(&mut self, name: &str, span: Span) -> TicType {
        let what = if self.functions.iter().any(|f| f.name == name) {
            Some("a function")
        } else if self.classes.iter().any(|c| c.name == name) {
            Some("a class")
        } else if self.enums.iter().any(|e| e.name == name) {
            Some("an enum")
        } else {
            None
        };
        match what {
            Some(what) => {
                self.error(TicError::NotAssignable {
                    span,
                    name: name.to_string(),
                    what: what.into(),
                });
                TicType::Dynamic
            }
            None => {
                self.unknown_variable(name, span);
                TicType::Dynamic
            }
        }
    }

    /// Assignment target `obj.name`. On a *known* obj shape the field
    /// must already exist — objs never grow new fields (§5.4). On a bare
    /// `obj` the write is legal and checked at runtime.
    fn field_write_type(&mut self, obj: &Expr, name: &ast::Ident) -> TicType {
        let owner_ty = self.infer(obj, None);
        match &owner_ty {
            TicType::Obj(id) if *id != ShapeId::BARE => {
                let shape = self.shapes.get(*id).cloned();
                match shape {
                    Some(shape) => match shape.fields.get(&name.name) {
                        Some(ty) => ty.clone(),
                        None => {
                            let fields: Vec<&str> =
                                shape.fields.keys().map(String::as_str).collect();
                            let suggestion = did_you_mean(&name.name, &fields);
                            self.error(TicError::AddObjField {
                                span: name.span,
                                field: name.name.clone(),
                                suggestion,
                            });
                            TicType::Dynamic
                        }
                    },
                    None => TicType::Dynamic,
                }
            }
            TicType::Obj(ShapeId::BARE) | TicType::Dynamic => TicType::Dynamic,
            TicType::Class(class) => self.class_field_for_write(class, name),
            _ => {
                self.unknown_field(&owner_ty, name);
                TicType::Dynamic
            }
        }
    }

    /// Field write on a class instance: fields are writable, methods are
    /// not things you assign to.
    fn class_field_for_write(&mut self, class: &str, name: &ast::Ident) -> TicType {
        let Some(index) = self.classes.iter().position(|c| c.name == class) else {
            return TicType::Dynamic;
        };
        if let Some(ty) = self.classes[index].field(&name.name) {
            return ty.clone();
        }
        if self.classes[index].method(&name.name).is_some() {
            self.error(TicError::NotAssignable {
                span: name.span,
                name: name.name.clone(),
                what: "a method".into(),
            });
            return TicType::Dynamic;
        }
        let fields: Vec<String> =
            self.classes[index].fields.iter().map(|(n, _)| n.clone()).collect();
        let suggestion =
            did_you_mean(&name.name, &fields.iter().map(String::as_str).collect::<Vec<_>>());
        self.error(TicError::UnknownField {
            span: name.span,
            owner: format!("class {class}"),
            field: name.name.clone(),
            suggestion,
            note: None,
        });
        TicType::Dynamic
    }
}
