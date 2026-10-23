# Task 04_3 · RS flip-flop

Part of [Exercise 04 · Switching circuits](../README.md). New ideas you need: RS flip-flop, hold / set / reset / forbidden. Explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Complete the truth table there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Describe how an **RS flip-flop** works by completing the following truth table.

*(The paper table is the usual NOR-RS table with columns for `S`, `R`, next `Q`, next `Q̄`, and a short note for each row.)*

## The task, simply said

Picture a sticky light switch: Set turns it on, Reset turns it off, neither keeps it as it was.

1. Use a **NOR-based RS** flip-flop (the usual first teaching form).
2. Fill next `Q` and next `Q̄` for every `S`/`R` pair.
3. Write a short note: hold, set, reset, or forbidden.
4. For the hold row, next `Q` is “whatever `Q` was” (often written `Q` / `Q̄`).

## Check examples

| S | R | Next Q | Next Q̄ | Note |
|---|---|--------|---------|------|
| 0 | 0 | old Q  | old Q̄  | hold / store |
| 0 | 1 | 0      | 1       | reset |
| 1 | 0 | 1      | 0       | set |
| 1 | 1 | —      | —       | forbidden |

## Little helpers

<details>
<summary>Why is S = R = 1 forbidden?</summary>

Both NOR outputs want to be 0. Then `Q` and `Q̄` are no longer opposites, and when you leave that state the next value can race. So the row is marked forbidden / invalid.

</details>

<details>
<summary>What do I write for hold?</summary>

Keep symbols: `Q` and `Q̄` (meaning “unchanged”), or write “previous value”.

</details>

## Done when

- [ ] All four `S`/`R` rows are filled.
- [ ] Forbidden is clearly marked for `S = R = 1`.
- [ ] You can explain set vs reset in one sentence each.

Next: [Task 04_4](../task-04-4-rs-sketch-states/README.md)
