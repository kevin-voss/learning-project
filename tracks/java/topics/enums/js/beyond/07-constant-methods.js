// Enums, lesson 7: a different method body per constant (abstract method per constant).
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-constant-methods',
      title: 'A Different Method per Constant',
      category: 'deeper',
      icon: 'ƒ',
      tagline: 'Each constant brings its own behaviour',
      realWorld: 'The buttons of a pocket calculator. They all look alike and sit in one row, but each one does its own thing: the plus button adds, the minus button subtracts. The rule is built into the button itself.',
      kid: [
        'Imagine four cards: PLUS, MINUS, TIMES and DIVIDE. Every card has the same question on it: “What do you do with two numbers?”',
        'But every card answers in its own way. PLUS says “I add them.” MINUS says “I take one away from the other.”',
        'If you make a new card and forget to write its answer, Java does not let you play with it. Every card must know its own trick.'
      ],
      definition: 'An enum can declare an **abstract method** (a method without a body) and give each constant its own body for it in curly braces after the constant: `PLUS { int apply(int a, int b) { return a + b; } }`.',
      explain: [
        'So far all constants of an enum shared the same methods; only their field values differed. Sometimes the **behaviour** differs: PLUS adds, MINUS subtracts. You could write one method with a `switch (this)` inside. Or you let each constant bring its own code.',
        'For that, you declare the method `abstract` in the enum: `abstract int apply(int a, int b);`. Abstract means “there is no body here; someone else must provide one”. Then every constant gets a **constant body**: a pair of curly braces right after the constant (and after its arguments, if it has any), with its own version of the method inside.',
        'The compiler now forces every constant to implement the method. A new constant without a body does not compile: `Operation is abstract; cannot be instantiated`. That is the same safety you got from an exhaustive `switch`, but the rule now sits right next to the constant it belongs to.',
        'A constant body does not have to be about an abstract method. It can also **override** a normal method of the enum for one or two constants, while all others keep the shared version.',
        'This is a Deeper lesson: most enums never need constant bodies. A field (like the cents of a coin) or a `switch` is often enough. Reach for constant bodies when the code per constant is different, not only the data.'
      ],
      why: 'The behaviour of each constant lives next to the constant, and the compiler checks that no constant forgets it.',
      whenUse: 'When each constant needs different code, like operations of a calculator, rules of a game piece or the next step of a process.',
      syntax: '`enum Name { A { ReturnType m() { … } }, B { ReturnType m() { … } }; abstract ReturnType m(); }`',
      fileName: 'Calculator.java',
      code: `enum Operation {
    PLUS("+") {
        @Override
        int apply(int a, int b) { return a + b; }
    },
    MINUS("-") {
        @Override
        int apply(int a, int b) { return a - b; }
    },
    TIMES("*") {
        @Override
        int apply(int a, int b) { return a * b; }
    },
    DIVIDE("/") {
        @Override
        int apply(int a, int b) { return a / b; }
    };

    private final String symbol;

    Operation(String symbol) {
        this.symbol = symbol;
    }

    String symbol() {
        return symbol;
    }

    abstract int apply(int a, int b);
}

public class Calculator {
    public static void main(String[] args) {
        int x = 12;
        int y = 4;
        for (Operation op : Operation.values()) {
            System.out.println(x + " " + op.symbol() + " " + y + " = " + op.apply(x, y));
        }
    }
}`,
      output: `12 + 4 = 16
12 - 4 = 8
12 * 4 = 48
12 / 4 = 3`,
      codeSummary: 'Four operations, each with its own `apply` body, a shared symbol field and one loop that uses them all.',
      codeExplanation: [
        { label: 'Line 2', code: 'PLUS("+") {', text: 'The constant passes `"+"` to the constructor, and the `{` opens its own body.' },
        { label: 'Line 4', code: 'int apply(int a, int b) { return a + b; }', text: 'PLUS’s version of `apply`. Only this constant adds.' },
        { label: 'Line 5', code: '},', text: 'The body ends with `}`, and the comma leads to the next constant.' },
        { label: 'Line 17', code: '};', text: 'After the last constant body comes `;`, which ends the list.' },
        { label: 'Line 19', code: 'private final String symbol;', text: 'Data that all constants have, set by the shared constructor.' },
        { label: 'Line 29', code: 'abstract int apply(int a, int b);', text: 'No body here. Every constant must bring its own, or the code does not compile.' },
        { label: 'Line 36', code: 'for (Operation op : Operation.values()) {', text: 'The loop does not know which operation it has; it calls `apply` and each constant does its own thing.' },
        { label: 'Line 37', code: 'System.out.println(x + " " + op.symbol() + " " + y + " = " + op.apply(x, y));', text: '`op.apply(x, y)` runs the body of the constant in `op`. `12 / 4` is integer division, so the result is 3.' }
      ],
      sections: [
        {
          title: 'The same idea with a switch',
          text: [
            'You can write the calculator with one method and a `switch (this)` inside. `this` is the constant the method is called on. It works, and the compiler checks that every constant has a case.',
            'The difference is where the code lives. With a switch, the rule for PLUS sits in a method far below the constant. With a constant body, it sits right at the constant. For two or three short rules the switch is often easier to read; for longer rules the constant body wins.'
          ],
          fileName: 'SwitchCalculator.java',
          code: `enum Operation {
    PLUS, MINUS, TIMES, DIVIDE;

    int apply(int a, int b) {
        return switch (this) {
            case PLUS -> a + b;
            case MINUS -> a - b;
            case TIMES -> a * b;
            case DIVIDE -> a / b;
        };
    }
}

public class SwitchCalculator {
    public static void main(String[] args) {
        System.out.println(Operation.PLUS.apply(7, 5));
        System.out.println(Operation.TIMES.apply(7, 5));
    }
}`,
          output: `12
35`
        },
        {
          title: 'Forgetting a body does not compile',
          text: [
            'Add a constant `MODULO("%")` to the first program without a body. Because `apply` is abstract and `MODULO` brings no version of it, javac refuses.'
          ],
          codeLanguage: 'text',
          fileName: 'javac output',
          code: `Calculator.java:18: error: Operation is abstract; cannot be instantiated
    MODULO("%");
          ^
1 error`,
          tip: 'The message sounds strange. It means: “to create MODULO, Java would need an `apply` body, and there is none.” Add `{ @Override int apply(int a, int b) { return a % b; } }` after `MODULO("%")`.'
        },
        {
          title: 'Overriding a normal method for one constant',
          text: [
            'The method does not have to be abstract. Here every level shares `message()`, and only `HIGH` changes it. Inside the constant body, `super.message()` calls the shared version, the same way as in a subclass.'
          ],
          fileName: 'Alarm.java',
          code: `enum Level {
    LOW,
    MEDIUM,
    HIGH {
        @Override
        String message() {
            return "ALERT! " + super.message();
        }
    };

    String message() {
        return "level " + name().toLowerCase();
    }
}

public class Alarm {
    public static void main(String[] args) {
        for (Level level : Level.values()) {
            System.out.println(level.message());
        }
    }
}`,
          output: `level low
level medium
ALERT! level high`
        },
        {
          title: 'Field, switch or constant body?',
          table: {
            head: ['What differs per constant', 'Best tool', 'Example'],
            rows: [
              ['only a value', 'a field set by the constructor', '`DIME(10)`'],
              ['a short rule, used in one place', 'a `switch` expression', '`label(status)`'],
              ['real code, part of what the constant is', 'an abstract method with constant bodies', '`PLUS { apply … }`'],
              ['one or two constants are special', 'override a normal method in their body', '`HIGH { message … }`']
            ],
            note: 'Start with a field or a switch. Move to constant bodies when the switch grows long or appears in many places.'
          }
        },
        {
          title: 'Each body is a small hidden class',
          text: [
            'A constant with a body is an object of a hidden **subclass** of the enum. The compiler names these subclasses `Operation$1`, `Operation$2` and so on. `getClass()` shows the hidden class, `getDeclaringClass()` always shows the enum itself.'
          ],
          fileName: 'HiddenClasses.java',
          code: `enum Operation {
    PLUS {
        @Override
        int apply(int a, int b) { return a + b; }
    },
    MINUS {
        @Override
        int apply(int a, int b) { return a - b; }
    };

    abstract int apply(int a, int b);
}

public class HiddenClasses {
    public static void main(String[] args) {
        System.out.println(Operation.PLUS.getClass());
        System.out.println(Operation.MINUS.getClass());
        System.out.println(Operation.PLUS.getDeclaringClass());
        System.out.println(Operation.PLUS.getClass().getSuperclass());
    }
}`,
          output: `class Operation$1
class Operation$2
class Operation
class Operation`,
          mermaid: `classDiagram
  class Operation {
    <<abstract>>
    +apply(int a, int b) int
  }
  class Operation1 {
    +apply(int a, int b) int
  }
  class Operation2 {
    +apply(int a, int b) int
  }
  Operation <|-- Operation1
  Operation <|-- Operation2`,
          diagramNote: '`Operation1` stands for `Operation$1` (the body of PLUS) and `Operation2` for `Operation$2` (MINUS). The enum becomes an abstract class, and each constant body is a subclass with exactly one object.'
        }
      ],
      technical: [
        'For every constant with a body, javac writes an extra class file: `Operation$1.class`, `Operation$2.class` and so on. Each one is an anonymous subclass of `Operation` (a subclass without a name in the source code). The constant field `PLUS` holds the single object of `Operation$1`.',
        'Because `Operation` now has subclasses, it is no longer a `final` class. It is `abstract` (it has an abstract method) and, since Java 17, implicitly **sealed**: only its own constant bodies may extend it. `Operation.class.isSealed()` returns `true`.',
        'A call `op.apply(x, y)` is a normal **virtual call**: the JVM looks at the real class of the object in `op` and runs that class’s `apply`. That is why `getClass()` shows `Operation$1`. Use `getDeclaringClass()` when you need the enum type itself, for example to build an `EnumMap`.',
        'An `enum` with constant bodies still has exactly one object per constant. The subclasses have private constructors and are created only once, in the static initializer of `Operation`.'
      ],
      tryIt: {
        steps: [
          'Copy `Calculator.java` and run it.',
          'Change the `;` after the DIVIDE body into `,` and add `MODULO("%");` as the last constant. Compile.',
          'Give `MODULO` a body: `MODULO("%") { @Override int apply(int a, int b) { return a % b; } };`.',
          'Run again.'
        ],
        see: 'First `Operation is abstract; cannot be instantiated`. With the body, a fifth line appears: `12 % 4 = 0`.'
      },
      check: [
        { q: 'Where does the body of a constant go?', a: 'In curly braces right after the constant and its arguments: `PLUS("+") { … },`.' },
        { q: 'What happens if a constant has no body for an abstract method?', a: 'It does not compile: `Operation is abstract; cannot be instantiated`.' },
        { q: 'Why does `Operation.PLUS.getClass()` print `class Operation$1`?', a: 'A constant with a body is the one object of a hidden subclass that javac generates. `getDeclaringClass()` gives the enum `Operation`.' }
      ],
      keyPoints: [
        'An abstract method in an enum forces every constant to provide a body.',
        'A constant body goes in `{ … }` right after the constant.',
        'A body can also override a normal method for one constant.',
        'Each constant body compiles to a hidden subclass like `Operation$1`.',
        'Use `getDeclaringClass()`, not `getClass()`, to get the enum type.'
      ],
      commonMistakes: [
        '`PLUS("+") { … } MINUS("-") { … };` without a comma between the bodies. Constants are always separated by commas: `PLUS("+") { … }, MINUS("-") { … };`.',
        'Forgetting the final `;` after the last body when fields follow. Add `;` after the last `}`.',
        'Comparing classes with `op.getClass() == Operation.class`. That is `false` for constants with bodies. Compare constants with `==` or use `getDeclaringClass()`.',
        'Using constant bodies for one-line differences in data. A field is simpler: `PLUS("+")` with a `symbol` field, not a body that returns `"+"`.'
      ],
      related: ['Interfaces', 'Classes & Objects']
    }
  ]);
})();
