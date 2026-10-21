# Project 8: Calendar conflicts

> [!PICTURE]
> Lay your day's meetings on the table as paper strips, one strip per meeting, longer for longer meetings.
> First you sort them from morning to evening. Then you see where strips lie on top of each other (a conflict),
> where they touch or overlap (one busy block), and where the table is empty (free time).

You build a day planner for the terminal. It finds clashing meetings and the free gaps in a day from 08:00 to 20:00.

## What you build

```text
1) Add  2) List  3) Conflicts  4) Busy  5) Free  6) Quit
> 1
Title: Maths
Start (HH:MM): 09:00
End (HH:MM): 10:30
```

Add these four meetings: Maths 09:00–10:30, Piano 10:00–11:00, Lunch 11:00–12:00, Dentist 13:00–14:00. Then:

```text
> 3
09:00-10:30 Maths  overlaps  10:00-11:00 Piano
> 4
09:00-12:00
13:00-14:00
> 5
08:00-09:00
12:00-13:00
14:00-20:00
```

Piano ends at 11:00 and Lunch starts at 11:00. They **touch** but do not overlap, so that is no conflict. They still form one busy block.

| File | Job |
|---|---|
| `Appointment.java` | One meeting: title, start, end (`LocalTime`). Knows if it overlaps another one. |
| `Schedule.java` | The list. Sorts it, and makes the three reports. |
| `Main.java` | The menu and the questions. |

## What you need to know

- [Sorting algorithms](../../tracks/computer-science/index.html#sorting-algorithms): what sorting means, and why it makes later work easy.
- [Big-O](../../tracks/computer-science/index.html#big-o-notation): two loops over a list are O(n²).
- [Collections](../../tracks/java/topics/collections/index.html): `ArrayList`, a copy with `new ArrayList<>(list)`.
- A menu and a class per job from [Project 7](../07-shared-expenses/README.md).

New: sort a list with a **Comparator**, glue overlapping times together (**merge intervals**), and find the gaps. Times are `java.time.LocalTime`.

## Rules

- Times are `HH:MM` with two digits: `09:30`, not `9:30`.
- Bad times are refused and nothing is stored: `24:00`, `10:70`, `noon` print `Not a valid time.`
- An end that is not after the start (`11:00` to `11:00`, or `15:00` to `14:00`) prints `End must be after start.`
- Touching is not overlapping: 10:00–11:00 and 11:00–12:00 is no conflict.
- Each conflicting pair is printed once.
- Free time is only inside 08:00–20:00.

## Done when

- [ ] The four meetings give exactly the three reports above.
- [ ] List shows the meetings sorted by start, even when you typed them in another order.
- [ ] Every bad time in the rules is refused.
- [ ] A meeting from 07:00 to 08:30 makes the free time start at 08:30.

**Extra:** add a menu item "Find a slot": ask for a length in minutes and print the first free window that is long enough.

## Files

- [step-by-step.md](step-by-step.md): build it in small steps.
- [starter/](starter/Schedule.java): `Appointment`, `Schedule` and `Main` with `TODO` comments.
- [solution/](solution/Schedule.java): one finished answer, with [Appointment.java](solution/Appointment.java) and [Main.java](solution/Main.java).

> [!CHECK]
> 1. Why do you sort before you build busy blocks?
>    <details><summary>Answer</summary>After sorting, a meeting can only touch the block right before it. You walk the list once and never look back.</details>
> 2. Why is the overlap check <code>a.start &lt; b.end</code> and not <code>a.start &lt;= b.end</code>?
>    <details><summary>Answer</summary>With <code>&lt;=</code>, a meeting that ends at 11:00 would clash with one that starts at 11:00. They only touch.</details>
> 3. What does a Comparator return for two meetings?
>    <details><summary>Answer</summary>A negative number if the first comes first, a positive number if the second comes first, and 0 if they are equal.</details>

**Next:** [Project 9: Household budget](../09-household-budget/README.md)
