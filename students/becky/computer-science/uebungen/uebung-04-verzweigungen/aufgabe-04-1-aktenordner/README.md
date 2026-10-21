# Aufgabe 04_1 · Aktenordner: shop till

Part of [Übung 04 · Verzweigungen](../README.md). New ideas you need: `if`, `else if`, percent, rounding. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `FolderOrder.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Schreiben Sie ein Programm, um den Preis für Bestellungen von Aktenordnern zu berechnen und auszugeben. Das Programm liest die Bestellmenge als Eingabe ein. Der Listenpreis für einen Aktenordner liegt bei 9,99 EUR. Folgende Rabatte werden gewährt: 1% Rabatt ab einer Stückzahl von 50, 3% ab 100 und 5% ab 200. Auf den berechneten Netto-Betrag werden 19% MwSt. gerechnet. Zusätzlich fallen Frachtkosten in Höhe von 99,99 EUR an, es sei denn, der Bestellwert (inklusive Rabatt und MwSt.) liegt über 1000 EUR. Das Ergebnis soll auf zwei Stellen kaufmännisch gerundet werden.

Hinweis zum Testen: Der Preis für eine Bestellmenge von 80 Aktenordnern liegt inklusive Rabatt, MwSt. und Frachtkosten rechnerisch bei 1041,52752 EUR und auf zwei Stellen kaufmännisch gerundet bei 1041,53 EUR.

## The task, simply said

1. Ask: how many folders?
2. One folder costs 9.99 EUR. Multiply.
3. Take the discount off: 50 or more → 1 %, 100 or more → 3 %, 200 or more → 5 %.
4. Add 19 % tax on top.
5. Is that **more than** 1000 EUR? Then delivery is free. If not, add 99.99 EUR.
6. Round to cents and print.

## Test examples

Your program is right when it gives exactly these answers.

| Folders | Price |
|---------|-------|
| 80 | 1041.53 EUR ← the example from the sheet |
| 1 | 111.88 EUR |
| 49 | 682.51 EUR (no discount yet) |
| 50 | 688.45 EUR (1 % starts here) |
| 99 | 1165.15 EUR (over 1000 → no shipping) |
| 100 | 1153.15 EUR (3 % — cheaper than 99!) |
| 200 | 2258.74 EUR (5 %) |

## Little helpers

<details>
<summary>My price for 250 folders looks too high</summary>

Your `else if` staircase probably asks `>= 50` first. Java stops at the first true step. Start with `>= 200`.

</details>

<details>
<summary>My price for 99 folders has shipping in it</summary>

99 folders cost more than 1000 EUR **with tax**. Check the shipping rule against the price *after* VAT, not before.

</details>

<details>
<summary>My cents are gone (1041.0)</summary>

`Math.round(x * 100) / 100` divides two whole numbers. Write `100.0` at the end.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the discount staircase starts with 200.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 04_2](../aufgabe-04-2-dreieck/README.md)
