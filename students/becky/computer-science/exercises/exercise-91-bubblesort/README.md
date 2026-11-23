# Exercise 91 · 1D Arrays

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-11-18 |

## The story in one sentence

You build a **row of random numbers** (a **1D array**), show it once, then show the same numbers sorted **smallest first** and **biggest first**.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 91_1 | [Random array sort and print](task-91-1-random-array-sort-and-print/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you will learn

Want more detail? You already met **arrays** in [exercise 06](../exercise-06-arrays/README.md) and **random numbers** in [exercise 08](../exercise-08-methods-ii/README.md).

> [!PICTURE]
> Picture **dice in a row** on the table. First you roll to see **how many** dice (length). Then you roll each die for its **value**. You line them up, read them out loud, then line them up again from smallest to biggest, and once more from biggest to smallest.

### 1. Array length chosen at random

You pick two whole numbers: **lengthMin** and **lengthMax** (for example 1 and 10). The program draws one length in that range, **including both ends**:

```java
int length = random.nextInt(lengthMax - lengthMin + 1) + lengthMin;
int[] values = new int[length];
```

**In task 91_1** you set these bounds as constants in your program, then create an array of that random size.

### 2. Filling each slot at random

You also pick **valueMin** and **valueMax** (for example 1 and 100). For every index `i`, you store one random integer in that range:

```java
for (int i = 0; i < values.length; i++) {
    values[i] = random.nextInt(valueMax - valueMin + 1) + valueMin;
}
```

Use `java.util.Random` (you can give it a **seed** so the same seed always gives the same “dice rolls” — handy for tests).

**In task 91_1** you fill the whole array this way before you print anything.

### 3. Printing the row in one line

The sheet wants one line per version of the array, with parentheses and commas:

```text
(76, 23, 99)
```

Walk the array with a loop. After the first number, print `", "` before each next number. Start with `"("` and end with `")"`.

**In task 91_1** you print the **original** order first, then the sorted lines.

### 4. Sorting ascending and descending

**Ascending** means small → big. **Descending** means big → small.

Easiest safe pattern:

1. Print the original array.
2. Make a **copy** (or sort a copy) for ascending — sort that copy, print it.
3. Make another copy for descending — sort it, then reverse it (swap first with last, and so on), print it.

Do **not** sort the original before you print it, or the first line will already be sorted.

**In task 91_1** you print three lines: original, ascending, descending — same numbers, three orders.

---

## Words to know

| Word | Means |
|------|-------|
| 1D array | One row of values: `int[]` |
| length | How many slots the array has |
| seed | A number you give to `Random` so the same rolls repeat (good for tests) |
| ascending | From smallest to biggest |
| descending | From biggest to smallest |

## Source

Programming 1 (Programmieren), Hochschule Hannover — sheet task: create a 1D array with random length and random values, print it, then print ascending and descending sorted versions (example length 1…10, values 1…100).

Back to [all exercises](../README.md).