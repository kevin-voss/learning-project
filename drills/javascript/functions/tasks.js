/**
 * JavaScript-Übungen — Thema: Funktionen (siehe README.md)
 * Testen: make functions | make functions-task-04
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Quadrat
 *
 * **Deine Aufgabe:** Berechne das Quadrat einer Zahl (die Zahl mit sich selbst multipliziert).
 * **Bereits deklariert:** Der Parameter `x` (eine Zahl).
 * **Wie es funktioniert:** Multipliziere `x` mit `x` und gib das Ergebnis zurück.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-01`
 *
 * @example squareNumber(4) // → 16
 */
export function squareNumber(x) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 2 — Kubus
 *
 * **Deine Aufgabe:** Berechne den Kubus einer Zahl (die Zahl hoch 3).
 * **Bereits deklariert:** Der Parameter `x` (eine Zahl).
 * **Wie es funktioniert:** Rechne `x * x * x` oder nutze den Potenz-Operator `x ** 3`.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-02`
 *
 * @example cubeNumber(3) // → 27
 */
export function cubeNumber(x) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 3 — Hypotenuse
 *
 * **Deine Aufgabe:** Berechne die Länge der Hypotenuse eines rechtwinkligen Dreiecks mit dem Satz des Pythagoras.
 * **Bereits deklariert:** Die Parameter `a` und `b` (die Längen der beiden Katheten).
 * **Wie es funktioniert:** Die Formel lautet `Math.sqrt(a*a + b*b)`.
 * **Erwartung:** Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-03`
 *
 * @example hypotenuseNumber(3, 4) // → 5
 */
export function hypotenuseNumber(a, b) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 4 — Begrüßung mit Standard
 *
 * **Deine Aufgabe:** Begrüße eine Person. Wenn kein Name übergeben wurde, begrüße die "Welt".
 * **Bereits deklariert:** Der Parameter `name` (ein String oder `undefined`).
 * **Wie es funktioniert:** Prüfe mit `if (name === undefined)`, ob ein Name übergeben wurde. Wenn nicht, gib `"Hallo, Welt!"` zurück. Ansonsten gib `"Hallo, NAME!"` zurück.
 * **Erwartung:** String.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-04`
 *
 * @example greetOrDefault() // → "Hallo, Welt!"
 * @example greetOrDefault("Alex") // → "Hallo, Alex!"
 */
export function greetOrDefault(name) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 5 — Euro formatieren
 *
 * **Deine Aufgabe:** Formatiere einen Betrag als Euro-Preis mit genau zwei Nachkommastellen.
 * **Bereits deklariert:** Der Parameter `amount` (eine Zahl).
 * **Wie es funktioniert:** Nutze die Methode `.toFixed(2)` auf der Zahl, um sie auf zwei Nachkommastellen zu formatieren. Hänge dann das Euro-Zeichen mit einem Leerzeichen davor an (z.B. mit Template-Strings).
 * **Erwartung:** String wie `"12.50 €"`.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-05`
 *
 * @example formatEuro(12.5) // → "12.50 €"
 */
export function formatEuro(amount) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 6 — Länger als n?
 *
 * **Deine Aufgabe:** Prüfe, ob ein Text länger als eine bestimmte Anzahl von Zeichen ist.
 * **Bereits deklariert:** Die Parameter `text` (ein String) und `n` (eine Zahl).
 * **Wie es funktioniert:** Vergleiche `text.length` mit `n` (z.B. `text.length > n`) und gib das Ergebnis (`true` oder `false`) zurück.
 * **Erwartung:** Boolean.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-06`
 *
 * @example longerThan("abc", 2) // → true
 */
export function longerThan(text, n) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 7 — Sichere Division
 *
 * **Deine Aufgabe:** Teile zwei Zahlen durcheinander. Wenn der Divisor 0 ist, gib `null` zurück, um einen Fehler zu vermeiden.
 * **Bereits deklariert:** Die Parameter `a` (Dividend) und `b` (Divisor).
 * **Wie es funktioniert:** Prüfe mit `if (b === 0)`. Wenn ja, gib `null` zurück. Ansonsten gib `a / b` zurück.
 * **Erwartung:** Zahl oder `null`.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-07`
 *
 * @example safeDivideNums(10, 2) // → 5
 * @example safeDivideNums(10, 0) // → null
 */
export function safeDivideNums(a, b) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 8 — Code des ersten Zeichens
 *
 * **Deine Aufgabe:** Finde den Unicode-Wert des ersten Zeichens eines Textes heraus.
 * **Bereits deklariert:** Der Parameter `text` (ein String, der nie leer ist).
 * **Wie es funktioniert:** Nutze die Methode `.charCodeAt(0)` auf dem String.
 * **Erwartung:** Ganze Zahl (Unicode-Codeeinheit).
 *
 * **Test im Terminal (Projektroot):** `make functions-task-08`
 *
 * @example firstCharCodeAt("A") // → 65
 */
export function firstCharCodeAt(text) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 9 — Zwei Teile verketten
 *
 * **Deine Aufgabe:** Verbinde zwei Texte zu einem einzigen Text (ohne Leerzeichen dazwischen).
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Strings).
 * **Wie es funktioniert:** Nutze den `+` Operator (z.B. `a + b`).
 * **Erwartung:** String.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-09`
 *
 * @example joinParts("foo", "bar") // → "foobar"
 */
export function joinParts(a, b) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 10 — Median von drei Zahlen
 *
 * **Deine Aufgabe:** Finde den mittleren Wert (Median) von drei Zahlen heraus.
 * **Bereits deklariert:** Die Parameter `a`, `b` und `c` (drei Zahlen).
 * **Wie es funktioniert:** Erstelle ein Array aus den drei Zahlen (`[a, b, c]`), sortiere es mit `.sort((x, y) => x - y)` und gib das mittlere Element (Index 1) zurück.
 * **Erwartung:** Zahl.
 *
 * **Test im Terminal (Projektroot):** `make functions-task-10`
 *
 * @example middleValue(1, 9, 5) // → 5
 */
export function middleValue(a, b, c) {
  // TODO: Implementiere die Logik hier
  return 0;
}
