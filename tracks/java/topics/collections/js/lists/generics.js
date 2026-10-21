// Lesson: generics and wrapper types.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'generics-light',
      title: 'Generics: the <Type>',
      category: 'concept',
      icon: '<T>',
      tagline: 'A list of what?',
      realWorld: 'A box labelled "only socks". If you try to put a shoe in, someone stops you at the door, not later when you get dressed.',
      kid: [
        'You have a toy box with a sign: "only cars". Your little brother wants to throw in a banana. The sign says no, so the banana never gets in.',
        'Later you reach into the box without looking. You know for sure: whatever you grab is a car. You never pull out a sticky banana by surprise.',
        'Java collections have that sign too. You write it in angle brackets: `List<String>` means "a list, only Strings inside". Java reads the sign before your program even runs.'
      ],
      definition: '**Generics** let you write the element type in angle brackets: `List<String>` is a list that holds only Strings. The compiler checks every `add` against this type and gives you the right type back from every `get`.',
      explain: [
        'The word in the brackets is a **type argument**. Read `List<String>` aloud as "List of String", and `Map<String, Integer>` as "Map from String to Integer".',
        'The check happens at **compile time**, when `javac` turns your code into bytecode. If you try `names.add(42)` on a `List<String>`, the program does not compile. A mistake found by javac is much cheaper than a crash at a customer.',
        'Because the compiler knows the type, `get` gives you a `String` directly. You can call `first.length()` without any extra step.',
        'On the right side you write the **diamond** `<>`: `new ArrayList<>()`. Java copies the type from the left side, so you do not have to write `String` twice.',
        'Generics only accept **reference types** (classes such as `String`), never **primitive types** (`int`, `double`, `boolean`, `char` …). For each primitive there is a **wrapper class**: `Integer` for `int`, `Double` for `double` and so on. Java converts between the two automatically. Putting an `int` into its wrapper is called **autoboxing**, taking it out again is **unboxing**.'
      ],
      why: 'Without the type, any object could sneak into a list, and you would find out only when the program crashes. With the type, javac stops the mistake before the program runs.',
      whenUse: 'Every time you create a collection. Always write the type in the brackets.',
      syntax: 'Interface<ElementType> name = new Class<>();   e.g. List<Integer> ages = new ArrayList<>();   Map<KeyType, ValueType> map = new HashMap<>();',
      fileName: 'GenericsDemo.java',
      code: `import java.util.ArrayList;
import java.util.List;

public class GenericsDemo {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ava");
        names.add("Ben");
        // names.add(42);   does not compile: 42 is not a String

        String first = names.get(0);   // no cast needed
        System.out.println("First: " + first);
        System.out.println("Length of first: " + first.length());

        List<Integer> ages = new ArrayList<>();
        ages.add(9);          // the int 9 is boxed into an Integer
        ages.add(12);
        int sum = ages.get(0) + ages.get(1);   // unboxed back to int
        System.out.println("Sum of ages: " + sum);
    }
}`,
      output: `First: Ava
Length of first: 3
Sum of ages: 21`,
      codeSummary: 'A list of Strings and a list of Integers. The compiler knows what is inside each one.',
      codeExplanation: [
        { label: 'Line 2', code: 'import java.util.List;', text: '`List` is the interface (the job title). You use it as the variable type.' },
        { label: 'Line 6', code: 'List<String> names = new ArrayList<>();', text: 'Left: a variable of type "List of String". Right: a new ArrayList. The diamond `<>` takes `String` from the left.' },
        { label: 'Line 9', code: '// names.add(42);   does not compile: 42 is not a String', text: 'If you remove the `//`, javac stops with `incompatible types: int cannot be converted to String`.' },
        { label: 'Line 11', code: 'String first = names.get(0);   // no cast needed', text: '`get(0)` returns the element at position 0. Because the list is a `List<String>`, the result already has type `String`.' },
        { label: 'Line 13', code: 'System.out.println("Length of first: " + first.length());', text: 'You can call String methods on the result directly, because Java knows it is a String.' },
        { label: 'Line 15', code: 'List<Integer> ages = new ArrayList<>();', text: 'A list of whole numbers uses `Integer`, the wrapper class of `int`. `List<int>` does not compile.' },
        { label: 'Line 16', code: 'ages.add(9);          // the int 9 is boxed into an Integer', text: '**Autoboxing**: Java wraps the `int` 9 into an `Integer` object for you.' },
        { label: 'Line 18', code: 'int sum = ages.get(0) + ages.get(1);   // unboxed back to int', text: '**Unboxing**: `+` needs numbers, so Java takes the `int` values out of both `Integer` boxes and adds them.' }
      ],
      sections: [
        {
          title: 'Reading the angle brackets',
          text: ['Every collection type tells you in the brackets what it holds. A Map needs two types: one for the keys and one for the values.'],
          table: {
            head: ['You write', 'Say it aloud', 'Holds'],
            rows: [
              ['`List<String>`', 'List of String', 'texts like `"Ada"`'],
              ['`List<Integer>`', 'List of Integer', 'whole numbers like `7`'],
              ['`Set<Character>`', 'Set of Character', 'single letters like `\'a\'`'],
              ['`Map<String, Integer>`', 'Map from String to Integer', 'pairs like `"Ada" -> 92`'],
              ['`List<Pupil>`', 'List of Pupil', 'objects of your own class `Pupil`']
            ],
            note: 'Your own classes from [Classes & Objects](../classes-and-objects/index.html) work too. They are reference types already.'
          }
        },
        {
          title: 'What javac says when the type is wrong',
          text: [
            'This program tries to add a number to a list of Strings. It is meant **not** to compile, so the page does not run it. Below it you see the real message from `javac`.',
            'The message names the file, the line (`:8`) and the reason. The `^` points at the wrong value.'
          ],
          fileName: 'WrongType.java',
          noRun: true,
          code: `import java.util.ArrayList;
import java.util.List;

public class WrongType {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("Ava");
        names.add(42);
        System.out.println(names);
    }
}`,
          output: `WrongType.java:8: error: incompatible types: int cannot be converted to String
        names.add(42);
                  ^
1 error`
        },
        {
          title: 'Primitives need wrappers',
          text: [
            'A collection stores **references**, arrows to objects. An `int` is a plain value, not an object, so there is nothing to point at. That is why `List<int>` does not compile.',
            'Each primitive has a wrapper class that puts the value into a small object. You only write the wrapper name inside the brackets. Everywhere else you keep using `int`, and Java boxes and unboxes for you.'
          ],
          table: {
            head: ['Primitive', 'Wrapper class', 'Example list'],
            rows: [
              ['`int`', '`Integer`', '`List<Integer>`'],
              ['`double`', '`Double`', '`List<Double>`'],
              ['`boolean`', '`Boolean`', '`List<Boolean>`'],
              ['`char`', '`Character`', '`List<Character>`'],
              ['`long`', '`Long`', '`List<Long>`']
            ],
            note: 'Two names are different from the primitive: `Integer` (not "Int") and `Character` (not "Char").'
          },
          mermaid: `flowchart LR
  A["int 9 (plain value)"] -->|"autoboxing on add"| B["Integer object holding 9"]
  B --> C["stored in the list"]
  C -->|"unboxing on get + math"| D["int 9 again"]`,
          diagramNote: 'Java wraps the value when it goes in and unwraps it when you use it as a number.'
        },
        {
          title: 'Two traps with boxes',
          text: [
            'Boxes are objects, so `==` compares **which box**, not the number inside. For small numbers (-128 to 127) Java reuses the same box, so `==` seems to work. For bigger numbers it makes new boxes and `==` says `false`.',
            'Compare wrapper values with `.equals(...)`, or unbox them into `int` first. The same rule you know from Strings applies here.'
          ],
          fileName: 'BoxTraps.java',
          code: `public class BoxTraps {
    public static void main(String[] args) {
        Integer small1 = 100;
        Integer small2 = 100;
        Integer big1 = 1000;
        Integer big2 = 1000;

        System.out.println(small1 == small2);      // true: Java reuses small boxes
        System.out.println(big1 == big2);          // false: two different boxes
        System.out.println(big1.equals(big2));     // true: same value inside

        int a = big1;                              // unboxed
        int b = big2;
        System.out.println(a == b);                // true: plain ints compare values
    }
}`,
          output: `true
false
true
true`,
          warn: 'A box can also be `null` (empty). Unboxing `null` into an `int` crashes with a `NullPointerException`. You see this with Maps, when `get` finds no value.'
        },
        {
          title: 'Wrong vs right: a list without a type',
          text: [
            'Old Java code sometimes writes `List things = new ArrayList();` with no brackets. This is a **raw type**. javac only prints a note, and anything can go in.',
            'This program compiles, but it crashes when it runs: element 1 is an `Integer`, and the cast `(String)` forces Java to treat it as a String. The crash message is real.'
          ],
          fileName: 'RawList.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class RawList {
    public static void main(String[] args) {
        List things = new ArrayList();      // wrong: no type
        things.add("Ava");
        things.add(42);
        String first = (String) things.get(1);
        System.out.println(first);
    }
}`,
          output: `Exception in thread "main" java.lang.ClassCastException: class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
	at RawList.main(RawList.java:9)`,
          tip: 'Right: `List<String> things = new ArrayList<>();`. Then `things.add(42)` is a compile error, and `get` needs no cast.'
        }
      ],
      technical: [
        'Generics exist only for the compiler. After checking your code, javac removes the type arguments; this is called **type erasure**. At run time an `ArrayList<String>` and an `ArrayList<Integer>` are the same class, and both hold plain `Object` references inside.',
        'Where you call `get`, javac quietly inserts the cast for you: `String first = (String) names.get(0);`. Because the compiler has already checked every `add`, this hidden cast can never fail.',
        'Autoboxing is also compiler work. `ages.add(9)` becomes `ages.add(Integer.valueOf(9))`, and `ages.get(0) + 1` becomes `ages.get(0).intValue() + 1`. `Integer.valueOf` keeps a cache of the boxes from -128 to 127, which is why `==` happens to work for small numbers.',
        'Each box is a full object on the heap, with a header of about 12 to 16 bytes plus the 4 bytes of the `int`. For millions of numbers an `int[]` array uses much less memory than a `List<Integer>`.'
      ],
      tryIt: {
        steps: [
          'Copy `GenericsDemo.java`, compile and run it.',
          'Remove the `//` in front of `names.add(42);` and compile again.',
          'Put the `//` back. Change `List<Integer>` to `List<int>` and compile.',
          'Change it back and add `ages.add(30);` and print `ages`.'
        ],
        see: '`incompatible types: int cannot be converted to String` in step 2, `unexpected type ... required: reference found: int` in step 3, and `[9, 12, 30]` in step 4.'
      },
      check: [
        { q: 'What does the diamond `<>` in `new ArrayList<>()` do?', a: 'It lets Java take the type argument from the left side, so you write `String` only once.' },
        { q: 'Which type do you write for a list of `double` values?', a: '`List<Double>`, with the wrapper class `Double`.' },
        { q: 'When does Java check the type in `List<String>`?', a: 'At compile time, when javac runs. A wrong `add` never reaches the running program.' }
      ],
      keyPoints: [
        '`List<String>` reads "List of String". The brackets say what goes in.',
        'javac checks every `add` and gives you the right type from every `get`.',
        'Write `new ArrayList<>()` with the diamond on the right.',
        'Use wrapper classes in the brackets: `Integer`, `Double`, `Boolean`, `Character`.',
        'Compare wrapper objects with `equals`, not `==`.'
      ],
      commonMistakes: [
        '`List<int> nums` does not compile. Write `List<Integer> nums`.',
        '`List names = new ArrayList();` without a type lets anything in. Always write `List<String>` and the diamond.',
        '`if (big1 == big2)` with two `Integer` objects compares the boxes. Use `big1.equals(big2)`.',
        '`List<Char>` or `List<Int>`: those classes do not exist. The names are `Character` and `Integer`.'
      ],
      related: ['Types & Variables', 'why-collections', 'lists']
    }
  ]);
})();
