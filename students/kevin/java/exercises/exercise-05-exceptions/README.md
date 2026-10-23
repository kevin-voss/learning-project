# Exercise 05 · Exceptions

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

Bad input reaches the post office counter all day: a letter with no zip code, a coin that is really a bottle cap. The clerk must not faint — refuse the bad piece out loud, then serve the next customer.

## Before you code

Deep lesson (read the parts you need): [Exceptions](../../../../../tracks/java/topics/exceptions/index.html) in the Java track.

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 05_1 | [Safe numbers](task-05-1-safe-numbers/README.md) | todo |
| 05_2 | [Vending machine](task-05-2-vending-machine/README.md) | todo |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish a task (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all tasks.
2. Open the first task and read its `README.md`.
3. Write your code in its `my-solution/` folder. That is your desk.
4. Try every test example from the task's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `solution/`.

```bash
java --version   # want 25 (21 also fine)
```

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished).

---

## What you will learn

### 1. Exception — the fire alarm

Picture the post office hall. Someone shouts "fire!" — every job at that counter stops this second. In Java the shout is an **exception**: the line that caused it stops immediately, and the alarm carries a **message**.

```java
String token = "abc";
int value = Integer.parseInt(token);   // fire alarm: NumberFormatException
System.out.println("read " + value);   // never runs: the line above alarmed
```

`Integer.parseInt("abc")` cannot build a number from letters, so it throws a `NumberFormatException`. Every line after it is skipped.

**In task 05_1** you meet exactly this alarm when a token is not a number.

### 2. try/catch — the fire drill

Picture the drill plan on the wall: the risky room has a door marked `try` and an exit marked `catch`. When the alarm sounds inside the try room, everyone leaves through the catch door. The building lives on.

```java
try {
    int value = Integer.parseInt(token);   // the risky line, inside the door
    System.out.println("ok: " + value);
} catch (NumberFormatException e) {
    System.out.println("bad token: " + token);   // the exit: report, stay calm
}
System.out.println("counter stays open");        // the program lives on
```

The message travels in `e`; `e.getMessage()` reads it out.

**In task 05_1** the catch prints `skip: <token>` and the counting goes on.

### 3. throw — you sound the alarm yourself

Sometimes nothing inside Java fails, but the input is impossible anyway. Then you throw the alarm yourself, with your own message. `IllegalArgumentException` means "this argument makes no sense".

```java
static int price(String slot) {
    if (slot.equals("A1")) return 150;
    throw new IllegalArgumentException("unknown slot " + slot);   // your alarm
}
```

**In task 05_2** your buying method throws `IllegalArgumentException` for every impossible buy, and main catches it.

### 4. Checked and unchecked — who must promise the drill?

Java has two alarm families. **Checked** alarms are so expected that the compiler makes you promise the drill in writing before the program runs: catch them, or write `throws` on the method — reading a file is the classic example, because the file can be gone. **Unchecked** alarms are bugs and bad input: `NumberFormatException`, `IllegalArgumentException`. Nobody forces a promise here; you catch them where you want to keep serving. Both tasks of this exercise live in the unchecked family.

**Note — closing with try-with-resources.** Checked alarms often come from resources you must close again, like an open file. `try (var in = new Scanner(System.in)) { ... }` closes `in` automatically when the block ends, even when an alarm sounds. A `Scanner` on `System.in` needs no closing in our small programs — keep this shape for later.

---

## Words to know

| Word | Means |
|------|-------|
| **exception** | An alarm signal: something went wrong, the current line stops |
| **`throw`** | Sound the alarm yourself: `throw new IllegalArgumentException("message")` |
| **`try` / `catch`** | The drill: risky lines inside `try`; when the alarm sounds, `catch` takes over |
| **message** | The text an exception carries; read it with `e.getMessage()` |
| **`NumberFormatException`** | The built-in alarm of `Integer.parseInt` for text that is not a number |
| **`IllegalArgumentException`** | The alarm for an argument that makes no sense |
| **checked / unchecked** | Checked: the compiler forces a promise (catch or `throws`). Unchecked: bugs and bad input |

## Source

Written for Kevin: practice for the [Exceptions](../../../../../tracks/java/topics/exceptions/index.html) topic of the Java track.

Back to [all exercises](../README.md).
