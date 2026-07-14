# Java syntax basics (your very first Java)

> Read this **before** the "classes" part of [Step 01](README.md) if you've never written code. It teaches the raw building blocks (variables, text, numbers, decisions, and loops) using tiny runnable examples. Nothing here assumes prior knowledge. ~45–60 minutes.

Everything in ParcelPilot is built from these few pieces. Type each example yourself and run it. Seeing the output is how it sticks.

## The smallest possible program (your first run)

Create a file called `Hello.java` with exactly this:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, ParcelPilot!");
    }
}
```

Run it from the terminal:

```bash
javac Hello.java   # compile: turns Hello.java into Hello.class
java Hello         # run: starts at main() and prints the line
```

Expected output:

```text
Hello, ParcelPilot!
```

**What every line means (don't skip this):**

- `public class Hello { ... }`: all Java code lives inside a **class**. For now, treat it as the required wrapper. The class name (`Hello`) must match the file name (`Hello.java`).
- `public static void main(String[] args) { ... }`: the **`main` method** is the one special place Java starts running. Every runnable program needs exactly one. You'll understand each word (`public`, `static`, `void`) in the [Step 01 README](README.md). For now, copy it exactly.
- `System.out.println("...")`: prints a line of text to the terminal. `println` = "print line" (adds a newline at the end), and `print` = no newline.
- **Semicolons `;`** end every statement. Forgetting one is the #1 beginner error.
- **Curly braces `{ }`** group code into blocks. Every `{` needs a matching `}`.
- **Case matters:** `Main` and `main` are different. `String` and `string` are different.

## Comments (notes to humans, ignored by Java)

```java
// This is a single-line comment. Java ignores it.

/*
  This is a multi-line comment.
  Useful for longer notes.
*/
```

Use comments to explain *why*, not to restate the obvious.

## Variables and types

A **variable** is a named box that holds a value. Java is **statically typed**: you must say what *kind* of value a box holds (its **type**), and it can only hold that kind.

```java
public class Basics {
    public static void main(String[] args) {
        int count = 3;                 // whole number
        long bigCount = 9000000000L;   // bigger whole number (note the L)
        double weightKg = 2.5;         // decimal number
        boolean isPriority = true;     // true or false
        char grade = 'A';              // a single character (single quotes)
        String recipient = "Ava";      // text (double quotes)

        System.out.println(recipient + " has " + count + " parcels");
    }
}
```

| Type | Holds | Example |
|---|---|---|
| `int` | whole numbers | `42` |
| `long` | large whole numbers | `9000000000L` |
| `double` | decimal numbers | `2.5` |
| `boolean` | `true` / `false` | `true` |
| `char` | one character | `'A'` |
| `String` | text (many characters) | `"Ava"` |

Notes that trip people up:

- **`String` uses double quotes** `"Ava"`, and **`char` uses single quotes** `'A'`. They are not interchangeable.
- Once a variable has a type, it keeps it: `int count = 3; count = "three";` is an error.
- `var` lets Java infer the type: `var recipient = "Ava";` is the same as `String recipient = "Ava";`. Use it when the type is obvious.

> **Want the full story on types?** [Java data types in detail](data-types.md) covers all 8 primitives with their ranges, primitive vs reference types, literals and suffixes (`L`, `f`), casting/conversion, wrappers and autoboxing (`int` vs `Integer`), `String` immutability, `final`/constants, the `int` overflow and `double`-for-money traps, and a decision guide. Come here for the quick version. Go there when you want the why.

## Operators (doing things with values)

```java
int a = 7, b = 2;

int sum = a + b;        // 9
int diff = a - b;       // 5
int product = a * b;    // 14
int quotient = a / b;   // 3  (integer division drops the remainder!)
int remainder = a % b;  // 1  (the "modulo" / leftover)

boolean isEqual = (a == b);   // false  (== compares values)
boolean isMore  = (a > b);    // true
boolean both    = (a > 0 && b > 0);  // true  (&& = AND)
boolean either  = (a > 0 || b > 0);  // true  (|| = OR)
boolean notTrue = !(a == b);  // true   (! = NOT)
```

**Two classic gotchas:**

- `7 / 2` is `3`, not `3.5`, because both are `int` (whole-number division). Use `double` to get `3.5`: `7.0 / 2`.
- Use `==` to compare **numbers**, but to compare **text** use `"Ava".equals(name)`, not `==`. (`==` on objects compares identity, not contents. More on this in the README.)

### Building strings

`+` joins (**concatenates**) strings:

```java
String id = "P-1";
String recipient = "Ava";
System.out.println(id + " -> " + recipient);   // P-1 -> Ava
```

## Making decisions: `if` / `else`

```java
int parcels = 5;

