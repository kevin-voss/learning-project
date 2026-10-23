# My solution · Task 03_1 ✏️

This is your desk. Fill the answers below. The [exercise page](../../README.md) explains every idea you need. The circuit drawings are in the [task](../README.md).

## Answers

### a) Truth table

| x | y | z |
|---|---|---|
| 0 | 0 |   |
| 0 | 1 |   |
| 1 | 0 |   |
| 1 | 1 |   |

### b) Gate name

_________________________________

### c) L / NL for `x = 1`, `y = 0`

Copy of the paper boxes — fill `[ ? ]` with **L** or **NL**:

```text
                         +5 V
                           |
              .------------+------------.
              |  pull-up                  |
              |  [ ? ]       [ ? ]        |
              |   o           o           |
         1 ───|───┤           ├───────────|─── 0
          (x) |   +-----+-----+           |  (y)
              '---------+-----------------'
                        |
                        +------------------ z
                        |
              .---------+-----------------.
              |  pull-down                |
              |       [ ? ]               |
         0 ───|─────────┤                 |  (y)
              |       [ ? ]               |
         1 ───|─────────┤                 |  (x)
              '---------+-----------------'
                        |
                      Masse
```

| Transistor | Gate | L or NL |
|------------|------|---------|
| PMOS left | `x = 1` | |
| PMOS right | `y = 0` | |
| NMOS upper | `y = 0` | |
| NMOS lower | `x = 1` | |

## How to check

There is no program to run. Compare your answers to the check rows in the [task](../README.md). In Cursor: `/check`.

## Rules for this desk

- Change anything you like here.
- Do not copy from [`../solution/`](../solution/README.md). Look there only when you are done.
- Stuck? Read the [exercise page](../../README.md) again, then the helpers in the [task](../README.md). In Cursor: `/stuck`, then `/check`.
