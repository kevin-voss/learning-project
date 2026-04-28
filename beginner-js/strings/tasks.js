/**
 * JavaScript-Übungen — Thema: Strings (siehe README.md)
 * Testen: make strings | make strings-task-02
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Enthält der Text ein Teilstück?
 *
 * **Deine Aufgabe:** Prüfe, ob ein bestimmtes Textstück in einem Text enthalten ist.
 * **Bereits deklariert:** Die Parameter `text` (der zu durchsuchende Text) und `fragment` (das gesuchte Textstück).
 * **Wie es funktioniert:** Nutze die Methode `.includes(fragment)` auf dem String.
 * **Erwartung:** `true` oder `false`.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-01`
 *
 * @example containsText("hallo", "ll") // → true
 * @example containsText("hallo", "x") // → false
 */
export function containsText(text, fragment) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 2 — Beginnt der Text mit …?
 *
 * **Deine Aufgabe:** Prüfe, ob ein Text mit einem bestimmten Präfix beginnt.
 * **Bereits deklariert:** Die Parameter `text` (der Text) und `prefix` (das gesuchte Präfix).
 * **Wie es funktioniert:** Nutze die Methode `.startsWith(prefix)` auf dem String.
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-02`
 *
 * @example startsWithText("Hallo", "Hal") // → true
 */
export function startsWithText(text, prefix) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 3 — Endet der Text mit …?
 *
 * **Deine Aufgabe:** Prüfe, ob ein Text mit einem bestimmten Suffix endet.
 * **Bereits deklariert:** Die Parameter `text` (der Text) und `suffix` (das gesuchte Suffix).
 * **Wie es funktioniert:** Nutze die Methode `.endsWith(suffix)` auf dem String.
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-03`
 *
 * @example endsWithText("Hallo", "llo") // → true
 */
export function endsWithText(text, suffix) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 4 — Kleinschreibung (Kopie)
 *
 * **Deine Aufgabe:** Wandle einen Text komplett in Kleinbuchstaben um.
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Nutze die Methode `.toLowerCase()` auf dem String. Das Original wird dabei nicht verändert.
 * **Erwartung:** Neuer String nur in Kleinbuchstaben.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-04`
 *
 * @example toLowerCaseCopy("Hi") // → "hi"
 */
export function toLowerCaseCopy(text) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 5 — Großschreibung (Kopie)
 *
 * **Deine Aufgabe:** Wandle einen Text komplett in Großbuchstaben um.
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Nutze die Methode `.toUpperCase()` auf dem String.
 * **Erwartung:** Neuer String in Großbuchstaben.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-05`
 *
 * @example toUpperCaseCopy("hi") // → "HI"
 */
export function toUpperCaseCopy(text) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 6 — Leerzeichen abschneiden
 *
 * **Deine Aufgabe:** Entferne alle Leerzeichen am Anfang und am Ende eines Textes.
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Nutze die Methode `.trim()` auf dem String.
 * **Erwartung:** String ohne führende/nachgestellte Leerzeichen.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-06`
 *
 * @example trimWhitespace("  a  ") // → "a"
 */
export function trimWhitespace(text) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 7 — Leerzeichen durch Bindestrich
 *
 * **Deine Aufgabe:** Ersetze alle Leerzeichen in einem Text durch Bindestriche (`-`).
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Nutze die Methode `.replaceAll(" ", "-")` auf dem String.
 * **Erwartung:** String ohne Leerzeichen an diesen Stellen.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-07`
 *
 * @example dashInsteadOfSpaces("a b c") // → "a-b-c"
 */
export function dashInsteadOfSpaces(text) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 8 — Zeichen zählen
 *
 * **Deine Aufgabe:** Finde heraus, wie viele Zeichen ein Text hat.
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Frage die Eigenschaft `.length` des Strings ab.
 * **Erwartung:** Ganze Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-08`
 *
 * @example characterCount("abc") // → 3
 */
export function characterCount(text) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 9 — Erste drei Zeichen
 *
 * **Deine Aufgabe:** Schneide die ersten drei Zeichen eines Textes aus.
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Nutze die Methode `.slice(0, 3)` auf dem String. Wenn der Text kürzer als 3 Zeichen ist, wird der ganze Text zurückgegeben.
 * **Erwartung:** String der Länge ≤ 3.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-09`
 *
 * @example firstThreeChars("abcdef") // → "abc"
 * @example firstThreeChars("ab") // → "ab"
 */
export function firstThreeChars(text) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 10 — Palindrome
 *
 * **Deine Aufgabe:** Prüfe, ob ein Text ein Palindrom ist (vorwärts und rückwärts gleich gelesen).
 * **Bereits deklariert:** Der Parameter `text` (ein String).
 * **Wie es funktioniert:** Wandle den String in ein Array um (`.split("")`), drehe das Array um (`.reverse()`), füge es wieder zu einem String zusammen (`.join("")`) und vergleiche es mit dem Originaltext.
 * **Erwartung:** Boolean. Tests nur mit einfachen Kleinbuchstaben ohne Leerzeichen.
 *
 * **Test im Terminal (Projektroot):** `make strings-task-10`
 *
 * @example isPalindromeText("anna") // → true
 * @example isPalindromeText("hallo") // → false
 */
export function isPalindromeText(text) {
  // TODO: Implementiere die Logik hier
  return false;
}
