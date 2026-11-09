# Exercise 07 · Sets and Relations I

| | |
|---|---|
| Student | Becky |
| Subject | Mathematical Foundations · *Mathematische Grundlagen der Informatik* (Hochschule Hannover) |
| Language | Written |
| Created | 2026-11-06 |

## The story in one sentence

You learn to **read set notation**, **list sets in curly braces**, and **draw little pictures (Venn diagrams)** so you can see how collections overlap or stay apart.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your written work (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 07_1 | [Enumerated Sets](task-07-1-enumerated-sets/README.md) | todo |
| 07_2 | [Venn Diagram A B C](task-07-2-venn-diagram-a-b-c/README.md) | todo |
| 07_3 | [Set Operations and Diagram](task-07-3-set-operations-and-diagram/README.md) | todo |
| 07_4 | [Venn Diagram Cases](task-07-4-venn-diagram-cases/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your answers in its `my-solution/` folder. That is your desk.
4. Use the check rows in each task to spot-check your work.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck or a new word), `/check` (is it right?), `/done` (finished).

These tasks are **written work**, not programs. There are no automated `make test-task` checks — your tutor (or `/check`) is the check.

---

## Convention on this sheet (read once)

Many tasks use **ℕ** (the natural numbers). Books disagree whether **0** is natural. **On this exercise we use ℕ = {0, 1, 2, 3, …}**, which is common in computer-science math. If your lecture defines ℕ without 0, replace the answers that change (only the first and last parts of task 07_1 — the README there says how).

---

## What you will learn

Read this slowly. One picture at a time. Then do the matching task.

### 1. A set is a bag of *things*

> [!PICTURE]
> A **set** is like a toy box: inside are **names** or **numbers**. Order does not matter. Each thing counts **once** — no duplicates when you write the list.

Tiny example:

```text
{ 3, 5, 5, 3 }  is the same set as  { 3, 5 }
```

**In task 07_1** you turn “rules in words” into lists inside `{ … }`.

### 2. ℕ and ℤ — counting numbers vs all whole numbers

> [!PICTURE]
> **ℕ** is the ladder you climb from zero (on this sheet): 0, 1, 2, …  
> **ℤ** is the full street in both directions: …, −2, −1, 0, 1, 2, …

**In task 07_1 (a) and (b)** you pick **only ℕ** or **only ℤ** that sit *strictly* between two bounds (no equal at the ends).

### 3. Set-builder notation: “the … such that …”

> [!PICTURE]
> A *filter*: you keep only the numbers that pass the rule.

```text
{ x ∈ ℤ |  −3,3 < x < 2,7 }
```

Read: “the set of *x* in ℤ such that *x* is strictly greater than −3.3 and strictly less than 2.7.”

**In task 07_1** you list the elements that pass each filter.

### 4. Divisor (*Teiler*) and multiple

> [!PICTURE]
> “*d* **divides** 30” means you can share 30 cookies into equal piles of size *d* with no crumbs: 30 = *d* · *k* for some *k* in ℕ.

“30 divides *d*” turns it around: *d* must be **30, 60, 90, …** (a never-ending list unless the sheet caps it — here it does not).

**In task 07_1 (c) and (d)** you use that split: list divisors of 30, then describe multiples of 30.

### 5. Union, intersection, difference

| Symbol | Name | Picture words |
|--------|------|----------------|
| *A* ∪ *B* | union | Everything that is in *A* **or** in *B* (or both) |
| *A* ∩ *B* | intersection | Only what is in *A* **and** *B* |
| *A* \ *B* | difference | In *A* but **not** in *B* |

**In task 07_3** you compute these for three given sets and draw a diagram.

### 6. Venn diagrams — circles that talk

> [!PICTURE]
> Each circle is a set. Overlap means “both.” One circle inside another means “all of *A* lives inside *B*.”

**In tasks 07_2, 07_3, 07_4** you draw or describe regions: who overlaps whom, and the four special shapes (not disjoint, disjoint, proper subset one way or the other).

---

## Words to know

| English | Short meaning |
|---------|----------------|
| Set | A collection of distinct objects |
| Enumerated form | List every element inside `{ … }` |
| ℕ | Natural numbers (here: **including 0**) |
| ℤ | All integers |
| Prime number | Whole number ≥ 2 with no divisors except 1 and itself |
| Odd number | Integer not divisible by 2 |
| Union *A* ∪ *B* | In *A* or *B* |
| Intersection *A* ∩ *B* | In *A* and *B* |
| Difference *A* \ *B* | In *A*, not in *B* |
| Disjoint | Two sets with empty intersection |
| Proper subset | *A* ⊆ *B* and *A* ≠ *B* |

German words on the original sheet, if you need to match the paper: *Menge* = set, *Teiler* = divisor, *Durchschnitt* = intersection, *Vereinigung* = union, *Differenz* = difference, *Primzahl* = prime, *ungerade* = odd.

---

## Source

*Mathematische Grundlagen der Informatik*, Exercise 07 — *Mengen und Relationen I* (Sets and relations I), Hochschule Hannover, Prof. Dr.-Ing. Dennis Chong. Sheet translated faithfully in each task; numbers such as −3,3 and 2,7 are kept as on the PDF (European decimal comma).

Back to [all exercises](../README.md).
