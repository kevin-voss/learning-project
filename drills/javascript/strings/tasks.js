/**
 * JavaScript drill: strings (read README.md first)
 * Run the tests from the project folder: make strings | make strings-task-02
 *
 * Stuck for more than 10 minutes? Peek at solutions.js.
 */

/**
 * Task 1 — Does the text contain a piece?
 *
 * **Your job:** Check if `fragment` appears somewhere in `text`.
 * **You get:** `text` (the text to search) and `fragment` (the piece you look for).
 * **How:** Use `text.includes(fragment)`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make strings-task-01`
 *
 * @example containsText("hello", "ll") // → true
 * @example containsText("hello", "x") // → false
 */
export function containsText(text, fragment) {
  // TODO: write your code here
  return false;
}

/**
 * Task 2 — Does the text start with …?
 *
 * **Your job:** Check if `text` starts with `prefix`.
 * **You get:** `text` and `prefix` (two strings).
 * **How:** Use `text.startsWith(prefix)`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make strings-task-02`
 *
 * @example startsWithText("Hello", "Hel") // → true
 */
export function startsWithText(text, prefix) {
  // TODO: write your code here
  return false;
}

/**
 * Task 3 — Does the text end with …?
 *
 * **Your job:** Check if `text` ends with `suffix`.
 * **You get:** `text` and `suffix` (two strings).
 * **How:** Use `text.endsWith(suffix)`.
 * **Returns:** `true` or `false`.
 *
 * **Test it:** `make strings-task-03`
 *
 * @example endsWithText("Hello", "llo") // → true
 */
export function endsWithText(text, suffix) {
  // TODO: write your code here
  return false;
}

/**
 * Task 4 — Small letters
 *
 * **Your job:** Return the text in small letters only.
 * **You get:** `text` (a string).
 * **How:** Use `text.toLowerCase()`. It gives you a new string; `text` stays the same.
 * **Returns:** A new string in small letters.
 *
 * **Test it:** `make strings-task-04`
 *
 * @example toLowerCaseCopy("Hi") // → "hi"
 */
export function toLowerCaseCopy(text) {
  // TODO: write your code here
  return "";
}

/**
 * Task 5 — Capital letters
 *
 * **Your job:** Return the text in capital letters only.
 * **You get:** `text` (a string).
 * **How:** Use `text.toUpperCase()`.
 * **Returns:** A new string in capital letters.
 *
 * **Test it:** `make strings-task-05`
 *
 * @example toUpperCaseCopy("hi") // → "HI"
 */
export function toUpperCaseCopy(text) {
  // TODO: write your code here
  return "";
}

/**
 * Task 6 — Cut off spaces
 *
 * **Your job:** Remove the spaces at the start and at the end of a text.
 * **You get:** `text` (a string).
 * **How:** Use `text.trim()`.
 * **Returns:** A string with no spaces at the start or end.
 *
 * **Test it:** `make strings-task-06`
 *
 * @example trimWhitespace("  a  ") // → "a"
 */
export function trimWhitespace(text) {
  // TODO: write your code here
  return "";
}

/**
 * Task 7 — Dashes instead of spaces
 *
 * **Your job:** Replace every space with a dash (`-`).
 * **You get:** `text` (a string).
 * **How:** Use `text.replaceAll(" ", "-")`.
 * **Returns:** A string with dashes where the spaces were.
 *
 * **Test it:** `make strings-task-07`
 *
 * @example dashInsteadOfSpaces("a b c") // → "a-b-c"
 */
export function dashInsteadOfSpaces(text) {
  // TODO: write your code here
  return "";
}

/**
 * Task 8 — The last letter
 *
 * **Your job:** Return the last character of a text.
 * **You get:** `text` (a string, never empty).
 * **How:** Letters are numbered from 0. `text[0]` is the first one.
 *   The last one sits at number `text.length - 1`, so use `text[text.length - 1]`.
 * **Returns:** A string with one character.
 *
 * **Test it:** `make strings-task-08`
 *
 * @example lastCharacter("hello") // → "o"
 * @example lastCharacter("a") // → "a"
 */
export function lastCharacter(text) {
  // TODO: write your code here
  return "";
}

/**
 * Task 9 — The first three characters
 *
 * **Your job:** Cut out the first three characters of a text.
 * **You get:** `text` (a string).
 * **How:** Use `text.slice(0, 3)`: start at 0, stop before 3.
 *   If the text is shorter than 3, `slice` gives you the whole text.
 * **Returns:** A string with 3 characters or fewer.
 *
 * **Test it:** `make strings-task-09`
 *
 * @example firstThreeChars("abcdef") // → "abc"
 * @example firstThreeChars("ab") // → "ab"
 */
export function firstThreeChars(text) {
  // TODO: write your code here
  return "";
}

/**
 * Task 10 — Capital first letter
 *
 * **Your job:** Make the first letter a capital. Keep the rest as it is.
 * **You get:** `word` (a string in small letters, never empty).
 * **How:** Take the first letter with `word[0]` and make it big with `.toUpperCase()`.
 *   Take the rest with `word.slice(1)`. Glue both parts together with `+`.
 * **Returns:** A new string.
 *
 * **Test it:** `make strings-task-10`
 *
 * @example capitalizeWord("anna") // → "Anna"
 * @example capitalizeWord("hello") // → "Hello"
 */
export function capitalizeWord(word) {
  // TODO: write your code here
  return "";
}
