Java.topics.operators.lessons.push(
  {
    id: 'logical',
    num: '08',
    title: 'Logical Operators',
    category: 'decisions',
    icon: '&&',
    tagline: 'Combine yes-or-no answers with and, or, not',
    realWorld: 'The rules at a cinema door. You may go in if you have a ticket **and** you are old enough for the film. You get free popcorn if it is your birthday **or** you have a gold card.',
    kid: [
      'Mum says: "You may go outside if you finished your homework AND it is not raining." Both things must be true. If one is false, you stay inside.',
      'Dad says: "We eat pizza if it is Friday OR somebody has a birthday." One true thing is enough.',
      'And NOT turns an answer around: "not raining" is yes when "raining" is no.',
      'A clever trick: if the homework is not finished, Mum does not even look out of the window. The answer is already no. Java does the same and stops checking early.'
    ],
    definition: 'Logical operators combine `boolean` values: `&&` (and) is `true` only when both sides are `true`, `||` (or) is `true` when at least one side is `true`, and `!` (not) flips `true` and `false`. `&&` and `||` **short-circuit**: they skip the right side when the left side already decides the answer.',
    explain: [
      'The operands of logical operators must be `boolean`: comparisons like `age >= 18`, `boolean` variables like `hasTicket`, or other logical expressions. `1 && 0` does not compile in Java.',
      '`&&` is the logical **AND**. `a && b` is `true` only if `a` is `true` and `b` is `true`.',
      '`||` is the logical **OR**. `a || b` is `true` if `a` is `true`, or `b` is `true`, or both. It is not "either-or": both `true` gives `true`.',
      '`!` is the logical **NOT**, a unary operator with one operand. `!true` is `false`, `!false` is `true`. Put it right before the value: `!hasTicket`.',
      '**Short-circuit evaluation**: Java evaluates the left side first. For `&&`, a `false` left side means the result is `false` whatever comes next, so the right side is not evaluated at all. For `||`, a `true` left side means `true`, and the right side is skipped. This makes checks like `name != null && name.length() > 5` safe.'
    ],
    why: 'Real rules have more than one part: "logged in and admin", "weekend or holiday", "not empty". Logical operators let you write such rules as one condition.',
    whenUse: 'Whenever a decision depends on two or more yes-or-no answers, and to guard a risky check with a safe one first.',
    syntax: '`a && b`, `a || b`, `!a`, where `a` and `b` are `boolean` expressions.',
    fileName: 'LogicalOperators.java',
    code: `public class LogicalOperators {
    public static void main(String[] args) {
        int age = 20;
        boolean hasTicket = true;
        boolean isVip = false;

        // && : both sides must be true
        boolean canEnter = age >= 18 && hasTicket;
        System.out.println("can enter: " + canEnter);

        // || : at least one side must be true
        boolean freeDrink = isVip || age > 65;
        System.out.println("free drink: " + freeDrink);

        // ! : flips true and false
        System.out.println("not VIP: " + !isVip);

        // Combine them; parentheses make the meaning clear
        boolean backstage = (isVip || age >= 18) && hasTicket;
        System.out.println("backstage: " + backstage);

        // Short-circuit: the right side runs only when it is needed
        String name = null;
        boolean longName = name != null && name.length() > 5;
        System.out.println("long name: " + longName);
    }
}`,
    output: `can enter: true
free drink: false
not VIP: true
backstage: true
long name: false`,
    codeSummary: 'Entry rules written with `&&`, `||` and `!`, and a `null` check that is safe because `&&` short-circuits.',
    codeExplanation: [
      { label: 'Line 8', code: `boolean canEnter = age >= 18 && hasTicket;`, text: 'Comparisons run before `&&`, so this is `(age >= 18) && hasTicket` = `true && true` = `true`.' },
      { label: 'Line 12', code: `boolean freeDrink = isVip || age > 65;`, text: '`false || false` is `false`. One `true` would have been enough.' },
      { label: 'Line 16', code: `System.out.println("not VIP: " + !isVip);`, text: '`!` flips `false` into `true`. It binds tightly, so no parentheses are needed around `!isVip`.' },
      { label: 'Line 19', code: `boolean backstage = (isVip || age >= 18) && hasTicket;`, text: 'The parentheses make the `||` happen first: `(false || true) && true` = `true`.' },
      { label: 'Line 23', code: `String name = null;`, text: '`null` means the variable points to no `String` object at all.' },
      { label: 'Line 24', code: `boolean longName = name != null && name.length() > 5;`, text: '`name != null` is `false`, so `&&` stops. `name.length()` is never called, which would crash on `null`.' }
    ],
    sections: [
      {
        title: 'Truth tables',
        text: [
          'A **truth table** lists every combination of inputs and the result. With two `boolean` inputs there are only four combinations, so you can learn the whole table.',
          'Read a row from left to right: "if `a` is false and `b` is true, then `a && b` is false and `a || b` is true".'
        ],
        table: {
          head: ['`a`', '`b`', '`a && b`', '`a || b`', '`!a`', '`a ^ b`'],
          rows: [
            ['`false`', '`false`', '`false`', '`false`', '`true`', '`false`'],
            ['`false`', '`true`', '`false`', '`true`', '`true`', '`true`'],
            ['`true`', '`false`', '`false`', '`true`', '`false`', '`true`'],
            ['`true`', '`true`', '`true`', '`true`', '`false`', '`false`']
          ],
          note: '`&&` has only one `true` row. `||` has only one `false` row. `^` (XOR, "exclusive or") is `true` when the two sides differ; it is shown in step 5.'
        },
        fileName: 'TruthTable.java',
        code: `public class TruthTable {
    public static void main(String[] args) {
        boolean a = false;
        boolean b = false;
        System.out.println(a + " " + b + " -> and " + (a && b) + ", or " + (a || b));

        b = true;
        System.out.println(a + " " + b + " -> and " + (a && b) + ", or " + (a || b));

        a = true;
        b = false;
        System.out.println(a + " " + b + " -> and " + (a && b) + ", or " + (a || b));

        b = true;
        System.out.println(a + " " + b + " -> and " + (a && b) + ", or " + (a || b));
    }
}`,
        output: `false false -> and false, or false
false true -> and false, or true
true false -> and false, or true
true true -> and true, or true`
      },
      {
        title: 'Short-circuit: Java stops when the answer is known',
        text: [
          'Java always looks at the left operand first. Sometimes the left side already decides everything. Then Java does not evaluate the right side at all.',
          'To see it, the right side below changes a counter with `++checks`. If the counter does not move, the right side was skipped.'
        ],
        mermaid: 'flowchart TD\n  A["evaluate a"] --> Q{"a is false?"}\n  Q -->|"yes"| F["a && b is false, b is skipped"]\n  Q -->|"no"| B["evaluate b"]\n  B --> R["a && b is the value of b"]',
        diagramNote: 'For `a || b` it is the mirror image: if `a` is `true`, the result is `true` and `b` is skipped.',
        fileName: 'ShortCircuit.java',
        code: `public class ShortCircuit {
    public static void main(String[] args) {
        int checks = 0;
        boolean ready = false;

        boolean r1 = ready && ++checks > 0;   // left is false: right is skipped
        System.out.println("r1 = " + r1 + ", checks = " + checks);

        boolean r2 = !ready || ++checks > 0;  // left is true: right is skipped
        System.out.println("r2 = " + r2 + ", checks = " + checks);

        boolean r3 = !ready && ++checks > 0;  // left is true: right must run
        System.out.println("r3 = " + r3 + ", checks = " + checks);
    }
}`,
        output: `r1 = false, checks = 0
r2 = true, checks = 0
r3 = true, checks = 1`
      },
      {
        title: 'Guards: put the safe check first',
        text: [
          'Short-circuit is not only faster. It protects you. Put the check that makes the risky part safe on the left of `&&`.',
          'Dividing by a count that can be 0 crashes with `ArithmeticException`. Calling a method on `null` crashes with `NullPointerException`. A **guard** on the left prevents both.'
        ],
        fileName: 'Guards.java',
        code: `public class Guards {
    public static void main(String[] args) {
        int total = 50;
        int count = 0;

        // Safe: count != 0 is false, so total / count never runs
        boolean highAverage = count != 0 && total / count > 10;
        System.out.println("high average: " + highAverage);

        String word = null;
        boolean startsWithA = word != null && word.startsWith("A");
        System.out.println("starts with A: " + startsWithA);

        word = "Apple";
        startsWithA = word != null && word.startsWith("A");
        System.out.println("starts with A: " + startsWithA);
    }
}`,
        output: `high average: false
starts with A: false
starts with A: true`,
        warn: 'Order matters. `total / count > 10 && count != 0` crashes, because the division runs before the guard.'
      },
      {
        title: '& and | without short-circuit, and ^',
        text: [
          'With `boolean` operands, a single `&` and a single `|` give the same results as `&&` and `||`. But they **always** evaluate both sides. There is no short-circuit.',
          '`^` (XOR) is `true` when exactly one side is `true`. You rarely need these three for conditions; on whole numbers they work on bits (see **Bitwise Basics**).'
        ],
        fileName: 'NoShortCircuit.java',
        code: `public class NoShortCircuit {
    public static void main(String[] args) {
        int checks = 0;
        boolean ready = false;

        boolean r1 = ready & ++checks > 0;    // both sides run
        System.out.println("r1 = " + r1 + ", checks = " + checks);

        boolean r2 = !ready | ++checks > 0;   // both sides run
        System.out.println("r2 = " + r2 + ", checks = " + checks);

        boolean lightOn = true;
        boolean doorOpen = true;
        System.out.println("exactly one: " + (lightOn ^ doorOpen));
    }
}`,
        output: `r1 = false, checks = 1
r2 = true, checks = 2
exactly one: false`,
        tip: 'In conditions, use `&&` and `||`. A single `&` in a condition is almost always a typo.'
      },
      {
        title: 'Not, and De Morgan\'s rules',
        text: [
          '`!` belongs to the value right after it. `!a && b` means `(!a) && b`. To negate a whole condition, wrap it in parentheses: `!(a && b)`.',
          '**De Morgan\'s rules** tell you how to push a `!` inside: `!(a && b)` is the same as `!a || !b`, and `!(a || b)` is the same as `!a && !b`. The `&&` turns into `||` and back.',
          'Use them to make conditions easier to read. "Not (weekend or holiday)" reads better as "not weekend and not holiday".'
        ],
        table: {
          head: ['Hard to read', 'Same, easier', 'In words'],
          rows: [
            ['`!(age >= 18)`', '`age < 18`', 'under 18'],
            ['`!(a && b)`', '`!a || !b`', 'at least one is missing'],
            ['`!(weekend || holiday)`', '`!weekend && !holiday`', 'a normal working day'],
            ['`!(x < 0 || x > 9)`', '`x >= 0 && x <= 9`', 'x is in 0..9']
          ]
        }
      }
    ],
    technical: [
      'The JVM has no instruction for "and" or "or" on `boolean` values. `javac` compiles `a && b` into jumps: test `a`; if it is `false`, jump past the code for `b`. That jump is exactly the short-circuit. `a & b` on `boolean` instead compiles to `iand`, which needs both values on the stack, so both sides run.',
      'Inside the JVM a `boolean` is an `int` that is `0` or `1`. Java the language still forbids `1 && 0` and `if (1)`, so you cannot mix up numbers and truth values like in C.',
      'Precedence among the logical operators: `!` is highest (with the other unary operators), then comparisons, then `&&`, then `||`. So `a || b && c` means `a || (b && c)`. The lesson **Precedence and Associativity** has the full table.',
      'The Java Language Specification guarantees left-to-right evaluation of operands. That guarantee is what makes guards like `x != null && x.isEmpty()` reliable.'
    ],
    tryIt: {
      steps: [
        'Create `Weekend.java` with `boolean saturday = false;` and `boolean sunday = true;`.',
        'Print `saturday || sunday` and `saturday && sunday`.',
        'Print `!(saturday || sunday)` and `!saturday && !sunday`.',
        'Make `int n = 0;` and print `n != 0 && 10 / n > 1`. Then swap the two sides and run again.'
      ],
      see: '`true`, `false`, `false`, `false`, then `false`. After the swap, the program stops with `ArithmeticException: / by zero`.'
    },
    check: [
      { q: 'What is `true || false && false`?', a: '`true`. `&&` runs before `||`: `true || (false && false)` = `true || false` = `true`.' },
      { q: 'In `a && b`, when is `b` not evaluated?', a: 'When `a` is `false`. The result is `false` anyway, so Java skips `b`.' },
      { q: 'Rewrite `!(x > 5 && y > 5)` without the `!` in front.', a: '`x <= 5 || y <= 5` (De Morgan: `!` goes inside, `&&` becomes `||`, each comparison flips).' }
    ],
    keyPoints: [
      '`&&` needs both sides `true`; `||` needs at least one; `!` flips.',
      'Operands must be `boolean`.',
      '`&&` skips the right side if the left is `false`; `||` skips it if the left is `true`.',
      'Put the guard first: `x != null && x.length() > 0`.',
      '`!(a && b)` equals `!a || !b`; `!(a || b)` equals `!a && !b`.'
    ],
    commonMistakes: [
      'Writing `&` or `|` in a condition. They do not short-circuit. Use `&&` and `||`.',
      'Putting the risky part first: `total / count > 1 && count != 0`. Put the guard on the left.',
      'Writing `x == 1 || 2` to mean "x is 1 or 2". Each side needs a full comparison: `x == 1 || x == 2`.',
      'Forgetting parentheses with `!`: `!a && b` is not `!(a && b)`.',
      'Mixing `&&` and `||` without parentheses and guessing the grouping. Add parentheses.'
    ],
    related: ['Comparison', 'Ternary Operator', 'Precedence and Associativity', 'Control Flow'],
    glossary: [
      { term: 'short-circuit', definition: '&& and || evaluate the right side only when the left side does not already decide the result.' },
      { term: 'truth table', definition: 'A table of every combination of boolean inputs and the result of an operator.' },
      { term: 'guard', definition: 'A safe check on the left of && that protects a risky check on the right.' }
    ]
  }
);
