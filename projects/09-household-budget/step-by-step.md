# Household budget: step by step

> [!PICTURE]
> A test is a little robot that checks one thing for you, every time you ask, in less than a second.
> In this project the robots are there before the code. You write code until the robots are happy.

Do one step, run the command, see the result. Then go on.

## Step 1: Meet Maven

1. Copy the whole `starter/` folder to your own place, for example `my-budget/`.
2. In the terminal, go into that folder. `ls` shows `pom.xml` and `src`.
3. Run:

```bash
mvn compile
```

You should see: `BUILD SUCCESS`. The first time, Maven downloads things. That can take a minute.

> [!NOTE]
> Maven expects a fixed layout. Program code lives in `src/main/java`, tests in `src/test/java`.
> The folder `budget` matches `package budget;` at the top of each file. Maven puts the compiled classes in `target/`.

## Step 2: Run the tests (they fail)

```bash
mvn test
```

You should see: `Tests run: 3, Failures: 1, Errors: 2` and `BUILD FAILURE`.

That is the plan. Open `src/test/java/budget/BookingTest.java` and read it. Each `@Test` method sets something up and then checks it with `assertEquals(expected, actual)`.

## Step 3: A booking to text and back

A CSV line is one booking with `;` between the fields.

```java
String[] fields = "2026-10-03;expense;food;pizza;1850".split(";", -1);
LocalDate date = LocalDate.parse(fields[0]);    // 2026-10-03
int cents = Integer.parseInt(fields[4]);        // 1850
```

The `-1` keeps empty fields. Without it, an empty description at the end would vanish.

1. Write `toCsvLine()` in `Booking`. Join the five fields with `";"`.
2. Write `parse(String line)`. Refuse a line that does not have exactly 5 fields.
3. `LocalDate.parse` throws a `DateTimeParseException` for `03-10-2026`. Catch it and throw `new IllegalArgumentException("Date must be YYYY-MM-DD.")` instead. `Integer.parseInt` already throws a kind of `IllegalArgumentException`.
4. Run `mvn test`.

You should see: the two `BookingTest` tests pass. One test still fails.

## Step 4: Save to a file

A `Path` is the address of a file. `Files.newBufferedWriter(path)` opens it for writing.

```java
try (BufferedWriter writer = Files.newBufferedWriter(file)) {
    writer.write("first line");
    writer.newLine();
}   // here the writer is closed, even if something went wrong
```

The round brackets after `try` are **try-with-resources**: Java closes the file for you.

1. Write `save()`: the `HEADER`, then one `toCsvLine()` per booking, each followed by `newLine()`.
2. Run the program from your project folder:

```bash
mvn -q compile exec:java
```

3. Add the pizza booking. Quit with `6`.
4. Run `cat household.csv`.

You should see: the header line and `2026-10-03;expense;food;pizza;1850`.

## Step 5: Load the file

```java
try (BufferedReader reader = Files.newBufferedReader(file)) {
    String line;
    while ((line = reader.readLine()) != null) {
        // use line
    }
}
```

`readLine()` gives the next line, or `null` at the end of the file.

1. Write `load()`. If `Files.exists(file)` is false, return the empty list at once.
2. Count the lines. Skip line 1 and blank lines. `Booking.parse` every other line.
3. Put the parse in its own `try` / `catch (IllegalArgumentException e)`. A broken line adds a "Skipping line ..." message and the loop goes on.
4. Run `mvn test`.

You should see: `Tests run: 3, Failures: 0, Errors: 0` and `BUILD SUCCESS`.

> [!WARN]
> Do not let one broken line stop the whole load. Catch inside the loop, not around it. Otherwise all the good lines after it are lost.

## Step 6: The reports

1. `balance`: add income, subtract expenses.
2. `inMonth`: keep bookings where `YearMonth.from(booking.getDate())` equals the month.
3. `expensesByCategory`: for each expense, add its cents to its category. `getOrDefault(category, 0)` gives 0 the first time.
4. Run the program and add the three bookings from the [README](README.md). Choose Balance, Month `2026-10`, and By category.

You should see: `Balance: 2469.00`, then the October list with `Balance: 2481.50`, then `food  31.00`.

## Step 7: Write your own tests

Add tests to `BudgetBookTest.java`. Copy the shape of the test that is there.

1. A test that the balance of the three bookings is `246900` cents.
2. A test that a file with the line `this;is;broken` loads the good lines and returns one "Skipping" message. `Files.writeString(file, "...")` writes a test file in one line.
3. Run `mvn test`.

You should see: `Tests run: 5` (or more), all green.

> [!TRY]
> Quit the program. Open `household.csv` in your editor and change one booking line to `this;is;broken`. Start the program again.
> You should see: `Skipping line 3: this;is;broken ...`, and List still shows the other bookings.

> [!CHECK]
> 1. Where does Maven look for your tests?
>    <details><summary>Answer</summary>In <code>src/test/java</code>. Test classes there are run by <code>mvn test</code>, and they never end up in the finished program.</details>
> 2. Why does the file exist only after the first quit?
>    <details><summary>Answer</summary>save() runs at quit. On the very first start there is no file yet, so load() returns an empty book.</details>

Stuck? Compare with the [solution's BudgetBook](solution/src/main/java/budget/BudgetBook.java) and its [tests](solution/src/test/java/budget/BudgetBookTest.java).

**Next:** back to the [project page](README.md) and tick the "Done when" list.
