# Task 08_3 · First and last

Part of [Exercise 08 · Modern Java 25](../README.md). New idea you need: **sequenced collections** (`getFirst`, `getLast`, `reversed`). Sheet: [Sequenced collections](../../../../../../sheets/java/modern/sequenced-collections.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that reads the stops of a delivery round and reports the ends of the line.

First line: an integer `n` (`1` or more) — how many stops follow.

Then `n` lines, one stop name each (single words).

Print exactly three lines:

```text
first: <the first stop>
last: <the last stop>
reversed: <all stops, last to first, separated by one space>
```

Use the **sequenced collection** methods of Java 21+: `getFirst()`, `getLast()` and `reversed()`. No `get(0)`, no `size() - 1`, no hand-written reverse loop.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read `n` stops into a `List<String>` (an `ArrayList`).
2. Print `first: ` + `stops.getFirst()`.
3. Print `last: ` + `stops.getLast()`.
4. Join `stops.reversed()` with spaces and print it after `reversed: `.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `depot` / `market` / `harbour` | `first: depot`, `last: harbour`, `reversed: harbour market depot` |
| `1` then `depot` | `first: depot`, `last: depot`, `reversed: depot` |
| `2` then `a` / `b` | `first: a`, `last: b`, `reversed: b a` |

## Little helpers

<details>
<summary>getFirst does not exist on my list</summary>

Check `java --version`: you need 21 or newer (25 on this path). Also make sure the variable type is `List<String>` or `ArrayList<String>`, not an array.

</details>

<details>
<summary>How do I join a list with spaces?</summary>

`String.join(" ", stops.reversed())` — `reversed()` is a `List`, so `String.join` accepts it directly.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The code uses `getFirst`, `getLast` and `reversed` — no index arithmetic.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 08](../README.md).
