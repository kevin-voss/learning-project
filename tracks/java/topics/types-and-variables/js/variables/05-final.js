// Lesson 05: final variables and static final constants.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '05',
    id: 'final',
    title: 'final and Constants',
    category: 'variables',
    icon: '!',
    tagline: 'Write it in ink, not in pencil',
    realWorld: 'You write a shopping list in pencil, because it changes. Your birthday you write in ink, because it never changes. A `final` variable is written in ink.',
    kid: [
      'Some boxes are special. Once you put something inside, the lid is glued shut. You can still look inside, but you can never swap what is in there.',
      'That is what `final` means. If you try to put something new into a `final` box, Java says "no!" before your program even starts.',
      'Grown-up programmers use glued boxes for things that never change, like how many lives a player starts with, and they write the name in big CAPITAL letters so everyone sees it.'
    ],
    definition: 'A `final` variable can be assigned exactly once. After that, the compiler refuses every new assignment. A **constant** is a value that never changes, written as `static final` with a name in `CAPITALS_WITH_UNDERSCORES`.',
    explain: [
      'Put the keyword `final` in front of a declaration: `final String player = "Mia";`. From now on `player = "Leo";` is a compile error. You can still read `player` as often as you like.',
      'A `final` variable does not need its value on the same line. You can write `final int tickets;` and assign it later, but only once. Java checks that it gets exactly one value before it is read.',
      'For values that the whole program shares, you declare a **constant** outside `main`, directly inside the class: `static final int MAX_LIVES = 3;`. A variable declared there is called a **field**. `static` means the field belongs to the class itself, not to one object; you learn the details in [Classes & Objects](../classes-and-objects/index.html).',
      'Constant names use **UPPER_SNAKE_CASE**: all capitals, words joined by underscores. Java itself does this: `Integer.MAX_VALUE`, `Math.PI`. Normal variables keep camelCase, even when they are `final`.',
      'A literal number with no name in the middle of your code is called a **magic number**, because nobody knows where it comes from. `lives = 3;` in ten places is hard to change. `lives = MAX_LIVES;` explains itself and changes in one place.'
    ],
    why: 'It stops you from changing a value by accident, and a good constant name explains what a number means.',
    whenUse: 'For values that must never change while the program runs: limits, prices, rates, sizes. Also for local variables you set once, to show the reader they stay the same.',
    syntax: 'Local: `final type name = value;` · Constant: `static final type NAME = value;` (inside the class, outside `main`)',
    fileName: 'FinalConstants.java',
    code: `public class FinalConstants {
    // A class constant: static final, NAME_IN_CAPITALS
    static final int MAX_LIVES = 3;
    static final double TICKET_PRICE = 4.50;

    public static void main(String[] args) {
        // A final local variable: set once, never changed
        final String player = "Mia";

        // A normal variable: it may change
        int lives = MAX_LIVES;
        lives = lives - 1;
        lives = lives - 1;

        // A final variable may also get its value one line later
        final int ticketsBought;
        ticketsBought = 2;

        double cost = ticketsBought * TICKET_PRICE;

        System.out.println(player + " has " + lives + " of " + MAX_LIVES + " lives");
        System.out.println(player + " paid " + cost + " for " + ticketsBought + " tickets");
        System.out.println("Pi is about " + Math.PI);
    }
}`,
    output: `Mia has 1 of 3 lives
Mia paid 9.0 for 2 tickets
Pi is about 3.141592653589793`,
    codeSummary: 'Two class constants, one final local, one normal variable that changes, and one final variable that gets its value a line later.',
    codeExplanation: [
      { label: 'Line 3', code: 'static final int MAX_LIVES = 3;', text: 'A constant. It sits inside the class but outside `main`, so every method of the class can use it.' },
      { label: 'Line 4', code: 'static final double TICKET_PRICE = 4.50;', text: 'Another constant. The name says what the number means.' },
      { label: 'Line 8', code: 'final String player = "Mia";', text: 'A final local variable. Reading it is fine, assigning it again is not.' },
      { label: 'Line 11', code: 'int lives = MAX_LIVES;', text: 'A normal variable starts with the value of the constant. `lives` itself is not final.' },
      { label: 'Line 12', code: 'lives = lives - 1;', text: '`lives` may change. `MAX_LIVES` stays `3`.' },
      { label: 'Line 16', code: 'final int ticketsBought;', text: 'A final variable without a value yet. This is allowed.' },
      { label: 'Line 17', code: 'ticketsBought = 2;', text: 'Its one and only assignment. A second `ticketsBought = 3;` would not compile.' },
      { label: 'Line 19', code: 'double cost = ticketsBought * TICKET_PRICE;', text: '`2 * 4.50` is `9.0`. Constants are read like any variable.' },
      { label: 'Line 23', code: 'System.out.println("Pi is about " + Math.PI);', text: '`Math.PI` is a constant that comes with Java. Same naming rule: CAPITALS.' }
    ],
    sections: [
      {
        title: 'Pencil, ink and a shared poster',
        text: 'Three ways to declare a variable, from "may change" to "fixed for the whole program".',
        table: {
          head: ['Kind', 'Example', 'Can change?', 'Name style'],
          rows: [
            ['Normal variable (pencil)', '`int lives = 3;`', 'yes, any time', '`camelCase`'],
            ['final local (ink)', '`final String player = "Mia";`', 'no, set once', '`camelCase`'],
            ['Constant (a poster on the wall)', '`static final int MAX_LIVES = 3;`', 'no, never', '`UPPER_SNAKE_CASE`']
          ],
          note: 'The naming rules come from [Syntax Fundamentals](../syntax-fundamentals/index.html), lesson Naming Conventions.'
        }
      },
      {
        title: 'The compiler guards the lid',
        text: [
          'A `final` variable has two states: "no value yet" and "has its value". The only allowed move is the first assignment. Every other assignment is a compile error.',
          'The program below tries a second assignment. It does not compile, and the message says exactly why.'
        ],
        mermaid: `stateDiagram-v2
  [*] --> NoValue: final int maxLives
  NoValue --> HasValue: maxLives = 3
  HasValue --> HasValue: read maxLives
  HasValue --> CompileError: maxLives = 4`,
        diagramNote: 'Reading is always fine. A second assignment never compiles.',
        fileName: 'FinalAgain.java',
        code: `public class FinalAgain {
    public static void main(String[] args) {
        final int maxLives = 3;
        maxLives = 4;
    }
}`,
        noRun: true,
        output: `FinalAgain.java:4: error: cannot assign a value to final variable maxLives
        maxLives = 4;
        ^
1 error`
      },
      {
        title: 'No magic numbers',
        text: [
          'Imagine the tax rate is written as `25` in twenty places. When it changes to `20`, you must find all twenty, and miss none. With a constant you change one line.',
          'This program keeps prices in cents (whole numbers), so the maths is exact. Each number with a meaning has a name.'
        ],
        fileName: 'PriceWithTax.java',
        code: `public class PriceWithTax {
    static final int TAX_PERCENT = 25;
    static final int SHIPPING_CENTS = 499;

    public static void main(String[] args) {
        int bookCents = 1200;
        int gameCents = 3000;

        int bookTotal = bookCents + bookCents * TAX_PERCENT / 100 + SHIPPING_CENTS;
        int gameTotal = gameCents + gameCents * TAX_PERCENT / 100 + SHIPPING_CENTS;

        System.out.println("Book: " + bookTotal + " cents");
        System.out.println("Game: " + gameTotal + " cents");
    }
}`,
        output: `Book: 1999 cents
Game: 4249 cents`,
        tip: 'Wrong: `int total = price + price * 25 / 100 + 499;`. Right: give `25` and `499` names. The code reads like a sentence.'
      },
      {
        title: 'final fixes the box, not the thing it points to',
        text: [
          'For primitives, `final` means the value never changes. For reference types (like `String` or your own classes), the box holds an arrow to an object. `final` glues the arrow in place: it always points to the same object.',
          'Strings cannot change anyway, so a `final String` is fully fixed. Other objects can still change on the inside. You see this in the lesson Primitives vs Reference Types.'
        ],
        bullets: [
          '`final int x = 5;` the number 5 is fixed.',
          '`final String s = "hi";` the arrow is fixed, and the String cannot change either.',
          'A `final` arrow to a changeable object: the arrow is fixed, the object can still change.'
        ]
      }
    ],
    technical: [
      '`final` on a local variable is a pure compile-time check. The bytecode for `final int x = 5;` and `int x = 5;` is the same. The compiler tracks every path through the method and reports an error if a final variable could be assigned twice, or read before its single assignment.',
      'A `static final` field of a primitive type or `String`, set with a literal or a constant expression (like `60 * 60`), is a **compile-time constant**. `javac` copies its value directly into every place that uses it. If another class uses your constant and you change it, you must recompile that class too, or it keeps the old value.',
      'Java has no `const` keyword. `const` is reserved but unused, so `final` does the job.'
    ],
    tryIt: {
      steps: [
        'Copy `FinalConstants.java` and run it.',
        'Add `player = "Leo";` as the last line of `main` and compile.',
        'Remove that line. Change `MAX_LIVES` to `5` and run again.'
      ],
      see: 'the error `cannot assign a value to final variable player`, then after the change `Mia has 3 of 5 lives`.'
    },
    check: [
      { q: 'Does `final int x; x = 1;` compile?', a: 'Yes. A final variable may get its single value later. A second `x = 2;` would not compile.' },
      { q: 'Where do you declare a constant like `MAX_LIVES`, and how do you name it?', a: 'Inside the class, outside `main`, as `static final`. The name is in UPPER_SNAKE_CASE.' },
      { q: 'What is a magic number?', a: 'A number in the code with no name that explains it, like `499`. Give it a constant name such as `SHIPPING_CENTS`.' }
    ],
    keyPoints: [
      '`final` means: assigned exactly once.',
      'Reading a final variable is always fine.',
      'Constants are `static final` and live inside the class, outside methods.',
      'Constants use UPPER_SNAKE_CASE, normal variables camelCase.',
      'Name your numbers: no magic numbers.'
    ],
    commonMistakes: [
      'Changing a constant later: `MAX_LIVES = 4;`. Fix: if it must change, it is not a constant. Drop `final` or use a normal variable.',
      'Declaring a constant inside `main`: `static final int MAX = 3;` there does not compile. Fix: move it up into the class body.',
      'Lowercase constant names: `static final int maxLives = 3;`. Fix: `MAX_LIVES`.',
      'Thinking `final` makes an object unchangeable. Fix: it only fixes the arrow. The object may still change inside.'
    ],
    related: ['Scope', 'Primitives vs Reference Types', 'Syntax Fundamentals'],
    glossary: topic.glossary
  });
})();
