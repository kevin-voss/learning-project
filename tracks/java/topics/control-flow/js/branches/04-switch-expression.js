(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'switch-expression',
    num: '04',
    title: 'switch Expression',
    category: 'branches',
    icon: '->',
    tagline: 'A switch that hands back a value',
    realWorld: 'A menu board in a café. You point at "hot chocolate", and the board answers with one price: 3 euros. One choice in, one answer out.',
    kid: [
      'The old switch was like a row of drawers that keep opening until someone shouts "stop".',
      'The new switch is like a vending machine. You press one button, and exactly one thing drops out. No other drawer opens, ever.',
      'And the best part: the machine hands you the thing. You can catch it in a box (a variable) right away.'
    ],
    definition: 'A **switch expression** chooses one value and hands it back, so you can store it: `String season = switch (month) { case 3, 4, 5 -> "spring"; … };`. Arrow labels (`->`) never fall through, and the compiler checks that every possible value has an answer.',
    explain: [
      'An **expression** is code that gives back a value, like `2 + 3` or `age >= 18`. A **statement** is code that does something, like `System.out.println(…);` or a classic `switch`. A switch expression is a switch that is an expression: the whole switch becomes one value.',
      'Each **arrow label** `case X -> result;` has two parts: the value(s) to match on the left, the result on the right. After the result, the switch is over. There is no `break` and no fall-through.',
      'One label can list several values, separated by commas: `case 12, 1, 2 -> "winter";`.',
      'When a case needs more than one line, give it a block in braces. Inside the block, `yield value;` hands the value back. `yield` means "this is the answer of the switch".',
      'A switch expression must be **exhaustive**: it needs an answer for every value the selector can have. For an `int` or a `String` that means you need a `default`. If you forget it, the program does not compile. The arrow form is standard since Java 14 and is the normal way to write a switch in Java 21.'
    ],
    why: 'The classic switch needs a variable declared before it, an assignment in every case and a `break` after each one. Forgetting one break is a silent bug. The switch expression removes all three problems.',
    whenUse: 'Whenever a switch is there to choose a value: a name for a number, a price for a zone, a message for a code. Also use arrows in switch statements that only run actions.',
    syntax: '`Type result = switch (selector) { case A -> valueA; case B, C -> valueBC; default -> { …; yield valueX; } };` Note the `;` after the closing brace.',
    mermaid: `flowchart LR
  M["month = 4"] --> SW{"switch (month)"}
  SW -->|"12, 1, 2"| W["winter"]
  SW -->|"3, 4, 5"| SP["spring"]
  SW -->|"6, 7, 8"| SU["summer"]
  SW -->|"9, 10, 11"| AU["autumn"]
  SW -->|default| N["not a month"]
  W & SP & SU & AU & N --> V["season = the chosen value"]`,
    visualLabel: 'One value in, one value out',
    visualNote: 'Exactly one arrow is taken. Its value becomes the value of the whole switch and lands in `season`.',
    fileName: 'SeasonFinder.java',
    code: `public class SeasonFinder {
    public static void main(String[] args) {
        int month = 4;

        String season = switch (month) {
            case 12, 1, 2 -> "winter";
            case 3, 4, 5 -> "spring";
            case 6, 7, 8 -> "summer";
            case 9, 10, 11 -> "autumn";
            default -> "not a month";
        };

        System.out.println("Month " + month + " is in " + season);

        int days = switch (month) {
            case 2 -> 28;
            case 4, 6, 9, 11 -> 30;
            default -> 31;
        };

        System.out.println("It has " + days + " days (no leap year).");
    }
}`,
    output: `Month 4 is in spring
It has 30 days (no leap year).`,
    codeSummary: 'Two switch expressions on the same month: one gives a String, one gives an int. No `break` anywhere.',
    codeExplanation: [
      { label: 'Line 5', code: 'String season = switch (month) {', text: 'The switch is on the right side of `=`. Whatever it gives back goes into `season`.' },
      { label: 'Line 6', code: 'case 12, 1, 2 -> "winter";', text: 'Three values share one answer. The arrow points to the value this case gives back.' },
      { label: 'Line 7', code: 'case 3, 4, 5 -> "spring";', text: 'The match for 4. The switch gives back `"spring"` and is finished. Lines 8 to 10 never run.' },
      { label: 'Line 10', code: 'default -> "not a month";', text: 'Needed: an int can be any number, and the switch must have an answer for each of them.' },
      { label: 'Line 11', code: '};', text: 'The semicolon ends the whole assignment statement `String season = …;`. It is easy to forget.' },
      { label: 'Line 15', code: 'int days = switch (month) {', text: 'The same idea with a number as result.' },
      { label: 'Line 17', code: 'case 4, 6, 9, 11 -> 30;', text: 'April, June, September and November have 30 days.' },
      { label: 'Line 18', code: 'default -> 31;', text: 'Every other month gets 31. Not perfect for a month like 13, but it shows that `default` is the "everything else" answer.' }
    ],
    sections: [
      {
        title: 'Old and new, side by side',
        text: [
          'Both halves of this program turn a day number into a name. The classic one needs a variable, an assignment per case and a `break` per case. The expression needs one line per case.'
        ],
        fileName: 'OldAndNew.java',
        code: `public class OldAndNew {
    public static void main(String[] args) {
        int day = 6;

        // Classic switch statement
        String oldName;
        switch (day) {
            case 6:
                oldName = "Saturday";
                break;
            case 7:
                oldName = "Sunday";
                break;
            default:
                oldName = "a workday";
                break;
        }

        // Switch expression
        String newName = switch (day) {
            case 6 -> "Saturday";
            case 7 -> "Sunday";
            default -> "a workday";
        };

        System.out.println("Classic: " + oldName);
        System.out.println("Expression: " + newName);
    }
}`,
        output: `Classic: Saturday
Expression: Saturday`,
        table: {
          head: ['', 'Classic `case X:`', 'Arrow `case X ->`'],
          rows: [
            ['Falls through?', 'yes, until `break`', 'never'],
            ['Several values', '`case 6: case 7:` or `case 6, 7:`', '`case 6, 7 ->`'],
            ['Gives back a value?', 'no, it is a statement', 'yes, when used as an expression'],
            ['Must cover every value?', 'no', 'yes, as an expression']
          ]
        }
      },
      {
        title: 'Arrows in a plain switch statement',
        text: [
          'You can also use arrows in a switch that gives nothing back and only runs actions. Each arrow is then followed by one statement, or by a block in braces for several lines. Still no fall-through and no break.',
          'You cannot mix `:` labels and `->` labels in the same switch.'
        ],
        fileName: 'TrafficLight.java',
        code: `public class TrafficLight {
    public static void main(String[] args) {
        String light = "yellow";

        switch (light) {
            case "green" -> System.out.println("Walk.");
            case "yellow" -> {
                System.out.println("Get ready.");
                System.out.println("Do not start walking now.");
            }
            case "red" -> System.out.println("Wait.");
            default -> System.out.println("The light is broken.");
        }

        System.out.println("Light checked.");
    }
}`,
        output: `Get ready.
Do not start walking now.
Light checked.`
      },
      {
        title: 'Blocks and yield: a case with several steps',
        text: [
          'When a case must compute or print something before it has its answer, write a block `{ … }`. The block ends with `yield value;`, which gives the value back to the switch.',
          '`yield` only exists inside switch expressions. `return` would leave the whole method instead, which is not what you want here.'
        ],
        mermaid: `flowchart TD
  Z{"zone"} -->|local| L["value 3"]
  Z -->|near| N["value 5 + weightKg"]
  Z -->|far| F["block: base = 10, extra = weightKg * 2, print"]
  F --> Y["yield base + extra"]
  Z -->|default| D["block: print warning, yield 25"]
  L & N & Y & D --> C["cost = value"]`,
        diagramNote: 'The far case is a small program of its own. Its `yield` hands the result to `cost`.',
        fileName: 'ShippingCost.java',
        code: `public class ShippingCost {
    public static void main(String[] args) {
        String zone = "far";
        int weightKg = 3;

        int cost = switch (zone) {
            case "local" -> 3;
            case "near" -> 5 + weightKg;
            case "far" -> {
                int base = 10;
                int extra = weightKg * 2;
                System.out.println("Far zone: base " + base + " + extra " + extra);
                yield base + extra;
            }
            default -> {
                System.out.println("Unknown zone, using the highest price");
                yield 25;
            }
        };

        System.out.println("Cost: " + cost + " euros");
    }
}`,
        output: `Far zone: base 10 + extra 6
Cost: 16 euros`,
        tip: 'Variables made inside a case block (`base`, `extra`) exist only inside that block. Each case block is its own small room.'
      },
      {
        title: 'Every value needs an answer',
        text: [
          'Leave out the `default` and the compiler refuses the program, because a month like 13 or -1 would have no value. This check is called **exhaustiveness**: the switch must exhaust (cover) every possible input.',
          'Here is what `javac` says when the default is missing:'
        ],
        fileName: 'terminal',
        codeLanguage: 'text',
        code: `SeasonFinder.java:5: error: the switch expression does not cover all possible input values
        String season = switch (month) {
                        ^
1 error`,
        tip: 'The classic colon style also works as an expression: `case 1: yield "one";`. You will see it in older code. New code uses arrows.'
      },
      {
        title: 'if, switch statement or switch expression?',
        text: [
          'All three choose a path. Pick the one that says what you mean with the least code.'
        ],
        table: {
          head: ['You want to …', 'Use', 'Example'],
          rows: [
            ['test ranges or mixed conditions', '`if / else if / else`', '`if (score >= 90 && !late)`'],
            ['run different actions for fixed values', 'switch statement with `->`', '`case "red" -> stop();`'],
            ['get one value for fixed values', 'switch expression', '`int days = switch (month) { … };`'],
            ['choose between two values', 'ternary `? :`', '`String w = n == 1 ? "apple" : "apples";`']
          ]
        }
      }
    ],
    technical: [
      'A switch expression compiles to the same `tableswitch` or `lookupswitch` bytecode as a classic switch. The difference is only on the operand stack (the JVM scratch area for values being computed): every branch leaves exactly one value there, and after the switch that value is stored into the variable. `yield` compiles to "push the value, jump to the end".',
      'Exhaustiveness is checked by the compiler, not at run time. For an `int` or `String` selector only `default` makes a switch exhaustive. For an enum (topic 15), listing every constant is enough; then `javac` adds a hidden default that throws a `MatchException` in case a new constant appears later without recompiling.',
      'Java 21 also allows **patterns** in case labels, such as `case Integer i when i > 10 -> …` on an `Object` selector. That needs classes and objects (topic 9), so it is not used here; the arrow form you learned is the same.'
    ],
    tryIt: {
      steps: [
        'Copy `SeasonFinder.java` and run it.',
        'Change `month` to 12 and run it. Then try 13.',
        'Delete the line `default -> "not a month";` and run it again.',
        'Put the line back and add a block case `case 0 -> { System.out.println("Months start at 1"); yield "nothing"; }` above the default.'
      ],
      see: '`winter`, then `not a month`, then the compile error `the switch expression does not cover all possible input values`, and finally your message for month 0.'
    },
    check: [
      { q: 'Why does an arrow case never need `break`?', a: 'An arrow case runs only its own expression, statement or block and then the switch ends. Arrow labels have no fall-through.' },
      { q: 'What does `yield` do?', a: 'It gives back the value of a switch expression from inside a case block.' },
      { q: 'Why does a switch expression on an `int` need a `default`?', a: 'It must have a value for every possible int. Without `default`, numbers without a case would have no value, so the code does not compile.' }
    ],
    keyPoints: [
      'A switch expression gives back one value: `x = switch (…) { … };`.',
      'Arrow labels (`->`) never fall through.',
      'List several values in one label: `case 3, 4, 5 ->`.',
      'Use a block and `yield` when a case needs several lines.',
      'A switch expression must cover every value: add `default` for int and String.',
      'Arrows also work in plain switch statements.'
    ],
    commonMistakes: [
      'Missing `;` after the closing brace of `String s = switch (…) { … }`. Add it.',
      '`return value;` inside a case block. Use `yield value;`.',
      'Mixing `case 1:` and `case 2 ->` in one switch. Use one style.',
      'No `default` in a switch expression on int or String. Add it.',
      '`case 3 -> "a"; break;` Arrow cases do not need `break`. Delete it.'
    ],
    related: ['switch Statement', 'if / else if / else'],
    glossary: CF.glossary
  });
})();
