/**
 * JavaScript-Übungen — Thema: Math (siehe README.md)
 * Testen: make math | make math-task-05
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Abrunden
 *
 * **Deine Aufgabe:** Runde eine Zahl zur nächsten ganzen Zahl nach unten ab.
 * **Bereits deklariert:** Der Parameter `x` (eine Kommazahl wie 9.9).
 * **Wie es funktioniert:** Nutze die Funktion `Math.floor(x)`, um die Zahl abzurunden und gib das Ergebnis zurück.
 * **Erwartung:** Ganze Zahl.
 *
 * **Test im Terminal (Projektroot):** `make math-task-01`
 *
 * @example floorValue(9.9) // → 9
 */
export function floorValue(x) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 2 — Aufrunden
 *
 * **Deine Aufgabe:** Runde eine Zahl zur nächsten ganzen Zahl nach oben auf.
 * **Bereits deklariert:** Der Parameter `x` (eine Kommazahl wie 2.1).
 * **Wie es funktioniert:** Nutze die Funktion `Math.ceil(x)`, um die Zahl aufzurunden und gib das Ergebnis zurück.
 * **Erwartung:** Ganze Zahl.
 *
 * **Test im Terminal (Projektroot):** `make math-task-02`
 *
 * @example ceilValue(2.1) // → 3
 */
export function ceilValue(x) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 3 — Betrag
 *
 * **Deine Aufgabe:** Berechne den absoluten Betrag einer Zahl (also ohne Vorzeichen).
 * **Bereits deklariert:** Der Parameter `x` (eine Zahl, z.B. -5).
 * **Wie es funktioniert:** Nutze die Funktion `Math.abs(x)` und gib das Ergebnis zurück.
 * **Erwartung:** Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make math-task-03`
 *
 * @example absoluteValue(-5) // → 5
 */
export function absoluteValue(x) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 4 — Potenz
 *
 * **Deine Aufgabe:** Berechne die Potenz aus Basis und Exponent (Basis hoch Exponent).
 * **Bereits deklariert:** Die Parameter `base` (Basis) und `exp` (Exponent).
 * **Wie es funktioniert:** Nutze den Potenz-Operator `**` (z.B. `base ** exp`) oder die Funktion `Math.pow(base, exp)`.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make math-task-04`
 *
 * @example powerValue(2, 4) // → 16
 */
export function powerValue(base, exp) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 5 — Größere von zwei Zahlen
 *
 * **Deine Aufgabe:** Finde heraus, welche von zwei Zahlen größer ist.
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Zahlen).
 * **Wie es funktioniert:** Nutze die Funktion `Math.max(a, b)` und gib das Ergebnis zurück.
 * **Erwartung:** Der größere der beiden Werte.
 *
 * **Test im Terminal (Projektroot):** `make math-task-05`
 *
 * @example maximumTwo(3, 7) // → 7
 */
export function maximumTwo(a, b) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 6 — Kleinste von drei Zahlen
 *
 * **Deine Aufgabe:** Finde heraus, welche von drei Zahlen die kleinste ist.
 * **Bereits deklariert:** Die Parameter `a`, `b` und `c` (drei Zahlen).
 * **Wie es funktioniert:** Nutze die Funktion `Math.min(a, b, c)` und gib das Ergebnis zurück.
 * **Erwartung:** Der kleinste Wert.
 *
 * **Test im Terminal (Projektroot):** `make math-task-06`
 *
 * @example minimumThree(4, 2, 9) // → 2
 */
export function minimumThree(a, b, c) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 7 — Clamp (eingrenzen)
 *
 * **Deine Aufgabe:** Begrenze einen Wert auf einen Bereich zwischen einem Minimum und einem Maximum.
 * **Bereits deklariert:** Die Parameter `value` (der Wert), `min` (das Minimum) und `max` (das Maximum).
 * **Wie es funktioniert:** Wenn `value` kleiner als `min` ist, gib `min` zurück. Wenn `value` größer als `max` ist, gib `max` zurück. Ansonsten gib `value` zurück. Du kannst das mit `if`-Abfragen oder einer Kombination aus `Math.min` und `Math.max` lösen.
 * **Erwartung:** Ergebnis liegt immer zwischen `min` und `max` inklusive.
 *
 * **Test im Terminal (Projektroot):** `make math-task-07`
 *
 * @example clampValue(5, 0, 10) // → 5
 * @example clampValue(-1, 0, 10) // → 0
 */
export function clampValue(value, min, max) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 8 — Fakultät
 *
 * **Deine Aufgabe:** Berechne die Fakultät einer Zahl (n!).
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl ≥ 0).
 * **Wie es funktioniert:** Die Fakultät von 0 ist 1 (`0! = 1`). Für `n > 0` ist es das Produkt aller Zahlen von 1 bis `n` (`1 * 2 * … * n`). Nutze eine `for`-Schleife oder Rekursion.
 * **Erwartung:** Ganze Zahl.
 *
 * **Test im Terminal (Projektroot):** `make math-task-08`
 *
 * @example factorialMath(0) // → 1
 * @example factorialMath(5) // → 120
 */
export function factorialMath(n) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 9 — Auf zwei Nachkommastellen runden
 *
 * **Deine Aufgabe:** Runde eine Kommazahl auf genau zwei Nachkommastellen.
 * **Bereits deklariert:** Der Parameter `x` (eine Kommazahl wie 3.146).
 * **Wie es funktioniert:** Multipliziere die Zahl mit 100, runde sie mit `Math.round()` und teile sie dann wieder durch 100.
 * **Erwartung:** Zahl mit höchstens zwei Dezimalstellen.
 *
 * **Test im Terminal (Projektroot):** `make math-task-09`
 *
 * @example roundTwoDecimals(3.146) // → 3.15
 */
export function roundTwoDecimals(x) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 10 — Prozentanteil
 *
 * **Deine Aufgabe:** Berechne, wie viel Prozent ein Teil vom Ganzen ausmacht.
 * **Bereits deklariert:** Die Parameter `part` (der Teil) und `whole` (das Ganze).
 * **Wie es funktioniert:** Teile den Teil durch das Ganze und multipliziere das Ergebnis mit 100 (`part / whole * 100`).
 * **Erwartung:** Dezimalzahl (z. B. `12.5` für ein Viertel von 200, wenn `part` 50 wäre).
 *
 * **Test im Terminal (Projektroot):** `make math-task-10`
 *
 * @example percentage(25, 200) // → 12.5
 */
export function percentage(part, whole) {
  // TODO: Implementiere die Logik hier
  return 0;
}
