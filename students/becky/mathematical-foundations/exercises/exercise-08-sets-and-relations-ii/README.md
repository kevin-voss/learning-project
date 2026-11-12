# Exercise 08 · Sets and Relations II

| | |
|---|---|
| Student | Becky |
| Subject | Mathematical Foundations · *Mathematische Grundlagen der Informatik* (Hochschule Hannover) |
| Language | Written |
| Created | 2026-11-12 |

## The story in one sentence

You **shrink messy set formulas** with rules, **count numbers** that fit two rules at once, **sort people into regions** on a Venn picture, and **list every sub-bag** inside a set (a power set).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your written work (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 08_1 | [Simplify three set expressions](task-08-1-simplify-three-set-expressions/README.md) | todo |
| 08_2 | [Divisible by 2 or 5 up to 10000](task-08-2-divisible-by-2-or-5-up-to-10000/README.md) | todo |
| 08_3 | [VIF students not in Hannover](task-08-3-vif-students-not-in-hannover/README.md) | todo |
| 08_4 | [Power sets in listed form](task-08-4-power-sets-in-listed-form/README.md) | todo |
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

Many tasks use **ℕ** (the natural numbers). Books disagree whether **0** is natural. **On this exercise we use ℕ = {0, 1, 2, 3, …}**, as on [Exercise 07](../exercise-07-sets-and-relations-i/README.md). That matters for task **08_2** (counting includes **0** if it is divisible by 2 or 5).

---

## What you will learn

Read this slowly. One picture at a time. Then do the matching task.

### 1. Complement — everything outside the blob

> [!PICTURE]
> Draw a set **A** as a circle. **Ā** (or *A*̅) is **everything in the box that is *not* inside *A***. It is the “outside” of *A*.

Tiny example: if the universe is {1, 2, 3, 4} and **A** = {1, 2}, then **Ā** = {3, 4}.

**In task 08_1** you meet formulas with bars over letters. Turn “outside” into other operations (∪, ∩, \) step by step.

### 2. De Morgan — flip bar, swap ∪ and ∩

> [!PICTURE]
> A fence around two toy boxes at once: “not (in both)” becomes “not in the first **or** not in the second.”

| You see | Rewrite as |
|---------|------------|
| (*A* ∪ *B*)̅ | Ā ∩ *B*̅ |
| (*A* ∩ *B*)̅ | Ā ∪ *B*̅ |

**In task 08_1** you open brackets that sit **under** a big complement.

### 3. Absorption and “*A* with *A* ∪ something”

> [!PICTURE]
> “Red toys **and** (red toys or blue toys)” — you already need red; the “or blue” part adds nothing. You still have only red toys.

Rule: *X* ∩ (*X* ∪ *Y*) = *X*.

**In task 08_1** after De Morgan you often get *something* ∩ (*something* ∪ *else*) and can shrink it to one piece.

### 4. Difference *A* \ *B*̅ means *A* ∩ *B*

> [!PICTURE]
> “In *A* but **not** in the outside of *B*” = “in *A* and also in *B*.”

So *A* \ *B*̅ = *A* ∩ *B*.

**In task 08_1 (M3)** and in [Exercise 07](../exercise-07-sets-and-relations-i/README.md) you already used *A* \ *B* for “in *A*, not in *B*.”

### 5. Counting with “or” — inclusion–exclusion

> [!PICTURE]
> Kids who like **cats or dogs**: count cat-lovers, count dog-lovers, but **subtract** those who love **both** so nobody is counted twice.

For two sets:

```text
|A ∪ B| = |A| + |B| − |A ∩ B|
```

**In task 08_2** the sets are “divisible by 2” and “divisible by 5” among numbers ≤ 10000. The overlap is “divisible by 10.”

### 6. Word problems on a Venn diagram

> [!PICTURE]
> Two study programs, two cities — every student sits in **one** region: only BIS, only VIF, Hannover or not, and so on.

**In task 08_3** you translate sentences into region sizes, then answer who is in one specific corner.

### 7. Power set 𝒫(*S*) — every sub-bag of *S*

> [!PICTURE]
> From three stickers {a, b, c} you can make: nothing, {a}, {b}, …, or all three. **𝒫(*S*)** is the set of **all** those choices.

If |*S*| = *n* elements, then |𝒫(*S*)| = 2^*n* subsets.

**In task 08_4** you **list** every member of 𝒫(*A*), 𝒫(*B*), and 𝒫(*C*) inside curly braces. Watch: one of the given sets already **contains another set as an element**.

---

## Words to know

| English | Short meaning |
|---------|----------------|
| Complement Ā | All elements (in the universe) that are **not** in *A* |
| De Morgan laws | Rules to move a bar from a bracket to each letter |
| Absorption | Shrink *X* ∩ (*X* ∪ *Y*) to *X* (and the mirror rule with ∪) |
| Inclusion–exclusion | Add two counts, subtract double-counted overlap |
| Power set 𝒫(*S*) | The set of **all** subsets of *S* |
| ∅ | Empty set — no elements |

German on the sheet: *Vereinfachen* = simplify, *Potenzmenge* = power set, *aufzählende Form* = enumerated (listed) form, *Durchschnitt* = intersection, *Vereinigung* = union, *Differenz* = difference.

---

## Source

*Mathematische Grundlagen der Informatik*, Exercise 08 — *Mengen und Relationen II* (Sets and relations II), Hochschule Hannover, Prof. Dr.-Ing. Dennis Chong. Tasks translated faithfully in each folder; numbers (64, 35, 38, 30, 10000, …) match the PDF.

Back to [all exercises](../README.md).
