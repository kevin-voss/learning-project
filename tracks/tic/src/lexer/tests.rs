//! Lexer unit tests (plan §9): every token kind round-trips, trivia is
//! skipped, spans are byte offsets, and every lex error carries its T0
//! code, a label and a hint.

use super::tokenize;
use super::TokenKind;
use crate::diagnostics::TicError;
use crate::util::Span;
use TokenKind::*;

// ---- every token kind round-trips ---------------------------------------

/// (expected kind, source snippet) for *every* variant of `TokenKind`
/// except `Eof`, which has its own tests below.
fn kind_snippets() -> Vec<(TokenKind, &'static str)> {
    vec![
    (TokenKind::Ident("x".into()), "x"),
    (TokenKind::Ident("hello_world_2".into()), "hello_world_2"),
    (TokenKind::Ident("_private".into()), "_private"),
    (TokenKind::Int(42), "42"),
    (TokenKind::Int(0), "0"),
    (TokenKind::Int(1_000), "1_000"),
    (TokenKind::Int(i64::MAX), "9223372036854775807"),
    (TokenKind::Float(3.14), "3.14"),
    (TokenKind::Float(0.5), "0.5"),
    (TokenKind::Float(10_000.125), "10_000.125"),
    (TokenKind::Str("hi".into()), "\"hi\""),
    (TokenKind::Str("".into()), "\"\""),
    (TokenKind::Str("a\nb\tc\\d\"e".into()), "\"a\\nb\\tc\\\\d\\\"e\""),
    (TokenKind::Str("héllo".into()), "\"héllo\""),
    (TokenKind::Char('A'), "'A'"),
    (TokenKind::Char('\n'), "'\\n'"),
    (TokenKind::Char('\''), "'\\''"),
    (TokenKind::Char('\\'), "'\\\\'"),
    (TokenKind::Char('\0'), "'\\0'"),
    (TokenKind::Char('é'), "'é'"),
    (TokenKind::Char('€'), "'€'"),
    (TokenKind::Function, "function"),
    (TokenKind::Class, "class"),
    (TokenKind::Enum, "enum"),
    (TokenKind::Final, "final"),
    (TokenKind::If, "if"),
    (TokenKind::Else, "else"),
    (TokenKind::While, "while"),
    (TokenKind::For, "for"),
    (TokenKind::Return, "return"),
    (TokenKind::New, "new"),
    (TokenKind::This, "this"),
    (TokenKind::True, "true"),
    (TokenKind::False, "false"),
    (TokenKind::Null, "null"),
    (TokenKind::TyI8, "i8"),
    (TokenKind::TyI16, "i16"),
    (TokenKind::TyI32, "i32"),
    (TokenKind::TyI64, "i64"),
    (TokenKind::TyU8, "u8"),
    (TokenKind::TyU16, "u16"),
    (TokenKind::TyU32, "u32"),
    (TokenKind::TyU64, "u64"),
    (TokenKind::TyF32, "f32"),
    (TokenKind::TyF64, "f64"),
    (TokenKind::TyBool, "bool"),
    (TokenKind::TyChar, "char"),
    (TokenKind::TyStr, "str"),
    (TokenKind::TyObj, "obj"),
    (TokenKind::Plus, "+"),
    (TokenKind::Minus, "-"),
    (TokenKind::Star, "*"),
    (TokenKind::Slash, "/"),
    (TokenKind::Percent, "%"),
    (TokenKind::Assign, "="),
    (TokenKind::PlusAssign, "+="),
    (TokenKind::MinusAssign, "-="),
    (TokenKind::StarAssign, "*="),
    (TokenKind::SlashAssign, "/="),
    (TokenKind::EqEq, "=="),
    (TokenKind::NotEq, "!="),
    (TokenKind::Lt, "<"),
    (TokenKind::Gt, ">"),
    (TokenKind::LtEq, "<="),
    (TokenKind::GtEq, ">="),
    (TokenKind::AndAnd, "&&"),
    (TokenKind::OrOr, "||"),
    (TokenKind::Bang, "!"),
    (TokenKind::Amp, "&"),
    (TokenKind::Arrow, "->"),
    (TokenKind::LParen, "("),
    (TokenKind::RParen, ")"),
    (TokenKind::LBrace, "{"),
    (TokenKind::RBrace, "}"),
    (TokenKind::LBracket, "["),
    (TokenKind::RBracket, "]"),
    (TokenKind::Comma, ","),
    (TokenKind::Semi, ";"),
    (TokenKind::Colon, ":"),
    (TokenKind::Dot, "."),
    ]
}

