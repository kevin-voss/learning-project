/**
 * JavaScript-Übungen — Thema: Schleifen (siehe README.md)
 * Testen: make loops | make loops-task-03
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Summe von 1 bis n
 *
 * **Deine Aufgabe:** Addiere alle Zahlen von 1 bis `n`.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl ≥ 0).
 * **Wie es funktioniert:** Nutze eine `for`-Schleife, die von 1 bis `n` läuft, und addiere in jedem Schritt die Schleifenvariable zu einer Summen-Variable. Für `n === 0` soll das Ergebnis `0` sein.
 * **Erwartung:** Ganze Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-01`
 *
 * @example sumFromOneToN(4) // → 10
 * @example sumFromOneToN(0) // → 0
 */
export function sumFromOneToN(n) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 2 — Zeichen wiederholen
 *
 * **Deine Aufgabe:** Erstelle einen String, der aus einem bestimmten Zeichen besteht, das `count`-mal wiederholt wird.
 * **Bereits deklariert:** Die Parameter `ch` (das Zeichen) und `count` (die Anzahl der Wiederholungen).
 * **Wie es funktioniert:** Nutze eine `for`-Schleife, die `count`-mal läuft, und hänge in jedem Schritt `ch` an eine String-Variable an (`count === 0` → `""`).
 * **Erwartung:** String.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-02`
 *
 * @example repeatCharacter("a", 3) // → "aaa"
 */
export function repeatCharacter(ch, count) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 3 — Buchstaben zählen
 *
 * **Deine Aufgabe:** Zähle, wie oft ein bestimmtes Zeichen in einem Text vorkommt.
 * **Bereits deklariert:** Die Parameter `str` (der Text) und `ch` (das gesuchte Zeichen).
 * **Wie es funktioniert:** Nutze eine Schleife, um über alle Zeichen von `str` zu iterieren (`str.length`). Wenn das aktuelle Zeichen gleich `ch` ist, erhöhe einen Zähler.
 * **Erwartung:** Ganze Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-03`
 *
 * @example countInString("banana", "a") // → 3
 */
export function countInString(str, ch) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 4 — Erster Index oder -1
 *
 * **Deine Aufgabe:** Finde den Index des ersten Vorkommens eines Wertes in einem Array.
 * **Bereits deklariert:** Die Parameter `arr` (das Array) und `val` (der gesuchte Wert).
 * **Wie es funktioniert:** Nutze eine Schleife, um über das Array zu iterieren. Wenn `arr[i] === val` ist, gib `i` zurück. Wenn die Schleife durchläuft, ohne den Wert zu finden, gib `-1` zurück.
 * **Erwartung:** Ganze Zahl ≥ -1.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-04`
 *
 * @example indexOfInArray([1, 2, 3], 2) // → 1
 * @example indexOfInArray([1, 2, 3], 9) // → -1
 */
export function indexOfInArray(arr, val) {
  // TODO: Implementiere die Logik hier
  return -1;
}

/**
 * Aufgabe 5 — Produkt von 1 bis n
 *
 * **Deine Aufgabe:** Multipliziere alle Zahlen von 1 bis `n`.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl ≥ 0).
 * **Wie es funktioniert:** Nutze eine Schleife, die von 1 bis `n` läuft, und multipliziere die Schleifenvariable mit einer Produkt-Variable (die mit 1 initialisiert sein sollte). Für `n === 0` → `1` (leeres Produkt).
 * **Erwartung:** Ganze Zahl ≥ 1 für n≥0 in den Tests.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-05`
 *
 * @example productFromOneToN(4) // → 24
 * @example productFromOneToN(0) // → 1
 */
export function productFromOneToN(n) {
  // TODO: Implementiere die Logik hier
  return 1;
}

/**
 * Aufgabe 6 — Array-Summe (Schleife)
 *
 * **Deine Aufgabe:** Berechne die Summe aller Zahlen in einem Array.
 * **Bereits deklariert:** Der Parameter `arr` (ein Array von Zahlen).
 * **Wie es funktioniert:** Nutze eine Schleife, um über das Array zu iterieren, und addiere jedes Element zu einer Summen-Variable. Ein leeres Array ergibt `0`.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-06`
 *
 * @example sumArrayFor([1, 2, 3]) // → 6
 */
export function sumArrayFor(arr) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 7 — String umdrehen (Schleife)
 *
 * **Deine Aufgabe:** Drehe einen Text um (von hinten nach vorne).
 * **Bereits deklariert:** Der Parameter `str` (ein String).
 * **Wie es funktioniert:** Nutze eine Schleife, die rückwärts über den String läuft (von `str.length - 1` bis `0`), und hänge jedes Zeichen an einen neuen String an. Nutze keine eingebauten Methoden wie `split/reverse/join`.
 * **Erwartung:** String.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-07`
 *
 * @example reverseStringFor("abc") // → "cba"
 */
export function reverseStringFor(str) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 8 — Countdown-Array
 *
 * **Deine Aufgabe:** Erstelle ein Array, das von `n` bis 1 herunterzählt.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl ≥ 0).
 * **Wie es funktioniert:** Nutze eine Schleife, die von `n` bis 1 rückwärts läuft, und füge jede Zahl mit `.push()` zu einem Array hinzu. Für `n === 0` → `[]`.
 * **Erwartung:** Array von Zahlen.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-08`
 *
 * @example countdownArrayFor(3) // → [3, 2, 1]
 */
export function countdownArrayFor(n) {
  // TODO: Implementiere die Logik hier
  return [];
}

/**
 * Aufgabe 9 — Gerade Zahl vorhanden?
 *
 * **Deine Aufgabe:** Prüfe, ob mindestens eine gerade Zahl im Array vorhanden ist.
 * **Bereits deklariert:** Der Parameter `arr` (ein Array von Zahlen).
 * **Wie es funktioniert:** Nutze eine Schleife. Wenn ein Element durch 2 teilbar ist (`% 2 === 0`), gib sofort `true` zurück. Wenn die Schleife durchläuft, ohne eine gerade Zahl zu finden, gib `false` zurück.
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-09`
 *
 * @example hasEvenFor([1, 3, 4]) // → true
 */
export function hasEvenFor(arr) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 10 — Sterne-Zeile
 *
 * **Deine Aufgabe:** Erstelle einen String, der aus `n` Sternen (`*`) besteht.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl ≥ 0).
 * **Wie es funktioniert:** Nutze eine Schleife, die `n`-mal läuft, und hänge in jedem Schritt ein `*` an einen String an. Für `n === 0` → `""`.
 * **Erwartung:** String.
 *
 * **Test im Terminal (Projektroot):** `make loops-task-10`
 *
 * @example stringOfStars(3) // → "***"
 */
export function stringOfStars(n) {
  // TODO: Implementiere die Logik hier
  return "";
}
