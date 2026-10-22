# Sample solution · Task 05_2 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac RunningStats.java
```

```bash
java RunningStats
```

## How it works, step by step

1. Two piggy banks start at 0: `count` and `sum`.
2. Read the first number **before** the loop.
3. `while (number >= 0)`: zero and positives count; a negative means stop.
4. Inside: `count + 1`, `sum + number`, average = `(double) sum / count`, print, ask again.
5. The negative number never enters the body, so it is not counted.

**Test run**

```text
Next number: 100
Count: 1
Sum: 100
Average: 100.0
Next number: 200
Count: 2
Sum: 300
Average: 150.0
Next number: 50
Count: 3
Sum: 350
Average: 116.66666666666667
Next number: 300
Count: 4
Sum: 650
Average: 162.5
Next number: -1
```

```text
Next number: -1
```

(Nothing else — the loop body never ran.)

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Count the negative too | Count is one too high | Check `>= 0` before adding |
| `sum / count` as ints | Average 116 instead of 116.66… | `(double) sum / count` |
| No new read inside the loop | Endless loop | Ask again at the end of the body |
| `while (true)` + `break` only | Works, but harder to read | A clear `while (number >= 0)` is enough |

Back to [Task 05_2](../README.md).
