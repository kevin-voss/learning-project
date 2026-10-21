# Aufgabe 01_1 · Hallo Welt

Part of [Übung 01 · Erste Programme](../README.md). New ideas you need: class and file name, `main`, `println`, `;`, `javac` and `java`, reading error messages, big and small letters. They are all explained in the Übung page.

| Folder | What it is |
|--------|-----------|
| [`meine-loesung/`](meine-loesung/README.md) | **Your desk.** `Aufgabe01_1.java` is half-ready: fill in the `TODO`s, and your error table in its `README.md` |
| [`musterloesung/`](musterloesung/README.md) | The Musterlösung. Peek only when you are done |

## The task (original)

*(English translation of the German sheet, as in your course repository.)*

a) Create a file named `Aufgabe01_1.java` and enter the following Hello World program:

```java
public class Aufgabe01_1 {
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

1. Make a file `Aufgabe01_1.java`.
2. Type the five lines from the sheet. Type them, do not copy them: your fingers learn the shape.
3. Translate it with `javac`, run it with `java`. You see `Hello World`.
4. Now be a little vandal: change **one** thing, run `javac`, write the error message down, undo the change.
5. Do that 5 times, with 5 different changes.

## Test examples

Your program is right when it gives exactly these answers.

**Part a) and b):**

| You run | The program says |
|---------|------------------|
| `javac Aufgabe01_1.java` | nothing at all (no news is good news) |
| `java Aufgabe01_1` | `Hello World` |

**Part c):** five changes and what `javac` says. Make each change alone, then undo it. Your computer speaks German, so your messages will say `Fehler` and `erwartet`; the English words are in brackets. Line numbers are for the 5-line program from the sheet.

| Change | `javac` says (first line) |
|--------|---------------------------|
| Remove the `;` after `println(...)` | `Aufgabe01_1.java:3: Fehler: ';' erwartet` (`';' expected`) |
| Remove the `{` after `main(String[] args)` | `Aufgabe01_1.java:2: Fehler: '{' oder ';' erwartet` (`'{' or ';' expected`) |
| Remove the very last `}` | `Aufgabe01_1.java:4: Fehler: Dateiende beim Parsen erreicht` (`reached end of file while parsing`) |
| Write `Public` instead of `public` in line 1 | `Aufgabe01_1.java:1: Fehler: Klasse, Schnittstelle, … erwartet` (`class, interface, … expected`) |
| Write `printl` instead of `println` | `Aufgabe01_1.java:3: Fehler: Symbol nicht gefunden` (`cannot find symbol`) |
| Write `vid` instead of `void` | `Aufgabe01_1.java:2: Fehler: Symbol nicht gefunden` (`cannot find symbol`), `Symbol: Klasse vid` |
| Remove the class name after `class` | `Aufgabe01_1.java:1: Fehler: <ID> erwartet` (`<identifier> expected`) |
| Remove the closing `"` after `World` | `Aufgabe01_1.java:3: Fehler: Nicht geschlossenes Zeichenfolgenliteral` (`unclosed string literal`) |
| Save the file as `HelloWorld.java` but keep `class Aufgabe01_1` | `HelloWorld.java:1: Fehler: Klasse Aufgabe01_1 ist öffentlich und muss in einer Datei namens Aufgabe01_1.java deklariert werden` (`class Aufgabe01_1 is public, should be declared in a file named Aufgabe01_1.java`) |
| Write `Helo World` inside the quotes | **no** error! `Hello` is just text for Java. The output is simply wrong: `Helo World` |

That last row is important: the translator only checks **Java words**, not your text. A spelling mistake inside quotes is your job to find.

## Your first try

What is already good:

- Your program runs and prints `Hello World`. And your notes about it are really thorough: class, `main`, `javac`/`java`, file name = class name, big and small letters. That is exactly the right list.
- You collected more than five error messages and noticed the most useful trick of all: look at the **line number** first.

What is still open:

- The sheet asks for the name `Aufgabe01_1`; your file and class have a different name. Try it once with the sheet's name, so your commands match the sheet.
- Your messages are the Eclipse ones from the sheet. Make two or three of the same mistakes and run `javac` in the terminal: compare how the terminal says it (the table above helps). The terminal has no Eclipse, so it is worth knowing both.

## Little helpers

<details>
<summary>javac says "Datei nicht gefunden" (file not found)</summary>

Your terminal is in the wrong folder, or the file has another name. Type `ls` (Mac) and check that `Aufgabe01_1.java` is in the list, spelled exactly like that.

</details>

<details>
<summary>java says "Hauptklasse Aufgabe01_1 konnte nicht gefunden oder geladen werden"</summary>

Either `javac` did not run (or failed), so there is no `.class` file yet. Or you typed `java Aufgabe01_1.java` or `java Aufgabe01_1.class`: `java` wants the class name alone, nothing after it.

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

- [ ] `java Aufgabe01_1` prints `Hello World`.
- [ ] You wrote down 5 different error messages, each with its line number.
- [ ] You can point at an error message and say: which file, which line, what is missing.
- [ ] You can explain your code out loud in your own words.

Next: [Aufgabe 01_2](../aufgabe-01-2-einruecken/README.md)
