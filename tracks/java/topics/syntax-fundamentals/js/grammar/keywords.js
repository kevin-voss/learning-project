// Lesson 05 (new): keywords, contextual keywords and reserved literals.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'keywords',
  num: '05',
  title: 'Keywords',
  category: 'grammar',
  icon: 'kw',
  tagline: 'Words that already belong to Java',
  realWorld: 'The words on a traffic sign: STOP always means stop. You cannot name your dog "STOP" and expect drivers to understand.',
  kid: [
    'In a game of tag, some words are special. When someone shouts "Freeze!", everybody stops. You cannot call your teddy bear "Freeze", because then everybody would stop each time you called it.',
    'Java has special words like that. `class` means "here comes a class". `if` means "only when this is true". They are called keywords.',
    'Because these words already have a job, you cannot use them as names for your own things. All other words are free for you to use.'
  ],
  definition: 'A **keyword** is a word with a fixed meaning in the Java language, such as `class`, `public`, `int` or `if`. Keywords are **reserved**: you cannot use them as names for your own classes, variables or methods.',
  explain: [
    'Java 21 has 51 reserved keywords. They are always written in lowercase. You already met some in your first program: `public`, `class`, `static` and `void`.',
    'Words like `String`, `System` and `main` look important, but they are not keywords. `String` and `System` are names of classes that come with Java. `main` is a method name that the JVM looks for. Because they are names, Java treats `String` and `string` as different words.',
    'A **contextual keyword** has a special meaning only in one spot and is a normal name everywhere else. `var`, `record` and `yield` are examples. Java added them late, and making them reserved would have broken old programs that used them as names.',
    'The words `true`, `false` and `null` are **literals**: fixed values written straight into the code. They are not keywords, but they are reserved too, so you cannot use them as names.',
    'Two keywords, `goto` and `const`, are reserved but do nothing. Java blocks them on purpose, so that people coming from other languages get a clear error instead of strange behaviour.'
  ],
  why: 'Keywords let the compiler recognise the structure of your code. When it sees `class`, it knows a class declaration follows; when it sees `if`, it expects a condition in parentheses.',
  whenUse: 'You use keywords in every line of Java. You need to know the list mainly so that you never choose one as a name.',
  syntax: 'keywords are lowercase words with a fixed job: `public class Name { ... }` · `if (condition) { ... } else { ... }` · `int count = 0;`',
  fileName: 'Keywords.java',
  code: `public class Keywords {
    public static void main(String[] args) {
        // Keywords here: public, class, static, void, int, boolean, if, else
        int apples = 3;
        boolean hungry = true;

        if (hungry) {
            System.out.println("Eat an apple");
        } else {
            System.out.println("Keep the apples");
        }

        // true, false and null are literals: fixed values, not names
        String nothing = null;
        System.out.println("Nothing: " + nothing);

        // record is a contextual keyword, so it works as a normal name here
        int record = 42;
        System.out.println("Record score: " + record);
        System.out.println("Apples: " + apples);
    }
}`,
  output: `Eat an apple
Nothing: null
Record score: 42
Apples: 3`,
  codeSummary: 'The program uses eight keywords, the literals `true` and `null`, and the contextual keyword `record` as an ordinary variable name.',
  codeExplanation: [
    { label: 'Line 1', code: 'public class Keywords {', text: '`public` and `class` are keywords. `Keywords` is a name you chose.' },
    { label: 'Line 2', code: 'public static void main(String[] args) {', text: '`public`, `static` and `void` are keywords. `main`, `String` and `args` are names, not keywords.' },
    { label: 'Line 4', code: 'int apples = 3;', text: '`int` is the keyword for whole numbers. `apples` is your name.' },
    { label: 'Line 5', code: 'boolean hungry = true;', text: '`boolean` is the keyword for yes/no values. `true` is a literal.' },
    { label: 'Lines 7–11', code: 'if (hungry) { ... } else { ... }', text: '`if` and `else` choose between two blocks. `hungry` is `true`, so the first block runs.' },
    { label: 'Line 14', code: 'String nothing = null;', text: '`null` is a literal that means "no object". Printing it shows the word `null`.' },
    { label: 'Line 18', code: 'int record = 42;', text: '`record` is a contextual keyword. Outside a record declaration, it is a normal name.' },
    { label: 'Line 20', code: 'System.out.println("Apples: " + apples);', text: '`System` is a class name, `out` and `println` are names too. No keywords on this line.' }
  ],
  sections: [
    {
      title: 'The keywords you already know',
      text: ['Look at the first two lines of any program. Some words are keywords, others are names that look like keywords.'],
      table: {
        head: ['Word', 'Keyword?', 'What it is'],
        rows: [
          ['`public`', 'yes', 'everybody may use this class or method'],
          ['`class`', 'yes', 'a class declaration starts here'],
          ['`static`', 'yes', 'belongs to the class itself, not to an object'],
          ['`void`', 'yes', 'the method gives nothing back'],
          ['`main`', 'no', 'a method name the JVM looks for'],
          ['`String`', 'no', 'a class from the package `java.lang`'],
          ['`System`', 'no', 'a class from the package `java.lang`'],
          ['`args`', 'no', 'a parameter name; you could call it `input`']
        ],
        note: 'Objects and `static` are explained in [Classes and Objects](../classes-and-objects/index.html).'
      }
    },
    {
      title: 'All 51 reserved keywords, sorted by job',
      text: ['You do not need to learn this list by heart. Read it once so the words look familiar, and come back when you meet a new one.'],
      table: {
        head: ['Job', 'Keywords'],
        rows: [
          ['types of values', '`boolean` `byte` `char` `short` `int` `long` `float` `double` `void`'],
          ['classes and objects', '`class` `interface` `enum` `extends` `implements` `new` `this` `super` `instanceof`'],
          ['access and modifiers', '`public` `private` `protected` `static` `final` `abstract`'],
          ['rare modifiers', '`synchronized` `native` `transient` `volatile` `strictfp`'],
          ['files and packages', '`package` `import`'],
          ['control flow', '`if` `else` `switch` `case` `default` `for` `while` `do` `break` `continue` `return`'],
          ['errors', '`try` `catch` `finally` `throw` `throws` `assert`'],
          ['reserved, unused', '`goto` `const`'],
          ['the underscore', '`_` (a single underscore on its own)']
        ],
        note: '9 + 9 + 6 + 5 + 2 + 11 + 6 + 2 + 1 = 51. Every keyword is lowercase, so `Class` or `IF` would be ordinary names (bad ones).'
      }
    },
    {
      title: 'Is this word a keyword?',
      text: ['The compiler decides in a fixed order. Follow the arrows for any word in your code.'],
      mermaid: 'flowchart TD\n  W["a word in your code"] --> K{"one of the 51 reserved keywords?"}\n  K -->|yes| R["fixed meaning, never a name"]\n  K -->|no| L{"true, false or null?"}\n  L -->|yes| V["a literal value, never a name"]\n  L -->|no| C{"var, record, yield ... in its special spot?"}\n  C -->|yes| S["special meaning in this spot only"]\n  C -->|no| N["an identifier: a name you or Java chose"]',
      diagramNote: 'Only the last box is free for your own names. Contextual keywords end there too when they are not in their special spot.'
    },
    {
      title: 'Wrong vs right: a keyword as a name',
      text: [
        'Here `class` is used as a variable name. The compiler sees the keyword `class` where a name should be and gets confused. It reports several errors for one mistake.',
        'Fix: choose a name that is not reserved, for example `int schoolClass = 5;` or `int group = 5;`.'
      ],
      fileName: 'KeywordName.java',
      noRun: true,
      code: `public class KeywordName {
    public static void main(String[] args) {
        int class = 5;
        System.out.println(class);
    }
}`,
      output: `KeywordName.java:3: error: not a statement
        int class = 5;
        ^
KeywordName.java:3: error: ';' expected
        int class = 5;
           ^
KeywordName.java:3: error: <identifier> expected
        int class = 5;
                 ^
KeywordName.java:4: error: illegal start of expression
        System.out.println(class);
                           ^
KeywordName.java:4: error: <identifier> expected
        System.out.println(class);
                                ^
5 errors`,
      tip: '`<identifier> expected` means "a name should be here". When you see it, check whether the word at the caret is a keyword.'
    },
    {
      title: 'Contextual keywords',
      text: ['These words are names everywhere except in one special spot. You meet most of them much later; the list is here so you are not surprised.'],
      table: {
        head: ['Word', 'Special spot', 'Where you learn it'],
        rows: [
          ['`var`', 'a local variable whose type Java works out: `var count = 3;`', '[Types and Variables](../types-and-variables/index.html)'],
          ['`record`', 'a short class that only holds data', '[Classes and Objects](../classes-and-objects/index.html)'],
          ['`yield`', 'the value of a `switch` expression', '[Control Flow](../control-flow/index.html)'],
          ['`sealed`, `non-sealed`, `permits`', 'limit which classes may extend a class', 'later, in larger projects'],
          ['`when`', 'an extra condition in a `switch` pattern', 'later'],
          ['`module`, `requires`, `exports`, `opens`, `open`, `uses`, `provides`, `to`, `with`, `transitive`', 'only in a `module-info.java` file', 'later, with Java modules']
        ]
      }
    }
  ],
  technical: [
    'The lexer turns every reserved keyword into its own kind of token, not into an identifier token. That is why `int class = 5;` fails so early: the parser expected an identifier token after `int` and got the token for `class`.',
    'Contextual keywords stay identifier tokens. The parser looks at their position to decide. For `record Point(int x, int y) {}` it sees `record` followed by a name and `(` and treats it as a record declaration; in `int record = 42;` it sees a type before it and treats it as a variable name.',
    'Since Java 9, a lone `_` is a keyword. In Java 21 javac rejects `int _ = 1;` and says that unnamed variables are not supported in that version. From Java 22 on, `_` marks a variable you do not intend to use.'
  ],
  tryIt: {
    steps: [
      'Create `Keywords.java`, paste the example, compile and run it.',
      'Change `int record = 42;` to `int class = 42;` and the next line to use `class`. Compile and count the errors.',
      'Change the name to `int highScore = 42;` (and the next line). Compile and run.'
    ],
    see: 'first four output lines; then several errors such as `<identifier> expected`; after the rename, `Record score: 42` again.'
  },
  check: [
    { q: 'Are `String` and `main` keywords?', a: 'No. `String` is a class name and `main` is a method name. Keywords are all lowercase words from the fixed list, such as `class` or `void`.' },
    { q: 'Can you name a variable `true`?', a: 'No. `true`, `false` and `null` are reserved literals, so they cannot be names.' },
    { q: 'Why does `int record = 42;` compile, but `int class = 42;` does not?', a: '`record` is a contextual keyword: special only in a record declaration. `class` is a reserved keyword: never a name.' }
  ],
  keyPoints: [
    'A keyword has a fixed meaning and cannot be used as a name.',
    'Java 21 has 51 reserved keywords, all lowercase.',
    '`true`, `false` and `null` are reserved literals, not keywords, and cannot be names either.',
    'Contextual keywords like `var`, `record` and `yield` are special only in one spot.',
    '`String`, `System` and `main` are names, not keywords.'
  ],
  commonMistakes: [
    'Using a keyword as a name: `int class = 5;` or `String new = "x";`. Fix: `int schoolClass = 5;`, `String newName = "x";`.',
    'Capitalising a keyword: `Public class Hello` or `If (x)`. Fix: keywords are lowercase, `public`, `if`.',
    'Thinking `string` is the same as `String`. Fix: write `String` with a capital S; it is a class name and case matters.',
    'Writing `int _ = 1;` in Java 21. Fix: give the variable a real name.'
  ],
  related: ['Identifiers', 'Naming Conventions', 'Types and Variables'],
  glossary: [
    { term: 'keyword', definition: 'A reserved word with a fixed meaning in Java, such as class, if or int. It cannot be used as a name.' },
    { term: 'contextual keyword', definition: 'A word like var, record or yield that is special only in one spot and an ordinary name everywhere else.' },
    { term: 'literal', definition: 'A fixed value written in the code, such as 42, "Hi", true or null.' }
  ]
});
