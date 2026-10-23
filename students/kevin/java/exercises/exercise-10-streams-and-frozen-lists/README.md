# Exercise 10 · Streams and frozen lists

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

The sorting belt is in: you describe **pipelines** over lists (**streams**), and you hand out **frozen** lists so nobody quietly edits your data behind your back.

## Before you code

1. [Immutability](../../../../../sheets/java/advanced/immutability.md)
2. [Streams](../../../../../sheets/java/advanced/streams.md)

Map: [Advanced Java craft](../../../../../sheets/java/advanced/README.md).

## Tasks

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 10_1 | [Positive squares](task-10-1-positive-squares/README.md) | todo |
| 10_2 | [Unique tags](task-10-2-unique-tags/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`.

## How to work

1. Read this page.
2. Code in each task’s `my-solution/`.
3. `make test-task TASK=10_1 STUDENT=kevin SUBJECT=java` then `10_2`.

---

## What you will learn

### 1. Stream pipeline — the sorting belt

```java
list.stream().filter(n -> n > 0).mapToInt(n -> n * n).sum();
```

**In task 10_1** you filter, square and sum with a stream (not a hand-written mix of concerns if you can help it).

### 2. Frozen lists — museum exhibits

```java
var tags = list.stream().map(String::toLowerCase).distinct().sorted().toList();
```

`toList()` gives an unmodifiable list. **In task 10_2** you build a clean, sorted, unique tag list that way.

---

## Words to know

| Word | Means |
|------|-------|
| **stream** | A pipeline over a sequence of values |
| **filter / map** | Keep some items / transform each item |
| **immutable list** | A list you cannot `add` to after creation |

## Source

Teacher sheet for Kevin: *Streams and frozen lists*. Linked from [sheets/java/advanced](../../../../../sheets/java/advanced/README.md).

Back to [all exercises](../README.md).
