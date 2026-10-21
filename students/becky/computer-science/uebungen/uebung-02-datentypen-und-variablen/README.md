# Übung 02 · Datentypen und Variablen (Data types and variables)

| | |
|---|---|
| Student | Becky |
| Fach | Computer Science · Programmieren 1 (Hochschule Hannover) |
| Sprache | Java |
| Erstellt | 2026-10-21 |

## The story in one sentence

Your programs get **labelled boxes** to keep things in, like moving boxes with "Books" or "Kitchen" written on them, and you learn that every box has a **shape**: some hold whole numbers, some hold text, some only "yes" or "no", and even the biggest box has a limit.

You will build three little programs:

1. A **name tag** that prints a person's data, each line with a label.
2. A **record hunter** that prints the smallest and the biggest number Java's `long` box can hold.
3. A **calculator test** that adds a giant number and a super tiny one, and catches the computer rounding.

## What you already know (from Übung 01)

- A program is a `class` with a `main`, translated with `javac` and run with `java`.
- `System.out.println("…")` prints a line. Text sits in `"double quotes"`.
- Error messages tell you file, line and what is wrong.

New in this Übung: the boxes (variables), their shapes (data types), and how numbers are written (literals). See [Übung 01](../uebung-01-erste-programme/README.md) if anything above feels shaky.

## Aufgaben

Do them in order: each one is a bit harder than the one before. Every Aufgabe has its own folder with the task, a desk for your code (`meine-loesung/`) and the Musterlösung.

<!-- index:start -->
| Aufgabe | Thema | Status |
|---------|-------|--------|
| 02_1 | [Persönliche Daten](aufgabe-02-1-persoenliche-daten/README.md) | done |
| 02_2 | [Grenzen von long](aufgabe-02-2-grenzen-von-long/README.md) | done |
| 02_3 | [Summe mit Exponenten](aufgabe-02-3-summe-mit-exponenten/README.md) | in progress |
<!-- index:end -->

Status words: `todo` → `in progress` → `done`. Change them here when you finish an Aufgabe (or let `/done` do it).

## How to work

1. Read this page to the end: it explains every new idea once, for all Aufgaben.
2. Open the first Aufgabe and read its `README.md`.
3. Write your code in its `meine-loesung/` folder. That is your desk.
4. Try every test example from the Aufgabe's `README.md`.
5. Only when you are done (or really stuck for a long time): look at `musterloesung/`.

