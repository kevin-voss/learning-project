# Sample solution · Task 07_4 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac MethodToolbox.java
java MethodToolbox
```

## How it works, step by step

1. **`padNumber`** — start with `String.valueOf`, prepend `"0"` until the length reaches `minWidth`.
2. **`sum`** — classic loop over `values.length`.
3. **`frequency`** — count slots equal to `target`.
4. **`arraysEqual`** — lengths must match; each pair of doubles compared with `Math.abs` and a tolerance.
5. **`range`** — array size `to - from + 1`, fill with `from`, `from+1`, …
6. **`main`** prints demo lines the tests search for.

**Test run**

```text
007
00042
sum: 6
count 2: 3
equal: true
equal: false
range: 2 3 4 5
range: 7
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Pad on the right | `700` instead of `007` | Add zeros **before** the digits |
| `==` on doubles | equal: false for matching arrays | Compare with a tolerance |
| Different order counts as equal | true for `{1,2}` and `{2,1}` | Compare index by index |
| Interval length off by one | Missing 5 in 2..5 | Use `to - from + 1` slots |
