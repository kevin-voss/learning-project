/**
 * JavaScript-Übungen — Thema: Objekte (siehe README.md)
 * Testen: make objects | make objects-task-06
 * 
 * HINWEIS: Falls du nicht weiterkommst, schau in die Datei `solutions.js` für Tipps und Lösungen!
 */

/**
 * Aufgabe 1 — Vollständiger Name
 *
 * **Deine Aufgabe:** Baue aus dem Vornamen und Nachnamen einer Person einen vollständigen Namen zusammen.
 * **Bereits deklariert:** Der Parameter `person` (ein Objekt mit den Eigenschaften `firstName` und `lastName`).
 * **Wie es funktioniert:** Greife auf die Eigenschaften `person.firstName` und `person.lastName` zu und verbinde sie mit einem Leerzeichen (z.B. mit Template-Strings).
 * **Erwartung:** String mit genau einem Leerzeichen in der Mitte.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-01`
 *
 * @example fullNameFromPerson({ firstName: "Ada", lastName: "Lovelace" }) // → "Ada Lovelace"
 */
export function fullNameFromPerson(person) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 2 — Patch-Version erhöhen
 *
 * **Deine Aufgabe:** Erhöhe die Patch-Version eines Versionsobjekts um 1, ohne das Originalobjekt zu verändern.
 * **Bereits deklariert:** Der Parameter `version` (ein Objekt mit `major`, `minor` und `patch`).
 * **Wie es funktioniert:** Erstelle ein neues Objekt und kopiere alle Eigenschaften des alten Objekts (z.B. mit dem Spread-Operator `...version`). Überschreibe dann die Eigenschaft `patch` mit dem um 1 erhöhten Wert.
 * **Erwartung:** Neues Objekt `{ major, minor, patch }`.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-02`
 *
 * @example bumpPatchVersion({ major: 1, minor: 2, patch: 3 }) // → { major: 1, minor: 2, patch: 4 }
 */
export function bumpPatchVersion(version) {
  // TODO: Implementiere die Logik hier
  return {};
}

/**
 * Aufgabe 3 — Anzahl der Keys
 *
 * **Deine Aufgabe:** Finde heraus, wie viele Eigenschaften (Keys) ein Objekt hat.
 * **Bereits deklariert:** Der Parameter `obj` (ein beliebiges Objekt).
 * **Wie es funktioniert:** Nutze die Funktion `Object.keys(obj)`, um ein Array aller Eigenschaften zu erhalten, und frage dann dessen Länge (`.length`) ab.
 * **Erwartung:** Ganze Zahl ≥ 0.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-03`
 *
 * @example countKeys({ a: 1, b: 2 }) // → 2
 * @example countKeys({}) // → 0
 */
export function countKeys(obj) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 4 — Key vorhanden?
 *
 * **Deine Aufgabe:** Prüfe, ob ein Objekt eine bestimmte Eigenschaft (Key) besitzt.
 * **Bereits deklariert:** Die Parameter `obj` (das Objekt) und `key` (der Name der Eigenschaft als String).
 * **Wie es funktioniert:** Nutze den `in`-Operator (z.B. `key in obj`) oder die Funktion `Object.hasOwn(obj, key)`.
 * **Erwartung:** Boolean (`true` oder `false`).
 *
 * **Test im Terminal (Projektroot):** `make objects-task-04`
 *
 * @example objectHasKey({ x: 1 }, "x") // → true
 */
export function objectHasKey(obj, key) {
  // TODO: Implementiere die Logik hier
  return false;
}

/**
 * Aufgabe 5 — Titel und Autor
 *
 * **Deine Aufgabe:** Erstelle einen Text, der Titel und Autor eines Buches verbindet.
 * **Bereits deklariert:** Der Parameter `book` (ein Objekt mit `title` und `author`).
 * **Wie es funktioniert:** Greife auf `book.title` und `book.author` zu und verbinde sie mit dem Wort "von" (z.B. `` `${title} von ${author}` ``).
 * **Erwartung:** String (Wort „von“ klein, wie im Test).
 *
 * **Test im Terminal (Projektroot):** `make objects-task-05`
 *
 * @example pickTitleAuthor({ title: "1984", author: "Orwell" }) // → "1984 von Orwell"
 */
