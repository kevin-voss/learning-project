//! Parser shape tests (plan §9), via the public API: AST shapes for every
//! statement and expression kind, the §3 ambiguity resolutions, and the
//! declaration rules. Error/recovery behaviour lives in `parse_errors.rs`.

use tic::ast::*;
use tic::{lexer, parser};

/// Parse `src`, panicking with the recorded errors if it does not.
fn ok(src: &str) -> Program {
    let tokens = lexer::tokenize(src).expect("test source lexes");
    parser::parse(&tokens).unwrap_or_else(|e| panic!("{src:?} should parse, got {:?}", e.errors))
}

/// The single top-level statement of `src`.
fn one_stmt(src: &str) -> Stmt {
    let mut program = ok(src);
    assert_eq!(program.stmts.len(), 1, "expected exactly one statement in {src:?}");
    program.stmts.pop().expect("just checked length")
}

/// The single expression of an expression statement.
fn one_expr(src: &str) -> Expr {
    match one_stmt(src) {
        Stmt::ExprStmt { expr, .. } => expr,
        other => panic!("expected an expression statement, got {other:?}"),
    }
}

const COUNTER: &str = "class Counter { i32 count; }\n";

// ---- statements ------------------------------------------------------------

#[test]
fn var_decl_with_and_without_init() {
    match one_stmt("i32 x = 5;") {
        Stmt::VarDecl { ty, name, init, is_final, .. } => {
            assert_eq!(ty.to_source(), "i32");
            assert_eq!(name.name, "x");
            assert!(matches!(init.expect("init present"), Expr::IntLit { value: 5, .. }));
            assert!(!is_final);
        }
        other => panic!("var decl, got {other:?}"),
    }
    match one_stmt("bool awake;") {
        Stmt::VarDecl { init: None, .. } => {}
        other => panic!("zero-init decl, got {other:?}"),
    }
}

#[test]
fn final_decl_carries_the_flag() {
    match one_stmt("final i32 MAX = 3;") {
        Stmt::VarDecl { is_final: true, init: Some(_), .. } => {}
        other => panic!("final decl, got {other:?}"),
    }
}

#[test]
fn every_type_suffix_parses() {
    let program = ok("i32 a; i32[5] b; i32[] c; i32* d;");
    let types: Vec<String> = program
        .stmts
        .iter()
        .map(|s| match s {
            Stmt::VarDecl { ty, name, .. } => format!("{}:{}", name.name, ty.to_source()),
            other => panic!("var decl, got {other:?}"),
        })
        .collect();
    assert_eq!(types, ["a:i32", "b:i32[5]", "c:i32[]", "d:i32*"]);
}

#[test]
fn all_five_assign_ops() {
    let program = ok("x = 1; x += 1; x -= 1; x *= 2; x /= 2;");
    let ops: Vec<&str> = program
        .stmts
        .iter()
        .map(|s| match s {
            Stmt::Assign { op, .. } => op.symbol(),
            other => panic!("assign, got {other:?}"),
        })
        .collect();
    assert_eq!(ops, ["=", "+=", "-=", "*=", "/="]);
}

#[test]
fn if_else_if_else_nests_structurally() {
    let stmt = one_stmt("if (a) { x = 1; } else if (b) { x = 2; } else { x = 3; }");
    match stmt {
        Stmt::If { cond, then_branch, else_branch, .. } => {
            assert!(matches!(cond, Expr::Ident(_)));
            assert_eq!(then_branch.stmts.len(), 1);
            // else-if: the else branch is itself an If…
            match *else_branch.expect("else present") {
                Stmt::If { else_branch: inner_else, .. } => {
                    // …whose else is a Block: dangling-else is impossible.
                    assert!(matches!(*inner_else.expect("inner else"), Stmt::Block(_)));
                }
                other => panic!("nested if, got {other:?}"),
            }
        }
        other => panic!("if, got {other:?}"),
    }
}

