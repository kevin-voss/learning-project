//! Hand-rolled scanner (plan §5.1).
//!
//! One deliberate adjustment to the plan: we iterate over `char`s for
//! convenience but track **byte** offsets for every [`Span`], because
//! miette resolves spans as byte offsets — a char-based span would point
//! at the wrong place in any file containing non-ASCII text (§4.4 wins
//! over §5.1).
//!
//! The scanner stops at the first lex error: everything after an
//! unterminated string is guesswork. Showing *all* errors at once is the
//! parser's job (§5.2, phase 2).

mod keywords;
mod token;

#[cfg(test)]
mod tests;

pub use token::{Token, TokenKind};

use crate::diagnostics::TicError;
use crate::util::Span;

/// Tokenize a whole source file. `Err` = the first lex error (T0xxx).
pub fn tokenize(src: &str) -> Result<Vec<Token>, TicError> {
    Lexer::new(src).scan()
}

/// The scanner. `pos` is always a byte offset on a UTF-8 boundary.
pub struct Lexer<'src> {
    src: &'src str,
    pos: usize,
}

/// What an escape sequence decoded to, or `End` when the input (or the
/// line) ended right after the backslash — the caller knows whether that
/// means an unterminated string or char literal.
enum Esc {
    Ch(char),
    End,
}

impl<'src> Lexer<'src> {
    pub fn new(src: &'src str) -> Self {
        Self { src, pos: 0 }
    }

    pub fn scan(mut self) -> Result<Vec<Token>, TicError> {
        let mut tokens = Vec::new();
        loop {
            self.skip_trivia()?;
            let start = self.pos;
            let Some(c) = self.peek() else {
                tokens.push(Token::new(TokenKind::Eof, Span::point(start)));
                return Ok(tokens);
            };
            let kind = match c {
                '0'..='9' => self.number(start)?,
                'a'..='z' | 'A'..='Z' | '_' => self.ident(start)?,
                '"' => self.string(start)?,
                '\'' => self.char_literal(start)?,
                _ => self.punct(c)?,
            };
            tokens.push(Token::new(kind, Span::new(start, self.pos)));
        }
    }

    // ---- cursor helpers -----------------------------------------------

    /// The `char` at the cursor, if any.
    fn peek(&self) -> Option<char> {
        self.src[self.pos..].chars().next()
    }

    /// The `char` *after* the one at the cursor.
    fn peek_second(&self) -> Option<char> {
        let first = self.peek()?;
        self.src[self.pos + first.len_utf8()..].chars().next()
    }

    // ---- trivia ---------------------------------------------------------

    /// Skip whitespace and both comment forms (§2). Block comments do not
    /// nest — the first `*/` closes, exactly like C.
    fn skip_trivia(&mut self) -> Result<(), TicError> {
        loop {
            match self.peek() {
                // Whitespace; a leading byte-order mark is ignorable too.
                Some(c) if c.is_whitespace() || c == '\u{FEFF}' => self.pos += c.len_utf8(),
                // `//` runs to the end of the line.
                Some('/') if self.peek_second() == Some('/') => {
                    while let Some(c) = self.peek() {
                        if c == '\n' {
                            break;
                        }
                        self.pos += c.len_utf8();
                    }
                }
                // `/* … */` may span lines.
                Some('/') if self.peek_second() == Some('*') => {
                    let start = self.pos;
                    self.pos += 2; // consume "/*"
                    loop {
                        match self.peek() {
                            Some('*') if self.peek_second() == Some('/') => {
                                self.pos += 2; // consume "*/"
                                break;
                            }
                            Some(c) => self.pos += c.len_utf8(),
                            None => {
                                return Err(TicError::UnterminatedComment {
                                    span: Span::new(start, self.pos),
                                })
                            }
                        }
                    }
                }
                _ => return Ok(()),
            }
        }
    }

    // ---- numbers ----------------------------------------------------------