if (parcels == 0) {
    System.out.println("No parcels.");
} else if (parcels < 10) {
    System.out.println("A few parcels.");
} else {
    System.out.println("Many parcels!");
}
```

The condition inside `(...)` must be a `boolean` (something that is `true` or `false`). Only the first matching branch runs.

A compact multi-way choice is `switch`:

```java
String status = "PICKED_UP";

switch (status) {
    case "CREATED"   -> System.out.println("Waiting for pickup");
    case "PICKED_UP" -> System.out.println("On the way");
    case "DELIVERED" -> System.out.println("Done");
    default          -> System.out.println("Unknown status");
}
```

## Repeating work: loops

**`for` loop**: when you know how many times (or count over a range):

```java
for (int i = 1; i <= 3; i++) {   // start; keep going while; step
    System.out.println("Parcel number " + i);
}
// prints: Parcel number 1, 2, 3
```

`i++` means "add 1 to `i`". Read the header as: *start `i` at 1, while `i <= 3` run the body, then increase `i`.*

**`while` loop**: when you loop until a condition changes:

```java
int remaining = 3;
while (remaining > 0) {
    System.out.println(remaining + " parcels left");
    remaining--;   // subtract 1, or this loops forever!
}
```

**`for-each` loop**: go over every item in a collection (you'll use this a lot):

```java
import java.util.List;

List<String> recipients = List.of("Ava", "Ben", "Cara");
for (String name : recipients) {
    System.out.println("Notify " + name);
}
```

## Holding many values: arrays and lists (quick intro)

```java
import java.util.ArrayList;
import java.util.List;

// A List is a resizable sequence (used far more often than raw arrays)
List<String> parcels = new ArrayList<>();
parcels.add("P-1");
parcels.add("P-2");
System.out.println(parcels.size());   // 2
System.out.println(parcels.get(0));   // P-1
```

For now, prefer `List` over raw arrays (`String[]`): it's easier and safer. You'll see `List` throughout ParcelPilot.

## `null`: the "nothing here" value

An object variable that points to nothing holds `null`:

```java
String name = null;
System.out.println(name.length());   // CRASH: NullPointerException
```

Calling a method on `null` crashes with a **`NullPointerException`**, the most common Java error. A big part of good design (later steps) is making `null` hard to run into.

## Methods (a first look)

A **method** is a named, reusable action. `main` is one, and you can write your own:

```java
public class Greeter {
    public static void main(String[] args) {
        System.out.println(greeting("Ava"));   // call the method
    }

    // a method that takes a String and returns a String
    static String greeting(String name) {
        return "Hello, " + name + "!";
    }
}
```

- `String greeting(String name)`: returns a `String`, takes one **parameter** `name`.
- `return` hands a value back to the caller and ends the method.
- The README covers methods (and `this`, constructors) in much more depth. This is just the shape.

## How to run anything (recap)

```bash
javac YourFile.java    # compile every .java into .class bytecode
java YourClassName     # run the class that has main()  (no .class, no .java)
```

If you have several files: `javac *.java` compiles them all. From [Step 03](../03-maven/README.md) onward, **Maven** does the compiling, testing, and packaging with one command (`mvn test`) so you never juggle `javac` by hand again.

## Common first errors and what they mean

| Error message contains… | Usual cause |
|---|---|
| `';' expected` | Missing semicolon at the end of a statement. |
| `reached end of file while parsing` | A missing closing `}`. |
| `cannot find symbol` | Typo in a name, or you forgot an `import`. |
| `incompatible types` | Assigning the wrong type (e.g. text into an `int`). |
| `NullPointerException` (at runtime) | Used a variable that was `null`. |
| `class X is public, should be declared in a file named X.java` | Class name and file name don't match. |

## Mini-exercises (do these before the README)

1. Print the numbers 1 to 10, each on its own line.
2. Print only the **even** numbers from 1 to 10 (hint: `i % 2 == 0`).
3. Make a `List<String>` of three recipient names and print `"Notify <name>"` for each.
4. Write a method `boolean isPriority(int weightKg)` that returns `true` when the weight is over 20, and call it from `main`.

## Say it like a developer

- "I declared an `int` **variable** called `count` and assigned it `3`."
- "The **condition** in the `if` has to be a `boolean`."
- "I **looped** over the list with a **for-each** and printed each name."
- "That crashed with a **NullPointerException** because `name` was `null`."
- "`println` prints a line, and `+` **concatenates** strings."

## Next

Now go back to [Step 01](README.md) and learn how to group this data and behavior into a **class**, the real starting point of ParcelPilot. Two optional companions deepen this step: [Java data types in detail](data-types.md) and [general coding concepts](../../references/coding-concepts.md) (early return, guard clauses, DRY) for writing clean logic.
