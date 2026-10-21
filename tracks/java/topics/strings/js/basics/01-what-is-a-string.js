// Strings & Text, lesson 1: What a String Is.
(function () {
  Java.addCoreTopic('strings', {
    label: 'Text',
    headline: 'Strings,',
    accent: 'text with rules.',
    intro: 'See text as a row of characters, cut and search it, compare it correctly, build it in loops and turn it into numbers.',
    overview: '`String` is the type you use most after `int`. It is an object with many methods, and it never changes. Learn its habits early and most text bugs never happen.',
    tryIt: {
      steps: [
        'Make `Shout.java` with a `main` method. Store your name in a String: `String name = "mia";`.',
        'Print `name.toUpperCase()` and `name.length()`.',
        'Print `name.charAt(0)` and `name.substring(1)`.',
        'Compare it with `"MIA"` twice: once with `.equals(...)` and once with `.equalsIgnoreCase(...)`.',
        'Build `"m-i-a"` with a `StringBuilder` in a `for` loop over the characters.'
      ],
      see: 'your name in capitals, its length, the first letter, the rest of the name, `false`, `true` (for the name mia) and your name with dashes between the letters.'
    },
    check: [
      { q: 'Why use `a.equals(b)` instead of `a == b` for texts?', a: '`==` asks "is it the same object?". `.equals` asks "are the letters the same?". You almost always want the letters.' },
      { q: 'After `name.toUpperCase();` is `name` in capitals?', a: 'No. Strings never change. Keep the result: `name = name.toUpperCase();`.' },
      { q: 'What does `"Hello".substring(1, 3)` give?', a: '`"el"`. It starts at index 1 and stops before index 3.' },
      { q: 'Which tool builds a long text in a loop?', a: '`StringBuilder`, with `append(...)` and one `toString()` at the end.' },
      { q: 'What happens with `Integer.parseInt("12a")`?', a: 'It throws a `NumberFormatException`, because `"12a"` is not a whole number.' }
    ]
  }, [
    {
      id: 'what-is-a-string',
      title: 'What a String Is',
      category: 'concept',
      icon: '""',
      tagline: 'A row of characters with numbers',
      realWorld: 'A String is a pearl necklace. Each pearl is one letter. The pearls are counted from the clasp: the first pearl is number 0, the next is number 1, and so on.',
      kid: [
        'Think of a row of letter blocks on the floor: H, E, L, L, O. Together they spell a word. In Java, that row is a **String**.',
        'Each block has a little number in front of it. The first block is number 0, not 1. So H is at 0 and O is at 4.',
        'One single block is a **char**. The whole row is a String. A row can even have zero blocks: that is the empty text `""`.'
      ],
      definition: 'A `String` is a piece of text: a row of characters in a fixed order. Each character has an **index** (its position number), starting at 0.',
      explain: [
        'You write a String in double quotes: `"HELLO"`. Text written straight into the code like this is a **literal**.',
        'A **character** is one letter, digit, space or symbol. Java has the type `char` for exactly one character, written in single quotes: `\'H\'`.',
        'The method `length()` tells you how many characters the String has. `charAt(i)` gives you the character at index `i`. Because counting starts at 0, the last index is always `length() - 1`.',
        '`String` is not a primitive type like `int`. It is an **object**: a thing that lives in memory and has methods you call with a dot, such as `word.length()`. The variable holds a reference (an arrow) to that object, as you saw in [Types & Variables](../types-and-variables/index.html).',
        'The `+` sign glues texts together. This is called **concatenation**. If one side of `+` is a String, the other side (a number, a char, a boolean) is turned into text first.'
      ],
      why: 'Names, messages, passwords, file names, chat lines: almost every program reads, checks and prints text.',
      whenUse: 'Whenever a value is text that a person reads or types, store it in a String.',
      syntax: '`String name = "text";` · `name.length()` · `name.charAt(index)` · `"a" + "b"`',
      fileName: 'StringBasics.java',
      codeSummary: 'The program stores the word HELLO, asks for its length, reads single characters by index and walks over every index with a loop. Then it shows the empty String and glues texts with `+`.',
      code: `public class StringBasics {
    public static void main(String[] args) {
        String word = "HELLO";          // a String: text in double quotes
        char first = word.charAt(0);    // a char: exactly one character

        System.out.println(word);
        System.out.println("Length: " + word.length());
        System.out.println("First letter: " + first);
        System.out.println("Last letter: " + word.charAt(word.length() - 1));

        for (int i = 0; i < word.length(); i++) {
            System.out.println("index " + i + " -> " + word.charAt(i));
        }

        String empty = "";              // a String with zero characters
        System.out.println("Empty length: " + empty.length());

        String greeting = "Hi, " + "Mia" + "!";   // + glues texts together
        System.out.println(greeting);
        System.out.println("Age: " + 9);          // the number 9 becomes the text "9"
    }
}`,
      output: `HELLO
Length: 5
First letter: H
Last letter: O
index 0 -> H
index 1 -> E
index 2 -> L
index 3 -> L
index 4 -> O
Empty length: 0
Hi, Mia!
Age: 9`,
      codeExplanation: [
        { label: 'Line 3', code: 'String word = "HELLO";', text: 'Makes a String object with five characters and lets the variable `word` point to it.' },
        { label: 'Line 4', code: 'char first = word.charAt(0);', text: '`charAt(0)` returns the character at index 0. The result type is `char`, not String.' },
        { label: 'Line 7', code: 'System.out.println("Length: " + word.length());', text: '`length()` counts the characters: 5. The `+` turns 5 into text and glues it to `"Length: "`.' },
        { label: 'Line 9', code: 'word.charAt(word.length() - 1)', text: 'The last index is one less than the length. `5 - 1` is 4, and index 4 holds O.' },
        { label: 'Line 11', code: 'for (int i = 0; i < word.length(); i++) {', text: 'A counting loop from 0 up to (not including) the length visits every index exactly once.' },
        { label: 'Line 15', code: 'String empty = "";', text: 'Two quotes with nothing between them make the **empty String**. It is a real object with length 0.' },
        { label: 'Line 18', code: 'String greeting = "Hi, " + "Mia" + "!";', text: 'Concatenation: three texts glued into one new String.' },
        { label: 'Line 20', code: 'System.out.println("Age: " + 9);', text: 'A String on the left side of `+` turns the number on the right into text.' }
      ],
      sections: [
        {
          title: 'A row of boxes with numbers',
          text: [
            'Picture the String as boxes in a row. Every box holds one `char`. The number under each box is its index.',
            'Index 0 is the first box. With 5 characters, the indexes are 0, 1, 2, 3 and 4. There is no box 5.'
          ],
          mermaid: `flowchart LR
  V["variable word"] --> S
  subgraph S["String object, length() = 5"]
    direction LR
    C0["index 0: H"] --- C1["index 1: E"] --- C2["index 2: L"] --- C3["index 3: L"] --- C4["index 4: O"]
  end`,
          diagramNote: 'The variable `word` holds an arrow to one String object. Inside are five characters, counted from 0.',
          table: {
            head: ['You write', 'You get', 'Why'],
            rows: [
              ['`word.length()`', '`5`', 'five characters'],
              ['`word.charAt(0)`', '`\'H\'`', 'the first index is 0'],
              ['`word.charAt(4)`', '`\'O\'`', 'the last index is `length() - 1`'],
              ['`word.charAt(5)`', 'a crash', '`StringIndexOutOfBoundsException`: there is no index 5']
            ]
          },
          warn: 'Asking for an index that does not exist stops the program with a `StringIndexOutOfBoundsException`. Valid indexes go from `0` to `length() - 1`.'
        },
        {
          title: 'char or String?',
          text: [
            'A `char` is a primitive: one character, in single quotes. A `String` is an object: any number of characters, in double quotes.',
            'Inside the computer a `char` is a number (its character code). `\'A\'` is 65, `\'B\'` is 66. That is why `\'A\' + 1` gives a number, while `"A" + 1` gives text.'
          ],
          table: {
            head: ['', '`char`', '`String`'],
            rows: [
              ['Holds', 'exactly one character', 'zero or more characters'],
              ['Quotes', 'single: `\'A\'`', 'double: `"A"`'],
              ['Kind', 'primitive (a number inside)', 'object (has methods)'],
              ['Empty value', 'not possible: `\'\'` does not compile', '`""` is fine'],
              ['Turn into the other', '`String.valueOf(c)`', '`text.charAt(0)`']
            ]
          },
          fileName: 'CharVsString.java',
          code: `public class CharVsString {
    public static void main(String[] args) {
        char letter = 'A';
        String text = "A";

        System.out.println(letter);
        System.out.println(text);
        System.out.println(letter + 1);            // char math: 'A' is 65, so 66
        System.out.println(text + 1);              // String + number: glued, A1
        System.out.println((char) (letter + 1));   // the number 66 back as a char: B
        System.out.println(String.valueOf(letter).equals(text));  // char -> String
        System.out.println(text.charAt(0) == letter);             // String -> char
    }
}`,
          output: `A
A
66
A1
B
true
true`,
          tip: 'Comparing two `char` values with `==` is fine, because they are primitives. Comparing two Strings needs `.equals(...)`, as the equality lesson shows.'
        },
        {
          title: 'Ways to make a String',
          text: [
            'Most of the time you write a literal. You can also glue texts, build a String from a `char` array, or turn a number into text.',
            '`+` works from left to right. `1 + 2 + "x"` first adds the numbers (3) and then glues: `"3x"`. `"x" + 1 + 2` starts with text, so everything after it is glued: `"x12"`.'
          ],
          fileName: 'CreateStrings.java',
          code: `public class CreateStrings {
    public static void main(String[] args) {
        String literal = "cat";                    // 1. a literal (most common)
        String glued = "cat" + "fish";             // 2. glued with +
        String copy = new String("cat");           // 3. new String(...) (rarely needed)
        char[] letters = {'d', 'o', 'g'};
        String fromChars = new String(letters);    // 4. from a char array
        String fromNumber = String.valueOf(42);    // 5. from a number
        String repeated = "ab".repeat(3);          // 6. returned by a method

        System.out.println(literal);
        System.out.println(glued);
        System.out.println(copy);
        System.out.println(fromChars);
        System.out.println(fromNumber);
        System.out.println(repeated);
        System.out.println(1 + 2 + "x");           // numbers first, then text
        System.out.println("x" + 1 + 2);           // text first: everything is glued
    }
}`,
          output: `cat
catfish
cat
dog
42
ababab
3x
x12`
        },
        {
          title: 'Special characters: escape sequences',
          text: [
            'Some characters cannot be typed straight into a literal. A double quote would end the String. A line break would break the line of code.',
            'For these you write a backslash `\\` and one more character. This pair is an **escape sequence**. The compiler turns it into the one special character.'
          ],
          table: {
            head: ['Escape', 'Means', 'Example', 'Prints'],
            rows: [
              ['`\\n`', 'new line', '`"one\\ntwo"`', 'one, then two on the next line'],
              ['`\\t`', 'tab (a wide space)', '`"Name:\\tMia"`', '`Name:`, a wide gap, then `Mia`'],
              ['`\\"`', 'a double quote', '`"say \\"hi\\""`', 'say "hi"'],
              ['`\\\\`', 'one backslash', '`"C:\\\\Users"`', 'C:\\Users'],
              ['`\\\'`', 'a single quote', '`\'\\\'\'`', '\' (needed in a `char`)']
            ]
          },
          fileName: 'Escapes.java',
          code: `public class Escapes {
    public static void main(String[] args) {
        System.out.println("Line one\\nLine two");
        System.out.println("Name:\\tMia");
        System.out.println("She said \\"hi\\".");
        System.out.println("Folder: C:\\\\Users\\\\mia");
        System.out.println('\\'' + " is a single quote");
        System.out.println("\\"".length());      // an escape is ONE character
    }
}`,
          output: 'Line one\nLine two\nName:\tMia\nShe said "hi".\nFolder: C:\\Users\\mia\n\' is a single quote\n1',
          tip: '`"\\n".length()` is 1. The backslash is only how you write it in code; the String holds one character.'
        },
        {
          title: 'Many lines at once: text blocks',
          text: [
            'Since Java 15 you can write text over several lines with three double quotes `"""`. This is a **text block**. The text starts on the line after the opening `"""`.',
            'Inside a text block, line breaks and double quotes need no escapes. Java removes the spaces that every line shares on the left, so you can indent the block like the rest of your code. The position of the closing `"""` decides how much is removed.'
          ],
          fileName: 'TextBlock.java',
          code: `public class TextBlock {
    public static void main(String[] args) {
        String menu = """
            Menu:
              - pizza
              - "soup of the day"
            """;
        System.out.print(menu);                       // the block already ends with a line break
        System.out.println(menu.lines().count() + " lines");
    }
}`,
          output: `Menu:
  - pizza
  - "soup of the day"
3 lines`,
          tip: 'The closing `"""` on its own line adds a final line break. Put it right after the last word (`day"""`) if you do not want one.'
        }
      ],
      technical: [
        '`String` is a class in the package `java.lang`. Java imports `java.lang` into every file by itself, so you never write an import for it.',
        'Since Java 9 a String keeps its characters in a `byte[]` array. If every character fits in one byte (plain English text), Java uses one byte per character. Otherwise it uses two bytes per character (UTF-16). This trick is called **compact strings** and saves memory.',
        'A `char` is a 16-bit number. Most characters fit in one `char`, but some, like many emoji, need two. `length()` counts `char` values, so `"😀".length()` is 2.',
        'Literals are stored in the `.class` file in a list called the constant pool. When the class loads, the JVM turns them into String objects once and reuses them.'
      ],
      tryIt: {
        steps: [
          'Make `Name.java` with a `main` method and `String name = "Rosalind";`.',
          'Print `name.length()`, `name.charAt(0)` and `name.charAt(name.length() - 1)`.',
          'Add a `for` loop that prints each index and its character.',
          'Print `"She said \\"hi\\""` and a two-line text block.'
        ],
        see: '`8`, `R`, `d`, eight lines from `0: R` to `7: d`, then `She said "hi"` and your two lines.'
      },
      check: [
        { q: 'What is the index of the last character of `"cat"`?', a: '2. The length is 3 and indexes start at 0, so the last one is `3 - 1`.' },
        { q: 'What is the difference between `\'a\'` and `"a"`?', a: '`\'a\'` is a `char`, one primitive character. `"a"` is a String object that holds one character.' },
        { q: 'What does `System.out.println(2 + 3 + "!")` print?', a: '`5!`. The numbers are added first, then the result is glued to the text.' }
      ],
      keyPoints: [
        'A String is a row of characters. Indexes start at 0.',
        'The last index is `length() - 1`.',
        '`char` holds one character in single quotes. `String` holds text in double quotes.',
        '`+` with a String on one side glues; it works from left to right.',
        'Escape sequences like `\\n`, `\\t`, `\\"` and `\\\\` write special characters. Text blocks `"""` hold many lines.'
      ],
      commonMistakes: [
        'Using single quotes for text: `char c = \'hi\';` does not compile. Use `String s = "hi";`.',
        'Reading one past the end: `word.charAt(word.length())` crashes. The last index is `word.length() - 1`.',
        'Expecting `"Total: " + 2 + 3` to print 5. It prints `Total: 23`. Use brackets: `"Total: " + (2 + 3)`.',
        'Writing a Windows path as `"C:\\Users"`. A single backslash starts an escape. Write `"C:\\\\Users"`.'
      ],
      related: ['Types & Variables', 'Arrays', 'immutability']
    }
  ]);
})();
