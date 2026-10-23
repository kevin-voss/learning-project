# Task 03_3 · Signal tower

Part of [Exercise 03 · Enums](../README.md). New ideas you need: **switch expression**, **`->` arrow case**, **`yield`**. They are all explained in the exercise page — the deep track only shows the classic switch, so this page is the home of the expression form.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program for the signal tower above the post-office crossing. The tower reads one line per minute and says what the cars must do.

First line: an integer `n` — how many minutes follow.

Then `n` lines: `color cars`. The `color` is exactly one of `RED`, `YELLOW`, `GREEN`. The `cars` is an integer `0` or more — how many cars wait at the crossing. Inputs are always valid, so no line can go wrong.

Print exactly one line per minute, in input order: `<color>: <action>`

- `RED` → `stop`
- `GREEN` → `go`
- `YELLOW` → `clear` when `cars` is greater than `10`, otherwise `stop` (many cars waiting: wave them through)

Model the light as an **enum** `Light { RED, YELLOW, GREEN }`. Turn the typed colour into the constant with `Light.valueOf(word)`. Compute the action with a **switch expression**: the switch itself hands back the action String. The YELLOW case needs a small block with `yield`, and there is no `default` — the three constants are the whole menu.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many minutes come next.
2. For each minute: read the colour and the waiting cars.
3. Ask the switch: what is the action for this colour?
4. YELLOW looks at the cars: more than 10 → `clear`, otherwise `stop`.
5. Print `color: action`, one line per minute. With `n = 0` print nothing.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `RED 0` | `RED: stop` |
| `1` then `GREEN 0` | `GREEN: go` |
| `1` then `YELLOW 3` | `YELLOW: stop` |
| `1` then `YELLOW 10` | `YELLOW: stop` (10 is **not** more than 10) |
| `1` then `YELLOW 11` | `YELLOW: clear` (11 is more than 10) |
| `3` then `RED 2` / `GREEN 7` / `YELLOW 20` | `RED: stop`, `GREEN: go`, `YELLOW: clear` |
| `0` | nothing at all |

## Little helpers

<details>
<summary>How do I turn the typed word RED into the Light constant?</summary>

`Light.valueOf("RED")` gives back the constant with that name. The sheet promises the word is always one of the three colours, so this never fails.

</details>

<details>
<summary>Where does the switch's answer go?</summary>

Straight into a variable, in one line: `String action = switch (light) { ... };` — note the semicolon after the closing brace. Inside, each colour hands back its word: `case RED -> "stop";`. YELLOW needs two lines, so it gets a block `{ }` and hands its answer back with `yield`.

</details>

<details>
<summary>Why is there no default case?</summary>

You listed every constant the enum has, so every possible light already has a case. That is the safety: add a `BLUE` to the enum later and the compiler refuses your switch until you say what BLUE does — instead of silently doing nothing.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The action is computed by one switch expression that hands back a String — no `break` anywhere.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 03](../README.md).
