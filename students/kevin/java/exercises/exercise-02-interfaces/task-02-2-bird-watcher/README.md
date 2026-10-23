# Task 02_2 · Bird watcher

Part of [Exercise 02 · Interfaces](../README.md). New ideas you need: **`Comparable<T>`**, **`compareTo`**, **`Arrays.sort` on objects**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that lines up the birds of a bird club by size.

First line: an integer `n` (`1` or more) — how many birds follow.

Then `n` lines: `name wingspan`. The wingspan is a whole number in cm.

Print the birds **sorted by wingspan, smallest first**. When two birds have the same wingspan, the one whose name comes first in the alphabet goes first. One line per bird:

```text
<name>: <wingspan> cm
```

Then two more lines:

```text
smallest: <name of the first bird in the sorted list>
largest: <name of the last bird in the sorted list>
```

Model a `Bird` class that `implements Comparable<Bird>`. Put the whole ordering rule into `compareTo`. Sort with `Arrays.sort(birds)` — no hand-written sorting.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read `n`, then build a `Bird[]` from the lines.
2. In `Bird.compareTo`, compare wingspans; if they are equal, compare names.
3. Call `Arrays.sort(birds)`.
4. Print every bird, then the first and the last of the array.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `owl 100` / `wren 15` / `gull 120` | `wren: 15 cm`, `owl: 100 cm`, `gull: 120 cm`, `smallest: wren`, `largest: gull` |
| `2` then `robin 25` / `finch 25` | `finch: 25 cm`, `robin: 25 cm`, `smallest: finch`, `largest: robin` |
| `1` then `kiwi 40` | `kiwi: 40 cm`, `smallest: kiwi`, `largest: kiwi` |

## Little helpers

<details>
<summary>What do I return from compareTo?</summary>

A negative number if `this` comes first, `0` if equal, positive if `this` comes after. `Integer.compare(a, b)` and `name.compareTo(otherName)` already return exactly that.

</details>

<details>
<summary>Arrays.sort says Bird cannot be cast to Comparable</summary>

The class header must say `implements Comparable<Bird>`, and `compareTo` must be `public`.

</details>

<details>
<summary>Where do I import Arrays from?</summary>

`import java.util.Arrays;` at the top of the file.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The ordering rule lives only in `compareTo`; `main` calls `Arrays.sort`.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 02](../README.md).
