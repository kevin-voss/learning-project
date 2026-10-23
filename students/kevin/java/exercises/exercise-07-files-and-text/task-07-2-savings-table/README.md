# Task 07_2 · Savings table

Part of [Exercise 07 · Files and text](../README.md). New ideas you need: **`Files.writeString`**, **`Files.readAllLines`**. They are all explained in the exercise page. You also reuse **`HashMap`** from Exercise 04.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that keeps the post office savings in a CSV file.

First line: an integer `n` — how many saving lines follow.

Then `n` lines: `name cents`. Names are single tokens, cents are whole numbers. The same name can appear on several lines.

Your program must:

1. Write a file `savings.csv`: a header line `name,cents`, then one line `name,cents` per input line, in input order.
2. Read the file back.
3. Add the cents per name in a `HashMap`.
4. Print one line per name, in alphabetical order: `<name>: <total>`.
5. Print one last line: `grand total: <T>` — the sum of all cents.

`n = 0`: the file holds only the header. No name line prints, only `grand total: 0`.

The program must still work when you run it twice in a row: the new run replaces the old file. Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many lines come next.
2. Read each `name cents` line.
3. Build the CSV text: header first, then one `name,cents` row per line, in input order.
4. Write `savings.csv`, then read the file back.
5. Skip the header and add the cents per name in a `HashMap`.
6. Print the names in alphabetical order as `<name>: <total>`, then `grand total: <T>`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `2` then `ana 120` / `ben 80` | `ana: 120`, then `ben: 80`, then `grand total: 200` |
| `3` then `ana 100` / `ben 50` / `ana 25` | `ana: 125`, then `ben: 50`, then `grand total: 175` |

## Little helpers

<details>
<summary>How do I skip the header when I read the file back?</summary>

`Files.readAllLines` gives a list of rows. Row `0` is the header — start your loop at `1`.

</details>

<details>
<summary>How do I print the names alphabetically? My HashMap mixes them.</summary>

A `HashMap` has no order. Copy the keys into an `ArrayList` and sort it with `Collections.sort(names)` from `java.util.Collections`.

</details>

<details>
<summary>Do I really have to read the file back? I already have the numbers.</summary>

Yes — that is the point. Tomorrow's program starts from the file, so sum from the rows you read back.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `savings.csv` exists after the run: header first, then one row per input line, in input order.
- [ ] The totals come from the file you read back, added in a `HashMap`.
- [ ] You can explain your code out loud in your own words.

Back to [Exercise 07](../README.md).
