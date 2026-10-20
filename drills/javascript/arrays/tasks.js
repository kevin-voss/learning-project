/**
 * JavaScript-Übungen — Thema: Arrays (siehe README.md)
 * Testen: make arrays | make arrays-task-01
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Summe aller Zahlen
 *
 * **Deine Aufgabe:** Berechne die Summe aller Elemente in einem Array.
 * **Bereits deklariert:** Der Parameter `array` (ein Array von Zahlen).
 * **Wie es funktioniert:** Addiere alle Elemente mit einer Schleife oder der Methode `.reduce()`. Ein leeres Array ergibt die Summe `0`.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-01`
 *
 * @example add([1, 2, 3]) // → 6
 * @example add([]) // → 0
 */
export function add(array) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 2 — Durchschnitt
 *
 * **Deine Aufgabe:** Berechne den Durchschnitt aller Zahlen in einem Array.
 * **Bereits deklariert:** Der Parameter `array` (ein Array von Zahlen).
 * **Wie es funktioniert:** Teile die Summe aller Elemente durch die Anzahl der Elemente (`array.length`). Ein leeres Array ergibt `0` (nicht `NaN`).
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-02`
 *
 * @example average([2, 4, 6]) // → 4
 * @example average([]) // → 0
 */
export function average(array) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 3 — Größtes Element
 *
 * **Deine Aufgabe:** Finde das größte Element (Maximum) in einem Array.
 * **Bereits deklariert:** Der Parameter `array` (ein Array von Zahlen).
 * **Wie es funktioniert:** Nutze eine Schleife, um das größte Element zu finden, oder die Funktion `Math.max(...array)`. Ein leeres Array ergibt `null`.
 * **Erwartung:** Zahl oder `null`.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-03`
 *
 * @example findMax([3, 9, 2]) // → 9
 * @example findMax([]) // → null
 */
export function findMax(array) {
  // TODO: Implementiere die Logik hier
  return null;
}

/**
 * Aufgabe 4 — Wie oft kommt der Wert vor?
 *
 * **Deine Aufgabe:** Zähle, wie oft ein bestimmter Wert in einem Array vorkommt.
 * **Bereits deklariert:** Die Parameter `array` (das Array) und `value` (der gesuchte Wert).
 * **Wie es funktioniert:** Nutze eine Schleife oder `.filter()`, um die Vorkommen von `value` zu zählen (Strikte Gleichheit `===`).
 * **Erwartung:** Ganze Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-04`
 *
 * @example countOccurrences([1, 2, 2, 3], 2) // → 2
 */
export function countOccurrences(array, value) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 5 — Alle Werte verdoppeln
 *
 * **Deine Aufgabe:** Erstelle ein neues Array, in dem jedes Element des ursprünglichen Arrays verdoppelt ist. Das Original-Array darf nicht verändert werden.
 * **Bereits deklariert:** Der Parameter `array` (ein Array von Zahlen).
 * **Wie es funktioniert:** Nutze eine Schleife und `.push()`, oder die Methode `.map(v => v * 2)`.
 * **Erwartung:** Neues Array gleicher Länge.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-05`
 *
 * @example doubleAll([1, 2, 3]) // → [2, 4, 6]
 */
export function doubleAll(array) {
  // TODO: Implementiere die Logik hier
  return [];
}

/**
 * Aufgabe 6 — Erstes Element oder null
 *
 * **Deine Aufgabe:** Gib das erste Element eines Arrays zurück.
 * **Bereits deklariert:** Der Parameter `array` (ein beliebiges Array).
 * **Wie es funktioniert:** Wenn das Array nicht leer ist, gib `array[0]` zurück. Sonst gib `null` zurück.
 * **Erwartung:** Wert oder `null`.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-06`
 *
 * @example firstOrNull([7, 8]) // → 7
 * @example firstOrNull([]) // → null
 */
export function firstOrNull(array) {
  // TODO: Implementiere die Logik hier
  return null;
}

/**
 * Aufgabe 7 — Letztes Element oder null
 *
 * **Deine Aufgabe:** Gib das letzte Element eines Arrays zurück.
 * **Bereits deklariert:** Der Parameter `array` (ein beliebiges Array).
 * **Wie es funktioniert:** Wenn das Array nicht leer ist, gib das Element am Index `array.length - 1` zurück. Sonst gib `null` zurück.
 * **Erwartung:** Wert oder `null`.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-07`
 *
 * @example lastOrNull([7, 8]) // → 8
 */
export function lastOrNull(array) {
  // TODO: Implementiere die Logik hier
  return null;
}

/**
 * Aufgabe 8 — Range 1 … n
 *
 * **Deine Aufgabe:** Erstelle ein Array, das alle Zahlen von 1 bis `n` enthält.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl ≥ 0).
 * **Wie es funktioniert:** Nutze eine Schleife von 1 bis `n` und füge jede Zahl mit `.push()` zu einem neuen Array hinzu. Für `n === 0` gib ein leeres Array `[]` zurück.
 * **Erwartung:** Array von Zahlen.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-08`
 *
 * @example range(4) // → [1, 2, 3, 4]
 * @example range(0) // → []
 */
export function range(n) {
  // TODO: Implementiere die Logik hier
  return [];
}

/**
 * Aufgabe 9 — Zwei Arrays verketten
 *
 * **Deine Aufgabe:** Erstelle ein neues Array, das zuerst alle Elemente aus `a` und dann alle aus `b` enthält. `a` und `b` dürfen nicht verändert werden.
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Arrays).
 * **Wie es funktioniert:** Nutze den Spread-Operator (z.B. `[...a, ...b]`) oder die Methode `a.concat(b)`.
 * **Erwartung:** Neues Array.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-09`
 *
 * @example mergeArrays([1, 2], [3, 4]) // → [1, 2, 3, 4]
 */
export function mergeArrays(a, b) {
  // TODO: Implementiere die Logik hier
  return [];
}

/**
 * Aufgabe 10 — Umgekehrtes Kopie-Array
 *
 * **Deine Aufgabe:** Erstelle ein neues Array, das die Elemente des ursprünglichen Arrays in umgekehrter Reihenfolge enthält. Das Original-Array darf nicht verändert werden.
 * **Bereits deklariert:** Der Parameter `array` (ein beliebiges Array).
 * **Wie es funktioniert:** Nutze eine rückwärts laufende Schleife und `.push()`, oder erstelle eine Kopie und drehe sie um (z.B. `[...array].reverse()`).
 * **Erwartung:** Neues Array.
 *
 * **Test im Terminal (Projektroot):** `make arrays-task-10`
 *
 * @example reversedCopy([1, 2, 3]) // → [3, 2, 1]
 */
export function reversedCopy(array) {
  // TODO: Implementiere die Logik hier
  return [];
}
