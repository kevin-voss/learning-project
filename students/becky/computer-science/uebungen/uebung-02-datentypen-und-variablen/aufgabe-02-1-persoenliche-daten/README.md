# Aufgabe 02_1 · Persönliche Daten (Personal data)

Part of [Übung 02 · Datentypen und Variablen](../README.md). New ideas you need: variables, data types, choosing the right box, camelCase, literals, gluing with `+`. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `PersonalData.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Schreiben Sie ein Java-Programm, das für die folgenden Daten **geeignete Variablen** deklariert:

- Vorname  
- Nachname  
- Geburtsjahr  
- Geschlecht (z. B. `m`, `w` oder `d`)  
- Name des Studiengangs  
- Aktuelles Semester  
- Angabe, ob es sich um das **Erststudium** handelt oder nicht  
- Preis für das letzte Mensa-Essen in **EUR**

**Anforderungen**

- Passende **Datentypen** wählen (z. B. `String`, `int`, `char`/`String`, `boolean`, `double`).  
- **Namenskonventionen** für Variablen beachten (`camelCase`, aussagekräftige Namen).  
- Variablen mit **eigenen persönlichen Werten** initialisieren.  
- Alle Variablen auf der Konsole ausgeben; vor jeder Zeile ein **beschriftender Text**, damit erkennbar ist, welche Variable ausgegeben wird.

**Beispielausgabe**

```
Vorname: Donald
Nachname: Duck
Geburtsjahr: 1934
Geschlecht: m
Studiengang: Enteninformatik
Semester: 1
Erststudium: true
Mensa-Essen: 3.8
```

**Hinweise**

- `System.out.println("Label: " + variable);` verknüpft Text und Wert.  
- Für `boolean` erscheint in der Ausgabe `true` oder `false`.  
- Mensa-Preis als `double` (Dezimalpunkt, nicht Komma).

## The task, simply said

1. Make 8 boxes, one for each line of the list.
2. For each box, choose the right shape: text, one letter, whole number, yes/no, or number with a dot.
3. Give each box a clear camelCase name.
4. Put a value in each box.
5. Print every box on its own line, with a label in front: `Label: value`.

The sheet says "your own personal values". This folder is on a **public website**, so here use **made-up** values, like the sheet's Donald Duck. Your real data stays on your own computer.

## Test examples

Your program is right when it gives exactly these answers.

| Values in your boxes | The program says |
|----------------------|------------------|
| The sheet's Donald Duck: `"Donald"`, `"Duck"`, `1934`, `'m'`, `"Enteninformatik"`, `1`, `true`, `3.8` | exactly the 8 lines of the **Beispielausgabe** above |
| Mensa price `4.0` | `Mensa-Essen: 4.0` (a `double` always shows at least one digit after the dot) |
| Mensa price `2.50` | `Mensa-Essen: 2.5` (the 0 at the end is dropped) |
| Erststudium `false` | `Erststudium: false` |
| Geschlecht `'d'` | `Geschlecht: d` (no quotes in the output) |

Check every line for: label, colon, **one** space, value. 8 boxes in, 8 lines out.

## Your first try

What is already good:

- You chose a fitting box for every piece of data: text in `String`, the gender as a `char`, whole numbers in `int`, yes/no as `boolean`, the price as a `double`.
- Your names are camelCase and say what is inside. And you glued text and values with `+` and `\n`, an idea from Übung 01.

What is still open:

- Compare your output with the Beispielausgabe line by line: one of your boxes never appears on the screen, and some labels have no `: ` before the value.
- Read your box names out loud once: one has a letter missing, and one uses an English word that means something else (a prize is what you win, a price is what you pay).

## Little helpers

<details>
<summary>Java says "Inkompatible Typen: String kann nicht in char konvertiert werden"</summary>

You put a text (`"m"`, double quotes) into a `char` box. A `char` takes one letter in **single** quotes: `'m'`.

</details>

<details>
<summary>Java says "&lt;ID&gt; erwartet" at the price line</summary>

You wrote the price with a comma: `3,8`. Java only understands the dot: `3.8`. The comma means something else to Java.

</details>

<details>
<summary>My output says "Nachname:Duck" with no space</summary>

The space belongs inside the quotes of the label: `"Nachname: "`. The `+` glues without adding anything.

</details>

<details>
<summary>Should the gender be a char or a String?</summary>

Both are allowed by the sheet. It is exactly one letter (`m`, `w`, `d`), so `char` is the tighter fit. A `String` would also work. Just be consistent with the quotes: `'m'` for `char`, `"m"` for `String`.

</details>

## Done when

- [ ] With the Donald Duck values, your output is exactly the Beispielausgabe.
- [ ] Every box has a fitting type and a camelCase name that says what is inside.
- [ ] You can say for each box **why** you picked its type.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 02_2](../aufgabe-02-2-grenzen-von-long/README.md)
