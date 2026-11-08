//! "Did you mean…" hints (plan §5.6).
//!
//! A hand-rolled two-row Levenshtein distance — no dependency needed for
//! something this small — plus [`did_you_mean`], which later phases use to
//! suggest identifier, field, enum-variant and builtin names.

/// Classic Levenshtein edit distance (insert / delete / substitute),
/// counted over `char`s so non-ASCII names behave sensibly.
pub fn levenshtein(a: &str, b: &str) -> usize {
    let a: Vec<char> = a.chars().collect();
    let b: Vec<char> = b.chars().collect();
    if a.is_empty() {
        return b.len();
    }
    if b.is_empty() {
        return a.len();
    }
    // `prev` is the previous row of the DP table, `curr` the one being built.
    let mut prev: Vec<usize> = (0..=b.len()).collect();
    let mut curr: Vec<usize> = vec![0; b.len() + 1];
    for (i, ca) in a.iter().enumerate() {
        curr[0] = i + 1;
        for (j, cb) in b.iter().enumerate() {
            let cost = usize::from(ca != cb);
            curr[j + 1] = (prev[j + 1] + 1) // deletion
                .min(curr[j] + 1) // insertion
                .min(prev[j] + cost); // substitution / match
        }
        std::mem::swap(&mut prev, &mut curr);
    }
    prev[b.len()]
}

/// The candidate closest to `input` within a small edit distance,
/// or `None` when nothing is close enough to be a useful guess.
///
/// An exact match is filtered out (nothing to suggest), and the tolerance
/// grows a little with the length of the input — a typo in a long name
/// deserves more slack than one in a two-letter name.
pub fn did_you_mean(input: &str, candidates: &[&str]) -> Option<String> {
    let threshold = match input.chars().count() {
        0..=3 => 1,
        4..=8 => 2,
        _ => 3,
    };
    candidates
        .iter()
        .filter(|c| **c != input)
        .map(|c| (levenshtein(input, c), *c))
        .filter(|(distance, _)| *distance <= threshold)
        .min_by_key(|(distance, _)| *distance) // ties keep candidate order
        .map(|(_, candidate)| candidate.to_string())
}

#[cfg(test)]
mod tests {
    use super::{did_you_mean, levenshtein};

    const KEYWORD_ISH: [&str; 4] = ["if", "else", "for", "function"];

    #[test]
    fn levenshtein_basics() {
        assert_eq!(levenshtein("", ""), 0);
        assert_eq!(levenshtein("abc", "abc"), 0);
        assert_eq!(levenshtein("", "abc"), 3);
        assert_eq!(levenshtein("abc", ""), 3);
        assert_eq!(levenshtein("kitten", "sitting"), 3);
        assert_eq!(levenshtein("flaw", "lawn"), 2);
        assert_eq!(levenshtein("print", "prnt"), 1);
    }

    #[test]
    fn levenshtein_counts_chars_not_bytes() {
        // "é" is two bytes but one char: distance is per character.
        assert_eq!(levenshtein("café", "cafe"), 1);
        assert_eq!(levenshtein("€", "e"), 1);
    }

    #[test]
    fn suggests_the_closest_candidate() {
        assert_eq!(did_you_mean("iff", &KEYWORD_ISH).as_deref(), Some("if"));
        assert_eq!(did_you_mean("functio", &KEYWORD_ISH).as_deref(), Some("function"));
        assert_eq!(did_you_mean("esle", &KEYWORD_ISH).as_deref(), Some("else"));
    }

    #[test]
    fn stays_quiet_when_nothing_is_close() {
        assert_eq!(did_you_mean("zzzzzz", &KEYWORD_ISH), None);
        assert_eq!(did_you_mean("x", &[]), None);
        assert_eq!(did_you_mean("", &KEYWORD_ISH), None);
    }

    #[test]
    fn exact_match_needs_no_hint() {
        assert_eq!(did_you_mean("if", &KEYWORD_ISH), None);
    }

    #[test]
    fn short_words_get_less_slack() {
        // 2 edits away from a 3-letter word: too far to be a confident guess.
        assert_eq!(did_you_mean("ift", &["iff", "if"]).as_deref(), Some("iff"));
        assert_eq!(did_you_mean("xyz", &["abc"]), None);
    }
}
