# Sample solution · Task 05_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac VendingMachine.java
java VendingMachine
```

## How it works, step by step

1. `buy` owns one buying attempt. First the `switch` looks up the price; an unknown slot throws `IllegalArgumentException("unknown slot " + slot)` right there.
2. Then it parses the paid token — the same parse idea as Task 05_1, but here the alarm flies up to the caller.
3. The last two checks (negative, too little) throw with their own messages. When nothing throws, `buy` returns the success line.
4. `main` wraps each line in one `try`. The `NumberFormatException` catch comes first because it is the more specific alarm; it prints the not-a-number error. The `IllegalArgumentException` catch comes second and prints `error: ` + the message.
5. `sales++` stands right after the buy call inside the `try`. When `buy` throws, Java jumps over it to the `catch` — an error never counts as a sale.

**Test run**

```text
6
A1 200
A1 100
B9 500
A3 250
A2 abc
A1 150
```

```text
bought A1, change 50
error: need 50 more cents
error: unknown slot B9
bought A3, change 0
error: paid is not a number
bought A1, change 0
sales: 3
```

| Input | Output |
|-------|--------|
| `1` / `A1 200` | `bought A1, change 50` / `sales: 1` |
| `1` / `A2 200` | `bought A2, change 0` / `sales: 1` |
| `1` / `A1 100` | `error: need 50 more cents` / `sales: 0` |
| `1` / `B9 300` | `error: unknown slot B9` / `sales: 0` |
| `1` / `A3 -5` | `error: paid cannot be negative` / `sales: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `catch (IllegalArgumentException)` above the specific one | `A2 abc` prints `error: For input string: "abc"` | Catch `NumberFormatException` first: it is the special case |
| Checks in the wrong order | `B9 300` prints a price error | Check in order: slot, number, negative, price |
| Printing `error:` inside the buying method | right answers, wrong lesson | The method throws; only `main` catches and prints |
| `sales++` on every line | `sales: 6` after six errors | Count only after a buy that did not throw |
| `catch (Exception e)` for everything | works, but hides which alarm came | Catch the exact types: `NumberFormatException`, then `IllegalArgumentException` |

Back to [Task 05_2](../README.md).
