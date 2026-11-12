# Task 08_3 · Triangle angles

Part of [Exercise 08 · Methods II](../README.md). New ideas you need: law of cosines, `Math.acos`, a general **round** method with a decimal-place parameter. They are on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `TriangleAngles.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write a program that reads three side lengths **a**, **b**, and **c** of a triangle as `double` values, computes angles **α**, **β**, and **γ** with the **law of cosines**, rounds each angle to **3** decimal places (commercial rounding), and prints them.

Put **rounding** and **angle calculation** in **separate** methods. The rounding method must be **general**: the number of decimal places is a **parameter**.

Cosine rules (angle opposite the side in the numerator’s minus term):

```text
α = arccos((b² + c² − a²) / (2 · b · c))
β = arccos((a² + c² − b²) / (2 · a · c))
γ = arccos((a² + b² − c²) / (2 · a · b))
```

Use **degrees** for the printed angles.

## The task, simply said

1. One method: `roundCommercial(value, decimalPlaces)` — any `double`, any place count.
2. One method: compute **one** angle in degrees when you know all three sides and which angle you want (or three small methods — your choice, as long as the logic is not all in `main`).
3. `main` reads **a**, then **b**, then **c** from the console.
4. Print **α**, **β**, **γ**, each rounded to **3** decimals.

## Test examples

Your program is right when it prints these angles (labels optional; values must appear):

| Side a | Side b | Side c | α (°) | β (°) | γ (°) |
|--------|--------|--------|-------|-------|-------|
| 3 | 4 | 5 | 36.870 | 53.130 | 90.000 |
| 5 | 5 | 5 | 60.000 | 60.000 | 60.000 |
| 7 | 8 | 9 | 48.190 | 58.412 | 73.398 |

Row 1 is a right triangle (γ = 90°). Row 2 is equilateral.

## Little helpers

<details>
<summary>Why do I get NaN?</summary>

The fraction inside `acos` must stay between −1 and 1. If the three sides cannot form a triangle, the value can drift outside — the sheet assumes valid input.

</details>

<details>
<summary>Radians or degrees?</summary>

`Math.acos` works in **radians**. Multiply with `Math.toDegrees(...)` before you round and print.

</details>

## Done when

- [ ] Every test example row gives the three angles.
- [ ] Rounding lives in **one** reusable method with a place count.
- [ ] Angle math is **not** all copied three times in `main`.

Next: [Task 08_4 · Mirror array](../task-08-4-mirror-array/README.md).
