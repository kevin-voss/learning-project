# Project 9: Household budget

> [!PICTURE]
> A notebook in a drawer. You write every payment into it, close it, and put it away.
> Tomorrow you open the drawer and every line is still there.
> Until now your programs forgot everything when they stopped. This one writes its notebook into a **file**.

You build a money book for a household. It saves to a CSV file when you quit, loads it again on the next start, and has **JUnit tests** that prove the important parts work.

## What you build

```text
1) Add  2) List  3) Balance  4) Month  5) By category  6) Quit
> 1
Date (YYYY-MM-DD): 2026-10-03
Kind (income/expense): expense
Category: food
Description: pizza
Amount in euros: 18.50
```

Add three bookings: groceries 12.50 (expense, food, 2026-09-02), pizza 18.50 (expense, food, 2026-10-03) and salary 2500 (income, salary, 2026-10-04). Then:

```text
> 3
Balance: 2469.00
> 4
Month (YYYY-MM): 2026-10
2026-10-03  expense  food       pizza             18.50
2026-10-04  income   salary     october         2500.00
Balance: 2481.50
> 5
food            31.00
> 6
Saved to household.csv
```

Start it again and choose List: all three bookings are back. The file looks like this:

```text
date;kind;category;description;cents
2026-09-02;expense;food;groceries;1250
2026-10-03;expense;food;pizza;1850
2026-10-04;income;salary;october;250000
```

This is a **Maven** project:

```text
pom.xml                         the recipe: Java 21, JUnit
src/main/java/budget/
  Booking.java                  one booking, toCsvLine() and parse()
  BudgetBook.java               the list, load, save, reports. Only this class knows the file.
  Main.java                     the menu (ready in the starter)
src/test/java/budget/
  BookingTest.java              tests for Booking
  BudgetBookTest.java           tests for BudgetBook
```

## What you need to know

- [Build tools: Maven](../../tracks/java/topics/build-tools/index.html): `pom.xml`, `mvn compile`, `mvn test`.
- [Testing with JUnit](../../tracks/java/topics/testing/index.html): `@Test`, `assertEquals`.
- [Reading and writing files](../../tracks/java/topics/io-basics/index.html): `Path`, `Files`, try-with-resources.
- [Exceptions](../../tracks/java/topics/exceptions/index.html): `throw`, `try`, `catch`.
- Money in cents from [Project 7](../07-shared-expenses/README.md).

New: the Maven folder layout, a CSV file that survives quitting, and tests that run with one command.

## Rules

- Money is stored in cents. The file uses `;` between fields, so a description may contain a comma.
- The first line of the file is a header. It is written on save and skipped on load.
- No file yet (the very first start) means an empty book. No crash.
- Bad input is refused, and the menu comes back: a date like `03-10-2026`, a kind like `gift`, an amount `-8`, an empty category.
- A broken line in the file is skipped with a message like `Skipping line 3: this;is;broken`. The good lines still load.
- "By category" counts expenses only. Salary is not food.

## Done when

- [ ] `mvn test` in the starter first shows 3 failing tests. After your work, all pass.
- [ ] The three bookings give the balances above.
- [ ] Quit, start again, List: the same three bookings.
- [ ] Change one line in `household.csv` to `this;is;broken`. Start again: one "Skipping line" message, the other bookings are there.
- [ ] You wrote at least two tests of your own (for example: the balance, or a broken line).

**Extra:** a menu item "Top 3" that prints the three biggest expenses. Sort a **copy** of the list with a Comparator, like in [Project 8](../08-calendar-conflicts/README.md).

## Files

- [step-by-step.md](step-by-step.md): build it in small steps.
- [starter/pom.xml](starter/pom.xml): the Maven project with `TODO` comments in `Booking.java` and `BudgetBook.java`, and 3 tests that fail until you are done.
- [solution/pom.xml](solution/pom.xml): one finished answer with 9 tests.

> [!CHECK]
> 1. Which class knows the name `household.csv`, and why only one?
>    <details><summary>Answer</summary>Main gives the path to BudgetBook, and only BudgetBook opens the file. If the file format changes, you change one class.</details>
> 2. What does try-with-resources close, and when?
>    <details><summary>Answer</summary>The reader or writer in the round brackets. It is closed when the block ends, also when an exception is thrown inside.</details>
> 3. Why do the tests use a <code>@TempDir</code> folder?
>    <details><summary>Answer</summary>Each test gets a fresh, empty folder. Tests never overwrite your real household.csv, and they do not depend on each other.</details>

**Next:** [Project 10: Java weather CLI](../10-java-weather-cli/README.md)
