//! The keyword table (plan §2.2).
//!
//! §2.2's headline says "24 keywords", but the list it gives has 28 words
//! (14 general + 14 type names) — we implement the list. The six words
//! reserved for a future Tic (`match`, `import`, `delete`, `map`,
//! `private`, `static`) are *not* keywords: using one is a friendly T0009
//! error instead of a silent misparse.

use super::token::TokenKind;

/// Every Tic keyword, in the order §2.2 lists them. `lookup` answers the
/// same question per-word; the full list is kept for tests and for the
/// parser's "is this a keyword?" checks in phase 2.
#[allow(dead_code)] // complete table on purpose; used by tests today
pub const KEYWORDS: [&str; 28] = [
    "function",
    "class",
    "enum",
    "final",
    "if",
    "else",
    "while",
    "for",
    "return",
    "new",
    "this",
    "true",
    "false",
    "null",
    "i8",
    "i16",
    "i32",
    "i64",
    "u8",
    "u16",
    "u32",
    "u64",
    "f32",
    "f64",
    "bool",
    "char",
    "str",
    "obj",
];

/// Words reserved for future Tic versions (§2.2). The scanner turns these
/// into a T0009 error so nothing silently breaks when they gain meaning.
pub const RESERVED_FOR_FUTURE: [&str; 6] = ["match", "import", "delete", "map", "private", "static"];

/// Look up a word: `Some(kind)` if it is a keyword.
pub fn lookup(word: &str) -> Option<TokenKind> {
    Some(match word {
        "function" => TokenKind::Function,
        "class" => TokenKind::Class,
        "enum" => TokenKind::Enum,
        "final" => TokenKind::Final,
        "if" => TokenKind::If,
        "else" => TokenKind::Else,
        "while" => TokenKind::While,
        "for" => TokenKind::For,
        "return" => TokenKind::Return,
        "new" => TokenKind::New,
        "this" => TokenKind::This,
        "true" => TokenKind::True,
        "false" => TokenKind::False,
        "null" => TokenKind::Null,
        "i8" => TokenKind::TyI8,
        "i16" => TokenKind::TyI16,
        "i32" => TokenKind::TyI32,
        "i64" => TokenKind::TyI64,
        "u8" => TokenKind::TyU8,
        "u16" => TokenKind::TyU16,
        "u32" => TokenKind::TyU32,
        "u64" => TokenKind::TyU64,
        "f32" => TokenKind::TyF32,
        "f64" => TokenKind::TyF64,
        "bool" => TokenKind::TyBool,
        "char" => TokenKind::TyChar,
        "str" => TokenKind::TyStr,
        "obj" => TokenKind::TyObj,
        _ => return None,
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn every_keyword_maps_to_a_kind() {
        for word in KEYWORDS {
            assert!(lookup(word).is_some(), "`{word}` should be a keyword");
        }
        assert_eq!(KEYWORDS.len(), 28); // 14 general + 14 type names (§2.2)
    }

    #[test]
    fn reserved_words_are_not_keywords_yet() {
        for word in RESERVED_FOR_FUTURE {
            assert_eq!(lookup(word), None, "`{word}` must not be a keyword yet");
            assert!(!KEYWORDS.contains(&word));
        }
    }

    #[test]
    fn near_misses_are_plain_identifiers() {
        for word in ["iff", "iff", "i128", "u256", "functions", "Truth", "NULL", "strr"] {
            assert_eq!(lookup(word), None, "`{word}` should lex as an Ident");
        }
    }
}
