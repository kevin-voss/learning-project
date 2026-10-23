# Sample solution · Task 01_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac AnimalShelter.java
java AnimalShelter
```

## How it works, step by step

1. `Animal` is **abstract**: no `new Animal(...)` anywhere. It owns the `name` field and promises `speak()`.
2. `Dog` extends `Animal` and fills `speak()`. `Puppy` extends `Dog` — it inherits "dog-ness" and only **overrides** the sound.
3. `Cat` is a second child, same one-line shape.
4. `create` is the only place that knows the kinds. One small `switch` builds the right child.
5. `main` stores everything in **one** `Animal[]` and prints in one loop. The loop calls `a.speak()` and Java picks the child's version — that is polymorphism.

**Test run**

```text
3
ace dog
bit puppy
mia cat
```

```text
ace says woof
bit says yip yip
mia says meow
```

| Input | Output |
|-------|--------|
| `1` / `rex dog` | `rex says woof` |
| `1` / `mia cat` | `mia says meow` |
| `1` / `bit puppy` | `bit says yip yip` |
| `0` | (nothing) |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `new Animal(...)` | "Animal is abstract; cannot be instantiated" | Create a child (`Dog`, `Puppy`, `Cat`) |
| Child constructor missing `super(name)` | "constructor Animal in class Animal is not applied" | First line of the child constructor: `super(name);` |
| Printing with `if (kind == "dog")` | works, but you learn nothing | Print through `a.speak()`; pick the kind only when building |
| `speak()` in `Animal` left abstract, child forgets it | compile error in the child | Every non-abstract child must implement `speak()` |

Back to [Task 01_1](../README.md).
