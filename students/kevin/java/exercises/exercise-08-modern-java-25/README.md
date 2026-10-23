# Exercise 08 · Modern Java 25

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

You already know how to program. Now the post office upgrades to **modern Java 25**: small data boxes (**records**), a closed menu of event shapes (**sealed** types + **pattern matching**), a thousand light helpers (**virtual threads**) that stamp parcels without each needing a heavy desk, and lists that finally know their **first and last** stop.

## Before you code

Read these short sheets (picture → idea → tiny example). They are the home for each idea:

1. [Records](../../../../../sheets/java/modern/records.md)
2. [Sealed types and pattern matching](../../../../../sheets/java/modern/sealed-patterns.md)
3. [Virtual threads](../../../../../sheets/java/concurrency/virtual-threads.md)
4. [Sequenced collections](../../../../../sheets/java/modern/sequenced-collections.md)

Read-only extras, no task: [Compact main](../../../../../sheets/java/modern/compact-main.md) (the short `main` of Java 25) and [Structured concurrency](../../../../../sheets/java/concurrency/structured-concurrency.md) (preview).

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 08_1 | [Parcel events](task-08-1-parcel-events/README.md) | todo |
| 08_2 | [Busy post office](task-08-2-busy-post-office/README.md) | todo |
| 08_3 | [First and last](task-08-3-first-and-last/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

Check Java first:

```bash
java --version
javac --version
```

You want **25** (or at least 21). In Cursor: `/next` → `/stuck` → `/test` → `/check` → `/done`.

---

## What you will learn

### 1. Record — a library card

Picture a library card: fixed fields, no surprise extras.

```java
record Created(String id) {}
var e = new Created("mail-1");
System.out.println(e.id());   // mail-1
```

**In task 08_1** you use records for each parcel event shape.

### 2. Sealed type — a closed stamp menu

Only the stamps on the menu exist. The compiler knows the full list.

```java
sealed interface Event permits Created, Shipped, Delivered {}
```

**In task 08_1** your event type is sealed so the `switch` can stay complete.

### 3. Pattern matching switch — unpack the stamp

One `case` matches the shape and names the fields.

```java
return switch (e) {
  case Created(String id) -> "new parcel " + id;
  case Shipped(String id, String vehicle) -> id + " left on " + vehicle;
  case Delivered(String id) -> id + " arrived";
};
```

**In task 08_1** you turn each event into one clear line of text this way.

### 4. Virtual thread — a paper-slip helper

Thousands of light helpers, few heavy desks.

```java
try (var exec = Executors.newVirtualThreadPerTaskExecutor()) {
  var future = exec.submit(() -> 42);
  System.out.println(future.get());
}
```

**In task 08_2** each parcel gets its own virtual thread; you join them and print a stable summary.

### 5. Sequenced collections — the ends of the queue

Picture a bakery queue: you can talk to the first and the last person without counting heads.

```java
var stops = new ArrayList<>(List.of("depot", "market", "harbour"));
stops.getFirst();      // depot
stops.getLast();       // harbour
stops.reversed();      // harbour, market, depot (a view, no copy)
```

**In task 08_3** you report the first and last stop and the reversed round with these three calls.

---

## Words to know

| Word | Means |
|------|-------|
| **record** | Short data class: components, `equals`, `toString` for free |
| **sealed** | Parent type that lists every allowed child with `permits` |
| **pattern matching** | `case Type(fields) ->` unpacks the value in the `switch` |
| **virtual thread** | Light thread for many waiting tasks |
| **sequenced collection** | Any ordered collection: `getFirst`, `getLast`, `reversed` (Java 21) |
| **Java 25** | Current JDK on this path; class file version 69 |

## Source

Teacher sheet for Kevin: *Modern Java 25 — post office upgrade* (records, sealed patterns, virtual threads, sequenced collections). Practice linked from [sheets/java](../../../../../sheets/java/README.md).

Back to [all exercises](../README.md).