#[test]
fn while_and_for_shapes() {
    match one_stmt("while (i < 3) { i += 1; }") {
        Stmt::While { cond, body, .. } => {
            assert!(matches!(cond, Expr::Binary { op: BinaryOp::Lt, .. }));
            assert_eq!(body.stmts.len(), 1);
        }
        other => panic!("while, got {other:?}"),
    }
    match one_stmt("for (i32 i = 0; i < n; i += 1) { print(i); }") {
        Stmt::For { init, cond, update, body, .. } => {
            assert!(matches!(*init.expect("init"), Stmt::VarDecl { .. }));
            assert!(matches!(cond.expect("cond"), Expr::Binary { .. }));
            match *update.expect("update") {
                Stmt::Assign { op: AssignOp::Add, target, .. } => {
                    assert!(matches!(target, Expr::Ident(_)));
                }
                other => panic!("update assign, got {other:?}"),
            }
            assert_eq!(body.stmts.len(), 1);
        }
        other => panic!("for, got {other:?}"),
    }
    // Empty parts are all optional; assignment init instead of a decl.
    match one_stmt("for (i = 0;;) {}") {
        Stmt::For { init, cond: None, update: None, body, .. } => {
            assert!(matches!(*init.expect("init"), Stmt::Assign { .. }));
            assert!(body.stmts.is_empty());
        }
        other => panic!("empty for, got {other:?}"),
    }
}

#[test]
fn return_with_and_without_value_and_blocks() {
    let program = ok("return 1 + 2;\n{ return; { i32 deep = 0; } }");
    match &program.stmts[0] {
        Stmt::Return { value: Some(Expr::Binary { op: BinaryOp::Add, .. }), .. } => {}
        other => panic!("return with value, got {other:?}"),
    }
    match &program.stmts[1] {
        Stmt::Block(block) => {
            assert!(matches!(&block.stmts[0], Stmt::Return { value: None, .. }));
            assert!(matches!(&block.stmts[1], Stmt::Block(_)));
        }
        other => panic!("block stmt, got {other:?}"),
    }
}

#[test]
fn lone_semicolons_are_dropped() {
    let program = ok("; i32 x = 1; ;");
    assert_eq!(program.stmts.len(), 1);
}

// ---- expressions ---------------------------------------------------------

#[test]
fn precedence_is_encoded_by_layering() {
    // `1 + 2 * 3` groups the multiplication first.
    match one_expr("1 + 2 * 3;") {
        Expr::Binary { op: BinaryOp::Add, lhs, rhs, .. } => {
            assert!(matches!(*lhs, Expr::IntLit { value: 1, .. }));
            assert!(matches!(*rhs, Expr::Binary { op: BinaryOp::Mul, .. }));
        }
        other => panic!("add of mul, got {other:?}"),
    }
    // Parentheses regroup.
    match one_expr("(1 + 2) * 3;") {
        Expr::Binary { op: BinaryOp::Mul, lhs, .. } => {
            assert!(matches!(*lhs, Expr::Binary { op: BinaryOp::Add, .. }));
        }
        other => panic!("mul of add, got {other:?}"),
    }
    // `a || b && !c` binds `&&` tighter; `!` tighter still.
    match one_expr("a || b && !c;") {
        Expr::Binary { op: BinaryOp::Or, rhs, .. } => {
            assert!(matches!(*rhs,
                Expr::Binary { op: BinaryOp::And, rhs, .. }
                    if matches!(*rhs, Expr::Unary { op: UnaryOp::Not, .. })));
        }
        other => panic!("or of and of not, got {other:?}"),
    }
}

