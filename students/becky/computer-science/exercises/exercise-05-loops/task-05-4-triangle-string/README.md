# Task 05_4 · Triangle string

Part of [Exercise 05 · Loops](../README.md). New ideas you need: `String`, `length`, `substring`, a counting-down `for`. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `TriangleString.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that reads a string and prints it in the shape of a triangle.

Example program run:

```text
Input: Klausur
Klausur
Klausu
Klaus
Klau
Kla
Kl
K
```

## The task, simply said

1. Ask for a word (a string).
2. Print the whole word.
3. Print the word one letter shorter (drop the last letter).
4. Keep going until only one letter is left.

## Test examples

Your program is right when it gives exactly these answers.

| Input | Output (each line) |
|-------|--------------------|
| `Klausur` | Klausur → Klausu → Klaus → Klau → Kla → Kl → K (the sheet) |
| `Hi` | Hi → H |
| `A` | A (one line only) |
| `Test` | Test → Tes → Te → T |

## Little helpers

<details>
<summary>How do I cut off the last letter?</summary>

`text.substring(0, n)` keeps the first `n` letters. Start with `n = text.length()`, then make `n` one smaller each lap, down to 1.

</details>

<details>
<summary>My triangle grows instead of shrinking</summary>

Count **down**: `for (int n = text.length(); n >= 1; n--)`. Counting up from 1 would grow.

</details>

<details>
<summary>I get an empty line at the end</summary>

Stop at `n >= 1`, not `n >= 0`. Length 0 is the empty string.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] You can say what `substring(0, n)` keeps.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 05](../README.md).
