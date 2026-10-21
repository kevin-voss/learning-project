# Sample solution · Task 02_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac FloatingSum.java
```

```bash
java FloatingSum
```

## How it works, step by step

### a) The program

1. Each term gets its own `double` box with a clear name (`big`, `middle`, `small`, `tiny`), written in e-notation exactly like the sheet's table: `2.34e6`, `3.45`, `4.56e-6`, `5.67e-12`. One expression `big + middle + small + tiny` would be just as right; the boxes only make the experiment in b) easier.
2. `sum` is printed with a label. That line alone is the answer to a).
3. Two more lines are the **experiment** for b): the same sum without `tiny`, and the same sum in another order.
4. The last line prints the exact sum as plain text, worked out by hand, so the comparison sits right under Java's answers.

**Test run**

```text
Sum:                  2340003.4500045604
Sum without 5.67e-12: 2340003.4500045604
Smallest first:       2340003.45000456
Exact (by hand):      2340003.45000456000567
```

### b) Is it the exact mathematical result? No.

**Step 1: the exact sum, by hand.** Line up the dots and add:

```text
   2340000.00000000000000
 +       3.45000000000000
 +       0.00000456000000
 +       0.00000000000567
 ------------------------
   2340003.45000456000567
```

Every one of the four terms leaves its mark in the exact result: the `567` at the very end comes from 5.67 · 10⁻¹².

**Step 2: compare with Java.**

```text
Java:   2340003.4500045604
Exact:  2340003.45000456000567
                         ^ from here on they differ
```

Java's answer is wrong from the 10th digit after the dot on, and the `567` of the tiniest term is nowhere to be seen. So the program does **not** give the exact result.

**Step 3: why, in numbers.** Count the significant digits (from the first non-zero digit to the last one):

- The exact sum `2340003.45000456000567` has 7 digits before the dot and 14 after it: **21 significant digits**.
- A `double` stores its digits in a **mantissa** of 53 bits. 53 bits are worth about **15 to 16 decimal digits** (2⁵³ ≈ 9 · 10¹⁵).
- 21 digits do not fit into 16. The last 5 or so must be rounded away.

**Step 4: why exactly the tiny term disappears.** A `double` near 2.34 million cannot be just any number. It sits on a "ruler" whose marks are a fixed distance apart. Near 2 340 003 the distance between two neighbouring doubles is

```text
2⁻³¹ ≈ 0.000 000 000 466   (4.66 · 10⁻¹⁰)
```

Every result of `+` is rounded to the **nearest mark**. Now look at the terms:

| Term | Compared with one step (4.66 · 10⁻¹⁰) | What happens |
|------|----------------------------------------|--------------|
| 3.45 | billions of steps | survives |
| 4.56 · 10⁻⁶ | about 10 000 steps | survives, but rounded to a whole number of steps |
| 5.67 · 10⁻¹² | about **1/80 of one step** | rounding to the nearest mark lands on the **same** mark: it vanishes completely |

That is what the sheet calls **rounding / cancellation**: when you add a very small number to a very big one, the small one's digits fall off the end of the mantissa.

**Step 5: the proof.** The second line of the test run adds only the first three terms, and Java prints **exactly the same** number: `2340003.4500045604`. So `+ 5.67e-12` changed nothing at all. In exact maths, adding something that is not zero always changes the result. Here it did not. That cannot be exact maths.

**Step 6: where the `…5604` at the end comes from.** It is not the tiny term showing up. The double that Java really holds is

```text
2340003.4500045604072511196136474609375
```

the mark on the ruler closest to the true sum. Java prints the shortest decimal number that still points to exactly this mark: `2340003.4500045604`. The `04` at the end is rounding noise. The real error is about `4 · 10⁻¹⁰`: less than one step of the ruler, so it is as good as a `double` can do. (Even `3.45` alone is not stored exactly: in binary it is an endless fraction, like 1/3 = 0.333… in decimal.)

**Step 7: order matters too.** In exact maths, a + b + c + d is the same in any order. With doubles it is not, because every single `+` rounds once. Adding the smallest numbers first (`tiny + small + middle + big`) lets `5.67e-12` and `4.56e-6` meet while they are still small and similar. The result is a **different** double, `2340003.45000456`, which happens to be closer to the exact sum (error about 6 · 10⁻¹¹). But it still cannot hold all 21 digits: the `567` is lost here as well.

**Step 8: and the calculator?** A pocket calculator or phone app also works with a fixed number of digits (often 10 to 16). It rounds as well. When two machines that both round show the same thing, that only shows they round in a similar way. It does not prove the result is exact. To check the exact maths, you add by hand like in step 1, or use a tool that calculates with as many digits as needed.

**In one sentence:** the exact sum needs 21 significant digits, a `double` keeps only about 16, so the result is rounded to the nearest representable value, and the term 5.67 · 10⁻¹² is so small compared with 2.34 · 10⁶ that it disappears completely, which the run without it proves.

**Does that make `double` bad?** No. 16 correct digits are plenty for prices, distances, physics. You just should not expect the 20th digit to be right, and you should never test two doubles with `==` (you meet that in exercise 04).

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `2,34e6` with a comma | `<identifier> expected` | Dot: `2.34e6` |
| `2.34 * 10^6` | `bad operand types for binary operator '^'` | `^` is not "power" in Java: write `2.34e6` |
| `4.56e6` instead of `4.56e-6` | `6900003.45` | Small numbers have a **minus** after the `e` |
| A term forgotten (e.g. `3.45`) | `2340000.00000456` | Four terms, compare with the sheet one by one |
| "Same as the calculator, so it is exact" | – | The calculator rounds too. Compare with the exact sum by hand |
| "Java is just wrong" | – | Java does exactly what a `double` can do: about 16 digits, rounded to the nearest possible value |

Back to [Task 02_3](../README.md).
