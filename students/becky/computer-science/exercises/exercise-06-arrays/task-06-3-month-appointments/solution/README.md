# Sample solution · Task 06_3 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac MonthAppointments.java
```

```bash
java MonthAppointments
```

## How it works, step by step

**Part a — the grid**

1. `String[][] calendar = new String[32][24]` — index **0** for days is unused; days **1…31** and hours **0…23** match what the user types.
2. Nested loops over every day and hour.
3. Hours **7…22** get `" "` (one space). All other hours get `"Sleeping"`. That matches the sheet (7–22 awake slots, rest sleep).

**Part b — the menu**

1. A `while (true)` loop prints the action prompt until **Q**.
2. **E:** read day and hour with `nextInt()`, swallow the newline, read the appointment line with `nextLine()`, then store in `calendar[day][hour]` if day and hour are in range.
3. **A:** read day; if valid, loop hour 0…23 and print `Hour H: ` + cell text.
4. **Q:** `break` out of the loop.
5. Anything else → `Unknown action.`

**Test run (abbreviated)**

```text
Action (E=enter, A=show day, Q=quit): E
Day: 5
Hour: 10
Appointment: Exam
Action (E=enter, A=show day, Q=quit): A
Day: 5
Hour 0: Sleeping
...
Hour 10: Exam
...
Hour 23: Sleeping
Action (E=enter, A=show day, Q=quit): Q
```

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| Skip `nextLine()` after `nextInt()` | Appointment text empty | Read and discard one line before `nextLine()` for text |
| Day 1 stored at `[0][h]` but checks use 1…31 | Wrong cell updated | Use the same indexing in init, **E**, and **A** |
| Hour 7 shows `Sleeping` | Wrong init bounds | 7…22 inclusive means `hour >= 7 && hour <= 22` |
| Menu never ends | Forgot **Q** | `break` when action is Q |

Back to [Task 06_3](../README.md).
