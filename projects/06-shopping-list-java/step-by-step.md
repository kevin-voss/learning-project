# Shopping list in Java: step by step

> [!PICTURE]
> First you make the cookie cutter (`Item`). Then the cookie tin (`ShoppingList`). Then the shop counter where people ask for things (`Main`).

Do one step, run the program, see the result. Then go on.

## Step 1: Get the starter running

1. Copy the three files from `starter/` into your own folder.
2. Run:

```bash
javac *.java
java Main
```

3. Type `2`, then `5`.

You should see: the menu, `Total: 0.00`, the menu again, and then the program ends.

> [!NOTE]
> On a computer set to German you may see `0,00` with a comma. That is your computer's language setting. It is fine.

## Step 2: The Item class

A class is a cookie cutter. Every `new Item(...)` makes one cookie with its own values.

```java
private final String name;     // a field: each Item has its own name

public Item(String name, int quantity, double unitPrice) {
    this.name = name;           // this.name is the field, name is the parameter
}
```

1. Add the three fields to `Item`.
2. Fill the constructor and the three getters.
3. `lineTotal()` returns `quantity * unitPrice`.
4. Test it for a moment at the top of `main`:

```java
Item test = new Item("Milk", 2, 1.5);
System.out.println(test.lineTotal());
```

You should see: `3.0`. Then delete the two test lines.

## Step 3: Add and show

An `ArrayList` is a list that grows. `ArrayList<Item>` means: a list of `Item` objects only.

```java
items.add(new Item(name, quantity, unitPrice));
Item first = items.get(0);       // the first item
int count = items.size();        // how many items
```

1. In `ShoppingList.add`, add a new `Item` to `items`.
2. In `print`, loop with `for (int i = 0; i < items.size(); i++)`. Print `i + 1` and the values of `items.get(i)`.
3. Use `String.format("%.2f", price)` for two decimals.
4. Run it. Add Milk (2, 1.5) and Bread (1, 3.2). Choose Show.

You should see: two numbered lines, `1  Milk ...` and `2  Bread ...`. The total still says `0.00`.

> [!NOTE]
> `%-10s` in `String.format` means "text, 10 wide, left-aligned". It makes columns line up. Spacing does not have to match the example exactly.

## Step 4: The total

1. In `total()`, add up `item.lineTotal()` for every item. A for-each loop is easy here: `for (Item item : items)`.
2. In `Main`, add `case "4"`. It prints `String.format("Total: %.2f", list.total())`.
3. Run it with Milk and Bread again. Choose Show, then Total.

You should see: `Total: 6.20` both times.

## Step 5: Refuse bad input

Two kinds of trouble:

- The text is not a number. `Integer.parseInt("two")` throws a `NumberFormatException`.
- The number is a bad value, like quantity `0`. Your `add` method throws an `IllegalArgumentException`.

```java
try {
    quantity = Integer.parseInt(quantityText);
} catch (NumberFormatException e) {
    System.out.println("Quantity must be a whole number.");
    return;                      // leave addItem, nothing is stored
}
```

1. In `ShoppingList.add`, check name, quantity and price first. Throw with the messages from the README.
2. In `Main.addItem`, catch the bad numbers. Then catch `IllegalArgumentException` around `list.add` and print `e.getMessage()`.
3. Run it. Try an empty name, quantity `two`, quantity `0` and price `-1`. Then Show.

You should see: one message for each bad line, and the list is the same as before.

> [!WARN]
> Use `nextLine()` and `parseInt`, not `nextInt()`. `nextInt()` leaves the Enter key behind, and the next question looks skipped.

## Step 6: Remove

1. In `ShoppingList.remove`, refuse positions below 1 or above `items.size()`. Then `items.remove(position - 1)`.
2. Finish `removeItem` in `Main` and add `case "3"`.
3. Add Milk and Bread. Remove position `9`, then position `1`. Then Show.

You should see: `No item at that position.`, then a list with only `1  Bread`.

> [!TRY]
> Remove position 1 two times, then Show.
> You should see: `Total: 0.00`. The empty list does not crash.

> [!CHECK]
> 1. After `items.remove(0)`, what happens to the item that was at index 1?
>    <details><summary>Answer</summary>It moves to index 0. Everything after a removed item shifts one place to the left.</details>
> 2. Why does `add` throw an exception instead of printing the message itself?
>    <details><summary>Answer</summary>ShoppingList should not talk to the person. It says "this is wrong". Main decides how to show it.</details>

Stuck? Compare with the [solution](solution/ShoppingList.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
