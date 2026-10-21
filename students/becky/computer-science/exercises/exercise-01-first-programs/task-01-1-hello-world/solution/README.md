# Sample solution · Task 01_1 🏁

> Stop! Did you try it yourself first? Good. Then read on.

## How to run it

Open a terminal **in this folder** (`solution/`), then:

```bash
javac Task01_1.java
```

```bash
java Task01_1
```

## How it works, step by step

1. `public class Task01_1 { … }` is the labelled box. The label `Task01_1` is the same as the file name `Task01_1.java`. If they differ, `javac` refuses.
2. `public static void main(String[] args) { … }` is the front door. `java Task01_1` looks for exactly this line and starts at its first statement.
3. `System.out.println("Hello World");` prints the text between the quotes and then a line break. The `;` ends the statement.
4. The two `}` at the end close `main` and then the class. Every `{` has its partner.
5. Indenting: `main` is inside the class, so it moves 4 spaces right. `println` is inside `main`, so 4 more.

**Test run** (part a and b)

```text
$ javac Task01_1.java
$ java Task01_1
Hello World
```

`javac` prints nothing: that means "no errors". Silence is the good news here.

**Part c: real messages** from `javac`, one change at a time. The `^` points to where the translator got stuck. (On a computer set to another language, run `javac -J-Duser.language=en Task01_1.java` to see them in English.)

```text
1) ";" removed after println("Hello World")
Task01_1.java:3: error: ';' expected
        System.out.println("Hello World")
                                         ^
1 error

2) "{" removed after main(String[] args)
Task01_1.java:2: error: '{' or ';' expected
    public static void main(String[] args)
                                          ^
1 error

3) last "}" removed
Task01_1.java:4: error: reached end of file while parsing
    }
     ^
1 error

4) "Public" instead of "public"
Task01_1.java:1: error: class, interface, annotation type, enum, record, method or field expected
Public class Task01_1 {
^
1 error

5) "printl" instead of "println"
Task01_1.java:3: error: cannot find symbol
        System.out.printl("Hello World");
                  ^
  symbol:   method printl(String)
  location: variable out of type PrintStream
1 error

6) "vid" instead of "void"
Task01_1.java:2: error: cannot find symbol
    public static vid main(String[] args) {
                  ^
  symbol:   class vid
  location: class Task01_1
1 error

7) class name removed: "public class {"
Task01_1.java:1: error: <identifier> expected
public class {
            ^
1 error

8) closing quote removed: println("Hello World);
Task01_1.java:3: error: unclosed string literal
        System.out.println("Hello World);
                           ^
1 error

9) "system" instead of "System"
Task01_1.java:3: error: package system does not exist
        system.out.println("Hello World");
              ^
1 error

10) file saved as HelloWorld.java, class still Task01_1
HelloWorld.java:1: error: class Task01_1 is public, should be declared in a file named Task01_1.java
public class Task01_1 {
       ^
1 error
```

Look at message 3: the line number is 4, but the missing `}` belongs **after** line 4. The translator only notices that something is missing when the file is already over. So: start at the line number, and if it looks fine, look one line up or down.

## Common mistakes

| Mistake | What you see | Fix |
|---------|--------------|-----|
| File name ≠ class name | `should be declared in a file named …` | Rename the file or the class so both are the same, capitals too |
| `java Task01_1.class` or a forgotten `javac` | `Could not find or load main class …` | `javac` first, then `java` with the class name only |
| Changed the code but forgot `javac` | Old output, as if nothing changed | `javac` after every change |
| `“Hello World”` with curly quotes (copied from a PDF or Word) | `illegal character: '\u201c'` | Type the quotes yourself: `"` |
| Fixing the 2nd error message first | Errors that do not make sense | Always fix the **first** message, then translate again |

Back to [Task 01_1](../README.md).
