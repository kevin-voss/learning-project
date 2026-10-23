# Exercise 01 · Inheritance and polymorphism

| | |
|---|---|
| Student | Kevin |
| Subject | Java |
| Language | Java 25 |
| Created | 2026-10-22 |

## The story in one sentence

You know classes and objects. The post office now hires **families** of workers: every animal in the shelter speaks its own word, and every manager is a worker **plus** a bonus — same family, own behaviour.

## Before you code

Deep lesson (read the parts you need): [Classes and objects: inheritance and polymorphism](../../../../../tracks/java/topics/classes-and-objects/index.html) in the Java track.

Map of all Java homes: [sheets/java](../../../../../sheets/java/README.md).

## Tasks

Do them in order: each one is a bit harder than the one before. Every task has its own folder with the task, a desk for your code (`my-solution/`) and the sample solution (`solution/`).

<!-- index:start -->
| Task | Topic | Status |
|------|-------|--------|
| 01_1 | [Animal shelter](task-01-1-animal-shelter/README.md) | todo |
| 01_2 | [Overtime pay](task-01-2-overtime-pay/README.md) | todo |
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

---

## What you will learn

### 1. Inheritance — the family recipe

Picture a cookbook: the cake page is copied into every child book, and each child adds one twist.

```java
class Animal {
    String name;
    Animal(String name) { this.name = name; }
    String speak() { return "..."; }
}

class Dog extends Animal {
    Dog(String name) { super(name); }        // give name to the parent
    @Override String speak() { return "woof"; }
}
```

- `extends` = "is a, plus".
- `super(...)` calls the parent constructor.
- `@Override` = "I am replacing a parent method on purpose".

**In task 01_1** every animal kind is its own small class extending `Animal`.

### 2. Abstract — a shape you cannot hold

An abstract class is a cookie cutter **without** a shape: nobody can `new` it, children must fill the hole.

```java
abstract class Animal {
    abstract String speak();                 // no body: children write it
}
```

**In task 01_1** `Animal` is abstract; each child says its own word.

### 3. Polymorphism — one line, many voices

Picture one feeding line: the keeper calls `speak()` and each animal answers its own way. The keeper does not care which animal it is.

```java
Animal[] crowd = { new Dog("rex"), new Cat("mia") };
for (Animal a : crowd) {
    System.out.println(a.name + " says " + a.speak());  // woof, meow
}
```

**In task 01_1** you keep all animals in one `Animal[]` and print through it.

### 4. `super.method()` — ask the parent first

Picture a manager filling in the worker form first, then adding the manager extra.

```java
class Worker {
    int pay(int hours) { return hours * 20; }
}

class Manager extends Worker {
    @Override int pay(int hours) {
        return super.pay(hours) + 100;       // parent answer, plus bonus
    }
}
```

**In task 01_2** the manager's pay **starts from** the worker's pay via `super.pay(...)`.

---

## Words to know

| Word | Means |
|------|-------|
| **inheritance** | A class gets fields and methods from a parent via `extends` |
| **`super(...)`** | Call the parent constructor |
| **`super.method()`** | Call the parent's version of a method |
| **override** | Replace an inherited method with your own, same signature |
| **abstract class** | A half-written class; only children can be `new`ed |
| **polymorphism** | One variable type (`Animal`), many real behaviours |

## Source

Written for Kevin: first practice after classes and objects, following the [Classes and objects](../../../../../tracks/java/topics/classes-and-objects/index.html) topic of the Java track.

Back to [all exercises](../README.md).
