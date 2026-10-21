// Lesson 04: the three kinds of comments, including Javadoc.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'comments',
  num: '04',
  title: 'Comments',
  category: 'grammar',
  icon: '//',
  tagline: 'Notes for humans, invisible to the machine',
  realWorld: 'Sticky notes in a recipe book. "Grandma adds more sugar here" helps the cook, but the cake does not taste the note.',
  kid: [
    'When you help in the kitchen, Mum sometimes sticks a little note in the recipe book: "careful, the oven is hot". The note is for you. The cake does not care about it.',
    'Java has notes like that. They are called comments. You write them for people. Java skips over them as if they were not there.',
    'There are three kinds. A short note for one line. A long note for many lines. And a special note that a tool turns into a help page, like the instruction booklet that comes with a toy.'
  ],
  definition: 'A **comment** is text in a source file that the compiler ignores. Java has three kinds: line comments `// ...`, block comments `/* ... */` and documentation comments `/** ... */`, called **Javadoc**.',
  explain: [
    'A **line comment** starts with `//` and runs to the end of the line. Use it for short notes, either on its own line or after a statement.',
    'A **block comment** starts with `/*` and ends with the next `*/`. It can span many lines, or sit in the middle of a line: `area(1, /* width */ 4)`. Block comments do not nest: the first `*/` always ends the comment.',
    'A **Javadoc comment** starts with `/**` (two stars) and stands right before a class, a method or a field. The `javadoc` tool, which comes with the JDK, reads these comments and builds HTML help pages from them. Editors such as VS Code show them when you hover over a name.',
    'Inside Javadoc you can use **tags**, words that start with `@`. `@param width the width in metres` describes one input of a method, and `@return` describes what the method gives back.',
    'Good comments explain **why** the code does something, or what a reader cannot see from the code itself. They do not repeat what a clear line already says. Comments that no longer match the code are worse than no comments.'
  ],
  why: 'Code tells the computer what to do. Comments tell the next human (often you, a month later) why it is done this way. Javadoc turns those notes into documentation that tools can show.',
  whenUse: 'Use `//` for short notes, `/* */` for longer notes or to switch off a few lines while testing, and `/** */` on every public class and method that other people will use.',
  syntax: '`// note to end of line` · `/* note over one or more lines */` · `/** Javadoc with @param and @return tags */`',
  fileName: 'Comments.java',
  code: `/**
 * Prints the area of a small garden.
 * This is a Javadoc comment: it documents the class.
 */
public class Comments {

    /**
     * Works out the area of a rectangle.
     *
     * @param width  the width in metres
     * @param height the height in metres
     * @return the area in square metres
     */
    public static int area(int width, int height) {
        return width * height;
    }

    public static void main(String[] args) {
        // A line comment: the garden is 5 by 3 metres
        int garden = area(5, 3);

        /* A block comment can span
           several lines. */
        System.out.println("Garden area: " + garden);

        System.out.println("Path: " + area(1, /* width */ 4));
        // System.out.println("This line is switched off");
        System.out.println("// inside quotes is plain text");
    }
}`,
  output: `Garden area: 15
Path: 4
// inside quotes is plain text`,
  codeSummary: 'All three kinds of comments in one file. The program also has a small **method** `area`: a named piece of code that takes two numbers and returns their product. You learn methods in [Methods](../methods/index.html).',
  codeExplanation: [
    { label: 'Lines 1–4', code: '/**\n * Prints the area of a small garden.\n */', text: 'A Javadoc comment for the class. It starts with `/**` and stands right before `public class`.' },
    { label: 'Lines 7–13', code: '/**\n * Works out the area of a rectangle.\n * @param width  the width in metres\n * @return the area in square metres\n */', text: 'A Javadoc comment for the method. Each `@param` describes one input, `@return` describes the result.' },
    { label: 'Line 14', code: 'public static int area(int width, int height) {', text: 'The method that the Javadoc describes. It gets a width and a height.' },
    { label: 'Line 15', code: 'return width * height;', text: 'Hands the product back to whoever called `area`.' },
    { label: 'Line 19', code: '// A line comment: the garden is 5 by 3 metres', text: 'A line comment. Everything from `//` to the end of the line is ignored.' },
    { label: 'Lines 22–23', code: '/* A block comment can span\n   several lines. */', text: 'A block comment over two lines. It ends at the first `*/`.' },
    { label: 'Line 26', code: 'System.out.println("Path: " + area(1, /* width */ 4));', text: 'A block comment in the middle of a line. The compiler sees `area(1, 4)`.' },
    { label: 'Line 27', code: '// System.out.println("This line is switched off");', text: 'A statement turned into a comment. It does not run. This is called **commenting out**.' },
    { label: 'Line 28', code: 'System.out.println("// inside quotes is plain text");', text: 'Inside a string, `//` is ordinary text, not a comment. It is printed.' }
  ],
  sections: [
    {
      title: 'What happens to each kind',
      text: [
        'The compiler throws all comments away before it checks the grammar. Nothing of them ends up in the `.class` file.',
        'Javadoc comments take a second road too: the `javadoc` tool reads them and writes web pages.'
      ],
      mermaid: 'flowchart LR\n  SRC["Comments.java"] --> LEX["javac reads tokens"]\n  LEX -->|"// and /* */ and /** */ dropped"| CLS["Comments.class"]\n  SRC --> JD["javadoc tool"]\n  JD -->|"reads only /** */"| HTML["HTML help pages"]',
      diagramNote: 'Top road: compiling ignores every comment. Bottom road: the `javadoc` tool uses the `/** */` comments to build documentation.'
    },
    {
      title: 'The three kinds side by side',
      table: {
        head: ['Kind', 'Starts', 'Ends', 'Typical use'],
        rows: [
          ['line comment', '`//`', 'end of the line', 'short note, comment out one line'],
          ['block comment', '`/*`', 'the next `*/`', 'longer note, switch off several lines'],
          ['Javadoc comment', '`/**`', 'the next `*/`', 'document a class, method or field']
        ],
        note: 'A Javadoc comment is a block comment that starts with an extra `*`. The stars at the start of the middle lines are only decoration.'
      }
    },
    {
      title: 'Block comments do not nest',
      text: [
        'A block comment ends at the **first** `*/`. If you put one block comment inside another, the inner `*/` ends both. The outer `*/` is left over, and the compiler tries to read it as code.',
        'When you switch off code that already contains `/* */`, use `//` on each line instead. Most editors do that with Ctrl+/ (Cmd+/ on macOS).'
      ],
      fileName: 'NestedComment.java',
      noRun: true,
      code: `public class NestedComment {
    public static void main(String[] args) {
        /* outer note
           /* inner note */
        */
        System.out.println("Hi");
    }
}`,
      output: `NestedComment.java:5: error: illegal start of expression
        */
        ^
NestedComment.java:5: error: illegal start of expression
        */
         ^
2 errors`
    },
    {
      title: 'Javadoc tags',
      text: ['Tags give Javadoc a fixed structure, so the tool can build a neat table of parameters and results.'],
      table: {
        head: ['Tag', 'Meaning', 'Example'],
        rows: [
          ['`@param`', 'one input of a method', '`@param width the width in metres`'],
          ['`@return`', 'what the method gives back', '`@return the area in square metres`'],
          ['`@throws`', 'an error the method may signal', '`@throws IllegalArgumentException if width is negative`'],
          ['`@author`', 'who wrote the class', '`@author Mina`'],
          ['`@since`', 'the version that added it', '`@since 1.2`'],
          ['`@see`', 'a link to a related class or method', '`@see Math#max`']
        ],
        note: 'Errors like `IllegalArgumentException` are taught in [Exceptions](../exceptions/index.html).'
      }
    },
    {
      title: 'Turn Javadoc into a web page',
      text: [
        'Run the `javadoc` tool on the example file. `-d docs` names the folder for the output. The tool prints lines like `Generating docs/Comments.html...` and creates `docs/index.html`.',
        'It also prints `2 warnings`: `main` has no Javadoc comment, and the class has no documented constructor. Warnings point at missing documentation; the pages are still built.',
        'Open `docs/index.html` in a browser and click **Comments**. You see the class description, the method `area` with its two parameters and its return value, and `main`. Only `public` classes and methods are documented by default.'
      ],
      codeLanguage: 'bash',
      fileName: 'Terminal',
      code: `javadoc -d docs Comments.java
open docs/index.html        # macOS; on Linux: xdg-open docs/index.html`
    },
    {
      title: 'Good comments say why',
      text: ['A comment that repeats the code adds reading time and no knowledge. A comment that explains a reason saves the next reader real work.'],
      table: {
        head: ['Weak comment', 'Better'],
        rows: [
          ['`// add 1 to count`', 'no comment needed: `count = count + 1;` says it'],
          ['`// set x to 7`', 'rename: `int daysPerWeek = 7;`'],
          ['`// loop`', '`// skip the header row, it holds column names`'],
          ['`// fix`', '`// the shop API sends prices in cents, so divide by 100`']
        ]
      },
      tip: 'If you need a comment to explain what a name means, choose a better name first. The Naming Conventions lesson in this topic shows how.'
    }
  ],
  technical: [
    'During lexical translation, javac replaces each comment with whitespace. That is why `int/* note */score` still works as `int score`: the comment separates the two words like a space would.',
    'The lexer knows whether it is inside a string. Inside `"..."`, the characters `//` and `/*` are text, so they do not start a comment. Inside a comment, a `"` is only text.',
    'Comments never reach the `.class` file, so they cost nothing when the program runs. Javadoc is different only for the `javadoc` tool, which parses the source again and keeps the `/** */` comments that stand right before a declaration.'
  ],
  tryIt: {
    steps: [
      'Create `Comments.java`, paste the example, compile and run it.',
      'Remove the `//` in front of `System.out.println("This line is switched off");`, compile and run again.',
      'Run `javadoc -d docs Comments.java`, open `docs/index.html` in your browser and click **Comments**. Find the method `area`.'
    ],
    see: 'first three lines of output; then a fourth line `This line is switched off`; then a web page that lists `area(int width, int height)` with the parameter descriptions.'
  },
  check: [
    { q: 'What are the three kinds of comments and how does each start?', a: 'Line comment `//`, block comment `/*`, Javadoc comment `/**`. Block and Javadoc comments end with `*/`.' },
    { q: 'Why does `/* a /* b */ c */` cause an error?', a: 'Block comments do not nest. The first `*/` (after `b`) ends the comment, so `c */` is read as code.' },
    { q: 'Is `"// hello"` inside a string a comment?', a: 'No. Inside quotes, `//` is text. The program prints `// hello`.' }
  ],
  keyPoints: [
    'The compiler ignores comments; they are notes for humans.',
    '`//` runs to the end of the line; `/* */` can span lines and does not nest.',
    '`/** */` is Javadoc: it stands before a class or method and feeds the `javadoc` tool.',
    'Use `@param` and `@return` to describe a method in Javadoc.',
    'Comment the why, not the what; keep comments in step with the code.'
  ],
  commonMistakes: [
    'Nesting block comments: `/* outer /* inner */ */`. Fix: use `//` on each line when you switch off code.',
    'Writing Javadoc with one star: `/* Works out the area */`. Fix: start with `/**`, or the `javadoc` tool skips it.',
    'Commenting every line: `int count = 0; // set count to 0`. Fix: delete the comment, the code says it.',
    'Leaving old comments after a change: `// prints the total` above code that now prints the average. Fix: update or delete the comment.'
  ],
  related: ['Whitespace and Indentation', 'Naming Conventions', 'Methods'],
  glossary: [
    { term: 'Javadoc', definition: 'A documentation comment that starts with /** and stands before a class, method or field. The javadoc tool turns it into HTML pages.' },
    { term: 'commenting out', definition: 'Putting // or /* */ around code so it does not run, for example while testing.' }
  ]
});
