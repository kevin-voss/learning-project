# Aufgabe 03_2 · Euro und Cent: piggy bank counter

Part of [Übung 03 · Operationen und Ausdrücke](../README.md). New ideas you need: `int / int`, `%`, casts, rounding with a cast. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `EuroCent.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Schreiben Sie ein Programm, das einen **Geldbetrag in Euro-Cent** von der Konsole einliest und folgende Informationen ausgibt:

**a)** Den Betrag umgerechnet in **volle Euro** und **verbleibende Cent**.

**b)** Den Euro-Betrag **mit Nachkommastellen**.

**c)** Den Betrag **kaufmännisch gerundet** auf volle Euro (d. h. bis 49 Cent wird jeweils abgerundet, ab 50 Cent aufgerundet). Das Runden soll **ohne** die Nutzung vorgefertigter Java-Methoden zum Runden erfolgen und auf eine **explizite Typumwandlung** zurückgeführt werden.

**Beispiel für einen Programmablauf**

```text
Cent: 1495
14 EUR 95 CENT
14.95 EUR
15 EUR
```

**Anforderungen**

- Eingabewert als ganze Zahl (Cent) behandeln.
- Die drei Ausgabeformate wie im Beispiel (Groß-/Kleinschreibung und Leerzeichen können Sie an das Beispiel anpassen).
- Programm **testen** mit weiteren Cent-Beträgen (z. B. Grenzfälle um 49/50 Cent).

**Hinweise**

- Klassenname und Dateiname müssen zusammenpassen.

## The task, simply said

1. Ask: how many cents? (whole number)
2. **a)** How many **full** euros fit in? How many cents are **left over**? Print `14 EUR 95 CENT`.
3. **b)** The same amount as euros with a dot. Print `14.95 EUR`.
4. **c)** Round to full euros the shop way: up to 49 cents down, from 50 cents up. Print `15 EUR`.
5. For c): no `Math.round`! Use a cast like `(int)`.

## Test examples

Your program is right when it gives exactly these answers.

| Cent | a) | b) | c) |
|------|----|----|----|
| 1495 | 14 EUR 95 CENT | 14.95 EUR | 15 EUR ← the example from the sheet |
| 1449 | 14 EUR 49 CENT | 14.49 EUR | 14 EUR (49 → down) |
| 1450 | 14 EUR 50 CENT | 14.5 EUR | 15 EUR (50 → up) |
| 49 | 0 EUR 49 CENT | 0.49 EUR | 0 EUR |
| 50 | 0 EUR 50 CENT | 0.5 EUR | 1 EUR |
| 0 | 0 EUR 0 CENT | 0.0 EUR | 0 EUR |
| 100 | 1 EUR 0 CENT | 1.0 EUR | 1 EUR |
| 199 | 1 EUR 99 CENT | 1.99 EUR | 2 EUR |

`14.5` instead of `14.50` is fine: `println` prints a `double` with as few digits as possible, always with a **dot**.

## Your first try

What is already good:

- Part a) is spot on: you used the two right operators to get the full euros and the leftover cents.
- Part c) does exactly what the sheet asks: rounding with an explicit cast, no ready-made rounding method.

What is still open:

- The output looks a bit different from the sheet's example. Run it with 1495 and compare letter by letter: there is a missing space between the euros and the cents, and the lines have extra labels. The sheet allows small changes, so this is only polish.

## Little helpers

<details>
<summary>My b) prints <code>14.0</code> instead of <code>14.95</code></summary>

Both numbers in your division are `int`, so Java throws the part after the dot away **before** it goes into the `double` box. Make one of them a `double` (idea 2 and 7 on the Übung page).

</details>

<details>
<summary>What does <code>(int)</code> do with 14.95?</summary>

Try it: `System.out.println((int) 14.95);`. It does not round, it chops. Now think: what could you add to 14.95 so that chopping lands on 15, but 14.49 still lands on 14?

</details>

<details>
<summary>Do I need <code>printf</code>?</summary>

No, `println` is enough and always prints a dot. If you use `printf("%.2f", ...)`, a German computer prints a **comma** (`14,95`), because `printf` follows the language settings of the computer.

</details>

## Done when

- [ ] Every test example above gives the right answer, especially 1449 and 1450.
- [ ] There is no `Math.round` in your code.
- [ ] You can explain with 1449 and 1450 how your rounding works.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 03_3](../aufgabe-03-3-mobilfunktarif/README.md)
