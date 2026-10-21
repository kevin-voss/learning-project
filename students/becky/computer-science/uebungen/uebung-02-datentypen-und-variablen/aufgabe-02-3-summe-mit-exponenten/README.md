# Aufgabe 02_3 · Summe mit Exponenten (Sum in e-notation)

Part of [Übung 02 · Datentypen und Variablen](../README.md). New ideas you need: `double`, e-notation, "a `double` has only about 16 digits". They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `FloatingSum.java` is half-ready: fill in the `TODO`s, and your answer to b) in its `README.md` |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

### a) Programm

Schreiben Sie ein Java-Programm, das die folgende Summe berechnet und ausgibt. Nutzen Sie die **Exponentialschreibweise** für Gleitkommazahlen (`double`):

> 2,34 · 10⁶ + 3,45 + 4,56 · 10⁻⁶ + 5,67 · 10⁻¹²

**Java-Literale (Beispiel)**

| Term | Schreibweise in Java |
|------|----------------------|
| 2,34 · 10⁶ | `2.34e6` |
| 3,45 | `3.45` |
| 4,56 · 10⁻⁶ | `4.56e-6` |
| 5,67 · 10⁻¹² | `5.67e-12` |

Rechnen Sie in einem Ausdruck oder in Zwischenschritten; geben Sie das **Ergebnis** auf der Konsole aus.

### b) Reflexion (schriftlich, z. B. im README der Aufgabe oder als Kommentar)

Liefert das Programm das Ergebnis, das nach den Regeln der **exakten Mathematik** zu erwarten wäre? **Begründen Sie mathematisch.**

**Orientierung für die Begründung (ohne fertige Lösung)**

- In der Mathematik sind alle vier Summanden von unterschiedlicher Größenordnung; die exakte Summe enthält Beiträge aller Terme.  
- `double` arbeitet mit **begrenzter Genauigkeit** (IEEE-754, ca. 15–16 signifikante Dezimalstellen).  
- Der Term 2,34 · 10⁶ dominiert die Summe; sehr kleine Terme (10⁻⁶, 10⁻¹²) können beim Addieren zu einem so großen Zwischenwert **nicht mehr vollständig** in der Mantisse repräsentiert werden (**Auslöschung / Rundung**).  
- Vergleichen Sie: exakte rationale Rechnung bzw. grobe Größenordnung der Summe vs. tatsächliche Programmausgabe.

(The formula is written with · and small raised numbers here, so it shows on every screen. The words are the sheet's.)

## The task, simply said

1. a) Write the four numbers in Java's e-notation, add them, print the result.
2. b) Compare Java's answer with the **exact** answer from maths.
3. b) Are they the same? Explain **why** (or why not) in a few sentences, using what you know about `double`.

## Test examples

Your program is right when it gives exactly these answers.

| You run | The program says |
|---------|------------------|
| `java FloatingSum` | `Summe: 2340003.4500045604` |

The **exact** sum from maths, worked out by hand, to compare with in part b):

```text
2340003.450004560005670
```

The same, in groups of three so you can count: `2 340 003 . 450 004 560 005 670`.

## Your first try

What is already good:

- Part a) is right: all four numbers in correct e-notation, added in one expression, and the output is exactly the test example.
- You compared your result with a second tool. Checking a result another way is exactly the right instinct.

What is still open:

- Part b): "identical to the calculator" is not yet an answer to the sheet's question. The question is about **exact mathematics**, not about another machine. Use the guiding questions below.
- The formula in your code comment (and in your notes) does not match the sheet: compare it term by term. Your code itself is right; only the comment is off.

## Questions that guide you to b)

Answer them on your desk (`meine-loesung/README.md`). Together they become your explanation.

1. Put Java's answer and the exact answer one under the other, dots lined up. From which digit on are they different?
2. Count the digits of the exact answer: before the dot and after the dot together. How many are there?
3. The Übung page (idea 9) says a `double` keeps about 15–16 digits. Compare that with your count from question 2. What has to happen to the rest?
4. Which of the four numbers lives furthest to the right, after the dot? Can its digits still fit into those ~16 windows next to 2 340 003?
5. Experiment: remove `+ 5.67e-12` from your program and run it again. What changes in the output? What does that tell you?
6. Your calculator showed the same as Java. How many digits can your calculator display? Does "two machines agree" prove "this is the exact maths"?

<details>
<summary>I do not know how to start the explanation</summary>

Start with a sentence like: "No, because a `double` can only keep about … digits, but the exact sum needs … digits." Then say which number gets lost, and how your experiment from question 5 proves it.

</details>

<details>
<summary>Java says "&lt;ID&gt; erwartet" or "Ungültige Operandentypen … ^"</summary>

You wrote `2,34` (a comma) or `10^6`. In Java a number has a dot, and "times 10 to the 6" is written `e6`: `2.34e6`.

</details>

## Done when

- [ ] a) prints `2340003.4500045604`.
- [ ] b) you answered "yes" or "no" **and** explained why in your own words, with the digit counts.
- [ ] b) you did the experiment from question 5 and wrote what it shows.
- [ ] You can explain your code out loud in your own words.

That was the last Aufgabe of this Übung. Set all three to `done` in the [Übung](../README.md), then go on to [Übung 03](../../uebung-03-operationen-und-ausdruecke/README.md).
