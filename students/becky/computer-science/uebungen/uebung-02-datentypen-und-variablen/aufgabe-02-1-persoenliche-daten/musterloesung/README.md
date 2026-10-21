# Musterlösung · Aufgabe 02_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`musterloesung/`), then:

```bash
javac PersonalData.java
```

```bash
java PersonalData
```

## How it works, step by step

1. **One box per line of the sheet.** For each, one question decides the type:

   | Data | Question | Type | Name |
   |------|----------|------|------|
   | Vorname, Nachname | text? | `String` | `firstName`, `lastName` |
   | Geburtsjahr | whole number? | `int` | `birthYear` |
   | Geschlecht | exactly one letter? | `char` | `gender` |
   | Studiengang | text? | `String` | `studyProgramme` |
   | Semester | whole number? | `int` | `semester` |
   | Erststudium | yes or no? | `boolean` | `firstDegree` |
   | Mensa-Essen | number with a dot? | `double` | `lastMealPrice` |

2. **Why `int` and not `long` for the year?** 1934 fits easily into an `int` (up to about 2.1 billion). `long` is for really huge numbers. Use the normal box unless you need the big one.
3. **Why `char` for the gender?** It is always exactly one letter. `'m'` has single quotes, because it is a `char`. A `String` `"m"` would also be allowed by the sheet.
4. **Why `double` for the price?** Prices have cents. `3.8` with a **dot**; `3,8` is an error.
5. **Names in camelCase**, in English, each saying what is inside. The labels on the screen stay German, because that is what the sheet's example shows.
6. **Printing:** `"Vorname: " + firstName` glues the label (with its colon and space) and the value. One `println` per box keeps every line easy to find and to change.
7. The values are **made up** (Donald Duck from the sheet), because this page is public.

**Test run** (the Donald Duck values: same as the sheet's Beispielausgabe, checked character by character)

```text
Vorname: Donald
Nachname: Duck
Geburtsjahr: 1934
Geschlecht: m
Studiengang: Enteninformatik
Semester: 1
Erststudium: true
Mensa-Essen: 3.8
```

**The other test examples**, each with only the changed box (the rest of the output stays the same):

```text
price 4.0, first degree false, gender 'd':
Geschlecht: d
Erststudium: false
Mensa-Essen: 4.0

price 2.50:
Mensa-Essen: 2.5
```

A `double` shows as few digits as needed, but at least one after the dot: `4.0`, `2.5`. That is fine for this task. Printing money always with two decimals (`2.50`) comes later with `printf`.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `char gender = "m";` | `Inkompatible Typen: String kann nicht in char konvertiert werden` | `char` takes single quotes: `'m'` |
| `double price = 3,80;` | `<ID> erwartet` | Dot, not comma: `3.80` |
| `int birthYear = 1934.5;` | `Möglicher Verlust bei Konvertierung von double in int` | Whole numbers only in an `int` |
| `boolean firstDegree = "true";` | `Inkompatible Typen: String kann nicht in boolean konvertiert werden` | No quotes: `true` |
| `String lastName = Duck;` | `Symbol nicht gefunden` | Text needs quotes: `"Duck"` |
| `"Nachname:" + lastName` | `Nachname:Duck` | The space goes inside the label: `"Nachname: "` |
| A box declared but never printed | One line missing in the output | 8 boxes in, 8 `println` out |

Back to [Aufgabe 02_1](../README.md).
