# Task 07_4 · Venn Diagram Cases

Part of [Exercise 07 · Sets and Relations I](../README.md). New ideas you need: disjoint sets, proper subset, ∩, ∪, \ on a picture. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Draw each case there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

Let **A** and **B** be sets. Draw **set diagrams (Venn diagrams)** for intersection *A* ∩ *B*, union *A* ∪ *B*, and difference *A* \ *B* and *B* \ *A* in each of the following situations:

- **A** and **B** are **not disjoint** (they share at least one element)
- **A** and **B** are **disjoint** (they share no element)
- **A** is a **proper subset** of **B**
- **B** is a **proper subset** of **A**

## The task, simply said

1. You need **four separate mini-drawings** (or four rows).
2. In **each** situation, show the same four things shaded or labelled: *A* ∩ *B*, *A* ∪ *B*, *A* \ *B*, *B* \ *A*.
3. “**Not disjoint**” means **both** circles cross and the middle lens is **non-empty**.
4. “**Disjoint**” means **no** overlap — two separate ovals.
5. “**A** is a **proper subset** of **B**” means: draw **A** **inside** **B**, **smaller**, and **not** equal (so **B** has something outside **A**).

## Check examples

| Situation | Quick picture check |
|-----------|-------------------|
| Not disjoint | ∩ is a **non-empty** overlap; neither \ is the whole other set |
| Disjoint | ∩ is **empty**; *A* \ *B* = *A*; *B* \ *A* = *B* |
| *A* ⊂ *B* (proper) | *A*∩*B* = *A*; *A*\*B* = ∅; *B*\*A* is **only the rim** around *A* |
| *B* ⊂ *A* (proper) | Same with names swapped |

## Little helpers

<details>
<summary>Do I need four huge diagrams?</summary>

No — a **clear sketch per case** is enough. Label **A** and **B**. Shade or label the **region** for each operation (you can use four small pictures per case, or one picture with four colours explained in a key).

</details>

<details>
<summary>What does “proper” add?</summary>

**Subset** alone allows *A* = *B*. **Proper** means *A* ⊆ *B* **and** *A* ≠ *B*, so **B** must have at least one point **outside** *A* (and vice versa in the last case).

</details>

## Done when

- [ ] You covered **all four** situations.
- [ ] For **each** situation you showed **all four** operations: ∩, ∪, *A* \ *B*, and *B* \ *A*.

Back to [Exercise 07](../README.md)
