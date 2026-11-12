# Task 08_2 · Divisible by 2 or 5 up to 10000

Part of [Exercise 08 · Sets and Relations II](../README.md). New ideas you need: ℕ on this sheet, “or” counting, inclusion–exclusion. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your count there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

How many **natural numbers** less than or equal to **10000** are divisible by **2** **or** by **5**?

## The task, simply said

1. We count numbers in **ℕ** with value **≤ 10000** (see the exercise page: **ℕ includes 0** here).
2. “Divisible by 2 **or** 5” means in the **union** of two sets: multiples of 2 and multiples of 5.
3. Numbers divisible by **both** 2 and 5 were counted **twice** if you only add the two lists — fix that with **one subtraction**.
4. Give a single **whole number** as the answer.

## Check examples

| Check | You should see |
|-------|----------------|
| Multiples of 2 only | About **half** of 0…10000 (a bit over 5000 with 0 included) |
| “Or” not “and” | Your count is **larger** than “divisible by 2 only” but **smaller** than adding two full counts with no fix |
| Overlap | Numbers divisible by **10** belong to **both** sides — that is the piece to subtract once |

## Little helpers

<details>
<summary>How do I count multiples of 2 from 0 to 10000?</summary>

They are 0, 2, 4, …, 10000. Count how many terms: from 0 through 10000 stepping by 2.

</details>

<details>
<summary>What is the overlap set?</summary>

Divisible by 2 **and** by 5 means divisible by **lcm(2, 5) = 10**. Count multiples of 10 up to 10000 the same way.

</details>

## Done when

- [ ] You wrote one clear integer answer.
- [ ] You can explain in one sentence why you **subtracted** something after adding two counts.

Next: [Task 08_3](../task-08-3-vif-students-not-in-hannover/README.md)
