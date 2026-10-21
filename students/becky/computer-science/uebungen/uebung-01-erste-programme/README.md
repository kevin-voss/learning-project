# Übung 01 · Erste Programme (First programs)

| | |
|---|---|
| Student | Becky |
| Fach | Computer Science · Programmieren 1 (Hochschule Hannover) |
| Sprache | Java |
| Erstellt | 2026-10-21 |

## The story in one sentence

Today the computer learns to **talk**: you write down exactly what it should say, a translator turns your words into computer language, and then the computer says it out loud on the screen.

You will build four tiny programs:

1. The famous **"Hello World"**, and then you break it on purpose to learn how the computer complains.
2. A **messy program** that you tidy up, so that people (not the computer) can read it.
3. A **star picture** drawn line by line.
4. The **alphabet**, with secret commands for "new line" and "big gap".

This is the very first Übung. You need nothing from before: every idea starts here. If you want the long version of an idea, the lessons on this site are linked in each section.

## Aufgaben

Do them in order: each one is a bit harder than the one before. Every Aufgabe has its own folder with the task, a desk for your code (`meine-loesung/`) and the Musterlösung.

<!-- index:start -->
| Aufgabe | Thema | Status |
|---------|-------|--------|
| 01_1 | [Hallo Welt](aufgabe-01-1-hallo-welt/README.md) | done |
| 01_2 | [Einrücken](aufgabe-01-2-einruecken/README.md) | done |
| 01_3 | [Sternchen](aufgabe-01-3-sternchen/README.md) | done |
| 01_4 | [Alphabet](aufgabe-01-4-alphabet/README.md) | in progress |
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

### 1. A program is a recipe in a labelled box

Think of a recipe card in a box. The box has a **name label** on the front. Inside is the card with the steps.

In Java the box is a **class**. Its name comes after the word `class`:

```java
public class Aufgabe01_1 {
    // everything of this program lives between these two curly brackets
}
```

⚠️ The label on the box and the name of the file **must be the same**. `public class Aufgabe01_1` lives in a file called `Aufgabe01_1.java`. Capital letters count too.

**In the task:** Aufgabe 01_1 asks for exactly this file name: `Aufgabe01_1.java`.

Longer version: [Getting started](../../../../../tracks/java/topics/getting-started/index.html).

### 2. `main` — the front door

A house can have many rooms, but you always come in through the **front door**. When you start a Java program, Java always comes in through `main`.

```java
public static void main(String[] args) {
    // Java starts here, at the first line, and walks down
}
```

The words around `main` look scary, but they are always the same. Learn them like a phone number for now; what each word means comes later in the course.

**In the task:** every program in this Übung has exactly one `main`, and all your lines go inside it.

### 3. `System.out.println` — the program's mouth

`println` = "print a line". It says the text in the brackets on the screen, and then it goes to the **next line**, like pressing Enter.

```java
System.out.println("Hello World");
System.out.println("Bye");
```

```text
Hello World
Bye
```

- Text sits in **"double quotes"**. Everything inside the quotes is printed exactly, spaces too.
- `System.out.print(...)` (without `ln`) prints but stays on the same line.
- `System.out.println();` with nothing inside prints an **empty line**.

**In the task:** every Aufgabe of this Übung is "make the screen show exactly this" with `println`.

### 4. `;` — the full stop

In German a sentence ends with a full stop. In Java an instruction (a **statement**) ends with a **semicolon** `;`.

```java
System.out.println("Hi");   // the ; says: this instruction is finished
```

Forget it, and Java says `';' expected`. That is the most common error of the first week. It is completely normal.

### 5. `javac` and `java` — translator and actor

You write Java. The computer does not understand Java. So there are two steps:

1. **`javac`** is the **translator**. It reads `Aufgabe01_1.java`, checks every word and writes `Aufgabe01_1.class` (computer language).
2. **`java`** is the **actor**. It takes the translated file and performs it.

```bash
javac Aufgabe01_1.java
java Aufgabe01_1
```

Notice: `javac` gets the **file name** (with `.java`), `java` gets the **class name** (without anything).

If the translator finds a mistake, it stops and complains. Then there is no new `.class` file, and `java` runs nothing (or the **old** version!). So after every change: `javac` again, then `java`.

**In the task:** Aufgabe 01_1 b) is exactly these two commands.

### 6. Error messages — a treasure map, not a punishment

When `javac` complains, it tells you **where** to look. Read it like a map:

```text
Aufgabe01_1.java:3: Fehler: ';' erwartet
        System.out.println("Hello World")
                                         ^
```

| Part | Means |
|------|-------|
| `Aufgabe01_1.java` | in which file |
| `:3:` | in **line 3**. Look there first! |
| `';' erwartet` | what is wrong (`expected` = "I was waiting for a `;`") |
| `^` | the little arrow points to the spot |

