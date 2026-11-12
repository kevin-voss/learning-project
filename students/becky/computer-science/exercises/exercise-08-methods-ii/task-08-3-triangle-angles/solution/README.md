# Sample solution · Task 08_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

```bash
javac TriangleAngles.java
java TriangleAngles
```

## How it works, step by step

1. **`roundCommercial(value, places)`** — general rounding; task 08_3 uses `places = 3`.
2. **`angleOpposite`** — cosine law for the angle **opposite** side `side`, using the other two sides in the denominator.
3. **`Math.acos`** in radians → **`Math.toDegrees`** before rounding.
4. **`main`** reads `a`, `b`, `c` with `Locale.US`, prints α β γ with `%.3f`.

**Test run** (input `3` `4` `5`)

```text
alpha: 36.870
beta: 53.130
gamma: 90.000
```

**Test run** (input `7` `8` `9`)

```text
alpha: 48.190
beta: 58.412
gamma: 73.398
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Degrees inside `acos` | Angles wildly wrong | `acos` needs radians; convert **out** |
| Wrong side in numerator | γ not 90 on 3-4-5 | Angle **opposite** `a` uses `b²+c²−a²` |
| All math in `main` | Hard to test | Split **round** and **angle** methods |
