# Task 01_1 · Hello World

Part of [Exercise 01 · First programs](../README.md). New ideas you need: class and file name, `main`, `println`, `;`, `javac` and `java`, reading error messages, big and small letters. They are all explained in the exercise page.

| Folder | What it is |
|--------|-----------|
| [`my-solution/`](my-solution/README.md) | **Your desk.** Empty on purpose: you write `Task01_1.java` yourself, and your error table in its `README.md` |
| [`solution/`](solution/README.md) | The sample solution. Peek only when you are done |

## The task (from the sheet)

*(Translated into English from the course sheet.)*

a) Create a file named `Task01_1.java` and enter the following Hello World program:

```java
public class Task01_1 {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
```

b) Run the program. If the compiler reports errors, fix the source code until no error messages appear.

c) Try to produce at least 5 different error messages by changing the source code one after another, and write down each error message before undoing the change. Examples:
• Omitting a semicolon — `Syntax error, insert ";" to complete BlockStatements`
• Omitting a curly brace — `Syntax error on token ")", { expected after this token`
• Changing capitalization — `Syntax error, insert ";" to complete ClassBodyDeclarations`; `Public cannot be resolved to a type`
• Omitting the class name — `Syntax error on token "class", Identifier expected after this token`
• Changing the class name — `java.lang.Error: Unresolved compilation problem: at HelloWorld.main(HelloWorldBugs.java:3)`
• Other typos — `Helo World`; `vid cannot be resolved to a type`; `The method printl(String) is undefined for the type PrintStream`

(The example messages on the sheet come from **Eclipse**, an editor with its own translator. With `javac` in the terminal the same mistakes look a bit different: see the table below.)

## The task, simply said

1. Make a file `Task01_1.java`.
2. Type the five lines from the sheet. Type them, do not copy them: your fingers learn the shape.
3. Translate it with `javac`, run it with `java`. You see `Hello World`.
4. Now be a little vandal: change **one** thing, run `javac`, write the error message down, undo the change.
5. Do that 5 times, with 5 different changes.

## Test examples

Your program is right when it gives exactly these answers.

**Part a) and b):**

| You run | The program says |
|---------|------------------|
| `javac Task01_1.java` | nothing at all (no news is good news) |
| `java Task01_1` | `Hello World` |

**Part c):** five changes and what `javac` says. Make each change alone, then undo it. Line numbers are for the 5-line program from the sheet. Is your computer set to another language? Then `javac` speaks that language. Type `javac -J-Duser.language=en Task01_1.java` to get exactly the English messages below.

| Change | `javac` says (first line) |
|--------|---------------------------|
| Remove the `;` after `println(...)` | `Task01_1.java:3: error: ';' expected` |
| Remove the `{` after `main(String[] args)` | `Task01_1.java:2: error: '{' or ';' expected` |
| Remove the very last `}` | `Task01_1.java:4: error: reached end of file while parsing` |
| Write `Public` instead of `public` in line 1 | `Task01_1.java:1: error: class, interface, … expected` |
| Write `printl` instead of `println` | `Task01_1.java:3: error: cannot find symbol` |
| Write `vid` instead of `void` | `Task01_1.java:2: error: cannot find symbol`, `symbol: class vid` |
| Remove the class name after `class` | `Task01_1.java:1: error: <identifier> expected` |
| Remove the closing `"` after `World` | `Task01_1.java:3: error: unclosed string literal` |
| Save the file as `HelloWorld.java` but keep `class Task01_1` | `HelloWorld.java:1: error: class Task01_1 is public, should be declared in a file named Task01_1.java` |
| Write `Helo World` inside the quotes | **no** error! `Hello` is just text for Java. The output is simply wrong: `Helo World` |

That last row is important: the translator only checks **Java words**, not your text. A spelling mistake inside quotes is your job to find.

## Your first try

What is already good:

- Your program runs and prints `Hello World`. And your notes about it are really thorough: class, `main`, `javac`/`java`, file name = class name, big and small letters. That is exactly the right list.
- You collected more than five error messages and noticed the most useful trick of all: look at the **line number** first.

What is still open:

- The sheet asks for the name `Task01_1`; your file and class have a different name. Try it once with the sheet's name, so your commands match the sheet.
- Your messages are the Eclipse ones from the sheet. Make two or three of the same mistakes and run `javac` in the terminal: compare how the terminal says it (the table above helps). The terminal has no Eclipse, so it is worth knowing both.

## Little helpers

<details>
<summary>javac says "file not found"</summary>

Your terminal is in the wrong folder, or the file has another name. Type `ls` (Mac) and check that `Task01_1.java` is in the list, spelled exactly like that.

</details>

<details>
<summary>java says "Could not find or load main class Task01_1"</summary>

Either `javac` did not run (or failed), so there is no `.class` file yet. Or you typed `java Task01_1.java` or `java Task01_1.class`: `java` wants the class name alone, nothing after it.

</details>

<details>
<summary>I made one change and got three errors</summary>

That happens. One missing bracket confuses the translator for the rest of the file. Always fix the **first** message first, then translate again: often the others disappear with it.

</details>

<details>
<summary>I changed something and there is no error at all</summary>

Then you changed text inside the quotes, or a space somewhere. Java does not care about extra spaces between words. Try a Java word instead: `class`, `void`, `System`, a bracket, the `;`.

</details>

## Done when

- [ ] `java Task01_1` prints `Hello World`.
- [ ] You wrote down 5 different error messages, each with its line number.
- [ ] You can point at an error message and say: which file, which line, what is missing.
- [ ] You can explain your code out loud in your own words.

Next: [Task 01_2](../task-01-2-indentation/README.md)