Your computer speaks German, so you see `Fehler` and `erwartet`. In English it says `error` and `expected`. Same message.

Sometimes the real mistake is one line **above** the line in the message: Java only notices something is missing when the next thing starts.

**In the task:** in Aufgabe 01_1 c) you break the program on purpose five times and collect the messages, so they never scare you again.

More on reading messages: [Syntax fundamentals](../../../../../tracks/java/topics/syntax-fundamentals/index.html).

### 7. Big and small letters are different

For Java, `println` and `Println` are two different words, like "Ball" and "ball" would be two different names. `System` must start with a capital S, `public`, `class`, `static`, `void` are all small.

```java
system.out.println("Hi");   // error: package system does not exist
System.out.println("Hi");   // fine
```

**In the task:** changing one capital letter is one of your five errors in 01_1 c).

### 8. Blocks `{ }` and indenting — boxes inside boxes

Think of a set of Russian dolls, or a small box inside a bigger box. `{` opens a box, `}` closes it. Every `{` needs exactly one `}`.

```java
public class Demo {                      // box 1: the class
    public static void main(String[] args) {   // box 2: main, inside box 1
        System.out.println("inside two boxes");
    }                                    // closes box 2
}                                        // closes box 1
```

**Indenting** (Einrücken) means: every time you go one box deeper, move **4 spaces** to the right. Java does not care at all. It is only for humans, so they can see at one glance which line belongs into which box.

**In the task:** Aufgabe 01_2 gives you a very messy program. You tidy it with exactly this rule.

### 9. Text in quotes — spaces count

Inside `"..."` every single character is printed, the spaces too. So spaces can **push** text to the right:

```java
System.out.println("*");
System.out.println("  *");   // two spaces first, so the star moves right
```

```text
*
  *
```

**In the task:** Aufgabe 01_3 draws a star picture, and the spaces make it lean to the right.

Text in Java has its own lesson: [Strings](../../../../../tracks/java/topics/strings/index.html).

### 10. `\n` and `\t` — secret commands inside text

A backslash `\` inside quotes means: "careful, the next letter is a **command**, not text". Like a secret code word.

| Write | Java does | Picture |
|-------|-----------|---------|
| `\n` | new line | pressing Enter |
| `\t` | jump to the next tab stop | pressing the Tab key: a wide gap |
| `\"` | print a `"` | a quote that does not end the text |
| `\\` | print one `\` | a real backslash |

```java
System.out.println("Hi\nthere");
System.out.println("A\tB");
```

```text
Hi
there
A       B
```

How wide a tab looks depends on the window: in a terminal it is usually up to 8 places, in some editors 4.

**In the task:** Aufgabe 01_4 builds a whole letter grid with one single `println`.

### 11. Comments — notes for humans

Everything after `//` (until the end of the line) is a note. Java skips it.

```java
// This line is only for people.
System.out.println("Hi");   // this note too
```

`/* ... */` makes a note over many lines. Handy trick: put `//` in front of a line to switch it off for a moment, without deleting it.

---

## Words to know

| Word on the sheet | English | Means |
|-------------------|---------|-------|
| Übung | exercise sheet | One sheet with several tasks |
| Aufgabe | task | One task on the sheet |
| Quelltext | source code | What you type in the `.java` file |
| Klasse | class | The labelled box around your program |
| Anweisung | statement | One instruction, ends with `;` |
| Semikolon | semicolon | `;` — the full stop of Java |
| geschweifte Klammer | curly bracket | `{` and `}` — open and close a box |
| Block | block | Everything between one `{` and its `}` |
| einrücken / formatieren | indent / format | Move lines right so the boxes are easy to see |
| übersetzen / kompilieren | compile | `javac`: turn Java into computer language |
| ausführen | run | `java`: start the translated program |
| Fehlermeldung | error message | The translator's complaint, with a line number |
| Groß- und Kleinschreibung | upper and lower case | `System` is not `system` |
| Ausgabe | output | What appears on the screen |
| Konsole | console / terminal | The window where the output appears |
| Zeichenkette | string | Text in `"double quotes"` |
| Leerzeichen | space | The empty character between words |
| Zeilenumbruch | line break | `\n`, a new line |
| Tabulator | tab | `\t`, a wide gap |
| Kommentar | comment | A note after `//`, Java skips it |

## Source

> Hochschule Hannover, Fakultät IV – Wirtschaft und Informatik, Abteilung WI
> **Programmieren 1 | Übung 01 Erste Programme**
>
> The task texts here are the English translations from your own course repository.

Next Übung: [Übung 02 · Datentypen und Variablen](../uebung-02-datentypen-und-variablen/README.md).

Back to [all Übungen](../README.md).
