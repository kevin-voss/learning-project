//! Pretty-printer for `--ast` (plan §5, P5 "x-ray transparency").
//!
//! One node per line, children indented two spaces per level, and the
//! output is stable: the same program always dumps the same text (tests
//! compare it exactly). Types are spelled the way the student wrote them
//! (`i32[5]`, `Counter*`), operators as their source symbols.

use crate::ast::*;
use std::fmt::Write as _;

/// Dump a whole [`Program`] as an indented tree.
pub fn dump(program: &Program) -> String {
    let mut d = Dumper::default();
    d.line(0, "program");
    for decl in &program.decls {
        d.decl(1, decl);
    }
    for stmt in &program.stmts {
        d.stmt(1, stmt);
    }
    d.out
}

#[derive(Default)]
struct Dumper {
    out: String,
}

impl Dumper {
    fn line(&mut self, depth: usize, text: &str) {
        let _ = writeln!(self.out, "{}{}", "  ".repeat(depth), text);
    }

    fn decl(&mut self, depth: usize, decl: &Decl) {
        match decl {
            Decl::Function(f) => {
                let ret = match &f.return_ty {
                    Some(ty) => format!(" -> {}", ty.to_source()),
                    None => String::new(), // unit: no `->` in the source either
                };
                self.line(depth, &format!("function {}{}", f.name.name, ret));
                for p in &f.params {
                    self.line(depth + 1, &format!("param {}: {}", p.name.name, p.ty.to_source()));
                }
                self.block(depth + 1, &f.body);
            }
            Decl::Class(c) => {
                self.line(depth, &format!("class {}", c.name.name));
                for f in &c.fields {
                    self.line(depth + 1, &format!("field {}: {}", f.name.name, f.ty.to_source()));
                }
                for m in &c.methods {
                    self.decl(depth + 1, &Decl::Function(m.clone()));
                }
            }
            Decl::Enum(e) => {
                self.line(depth, &format!("enum {}", e.name.name));
                for v in &e.variants {
                    self.line(depth + 1, &format!("variant {}", v.name));
                }
            }
        }
    }

    fn block(&mut self, depth: usize, block: &Block) {
        self.line(depth, "block");
        for stmt in &block.stmts {
            self.stmt(depth + 1, stmt);
        }
    }

    fn stmt(&mut self, depth: usize, stmt: &Stmt) {
        match stmt {
            Stmt::VarDecl { ty, name, init, is_final, .. } => {
                let final_kw = if *is_final { "final " } else { "" };
                self.line(depth, &format!("var_decl {final_kw}{} {}", ty.to_source(), name.name));
                if let Some(expr) = init {
                    self.expr(depth + 1, expr);
                }
            }
            Stmt::Assign { target, op, value, .. } => {
                self.line(depth, &format!("assign {}", op.symbol()));
                self.expr(depth + 1, target);
                self.expr(depth + 1, value);
            }
            Stmt::If { cond, then_branch, else_branch, .. } => {
                self.line(depth, "if");
                self.expr(depth + 1, cond);
                self.line(depth + 1, "then");
                self.block(depth + 2, then_branch);
                if let Some(els) = else_branch {
                    self.line(depth + 1, "else");
                    self.stmt(depth + 2, els); // a nested `if` or a `block`
                }
            }
            Stmt::While { cond, body, .. } => {
                self.line(depth, "while");
                self.expr(depth + 1, cond);
                self.block(depth + 1, body);
            }
            Stmt::For { init, cond, update, body, .. } => {
                self.line(depth, "for");
                if let Some(init) = init {
                    self.line(depth + 1, "init");
                    self.stmt(depth + 2, init);
                }
                if let Some(cond) = cond {
                    self.line(depth + 1, "cond");
                    self.expr(depth + 2, cond);
                }
                if let Some(update) = update {
                    self.line(depth + 1, "update");
                    self.stmt(depth + 2, update);
                }
                self.line(depth + 1, "body");
                self.block(depth + 2, body);
            }
            Stmt::Return { value, .. } => {
                self.line(depth, "return");
                if let Some(expr) = value {
                    self.expr(depth + 1, expr);
                }
            }
            Stmt::Block(block) => self.block(depth, block),
            Stmt::ExprStmt { expr, .. } => {
                self.line(depth, "expr_stmt");
                self.expr(depth + 1, expr);
            }
        }
    }

