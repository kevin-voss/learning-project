//! Parser declaration tests (plan §9): functions (including the unit
//! return type), classes and enums — plus the span spot-check.

use tic::ast::*;
use tic::{lexer, parser};

/// Parse `src`, panicking with the recorded errors if it does not.
fn ok(src: &str) -> Program {
    let tokens = lexer::tokenize(src).expect("test source lexes");
    parser::parse(&tokens).unwrap_or_else(|e| panic!("{src:?} should parse, got {:?}", e.errors))
}

// ---- declarations -----------------------------------------------------------

#[test]
fn functions_parse_params_and_return_type() {
    let program = ok("function greet(str name, i32 times) -> str { return name; }");
    match &program.decls[0] {
        Decl::Function(f) => {
            assert_eq!(f.name.name, "greet");
            assert_eq!(f.return_ty.as_ref().expect("return type").to_source(), "str");
            let params: Vec<String> =
                f.params.iter().map(|p| format!("{}:{}", p.name.name, p.ty.to_source())).collect();
            assert_eq!(params, ["name:str", "times:i32"]);
        }
        other => panic!("function, got {other:?}"),
    }
}

#[test]
fn return_type_is_optional_unit() {
    // The §8.3 resolution: `function init() { … }` is legal and returns unit.
    let program = ok("function init() { this.count = 0; }");
    match &program.decls[0] {
        Decl::Function(f) => {
            assert_eq!(f.name.name, "init");
            assert_eq!(f.return_ty, None);
        }
        other => panic!("unit function, got {other:?}"),
    }
}

#[test]
fn classes_parse_fields_and_methods() {
    let program = ok(
        "class Counter {\n  i32 count;\n  State state;\n  \
         function init() { this.count = 0; }\n  function bump(i32 by) -> i32 { return by; }\n}",
    );
    match &program.decls[0] {
        Decl::Class(c) => {
            assert_eq!(c.name.name, "Counter");
            assert_eq!(c.fields.len(), 2);
            assert_eq!(c.fields[1].ty.to_source(), "State");
            assert_eq!(c.methods.len(), 2);
            assert_eq!(c.methods[0].return_ty, None); // init → unit
            assert_eq!(c.methods[1].params.len(), 1);
        }
        other => panic!("class, got {other:?}"),
    }
}

#[test]
fn enums_parse_variants() {
    let program = ok("enum State { Idle, Running, Done }");
    match &program.decls[0] {
        Decl::Enum(e) => {
            let names: Vec<&str> = e.variants.iter().map(|v| v.name.as_str()).collect();
            assert_eq!(names, ["Idle", "Running", "Done"]);
        }
        other => panic!("enum, got {other:?}"),
    }
}

#[test]
fn every_node_carries_a_span() {
    // Spot-check spans on a handful of nodes: byte offsets of the source.
    let src = "i32 x = 1 + 2;";
    let program = ok(src);
    match &program.stmts[0] {
        Stmt::VarDecl { span, init: Some(expr), .. } => {
            assert_eq!((span.start, span.end), (0, src.len()));
            assert_eq!((expr.span().start, expr.span().end), (8, src.len() - 1));
        }
        other => panic!("decl, got {other:?}"),
    }
}
