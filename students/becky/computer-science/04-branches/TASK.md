# Task 04 · Branches (Verzweigungen)

First read [README.md](README.md). It explains every new idea you need here.

Three small programs. Do them in order: each one is a bit harder than the one before.

| Aufgabe | Program | File in `starter/` | Uses |
|---------|---------|--------------------|------|
| 04_1 | Shop till | `FolderOrder.java` | `if`, `else if`, percent, rounding |
| 04_2 | Triangle detective | `Triangle.java` | `boolean`, `&&`, `\|\|`, tolerance |
| 04_3 | Calendar guard | `DateCheck.java` | `switch`, `%`, leap years |

## The task (original)

> Prof. Dr.-Ing. Dennis Chong · Tim Dannhauer, M. Sc. · Hochschule Hannover, Fakultät IV – Wirtschaft und Informatik, Abteilung WI
> **Programmieren 1 | Übung 04 Verzweigungen**

**Aufgabe 04_1**

Schreiben Sie ein Programm, um den Preis für Bestellungen von Aktenordnern zu berechnen und auszugeben. Das Programm liest die Bestellmenge als Eingabe ein. Der Listenpreis für einen Aktenordner liegt bei 9,99 EUR. Folgende Rabatte werden gewährt: 1% Rabatt ab einer Stückzahl von 50, 3% ab 100 und 5% ab 200. Auf den berechneten Netto-Betrag werden 19% MwSt. gerechnet. Zusätzlich fallen Frachtkosten in Höhe von 99,99 EUR an, es sei denn, der Bestellwert (inklusive Rabatt und MwSt.) liegt über 1000 EUR. Das Ergebnis soll auf zwei Stellen kaufmännisch gerundet werden.

Hinweis zum Testen: Der Preis für eine Bestellmenge von 80 Aktenordnern liegt inklusive Rabatt, MwSt. und Frachtkosten rechnerisch bei 1041,52752 EUR und auf zwei Stellen kaufmännisch gerundet bei 1041,53 EUR.

**Aufgabe 04_2**

Schreiben Sie ein Programm, das die Seitenlängen eines Dreiecks einliest (in cm, mit Nachkommastellen) und folgende Eigenschaften und ausgibt:

- Gültig: Ein Dreieck ist gültig, wenn keine Summe zweier Seitenlängen kleiner oder gleich der dritten Seitenlänge ist.
- Gleichseitig: Ein Dreieck ist gleichseitig, wenn es gültig ist und wenn alle drei Seitenlängen gleich sind.
- Gleichschenkelig: Ein Dreieck ist gleichschenkelig, wenn es gültig ist und wenn zwei Seitenlängen gleich sind.
- Rechtwinkelig: Ein Dreieck ist rechtwinkelig, wenn es gültig ist und wenn die Gleichung c² = a² + b² erfüllt ist, wobei c die längste der drei Seiten ist.

Beachten Sie, dass ein Dreieck mehrere Eigenschaften gleichzeitig haben kann, z.B. kann ein Dreieck gleichzeitig rechtwinklig und gleichschenkelig sein. Gleichseitige Dreiecke sind auch immer gleichschenkelig.

Hinweis zum Testen: Ein Beispiel für ein rechtwinkeliges Dreieck ist ein Dreieck mit den Seitenlängen 3.0, 4.0 und 5.0 cm.

**Aufgabe 04_3**

Schreiben Sie ein Programm, das ein Datum in Form dreier Zahlen für Tag (1-31), Monat (1-12) und Jahr einliest. Das Programm soll prüfen und ausgeben, ob es sich um ein gültiges Datum handelt. Ein gültiges Datum liegt vor, wenn der Monat zwischen 1 und 12 liegt und der Tag zwischen 1 und dem letzten Tag des Monats. Der letzte Tag des Monats ist dabei abhängig vom Monat:

- 31 für die Monate Januar, März, Mai, Juli, August, Oktober und Dezember
- 30 für die Monate April, Juni, September, November
- 28 für den Monat Februar bzw. 29 im Falle eines Schaltjahres

Ein Jahr ist ein Schaltjahr, wenn es durch 4 teilbar ist. Jahre, die durch 100, aber nicht durch 400 teilbar sind, sind aber keine Schaltjahre.

---

## The task, simply said

### 04_1 · Shop till

