// Lesson 03: literals (int, long L, double, float f, underscores, hex, binary, char vs String, escapes).
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '03',
    id: 'literals',
    title: 'Literals',
    category: 'values',
    icon: '42',
    tagline: 'Values you type straight into the code',
    realWorld: 'On a shopping list you write "3 apples". The 3 is written right there on the paper. You do not have to look it up anywhere else. A literal is a value written right there in your code.',
    kid: [
      'When you write the number 42 in your program, that 42 is a literal. It is the value itself, not a name for it.',
      'Java looks at how you wrote it to know what kind of value it is. `42` is a whole number. `4.2` has a dot, so it is a decimal. `\'A\'` in small quotes is one letter. `"Apple"` in big quotes is a word.',
      'Little letters at the end change the box size: `42L` means "a big whole number", and `4.2f` means "a small decimal".'
    ],
    definition: 'A **literal** is a fixed value written directly in the source code, like `42`, `3.5`, `true`, `\'A\'` or `"Java"`. The way you write a literal tells the compiler its type.',
    explain: [
      'A whole number like `42` is an **int literal**. Add the **suffix** `L` (a letter at the end) and it becomes a `long` literal: `42L`. Without the `L`, a number bigger than 2,147,483,647 is an error, even when you store it in a `long` box.',
      'A number with a dot or an `e` (exponent) is a **double literal**: `3.5`, `0.75`, `3.0e8`. Add the suffix `f` for a `float` literal: `3.5f`. There is no suffix for `byte` and `short`: a small int literal like `12` fits into them directly.',
      'You can put underscores between digits to make long numbers readable: `1_000_000`. The compiler removes them. You can also write integers in other bases: `0xFF` is **hexadecimal** (base 16, digits 0-9 and A-F) and `0b1010` is **binary** (base 2, only 0 and 1).',
      'A **char literal** is one character in single quotes: `\'J\'`. A **String literal** is text in double quotes: `"Java"`, and it can hold zero, one or many characters. `true` and `false` are the two boolean literals. `null` is the literal for "no object", which you meet in its own lesson.',
      'Some characters cannot be typed directly inside quotes, like a line break or a double quote inside a String. You write them with an **escape sequence**: a backslash and a letter, like `\\n` for a new line.'
    ],
    why: 'Literals are how values enter your program in the first place: start values, limits, messages, test data.',
    whenUse: 'Every time you write a fixed value in code. If the same literal appears in many places, give it a name with `final` (see the lesson final and Constants).',
    syntax: '`42` int · `42L` long · `4.2` double · `4.2f` float · `0xFF` hex int · `0b1010` binary int · `1_000_000` with underscores · `\'A\'` char · `"Apple"` String · `true` / `false` boolean',
    fileName: 'Literals.java',
    code: `public class Literals {
    public static void main(String[] args) {
        // Integer literals: int unless you add L
        int count = 42;
        int million = 1_000_000;
        long worldPopulation = 8_100_000_000L;
        int hexColor = 0xFF;          // hexadecimal: base 16
        int flags = 0b1010;           // binary: base 2

        // Decimal literals: double unless you add f
        double ratio = 0.75;
        double lightSpeed = 3.0e8;    // 3.0 times 10 to the power 8
        float half = 0.5f;

        // char, String and boolean literals
        char initial = 'J';
        String language = "Java";
        boolean ready = true;

        System.out.println(count + " " + million + " " + worldPopulation);
        System.out.println(hexColor + " " + flags);
        System.out.println(ratio + " " + lightSpeed + " " + half);
        System.out.println(initial + " " + language + " " + ready);
    }
}`,
    output: `42 1000000 8100000000
255 10
0.75 3.0E8 0.5
J Java true`,
    codeSummary: 'Every kind of literal once, then printed. Underscores, `L`, `f`, hex and binary are gone in the output: Java prints the plain value.',
    codeExplanation: [
      { label: 'Line 4', code: 'int count = 42;', text: 'A plain whole number is an `int` literal.' },
      { label: 'Line 5', code: 'int million = 1_000_000;', text: 'Underscores between digits are only for your eyes. The value is one million.' },
      { label: 'Line 6', code: 'long worldPopulation = 8_100_000_000L;', text: '8.1 billion is too big for an `int` literal, so the `L` suffix makes it a `long` literal.' },
      { label: 'Line 7', code: 'int hexColor = 0xFF;          // hexadecimal: base 16', text: '`0x` starts a hexadecimal number. `FF` is 15 × 16 + 15 = 255. Colours on web pages use hex.' },
      { label: 'Line 8', code: 'int flags = 0b1010;           // binary: base 2', text: '`0b` starts a binary number. `1010` is 8 + 2 = 10.' },
      { label: 'Line 12', code: 'double lightSpeed = 3.0e8;    // 3.0 times 10 to the power 8', text: '`e8` means "times 10 to the power 8", so this is 300,000,000. Java prints it as `3.0E8`.' },
      { label: 'Line 13', code: 'float half = 0.5f;', text: 'Without the `f`, `0.5` would be a `double`, and Java refuses to squeeze it into a `float` box.' },
      { label: 'Line 16', code: "char initial = 'J';", text: 'Single quotes, exactly one character: a `char` literal.' },
      { label: 'Line 17', code: 'String language = "Java";', text: 'Double quotes: a `String` literal. It can have any number of characters.' },
      { label: 'Line 23', code: 'System.out.println(initial + " " + language + " " + ready);', text: 'A `char` plus a String gives a String, so the letter `J` is glued to the text.' }
    ],
    sections: [
      {
        title: 'How Java reads a number literal',
        text: 'The compiler looks at the characters you typed and decides the type. Follow the arrows for `42`, `42L`, `4.2` and `4.2f`.',
        mermaid: `flowchart TD
  N["a number literal"] --> Q1{"Has a dot or an e?"}
  Q1 -->|yes| Q2{"Ends with f?"}
  Q2 -->|yes| F["float, like 4.2f"]
  Q2 -->|no| D["double, like 4.2"]
  Q1 -->|no| Q3{"Ends with L?"}
  Q3 -->|yes| L["long, like 42L"]
  Q3 -->|no| I["int, like 42"]`,
        diagramNote: 'The type of the literal is decided first, before Java looks at the box you put it in.'
      },
      {
        title: 'Why the L matters',
        text: [
          'In `long stars = 8000000000;` the box is a `long`, so it looks fine. But Java reads the literal `8000000000` on its own first, and as an `int` literal it is too big. The compiler stops.',
          'Add `L`: `long stars = 8_000_000_000L;`. Always use a capital `L`. A small `l` looks like the digit `1`, so `100l` is easy to misread as `1001`.',
          'The same happens with `float speed = 0.5;`: the message is `possible lossy conversion from double to float`. Write `0.5f`.'
        ],
        fileName: 'TooBig.java',
        code: `public class TooBig {
    public static void main(String[] args) {
        long stars = 8000000000;
    }
}`,
        noRun: true,
        output: `TooBig.java:3: error: integer number too large
        long stars = 8000000000;
                     ^
1 error`
      },
      {
        title: 'Underscores: where they are allowed',
        text: 'An underscore must sit between two digits. Anywhere else is a compile error.',
        table: {
          head: ['Literal', 'Allowed?', 'Why'],
          rows: [
            ['`1_000_000`', 'yes', 'between digits'],
            ['`0xFF_FF`', 'yes', 'between hex digits'],
            ['`_100`', 'no', 'this is a name, not a number'],
            ['`100_`', 'no', 'at the end'],
            ['`3_.14`', 'no', 'next to the dot'],
            ['`100_L`', 'no', 'next to the suffix']
          ],
          note: 'Commas never work: `1,000` is two separate values, not one thousand.'
        }
      },
      {
        title: "char 'A' is not String \"A\"",
        text: [
          'Single quotes make a `char`: always exactly one character, and a primitive. Double quotes make a `String`: any number of characters, even zero (`""`, the **empty String**), and an object.',
          'They also behave differently with `+`. A `char` plus a number does maths with its Unicode number. A String plus a number glues text.'
        ],
        table: {
          head: ['', "`'A'`", '`"A"`'],
          rows: [
            ['Type', '`char` (primitive)', '`String` (reference type)'],
            ['Length', 'always 1', 'any: `"A"`, `"Apple"`, `""`'],
            ["`+ 1` gives", '`66` (a number)', '`"A1"` (text)'],
            ['Has methods?', 'no', 'yes, like `.length()`']
          ]
        },
        fileName: 'CharVsString.java',
        code: `public class CharVsString {
    public static void main(String[] args) {
        char letter = 'A';
        String word = "A";
        String longer = "Apple";
        String empty = "";

        System.out.println(letter);
        System.out.println(word);
        System.out.println(longer.length());
        System.out.println(empty.length());
        System.out.println(letter + 1);
        System.out.println(word + 1);
    }
}`,
        output: `A
A
5
0
66
A1`
      },
      {
        title: 'Escape sequences for special characters',
        text: 'A backslash `\\` inside quotes starts an escape sequence. The backslash and the next character together stand for one special character.',
        table: {
          head: ['Write', 'Means'],
          rows: [
            ['`\\n`', 'new line'],
            ['`\\t`', 'tab (a wide space)'],
            ['`\\"`', 'a double quote inside a String'],
            ["`\\'`", 'a single quote inside a char'],
            ['`\\\\`', 'one backslash'],
            ['`\\u0041`', 'the Unicode character number 0041 (hex), here `A`']
          ]
        },
        fileName: 'Escapes.java',
        code: `public class Escapes {
    public static void main(String[] args) {
        System.out.println("Line one\\nLine two");
        System.out.println("She said \\"hi\\"");
        System.out.println("C:\\\\Users\\\\mia");

        char quote = '\\'';
        char letterA = '\\u0041';
        System.out.println(quote + " and " + letterA);
    }
}`,
        output: `Line one
Line two
She said "hi"
C:\\Users\\mia
' and A`,
        tip: 'Windows paths need double backslashes in Java: `"C:\\\\Users"`. Or use forward slashes, which Java also understands on Windows: `"C:/Users"`.'
      }
    ],
    technical: [
      'The compiler turns every literal into its final binary value. Underscores, the `L` and `f` suffixes, and hex or binary notation leave no trace in the `.class` file. Small int literals become short instructions like `bipush 42`. Bigger ones, and all `long`, `double` and String literals, are stored in the class file\u2019s **constant pool**, a table of fixed values.',
      'Every String literal with the same text is the same object at run time. The JVM keeps them in a **string pool**, so `"Java"` written in ten places is stored once.',
      'A curious edge case: `2147483648` alone is too big for an `int` literal, but `-2147483648` compiles. The specification allows this one value only after a minus sign, because it is `Integer.MIN_VALUE`.'
    ],
    tryIt: {
      steps: [
        'Copy `Literals.java` and run it.',
        'Change `8_100_000_000L` to `8_100_000_000` (no L) and compile. Read the error, then put the `L` back.',
        'Add `System.out.println(0x10 + 0b11);` and run again.'
      ],
      see: 'first the same four lines as above, then `integer number too large`, and at the end `19` (16 + 3).'
    },
    check: [
      { q: 'What is the type of `7`, `7L`, `7.0` and `7.0f`?', a: '`int`, `long`, `double`, `float`.' },
      { q: 'Why does `long big = 5000000000;` not compile?', a: 'The literal is read as an `int` first, and 5 billion is too big for an `int`. Write `5_000_000_000L`.' },
      { q: "What do `'7' + 1` and `\"7\" + 1` give?", a: "`'7' + 1` is `56` (the char `'7'` is 55 in Unicode). `\"7\" + 1` is the String `\"71\"`." }
    ],
    keyPoints: [
      'Whole number literals are `int`. Add `L` for `long`.',
      'Decimal literals are `double`. Add `f` for `float`.',
      'Underscores make big numbers readable: `1_000_000`.',
      "Single quotes: one `char`. Double quotes: a `String`.",
      'Special characters use escape sequences like `\\n` and `\\"`.'
    ],
    commonMistakes: [
      'Writing a thousands comma: `int n = 1,000;`. Fix: `int n = 1_000;`.',
      'Forgetting `L` on a big number: `long n = 3000000000;`. Fix: `3_000_000_000L`.',
      'Forgetting `f`: `float f = 0.5;`. Fix: `0.5f`, or use `double`.',
      "Double quotes for a char: `char c = \"A\";`. Fix: `char c = 'A';`.",
      'One backslash in a path: `"C:\\Users"` does not compile (`\\U` is no valid escape). Fix: `"C:\\\\Users"`.'
    ],
    related: ['The Eight Primitive Types', 'String', 'Ranges and Overflow'],
    glossary: topic.glossary
  });
})();
