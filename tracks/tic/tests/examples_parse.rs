//! Integration test (plan §9): the whole teaching pack in `examples/`
//! must parse to completion with zero errors — every construct the
//! examples use is a contract the parser has to keep.

use std::fs;
use std::path::PathBuf;

use tic::lexer;
use tic::parser;

const EXAMPLES: [&str; 9] = [
    "examples/basics/01_hello.tic",
    "examples/basics/02_types_and_memory.tic",
    "examples/basics/03_control_flow.tic",
    "examples/building/04_functions_recursion.tic",
    "examples/building/05_pointers.tic",
    "examples/building/06_arrays_sorting.tic",
    "examples/objects/07_classes.tic",
    "examples/objects/08_enums_and_obj.tic",
    "examples/objects/99_capstone.tic",
];

fn example(rel: &str) -> (String, String) {
    let path = PathBuf::from(env!("CARGO_MANIFEST_DIR")).join(rel);
    let src = fs::read_to_string(&path)
        .unwrap_or_else(|e| panic!("cannot read {}: {e}", path.display()));
    (rel.to_string(), src)
}

#[test]
fn all_nine_examples_parse_with_zero_errors() {
    for rel in EXAMPLES {
        let (_, src) = example(rel);
        let tokens = lexer::tokenize(&src).unwrap_or_else(|e| panic!("{rel}: lex failed: {e}"));
        match parser::parse(&tokens) {
            Ok(program) => {
                assert!(
                    !program.decls.is_empty() || !program.stmts.is_empty(),
                    "{rel} parsed to an empty program"
                );
            }
            Err(errors) => {
                panic!("{rel}: {} parse error(s), first: {:?}", errors.total, errors.errors[0]);
            }
        }
    }
}

#[test]
fn capstone_ast_dump_shows_the_whole_structure() {
    let (_, src) = example("examples/objects/99_capstone.tic");
    let tokens = lexer::tokenize(&src).unwrap();
    let program = parser::parse(&tokens).unwrap();
    let dump = tic::ast::display::dump(&program);
    for expected in [
        "program",
        "enum State",
        "  variant Idle",
        "class Counter",
        "  field count: i32",
        "  field state: State",
        "function init",      // unit return: no `->` on the line
        "function bump -> bool",
        "function double -> i32",
        "var_decl final i32 MAX",
        "var_decl Counter c",
        "  new Counter",
        "while",
        "obj_lit",
        "  field retries",
    ] {
        assert!(dump.contains(&expected), "missing `{expected}` in dump:\n{dump}");
    }
}
