# Aufgabe 04_2 · Dreieck: triangle detective

Part of [Übung 04 · Verzweigungen](../README.md). New ideas you need: `boolean`, `&&`, `||`, tolerance. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `Triangle.java` is half-ready: fill in the `TODO`s |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

Schreiben Sie ein Programm, das die Seitenlängen eines Dreiecks einliest (in cm, mit Nachkommastellen) und folgende Eigenschaften und ausgibt:

- Gültig: Ein Dreieck ist gültig, wenn keine Summe zweier Seitenlängen kleiner oder gleich der dritten Seitenlänge ist.
- Gleichseitig: Ein Dreieck ist gleichseitig, wenn es gültig ist und wenn alle drei Seitenlängen gleich sind.
- Gleichschenkelig: Ein Dreieck ist gleichschenkelig, wenn es gültig ist und wenn zwei Seitenlängen gleich sind.
- Rechtwinkelig: Ein Dreieck ist rechtwinkelig, wenn es gültig ist und wenn die Gleichung c² = a² + b² erfüllt ist, wobei c die längste der drei Seiten ist.

Beachten Sie, dass ein Dreieck mehrere Eigenschaften gleichzeitig haben kann, z.B. kann ein Dreieck gleichzeitig rechtwinklig und gleichschenkelig sein. Gleichseitige Dreiecke sind auch immer gleichschenkelig.

Hinweis zum Testen: Ein Beispiel für ein rechtwinkeliges Dreieck ist ein Dreieck mit den Seitenlängen 3.0, 4.0 und 5.0 cm.

## The task, simply said

1. Ask for the three sides a, b, c (they can have a dot, like 3.5).
2. **Valid?** Any two sides together must be longer than the third one. (Try it with three pencils: if two are too short, they cannot meet at the top.)
3. **Equilateral?** Valid, and all three are the same.
4. **Isosceles?** Valid, and at least two are the same.
5. **Right-angled?** Valid, and longest × longest = the other two squared and added up.
6. Print all four answers with `true` / `false`. Several can be true at once.

## Test examples

Your program is right when it gives exactly these answers.

| a | b | c | Valid | Equilateral | Isosceles | Right-angled |
|---|---|---|-------|-------------|-----------|--------------|
| 3.0 | 4.0 | 5.0 | true | false | false | true |
| 5 | 3 | 4 | true | false | false | true (longest is first!) |
| 2 | 2 | 2 | true | true | true | false |
| 5 | 5 | 8 | true | false | true | false |
| 1 | 1 | 1.4142135623730951 | true | false | true | true |
| 1 | 2 | 3 | false | false | false | false |
| -3 | 4 | 5 | false | false | false | false |

## Little helpers

<details>
<summary>How do I find the longest side?</summary>

Start by guessing `c` is the longest. Then: if `a` is bigger than or equal to both others, it is `a`. Else if `b` is bigger than or equal to both others, it is `b`. Remember the two short sides too.

</details>

<details>
<summary>1, 1, 1.4142135623730951 says "not right-angled"</summary>

You compared doubles with `==`. Use `Math.abs(difference) < 0.000001` instead ([Übung page](../README.md), part 11: "Doubles can tell tiny fibs").

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say why the right-angle check needs a tolerance and the other checks do not.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 04_3](../aufgabe-04-3-datum/README.md)