#[test]
fn unary_operators_nest_right() {
    for (src, op) in [
        ("-x;", UnaryOp::Neg),
        ("!b;", UnaryOp::Not),
        ("&x;", UnaryOp::AddrOf),
        ("*p;", UnaryOp::Deref),
    ] {
        match one_expr(src) {
            Expr::Unary { op: found, operand, .. } => {
                assert_eq!(found, op, "{src}");
                assert!(matches!(*operand, Expr::Ident(_)), "{src}");
            }
            other => panic!("unary {src}, got {other:?}"),
        }
    }
    assert!(matches!(one_expr("- -x;"),
        Expr::Unary { op: UnaryOp::Neg, operand, .. }
            if matches!(*operand, Expr::Unary { op: UnaryOp::Neg, .. })));
}

#[test]
fn postfix_chains_call_index_field() {
    match one_expr("f(1)[2].g;") {
        Expr::Field { name, obj, .. } => {
            assert_eq!(name.name, "g");
            match *obj {
                Expr::Index { index, obj, .. } => {
                    assert!(matches!(*index, Expr::IntLit { value: 2, .. }));
                    match *obj {
                        Expr::Call { args, .. } => assert_eq!(args.len(), 1),
                        other => panic!("call, got {other:?}"),
                    }
                }
                other => panic!("index, got {other:?}"),
            }
        }
        other => panic!("field, got {other:?}"),
    }
    assert!(matches!(one_expr("print();"), Expr::Call { ref args, .. } if args.is_empty()));
}

#[test]
fn array_literals_allow_empty_and_trailing_comma() {
    match one_expr("[1, 2, 3,];") {
        Expr::ArrayLit { elems, .. } => assert_eq!(elems.len(), 3),
        other => panic!("array lit, got {other:?}"),
    }
    assert!(matches!(one_expr("[];"), Expr::ArrayLit { ref elems, .. } if elems.is_empty()));
}

#[test]
fn obj_literals_keep_field_order_and_trailing_comma() {
    // Obj literals live in expression position — here, a declaration's init.
    match one_stmt("obj o = { retries: 3, enabled: true, };") {
        Stmt::VarDecl { init: Some(Expr::ObjLit { fields, .. }), .. } => {
            assert_eq!(fields.len(), 2);
            assert_eq!(fields[0].0.name, "retries");
            assert!(matches!(fields[0].1, Expr::IntLit { value: 3, .. }));
            assert_eq!(fields[1].0.name, "enabled");
            assert!(matches!(fields[1].1, Expr::BoolLit { value: true, .. }));
        }
        other => panic!("obj lit decl, got {other:?}"),
    }
}

#[test]
fn casts_are_type_keyword_plus_parens() {
    for (src, expected_ty) in
        [("i32(x);", "i32"), ("char(65);", "char"), ("str(42);", "str"), ("f64(7);", "f64")]
    {
        match one_expr(src) {
            Expr::Cast { ty, expr, .. } => {
                assert_eq!(ty.to_source(), expected_ty, "{src}");
                assert!(matches!(*expr, Expr::Ident(_) | Expr::IntLit { .. }), "{src}");
            }
            other => panic!("cast {src}, got {other:?}"),
        }
    }
    // Casts compose with binary operators (example 02: `f64(7) / f64(2)`).
    match one_expr("f64(7) / f64(2);") {
        Expr::Binary { op: BinaryOp::Div, lhs, rhs, .. } => {
            assert!(matches!(*lhs, Expr::Cast { .. }));
            assert!(matches!(*rhs, Expr::Cast { .. }));
        }
        other => panic!("div of casts, got {other:?}"),
    }
}

#[test]
fn new_and_this_and_enum_access() {
    let program = ok(&format!("{COUNTER}Counter c = new Counter(10);\n"));
    match &program.stmts[0] {
        Stmt::VarDecl { init: Some(expr), .. } => match expr {
            Expr::New { class, args, .. } => {
                assert_eq!(class.name, "Counter");
                assert_eq!(args.len(), 1);
            }
            other => panic!("new, got {other:?}"),
        },
        other => panic!("decl, got {other:?}"),
    }
    match one_expr("this.count;") {
        Expr::Field { obj, name, .. } => {
            assert!(matches!(*obj, Expr::This { .. }));
            assert_eq!(name.name, "count");
        }
        other => panic!("this field, got {other:?}"),
    }
    match one_expr("State.Idle;") {
        Expr::Field { obj, name, .. } => {
            assert!(matches!(*obj, Expr::Ident(_)));
            assert_eq!(name.name, "Idle");
        }
        other => panic!("enum variant, got {other:?}"),
    }
}

