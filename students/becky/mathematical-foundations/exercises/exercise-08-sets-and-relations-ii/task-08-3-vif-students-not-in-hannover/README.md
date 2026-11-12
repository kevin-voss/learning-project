# Task 08_3 · VIF students not in Hannover

Part of [Exercise 08 · Sets and Relations II](../README.md). New ideas you need: disjoint sets, Venn regions. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write your number there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

A course has **64** students in total from **Business Informatics (BIS)** and **Administrative Informatics (VIF)**. **Nobody** studies both programs.

- **35** students live in **Hannover**.
- **38** students study **BIS**.
- Among those who live in Hannover, **30** study **BIS**.

**Question:** How many students in **VIF** live **not** in Hannover?

## The task, simply said

1. **64** splits into **BIS-only** + **VIF-only** (no double count — the sets are disjoint).
2. Use **38** BIS total and **30** BIS in Hannover to learn something about Hannover and VIF.
3. The question asks only for **VIF ∧ ¬Hannover** (VIF and outside Hannover).

## Check examples

| Check | You should see |
|-------|----------------|
| VIF headcount | Total **64** minus **38** BIS |
| Hannover | **35** people; **30** BIS inside means **5** in Hannover are **not** BIS |
| Final region | A number **smaller** than the full VIF count (some VIF students do live in Hannover) |

## Little helpers

<details>
<summary>How do I picture it?</summary>

Two bubbles **BIS** and **VIF** that **do not overlap**. Cross with **Hannover** vs **not Hannover** — four regions for (BIS, VIF) × (in city, outside).

</details>

<details>
<summary>Who are the 5 in Hannover who are not in the “30 BIS in Hannover” count?</summary>

They must belong to the **other** program. That links Hannover size **35** to BIS/VIF split.

</details>

## Done when

- [ ] One clear **integer** answer (count of people).
- [ ] You can point to the **Venn region** your number describes.

Next: [Task 08_4](../task-08-4-power-sets-in-listed-form/README.md)
