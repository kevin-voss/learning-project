# Exercise 02 · Combinational circuits

| | |
|---|---|
| Student | Becky |
| Subject | Informatik · Einführung in die Informatik (Hochschule Hannover) |
| Language | Written |
| Created | 2026-10-23 |

## The story in one sentence

Until now you used **OR**, **AND** and **NOT** as ready-made bricks. Today you learn two new tricks: build OR from only NANDs (or only NORs), and turn a truth table into a **small formula** (DNF or CNF) that lights one segment of a 7-segment display.

## Tasks

Do them in order. Every task has its own folder with the task, a desk for your written answers (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 02_1 | [OR from NAND and NOR](task-02-1-or-from-nand-and-nor/README.md) | todo |
| 02_2 | [Seven-segment m and l](task-02-2-seven-segment-m-and-l/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your answers in its `my-solution/` folder. That is your desk.
4. Check yourself against the check tables in the task.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck or a new word), `/check` (is it right?), `/done` (finished).

These tasks are **written answers** (formulas and circuit sketches), not programs. There are no automated `make test-task` checks — your tutor (or `/check`) is the check.

---

## What you will learn

Read this slowly. One picture at a time. Then do the matching task.

### 1. NAND and NOR as universal bricks

> [!PICTURE]
> A toolbox that holds **only one kind of Lego brick**. You can still build many shapes if you snap them cleverly.

Tiny meanings:

- **NAND** = “AND, then flip”: `¬(x ∧ y)`.
- **NOR** = “OR, then flip”: `¬(x ∨ y)`.

Two useful shortcuts:

1. Tie **both inputs** of a NAND (or NOR) to the **same** wire → that gate becomes a **NOT**.
2. De Morgan: `x ∨ y = ¬(¬x ∧ ¬y)`. So OR = invert both inputs, then NAND.

**In task 02_1** you draw OR made only of NANDs, and OR made only of NORs.

### 2. Combinational circuit — no memory

> [!PICTURE]
> A light that **only** cares about the switches **right now**. Flip a switch and the lamp changes at once. It never “remembers” yesterday.

That is a **combinational circuit** (*Schaltnetz*): outputs depend only on current inputs.

**In both tasks** every circuit you draw is combinational.

### 3. DNF and CNF — two ways to copy a truth table

> [!PICTURE]
> A scoreboard. Some rows say “lamp on (1)”. Some rows say “lamp off (0)”. You copy those rows into a formula.

**DNF** — build from the **1**-rows (big OR of small ANDs):

1. Take every row where the output is **1**.
2. For that row, AND the inputs so that this row alone makes a 1 (use `¬` where the bit is 0).
3. OR all those terms together.

**CNF** — build from the **0**-rows (big AND of small ORs):

1. Take every row where the output is **0**.
2. For that row, OR the inputs so that this row alone makes a 0.
3. AND all those terms together.

Pick the form with **fewer terms** when the sheet asks for the smallest expression. You do **not** need further algebra shortcuts on this sheet.

**In task 02_2** you write (and draw) small DNF/CNF formulas for segments `m` and `l`.

### 4. 7-segment display — one digit from lamps

> [!PICTURE]
> A digital clock digit made of **seven bars** (segments). Each bar is on or off — like seven tiny lamps that draw a number.

Bits `a`, `b`, `c` choose which digit pattern you want. Each segment gets its own formula.

On the lecture slide (Chapter 03, slide 33) two of those segment signals are called **`m`** and **`l`**. Task 02_2 uses that table (copied into the task so you do not need the PDF open).

**In task 02_2** you find formulas for `m` and `l` and sketch the gates.

### 5. Gate symbols on the sheet (IEC)

The course draws **rectangular** gates. In these folders we write them as **text** (ASCII or Mermaid) — never as image files.

| Symbol | Meaning | Text sketch |
|--------|---------|-------------|
| `&` | AND | `┌───┐` / `│ & │` / `└───┘` |
| `≥1` | OR | box with `≥1` |
| `&` + bubble on **output** | NAND | `│ & │o────` |
| `≥1` + bubble on **output** | NOR | `│ ≥1 │o────` |
| small `o` on an **input** wire | invert that input | `──o──┤` means `¬` |

Example — NAND used as NOT (both inputs tied to `x`):

```text
          ┌───┐
    x ────┤   │
          │ & │o──── ¬x
    x ────┤   │
          └───┘
```

**In both tasks** draw the same way in your `my-solution/` README (ASCII boxes, or a Mermaid flowchart if you prefer).

---

## Words to know

| Word | Means |
|------|-------|
| **combinational circuit** (*Schaltnetz*) | Circuit with **no memory** — outputs follow inputs at once |
| **NAND** | NOT-AND: `¬(x ∧ y)` |
| **NOR** | NOT-OR: `¬(x ∨ y)` |
| **universal gate** | One gate type that can build any Boolean function (NAND or NOR) |
| **DNF** | Disjunctive normal form — OR of AND-terms (from the 1-rows) |
| **CNF** (*KNF*) | Conjunctive normal form — AND of OR-terms (from the 0-rows) |
| **7-segment display** | Digit made of seven light bars |
| **segment `m` / `l`** | Two named outputs on the lecture’s display control table |

## Source

Prof. Dr. Jens Paßlick, Abteilung Wirtschaftsinformatik — *Einführung in die Informatik* (WiSe 2026/27), **2. Übung: Technische Informatik – Schaltnetze**. Translated into English here; numbers and meanings match the sheet. Task **02_2** includes the truth-table rows for `m` and `l` rebuilt from the sample solutions for lecture slide 33 (Chapter 03). If your paper slide shows different labels, use the paper’s table and the same DNF/CNF rules.

Back to [all exercises](../README.md).
