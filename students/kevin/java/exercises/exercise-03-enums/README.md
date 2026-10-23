# Exercise 03 · Enums

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

A parcel is never "sort of delivered" and a coffee is not "kind of large": the tracker and the post-office café both pick from a **fixed menu** of choices, and an enum is that menu in code.

## Before you code

Deep lesson (read the parts you need): [Enums](../../../../../tracks/java/topics/enums/index.html) in the Java track.

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 03_1 | [Parcel status](task-03-1-parcel-status/README.md) | todo |
| 03_2 | [Coffee sizes](task-03-2-coffee-sizes/README.md) | todo |
| 03_3 | [Signal tower](task-03-3-signal-tower/README.md) | todo |
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

### 1. Enum — a fixed menu of names

Picture a traffic light. It is red, yellow or green. It is never blue, never "a bit red". The menu is fixed, and that is the point.

```java
enum Light {
    RED, YELLOW, GREEN
}

Light now = Light.RED;
System.out.println(now);            // RED
```

- An `enum` is a class with a fixed list of **constants**.
- A variable of type `Light` holds one of them, never anything else.
- `Light.valueOf("RED")` turns a typed word into the constant.

**In task 03_1** you use this to keep a parcel's status as one of four fixed words. **In task 03_3** `Light.valueOf` turns the typed colour into the constant before the switch looks at it.

### 2. Enum in a switch

Picture the pedestrian sign reacting to the light: each colour gets its own action. A switch on an enum reads like that sign.

```java
switch (now) {
    case RED    -> System.out.println("stop");
    case YELLOW -> System.out.println("wait");
    case GREEN  -> System.out.println("go");
}
```

- Each constant gets its own `case`.
- List every constant and you need no `default`.

**In task 03_1** you use this inside the enum's own method to say which status may follow which. **In task 03_3** the arrows come back — handing a value back instead of printing.

### 3. Enum with fields and methods — every cup its own volume

Picture the café shelf: three cups, small, medium, large. Each size carries its own volume and its own price — the numbers travel with the cup.

```java
enum Size {
    S(200), M(300), L(400);         // each constant carries its own ml

    final int ml;

    Size(int ml) { this.ml = ml; }  // runs once per constant
}

System.out.println(Size.M.ml);      // 300
```

- The enum constructor fills the fields of each constant.
- An enum can also have methods: every constant gets them.
- `Size.values()` gives all constants as an array, in the order you wrote them.

**In task 03_2** you use this to give each coffee size its own code, volume and price, and to find the size for a typed code.

### 4. Switch expression — a switch that hands back a value

Picture a vending machine: you press B4 and the machine **hands you the item** — an ordinary switch only lights the lamp on the button. The classic switch runs lines; a switch **expression** hands back a value you can keep.

```java
// now is a Light; cars is how many cars wait
String action = switch (now) {
    case RED    -> "stop";           // arrow case: one answer, no break
    case GREEN  -> "go";
    case YELLOW -> {
        if (cars > 10) {
            yield "clear";           // yield hands the answer back out of the block
        }
        yield "stop";
    }
};   // the whole switch is the value
```

- The switch **is** the value: it lands straight in `action`, in one line.
- Several lines in a case? Wrap them in `{ }` and hand the answer back with `yield`.
- List every constant of the enum and you need no `default` — the compiler knows the menu is complete. Add a colour to `Light` later and it complains until the new colour gets a case. (Java 14+)

**In task 03_3** you use this to let the signal tower answer each colour with its action.

---

## Words to know

| Word | Means |
|------|-------|
| **enum** | A class with a fixed list of constants, nothing else |
| **constant** | One named value of the enum (`RED`, `CREATED`, `S`) |
| **`values()`** | Gives all constants of the enum as an array, in order |
| **`valueOf("S")`** | Turns a String into the enum constant with that name |
| **enum constructor** | Runs once per constant; fills the fields it carries |
| **enum method** | A method written inside the enum; every constant has it |
| **switch expression** | A switch that hands back a value you can store |
| **`->` arrow case** | One answer per constant, no `break` needed |
| **`yield`** | Hands a value back out of an arrow case's `{ }` block |

## Source

Written for Kevin: practice for the [Enums](../../../../../tracks/java/topics/enums/index.html) topic of the Java track.

Back to [all exercises](../README.md).
