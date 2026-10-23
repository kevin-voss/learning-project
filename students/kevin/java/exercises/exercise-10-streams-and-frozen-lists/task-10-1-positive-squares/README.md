# Task 10_1 · Positive squares

Part of [Exercise 10 · Streams and frozen lists](../README.md). Sheet: [Streams](../../../../../../sheets/java/advanced/streams.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk** |
| [`solution/`](solution/README.md) | Sample solution |

## The task (from the sheet)

First line: `n`. Then one line with `n` integers separated by spaces (or `n` lines with one integer each — pick one style and stick to it; the tests type **one integer per line** after `n`).

Keep only numbers **strictly greater than 0**. Square each kept number. Print:

```text
sum: <total>
```

where `<total>` is the sum of those squares.

Use a **stream** pipeline for filter → square → sum. Example: inputs `3, -1, 4, 0, 2` → `9 + 16 + 4 = 29`.

## The task, simply said

1. Read `n` and then `n` integers.
2. Stream: keep `> 0`, square, sum.
3. Print `sum: …`.

## Test examples

| You type | The program says |
|----------|------------------|
| `5` then `3` `-1` `4` `0` `2` | `sum: 29` |
| `1` then `0` | `sum: 0` |
| `1` then `-5` | `sum: 0` |
| `1` then `7` | `sum: 49` |
| `3` then `1` `1` `1` | `sum: 3` |
| `0` | `sum: 0` |

## Little helpers

<details>
<summary>map vs mapToInt</summary>

`mapToInt(n -> n * n).sum()` avoids boxing. `map(n -> n * n).reduce(0, Integer::sum)` also works.

</details>

## Done when

- [ ] Every test matches.
- [ ] You used a stream (not only a classic loop for the whole pipeline).
- [ ] You can say what `filter` and `map` each do.

Next: [Task 10_2](../task-10-2-unique-tags/README.md)
