# Shared expenses: step by step

> [!PICTURE]
> A `HashMap` is a row of lockers with name tags. You go to the locker "Anna" and read or change the number inside.

Do one step, run the program, see the result. Then go on.

## Step 1: Get the starter running

1. Copy the three files from `starter/` into your own folder.
2. Run `javac *.java` and `java Main`.
3. Add the person `Anna`. Choose Balances. Then Quit.

You should see: the name `Anna` under the menu. No number yet.

## Step 2: Euros to cents and back

```java
int cents = (int) Math.round(10.5 * 100);           // 1050
int euros = 1050 / 100;                             // 10
int rest = 1050 % 100;                              // 50
String text = euros + "." + String.format("%02d", rest);   // "10.50"
```

1. Finish `toCents` in `Main`. Use `Double.parseDouble` for the text.
2. Finish `euros` in `Ledger`. Use `Math.abs` for the number and put a `-` in front when `cents` is negative.
3. Test it for a moment at the top of `main`:

```java
System.out.println(toCents("10.50") + " " + Ledger.euros(4000) + " " + Ledger.euros(5) + " " + Ledger.euros(-500));
```

You should see: `1050 40.00 0.05 -5.00`. Then delete the test line.

> [!NOTE]
> `%02d` means "a whole number, at least 2 digits, fill with 0". So 5 becomes `05`.

## Step 3: A locker for every person

```java
HashMap<String, Integer> balance = new HashMap<>();
balance.put("Anna", 0);                 // make the locker
int now = balance.get("Anna");          // read it: 0
balance.put("Anna", now + 1500);        // write it: 1500
```

1. In `balances()`, `put` every person with `0`.
2. In `printBalances`, print the name and `Ledger.euros(...)` of the balance. Add `+` for positive numbers.
3. Add Anna, Ben and Clara. Choose Balances.

You should see: three lines, each with `0.00`.

> [!WARN]
> `get` on a name that is not in the map returns `null`. You cannot add a number to `null`. That is why every person gets a `0` first.

## Step 4: "all" or a list of names

`split(",")` cuts a text at every comma. `trim()` removes the spaces around each piece.

```java
String[] parts = "Anna, Ben".split(",");   // ["Anna", " Ben"]
String second = parts[1].trim();           // "Ben"
```

1. Finish `names` in `Main`. `"all"` gives every person. Otherwise split, trim and skip empty pieces.
2. Add Anna and Ben. Then test it for a moment at the top of the `while` loop in `main`:

```java
System.out.println(names("Anna, Ben ,", ledger) + " " + names("all", ledger));
```

You should see: `[Anna, Ben] [Anna, Ben]` above the menu. Then delete the test line.

## Step 5: Count the expenses

For each expense:

- `share` is the cents divided by how many people share it.
- The payer gets `+ share * count`.
- Every person in "for whom" gets `- share`. The payer too, if the payer is in the list.

1. Write this loop in `balances()`.
2. Run the full session from the [README](README.md) and choose Balances.

You should see: `Anna +40.00`, `Ben -5.00`, `Clara -35.00`.

> [!NOTE]
> 10.00 euros for three: `1000 / 3` is `333`. The payer gets `333 * 3 = 999`. The 1 cent left over stays with the payer. So all balances still add up to `0`.

## Step 6: Refuse bad expenses

1. In `addExpense` in `Ledger`, throw an `IllegalArgumentException` for each rule in the README. Use `people.contains(name)` to check a name.
2. In `Main.addExpense`, catch `NumberFormatException` around `toCents` and `IllegalArgumentException` around `ledger.addExpense`.
3. Try every bad line from the README. Then choose Balances.

You should see: one message per bad line. The balances are the same as before.

## Step 7: Who pays whom

Repeat until everyone is at `0`:

1. Find the person with the biggest plus and the person with the biggest minus.
2. The amount is the smaller one of the two: `Math.min(plus, -minus)`.
3. Take it away from the plus person, add it to the minus person, and write a sentence.

Write this in `transfers()`. Use `while (true)` and `break` when the biggest plus is `0`. Then run the full session and choose Transfers.

You should see: `Clara pays Anna 35.00 euros` and `Ben pays Anna 5.00 euros`.

> [!TRY]
> Add one more expense: Anna pays 10 for `all`. Choose Balances.
> You should see: `+46.66`, `-8.33`, `-38.33`. Add them up: `0`. The leftover cent stayed with Anna.

> [!CHECK]
> 1. Why does each transfer bring at least one person to `0`?
>    <details><summary>Answer</summary>The amount is the smaller of the two numbers. So that person lands exactly on 0.</details>
> 2. Why does `transfers()` work on a fresh map from `balances()`?
>    <details><summary>Answer</summary>It changes the numbers while it works. The real expenses stay untouched, so Balances still shows the true scores.</details>

Stuck? Compare with the [solution](solution/Ledger.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
