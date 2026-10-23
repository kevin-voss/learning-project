# Task 01_1 · Bean jar

Part of [Exercise 01 · Your own Spring](../README.md). New ideas you need: **container**, **bean**, **singleton**, **prototype**. They are all explained in the exercise page. Sheet: [Beans and scopes](../../../../../../sheets/spring/beans-and-scopes.md).

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Build a tiny bean container — the heart of every Spring app — and watch what singleton and prototype really do.

First line: an integer `n` — how many requests follow.

Then `n` lines, each: `GET <scope> <name>`. The `scope` is `singleton` or `prototype`. The `name` is one word.

The container keeps its singletons in a `Map<String, Bean>`. A `GET singleton log` hands back the stored bean for `log`, creating it on the first ask. A `GET prototype job` builds a brand-new bean every single time — even for a name it has seen. Every bean ever built takes the next number from **one global counter** starting at `1`: the creation order across all beans.

Print one line per `GET`:

```text
<name> -> #<number> (<scope>)
```

After all lines print:

```text
created: <total beans built>
singletons: <distinct singleton names>
```

The same name asked once as singleton and once as prototype is allowed: the prototype call always builds a new one.

Model it like this:

```java
class Bean { String name; int number; }
class Container {
    Map<String, Bean> singletons;
    int counter;
    Bean get(String scope, String name) { … }
}
```

`Container` stands for Spring's `ApplicationContext`; `get` stands for `getBean`.

Use `public static void main(String[] args)`.

## The task, simply said

1. Read how many requests come next.
2. For each `GET`, ask the container for the bean.
3. Singleton: look in the map first; create and store only on the first ask.
4. Prototype: always build a new one, never store it.
5. Every creation takes the next number from one shared counter.
6. Print `name -> #number (scope)` per request, then `created:` and `singletons:`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `2` then `GET singleton log` / `GET singleton log` | `log -> #1 (singleton)` twice, then `created: 1`, `singletons: 1` |
| `2` then `GET prototype job` / `GET prototype job` | `job -> #1 (prototype)`, `job -> #2 (prototype)`, `created: 2`, `singletons: 0` |
| `4` then `GET singleton log` / `GET singleton log` / `GET prototype job` / `GET prototype job` | `log -> #1 (singleton)`, `log -> #1 (singleton)`, `job -> #2 (prototype)`, `job -> #3 (prototype)`, `created: 3`, `singletons: 1` |
| `2` then `GET singleton log` / `GET singleton db` | `log -> #1 (singleton)`, `db -> #2 (singleton)`, `created: 2`, `singletons: 2` |
| `2` then `GET singleton log` / `GET prototype log` | `log -> #1 (singleton)`, `log -> #2 (prototype)`, `created: 2`, `singletons: 1` |
| `0` | `created: 0` and `singletons: 0` |

## Little helpers

<details>
<summary>Where does the counter live?</summary>

In the container, as one `int` field — not in `main`, and not a fresh local inside `get`. Every bean creation bumps it once, whatever the scope.

</details>

<details>
<summary>What if the same name comes twice as singleton?</summary>

Look in the map first. Found? Hand back the stored bean — same number, nothing new is built. Not found? Build, store, and it takes the next number.

</details>

<details>
<summary>Does a prototype go into the map?</summary>

No. Build it, number it, hand it out, forget it. Only singletons are stored. That is the whole scope difference: the map is the only thing that remembers.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] The container owns the `Map` and the one counter; `get` handles both scopes; nothing counts in `main`.
- [ ] You can say which class stands for the `ApplicationContext` and which method stands for `getBean`.

Next: [Task 01_2](../task-01-2-wiring-by-hand/README.md)
