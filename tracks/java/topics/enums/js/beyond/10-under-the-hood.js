// Enums, lesson 10: what the compiler really generates for an enum.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-under-the-hood',
      title: 'What the Compiler Really Generates',
      category: 'deeper',
      icon: '⚙',
      tagline: 'A final class with a few static objects',
      realWorld: 'A school class photo. The photo is taken once, at the start of the year, and shows exactly the children in the class. Nobody can be added to that photo later. Every copy you print shows the same children.',
      kid: [
        'When you write an enum, Java does some work for you in secret.',
        'It builds a normal class. Then, the very first time you use the enum, it makes one object for every card on your list, and it puts each one on its own shelf with the card’s name.',
        'After that, the door is locked. Nobody can make new cards. Everybody who asks for RED gets the same RED from the same shelf.'
      ],
      definition: 'javac turns `enum Light { RED, YELLOW, GREEN }` into a `final class Light extends java.lang.Enum<Light>` with one `public static final Light` field per constant, a private constructor and the generated methods `values()` and `valueOf(String)`.',
      explain: [
        'The JVM (the Java Virtual Machine that runs your program) does not know a special “enum” thing. It only knows classes. So javac translates every enum into a class with a few fixed parts. You can see them with the tool `javap`, which prints what is inside a `.class` file.',
        'The class is `final` (nobody can extend it, unless constants have bodies, see the Deeper lesson on methods per constant) and extends `java.lang.Enum`. From `Enum` it inherits the fields `name` and `ordinal` and the methods `name()`, `ordinal()`, `compareTo`, `equals`, `hashCode` and `toString`.',
        'Each constant becomes a field `public static final Light RED`. **static** means the field belongs to the class, not to an object. **final** means it is set once and never changes. A hidden array `$VALUES` holds all constants in order; `values()` returns a copy of it.',
        'The objects are made in the **static initializer**, a block named `static {}` that the JVM runs once, the first time the class is used (this is called **class initialization**). It calls the private constructor once per constant, with the name and the ordinal as hidden first arguments: `new Light("RED", 0)`.',
        'Because the constructor is private and the class is final, no code outside can make another `Light`. That is the whole trick behind “one object per constant” and behind comparing with `==`.'
      ],
      why: 'Knowing the generated class explains every rule of enums: why `==` works, why `new` is forbidden, why `values()` returns a copy, and where `name` and `ordinal` come from.',
      whenUse: 'When an enum behaves in a way that surprises you, or when you read `javap` output or a stack trace with names like `$VALUES` or `Operation$1`.',
      syntax: '`javac Light.java` then `javap -p Light.class` shows the generated members.',
      fileName: 'Inside.java',
      code: `import java.lang.reflect.Modifier;

enum Light {
    RED, YELLOW, GREEN;

    Light() {
        System.out.println("  creating " + name() + " (ordinal " + ordinal() + ")");
    }
}

public class Inside {
    public static void main(String[] args) {
        System.out.println("main starts");
        Light first = Light.RED;      // first use: the class is initialized now
        System.out.println("first use done: " + first);

        Light again = Light.RED;      // no new object this time
        System.out.println("same object? " + (first == again));

        Class<Light> type = Light.class;
        System.out.println("superclass: " + type.getSuperclass().getName());
        System.out.println("final class? " + Modifier.isFinal(type.getModifiers()));
        System.out.println("values() gives a new copy? " + (Light.values() != Light.values()));
    }
}`,
      output: `main starts
  creating RED (ordinal 0)
  creating YELLOW (ordinal 1)
  creating GREEN (ordinal 2)
first use done: RED
same object? true
superclass: java.lang.Enum
final class? true
values() gives a new copy? true`,
      codeSummary: 'The constructor prints a line, so you can watch when Java creates the constants. Then the program asks the class about itself.',
      codeExplanation: [
        { label: 'Line 6', code: 'Light() {', text: 'The enum constructor. It runs once for each constant, never again.' },
        { label: 'Line 7', code: 'System.out.println("  creating " + name() + " (ordinal " + ordinal() + ")");', text: '`name()` and `ordinal()` already work here, because `Enum`’s constructor set them first.' },
        { label: 'Line 13', code: 'System.out.println("main starts");', text: 'Printed before any constant exists. The enum is not set up yet.' },
        { label: 'Line 14', code: 'Light first = Light.RED;      // first use: the class is initialized now', text: 'The first use of `Light` triggers class initialization. All three constants are created now, in order.' },
        { label: 'Line 17', code: 'Light again = Light.RED;      // no new object this time', text: 'The class is already initialized, so nothing is printed. `again` points at the same object.' },
        { label: 'Line 20', code: 'Class<Light> type = Light.class;', text: '`Light.class` is an object that describes the class `Light`. You can ask it questions at run time (this is called **reflection**).' },
        { label: 'Line 21', code: 'System.out.println("superclass: " + type.getSuperclass().getName());', text: 'Shows that every enum extends `java.lang.Enum`.' },
        { label: 'Line 22', code: 'System.out.println("final class? " + Modifier.isFinal(type.getModifiers()));', text: 'The generated class is `final`. No subclass can add more constants.' },
        { label: 'Line 23', code: 'System.out.println("values() gives a new copy? " + (Light.values() != Light.values()));', text: 'Two calls give two different arrays: each call clones the hidden `$VALUES` array.' }
      ],
      sections: [
        {
          title: 'Look inside with javap',
          text: [
            'Compile the plain enum `enum Light { RED, YELLOW, GREEN }` and run `javap -p Light.class`. `-p` also shows private members. This is the real output of JDK 21 and later.'
          ],
          codeLanguage: 'text',
          fileName: 'terminal',
          code: `$ javac Light.java
$ javap -p Light.class
Compiled from "Light.java"
final class Light extends java.lang.Enum<Light> {
  public static final Light RED;
  public static final Light YELLOW;
  public static final Light GREEN;
  private static final Light[] $VALUES;
  public static Light[] values();
  public static Light valueOf(java.lang.String);
  private Light();
  private static Light[] $values();
  static {};
}`,
          bullets: [
            '`final class Light extends java.lang.Enum<Light>`: a normal class with a fixed superclass.',
            '`public static final Light RED;`: one field per constant.',
            '`private static final Light[] $VALUES;`: the hidden array behind `values()`.',
            '`private Light();`: the constructor. javap hides its two compiler-added parameters, the name and the ordinal.',
            '`static {};`: the static initializer that creates the objects.'
          ]
        },
        {
          title: 'The static initializer, step by step',
          text: [
            'The `static {}` block runs once. Translated back from bytecode into Java, it does this:'
          ],
          codeLanguage: 'text',
          fileName: 'what static {} does',
          code: `RED    = new Light("RED", 0);
YELLOW = new Light("YELLOW", 1);
GREEN  = new Light("GREEN", 2);
$VALUES = $values();          // the array { RED, YELLOW, GREEN }`,
          mermaid: `sequenceDiagram
  participant M as main
  participant JVM
  participant L as class Light
  M->>JVM: first use of Light.RED
  JVM->>L: load the class, run the static initializer
  L->>L: new Light("RED", 0)
  L->>L: new Light("YELLOW", 1)
  L->>L: new Light("GREEN", 2)
  L->>L: fill $VALUES
  JVM-->>M: Light.RED
  M->>L: second use of Light.RED
  L-->>M: same object, nothing new`,
          diagramNote: 'Class initialization happens once per program run. Every later use reads the existing field.'
        },
        {
          title: 'The same idea, written by hand',
          text: [
            'You may not extend `java.lang.Enum` yourself (javac says `classes cannot directly extend java.lang.Enum`). But you can write a normal class that copies the idea. This is close to what javac generates, and it shows that an enum is no magic: a final class, a private constructor and a few static final objects.'
          ],
          fileName: 'HandMadeEnum.java',
          code: `final class Light {
    public static final Light RED = new Light("RED", 0);
    public static final Light YELLOW = new Light("YELLOW", 1);
    public static final Light GREEN = new Light("GREEN", 2);
    private static final Light[] VALUES = { RED, YELLOW, GREEN };

    private final String name;
    private final int ordinal;

    private Light(String name, int ordinal) {   // nobody outside can call new
        this.name = name;
        this.ordinal = ordinal;
    }

    public String name() { return name; }
    public int ordinal() { return ordinal; }
    public String toString() { return name; }

    public static Light[] values() {
        return VALUES.clone();
    }

    public static Light valueOf(String name) {
        for (Light light : VALUES) {
            if (light.name.equals(name)) {
                return light;
            }
        }
        throw new IllegalArgumentException("No enum constant Light." + name);
    }
}

public class HandMadeEnum {
    public static void main(String[] args) {
        for (Light light : Light.values()) {
            System.out.println(light.ordinal() + " " + light);
        }
        System.out.println(Light.valueOf("GREEN") == Light.GREEN);
    }
}`,
          output: `0 RED
1 YELLOW
2 GREEN
true`,
          warn: 'This hand-made class lacks what the real enum gets for free: `switch` support with the exhaustiveness check, `EnumMap` and `EnumSet`, safe serialization and protection against reflection. In real code, always write `enum`.'
        },
        {
          title: 'Enum rules, explained by the generated class',
          table: {
            head: ['Rule you met', 'Reason in the generated class'],
            rows: [
              ['`==` is safe', 'one `static final` object per constant, no others can exist'],
              ['`new Light()` is not allowed', 'the constructor is private, and javac forbids `new` on enums'],
              ['an enum cannot `extends` a class', 'it already extends `java.lang.Enum`'],
              ['`values()` returns a new array', 'it returns `$VALUES.clone()`'],
              ['constants print their name', '`Enum.toString()` returns the `name` field'],
              ['constant bodies make `Light$1` files', 'each body is an anonymous subclass; the enum is then sealed, not final']
            ]
          }
        }
      ],
      technical: [
        'Class initialization in the JVM is **lazy** and **thread-safe**: the `static {}` block runs the first time the class is really used (reading a constant, calling `values()`), and the JVM makes sure it runs exactly once, even if several threads touch the enum at the same moment. This is why an enum with a single constant is a popular way to build a **singleton**, a class with only one object (see [Design Patterns](../design-patterns/index.html) later).',
        'The class file marks the class with the flag `ACC_ENUM`, and each constant field too. Tools and the reflection method `Class.isEnum()` use these flags. `java.lang.reflect.Constructor.newInstance` refuses enum classes with `Cannot reflectively create enum objects`, and Java’s serialization writes only the constant’s name and reads it back with `valueOf`, so even saving and loading cannot create a second `RED`.',
        'A `switch` over an enum uses a hidden lookup array `$SwitchMap$Light` in a helper class like `Inside$1`, filled from `ordinal()` at run time. And every enum constant costs about the same memory as any small object: a header plus the `name` reference and the `ordinal` int, plus your own fields.'
      ],
      tryIt: {
        steps: [
          'Save `enum Light { RED, YELLOW, GREEN }` as `Light.java` and run `javac Light.java`.',
          'Run `javap -p Light.class` and compare it with the output above.',
          'Run `javap -c -p Light.class` and find the block `static {};`.',
          'Copy `Inside.java`, run it, and move the line `System.out.println("main starts");` below `Light first = Light.RED;`.'
        ],
        see: 'In the `static {}` code: `ldc String RED`, `iconst_0`, `invokespecial <init>` and `putstatic Field RED`, three times. After moving the line, the three `creating` lines come before `main starts`.'
      },
      check: [
        { q: 'Which class does every enum extend?', a: '`java.lang.Enum`. It provides `name`, `ordinal`, `compareTo`, `equals` and `toString`.' },
        { q: 'When are the constant objects created?', a: 'In the static initializer, once, the first time the enum class is used in the program run.' },
        { q: 'Why can no code create a second `Light.RED`?', a: 'The constructor is private, the class is final, javac forbids `new` on enums, and reflection and serialization refuse to create enum objects.' }
      ],
      keyPoints: [
        'An enum compiles to a `final class` that extends `java.lang.Enum`.',
        'Each constant is a `public static final` field with one object.',
        'The objects are created once, in `static {}`, at the first use.',
        '`values()` clones the hidden `$VALUES` array.',
        '`javap -p` shows what javac generated.'
      ],
      commonMistakes: [
        '`class Light extends Enum<Light>`: `classes cannot directly extend java.lang.Enum`. Write `enum Light`.',
        'Expecting the enum constructor to run each time you use a constant. It runs once per constant per program run. Put per-use code in a method.',
        'Reading `values()` as “the real list” and changing the array. You only change a copy. The enum never changes.'
      ],
      related: ['JVM & Memory', 'Classes & Objects', 'Design Patterns']
    }
  ]);
})();
