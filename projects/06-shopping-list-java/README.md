# Project 6: Shopping list in Java

> [!PICTURE]
> A shopping list is a notepad. Every line has the same three things: what, how many, and the price.
> In Java, one line is one **object**. The notepad is an **ArrayList** that holds all the lines.

You built a shopping list in the browser in [Project 2](../02-shopping-list-web/README.md). Now you build the same app in Java, in the terminal. Same idea, new language.

## What you build

A menu that stays until you choose Quit:

```text
1) Add  2) Show  3) Remove  4) Total  5) Quit
> 1
Name: Milk
Quantity: 2
Price: 1.5
1) Add  2) Show  3) Remove  4) Total  5) Quit
> 1
Name: Bread
Quantity: 1
Price: 3.2
1) Add  2) Show  3) Remove  4) Total  5) Quit
> 2
1  Milk         2    1.50    3.00
2  Bread        1    3.20    3.20
Total: 6.20
1) Add  2) Show  3) Remove  4) Total  5) Quit
> 3
Position: 1
1) Add  2) Show  3) Remove  4) Total  5) Quit
> 5
```

Three classes, three jobs:

| File | Job |
|---|---|
| `Item.java` | One line: name, quantity, price of one, line total. |
| `ShoppingList.java` | The `ArrayList<Item>`: add, remove, print, total. |
| `Main.java` | The menu and the questions. It keeps no list itself. |

## What you need to know

- [Classes and objects](../../tracks/java/topics/classes-and-objects/index.html): fields, a constructor, `new Item(...)`.
- [Collections](../../tracks/java/topics/collections/index.html): `ArrayList`, `add`, `get`, `remove`, `size`.
- [Exceptions](../../tracks/java/topics/exceptions/index.html): `try` / `catch` for bad numbers.
- `Scanner` from [Project 5](../05-password-generator/README.md).

The new skill: your own class **and** a list of its objects, working together.

## Rules

- Prices show two decimals: `3.00`, not `3.0`.
- Position `1` on screen is index `0` in the list.
- A bad line is refused and nothing changes:
  - empty name: `Name cannot be empty.`
  - quantity `0` or `-3`: `Quantity must be at least 1.`
  - quantity `two`: `Quantity must be a whole number.`
  - price `-1`: `Price cannot be negative.`
  - remove position `9` with two items: `No item at that position.`
- Show on an empty list prints `Total: 0.00`. No crash.

## Done when

- [ ] The Milk and Bread session above works, with the same numbers.
- [ ] Every bad line in the rules prints its message, and the list stays the same.
- [ ] Remove position 1, then Show: only Bread is left, now at position 1.
- [ ] Show on an empty list prints `Total: 0.00`.

**Extra:** ask for a budget once at the start. On Show, print how much is left, or a warning when the total is over.

## Files

- [step-by-step.md](step-by-step.md): build it in small steps.
- [starter/](starter/Main.java): three files with `TODO` comments.
- [solution/](solution/Main.java): one finished answer, with [Item.java](solution/Item.java) and [ShoppingList.java](solution/ShoppingList.java).

> [!CHECK]
> 1. Why are name, quantity and price in one `Item` and not in three lists?
>    <details><summary>Answer</summary>They belong together. With three lists, removing from one and forgetting another mixes up the lines. One object keeps them together.</details>
> 2. The screen says position 2. Which index is that?
>    <details><summary>Answer</summary>Index 1. The list starts at 0, so it is <code>position - 1</code>.</details>
> 3. Why does `Main` not have its own `ArrayList`?
>    <details><summary>Answer</summary>Each class has one job. ShoppingList owns the items and checks them. Main only asks and prints.</details>

**Next:** [Project 7: Shared expenses](../07-shared-expenses/README.md)