export function pickTitleAuthor(book) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 6 — Punkt erzeugen
 *
 * **Deine Aufgabe:** Erstelle ein neues Objekt, das einen Punkt mit x- und y-Koordinaten darstellt.
 * **Bereits deklariert:** Die Parameter `x` und `y` (zwei Zahlen).
 * **Wie es funktioniert:** Erstelle ein neues Objekt mit den Eigenschaften `x` und `y` und weise ihnen die übergebenen Werte zu (z.B. `{ x: x, y: y }`).
 * **Erwartung:** Objekt mit genau diesen Keys.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-06`
 *
 * @example makePoint(2, 3) // → { x: 2, y: 3 }
 */
export function makePoint(x, y) {
  // TODO: Implementiere die Logik hier
  return {};
}

/**
 * Aufgabe 7 — Alter um 1 erhöhen (neues Objekt)
 *
 * **Deine Aufgabe:** Erstelle ein neues Person-Objekt, bei dem das Alter um 1 erhöht ist. Das Originalobjekt darf nicht verändert werden.
 * **Bereits deklariert:** Der Parameter `person` (ein Objekt mit `name` und `age`).
 * **Wie es funktioniert:** Nutze den Spread-Operator (`...person`), um alle Eigenschaften in ein neues Objekt zu kopieren, und überschreibe dann die Eigenschaft `age` mit `person.age + 1`.
 * **Erwartung:** Neues Objekt.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-07`
 *
 * @example incrementPersonAge({ name: "Bo", age: 20 }) // → { name: "Bo", age: 21 }
 */
export function incrementPersonAge(person) {
  // TODO: Implementiere die Logik hier
  return {};
}

/**
 * Aufgabe 8 — Warenkorb-Summe
 *
 * **Deine Aufgabe:** Berechne den Gesamtpreis aller Artikel in einem Warenkorb.
 * **Bereits deklariert:** Der Parameter `items` (ein Array von Objekten, die jeweils `price` und `qty` (Menge) haben).
 * **Wie es funktioniert:** Nutze eine Schleife, um über das Array zu iterieren. Multipliziere für jedes Element `price` mit `qty` und addiere das Ergebnis zu einer Summen-Variable.
 * **Erwartung:** Zahl ≥ 0. Ein leeres Array ergibt 0.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-08`
 *
 * @example sumCartTotal([{ price: 2, qty: 3 }, { price: 5, qty: 1 }]) // → 11
 */
export function sumCartTotal(items) {
  // TODO: Implementiere die Logik hier
  return 0;
}

/**
 * Aufgabe 9 — Sortierte Keys als Text
 *
 * **Deine Aufgabe:** Erstelle einen Text, der alle Eigenschaften (Keys) eines Objekts alphabetisch sortiert und mit Kommas getrennt auflistet.
 * **Bereits deklariert:** Der Parameter `obj` (ein beliebiges Objekt).
 * **Wie es funktioniert:** Nutze `Object.keys(obj)`, um ein Array der Keys zu erhalten. Sortiere das Array mit `.sort()` und verbinde die Elemente mit `.join(",")`.
 * **Erwartung:** String wie `"a,b"`.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-09`
 *
 * @example listSortedKeys({ b: 1, a: 2 }) // → "a,b"
 */
export function listSortedKeys(obj) {
  // TODO: Implementiere die Logik hier
  return "";
}

/**
 * Aufgabe 10 — Koordinaten addieren
 *
 * **Deine Aufgabe:** Addiere die x- und y-Koordinaten zweier Punkte und erstelle daraus einen neuen Punkt.
 * **Bereits deklariert:** Die Parameter `a` und `b` (zwei Objekte, die jeweils `x` und `y` haben).
 * **Wie es funktioniert:** Erstelle ein neues Objekt mit den Eigenschaften `x` und `y`. Der Wert für `x` ist `a.x + b.x`, der Wert für `y` ist `a.y + b.y`.
 * **Erwartung:** Neues Objekt mit `x` und `y`.
 *
 * **Test im Terminal (Projektroot):** `make objects-task-10`
 *
 * @example addCoords({ x: 1, y: 2 }, { x: 3, y: 4 }) // → { x: 4, y: 6 }
 */
export function addCoords(a, b) {
  // TODO: Implementiere die Logik hier
  return {};
}