#[test]
fn every_token_kind_round_trips() {
    for (expected, snippet) in kind_snippets() {
        let tokens = tokenize(snippet)
            .unwrap_or_else(|e| panic!("snippet {snippet:?} should lex, got {e:?}"));
        assert_eq!(
            tokens.len(),
            2,
            "snippet {snippet:?} should be one token + Eof, got {tokens:?}"
        );
        assert_eq!(tokens[0].kind, expected, "snippet {snippet:?}");
        // The span covers exactly the snippet (byte offsets).
        assert_eq!(
            tokens[0].span,
            Span::new(0, snippet.len()),
            "snippet {snippet:?}"
        );
        assert_eq!(tokens[1].kind, Eof);
    }
}

#[test]
fn kind_table_covers_every_variant() {
    // 5 literal kinds + 14 keywords + 14 type keywords + 21 operators
    // + 10 punctuation = 64 named kinds (Eof is tested separately). The
    // table has extra entries for payload variants (escapes, unicode…),
    // so count *distinct* kinds via their names.
    let snippets = kind_snippets();
    let mut names: Vec<&str> = snippets.iter().map(|(k, _)| k.name()).collect();
    names.sort_unstable();
    names.dedup();
    assert_eq!(names.len(), 64, "every TokenKind variant must be covered");
}

// ---- Eof & trivia ---------------------------------------------------------

#[test]
fn empty_input_is_just_eof() {
    let tokens = tokenize("").unwrap();
    assert_eq!(tokens.len(), 1);
    assert_eq!(tokens[0].kind, Eof);
    assert_eq!(tokens[0].span, Span::point(0));
}

#[test]
fn eof_points_past_the_last_byte() {
    let src = "  // trailing comment\n";
    let tokens = tokenize(src).unwrap();
    assert_eq!(tokens.len(), 1);
    assert_eq!(tokens[0].kind, Eof);
    assert_eq!(tokens[0].span, Span::point(src.len()));
}

#[test]
fn comments_and_whitespace_are_skipped() {
    // line comment
    let tokens = tokenize("// hello\n42").unwrap();
    assert_eq!(tokens[0].kind, Int(42));
    assert_eq!(tokens[0].span, Span::new(9, 11));
    // block comment, across lines, with inner stars
    let tokens = tokenize("/* multi\nline ** with stars */ 7").unwrap();
    assert_eq!(tokens[0].kind, Int(7));
    // both comment forms plus whitespace between real tokens
    let tokens = tokenize("1 /* c */ +\t// x\n2").unwrap();
    let kinds: Vec<&TokenKind> = tokens.iter().map(|t| &t.kind).collect();
    assert_eq!(kinds, vec![&Int(1), &Plus, &Int(2), &Eof]);
    assert_eq!(tokens[1].span, Span::new(10, 11)); // byte 10 is the `+`
}

// ---- spans are byte offsets ------------------------------------------------

