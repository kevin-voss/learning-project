# Task 06_2 · Record shortcut

Part of [Exercise 06 · Equals and hashCode](../README.md). New idea you need: **record** (a first look). It is explained in the exercise page; the deep sheet is [Records](../../../../../../sheets/java/modern/records.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Solve the twin-slip task again — this time with a **record** and **without** writing `equals`, `hashCode` or `toString` yourself.

First line: an integer `n` — how many slips follow. Then `n` lines: `id weight`. Twins are slips with the same id **and** weight.

Print the remaining parcels in first-appearance order, one per line, as `<id> <weight>g`, then `unique: <count>` and `duplicates: <dropped>`. Same output as task 06_1.

Model `record Parcel(String id, int weight) {}`. Collect in a `LinkedHashSet<Parcel>`. Build the output line from the record's accessors `id()` and `weight()` (the record's own `toString` prints `Parcel[id=p1, weight=500]`, which is not the format we want).

Use `public static void main(String[] args)`.

## The task, simply said

1. Declare the record in one line.
2. Read `n` lines into a `LinkedHashSet<Parcel>` — the set dedupes because the record already has `equals` and `hashCode`.
3. Print `p.id() + " " + p.weight() + "g"` for each parcel.
4. Print the two count lines.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `p1 500` / `p2 200` / `p1 500` | `p1 500g`, `p2 200g`, `unique: 2`, `duplicates: 1` |
| `2` then `p1 500` / `p1 700` | `p1 500g`, `p1 700g`, `unique: 2`, `duplicates: 0` |
| `0` | `unique: 0`, `duplicates: 0` |

## Little helpers

<details>
<summary>How do I read a field of a record?</summary>

With a method named like the component: `p.id()`, `p.weight()`. There is no `getId()`.

</details>

<details>
<summary>Can I still override toString in a record?</summary>

Yes, records may override methods. For this task, building the line in `main` is enough.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Your file has no `equals`, `hashCode` or `toString` method, and the output matches task 06_1.
- [ ] You can say in one sentence what the record did for you.

Next: [Task 06_3](../task-06-3-boxed-twins/README.md)
