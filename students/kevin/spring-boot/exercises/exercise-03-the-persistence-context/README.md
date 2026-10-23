# Exercise 03 · The persistence context

| | |
|---|---|
| Student | Kevin |
| Subject | Spring Boot |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

You know objects and maps. Now you play the **librarian with a cart**: one copy of every book you touch during one visit, and every scribble lands in the catalogue at closing time — without filling in a form.

## Before you code

Sheets this exercise practices (read the parts you need):

1. [The persistence context: one cart per transaction](../../../../../sheets/hibernate/persistence-context.md)
2. [JPA, entities, and repositories](../../../../../tracks/spring-boot/topics/10-persistence/jpa-and-repositories.md) — course step 10

Map: [Hibernate: what happens to your entities](../../../../../sheets/hibernate/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 03_1 | [Identity map](task-03-1-identity-map/README.md) | todo |
| 03_2 | [The quiet update](task-03-2-the-quiet-update/README.md) | todo |
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

### 1. Entity states — on the cart or taken home

Picture the library. A book you never showed the librarian stays in your bag (**transient**). Books she fetched for you ride on her cart (**managed**). When she locks up, you may take a cart book home — it still exists, but she no longer watches it (**detached**).

```java
Book b = new Book("Emma");                 // transient: Hibernate has never seen it
repo.save(b);                              // managed: on the cart
Book a = repo.findById(1L).orElseThrow();  // managed too: fetched for you
// the @Transactional method ends: the cart is emptied,
// a and b are detached — watched by nobody
```

**In task 03_1 you build this by hand:** your `Map<Integer, Book>` is the cart (the persistence context), and `CLEAR` ends the transaction — the `Book` objects survive, but the session forgets them.

### 2. The identity map — one row, one object

Ask the librarian for Dune twice in one visit: she points at the cart. One copy, not two.

```java
Book first = repo.findById(1L).orElseThrow();
Book second = repo.findById(1L).orElseThrow();
// first == second is true: one row is one Java object per context
// and the database was hit once, not twice
```

**In task 03_1 you build this by hand:** `FIND 1` twice prints the same object number and your load counter stays at `1` — the map lookup stands for the identity map.

### 3. Dirty checking — no update form

Scribble in a book that rides on the cart. At closing time the librarian notices every scribble and copies it into the catalogue. Nobody fills in an "update" form.

```java
@Transactional
void rename(Long id, String newTitle) {
    Book book = repo.findById(id).orElseThrow();  // managed
    book.setTitle(newTitle);                      // that is all — no save()
}                                                 // UPDATE runs at flush
```

**In task 03_2 you build this by hand:** `SET` changes a plain field; only `FLUSH` compares every managed object with the snapshot taken at load time and prints the `UPDATE`.

### 4. Flush vs commit — and why a detached change is ignored

**Flush** = the librarian walks to the catalogue **now** and writes the pending changes. **Commit** = she also closes the doors: flush first, then end the visit. A book you took home (detached) gets no closing-time visit — nobody compares it with anything, so its scribbles are lost.

```java
book.setTitle("Dune Messiah");  // book is managed: the change is only pending
// flush(): the UPDATE is pushed to the database now,
//           the transaction stays open
// commit(): flush, then end the transaction
```

**In task 03_2 you build this by hand:** `FLUSH` prints the pending `UPDATE` lines and refreshes the snapshots; a `DETACH`ed object is off the cart, so flush never compares it.

---

## Words to know

| Word | Means |
|------|-------|
| **persistence context** | The cart: everything Hibernate loaded or saved in one transaction |
| **session** | The object that holds the persistence context |
| **transient** | `new Book()` — Hibernate has never seen the object |
| **managed** | On the cart: Hibernate watches the object and writes its changes at flush |
| **detached** | The transaction ended; the object exists, nobody watches it |
| **identity map** | One row is one Java object per context: `findById(1)` twice is the same object |
| **dirty checking** | At flush, compare every managed object with its snapshot; differences become UPDATEs |
| **snapshot** | The state an entity had when it was loaded |
| **flush** | Push the pending SQL to the database now |
| **commit** | Flush, then end the transaction |
| **`@Transactional`** | "Run this method inside one transaction" — Spring opens it and commits at the end |

## Source

Written for Kevin: plain-Java practice for the [persistence context sheet](../../../../../sheets/hibernate/persistence-context.md) and [JPA and repositories](../../../../../tracks/spring-boot/topics/10-persistence/jpa-and-repositories.md).

Back to [all exercises](../README.md).