#[test]
fn spans_are_byte_offsets_even_with_unicode() {
    // `é` is 2 bytes: the string literal "é" spans bytes 0..4.
    let tokens = tokenize("\"é\"").unwrap();
    assert_eq!(tokens[0].kind, TokenKind::Str("é".into()));
    assert_eq!(tokens[0].span, Span::new(0, 4));
    // A whole line with unicode in it: `str s = "héllo";`
    let src = "str s = \"héllo\";";
    let tokens = tokenize(src).unwrap();
    assert_eq!(tokens[3].kind, TokenKind::Str("héllo".into()));
    // h(1) é(2) l l o(3) = 6 bytes + 2 quotes = 8, starting at byte 8.
    assert_eq!(tokens[3].span, Span::new(8, 16));
    assert_eq!(&src[8..16], "\"héllo\"");
    // `€` is 3 bytes: char literal '€' spans 0..5.
    let tokens = tokenize("'€' x").unwrap();
    assert_eq!(tokens[0].span, Span::new(0, 5));
    assert_eq!(tokens[1].kind, TokenKind::Ident("x".into()));
    assert_eq!(tokens[1].span, Span::new(6, 7));
}

// ---- whole programs --------------------------------------------------------

#[test]
fn a_small_program_lexes_end_to_end() {
    let src = "final i32 MAX = 1_000;\nprint(MAX / 2);\n";
    let tokens = tokenize(src).unwrap();
    let kinds: Vec<&TokenKind> = tokens.iter().map(|t| &t.kind).collect();
    assert_eq!(
        kinds,
        vec![
            &Final,
            &TyI32,
            &TokenKind::Ident("MAX".into()),
            &Assign,
            &Int(1000),
            &Semi,
            &TokenKind::Ident("print".into()),
            &LParen,
            &TokenKind::Ident("MAX".into()),
            &Slash,
            &Int(2),
            &RParen,
            &Semi,
            &Eof,
        ]
    );
}

#[test]
fn the_lexeme_is_always_the_raw_source_slice() {
    let src = "obj o = { retries: 1_000, ok: true }; // done\n";
    let tokens = tokenize(src).unwrap();
    for token in &tokens {
        let raw = &src[token.span.start..token.span.end];
        if matches!(token.kind, Eof) {
            assert!(raw.is_empty(), "Eof lexeme must be empty");
        } else {
            assert!(!raw.is_empty(), "{token:?} must have a non-empty lexeme");
        }
        match &token.kind {
            // string lexemes still carry their quotes
            TokenKind::Str(value) => {
                assert!(raw.starts_with('"') && raw.ends_with('"'), "{token:?}");
                assert_ne!(value.as_str(), raw);
            }
            // `1_000` keeps the underscore in the raw text, not the value
            TokenKind::Int(value) if raw.contains('_') => {
                assert_eq!(value.to_string(), raw.replace('_', ""));
            }
            _ => {}
        }
    }
}

#[test]
fn longest_match_wins_for_operators() {
    let src = "x += 1; y -= 2; p -> i32; a[0] <= b && c || !d & e;";
    let tokens = tokenize(src).unwrap();
    let kinds: Vec<&TokenKind> = tokens.iter().map(|t| &t.kind).collect();
    assert!(kinds.contains(&&PlusAssign));
    assert!(kinds.contains(&&MinusAssign));
    assert!(kinds.contains(&&Arrow));
    assert!(kinds.contains(&&LtEq));
    assert!(kinds.contains(&&AndAnd));
    assert!(kinds.contains(&&OrOr));
    assert!(kinds.contains(&&Bang));
    assert!(kinds.contains(&&Amp)); // a single & is address-of
}

// ---- lex errors: T0 code + label + hint, every time ------------------------

/// Assert `src` fails with exactly this code, and that it teaches:
/// a label pointing at the problem and a hint saying what to do.
fn assert_lex_err(src: &str, code: &str) -> TicError {
    let err = match tokenize(src) {
        Err(err) => err,
        Ok(_) => panic!("`{src}` must fail to lex with {code}"),
    };
    assert_eq!(err.error_code(), code, "source: `{src}`");
    assert!(err.hint().is_some(), "{code} needs a hint");
    assert!(err.label().is_some(), "{code} needs a span label");
    err
}

#[test]
fn unterminated_string_is_t0001() {
    let err = assert_lex_err("\"abc", "T0001");
    assert_eq!(err.label().unwrap().0, Span::new(0, 4));
    // a newline before the closing quote is also unterminated
    assert_lex_err("\"abc\ndef\"", "T0001");
    // a backslash cannot hide the line break
    assert_lex_err("\"abc\\", "T0001");
}

