# Exercise 03 · CMOS and building blocks

| | |
|---|---|
| Student | Becky |
| Subject | Informatik · Einführung in die Informatik (Hochschule Hannover) |
| Language | Written |
| Created | 2026-10-23 |

## The story in one sentence

Until now a gate was a magic box. Today you look **inside**: transistors that open or close like tiny water taps, then boxes that **encode** many wires into a short code, **choose** one of two signals, and **add** two bits with a sum and a carry.

## Tasks

Do them in order. Every task has its own folder with the task, a desk for your written answers (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 03_1 | [CMOS NAND gate](task-03-1-cmos-nand-gate/README.md) | todo |
| 03_2 | [4-to-2 encoder](task-03-2-4-to-2-encoder/README.md) | todo |
| 03_3 | [Multiplexer select](task-03-3-multiplexer-select/README.md) | todo |
| 03_4 | [Half adder sum and carry](task-03-4-half-adder-sum-and-carry/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all four tasks.
2. Open the first task and read its `README.md`.
3. Write your answers in its `my-solution/` folder. That is your desk.
4. Check yourself against the check tables in the task.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck or a new word), `/check` (is it right?), `/done` (finished).

These tasks are **written answers** (truth tables and short explanations), not programs. There are no automated `make test-task` checks — your tutor (or `/check`) is the check.

---

## What you will learn

Read this slowly. One picture at a time. Then do the matching task.

### 1. CMOS gate — two teams of taps

> [!PICTURE]
> A lamp on a wire between a **high shelf** (+5 V) and the **floor** (ground). Two teams of water taps decide: pull the lamp up (1) or pull it down (0).

Tiny steps:

1. **Pull-up** (top, PMOS) can connect the lamp to +5 V → output **1**.
2. **Pull-down** (bottom, NMOS) can connect the lamp to ground → output **0**.
3. A PMOS turns **on** when its gate is **0**.
4. An NMOS turns **on** when its gate is **1**.
5. On the sheet write **L** (conducts) or **NL** (does not conduct).

**In task 03_1** the pull-up has two PMOS in **parallel** (side by side). The pull-down has two NMOS in **series** (one after the other). That pattern is a **NAND** gate.

```text
  +5 V ──┬── PMOS(x) ──┐
         └── PMOS(y) ──┼── z ── NMOS(y) ── NMOS(x) ── Masse
```

### 2. Encoder — many lamps, short code

> [!PICTURE]
> Four doorbells. Only one rings at a time. An **encoder** turns “which doorbell?” into a short binary number — like writing the door number in two bits.

Tiny steps for a **4-to-2 encoder**:

1. Four inputs: `I0` … `I3` (only one is 1).
2. Two outputs: `A1 A0` (the binary number of that input).

```text
  which input is 1 | A1 A0
  I0               | 0  0
  I1               | 0  1
  I2               | 1  0
  I3               | 1  1
```

**In task 03_2** you write that truth matrix.

### 3. Multiplexer — a railway switch

> [!PICTURE]
> Two train tracks (`x` and `y`) and one exit (`z`). A lever **`s`** chooses which track is connected. That box is a **2-to-1 multiplexer**.

Tiny steps:

1. `s = 0` → exit `z` follows track `x`.
2. `s = 1` → exit `z` follows track `y`.

```text
  x ──►|&|──┐          (AND with NOT s)
          │
          │≥1│──► z
          │
  y ──►|&|──┘          (AND with s)
  s ────┘
```

**In task 03_3** you say what `s` is for in the given circuit.

### 4. Half adder — sum and carry

> [!PICTURE]
> Adding two one-bit numbers on your fingers. You need the ones digit (**sum**) and a spill to the next column (**carry**) when both fingers are up.

Tiny steps:

1. **`s`** (sum) = ones digit → **XOR** (`=1`).
2. **`ü`** (carry) = spill → **AND** (`&`).
3. Together they are a **half adder**.

```text
  a ──┬──►|=1|──► s
  b ──┤
      └──►|&|───► ü
```

**In task 03_4** both inputs are `1`. You find `s` and `ü`.

---

## Words to know

| Word | Means |
|------|-------|
| **combinational circuit (Schaltnetz)** | Outputs depend only on **now** — no memory |
| **CMOS** | Logic built from PMOS (pull-up) and NMOS (pull-down) transistors |
| **PMOS / NMOS** | Pull-up transistor (on at gate 0) / pull-down transistor (on at gate 1) |
| **L / NL** | Conducts / does not conduct (German *leitet* / *nicht leitet*) |
| **NAND** | Output is 0 only when **all** inputs are 1; otherwise 1 |
| **encoder** | Few output bits that name which one-hot input is active |
| **multiplexer (MUX)** | Selects one of several data inputs, steered by select bits |
| **select (`s`)** | The switch that chooses which input reaches the output |
| **half adder** | Adds two bits → sum + carry (no carry-in) |
| **sum (`s`) / carry (`ü`)** | Ones digit / spill to the next higher bit |

## Source

Prof. Dr. Jens Paßlick, Abteilung Wirtschaftsinformatik — *Einführung in die Informatik* (WiSe 2026/27), **3. Übung: Technische Informatik – Schaltnetze**. Translated into English here; numbers and meanings match the sheet. Every paper graphic is redrawn as text diagrams and Mermaid — no image files. If your print shows different wiring or given 0/1 values, use the paper and the same rules.

Back to [all exercises](../README.md).
