# Task 91_1 · Random array sort and print

Part of [Exercise 91 · 1D Arrays](../README.md). New ideas you need: random array length, random fills, printing `(a, b, c)`, ascending and descending order. They are all explained on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `RandomArraySort.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Create a **one-dimensional array**.

- Pick how long it may be: you set a **minimum** and **maximum** length; the actual length is chosen **at random** between them (both ends allowed).
- Pick what each entry may be: you set a **minimum** and **maximum** value; each slot gets a **random** integer in that range (both ends allowed).
- When the array is full, print it to the console.
- Then sort the values **once ascending** and **once descending**, and print each sorted version.

**Example from the sheet** (length between 1 and 10, values between 1 and 100):

- Random length → **3**
- Random values → **76, 23, 99**

**Output lines:**

```text
(76, 23, 99)
(23, 76, 99)
(99, 76, 23)
```

For automated checks, your program **reads one integer first**: the **seed** for `java.util.Random`. The tests always type a seed so the output is predictable. Use these bounds unless your sheet says otherwise:

| Setting | Value |
|---------|-------|
| Length | from **1** through **10** |
| Values | from **1** through **100** |

## The task, simply said

1. Set constants: length **1…10**, values **1…100** (same as the sheet example).
2. Read one `int` from the keyboard: the **random seed**.
3. Make a `Random` with that seed.
4. Draw a length, create `int[]`, fill every slot with random values in range.
5. Print the array as `(n1, n2, …)` — commas and spaces exactly like the example.
6. Sort a **copy** ascending, print it the same way.
7. Sort a **copy** descending, print it the same way.

## Test examples

Your program is right when:

| You type (seed) | The program prints (three lines) |
|-----------------|----------------------------------|
| `42` | `(64)` then `(64)` then `(64)` |
| `1` | `(89, 48, 14, 55, 5, 35)` then `(5, 14, 35, 48, 55, 89)` then `(89, 55, 48, 35, 14, 5)` |
| `7` | `(65, 86, 45, 81, 55, 69, 50)` then `(45, 50, 55, 65, 69, 81, 86)` then `(86, 81, 69, 65, 55, 50, 45)` |

The sheet example `(76, 23, 99)` is the **shape** of the output; your numbers change when the seed changes.

## Little helpers

<details>
<summary>My third line is not reverse order</summary>

Sort ascending first, then swap from both ends: first with last, second with second-last, until you meet in the middle.

</details>

<details>
<summary>My first line already looks sorted</summary>

Print the **original** array before you sort any copy. If you sort in place first, line 1 is wrong.

</details>

<details>
<summary>Parentheses and commas</summary>

One opening `(`, then the first number, then for every other number `", "` and the number, then `)`.

</details>

## Done when

- [ ] Every test example above matches your program.
- [ ] `make test-task TASK=91_1` is all green.
- [ ] You can explain original vs ascending vs descending out loud.

Back to [Exercise 91](../README.md).