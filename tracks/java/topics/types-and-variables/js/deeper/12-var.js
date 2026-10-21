// Lesson 12 (deeper): var, local variable type inference.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '12',
    id: 'var',
    title: 'var',
    category: 'deeper',
    icon: 'var',
    tagline: 'Let the compiler read the label for you',
    realWorld: 'A glass jar full of apples needs no sign that says "apples". Everyone can see what is inside. `var` is a box without a sign, because the value shows what it is.',
    kid: [
      'Normally you tell Java what kind of box you want: "a number box called score". With `var` you say: "a box called score, and you can see what goes in".',
      'Java looks at the first thing you put in. If it is 98, Java makes a number box. From then on it stays a number box forever.',
      'So `var` saves you some writing, but the box still has one fixed kind, like every other box.'
    ],
    definition: '`var` lets the compiler work out the type of a **local variable** from the value you initialize it with. This is called **type inference**. `var score = 98;` declares an `int`, exactly like `int score = 98;`. The type is fixed after that line.',
    explain: [
      '`var` exists since Java 10. You write `var` instead of the type, and the compiler looks at the right side of `=` to decide the type. `var name = "Ari";` is a `String`, `var price = 9.99;` is a `double`, `var big = 5L;` is a `long`.',
      '`var` is not a "any type" box, as in some other languages. Java is still statically typed: the compiler picks one type at the declaration and checks every later assignment against it. `var score = 98;` followed by `score = "high";` is a compile error.',
      'Because the compiler needs the value to find the type, `var` only works for local variables that are initialized on the same line. It does not work for fields, without an initializer, or with `null` alone.',
      '`var` is most useful when the type is long and already visible on the right side, like `var builder = new StringBuilder();` instead of `StringBuilder builder = new StringBuilder();`. `StringBuilder` is a class for building text piece by piece (see [Strings & Text](../strings/index.html)).',
      'When the right side does not show the type clearly, write the type. Code is read far more often than it is written, and the reader should not have to guess.'
    ],
    why: 'It removes repetition when the type is already obvious from the right side, so long declarations get shorter and easier to read.',
    whenUse: 'For local variables where the right side shows the type, usually `new SomeClass(...)` or a literal. Not when the reader would have to guess.',
    syntax: '`var name = initialValue;` inside a method only. The type comes from `initialValue` and never changes.',
    fileName: 'VarExample.java',
    code: `public class VarExample {
    public static void main(String[] args) {
        var name = "Ari";              // String
        var score = 98;                // int
        var average = 87.5;            // double
        var passed = score >= 70;      // boolean
        var stars = 5_000_000_000L;    // long, because of the L
        var initial = 'A';             // char

        score = score + 1;             // fine: still an int

        var builder = new StringBuilder();   // the type is on the right
        builder.append(name).append(" scored ").append(score);

        System.out.println(builder);
        System.out.println("passed: " + passed + ", average: " + average);
        System.out.println(stars + " " + initial);
    }
}`,
    output: `Ari scored 99
passed: true, average: 87.5
5000000000 A`,
    codeSummary: 'Six variables whose types come from their literals, one reassignment, and one `var` for an object made with `new`.',
    codeExplanation: [
      { label: 'Line 3', code: 'var name = "Ari";              // String', text: 'The right side is a String literal, so `name` is a `String`.' },
      { label: 'Line 4', code: 'var score = 98;                // int', text: 'A whole number literal is an `int`, so `score` is an `int`.' },
      { label: 'Line 5', code: 'var average = 87.5;            // double', text: 'A decimal literal is a `double`.' },
      { label: 'Line 6', code: 'var passed = score >= 70;      // boolean', text: '`>=` asks "is score at least 70?" and gives a `boolean` (see [Operators](../operators/index.html)).' },
      { label: 'Line 7', code: 'var stars = 5_000_000_000L;    // long, because of the L', text: 'The `L` suffix makes the literal a `long`, so the variable is a `long`.' },
      { label: 'Line 10', code: 'score = score + 1;             // fine: still an int', text: 'Reassigning with another `int` is fine. Reassigning with a String would not compile.' },
      { label: 'Line 12', code: 'var builder = new StringBuilder();   // the type is on the right', text: 'The best use of `var`: the type `StringBuilder` is already written once on the right side.' },
      { label: 'Line 13', code: 'builder.append(name).append(" scored ").append(score);', text: '`append` adds text to the end of the builder. Each call returns the builder, so you can chain them.' },
      { label: 'Line 15', code: 'System.out.println(builder);', text: 'Printing the builder prints the text it holds.' }
    ],
    sections: [
      {
        title: 'What the compiler writes for you',
        text: 'For every `var`, the compiler decides the type once. Behind the scenes, the program is exactly the same as with the written types.',
        table: {
          head: ['You write', 'The compiler reads it as'],
          rows: [
            ['`var name = "Ari";`', '`String name = "Ari";`'],
            ['`var score = 98;`', '`int score = 98;`'],
            ['`var total = 0L;`', '`long total = 0L;`'],
            ['`var price = 9.99;`', '`double price = 9.99;`'],
            ["`var initial = 'A';`", "`char initial = 'A';`"],
            ['`var builder = new StringBuilder();`', '`StringBuilder builder = new StringBuilder();`']
          ]
        }
      },
      {
        title: 'var does not mean "any type"',
        text: 'The type is decided at the declaration and checked on every later assignment, exactly like a written type.',
        mermaid: `flowchart LR
  A["var score = 98"] --> B["compiler: 98 is an int"]
  B --> C["score is an int, forever"]
  C --> D["score = 99 OK"]
  C --> E["score = 'high' compile error"]`,
        fileName: 'VarChange.java',
        code: `public class VarChange {
    public static void main(String[] args) {
        var score = 98;
        score = "high";
    }
}`,
        noRun: true,
        output: `VarChange.java:4: error: incompatible types: String cannot be converted to int
        score = "high";
                ^
1 error`
      },
      {
        title: 'Where var is not allowed',
        text: 'The compiler needs a value on the same line to find the type. Without it, `var` cannot work.',
        bullets: [
          'No initializer: `var count;` gives `cannot use \'var\' on variable without initializer`.',
          'Only `null`: `var thing = null;` gives `variable initializer is \'null\'`. `null` has no useful type.',
          'Fields: `static var count = 0;` in the class body does not compile. `var` is only for locals.',
          'Several at once: `var a = 1, b = 2;` does not compile. Write two lines.',
          'Method parameters and return types cannot be `var` either (see [Methods](../methods/index.html)).'
        ],
        fileName: 'VarNo.java',
        code: `public class VarNo {
    public static void main(String[] args) {
        var count;
    }
}`,
        noRun: true,
        output: `VarNo.java:3: error: cannot infer type for local variable count
        var count;
            ^
  (cannot use 'var' on variable without initializer)
1 error`
      },
      {
        title: 'When var helps, and when it hurts',
        text: 'Use `var` when it makes the line easier to read. Avoid it when the reader must guess the type, or when the literal gives the wrong type.',
        table: {
          head: ['Code', 'Good idea?', 'Why'],
          rows: [
            ['`var builder = new StringBuilder();`', 'yes', 'the type is visible on the right'],
            ['`var name = "Ari";`', 'fine', 'a String literal is clear'],
            ['`var result = calculate();`', 'no', 'what type is `result`? The reader must look elsewhere'],
            ['`var price = 10;` then `price = 9.99;`', 'no', '`10` made it an `int`, so `9.99` does not fit. Write `double price = 10;`'],
            ['`var total = 0;` for a sum that grows past 2 billion', 'no', '`0` makes an `int`. Write `long total = 0;` or `var total = 0L;`']
          ]
        },
        tip: 'When in doubt, write the type. `var` is a convenience, never a must.'
      }
    ],
    technical: [
      '`var` was added in Java 10 by JEP 286, "Local-Variable Type Inference". It is purely a compiler feature: the `.class` file stores the real type, so code with `var` and code with written types produce the same bytecode and run at the same speed.',
      'The compiler takes the type of the initializer expression exactly as it is. For `var x = 10;` that is `int`, never `long` or `Integer`. For `var list = new ArrayList<String>();` it is `ArrayList<String>`, the exact class, not a more general type.',
      '`var` is not a keyword but a **reserved type name**. That is why old code with a variable called `var` still compiles, while a class called `var` is not allowed anymore.'
    ],
    tryIt: {
      steps: [
        'Copy `VarExample.java` and run it.',
        'Add `average = 90;` after line 10 and run. Then add `passed = "yes";` and compile.',
        'Remove the bad line. Change line 4 to `var score;` and compile once more.'
      ],
      see: '`90` is accepted (an `int` widens to `double`), `passed = "yes"` gives `String cannot be converted to boolean`, and `var score;` gives `cannot infer type for local variable score`.'
    },
    check: [
      { q: 'What type does `var x = 3.0f;` have?', a: '`float`, because the literal has the `f` suffix.' },
      { q: 'Does `var city = "Bern"; city = 42;` compile?', a: 'No. `city` is a `String` from its first line, and `42` is not a String.' },
      { q: 'Why can you not write `var count;`?', a: 'The compiler needs the initial value to find the type. Without it, there is nothing to infer from.' }
    ],
    keyPoints: [
      '`var` lets the compiler pick the type from the initial value.',
      'The type is fixed after the declaration. Java stays statically typed.',
      'Only for local variables with an initializer.',
      'Use it when the type is obvious from the right side.',
      'The bytecode is the same as with a written type.'
    ],
    commonMistakes: [
      'Thinking `var` means "any type": `var x = 1; x = "one";`. Fix: a `var` keeps its first type.',
      '`var` without a value: `var total;`. Fix: `var total = 0;` or `int total;`.',
      'A literal that gives the wrong type: `var price = 10;` for a decimal price. Fix: `double price = 10;`.',
      '`var` for a field: `static var MAX = 3;`. Fix: fields need a written type, `static final int MAX = 3;`.'
    ],
    related: ['What a Variable Is', 'Literals', 'Type Conversion and Casting'],
    glossary: topic.glossary
  });
})();
