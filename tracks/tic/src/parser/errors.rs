//! Parse-error helpers (T1xxx) and the multi-error result of a parse.
//!
//! The parser *recovers* (§5.2): it records every statement-level error,
//! skips to the next `;` or `}`, and keeps going, so one run shows a
//! student all of their mistakes at once. [`ParseErrors`] carries at most
//! [`MAX_SHOWN`] errors plus the total, which the CLI turns into
//! "…and N more — fix these first".

use crate::ast::BaseTy;
use crate::diagnostics::hints::did_you_mean;
use crate::diagnostics::TicError;
use crate::lexer::TokenKind;
use crate::util::Span;

/// How many parse errors one run shows before the "…and N more" line.
pub const MAX_SHOWN: usize = 10;

/// Every parse error found in one run.
#[derive(Debug, Clone)]
pub struct ParseErrors {
    /// The errors to show — at most [`MAX_SHOWN`], in source order.
    pub errors: Vec<TicError>,
    /// Total number of errors found (`>= errors.len()`).
    pub total: usize,
}

/// The workhorse: the token stream does not match the grammar right here.
pub fn unexpected(span: Span, expected: &str, found: &str) -> TicError {
    TicError::UnexpectedToken { span, expected: expected.to_string(), found: found.to_string() }
}

/// `Foo x` where `Foo` is neither a builtin type nor a declared class or
/// enum. `type_candidates` are the class/enum names in scope; builtin type
/// names are added here so the hint can suggest `i32` for `i32`-alike typos.
pub fn unknown_type(span: Span, name: &str, type_candidates: &[String]) -> TicError {
    let mut candidates: Vec<&str> = BaseTy::builtin_names().to_vec();
    candidates.extend(type_candidates.iter().map(String::as_str));
    TicError::UnknownType {
        span,
        name: name.to_string(),
        suggestion: did_you_mean(name, &candidates),
    }
}

/// How to name an expected token kind in an error message.
pub fn expected_desc(kind: &TokenKind) -> String {
    match kind {
        TokenKind::Ident(_) => "a name".into(),
        TokenKind::Int(_) => "a whole number".into(),
        TokenKind::Float(_) => "a number".into(),
        TokenKind::Str(_) => "a string".into(),
        TokenKind::Char(_) => "a char".into(),
        TokenKind::Eof => "more input".into(),
        _ => format!("`{}`", lexeme(kind)),
    }
}

/// How to name the token actually found (shows the value, not just the kind).
pub fn found_desc(kind: &TokenKind) -> String {
    match kind {
        TokenKind::Ident(name) => format!("`{name}`"),
        TokenKind::Int(value) => format!("`{value}`"),
        TokenKind::Float(value) => format!("`{value}`"),
        TokenKind::Str(value) => format!("`\"{value}\"`"),
        TokenKind::Char(value) => format!("`'{value}'`"),
        TokenKind::Eof => "end of file".into(),
        _ => format!("`{}`", lexeme(kind)),
    }
}

/// The source spelling of a keyword or operator token.
fn lexeme(kind: &TokenKind) -> &'static str {
    use TokenKind::*;
    match kind {
        Function => "function",
        Class => "class",
        Enum => "enum",
        Final => "final",
        If => "if",
        Else => "else",
        While => "while",
        For => "for",
        Return => "return",
        New => "new",
        This => "this",
        True => "true",
        False => "false",
        Null => "null",
        TyI8 => "i8",
        TyI16 => "i16",
        TyI32 => "i32",
        TyI64 => "i64",
        TyU8 => "u8",
        TyU16 => "u16",
        TyU32 => "u32",
        TyU64 => "u64",
        TyF32 => "f32",
        TyF64 => "f64",
        TyBool => "bool",
        TyChar => "char",
        TyStr => "str",
        TyObj => "obj",
        Plus => "+",
        Minus => "-",
        Star => "*",
        Slash => "/",
        Percent => "%",
        Assign => "=",
        PlusAssign => "+=",
        MinusAssign => "-=",
        StarAssign => "*=",
        SlashAssign => "/=",
        EqEq => "==",
        NotEq => "!=",
        Lt => "<",
        Gt => ">",
        LtEq => "<=",
        GtEq => ">=",
        AndAnd => "&&",
        OrOr => "||",
        Bang => "!",
        Amp => "&",
        Arrow => "->",
        LParen => "(",
        RParen => ")",
        LBrace => "{",
        RBrace => "}",
        LBracket => "[",
        RBracket => "]",
        Comma => ",",
        Semi => ";",
        Colon => ":",
        Dot => ".",
        Ident(_) | Int(_) | Float(_) | Str(_) | Char(_) | Eof => "",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn unknown_type_suggests_close_declared_names() {
        let err = unknown_type(Span::new(0, 7), "Countre", &["Counter".to_string()]);
        match err {
            TicError::UnknownType { suggestion: Some(near), .. } => assert_eq!(near, "Counter"),
            other => panic!("expected a suggestion, got {other:?}"),
        }
        // And builtin names are candidates too.
        let err = unknown_type(Span::new(0, 3), "i33", &[]);
        match err {
            TicError::UnknownType { suggestion: Some(near), .. } => assert_eq!(near, "i32"),
            other => panic!("expected a suggestion, got {other:?}"),
        }
    }

    #[test]
    fn descriptions_read_like_a_teacher_wrote_them() {
        assert_eq!(expected_desc(&TokenKind::Semi), "`;`");
        assert_eq!(expected_desc(&TokenKind::Ident("x".into())), "a name");
        assert_eq!(found_desc(&TokenKind::Ident("x".into())), "`x`");
        assert_eq!(found_desc(&TokenKind::Eof), "end of file");
        assert_eq!(found_desc(&TokenKind::Arrow), "`->`");
    }
}
