//! Tokens (plan §4.4): every lexical shape of Tic, plus the stable names
//! used by the `--tokens` dump.

use crate::util::Span;

/// One lexical token.
///
/// `span` always covers the **raw source text** of the token, so
/// `&src[token.span.start..token.span.end]` is exactly the lexeme — for a
/// string literal that includes the quotes and the escapes as written.
#[derive(Debug, Clone, PartialEq)]
pub struct Token {
    pub kind: TokenKind,
    pub span: Span,
}

impl Token {
    pub fn new(kind: TokenKind, span: Span) -> Self {
        Self { kind, span }
    }
}

/// Every kind of token Tic knows (plan §2.2 keywords, §2.3 operators).
#[derive(Debug, Clone, PartialEq)]
pub enum TokenKind {
    // ---- literals --------------------------------------------------------
    Ident(String),
    /// Integer literal, e.g. `42` or `1_000`. Ints *default* to `i32`
    /// later in the checker; the lexer allows the full `i64` range.
    Int(i64),
    Float(f64),
    /// String literal with escapes already decoded.
    Str(String),
    /// Char literal with its escape already decoded — one character.
    Char(char),

    // ---- keywords (§2.2), one variant each -------------------------------
    Function,
    Class,
    Enum,
    Final,
    If,
    Else,
    While,
    For,
    Return,
    New,
    This,
    True,
    False,
    Null,

    // ---- one variant per base type (§2.1) --------------------------------
    // Prefixed `Ty` because `Char` and `Str` are already literal variants.
    TyI8,
    TyI16,
    TyI32,
    TyI64,
    TyU8,
    TyU16,
    TyU32,
    TyU64,
    TyF32,
    TyF64,
    TyBool,
    TyChar,
    TyStr,
    TyObj,

    // ---- operators (§2.3) ------------------------------------------------
    Plus,
    Minus,
    Star,
    Slash,
    Percent,
    Assign,      // =
    PlusAssign,  // +=
    MinusAssign, // -=
    StarAssign,  // *=
    SlashAssign, // /=
    EqEq,        // ==
    NotEq,       // !=
    Lt,          // <
    Gt,          // >
    LtEq,        // <=
    GtEq,        // >=
    AndAnd,      // && (short-circuit and)
    OrOr,        // || (short-circuit or)
    Bang,        // ! (unary not)
    Amp,         // & (address-of)
    Arrow,       // -> (return types)

    // ---- punctuation -----------------------------------------------------
    LParen,
    RParen,
    LBrace,
    RBrace,
    LBracket,
    RBracket,
    Comma,
    Semi,
    /// `:` — separates fields and values in obj literals, `{ retries: 3 }`.
    Colon,
    /// `.` — field/method access, `State.Idle`.
    Dot,

    /// End of the stream. The span is empty and sits past the last byte.
    Eof,
}

impl TokenKind {
    /// Stable display name (the variant name) used by `tic --tokens`.
    pub fn name(&self) -> &'static str {
        use TokenKind::*;
        match self {
            Ident(_) => "Ident",
            Int(_) => "Int",
            Float(_) => "Float",
            Str(_) => "Str",
            Char(_) => "Char",
            Function => "Function",
            Class => "Class",
            Enum => "Enum",
            Final => "Final",
            If => "If",
            Else => "Else",
            While => "While",
            For => "For",
            Return => "Return",
            New => "New",
            This => "This",
            True => "True",
            False => "False",
            Null => "Null",
            TyI8 => "TyI8",
            TyI16 => "TyI16",
            TyI32 => "TyI32",
            TyI64 => "TyI64",
            TyU8 => "TyU8",
            TyU16 => "TyU16",
            TyU32 => "TyU32",
            TyU64 => "TyU64",
            TyF32 => "TyF32",
            TyF64 => "TyF64",
            TyBool => "TyBool",
            TyChar => "TyChar",
            TyStr => "TyStr",
            TyObj => "TyObj",
            Plus => "Plus",
            Minus => "Minus",
            Star => "Star",
            Slash => "Slash",
            Percent => "Percent",
            Assign => "Assign",
            PlusAssign => "PlusAssign",
            MinusAssign => "MinusAssign",
            StarAssign => "StarAssign",
            SlashAssign => "SlashAssign",
            EqEq => "EqEq",
            NotEq => "NotEq",
            Lt => "Lt",
            Gt => "Gt",
            LtEq => "LtEq",
            GtEq => "GtEq",
            AndAnd => "AndAnd",
            OrOr => "OrOr",
            Bang => "Bang",
            Amp => "Amp",
            Arrow => "Arrow",
            LParen => "LParen",
            RParen => "RParen",
            LBrace => "LBrace",
            RBrace => "RBrace",
            LBracket => "LBracket",
            RBracket => "RBracket",
            Comma => "Comma",
            Semi => "Semi",
            Colon => "Colon",
            Dot => "Dot",
            Eof => "Eof",
        }
    }

    /// Is this one of the 14 base-type keywords (`i8` … `obj`)? The parser
    /// uses this to tell the cast `i32(x)` from other expressions (§3).
    pub fn is_type_keyword(&self) -> bool {
        use TokenKind::*;
        matches!(
            self,
            TyI8 | TyI16
                | TyI32
                | TyI64
                | TyU8
                | TyU16
                | TyU32
                | TyU64
                | TyF32
                | TyF64
                | TyBool
                | TyChar
                | TyStr
                | TyObj
        )
    }

    /// Any keyword, including type keywords.
    pub fn is_keyword(&self) -> bool {
        use TokenKind::*;
        matches!(
            self,
            Function
                | Class
                | Enum
                | Final
                | If
                | Else
                | While
                | For
                | Return
                | New
                | This
                | True
                | False
                | Null
                | TyI8
                | TyI16
                | TyI32
                | TyI64
                | TyU8
                | TyU16
                | TyU32
                | TyU64
                | TyF32
                | TyF64
                | TyBool
                | TyChar
                | TyStr
                | TyObj
        )
    }
}

#[cfg(test)]
mod tests {
    use super::TokenKind::*;

    #[test]
    fn type_keywords_are_recognized() {
        let all = [
            TyI8, TyI16, TyI32, TyI64, TyU8, TyU16, TyU32, TyU64, TyF32, TyF64, TyBool, TyChar,
            TyStr, TyObj,
        ];
        assert_eq!(all.len(), 14); // one per base type in §2.1
        for kind in all {
            assert!(kind.is_type_keyword(), "{kind:?}");
            assert!(kind.is_keyword(), "{kind:?}");
        }
    }

    #[test]
    fn non_types_are_not_type_keywords() {
        for kind in [Ident("x".into()), Int(1), Str("s".into()), Function, Plus, Eof] {
            assert!(!kind.is_type_keyword(), "{kind:?}");
        }
        // `true`/`false`/`null` are keywords but not types.
        for kind in [True, False, Null] {
            assert!(kind.is_keyword(), "{kind:?}");
            assert!(!kind.is_type_keyword(), "{kind:?}");
        }
    }

    #[test]
    fn names_are_stable_for_the_tokens_dump() {
        assert_eq!(Function.name(), "Function");
        assert_eq!(TyI32.name(), "TyI32");
        assert_eq!(PlusAssign.name(), "PlusAssign");
        assert_eq!(Ident("x".into()).name(), "Ident");
        assert_eq!(Eof.name(), "Eof");
    }
}
