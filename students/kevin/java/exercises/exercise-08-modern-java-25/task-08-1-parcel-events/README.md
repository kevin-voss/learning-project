# Task 08_1 · Parcel events

Part of [Exercise 08 · Modern Java 25](../README.md). New ideas: **record**, **sealed**, **pattern matching**. Sheets: [Records](../../../../../../sheets/java/modern/records.md), [Sealed types and pattern matching](../../../../../../sheets/java/modern/sealed-patterns.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that reads parcel events and prints one line per event.

First line: an integer `n` — how many events follow.

Then `n` lines. Each line is one of:

| Line | Meaning |
|------|---------|
| `CREATED <id>` | A new parcel appears |
| `SHIPPED <id> <vehicle>` | The parcel left on that vehicle |
| `DELIVERED <id>` | The parcel arrived |
| `RETURNED <id> <reason>` | The parcel came back; reason is one word |

`<id>`, `<vehicle>` and `<reason>` are single tokens (no spaces).

Print exactly one line per event, in input order:

| Event | Print |
|-------|--------|
| CREATED | `new parcel <id>` |
| SHIPPED | `<id> left on <vehicle>` |
| DELIVERED | `<id> arrived` |
| RETURNED | `<id> came back: <reason>` |

Model the events with a **sealed** type and **records**. Format each line with a **pattern-matching** `switch` (no long `if` / `instanceof` chain).

Use `public static void main(String[] args)` so the test runner finds your program. Java 25.

## The task, simply said

1. Read how many events come next.
2. For each event line, build the matching record.
3. Turn that record into the output sentence with a sealed `switch`.
4. Print that sentence.
5. Repeat until all events are done.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `CREATED mail-1` | `new parcel mail-1` |
| `1` then `SHIPPED mail-1 bike-3` | `mail-1 left on bike-3` |
| `1` then `DELIVERED mail-1` | `mail-1 arrived` |
| `1` then `RETURNED mail-2 wet` | `mail-2 came back: wet` |
| `3` then `CREATED a` / `SHIPPED a van-9` / `DELIVERED a` | three lines: `new parcel a`, `a left on van-9`, `a arrived` |

## Little helpers

<details>
<summary>javac talks about "not exhaustive" on my switch</summary>

Your sealed parent must `permits` every record you use, and every permitted type needs a `case`. No `default` needed when the list is complete.

</details>

<details>
<summary>How do I split the input line?</summary>

`line.split(" ")` gives the tokens. Check `parts[0]` for the kind, then read the rest.

</details>

<details>
<summary>The tests cannot find my main</summary>

Keep `public static void main(String[] args)`. A short Java 25 `void main()` is fine for play, not for these tests.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] Events are records under a sealed type; formatting uses a pattern `switch`.
- [ ] You can explain your code out loud in your own words.

Next: [Task 08_2](../task-08-2-busy-post-office/README.md)
