# Exercise 04 · Switching circuits

| | |
|---|---|
| Student | Becky |
| Subject | Informatik · Einführung in die Informatik (Hochschule Hannover) |
| Language | Written |
| Created | 2026-10-23 |

## The story in one sentence

Until now a gate only **looked at now**. Today the circuit also **remembers**: a decoder picks one lamp from a code, a demultiplexer steers one wire to the right door, and flip-flops keep a bit until you change it — like a light switch that stays on after you leave the room.

## Tasks

Do them in order. Every task has its own folder with the task, a desk for your written answers (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 04_1 | [3-to-8 decoder](task-04-1-3-to-8-decoder/README.md) | todo |
| 04_2 | [2-demultiplexer](task-04-2-2-demultiplexer/README.md) | todo |
| 04_3 | [RS flip-flop](task-04-3-rs-flip-flop/README.md) | todo |
| 04_4 | [RS sketch states](task-04-4-rs-sketch-states/README.md) | todo |
| 04_5 | [D flip-flop timeline](task-04-5-d-flip-flop-timeline/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all five tasks.
2. Open the first task and read its `README.md`.
3. Write your answers in its `my-solution/` folder. That is your desk.
4. Check yourself against the check tables in the task.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck or a new word), `/check` (is it right?), `/done` (finished).

These tasks are **written answers** (truth tables and fill-ins), not programs. There are no automated `make test-task` checks — your tutor (or `/check`) is the check.

---

## What you will learn

### 1. Decoder — one key, many doors

Picture a hotel with **8 rooms**. The receptionist types a 3-bit room number. Exactly **one** door lamp turns on. That box is a **3-to-8 decoder**: three input bits → eight outputs, and only the matching output is 1.

```text
A2 A1 A0 | which Yi is 1
0  0  0  | Y0
0  0  1  | Y1
…        | …
1  1  1  | Y7
```

**In task 04_1** you write the full truth table.

### 2. Demultiplexer — one letter, two mailboxes

Picture one letter and a switch that says “left box or right box”. A **1-to-2 demultiplexer** (often called a **2-demultiplexer** on the sheet) has data `D`, select `S`, and two outputs. The data appears on exactly one output; the other stays 0.

**In task 04_2** you write that truth table.

### 3. Combinational vs sequential — now vs memory

A decoder has **no memory**: change the inputs and the outputs change at once. A **flip-flop** has memory: its output can stay the same even when the inputs go quiet. That is the jump from *Schaltnetze* (combinational) to *Schaltwerke* (sequential).

**In tasks 04_3–04_5** you work with flip-flops.

### 4. RS flip-flop — set, reset, hold

Picture a sticky light switch:

- **Set** (`S = 1`, `R = 0`): turn the light **on** (`Q = 1`).
- **Reset** (`S = 0`, `R = 1`): turn the light **off** (`Q = 0`).
- **Hold** (`S = 0`, `R = 0`): leave the light as it was.
- **Forbidden** (`S = 1`, `R = 1` for a NOR RS cell): both “on” and “off” at once — do not use.

`Q̄` (Q-bar) is the opposite of `Q` when the cell is in a normal state.

**In task 04_3** you complete the RS truth table. **In task 04_4** you fill the 0/1 boxes in a gate sketch.

### 5. D flip-flop — copy D when the clock allows

Picture a photocopier with a button (the **clock**). A **level-triggered** D flip-flop copies `D` onto `Q` **while the clock level is active** (here: while `CLK = 1`). While `CLK = 0`, `Q` keeps its old value.

**In task 04_5** you fill `Q` for times `t = 0` … `t = 5`.

---

## Words to know

| Word | Means |
|------|-------|
| **decoder** | Circuit that turns an *n*-bit code into one of *2ⁿ* lines |
| **demultiplexer (demux)** | Steers one data input to one of several outputs, chosen by select bits |
| **truth table** | Every input combination once, with the matching outputs |
| **flip-flop** | Memory cell for one bit |
| **RS flip-flop** | Set / Reset memory cell |
| **D flip-flop** | Memory cell that stores the value of `D` when the clock allows |
| **level-triggered** | Sensitive for the whole time the clock stays at the active level (not only on an edge) |
| **Q / Q̄** | Stored bit and its inverse |
| **Schaltwerk** | Sequential circuit (has memory) — German term on the sheet |

## Source

Prof. Dr. Jens Paßlick, Abteilung Wirtschaftsinformatik — *Einführung in die Informatik* (WiSe 2026/27), **4. Übung: Technische Informatik – Schaltwerke**. Translated into English here; numbers and meanings match the sheet. Tasks **04_4** and **04_5** rebuild the paper sketch/table from the OCR text — if your paper shows different given 0/1 values, use the paper’s numbers and the same rules.

Back to [all exercises](../README.md).
