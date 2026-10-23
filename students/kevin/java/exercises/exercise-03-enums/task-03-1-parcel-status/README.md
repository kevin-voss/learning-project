# Task 03_1 · Parcel status

Part of [Exercise 03 · Enums](../README.md). New ideas you need: **enum**, **enum in a switch**, **enum method**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that follows one parcel's journey, event by event.

First line: an integer `n` — how many events follow.

Then `n` lines, each holding exactly one status word. The words are:

`CREATED`, `IN_TRANSIT`, `DELIVERED`, `LOST`

A journey is legal step by step:

1. The first event must be `CREATED`.
2. `CREATED` may go to `IN_TRANSIT`.
3. `IN_TRANSIT` may go to `DELIVERED` or `LOST`.
4. `DELIVERED` and `LOST` are final: nothing follows them.

Print exactly one line per event, in input order:

- legal step: `ok: <STATUS>`
- illegal step: `error: <STATUS>`

An error does not stop the run: print the line and carry on with the next event. After an error the parcel keeps its current status.

Model the status as an **enum** `Status` with a method like `boolean canGoTo(Status next)` that holds the chain rules — the rules live inside the enum, not in `main`.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many events come next.
2. Keep the parcel's current status; before the first event there is none.
3. For each event word: ask whether this step is allowed.
4. Allowed: print `ok:` and move to the new status. Not allowed: print `error:` and stay.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `CREATED` / `IN_TRANSIT` / `DELIVERED` | `ok: CREATED`, `ok: IN_TRANSIT`, `ok: DELIVERED` |
| `3` then `CREATED` / `IN_TRANSIT` / `LOST` | `ok: CREATED`, `ok: IN_TRANSIT`, `ok: LOST` |
| `1` then `IN_TRANSIT` | `error: IN_TRANSIT` (the first event must be `CREATED`) |
| `4` then `CREATED` / `IN_TRANSIT` / `DELIVERED` / `IN_TRANSIT` | three `ok:` lines, then `error: IN_TRANSIT` (`DELIVERED` is final) |
| `4` then `CREATED` / `CREATED` / `IN_TRANSIT` / `DELIVERED` | `ok: CREATED`, `error: CREATED`, `ok: IN_TRANSIT`, `ok: DELIVERED` (the run continues after an error) |
| `0` | nothing |

## Little helpers

<details>
<summary>Where do the chain rules go?</summary>

Inside the enum: `boolean canGoTo(Status next)` with a switch on `this` reads exactly like the four rules. `main` only asks `current.canGoTo(next)` — it does not know the rules.

</details>

<details>
<summary>What is the current status before the first event?</summary>

There is none. A `Status current = null;` says that. While `current` is `null`, the only legal event is `CREATED`.

</details>

<details>
<summary>The parcel jumped wrongly — does its status change?</summary>

No. An error line is printed and the current status stays what it was. Only an `ok:` moves the parcel.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The chain rules live in the enum (`canGoTo`), not in `main`; errors do not stop the run.
- [ ] You can explain your code out loud in your own words.

Next: [Task 03_2](../task-03-2-coffee-sizes/README.md)
