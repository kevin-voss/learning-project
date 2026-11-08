//! The type checker (plan §5.3, §5.4) — the whole static pass in one
//! AST walk: declarations, operators, conditions, calls, indexing,
//! fields and methods, enums, pointers, casts, `size_of`, assignments,
//! and obj **shape inference**.
//!
//! Layout (repo rule: ≤5 files per directory):
//!
//! * [`types`] — `TicType`, `Shape`/`ShapeTable`, the `CheckedProgram`
//!   the interpreter consumes and the expression-type side tables.
//! * [`scope`] — the compile-time scope stack (one frame per block).
//! * `decls` — stage 1: collecting every declaration's signature
//!   (functions, class layouts + `init`, enums).
//! * `stmt` — statements: declarations, assignment targets, control
//!   flow, returns, and `AstType` → `TicType` resolution.
//! * `expr/` — expression inference, split one concern per file:
//!   `mod` (dispatch, expectations, names), `ops` (operators + the
//!   `==` table), `values` (indexing, fields, array/obj literals),
//!   `calls` (user functions, methods, casts, `new`) and `builtins`
//!   (the §2.5 table).
//!
//! The driver runs in three stages, mirroring Tic's two-pass design:
//! collect every declaration's **signature** first (so order never
//! matters), check the top-level statements (declaring the globals in
//! order), then check every function/method body — by then the globals
//! are all in scope, which is what example 99's `bump` needs (`MAX` is
//! used inside a class method).

mod decls;
mod expr;
pub mod scope;
mod stmt;
pub mod types;

pub use types::{
    CheckedClass, CheckedEnum, CheckedFunction, CheckedProgram, DeclTypes, ExprTypes, Shape,
    ShapeId, ShapeTable, TicType,
};

use crate::ast::{AstType, BaseTy, Decl, Program};
use crate::diagnostics::TicError;
use crate::util::Span;
use scope::{DeclKind, ScopeStack};
use std::collections::HashMap;

/// Check a parsed program: `Ok(CheckedProgram)` when it is statically
/// sound, `Err` with every type error found otherwise (the checker, like
/// the parser, reports all of its errors in one run).
pub fn check(program: &Program) -> Result<CheckedProgram, Vec<TicError>> {
    let mut checker = Checker::new();
    checker.collect_decls(&program.decls);
    checker.check_stmts(&program.stmts);
    checker.check_bodies(program);
    if checker.errors.is_empty() {
        Ok(checker.into_checked(program))
    } else {
        Err(checker.errors)
    }
}

/// The checker itself. Statement and expression rules live in the
/// `stmt` / `expr` sibling modules as `impl Checker` blocks.
pub(crate) struct Checker {
    pub(crate) shapes: ShapeTable,
    pub(crate) functions: Vec<types::CheckedFunction>,
    pub(crate) classes: Vec<types::CheckedClass>,
    pub(crate) enums: Vec<types::CheckedEnum>,
    /// Every declaration name (function/class/enum), for duplicate and
    /// collision errors. Globals join via the scope's global frame.
    pub(crate) decl_names: HashMap<String, (Span, DeclKind)>,
    pub(crate) scopes: ScopeStack,
    pub(crate) errors: Vec<TicError>,
    // Per-function state, set while a body is being checked.
    pub(crate) current_return: TicType,
    /// `Some(class)` while a method body is being checked (for `this`).
    pub(crate) current_class: Option<String>,
    /// Every `return` type seen in the current body (§5.4: a function
    /// returning `obj` must return one consistent shape).
    pub(crate) returns: Vec<(Span, TicType)>,
    pub(crate) expr_types: ExprTypes,
    pub(crate) decl_types: DeclTypes,
}

impl Checker {
    fn new() -> Self {
        Self {
            shapes: ShapeTable::default(),
            functions: Vec::new(),
            classes: Vec::new(),
            enums: Vec::new(),
            decl_names: HashMap::new(),
            scopes: ScopeStack::new(),
            errors: Vec::new(),
            current_return: TicType::Unit,
            current_class: None,
            returns: Vec::new(),
            expr_types: ExprTypes::default(),
            decl_types: DeclTypes::default(),
        }
    }

    pub(crate) fn error(&mut self, err: TicError) {
        self.errors.push(err);
    }

    /// True while checking top-level statements (the global frame).
    pub(crate) fn at_global_scope(&self) -> bool {
        self.scopes.depth() == 1
    }

    /// Record a duplicate-name error: `what` is the kind being declared
    /// now, the conflict says what was there first.
    pub(crate) fn duplicate(&mut self, span: Span, name: &str, what: DeclKind, first: Span) {
        self.error(TicError::DuplicateDecl {
            span,
            name: name.to_string(),
            first,
            what: what.describe().to_string(),
        });
    }

    /// Register a declaration name, reporting a duplicate when it is
    /// already taken by another declaration.
    pub(crate) fn reserve_name(&mut self, name: &str, kind: DeclKind, span: Span) -> bool {
        if let Some((first, first_kind)) = self.decl_names.get(name) {
            let (first, first_kind) = (*first, *first_kind);
            self.duplicate(span, name, kind, first);
            // Keep the original kind in the message.
            let _ = first_kind;
            false
        } else {
            self.decl_names.insert(name.to_string(), (span, kind));
            true
        }
    }

    // ---- stage 3: function and method bodies ------------------------------

