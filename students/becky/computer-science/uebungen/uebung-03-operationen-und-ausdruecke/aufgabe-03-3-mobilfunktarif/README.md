# Aufgabe 03_3 · Mobilfunktarif: phone bill

Part of [Übung 03 · Operationen und Ausdrücke](../README.md). New ideas you need: `final` constants, units, Punkt vor Strich, `int / int`, the `(int)` cast. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `MobileTariff.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Gegeben sei ein Mobilfunktarif mit folgenden Konditionen:

- **Monatliche Grundgebühr:** 9,95 EUR
- **Datenvolumen:** 5 GB inklusive, danach **2,95 EUR** je **500 MB**
- **Telefonie:** 100 Minuten inklusive, danach **9 Cent** je Minute

Schreiben Sie ein Programm, das vom Benutzer das **monatliche Datenvolumen in GB** (ohne Nachkommastellen) und die **Anzahl der monatlichen Telefonminuten** (ohne Nachkommastellen) abfragt und hierzu die **jährlichen Kosten** in dem Mobilfunktarif hochrechnet.

Da es um eine überschlägige Rechnung geht, sollen die errechneten **Jahreskosten als Euro-Beträge ohne Nachkommastellen** ausgegeben werden.

**Testwerte (zur Kontrolle)**

| Datenvolumen | Telefonminuten | Jährliche Kosten |
|--------------|----------------|------------------|
| 5 GB         | 100 Minuten    | 119 EUR          |
| 5 GB         | 150 Minuten    | 173 EUR          |
| 5 GB         | 200 Minuten    | 227 EUR          |
| 7 GB         | 100 Minuten    | 261 EUR          |
| 7 GB         | 150 Minuten    | 315 EUR          |
| 7 GB         | 200 Minuten    | 369 EUR          |
| 10 GB        | 100 Minuten    | 473 EUR          |
| 10 GB        | 150 Minuten    | 527 EUR          |
| 10 GB        | 200 Minuten    | 581 EUR          |

Testen Sie Ihr Programm u. a. mit diesen Beispielwerten.

**Reflexion**

Vermutlich liefert Ihr Programm falsche Werte, wenn **weniger als 5 GB** oder **weniger als 100 Minuten** eingegeben werden. **Warum ist das so?** (Schriftlich beantworten, z. B. in diesem README unter einer eigenen Überschrift oder als Kommentar im Quelltext — **ohne** die Lösung hier vorab einzutragen.)

**Anforderungen**

- Tarifwerte (Grundgebühr, Inklusivvolumen, Preise, Inklusivminuten) sinnvoll als Konstanten oder klar benannte Werte im Programm fassen.
- Programm **testen** mit der Tabelle oben und eigenen Eingaben.

**Hinweise**

- Klassenname und Dateiname müssen zusammenpassen.
- Achten Sie darauf, Einheiten (GB, MB, EUR, Cent) bei der Berechnung konsistent zu verwenden.

## The task, simply said

1. Put every number of the tariff in a `final` box. They are all **per month**.
2. Ask: how many GB per month? How many minutes per month? (whole numbers)
3. How much is used **on top of** the free 5 GB and the free 100 minutes?
4. Extra data is paid in blocks of **500 MB**, 2.95 EUR each. How many blocks are the extra GB?
5. Extra minutes cost **9 cent** each. That is 0.09 EUR.
6. One month = fee + data blocks + extra minutes.
7. One year = 12 months.
8. Print the yearly cost **without** digits after the dot.
9. Try 3 GB with 100 minutes, then 5 GB with 50 minutes. Answer the reflection question in your own words.

## Test examples

Your program is right when it gives exactly these answers.

| GB per month | Minutes per month | The program says |
|--------------|-------------------|------------------|
| 5 | 100 | Jahreskosten: 119 EUR ← only the fee |
| 5 | 150 | Jahreskosten: 173 EUR |
| 5 | 200 | Jahreskosten: 227 EUR |
| 7 | 100 | Jahreskosten: 261 EUR |
| 7 | 150 | Jahreskosten: 315 EUR |
| 7 | 200 | Jahreskosten: 369 EUR |
| 10 | 100 | Jahreskosten: 473 EUR |
| 10 | 150 | Jahreskosten: 527 EUR |
| 10 | 200 | Jahreskosten: 581 EUR |
| 6 | 100 | Jahreskosten: 190 EUR (one extra GB) |
| 5 | 101 | Jahreskosten: 120 EUR (one extra minute) |
| 8 | 130 | Jahreskosten: 364 EUR |

The first nine rows are the table from the sheet. For fewer than 5 GB or fewer than 100 minutes there is no "right" answer yet: see the reflection question.

## Your first try

What is already good:

- All tariff values have their own named box, and you spotted that one extra GB means **two** 500-MB blocks.
- You already noticed the program cannot be fully right without `if`. That is exactly the reflection question, so write your thought down in your own words.

What is still open:

- The free 5 GB and 100 minutes are a **monthly** gift. Look at the moment when your program turns a month into a year, and at the moment when it takes away the free amount. Which should come first? Work out 5 GB and 100 minutes by hand and compare it with your program.
- Your program works out a total, but it prints a different box. Check which number ends up on the screen, and that it has no digits after the dot.

## Little helpers

<details>
<summary>5 GB and 100 minutes do not give 119</summary>

With nothing on top, the bill is only the fee: 9.95 × 12 = 119.4. If you get something else, print your boxes one by one (`extraGb`, `extraMinutes`, the monthly cost) and see where the first wrong number appears.

</details>

<details>
<summary>How do I turn GB into 500-MB blocks?</summary>

Same unit first: how many MB are in one GB? Then: how many times do 500 MB fit into that? Two small steps, two lines.

</details>

<details>
<summary>9 cent or 9 EUR?</summary>

Everything else is in EUR. So 9 cent must be written in EUR too.

</details>

<details>
<summary>How do I get rid of the digits after the dot?</summary>

One of the casts from the Übung page does exactly this (idea 7). The table cannot tell you if it should chop or round, because every real result ends in `.0` or `.4`. Both give the same nine numbers.

</details>

## Done when

- [ ] All nine rows of the sheet's table give the right answer, plus the three extra rows.
- [ ] Every tariff value is a `final` constant, and 9 cent is written in EUR.
- [ ] You answered the reflection question in your own words (as a comment in your code or here under a heading of your own).
- [ ] You can explain your code out loud in your own words.

That was the last Aufgabe of this Übung. Set all three to `done` in the [Übung](../README.md) and commit.
