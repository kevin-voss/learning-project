# Sample solution · Task 91_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

From this folder:

```bash
javac RandomArraySort.java
java RandomArraySort
```

Type `42` and Enter. From the repo root:

```bash
make test-task TASK=91_1 SOLUTION=1
```

## How it works, step by step

1. **Constants** — length 1…10 and values 1…100, same as the sheet example.
2. **Seed** — read one `int`, build `new Random(seed)` so tests always get the same array.
3. **Length and fill** — `randomInt` uses `nextInt(max - min + 1) + min` (same idea as task 08_2).
4. **Print original** — `printLine` walks the array with `(`, `", "`, and `)`.
5. **Ascending** — copy the array, `Arrays.sort`, print.
6. **Descending** — another copy, sort, then swap from both ends inward, print.

The original array is never sorted in place, so line 1 stays in random order.

### Real output (test examples)

**Seed 42:**

```text
(64)
(64)
(64)
```

**Seed 1:**

```text
(89, 48, 14, 55, 5, 35)
(5, 14, 35, 48, 55, 89)
(89, 55, 48, 35, 14, 5)
```

**Seed 7:**

```text
(65, 86, 45, 81, 55, 69, 50)
(45, 50, 55, 65, 69, 81, 86)
(86, 81, 69, 65, 55, 50, 45)
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Sort before first print | Line 1 already sorted | Print original first; only sort **copies** |
| Wrong random range | Length 0 or 11 | Use `max - min + 1` inside `nextInt` |
| Missing `", "` | `(764899)` | Comma **and** space between numbers |
| Descending = reverse sort only | Middle lines wrong | Sort ascending, **then** swap ends |
| One array, three sorts | Later lines reuse shuffled data | `Arrays.copyOf` for each sorted version |

Back to [Task 91_1](../README.md).