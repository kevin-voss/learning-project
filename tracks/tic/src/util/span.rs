//! Source spans (plan §4.4).
//!
//! Every span in Tic is a pair of **byte** offsets into the source text:
//! `start` points at the first byte of the token/text, `end` one byte past
//! the last. Byte (not char) offsets are deliberate — miette resolves
//! spans as byte offsets, so a char-based span would underline the wrong
//! place in any file containing non-ASCII text.

use std::fmt;

/// A half-open range of byte offsets: `[start, end)`. `Hash` so later
/// phases can key side tables (e.g. expression types) by span.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Span {
    /// Byte offset of the first character.
    pub start: usize,
    /// Byte offset one past the last character.
    pub end: usize,
}

impl Span {
    pub fn new(start: usize, end: usize) -> Self {
        Self { start, end }
    }

    /// The empty span at `at` — used for `Eof` and "insert something here"
    /// points in later phases.
    pub fn point(at: usize) -> Self {
        Self { start: at, end: at }
    }

    /// Length in bytes (always `end - start`).
    pub fn len(&self) -> usize {
        self.end - self.start
    }

    pub fn is_empty(&self) -> bool {
        self.end == self.start
    }

    /// The smallest span covering both `self` and `other` — how later
    /// phases span a whole expression from its parts.
    pub fn to(self, other: Span) -> Span {
        Span {
            start: self.start.min(other.start),
            end: self.end.max(other.end),
        }
    }
}

impl fmt::Display for Span {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}..{}", self.start, self.end)
    }
}

#[cfg(test)]
mod tests {
    use super::Span;

    #[test]
    fn new_and_len() {
        let s = Span::new(3, 8);
        assert_eq!(s.len(), 5);
        assert!(!s.is_empty());
        assert_eq!((s.start, s.end), (3, 8));
    }

    #[test]
    fn point_is_empty() {
        let s = Span::point(42);
        assert!(s.is_empty());
        assert_eq!(s.len(), 0);
        assert_eq!((s.start, s.end), (42, 42));
    }

    #[test]
    fn to_returns_the_union() {
        let a = Span::new(10, 20);
        let b = Span::new(5, 12);
        assert_eq!(a.to(b), Span::new(5, 20));
        // works in both orders
        assert_eq!(b.to(a), Span::new(5, 20));
        // an empty point inside is swallowed
        assert_eq!(a.to(Span::point(15)), Span::new(10, 20));
    }

    #[test]
    fn displays_as_start_dot_dot_end() {
        assert_eq!(Span::new(7, 9).to_string(), "7..9");
        assert_eq!(Span::point(4).to_string(), "4..4");
    }
}
