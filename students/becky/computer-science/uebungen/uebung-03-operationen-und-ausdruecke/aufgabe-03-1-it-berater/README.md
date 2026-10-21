# Aufgabe 03_1 · IT-Berater: consultant's bill

Part of [Übung 03 · Operationen und Ausdrücke](../README.md). New ideas you need: `final` constants, `int` × `double`, gluing text and numbers, one `Scanner`. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `ConsultantInvoice.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Ein selbstständiger Berater in der IT-Branche stellt seinen Kunden je geleisteter Arbeitsstunde **120 EUR** in Rechnung. Hinzu kommen Fahrtkosten, die pauschal mit **0,75 EUR** je gefahrenen Kilometer in Rechnung gestellt werden. Es werden nur **volle Arbeitsstunden** und **ganze Kilometer** abgerechnet.

Schreiben Sie ein Programm, das die Zahl der geleisteten Arbeitsstunden sowie die Anzahl der gefahrenen Kilometer einliest und daraus die **Gesamtkosten** für den Auftrag ermittelt. Gestalten Sie die Ausgabe so, dass die Berechnung im Einzelnen nachvollziehbar ist, etwa wie folgt:

```text
Stunden: 70
Kilometer: 490
Arbeitskosten: 70 Stunden zu je 120.0 EUR = 8400.0
Fahrtkosten: 490 km zu je 0.75 EUR = 367.5
Gesamtkosten: 8767.5 EUR
```

**Anforderungen**

- Der **Stundensatz** und die **Kilometerpauschale** sollen als **Konstanten** im Programm vorkommen.
- **Namenskonventionen** für Variablen beachten (`camelCase`, aussagekräftige Namen).
- Das Programm **testen** (eigene und Beispielwerte).

**Hinweise**

- Eingabe und Ausgabe über die Konsole.
- Klassenname und Dateiname müssen zusammenpassen (wie in den bisherigen Übungen).

## The task, simply said

1. Put the two prices in `final` boxes: 120 EUR per hour, 0.75 EUR per km.
2. Ask: how many hours? (whole number)
3. Ask: how many kilometres? (whole number)
4. Work cost = hours × price per hour.
5. Travel cost = kilometres × price per km.
6. Total = work cost + travel cost.
7. Print it like the example: one line per step, so the customer can check every number.

## Test examples

Your program is right when it gives exactly these answers.

| Hours | km | The program says |
|-------|----|------------------|
| 70 | 490 | `Arbeitskosten: 70 Stunden zu je 120.0 EUR = 8400.0`<br>`Fahrtkosten: 490 km zu je 0.75 EUR = 367.5`<br>`Gesamtkosten: 8767.5 EUR` ← the example from the sheet |
| 0 | 0 | `… = 0.0` · `… = 0.0` · `Gesamtkosten: 0.0 EUR` (nothing done, nothing to pay) |
| 1 | 1 | `… = 120.0` · `… = 0.75` · `Gesamtkosten: 120.75 EUR` |
| 8 | 120 | `… = 960.0` · `… = 90.0` · `Gesamtkosten: 1050.0 EUR` (one working day with a trip) |

## Your first try

What is already good:

- Your program reads both numbers and the total is right: 70 hours and 490 km give 8767.5.
- Clear names for your boxes, and you wrote the unit (`in €`) next to the prices.

What is still open:

- The sheet asks for the hourly rate and the price per km as **constants**. Right now they are ordinary boxes that could be changed by accident. Idea 5 on the Übung page shows the "pen".
- Your bill is one long line. The sheet wants it **traceable**: one line for the work, one for the travel, one for the total, like the example. Compare your output with the example word by word.

## Little helpers

<details>
<summary>How do I make a constant?</summary>

Put `final` in front of the type, and write the name in capitals. Then try to change it on the next line and see what `javac` says. (Delete that line again afterwards.)

</details>

<details>
<summary>My program crashes with <code>NoSuchElementException</code> when I pipe the input in</summary>

Count how often you wrote `new Scanner(System.in)`. It should be **once**. Every number is then read from that same `scanner`. See idea 9 on the Übung page.

</details>

<details>
<summary>My line says <code>120.0 EUR = 8400.0</code> without the hours</summary>

Text and numbers are glued with `+`. Glue in the `hours` box between `"Arbeitskosten: "` and `" Stunden zu je "`. Watch the spaces inside the quotes.

</details>

<details>
<summary>Should the price be <code>int</code> or <code>double</code>?</summary>

120 would fit in an `int`, but 0.75 has a dot. And the sheet prints `120.0`. What type prints a number with `.0`?

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Both prices are `final` constants and are used in the calculation **and** in the printed text.
- [ ] There is only one `new Scanner(System.in)` in your file.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 03_2](../aufgabe-03-2-euro-und-cent/README.md)
