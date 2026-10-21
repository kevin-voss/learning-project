// Lesson 13 (deeper): wrapper classes, autoboxing, unboxing null, == vs equals on wrappers and Strings.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '13',
    id: 'wrappers-autoboxing',
    title: 'Wrapper Types and Autoboxing',
    category: 'deeper',
    icon: '[i]',
    tagline: 'An int in a gift box: Integer',
    realWorld: 'Some shelves in a shop only take boxes, never loose things. To put one sweet on that shelf, you put it in a little box first. `Integer` is the little box for an `int`.',
    kid: [
      'A number like 5 is small and plain. Some parts of Java, like lists, only accept things that come in a box.',
      'So Java has a box for every plain value: `Integer` for whole numbers, `Double` for decimals, `Boolean` for yes or no, and more.',
      'Java is kind: when you put a plain 5 into a list, it puts it into a box for you. When you take it out, it unpacks it for you. But an empty box has nothing to unpack, and then Java stops with an error.'
    ],
    definition: 'Every primitive type has a **wrapper class**: an object type that holds one value of that primitive. `int` has `Integer`, `double` has `Double`, and so on. **Autoboxing** turns a primitive into its wrapper automatically, **unboxing** turns it back.',
    explain: [
      'A wrapper object holds exactly one primitive value and never changes it (wrappers are immutable, like Strings). Because a wrapper is a reference type, a wrapper variable can also be `null`, which means "no value".',
      'Many parts of Java only work with objects. The most common one is a list: `List<Integer>` is a list of whole numbers that grows as you add to them. The type inside `< >` must be a reference type, so `List<int>` does not compile. You learn lists in [Collections](../collections/index.html).',
      '**Autoboxing**: when you give an `int` where an `Integer` is needed, the compiler wraps it for you, as in `scores.add(5);`. **Unboxing**: when you use an `Integer` where an `int` is needed, the compiler unpacks it, as in `int first = scores.get(0);`.',
      'Unboxing a `null` wrapper crashes with a NullPointerException, because there is no number to unpack. This is a common surprise: the line has no dot, but a method call is hidden inside.',
      'Wrappers are objects, so `==` compares arrows, not values. Two `Integer` objects with the value 128 can be two different objects, and then `==` is `false`. Compare wrapper values with `equals`, or unbox them first. The same rule holds for `String`.',
      'The wrapper classes also carry useful helpers: `Integer.parseInt("123")`, `Integer.MAX_VALUE`, `Double.parseDouble("2.5")`, `Character.isDigit(\'7\')`, `Integer.toBinaryString(10)`.'
    ],
    why: 'Lists, maps and other generic classes only hold objects. Wrappers let primitive values go there, and let a number field say "no value yet" with `null`.',
    whenUse: 'Inside `< >` like `List<Integer>`, when a value may be missing (`null`), and for the helper methods. Everywhere else, prefer the primitive.',
    syntax: '`Integer boxed = 5;` (autoboxing) · `int plain = boxed;` (unboxing) · compare values: `a.equals(b)` · helpers: `Integer.parseInt("42")`, `Integer.MAX_VALUE`',
    fileName: 'Boxing.java',
    code: `import java.util.ArrayList;
import java.util.List;

public class Boxing {
    public static void main(String[] args) {
        // A list can only hold objects, so it holds Integer, not int
        List<Integer> scores = new ArrayList<>();
        scores.add(5);                  // autoboxing: int 5 -> Integer
        scores.add(7);

        int first = scores.get(0);      // unboxing: Integer -> int
        int sum = scores.get(0) + scores.get(1);
        System.out.println(first + " " + sum);

        // A wrapper can be null: "no value yet"
        Integer bestScore = null;
        System.out.println(bestScore);
        bestScore = 98;                 // autoboxing again
        System.out.println(bestScore);

        // Useful helpers on the wrapper classes
        int parsed = Integer.parseInt("123");
        System.out.println(parsed + 1);
        System.out.println(Integer.MAX_VALUE);
        System.out.println(Character.isDigit('7'));
        System.out.println(Integer.toBinaryString(10));
    }
}`,
    output: `5 12
null
98
124
2147483647
true
1010`,
    codeSummary: 'Numbers go into a list as `Integer` objects and come out as `int` values, a wrapper holds `null`, and four helper methods are used.',
    codeExplanation: [
      { label: 'Line 1', code: 'import java.util.ArrayList;', text: '`ArrayList` and `List` live in the package `java.util`, so they are imported (see [Syntax Fundamentals](../syntax-fundamentals/index.html)).' },
      { label: 'Line 7', code: 'List<Integer> scores = new ArrayList<>();', text: 'A growing list of `Integer` objects. `List<int>` would not compile.' },
      { label: 'Line 8', code: 'scores.add(5);                  // autoboxing: int 5 -> Integer', text: '`5` is an `int`, but the list wants an `Integer`. The compiler wraps it: autoboxing.' },
      { label: 'Line 11', code: 'int first = scores.get(0);      // unboxing: Integer -> int', text: '`get(0)` gives the first element, an `Integer`. Storing it in an `int` unpacks it: unboxing.' },
      { label: 'Line 12', code: 'int sum = scores.get(0) + scores.get(1);', text: '`+` needs numbers, so both Integers are unboxed before adding: `5 + 7 = 12`.' },
      { label: 'Line 16', code: 'Integer bestScore = null;', text: 'A wrapper is a reference type, so it can be `null`. An `int` could not.' },
      { label: 'Line 18', code: 'bestScore = 98;                 // autoboxing again', text: 'The `int` 98 is boxed into an `Integer` object.' },
      { label: 'Line 22', code: 'int parsed = Integer.parseInt("123");', text: 'A helper method on the wrapper class turns text into an `int`.' },
      { label: 'Line 25', code: "System.out.println(Character.isDigit('7'));", text: '`Character` (the wrapper of `char`) can tell you if a character is a digit.' },
      { label: 'Line 26', code: 'System.out.println(Integer.toBinaryString(10));', text: 'Shows the bits of 10: `1010` (8 + 2).' }
    ],
    sections: [
      {
        title: 'Eight primitives, eight wrappers',
        text: 'Six wrapper names are the primitive name with a capital letter. Two are spelled out in full: `Integer` and `Character`.',
        table: {
          head: ['Primitive', 'Wrapper class', 'Example'],
          rows: [
            ['`byte`', '`Byte`', '`Byte b = 12;`'],
            ['`short`', '`Short`', '`Short s = 120;`'],
            ['`int`', '`Integer`', '`Integer i = 42;`'],
            ['`long`', '`Long`', '`Long l = 42L;`'],
            ['`float`', '`Float`', '`Float f = 1.5f;`'],
            ['`double`', '`Double`', '`Double d = 1.5;`'],
            ['`char`', '`Character`', "`Character c = 'A';`"],
            ['`boolean`', '`Boolean`', '`Boolean ok = true;`']
          ],
          note: 'Careful: `Long l = 42;` does not compile. `42` is an `int`, and autoboxing only wraps an `int` into an `Integer`. Write `42L`.'
        }
      },
      {
        title: 'Boxing and unboxing in memory',
        text: 'An `int` sits directly in the frame. An `Integer` is an object on the heap, and the variable holds an arrow to it. Autoboxing builds (or reuses) such an object, unboxing reads the number out of it.',
        mermaid: `flowchart LR
  P["int 5, in the frame"] -->|"autoboxing: Integer.valueOf(5)"| O["Integer object 5, on the heap"]
  O -->|"unboxing: intValue()"| Q["int 5, in the frame"]`,
        diagramNote: 'The compiler writes these two method calls for you. You see them in error messages, as in the next step.'
      },
      {
        title: 'Unboxing null crashes',
        text: [
          'Line 5 below has no dot, so it looks safe. But unboxing means the compiler calls `stock.intValue()` there. `stock` is `null`, so the call fails.',
          'The error message gives it away: `Cannot invoke "java.lang.Integer.intValue()"`.'
        ],
        fileName: 'UnboxNull.java',
        code: `public class UnboxNull {
    public static void main(String[] args) {
        Integer stock = null;          // no number known yet
        System.out.println("stock: " + stock);
        int count = stock;             // unboxing calls stock.intValue()
        System.out.println(count);
    }
}`,
        output: `stock: null
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "java.lang.Integer.intValue()" because "<local1>" is null
\tat UnboxNull.main(UnboxNull.java:5)`,
        tip: 'Before you unbox a wrapper that may be `null`, check it: `if (stock != null)`. Or use a primitive with a clear start value, like `int stock = 0;`.'
      },
      {
        title: '== or equals?',
        text: [
          'For wrappers, `==` asks "same object?". Java keeps ready-made `Integer` objects for the values -128 to 127 and reuses them, so for small numbers `==` happens to be `true`. For 128 autoboxing makes a new object each time, and `==` is `false`. A bug that only shows up with bigger numbers.',
          'The safe rules: compare primitives with `==`, compare wrappers and Strings with `equals`.'
        ],
        fileName: 'WrapperEquals.java',
        code: `public class WrapperEquals {
    public static void main(String[] args) {
        Integer smallA = 127;
        Integer smallB = 127;
        Integer bigA = 128;
        Integer bigB = 128;

        System.out.println(smallA == smallB);                    // same cached object
        System.out.println(bigA == bigB);                        // two objects
        System.out.println(bigA.equals(bigB));                   // same value
        System.out.println(bigA.intValue() == bigB.intValue());  // compare ints
    }
}`,
        output: `true
false
true
true`,
        table: {
          head: ['Comparing', 'Use', 'Example'],
          rows: [
            ['two primitives', '`==`', '`count == 10`'],
            ['two wrappers', '`equals`', '`bigA.equals(bigB)`'],
            ['two Strings', '`equals`', '`answer.equals("yes")`'],
            ['a wrapper and a primitive', '`==` works (the wrapper is unboxed), but crashes if the wrapper is `null`', '`bigA == 128`']
          ]
        }
      },
      {
        title: 'Prefer primitives',
        text: [
          'Every boxed value is an object: it costs memory on the heap and time to make. In a loop that runs millions of times, a `Long sum` instead of `long sum` makes millions of objects for nothing.',
          'Use wrappers where you need an object (`List<Integer>`) or a possible `null`. Use primitives for counters, sums, flags and maths.'
        ],
        bullets: [
          'Wrong: `Long total = 0L;` in a long loop. Right: `long total = 0;`.',
          'Wrong: `Boolean done = false;` for a simple flag. Right: `boolean done = false;`.',
          'Right: `List<Integer> scores` — a list needs objects.',
          'Right: `Integer bestScore = null;` — when "no score yet" is a real answer.'
        ]
      }
    ],
    technical: [
      'Autoboxing is a compiler trick. `Integer x = 5;` compiles to `Integer x = Integer.valueOf(5);`, and `int y = x;` compiles to `int y = x.intValue();`. That is why the NPE message names `intValue()`.',
      '`Integer.valueOf` returns cached objects for -128 to 127; the Java Language Specification requires this cache. `Short`, `Byte`, `Long` and `Character` have similar caches, `Boolean` has only the two objects `TRUE` and `FALSE`. The upper limit of the `Integer` cache can be raised with a JVM option, which is one more reason never to rely on `==` for wrappers.',
      'Why can a `List` not hold `int`? Java generics work only with reference types: inside, the list stores everything as `Object` references. A long-running OpenJDK project (Valhalla) works on letting value types and primitives work with generics directly in the future.'
    ],
    tryIt: {
      steps: [
        'Copy `WrapperEquals.java` and run it.',
        'Change `128` to `1000` in both lines and run again.',
        'Change `127` to `-128` in both lines and run once more.'
      ],
      see: 'with `1000` still `false` for `==` (two objects) and `true` for `equals`, and with `-128` the first line stays `true`, because -128 is inside the cache.'
    },
    check: [
      { q: 'What is the wrapper class of `char`, and of `int`?', a: '`Character` and `Integer`. The other six are the primitive name with a capital letter.' },
      { q: 'Why does `Integer n = null; int m = n;` crash, although the line has no dot?', a: 'Unboxing hides a method call: the compiler writes `n.intValue()`. Calling a method on `null` throws a NullPointerException.' },
      { q: '`Integer a = 500, b = 500;` What do `a == b` and `a.equals(b)` give?', a: '`a == b` is `false` (two different objects), `a.equals(b)` is `true` (same value).' }
    ],
    keyPoints: [
      'Each primitive has a wrapper class: `Integer`, `Double`, `Character` ...',
      'Autoboxing wraps, unboxing unpacks. The compiler does both for you.',
      'Lists and other generics need wrappers: `List<Integer>`.',
      'Unboxing `null` throws a NullPointerException.',
      'Compare wrappers with `equals`, never with `==`.',
      'Prefer primitives when you do not need an object.'
    ],
    commonMistakes: [
      'Writing `List<int>`. Fix: `List<Integer>`.',
      'Unboxing a wrapper that may be `null`: `int best = bestScore;`. Fix: check `bestScore != null` first.',
      'Comparing wrappers with `==`: `if (a == b)` for two `Integer` objects. Fix: `a.equals(b)`.',
      '`Long big = 5;`. Fix: `Long big = 5L;` (an `int` only boxes into an `Integer`).',
      'Using `Integer` or `Double` for plain counters and sums. Fix: use `int` or `double`.'
    ],
    related: ['The Eight Primitive Types', 'null', 'Primitives vs Reference Types', 'Collections'],
    glossary: topic.glossary
  });
})();
