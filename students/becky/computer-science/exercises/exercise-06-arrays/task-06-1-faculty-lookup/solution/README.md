# Sample solution · Task 06_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac FacultyLookup.java
```

```bash
java FacultyLookup
```

## How it works, step by step

1. The five names go into a `String[]` in sheet order. Index **0** holds faculty **1**, index **4** holds faculty **5**.
2. Read the faculty number from the user.
3. **Before** using `[ ]`, check `number >= 1 && number <= faculties.length`. That is the sensible reaction to bad input.
4. If valid, print `faculties[number - 1]`. If not, print `Invalid faculty number.` and do not read from the array.

**Test run**

```text
Faculty number: 4
Faculty name: Business and Computer Science

Faculty number: 1
Faculty name: Electrical Engineering and Information Technology

Faculty number: 0
Invalid faculty number.

Faculty number: 6
Invalid faculty number.
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Use `faculties[number]` with numbers 1…5 | Crash on 5 or wrong name on 1 | Subtract 1, or store an unused slot at index 0 |
| No range check | Name for 99 or crash | Check 1…length before `[ ]` |
| Only check upper bound | Faculty 0 prints something | Check **both** ends |

Back to [Task 06_1](../README.md).