    /// Check every function body, then every method body. Runs *after*
    /// the top-level statements so all globals are in scope (methods may
    /// read them — see example 99's `MAX`).
    pub(crate) fn check_bodies(&mut self, program: &Program) {
        for decl in &program.decls {
            match decl {
                Decl::Function(f) => self.check_function_body(f, None),
                Decl::Class(c) => {
                    for method in &c.methods {
                        self.check_function_body(method, Some(c.name.name.clone()));
                    }
                }
                Decl::Enum(_) => {}
            }
        }
    }

    fn check_function_body(&mut self, f: &crate::ast::FunctionDecl, class: Option<String>) {
        // The resolved signature from stage 1 (no re-resolving, so an
        // unknown type in a signature is reported exactly once). A name
        // rejected as a duplicate has no entry — resolve fresh there.
        let signature = match self.signature_of(f, class.as_deref()) {
            Some(sig) => sig,
            None => self.bare_function(f),
        };
        self.scopes.push();
        self.current_class = class.clone();
        self.current_return = signature.return_ty.clone();
        self.returns.clear();
        for param in &signature.params {
            self.decl_types.insert(param.span, param.ty.clone());
            if let Err(conflict) =
                self.scopes.declare(&param.name, param.ty.clone(), false, param.span)
            {
                self.duplicate(param.span, &param.name, DeclKind::Param, conflict.first);
            }
        }
        for stmt in &f.body.stmts {
            self.check_stmt(stmt);
        }
        self.unify_obj_returns(&f.name.name, class.as_deref());
        self.current_class = None;
        self.scopes.pop();
    }

    /// The already-resolved signature of a function or method, if its
    /// declaration survived duplicate checking.
    fn signature_of(
        &self,
        f: &crate::ast::FunctionDecl,
        class: Option<&str>,
    ) -> Option<types::CheckedFunction> {
        match class {
            None => self.functions.iter().find(|g| g.name == f.name.name),
            Some(class) => self
                .classes
                .iter()
                .find(|c| c.name == class)
                .and_then(|c| c.methods.iter().find(|m| m.name == f.name.name)),
        }
        .cloned()
    }

    /// §5.4: a function whose declared return type is `obj` must return
    /// literals of one consistent shape. When the returns DO agree, the
    /// recorded signature is **refined** to that shape — the same
    /// refinement `obj x = { … }` gets — so a run that falls off the end
    /// still has an honest zero value (the shape's fields zeroed, §2.1,
    /// via the interpreter's `zero_of`).
    fn unify_obj_returns(&mut self, name: &str, class: Option<&str>) {
        if !matches!(self.current_return, TicType::Obj(_)) {
            return;
        }
        // (span, shape id) of the first known-shape obj return.
        let mut known: Option<(Span, usize)> = None;
        let mut disagreement = false;
        for (span, ty) in self.returns.clone() {
            let TicType::Obj(id) = ty else { continue };
            if id == ShapeId::BARE {
                continue; // a bare obj (e.g. a param) is deferred to runtime
            }
            match known {
                None => known = Some((span, id.0)),
                Some((_, first)) if first == id.0 => {}
                Some((first_span, first)) => {
                    disagreement = true;
                    let expected = self.shapes.render(&TicType::Obj(ShapeId(first)));
                    let found = self.shapes.render(&TicType::Obj(id));
                    self.error(TicError::ShapeMismatch {
                        span,
                        context: format!(
                            "the returns of this function disagree (first obj return is at offset {first_span})"
                        ),
                        expected,
                        found,
                    });
                }
            }
        }
        // All known-shape returns agree (and there is at least one):
        // refine the recorded signature to the unified shape.
        if !disagreement {
            if let Some((_, id)) = known {
                let refined = TicType::Obj(ShapeId(id));
                let target = match class {
                    None => self
                        .functions
                        .iter_mut()
                        .find(|g| g.name == name)
                        .map(|f| &mut f.return_ty),
                    Some(class) => self
                        .classes
                        .iter_mut()
                        .find(|c| c.name == class)
                        .and_then(|c| c.methods.iter_mut().find(|m| m.name == name))
                        .map(|m| &mut m.return_ty),
                };
                if let Some(ty) = target {
                    *ty = refined;
                }
            }
        }
    }

    // ---- output ------------------------------------------------------------

    fn into_checked(mut self, program: &Program) -> CheckedProgram {
        // Bodies were walked from `program`; `functions`/`classes` carry
        // clones of them already.
        let _ = &mut self.functions;
        CheckedProgram {
            functions: self.functions,
            classes: self.classes,
            enums: self.enums,
            shapes: self.shapes,
            stmts: program.stmts.clone(),
            expr_types: self.expr_types,
            decl_types: self.decl_types,
        }
    }
}

/// All class + enum names, for "did you mean" hints on unknown types.
pub(crate) fn type_name_candidates(checker: &Checker) -> Vec<String> {
    let mut names: Vec<String> = BaseTy::builtin_names().iter().map(|s| s.to_string()).collect();
    names.extend(checker.classes.iter().map(|c| c.name.clone()));
    names.extend(checker.enums.iter().map(|e| e.name.clone()));
    names
}

/// The base type keyword of a syntactic type, if it is scalar — what
/// casts and `size_of` accept.
pub(crate) fn scalar_base(ty: &AstType) -> Option<TicType> {
    if ty.suffix != crate::ast::TypeSuffix::None {
        return None;
    }
    Some(match ty.base {
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
        BaseTy::Obj | BaseTy::Named(_) => return None,
    })
}
