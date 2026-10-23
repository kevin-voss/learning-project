# Sample solution · Task 13_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac StockCounter.java
java StockCounter
```

## How it works, step by step

1. `main` reads `n` and makes **one** shared board: `ConcurrentHashMap<String, Integer> stock`. A concurrent map is a board many threads may write on at the same time.
2. The executor is `Executors.newVirtualThreadPerTaskExecutor()` in a try-with-resources: one clerk (a light virtual thread) per movement line.
3. Every line is submitted as its own task. Inside, `stock.merge(sku, delta, Integer::sum)` is ONE atomic call: read + add + write cannot be interrupted, so no stroke is lost. It adds `delta` to the current value, or just `delta` when the sku is new.
4. Next to the `merge`, the code keeps the **wrong** version as a comment: `stock.put(sku, stock.getOrDefault(sku, 0) + delta)` is two steps. Another clerk can slip between the `get` and the `put`, and its stroke is lost — a race condition. Run that version often and the totals come out short.
5. Leaving the `try` closes the executor; closing waits until every clerk has finished. From here on, nobody writes.
6. `new TreeMap<>(stock)` copies the finished board. A `TreeMap` keeps its keys in alphabetical order.
7. One loop prints `sku: total` for every entry — a total of `0` is printed like any other — and finally `skus:` counts the distinct skus.

**Test run**

```text
4
zebra 1
apple 2
mango 3
apple 1
```

```text
apple: 3
mango: 3
zebra: 1
skus: 3
```

| Input | Output |
|-------|--------|
| `2` / `ink 5`, `paper 3` | `ink: 5`, `paper: 3`, `skus: 2` |
| `12` / nine `ink 1`, three `ink -1` | `ink: 6`, `skus: 1` |
| `3` / `mug -5`, `mug -2`, `mug 4` | `mug: -3`, `skus: 1` |
| `2` / `box 5`, `box -5` | `box: 0`, `skus: 1` |
| `0` | `skus: 0` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| `stock.put(sku, stock.getOrDefault(sku, 0) + delta)` | totals change from run to run — updates get lost | ONE `merge(sku, delta, Integer::sum)` per line |
| A plain `HashMap` shared by the tasks | wrong totals, or a crashed program | `ConcurrentHashMap` |
| Printing from inside the tasks | lines mixed and in random order | Print after the executor closed |
| Sorting the keys while clerks still write | `ConcurrentModificationException` | Copy into a `TreeMap` after `close()` |
| Dropping skus with total `0` | `box 5`, `box -5` prints nothing | Zero stays in the map and is printed |

Back to [Task 13_2](../README.md).
