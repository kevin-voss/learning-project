// Lesson 06: identifiers, the rules for names, and case sensitivity.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'identifiers',
  num: '06',
  title: 'Identifiers and Case Sensitivity',
  category: 'organization',
  icon: 'id',
  tagline: 'The rules every name must follow',
  realWorld: 'Name stickers on lunch boxes in a classroom. "Mia" and "MIA" might look alike to you, but the teacher has to treat them as two different children.',
  kid: [
    'Every child in your class has a name sticker on their lunch box. The sticker has rules: only letters and numbers, no pictures, and it must not start with a number.',
    'In Java, you stick names on your boxes too: on variables, classes and methods. These names are called identifiers.',
    'Java is very picky about big and small letters. `score`, `Score` and `SCORE` are three different stickers for three different boxes. If you write the name with the wrong letters, Java cannot find your box.'
  ],
  definition: 'An **identifier** is a name you give to a class, a variable, a method or a package. It must follow fixed rules, and Java is **case-sensitive**: uppercase and lowercase letters make different names.',
  explain: [
    'An identifier must **start** with a letter, an underscore `_` or a dollar sign `$`. After the first character it may also contain **digits** `0` to `9`. Nothing else is allowed: no spaces, no `-`, no `.`, no `#`.',
    'An identifier must not be a **keyword** (like `class` or `int`) and must not be one of the literals `true`, `false` or `null`. A lone `_` is not allowed either. The Keywords lesson in this topic has the full list.',
    'Letters include letters from other alphabets, so `café` or `π` is a legal name. The length has no limit. In practice you use English words in plain ASCII letters, so everyone can type them.',
    '**Case-sensitive** means that the compiler compares names letter by letter, and `a` and `A` are different letters. `System` is the class from Java; `system` is an unknown name. `String` works; `string` does not.',
    'A legal name is not always a good name. `x`, `$a` and `_tmp2` are all legal, but they hide what the box holds. The next lesson, Naming Conventions, shows the names Java programmers expect.'
  ],
  why: 'The compiler must tell names apart from numbers, operators and keywords without guessing. Fixed rules make that possible: a token that starts with a digit is a number, one that starts with a letter is a word.',
  whenUse: 'Every time you name a class, a variable or a method. Check the rules once; after that, follow the naming conventions and you are always safe.',
  syntax: 'first character: letter, `_` or `$` · then: letters, digits, `_`, `$` · not a keyword, not `true`/`false`/`null` · case matters',
  fileName: 'Identifiers.java',
  code: `public class Identifiers {
    public static void main(String[] args) {
        // Legal names: letters first, then letters or digits
        int age = 30;
        String firstName = "Mina";
        int item2 = 7;

        // Legal, but unusual: _ and $ are allowed characters
        int _count = 1;
        int $price = 5;

        // Case matters: these are three different boxes
        int score = 1;
        int Score = 2;
        int SCORE = 3;

        System.out.println(firstName + " is " + age);
        System.out.println("item2 = " + item2);
        System.out.println("Sum of _count and $price: " + (_count + $price));
        System.out.println(score + " " + Score + " " + SCORE);
    }
}`,
  output: `Mina is 30
item2 = 7
Sum of _count and $price: 6
1 2 3`,
  codeSummary: 'Every name in this program is legal. The last line proves that `score`, `Score` and `SCORE` are three separate variables with three separate values.',
  codeExplanation: [
    { label: 'Line 4', code: 'int age = 30;', text: '`age` starts with a letter and has only letters. A plain, legal name.' },
    { label: 'Line 5', code: 'String firstName = "Mina";', text: 'Two words joined without a space. The capital `N` makes the second word visible.' },
    { label: 'Line 6', code: 'int item2 = 7;', text: 'Digits are fine after the first character. `2item` would be illegal.' },
    { label: 'Line 9', code: 'int _count = 1;', text: 'An underscore may start a name. Legal, but Java code rarely does this.' },
    { label: 'Line 10', code: 'int $price = 5;', text: 'A dollar sign is legal too. Java itself uses `$` in generated names, so avoid it in your own.' },
    { label: 'Lines 13–15', code: 'int score = 1;\nint Score = 2;\nint SCORE = 3;', text: 'Three different names, because case matters. Legal, but confusing; never do this in real code.' },
    { label: 'Line 17', code: 'System.out.println(firstName + " is " + age);', text: '`System` with a capital S. Written `system`, this line would not compile.' },
    { label: 'Line 20', code: 'System.out.println(score + " " + Score + " " + SCORE);', text: 'Prints `1 2 3`: each name points to its own box.' }
  ],
  sections: [
    {
      title: 'Legal or not?',
      text: ['The compiler checks each name against the rules. Here are typical names and the verdict.'],
      table: {
        head: ['Name', 'Legal?', 'Why'],
        rows: [
          ['`firstName`', 'yes', 'letters only'],
          ['`item2`', 'yes', 'a digit after the first character'],
          ['`_count`, `$price`', 'yes', '`_` and `$` may appear anywhere'],
          ['`2item`', 'no', 'starts with a digit, so the compiler reads a number'],
          ['`first name`', 'no', 'a space makes two names'],
          ['`first-name`', 'no', '`-` is the minus operator: `first` minus `name`'],
          ['`price#1`', 'no', '`#` is not allowed in names'],
          ['`class`, `int`', 'no', 'reserved keywords'],
          ['`true`, `null`', 'no', 'reserved literals'],
          ['`_`', 'no', 'a lone underscore is a keyword']
        ]
      }
    },
    {
      title: 'How the compiler checks a name',
      mermaid: 'flowchart TD\n  A["a new name"] --> B{"first character a letter, _ or $?"}\n  B -->|no| X["not a name: error"]\n  B -->|yes| C{"other characters letters, digits, _ or $?"}\n  C -->|no| X\n  C -->|yes| D{"a keyword, true, false, null or _?"}\n  D -->|yes| X\n  D -->|no| OK["legal identifier"]',
      diagramNote: 'Three questions, in this order. Only a name that passes all three is an identifier.'
    },
    {
      title: 'Wrong vs right: illegal names',
      text: [
        'With an illegal name, the compiler does not say "bad name". It reads different tokens than you meant and then complains about the grammar.',
        '`2fast` is read as the number `2` followed by the name `fast`. `first-name` is read as `first`, minus, `name`. Fix: `fast2` and `firstName`.'
      ],
      fileName: 'BadName.java',
      noRun: true,
      code: `public class BadName {
    public static void main(String[] args) {
        int 2fast = 1;
        int first-name = 2;
    }
}`,
      output: `BadName.java:3: error: not a statement
        int 2fast = 1;
        ^
BadName.java:3: error: ';' expected
        int 2fast = 1;
           ^
BadName.java:4: error: ';' expected
        int first-name = 2;
                 ^
3 errors`
    },
    {
      title: 'Case sensitivity in action',
      text: [
        'A wrong capital letter is one of the most common beginner errors. Here `system` is written with a small s. Java does not know a name `system`, so it guesses that you mean a package called `system`, and that does not exist.',
        'Fix: `System.out.println("Hi");`. The same goes for `string` (write `String`) and `Main` vs `main`.'
      ],
      fileName: 'WrongCase.java',
      noRun: true,
      code: `public class WrongCase {
    public static void main(String[] args) {
        system.out.println("Hi");
    }
}`,
      output: `WrongCase.java:3: error: package system does not exist
        system.out.println("Hi");
              ^
1 error`
    },
    {
      title: 'The class name and the file name',
      text: [
        'A `public class` must live in a file with exactly the same name plus `.java`, with the same capital letters. The class `Greeting` belongs in `Greeting.java`.',
        'Below, the file is called `greeting.java` with a small g. The compiler rejects it, even on macOS and Windows, whose file systems usually treat `greeting` and `Greeting` as the same file name.'
      ],
      fileName: 'greeting.java',
      noRun: true,
      code: `public class Greeting {
    public static void main(String[] args) {
        System.out.println("Hi");
    }
}`,
      output: `greeting.java:1: error: class Greeting is public, should be declared in a file named Greeting.java
public class Greeting {
       ^
1 error`,
      warn: 'Rename the file to `Greeting.java`. On macOS, rename it in two steps (for example `greeting.java` → `tmp.java` → `Greeting.java`), because some tools ignore a change that only affects case.'
    }
  ],
  technical: [
    'The JLS defines identifiers with two Java methods: `Character.isJavaIdentifierStart` for the first character and `Character.isJavaIdentifierPart` for the rest. Letters from any alphabet, `_`, `$` and connecting characters pass the first test; digits pass only the second.',
    'Names are compared **code point by code point**: each character has a number in Unicode, and `S` (83) is not `s` (115). There is no "ignore case" mode in the compiler.',
    'Each class becomes a file named after it, such as `Score.class`. On a file system that ignores case (the default on macOS and Windows), two classes `Score` and `SCORE` in one folder would fight over the same file. That is one more reason to never use names that differ only by case.'
  ],
  tryIt: {
    steps: [
      'Create `Identifiers.java`, paste the example, compile and run it.',
      'Change `System.out.println(firstName + " is " + age);` to start with `system`. Compile and read the error.',
      'Fix it. Then rename the variable `item2` to `2item` in both places. Compile, read the errors, and change it back.'
    ],
    see: 'first four lines ending with `1 2 3`; then `package system does not exist`; then `not a statement` and `\';\' expected` for `2item`.'
  },
  check: [
    { q: 'Which characters may start an identifier?', a: 'A letter, an underscore `_` or a dollar sign `$`. Never a digit.' },
    { q: 'Are `total` and `Total` the same variable?', a: 'No. Java is case-sensitive, so they are two different names.' },
    { q: 'Why is `first-name` not a legal name?', a: '`-` is the minus operator. The compiler reads `first`, minus, `name`. Write `firstName` instead.' }
  ],
  keyPoints: [
    'An identifier names a class, variable, method or package.',
    'Start with a letter, `_` or `$`; then letters, digits, `_` or `$`.',
    'No spaces, no `-`, no keywords, no `true`, `false` or `null`.',
    'Java is case-sensitive: `score`, `Score` and `SCORE` are different.',
    'A public class must be in a file with exactly its name, same case, plus `.java`.'
  ],
  commonMistakes: [
    'Starting with a digit: `int 1stPlace = 1;`. Fix: `int firstPlace = 1;`.',
    'Using a space or a minus: `int first-name;`. Fix: `int firstName;`.',
    'Wrong case: `system.out.println` or `string name`. Fix: `System.out.println`, `String name`.',
    'File name and class name differ: class `Greeting` in `greeting.java`. Fix: rename the file to `Greeting.java`.',
    'Names that differ only by case: `score` and `Score` in one method. Fix: choose clearly different names.'
  ],
  related: ['Keywords', 'Naming Conventions', 'Reading Syntax Errors'],
  glossary: [
    { term: 'identifier', definition: 'A name you give to a class, variable, method or package. It starts with a letter, _ or $ and may then contain digits.' },
    { term: 'case-sensitive', definition: 'Uppercase and lowercase letters count as different, so score and Score are two different names.' }
  ]
});
