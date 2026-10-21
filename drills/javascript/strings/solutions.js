/**
 * JavaScript drill: strings (solutions)
 *
 * One possible answer for every task in tasks.js.
 * Try on your own first. Read here when you are stuck.
 */

export function containsText(text, fragment) {
  return text.includes(fragment);
}

export function startsWithText(text, prefix) {
  return text.startsWith(prefix);
}

export function endsWithText(text, suffix) {
  return text.endsWith(suffix);
}

export function toLowerCaseCopy(text) {
  return text.toLowerCase();
}

export function toUpperCaseCopy(text) {
  return text.toUpperCase();
}

export function trimWhitespace(text) {
  return text.trim();
}

export function dashInsteadOfSpaces(text) {
  return text.replaceAll(" ", "-");
}

export function lastCharacter(text) {
  return text[text.length - 1];
  // Also works: return text.slice(-1);
}

export function firstThreeChars(text) {
  return text.slice(0, 3); // start at 0, stop before 3
}

export function capitalizeWord(word) {
  const first = word[0].toUpperCase();
  const rest = word.slice(1);
  return first + rest;
}