#[test]
fn unterminated_char_is_t0002() {
    assert_lex_err("'a", "T0002");
    assert_lex_err("'a\n", "T0002");
    assert_lex_err("'", "T0002");
}

#[test]
fn empty_char_literal_is_t0003() {
    let err = assert_lex_err("''", "T0003");
    assert_eq!(err.label().unwrap().0, Span::new(0, 2));
}

#[test]
fn multi_char_literal_is_t0004() {
    let err = assert_lex_err("'ab'", "T0004");
    assert_eq!(err.label().unwrap().0, Span::new(0, 4));
    // escape + char is still two characters
    assert_lex_err("'\\na'", "T0004");
}

#[test]
fn unknown_escape_is_t0005() {
    let err = assert_lex_err("\"\\q\"", "T0005");
    assert_eq!(err.label().unwrap().0, Span::new(1, 3)); // just `\q`
    // in char literals too
    assert_lex_err("'\\x'", "T0005");
}

#[test]
fn unknown_character_is_t0006() {
    let err = assert_lex_err("i32 x = ~y;", "T0006");
    let (span, _) = err.label().unwrap();
    assert_eq!(span, Span::new(8, 9));
    assert!(err.hint().unwrap().contains("bitwise"));
    // a lone `|` suggests `||`
    let err = assert_lex_err("a | b", "T0006");
    assert!(err.hint().unwrap().contains("||"));
    // a non-ASCII letter inside a word points at the character
    let err = assert_lex_err("café", "T0006");
    let (span, _) = err.label().unwrap();
    assert_eq!(span, Span::new(3, 5)); // `é` is bytes 3..5
}

#[test]
fn invalid_number_is_t0007() {
    let err = assert_lex_err("1.2.3", "T0007");
    assert_eq!(err.label().unwrap().0, Span::new(0, 5));
    let err = assert_lex_err("123abc", "T0007");
    assert_eq!(err.label().unwrap().0, Span::new(0, 6));
    // underscores must sit between digits
    assert_lex_err("1_", "T0007");
    assert_lex_err("1__0", "T0007");
    assert_lex_err("1_000_", "T0007");
}

#[test]
fn number_too_large_is_t0008() {
    let err = assert_lex_err("9223372036854775808", "T0008"); // i64::MAX + 1
    let (span, _) = err.label().unwrap();
    assert_eq!(span, Span::new(0, 19));
    // an absurd float also overflows to infinity
    assert_lex_err(&format!("{}.0", "9".repeat(400)), "T0008");
}

#[test]
fn reserved_words_are_t0009() {
    let err = assert_lex_err("match x;", "T0009");
    assert_eq!(err.label().unwrap().0, Span::new(0, 5));
    assert!(err.hint().unwrap().contains("different name"));
    for word in ["import", "delete", "map", "private", "static"] {
        assert_lex_err(&format!("{word} x;"), "T0009");
    }
}

#[test]
fn unterminated_comment_is_t0010() {
    let err = assert_lex_err("i32 x = 1; /* oops", "T0010");
    let (span, _) = err.label().unwrap();
    assert_eq!(span, Span::new(11, 18)); // "/* oops" is bytes 11..18
}

// ---- number edge cases that must *not* error -------------------------------

#[test]
fn int_dot_then_word_is_two_tokens_not_a_number() {
    // `arr[0].field` style: `0.` is not a float attempt, so no error.
    let tokens = tokenize("arr[0].x").unwrap();
    let kinds: Vec<&TokenKind> = tokens.iter().map(|t| &t.kind).collect();
    assert_eq!(
        kinds,
        vec![
            &TokenKind::Ident("arr".into()),
            &LBracket,
            &Int(0),
            &RBracket,
            &Dot,
            &TokenKind::Ident("x".into()),
            &Eof,
        ]
    );
}
