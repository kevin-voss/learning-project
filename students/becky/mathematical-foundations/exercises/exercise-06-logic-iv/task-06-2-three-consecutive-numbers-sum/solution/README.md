# Sample solution · Task 06_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to check

Written answer — no compile step. Match the steps below. Your simplified sum should be 3(*n* + 1) or the same idea in words.

## How it works, step by step

### 1. Aim

Show: the sum of **three consecutive natural numbers** is divisible by 3.

“Divisible by 3” means: the sum equals 3 times **some integer**.

### 2. Methods on the table

| Method | Idea | When you choose it |
|--------|------|--------------------|
| **Direct proof** | Name the three numbers; simplify; factor | Sheet says “direct proof” — **this task** |
| Induction on *n* | Prove for *n* = 0, then step *n* → *n* + 1 | Works, but longer than needed |
| Three numeric examples | 1+2+3, 4+5+6, … | Illustration only — not a proof for all *n* |

**Choose direct proof with one name *n*.**  
*Why?* Three neighbours always look like *n*, *n* + 1, *n* + 2. One algebra line finishes the job.

### 3. Name the three numbers

**What we see:** “three consecutive naturals”.  
**Rule:** call the first one *n*; the next two follow.

```text
n ,  n+1 ,  n+2        (n is a natural number)
```

*Why start at *n*:* any triple of neighbours has a smallest member; that member is our *n*.

### 4. Write the sum

```text
S = n + (n+1) + (n+2)
```

### 5. Simplify (one idea per line)

Combine like terms:

```text
S = n + n + 1 + n + 2
  = 3n + 3
```

*Mini-check:* *n* = 4 gives 3·4 + 3 = 15, and 4 + 5 + 6 = 15 ✓

### 6. Factor out 3

```text
S = 3n + 3 = 3(n + 1)
```

**What we see:** 3 times (*n* + 1).  
**Rule:** *n* is a natural number, so *n* + 1 is an integer, so 3(*n* + 1) is “3 × integer”.  
**Why that finishes the proof:** that **is** the definition of “divisible by 3”.

### 7. Conclusion

The sum of *n*, *n* + 1, and *n* + 2 equals 3(*n* + 1). Therefore the sum is divisible by 3 for **every** natural *n*.

**Final answer:** For consecutive naturals *n*, *n* + 1, *n* + 2, the sum is 3(*n* + 1), hence divisible by 3.

## Common mistakes

| Mistake | What goes wrong | Fix |
|---------|-----------------|-----|
| Use *n* − 1, *n*, *n* + 1 without simplifying cleanly | Same idea, easy to slip on arithmetic | Stick to *n*, *n* + 1, *n* + 2 |
| Stop at 3*n* + 3 | Correct but not visibly “3 × integer” | Factor: 3(*n* + 1) |
| Only check 1 + 2 + 3 | One example | Keep the letter *n* through the proof |

Back to [Task 06_2](../README.md).
