Java.topics.operators = Java.topics.operators || {};

Java.topics.operators.lessons = [
  {
    id: 'arithmetic',
    num: '01',
    title: 'Arithmetic',
    category: 'calculation',
    icon: '+',
    tagline: 'Calculate with numbers',
    definition: 'Arithmetic operators perform math: addition, subtraction, multiplication, division, and remainder.',
    realWorld: 'They are calculator buttons built into the language.',
    fileName: 'Arithmetic.java',
    code: `public class Arithmetic {
    public static void main(String[] args) {
        int a = 17;
        int b = 5;

        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
}`,
    keyPoints: [
      '+, -, *, /, and % are the basic arithmetic operators.',
      'Integer division drops the remainder.',
      '% gives the remainder after division.',
      '+ also concatenates strings.'
    ],
    commonMistakes: [
      'Expecting 17 / 5 to produce 3.4 when both operands are int.',
      'Forgetting that string + number becomes text.',
      'Dividing by zero.'
    ],
    related: ['Literals', 'Casting']
  },
  {
    id: 'assignment',
    num: '02',
    title: 'Assignment',
    category: 'calculation',
    icon: '=',
    tagline: 'Store new values',
    definition: 'Assignment operators store a value in a variable. Compound assignments update a variable using its current value.',
    realWorld: 'It is like updating a scoreboard: replace the score, or add points to the score already shown.',
    fileName: 'Assignment.java',
    code: `public class Assignment {
    public static void main(String[] args) {
        int points = 10;
        points += 5;
        points *= 2;
        points -= 4;

        System.out.println(points);
    }
}`,
    keyPoints: [
      '= assigns the right-side value to the left-side variable.',
      '+=, -=, *=, /=, and %= combine calculation with assignment.',
      'The left side must be something assignable.',
      'Assignment changes the variable for later lines.'
    ],
    commonMistakes: [
      'Reading = as equality instead of assignment.',
      'Writing 10 = points.',
      'Hiding too much logic in compound assignments.'
    ],
    related: ['Variables', 'Arithmetic']
  },
  {
    id: 'comparison',
    num: '03',
    title: 'Comparison',
    category: 'decisions',
    icon: '==',
    tagline: 'Ask yes-or-no questions',
    definition: 'Comparison operators compare values and produce a boolean result.',
    realWorld: 'They are like a checklist item that can only be checked or not checked.',
    fileName: 'Comparison.java',
    code: `public class Comparison {
    public static void main(String[] args) {
        int score = 82;

        System.out.println(score == 100);
        System.out.println(score != 0);
        System.out.println(score >= 70);
        System.out.println(score < 60);
    }
}`,
    keyPoints: [
      '== checks equality for primitives.',
      '!= means not equal.',
      '<, <=, >, and >= compare order.',
      'Comparison results are boolean values.'
    ],
    commonMistakes: [
      'Using = when you mean ==.',
      'Using == for String content instead of equals.',
      'Chaining comparisons like 0 < score < 100.'
    ],
    related: ['Logical Operators', 'Control Flow']
  },
  {
    id: 'logical',
    num: '04',
    title: 'Logical Operators',
    category: 'decisions',
    icon: '&&',
    tagline: 'Combine boolean answers',
    definition: 'Logical operators combine or invert boolean expressions.',
    realWorld: 'They are like entry rules: you need a ticket and an ID, or you need a pass.',
    fileName: 'LogicalOperators.java',
    code: `public class LogicalOperators {
    public static void main(String[] args) {
        int age = 20;
        boolean hasTicket = true;

        boolean canEnter = age >= 18 && hasTicket;
        boolean needsHelp = age < 18 || !hasTicket;

        System.out.println(canEnter);
        System.out.println(needsHelp);
    }
}`,
    keyPoints: [
      '&& means both sides must be true.',
      '|| means at least one side must be true.',
      '! flips true to false or false to true.',
      'Logical operators are central to if and while conditions.'
    ],
    commonMistakes: [
      'Using & or | when you mean normal boolean logic.',
      'Forgetting parentheses in mixed conditions.',
      'Making negative conditions hard to read.'
    ],
    related: ['Short-Circuit', 'if/else']
  },
  {
    id: 'bitwise-basics',
    num: '05',
    title: 'Bitwise Basics',
    category: 'calculation',
    icon: '&',
    tagline: 'Operate on bits when needed',
    definition: 'Bitwise operators work on the binary bits inside integer values.',
    realWorld: 'They are like switches in a control panel. Each bit can be on or off, and operators combine switch patterns.',
    fileName: 'BitwiseBasics.java',
    code: `public class BitwiseBasics {
    public static void main(String[] args) {
        int read = 0b001;
        int write = 0b010;
        int permissions = read | write;

        System.out.println(permissions);
        System.out.println((permissions & read) != 0);
    }
}`,
    keyPoints: [
      '&, |, ^, ~, <<, >>, and >>> operate on bits.',
      'Bitwise logic is common in flags and low-level code.',
      'Binary literals can start with 0b.',
      'Most beginner business logic uses && and || instead.'
    ],
    commonMistakes: [
      'Confusing & with &&.',
      'Using bitwise operators in conditions by accident.',
      'Trying to learn bit tricks before ordinary control flow.'
    ],
    related: ['Logical Operators', 'Literals']
  },
  {
    id: 'precedence-short-circuit',
    num: '06',
    title: 'Precedence and Short-Circuit',
    category: 'decisions',
    icon: '()',
    tagline: 'Know what runs first',
    definition: 'Precedence decides how expressions group by default. Short-circuiting means && and || may skip the right side when the answer is already known.',
    realWorld: 'Precedence is order of operations in math class. Short-circuiting is stopping a checklist early when one required item already failed.',
    fileName: 'PrecedenceAndShortCircuit.java',
    code: `public class PrecedenceAndShortCircuit {
    public static void main(String[] args) {
        int value = 10;
        boolean result = value > 5 && value / 2 == 5;

        String name = null;
        boolean safe = name != null && name.length() > 0;

        System.out.println(result);
        System.out.println(safe);
        System.out.println((2 + 3) * 4);
    }
}`,
    keyPoints: [
      'Use parentheses when precedence is not obvious.',
      '* and / run before + and -.',
      '&& skips the right side if the left side is false.',
      '|| skips the right side if the left side is true.'
    ],
    commonMistakes: [
      'Trusting memory instead of adding parentheses.',
      'Putting a risky expression before a null check.',
      'Assuming every method call in a condition always runs.'
    ],
    related: ['Logical Operators', 'Control Flow']
  }
];
