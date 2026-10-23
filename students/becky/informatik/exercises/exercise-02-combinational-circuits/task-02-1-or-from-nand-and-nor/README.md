# Task 02_1 · OR from NAND and NOR

Part of [Exercise 02 · Combinational circuits](../README.md). New ideas you need: NAND, NOR, universal gates. They are explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write the formulas and draw the circuits there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Give one circuit each that realises an **OR gate** using

a) **NAND** gates  
b) **NOR** gates  

Draw the circuits.

## The task, simply said

1. Goal: output should be `x ∨ y` (true if **at least one** of `x`, `y` is 1).
2. Part **a**: use **only NAND** gates (no plain OR/AND boxes).
3. Part **b**: use **only NOR** gates.
4. Write a short Boolean identity for each part, then **draw the gates as text** (IEC boxes in a markdown code block, or Mermaid) — not as an image.

## Check examples

| You look at | You should see |
|-------------|----------------|
| Identity for part a | something equal to `x ∨ y` using NAND / NOT / AND only (De Morgan style) |
| Identity for part b | something equal to `x ∨ y` using NOR / NOT / OR only |
| Circuit a | only NAND symbols; for every pair `(x,y)` the output matches OR |
| Circuit b | only NOR symbols; same OR behaviour |
| Spot check `x=0,y=0` | both circuits output `0` |
| Spot check `x=1,y=0` | both circuits output `1` |

## Little helpers

<details>
<summary>How do I turn a NAND into a NOT?</summary>

Connect **both** NAND inputs to the **same** wire. Then `¬(x ∧ x) = ¬x`.

</details>

<details>
<summary>Which De Morgan law helps for part a?</summary>

`x ∨ y = ¬(¬x ∧ ¬y)`. The outer NOT-AND is one NAND; each `¬x` / `¬y` can be a NAND used as NOT.

</details>

<details>
<summary>Part b looks almost too short — is that OK?</summary>

Yes. One NOR gives `¬(x ∨ y)`. A second NOR used as NOT flips that back to `x ∨ y`.

</details>

## Done when

- [ ] You have a formula and a drawing for part a (NAND only).
- [ ] You have a formula and a drawing for part b (NOR only).
- [ ] You can walk through one input pair (e.g. `x=1,y=0`) on each drawing out loud.

Next: [Task 02_2](../task-02-2-seven-segment-m-and-l/README.md)
