Java.topics.operators.lessons.push(
  {
    id: 'ternary',
    num: '09',
    title: 'Ternary Operator',
    category: 'decisions',
    icon: '?:',
    tagline: 'Pick one of two values with condition ? a : b',
    realWorld: 'A coin with two sides. You ask a question, and the answer picks which side faces up: heads for yes, tails for no. You always get exactly one side.',
    kid: [
      'At breakfast you ask: "Is it cold outside?" If yes, you wear the jacket. If no, you wear the T-shirt.',
      'Java can write that in one short line: `cold ? "jacket" : "T-shirt"`. Read the `?` as "if yes, then" and the `:` as "otherwise".',
      'The question comes first. Then Java picks one of the two answers. The other answer is not even looked at.'
    ],
    definition: 'The **ternary operator** (also called the **conditional operator**) `condition ? valueIfTrue : valueIfFalse` evaluates the `boolean` condition and then gives back the first value if it is `true`, or the second value if it is `false`.',
    explain: [
      '**Ternary** means "three parts". It is Java\'s only operator with three operands: a `boolean` condition, a value for `true` and a value for `false`.',
      'It is an **expression**: it produces a value. You can store that value in a variable, print it, or use it inside a bigger expression.',
      'Only one of the two value branches is evaluated. If the condition is `true`, Java evaluates the part after `?` and skips the part after `:`, and the other way round. This lets you write safe code like `count == 0 ? 0 : total / count`.',
      'Both branches should have a type that fits where the result goes. If the branches are different number types, Java promotes them to one common type. So `true ? 1 : 2.0` is `1.0`, not `1`.',
      'Its big brother is the `if`/`else` statement from [Control Flow](../control-flow/index.html). `if`/`else` runs whole blocks of statements. The ternary only picks a value. Use it for short "this or that" values.'
    ],
    why: 'Very often a value depends on a yes-or-no question: "apple" or "apples", "adult" or "child", the bigger of two numbers. The ternary writes that in one readable line.',
    whenUse: 'Use it when you pick between two simple values. When each side needs more than one step, or you nest it more than once, use `if`/`else` instead.',
    syntax: '`type result = condition ? valueIfTrue : valueIfFalse;`',
    fileName: 'Ternary.java',
    code: `public class Ternary {
    public static void main(String[] args) {
        int age = 15;
        String group = age >= 18 ? "adult" : "child";
        System.out.println("Group: " + group);

        int a = 7;
        int b = 12;
        int bigger = a > b ? a : b;
        System.out.println("Bigger: " + bigger);

        // One or many: pick the right word
        int apples = 1;
        System.out.println("You have " + apples + (apples == 1 ? " apple" : " apples"));
        apples = 3;
        System.out.println("You have " + apples + (apples == 1 ? " apple" : " apples"));

        int number = 8;
        String kind = number % 2 == 0 ? "even" : "odd";
        System.out.println(number + " is " + kind);

        // Nested: readable only when lined up like a list
        int score = 73;
        String grade = score >= 90 ? "A"
                     : score >= 70 ? "B"
                     : "C";
        System.out.println("Grade: " + grade);
    }
}`,
    output: `Group: child
Bigger: 12
You have 1 apple
You have 3 apples
8 is even
Grade: B`,
    codeSummary: 'Five small decisions, each one picking a value: a word, a number, singular or plural, even or odd, and a grade from a lined-up chain.',
    codeExplanation: [
      { label: 'Line 4', code: `String group = age >= 18 ? "adult" : "child";`, text: '`age >= 18` is `false`, so the value after `:` is picked. `group` becomes `"child"`.' },
      { label: 'Line 9', code: `int bigger = a > b ? a : b;`, text: 'A classic: pick the bigger of two numbers. `Math.max(a, b)` does the same.' },
      { label: 'Line 14', code: `System.out.println("You have " + apples + (apples == 1 ? " apple" : " apples"));`, text: 'The parentheses are needed. The ternary has a very low priority; without them Java would glue the text first.' },
      { label: 'Line 19', code: `String kind = number % 2 == 0 ? "even" : "odd";`, text: '`%` runs first, then `==`, then `?:`. No parentheses needed, because the whole right side is the ternary.' },
      { label: 'Line 23', code: `int score = 73;`, text: 'The score for the grade chain below.' },
      { label: 'Line 24', code: `String grade = score >= 90 ? "A"`, text: 'First question: 90 or more? No, so Java goes to the part after the first `:`.' },
      { label: 'Line 25', code: `: score >= 70 ? "B"`, text: 'That part is a second ternary. 73 is 70 or more, so the result is `"B"`.' },
      { label: 'Line 26', code: `: "C";`, text: 'The value when every question was `false`. Lined up like this, the chain reads like a list.' }
    ],
    sections: [
      {
        title: 'Three parts, one value',
        text: [
          'Read `condition ? x : y` as: "is the condition true? Then x. Otherwise y."',
          'Java evaluates the condition first. Then it follows exactly one arrow.'
        ],
        mermaid: 'flowchart TD\n  C{"age >= 18 ?"} -->|"true"| T["value after ? : #quot;adult#quot;"]\n  C -->|"false"| F["value after : #quot;child#quot;"]\n  T --> R["result of the whole expression"]\n  F --> R',
        diagramNote: 'Two ways in, one value out. The branch that is not taken is never evaluated.'
      },
      {
        title: 'Ternary or if/else?',
        text: [
          'Both choose between two paths. The ternary chooses a **value**. `if`/`else` chooses which **statements** run. If you have not met `if` yet, the topic [Control Flow](../control-flow/index.html) comes next; this table is a preview.'
        ],
        table: {
          head: ['', 'Ternary `?:`', '`if` / `else`'],
          rows: [
            ['What it is', 'an expression (has a value)', 'a statement (does things)'],
            ['Typical use', 'pick one of two values', 'run one of two blocks of code'],
            ['Can go inside `println(...)`', 'yes', 'no'],
            ['Both branches needed', 'yes, always both', '`else` is optional'],
            ['Good for', 'one short line', 'several steps per branch']
          ]
        },
        fileName: 'BiggerOfTwo.java',
        code: `public class BiggerOfTwo {
    public static void main(String[] args) {
        int a = 4;
        int b = 9;

        // With the ternary operator: one value
        int max1 = a > b ? a : b;

        // With if/else: two assignments
        int max2;
        if (a > b) {
            max2 = a;
        } else {
            max2 = b;
        }

        System.out.println(max1 + " " + max2 + " " + Math.max(a, b));
    }
}`,
        output: `9 9 9`
      },
      {
        title: 'Only one branch runs',
        text: [
          'Like `&&` and `||`, the ternary is lazy. The branch that is not picked is not evaluated. You can use this to avoid a crash, such as a division by zero.',
          'The counter below proves it: only the picked branch increases it.'
        ],
        fileName: 'TernaryLazy.java',
        code: `public class TernaryLazy {
    public static void main(String[] args) {
        int total = 50;
        int count = 0;
        int average = count == 0 ? 0 : total / count;
        System.out.println("average: " + average);

        int left = 0;
        int right = 0;
        int picked = true ? ++left : ++right;
        System.out.println("picked " + picked + ", left " + left + ", right " + right);
    }
}`,
        output: `average: 0
picked 1, left 1, right 0`
      },
      {
        title: 'The type of the result',
        text: [
          'The ternary has one type, decided when the program is compiled. Java does not know yet which branch will win. So if the branches are an `int` and a `double`, the result is always a `double`, even when the `int` branch wins.',
          'Make both branches the type you want. If you need text, make both branches `String`.'
        ],
        fileName: 'TernaryTypes.java',
        code: `public class TernaryTypes {
    public static void main(String[] args) {
        boolean small = true;

        System.out.println(small ? 1 : 2.0);       // int and double: double
        System.out.println(small ? 1 : 2);         // both int: int

        int items = 3;
        String label = items > 0 ? "in stock" : "sold out";
        System.out.println(label);

        double price = items > 2 ? 9.5 : 12;       // 12 would become 12.0
        System.out.println(price);
    }
}`,
        output: `1.0
1
in stock
9.5`,
        warn: '`String s = ok ? "yes" : 0;` does not compile: `"yes"` and `0` have no common type that fits into a `String`.'
      },
      {
        title: 'Priority, parentheses and nesting',
        text: [
          'The ternary has the second-lowest priority of all operators; only assignment is lower. Almost everything else runs before it. Inside a text with `+`, wrap the ternary in parentheses.',
          'It groups from right to left (**right-associative**): `a ? b : c ? d : e` means `a ? b : (c ? d : e)`. That is why the grade chain in the main example works.',
          'Nest at most one level, and line it up. Deeper nesting is hard to read; use `if`/`else` or a `switch` (see Control Flow).'
        ],
        fileName: 'TernaryParentheses.java',
        code: `public class TernaryParentheses {
    public static void main(String[] args) {
        int lives = 0;

        // Wrong: "Lives: " + lives == 0 would compare a String with 0
        // System.out.println("Lives: " + lives == 0 ? "game over" : "go on");

        System.out.println("Status: " + (lives == 0 ? "game over" : "go on"));

        int t = 25;
        String weather = t > 30 ? "hot" : t > 15 ? "warm" : "cold";
        System.out.println("It is " + weather);
    }
}`,
        output: `Status: game over
It is warm`,
        tip: 'If a ternary does not fit on one line, it is too big. Rewrite it with `if`/`else`.'
      }
    ],
    technical: [
      '`javac` compiles the ternary into the same jumps as an `if`/`else`: evaluate the condition, jump to the code of one branch, and continue at a common point with the chosen value on the operand stack. That is why the other branch never runs.',
      'The type rules are in the Java Language Specification, section 15.25. Two numeric branches get binary numeric promotion (`int` and `double` give `double`). Two `String` branches give `String`. A primitive and its wrapper type (`int` and `Integer`) give the primitive, which can throw a `NullPointerException` if the wrapper is `null`.',
      'Precedence: the conditional operator sits one level above assignment and below `||`. So `a || b ? x : y` means `(a || b) ? x : y`, and `max = a > b ? a : b` needs no parentheses.',
      'Since Java 14 there is also the `switch` expression, which picks a value among many cases. The topic [Control Flow](../control-flow/index.html) shows it; it is the better tool when you have more than two choices.'
    ],
    tryIt: {
      steps: [
        'Create `Temperature.java` with `int celsius = 28;`.',
        'Store `String feel = celsius >= 25 ? "warm" : "cool";` and print it.',
        'Print `"Bring " + (celsius >= 25 ? "sunscreen" : "a jacket")`.',
        'Change `celsius` to `10` and run again.'
      ],
      see: '`warm` and `Bring sunscreen`; after the change `cool` and `Bring a jacket`.'
    },
    check: [
      { q: 'What does `int x = 5 > 3 ? 10 : 20;` store?', a: '`10`. The condition is `true`, so the value after `?` is picked.' },
      { q: 'Why does `System.out.println(true ? 1 : 2.0);` print `1.0`?', a: 'The two branches are `int` and `double`, so the whole expression has the type `double`. The picked `1` becomes `1.0`.' },
      { q: 'Why do you need parentheses in `"Hi " + (vip ? "boss" : "guest")`?', a: 'The ternary has a lower priority than `+`. Without parentheses Java would first build `"Hi " + vip` and then try to use that text as the condition.' }
    ],
    keyPoints: [
      '`condition ? a : b` is an expression with three operands.',
      'Only the picked branch is evaluated.',
      'Both branches give one common type; `int` and `double` give `double`.',
      'Very low priority: wrap it in parentheses inside text with `+`.',
      'Use it for short value choices; use `if`/`else` for steps.'
    ],
    commonMistakes: [
      'Leaving out the parentheses: `"x" + ok ? "a" : "b"` does not compile. Write `"x" + (ok ? "a" : "b")`.',
      'Using it as a statement: `ok ? doThis() : doThat();` does not compile. Use `if`/`else`.',
      'Nesting three or more levels on one line. Use `if`/`else` or a `switch`.',
      'Mixing types: `ok ? "yes" : 0` has no common type. Make both branches `String`.'
    ],
    related: ['Comparison', 'Logical Operators', 'Precedence and Associativity', 'Control Flow'],
    glossary: [
      { term: 'ternary operator', definition: 'condition ? a : b, the only Java operator with three operands. It picks one of two values.' },
      { term: 'right-associative', definition: 'Groups from right to left: a = b = c means a = (b = c).' }
    ]
  }
);
