# Task 07_2 · Venn Diagram A B C

Part of [Exercise 07 · Sets and Relations I](../README.md). New ideas you need: primes, odd numbers, ℕ, Venn diagram for three sets. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Draw and label there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

Show the relationship between the following sets with a **set diagram** (Venn diagram):

- **A** = { *a* ∈ ℕ | 1 ≤ *a* ≤ 5 }
- **B** = { *b* ∈ ℕ | 1 ≤ *b* ≤ 20 ∧ *b* is prime }
- **C** = { *c* ∈ ℕ | 1 ≤ *c* ≤ 15 ∧ *c* is odd }

## The task, simply said

1. Write out **A** as a list (five small counting numbers).
2. List **B**: primes from 1 to 20 (remember: **1 is not prime**).
3. List **C**: odd numbers from 1 to 15.
4. Draw **three** circles (or blobs) labelled **A**, **B**, **C** the usual Venn way: each pair overlaps, and all three meet in the middle chunk.
5. Put **every number** that belongs to more than one set in the **right overlap** (only A∩B, only A∩C, only B∩C, or the very middle).

## Check examples

| Check | You should see |
|-------|----------------|
| Size of **A** | Exactly **5** numbers |
| **2** | In **A** and **B**, not in **C** (2 is not odd) |
| **1** | In **A** and **C**, not in **B** (1 is not prime) |
| **17** | In **B**, not in **A**, not in **C** (17 > 15) |
| Middle of all three | **3** and **5** live there |

## Little helpers

<details>
<summary>Is 1 a prime number?</summary>

**No.** The smallest prime is **2**.

</details>

<details>
<summary>How should the three circles meet?</summary>

Classical **three-set Venn**: each pair of circles overlaps, and there is one **central lens** where **all three** meet. Label regions or write numbers on the diagram.

</details>

## Done when

- [ ] Your three lists **A**, **B**, **C** are complete and correct.
- [ ] Your picture has three labelled regions and every number from those lists sits in the right place (or you listed who goes where next to a rough sketch).

Next: [Task 07_3](../task-07-3-set-operations-and-diagram/README.md)
