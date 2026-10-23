# My solution · Task 02_1 ✏️

This is your desk. Fill the formulas and complete the IEC sketches (text only — no image files). The [exercise page](../../README.md) explains every idea you need.

## Answers

### a) OR using only NAND gates

Formula:

```text
NAND:  (x ∨ y) =
```

Circuit (`&` + output `o` = NAND; tie both inputs for NOT):

```text
          ┌───┐
    x ────┤   │
          │ & │o────     ────┐
    x ────┤   │              │     ┌───┐
          └───┘              ├─────┤   │
                             │     │ & │o────
          ┌───┐              ├─────┤   │
    y ────┤   │              │     └───┘
          │ & │o────     ────┘
    y ────┤   │
          └───┘
```

(Or redraw the whole thing in the blank below.)

```text




```

### b) OR using only NOR gates

Formula:

```text
NOR:  (x ∨ y) =
```

Circuit (`≥1` + output `o` = NOR):

```text
          ┌────┐
    x ────┤    │
          │ ≥1 │o────          ────┐
    y ────┤    │                   │     ┌────┐
          └────┘                   ├─────┤    │
                                   │     │ ≥1 │o────
                                   └─────┤    │
                                         └────┘
```

```text




```

## How to check

There is no program to run. Compare your formulas and drawings to the check rows in the [task](../README.md). In Cursor: `/check`.

## Rules for this desk

- Change anything you like here. Prefer **text sketches** (ASCII boxes or Mermaid), not pasted images.
- Do not copy from [`../solution/`](../solution/README.md). Look there only when you are done.
- Stuck? Read the [exercise page](../../README.md) again, then the helpers in the [task](../README.md). In Cursor: `/stuck`, then `/check`.