In Cursor you can ask for help at any time, without getting the answer: `/next` (where am I?), `/stuck` (stuck, red text or a new word), `/check` (is it right?), `/done` (finished). See [students/README.md](../../../../README.md#cursor-commands-for-students).

---

## What you will learn

### 1. A variable is a labelled box

When you move house, you write on each box what is inside: "Books", "Kitchen". Later you just say "bring me the Books box".

A **variable** is such a box in the computer. It has a **shape** (the type), a **label** (the name) and **something inside** (the value).

```java
int semester = 1;
//  ^type ^name   ^value
```

- **Declare** (deklarieren) = make the box: `int semester;`
- **Initialise** (initialisieren) = put the first thing in: `semester = 1;`
- Usually both in one line, like above.

Later you just use the label, and Java takes out what is inside:

```java
System.out.println(semester);   // prints 1
```

**In the task:** in Aufgabe 02_1 every piece of data (first name, birth year, …) gets its own box.

Longer version: [Types and variables](../../../../../tracks/java/topics/types-and-variables/index.html).

### 2. Every box has a shape: the data types

A shoe box does not fit a bicycle, and a bottle is no good for sand. Java boxes have shapes too. Java has **8 basic shapes** (the "primitive types"), plus `String` for text:

| Type | Holds | Example value | Size |
|------|-------|---------------|------|
| `byte` | a very small whole number | `100` | −128 … 127 |
| `short` | a small whole number | `30000` | −32 768 … 32 767 |
| `int` | a whole number (**the normal one**) | `1934` | about ±2.1 billion |
| `long` | a **huge** whole number | `8000000000L` | about ±9.2 · 10¹⁸ (19 digits) |
| `float` | a number with a dot, rough | `3.8f` | about 7 digits exact |
| `double` | a number with a dot (**the normal one**) | `3.8` | about 15–16 digits exact |
| `char` | **one** character | `'m'` | one letter, digit or sign |
| `boolean` | yes or no | `true` | only `true` or `false` |
| `String` | text, any length | `"Duck"` | not a primitive, but used all the time |

For now you mostly need: `int`, `long`, `double`, `char`, `boolean`, `String`.

**In the task:** 02_1 uses five of them, 02_2 uses `long`, 02_3 uses `double`.

### 3. Choosing the right box

Ask one question about the data, and the box follows:

| Question | Box | Example |
|----------|-----|---------|
| Is it text? | `String`, in `"double quotes"` | `String lastName = "Duck";` |
| Is it one single letter? | `char`, in `'single quotes'` | `char gender = 'm';` |
| Is it a whole number you count? | `int` | `int semester = 1;` |
| Does it have a dot (money, weight)? | `double` | `double price = 3.8;` |
| Is it only yes or no? | `boolean`, no quotes | `boolean firstDegree = true;` |

⚠️ `"m"` (double quotes) is a **String** with one letter in it. `'m'` (single quotes) is a **char**. Java does not mix them: `char gender = "m";` is an error.

⚠️ Java speaks English numbers: `3.8`, never `3,8`.

**In the task:** 02_1 is exactly this table: pick the right box for each line of the sheet.

### 4. Good names: camelCase

Box labels have rules:

- Start with a **small** letter. No spaces, no `-`, not starting with a digit.
- Several words? Glue them, and every new word starts with a **capital**: `birthYear`, `lastMealPrice`, `firstDegree`. That looks like the humps of a camel, so it is called **camelCase**.
- Say what is inside. `birthYear` is good; `x` or `zahl1` tells nobody anything.
- Big and small letters count: `birthYear` and `birthyear` are two **different** boxes.

```java
int birthYear = 1934;      // good
int Geburtsjahr = 1934;    // works, but starts with a capital: not the Java habit
int birth year = 1934;     // error: no spaces
```

**In the task:** the sheet says "Namenskonventionen beachten": that means camelCase and clear names.

### 5. Literals: how a value is written down

A **literal** is a value written directly in the code. Each box shape has its own way of writing:

| You write | Java reads it as |
|-----------|------------------|
| `1934` | `int` |
| `1934L` | `long` (the `L` says so) |
| `3.8` | `double` |
| `2.34e6` | `double`, in e-notation (see idea 8) |
| `'m'` | `char` |
| `"Duck"` | `String` |
| `true` / `false` | `boolean` |

Long numbers are hard to read. Java lets you put **underscores** in, like the dots in "1.000.000" in German:

```java
long population = 8_000_000_000L;   // Java ignores the _
```

**In the task:** 02_2 asks for the limits of `long` "als Literal": the digits written out in the code.

### 6. Gluing text and values with `+`

Think of a name tag: the printed word "Name:" and then your name written in by hand. In Java, `+` glues a text and a value together:

```java
String lastName = "Duck";
System.out.println("Nachname: " + lastName);   // Nachname: Duck
```

Mind the space after the colon: it belongs **inside** the quotes, or the words stick together (`Nachname:Duck`).

⚠️ Once Java has started gluing text, a `+` keeps gluing:

```java
int semester = 1;
System.out.println("Semester: " + semester + 1);     // Semester: 11  (glued!)
System.out.println("Semester: " + (semester + 1));   // Semester: 2   (brackets: calculate first)
```

**In the task:** 02_1 prints every box with a label in front.

More on text and gluing: [Strings](../../../../../tracks/java/topics/strings/index.html).

### 7. Every box has a limit: `int` and `long`

Think of the mileage counter in an old car: it has a fixed number of little wheels. With 6 wheels it can show up to 999 999 km. One more km, and it jumps back to 000 000.

Java's number boxes work the same way. They have a fixed number of **bits** (little on/off wheels):

| Type | Bits | Smallest | Biggest |
|------|------|----------|---------|
| `int` | 32 | −2 147 483 648 | 2 147 483 647 |
| `long` | 64 | −9 223 372 036 854 775 808 | 9 223 372 036 854 775 807 |

Why is the minus side **one bigger**? Because zero sits on the plus side: 0 to 2 147 483 647 are exactly as many numbers as −1 to −2 147 483 648.

A plain number like `9223372036854775807` is read as an `int`, and it is far too big for an `int` box: Java says `Ganzzahl zu groß` (integer number too large). The `L` at the end says "this is a long":

```java
long biggest = 9_223_372_036_854_775_807L;
```

And if you go over the top? It wraps around, like the car counter (called **overflow**):

```java
System.out.println(biggest + 1);   // -9223372036854775808
```

Java has the limits ready-made too: `Long.MIN_VALUE`, `Long.MAX_VALUE` (and `Integer.MIN_VALUE`, `Integer.MAX_VALUE`).

`long` (small l) is the plain box. `Long` (capital L) is a different thing: a "wrapper", a box packed inside an object. It works in many places, but for now always use the small one: `long`, `int`, `double`.

**In the task:** 02_2 prints both limits of `long`.

How bits make numbers: [Number bases](../../../../../tracks/computer-science/index.html#number-bases) and [Binary encoding](../../../../../tracks/computer-science/index.html#binary-encoding).

### 8. e-notation: moving the dot

Scientists hate writing zeros. So they write `2.34 · 10⁶` instead of `2 340 000`. Java writes the same thing as `2.34e6`. The number after `e` says how many places the dot **moves**:

| Java | Means | Move the dot |
|------|-------|--------------|
| `2.34e6` | 2.34 · 10⁶ = 2 340 000 | 6 places to the right |
| `3.45` | 3.45 | not at all |
| `4.56e-6` | 4.56 · 10⁻⁶ = 0.00000456 | 6 places to the left |
| `5.67e-12` | 5.67 · 10⁻¹² = 0.00000000000567 | 12 places to the left |

⚠️ `2.34 * 10^6` is **not** the same in Java: `^` is not "to the power of" there, and you get an error. Use `e`.

**In the task:** 02_3 writes all four numbers this way.

### 9. A `double` has only about 16 digits

Picture a calculator display with about **16 windows** for digits. A huge number fills the windows from the left. A super tiny number added to it would need windows far on the right, but there are no more windows. So the tiny part simply **falls off the end**.

```java
System.out.println(1e16 + 1);   // 1.0E16  (the + 1 fell off)
System.out.println(0.1 + 0.2);  // 0.30000000000000004  (a tiny fib)
```

That is not a bug. A `double` is stored in a fixed number of bits (64), so it can only remember about 15–16 important digits (**significant digits**). Everything after that is rounded. For money, prices and most physics this is perfectly fine. You just need to know it, so you are not surprised.

**In the task:** 02_3 b) asks if Java's sum is the exact maths. With this idea you can find out yourself.

How numbers become bits: [Binary encoding](../../../../../tracks/computer-science/index.html#binary-encoding). Calculating with numbers: [Operators](../../../../../tracks/java/topics/operators/index.html).

---

## Words to know

| Word on the sheet | English | Means |
|-------------------|---------|-------|
| Variable | variable | A labelled box for a value |
| Datentyp | data type | The shape of the box: `int`, `double`, … |
| primitiver Datentyp | primitive type | One of the 8 basic shapes |
| deklarieren | declare | Make the box: `int semester;` |
| initialisieren | initialise | Put the first value in: `= 1` |
| Wert | value | What is inside the box |
| Literal | literal | A value written directly in the code: `1934`, `3.8`, `'m'` |
| Namenskonvention | naming convention | The habit how to name boxes (camelCase) |
| Ganzzahl | integer, whole number | No dot: `int`, `long` |
| Gleitkommazahl | floating-point number | With a dot: `double`, `float` |
| Zeichen | character | One letter or sign: `char` |
| Zeichenkette | string | Text: `String` |
| Wahrheitswert | boolean | `true` or `false` |
| beschriftender Text | label | The text in front of a value: `"Vorname: "` |
| Erststudium | first degree | Your first time studying at a university |
| Studiengang | study programme | What you study |
| Mensa | canteen | The university restaurant |
| Grenze / Wertebereich | limit / range | Smallest to biggest value a box can hold |
| Überlauf | overflow | Going over the top and wrapping around |
| Exponentialschreibweise | scientific / e-notation | `2.34e6` = 2.34 · 10⁶ |
| Genauigkeit | precision | How many digits are kept exactly |
| signifikante Stellen | significant digits | The digits that really count, from the first non-zero one |
| Mantisse | mantissa | The part of a `double` that stores the digits |
| Rundung | rounding | Cutting off digits that do not fit |
| Auslöschung | cancellation, loss of digits | Small parts disappearing when you calculate with very different sizes |

## Source

> Hochschule Hannover, Fakultät IV – Wirtschaft und Informatik, Abteilung WI
> **Programmieren 1 | Übung 02 — Datentypen & Variablen**

Next Übung: [Übung 03 · Operationen und Ausdrücke](../uebung-03-operationen-und-ausdruecke/README.md).

Back to [all Übungen](../README.md).
