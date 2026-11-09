# Sample solution · Task 06_4

## How to run it

From `solution/`:

```bash
echo 4 | node sum-one-to-n.mjs
```

```bash
echo 0 | node sum-one-to-n.mjs
```

## Why it works

**Aim:** Define **sum(n) = 1 + 2 + … + n** for natural numbers **n ≥ 1**, recursively, and code it.

**Rules on the table**

| Name | Recipe |
|------|--------|
| Base | `sum(0) = 0` (nothing to add) |
| Step | For **n ≥ 1**: `sum(n) = n + sum(n − 1)` (add the top stair **n** to everything below) |

**Why this step matches “1 to n”:** For **n = 4**, unfold: `sum(4) = 4 + sum(3) = 4 + 3 + sum(2) = … = 4 + 3 + 2 + 1 + sum(0) = 10`.

**JavaScript:** The function `sum` mirrors the two bullets: if `n === 0` return `0`, else return `n + sum(n - 1)`.

## Real test output

For **`4`**:

```text
Recursive definition (natural numbers 1..n, with sum(0) = 0):
sum(0) = 0
For integers n >= 1: sum(n) = n + sum(n - 1)

JavaScript:
function sum(n) {
  if (n === 0) return 0
  return n + sum(n - 1)
}

sum(4) = 10
```

For **`0`**:

```text
Recursive definition (natural numbers 1..n, with sum(0) = 0):
sum(0) = 0
For integers n >= 1: sum(n) = n + sum(n - 1)

JavaScript:
function sum(n) {
  if (n === 0) return 0
  return n + sum(n - 1)
}

sum(0) = 0
```

## Common mistakes

| Mistake | What goes wrong |
|---------|-----------------|
| Base case `sum(1) = 1` only | You can still write a recursion, but the sheet’s one-line pattern `n + sum(n − 1)` wants **`sum(0) = 0`**. |
| `sum(n) = (n + 1) * n / 2` | That is a **closed form**, not the **recursive** definition the sheet asks for (fine as a check, not as the only answer). |

Back to [task](../README.md).
