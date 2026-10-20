# JavaScript-Übungen für Einsteiger

Dieser Ordner enthält **kleine, testbare Aufgaben** zu klassischen Themen: Variablen, Mathe, Text, Arrays, Verzweigungen, Schleifen, Funktionen und Objekte. Du arbeitest in **`tasks.js`**; automatische Tests in **`tasks.test.js`** sagen dir, ob deine Lösung passt.

## Voraussetzungen

- **[Bun](https://bun.sh)** installiert (wird vom `Makefile` zum Testen verwendet).
- **GNU Make** (im Terminal: `make`), damit die Befehle aus den Aufgaben und dieser README funktionieren.

## So arbeitest du (empfohlen)

1. Öffne ein Thema, z. B. `variables/`.
2. Lies die **`README.md`** in diesem Ordner (Erklärung des Themas).
3. Öffne **`tasks.js`**, lies die Kommentare **über jeder Funktion** (Beispiel und **`make …`**-Zeile).
4. Schreibe deinen Code im Funktionskörper (statt `// Dein Code`).
5. Im **Projektroot** im Terminal testen — pro Aufgabe steht dort der passende Befehl, z. B.:

   ```bash
   make variables              # ganzes Thema
   make variables-task-03      # nur diese Aufgabe
   ```

6. Wenn ein Test rot ist: Meldung lesen (**Expected** vs **Received**), Logik anpassen, erneut `make …` ausführen.

## Was „fertig“ bedeutet

- Alle Tests für das Thema sind **grün** (`pass`).
- Du änderst nur **`tasks.js`** (nicht die Testdatei), außer du willst bewusst extra Übungen schreiben.

## Ordner / Themen

| Ordner | Inhalt |
|--------|--------|
| [variables/](variables/README.md) | `let`, `const`, Typen, Strings, Zahlen, einfache Ausdrücke |
| [math/](math/README.md) | `Math.*`, Runden, Potenz, Fakultät, Prozent |
| [strings/](strings/README.md) | `String`-Methoden: `includes`, `trim`, `slice`, … |
| [arrays/](arrays/README.md) | Listen: Summe, Suche, Kopien, `range` |
| [conditionals/](conditionals/README.md) | `if` / `else`, Vergleiche, mehrere Fälle |
| [loops/](loops/README.md) | `for`, `while`, Wiederholung |
| [functions/](functions/README.md) | Parameter, Rückgabewerte, kleine Helfer |
| [objects/](objects/README.md) | Eigenschaften, `Object.keys`, zusammensetzen |

## Make-Befehle (Übersicht)

| Befehl | Wirkung |
|--------|---------|
| `make test` | Alle Themen testen |
| `make variables` | Nur `variables/` (ebenso: `math`, `strings`, …) |
| `make arrays-task-01` | Nur Aufgabe 1 im Thema `arrays` (Nummern `01`–`10`) |

Hilfe im Terminal: `make help`

## Reihenfolge

Du kannst **variables → strings → math → conditionals → loops → arrays → functions → objects** gehen — das entspricht oft dem, was Kurse aufbauen. Ausprobieren und springen ist aber auch in Ordnung.