    fn expr(&mut self, depth: usize, expr: &Expr) {
        match expr {
            Expr::IntLit { value, .. } => self.line(depth, &format!("int {value}")),
            Expr::FloatLit { value, .. } => self.line(depth, &format!("float {value}")),
            Expr::StrLit { value, .. } => self.line(depth, &format!("str {value:?}")),
            Expr::CharLit { value, .. } => self.line(depth, &format!("char {value:?}")),
            Expr::BoolLit { value, .. } => self.line(depth, &format!("bool {value}")),
            Expr::NullLit { .. } => self.line(depth, "null"),
            Expr::This { .. } => self.line(depth, "this"),
            Expr::Ident(name) => self.line(depth, &format!("ident {}", name.name)),
            Expr::Binary { op, lhs, rhs, .. } => {
                self.line(depth, &format!("binary {}", op.symbol()));
                self.expr(depth + 1, lhs);
                self.expr(depth + 1, rhs);
            }
            Expr::Unary { op, operand, .. } => {
                self.line(depth, &format!("unary {}", op.symbol()));
                self.expr(depth + 1, operand);
            }
            Expr::Call { callee, args, .. } => {
                self.line(depth, "call");
                self.expr(depth + 1, callee);
                for arg in args {
                    self.expr(depth + 1, arg);
                }
            }
            Expr::Index { obj, index, .. } => {
                self.line(depth, "index");
                self.expr(depth + 1, obj);
                self.expr(depth + 1, index);
            }
            Expr::Field { obj, name, .. } => {
                self.line(depth, &format!("field {}", name.name));
                self.expr(depth + 1, obj);
            }
            Expr::ArrayLit { elems, .. } => {
                self.line(depth, "array_lit");
                for elem in elems {
                    self.expr(depth + 1, elem);
                }
            }
            Expr::ObjLit { fields, .. } => {
                self.line(depth, "obj_lit");
                for (name, value) in fields {
                    self.line(depth + 1, &format!("field {}", name.name));
                    self.expr(depth + 2, value);
                }
            }
            Expr::Cast { ty, expr, .. } => {
                self.line(depth, &format!("cast {}", ty.to_source()));
                self.expr(depth + 1, expr);
            }
            Expr::TypeName { ty, .. } => self.line(depth, &format!("type {}", ty.to_source())),
            Expr::New { class, args, .. } => {
                self.line(depth, &format!("new {}", class.name));
                for arg in args {
                    self.expr(depth + 1, arg);
                }
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::lexer;
    use crate::parser;

    fn dump_src(src: &str) -> String {
        let tokens = lexer::tokenize(src).expect("test source lexes");
        let program = parser::parse(&tokens).expect("test source parses");
        dump(&program)
    }

    #[test]
    fn dumps_a_tiny_program_exactly() {
        assert_eq!(
            dump_src("i32 x = 1 + 2;\n"),
            "program\n  var_decl i32 x\n    binary +\n      int 1\n      int 2\n"
        );
    }

    #[test]
    fn dumps_control_flow_and_assignment() {
        let out = dump_src("while (x < 3) { x += 1; }");
        let expected = [
            "program",
            "  while",
            "    binary <",
            "      ident x",
            "      int 3",
            "    block",
            "      assign +=",
            "        ident x",
            "        int 1",
        ]
        .map(|l| format!("{l}\n"))
        .concat();
        assert_eq!(out, expected);
    }

    #[test]
    fn unit_function_omits_the_arrow_and_keeps_params() {
        let out = dump_src("function init(str name) { this.label = name; }");
        assert!(out.contains("function init\n"), "got:\n{out}");
        assert!(!out.contains("->"), "unit must not print a return type:\n{out}");
        assert!(out.contains("param name: str"));
        assert!(out.contains("field label"));
    }

    #[test]
    fn dumps_class_enum_and_literals() {
        let src = "enum State { Idle, Done }\nclass C { i32 n; }\n\
                   obj o = { retries: 3, on: true, };\nC c = new C();";
        let out = dump_src(src);
        for expected in [
            "enum State",
            "  variant Idle",
            "class C",
            "  field n: i32",
            "var_decl obj o",
            "obj_lit",
            "  field retries",
            "    int 3",
            "var_decl C c",
            "  new C",
        ] {
            assert!(out.contains(&format!("\n{expected}")) || out.starts_with(&format!("{expected}\n")) || out.contains(&expected), "missing `{expected}` in:\n{out}");
        }
    }
}
