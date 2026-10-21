Java.topics.operators.lessons.push(
  {
    id: 'string-concatenation',
    num: '05',
    title: 'String Concatenation',
    category: 'calculation',
    icon: '"+',
    tagline: 'Glue text together with +, and the "1" + 2 + 3 surprise',
    realWorld: 'A train of letter blocks. You hook one block to the end of the other and get a longer train. The blocks do not add up into one big block; they stay in a row.',
    kid: [
      'You have a card that says "Hello" and a card that says "Mia". You put them next to each other and you read "Hello Mia".',
      'In Java, `+` does that with text. Text in Java is a **String**, and putting Strings together is called **concatenation**.',
      'But `+` has two jobs. With two numbers it adds: 2 + 3 is 5. With text it glues: "2" + "3" is "23". Java looks at what is next to the `+` to choose the job. And it looks from left to right, one `+` at a time. That is the surprise you see in this lesson.'
    ],
    definition: '**String concatenation** joins two values into one new `String`. Java uses `+` for it whenever at least one of the two operands is a `String`; the other operand is turned into text first.',
    explain: [
      'A `String` is a piece of text, written in double quotes: `"Mia"`. You met it in [Types and Variables](../types-and-variables/index.html). Its methods and comparisons are in [Strings](../strings/index.html).',
      'The `+` operator is **overloaded**: it has more than one meaning. If both operands are numbers, `+` adds. If at least one operand is a `String`, `+` concatenates.',
      'Before it concatenates, Java converts the other operand to text: `7` becomes `"7"`, `2.5` becomes `"2.5"`, `true` becomes `"true"`, `\'A\'` becomes `"A"`, and `null` becomes `"null"`.',
      'Several `+` in a row are done **left to right**, one pair at a time. The type of each step decides the next step. `"1" + 2 + 3` is `("1" + 2) + 3` = `"12" + 3` = `"123"`. But `1 + 2 + "3"` is `(1 + 2) + "3"` = `3 + "3"` = `"33"`.',
      'Parentheses change the order. `"1" + (2 + 3)` adds first and gives `"15"`. This is why you saw `"Sum: " + (a + b)` with parentheses in the earlier lessons.'
    ],
    why: 'Programs talk to people with text: "Hello, Mia!", "Score: 42", "3 items in your cart". Concatenation builds those messages from fixed text and values.',
    whenUse: 'Use `+` to build short messages and output lines. Put parentheses around any math inside the text.',
    syntax: '`"text" + value`, `value + "text"`, `text1 + text2`, and `text += more;`.',
    fileName: 'Concatenation.java',
    code: `public class Concatenation {
    public static void main(String[] args) {
        String name = "Mia";
        int age = 7;

        // String + anything = a new, longer String
        System.out.println("Hello, " + name + "!");
        System.out.println(name + " is " + age + " years old.");

        // + works from left to right
        System.out.println("1" + 2 + 3);      // "12" + 3 = "123"
        System.out.println(1 + 2 + "3");      // 3 + "3" = "33"
        System.out.println("1" + (2 + 3));    // parentheses first: "15"

        // Other types turn into text too
        double price = 4.5;
        boolean open = true;
        char grade = 'A';
        System.out.println("Price: " + price + ", open: " + open + ", grade: " + grade);

        // += on a String adds to the end
        String word = "Ja";
        word += "va";
        System.out.println(word);

        // Two chars add up as numbers, not as text
        System.out.println('A' + 'B');
        System.out.println("" + 'A' + 'B');
    }
}`,
    output: `Hello, Mia!
Mia is 7 years old.
123
33
15
Price: 4.5, open: true, grade: A
Java
131
AB`,
    codeSummary: 'The program builds messages with `+`, shows how left-to-right order changes the result, and ends with the `char` surprise.',
    codeExplanation: [
      { label: 'Line 7', code: `System.out.println("Hello, " + name + "!");`, text: 'Three pieces glued in a row. Every piece is already a `String`.' },
      { label: 'Line 8', code: `System.out.println(name + " is " + age + " years old.");`, text: '`age` is an `int`. Because its neighbour is a `String`, it is turned into `"7"` and glued in.' },
      { label: 'Line 11', code: `System.out.println("1" + 2 + 3);      // "12" + 3 = "123"`, text: 'The first `+` sees a `String`, so it glues: `"12"`. The second `+` also sees a `String`, so it glues again: `"123"`.' },
      { label: 'Line 12', code: `System.out.println(1 + 2 + "3");      // 3 + "3" = "33"`, text: 'The first `+` sees two `int` values, so it adds: `3`. Only the second `+` sees a `String`.' },
      { label: 'Line 13', code: `System.out.println("1" + (2 + 3));    // parentheses first: "15"`, text: 'Parentheses run first, as in math. `2 + 3` is `5`, then `"1" + 5` is `"15"`.' },
      { label: 'Line 19', code: `System.out.println("Price: " + price + ", open: " + open + ", grade: " + grade);`, text: '`double`, `boolean` and `char` values are all turned into their text form.' },
      { label: 'Line 23', code: `word += "va";`, text: 'Compound assignment works for `String`: `word = word + "va"`. A new `String` "Java" is stored in `word`.' },
      { label: 'Line 27', code: `System.out.println('A' + 'B');`, text: 'No `String` here. A `char` is a number (its Unicode code): `65 + 66` is `131`.' },
      { label: 'Line 28', code: `System.out.println("" + 'A' + 'B');`, text: 'Starting with the empty `String` `""` makes every `+` a concatenation: `"AB"`.' }
    ],
    sections: [
      {
        title: 'One rule decides the job of +',
        text: [
          'For each single `+`, Java looks at its two operands. If at least one is a `String`, the result is a `String`. Otherwise both are numbers (or `char`), and the result is a number.'
        ],
        table: {
          head: ['Left', 'Right', 'Job', 'Example', 'Result'],
          rows: [
            ['number', 'number', 'add', '`2 + 3`', '`5`'],
            ['`String`', 'number', 'glue', '`"2" + 3`', '`"23"`'],
            ['number', '`String`', 'glue', '`2 + "3"`', '`"23"`'],
            ['`String`', '`String`', 'glue', '`"2" + "3"`', '`"23"`'],
            ['`char`', '`char`', 'add codes', `\`'A' + 'B'\``, '`131`'],
            ['`String`', '`null`', 'glue', '`"x" + null`', '`"xnull"`']
          ],
          note: 'The other arithmetic operators have no text job: `"5" * 2` does not compile.'
        }
      },
      {
        title: 'Left to right: the "1" + 2 + 3 surprise',
        text: [
          'Several `+` have the same priority, so Java works from left to right. The result of the first `+` is the left operand of the second `+`.',
          'Follow both lines. The numbers are the same; only the position of the `String` is different.'
        ],
        mermaid: 'flowchart TD\n  A["#quot;1#quot; + 2 + 3"] --> B["#quot;12#quot; + 3"]\n  B --> C["#quot;123#quot;"]\n  D["1 + 2 + #quot;3#quot;"] --> E["3 + #quot;3#quot;"]\n  E --> F["#quot;33#quot;"]',
        diagramNote: 'Left: the `String` is first, so every step glues. Right: two numbers come first, so the first step adds.',
        table: {
          head: ['Expression', 'Step 1', 'Step 2', 'Result'],
          rows: [
            ['`"1" + 2 + 3`', '`"1" + 2` → `"12"`', '`"12" + 3` → `"123"`', '`"123"`'],
            ['`1 + 2 + "3"`', '`1 + 2` → `3`', '`3 + "3"` → `"33"`', '`"33"`'],
            ['`1 + "2" + 3`', '`1 + "2"` → `"12"`', '`"12" + 3` → `"123"`', '`"123"`'],
            ['`"1" + (2 + 3)`', '`2 + 3` → `5`', '`"1" + 5` → `"15"`', '`"15"`']
          ]
        }
      },
      {
        title: 'The "Sum:" trap and its fix',
        text: [
          'You want to print the sum of `a` and `b` with a label. If the label comes first, every `+` after it glues. The numbers end up next to each other instead of added.'
        ],
        fileName: 'SumTrap.java',
        code: `public class SumTrap {
    public static void main(String[] args) {
        int a = 3;
        int b = 4;

        System.out.println("Sum: " + a + b);      // wrong: glues 3 and 4
        System.out.println("Sum: " + (a + b));    // right: adds first
        System.out.println(a + b + " is the sum"); // adds, then glues
        System.out.println("Product: " + a * b);  // * runs before +
    }
}`,
        output: `Sum: 34
Sum: 7
7 is the sum
Product: 12`,
        tip: '`*`, `/` and `%` run before `+`, so `"Product: " + a * b` works without parentheses. Add them anyway; they make the meaning clear.'
      },
      {
        title: 'null, chars and compile errors',
        text: [
          'A `String` variable can hold `null`, which means "no text object at all". Concatenation does not crash on `null`; it writes the four letters `null`. That is often a sign of a bug: the value was never set.',
          'A `char` uses single quotes and is a number inside. Two `char` values with `+` add their codes. Start with `""` or use a `String` like `"A"` when you want text.'
        ],
        fileName: 'NullAndChars.java',
        code: `public class NullAndChars {
    public static void main(String[] args) {
        String nickname = null;
        System.out.println("Hi " + nickname);

        char first = 'J';
        char second = 'V';
        System.out.println(first + second);          // 74 + 86
        System.out.println("" + first + second);     // text
        System.out.println(first + "" + second);     // text
        System.out.println((char) (first + 1));      // next letter
    }
}`,
        output: `Hi null
160
JV
JV
K`,
        warn: '`"x" - 1` and `"5" * 2` do not compile: only `+` works with text. Converting text like `"5"` into the number 5 is done with `Integer.parseInt("5")`, shown in [Strings](../strings/index.html).'
      },
      {
        title: 'Every + makes a new String',
        text: [
          'A `String` in Java cannot be changed. It is **immutable**. So `word += "va"` does not change the old text. It builds a brand-new `String` and puts that into `word`.',
          'For a few pieces this costs nothing worth worrying about. If you glue thousands of pieces in a loop, use a `StringBuilder` instead; [Strings](../strings/index.html) shows how.',
          'Comparing two Strings with `==` is a different trap: it does not compare the letters. Use `equals`. That is also explained in [Strings](../strings/index.html).'
        ],
        mermaid: 'flowchart LR\n  W1["word"] -.->|"before"| S1["#quot;Ja#quot;"]\n  W1 -->|"after word += #quot;va#quot;"| S2["#quot;Java#quot; (new object)"]',
        diagramNote: 'The variable `word` points to a new text object. The old `"Ja"` stays unchanged until Java cleans it up.'
      }
    ],
    technical: [
      'When `javac` sees `+` with a `String` operand, it does not emit an addition. Since Java 9 it emits an `invokedynamic` instruction that calls `StringConcatFactory` (JEP 280). At the first run, the JVM builds a fast routine for exactly this pattern of pieces. Before Java 9, the compiler wrote a chain of `new StringBuilder().append(...).append(...).toString()`.',
      'Each non-`String` operand is converted the way `String.valueOf` does it: numbers with their usual text form, `true`/`false`, the character of a `char`, and `"null"` for a `null` reference. For an object, Java calls its `toString()` method ([Classes and Objects](../classes-and-objects/index.html)).',
      'When every piece is a constant, like `"Ja" + "va"` or `"Max: " + 100`, the compiler joins them while compiling. The `.class` file then holds the finished `"Java"`.',
      'The left-to-right rule is plain grammar: `+` is **left-associative**, so `a + b + c` is always parsed as `(a + b) + c`. The type of `(a + b)` is fixed before the second `+` is considered.'
    ],
    tryIt: {
      steps: [
        'Create `Labels.java` with `int x = 5;` and `int y = 6;`.',
        'Print `"x + y = " + x + y`.',
        'Fix it with parentheses and print it again.',
        'Print `x + y + "!"` and `"!" + x + y`.'
      ],
      see: '`x + y = 56`, then `x + y = 11`, then `11!` and `!56`.'
    },
    check: [
      { q: 'What does `System.out.println(2 + 3 + "4" + 5);` print?', a: '`545`. `2 + 3` is `5`, `5 + "4"` is `"54"`, `"54" + 5` is `"545"`.' },
      { q: `What does \`'a' + 1\` give, and what does \`"a" + 1\` give?`, a: `\`'a' + 1\` is the number \`98\` (the code of \`'a'\` is 97). \`"a" + 1\` is the text \`"a1"\`.` },
      { q: 'How do you print "Total: 9" from `int a = 4, b = 5;`?', a: '`System.out.println("Total: " + (a + b));`. Without the parentheses you get `Total: 45`.' }
    ],
    keyPoints: [
      '`+` adds numbers and glues text. One `String` operand is enough to glue.',
      'Several `+` run left to right; each step decides the type of the next.',
      'Put math inside text in parentheses: `"Sum: " + (a + b)`.',
      '`char + char` adds codes. Start with `""` to get text.',
      '`null` becomes the text `"null"`; every `+` builds a new `String`.'
    ],
    commonMistakes: [
      'Writing `"Sum: " + a + b` and getting `Sum: 34`. Write `"Sum: " + (a + b)`.',
      `Writing \`'A' + 'B'\` to get "AB". It gives \`131\`. Use \`"A" + "B"\` or \`"" + 'A' + 'B'\`.`,
      'Trying `"5" * 2` or `"abc" - "c"`. Only `+` works with text.',
      'Gluing text in a long loop with `+=`. Use `StringBuilder` (see Strings).',
      'Comparing texts with `==`. Use `equals` (see Strings).'
    ],
    related: ['Arithmetic', 'Precedence and Associativity', 'Strings'],
    glossary: [
      { term: 'concatenation', definition: 'Joining two pieces of text into one longer String, done with + in Java.' },
      { term: 'overloaded', definition: 'An operator or method name with more than one meaning, chosen by the types of its operands.' },
      { term: 'immutable', definition: 'Cannot be changed after it is created. A Java String is immutable.' }
    ]
  }
);
