# Task 01_2 · Wiring by hand

Part of [Exercise 01 · Your own Spring](../README.md). New ideas you need: **constructor injection**, **`@Service`**, **`@Qualifier`**. They are all explained in the exercise page. Course: [Dependency injection walkthrough](../../../../../../tracks/spring-boot/topics/04-first-spring-api/dependency-injection-walkthrough.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Wire a `GreetingService` by hand, exactly the way Spring wires it at startup.

First line: the style — `formal` or `casual`. This word is the **qualifier**.

Second line: an integer `n` — how many names follow. Then `n` names, one word each.

Your program must have these parts:

```java
interface Greeter { String greet(String name); }
```

- `FormalGreeter` answers `Good day, <name>.`
- `CasualGreeter` answers `Hey <name>!`
- `class GreetingService` with a constructor `GreetingService(Greeter greeter)` and a `String greet(String name)` that delegates to the greeter. The service **never** calls `new` on a greeter.
- `class Container` with `GreetingService createService(String qualifier)` that picks the greeter by the qualifier and passes it into the constructor. This is constructor injection plus `@Qualifier`.

Print one greeting per name, then:

```text
wired: GreetingService(<FormalGreeter|CasualGreeter>)
```

The name inside comes from `getClass().getSimpleName()` of the greeter.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read the qualifier (`formal` or `casual`).
2. Read how many names come next.
3. `createService` picks the greeter for that qualifier — the only place allowed to call `new`.
4. The greeter goes into the `GreetingService` constructor. The service stores it in a `final` field.
5. Print one greeting per name, then `wired:` with the greeter's simple class name.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `formal`, `2`, then `Ada` / `Ben` | `Good day, Ada.`, `Good day, Ben.`, `wired: GreetingService(FormalGreeter)` |
| `casual`, `1`, then `Ada` | `Hey Ada!`, `wired: GreetingService(CasualGreeter)` |
| `formal`, `0` | only `wired: GreetingService(FormalGreeter)` |
| `casual`, `2`, then `Kim` / `Zed` | `Hey Kim!`, `Hey Zed!`, `wired: GreetingService(CasualGreeter)` |

The wordings must be exact — a formal greeting never contains "Hey", a casual one never contains "Good day".

## Little helpers

<details>
<summary>How does createService pick the greeter?</summary>

A small `switch` (or `if`) on the qualifier: `formal` → `FormalGreeter`, `casual` → `CasualGreeter`. That switch **is** the `@Qualifier` — the one place that decides which bean fits.

</details>

<details>
<summary>Why getClass().getSimpleName()?</summary>

It prints `FormalGreeter` without any package noise. It also proves which bean really sits inside the service — you cannot fake it with a hardcoded word.

</details>

<details>
<summary>May the service store the greeter?</summary>

Yes — in a `final` field, set once by the constructor. That is the whole point of constructor injection: the dependency is visible in the signature and can never be half-missing.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `GreetingService` has no `new` on a greeter anywhere; only `createService` builds beans.
- [ ] You can say which line is the constructor injection and which line is the `@Qualifier`.

Back to [Exercise 01](../README.md).
