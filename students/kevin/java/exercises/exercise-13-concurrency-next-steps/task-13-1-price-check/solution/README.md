# Sample solution · Task 13_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac PriceCheck.java
java PriceCheck
```

## How it works, step by step

1. `main` reads `n`, then every `shop cents` line. Two lists grow side by side: `shops` holds the names, `tickets` holds the futures — same index, so ticket `i` belongs to shop `i`.
2. The executor is `Executors.newVirtualThreadPerTaskExecutor()` in a try-with-resources: one light virtual thread per lookup.
3. For every shop, `CompletableFuture.supplyAsync(() -> lookup(cents), executor)` starts the slow lookup **now** and hands back a ticket. `.thenApply(PriceCheck::afterVoucher)` attaches the next step: when the cents arrive, `Math.max(0, cents - 100)` takes the voucher off, never below 0.
4. `lookup` is the slow part: `Thread.sleep(10)` stands for the network call. A virtual thread parks while it waits, so a thousand lookups cost nothing.
5. Only then the main thread joins, **in list order**: `tickets.get(i).join()` waits for shop `i` and unwraps its price. The printout follows the list, not the order in which shops answer — that is why every run prints the same lines.
6. `printCheapest` walks the same list and keeps the smallest price. The comparison is `<`, so on a tie the earlier shop stays the winner. No shops at all → only `cheapest: (none)`.

**Test run**

```text
3
alpha 150
beta 150
gamma 300
```

```text
alpha: 50
beta: 50
gamma: 200
cheapest: alpha
```

(`150 - 100 = 50` twice — a tie, so the first shop wins.)

| Input | Output |
|-------|--------|
| `1` / `shop-a 250` | `shop-a: 150` and `cheapest: shop-a` |
| `1` / `tiny 50` | `tiny: 0` and `cheapest: tiny` |
| `1` / `edge 100` | `edge: 0` and `cheapest: edge` |
| `3` / `dear 500`, `cheap 120`, `mid 200` | `dear: 400`, `cheap: 20`, `mid: 100`, `cheapest: cheap` |
| `0` | `cheapest: (none)` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `System.out.println` inside the lookup | shop lines in a different order every run | Print on the main thread, joining the tickets in list order |
| `cents - 100` without a floor | `tiny 50` prints `-50` | `Math.max(0, cents - 100)` |
| Comparing with `<=` | a tie prints the LAST shop | Compare with `<`; the first shop must win |
| `future.get()` | "unreported exception InterruptedException" | Use `join()` — it throws no checked exception |
| `supplyAsync(...)` without the executor | works, but on the common pool, not your virtual threads | Pass the executor as the second argument |

Back to [Task 13_1](../README.md).
