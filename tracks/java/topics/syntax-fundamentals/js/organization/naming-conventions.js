// Lesson 07: naming conventions (PascalCase, camelCase, UPPER_SNAKE_CASE, packages).
Java.topics.syntaxFundamentals.lessons.push({
  id: 'naming-conventions',
  num: '07',
  title: 'Naming Conventions',
  category: 'organization',
  icon: 'Aa',
  tagline: 'Names that tell you what they are',
  realWorld: 'Road signs. A red octagon always means stop, a triangle always means warning. You know the kind of sign from its shape before you read a single word.',
  kid: [
    'On the road, signs have shapes. A round sign tells you a rule, a triangle tells you to be careful. You understand them fast because they always look the same.',
    'Java names have shapes too. A name that starts with a big letter, like `ShoppingCart`, is a class. A name that starts small, like `itemCount`, is a variable or a method. A name in all big letters, like `MAX_ITEMS`, is a value that never changes.',
    'Java would accept other shapes. But every Java programmer in the world uses these, so when you follow them, everybody can read your code at a glance.'
  ],
  definition: 'A **naming convention** is a shared style rule for names. Java code uses **PascalCase** for classes, **camelCase** for variables and methods, **UPPER_SNAKE_CASE** for constants and all **lowercase** for packages.',
  explain: [
    'A name often needs several words, but spaces are not allowed. The conventions decide how to glue the words together. Take the words "shopping cart total".',
    '**PascalCase** writes every word with a capital first letter: `ShoppingCartTotal`. Use it for classes and other types (interfaces, enums, records).',
    '**camelCase** is the same, but the first word starts small: `shoppingCartTotal`. The capitals in the middle look like the humps of a camel. Use it for variables, parameters and methods.',
    '**UPPER_SNAKE_CASE** writes everything in capitals with `_` between the words: `SHOPPING_CART_TOTAL`. Use it for **constants**: values marked `static final` that never change after the program starts. `final` means "cannot be changed".',
    'Package names are all lowercase, with dots between the parts: `com.example.shop`. The compiler does not check any of this. Conventions are agreements between people, written down by Sun, the company that created Java, and still followed today.'
  ],
  why: 'With conventions, the shape of a name tells you its kind. In `Math.max(a, b)` you see at once that `Math` is a class and `max` is a method, without looking anything up.',
  whenUse: 'For every name you write. When a project or a team has its own style guide, follow that guide; it almost always builds on these conventions.',
  syntax: '`class ShoppingCart` · `int itemCount` · `void printReceipt()` · `static final int MAX_ITEMS = 5;` · `package com.example.shop;`',
  fileName: 'NamingConventions.java',
  code: `public class NamingConventions {
    // Constants: static final, UPPER_SNAKE_CASE
    static final int MAX_ATTEMPTS = 3;
    static final String WELCOME_TEXT = "Welcome back";

    // A method: camelCase, starts with a verb or a question word
    static boolean isLocked(int failedAttempts) {
        return failedAttempts >= MAX_ATTEMPTS;
    }

    public static void main(String[] args) {
        // Variables: camelCase, nouns
        String userName = "mina";
        int failedAttempts = 2;

        System.out.println(WELCOME_TEXT + ", " + userName);
        System.out.println("Locked after 2 tries: " + isLocked(failedAttempts));
        System.out.println("Locked after 3 tries: " + isLocked(3));
    }
}`,
  output: `Welcome back, mina
Locked after 2 tries: false
Locked after 3 tries: true`,
  codeSummary: 'One class (PascalCase), two constants (UPPER_SNAKE_CASE), one method and two variables (camelCase). The method `isLocked` answers a yes/no question; methods are taught in [Methods](../methods/index.html).',
  codeExplanation: [
    { label: 'Line 1', code: 'public class NamingConventions {', text: 'A class name in PascalCase: every word starts with a capital.' },
    { label: 'Line 3', code: 'static final int MAX_ATTEMPTS = 3;', text: 'A constant: `static final` and UPPER_SNAKE_CASE. It stays 3 for the whole program.' },
    { label: 'Line 4', code: 'static final String WELCOME_TEXT = "Welcome back";', text: 'A second constant. Words are separated by `_`.' },
    { label: 'Line 7', code: 'static boolean isLocked(int failedAttempts) {', text: 'A method in camelCase. `is...` tells you it answers yes or no. `failedAttempts` is a parameter, also camelCase.' },
    { label: 'Line 8', code: 'return failedAttempts >= MAX_ATTEMPTS;', text: 'Compares the attempts with the constant. The capitals make the constant stand out.' },
    { label: 'Line 13', code: 'String userName = "mina";', text: 'A variable in camelCase: a noun that says what the box holds.' },
    { label: 'Line 17', code: 'System.out.println("Locked after 2 tries: " + isLocked(failedAttempts));', text: '2 is less than 3, so `isLocked` returns `false`.' },
    { label: 'Line 18', code: 'System.out.println("Locked after 3 tries: " + isLocked(3));', text: '3 is not less than 3, so the account is locked: `true`.' }
  ],
  sections: [
    {
      title: 'One set of words, four shapes',
      text: ['Start with plain words and glue them together in the shape that fits the kind of name.'],
      mermaid: 'flowchart LR\n  W["words: shopping cart total"] --> P["PascalCase: ShoppingCartTotal (class)"]\n  W --> C["camelCase: shoppingCartTotal (variable, method)"]\n  W --> U["UPPER_SNAKE_CASE: SHOPPING_CART_TOTAL (constant)"]\n  W --> L["lowercase: shoppingcart (package part)"]',
      diagramNote: 'The words are the same; only the capitals and the underscores change. The shape tells the reader what kind of thing the name is.'
    },
    {
      title: 'Which shape for which thing',
      table: {
        head: ['Kind', 'Shape', 'Good examples', 'Avoid'],
        rows: [
          ['class, interface, enum, record', 'PascalCase, a noun', '`ShoppingCart`, `Student`, `HttpClient`', '`shoppingCart`, `Shopping_Cart`'],
          ['method', 'camelCase, a verb', '`printReceipt`, `calculateTotal`, `getName`', '`PrintReceipt`, `receipt`'],
          ['method that answers yes/no', 'camelCase, `is`/`has`/`can`', '`isEmpty`, `hasTicket`, `canVote`', '`empty`, `checkVote`'],
          ['variable, parameter', 'camelCase, a noun', '`itemCount`, `firstName`, `totalPrice`', '`ItemCount`, `item_count`, `n`'],
          ['boolean variable', 'camelCase, reads like yes/no', '`isActive`, `hasPaid`, `accountLocked`', '`flag`, `status`'],
          ['constant (`static final`)', 'UPPER_SNAKE_CASE', '`MAX_ATTEMPTS`, `TAX_RATE`', '`maxAttempts`, `MaxAttempts`'],
          ['package', 'lowercase, dots', '`com.example.shop`', '`com.example.Shop`, `com.example.my_shop`']
        ],
        note: 'For short words in capitals like HTTP or URL, modern style writes them like a normal word: `HttpClient`, `parseUrl`. Older JDK classes such as `URL` break this; leave them as they are.'
      }
    },
    {
      title: 'Good names tell the story',
      text: [
        'Both halves of this program compute the same number. In the first half, you have to guess what `a`, `b` and `c` are. In the second half, the names tell you.',
        'Short names like `i` are fine for a loop counter that lives for three lines. Everywhere else, a name may be long if it is clear.'
      ],
      fileName: 'Rename.java',
      code: `public class Rename {
    public static void main(String[] args) {
        // Hard to read: what are a, b and c?
        int a = 12;
        int b = 3;
        int c = a * b;
        System.out.println(c);

        // Easy to read: the names tell the story
        int pricePerTicket = 12;
        int ticketCount = 3;
        int totalPrice = pricePerTicket * ticketCount;
        System.out.println("Total price: " + totalPrice);
    }
}`,
      output: `36
Total price: 36`
    },
    {
      title: 'Read code faster with conventions',
      text: [
        'Because everybody follows the conventions, you can decode a line you have never seen. Look at the capital letters:',
        'Each dot-separated part tells you its kind from its first letter.'
      ],
      table: {
        head: ['Code', 'What the shapes tell you'],
        rows: [
          ['`Math.max(4, 9)`', '`Math` is a class (capital M), `max` is a method (small m, parentheses)'],
          ['`System.out.println(x)`', '`System` is a class, `out` is a variable inside it, `println` is a method'],
          ['`Integer.MAX_VALUE`', '`Integer` is a class, `MAX_VALUE` is a constant'],
          ['`java.util.List`', '`java` and `util` are package parts (lowercase), `List` is a type']
        ]
      }
    },
    {
      title: 'Conventions are not rules',
      text: [
        'The compiler accepts `int TotalPrice` or `class shopping_cart`. Nothing breaks. But every reader trips over them, and tools such as Checkstyle or your editor mark them as warnings.',
        'Stay consistent inside one project. If you open an old project with its own style, follow that style instead of mixing two.'
      ],
      tip: 'Your editor can rename a name everywhere at once. In VS Code, put the cursor on the name and press F2. Use it whenever a better name comes to mind.'
    }
  ],
  technical: [
    'The naming conventions are written down in the JLS (section 6.1) and in the old "Code Conventions for the Java Programming Language" from Sun Microsystems. They are advice, so `javac` never reports them as errors.',
    'Constants get UPPER_SNAKE_CASE because a `static final` field of a simple type, set to a fixed value, is a **compile-time constant**. javac copies its value straight into every place that uses it. The capitals warn readers that this value is fixed for good.',
    'The JDK itself follows the rules with few exceptions, so names such as `ArrayList`, `toUpperCase` and `Integer.MAX_VALUE` look exactly like yours will. When your code follows the same rules, it fits in with every library you use.'
  ],
  tryIt: {
    steps: [
      'Create `NamingConventions.java`, paste the example, compile and run it.',
      'Add a constant `static final int MIN_AGE = 12;` and a variable `int visitorAge = 10;` in `main`.',
      'Print `"Old enough: " + (visitorAge >= MIN_AGE)`. Compile and run.'
    ],
    see: 'the three lines of the example and then `Old enough: false`.'
  },
  check: [
    { q: 'Which shape does a class name use, and which does a method name use?', a: 'Classes use PascalCase (`ShoppingCart`). Methods use camelCase and usually start with a verb (`printReceipt`).' },
    { q: 'How do you write a constant for the largest number of players?', a: '`static final int MAX_PLAYERS = 4;` in UPPER_SNAKE_CASE.' },
    { q: 'Does `int TotalPrice = 5;` compile?', a: 'Yes. Conventions are not checked by the compiler. It is still wrong style: write `totalPrice`.' }
  ],
  keyPoints: [
    'Classes and other types: PascalCase nouns, like `ShoppingCart`.',
    'Variables and methods: camelCase; methods start with a verb, like `printReceipt`.',
    'Constants (`static final`): UPPER_SNAKE_CASE, like `MAX_ATTEMPTS`.',
    'Packages: all lowercase with dots, like `com.example.shop`.',
    'The compiler does not check conventions; people and tools do.'
  ],
  commonMistakes: [
    'A class named like a variable: `class shoppingCart`. Fix: `class ShoppingCart`.',
    'Underscores in variables: `int item_count`. Fix: `int itemCount`.',
    'A constant in camelCase: `static final int maxAttempts = 3;`. Fix: `MAX_ATTEMPTS`.',
    'Names that hide meaning: `int d = 7;`. Fix: `int daysPerWeek = 7;`.',
    'Mixing styles in one project. Fix: pick the conventions above and keep them everywhere.'
  ],
  related: ['Identifiers and Case Sensitivity', 'Packages and Folders', 'Comments'],
  glossary: [
    { term: 'PascalCase', definition: 'Every word starts with a capital letter, no spaces: ShoppingCart. Used for class names.' },
    { term: 'camelCase', definition: 'Like PascalCase, but the first word starts small: shoppingCart. Used for variables and methods.' },
    { term: 'UPPER_SNAKE_CASE', definition: 'All capitals with underscores between words: MAX_ATTEMPTS. Used for constants.' },
    { term: 'constant', definition: 'A value marked static final that never changes while the program runs.' }
  ]
});
