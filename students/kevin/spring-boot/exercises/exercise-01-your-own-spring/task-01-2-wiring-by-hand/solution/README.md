# Sample solution · Task 01_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac WiringByHand.java
java WiringByHand
```

## How it works, step by step

1. `Greeter` is the bean interface: the service will only ever see this type, never a concrete class.
2. `FormalGreeter` and `CasualGreeter` are **two beans of the same type**. That is the situation where Spring refuses to guess and asks for a `@Qualifier`.
3. `GreetingService` is the `@Service`. It has no `new` on a greeter anywhere. Its constructor takes a `Greeter` and stores it in a `final` field — the dependency is visible in the signature and set exactly once.
4. `Container.createService(qualifier)` is the `ApplicationContext` plus the `@Qualifier`. The `switch` picks one of the two greeters — the only place in the whole file that calls `new` on a bean.
5. The chosen greeter goes straight into the constructor: that call is the wiring step, the same call Spring makes at startup.
6. `wired()` asks `greeter.getClass().getSimpleName()` — proof of which bean really sits inside, without any hardcoded word.
7. `main` reads the qualifier, wires once, then greets every name and prints the `wired:` line.

**Test run**

```text
formal
2
Ada
Ben
```

```text
Good day, Ada.
Good day, Ben.
wired: GreetingService(FormalGreeter)
```

| Input | Output |
|-------|--------|
| `casual` / `1` / `Ada` | `Hey Ada!` and `wired: GreetingService(CasualGreeter)` |
| `casual` / `2` / `Kim`, `Zed` | `Hey Kim!`, `Hey Zed!`, `wired: GreetingService(CasualGreeter)` |
| `formal` / `0` | only `wired: GreetingService(FormalGreeter)` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `new FormalGreeter()` inside `GreetingService` | works, but nothing was learned | The service receives its greeter; only `createService` calls `new` |
| A hardcoded `"wired: GreetingService(FormalGreeter)"` | the `casual` run prints the wrong bean | Use `greeter.getClass().getSimpleName()` |
| The qualifier read as a number | `NumberFormatException` on `formal` | The first line is a word: read it as text |
| A `public` greeter field set from outside | compiles, but that is field injection's bad cousin | Keep the field `private final`, fill it in the constructor |
| Greeting wordings changed | tests fail on `lines` ("Good day, Ada.") | The dot and the exclamation mark are part of the contract |

Back to [Task 01_2](../README.md).
