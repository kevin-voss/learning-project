# Exercise 04 · Fetching and N plus 1

| | |
|---|---|
| Student | Kevin |
| Subject | Spring Boot |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

You know lists and maps. Now you fetch a class list with **lockers** — one trip per locker, or one trip for everything — and you cut a wall of postcards into **pages** that never repeat a card.

## Before you code

Sheets this exercise practices (read the parts you need):

1. [Fetching and N+1: ask the database once](../../../../../sheets/hibernate/fetching-and-n-plus-one.md)
2. Course [step 10: Persistence, keep the parcels](../../../../../tracks/spring-boot/topics/10-persistence/README.md)

Map: [Hibernate: what happens to your entities](../../../../../sheets/hibernate/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 04_1 | [Count the queries](task-04-1-count-the-queries/README.md) | todo |
| 04_2 | [Slice of the wall](task-04-2-slice-of-the-wall/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

```bash
java --version   # want 25 (21 also fine)
```

---

## What you will learn

Real Hibernate needs a database and Spring Boot, and this exercise uses neither: the repo's test runner compiles plain Java only. So every task builds **one Hibernate idea by hand** — and each part of your program stands for one thing Hibernate does for you.

### 1. LAZY — the locker opens when you walk to it

The class list is one page; the lockers are in the corridor. Nobody carries all locker contents around: a locker opens when you walk to it. A lazy relation is the same: `author.getBooks()` loads the books when you touch them, not when the author is loaded.

```java
@Entity
class Author {
    @Id Long id;
    @OneToMany(mappedBy = "author",
               fetch = FetchType.LAZY)
    List<Book> books;   // loads on first touch, not before
}
```

**In task 04_1 you build this by hand:** `books()` keeps the list `null` and loads it on the first call — that `if` is the locker opening.

### 2. N+1 — and how you see it

Walk down the class list and open every locker: one trip for the list, then one per pupil — 1 + 30 trips. That is **N+1**. You see it in the SQL log and in Hibernate's statistics: 20 authors with books → 21 queries.

```properties
# application.properties: make Hibernate show what it really sends
spring.jpa.properties.hibernate.generate_statistics=true
logging.level.org.hibernate.SQL=DEBUG
```

**In task 04_1 you build this by hand:** your `queries: 4` line stands for the statistics — you count your own N+1.

### 3. JOIN FETCH — one trip for everything

Ask the caretaker for the list **with** the locker contents: one trip.

```java
@Query("""
    select a from Author a
    join fetch a.books
    where a.id = :id
    """)
Optional<Author> findByIdWithBooks(Long id);
```

**In task 04_1 you build this by hand:** `MODE fetch` fills every author's books in one `-- SELECT * FROM authors JOIN books`.

### 4. Pagination — a slice of the wall, always in order

Picture a wall of postcards. Page 2 must show the next cards, never repeat page 1. That only works when the wall has a fixed order: `Sort.by("title")` first, then the slice.

```java
Page<Book> page = bookRepository.findAll(
    PageRequest.of(0, 20, Sort.by("title")));
// without the sort, page 2 can repeat rows of page 1
```

**In task 04_2 you build this by hand:** a `PageRequest` record and a `page(...)` method slice a sorted list — sort first, then `subList`.

---

## Words to know

| Word | Means |
|------|-------|
| **LAZY** | The relation loads when you touch it, not when the owner loads |
| **EAGER** | The relation loads together with the owner — every time |
| **N+1** | One query for the list, then one more query per element |
| **JOIN FETCH** | A JPQL join that loads the relation in the same query |
| **`@EntityGraph`** | A fetch plan on a repository method: same effect, reusable |
| **`LazyInitializationException`** | Touching a lazy relation after the transaction ended |
| **Pageable / PageRequest** | "Give me page 2, 20 rows" — which slice to fetch |
| **Sort.by("title")** | The fixed order a page needs; without it, pages can repeat rows |
| **totalPages** | Ceiling of (all rows / page size) |

## Source

Written for Kevin: plain-Java practice for the [fetching and N+1 sheet](../../../../../sheets/hibernate/fetching-and-n-plus-one.md) and course step 10.

Back to [all exercises](../README.md).
