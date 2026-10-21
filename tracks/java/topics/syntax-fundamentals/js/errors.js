// Lesson 11 (new): how to read a compiler error caused by syntax.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'syntax-errors',
  num: '11',
  title: 'Reading Syntax Errors',
  category: 'errors',
  icon: '^',
  tagline: 'File, line, message, caret: then fix the first one',
  realWorld: 'A teacher marking your spelling test. She draws a small arrow under the wrong letter and writes the problem in the margin. You look at the arrow first.',
  kid: [
    'When your teacher checks your homework, she does not only say "wrong". She puts a little arrow under the spot and writes a short note: "missing full stop".',
    'The Java compiler does the same. It tells you which file, which line, what is wrong, and it draws a little arrow `^` under the spot.',
    'Sometimes one mistake confuses the compiler so much that it complains about many lines. So you always fix the first note, then ask the compiler to check again.'
  ],
  definition: 'A **syntax error** is a place where your code breaks the grammar of Java, such as a missing `;`, `)` or `}`. javac reports the file, the line number, a message and a caret `^` under the spot, and it writes no `.class` file until every error is fixed.',
  explain: [
    'Every error message from javac has the same shape: `File.java:LINE: error: MESSAGE`, then a copy of the line, then a caret `^` under the column where javac noticed the problem. At the very end it prints how many errors it found, such as `3 errors`.',
    'The caret shows where the compiler **noticed** the problem. That is often right after the real mistake. For a missing `;`, the caret sits at the end of the line that needs it. For a missing `}`, javac only notices at the end of the file.',
    'One mistake can produce several messages, because the compiler gets out of step and misreads the following tokens. These **follow-on errors** disappear when you fix the first one. So read and fix from the top, one error at a time, and compile again after each fix.',
    'Not every compiler error is a syntax error. `cannot find symbol` means the grammar is fine, but a name is unknown: a typo, a missing import or a variable out of scope. javac checks names and types after the grammar, so these errors often appear only once the syntax errors are gone.',
    'Errors that happen while the program **runs** are different again. They are called exceptions and print a stack trace instead of a caret. You meet them in [Exceptions](../exceptions/index.html) and [Debugging](../debugging/index.html).'
  ],
  why: 'Error messages are the fastest way to fix code, but only if you can read them. Most beginners lose time by guessing; reading file, line, message and caret takes ten seconds.',
  whenUse: 'Every time `javac` prints `error:`. Your editor shows the same messages as red squiggly lines; hover over them to read the text.',
  syntax: '`File.java:LINE: error: MESSAGE` · the source line · `^` under the spot · `N errors`',
  mermaid: 'flowchart TD\n  C["compile: javac Receipt.java"] --> Q{"any error?"}\n  Q -->|no| R["run: java Receipt"]\n  Q -->|yes| F["read the FIRST error: file, line, message, caret"]\n  F --> L["look at the caret, then at the line above"]\n  L --> X["fix only that one"]\n  X --> C',
  visualLabel: 'The repair loop',
  visualNote: 'Fix one error, compile again, repeat. When javac prints nothing, the `.class` file is there and you can run the program.',
  fileName: 'Receipt.java',
  code: `// The repaired receipt program. Section 2 shows the broken version.
public class Receipt {
    public static void main(String[] args) {
        int bread = 3;
        int milk = 2;                    // fix 1: added the ;
        int apples = 4;

        System.out.println("Bread: " + bread);
        System.out.println("Milk: " + milk);        // fix 2: added the )
        System.out.println("Apples: " + apples);
        System.out.println("Total: " + (bread + milk + apples));
    }                                    // fix 3: added the } of main
}`,
  output: `Bread: 3
Milk: 2
Apples: 4
Total: 9`,
  codeSummary: 'The program prints four lines of a shopping receipt. It is the result of the step-by-step repair below: three syntax errors, fixed one at a time from the top.',
  codeExplanation: [
    { label: 'Line 2', code: 'public class Receipt {', text: 'The class is public, so the file must be called `Receipt.java`.' },
    { label: 'Line 4', code: 'int bread = 3;', text: 'A correct declaration. Compare it with line 5 of the broken version.' },
    { label: 'Line 5', code: 'int milk = 2;', text: 'Fix 1. The broken version had no `;` here, so javac said `\';\' expected` with the caret after `2`.' },
    { label: 'Line 6', code: 'int apples = 4;', text: 'This line was never wrong, even though it came right after the broken one.' },
    { label: 'Line 9', code: 'System.out.println("Milk: " + milk);', text: 'Fix 2. The `)` of `println(` was missing, so javac said `\')\' or \',\' expected`.' },
    { label: 'Line 11', code: 'System.out.println("Total: " + (bread + milk + apples));', text: 'Two `(` and two `)`: one pair for `println`, one pair to add the numbers first.' },
    { label: 'Line 12', code: '}', text: 'Fix 3. The broken version had only one `}` at the end, so javac said `reached end of file while parsing`.' },
    { label: 'Line 13', code: '}', text: 'Closes the class. Now every `{` has its `}` and the program compiles.' }
  ],
  sections: [
    {
      title: 'The parts of one error message',
      text: ['Take the simplest error there is, a missing semicolon, and read it piece by piece.'],
      codeLanguage: 'plaintext',
      fileName: 'javac output',
      code: `MissingSemicolon.java:3: error: ';' expected
        int score = 10
                      ^
1 error`,
      table: {
        head: ['Piece', 'Here', 'Meaning'],
        rows: [
          ['file name', '`MissingSemicolon.java`', 'which file to open'],
          ['line number', '`3`', 'which line; lines count from 1 at the top'],
          ['kind', '`error`', 'the program cannot compile (a `warning` would still compile)'],
          ['message', '`\';\' expected`', 'what javac wanted to see and did not'],
          ['source line', '`int score = 10`', 'a copy of the line, so you see it without opening the file'],
          ['caret', '`^`', 'the column where javac noticed the problem'],
          ['count', '`1 error`', 'how many errors in total']
        ]
      }
    },
    {
      title: 'A step-by-step repair',
      text: [
        'Here is the receipt program with three mistakes. javac reports all three at once. Fix them from the top, and compile after each fix.',
        'Fix 1: add `;` at the end of line 5. Compile: 2 errors left. Fix 2: add `)` before the `;` on line 9. Compile: 1 error left. Fix 3: add a `}` so both the method and the class are closed. Compile: no output from javac means success.'
      ],
      fileName: 'Receipt.java (broken)',
      noRun: true,
      code: `// A receipt program with three syntax errors.
public class Receipt {
    public static void main(String[] args) {
        int bread = 3;
        int milk = 2
        int apples = 4;

        System.out.println("Bread: " + bread);
        System.out.println("Milk: " + milk;
        System.out.println("Apples: " + apples);
        System.out.println("Total: " + (bread + milk + apples));
}`,
      output: `Receipt.java:5: error: ';' expected
        int milk = 2
                    ^
Receipt.java:9: error: ')' or ',' expected
        System.out.println("Milk: " + milk;
                                          ^
Receipt.java:12: error: reached end of file while parsing
}
 ^
3 errors`
    },
    {
      title: 'One mistake, many messages',
      text: [
        'This file has exactly one mistake: `public` inside a method, where it is not allowed. javac reports four errors, the last one on line 6, far away from the real problem.',
        'After the first error the parser is out of step: it thinks the method ended and reads the rest as nonsense. Delete `public` on line 3, and all four errors are gone.'
      ],
      fileName: 'PublicInside.java',
      noRun: true,
      code: `public class PublicInside {
    public static void main(String[] args) {
        public int score = 1;
        System.out.println(score);
    }
}`,
      output: `PublicInside.java:3: error: illegal start of expression
        public int score = 1;
        ^
PublicInside.java:4: error: <identifier> expected
        System.out.println(score);
                          ^
PublicInside.java:4: error: <identifier> expected
        System.out.println(score);
                                ^
PublicInside.java:6: error: class, interface, enum, or record expected
}
^
4 errors`,
      tip: 'If the number of errors looks scary, scroll up. Only the first message is sure to point at a real mistake.'
    },
    {
      title: 'The usual suspects',
      text: ['Most syntax errors you will see come from a short list. Learn what each message usually means.'],
      table: {
        head: ['Message', 'Usual cause', 'Fix'],
        rows: [
          ['`\';\' expected`', 'a statement has no `;`', 'add `;` at the end of the line at the caret'],
          ['`\')\' or \',\' expected`', 'a `(` was not closed', 'add the missing `)`'],
          ['`reached end of file while parsing`', 'a `}` is missing somewhere', 'count braces; the last block is not closed'],
          ['`unclosed string literal`', 'a `"` is missing, or a string crosses a line break', 'close the string on the same line'],
          ['`not a statement`', 'an expression stands alone, or a name starts with a digit', 'make it an assignment or a call; fix the name'],
          ['`illegal start of expression`', 'a word in the wrong place, such as `public` inside a method', 'remove or move the word'],
          ['`<identifier> expected`', 'a name is missing, or a keyword is used as a name', 'write a legal name'],
          ['`class, interface, enum, or record expected`', 'code outside the class, or an extra `}`', 'move the code inside; remove the extra brace'],
          ['`class X is public, should be declared in a file named X.java`', 'file name and class name differ', 'rename the file or the class']
        ],
        note: 'Every message in this table is a real javac message; most of them appear with a full example somewhere in this topic.'
      }
    },
    {
      title: 'Syntax errors and the other errors',
      text: [
        'javac checks your code in a fixed order. First the grammar, then the names and types. Only a file that passes both becomes a `.class` file that can run. Errors at run time are a third kind.',
        '`cannot find symbol` and `incompatible types` come from the second check. They need the grammar to be right first, which is why they sometimes appear only after you fix the syntax.'
      ],
      mermaid: 'flowchart LR\n  S["Receipt.java"] --> P["1. grammar check (parser)"]\n  P -->|"syntax error: missing semicolon"| E1["fix the code"]\n  P --> N["2. names and types"]\n  N -->|"cannot find symbol"| E2["fix the code"]\n  N --> B["Receipt.class"]\n  B --> R["3. java Receipt runs"]\n  R -->|"exception at run time"| E3["see Exceptions"]',
      diagramNote: 'Three places where things can go wrong. This lesson is about the first box; the second shows up in every topic; the third is in [Exceptions](../exceptions/index.html).'
    }
  ],
  technical: [
    'javac works in stages: **parse** (tokens into a syntax tree), **enter** and **attribute** (look up every name and type), **flow** (check, for example, that variables get a value before use) and **generate** (write bytecode). Syntax errors stop the first stage; name and type errors come from the second.',
    'After a syntax error, the parser tries to **recover**: it skips tokens until it finds a place where it can continue, such as the next `;` or `}`. Good recovery finds more real errors in one run; bad recovery produces follow-on errors. By default javac shows at most 100 errors (you can change that with `-Xmaxerrs`).',
    'Errors go to the **standard error** stream, and javac ends with exit code 1 instead of 0. Build tools and editors use that code to know that the build failed. In a terminal, `echo $?` right after `javac` shows the code.'
  ],
  tryIt: {
    steps: [
      'Create `Receipt.java` with the broken version from section 2 (all three mistakes).',
      'Run `javac Receipt.java` and note the three line numbers.',
      'Fix only the first error and compile again. Repeat until javac prints nothing.',
      'Run `java Receipt`.'
    ],
    see: '`3 errors`, then `2 errors`, then `1 error`, then no message at all; finally `Bread: 3`, `Milk: 2`, `Apples: 4` and `Total: 9`.'
  },
  check: [
    { q: 'In `Shop.java:14: error: \';\' expected`, what do `Shop.java` and `14` tell you?', a: 'The file to open and the line number. Look at the caret on that line; the `;` is missing at the end of it.' },
    { q: 'javac reports 6 errors. Which one do you fix first, and why?', a: 'The first one. Later errors are often follow-on errors caused by the first, and they vanish when it is fixed.' },
    { q: 'Is `cannot find symbol` a syntax error?', a: 'No. The grammar is fine, but a name is unknown: a typo, a wrong capital letter, a missing import or a variable used outside its block.' }
  ],
  keyPoints: [
    'Every message reads `File.java:LINE: error: MESSAGE`, then the line and a caret `^`.',
    'The caret shows where javac noticed the problem; the mistake is often right before it.',
    'Fix the first error, compile again, repeat.',
    'One mistake can cause many follow-on errors.',
    'Syntax errors come first; name and type errors like `cannot find symbol` come after.'
  ],
  commonMistakes: [
    'Starting with the last error in the list. Fix: always start at the top.',
    'Looking only at the caret line for a missing `;`. Fix: also check the end of the line before.',
    'Fixing many things at once and creating new errors. Fix: one change, one compile.',
    'Running `java Receipt` after a failed compile and getting an old result or `Could not find or load main class`. Fix: compile without errors first.'
  ],
  related: ['Statements and Semicolons', 'Blocks and Braces', 'Debugging'],
  glossary: [
    { term: 'syntax error', definition: 'A place where the code breaks the grammar of Java, such as a missing ; or }. The file does not compile.' },
    { term: 'caret', definition: 'The ^ symbol under a line in a javac message. It marks the column where the compiler noticed the problem.' },
    { term: 'follow-on error', definition: 'An error message caused by an earlier mistake. It disappears when the first error is fixed.' }
  ]
});
