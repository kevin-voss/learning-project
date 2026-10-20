Java.topics.controlFlow = Java.topics.controlFlow || {};

const flowGlossary = [
  { term: 'condition', definition: 'A boolean expression that decides whether a branch or loop should run.' },
  { term: 'boolean', definition: 'A value that is either true or false.' },
  { term: 'if/else', definition: 'A branching structure that chooses which block of code to run.' },
  { term: 'switch', definition: 'A branching structure for choosing among known cases.' },
  { term: 'for loop', definition: 'A loop with initialization, condition, and update in one header.' },
  { term: 'enhanced for', definition: 'A loop that visits each item in an array or collection without exposing an index.' },
  { term: 'while', definition: 'A loop that checks its condition before every run.' },
  { term: 'do-while', definition: 'A loop that runs once before checking its condition.' },
  { term: 'break', definition: 'A keyword that exits the nearest loop or switch.' },
  { term: 'continue', definition: 'A keyword that skips to the next loop iteration.' },
  { term: 'iteration', definition: 'One run through a loop body.' }
];

Java.topics.controlFlow.lessons = [
  {
    id: 'if-else',
    num: '01',
    title: 'if/else',
    category: 'branches',
    icon: '?',
    tagline: 'Run code only when a condition matches',
    definition: 'if/else chooses between blocks of code based on a boolean condition.',
    realWorld: 'It is like a fork in a hiking trail: if the sign says lake, go left; otherwise, go right.',
    syntax: 'Use if (condition) { ... } else if (anotherCondition) { ... } else { ... }. The condition must produce a boolean value.',
    fileName: 'IfElse.java',
    code: `public class IfElse {
    public static void main(String[] args) {
        int score = 82;

        if (score >= 90) {
            System.out.println("Excellent");
        } else if (score >= 70) {
            System.out.println("Passed");
        } else {
            System.out.println("Try again");
        }
    }
}`,
    keyPoints: [
      'The condition inside parentheses must be boolean.',
      'Use else if for additional branches.',
      'Use else for the fallback path.',
      'Braces make branch boundaries clear.'
    ],
    commonMistakes: [
      'Putting a semicolon right after the if condition.',
      'Using = instead of == in conditions.',
      'Writing branches in an order that makes later checks unreachable.'
    ],
    pros: [
      'Best choice for ranges, complex conditions, and one-off decisions.',
      'Easy for beginners to read when branches are short.',
      'Works with any boolean expression.'
    ],
    cons: [
      'Long if/else chains can become hard to scan.',
      'Branch order matters and can hide bugs.',
      'Deep nesting makes code harder to test.'
    ],
    related: ['Comparison', 'Logical Operators'],
    glossary: flowGlossary
  },
  {
    id: 'switch-classic',
    num: '02',
    title: 'switch Statement',
    category: 'branches',
    icon: '⇄',
    tagline: 'Choose among known cases',
    definition: 'A classic switch statement chooses a block based on a matching case label.',
    realWorld: 'It is like selecting a button on a vending machine. Each button maps to a specific action.',
    syntax: 'Use switch (value) { case X: ... break; default: ... }. Classic switch statements usually need break to avoid fall-through.',
    fileName: 'SwitchStatement.java',
    code: `public class SwitchStatement {
    public static void main(String[] args) {
        int day = 3;

        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            default:
                System.out.println("Another day");
        }
    }
}`,
    keyPoints: [
      'switch works well for a known set of discrete values.',
      'Classic switch cases often need break.',
      'default handles unmatched values.',
      'Modern Java also has switch expressions.'
    ],
    commonMistakes: [
      'Forgetting break and causing fall-through.',
      'Using switch for complex range checks better suited to if/else.',
      'Skipping default when unexpected input matters.'
    ],
    related: ['switch Expression', 'if/else'],
    glossary: flowGlossary
  },
  {
    id: 'switch-expression',
    num: '03',
    title: 'switch Expression',
    category: 'branches',
    icon: '=>',
    tagline: 'Switch that returns a value',
    definition: 'A switch expression chooses a value. In Java 21, arrow labels are standard and avoid accidental fall-through.',
    realWorld: 'It is like a menu board where each choice directly gives you one price.',
    syntax: 'Assign from switch when every branch should produce a value: String label = switch (grade) { case "A" -> "Excellent"; default -> "Try again"; };',
    fileName: 'SwitchExpression.java',
    code: `public class SwitchExpression {
    public static void main(String[] args) {
        String grade = "B";

        String message = switch (grade) {
            case "A" -> "Excellent";
            case "B", "C" -> "Passed";
            case "D" -> "Close";
            default -> "Try again";
        };

        System.out.println(message);
    }
}`,
    keyPoints: [
      'Switch expressions produce a value.',
      'Arrow cases do not fall through.',
      'Multiple labels can share one result.',
      'Keep switch expressions focused and readable.'
    ],
    commonMistakes: [
      'Forgetting the semicolon after assigning a switch expression.',
      'Mixing statement and expression styles before understanding either.',
      'Assuming preview pattern-matching examples are needed for basic switch.'
    ],
    related: ['switch Statement', 'Operators'],
    glossary: flowGlossary
  },
  {
    id: 'for-loop',
    num: '04',
    title: 'for Loop',
    category: 'loops',
    icon: 'for',
    tagline: 'Repeat with a counter',
    definition: 'A for loop repeats a block with initialization, condition, and update in one compact header.',
    realWorld: 'It is like counting laps: start at lap one, keep going while laps remain, increment after each lap.',
    syntax: 'for (int i = 0; i < 5; i++) { ... } means start i at 0, run while i is less than 5, and add 1 after each iteration.',
    fileName: 'ForLoop.java',
    code: `public class ForLoop {
    public static void main(String[] args) {
        int total = 0;

        for (int i = 1; i <= 5; i++) {
            total += i;
        }

        System.out.println(total);
    }
}`,
    keyPoints: [
      'Use for loops when you know the counting pattern.',
      'The loop header has initialization, condition, and update.',
      'Loop variables commonly start at 0 or 1 depending on the task.',
      'The condition is checked before each iteration.'
    ],
    commonMistakes: [
      'Off-by-one errors in the condition.',
      'Updating the wrong variable.',
      'Creating an infinite loop by forgetting the update.'
    ],
    pros: [
      'Great when you know the count or index pattern.',
      'Keeps loop setup in one visible place.',
      'Works well with arrays and numeric ranges.'
    ],
    cons: [
      'Off-by-one mistakes are common.',
      'The header can get hard to read if it does too much.',
      'Not ideal when repetition depends on unpredictable input.'
    ],
    related: ['Scope', 'Arrays'],
    glossary: flowGlossary
  },
  {
    id: 'enhanced-for',
    num: '05',
    title: 'Enhanced for',
    category: 'loops',
    icon: ':',
    tagline: 'Loop over every item',
    definition: 'The enhanced for loop visits each item in an array or iterable collection without exposing an index.',
    realWorld: 'It is like handing out papers to every person in a row without caring what seat number they have.',
    syntax: 'for (String name : names) { ... } reads as: for each String name inside names, run this block.',
    fileName: 'EnhancedFor.java',
    code: `public class EnhancedFor {
    public static void main(String[] args) {
        String[] names = {"Ari", "Mina", "Sol"};

        for (String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}`,
    keyPoints: [
      'Use enhanced for when you need every item.',
      'It avoids manual index handling.',
      'It works with arrays and collections.',
      'Use a regular for loop when you need the index.'
    ],
    commonMistakes: [
      'Trying to change array structure while iterating.',
      'Using enhanced for when index position matters.',
      'Forgetting the colon syntax.'
    ],
    related: ['Arrays', 'Collections Basics'],
    glossary: flowGlossary
  },
  {
    id: 'while-do-while',
    num: '06',
    title: 'while and do-while',
    category: 'loops',
    icon: '↻',
    tagline: 'Repeat while a condition holds',
    definition: 'while loops repeat as long as a condition is true. do-while loops run the body once before checking the condition.',
    realWorld: 'A while loop is checking the weather before leaving. A do-while loop is taking one practice swing before deciding whether to continue.',
    syntax: 'while (condition) { ... } may run zero times. do { ... } while (condition); always runs at least once.',
    fileName: 'WhileLoops.java',
    code: `public class WhileLoops {
    public static void main(String[] args) {
        int countdown = 3;

        while (countdown > 0) {
            System.out.println(countdown);
            countdown--;
        }

        int attempts = 0;
        do {
            attempts++;
        } while (attempts < 1);

        System.out.println("Attempts: " + attempts);
    }
}`,
    keyPoints: [
      'while checks before the body runs.',
      'do-while checks after the body runs.',
      'Both need a condition that eventually changes.',
      'Use while when repetition depends on a condition, not a simple count.'
    ],
    commonMistakes: [
      'Forgetting to update the condition variable.',
      'Using do-while when zero runs should be allowed.',
      'Writing conditions that are always true.'
    ],
    pros: [
      'Good when the number of repetitions is not known up front.',
      'while is clear for input, waiting, and validation loops.',
      'do-while is useful when the body must run before the first check.'
    ],
    cons: [
      'Infinite loops are easy if the condition never changes.',
      'do-while is less common and easier to misuse.',
      'Complex conditions can hide when the loop stops.'
    ],
    related: ['Logical Operators', 'I/O Basics'],
    glossary: flowGlossary
  },
  {
    id: 'break-continue',
    num: '07',
    title: 'break and continue',
    category: 'loops',
    icon: '↯',
    tagline: 'Control loop progress deliberately',
    definition: 'break exits a loop early. continue skips the rest of the current iteration and moves to the next one.',
    realWorld: 'break is leaving a meeting. continue is skipping one agenda item and moving to the next.',
    syntax: 'Use break; to leave the nearest loop. Use continue; to skip the rest of the current iteration and move to the next one.',
    fileName: 'BreakContinue.java',
    code: `public class BreakContinue {
    public static void main(String[] args) {
        for (int number = 1; number <= 8; number++) {
            if (number == 3) {
                continue;
            }

            if (number == 7) {
                break;
            }

            System.out.println(number);
        }
    }
}`,
    keyPoints: [
      'break exits the nearest loop or switch.',
      'continue jumps to the next loop iteration.',
      'Use them sparingly for clear early exits.',
      'They can simplify guard-style loop logic.'
    ],
    commonMistakes: [
      'Using break when continue was intended.',
      'Making loop flow hard to follow with many jumps.',
      'Forgetting that break exits only the nearest loop unless labels are used.'
    ],
    related: ['for Loop', 'switch Statement'],
    glossary: flowGlossary
  }
];
