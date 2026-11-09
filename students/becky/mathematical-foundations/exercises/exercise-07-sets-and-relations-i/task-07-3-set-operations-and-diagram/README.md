# Task 07_3 · Set Operations and Diagram

Part of [Exercise 07 · Sets and Relations I](../README.md). New ideas you need: union, intersection, set difference, Venn diagram. They are explained on the exercise page.

| Folder | What it is |
|--------|------------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Write answers and sketch there |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English.)*

Let **A** = { 3, 4, 16, −7 }, **B** = { 3, 16 }, and **C** = { −7, 4, 5, 1 }.

Give the following sets in **enumerated form**:

**a)** *A* ∪ *B*  
**b)** *A* ∩ *B*  
**c)** (*A* ∩ *B*) ∪ *C*  
**d)** *A* \ *B*  
**e)** *B* \ *A*  
**f)** (*C* \ *A*) ∪ *B*

Also draw a **suitable Venn diagram** that shows these sets.

## The task, simply said

1. Remember: *A* ∪ *B* = “in *A* or *B*”; *A* ∩ *B* = “in both”; *A* \ *B* = “in *A* but not *B*.”
2. Work **inside out**: do parentheses first (e.g. *A* ∩ *B* before you union with *C*).
3. List each answer with **curly braces**; **order does not matter** (pick a tidy order if you like).
4. For the diagram: three sets — draw overlaps so the picture matches who shares what.
5. **Mini-preview:** Is **B** fully inside **A**? That makes a nested shape.

## Check examples

| Check | You should see |
|-------|----------------|
| **b** | Exactly **two** numbers (both also in **B**) |
| **e** | **No** elements — the empty set |
| **d** | Two numbers left in **A** after you remove **B**’s members |
| **f** | Union of **B** with whatever you got from **C** \ **A** — **four** numbers total |

## Little helpers

<details>
<summary>What does A \ B mean again?</summary>

Start from **A** and **throw away** anything that is also in **B**. If you throw everything away, you get **{ }** — the empty set.

</details>

<details>
<summary>For the diagram, must I use circles?</summary>

Circles or ovals are fine. What matters: **nested** set when one sits inside another, and **overlaps** when they share only *some* elements.

</details>

## Done when

- [ ] Parts **a**–**f** are written as full sets.
- [ ] Your Venn diagram matches the memberships (who is only in *A*, only in *C*, in *A*∩*C*, etc.).

Next: [Task 07_4](../task-07-4-venn-diagram-cases/README.md)