#[test]
fn size_of_argument_is_a_type_name_expression() {
    match one_expr("size_of(i32);") {
        Expr::Call { callee, args, .. } => {
            assert!(matches!(*callee, Expr::Ident(_)));
            match &args[0] {
                Expr::TypeName { ty, .. } => assert_eq!(ty.to_source(), "i32"),
                other => panic!("type name arg, got {other:?}"),
            }
        }
        other => panic!("call, got {other:?}"),
    }
}

// ---- the §3 ambiguity table -----------------------------------------------

#[test]
fn ident_ident_is_a_decl_only_for_known_types() {
    // Known class → declaration, not an expression statement.
    let program = ok(&format!("{COUNTER}Counter c = new Counter();\n"));
    match &program.stmts[0] {
        Stmt::VarDecl { ty, name, .. } => {
            assert_eq!(ty.to_source(), "Counter");
            assert_eq!(name.name, "c");
        }
        other => panic!("class-typed decl, got {other:?}"),
    }
}

#[test]
fn type_keyword_statement_decl_or_cast() {
    match one_stmt("i32 x;") {
        Stmt::VarDecl { .. } => {}
        other => panic!("decl, got {other:?}"),
    }
    match one_stmt("i32(x);") {
        Stmt::ExprStmt { expr: Expr::Cast { .. }, .. } => {}
        other => panic!("cast stmt, got {other:?}"),
    }
}

#[test]
fn deref_assign_vs_multiplication() {
    // `*p = 5` assigns through the pointer…
    match one_stmt("*p = 5;") {
        Stmt::Assign { target, op: AssignOp::Set, .. } => {
            assert!(matches!(target, Expr::Unary { op: UnaryOp::Deref, .. }));
        }
        other => panic!("deref assign, got {other:?}"),
    }
    // …while `*p * 2` is multiplication, and `*p += 1` compound-assigns.
    match one_expr("*p * 2;") {
        Expr::Binary { op: BinaryOp::Mul, lhs, .. } => {
            assert!(matches!(*lhs, Expr::Unary { op: UnaryOp::Deref, .. }));
        }
        other => panic!("mul of deref, got {other:?}"),
    }
    match one_stmt("*p += 1;") {
        Stmt::Assign { op: AssignOp::Add, target, .. } => {
            assert!(matches!(target, Expr::Unary { op: UnaryOp::Deref, .. }));
        }
        other => panic!("deref compound assign, got {other:?}"),
    }
}

#[test]
fn known_type_star_is_a_decl_but_unknown_star_is_multiplication() {
    let program = ok(&format!("{COUNTER}Counter* p;\nx * y;\n"));
    match &program.stmts[0] {
        Stmt::VarDecl { ty, .. } => assert_eq!(ty.to_source(), "Counter*"),
        other => panic!("pointer decl, got {other:?}"),
    }
    match &program.stmts[1] {
        Stmt::ExprStmt { expr: Expr::Binary { op: BinaryOp::Mul, .. }, .. } => {}
        other => panic!("multiplication, got {other:?}"),
    }
}

#[test]
fn fixed_array_decl_vs_indexing() {
    let program = ok(&format!("{COUNTER}Counter[3] cs;\ncs[0] = new Counter();\n"));
    match &program.stmts[0] {
        Stmt::VarDecl { ty, .. } => assert_eq!(ty.to_source(), "Counter[3]"),
        other => panic!("array-of-class decl, got {other:?}"),
    }
    match &program.stmts[1] {
        Stmt::Assign { target, .. } => assert!(matches!(target, Expr::Index { .. })),
        other => panic!("index assign, got {other:?}"),
    }
}
