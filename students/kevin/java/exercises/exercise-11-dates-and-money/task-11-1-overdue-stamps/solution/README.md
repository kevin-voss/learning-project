# Sample solution · Task 11_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac OverdueStamps.java
java OverdueStamps
```

## How it works, step by step

1. `LocalDate.parse(parts[1])` turns the `yyyy-MM-dd` text into a `LocalDate` — one page of the wall calendar. The program never splits the date itself.
2. `countLateDays` owns the rule: only a return **after** the due day is late (`isAfter`). "Same day" and "earlier" both count as on time, so the method answers `0`.
3. The ruler is `ChronoUnit.DAYS.between(due, returned)`. It counts whole days and handles month ends and the leap day `2024-02-29` by itself.
4. `main` prints one stamp per parcel and adds `20` cents per late day into one `totalFee`. After the loop one last line prints the sum.
5. `totalFee` is a `long` because `DAYS.between` answers in `long` — the two types just fit together.

**Test run**

```text
3
book 2026-05-01 2026-05-01
lamp 2026-05-01 2026-05-04
toy 2026-05-10 2026-05-09
```

```text
book: on time
lamp: late 3 days
toy: on time
total fee: 60 cents
```

| Input | Output |
|-------|--------|
| `1` / `book 2026-10-01 2026-10-01` | `book: on time` and `total fee: 0 cents` |
| `1` / `book 2026-10-01 2026-10-02` | `book: late 1 days` and `total fee: 20 cents` |
| `1` / `card 2025-01-29 2025-02-01` | `card: late 3 days` and `total fee: 60 cents` |
| `1` / `parcel 2024-02-28 2024-03-01` | `parcel: late 2 days` and `total fee: 40 cents` |
| `1` / `gift 2026-10-10 2026-10-01` | `gift: on time` and `total fee: 0 cents` |
| `0` | `total fee: 0 cents` |

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| A variable named `return` | compile error (`return` is a keyword) | Name it `returned` or `returnDay` |
| `between(returned, due)` — wrong order | `late -3 days`, or early parcels count | Earlier date first: `between(due, returned)` |
| Counting without asking `isAfter` | early parcels print `late -9 days` | Only count when `returned.isAfter(due)` |
| Calendar math of your own (month lengths) | wrong across month ends and leap days | Let `DAYS.between` walk the calendar |
| Fee added for on-time parcels too | `total fee` too big | Add the 20 cents only when `lateDays > 0` |

Back to [Task 11_1](../README.md).
