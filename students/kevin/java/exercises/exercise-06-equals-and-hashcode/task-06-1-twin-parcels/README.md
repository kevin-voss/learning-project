# Task 06_1 · Twin parcels

Part of [Exercise 06 · Equals and hashCode](../README.md). New ideas you need: **`equals`**, **`hashCode`**, **`toString`**, **`LinkedHashSet`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that removes twin slips from a pile of parcel slips.

First line: an integer `n` — how many slips follow.

Then `n` lines: `id weight`. Two slips are **twins** when both the id and the weight are the same. Same id with a different weight is **not** a twin: both stay.

Print the parcels that remain, **in the order of their first appearance**, one per line, in this format:

```text
<id> <weight>g
```

Then two more lines:

```text
unique: <how many parcels remain>
duplicates: <how many slips were dropped>
```

Model a plain class `Parcel` with fields `id` and `weight`. Override `equals`, `hashCode` and `toString`. Collect the slips in a `LinkedHashSet<Parcel>` — the set does the dropping; you do no manual duplicate check.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read `n`.
2. For each line, build a `Parcel` and `add` it to a `LinkedHashSet<Parcel>`.
3. Print every parcel in the set (its `toString` makes the line).
4. Print `unique: ` + set size, and `duplicates: ` + (n − set size).

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `p1 500` / `p2 200` / `p1 500` | `p1 500g`, `p2 200g`, `unique: 2`, `duplicates: 1` |
| `2` then `p1 500` / `p1 700` | `p1 500g`, `p1 700g`, `unique: 2`, `duplicates: 0` |
| `3` then `a 1` / `a 1` / `a 1` | `a 1g`, `unique: 1`, `duplicates: 2` |
| `0` | `unique: 0`, `duplicates: 0` |

## Little helpers

<details>
<summary>The set keeps both twins</summary>

Either `equals` or `hashCode` is missing or looks at different fields. Both must use `id` **and** `weight`. The set checks `hashCode` first, then `equals`.

</details>

<details>
<summary>What goes in the equals parameter?</summary>

`public boolean equals(Object o)` — the type is `Object`, always. Inside, `if (!(o instanceof Parcel other)) return false;` gives you a typed `other`.

</details>

<details>
<summary>Why LinkedHashSet and not HashSet?</summary>

`HashSet` forgets the order. `LinkedHashSet` keeps the first-seen order, which the output needs. `import java.util.LinkedHashSet;`.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `equals` and `hashCode` use the same two fields; `main` has no `contains` or manual twin check.
- [ ] You can explain your code out loud in your own words.

Next: [Task 06_2](../task-06-2-record-shortcut/README.md)
