# Exercise 06 · Equals and hashCode

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

Two parcel slips with the same id and weight describe **the same parcel**, even if they are two pieces of paper — and the sorting shelf must notice, or it stores the twin twice.

## Before you code

Deep lesson (read the parts you need): [Classes and objects: `toString`, `equals` and `hashCode`](../../../../../tracks/java/topics/classes-and-objects/index.html) in the Java track.

For the second task, a first look at records: [Records](../../../../../sheets/java/modern/records.md) (exercise 08 goes deeper).

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 06_1 | [Twin parcels](task-06-1-twin-parcels/README.md) | todo |
| 06_2 | [Record shortcut](task-06-2-record-shortcut/README.md) | todo |
| 06_3 | [Boxed twins](task-06-3-boxed-twins/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

---

## What you will learn

### 1. `==` against `equals` — same paper or same content?

Picture two printed copies of one library card. `==` asks "is this the very same piece of paper?" — no. `equals` asks "do they say the same thing?" — yes, if you teach it to look.

```java
Parcel a = new Parcel("p1", 500);
Parcel b = new Parcel("p1", 500);
a == b          // false: two objects
a.equals(b)     // false too, until you override equals!
```

Out of the box, `equals` behaves like `==`. You override it to compare **fields**.

**In task 06_1** you override `equals` so two slips with the same id and weight are equal. **In task 06_3** the same question with boxed numbers: same box (`==`) or same number (`equals`)?

### 2. Writing `equals`

```java
@Override
public boolean equals(Object o) {
    if (this == o) return true;                 // same paper
    if (!(o instanceof Parcel other)) return false;  // other kind of thing
    return weight == other.weight && id.equals(other.id);
}
```

- The parameter is `Object`: anything may be compared.
- `instanceof Parcel other` checks the type **and** gives you a typed variable in one go.
- Compare every field that makes two things "the same".

### 3. `hashCode` — the shelf number

Picture the sorting shelf: each parcel goes to the shelf its number says. A `HashSet` finds a twin only by looking **on the same shelf**. So equal parcels **must** have the same shelf number, or the set never sees the twin.

```java
@Override
public int hashCode() {
    return Objects.hash(id, weight);   // same fields as equals
}
```

The rule: **whoever overrides `equals` overrides `hashCode`**, with the same fields.

**In task 06_1** a `LinkedHashSet<Parcel>` (a `HashSet` that remembers insertion order) drops the twins — but only once both methods are right.

### 4. `toString` — how it prints

`System.out.println(parcel)` prints `Parcel@1b6d3586` unless you override `toString`. One method, and printing reads like a sentence.

```java
@Override
public String toString() { return id + " " + weight + "g"; }
```

### 5. Records — all three for free

A **record** is a class whose fields are its whole identity. Java writes `equals`, `hashCode` and `toString` from the fields for you.

```java
record Parcel(String id, int weight) {}
// new Parcel("p1", 500).equals(new Parcel("p1", 500))  → true
```

**In task 06_2** you solve the same task with a record and delete three methods. Exercise 08 goes further with records.

### 6. Boxed numbers — two lunchboxes with the same number inside

Picture two lunchboxes; each holds a note that says "128". Same content, two boxes. An `int` is the number itself, an `Integer` is the box around it — a **wrapper**. Putting an `int` into its box (or into a collection) is called **autoboxing**.

```java
Integer a = Integer.valueOf(128);
Integer b = Integer.valueOf(128);
a.equals(b)   // true:  same number inside
a == b        // false: two boxes
```

The famous trap:

```java
Integer.valueOf(127) == Integer.valueOf(127)   // true  — the shared shelf
Integer.valueOf(128) == Integer.valueOf(128)   // false — two fresh boxes
```

- Java keeps one **shared shelf of boxes** for the values `-128` to `127`: the **Integer cache**. Both 127s are literally the same box; every 128 is a new box.
- The rule that survives every case: **compare objects with `equals`, never with `==`** — `Integer` and `String` included.

**In task 06_3** you watch the shelf at work: equal numbers always print `equals: true`, and `==` flips between 127 and 128.

---

## Words to know

| Word | Means |
|------|-------|
| **`==`** | Same object in memory |
| **`equals`** | Same content, the way the class defines it |
| **`hashCode`** | A number used to find things fast; equal objects must share it |
| **`Objects.hash(...)`** | Builds a hash from several fields |
| **`instanceof T name`** | Type check that also names the typed value |
| **`LinkedHashSet`** | A `HashSet` that keeps insertion order |
| **record** | A class whose `equals`, `hashCode`, `toString` come from its fields |
| **wrapper** | An object around a plain value: `Integer` is the box around `int` |
| **autoboxing** | Java putting a plain `int` into its `Integer` box by itself |
| **Integer cache** | One shared shelf of boxes for -128..127; `==` is true only there |

## Source

Written for Kevin: practice for the identity lessons of the [Classes and objects](../../../../../tracks/java/topics/classes-and-objects/index.html) topic, with a bridge to [Records](../../../../../sheets/java/modern/records.md).

Back to [all exercises](../README.md).
