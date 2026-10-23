# Task 10_2 · Unique tags

Part of [Exercise 10 · Streams and frozen lists](../README.md). Sheets: [Immutability](../../../../../../sheets/java/advanced/immutability.md), [Streams](../../../../../../sheets/java/advanced/streams.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk** |
| [`solution/`](solution/README.md) | Sample solution |

## The task (from the sheet)

First line: `n`. Then `n` lines, each one tag word (letters only in the tests).

Build a list of tags that is:

1. lowercased
2. duplicates removed
3. sorted alphabetically (Unicode / natural `String` order)
4. frozen (`toList()` or `List.copyOf` — not a mutable `ArrayList` you keep editing)

Print each tag on its own line, in that sorted order. If `n` is 0, print nothing.

Use a stream pipeline. Do not mutate a shared list from many places.

## The task, simply said

1. Read `n` tags.
2. Stream: lowercase → distinct → sorted → toList.
3. Print one tag per line.

## Test examples

| You type | The program says |
|----------|------------------|
| `5` / `Berlin` / `oslo` / `Berlin` / `Rome` / `oslo` | `berlin` then `oslo` then `rome` |
| `1` / `ALPHA` | `alpha` |
| `2` / `b` / `a` | `a` then `b` |
| `3` / `x` / `x` / `x` | `x` |
| `0` | (no lines) |

## Little helpers

<details>
<summary>distinct before or after lowercase?</summary>

Lowercase first, then distinct. Otherwise `Berlin` and `berlin` both survive.

</details>

<details>
<summary>sorted()</summary>

`sorted()` on a `Stream<String>` uses normal string order. Good enough here.

</details>

## Done when

- [ ] Every test matches.
- [ ] The result list is unmodifiable (from `toList()` / `copyOf`).
- [ ] Duplicates differing only by case count as one tag.

Back to [Exercise 10](../README.md).
