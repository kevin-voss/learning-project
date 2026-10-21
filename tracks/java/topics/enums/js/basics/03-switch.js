// Enums, lesson 3: switch over an enum.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-switch',
      title: 'switch Over an Enum',
      category: 'practice',
      icon: '⑂',
      tagline: 'The compiler counts your cases',
      realWorld: 'A checklist with one box per colour of the traffic light. If someone adds a fourth colour, the checklist shows an empty box, and you see at once what is missing.',
      kid: [
        'You have three cards: RED, YELLOW and GREEN. For every card there is a rule. Red means stop. Yellow means wait. Green means go.',
        'A `switch` is a little machine that looks at the card and picks the matching rule.',
        'The best part: if you forget a rule for one card, Java notices and tells you before the program even starts.'
      ],
      definition: 'A `switch` over an enum picks one branch per constant. A **switch expression** (`return switch (x) { … };`) must cover every constant, so the compiler tells you when one is missing.',
      explain: [
        'You know `switch` from [Control Flow](../control-flow/index.html). With an enum it fits perfectly: the list of constants is the list of cases. In a case label you write the constant without the type name: `case RED`, not `case Light.RED` (since Java 21 the long form also compiles, but the short one is usual).',
        'There are two kinds. A **switch statement** runs code for its side effects, like printing. A **switch expression** produces a value, which you return or store in a variable. With the arrow `->` there is no fall-through, so you need no `break`.',
        'A switch expression must be **exhaustive**: it must have a result for every possible input. For an enum the compiler knows every constant, so it can check this. If one is missing, you get `the switch expression does not cover all possible input values`.',
        'This check is the reason to leave out `default` in a switch over an enum. When a teammate adds a new constant later, every switch expression without `default` stops compiling and shows exactly where the new constant needs a rule. With `default`, the new constant silently lands in the default branch.',
        'Several constants can share one branch: `case SATURDAY, SUNDAY -> "weekend";`. If a branch needs more than one line, use a block and `yield` to hand back the value.'
      ],
      why: 'The compiler checks that every constant has a rule, today and every time someone adds a constant.',
      whenUse: 'Whenever the answer depends on which constant you have and the rule does not belong inside the enum itself.',
      syntax: '`Result r = switch (value) { case A -> resultA; case B, C -> resultBC; };`',
      fileName: 'Labels.java',
      code: `enum Status { CREATED, PICKED_UP, IN_DEPOT, DELIVERED }

public class Labels {
    // switch expression: gives back a value, must cover every constant
    static String label(Status status) {
        return switch (status) {
            case CREATED -> "waiting for pickup";
            case PICKED_UP, IN_DEPOT -> "on the way";
            case DELIVERED -> "done";
        };
    }

    // switch statement: runs code, here only for some constants
    static void notifyCustomer(Status status) {
        switch (status) {
            case PICKED_UP -> System.out.println("  SMS: your parcel is coming");
            case DELIVERED -> System.out.println("  SMS: your parcel has arrived");
            default -> { }   // nothing to send for the others
        }
    }

    public static void main(String[] args) {
        for (Status s : Status.values()) {
            System.out.println(s + ": " + label(s));
            notifyCustomer(s);
        }
    }
}`,
      output: `CREATED: waiting for pickup
PICKED_UP: on the way
  SMS: your parcel is coming
IN_DEPOT: on the way
DELIVERED: done
  SMS: your parcel has arrived`,
      codeSummary: 'A switch expression that gives every status a label, and a switch statement that sends a message for two of them.',
      codeExplanation: [
        { label: 'Line 6', code: 'return switch (status) {', text: 'A switch expression. Its value is the value of the branch that matches, and that value is returned.' },
        { label: 'Line 7', code: 'case CREATED -> "waiting for pickup";', text: 'Inside the switch you write `CREATED`, not `Status.CREATED`. Java knows the type from `status`.' },
        { label: 'Line 8', code: 'case PICKED_UP, IN_DEPOT -> "on the way";', text: 'Two constants share one branch, separated by a comma.' },
        { label: 'Line 10', code: '};', text: 'The semicolon ends the `return` statement. There is no `default`: all four constants are covered.' },
        { label: 'Line 15', code: 'switch (status) {', text: 'A switch statement. It produces no value, it only runs code.' },
        { label: 'Line 16', code: 'case PICKED_UP -> System.out.println("  SMS: your parcel is coming");', text: 'With `->` only this one line runs. No `break` is needed.' },
        { label: 'Line 18', code: 'default -> { }   // nothing to send for the others', text: 'Here `default` is fine: the statement is meant to handle only two constants, and an empty block does nothing.' },
        { label: 'Line 23', code: 'for (Status s : Status.values()) {', text: 'Walks over all four constants, so you see every label once.' }
      ],
      sections: [
        {
          title: 'The old colon form and its trap',
          text: [
            'Older code uses `case RED:` with a colon. In this form the code **falls through**: after the matching case, Java keeps running the next cases until it meets a `break`. Forget one `break`, and two branches run.',
            'Prefer the arrow form `->` for new code. You still need to read the colon form, because you will meet it in older projects.'
          ],
          fileName: 'FallThrough.java',
          code: `enum Light { RED, YELLOW, GREEN }

public class FallThrough {
    public static void main(String[] args) {
        Light light = Light.YELLOW;

        switch (light) {
            case RED:
                System.out.println("stop");
                break;
            case YELLOW:
                System.out.println("wait");
                // break forgotten here
            case GREEN:
                System.out.println("go");
                break;
        }
    }
}`,
          output: `wait
go`,
          warn: 'The light is yellow, but the program prints `go` too. That is fall-through. With `case YELLOW -> System.out.println("wait");` it cannot happen.'
        },
        {
          title: 'Let the compiler find the missing case',
          text: [
            'Here a new constant `BLINKING` was added to the enum, and the switch expression was not updated. javac refuses to compile, and the caret `^` points at the switch that needs work.'
          ],
          fileName: 'Missing.java (does not compile)',
          codeLanguage: 'text',
          code: `enum Light { RED, YELLOW, GREEN, BLINKING }

public class Missing {
    static String action(Light light) {
        return switch (light) {
            case RED -> "stop";
            case YELLOW -> "wait";
            case GREEN -> "go";
        };
    }

    public static void main(String[] args) {
        System.out.println(action(Light.RED));
    }
}

$ javac Missing.java
Missing.java:5: error: the switch expression does not cover all possible input values
        return switch (light) {
               ^
1 error`,
          mermaid: `flowchart TD
  A["Someone adds BLINKING to the enum"] --> B{"Does the switch have default?"}
  B -- "no" --> C["javac: does not cover all values"]
  C --> D["You add case BLINKING"]
  B -- "yes" --> E["Compiles without a word"]
  E --> F["BLINKING gets the default rule, maybe wrong"]`,
          diagramNote: 'Without `default`, the compiler shows every place that needs the new constant. With `default`, you have to find them yourself.'
        },
        {
          title: 'A block with yield',
          text: [
            'When one branch needs a few statements, write a block `{ … }` after the arrow and end it with `yield value;`. `yield` hands the value out of the block to the switch expression, like `return` hands a value out of a method.'
          ],
          fileName: 'Shipping.java',
          code: `enum Size { SMALL, MEDIUM, LARGE }

public class Shipping {
    static int priceInCents(Size size, boolean express) {
        return switch (size) {
            case SMALL -> 399;
            case MEDIUM -> 599;
            case LARGE -> {
                int base = 899;
                if (express) {
                    base = base + 500;
                }
                yield base;
            }
        };
    }

    public static void main(String[] args) {
        System.out.println(priceInCents(Size.SMALL, false));
        System.out.println(priceInCents(Size.LARGE, false));
        System.out.println(priceInCents(Size.LARGE, true));
    }
}`,
          output: `399
899
1399`
        },
        {
          title: 'Statement or expression: which needs what',
          table: {
            head: ['', 'switch statement', 'switch expression'],
            rows: [
              ['What it does', 'runs code', 'produces a value'],
              ['Looks like', '`switch (x) { case A -> …; }`', '`var r = switch (x) { case A -> …; };`'],
              ['Must cover all constants?', 'no (only with `case null` or patterns)', '**yes**'],
              ['`default` over an enum', 'fine when you mean “all the others”', 'leave it out, so the compiler can help'],
              ['Value out of a block', '—', '`yield value;`']
            ],
            note: 'Both forms throw a `NullPointerException` when the value is `null`. Since Java 21 you may add `case null ->` to handle it on purpose.'
          }
        }
      ],
      technical: [
        'A switch over an enum does not compare names. javac uses the **ordinal** of the constant (its position number, see the next lesson). It builds a small lookup array in a hidden helper class (for `Labels` that is `Labels$1.class`, with a field like `$SwitchMap$Status`). At run time the JVM reads `status.ordinal()`, looks up the branch number in that array and jumps there. That is as fast as a switch over an `int`.',
        'The helper array is the reason the switch keeps working when someone reorders the constants and recompiles only the enum: the array is filled by name when the class loads.',
        'For a switch expression without `default`, javac adds a hidden default branch anyway. It throws `MatchException` (Java 21 and later). It can only run when the enum was changed and recompiled without recompiling the switch, so a new constant appears that the switch has never seen.',
        'Because the switch calls `ordinal()` on the value, a `null` value fails with `Cannot invoke "Status.ordinal()" because "status" is null`.'
      ],
      tryIt: {
        steps: [
          'Copy `Labels.java` and run it.',
          'Add a constant `RETURNED` at the end of the enum and compile.',
          'Read the error, then add `case RETURNED -> "back at the sender";` and run again.',
          'Now add `default -> "unknown";` to `label` and add one more constant `LOST`. Compile.'
        ],
        see: 'After RETURNED: `the switch expression does not cover all possible input values`. After adding the case it runs. With `default`, LOST compiles quietly and is labelled `unknown`, which shows why `default` hides mistakes.'
      },
      check: [
        { q: 'Why do you write `case RED` and not `case Light.RED`?', a: 'The type is already known from the value in `switch (...)`, so the short name is enough. Since Java 21 the long name also compiles, but the short one is the custom.' },
        { q: 'What happens when a switch expression over an enum misses one constant?', a: 'It does not compile: `the switch expression does not cover all possible input values`.' },
        { q: 'Why is `default` a bad idea in a switch expression over an enum?', a: 'It covers every future constant too, so the compiler no longer tells you where a new constant needs a rule.' }
      ],
      keyPoints: [
        'Case labels use the short constant name: `case RED ->`.',
        'A switch expression must cover every constant; the compiler checks it.',
        'Leave out `default` in switch expressions over enums.',
        'The arrow form `->` has no fall-through and needs no `break`.',
        'Use `yield` to hand a value out of a block in a switch expression.'
      ],
      commonMistakes: [
        'Adding `default ->` to a switch expression over an enum. New constants then slip through without a compile error. Remove `default` and list every constant.',
        '`case YELLOW:` without `break` in the colon form. The next case runs too. Use `case YELLOW ->` instead.',
        'Forgetting the `;` after the closing `}` of `return switch (…) { … };`. The switch expression is part of a statement, and the statement needs its semicolon.',
        'Switching over a variable that can be `null`. It throws a `NullPointerException`. Check for `null` first or add `case null ->`.'
      ],
      related: ['Control Flow', 'Exceptions']
    }
  ]);
})();
