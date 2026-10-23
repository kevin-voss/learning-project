# Exercise 09 · Clean Java habits

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

The post office works. Now the team wants **habits**: clear names, and methods that return a clear “maybe” with **`Optional`** instead of sneaky `null`.

## Before you code

Read these sheets:

1. [Naming and style](../../../../../sheets/java/advanced/naming-and-style.md)
2. [Optional](../../../../../sheets/java/advanced/optional.md)

Map: [Advanced Java craft](../../../../../sheets/java/advanced/README.md).

## Tasks

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 09_1 | [City lookup](task-09-1-city-lookup/README.md) | todo |
| 09_2 | [Safe divide](task-09-2-safe-divide/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`.

## How to work

1. Read this page to the end.
2. Open the first task and write code in `my-solution/`.
3. Run `make test-task TASK=09_1 STUDENT=kevin SUBJECT=java` (then `09_2`).
4. Peek at `solution/` only when you are done.

---

## What you will learn

### 1. Names that say the job

Picture a kitchen drawer: every tool has a place and a name.

```java
static Optional<String> findCity(String code) { /* … */ }
```

**In both tasks** you name methods after what they do (`findCity`, `divide`), not `process` or `doIt`.

### 2. Optional — the gift box

Sometimes there is no answer. Return an empty box, not `null`.

```java
Optional<String> city = findCity("BER");
System.out.println(city.orElse("missing"));
```

**In task 09_1** a unknown city code is `Optional.empty()`.
**In task 09_2** divide-by-zero is `Optional.empty()`.

---

## Words to know

| Word | Means |
|------|-------|
| **convention** | A habit the team agrees on (names, style) |
| **Optional** | A box that holds a value or is empty |
| **orElse** | Use this fallback when the box is empty |

## Source

Teacher sheet for Kevin: *Clean Java habits — Optional lookups*. Linked from [sheets/java/advanced](../../../../../sheets/java/advanced/README.md).

Back to [all exercises](../README.md).
