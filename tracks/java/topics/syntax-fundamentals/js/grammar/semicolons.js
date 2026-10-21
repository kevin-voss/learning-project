// Lesson 01: statements and semicolons.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'semicolons',
  num: '01',
  title: 'Statements and Semicolons',
  category: 'grammar',
  icon: ';',
  tagline: 'One instruction, one full stop',
  realWorld: 'A semicolon is the full stop at the end of a sentence in a picture book. When you see the dot, you know one sentence is over and the next one starts.',
  kid: [
    'Imagine you tell your little robot: "Take the cup. Fill it with water. Bring it to me." You stop after each order, so the robot knows where one order ends.',
    'Java is like that robot, but it does not hear your voice stop. It needs a sign you can see. That sign is the semicolon `;`.',
    'If you forget the sign, the robot glues two orders together: "Fill it with water bring it to me". That makes no sense, so it stops and tells you where it got confused.'
  ],
  definition: 'A **statement** is one complete instruction in Java. Most statements end with a semicolon `;`, which tells the compiler exactly where the instruction stops.',
  explain: [
    'The **compiler** is the program `javac`. It reads your `.java` file as one long stream of characters. It does not care where a line ends. The semicolon is the real end marker, not the line break.',
    'You meet three kinds of statements in your first programs. A **declaration** creates a variable: `int score = 10;`. A variable is a named box that holds a value; you learn all about it in [Types and Variables](../types-and-variables/index.html). An **assignment** puts a new value into the box: `score = score + 5;`. A **method call** asks Java to do a job: `System.out.println(score);`.',
    'An **expression** is a piece of code that produces a value, like `score + 5` or `"Hi " + name`. An expression alone is not a statement. Only some expressions become a statement when you add `;`: assignments, method calls and a few more. `score + 5;` alone is an error, because Java would compute a value and throw it away.',
    'Some lines do not end with a semicolon. A line that opens a **block** with `{` (a class, a method, an `if`) ends with the brace. The block ends with `}`, and there is no semicolon after it.',
    'Because line breaks do not matter, one statement can run over several lines, and two statements can share one line. Both compile. While you learn, write one statement per line.'
  ],
  why: 'Java ignores line breaks, so it needs a visible mark to separate instructions. The mark lets you split a long statement over several lines without changing its meaning.',
  whenUse: 'After every declaration, assignment and method call. Never after the `}` of a class or method, and never directly after `if (...)`.',
  syntax: '`type name = value;` (declaration) · `name = expression;` (assignment) · `methodName(arguments);` (method call)',
  fileName: 'Semicolons.java',
  code: `public class Semicolons {
    public static void main(String[] args) {
        // A declaration statement: creates a box named score
        int score = 10;

        // An assignment statement: puts a new value into the box
        score = score + 5;

        // A method call statement: prints the value
        System.out.println("Score: " + score);

        // One statement may run over several lines
        System.out.println(
            "Bonus round: " + (score * 2)
        );

        // Two statements on one line compile, but are harder to read
        score = 0; System.out.println("Reset: " + score);
    }
}`,
  output: `Score: 15
Bonus round: 30
Reset: 0`,
  codeSummary: 'The program makes a variable, changes it and prints it. Every instruction ends with `;`, even the one that runs over three lines.',
  codeExplanation: [
    { label: 'Line 1', code: 'public class Semicolons {', text: 'Opens the class block. The line ends with `{`, not with a semicolon.' },
    { label: 'Line 2', code: 'public static void main(String[] args) {', text: 'Opens the `main` method block. The program starts here.' },
    { label: 'Line 4', code: 'int score = 10;', text: 'A declaration statement. It creates a whole-number box called `score` and puts `10` in it. The `;` ends it.' },
    { label: 'Line 7', code: 'score = score + 5;', text: 'An assignment statement. Java first computes the expression `score + 5` (15), then stores it in `score`.' },
    { label: 'Line 10', code: 'System.out.println("Score: " + score);', text: 'A method call statement. `println` prints the text and starts a new line.' },
    { label: 'Lines 13–15', code: 'System.out.println(\n    "Bonus round: " + (score * 2)\n);', text: 'One statement over three lines. The compiler reads until it finds the `;` on line 15.' },
    { label: 'Line 18', code: 'score = 0; System.out.println("Reset: " + score);', text: 'Two statements on one line. Each one has its own `;`. It works, but one statement per line is easier to read.' },
    { label: 'Lines 19–20', code: '}', text: 'The closing braces end the method and the class. No semicolon after them.' }
  ],
  sections: [
    {
      title: 'Where a statement ends',
      text: [
        'Read the code the way the compiler does: from left to right, ignoring line breaks. Each `;` closes one instruction. Then the next one starts.',
        'That is why the error for a missing semicolon often points at the end of a line: the compiler reached the next word and noticed the statement never ended.'
      ],
      mermaid: 'flowchart LR\n  A["int score = 10"] --> S1[";"]\n  S1 --> B["score = score + 5"]\n  B --> S2[";"]\n  S2 --> C["System.out.println(score)"]\n  C --> S3[";"]',
      diagramNote: 'Three statements in a row. Each box is one instruction; each `;` is its full stop.'
    },
    {
      title: 'Which lines get a semicolon',
      text: ['Look at how a line ends. Instructions end with `;`. Lines that open a block end with `{`. Lines that close a block are a lone `}`.'],
      table: {
        head: ['Line', 'Ends with', 'Why'],
        rows: [
          ['`int score = 10;`', '`;`', 'declaration: an instruction'],
          ['`score = score + 5;`', '`;`', 'assignment: an instruction'],
          ['`System.out.println(score);`', '`;`', 'method call: an instruction'],
          ['`public class Semicolons {`', '`{`', 'opens the class block'],
          ['`public static void main(String[] args) {`', '`{`', 'opens the method block'],
          ['`if (score > 10) {`', '`{`', 'opens the block of the `if`'],
          ['`}`', 'nothing', 'closes a block']
        ],
        note: 'Inside `for (int i = 0; i < 3; i++)` the two semicolons separate the three parts of the loop header. You meet that loop in [Control Flow](../control-flow/index.html).'
      }
    },
    {
      title: 'Wrong vs right: the missing semicolon',
      text: [
        'Here line 3 has no `;`. The program does not compile. The panel below the code shows what `javac MissingSemicolon.java` prints.',
        'The message names the file, the line (`3`) and the problem (`\';\' expected`). The caret `^` stands right after `10`, where the semicolon belongs. Add `;` after `10` and the program compiles.'
      ],
      fileName: 'MissingSemicolon.java',
      noRun: true,
      code: `public class MissingSemicolon {
    public static void main(String[] args) {
        int score = 10
        System.out.println(score);
    }
}`,
      output: `MissingSemicolon.java:3: error: ';' expected
        int score = 10
                      ^
1 error`,
      tip: 'When the caret points at the start of a line, look at the end of the line above. The missing `;` is usually there.'
    },
    {
      title: 'The empty statement trap',
      text: [
        'A lone `;` is a statement too: the **empty statement**. It does nothing. That sounds harmless, but it can hide a bug.',
        'An `if` runs the next statement only when its condition is true. You learn `if` in [Control Flow](../control-flow/index.html). Below, the `;` right after `if (score > 100)` is that next statement. The block in braces is no longer part of the `if`, so it always runs.'
      ],
      fileName: 'EmptyStatement.java',
      code: `public class EmptyStatement {
    public static void main(String[] args) {
        int score = 15;

        if (score > 100); // this ; ends the if right here
        {
            System.out.println("You win!");
        }

        System.out.println("Done");
    }
}`,
      output: `You win!
Done`,
      warn: 'The score is only 15, but the program prints `You win!`. Never put `;` directly after `if (...)`, `for (...)` or `while (...)`.'
    },
    {
      title: 'Not every expression is a statement',
      text: [
        'An expression that only computes a value cannot stand alone. Java rejects it, because the result would be lost.',
        'Store the value instead: `score = score + 1;`. Now it is an assignment, and assignments are allowed as statements.'
      ],
      fileName: 'NotStatement.java',
      noRun: true,
      code: `public class NotStatement {
    public static void main(String[] args) {
        int score = 4;
        score + 1;
    }
}`,
      output: `NotStatement.java:4: error: not a statement
        score + 1;
              ^
1 error`
    }
  ],
  technical: [
    'javac works in steps. First the **lexer** (also called scanner) cuts the characters into **tokens**: words, numbers, symbols. `int score = 10;` becomes five tokens: `int`, `score`, `=`, `10`, `;`. Spaces and line breaks only separate tokens and are then dropped.',
    'Then the **parser** checks the tokens against the grammar of Java, written down in the Java Language Specification (JLS). The rule for a local variable declaration says: type, name, optional `=` and value, then `;`. When the parser expects `;` and finds another token, it reports `\';\' expected` at the end of the previous token.',
    'Semicolons exist only for the parser. The `.class` file that javac writes contains **bytecode**, a list of small machine instructions for the JVM. It has no semicolons, braces or line breaks at all.'
  ],
  tryIt: {
    steps: [
      'Create `Semicolons.java` and paste the example. Compile with `javac Semicolons.java` and run with `java Semicolons`.',
      'Delete the `;` at the end of `score = score + 5;` and compile again. Read the line number and the caret.',
      'Put the `;` back. Then join lines 13 to 15 into one line and compile again.'
    ],
    see: 'first the three output lines, then `Semicolons.java:7: error: \';\' expected`, then the same three lines again after the fixes.'
  },
  check: [
    { q: 'Does a line break end a statement in Java?', a: 'No. The compiler ignores line breaks. Only the `;` ends a statement, so one statement may span several lines.' },
    { q: 'Which of these need a semicolon: `int age = 9`, `public class Dog {`, `System.out.println(age)`, `}`?', a: '`int age = 9;` and `System.out.println(age);`. The class line ends with `{`, and the closing `}` stands alone.' },
    { q: 'Why does `if (score > 100);` cause a bug?', a: 'The `;` is an empty statement. It becomes the body of the `if`, so the block after it runs every time.' }
  ],
  keyPoints: [
    'A statement is one complete instruction. Most statements end with `;`.',
    'Declarations, assignments and method calls end with `;`.',
    'Lines that open a block end with `{`. A closing `}` needs no `;`.',
    'Line breaks do not end statements. One statement may span several lines.',
    'A missing `;` is often reported at the end of the line before the caret.'
  ],
  commonMistakes: [
    'Forgetting the `;` after a method call: `System.out.println("Hi")`. Fix: `System.out.println("Hi");`.',
    'Putting `;` after a condition: `if (score > 100);`. Fix: remove it so the block belongs to the `if`.',
    'Ending a class or method with `};`. It compiles, but the extra `;` is noise. Fix: write a lone `}`.',
    'Writing an expression alone: `score + 1;`. Fix: store it, `score = score + 1;`.'
  ],
  related: ['Blocks and Braces', 'Reading Syntax Errors', 'Getting Started'],
  glossary: [
    { term: 'statement', definition: 'One complete instruction in Java, such as a declaration, an assignment or a method call. Most statements end with a semicolon.' },
    { term: 'expression', definition: 'A piece of code that produces a value, such as score + 5.' },
    { term: 'token', definition: 'The smallest piece the compiler reads: a word, a number, a symbol or a piece of text in quotes.' }
  ]
});
