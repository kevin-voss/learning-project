Java.topics.operators.lessons.push(
  {
    id: 'assignment',
    num: '03',
    title: 'Assignment',
    category: 'calculation',
    icon: '=',
    tagline: 'Store new values, and update old ones',
    realWorld: 'A scoreboard at a football match. When a team scores, someone wipes the old number away and writes the new one in its place.',
    kid: [
      'A variable is a box with a name on it. The `=` sign is your hand putting something into the box.',
      'Your hand always works from right to left. First you look at the right side and work out the new value. Then you put it into the box on the left. The old value is thrown away.',
      '`points += 5` is a short way to say: "look in the box, add 5, put the new number back in the same box".'
    ],
    definition: 'The **assignment operator** `=` stores the value of the right side in the variable on the left. **Compound assignment** operators like `+=` and `*=` read the variable, calculate with it, and store the result back.',
    explain: [
      'In math, `=` means "both sides are equal". In Java, `=` is an action: **store**. Read `points = 10` as "points becomes 10" or "put 10 into points".',
      'Java always does the right side first. In `points = points + 5`, it reads the current value of `points`, adds 5, and only then writes the new value into `points`. That is why a line that looks wrong in math is normal in Java.',
      'The left side must be something that can hold a value: a variable (later also an array slot or a field). `10 = points` does not compile, because you cannot store anything inside the number 10.',
      'A **compound assignment** combines an operator with `=`: `+=`, `-=`, `*=`, `/=` and `%=`. `x += 3` means `x = x + 3`. It is shorter and you name the variable only once.',
      'Compound assignment hides a **cast**: it converts the result back to the type of the variable. `byte b = 10; b += 1;` compiles, while `b = b + 1;` does not. Step 4 shows why, and when it hurts.'
    ],
    why: 'Programs change state: a score goes up, money goes down, a counter counts. Assignment is how a variable gets its new value.',
    whenUse: 'Use `=` to give a variable a value. Use `+=`, `-=`, `*=`, `/=`, `%=` when the new value depends on the old one.',
    syntax: '`variable = expression;` and `variable op= expression;` where `op` is one of `+ - * / %`.',
    fileName: 'Assignment.java',
    code: `public class Assignment {
    public static void main(String[] args) {
        int points = 10;              // = stores 10 in points
        System.out.println("Start: " + points);

        points = points + 5;          // read 10, add 5, store 15
        System.out.println("After points = points + 5: " + points);

        points += 5;                  // the same idea, shorter: 20
        System.out.println("After += 5: " + points);

        points *= 2;                  // 40
        System.out.println("After *= 2: " + points);

        points -= 4;                  // 36
        System.out.println("After -= 4: " + points);

        points /= 5;                  // 7 (integer division)
        System.out.println("After /= 5: " + points);

        points %= 4;                  // 3
        System.out.println("After %= 4: " + points);

        // The hidden cast: += squeezes the result back into a byte
        byte small = 120;
        small += 10;                  // 130 does not fit, it wraps to -126
        System.out.println("byte after += 10: " + small);
    }
}`,
    output: `Start: 10
After points = points + 5: 15
After += 5: 20
After *= 2: 40
After -= 4: 36
After /= 5: 7
After %= 4: 3
byte after += 10: -126`,
    codeSummary: 'One variable, many updates. Each line reads the old value of `points`, calculates, and stores the new value back.',
    codeExplanation: [
      { label: 'Line 3', code: `int points = 10;              // = stores 10 in points`, text: 'Declare the variable and give it a first value. This first assignment is called **initialization**.' },
      { label: 'Line 6', code: `points = points + 5;          // read 10, add 5, store 15`, text: 'The right side runs first with the old value `10`. Then the result `15` replaces it.' },
      { label: 'Line 9', code: `points += 5;                  // the same idea, shorter: 20`, text: 'Compound assignment: the same as `points = points + 5`, written once.' },
      { label: 'Line 12', code: `points *= 2;                  // 40`, text: 'Multiply the current value and store it: `20 * 2`.' },
      { label: 'Line 18', code: `points /= 5;                  // 7 (integer division)`, text: '`36 / 5` with `int` values is `7`. The `.2` is cut off, as in every `int` division.' },
      { label: 'Line 21', code: `points %= 4;                  // 3`, text: 'Keep only the remainder: `7 % 4` is `3`.' },
      { label: 'Line 25', code: `byte small = 120;`, text: 'A `byte` holds only -128 to 127.' },
      { label: 'Line 26', code: `small += 10;                  // 130 does not fit, it wraps to -126`, text: '`+=` casts the `int` result 130 back to `byte`. 130 is too big, so it wraps around to -126 without any error.' }
    ],
    sections: [
      {
        title: 'Right side first, then store',
        text: [
          'Java handles every assignment in the same two steps. Step one: calculate the right side completely. Step two: store that one value in the variable on the left.',
          'While the right side is calculated, the variable still has its old value. That is why `points = points + 5` works.'
        ],
        mermaid: 'flowchart LR\n  A["read points: 10"] --> B["calculate 10 + 5"]\n  B --> C["result 15"]\n  C --> D["store 15 in points"]\n  D --> E["old 10 is gone"]',
        diagramNote: 'The arrow goes one way: from the right side into the box on the left.',
        warn: '`10 = points;` does not compile: "unexpected type, required: variable, found: value". The variable must be on the left.'
      },
      {
        title: 'The compound operators',
        text: [
          'Each arithmetic operator has a compound form. They all follow the same pattern: `x op= y` means `x = x op (y)`.',
          'Look at the parentheses around `y`. The whole right side is calculated first. So `x *= 2 + 3` multiplies by `5`, not by `2`.'
        ],
        table: {
          head: ['You write', 'It means', 'If `x` was `10`'],
          rows: [
            ['`x += 3`', '`x = x + 3`', '`13`'],
            ['`x -= 3`', '`x = x - 3`', '`7`'],
            ['`x *= 3`', '`x = x * 3`', '`30`'],
            ['`x /= 3`', '`x = x / 3`', '`3` (`int` division)'],
            ['`x %= 3`', '`x = x % 3`', '`1`'],
            ['`x *= 2 + 3`', '`x = x * (2 + 3)`', '`50`, not `23`']
          ],
          note: 'The bitwise operators have compound forms too (`&=`, `|=`, `^=`, `<<=` …). The lesson **Bitwise Basics** shows them.'
        },
        fileName: 'Compound.java',
        code: `public class Compound {
    public static void main(String[] args) {
        int x = 10;
        x *= 2 + 3;                   // x = x * (2 + 3)
        System.out.println(x);

        String greeting = "Hi";
        greeting += " there";         // += also works for text
        greeting += "!";
        System.out.println(greeting);
    }
}`,
        output: `50
Hi there!`
      },
      {
        title: 'Assignment is an expression too',
        text: [
          'An assignment does not only store a value. It is also an expression, and its value is the value that was stored. So `a = b = 7` works: first `b = 7` runs and has the value `7`, then `a = 7` runs.',
          'This means `=` groups from right to left. The word for this is **right-associative**. The lesson **Precedence and Associativity** explains it for all operators.'
        ],
        fileName: 'ChainedAssignment.java',
        code: `public class ChainedAssignment {
    public static void main(String[] args) {
        int a;
        int b;
        int c;
        a = b = c = 7;                // c = 7, then b = 7, then a = 7
        System.out.println(a + " " + b + " " + c);

        int x;
        System.out.println(x = 5);    // stores 5 and prints the value 5
        System.out.println(x);
    }
}`,
        output: `7 7 7
5
5`,
        tip: 'Chained assignment is fine for "set everything to zero". Do not hide an assignment inside a `println` or a calculation; it is hard to read.'
      },
      {
        title: 'The hidden cast in compound assignment',
        text: [
          'You learned in **Arithmetic** that `byte + int` is calculated as `int`. So `b = b + 1` tries to put an `int` into a `byte`. Java refuses: "incompatible types: possible lossy conversion from int to byte".',
          '`b += 1` compiles. The rule is that `x op= y` means `x = (type of x) (x op y)`. The cast is built in. The same happens with `int` and `double`: `total += 2.7` on an `int` adds `2.7`, then cuts the result back to a whole number.',
          'The hidden cast is handy, but it can lose data without a warning. If the result does not fit the type, it wraps around (see [Ranges and Overflow](../types-and-variables/index.html)).'
        ],
        fileName: 'HiddenCast.java',
        code: `public class HiddenCast {
    public static void main(String[] args) {
        byte b = 10;
        // b = b + 1;                 // does not compile: int into byte
        b += 1;                       // compiles: b = (byte) (b + 1)
        System.out.println("b = " + b);

        int total = 10;
        total += 2.7;                 // total = (int) (10 + 2.7) = 12
        System.out.println("total = " + total);

        short s = 32767;              // the biggest short
        s += 1;                       // wraps to the smallest short
        System.out.println("s = " + s);
    }
}`,
        output: `b = 11
total = 12
s = -32768`,
        warn: '`total += 2.7` on an `int` silently drops `.7`. If you need decimals, make the variable a `double`.'
      },
      {
        title: 'Typos that still compile',
        text: [
          'Swap the two characters of `+=` and you get `=+`. Java reads `x =+ 5` as `x = +5`: store plus five. The program runs, but it does not add anything.',
          'The same goes for `=-`: `x =- 2` stores `-2`.'
        ],
        fileName: 'Typo.java',
        code: `public class Typo {
    public static void main(String[] args) {
        int x = 10;
        x =+ 5;                       // means x = +5
        System.out.println("x =+ 5 gives " + x);

        int y = 10;
        y += 5;                       // means y = y + 5
        System.out.println("y += 5 gives " + y);
    }
}`,
        output: `x =+ 5 gives 5
y += 5 gives 15`,
        tip: 'Read compound operators out loud: "plus-equals". The operator always comes first, then `=`.'
      }
    ],
    technical: [
      'The Java Language Specification defines `E1 op= E2` as `E1 = (T) ((E1) op (E2))`, where `T` is the type of `E1`, and `E1` is evaluated only once. That one sentence explains both the built-in cast and the parentheses around the right side.',
      'For a local `int` variable, `x = x + 5` compiles to four bytecode instructions: `iload` (push x on the operand stack), `iconst_5` or `bipush 5` (push 5), `iadd` (add the two), `istore` (write back). The JVM keeps local variables in numbered slots of the current method call, and calculates on a small **operand stack**.',
      'For `x += 5` on a local `int`, `javac` usually emits one instruction, `iinc`, which adds a constant directly to the slot. For a `byte`, the compiler adds `i2b` after the addition: that is the hidden cast, which keeps only the lowest 8 bits.',
      'The value of an assignment expression is the new value of the variable. That is what makes `a = b = 7` and `System.out.println(x = 5)` legal.'
    ],
    tryIt: {
      steps: [
        'Create `Wallet.java` with `int money = 50;`.',
        'Spend 12 with `money -= 12;` and print `money`.',
        'Double it with `money *= 2;` and print it again.',
        'Write `money =- 10;` (the typo on purpose) and print it.'
      ],
      see: '`38`, then `76`, then `-10`: the typo replaced the value instead of subtracting.'
    },
    check: [
      { q: 'What is `x` after `int x = 4; x *= 3 + 1;`?', a: '`16`. The right side is calculated first: `x = x * (3 + 1)`.' },
      { q: 'Why does `byte b = 1; b += 1;` compile but `b = b + 1;` not?', a: '`b + 1` is an `int`. Plain `=` will not narrow it to `byte`. Compound assignment has a cast built in: `b = (byte) (b + 1)`.' },
      { q: 'What does `a = b = 3` do?', a: '`=` groups right to left. First `b = 3`, which has the value `3`, then `a = 3`.' }
    ],
    keyPoints: [
      '`=` means "store", not "is equal". `==` asks about equality.',
      'The right side is always calculated first, with the old values.',
      '`x op= y` means `x = (type of x) (x op (y))`.',
      'Compound assignment casts back silently. It can cut off decimals or wrap around.',
      'An assignment is an expression whose value is the stored value; `=` is right-associative.'
    ],
    commonMistakes: [
      'Writing the value on the left: `10 = points;`. The variable goes on the left: `points = 10;`.',
      'Typing `x =+ 5` instead of `x += 5`. It stores `5` instead of adding.',
      'Expecting `x *= 2 + 3` to be `x * 2 + 3`. It is `x * (2 + 3)`.',
      'Using `int total` with `total += 2.7` and wondering where the decimals went. Use a `double`.',
      'Mixing up `=` and `==` in a question: `done = true` stores, `done == true` asks.'
    ],
    related: ['Arithmetic', 'Increment and Decrement', 'Types and Variables'],
    glossary: [
      { term: 'compound assignment', definition: 'An operator like += or *= that calculates with the current value of a variable and stores the result back.' },
      { term: 'initialization', definition: 'The first assignment that gives a variable its starting value.' }
    ]
  }
);
