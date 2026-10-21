Java.topics.operators.lessons.push(
  {
    id: 'precedence-short-circuit',
    num: '10',
    title: 'Precedence and Associativity',
    category: 'decisions',
    icon: '()',
    tagline: 'Know what runs first in a long expression',
    realWorld: 'Getting dressed. Socks go on before shoes, and the shirt before the jacket. Everybody follows the same order, so nobody has to say it each time. If you want a different order, you have to say it out loud.',
    kid: [
      'Look at `2 + 3 * 4`. Do you add first or multiply first? You get 20 or 14. Only one can be right.',
      'Java has a rule, the same as at school: multiply before you add. So it is `2 + 12`, which is 14.',
      'If you want to add first, put the adding into parentheses: `(2 + 3) * 4` is 20. Parentheses are like a sign that says "do me first!".',
      'And when two operators have the same rank, like `-` and `-`, Java goes from left to right, the way you read.'
    ],
    definition: '**Precedence** decides which operator in an expression is grouped with its operands first: `*` before `+`, `+` before `<`, `<` before `&&`, `&&` before `||`. **Associativity** decides the grouping when operators have the same precedence: most go left to right, assignment and `?:` go right to left.',
    explain: [
      'An expression with several operators is a puzzle: which operands belong to which operator? Precedence answers it. An operator with a **higher precedence** binds more tightly: it grabs its operands first.',
      'In `2 + 3 * 4`, `*` has a higher precedence than `+`. So the expression means `2 + (3 * 4)`, not `(2 + 3) * 4`.',
      '**Associativity** breaks ties. `-` is **left-associative**: `10 - 4 - 3` means `(10 - 4) - 3`, which is `3`. Assignment `=` is **right-associative**: `a = b = 4` means `a = (b = 4)`.',
      'Parentheses always win. They make a group that is handled as one operand. Use them whenever a reader could be unsure; they cost nothing at run time.',
      'Precedence is about **grouping**, not about **time**. Java still evaluates operands from left to right. In `a() + b() * c()`, `a()` is called first, even though `*` is grouped first. Step 4 shows this with `++`.'
    ],
    why: 'Long expressions appear everywhere: formulas, conditions, messages. Without fixed rules, the same line could mean different things. With the rules, every Java program reads it the same way.',
    whenUse: 'Every time you read or write an expression with more than one operator, and whenever you mix arithmetic, comparisons and logic in one condition.',
    syntax: '`(expression)` groups first. Without parentheses: unary → `* / %` → `+ -` → comparisons → `== !=` → `&&` → `||` → `?:` → `=`.',
    fileName: 'Precedence.java',
    code: `public class Precedence {
    public static void main(String[] args) {
        System.out.println(2 + 3 * 4);        // 14: * before +
        System.out.println((2 + 3) * 4);      // 20: parentheses first
        System.out.println(10 - 4 - 3);       // 3: left to right
        System.out.println(100 / 10 / 5);     // 2: left to right
        System.out.println(2 * 3 % 4);        // 2: same level, left to right
        System.out.println(-3 * -2);          // 6: unary minus binds tightest

        int x = 5;
        boolean inRange = x > 0 && x < 10 || x == 100;
        System.out.println(inRange);          // (x>0 && x<10) || x==100

        int a;
        int b;
        a = b = 4;                            // = groups right to left
        System.out.println(a + b);

        int total = 1 + 2 * 3 - 8 / 4 % 3;
        System.out.println(total);            // worked out in step 2
    }
}`,
    output: `14
20
3
2
2
6
true
8
5`,
    codeSummary: 'Each line tests one rule: higher precedence first, parentheses first, left-to-right for equal operators, right-to-left for `=`. The last line is worked out step by step below.',
    codeExplanation: [
      { label: 'Line 3', code: `System.out.println(2 + 3 * 4);        // 14: * before +`, text: '`*` binds tighter than `+`: `2 + (3 * 4)` = `2 + 12`.' },
      { label: 'Line 4', code: `System.out.println((2 + 3) * 4);      // 20: parentheses first`, text: 'Parentheses make `2 + 3` one operand: `5 * 4`.' },
      { label: 'Line 5', code: `System.out.println(10 - 4 - 3);       // 3: left to right`, text: 'Same precedence, left-associative: `(10 - 4) - 3`. Right to left would give `10 - 1` = `9`.' },
      { label: 'Line 6', code: `System.out.println(100 / 10 / 5);     // 2: left to right`, text: '`(100 / 10) / 5` = `10 / 5`. The other way would be `100 / 2` = `50`.' },
      { label: 'Line 7', code: `System.out.println(2 * 3 % 4);        // 2: same level, left to right`, text: '`*`, `/` and `%` share one level: `(2 * 3) % 4` = `6 % 4`.' },
      { label: 'Line 8', code: `System.out.println(-3 * -2);          // 6: unary minus binds tightest`, text: 'The unary `-` belongs to its number before any `*` happens: `(-3) * (-2)`.' },
      { label: 'Line 11', code: `boolean inRange = x > 0 && x < 10 || x == 100;`, text: 'Comparisons first, then `&&`, then `||`, then `=`: `inRange = ((x > 0) && (x < 10)) || (x == 100)`.' },
      { label: 'Line 16', code: `a = b = 4;                            // = groups right to left`, text: '`a = (b = 4)`: `b` gets 4, the value of that assignment is 4, then `a` gets 4.' },
      { label: 'Line 19', code: `int total = 1 + 2 * 3 - 8 / 4 % 3;`, text: 'Five operators, two levels. Step 2 below evaluates it one operator at a time.' }
    ],
    sections: [
      {
        title: 'The precedence table',
        text: [
          'Rows higher up bind more tightly. Operators in the same row have the same precedence; the last column says how ties are broken.',
          'You do not need to learn every row now. Know the big order: **unary, multiply, add, compare, equal, and, or, ternary, assign**.'
        ],
        table: {
          head: ['Level', 'Operators', 'Meaning', 'Associativity'],
          rows: [
            ['1 (highest)', '`x++` `x--`', 'postfix', 'left to right'],
            ['2', '`++x` `--x` `+x` `-x` `!` `~`', 'unary (one operand)', 'right to left'],
            ['3', '`(type)`', 'cast', 'right to left'],
            ['4', '`*` `/` `%`', 'multiply, divide, remainder', 'left to right'],
            ['5', '`+` `-`', 'add, subtract, concatenate', 'left to right'],
            ['6', '`<<` `>>` `>>>`', 'bit shifts', 'left to right'],
            ['7', '`<` `<=` `>` `>=` `instanceof`', 'order comparisons', 'left to right'],
            ['8', '`==` `!=`', 'equality', 'left to right'],
            ['9', '`&`', 'bitwise / logical AND', 'left to right'],
            ['10', '`^`', 'bitwise / logical XOR', 'left to right'],
            ['11', '`|`', 'bitwise / logical OR', 'left to right'],
            ['12', '`&&`', 'conditional AND', 'left to right'],
            ['13', '`||`', 'conditional OR', 'left to right'],
            ['14', '`? :`', 'ternary', 'right to left'],
            ['15 (lowest)', '`=` `+=` `-=` `*=` `/=` `%=` …', 'assignment', 'right to left']
          ],
          note: '`instanceof` checks the type of an object; you meet it in [Interfaces](../interfaces/index.html). The bit operators are in **Bitwise Basics**.'
        }
      },
      {
        title: 'A worked evaluation',
        text: [
          'Take `1 + 2 * 3 - 8 / 4 % 3`. First find the operators of the highest level: `*`, `/` and `%`. Group them, left to right. Then do `+` and `-`, left to right.',
          'The tree shows the grouping. Every operator is a node; its operands hang below it. Java calculates from the bottom up.'
        ],
        mermaid: 'flowchart TD\n  M["- gives 5"] --> P["+ gives 7"]\n  M --> R["% gives 2"]\n  P --> N1["1"]\n  P --> T["* gives 6"]\n  T --> N2["2"]\n  T --> N3["3"]\n  R --> D["/ gives 2"]\n  R --> N6["3"]\n  D --> N4["8"]\n  D --> N5["4"]',
        diagramNote: 'The operator at the top runs last. `-` is at the top because `+` and `-` have the lowest level here and `-` is the rightmost one (left-associative).',
        table: {
          head: ['Step', 'Rule used', 'Expression after the step'],
          rows: [
            ['start', '', '`1 + 2 * 3 - 8 / 4 % 3`'],
            ['1', '`*` (level 4, leftmost)', '`1 + 6 - 8 / 4 % 3`'],
            ['2', '`/` (level 4, next)', '`1 + 6 - 2 % 3`'],
            ['3', '`%` (level 4, next)', '`1 + 6 - 2`'],
            ['4', '`+` (level 5, leftmost)', '`7 - 2`'],
            ['5', '`-` (level 5)', '`5`']
          ]
        }
      },
      {
        title: 'Associativity: left or right?',
        text: [
          'For most operators, ties go **left to right**. That matters for `-`, `/` and `%`, where the order changes the result, and for `+` with text (see **String Concatenation**).',
          'Assignment, the ternary and the unary operators go **right to left**. That is what makes `a = b = 0` and `!!done` work.'
        ],
        table: {
          head: ['Expression', 'Grouped as', 'Result'],
          rows: [
            ['`20 - 5 - 3`', '`(20 - 5) - 3`', '`12`'],
            ['`64 / 8 / 2`', '`(64 / 8) / 2`', '`4`'],
            ['`"a" + 1 + 2`', '`("a" + 1) + 2`', '`"a12"`'],
            ['`a = b = 0`', '`a = (b = 0)`', 'both `0`'],
            ['`ok ? 1 : bad ? 2 : 3`', '`ok ? 1 : (bad ? 2 : 3)`', 'depends on `ok`, `bad`'],
            ['`- -5`', '`-(-5)`', '`5`']
          ]
        }
      },
      {
        title: 'Grouping is not the same as order of evaluation',
        text: [
          'Precedence tells Java how to build the tree. But Java still evaluates the **operands from left to right**. The left operand of an operator is always evaluated before the right one.',
          'In `i + i++ * i`, the `*` is grouped first. But the left `i` of the `+` is read first, while `i` is still 1. Then `i++` gives 1 and makes `i` 2. Then the last `i` reads 2.',
          'Short-circuit follows the same tree. `a || b && c` is grouped as `a || (b && c)`. If `a` is `true`, the whole right part, `b && c`, is skipped.'
        ],
        fileName: 'EvaluationOrder.java',
        code: `public class EvaluationOrder {
    public static void main(String[] args) {
        int i = 1;
        int r = i + i++ * i;          // 1 + (1 * 2)
        System.out.println("r = " + r + ", i = " + i);

        int checks = 0;
        boolean a = true;
        boolean b = true;
        // grouped as a || (b && ++checks > 0): the right part is skipped
        boolean result = a || b && ++checks > 0;
        System.out.println("result = " + result + ", checks = " + checks);
    }
}`,
        output: `r = 3, i = 2
result = true, checks = 0`,
        warn: 'Code that changes a variable and reads it again in the same expression is legal, but hard to read. Split it into separate statements.'
      },
      {
        title: 'Traps and how parentheses fix them',
        text: [
          'Most precedence bugs come from mixing different kinds of operators. A few classic ones are below. In each case, parentheses make the meaning clear to Java and to the next reader.',
          'Another good fix is a **named variable**: `boolean isTeen = age >= 13 && age <= 19;` reads better than a long condition with many parentheses.'
        ],
        table: {
          head: ['You write', 'Java reads', 'Fix'],
          rows: [
            ['`"Sum: " + a + b`', '`("Sum: " + a) + b`', '`"Sum: " + (a + b)`'],
            ['`a || b && c`', '`a || (b && c)`', '`(a || b) && c` if you meant that'],
            ['`!a == b`', '`(!a) == b`', '`!(a == b)` or `a != b`'],
            ['`now + 5 % 24`', '`now + (5 % 24)`', '`(now + 5) % 24`'],
            ['`(double) sum / count`', '`((double) sum) / count`', 'correct: the cast binds to `sum`'],
            ['`"x" + n > 3 ? "a" : "b"`', 'compile error: `String > int`', '`"x" + (n > 3 ? "a" : "b")`']
          ]
        },
        tip: 'You never get a penalty for parentheses. If you have to look at the table to know the order, add parentheses.'
      }
    ],
    technical: [
      'Precedence is not stored anywhere in your program. It is built into the **grammar** of Java, the rules the compiler uses to read source code. When `javac` **parses** (reads and structures) an expression, it builds an **abstract syntax tree** (AST): a tree like the one in step 2, with operators as nodes and operands as children. Parentheses only shape the tree; they leave no trace in the `.class` file.',
      'The JVM is a **stack machine**. `javac` walks the tree from left to right, bottom up: it pushes operands on the operand stack and emits the operator after its operands. `1 + 2 * 3` with variables becomes `load 1`, `load 2`, `load 3`, `imul`, `iadd`. Left operands come first in the bytecode, which is why evaluation is left to right.',
      'The Java Language Specification (section 15.7) guarantees this order: the left operand is fully evaluated before the right one, and all operands are evaluated before the operator runs (except for `&&`, `||` and `?:`, which may skip a part).',
      'Constant parts are folded at compile time: `int total = 1 + 2 * 3 - 8 / 4 % 3;` is stored as the constant `5`.'
    ],
    tryIt: {
      steps: [
        'Create `Order.java`.',
        'Before running, write down what you expect for `8 - 2 * 3`, `(8 - 2) * 3`, `20 / 2 / 5` and `2 + 6 / 3 % 2`.',
        'Print all four and compare.',
        'Print `true || false && false` and `(true || false) && false`.'
      ],
      see: '`2`, `18`, `2`, `2`, then `true` and `false`.'
    },
    check: [
      { q: 'What is `10 - 2 * 3 + 1`?', a: '`5`. First `2 * 3` = 6, then left to right: `10 - 6` = 4, `4 + 1` = 5.' },
      { q: 'Does `a = b = c = 1` compile, and what happens?', a: 'Yes. `=` is right-associative: `c = 1` first, then `b = 1`, then `a = 1`.' },
      { q: 'What is the difference between precedence and evaluation order?', a: 'Precedence decides the grouping (which operands belong to which operator). Evaluation order is the time order in which operands are computed: always left to right in Java.' }
    ],
    keyPoints: [
      'Higher precedence binds first: unary, `* / %`, `+ -`, comparisons, `== !=`, `&&`, `||`, `?:`, `=`.',
      'Same level: most operators go left to right; `=`, `?:` and unary operators go right to left.',
      'Parentheses always win and cost nothing.',
      'Operands are evaluated left to right, whatever the grouping.',
      'When in doubt, add parentheses or a named variable.'
    ],
    commonMistakes: [
      'Expecting `2 + 3 * 4` to be `20`. Write `(2 + 3) * 4` if you mean that.',
      'Writing `a || b && c` and meaning `(a || b) && c`. Add the parentheses.',
      'Writing `!x == y` to mean "x is not equal to y". Write `x != y`.',
      'Expecting `100 / 10 / 5` to be `50`. Division goes left to right: `(100 / 10) / 5` = `2`.',
      'Relying on the table in tricky code. A reader may not know it; parentheses help everyone.'
    ],
    related: ['Arithmetic', 'Logical Operators', 'Ternary Operator', 'String Concatenation'],
    glossary: [
      { term: 'precedence', definition: 'The rank of an operator. Higher precedence groups first: * before +.' },
      { term: 'associativity', definition: 'The direction in which operators of the same precedence group: left to right, or right to left.' },
      { term: 'abstract syntax tree', definition: 'The tree the compiler builds from source code, with operators as nodes and operands as children.' }
    ]
  }
);
