# Task 08_4 · Mirror array

Part of [Exercise 08 · Methods II](../README.md). New ideas you need: reverse a **copy** vs reverse **in place**. They are on the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `MirrorArray.java` yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

Write two methods that take a one-dimensional `int` array and **mirror** it (reverse element order). Example: `[1, 13, 3, 42, 5]` → `[5, 42, 3, 13, 1]`.

**a)** `mirrorCopy()` must **leave the given array unchanged** and **return** a new mirrored array.

**b)** `mirrorInPlace()` (the sheet says `mirrorOrginial`) must reverse the order **inside** the array you pass in.

Test both in `main`.

## The task, simply said

1. **mirrorCopy**: build a new array (or copy first), reverse order, return it — original untouched.
2. **mirrorInPlace**: swap elements from both ends toward the middle in the **same** array.
3. In `main`, start from `[1, 13, 3, 42, 5]`, show original, show copy result, then show in-place result on a fresh copy of the same numbers.

## Test examples

Your program is right when the printed arrays match:

| Step | Expected array text |
|------|---------------------|
| After copy call, original | `[1, 13, 3, 42, 5]` |
| Mirrored copy | `[5, 42, 3, 13, 1]` |
| After in-place | `[5, 42, 3, 13, 1]` |

Using `Arrays.toString(...)` for output is fine.

## Little helpers

<details>
<summary>Did my copy change the original?</summary>

If you reverse the same array reference you were given, the original changes too. **Copy** first (`new int[]` + loop, or `Arrays.copyOf`).

</details>

<details>
<summary>Length 0 or 1</summary>

Mirroring still works: nothing to swap; return the same order.

</details>

## Done when

- [ ] Every test example matches.
- [ ] `mirrorCopy` never changes its input array.
- [ ] `mirrorInPlace` does not allocate a second full array for the reverse (swap in place).

Back to [Exercise 08](../README.md).
