// Lesson 03 (new): whitespace, tokens and indentation.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'whitespace',
  num: '03',
  title: 'Whitespace and Indentation',
  category: 'grammar',
  icon: '⇥',
  tagline: 'Spaces separate words, indentation shows shape',
  realWorld: 'The gaps between words in a book. "Ilikeapples" is hard to read, "I like apples" is easy, and "I   like   apples" still means the same thing.',
  kid: [
    'When you write a sentence, you leave a little gap between words. Without gaps, all the words melt into one long word. With three gaps instead of one, the sentence still means the same.',
    'Java reads gaps the same way. A gap keeps two words apart. How big the gap is does not matter to Java.',
    'People also push lines a bit to the right to show what is inside what, like a shopping list where "apples" and "pears" sit under "fruit". Java does not care about that push. It is a gift for the person who reads your code.'
  ],
  definition: '**Whitespace** means spaces, tabs and line breaks. Java uses whitespace only to keep tokens apart; otherwise the compiler ignores it, so **indentation** (the spaces at the start of a line) is there for humans.',
  explain: [
    'A **token** is the smallest piece the compiler reads: a word like `int`, a name like `depth`, a number like `2`, a symbol like `=` or `;`, or a piece of text in quotes like `"Area: "`.',
    'Between two words, you need at least one whitespace character: `int depth` is two tokens, but `intdepth` is one unknown name. Between a word and a symbol, whitespace is optional: `depth=2` and `depth = 2` are the same three tokens.',
    'Inside a **string literal** (text between double quotes), whitespace is part of the text. `"A  B"` prints two spaces. The compiler keeps every character between the quotes.',
    '**Indentation** shows how blocks nest. Java code usually indents 4 spaces for each level: the class body by 4, the method body by 8, the body of an `if` inside the method by 12. Some teams use 2 spaces. Pick one and keep it the same in every file.',
    'The usual Java **brace style** puts `{` at the end of the line that opens the block, and `}` on its own line, lined up with the start of that opening line. That is the style of every example on this page.'
  ],
  why: 'Free whitespace lets you lay out code so its shape is visible. Clear layout is how you spot a wrong brace or a misplaced line before the compiler or a user does.',
  whenUse: 'Always. Put one statement per line, one space around operators like `=` and `+`, and one indentation level per block. Let your editor format the file.',
  syntax: 'one space between words: `int width = 4;` · 4 spaces per block level · `{` at the line end, `}` on its own line',
  fileName: 'Whitespace.java',
  code: `public class Whitespace {
    public static void main(String[] args) {
        // Tidy: one statement per line, 4 spaces per level
        int width = 4;
        int height = 3;
        System.out.println("Area: " + width * height);

        // Messy, but the compiler reads the very same kind of tokens
        int   depth=2   ;   System.out.println(
              "Volume: "+width*height*depth);

        // Inside a string, every space counts
        System.out.println("A  B");
        System.out.println("A B");
    }
}`,
  output: `Area: 12
Volume: 24
A  B
A B`,
  codeSummary: 'The tidy lines and the messy lines both compile, because spaces between tokens do not matter. Inside quotes, spaces do matter: the two last lines print differently.',
  codeExplanation: [
    { label: 'Line 2', code: '    public static void main(String[] args) {', text: 'Indented by 4 spaces: the method is inside the class.' },
    { label: 'Line 4', code: '        int width = 4;', text: 'Indented by 8 spaces: the statement is inside the method. One space around `=` makes it easy to read.' },
    { label: 'Line 6', code: 'System.out.println("Area: " + width * height);', text: 'Prints `Area: 12`. The space after the colon is inside the quotes, so it appears in the output.' },
    { label: 'Line 9', code: 'int   depth=2   ;   System.out.println(', text: 'Extra spaces and no spaces around `=`. The tokens are still `int`, `depth`, `=`, `2`, `;`, so it compiles.' },
    { label: 'Line 10', code: '"Volume: "+width*height*depth);', text: 'The method call continues on this line. No spaces around `+` and `*`, still valid, but harder to read.' },
    { label: 'Line 13', code: 'System.out.println("A  B");', text: 'Two spaces inside the quotes. They are part of the text and are printed.' },
    { label: 'Line 14', code: 'System.out.println("A B");', text: 'One space inside the quotes prints one space. Compare the last two output lines.' }
  ],
  sections: [
    {
      title: 'Tokens: the words of Java',
      text: [
        'Before the compiler checks any grammar, it cuts your file into tokens. Whitespace decides where one word ends and the next begins. After that, the whitespace is thrown away.',
        'The diagram shows how the messy line `int   depth=2   ;` becomes five tokens. The tidy line `int depth = 2;` gives exactly the same five.'
      ],
      mermaid: 'flowchart LR\n  S["int   depth=2   ;"] --> T1["int"]\n  S --> T2["depth"]\n  S --> T3["="]\n  S --> T4["2"]\n  S --> T5[";"]',
      diagramNote: 'One line of text on the left, five tokens on the right. The spaces are gone; only the tokens reach the parser.'
    },
    {
      title: 'Where whitespace is needed, optional or forbidden',
      table: {
        head: ['Place', 'Rule', 'Example'],
        rows: [
          ['between two words', 'needed', '`int depth`, not `intdepth`'],
          ['between a word and a symbol', 'optional', '`depth=2` and `depth = 2` are the same'],
          ['inside a name or number', 'forbidden', '`first Name` is two names; `10 000` is two numbers'],
          ['inside a two-character operator', 'forbidden', '`= =` is two `=` tokens, not the comparison `==`'],
          ['inside quotes', 'kept as text', '`"A  B"` prints two spaces'],
          ['a line break inside quotes', 'forbidden', 'a normal string must end on the same line']
        ],
        note: 'Operators like `==` and `>=` are taught in [Operators](../operators/index.html).'
      }
    },
    {
      title: 'Indentation shows the shape',
      text: [
        'Each block level moves 4 spaces to the right. When you read down the left edge, you see where each block starts and ends.',
        'The closing `}` lines up with the line that opened the block. If a `}` does not line up, a brace is probably missing or extra.'
      ],
      fileName: 'Levels.java',
      code: `public class Levels {
    public static void main(String[] args) {
        int hour = 9;
        if (hour < 12) {
            System.out.println("Good morning");
        }
        System.out.println("Level 2 again");
    }
}`,
      output: `Good morning
Level 2 again`,
      table: {
        head: ['Spaces at line start', 'Level', 'What sits there'],
        rows: [
          ['0', 'file', '`public class Levels {` and the last `}`'],
          ['4', 'class body', '`public static void main(...) {`'],
          ['8', 'method body', '`int hour = 9;`, `if (...) {`'],
          ['12', 'if body', '`System.out.println("Good morning");`']
        ]
      }
    },
    {
      title: 'A string cannot cross a line break',
      text: [
        'Whitespace is free everywhere except inside quotes. A normal string literal must open and close on the same line. Here the text continues on line 4, so the compiler sees two broken strings.',
        'To join long text, close the string and use `+`: `"Hello " +` on one line and `"world"` on the next.'
      ],
      fileName: 'BrokenString.java',
      noRun: true,
      code: `public class BrokenString {
    public static void main(String[] args) {
        System.out.println("Hello
            world");
    }
}`,
      output: `BrokenString.java:3: error: unclosed string literal
        System.out.println("Hello
                           ^
BrokenString.java:4: error: unclosed string literal
            world");
                 ^
BrokenString.java:4: error: not a statement
            world");
            ^
3 errors`
    },
    {
      title: 'Let the editor format for you',
      text: [
        'You do not need to count spaces by hand. In VS Code, run **Format Document**: Shift+Alt+F on Windows and Linux, Shift+Option+F on macOS. With the Java extension installed, it indents every block and puts one space around operators.',
        'Tabs and spaces both count as whitespace. Mixing them makes code look different in different editors, so set your editor to insert spaces when you press Tab.'
      ],
      tip: 'Format before you compile. A badly indented file is often the first sign of a missing or extra brace.'
    }
  ],
  technical: [
    'The JLS calls the first step of compiling **lexical translation**. The lexer turns the characters into line terminators, whitespace, comments and tokens. Whitespace and comments are then discarded. The parser never sees them.',
    'The lexer always takes the **longest** token it can. That is why `==` is read as one comparison token, and `a+++b` is read as `a++ + b`. Spaces break this rule, so `= =` stays two separate `=` tokens.',
    'Line numbers survive, though. javac remembers the line and column of every token, so error messages and stack traces can point at the right place. Indentation changes nothing in the `.class` file; two files that differ only in spaces produce the same bytecode instructions.'
  ],
  tryIt: {
    steps: [
      'Create `Whitespace.java`, paste the example, compile and run it.',
      'Remove the space between `int` and `width` on line 4, so it reads `intwidth = 4;`. Compile and read the error.',
      'Put the space back. Then run Format Document in VS Code and look at what happens to lines 9 and 10.'
    ],
    see: 'first `Area: 12`, `Volume: 24`, `A  B`, `A B`; then an error such as `cannot find symbol` for `intwidth`; after formatting, the messy lines get tidy spacing.'
  },
  check: [
    { q: 'Do `depth=2;` and `depth = 2;` mean the same thing?', a: 'Yes. Both are the tokens `depth`, `=`, `2`, `;`. Whitespace between a name and a symbol is optional.' },
    { q: 'Why does `intscore = 5;` fail?', a: 'Without a space, `intscore` is one token: an unknown name. Between two words you need whitespace.' },
    { q: 'Where does whitespace change what your program prints?', a: 'Inside string literals. `"A  B"` prints two spaces, `"A B"` prints one.' }
  ],
  keyPoints: [
    'Whitespace is spaces, tabs and line breaks. It separates tokens and is then ignored.',
    'Two words need at least one space between them; symbols do not.',
    'Inside quotes, every space is part of the text.',
    'Indent 4 spaces per block level; `{` ends the line, `}` stands alone.',
    'Let the editor format the file; bad indentation hints at a brace mistake.'
  ],
  commonMistakes: [
    'Gluing words: `publicclass Hello`. Fix: `public class Hello`.',
    'Breaking a string over two lines: `"Hello` then `world"`. Fix: `"Hello " + "world"` with the `+` at the line end.',
    'Indenting by feeling, so `}` and its opening line do not line up. Fix: run Format Document.',
    'Splitting an operator: `if (a = = b)`. Fix: write `==` without a space.'
  ],
  related: ['Blocks and Braces', 'Comments', 'Operators'],
  glossary: [
    { term: 'whitespace', definition: 'Spaces, tabs and line breaks. Java uses them to separate tokens and otherwise ignores them.' },
    { term: 'indentation', definition: 'The spaces at the start of a line. In Java it shows humans how blocks nest; the compiler ignores it.' },
    { term: 'string literal', definition: 'Text written between double quotes in the code, such as "Area: ". Every character inside is kept.' }
  ]
});
