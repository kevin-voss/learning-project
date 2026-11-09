# Task 07_1 · Enumerated Sets

Part of [Exercise 07 · Sets and Relations I](../README.md). New ideas you need: ℕ, ℤ, strict inequalities, divisors, multiples, set-builder notation. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your lists there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet. Decimal separators stay as on the paper: **comma**.)*

Give the following sets in **enumerated form** (list every element inside `{ … }`).

**a)** { *x* ∈ ℕ | −3,3 < *x* < 2,7 }

**b)** { *x* ∈ ℤ | −3,3 < *x* < 2,7 }

**c)** { *d* ∈ ℕ | *d* is a divisor of 30 }

**d)** { *d* ∈ ℕ | 30 is a divisor of *d* }

**e)** { *n*² + 1 | *n* ∈ ℕ ∧ *n* ≤ 5 }

## The task, simply said

1. **a** and **b**: List every number that fits **strictly** between −3,3 and 2,7 — first using only ℕ, then using all of ℤ.
2. **c**: List every natural number that **divides** 30 evenly (no remainder).
3. **d**: List every natural number *d* such that **30 divides** *d* (so *d* is 30 · 1, 30 · 2, …). If the list never stops, say so clearly.
4. **e**: Plug in *n* = 0, 1, …, 5 into *n*² + 1 and collect the values in a set (no repeats).

## Check examples

These rows help you see if you are on track. The exercise page explains that we use **ℕ = {0, 1, 2, …}** here.

| Part | Quick sanity check |
|------|-------------------|
| **a** | You should get **three** small counting numbers (0 is allowed in our ℕ). |
| **b** | You should get **six** integers, including some **negative** ones. |
| **c** | The **smallest** divisor of 30 is 1; the **largest** is 30. |
| **d** | The **smallest** *d* is 30; the next is 60. |
| **e** | When *n* = 0, the expression is 0² + 1 = **1**. When *n* = 5, you get 5² + 1 = **26**. |

## Little helpers

<details>
<summary>Does ℕ include 0?</summary>

On **this exercise** we use **ℕ = {0, 1, 2, …}**, as on the parent [exercise page](../README.md). If your lecture course book says “ℕ starts at 1”, then in **a** and **e** drop 0 from your lists and shift **e** accordingly — see “If your course uses ℕ = {1, 2, …}” in [`solution/README.md`](solution/README.md).

</details>

<details>
<summary>What does “strictly between” mean?</summary>

*Strict* means the ends do **not** count. So −3,3 < *x* < 2,7 **excludes** −3,3 and **excludes** 2,7.

</details>

<details>
<summary>For (d), how many answers should I write?</summary>

The set is **infinite**. Writing the first few numbers and using “…” is enough, or write { 30·*k* | *k* ∈ ℕ, *k* ≥ 1 } if your class likes that form — but the sheet asked for *enumerated* form, so listing 30, 60, 90, … with dots is the honest answer.

</details>

## Done when

- [ ] Every part **a**–**e** is a correct list (or clearly shows the infinite pattern for **d**).
- [ ] You can say in one sentence what “divisor” and “multiple” mean for part **c** and **d**.

Next: [Task 07_2](../task-07-2-venn-diagram-a-b-c/README.md)
