# Sample solution · Task 01_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac BeanJar.java
java BeanJar
```

## How it works, step by step

1. `Bean` is a plain object with a name and one extra: the number it got when it was built.
2. `Container` stands for Spring's `ApplicationContext`. It owns the two things that matter: the `singletons` map and **one** `counter` for all creations.
3. `get(scope, name)` stands for `getBean`. For a singleton it looks in the map first: found means hand back the stored bean — same number, nothing built. Not found means build, store, hand out.
4. For a prototype it skips the map: build, number, hand out, forget. The map is the only thing that remembers — that is the whole scope difference.
5. `create` is the only place that touches the counter, so the numbers are the true creation order across both scopes.
6. `main` prints one line per `GET`, then the two summary lines from the container.

**Test run**

```text
4
GET singleton log
GET singleton log
GET prototype job
GET prototype job
```

```text
log -> #1 (singleton)
log -> #1 (singleton)
job -> #2 (prototype)
job -> #3 (prototype)
created: 3
singletons: 1
```

(The second `log` was not built again — no number is missing, it just repeats. The prototype built twice: #2 and #3.)

| Input | Output |
|-------|--------|
| `2` / `GET singleton log`, `GET singleton log` | `log -> #1 (singleton)` twice, `created: 1`, `singletons: 1` |
| `2` / `GET prototype job`, `GET prototype job` | `job -> #1 (prototype)`, `job -> #2 (prototype)`, `created: 2`, `singletons: 0` |
| `2` / `GET singleton log`, `GET singleton db` | `log -> #1 (singleton)`, `db -> #2 (singleton)`, `created: 2`, `singletons: 2` |
| `2` / `GET singleton log`, `GET prototype log` | `log -> #1 (singleton)`, `log -> #2 (prototype)`, `created: 2`, `singletons: 1` |
| `2` / `GET prototype db`, `GET singleton db` | `db -> #1 (prototype)`, `db -> #2 (singleton)`, `created: 2`, `singletons: 1` |
| `0` | `created: 0`, `singletons: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| The counter lives in `main` | works, but `Container` learned nothing | Move it into the container: the context owns the count |
| Prototype stored in the map | `GET prototype job` twice prints the same number | Prototypes never enter the map — build and forget |
| Singleton asked twice builds again | `log -> #1` then `log -> #2` | Check `singletons.get(name)` before creating |
| One counter per scope | numbers repeat across scopes | One counter for all beans: creation order over everything |
| `created:` counts only singletons | `created: 1` in the mixed example (should be 3) | Count every `create` call — prototypes were built too |

Back to [Task 01_1](../README.md).
