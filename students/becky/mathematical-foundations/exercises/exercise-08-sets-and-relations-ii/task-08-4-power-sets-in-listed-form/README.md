# Task 08_4 · Power sets in listed form

Part of [Exercise 08 · Sets and Relations II](../README.md). New ideas you need: power set, subset, empty set. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** List every subset there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

Give the **power sets** of the following sets in **enumerated form** (list every element of each power set):

- **A** = { 0, 1, 2, 3 }
- **B** = { {1, 2, 3} }
- **C** = ∅

## The task, simply said

1. **𝒫(*S*)** is the set of **all** subsets of *S* — including ∅ and *S* itself.
2. Write each member of 𝒫(*S*) inside curly braces. A member can be ∅ or another set like {0, 2}.
3. For **B**, notice: the **only element** of **B** is the **set** {1, 2, 3}, not three separate numbers.
4. For **C** = ∅, there is exactly **one** subset (the empty choice).

## Check examples

| Set | How many subsets? | Quick check |
|-----|-------------------|-------------|
| **A** | 2⁴ = **16** | Count your listed pieces — should be 16 |
| **B** | 2¹ = **2** | Only ∅ and “the whole thing” { {1,2,3} } |
| **C** | 2⁰ = **1** | 𝒫(∅) is **not** empty — it contains ∅ |

## Little helpers

<details>
<summary>For B, is {1, 2, 3} an element or three elements?</summary>

**B** has **one** element, namely the **set** {1, 2, 3}. So subsets of **B** talk about **keeping or dropping that one package**, not picking 1, 2, 3 one by one.

</details>

<details>
<summary>Do I need a fixed order?</summary>

Order inside 𝒫(*A*) does not matter for set equality. Use a tidy order (size first, then dictionary) so you do not miss one.

</details>

## Done when

- [ ] 𝒫(**A**), 𝒫(**B**), and 𝒫(**C**) are each written as a set of **complete** subset entries.
- [ ] Your counts match 16, 2, and 1.

Back to [Exercise 08](../README.md).
