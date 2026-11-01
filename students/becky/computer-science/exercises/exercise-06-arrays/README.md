# Exercise 06 · Arrays

| | |
|---|---|
| Student | Becky |
| Subject | Computer Science · Programming 1 (Hochschule Hannover) |
| Language | Java |
| Created | 2026-11-01 |

## The story in one sentence

Until now you kept one value in **one box** (`int x`). Today you get a **whole shelf of boxes** — an **array** — so your program can remember many names, many months of sales, or every hour of every day in a month.

You will build three little programs that use arrays:

1. A **faculty finder** that looks up a school name by its number.
2. A **revenue report** that stores monthly sales and prints totals and averages.
3. A **month calendar** with a grid of days and hours, where you can enter and show appointments.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 06_1 | [Faculty lookup](task-06-1-faculty-lookup/README.md) | todo |
| 06_2 | [Revenue statistics](task-06-2-revenue-statistics/README.md) | todo |
| 06_3 | [Month appointments](task-06-3-month-appointments/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all three tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you will learn

> [!PICTURE]
> Picture a **egg carton**: not one egg, but twelve slots in a row. Each slot has a **number** (0, 1, 2, …). You put something in a slot and later read it back by saying the number.

### 1. One-dimensional array — a row of boxes

In Java you declare the row and what goes inside each box:

```java
String[] faculties = {
    "Electrical Engineering and Information Technology",
    "Mechanical Engineering and Bioprocess Engineering",
    "Media, Information and Design",
    "Business and Computer Science",
    "Diaconia, Health and Social Affairs"
};
```

- `String[]` means: many strings, in order.
- The **first** box is number **0**, the second is **1**, and so on.
- You read or write one box with `[ ]`: `faculties[3]` is the fourth name.

**In task 06_1** you keep all five faculty names in one array and print the name for the number the user types.

### 2. Filling an array from input — `for` and `[ ]`

Sometimes the size is not fixed on the sheet. You ask "how many?", make an array that big, then walk with a `for` loop:

```java
int count = scanner.nextInt();
double[] revenue = new double[count];

for (int i = 0; i < count; i = i + 1) {
    revenue[i] = scanner.nextDouble();
}
```

- `new double[count]` creates **empty** boxes, ready to fill.
- `revenue[i]` is the box for month `i + 1` if you start at 0.

**In task 06_2** you store every month's revenue, then walk the array again to find sum, minimum, and maximum.

### 3. Two-dimensional array — a grid (days × hours)

Picture a **wall calendar**: down the side are **days**, across the top are **hours**. Each little square is one slot.

```java
String[][] calendar = new String[32][24];
```

- First `[ ]` is the **day** (here we use 1…31 and leave index 0 unused, or you shift by one — pick one way and stay consistent).
- Second `[ ]` is the **hour** (0…23).
- `calendar[5][10]` is day 5, hour 10.

**In task 06_3** you fill the grid at the start (sleeping hours vs empty slots), then change one cell when the user enters an appointment.

### 4. Checking index before you use it

If someone asks for faculty number **99**, there is no box 99. Before you read `faculties[i]`, check that `i` is in range:

```java
if (number >= 1 && number <= faculties.length) {
    // safe to use faculties[number - 1]
} else {
    System.out.println("Invalid faculty number.");
}
```

**In task 06_1** you must react sensibly to bad numbers. The same idea helps in **06_3** when day or hour is out of range.

---

## Words to know

| Word | Means |
|------|-------|
| Array | A fixed row (or grid) of boxes, all the same type, numbered from 0 |
| Index | The number of a box, written in `[ ]` |
| Element | One value stored in one box of the array |
| Length | How many boxes the array has (`faculties.length`) |
| One-dimensional | One row — like the five faculty names |
| Two-dimensional | A grid — like days and hours in **06_3** |
| Initialize | Fill boxes with starting values before the user changes them |

## Source

Hochschule Hannover · Programmieren 1 · Übung 06 · Arrays (Prof. Dr.-Ing. Dennis Chong, Tim Dannhauer M.Sc.).

Back to [all exercises](../README.md).
