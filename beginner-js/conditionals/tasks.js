/**
 * JavaScript-Übungen — Thema: Verzweigungen (siehe README.md)
 * Testen: make conditionals | make conditionals-task-04
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Vorzeichen
 *
 * **Deine Aufgabe:** Bestimme das Vorzeichen einer Zahl.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl).
 * **Wie es funktioniert:** Nutze `if`/`else if`, um zu prüfen, ob `n` negativ, null oder positiv ist. Gib `-1` für negativ, `0` für null und `1` für positiv zurück.
 * **Erwartung:** Nur diese drei Zahlen.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-01`
 *
 * @example signOf(-3) // → -1
 * @example signOf(0) // → 0
 * @example signOf(5) // → 1
 */
export function signOf(n) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 2 — Maximum ohne Math.max
 *
 * **Deine Aufgabe:** Finde die größere von zwei Zahlen heraus, ohne `Math.max` zu verwenden.
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Zahlen).
 * **Wie es funktioniert:** Vergleiche `a` und `b` mit `if` (`a > b`). Gib die größere Zahl zurück.
 * **Erwartung:** Die größere der beiden Zahlen.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-02`
 *
 * @example maxOfTwo(2, 9) // → 9
 */
export function maxOfTwo(a, b) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 3 — Bestanden?
 *
 * **Deine Aufgabe:** Prüfe, ob eine Punktzahl zum Bestehen reicht.
 * **Bereits deklariert:** Der Parameter `score` (eine Punktzahl).
 * **Wie es funktioniert:** Ab `score >= 50` ist es bestanden (`true`), sonst `false`. Du kannst direkt `score >= 50` zurückgeben oder ein `if`/`else` verwenden.
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-03`
 *
 * @example isPassing(50) // → true
 * @example isPassing(49) // → false
 */
export function isPassing(score) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 4 — Temperaturgefühl
 *
 * **Deine Aufgabe:** Beschreibe, wie sich eine Temperatur anfühlt.
 * **Bereits deklariert:** Der Parameter `celsius` (eine Temperatur in Grad Celsius).
 * **Wie es funktioniert:** Nutze `if`/`else if`/`else`: `< 10` → `"kalt"`; `< 22` → `"angenehm"`; sonst `"warm"`.
 * **Erwartung:** String (exakt diese Strings).
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-04`
 *
 * @example temperatureFeel(5) // → "kalt"
 * @example temperatureFeel(15) // → "angenehm"
 */
export function temperatureFeel(celsius) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 5 — Ticketpreis nach Alter
 *
 * **Deine Aufgabe:** Bestimme den Preis für ein Ticket basierend auf dem Alter.
 * **Bereits deklariert:** Der Parameter `age` (das Alter in Jahren).
 * **Wie es funktioniert:** Alter `< 6` → `0` Euro; `< 18` → `8` Euro; sonst → `15` Euro.
 * **Erwartung:** Zahl (Euro, ganzzahlig).
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-05`
 *
 * @example ticketPrice(5) // → 0
 * @example ticketPrice(10) // → 8
 */
export function ticketPrice(age) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 6 — Schaltjahr
 *
 * **Deine Aufgabe:** Prüfe, ob ein Jahr ein Schaltjahr ist.
 * **Bereits deklariert:** Der Parameter `year` (eine Jahreszahl).
 * **Wie es funktioniert:** Regeln für Schaltjahre: Ein Jahr ist ein Schaltjahr, wenn es durch 400 teilbar ist. Wenn nicht, aber es ist durch 100 teilbar, ist es KEIN Schaltjahr. Wenn nicht, aber es ist durch 4 teilbar, ist es ein Schaltjahr. Sonst nicht.
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-06`
 *
 * @example isLeapYear(2024) // → true
 * @example isLeapYear(1900) // → false
 */
export function isLeapYear(year) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 7 — Betrag ohne Math.abs
 *
 * **Deine Aufgabe:** Berechne den absoluten Betrag einer Zahl (ohne Vorzeichen), ohne `Math.abs` zu verwenden.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl).
 * **Wie es funktioniert:** Wenn `n < 0` ist, gib `-n` zurück. Sonst gib `n` zurück.
 * **Erwartung:** Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-07`
 *
 * @example absoluteNoMath(-4) // → 4
 */
export function absoluteNoMath(n) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 8 — Minimum ohne Math.min
 *
 * **Deine Aufgabe:** Finde die kleinere von zwei Zahlen heraus, ohne `Math.min` zu verwenden.
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Zahlen).
 * **Wie es funktioniert:** Vergleiche `a` und `b` mit `if` (`a < b`). Gib die kleinere Zahl zurück.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-08`
 *
 * @example minOfTwo(3, 1) // → 1
 */
export function minOfTwo(a, b) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 9 — Genau eine wahr (XOR)
 *
 * **Deine Aufgabe:** Prüfe, ob genau einer von zwei Wahrheitswerten `true` ist (Exklusiv-Oder).
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Booleans).
 * **Wie es funktioniert:** Gib `true` zurück, wenn `a` und `b` unterschiedlich sind (`a !== b`).
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-09`
 *
 * @example exactlyOneTrue(true, false) // → true
 * @example exactlyOneTrue(true, true) // → false
 */
export function exactlyOneTrue(a, b) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 10 — Notenbuchstabe
 *
 * **Deine Aufgabe:** Wandle eine Punktzahl in einen Notenbuchstaben um.
 * **Bereits deklariert:** Der Parameter `score` (eine Punktzahl).
 * **Wie es funktioniert:** `>= 90` → `"A"`, `>= 80` → `"B"`, `>= 70` → `"C"`, sonst `"D"`. Nutze `if`/`else if`/`else`.
 * **Erwartung:** Ein Buchstabe als String.
 *
 * **Test im Terminal (Projektroot):** `make conditionals-task-10`
 *
 * @example gradeLetter(95) // → "A"
 */
export function gradeLetter(score) {
  // TODO: Implementiere die Logik hier
  return "";
}
