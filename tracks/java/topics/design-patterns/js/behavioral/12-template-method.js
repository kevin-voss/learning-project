(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'template-method',
    num: '12',
    title: 'Template Method',
    category: 'behavioral',
    icon: '⌗',
    tagline: 'Skeleton in base, details in subclasses',
    realWorld: 'A fill-in form for a birthday invitation. The card already says "You are invited to ___\'s party on ___. Bring ___!" Every child fills in the blanks differently, but the card, the order of the lines and the picture are the same for everybody.',
    kid: [
      'Making tea and making hot chocolate are almost the same. You boil water. You put something in the cup. You pour the water in. Maybe you add something extra.',
      'Only one or two steps are different: tea bag or chocolate powder, lemon or marshmallows. The order of the steps never changes.',
      'A **Template Method** is the list of steps written down once. Each drink fills in only its own special steps, and the list makes sure everything happens in the right order.'
    ],
    definition: 'The **Template Method** pattern writes the **skeleton** of an algorithm once, as a method in a base class. Some steps of the skeleton are **abstract** (or overridable), and each subclass fills in those steps without changing the order.',
    explain: [
      'The **template method** is a normal method in an abstract base class, such as `prepare()`. It calls the steps in a fixed order: `boilWater()`, `brew()`, `pourInCup()`, `addExtras()`. It is usually declared `final`, so no subclass can change the order.',
      'Steps that are the same for everybody are written in the base class (`boilWater`). Steps that differ are `abstract` (`brew`, `addExtras`), so every subclass **must** fill them in. You know abstract classes from [Interfaces](../interfaces/index.html) (interface or abstract class).',
      'A **hook** is a step with a default that a subclass **may** override, such as `boolean wantsExtras() { return true; }`. Hooks let a subclass switch optional parts on or off.',
      'The control is turned around: the base class calls the subclass, not the other way round. This is sometimes called the **Hollywood principle**: "do not call us, we call you".',
      'Template Method uses **inheritance**: the variant is chosen when you pick the class. Strategy solves the same problem with **composition**: the variant is an object in a field and can change at run time.'
    ],
    why: 'When two classes do almost the same thing, copying the shared steps means fixing every bug twice. Template Method writes the shared steps and the order once, and leaves only the real differences to the subclasses.',
    whenUse: 'When several classes share the same sequence of steps and differ in a few of them, and the order must stay the same. Not when the variants need to change at run time or combine freely: use Strategy then.',
    syntax: '`abstract class Base { final void template() { stepA(); stepB(); if (hook()) stepC(); } void stepA() { … } abstract void stepB(); abstract void stepC(); boolean hook() { return true; } }`.',
    pros: [
      'Shared steps and their order are written once.',
      'Subclasses fill in only what is different.',
      '`final` on the template method protects the order.',
      'Hooks give optional extension points.'
    ],
    cons: [
      'Tied to inheritance: one superclass only, chosen at compile time.',
      'Readers jump between base class and subclass to follow the flow.',
      'Changes to the base class can break subclasses (the fragile base class problem).'
    ],
    fileName: 'DrinkMaker.java',
    code: `abstract class Beverage {
    // The template method: the order of steps, fixed for everybody.
    final void prepare() {
        boilWater();
        brew();
        pourInCup();
        if (wantsExtras()) {
            addExtras();
        }
    }

    private void boilWater() { System.out.println("Boil water"); }
    private void pourInCup() { System.out.println("Pour into cup"); }

    abstract void brew(); // each drink must fill this in
    abstract void addExtras();
    boolean wantsExtras() { return true; } // a hook with a default
}

class Tea extends Beverage {
    void brew() { System.out.println("Steep the tea bag"); }
    void addExtras() { System.out.println("Add lemon"); }
}

class Coffee extends Beverage {
    void brew() { System.out.println("Drip coffee through the filter"); }
    void addExtras() { System.out.println("Add milk"); }
    boolean wantsExtras() { return false; } // black coffee: skip extras
}

public class DrinkMaker {
    public static void main(String[] args) {
        System.out.println("-- Tea --");
        new Tea().prepare();
        System.out.println("-- Coffee --");
        new Coffee().prepare();
    }
}`,
    output: `-- Tea --
Boil water
Steep the tea bag
Pour into cup
Add lemon
-- Coffee --
Boil water
Drip coffee through the filter
Pour into cup`,
    codeSummary: '`prepare()` is written once. Tea and coffee fill in `brew` and `addExtras`, and coffee uses the hook to skip the extras.',
    codeExplanation: [
      { label: 'Line 1', code: 'abstract class Beverage {', text: 'The abstract base class. You cannot create a plain `Beverage`, only a tea or a coffee.' },
      { label: 'Line 3', code: 'final void prepare() {', text: 'The template method. `final` means no subclass can override it, so the order of steps is protected.' },
      { label: 'Line 5', code: 'brew();', text: 'A call to an abstract step. Which code runs depends on the object: tea or coffee.' },
      { label: 'Line 7', code: 'if (wantsExtras()) {', text: 'The hook decides whether the optional step runs.' },
      { label: 'Line 12', code: 'private void boilWater() { System.out.println("Boil water"); }', text: 'A shared step, written once. `private`, because subclasses should not change it.' },
      { label: 'Line 15', code: 'abstract void brew(); // each drink must fill this in', text: 'An abstract step: the compiler forces every subclass to implement it.' },
      { label: 'Line 17', code: 'boolean wantsExtras() { return true; } // a hook with a default', text: 'A hook: it has a default, and a subclass may override it, but does not have to.' },
      { label: 'Line 28', code: 'boolean wantsExtras() { return false; } // black coffee: skip extras', text: '`Coffee` overrides the hook, so `addExtras` is never called for coffee.' },
      { label: 'Line 34', code: 'new Tea().prepare();', text: 'The client calls the template method. It never calls the steps one by one.' }
    ],
    sections: [
      {
        title: 'The problem: two classes, copied steps',
        text: [
          'Without the pattern, tea and coffee each write the full sequence. The shared steps are copied, and nothing makes sure both keep the same order.'
        ],
        fileName: 'CopiedSteps.java',
        code: `class Tea {
    void prepare() {
        System.out.println("Boil water");
        System.out.println("Steep the tea bag");
        System.out.println("Pour into cup");
        System.out.println("Add lemon");
    }
}

class Coffee {
    void prepare() {
        System.out.println("Boil water");
        System.out.println("Pour into cup"); // order mixed up when copying
        System.out.println("Drip coffee through the filter");
    }
}

public class CopiedSteps {
    public static void main(String[] args) {
        new Tea().prepare();
        System.out.println("---");
        new Coffee().prepare();
    }
}`,
        output: `Boil water
Steep the tea bag
Pour into cup
Add lemon
---
Boil water
Pour into cup
Drip coffee through the filter`,
        warn: 'The pain: the coffee pours water into an empty cup before brewing. Copied sequences drift apart, and a fix in one class does not reach the other.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class Beverage {
    <<abstract>>
    +prepare() void
    -boilWater() void
    -pourInCup() void
    +brew()* void
    +addExtras()* void
    +wantsExtras() boolean
  }
  Beverage <|-- Tea
  Beverage <|-- Coffee
  class Tea {
    +brew() void
    +addExtras() void
  }
  class Coffee {
    +brew() void
    +addExtras() void
    +wantsExtras() boolean
  }`,
        diagramNote: 'Methods with `*` are abstract. The base class has the template method and the shared steps; each subclass lists only the steps it fills in. Coffee also overrides the hook.',
        text: [
          'Two roles: the **abstract class** with the template method, and the **concrete classes** that fill in the steps.'
        ]
      },
      {
        title: 'The order of calls: the base class calls down',
        mermaid: `sequenceDiagram
  participant M as main
  participant B as Beverage part of Tea
  participant T as Tea part
  M->>B: prepare()
  B->>B: boilWater()
  B->>T: brew()
  T-->>B: done
  B->>B: pourInCup()
  B->>T: wantsExtras()
  T-->>B: true (default)
  B->>T: addExtras()`,
        diagramNote: 'There is only one object, a `Tea`. The diagram splits it into its two halves: the code inherited from `Beverage` and the code written in `Tea`. The inherited half is in control and calls down.',
        text: [
          'The order is the very reason this pattern exists: the base class owns it, and the subclass only answers when called.'
        ]
      },
      {
        title: 'Where Java itself uses it: AbstractList',
        text: [
          '`java.util.AbstractList` is a template class. If you implement only `get(int)` and `size()`, you get an iterator, a for-each loop, `contains`, `indexOf`, `toString`, `equals` and more for free. All those methods are template methods that call your `get` and `size`. `InputStream` works the same way: you implement `read()` for one byte, and `read(byte[])` for many bytes is built on it.'
        ],
        fileName: 'Squares.java',
        code: `import java.util.AbstractList;
import java.util.List;

class SquareList extends AbstractList<Integer> {
    private final int count;
    SquareList(int count) { this.count = count; }

    public Integer get(int index) { return index * index; } // step 1
    public int size() { return count; } // step 2
}

public class Squares {
    public static void main(String[] args) {
        List<Integer> squares = new SquareList(6);
        System.out.println(squares); // toString from AbstractList
        System.out.println(squares.contains(16)); // contains from AbstractList
        System.out.println(squares.indexOf(25));
        for (int s : squares) { // iterator from AbstractList
            System.out.print(s + " ");
        }
        System.out.println();
    }
}`,
        output: `[0, 1, 4, 9, 16, 25]
true
5
0 1 4 9 16 25`
      },
      {
        title: 'The same idea with Strategy instead',
        text: [
          'You can pass the varying steps as objects instead of overriding them. Here the steps are lambdas handed to the constructor. Now one class serves all drinks, and you could even create a new drink while the program runs.',
          'Rule of thumb: prefer this composition form when the steps are small or must change at run time. Keep Template Method when the subclasses are real kinds of the base class with several steps and shared state.'
        ],
        fileName: 'StepsAsObjects.java',
        code: `class Beverage {
    private final Runnable brew;
    private final Runnable extras;

    Beverage(Runnable brew, Runnable extras) {
        this.brew = brew;
        this.extras = extras;
    }

    void prepare() {
        System.out.println("Boil water");
        brew.run();
        System.out.println("Pour into cup");
        extras.run();
    }
}

public class StepsAsObjects {
    public static void main(String[] args) {
        Beverage cocoa = new Beverage(
            () -> System.out.println("Stir in cocoa powder"),
            () -> System.out.println("Add marshmallows"));
        cocoa.prepare();
    }
}`,
        output: `Boil water
Stir in cocoa powder
Pour into cup
Add marshmallows`
      },
      {
        title: 'When not to use it',
        text: [
          'Deep hierarchies (a base class, a sub-base class, a sub-sub class, each overriding some steps) become hard to follow. If you need more than one level, think about Strategy.',
          'Never call an overridable step from the base class **constructor**. The subclass constructor has not run yet, so the subclass fields are still `0` or `null` when its step runs.'
        ],
        table: {
          head: ['', 'Template Method', 'Strategy'],
          rows: [
            ['Mechanism', 'inheritance', 'composition'],
            ['Variant chosen', 'when you pick the class', 'any time, by setting a field'],
            ['Order of steps', 'fixed in the base class', 'up to the context'],
            ['Number of variants per object', 'one', 'can change while running']
          ]
        }
      }
    ],
    technical: [
      'Inside `prepare()`, the call `brew()` is a virtual call on `this`. Although the code is written in `Beverage`, `this` is the real object, a `Tea`, so the JVM runs `Tea.brew()`. That is the whole mechanism; the pattern is a disciplined use of polymorphism.',
      '`final` on `prepare()` is checked twice: the compiler rejects a subclass that tries to override it, and the JVM verifies it again when loading the class. `private` steps are not inherited at all, so a subclass cannot even see them.',
      'Abstract methods have no bytecode body. A class with an abstract method must itself be `abstract`, and `new Beverage()` is a compile error. The compiler also checks that every concrete subclass implements all abstract steps, so the template method can never call a missing step.'
    ],
    tryIt: {
      steps: [
        'Copy `DrinkMaker.java` and run it with `java DrinkMaker.java`.',
        'Add a class `Cocoa extends Beverage` with `brew` printing `Stir in cocoa powder` and `addExtras` printing `Add marshmallows`.',
        'Call `new Cocoa().prepare();` in `main`.',
        'Try to override `prepare()` in `Cocoa` and read the compile error, then remove it again.'
      ],
      see: 'The four cocoa lines in the right order, and the error `prepare() in Cocoa cannot override prepare() in Beverage` with the note that the method is final.'
    },
    check: [
      { q: 'What is the template method, and why is it often `final`?', a: 'It is the base class method that calls the steps in a fixed order. `final` stops subclasses from overriding it, so the order cannot be changed.' },
      { q: 'What is the difference between an abstract step and a hook?', a: 'An abstract step has no body, so every subclass must implement it. A hook has a default body, and a subclass may override it if it wants to.' },
      { q: 'When would you choose Strategy over Template Method?', a: 'When the varying part must change at run time, when variants should be combined freely, or when you want to avoid a class hierarchy. Strategy holds the variant as an object; Template Method fixes it by inheritance.' }
    ],
    keyPoints: [
      'The base class writes the skeleton once in a template method.',
      'Abstract steps must be filled in; hooks may be overridden.',
      'Make the template method `final` to protect the order.',
      'The base class calls the subclass: "do not call us, we call you".',
      '`AbstractList` and `InputStream` are template classes in the JDK.'
    ],
    commonMistakes: [
      'Forgetting `final` on the template method. A subclass can then override `prepare()` and skip steps. Mark it `final`.',
      'Making shared steps overridable without need. Keep them `private` (or `final`) so subclasses only change what they should.',
      'Calling an abstract step in the base class constructor. Subclass fields are not set yet. Call the template method after construction.',
      'Letting the client call the steps itself: `tea.brew(); tea.boilWater();`. Only the template method should call the steps.'
    ],
    related: ['Strategy', 'Factory Method', 'Command', 'Interfaces'],
    glossary: DP.glossary
  });
})();
