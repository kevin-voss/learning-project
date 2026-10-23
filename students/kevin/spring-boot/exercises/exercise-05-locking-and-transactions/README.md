# Exercise 05 · Locking and transactions

| | |
|---|---|
| Student | Kevin |
| Subject | Spring Boot |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

Two clerks edit the same stock card: either the card carries a **stamp** that exposes the second writer, or the first clerk takes the card off the shelf and the second one **waits in line**.

## Before you code

Course lessons and sheet (read the parts you need):

1. [Locking explained](../../../../../tracks/spring-boot/topics/10-persistence/locking-explained.md) — optimistic vs pessimistic, and when each wins.
2. [Optimistic locking lab](../../../../../tracks/spring-boot/topics/15-performance-and-safety/optimistic-locking-lab.md) — cause the clash on purpose, watch the 409.
3. [The persistence context](../../../../../sheets/hibernate/persistence-context.md) — the `@Transactional` rules: flush, rollback, the proxy.

Map of the Hibernate sheets: [sheets/hibernate](../../../../../sheets/hibernate/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 05_1 | [The version column](task-05-1-the-version-column/README.md) | todo |
| 05_2 | [The waiting line](task-05-2-the-waiting-line/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`, then run the tests from the main folder of the repo (where the `Makefile` is), with your task's id: `make test-task TASK=05_1 STUDENT=kevin SUBJECT=spring-boot`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

Real Spring Boot needs a database and a running server — too heavy for a first look at one idea. So both tasks are **plain-Java models**: no Spring, no database. The input lines are a script in which two editors, `A` and `B`, take turns, so every run is the same. You build by hand the mechanism the framework does for you — then the real annotations make sense.

### 1. The lost update — the last pencil wins

Picture two clerks and one stock card that says "10". Each has a pencil. A writes 8. B, still looking at his old 10, writes 9. The card now says 9 — A's change is gone, and nobody noticed.

```java
// two requests, one row, no protection yet
var a = repo.findById(1L).orElseThrow(); a.setStock(8); repo.save(a);  // A writes 8
var b = repo.findById(1L).orElseThrow(); b.setStock(9); repo.save(b);  // B writes 9, over A
```

**In task 05_1** you play this by hand: each editor keeps a local copy, and the row takes whoever commits last — silently.

### 2. Optimistic locking — the stamp on the card

Picture a version stamp in the corner of the card. You copy the stamp when you read. At the counter the clerk compares stamps: yours is old, so your form goes back — "reload and retry". Most writes never clash, so this cheap check is the default for web apps.

```java
@Entity
class StockCard {
    @Id Long id;
    int stock;
    @Version long version;   // JPA checks and bumps this on every UPDATE
}
// stale write -> OptimisticLockException, mapped to 409 Conflict
```

**In task 05_1** you build this by hand: `Row.version` stands for the `@Version` column, and the COMMIT check that answers "is stale" stands for the `OptimisticLockException`.

### 3. Pessimistic locking — the card off the shelf

Picture the first clerk taking the card off the shelf. The second clerk must wait in line until it comes back. Stronger than the stamp, but everyone queues — worth it on a hot row where waiting beats failing.

```java
public interface StockRepo extends Repository<StockCard, Long> {
    @Lock(LockModeType.PESSIMISTIC_WRITE)   // SELECT ... FOR UPDATE
    Optional<StockCard> findById(Long id);
}
```

**In task 05_2** you build this by hand: the `holder` variable stands for the transaction holding the row lock, and the FIFO waiting line stands for the database's lock queue.

### 4. `@Transactional` — where a transaction begins and ends

Picture one visit to the counter: everything you hand over goes together, or nothing does. The annotation marks the visit: one service method is one transaction.

```java
@Transactional                      // begins before, commits after the method
public void adjust(Long id, int stock) {
    var card = repo.findById(id).orElseThrow();  // managed on the cart
    card.setStock(stock);            // written at flush, at the end
}   // rollback only when an UNCHECKED exception leaves this method
```

Two traps from the sheet: rollback covers **unchecked** exceptions only, and `this.adjust(...)` called from the same class **skips the proxy** — the annotation does nothing.

**In task 05_2** one editor's LOCK → SET → COMMIT block stands for one `@Transactional` service method: the changes sit on a pending copy and become visible only at commit.

---

## Words to know

| Word | Means |
|------|-------|
| **lost update** | Two writers read the same value; the second save silently overwrites the first |
| **optimistic locking** | No lock while reading; the write checks that nothing changed in between |
| **`@Version`** | The stamp column JPA checks and bumps on every update |
| **`OptimisticLockException`** | Thrown when your version is stale; Spring maps it to 409 |
| **pessimistic locking** | Lock the row while you work; everyone else waits |
| **`SELECT ... FOR UPDATE`** | The SQL that takes a row lock; `@Lock(LockModeType.PESSIMISTIC_WRITE)` asks for it |
| **transaction** | A group of changes that all succeed or all fail together |
| **`@Transactional`** | Marks one method as one transaction; rolls back on unchecked exceptions |
| **proxy** | The wrapper Spring puts around a bean; `this.method()` skips it, so the annotation is lost |
| **stale** | Your copy was read before someone else's newer write |

## Source

Written for Kevin: plain-Java practice for the locking lessons of the course.

Back to [all exercises](../README.md).
