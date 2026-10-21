// Debugging, deeper: jshell as a lab for testing one guess in seconds.
(function () {
  Java.addCoreLessons('debugging', [
    {
      id: 'jshell',
      title: 'jshell Experiments',
      category: 'deeper',
      icon: 'jshell',
      tagline: 'Test one guess in seconds',
      realWorld: 'Scratch paper next to your maths homework. You try a quick sum on the side before you write it into the real answer.',
      kid: [
        'Sometimes you only want to know one tiny thing: "what is 7 divided by 2 in Java?" Writing a whole program for that is a lot of work.',
        '**jshell** is a little window where you type one line of Java and get the answer at once. No class, no `main`, no `javac`.',
        'It is perfect for testing a guess while you hunt a bug.'
      ],
      definition: '**jshell** is the Java **REPL** (Read-Eval-Print Loop) that comes with the JDK. It reads one Java line, runs it, prints the result, and waits for the next. You start it with `jshell` in the terminal and leave it with `/exit`.',
      explain: [
        'A **REPL** is a program that repeats four things: **read** what you type, **evaluate** (run) it, **print** the result, **loop** back and wait. Many languages have one; Java has had jshell since Java 9.',
        'In jshell you type expressions such as `7 / 2` or `"aeiou".indexOf(\'A\')` directly. jshell shows the result as `$1 ==> 3`: `$1` is a name jshell gives the result so you can use it again, and `==>` points to the value.',
        'You can also declare variables (`int[] scores = {80, 90, 100}`) and even methods. A `;` at the end of a line is optional. Commands that start with `/` control jshell itself: `/vars` lists your variables, `/list` shows what you typed, `/exit` quits.',
        'For debugging, jshell is a lab for the "test" step of the debugging loop. Your hypothesis is "capital letters are not found by `indexOf`"? Type `"aeiou".indexOf(\'A\')` and see `-1` in two seconds, without touching your program.',
        'jshell does not replace your `.java` files. When the experiment is done, you put the fix into the real program and run it there.'
      ],
      why: 'It makes the cheapest possible experiment: one line, one answer. That keeps the debugging loop fast.',
      whenUse: 'To check what a single method or operator really does (`/` with `int`s, `substring`, `parseInt`, `indexOf`) before you change your program.',
      syntax: '`jshell` → type a Java expression or declaration → Enter. `/vars`, `/list`, `/exit`.',
      codeLanguage: 'bash',
      fileName: 'terminal',
      code: `jshell
7 / 2
(double) 7 / 2
"aeiou".indexOf('A')
Integer.parseInt(" 5")
Integer.parseInt(" 5".trim())
/exit`,
      output: `|  Welcome to JShell -- Version 25
|  For an introduction type: /help intro

jshell> 7 / 2
$1 ==> 3

jshell> (double) 7 / 2
$2 ==> 3.5

jshell> "aeiou".indexOf('A')
$3 ==> -1

jshell> Integer.parseInt(" 5")
|  Exception java.lang.NumberFormatException: For input string: " 5"
|        at NumberFormatException.forInputString (NumberFormatException.java:67)
|        at Integer.parseInt (Integer.java:565)
|        at Integer.parseInt (Integer.java:662)
|        at (#4:1)

jshell> Integer.parseInt(" 5".trim())
$5 ==> 5

jshell> /exit
|  Goodbye`,
      codeSummary: 'The left box is what you type, one line after the other. The output box shows the whole session as it appears in the terminal (real output from JDK 25; your version number may differ). Four quick questions answered in under a minute.',
      codeExplanation: [
        { label: 'Line 1', code: 'jshell', text: 'Starts jshell in the terminal. The prompt changes to `jshell>`.' },
        { label: 'Line 2', code: '7 / 2', text: 'Integer division: `$1 ==> 3`. The decimals are cut off, a common cause of wrong averages.' },
        { label: 'Line 3', code: '(double) 7 / 2', text: 'With the cast the result is `3.5`. You tested a fix without writing a program.' },
        { label: 'Line 4', code: '"aeiou".indexOf(\'A\')', text: '`-1` means "not found". This confirms the guess from the vowel bug: capital letters are not in `"aeiou"`.' },
        { label: 'Line 5', code: 'Integer.parseInt(" 5")', text: 'A space before the digit is enough for a `NumberFormatException`. jshell prints the trace with `|` in front.' },
        { label: 'Line 6', code: 'Integer.parseInt(" 5".trim())', text: '`trim()` removes the space, and the result is `5`. The fix is tested.' },
        { label: 'Line 7', code: '/exit', text: 'Leaves jshell. Commands that start with `/` are for jshell itself, not Java.' }
      ],
      sections: [
        {
          title: 'Where jshell fits in the debugging loop',
          mermaid: `flowchart LR
  H["Hypothesis: indexOf misses capitals"] --> J["jshell: type one line"]
  J --> R{"Result as guessed?"}
  R -->|"yes"| F["Fix the real .java file"]
  R -->|"no"| H2["New hypothesis"]`,
          diagramNote: 'jshell is the fastest kind of "test" step: no file, no compile, one answer.'
        },
        {
          title: 'jshell or a .java file?',
          table: {
            head: ['', 'jshell', '.java file'],
            rows: [
              ['Start', '`jshell`, then type', 'write a class with `main`, `javac`, `java`'],
              ['Good for', 'one expression, one method call', 'whole programs, anything you keep'],
              ['Result shown', 'automatically (`$1 ==> 3`)', 'only what you `println`'],
              ['Remembers', 'until `/exit`', 'forever (it is a file)'],
              ['Debugger', 'no', 'yes, breakpoints and stepping']
            ]
          }
        },
        {
          title: 'Useful commands and a few crash tests',
          bullets: [
            '`/vars` lists every variable you made, with type and value.',
            '`/list` shows every line you typed, numbered.',
            '`/reset` forgets everything and starts fresh.',
            '`/help` lists all commands. Up and Down arrows bring back earlier lines, as in the terminal.'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `int[] scores = {80, 90, 100}
scores[3]
String s = null
s.length()`,
          output: `jshell> int[] scores = {80, 90, 100}
scores ==> int[3] { 80, 90, 100 }

jshell> scores[3]
|  Exception java.lang.ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3
|        at (#2:1)

jshell> String s = null
s ==> null

jshell> s.length()
|  Exception java.lang.NullPointerException: Cannot invoke "String.length()" because "REPL.$JShell$4.s" is null
|        at (#4:1)`,
          tip: 'The odd name `REPL.$JShell$4.s` is how jshell stores your variable `s` inside a hidden class. In a normal program the message names your own class.'
        },
        {
          title: 'Back to a real program',
          text: ['When the experiment worked, the fix goes into a file. This program uses exactly the lines tested in jshell.'],
          fileName: 'TrimParse.java',
          code: `public class TrimParse {
    public static void main(String[] args) {
        String typed = " 5";
        int number = Integer.parseInt(typed.trim());
        System.out.println("number + 1 = " + (number + 1));
        System.out.println("7 / 2 as double = " + (double) 7 / 2);
    }
}`,
          output: `number + 1 = 6
7 / 2 as double = 3.5`
        }
      ],
      technical: [
        'jshell wraps every line you type into a hidden class behind the scenes, compiles it with the normal Java compiler in memory, and runs it on a JVM that stays alive between lines. That is why variables survive from one line to the next.',
        'Because each snippet is compiled on its own, jshell can accept an expression without `;` and without a class around it. A method you declare can even use a variable that you only define later; jshell then waits and tells you it is "created, however, it cannot be invoked until variable x is declared".',
        'jshell imports a few packages for you, such as `java.util.*` and `java.io.*`, so `List.of(1, 2)` works without an `import` line. In a `.java` file you still write the imports.'
      ],
      tryIt: {
        steps: [
          'Open a terminal and type `jshell`.',
          'Type `10 / 4`, then `10 / 4.0`.',
          'Type `"Hello".substring(1, 3)`.',
          'Type `/vars`, then `/exit`.'
        ],
        see: '`$1 ==> 2`, `$2 ==> 2.5`, `$3 ==> "el"`, then a list of the three variables, and `Goodbye`.'
      },
      check: [
        { q: 'What does `$2 ==> 3.5` mean?', a: 'The result of your second snippet is 3.5; jshell stores it in a variable called `$2`.' },
        { q: 'How do you leave jshell?', a: 'Type `/exit` (or press Ctrl+D).' },
        { q: 'Why is jshell useful for the "test" step of debugging?', a: 'It answers a one-line question in seconds, without changing or recompiling your real program.' }
      ],
      keyPoints: [
        'jshell is the Java REPL that comes with the JDK.',
        'Type an expression, see `$n ==> value` at once.',
        '`/vars`, `/list`, `/reset`, `/exit` control jshell.',
        'Great for testing one guess; the fix goes into your `.java` file.'
      ],
      commonMistakes: [
        'Pasting `jshell>` prompts or `$1 ==>` lines into a `.java` file. Fix: copy only the Java part.',
        'Expecting jshell to remember after `/exit`. Fix: save what you need into a file first.',
        'Typing `exit` without the slash. Fix: `/exit`.'
      ],
      related: ['debugging-loop', 'Strings & Text', 'Operators']
    }
  ]);
})();
