# Task 04_4 · RS sketch states

Part of [Exercise 04 · Switching circuits](../README.md). New ideas you need: RS flip-flop built from gates. Explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Fill every gray box with 0 or 1 |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

In the following sketch, fill the gray fields with the current states (`0` or `1`).

The paper shows a **cross-coupled NOR RS** cell. From the OCR of the sheet, these values are already given on the drawing:

- `S = 0`
- `R = 0`
- one NOR input side already marked `1` / `0` as printed on the paper

Below is the **same kind of sketch** redrawn in text so you can fill the missing wires. If your paper’s printed 0/1 differ, copy **your** paper’s givens into the blanks marked “given”, then solve the rest.

## The task, simply said

1. Copy the given inputs from the sketch (`S`, `R`, and any printed gate output).
2. For each NOR gate: output is `1` only when **both** inputs are `0`.
3. Fill every gray box: gate outputs and `Q` / `Q̄`.
4. Check: with `S = R = 0` the cell must **hold** — `Q` and `Q̄` stay opposite and stable.

## Sketch (text version)

Cross-coupled NOR RS. Gray boxes are `[ ? ]`.

```text
        S = 0
          |
          v
     +----[NOR]----+----> Q  = [ ? ]
     |      ^      |
     |      |      |
     |   from Q̄   |
     |             |
     |   from Q    |
     |      |      |
     |      v      |
     +----[NOR]----+----> Q̄ = [ ? ]
          ^
          |
        R = 0
```

**Stable hold example to aim for** (when the cell already stored `Q = 1`):

| Wire | Value |
|------|-------|
| S | 0 (given) |
| R | 0 (given) |
| Q | 1 |
| Q̄ | 0 |

If the cell had stored `Q = 0`, the hold pair is `Q = 0`, `Q̄ = 1` instead. Use the state your paper starts from (often shown as the non-gray printed bits).

## Check examples

| Situation | What must be true |
|-----------|-------------------|
| `S = R = 0`, stored 1 | `Q = 1`, `Q̄ = 0` |
| `S = R = 0`, stored 0 | `Q = 0`, `Q̄ = 1` |
| Any stable normal state | `Q` and `Q̄` are opposites |

## Little helpers

<details>
<summary>NOR reminder</summary>

| In1 | In2 | Out |
|-----|-----|-----|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

</details>

<details>
<summary>Why does hold stay put?</summary>

If `Q = 1` and `Q̄ = 0`, the bottom NOR sees `R = 0` and `Q = 1` → output `Q̄ = 0`. The top NOR sees `S = 0` and `Q̄ = 0` → output `Q = 1`. Stable.

</details>

## Done when

- [ ] Every gray box is 0 or 1.
- [ ] The values match a stable hold (or the paper’s forced inputs).
- [ ] You can point to each NOR and say why its output is that bit.

Next: [Task 04_5](../task-04-5-d-flip-flop-timeline/README.md)
