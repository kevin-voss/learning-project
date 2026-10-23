# My solution · Task 03_2 ✏️

This is your desk. Fill the truth matrix below. The [exercise page](../../README.md) explains every idea you need.

## Answers

4-to-2 encoder. Exactly one of `I0`…`I3` is 1. Outputs `A1 A0`.

| I3 | I2 | I1 | I0 | A1 | A0 |
|----|----|----|----|----|----|
| 0  | 0  | 0  | 1  |    |    |
| 0  | 0  | 1  | 0  |    |    |
| 0  | 1  | 0  | 0  |    |    |
| 1  | 0  | 0  | 0  |    |    |

*(If your course numbers the inputs the other way, keep the same meaning: the binary value of `A1 A0` is the index of the active input.)*

## How to check

There is no program to run. Compare your table to the check rows in the [task](../README.md). In Cursor: `/check`.

## Rules for this desk

- Change anything you like here.
- Do not copy from [`../solution/`](../solution/README.md). Look there only when you are done.
- Stuck? Read the [exercise page](../../README.md) again, then the helpers in the [task](../README.md). In Cursor: `/stuck`, then `/check`.
