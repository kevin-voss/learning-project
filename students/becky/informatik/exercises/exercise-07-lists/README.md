# Exercise 07 · Lists

| | |
|---|---|
| Student | Becky |
| Subject | Informatik |
| Language | Written |
| Created | 2026-11-12 |

## The story in one sentence

Sometimes you must remember things in a **fixed order** — last plate on top, or first person in line — and sometimes you must **walk a chain** of boxes where each box points to the next; this sheet trains stack, queue, and linked-list pictures.

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your answers (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 07_1 | [Stack next two pops](task-07-1-stack-next-two-pops/README.md) | todo |
| 07_2 | [Queue next two gets](task-07-2-queue-next-two-gets/README.md) | todo |
| 07_3 | [Linked-list stack sketch](task-07-3-linked-list-stack-sketch/README.md) | todo |
| 07_4 | [Remove from linked list](task-07-4-remove-from-linked-list/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all four tasks.
2. Open the first task and read its `README.md`.
3. Write your answers in its `my-solution/` folder. That is your desk.
4. Check yourself against the check table in the task (or press **Check** on the website).
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck or a new word), `/check` (is it right?), `/done` (finished).

These tasks are **written answers** (numbers, a sketch, and a short explanation). There are no automated `make test-task` runs — the desk checker or `/check` is the test.

---

## What you will learn

### Stack — last in, first out

> [!PICTURE]
> A **stack of plates** in a cafeteria. You only touch the **top** plate. The last plate someone put on is the **first** one you take off.

**Push** puts a number on top. **Pop** takes the top number off and gives it back.

```text
push(7) push(8) push(3)   →   top is 3 (under it: 8, then 7)
pop()                     →   you get 3
```

In task **07_1** you see which two numbers `pop()` returns after a fixed push order.

### Queue — first in, first out

> [!PICTURE]
> A **line at a bakery**. The person who arrived **first** is served **first**. New people join at the **back**.

**Put in** (enqueue) adds at the back. **Get** (dequeue) takes from the front.

```text
enqueue 7, 8, 3   →   front is 7, back is 3
get()             →   you get 7
```

In task **07_2** you use the same numbers as in 07_1 but with queue rules (the sheet calls the operation `get()`).

### Linked list — boxes that point forward

> [!PICTURE]
> A **treasure hunt**: each clue says where the next clue is. You start at the **first** box (`first`). Each box holds a **value** and a link `next` to the following box (or `null` at the end).

A stack can be built as a linked list where the **top** is the `first` node. **Push** adds a new node at the front; **pop** removes the front.

In task **07_3** you draw the list after several `push` and `pop` steps.

### Removing one node by linking past it

> [!PICTURE]
> A chain of people holding hands. To drop the middle person, the person **before** them takes the hand of the person **after** them — the middle one is no longer connected.

The `remove(L, v)` function on the sheet walks the list and unlinks **one** node with value `v` (with one special case at the very first node).

In task **07_4** you explain that function line by line.

---

## Words to know

| Word | Means |
|------|-------|
| Stack | A pile where you add and remove only at the **top** (LIFO: last in, first out). |
| Queue | A line where you add at the **back** and take from the **front** (FIFO: first in, first out). |
| `push` | Put a value on a stack (on top). |
| `pop` | Take the top value off a stack and return it. |
| `get` | On this sheet: take the front value from a queue (same idea as dequeue). |
| Linked list | A chain of nodes; each node has a `value` and a `next` link. |
| `first` | The head of the list — where you start walking. |
| `null` | “No next node” — end of the chain. |

## Source

Prof. Dr. Jens Paßlick, Abteilung Wirtschaftsinformatik — *Einführung in die Informatik* (WiSe 2026/27), **7. Übung: Listen**. Translated into English here; numbers and operations match the sheet. Task **07_4** includes the JavaScript from the sheet graphic.

Back to [all exercises](../README.md).
