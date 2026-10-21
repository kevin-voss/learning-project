Java.topics.operators.lessons.push(
  {
    id: 'comparison',
    num: '07',
    title: 'Comparison',
    category: 'decisions',
    icon: '==',
    tagline: 'Ask yes-or-no questions about values',
    realWorld: 'The height sign at a roller coaster: "You must be at least 120 cm". You stand next to it, and the answer is yes or no. Nothing in between.',
    kid: [
      'A comparison is a question with only two answers: yes or no.',
      '"Is 9 bigger than 4?" Yes. "Is 3 the same as 5?" No. Java says `true` for yes and `false` for no.',
      'You can keep the answer in a box, like a sticker that says yes or no. Later, Java uses these answers to decide what to do next.'
    ],
    definition: 'Comparison operators (also called **relational** and **equality** operators) compare two values and produce a `boolean`: `true` or `false`. They are `==`, `!=`, `<`, `<=`, `>` and `>=`.',
    explain: [
      'A `boolean` is the type with exactly two values: `true` and `false`. You met it in [Types and Variables](../types-and-variables/index.html). Every comparison produces one.',
      '`==` asks "are these equal?" and `!=` asks "are these different?". `<`, `<=`, `>` and `>=` ask about order: less than, less than or equal, greater than, greater than or equal.',
      'Two-character operators are written without a space and in a fixed order: `<=`, `>=`, `!=`. `=<` and `=!` are not operators.',
      'Numbers of different types are compared by their value, after numeric promotion: `7 == 7.0` is `true`. A `char` is compared by its Unicode code, so `\'a\' < \'b\'` is `true`.',
      'A comparison is an expression. You can print its value, store it in a `boolean` variable, or use it as the condition of an `if` or a loop. `if (condition) { … }` runs the block only when the condition is `true`; the topic [Control Flow](../control-flow/index.html) teaches it.'
    ],
    why: 'Programs make decisions: is the password long enough, is the player out of lives, is the item in stock. Every decision starts with a comparison.',
    whenUse: 'Whenever you need a yes-or-no answer about numbers or characters: limits, ranges, equality, order.',
    syntax: '`left == right`, `left != right`, `left < right`, `left <= right`, `left > right`, `left >= right`.',
    fileName: 'Comparison.java',
    code: `public class Comparison {
    public static void main(String[] args) {
        int score = 82;

        System.out.println("score == 100: " + (score == 100));
        System.out.println("score != 0:   " + (score != 0));
        System.out.println("score > 80:   " + (score > 80));
        System.out.println("score >= 82:  " + (score >= 82));
        System.out.println("score < 60:   " + (score < 60));
        System.out.println("score <= 81:  " + (score <= 81));

        // A comparison gives a boolean you can store
        boolean passed = score >= 50;
        System.out.println("passed: " + passed);

        // int and double compare by value
        System.out.println("7 == 7.0: " + (7 == 7.0));

        // chars compare by their code number
        System.out.println("'a' < 'b': " + ('a' < 'b'));
        System.out.println("'Z' < 'a': " + ('Z' < 'a'));
    }
}`,
    output: `score == 100: false
score != 0:   true
score > 80:   true
score >= 82:  true
score < 60:   false
score <= 81:  false
passed: true
7 == 7.0: true
'a' < 'b': true
'Z' < 'a': true`,
    codeSummary: 'Six questions about the same score, one stored answer, and two comparisons across types.',
    codeExplanation: [
      { label: 'Line 5', code: `System.out.println("score == 100: " + (score == 100));`, text: '`==` with two equals signs asks a question. The parentheses make the comparison happen before the text is glued.' },
      { label: 'Line 6', code: `System.out.println("score != 0:   " + (score != 0));`, text: '`!=` means "not equal". 82 is not 0, so the answer is `true`.' },
      { label: 'Line 8', code: `System.out.println("score >= 82:  " + (score >= 82));`, text: '`>=` includes the border value: 82 is greater than or equal to 82.' },
      { label: 'Line 10', code: `System.out.println("score <= 81:  " + (score <= 81));`, text: '82 is not less than or equal to 81, so `false`.' },
      { label: 'Line 13', code: `boolean passed = score >= 50;`, text: 'The comparison runs first, then its `boolean` result is stored. No parentheses needed: comparison runs before `=`.' },
      { label: 'Line 17', code: `System.out.println("7 == 7.0: " + (7 == 7.0));`, text: 'The `int` 7 is promoted to `7.0` first. Then the two values are equal.' },
      { label: 'Line 20', code: `System.out.println("'a' < 'b': " + ('a' < 'b'));`, text: 'A `char` is a number inside: `\'a\'` is 97 and `\'b\'` is 98.' },
      { label: 'Line 21', code: `System.out.println("'Z' < 'a': " + ('Z' < 'a'));`, text: 'All capital letters (65 to 90) come before the small letters (97 to 122) in the code table.' }
    ],
    sections: [
      {
        title: 'The six comparison operators',
        text: [
          'Read each operator as a question. The answer is always `true` or `false`.'
        ],
        table: {
          head: ['Operator', 'Question', 'Example', 'Result'],
          rows: [
            ['`==`', 'equal?', '`5 == 5`', '`true`'],
            ['`!=`', 'not equal?', '`5 != 5`', '`false`'],
            ['`<`', 'less than?', '`3 < 5`', '`true`'],
            ['`<=`', 'less than or equal?', '`5 <= 5`', '`true`'],
            ['`>`', 'greater than?', '`3 > 5`', '`false`'],
            ['`>=`', 'greater than or equal?', '`6 >= 5`', '`true`']
          ],
          note: '`<`, `<=`, `>`, `>=` work only with numbers and `char`. `==` and `!=` also work with `boolean` values and with objects (see step 5).'
        }
      },
      {
        title: 'From a question to a decision',
        text: [
          'A comparison on its own only answers. The answer becomes useful when the program does something with it: print it, store it, or let it choose a path.',
          'Here is a preview of what comes in the next topic. The comparison is the diamond in the middle.'
        ],
        mermaid: 'flowchart TD\n  S["height = 125"] --> Q{"height >= 120 ?"}\n  Q -->|"true"| Y["You may ride"]\n  Q -->|"false"| N["Wait until next year"]',
        diagramNote: 'The comparison produces `true` or `false`. An `if` (topic Control Flow) then picks one of the two paths.',
        fileName: 'RollerCoaster.java',
        code: `public class RollerCoaster {
    public static void main(String[] args) {
        int height = 125;
        int minimum = 120;

        boolean tallEnough = height >= minimum;
        boolean exactlyMinimum = height == minimum;

        System.out.println("tall enough: " + tallEnough);
        System.out.println("exactly the minimum: " + exactlyMinimum);
        System.out.println("missing cm: " + (minimum - height));
    }
}`,
        output: `tall enough: true
exactly the minimum: false
missing cm: -5`
      },
      {
        title: 'One = stores, two == ask',
        text: [
          'This is the most common mix-up. `=` puts a value into a variable. `==` compares two values and changes nothing.',
          'For numbers, the compiler catches the mistake in a condition. For a `boolean` variable it does not, because `done = true` is itself a `boolean` expression. The line compiles, stores `true`, and the question is never asked.'
        ],
        fileName: 'AssignVersusCompare.java',
        code: `public class AssignVersusCompare {
    public static void main(String[] args) {
        boolean done = false;

        System.out.println(done == true);   // a question: false
        System.out.println(done = true);    // an assignment: stores true
        System.out.println(done);           // done has changed!
    }
}`,
        output: `false
true
true`,
        tip: 'For a `boolean`, skip the comparison: write `done` instead of `done == true`, and `!done` instead of `done == false`. The lesson **Logical Operators** explains `!`.'
      },
      {
        title: 'No chains like 0 < x < 10',
        text: [
          'In math you write `0 < x < 10`. Java does not allow it. It would calculate `0 < x` first, get a `boolean`, and then try `true < 10`, which makes no sense. The compiler says: "bad operand types for binary operator \'<\'".',
          'Write two comparisons and join them with `&&` ("and"): `0 < x && x < 10`. The next lesson, **Logical Operators**, explains `&&`.'
        ],
        mermaid: 'flowchart LR\n  A["0 #lt; x #lt; 10"] --> B["(0 #lt; x) gives true"]\n  B --> C["true #lt; 10 ?"]\n  C --> D["compile error"]',
        diagramNote: 'The chain breaks at the second step: a `boolean` cannot be compared with a number.',
        warn: 'Write `0 < x && x < 10`, not `0 < x < 10`.'
      },
      {
        title: 'Comparing doubles and objects',
        text: [
          'Two traps wait here. First, `double` values carry tiny rounding errors (see **Math Helpers**), so `0.1 + 0.2 == 0.3` is `false`. And the special value `NaN` is not equal to anything, not even to itself.',
          'Second, for objects `==` asks "is this the same object?", not "do they hold the same content?". A variable of an object type holds a **reference**, an arrow to the object (see [Stack, Heap, References](../types-and-variables/index.html)). Wrapper types like `Integer` show this: small values are shared from a cache, bigger ones are not. For content, use `equals`. Strings work the same way; [Strings](../strings/index.html) explains it.'
        ],
        fileName: 'CompareTraps.java',
        code: `public class CompareTraps {
    public static void main(String[] args) {
        double sum = 0.1 + 0.2;
        System.out.println("sum == 0.3: " + (sum == 0.3));
        System.out.println("close: " + (Math.abs(sum - 0.3) < 1e-9));

        double nan = 0.0 / 0;
        System.out.println("nan == nan: " + (nan == nan));
        System.out.println("isNaN: " + Double.isNaN(nan));

        Integer small1 = 127;
        Integer small2 = 127;
        Integer big1 = 128;
        Integer big2 = 128;
        System.out.println("127 == 127: " + (small1 == small2));
        System.out.println("128 == 128: " + (big1 == big2));
        System.out.println("128 equals 128: " + big1.equals(big2));
    }
}`,
        output: `sum == 0.3: false
close: true
nan == nan: false
isNaN: true
127 == 127: true
128 == 128: false
128 equals 128: true`,
        warn: 'Use `==` for primitives (`int`, `double`, `char`, `boolean`). For objects such as `String` and `Integer`, use `equals`.'
      }
    ],
    technical: [
      'For `int` values, `javac` turns a comparison into a conditional jump instruction such as `if_icmpge` ("jump if the first int is greater or equal"). The JVM has no "boolean value" instruction for `<`; when you store the result, the compiler writes small jumps that push `1` for `true` or `0` for `false`.',
      'For `long`, `float` and `double`, the compiler first emits `lcmp`, `fcmpl` or `dcmpl`. These push -1, 0 or 1, and a jump follows. With `NaN`, every ordered comparison is `false` and `!=` is `true`, as the IEEE 754 standard demands.',
      'Before comparing, both operands get binary numeric promotion, the same as in arithmetic. That is why `7 == 7.0` compares `7.0` with `7.0`.',
      'For references, `==` and `!=` compare the arrows, not the objects. `Integer` values from -128 to 127 come from a shared cache when you write `Integer x = 127;` (autoboxing calls `Integer.valueOf`), so both variables point to the same object. For 128 a new object is created each time.'
    ],
    tryIt: {
      steps: [
        'Create `Ages.java` with `int age = 12;`.',
        'Print `age >= 13`, `age == 12` and `age != 12`.',
        'Store `boolean teen = age >= 13;` and print it.',
        'Try `System.out.println(10 < age < 13);` and read the compiler message.'
      ],
      see: '`false`, `true`, `false`, `false`, and a compile error "bad operand types for binary operator \'<\'".'
    },
    check: [
      { q: 'What is the type of `5 > 3`?', a: '`boolean`. Its value is `true`.' },
      { q: 'How do you write "x is between 1 and 9, both included" in Java?', a: '`x >= 1 && x <= 9`. Chains like `1 <= x <= 9` do not compile.' },
      { q: 'Why can `a == b` be `false` for two `Integer` variables that both hold 500?', a: '`==` compares references. The two variables point to two different `Integer` objects. Use `a.equals(b)`.' }
    ],
    keyPoints: [
      'Comparisons produce a `boolean`: `true` or `false`.',
      '`==` asks, `=` stores.',
      '`<=`, `>=` include the border; write them without a space, `<` or `>` first.',
      'No chains: write `a < x && x < b`.',
      'Compare `double` with a tolerance; compare objects with `equals`.'
    ],
    commonMistakes: [
      'Writing `if (done = true)` instead of `if (done)`. One `=` stores.',
      'Writing `0 < x < 10`. Use `0 < x && x < 10`.',
      'Writing `=<` or `=>`. The operators are `<=` and `>=`.',
      'Comparing `double` results with `==`. Use `Math.abs(a - b) < 1e-9`.',
      'Comparing `String` or `Integer` objects with `==`. Use `equals`.'
    ],
    related: ['Logical Operators', 'Ternary Operator', 'Control Flow', 'Strings'],
    glossary: [
      { term: 'relational operator', definition: 'An operator that compares order: <, <=, > or >=.' },
      { term: 'reference', definition: 'The arrow a variable holds to an object on the heap. == on references compares the arrows.' }
    ]
  }
);
