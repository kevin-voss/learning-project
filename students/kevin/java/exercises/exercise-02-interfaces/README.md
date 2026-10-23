# Exercise 02 · Interfaces

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

The counter takes card, cash and coupons — three very different things that all **promise** one move: "I can pay". And the bird club wants its birds in size order, so each bird **promises** Java how to compare itself.

## Before you code

Deep lesson (read the parts you need): [Interfaces](../../../../../tracks/java/topics/interfaces/index.html) in the Java track — the promise, default methods, built-in interfaces like `Comparable`, and "interface or abstract class?".

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 02_1 | [Payment counter](task-02-1-payment-counter/README.md) | todo |
| 02_2 | [Bird watcher](task-02-2-bird-watcher/README.md) | todo |
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

### 1. Interface — a promise, not a family

Picture a sign on a shop door: "We take cards". The sign does not say what kind of shop it is. Any shop can hang it, as long as it keeps the promise.

```java
interface Payment {
    String name();                 // the promise: every payment has a name
}

class Card implements Payment {
    public String name() { return "card"; }
}
```

- `implements` = "I keep this promise".
- A class **extends one** parent but can **implement many** interfaces.
- Methods you implement from an interface must be `public`.

**In task 02_1** card, cash and coupon all implement one `Payment` interface.

### 2. Default method — a promise with a free sample

Picture the sign also saying "and we print a receipt" with the receipt text already written. Shops can use it as-is or print their own.

```java
interface Payment {
    String name();
    default String receipt(int cents) {
        return "paid " + cents + " cents by " + name();
    }
}
```

A `default` method has a body. Implementing classes get it for free and may override it.

**In task 02_1** the receipt is a default; the coupon overrides it with its own wording.

### 3. Built-in promises: `Comparable`

Picture a race: Java knows how to line things up, but **you** must say who is "smaller". The promise is called `Comparable`.

```java
class Bird implements Comparable<Bird> {
    int wingspan;
    public int compareTo(Bird other) {
        return Integer.compare(this.wingspan, other.wingspan);
    }
}
// Arrays.sort(birds) now works
```

- `compareTo` returns negative, zero or positive: "I come before / same / after".
- The `<Bird>` says "I compare myself with birds". That `<…>` notation is called **generics**; you read more about it in exercise 04.

**In task 02_2** `Arrays.sort` orders your birds because `Bird` keeps the `Comparable` promise.

### 4. Interface or abstract class?

| Use | When |
|-----|------|
| **abstract class** (exercise 01) | things that **are** the same family and share fields (`Animal` has a `name`) |
| **interface** | things that **can do** the same move, whatever family they are (`Payment`, `Comparable`) |

---

## Words to know

| Word | Means |
|------|-------|
| **interface** | A list of method promises without bodies |
| **implements** | A class keeps every promise of the interface |
| **default method** | An interface method with a body; classes may override it |
| **`Comparable<T>`** | The built-in promise "I can compare myself with another T" |
| **`compareTo`** | Returns `<0`, `0` or `>0` for before / same / after |
| **generics** | The `<Type>` in angle brackets: "for this type" |

## Source

Written for Kevin: practice for the [Interfaces](../../../../../tracks/java/topics/interfaces/index.html) topic of the Java track.

Back to [all exercises](../README.md).
