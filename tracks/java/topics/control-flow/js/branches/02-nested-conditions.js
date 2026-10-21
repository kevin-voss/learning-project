(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'nested-conditions',
    num: '02',
    title: 'Nested and Combined Conditions',
    category: 'branches',
    icon: '&&',
    tagline: 'Ask two questions at once, or one inside another',
    realWorld: 'The ride at the fair. The guard asks: "Are you 8 or older?" Only if you say yes, she asks the second question: "Are you taller than the red line?" You ride only with two yes answers.',
    kid: [
      'Imagine two doors, one behind the other. You can only reach the second door if the first one opened. That is a question inside a question.',
      'Sometimes you need two things at the same time: "You may have dessert if you ate your vegetables AND you said please." Both must be yes.',
      'Other times one thing is enough: "You may go outside if it is sunny OR you wear your raincoat." One yes is enough.'
    ],
    definition: 'A **nested** if is an `if` inside the block of another `if`. A **combined** condition joins several questions with `&&` (and), `||` (or) and `!` (not) into one condition. Both let you decide on more than one fact.',
    explain: [
      '**Nested** means "placed inside another one of the same kind". The inner `if` is only asked when the outer condition was true. Each inner `if` can have its own `else`.',
      'The logical operators come from [Operators](../operators/index.html): `a && b` is true only when both are true, `a || b` is true when at least one is true, and `!a` turns true into false and false into true.',
      'Nesting and combining often say the same thing. `if (a) { if (b) { … } }` runs the inner block in the same cases as `if (a && b) { … }`. Nesting is better when the outer and the inner question each need their own `else` message. Combining is better when you only care about "all yes".',
      'Both `&&` and `||` are **short-circuit** operators: Java stops reading as soon as the answer is clear. With `false && …` the right side never runs. This lets the left side act as a guard that protects the right side, for example from dividing by zero.',
      'Deep nesting (an if in an if in an if …) is hard to read. You can often flatten it into one `if / else if` chain with combined conditions.'
    ],
    why: 'Real decisions depend on several facts at once: age and height, user name and password, day and time. One single comparison is rarely enough.',
    whenUse: 'Use `&&` when every fact must be true, `||` when one is enough, and nesting when each level needs its own answer.',
    syntax: '`if (a && b) { … }`  `if (a || b) { … }`  `if (!a) { … }`  `if (a) { if (b) { … } else { … } } else { … }`',
    mermaid: `flowchart TD
  A{"age >= 8?"} -- no --> Y["too young to ride alone"]
  A -- yes --> B{"heightCm >= 120?"}
  B -- no --> S["too short, sorry"]
  B -- yes --> R["you may ride alone"]`,
    visualLabel: 'A question inside a question',
    visualNote: 'The height question sits on the yes arrow of the age question. A 6-year-old never gets asked about height.',
    fileName: 'RideCheck.java',
    code: `public class RideCheck {
    public static void main(String[] args) {
        int age = 9;
        int heightCm = 128;
        boolean withAdult = false;

        // Nested: one question inside another
        if (age >= 8) {
            if (heightCm >= 120) {
                System.out.println("Nested: you may ride alone.");
            } else {
                System.out.println("Nested: too short, sorry.");
            }
        } else {
            System.out.println("Nested: too young to ride alone.");
        }

        // Combined: both questions in one condition
        if (age >= 8 && heightCm >= 120) {
            System.out.println("Combined: you may ride alone.");
        }

        // Either one is enough
        if (age >= 8 || withAdult) {
            System.out.println("You may enter the ride area.");
        }

        // ! turns true into false and false into true
        if (!withAdult) {
            System.out.println("No adult with you today.");
        }
    }
}`,
    output: `Nested: you may ride alone.
Combined: you may ride alone.
You may enter the ride area.
No adult with you today.`,
    codeSummary: 'The same ride rule written twice: once nested, once combined with `&&`. Then `||` and `!` on the same values.',
    codeExplanation: [
      { label: 'Line 8', code: 'if (age >= 8) {', text: 'The outer question. `9 >= 8` is true, so Java enters this block and reaches the inner if.' },
      { label: 'Line 9', code: 'if (heightCm >= 120) {', text: 'The inner question. It is only asked for children of 8 or older. `128 >= 120` is true.' },
      { label: 'Line 11', code: '} else {', text: 'The inner else: old enough, but too short. It belongs to the inner if, because it sits inside the outer block.' },
      { label: 'Line 14', code: '} else {', text: 'The outer else: younger than 8. Height does not matter here.' },
      { label: 'Line 19', code: 'if (age >= 8 && heightCm >= 120) {', text: 'The same rule in one line. `&&` needs both sides to be true. There is no message for "too short" in this form.' },
      { label: 'Line 24', code: 'if (age >= 8 || withAdult) {', text: '`||` needs only one true side. Age is enough, so `withAdult` does not even get read: short-circuit.' },
      { label: 'Line 29', code: 'if (!withAdult) {', text: '`withAdult` is false, so `!withAdult` is true and the line prints.' }
    ],
    sections: [
      {
        title: 'Every combination, in one table',
        text: [
          'Two yes/no facts give four combinations. Before you write nested ifs, write the four rows down. Then check that your code gives the right message for each row.'
        ],
        table: {
          head: ['age', 'heightCm', '`age >= 8`', '`heightCm >= 120`', 'Nested message', '`&&` version prints?'],
          rows: [
            ['9', '128', 'true', 'true', 'you may ride alone', 'yes'],
            ['9', '110', 'true', 'false', 'too short, sorry', 'no'],
            ['6', '128', 'false', 'not asked', 'too young to ride alone', 'no'],
            ['6', '110', 'false', 'not asked', 'too young to ride alone', 'no']
          ],
          note: '"not asked" is the key idea of nesting: the inner question only exists on one path.'
        }
      },
      {
        title: 'Ranges and lists of values with && and ||',
        text: [
          'A range like "between 18 and 24" needs two comparisons joined with `&&`. Java has no `18 <= temp <= 24` form; that does not compile.',
          'A list like "Saturday or Sunday" is several `==` tests joined with `||`.'
        ],
        fileName: 'Ranges.java',
        code: `public class Ranges {
    public static void main(String[] args) {
        int temperature = 21;
        int day = 6; // 1 = Monday ... 7 = Sunday

        if (temperature >= 18 && temperature <= 24) {
            System.out.println(temperature + " degrees: comfortable");
        }

        if (temperature < 0 || temperature > 35) {
            System.out.println("Extreme weather!");
        } else {
            System.out.println("Normal weather.");
        }

        if (day == 6 || day == 7) {
            System.out.println("Day " + day + " is a weekend day.");
        }

        boolean isWorkday = !(day == 6 || day == 7);
        System.out.println("Workday? " + isWorkday);
    }
}`,
        output: `21 degrees: comfortable
Normal weather.
Day 6 is a weekend day.
Workday? false`,
        tip: 'Give a long condition a name: `boolean isWeekend = day == 6 || day == 7;` and then write `if (isWeekend)`. The code then reads like a sentence.'
      },
      {
        title: 'A guard on the left side',
        text: [
          'Because `&&` stops at the first false side, you can put a safety check on the left. Here the left side checks that `count` is not 0. Only then the right side divides by `count`.',
          'If you swap the two sides, Java divides first and the program crashes with an `ArithmeticException` (a run-time error: "/ by zero").'
        ],
        mermaid: `flowchart LR
  A{"count != 0?"} -- false --> F["whole condition is false, right side skipped"]
  A -- true --> B{"total / count > 5?"}
  B -- true --> T["condition true"]
  B -- false --> F2["condition false"]`,
        diagramNote: 'The division only happens on the true arrow of the guard.',
        fileName: 'Guard.java',
        code: `public class Guard {
    public static void main(String[] args) {
        int total = 30;
        int count = 0;

        if (count != 0 && total / count > 5) {
            System.out.println("Average is above 5");
        } else {
            System.out.println("No average to show");
        }

        count = 4;
        if (count != 0 && total / count > 5) {
            System.out.println("Average " + (total / count) + " is above 5");
        }
    }
}`,
        output: `No average to show
Average 7 is above 5`
      },
      {
        title: 'Flatten a pyramid of ifs',
        text: [
          'Each level of nesting moves the code to the right. Three levels deep, nobody sees which `else` belongs to which `if`. Most such pyramids can become one flat `else if` chain.',
          'Both methods below give the same prices. The flat one is easier to read and to extend.'
        ],
        fileName: 'TicketPrice.java',
        code: `public class TicketPrice {
    public static void main(String[] args) {
        int age = 15;
        boolean isStudent = true;

        // Pyramid: hard to read
        int pyramid;
        if (age < 6) {
            pyramid = 0;
        } else {
            if (age < 18) {
                pyramid = 5;
            } else {
                if (isStudent) {
                    pyramid = 7;
                } else {
                    pyramid = 10;
                }
            }
        }

        // Flat chain: same rules, one level
        int flat;
        if (age < 6) {
            flat = 0;
        } else if (age < 18) {
            flat = 5;
        } else if (isStudent) {
            flat = 7;
        } else {
            flat = 10;
        }

        System.out.println("Pyramid price: " + pyramid);
        System.out.println("Flat price: " + flat);
    }
}`,
        output: `Pyramid price: 5
Flat price: 5`,
        warn: 'An `else` always belongs to the nearest `if` above it that has no else yet. Without braces this "dangling else" can attach to the wrong if. Braces on every if make it clear.'
      },
      {
        title: 'Compare text with equals, not ==',
        text: [
          'For numbers, `==` compares values. For a `String`, `==` asks "is this the very same object in memory?", which is often false even when the letters are the same. Use `text.equals("yes")` in conditions. ([String](../types-and-variables/index.html) has the details.)'
        ],
        fileName: 'Answer.java',
        code: `public class Answer {
    public static void main(String[] args) {
        String answer = new String("yes");

        System.out.println("== says: " + (answer == "yes"));
        System.out.println("equals says: " + answer.equals("yes"));

        if (answer.equals("yes") || answer.equals("y")) {
            System.out.println("You said yes.");
        }
    }
}`,
        output: `== says: false
equals says: true
You said yes.`
      }
    ],
    technical: [
      '`javac` compiles `a && b` into two conditional jumps: "if a is false, jump to the else part", then "if b is false, jump to the else part". That is exactly the bytecode of a nested if without inner else. So the two forms run equally fast; choose the one that reads better.',
      'Short-circuit is guaranteed by the Java Language Specification, so a guard like `count != 0 && total / count > 5` is safe on every JVM. The non-short-circuit forms `&` and `|` also work on booleans, but they always evaluate both sides. Do not use them in conditions.',
      'The precedence of `&&` is higher than `||`, so `a || b && c` means `a || (b && c)`. Write brackets whenever you mix the two; the compiler does not care, but the next reader does.'
    ],
    tryIt: {
      steps: [
        'Copy `RideCheck.java` and run it.',
        'Set `age = 9` and `heightCm = 110`, run again.',
        'Set `age = 6` and `withAdult = true`, run again.',
        'Add a combined if that prints `Family ride` when `age < 8 && withAdult` is true.'
      ],
      see: 'First `too short, sorry`. Then `too young to ride alone`, `You may enter the ride area.` and your new `Family ride` line.'
    },
    check: [
      { q: 'Write a condition that is true when `n` is between 1 and 10 (both included).', a: '`n >= 1 && n <= 10`. The form `1 <= n <= 10` does not compile in Java.' },
      { q: 'Why does `count != 0 && total / count > 5` not crash when `count` is 0?', a: 'Short-circuit: the left side is false, so Java knows the whole `&&` is false and never runs the division.' },
      { q: 'Which `if` does an `else` belong to?', a: 'To the nearest `if` above it that has no `else` yet, inside the same block. Braces make it visible.' }
    ],
    keyPoints: [
      'An inner if is only asked when the outer condition is true.',
      '`&&`: all sides true. `||`: at least one side true. `!`: the opposite.',
      'Write ranges as `x >= low && x <= high`.',
      'Put a safety check on the left of `&&` as a guard.',
      'Flatten deep nesting into one `else if` chain.',
      'Compare Strings with `.equals(…)`.'
    ],
    commonMistakes: [
      '`if (1 <= n <= 10)` does not compile. Write `if (n >= 1 && n <= 10)`.',
      '`if (day == 6 || 7)` does not compile. Repeat the variable: `day == 6 || day == 7`.',
      '`if (total / count > 5 && count != 0)` crashes when count is 0. Put the guard first.',
      '`if (answer == "yes")` compares objects. Write `answer.equals("yes")`.',
      'Five levels of nested ifs. Flatten them into an `else if` chain.'
    ],
    related: ['if / else if / else', 'switch Statement', 'Logical Operators', 'Precedence and Short-Circuit'],
    glossary: CF.glossary
  });
})();
