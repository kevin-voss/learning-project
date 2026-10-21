Java.topics.operators.lessons.push(
  {
    id: 'increment-decrement',
    num: '04',
    title: 'Increment and Decrement',
    category: 'calculation',
    icon: '++',
    tagline: 'Count up and down by one, and know when it happens',
    realWorld: 'A click counter at the door of a museum. Every visitor who comes in: click, one more. Every visitor who leaves: click on the other button, one less.',
    kid: [
      'You have a sticker book with 3 stickers. You get one more. Now you have 4. That is `stickers++`: one more.',
      'Now a friend asks: "How many stickers do you have?" at the very moment you get a new one.',
      'If you answer first and then glue the new sticker in, you say "3". That is `stickers++` (plus plus after): answer with the old number, then add one.',
      'If you glue the sticker in first and then answer, you say "4". That is `++stickers` (plus plus before): add one first, then answer.'
    ],
    definition: 'The **increment** operator `++` adds 1 to a variable, and the **decrement** operator `--` subtracts 1. In **postfix** form (`x++`) the expression has the old value; in **prefix** form (`++x`) it has the new value.',
    explain: [
      'Adding one is so common that Java has a special operator for it. `count++` does the same as `count += 1` or `count = count + 1`.',
      '`++` and `--` are **unary** operators: they have only one operand, and that operand must be a variable. `5++` does not compile, because there is no box to change.',
      'The operator can stand after the variable (**postfix**, `x++`) or before it (**prefix**, `++x`). On a line of its own, both do the same: `x` grows by 1.',
      'The difference appears when the `++` is part of a bigger expression, like `int b = a++;` or `println(count++)`. Then you need to know which value the expression hands out. Postfix hands out the old value and then changes the variable. Prefix changes the variable first and hands out the new value.',
      'A **side effect** is a change that an expression makes besides producing its value. `x++` has the value of `x` and the side effect "x grows by 1". Expressions with side effects are where most `++` puzzles come from.'
    ],
    why: 'Counting is everywhere: loop counters, lives in a game, the number of items in a list. `++` and `--` make that short and clear.',
    whenUse: 'Use `x++` or `x--` as a statement on its own line, and in loop headers like `i++` (see [Control Flow](../control-flow/index.html)). Avoid using it inside bigger expressions.',
    syntax: '`variable++`, `variable--` (postfix) and `++variable`, `--variable` (prefix).',
    fileName: 'IncrementDecrement.java',
    code: `public class IncrementDecrement {
    public static void main(String[] args) {
        int lives = 3;
        lives++;                          // 4
        System.out.println("After lives++: " + lives);
        lives--;                          // 3 again
        System.out.println("After lives--: " + lives);

        // Postfix: hand out the old value, then add 1
        int a = 5;
        int b = a++;
        System.out.println("a = " + a + ", b = " + b);

        // Prefix: add 1 first, then hand out the new value
        int c = 5;
        int d = ++c;
        System.out.println("c = " + c + ", d = " + d);

        // Inside println the difference shows too
        int count = 10;
        System.out.println(count++);      // prints 10, then count is 11
        System.out.println(count);        // 11
        System.out.println(++count);      // count is 12, prints 12
        System.out.println(count--);      // prints 12, then count is 11
        System.out.println(count);        // 11
    }
}`,
    output: `After lives++: 4
After lives--: 3
a = 6, b = 5
c = 6, d = 6
10
11
12
12
11`,
    codeSummary: 'First `++` and `--` on their own lines. Then the same operator inside an assignment and inside `println`, where prefix and postfix give different values.',
    codeExplanation: [
      { label: 'Line 4', code: `lives++;                          // 4`, text: 'On its own line, `lives++` adds 1. Nobody uses the value of the expression, so prefix or postfix does not matter here.' },
      { label: 'Line 6', code: `lives--;                          // 3 again`, text: '`--` subtracts 1.' },
      { label: 'Line 11', code: `int b = a++;`, text: 'Postfix: the expression `a++` has the old value `5`, so `b` gets `5`. Then `a` becomes `6`.' },
      { label: 'Line 16', code: `int d = ++c;`, text: 'Prefix: `c` becomes `6` first. The expression `++c` has the new value, so `d` gets `6`.' },
      { label: 'Line 21', code: `System.out.println(count++);      // prints 10, then count is 11`, text: '`println` receives the old value `10`. The variable is already `11` when the line ends.' },
      { label: 'Line 22', code: `System.out.println(count);        // 11`, text: 'Proof: the increment happened in the line before.' },
      { label: 'Line 23', code: `System.out.println(++count);      // count is 12, prints 12`, text: 'Prefix: increase first, then hand the new value `12` to `println`.' },
      { label: 'Line 24', code: `System.out.println(count--);      // prints 12, then count is 11`, text: 'Postfix decrement works the same way: old value out, then minus 1.' }
    ],
    sections: [
      {
        title: 'Four ways to add one',
        text: [
          'All four lines below make `x` one bigger. As statements on their own line, they are the same.',
          'Most Java code uses `x++` for this. It is the shortest and everybody recognizes it.'
        ],
        table: {
          head: ['Statement', 'Effect on `x`', 'Value of the expression'],
          rows: [
            ['`x = x + 1;`', '+1', 'the new value'],
            ['`x += 1;`', '+1', 'the new value'],
            ['`++x;`', '+1', 'the new value (prefix)'],
            ['`x++;`', '+1', 'the old value (postfix)']
          ],
          note: 'The last column only matters when the expression is used inside something bigger.'
        }
      },
      {
        title: 'Prefix and postfix side by side',
        text: [
          'Follow `int b = a++;` and `int d = ++c;` with `a` and `c` both starting at 5. The order of the two small steps is the whole difference.'
        ],
        mermaid: 'flowchart TD\n  subgraph post["b = a++ (postfix)"]\n    P1["save old value 5"] --> P2["a becomes 6"]\n    P2 --> P3["b gets saved 5"]\n  end\n  subgraph pre["d = ++c (prefix)"]\n    Q1["c becomes 6"] --> Q2["read new value 6"]\n    Q2 --> Q3["d gets 6"]\n  end',
        diagramNote: 'Postfix saves a copy of the old value before it adds. Prefix adds first and has no copy to hand out.',
        tip: 'Memory hook: read from left to right. In `a++` you see the variable first, so you get the variable (old value) first. In `++a` you see the plus first, so the adding comes first.'
      },
      {
        title: 'A trace table, step by step',
        text: [
          'A **trace table** is a table where you write down every variable after every step. It is the best tool to understand tricky code. Here is one for a puzzle with `++` and `--` inside one expression.',
          'Java reads the operands of `+` and `-` from left to right. Each `++` or `--` changes `x` at the moment it is reached.'
        ],
        table: {
          head: ['Step', 'Code piece', 'Value it gives', '`x` after the step'],
          rows: [
            ['start', '`int x = 2;`', '-', '`2`'],
            ['1', '`x++` (left part of `y`)', '`2` (old value)', '`3`'],
            ['2', '`++x` (right part of `y`)', '`4` (new value)', '`4`'],
            ['3', '`y = 2 + 4`', '`6`', '`4`'],
            ['4', '`x--` (left part of `z`)', '`4` (old value)', '`3`'],
            ['5', '`--x` (right part of `z`)', '`2` (new value)', '`2`'],
            ['6', '`z = 4 - 2`', '`2`', '`2`']
          ]
        },
        fileName: 'TraceTable.java',
        code: `public class TraceTable {
    public static void main(String[] args) {
        int x = 2;
        int y = x++ + ++x;            // 2 + 4
        System.out.println("y = " + y + ", x = " + x);

        int z = x-- - --x;            // 4 - 2
        System.out.println("z = " + z + ", x = " + x);
    }
}`,
        output: `y = 6, x = 4
z = 2, x = 2`,
        warn: 'Code like `x++ + ++x` is a puzzle, not good style. Real programs change a variable once per statement. Use this only to train your trace tables.'
      },
      {
        title: 'The x = x++ trap',
        text: [
          'What does `x = x++;` do? It looks like "add one". It does nothing.',
          'Trace it: `x++` saves the old value `5` and makes `x` `6`. Then the assignment runs last and stores the saved `5` back into `x`. The `6` is overwritten.'
        ],
        mermaid: 'flowchart LR\n  A["x is 5"] --> B["x++ saves 5"]\n  B --> C["x becomes 6"]\n  C --> D["= stores the saved 5"]\n  D --> E["x is 5 again"]',
        fileName: 'SelfIncrement.java',
        code: `public class SelfIncrement {
    public static void main(String[] args) {
        int x = 5;
        x = x++;                      // the increment is lost
        System.out.println("after x = x++: " + x);

        x++;                          // this is all you need
        System.out.println("after x++: " + x);
    }
}`,
        output: `after x = x++: 5
after x++: 6`,
        tip: 'Write `x++;` alone. Never assign the result of `x++` back to `x`.'
      },
      {
        title: 'Other types: double, char and the hidden cast',
        text: [
          '`++` and `--` work on every number type, also on `double` and on `char`. A `char` is stored as a number (its Unicode code), so `letter++` moves to the next letter.',
          'Like `+=`, `++` has a hidden cast. On a `byte` with value 127, `++` does not fail: it wraps around to -128.'
        ],
        fileName: 'IncrementTypes.java',
        code: `public class IncrementTypes {
    public static void main(String[] args) {
        double temperature = 20.5;
        temperature++;
        System.out.println("temperature: " + temperature);

        char letter = 'a';
        letter++;
        System.out.println("next letter: " + letter);

        byte small = 127;
        small++;                      // (byte) (127 + 1) wraps around
        System.out.println("small: " + small);
    }
}`,
        output: `temperature: 21.5
next letter: b
small: -128`
      }
    ],
    technical: [
      'For a local `int` variable, `x++;` as a statement compiles to one bytecode instruction: `iinc` with the slot number of `x` and the constant `1`. `x--` is `iinc` with `-1`.',
      'When the value is used, the order of instructions shows the difference. `int b = a++;` becomes `iload a` (push the old value), `iinc a 1` (change the slot), `istore b` (store the pushed old value). `int d = ++c;` becomes `iinc c 1`, then `iload c` (push the new value), then `istore d`.',
      'That also explains `x = x++`: `iload x` pushes 5, `iinc` makes the slot 6, then `istore x` writes the pushed 5 back.',
      'For `byte`, `short` and `char`, `x++` means `x = (T) (x + 1)`, so the compiler adds a narrowing instruction like `i2b` or `i2c`. `x++` is also not safe when several threads change the same variable at once; Java has special classes for that, which come much later.'
    ],
    tryIt: {
      steps: [
        'Create `Counter.java` with `int n = 1;`.',
        'Print `n++`, then `n`, then `++n`, then `n`, each on its own line.',
        'Before you run it, write down what you expect for each line.',
        'Run it and compare.'
      ],
      see: '`1`, `2`, `3`, `3`.'
    },
    check: [
      { q: 'After `int a = 10; int b = a--;`, what are `a` and `b`?', a: '`a` is `9`, `b` is `10`. Postfix hands out the old value, then subtracts.' },
      { q: 'Is there a difference between `i++;` and `++i;` on a line of their own?', a: 'No. The value of the expression is not used, so both add 1 to `i`.' },
      { q: 'What is `x` after `int x = 7; x = x++;`?', a: '`7`. The saved old value is stored back and overwrites the increment.' }
    ],
    keyPoints: [
      '`x++` and `x--` change a variable by exactly 1.',
      'Postfix `x++` gives the old value; prefix `++x` gives the new value.',
      'On their own line, prefix and postfix do the same.',
      'Use a trace table to follow code where a variable changes inside an expression.',
      'Change a variable at most once per statement; never write `x = x++`.'
    ],
    commonMistakes: [
      'Writing `x = x++;` to count up. It leaves `x` unchanged. Write `x++;`.',
      'Expecting `println(count++)` to print the new value. It prints the old one. Increment on its own line first.',
      'Writing `5++` or `(a + b)++`. The operand must be a variable.',
      'Building puzzles like `i++ + ++i` in real code. Split the steps into separate lines.'
    ],
    related: ['Assignment', 'Precedence and Associativity', 'Control Flow'],
    glossary: [
      { term: 'postfix', definition: 'The operator stands after the variable (x++). The expression gives the old value.' },
      { term: 'prefix', definition: 'The operator stands before the variable (++x). The expression gives the new value.' },
      { term: 'side effect', definition: 'A change an expression makes besides producing its value, like x++ changing x.' },
      { term: 'trace table', definition: 'A table that records the value of each variable after each step of the code.' }
    ]
  }
);
