# Sample solution · Task 05_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac TriangleString.java
```

```bash
java TriangleString
```

## How it works, step by step

1. Read one word with `scanner.next()`.
2. Count **down** from `text.length()` to 1.
3. Each lap: `text.substring(0, n)` keeps the first `n` letters (positions 0 … n−1).
4. Print that piece. When `n` is 1, only the first letter remains.

**Test run**

```text
Input: Klausur
Klausur
Klausu
Klaus
Klau
Kla
Kl
K
```

```text
Input: Hi
Hi
H
```

```text
Input: A
A
```

(On a real keyboard the word you type is echoed after `Input: `. The program then prints the triangle, starting with the full word again — that matches the sheet.)

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Count up from 1 | Triangle grows | `n = length` down to 1 |
| `n >= 0` | Extra empty line at the end | Stop at `n >= 1` |
| `substring(0, length - 1)` only once | Only two lines | Put substring **inside** the loop |
| `nextLine()` vs `next()` | Fine for one word; spaces need `nextLine` | This task uses one word |

Back to [Task 05_4](../README.md).
