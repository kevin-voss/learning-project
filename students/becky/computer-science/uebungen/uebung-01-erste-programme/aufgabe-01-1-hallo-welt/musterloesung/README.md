# Musterlösung · Aufgabe 01_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`musterloesung/`), then:

```bash
javac Aufgabe01_1.java
```

```bash
java Aufgabe01_1
```

## How it works, step by step

1. `public class Aufgabe01_1 { … }` is the labelled box. The label `Aufgabe01_1` is the same as the file name `Aufgabe01_1.java`. If they differ, `javac` refuses.
2. `public static void main(String[] args) { … }` is the front door. `java Aufgabe01_1` looks for exactly this line and starts at its first statement.
3. `System.out.println("Hello World");` prints the text between the quotes and then a line break. The `;` ends the statement.
4. The two `}` at the end close `main` and then the class. Every `{` has its partner.
5. Indenting: `main` is inside the class, so it moves 4 spaces right. `println` is inside `main`, so 4 more.

**Test run** (part a and b)

```text
$ javac Aufgabe01_1.java
$ java Aufgabe01_1
Hello World
```

`javac` prints nothing: that means "no errors". Silence is the good news here.

**Part c: real messages** from `javac` on a German computer, one change at a time. The `^` points to where the translator got stuck.

```text
1) ";" removed after println("Hello World")
Aufgabe01_1.java:3: Fehler: ';' erwartet
        System.out.println("Hello World")
                                         ^
1 Fehler

2) "{" removed after main(String[] args)
Aufgabe01_1.java:2: Fehler: '{' oder ';' erwartet
    public static void main(String[] args)
                                          ^
1 Fehler

3) last "}" removed
Aufgabe01_1.java:4: Fehler: Dateiende beim Parsen erreicht
    }
     ^
1 Fehler

4) "Public" instead of "public"
Aufgabe01_1.java:1: Fehler: Klasse, Schnittstelle, Annotationstyp, Enumeration, Datensatz, Methode oder Feld erwartet
Public class Aufgabe01_1 {
^
1 Fehler

5) "printl" instead of "println"
Aufgabe01_1.java:3: Fehler: Symbol nicht gefunden
        System.out.printl("Hello World");
                  ^
  Symbol: Methode printl(String)
  Ort: Variable out von Typ PrintStream
1 Fehler

6) "vid" instead of "void"
Aufgabe01_1.java:2: Fehler: Symbol nicht gefunden
    public static vid main(String[] args) {
                  ^
  Symbol: Klasse vid
  Ort: Klasse Aufgabe01_1
1 Fehler

7) class name removed: "public class {"
Aufgabe01_1.java:1: Fehler: <ID> erwartet
public class {
            ^
1 Fehler

8) closing quote removed: println("Hello World);
Aufgabe01_1.java:3: Fehler: Nicht geschlossenes Zeichenfolgenliteral
        System.out.println("Hello World);
                           ^
1 Fehler

9) "system" instead of "System"
Aufgabe01_1.java:3: Fehler: Package system ist nicht vorhanden
        system.out.println("Hello World");
              ^
1 Fehler

10) file saved as HelloWorld.java, class still Aufgabe01_1
HelloWorld.java:1: Fehler: Klasse Aufgabe01_1 ist öffentlich und muss in einer Datei namens Aufgabe01_1.java deklariert werden
public class Aufgabe01_1 {
       ^
1 Fehler
```

The same messages in English (`javac -J-Duser.language=en Aufgabe01_1.java`):

| # | English message |
|---|-----------------|
| 1 | `';' expected` |
| 2 | `'{' or ';' expected` |
| 3 | `reached end of file while parsing` |
| 4 | `class, interface, annotation type, enum, record, method or field expected` |
| 5, 6 | `cannot find symbol` |
| 7 | `<identifier> expected` |
| 8 | `unclosed string literal` |
| 9 | `package system does not exist` |
| 10 | `class Aufgabe01_1 is public, should be declared in a file named Aufgabe01_1.java` |

Look at message 3: the line number is 4, but the missing `}` belongs **after** line 4. The translator only notices that something is missing when the file is already over. So: start at the line number, and if it looks fine, look one line up or down.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| File name ≠ class name | `muss in einer Datei namens … deklariert werden` | Rename the file or the class so both are the same, capitals too |
| `java Aufgabe01_1.class` or a forgotten `javac` | `Hauptklasse … konnte nicht gefunden oder geladen werden` | `javac` first, then `java` with the class name only |
| Changed the code but forgot `javac` | Old output, as if nothing changed | `javac` after every change |
| `“Hello World”` with curly quotes (copied from a PDF or Word) | `Unzulässiges Zeichen: "\u201c"` (illegal character) | Type the quotes yourself: `"` |
| Fixing the 2nd error message first | Errors that do not make sense | Always fix the **first** message, then translate again |

Back to [Aufgabe 01_1](../README.md).
