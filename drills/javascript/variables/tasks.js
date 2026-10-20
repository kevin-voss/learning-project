/**
 * JavaScript-Übungen — Thema: Variablen (siehe README.md)
 * Testen: make variables | make variables-task-03
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Rechteckfläche
 *
 * **Deine Aufgabe:** Berechne die Fläche eines Rechtecks.
 * **Bereits deklariert:** Die Parameter `width` (Breite) und `height` (Höhe) werden der Funktion übergeben.
 * **Wie es funktioniert:** Multipliziere `width` und `height` und speichere das Ergebnis in einer neuen Variablen (z.B. mit `const`). Gib diese Variable dann mit `return` zurück.
 * **Erwartung:** Eine Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-01`
 *
 * @example rectangleArea(4, 5) // → 20
 * @example rectangleArea(2, 3) // → 6
 */
export function rectangleArea(width, height) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 2 — Celsius nach Fahrenheit
 *
 * **Deine Aufgabe:** Wandle eine Temperatur von Celsius in Fahrenheit um.
 * **Bereits deklariert:** Der Parameter `c` (Temperatur in Celsius) wird der Funktion übergeben.
 * **Wie es funktioniert:** Die Formel lautet: `c * 9/5 + 32`. Speichere das Ergebnis in einer Variablen und gib sie zurück.
 * **Erwartung:** Eine Zahl, die der Temperatur in Fahrenheit entspricht.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-02`
 *
 * @example celsiusToFahrenheit(0) // → 32
 * @example celsiusToFahrenheit(100) // → 212
 */
export function celsiusToFahrenheit(c) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 3 — Minuten in Sekunden
 *
 * **Deine Aufgabe:** Rechne eine gegebene Anzahl von Minuten in Sekunden um.
 * **Bereits deklariert:** Der Parameter `minutes` (Anzahl der Minuten) wird übergeben.
 * **Wie es funktioniert:** Eine Minute hat 60 Sekunden. Multipliziere `minutes` mit 60 und gib das Ergebnis zurück.
 * **Erwartung:** Ganze Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-03`
 *
 * @example minutesToSeconds(1) // → 60
 * @example minutesToSeconds(5) // → 300
 */
export function minutesToSeconds(minutes) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 4 — Zwei Wörter mit Leerzeichen
 *
 * **Deine Aufgabe:** Verbinde zwei Wörter zu einem Satz mit einem Leerzeichen dazwischen.
 * **Bereits deklariert:** Die Parameter `wordA` (erstes Wort) und `wordB` (zweites Wort) als Strings.
 * **Wie es funktioniert:** Nutze den `+` Operator oder Template-Strings (Backticks `` ` ``), um die beiden Wörter mit einem Leerzeichen `" "` zu verketten.
 * **Erwartung:** Ein neuer String (Text).
 *
 * **Test im Terminal (Projektroot):** `make variables-task-04`
 *
 * @example concatWithSpace("Hallo", "Welt") // → "Hallo Welt"
 */
export function concatWithSpace(wordA, wordB) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 5 — Begrüßung mit Template-String
 *
 * **Deine Aufgabe:** Erstelle einen Begrüßungstext unter Verwendung eines Template-Strings.
 * **Bereits deklariert:** Der Parameter `name` (Name der Person) als String.
 * **Wie es funktioniert:** Nutze Backticks (`` ` ``) und die Syntax `${variable}`, um den Namen in den Text `Willkommen, NAME!` einzufügen.
 * **Erwartung:** Exakt dieser Text inkl. Ausrufezeichen.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-05`
 *
 * @example templateWelcome("Alex") // → "Willkommen, Alex!"
 */
export function templateWelcome(name) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 6 — Textlänge
 *
 * **Deine Aufgabe:** Finde heraus, wie viele Zeichen ein Text hat.
 * **Bereits deklariert:** Der Parameter `text` (ein beliebiger String).
 * **Wie es funktioniert:** Jeder String in JavaScript hat eine Eigenschaft `.length`, die die Anzahl der Zeichen zurückgibt (z.B. `text.length`).
 * **Erwartung:** Eine Zahl.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-06`
 *
 * @example lengthOfText("abc") // → 3
 * @example lengthOfText("") // → 0
 */
export function lengthOfText(text) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 7 — Zahl als Text
 *
 * **Deine Aufgabe:** Wandle eine Zahl in einen Text (String) um.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl).
 * **Wie es funktioniert:** Nutze die Funktion `String(n)` oder die Methode `n.toString()`, um die Zahl in einen Text umzuwandeln.
 * **Erwartung:** Ein String, der die Zahl darstellt.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-07`
 *
 * @example numberToText(7) // → "7"
 */
export function numberToText(n) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 8 — Text als Zahl
 *
 * **Deine Aufgabe:** Wandle einen Text (String), der eine Zahl enthält, in eine echte Zahl um.
 * **Bereits deklariert:** Der Parameter `text` (ein String wie "42").
 * **Wie es funktioniert:** Nutze die Funktion `Number(text)`, um den String in eine Zahl umzuwandeln.
 * **Erwartung:** Eine Zahl.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-08`
 *
 * @example textToNumber("42") // → 42
 */
export function textToNumber(text) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 9 — Rest bei Division
 *
 * **Deine Aufgabe:** Berechne den Rest, der bei der Division zweier Zahlen übrig bleibt.
 * **Bereits deklariert:** Die Parameter `a` (Dividend) und `b` (Divisor).
 * **Wie es funktioniert:** Nutze den Modulo-Operator `%` (z.B. `a % b`), um den Rest der ganzzahligen Division zu berechnen.
 * **Erwartung:** Eine Zahl (der Rest).
 *
 * **Test im Terminal (Projektroot):** `make variables-task-09`
 *
 * @example remainderDivision(10, 3) // → 1
 */
export function remainderDivision(a, b) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 10 — Wert um 1 erhöhen
 *
 * **Deine Aufgabe:** Erhöhe die übergebene Zahl um genau 1.
 * **Bereits deklariert:** Der Parameter `n` (eine Zahl).
 * **Wie es funktioniert:** Addiere 1 zu `n` (z.B. `n + 1`) und gib das Ergebnis zurück. Verändere nicht den Parameter `n` selbst.
 * **Erwartung:** Die um 1 erhöhte Zahl.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-10`
 *
 * @example incrementValue(4) // → 5
 */
export function incrementValue(n) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 11 — Summe eines Arrays
 *
 * **Deine Aufgabe:** Berechne die Summe aller Zahlen in einem Array.
 * **Bereits deklariert:** Der Parameter `karl` (ein Array von Zahlen). Der zweite Parameter `karl2` wird in den Tests manchmal übergeben, kann aber ignoriert werden (oder du nutzt `arguments`, aber für den Anfang reicht `karl`).
 * **Wie es funktioniert:** Erstelle eine Variable `sum` mit dem Wert 0. Nutze eine `for`-Schleife, um über das Array zu iterieren und addiere jedes Element zur Summe.
 * **Erwartung:** Die Summe aller Zahlen im Array.
 *
 * **Test im Terminal (Projektroot):** `make variables-task-11`
 *
 * @example sumOfArray([2, 3, 4]) // → 9
 */
export function sumOfArray(karl, karl2) {
  // TODO: Implementiere die Logik hier
  return 0;
}