1. Ask: how many folders?
2. One folder costs 9.99 EUR. Multiply.
3. Take the discount off: 50 or more → 1 %, 100 or more → 3 %, 200 or more → 5 %.
4. Add 19 % tax on top.
5. Is that **more than** 1000 EUR? Then delivery is free. If not, add 99.99 EUR.
6. Round to cents and print.

### 04_2 · Triangle detective

1. Ask for the three sides a, b, c (they can have a dot, like 3.5).
2. **Valid?** Any two sides together must be longer than the third one. (Try it with three pencils: if two are too short, they cannot meet at the top.)
3. **Equilateral?** Valid, and all three are the same.
4. **Isosceles?** Valid, and at least two are the same.
5. **Right-angled?** Valid, and longest × longest = the other two squared and added up.
6. Print all four answers with `true` / `false`. Several can be true at once.

### 04_3 · Calendar guard

1. Ask for day, month, year.
2. Find out if the year is a leap year.
3. Find out how many days the month has (28, 29, 30 or 31).
4. Valid if the month is 1–12 **and** the day is 1 up to that last day.
5. Print if the date is valid or not.

---

## Test examples

Your program is right when it gives exactly these answers. On a German computer prices are printed with a comma (`1041,53`); that is fine.

### 04_1

| Folders | Price |
|---------|-------|
| 80 | 1041.53 EUR ← the example from the sheet |
| 1 | 111.88 EUR |
| 49 | 682.51 EUR (no discount yet) |
| 50 | 688.45 EUR (1 % starts here) |
| 99 | 1165.15 EUR (over 1000 → no shipping) |
| 100 | 1153.15 EUR (3 % — cheaper than 99!) |
| 200 | 2258.74 EUR (5 %) |

### 04_2

| a | b | c | Valid | Equilateral | Isosceles | Right-angled |
|---|---|---|-------|-------------|-----------|--------------|
| 3.0 | 4.0 | 5.0 | true | false | false | true |
| 5 | 3 | 4 | true | false | false | true (longest is first!) |
| 2 | 2 | 2 | true | true | true | false |
| 5 | 5 | 8 | true | false | true | false |
| 1 | 1 | 1.4142135623730951 | true | false | true | true |
| 1 | 2 | 3 | false | false | false | false |
| -3 | 4 | 5 | false | false | false | false |

### 04_3

| Day | Month | Year | Answer |
|-----|-------|------|--------|
| 29 | 2 | 2024 | valid (leap year) |
| 29 | 2 | 2023 | NOT valid |
| 29 | 2 | 1900 | NOT valid (÷100 but not ÷400) |
| 29 | 2 | 2000 | valid (÷400) |
| 31 | 4 | 2025 | NOT valid (April has 30) |
| 31 | 12 | 2025 | valid |
| 0 | 5 | 2025 | NOT valid |
| 15 | 13 | 2025 | NOT valid |

---

## Little helpers

<details>
<summary>04_1 · My price for 250 folders looks too high</summary>

Your `else if` staircase probably asks `>= 50` first. Java stops at the first true step. Start with `>= 200`.

</details>

<details>
<summary>04_1 · My price for 99 folders has shipping in it</summary>

99 folders cost more than 1000 EUR **with tax**. Check the shipping rule against the price *after* VAT, not before.

</details>

<details>
<summary>04_1 · My cents are gone (1041.0)</summary>

`Math.round(x * 100) / 100` divides two whole numbers. Write `100.0` at the end.

</details>

<details>
<summary>04_2 · How do I find the longest side?</summary>

Start by guessing `c` is the longest. Then: if `a` is bigger than or equal to both others, it is `a`. Else if `b` is bigger than or equal to both others, it is `b`. Remember the two short sides too.

</details>

<details>
<summary>04_2 · 1, 1, 1.4142135623730951 says "not right-angled"</summary>

You compared doubles with `==`. Use `Math.abs(difference) < 0.000001` instead (README, part 11).

</details>

<details>
<summary>04_3 · How do I write "divisible by 4"?</summary>

`year % 4 == 0`. "Not divisible by 100" is `year % 100 != 0`.

</details>

<details>
<summary>04_3 · February always has 28 days in my program</summary>

Inside `case 2:` you need a small `if (leapYear)` with 29, `else` 28.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the discount staircase starts with 200.
- [ ] You can explain the leap-year rule with 1900 and 2000.
- [ ] You can explain your code out loud in your own words.

(Typing letters instead of numbers crashes the program. That is fine for now: catching wrong input comes in a later Übung.)
