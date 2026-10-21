// Interfaces, lesson 5: default methods, static methods and private helper methods.
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'default-static-methods',
      title: 'Default and Static Methods',
      category: 'practice',
      icon: 'D',
      tagline: 'A promise with a spare part included',
      realWorld: 'A new phone comes with a ready ringtone. You may keep it or pick your own. The shop also has a help desk that belongs to the shop, not to any single phone.',
      kid: [
        'The teacher says: "Everyone must tell me their name." That is the promise. Every child must do it.',
        'Then she adds: "If you do not know how to say hello, say: Hello, I am and then your name." That is a **default**: a ready answer. Most children use it. A pirate child may say "Ahoy!" instead.',
        'The teacher also has a whistle that belongs to her, not to the children. That is a **static** method: you ask the teacher, not a child.'
      ],
      definition: 'A `default` method is an interface method **with a body**. Classes get it for free and may override it. A `static` method in an interface belongs to the interface itself and is called with the interface name, like `Greeter.line(10)`.',
      explain: [
        'Since Java 8, an interface may contain more than abstract methods. A **default method** starts with the keyword `default` and has a normal body. Every implementing class **inherits** it, which means it gets the method without writing it.',
        'A default method may call the abstract methods of the same interface. `greet()` can use `name()`, because every class that implements `Greeter` must have `name()`. The default is built on top of the promise.',
        'A class may still **override** the default: it writes its own method with the same signature and `@Override`. Then that class uses its own version; all others keep the default.',
        'Why were defaults added? Imagine an interface used by a million classes all over the world. If you add a new abstract method, every one of those classes breaks. A new method with a `default` body breaks nobody. That is how Java 8 could add `forEach` to `Iterable` and `sort` to `List`.',
        'A **static method** in an interface is a helper that belongs to the interface, not to any object. You call it as `InterfaceName.method(…)`. You know this already: `List.of(…)` is a static method of the interface `List`. Since Java 9 an interface may also have **private methods**: helpers that only its own default methods can use.'
      ],
      why: 'Defaults give every class a sensible behaviour for free and let an interface grow without breaking old classes. Static methods keep helpers next to the interface they belong to.',
      whenUse: 'Default: a behaviour that can be built from the abstract methods and fits most classes. Static: factory or helper methods for the interface, like `List.of` or `Comparator.comparing`.',
      syntax: '`default returnType name(…) { … }` · `static returnType name(…) { … }` (call: `Interface.name(…)`) · `private returnType helper(…) { … }`',
      fileName: 'Greetings.java',
      code: `interface Greeter {
    String name();                         // abstract: every class must write it

    default String greet() {               // default: a ready-made body
        return "Hello, I am " + name() + ".";
    }

    static String line(int width) {        // static: belongs to the interface
        return "-".repeat(width);
    }
}

class Robot implements Greeter {
    @Override public String name() { return "R2"; }
    // no greet() here: Robot uses the default
}

class Pirate implements Greeter {
    @Override public String name() { return "Captain Lee"; }
    @Override public String greet() { return "Ahoy! " + name() + " here."; }
}

public class Greetings {
    public static void main(String[] args) {
        Greeter[] crew = { new Robot(), new Pirate() };
        System.out.println(Greeter.line(24));
        for (Greeter g : crew) {
            System.out.println(g.greet());
        }
        System.out.println(Greeter.line(24));
    }
}`,
      output: `------------------------
Hello, I am R2.
Ahoy! Captain Lee here.
------------------------`,
      codeSummary: 'One interface with all three kinds of methods. Robot uses the default `greet`, Pirate overrides it, and `main` calls the static helper on the interface name.',
      codeExplanation: [
        { label: 'Line 2', code: 'String name();                         // abstract: every class must write it', text: 'A normal abstract method: the part of the promise every class must fill in.' },
        { label: 'Line 4', code: 'default String greet() {               // default: a ready-made body', text: '`default` allows a body inside an interface. Implementing classes inherit it.' },
        { label: 'Line 5', code: 'return "Hello, I am " + name() + ".";', text: 'The default calls the abstract `name()`. At run time that is the `name()` of the real object.' },
        { label: 'Line 8', code: 'static String line(int width) {        // static: belongs to the interface', text: 'A static helper. It needs no object, and it does not use `name()`.' },
        { label: 'Line 9', code: 'return "-".repeat(width);', text: '`repeat` makes a new string with `width` copies of `"-"`.' },
        { label: 'Line 13', code: 'class Robot implements Greeter {', text: 'Robot writes only `name()`. It gets `greet()` for free from the interface.' },
        { label: 'Line 20', code: '@Override public String greet() { return "Ahoy! " + name() + " here."; }', text: 'Pirate overrides the default with its own greeting. `@Override` works for defaults too.' },
        { label: 'Line 26', code: 'System.out.println(Greeter.line(24));', text: 'A static interface method is called on the interface name, not on an object.' },
        { label: 'Line 28', code: 'System.out.println(g.greet());', text: 'Robot runs the default, Pirate runs its own version. Dynamic dispatch picks the right one.' }
      ],
      sections: [
        {
          title: 'Which greet() runs?',
          text: [
            'When you call `g.greet()`, Java first looks in the class of the object. Only if the class has no `greet()` does it use the default from the interface.'
          ],
          mermaid: `flowchart TD
  A["g.greet() is called"] --> B{"Does the object's class write greet()?"}
  B -- "yes (Pirate)" --> C["run the class version"]
  B -- "no (Robot)" --> D["run the default from Greeter"]
  D --> E["the default calls name() of the real object"]`,
          diagramNote: 'Rule: **the class wins** over the interface. A method the class writes always beats a default.'
        },
        {
          title: 'The four kinds of methods in an interface',
          table: {
            head: ['Kind', 'Has a body?', 'Who calls it?', 'Can a class override it?'],
            rows: [
              ['abstract `String name();`', 'no', 'any code, on an object', 'must write it'],
              ['`default String greet() { … }`', 'yes', 'any code, on an object', 'may override it'],
              ['`static String line(int w) { … }`', 'yes', '`Greeter.line(…)` only', 'no, it is not inherited'],
              ['`private String helper() { … }`', 'yes', 'only methods inside the interface', 'no, nobody outside sees it']
            ],
            note: 'An interface still has **no instance fields**. A default method can only work with the abstract methods (and constants), never with stored data.'
          },
          warn: 'A static interface method is not inherited. `Robot.line(3)` fails with `cannot find symbol … location: class Robot`. Write `Greeter.line(3)`.'
        },
        {
          title: 'Two defaults with the same name',
          text: [
            'If a class implements two interfaces that both have a `default start()`, Java cannot choose. The class does not compile: `types Camera and Phone are incompatible; class SmartPhone inherits unrelated defaults for start() from types Camera and Phone`.',
            'The fix: override the method in the class. Inside, you may call one of the defaults with the special form `InterfaceName.super.method()`.'
          ],
          fileName: 'TwoDefaults.java',
          code: `interface Camera {
    default String start() { return "camera ready"; }
}

interface Phone {
    default String start() { return "phone ready"; }
}

class SmartPhone implements Camera, Phone {
    @Override
    public String start() {
        // pick both, in our own order
        return Phone.super.start() + " + " + Camera.super.start();
    }
}

public class TwoDefaults {
    public static void main(String[] args) {
        System.out.println(new SmartPhone().start());
    }
}`,
          output: 'phone ready + camera ready'
        },
        {
          title: 'Private helpers and growing an interface',
          text: [
            'Two defaults share some code? Put it in a `private` method of the interface. Classes cannot see or call it.',
            'The example also shows the main reason for defaults: `discountPrice` was added later. `Book` was written before and has no idea about it, yet it still compiles and gets the new method.'
          ],
          fileName: 'Prices.java',
          code: `interface Product {
    String title();
    double price();

    default String label() {
        return title() + " costs " + format(price());
    }

    // added later: old classes still compile
    default String discountLabel(int percent) {
        double reduced = price() * (100 - percent) / 100;
        return title() + " now " + format(reduced);
    }

    private String format(double amount) {   // only for the defaults above
        return amount + " EUR";
    }
}

class Book implements Product {
    @Override public String title() { return "Java for Kids"; }
    @Override public double price() { return 20.0; }
}

public class Prices {
    public static void main(String[] args) {
        Product book = new Book();
        System.out.println(book.label());
        System.out.println(book.discountLabel(25));
    }
}`,
          output: `Java for Kids costs 20.0 EUR
Java for Kids now 15.0 EUR`,
          tip: 'JDK examples to recognise: `list.forEach(…)` and `list.sort(…)` are default methods; `List.of(…)`, `Map.of(…)` and `Comparator.comparing(…)` are static interface methods.'
        }
      ],
      technical: [
        'A default method is compiled into the interface\'s `.class` file with real bytecode, like a method in a class. An abstract method has the flag `ACC_ABSTRACT` and no code; a default method has real bytecode and no such flag. The keyword `default` itself does not appear in the class file.',
        'At run time the JVM searches for the method to run: first the class of the object and its parent classes, then the interfaces. A method found in a class always wins. If two interfaces offer a default and neither is more specific, the class must decide, which is why the compiler forces you to override it.',
        '`Phone.super.start()` compiles to `invokespecial` on `Phone.start`. It runs exactly that interface\'s default, without dynamic dispatch.',
        'A static interface method is called with `invokestatic` on the interface. The JVM does not copy it into implementing classes; that is why `Robot.line(3)` is not found.'
      ],
      tryIt: {
        steps: [
          'Run `Greetings.java`.',
          'Add a default method `default String goodbye() { return name() + " says bye."; }` to `Greeter`.',
          'Print `g.goodbye()` in the loop. Do not change Robot or Pirate.',
          'Write `System.out.println(Robot.line(5));` in `main` and compile. Read the error, then change it to `Greeter.line(5)`.'
        ],
        see: '`R2 says bye.` and `Captain Lee says bye.` without touching the classes, the error `cannot find symbol … class Robot`, and then `-----`.'
      },
      check: [
        { q: 'What is the difference between a default method and an abstract method?', a: 'A default method has a body and classes get it for free (they may override it). An abstract method has no body and every class must write it.' },
        { q: 'How do you call a static method `line` of the interface `Greeter`?', a: '`Greeter.line(10)`. Not on an object and not on an implementing class.' },
        { q: 'A class implements two interfaces that both have `default String start()`. What must you do?', a: 'Override `start()` in the class. Inside, you can call `Camera.super.start()` or `Phone.super.start()`.' }
      ],
      keyPoints: [
        '`default` methods have a body and are inherited by every implementing class.',
        'A method written in the class always wins over a default.',
        'Static interface methods are called on the interface name: `List.of(…)`, `Greeter.line(…)`.',
        'Two clashing defaults force you to override; `X.super.m()` calls one of them.',
        'Defaults exist so interfaces can grow without breaking old classes. Interfaces still have no fields.'
      ],
      commonMistakes: [
        'A body without the keyword: `String greet() { … }` in an interface. Fix: `default String greet() { … }`.',
        'Calling a static interface method through a class or object: `Robot.line(3)` or `robot.line(3)`. Fix: `Greeter.line(3)`.',
        'Trying to store data in a default: `default void rename(String n) { this.name = n; }`. Fix: interfaces have no fields; keep data in the class.',
        'Writing `super.start()` to reach an interface default. Fix: `Camera.super.start()` names the interface.'
      ],
      related: ['multiple-interfaces', 'interface-or-abstract', 'builtin-interfaces']
    }
  ]);
})();
