# Sample solution · Task 06_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Your proof needs a clear base case, a stated inductive hypothesis, and a step that ends with “(*n* + 1)² + (*n* + 1) is even”.

## How it works, step by step

### 1. Aim

Show: *n*² + *n* is **even** for **every** natural number *n* ≥ 0.

“Even” means: equals 2 times some integer.

### 2. Methods on the table

| Method | Idea | When you choose it |
|--------|------|--------------------|
| **Complete induction** | Base + “if true for *n*, true for *n* + 1” | Sheet says “vollständige Induktion” — **this task** |
| Direct algebra for all *n* | Factor *n*(*n* + 1) | True, but the sheet wants induction |
| Check *n* = 0, 1, 2, … | Fails for “all *n*” | Never enough |

**Choose complete induction.**  
*Why?* The claim is “for all *n* ≥ 0”. Induction is the standard tool the course expects here.

### 3. Base case (*n* = 0)

**What we see:** the ladder starts at 0.

Plug in:

```text
0² + 0 = 0
```

0 = 2 · 0, so 0 is even.

*Mini-check:* base case ✓

### 4. Inductive hypothesis (IH)

Fix one natural number *n* ≥ 0 and **assume**:

```text
n² + n is even.
```

Write that in symbols if you like: *n*² + *n* = 2*t* for some integer *t*.

*Why we may assume this:* induction lets us use the truth at rung *n* while proving rung *n* + 1.

### 5. Inductive step — goal

We must show:

```text
(n+1)² + (n+1) is even.
```

### 6. Expand (*n* + 1)² + (*n* + 1)

**What we see:** a square plus a linear term.  
**Rule:** binomial square, then combine like terms.

```text
(n+1)² + (n+1) = (n² + 2n + 1) + (n+1)
                = n² + 3n + 2
```

*Alternative good path:* expand to *n*² + 2*n* + 1 + *n* + 1 = *n*² + *n* + 2*n* + 2 (group the even parts later). Both work.

We use the grouping that shows “old even part + clearly even part”:

```text
(n+1)² + (n+1) = (n² + n) + (2n + 2)
                = (n² + n) + 2(n + 1)
```

### 7. Apply the inductive hypothesis

By IH, *n*² + *n* is even.

Also 2(*n* + 1) is even (it is 2 times an integer).

**Rule:** even + even = even.

So (*n* + 1)² + (*n* + 1) is even.

*Mini-check:* if *n*² + *n* = 2*t*, then (*n* + 1)² + (*n* + 1) = 2*t* + 2(*n* + 1) = 2(*t* + *n* + 1), clearly even.

### 8. Close induction

We proved:

- base: *n* = 0 works;
- step: from *n* to *n* + 1 works.

By **complete induction**, *n*² + *n* is even for **all** natural numbers *n* ≥ 0.

**Final answer:** Base 0² + 0 = 0 is even. If *n*² + *n* is even, then (*n* + 1)² + (*n* + 1) = (*n*² + *n*) + 2(*n* + 1) is even. Hence by complete induction, *n*² + *n* is even for all *n* ≥ 0.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Assume the claim for all *n* in the IH | Circular — you have not proved it yet | IH is only for **one fixed** *n* |
| Skip the base case | Induction has no first rung | Always check *n* = 0 on this sheet |
| Expand incorrectly | Wrong parity in the step | Expand (*n* + 1)² carefully; group (*n*² + *n*) |
| Stop after examples | Does not prove “all *n*” | Finish with “by complete induction …” |

Back to [Task 06_3](../README.md).
