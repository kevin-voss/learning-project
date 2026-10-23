# Task 09_2 · Safe divide

Part of [Exercise 09 · Clean Java habits](../README.md). Sheet: [Optional](../../../../../../sheets/java/advanced/optional.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk** |
| [`solution/`](solution/README.md) | Sample solution |

## The task (from the sheet)

Write a program that reads integer divisions safely.

First line: `n`. Then `n` lines, each with two integers `a` and `b` separated by a space.

For each pair:

- if `b` is `0` → print `undefined`
- otherwise → print the integer quotient `a / b` (Java truncating division)

Implement a method like `OptionalInt divide(int a, int b)` (or `Optional<Integer>`) that is **empty** when `b == 0`, and present with the quotient otherwise. Print from `main` using that result. No `null` returns from the divide method.

## The task, simply said

1. Read how many pairs follow.
2. For each pair, call your Optional divide.
3. Empty → `undefined`. Present → print the number.

## Test examples

| You type | The program says |
|----------|------------------|
| `1` / `10 2` | `5` |
| `1` / `7 0` | `undefined` |
| `1` / `-9 4` | `-2` |
| `1` / `5 -2` | `-2` |
| `3` / `10 2` / `7 0` / `-9 4` | `5`, `undefined`, `-2` |
| `0` | (no lines) |

## Little helpers

<details>
<summary>OptionalInt vs Optional&lt;Integer&gt;</summary>

Both are fine. `OptionalInt.of(a / b)` and `OptionalInt.empty()` avoid boxing.

</details>

<details>
<summary>Negative numbers</summary>

Use normal Java `int` division. `-9 / 4` is `-2`.

</details>

## Done when

- [ ] Every test example matches.
- [ ] Divide returns Optional (empty on zero divisor).
- [ ] You can explain why Optional beats returning a magic number like `0`.

Back to [Exercise 09](../README.md).
