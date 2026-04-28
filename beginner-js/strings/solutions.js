/**
 * JavaScript-Übungen — Thema: Strings (Lösungen)
 * 
 * Hier findest du die Lösungen zu den Aufgaben in tasks.js.
 * Nutze diese Datei als Hilfestellung, wenn du nicht weiterkommst.
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

export function characterCount(text) {
  return text.length;
}

export function firstThreeChars(text) {
  return text.slice(0, 3);
}

export function isPalindromeText(text) {
  const reversed = text.split("").reverse().join("");
  return text === reversed;
}
