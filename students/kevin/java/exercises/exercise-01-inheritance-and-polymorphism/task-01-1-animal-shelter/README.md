# Task 01_1 · Animal shelter

Part of [Exercise 01 · Inheritance and polymorphism](../README.md). New ideas you need: **extends**, **abstract**, **@Override**, **polymorphism**. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write the program yourself |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

Write a Java program that reads the animals of a shelter and prints what each one says.

First line: an integer `n` — how many animals follow.

Then `n` lines, each: `name kind`. The `kind` is one of:

| Kind | Says |
|------|------|
| `dog` | `woof` |
| `puppy` | `yip yip` |
| `cat` | `meow` |

Print exactly one line per animal, in input order:

```text
<name> says <sound>
```

Model the animals as an **abstract** class `Animal` with children `Dog`, `Puppy` and `Cat`. A `Puppy` is a `Dog` that speaks differently. Keep all animals in **one** `Animal[]` and print through that array — one loop, no `if` on the kind when printing.

Use `public static void main(String[] args)` so the test runner finds your program.

## The task, simply said

1. Read how many animals come next.
2. For each line, build the right `Animal` child.
3. Put every animal into one `Animal[]`.
4. Loop over that array once and print `name + " says " + speak()`.

## Test examples

Your program is right when it gives exactly these answers.

| You type | The program says |
|----------|------------------|
| `1` then `rex dog` | `rex says woof` |
| `1` then `mia cat` | `mia says meow` |
| `1` then `bit puppy` | `bit says yip yip` |
| `2` then `rex dog` / `mia cat` | `rex says woof` and `mia says meow` |
| `0` | nothing |

## Little helpers

<details>
<summary>Can I make an Animal straight from the line, without if?</summary>

Somewhere you must pick the class — a small `if` (or `switch` on the kind string) in a `create` method is fine. The point: the printing loop does not know the kinds.

</details>

<details>
<summary>Why does new Animal("rex") not compile?</summary>

`Animal` is abstract. Only children can be `new`ed. That is on purpose.

</details>

## Done when

- [ ] Every test example above gives the right answer.
- [ ] `Animal` is abstract; `Puppy` extends `Dog`; the print loop has no `if` on the kind.
- [ ] You can explain your code out loud in your own words.

Next: [Task 01_2](../task-01-2-overtime-pay/README.md)