    /// `42`, `1_000`, `3.14` — underscores go *between* digits, at most one
    /// decimal point, and a number glued to a letter (`123abc`) or a second
    /// decimal point (`1.2.3`) is an error, not two tokens.
    fn number(&mut self, start: usize) -> Result<TokenKind, TicError> {
        let mut is_float = false;
        self.digit_run();
        if self.peek() == Some('.') && self.peek_second().is_some_and(|c| c.is_ascii_digit()) {
            is_float = true;
            self.pos += 1; // the '.'
            self.digit_run();
        }
        // A second `.digit` right after means `1.2.3` — never two tokens.
        if self.peek() == Some('.') && self.peek_second().is_some_and(|c| c.is_ascii_digit()) {
            self.pos += 1;
            self.digit_run();
            return Err(self.invalid_number(start));
        }
        // A number glued to a word means `123abc`.
        if matches!(self.peek(), Some(c) if c.is_ascii_alphabetic() || c == '_') {
            while matches!(self.peek(), Some(c) if c.is_ascii_alphanumeric() || c == '_') {
                self.pos += 1;
            }
            return Err(self.invalid_number(start));
        }
        // Underscores are pure readability — strip them before parsing.
        let text: String = self.src[start..self.pos]
            .chars()
            .filter(|c| *c != '_')
            .collect();
        if is_float {
            let value: f64 = text.parse().unwrap_or(f64::INFINITY);
            if value.is_finite() {
                Ok(TokenKind::Float(value))
            } else {
                Err(TicError::NumberTooLarge {
                    span: Span::new(start, self.pos),
                    text: self.src[start..self.pos].to_string(),
                })
            }
        } else {
            text.parse::<i64>().map(TokenKind::Int).map_err(|_| TicError::NumberTooLarge {
                span: Span::new(start, self.pos),
                text: self.src[start..self.pos].to_string(),
            })
        }
    }

    /// Digits with `_` separators. A trailing or doubled `_` stops the run;
    /// the caller's "glued to a word" check turns that into an error.
    fn digit_run(&mut self) {
        loop {
            match self.peek() {
                Some(c) if c.is_ascii_digit() => self.pos += 1,
                Some('_') if self.peek_second().is_some_and(|c| c.is_ascii_digit()) => self.pos += 1,
                _ => return,
            }
        }
    }

    fn invalid_number(&self, start: usize) -> TicError {
        TicError::InvalidNumber {
            span: Span::new(start, self.pos),
            text: self.src[start..self.pos].to_string(),
        }
    }

    // ---- identifiers & keywords --------------------------------------

    /// ASCII letters, digits and `_`, starting with a letter or `_`.
    /// Keywords (§2.2) and reserved-for-future words never become idents.
    fn ident(&mut self, start: usize) -> Result<TokenKind, TicError> {
        while matches!(self.peek(), Some(c) if c.is_ascii_alphanumeric() || c == '_') {
            self.pos += 1;
        }
        let word = &self.src[start..self.pos];
        if let Some(kind) = keywords::lookup(word) {
            return Ok(kind);
        }
        if keywords::RESERVED_FOR_FUTURE.contains(&word) {
            return Err(TicError::ReservedWord {
                span: Span::new(start, self.pos),
                word: word.to_string(),
            });
        }
        // A non-ASCII letter glued to the word (`café`) is not an ident
        // continuation — flag the exact character, not the whole word.
        if let Some(c) = self.peek() {
            if c.is_alphanumeric() {
                return Err(TicError::UnknownCharacter {
                    span: Span::new(self.pos, self.pos + c.len_utf8()),
                    ch: c,
                });
            }
        }
        Ok(TokenKind::Ident(word.to_string()))
    }

    // ---- strings & chars ------------------------------------------------

    /// `"…"` with escapes `\n \t \r \0 \\ \" \'`. Cannot span lines.
    fn string(&mut self, start: usize) -> Result<TokenKind, TicError> {
        self.pos += 1; // opening quote
        let mut value = String::new();
        loop {
            match self.peek() {
                None | Some('\n') | Some('\r') => {
                    return Err(TicError::UnterminatedString {
                        span: Span::new(start, self.pos),
                    })
                }
                Some('"') => {
                    self.pos += 1;
                    return Ok(TokenKind::Str(value));
                }
                Some('\\') => match self.escape()? {
                    Esc::Ch(c) => value.push(c),
                    Esc::End => {
                        return Err(TicError::UnterminatedString {
                            span: Span::new(start, self.pos),
                        })
                    }
                },
                Some(c) => {
                    value.push(c);
                    self.pos += c.len_utf8();
                }
            }
        }
    }

