# Task 07_1 · Diary file

Part of [Exercise 07 · Files and text](../README.md). New ideas you need: **`Path`**, **`Files.writeString`**, **`Files.readAllLines`**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that keeps the post office diary in a file.

First line: an integer `n` — how many diary entries follow.

Then `n` lines of diary text. A line may contain spaces.

Your program must:

1. Join the entries into a file `diary.txt`, one entry per line. Write it with `Files.writeString` (or `Files.write`) and a `Path`.
2. Read the file back with `Files.readAllLines` (or `readString` and `split`).
3. Print `wrote <number of lines> lines` — the number of lines **in the file**.
4. Then print each line of the file, one per line, in order.

`n = 0`: the file `diary.txt` is still created, empty. Print `wrote 0 lines` and nothing else.

The file is written into the current folder (where you start `java`); the tests only look at what is printed. The program must also work when you run it twice in a row: the new run replaces the old file.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many entries come next.
2. Read each entry as a whole line, spaces included.
3. Build the file text in memory and write `diary.txt` in one call.
4. Read the file back into a list of lines.
5. Print `wrote <size> lines`, then every line, in order.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `3` then `morning: sorted the mail` / `noon: tea break` / `evening: locked the door` | `wrote 3 lines`, then the three lines back, one per line |
| `1` then `quiet day at the desk` | `wrote 1 lines`, then `quiet day at the desk` |
| `0` | `wrote 0 lines` and nothing else |

## Little helpers

<details>
<summary>How do I read a whole line with spaces?</summary>

`in.nextLine()` gives the whole line. `in.next()` stops at the first space — that is why entries lose their words.

</details>

<details>
<summary>How do I put many lines into one text for writeString?</summary>

Build a `String` in memory: start empty, then add `entry + "\n"` for every entry. One call writes the whole file. (`Files.write(path, listOfLines)` can also write a list of lines: one element per line.)

</details>

<details>
<summary>I type 0 and it says `wrote 1 lines`. Why?</summary>

You probably read the file with `readString` and `split("\n")`: the empty text splits into one empty piece. `Files.readAllLines` on an empty file gives an empty list — size 0.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `diary.txt` exists in the folder after the program ran, one entry per line.
- [ ] The count and the printed lines come from reading the file back, not from the input.
- [ ] You can explain your code out loud in your own words.

Next: [Task 07_2](../task-07-2-savings-table/README.md)
