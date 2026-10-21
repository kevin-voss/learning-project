(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'switch-classic',
    num: '03',
    title: 'switch Statement',
    category: 'branches',
    icon: '⇄',
    tagline: 'Jump to the case that matches',
    realWorld: 'A lift with buttons. You press 3, and the lift goes straight to floor 3. It does not stop at every floor to ask "is this 3?".',
    kid: [
      'Think of a toy box with numbered drawers. Someone says "drawer 3!", and you open drawer 3 at once.',
      'The classic switch has a funny habit. When you open drawer 3, it keeps opening drawer 4, 5 and 6 too, until someone shouts "stop!". In Java, that "stop!" is the word `break`.',
      'If nobody says a drawer number that exists, you open the special drawer called `default`.'
    ],
    definition: 'A `switch` statement compares one value with a list of fixed `case` labels and **jumps** to the matching one. It runs from there until a `break` or the end of the switch. `default` catches every value without its own case.',
    explain: [
      'After `switch` comes the **selector**: the value in round brackets, for example `switch (day)`. Inside the braces are the **case labels**: `case 1:`, `case 2:` and so on. Each label is a constant: a fixed value you type into the code, not a variable.',
      'Java looks for the label that equals the selector and jumps there. The lines below that label run one after the other. A `break;` ends the switch and Java goes on after its closing brace.',
      'Without `break`, Java does not stop at the next label. It keeps running the code of the following cases. This is called **fall-through**. It is a common bug, and sometimes a wanted feature: several labels in a row can share one block.',
      'The `default:` label is optional. It runs when no case matches, like the `else` of an if chain. Without a default and without a matching case, the switch does nothing.',
      'A switch only tests **equality** with fixed values. For ranges like "90 or more" use `if / else if`. The next lesson shows the modern arrow form, which has no fall-through at all.'
    ],
    why: 'A long chain `if (day == 1) … else if (day == 2) …` repeats the same variable again and again. A switch names the value once and lists the cases as a clean table.',
    whenUse: 'When one value (an int, a char, a String, or later an enum) is compared with a list of known, fixed values.',
    syntax: '`switch (selector) { case VALUE1: …; break; case VALUE2: …; break; default: …; }` Since Java 14 one label can list several values: `case 6, 7:`.',
    mermaid: `flowchart TD
  S["switch (day) with day = 3"] --> J{"which label equals 3?"}
  J -->|case 1| C1["name = Monday, break"]
  J -->|case 2| C2["name = Tuesday, break"]
  J -->|case 3| C3["name = Wednesday, break"]
  J -->|no match| D["default: name = not a day"]
  C1 & C2 & C3 & D --> E["after the switch: print"]`,
    visualLabel: 'A switch is a jump',
    visualNote: 'Java does not test case 1, then case 2, then case 3 like an if chain. It jumps to the matching label. Each `break` leads to the end.',
    fileName: 'DayName.java',
    code: `public class DayName {
    public static void main(String[] args) {
        int day = 3;
        String name;

        switch (day) {
            case 1:
                name = "Monday";
                break;
            case 2:
                name = "Tuesday";
                break;
            case 3:
                name = "Wednesday";
                break;
            case 4:
                name = "Thursday";
                break;
            case 5:
                name = "Friday";
                break;
            case 6:
                name = "Saturday";
                break;
            case 7:
                name = "Sunday";
                break;
            default:
                name = "not a day";
                break;
        }

        System.out.println("Day " + day + " is " + name);
    }
}`,
    output: 'Day 3 is Wednesday',
    codeSummary: 'The day number 3 becomes the word Wednesday. Every case sets `name` and then leaves the switch with `break`.',
    codeExplanation: [
      { label: 'Line 4', code: 'String name;', text: 'Declared without a value. Every case (and the default) gives it one, so Java knows it is set after the switch.' },
      { label: 'Line 6', code: 'switch (day) {', text: 'The selector is `day`. Java reads its value (3) once and looks for `case 3:`.' },
      { label: 'Line 7', code: 'case 1:', text: 'A label, not a test that runs. For 3, Java does not stop here at all.' },
      { label: 'Line 13', code: 'case 3:', text: 'The match. Java jumps here and runs the lines below it.' },
      { label: 'Line 14', code: 'name = "Wednesday";', text: 'The work of this case.' },
      { label: 'Line 15', code: 'break;', text: 'Leaves the switch at once. Without it, Java would also run `name = "Thursday";` and the cases below.' },
      { label: 'Line 28', code: 'default:', text: 'Runs for any day that is not 1 to 7, for example 0 or 9.' },
      { label: 'Line 33', code: 'System.out.println("Day " + day + " is " + name);', text: 'After the closing brace of the switch. Every `break` leads here.' }
    ],
    sections: [
      {
        title: 'Forgot break? Fall-through',
        text: [
          'Here every `break` is missing except the one after Friday. Java jumps to `case 3:` and then runs down through Thursday and Friday too. The labels on the way are ignored; only `break` stops it.'
        ],
        fileName: 'FallThrough.java',
        code: `public class FallThrough {
    public static void main(String[] args) {
        int day = 3;

        switch (day) {
            case 1:
                System.out.println("Monday");
            case 2:
                System.out.println("Tuesday");
            case 3:
                System.out.println("Wednesday");
            case 4:
                System.out.println("Thursday");
            case 5:
                System.out.println("Friday");
                break;
            default:
                System.out.println("Weekend");
        }

        System.out.println("After the switch");
    }
}`,
        output: `Wednesday
Thursday
Friday
After the switch`,
        table: {
          head: ['Step', 'Where Java is', 'What happens'],
          rows: [
            ['1', '`switch (day)`', 'day is 3, jump to `case 3:`'],
            ['2', '`case 3:`', 'prints Wednesday, no break'],
            ['3', '`case 4:`', 'label ignored, prints Thursday, no break'],
            ['4', '`case 5:`', 'label ignored, prints Friday'],
            ['5', '`break;`', 'leave the switch'],
            ['6', 'after the switch', 'prints After the switch']
          ],
          note: 'A trace of the jumps. `default` is never reached because `break` came first.'
        },
        warn: 'Missing breaks compile without an error. Read every case and look for its `break` before you run the program.'
      },
      {
        title: 'Fall-through on purpose: several labels, one block',
        text: [
          'Fall-through has one good use: when several values need the same code, put their labels on top of each other with no code in between. Java falls from one empty label to the next until it reaches the shared block.',
          'Java 14 and newer also accept a list in one label: `case 4, 6, 9, 11:`. That says the same thing and is shorter.'
        ],
        fileName: 'DaysInMonth.java',
        code: `public class DaysInMonth {
    public static void main(String[] args) {
        int month = 4;
        int days;

        switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                days = 31;
                break;
            case 4, 6, 9, 11:
                days = 30;
                break;
            case 2:
                days = 28; // no leap years here
                break;
            default:
                days = 0;
        }

        System.out.println("Month " + month + " has " + days + " days");
    }
}`,
        output: 'Month 4 has 30 days'
      },
      {
        title: 'Switch on text and on single characters',
        text: [
          'The selector can be a `String`. Java compares it with each label using `equals`, so the letters must match exactly, including upper and lower case.',
          'A `char` works too. Its labels are written with single quotes, like `case \'q\':`.'
        ],
        fileName: 'Commands.java',
        code: `public class Commands {
    public static void main(String[] args) {
        String command = "stop";

        switch (command) {
            case "go":
                System.out.println("The car drives.");
                break;
            case "stop":
                System.out.println("The car stops.");
                break;
            default:
                System.out.println("Unknown command: " + command);
        }

        char key = 'q';

        switch (key) {
            case 'w':
                System.out.println("Move up");
                break;
            case 'q':
                System.out.println("Quit the game");
                break;
            default:
                System.out.println("This key does nothing");
        }
    }
}`,
        output: `The car stops.
Quit the game`
      },
      {
        title: 'What a switch can and cannot test',
        text: [
          'The selector must have one of a few types, and each label must be a constant of that type. Two labels with the same value are a compile error.'
        ],
        table: {
          head: ['Selector type', 'Allowed in Java 21?', 'Example label'],
          rows: [
            ['`int`, `short`, `byte`, `char`', 'yes', '`case 3:` / `case \'a\':`'],
            ['`String`', 'yes', '`case "go":`'],
            ['enum (topic 15)', 'yes', '`case MONDAY:`'],
            ['`long`, `float`, `double`, `boolean`', 'no, it does not compile', 'use `if / else if`'],
            ['a range like `score >= 90`', 'no, labels are single values', 'use `if / else if`']
          ],
          note: 'Labels must be fixed values. `case limit:` with a normal variable `limit` does not compile; a `final int` constant with a fixed value does.'
        },
        tip: 'Always write a `default`, even if you think every value has a case. It is the place to catch a surprise value, for example with a message like `Unknown command`.'
      }
    ],
    technical: [
      'For an int selector, `javac` builds a jump table. When the labels are close together (1, 2, 3 … 7) it writes a `tableswitch` instruction: the JVM uses the value as an index into a list of jump targets, so finding the case takes the same time for 3 cases or 300. For labels far apart (1, 500, 90000) it writes a `lookupswitch`, a sorted list the JVM searches.',
      'The case labels are only **jump targets** in the bytecode. Nothing is written between the end of one case and the next label, so execution runs straight on. That is the whole reason for fall-through, and `break` compiles to a plain `goto` to the end of the switch.',
      'A switch on a `String` compiles in two steps: first a switch on `command.hashCode()` (a number computed from the letters), then a call to `equals` to make sure the text really matches. A `null` selector throws a `NullPointerException`.'
    ],
    tryIt: {
      steps: [
        'Copy `DayName.java` and run it.',
        'Change `day` to 6 and to 9, run after each change.',
        'Delete the `break;` after `name = "Saturday";` and run with day 6 again.',
        'Put the break back.'
      ],
      see: '`Day 6 is Saturday`, `Day 9 is not a day`, and then `Day 6 is Sunday`: fall-through overwrote the name.'
    },
    check: [
      { q: 'What does a missing `break` cause in a classic switch?', a: 'Fall-through: Java keeps running the code of the next cases until a `break` or the end of the switch.' },
      { q: 'Can you write `case score >= 90:`?', a: 'No. Case labels are single constant values. Use `if / else if` for ranges.' },
      { q: 'When does `default` run?', a: 'When no case label equals the selector (or when an earlier case falls through into it).' }
    ],
    keyPoints: [
      'A switch jumps to the label that equals the selector.',
      'Every case needs `break;` unless you want fall-through.',
      'Stack labels (`case 1: case 3:`) or list them (`case 1, 3:`) to share code.',
      '`default` catches every other value.',
      'Selectors: int types, char, String and enums. Not double, long or boolean.'
    ],
    commonMistakes: [
      'A case without `break;` runs into the next case. Add the break.',
      '`case score >= 90:` does not compile. Use `if / else if` for ranges.',
      '`switch (price)` with a `double` does not compile. Use `if / else if`.',
      '`case "Go":` when the text is `"go"`. String labels match case-sensitively.',
      'No `default`. Add one to catch unexpected values.'
    ],
    related: ['switch Expression', 'if / else if / else', 'Nested and Combined Conditions'],
    glossary: CF.glossary
  });
})();
