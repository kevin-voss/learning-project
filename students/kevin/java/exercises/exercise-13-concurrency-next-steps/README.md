# Exercise 13 · Concurrency next steps

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java |
| Created | 2026-10-22 |

## The story in one sentence

You know virtual threads. The post office now compares prices at many shops **at once** — and ten clerks add strokes to **one stock board** without losing a single stroke.

## Before you code

Sheets this exercise practices (read the parts you need):

1. [CompletableFuture: a promise with a next step](../../../../../sheets/java/concurrency/completable-futures.md)
2. [Concurrent collections: one map, many hands](../../../../../sheets/java/concurrency/concurrent-collections.md)
3. Refresher: [Virtual threads: many helpers, little weight](../../../../../sheets/java/concurrency/virtual-threads.md)

Maps: [Concurrency](../../../../../sheets/java/concurrency/README.md) · [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 13_1 | [Price check](task-13-1-price-check/README.md) | todo |
| 13_2 | [Stock counter](task-13-2-stock-counter/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. CompletableFuture — a dry cleaner's ticket

Picture a **dry cleaner's ticket**. You hand in the coat and get a ticket. You can say now: "when it is ready, fold it and bag it" — and go. Later you show the ticket and collect.

A `CompletableFuture` is that ticket: it stands for a value that is not there yet, and you can attach next steps to it.

```java
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
    CompletableFuture<Integer> ticket =
        CompletableFuture.supplyAsync(() -> askShop("shop-a"), exec)  // hand in the work
                         .thenApply(cents -> cents - 100);            // when ready: voucher off

    System.out.println(ticket.join());   // wait here, once
}
```

- `supplyAsync(task, executor)` starts the work now and hands back the ticket.
- `thenApply(f)` says: when the value is ready, transform it.
- `join()` waits once at the end.

**In task 13_1** you start one lookup per shop and attach the voucher step with `thenApply`.

### 2. `join` vs `get` — and your order

Picture a fan of tickets, numbered in the order you handed coats in. Shops call back in a random order — you still collect by ticket number.

```java
List<CompletableFuture<Integer>> tickets = new ArrayList<>();   // one slot per shop, input order
for (String shop : shops) {
    tickets.add(CompletableFuture.supplyAsync(() -> askShop(shop), exec));  // all start at once
}
for (CompletableFuture<Integer> ticket : tickets) {
    System.out.println(ticket.join());   // join in list order: your order, every run
}
```

`get()` waits and throws a checked exception, so the method must declare `throws Exception`. `join()` waits too and throws no checked exception. Collect the tickets **first** so all lookups run at the same time; joining in list order keeps your order.

**In task 13_1** the lines print in input order, no matter which shop answers first.

### 3. `ConcurrentHashMap.merge` — one atomic stroke

Picture a **tally board in a busy warehouse**. Ten workers add strokes to the same row. With a plain board, two workers write at once and one stroke is lost. `ConcurrentHashMap` is a board with a lock per row: everyone can write, and no stroke disappears.

```java
var stock = new ConcurrentHashMap<String, Integer>();   // one board, many hands

stock.merge("ink", 5, Integer::sum);    // ONE atomic stroke: read + add + write in a single move
stock.merge("ink", -2, Integer::sum);   // now 3
```

**Atomic** means: one unbreakable move. No other thread can slip in between the reading and the writing.

**In task 13_2** every input line is its own clerk task; each adds its `delta` with one `merge`.

### 4. The lost-update bug — two steps lose strokes

Picture two clerks reading "3" from the same row at the same moment. Both write "4". The truth is 5 — one stroke vanished.

```java
// WRONG with threads: two steps, another thread can slip in between
int now = stock.get("ink");       // clerk A and clerk B both read 3
stock.put("ink", now + 1);        // both write 4 — one update is lost
```

This is a **race condition**: the result depends on thread timing. It loses updates even on a `ConcurrentHashMap` — the map protects each single call, not your two calls together.

**In task 13_2** the sample solution shows this wrong line as a comment, right next to the right one.

---

## Words to know

| Word | Means |
|------|-------|
| **CompletableFuture** | A ticket for a value that comes later; you can attach "when ready, do X" steps |
| **supplyAsync(task, executor)** | Run the task on that executor now; get the ticket back |
| **thenApply(f)** | When the ticket's value is ready, transform it |
| **join** | Wait for the ticket and unwrap the value (no checked exception, unlike `get`) |
| **allOf** | One ticket that is ready when all tickets are |
| **atomic** | One unbreakable move; no other thread can disturb the middle of it |
| **ConcurrentHashMap** | A map built for many threads writing at the same time |
| **merge** | One atomic update: current value + delta (or just delta when the key is new) |
| **race condition** | The result depends on thread timing; two-step get-then-put losing updates is one |

## Source

Written for Kevin: practice for the [concurrency sheets](../../../../../sheets/java/concurrency/README.md).

Back to [all exercises](../README.md).
