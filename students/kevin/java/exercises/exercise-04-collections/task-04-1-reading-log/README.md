# Task 04_1 · Reading log

Part of [Exercise 04 · Collections](../README.md). New ideas you need: **ArrayList**, **reading `<String>`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program for the post office reading log. The clerk types command lines until the input ends (read with `Scanner` and `hasNextLine()`). Titles are single words.

Commands:

| Command | What happens |
|---------|--------------|
| `ADD <title>` | Put the book on the list. If it is already on the list, print `already read: <title>` and do **not** add it twice |
| `DROP <title>` | Take the book off the list. If it is not on the list, print `not on the list: <title>` |
| `HAS <title>` | Print `has <title>: yes` or `has <title>: no` |
| `SHOW` | Print one line `books: <t1>, <t2>, …` in add order. An empty list prints `books: (none)` |
| `COUNT` | Print `count: <n>` |

A successful `ADD` or `DROP` prints nothing. Keep the list in an `ArrayList<String>`.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Make an empty `ArrayList<String>`.
2. Read lines until the input ends.
3. Split each line into command and title.
4. Do what the command says.
5. `SHOW` glues the titles together with `, ` between them.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `ADD hamlet` / `ADD dune` / `SHOW` | `books: hamlet, dune` |
| `ADD hamlet` / `ADD hamlet` / `COUNT` | `already read: hamlet` and `count: 1` |
| `DROP hamlet` (nothing on the list yet) | `not on the list: hamlet` |
| `ADD hamlet` / `HAS hamlet` | `has hamlet: yes` |
| `HAS hamlet` (empty list) | `has hamlet: no` |
| `ADD hamlet` / `ADD dune` / `COUNT` | `count: 2` |
| `SHOW` (empty list) | `books: (none)` |

## Little helpers

<details>
<summary>There is no number telling me how many lines come. How do I read them all?</summary>

`while (in.hasNextLine())` reads line after line. When the input ends, the loop ends by itself. The tests type all the lines at once, then the input ends.

</details>

<details>
<summary>How do I turn the list into one line with commas?</summary>

Loop over the list with `get(i)` and glue the titles together. Put `", "` **between** two titles, never before the first. (`String.join(", ", books)` does the same in one call.)

</details>

<details>
<summary>Does a plain ADD really print nothing?</summary>

Yes. Only the two problem cases talk: a title that is already read, and a `DROP` of a title that is not there. A successful `ADD` or `DROP` stays silent.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] A title is never on the list twice, and `SHOW` prints in add order.
- [ ] You can explain your code out loud in your own words.

Next: [Task 04_2](../task-04-2-word-count/README.md)
