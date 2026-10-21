# Project 7: Shared expenses

> [!PICTURE]
> Three friends go on a trip. Sometimes Anna pays for everyone, sometimes Ben pays only for Clara.
> At the end, each friend has a score: plus means "I get money back", minus means "I owe money".
> A few payments bring every score back to zero.

You build the money book for a group. It keeps a **score per person** in a `HashMap`, and it counts money in **cents**.

## What you build

```text
1) Add person  2) Add expense  3) Balances  4) Transfers  5) Quit
> 1
Name: Anna
> 1
Name: Ben
> 1
Name: Clara
> 2
Who paid: Anna
Amount in euros: 60
For whom (names separated by commas, or 'all'): all
> 2
Who paid: Ben
Amount in euros: 15
For whom (names separated by commas, or 'all'): Clara
> 3
Anna         +40.00
Ben           -5.00
Clara        -35.00
> 4
Clara pays Anna 35.00 euros
Ben pays Anna 5.00 euros
> 5
```

(The menu line between the steps is left out here.)

Work it out on paper first. 60 euros for three people is 20 each. Anna paid 60 and her own share is 20, so she gets 40 back. Ben and Clara owe 20 each. Then Ben pays 15 for Clara: Ben goes up to -5, Clara goes down to -35.

| File | Job |
|---|---|
| `Expense.java` | One payment: who paid, cents, for whom. Like `Item` in Project 6. |
| `Ledger.java` | People, expenses, balances (a `HashMap`) and transfers. |
| `Main.java` | The menu. No money math. |

## What you need to know

- [Collections](../../tracks/java/topics/collections/index.html): `HashMap` with `put`, `get`, `containsKey`.
- [How a hash table finds things fast](../../tracks/computer-science/index.html#hash-tables).
- [Operators](../../tracks/java/topics/operators/index.html): `/` and `%` with whole numbers.
- Classes, `ArrayList` and a menu from [Project 6](../06-shopping-list-java/README.md).

Two things are new: a `HashMap` from name to balance, and money stored as whole **cents** in an `int`.

> [!WARN]
> Never keep money in a `double`. Try `System.out.println(0.1 + 0.2);` and you see `0.30000000000000004`.
> Store `10.50` euros as `1050` cents. Whole numbers are always exact.

## Rules

- A plus balance means "gets money back". A minus balance means "owes money". All balances together are always `0`.
- When an amount does not split evenly (10.00 euros for 3 people), the leftover cents stay with the payer.
- A bad expense is refused, and the balances do not change:
  - unknown name: `Unknown person: Dana`
  - amount `0` or `-5`: `Amount must be greater than 0.`
  - amount `abc`: `Amount must be a number.`
  - an empty "for whom": `Name at least one person, or 'all'.`
- Another order of transfers is fine, as long as every balance ends at `0.00`.

## Done when

- [ ] The Anna, Ben and Clara session gives exactly these balances.
- [ ] After the transfers, every balance would be `0.00`.
- [ ] Every bad expense in the rules prints its message. Balances stay the same.
- [ ] 10 euros for all three works, and the balances still add up to `0`.

**Extra:** find the fewest transfers possible for a group of five.

## Files

- [step-by-step.md](step-by-step.md): build it in small steps.
- [starter/](starter/Ledger.java): `Expense` is ready. `Ledger` and `Main` have `TODO` comments.
- [solution/](solution/Ledger.java): one finished answer, with [Main.java](solution/Main.java).

> [!CHECK]
> 1. What are the key and the value in the balance map?
>    <details><summary>Answer</summary>The key is the name (a String). The value is the balance in cents (an Integer).</details>
> 2. `1000 / 3` and `1000 % 3` in Java are what?
>    <details><summary>Answer</summary>333 and 1. Whole-number division drops the rest. <code>%</code> gives the rest.</details>
> 3. Why is 40 euros stored as `4000`?
>    <details><summary>Answer</summary>Cents are whole numbers, and whole numbers are exact. A <code>double</code> can be a tiny bit off.</details>

**Next:** [Project 8: Calendar conflicts](../08-calendar-conflicts/README.md)