    /// `'A'`, `'\n'`, `'é'` — exactly one character between the quotes.
    fn char_literal(&mut self, start: usize) -> Result<TokenKind, TicError> {
        self.pos += 1; // opening quote
        if self.peek() == Some('\'') {
            self.pos += 1;
            return Err(TicError::EmptyCharLiteral {
                span: Span::new(start, self.pos),
            });
        }
        let content = match self.peek() {
            None | Some('\n') | Some('\r') => {
                return Err(TicError::UnterminatedChar {
                    span: Span::new(start, self.pos),
                })
            }
            Some('\\') => match self.escape()? {
                Esc::Ch(c) => c,
                Esc::End => {
                    return Err(TicError::UnterminatedChar {
                        span: Span::new(start, self.pos),
                    })
                }
            },
            Some(c) => {
                self.pos += c.len_utf8();
                c
            }
        };
        match self.peek() {
            Some('\'') => {
                self.pos += 1;
                Ok(TokenKind::Char(content))
            }
            None | Some('\n') | Some('\r') => Err(TicError::UnterminatedChar {
                span: Span::new(start, self.pos),
            }),
            // More content before the closing quote: consume it so the
            // error span covers the whole literal.
            Some(_) => {
                while let Some(c) = self.peek() {
                    if c == '\'' || c == '\n' {
                        break;
                    }
                    self.pos += c.len_utf8();
                }
                if self.peek() == Some('\'') {
                    self.pos += 1;
                }
                Err(TicError::MultiCharLiteral {
                    span: Span::new(start, self.pos),
                })
            }
        }
    }

    /// Decode the escape at the cursor. The cursor sits on the `\`.
    fn escape(&mut self) -> Result<Esc, TicError> {
        let start = self.pos;
        self.pos += 1; // the backslash
        let Some(c) = self.peek() else {
            return Ok(Esc::End); // backslash is the very last byte
        };
        // A line ending right after `\` means the literal never closed.
        if c == '\n' || c == '\r' {
            return Ok(Esc::End);
        }
        self.pos += c.len_utf8();
        let ch = match c {
            'n' => '\n',
            't' => '\t',
            'r' => '\r',
            '0' => '\0',
            '\\' => '\\',
            '"' => '"',
            '\'' => '\'',
            _ => {
                return Err(TicError::UnknownEscape {
                    span: Span::new(start, self.pos),
                    ch: c,
                })
            }
        };
        Ok(Esc::Ch(ch))
    }

    // ---- operators & punctuation ---------------------------------------

    /// Longest-match first: the two-character operators, then singles.
    fn punct(&mut self, c: char) -> Result<TokenKind, TicError> {
        if let Some(second) = self.peek_second() {
            let pair = match (c, second) {
                ('+', '=') => Some(TokenKind::PlusAssign),
                ('-', '=') => Some(TokenKind::MinusAssign),
                ('*', '=') => Some(TokenKind::StarAssign),
                ('/', '=') => Some(TokenKind::SlashAssign),
                ('-', '>') => Some(TokenKind::Arrow),
                ('=', '=') => Some(TokenKind::EqEq),
                ('!', '=') => Some(TokenKind::NotEq),
                ('<', '=') => Some(TokenKind::LtEq),
                ('>', '=') => Some(TokenKind::GtEq),
                ('&', '&') => Some(TokenKind::AndAnd),
                ('|', '|') => Some(TokenKind::OrOr),
                _ => None,
            };
            if let Some(kind) = pair {
                self.pos += 2;
                return Ok(kind);
            }
        }
        let kind = match c {
            '+' => TokenKind::Plus,
            '-' => TokenKind::Minus,
            '*' => TokenKind::Star,
            '/' => TokenKind::Slash,
            '%' => TokenKind::Percent,
            '=' => TokenKind::Assign,
            '!' => TokenKind::Bang,
            '<' => TokenKind::Lt,
            '>' => TokenKind::Gt,
            '&' => TokenKind::Amp, // address-of (§2.3); `&&` matched above
            '.' => TokenKind::Dot,
            ',' => TokenKind::Comma,
            ';' => TokenKind::Semi,
            ':' => TokenKind::Colon,
            '(' => TokenKind::LParen,
            ')' => TokenKind::RParen,
            '{' => TokenKind::LBrace,
            '}' => TokenKind::RBrace,
            '[' => TokenKind::LBracket,
            ']' => TokenKind::RBracket,
            _ => {
                return Err(TicError::UnknownCharacter {
                    span: Span::new(self.pos, self.pos + c.len_utf8()),
                    ch: c,
                })
            }
        };
        self.pos += c.len_utf8();
        Ok(kind)
    }
}
