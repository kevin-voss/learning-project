# Calendar conflicts: step by step

> [!PICTURE]
> Paper strips on a table again. Sort them, then slide your finger from left to right. That one finger walk is the whole trick.

Do one step, run the program, see the result. Then go on.

## Step 1: Get the starter running

1. Copy the three files from `starter/` into your own folder.
2. Run `javac *.java` and `java Main`.
3. Add one meeting with any title and any times. Choose List.

You should see: `09:00-10:00` and your title. The starter still ignores the times you type.

## Step 2: Text to time

`LocalTime` is a clock time. Java checks it for you.

```java
LocalTime start = LocalTime.parse("09:30");   // 09:30
LocalTime.parse("25:00");                     // throws DateTimeParseException
start.isBefore(LocalTime.of(10, 0));          // true
```

1. In `addAppointment`, use `LocalTime.parse` for both texts.
2. Wrap it in `try` / `catch (DateTimeParseException e)` and print `Not a valid time. Use HH:MM, like 09:30.`
3. Add `import java.time.format.DateTimeParseException;` at the top.
4. Add a meeting 13:00–14:00. Then try `noon` as a start.

You should see: List shows `13:00-14:00`. `noon` prints the message, and nothing new is stored.

## Step 3: End after start

1. In the `Appointment` constructor, throw `IllegalArgumentException("End must be after start.")` when `!end.isAfter(start)`.
2. In `Main`, catch `IllegalArgumentException` too and print `e.getMessage()`.
3. Try 11:00 to 11:00, and 15:00 to 14:00.

You should see: `End must be after start.` two times.

## Step 4: Sort with a Comparator

A **Comparator** answers one question: "which of these two comes first?"
It returns a negative number (a first), a positive number (b first) or 0 (same).

```java
Comparator<Appointment> byStart = (a, b) -> a.getStart().compareTo(b.getStart());
list.sort(byStart);
```

`(a, b) -> ...` is a tiny method without a name. `sort` calls it again and again with two meetings.

1. Change `BY_START` to the line above.
2. In `sorted()`, call `copy.sort(BY_START)`.
3. Add Dentist 13:00–14:00 first, then Maths 09:00–10:30. Choose List.

You should see: Maths first, then Dentist.

> [!NOTE]
> `sorted()` sorts a **copy**. The original list keeps the order you typed. Changing data that others use is a common source of bugs.

## Step 5: Find conflicts

Two meetings overlap when **each one starts before the other one ends**:

```java
start.isBefore(other.end) && other.start.isBefore(end)
```

1. Finish `overlaps` in `Appointment`.
2. In `conflicts()`, loop `i` over the list and `j` from `i + 1`. Add a line for every pair that overlaps.
3. Add the four meetings from the [README](README.md). Choose Conflicts.

You should see: only `09:00-10:30 Maths  overlaps  10:00-11:00 Piano`.

> [!WARN]
> If Piano and Lunch show up as a conflict, you checked "before or equal". Touching is not overlapping.

## Step 6: Merge into busy blocks

Walk the sorted list once. Keep the last block in your hand.

- The first meeting starts the first block.
- The next meeting starts **after** the last block ends: there is a gap. Start a new block.
- Otherwise it touches or overlaps: make the last block end at the later of the two ends.

```java
Appointment last = blocks.get(blocks.size() - 1);
blocks.set(blocks.size() - 1, new Appointment("busy", last.getStart(), next.getEnd()));
```

1. Write this in `busyBlocks()`.
2. Add the four meetings. Choose Busy.

You should see: `09:00-12:00` and `13:00-14:00`.

## Step 7: Find the free time

A `cursor` is your finger. It starts at 08:00.

1. For every busy block: if it starts after the cursor, the time from the cursor to the block start is free. Then move the cursor to the block end, if that is later.
2. After the loop: if the cursor is before 20:00, the rest of the day is free.
3. Add the four meetings. Choose Free.

You should see: `08:00-09:00`, `12:00-13:00` and `14:00-20:00`.

> [!TRY]
> Add one more meeting, Swim 07:00–08:30. Choose Free.
> You should see: the first free window is now `08:30-09:00`. The time before 08:00 never counts.

> [!CHECK]
> 1. Conflicts uses two loops. With 100 meetings, about how many pairs does it check?
>    <details><summary>Answer</summary>About 100 × 99 / 2, so nearly 5,000. That is O(n²). Busy blocks only walk the sorted list once.</details>
> 2. Why does the inner loop start at <code>i + 1</code>?
>    <details><summary>Answer</summary>So a meeting is never compared with itself, and each pair is printed only once.</details>

Stuck? Compare with the [solution](solution/Schedule.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
