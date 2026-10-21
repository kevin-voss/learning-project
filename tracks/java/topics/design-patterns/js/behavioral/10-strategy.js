(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'strategy',
    num: '10',
    title: 'Strategy',
    category: 'behavioral',
    icon: '⇆',
    tagline: 'Swap algorithms at runtime',
    realWorld: 'Getting to school. The goal is always the same: arrive at school. But on a sunny day you walk, on a rainy day you take the bus, and when you are late your mum drives you. You choose the way each morning, and the school does not care how you came.',
    kid: [
      'You play a game with a friend, and you can pick a hero. One hero jumps high, one runs fast, one can swim. The game is the same, only the way your hero moves is different.',
      'You can even swap heroes in the middle of the game. The game does not need new rules for that. It only asks your hero: "move!" and the hero does it in its own way.',
      'A **Strategy** is such a hero: one way of doing a job. The program holds one, asks it to do the job, and can swap it for another one at any time.'
    ],
    definition: 'The **Strategy** pattern puts each way of doing a job (each **algorithm**) into its own class behind a shared interface. The object that needs the job (the **context**) holds one strategy in a field and can swap it, even while the program runs.',
    explain: [
      'An **algorithm** is a recipe for a job, such as "how to compute the shipping cost". Often there are several recipes for the same job: standard, express, free. Strategy gives each recipe its own small class.',
      'The **strategy interface** names the job: `ShippingStrategy` with `int cost(int grams)`. Each **concrete strategy** implements it in its own way. Most strategy interfaces have one method, so a lambda can be a strategy.',
      'The **context** (`Order`) holds a strategy in a field and **delegates** the job to it: `return shipping.cost(weight);`. The context never asks which strategy it has. There is no `if` or `switch` on a type name.',
      'The strategy can come in through the constructor or a setter, so you can **swap** it at run time: the user picks express in the shop, and the order calls `setShipping(new Express())`.',
      'Strategy is composition in its purest form: the varying part is an object in a field, not a subclass. Template Method (two lessons later) solves the same problem with inheritance.'
    ],
    why: 'A method with a `switch` over "which way?" grows with every new way, and the same `switch` tends to appear in many places. Strategy replaces the branches with objects: a new way is a new class or lambda, and the old code stays untouched.',
    whenUse: 'When there are several ways to do one job and the choice depends on data, the user or a setting, especially when the same choice appears in many places. Not when there are two simple cases that will never change: one `if` is clearer.',
    syntax: '`interface Strategy { R doIt(P p); }`, the context: `class Context { private Strategy s; void setStrategy(Strategy s) { this.s = s; } R work(P p) { return s.doIt(p); } }`, and a strategy as a lambda: `ctx.setStrategy(p -> …);`.',
    pros: [
      'No `if` or `switch` on the kind of algorithm.',
      'New algorithms are new classes or lambdas; old code stays closed.',
      'Swap the algorithm at run time.',
      'Each algorithm can be tested on its own.'
    ],
    cons: [
      'The client must know the strategies to choose one.',
      'More small classes (lambdas reduce this).',
      'Overkill for two cases that never change.'
    ],
    fileName: 'ShippingDemo.java',
    code: `interface ShippingStrategy {
    int cost(int grams); // in cents
}

class Standard implements ShippingStrategy {
    public int cost(int grams) { return 490; }
}

class Express implements ShippingStrategy {
    public int cost(int grams) { return 990 + grams / 100; }
}

class Order { // context
    private final int grams;
    private ShippingStrategy shipping;

    Order(int grams, ShippingStrategy shipping) {
        this.grams = grams;
        this.shipping = shipping;
    }

    void setShipping(ShippingStrategy shipping) { this.shipping = shipping; }

    int shippingCost() { return shipping.cost(grams); } // delegate
}

public class ShippingDemo {
    public static void main(String[] args) {
        Order order = new Order(2500, new Standard());
        System.out.println("Standard: " + order.shippingCost());

        order.setShipping(new Express()); // swap at run time
        System.out.println("Express: " + order.shippingCost());

        order.setShipping(grams -> 0); // a lambda strategy
        System.out.println("Free: " + order.shippingCost());
    }
}`,
    output: `Standard: 490
Express: 1015
Free: 0`,
    codeSummary: 'One order, three ways to compute its shipping. The order never checks which strategy it has; it calls `cost` and gets an answer.',
    codeExplanation: [
      { label: 'Line 1', code: 'interface ShippingStrategy {', text: 'The strategy interface. It names the job: compute a shipping cost from a weight.' },
      { label: 'Line 9', code: 'class Express implements ShippingStrategy {', text: 'A concrete strategy with its own formula. `Standard` above is another one.' },
      { label: 'Line 13', code: 'class Order { // context', text: 'The context: the class that needs the job done but does not want to know how.' },
      { label: 'Line 15', code: 'private ShippingStrategy shipping;', text: 'The strategy in a field, typed as the interface. Not `final`, because it can be swapped.' },
      { label: 'Line 22', code: 'void setShipping(ShippingStrategy shipping) { this.shipping = shipping; }', text: 'The swap point. Any object or lambda that fits the interface is accepted.' },
      { label: 'Line 24', code: 'int shippingCost() { return shipping.cost(grams); } // delegate', text: 'Delegation: the order hands the job to its strategy. No `switch`.' },
      { label: 'Line 32', code: 'order.setShipping(new Express()); // swap at run time', text: 'Same order object, new behavior. 990 + 2500 / 100 = 1015 cents.' },
      { label: 'Line 35', code: 'order.setShipping(grams -> 0); // a lambda strategy', text: 'A one-method interface can be implemented by a lambda. No new class is needed for free shipping.' }
    ],
    sections: [
      {
        title: 'The problem: a switch that keeps growing',
        text: [
          'Here the order picks the formula with a `switch` on a string. Each new shipping kind means editing this method, and the same `switch` is often needed again elsewhere (for the delivery time, the label, …).'
        ],
        fileName: 'NoStrategy.java',
        code: `public class NoStrategy {
    static int shippingCost(String kind, int grams) {
        switch (kind) {
            case "standard":
                return 490;
            case "express":
                return 990 + grams / 100;
            case "free":
                return 0;
            default:
                throw new IllegalArgumentException("Unknown kind: " + kind);
        }
    }

    public static void main(String[] args) {
        System.out.println(shippingCost("standard", 2500));
        System.out.println(shippingCost("express", 2500));
        try {
            System.out.println(shippingCost("Express", 2500)); // typo: capital E
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
        output: `490
1015
Unknown kind: Express`,
        warn: 'The pain: every new kind edits tested code, all formulas sit in one growing method, and a typo in the string is only found at run time.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class Order {
    -ShippingStrategy shipping
    +setShipping(ShippingStrategy) void
    +shippingCost() int
  }
  class ShippingStrategy {
    <<interface>>
    +cost(int grams) int
  }
  Order --> ShippingStrategy : delegates to
  ShippingStrategy <|.. Standard
  ShippingStrategy <|.. Express
  ShippingStrategy <|.. FreeLambda`,
        diagramNote: 'The context has one arrow, to the interface. Every concrete strategy hangs below the interface. `FreeLambda` stands for the lambda, which is also an implementation.',
        text: [
          'Three roles: **context**, **strategy interface**, **concrete strategies**. Compare it with Abstract Factory\'s client: both hold an interface in a field. The difference is the purpose: a strategy does a job, a factory creates objects.'
        ]
      },
      {
        title: 'The order of calls',
        mermaid: `sequenceDiagram
  participant M as main
  participant O as Order
  participant S as Standard
  participant E as Express
  M->>O: shippingCost()
  O->>S: cost(2500)
  S-->>O: 490
  M->>O: setShipping(express)
  M->>O: shippingCost()
  O->>E: cost(2500)
  E-->>O: 1015`,
        diagramNote: 'The same call `shippingCost()` goes to a different strategy after the swap. `Order` itself does not change.',
        text: [
          'The swap happens between two calls. Each `shippingCost()` asks whatever strategy is in the field at that moment.'
        ]
      },
      {
        title: 'Where Java itself uses it: Comparator',
        text: [
          '`Comparator` is the strategy you use most. `List.sort` is the context: it knows how to sort, and the comparator decides **what comes first**. You met it in [Collections](../collections/index.html). Swap the comparator, and the same sort gives a different order.'
        ],
        fileName: 'SortStrategies.java',
        code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

record Pet(String name, int age) {}

public class SortStrategies {
    public static void main(String[] args) {
        List<Pet> pets = new ArrayList<>(List.of(
            new Pet("Rex", 7), new Pet("Mia", 2), new Pet("Bo", 4)));

        pets.sort(Comparator.comparing(Pet::name)); // strategy 1
        System.out.println(pets);

        pets.sort(Comparator.comparingInt(Pet::age)); // strategy 2
        System.out.println(pets);

        pets.sort(Comparator.comparingInt(Pet::age).reversed()); // strategy 3
        System.out.println(pets);
    }
}`,
        output: `[Pet[name=Bo, age=4], Pet[name=Mia, age=2], Pet[name=Rex, age=7]]
[Pet[name=Mia, age=2], Pet[name=Bo, age=4], Pet[name=Rex, age=7]]
[Pet[name=Rex, age=7], Pet[name=Bo, age=4], Pet[name=Mia, age=2]]`,
        tip: '`Pet::name` is a method reference (see [Interfaces](../interfaces/index.html)). `Comparator.comparing` builds a strategy from it, and `.reversed()` wraps that strategy in another one: a decorator on top of a strategy.'
      },
      {
        title: 'Choosing a strategy by name: an enum of strategies',
        text: [
          'Users choose with words or buttons, so at some point a name must become a strategy. Put that choice in **one** place. An enum whose constants carry a lambda is a neat, type-safe list of strategies.'
        ],
        fileName: 'Calculator.java',
        code: `import java.util.function.IntBinaryOperator;

enum Operation {
    PLUS((a, b) -> a + b),
    MINUS((a, b) -> a - b),
    TIMES((a, b) -> a * b);

    private final IntBinaryOperator formula; // the strategy

    Operation(IntBinaryOperator formula) { this.formula = formula; }

    int apply(int a, int b) { return formula.applyAsInt(a, b); }
}

public class Calculator {
    public static void main(String[] args) {
        for (Operation op : Operation.values()) {
            System.out.println("6 " + op + " 3 = " + op.apply(6, 3));
        }
        Operation chosen = Operation.valueOf("TIMES"); // from user input
        System.out.println(chosen.apply(7, 8));
    }
}`,
        output: `6 PLUS 3 = 9
6 MINUS 3 = 3
6 TIMES 3 = 18
56`,
        tip: '`IntBinaryOperator` is a ready-made functional interface from `java.util.function`: two `int`s in, one `int` out. The JDK has many such interfaces, so you often do not need to write your own strategy interface.'
      },
      {
        title: 'When not to use it',
        text: [
          'Two cases that will never grow, used in one place, are clearer as an `if`. A strategy interface with one implementation is ceremony.',
          'Strategies also need a shared interface. If two algorithms need very different inputs, forcing them behind one method makes both awkward. Then they may not be the same job after all.'
        ],
        table: {
          head: ['Situation', 'Use'],
          rows: [
            ['`if (member) price * 0.9 else price`, in one place', 'a plain `if`'],
            ['Shipping kinds that grow, chosen by the user', 'Strategy'],
            ['Sorting by different fields', 'Strategy with `Comparator`'],
            ['Same skeleton, a few steps differ, chosen once by class', 'Template Method']
          ]
        }
      }
    ],
    technical: [
      'The call `shipping.cost(grams)` compiles to an `invokeinterface` instruction. At run time the JVM finds `cost` in the class of the object in the field. When a call site always sees the same strategy class, the just-in-time compiler can inline it, so a strategy is usually as fast as a direct call.',
      'A lambda strategy such as `grams -> 0` compiles to a private method plus an `invokedynamic` instruction. The first time it runs, the JVM creates a small hidden class that implements `ShippingStrategy` and calls that method. A lambda that uses no outside variables is created once and reused.',
      'An enum constant with a lambda field, like `PLUS`, is built once when the enum class is loaded. `Operation.valueOf("TIMES")` looks the constant up by name and throws `IllegalArgumentException` for an unknown name, so a bad user input is caught at the one place where names become strategies.'
    ],
    tryIt: {
      steps: [
        'Copy `ShippingDemo.java` and run it with `java ShippingDemo.java`.',
        'Add a class `ByWeight implements ShippingStrategy` that returns `grams / 10` cents.',
        'In `main`, call `order.setShipping(new ByWeight());` and print the cost.',
        'Then add a lambda strategy that costs 300 cents below 1000 grams and 600 cents otherwise, and try it.'
      ],
      see: '`250` for `ByWeight` (2500 / 10) and `600` for your lambda, without any change in `Order`.'
    },
    check: [
      { q: 'What is the context in the Strategy pattern, and what does it do with the strategy?', a: 'The context is the object that needs the job done (`Order`). It holds a strategy in a field typed as the interface and delegates the job to it, without checking which one it is.' },
      { q: 'Why can `order.setShipping(grams -> 0)` work?', a: '`ShippingStrategy` has exactly one abstract method, so it is a functional interface and a lambda can implement it.' },
      { q: 'Which JDK interface is the most common strategy, and who is the context?', a: '`Comparator`. `List.sort` or `Collections.sort` is the context: it does the sorting and asks the comparator which element comes first.' }
    ],
    keyPoints: [
      'Each algorithm lives in its own class or lambda behind one interface.',
      'The context holds a strategy and delegates the job to it.',
      'Swapping strategies changes behavior without changing the context.',
      'One-method strategy interfaces fit lambdas and method references.',
      '`Comparator` is Java\'s everyday strategy.'
    ],
    commonMistakes: [
      'Keeping the `switch` inside the strategy setup in many places. Turn a name into a strategy in exactly one place, for example `Operation.valueOf(name)`.',
      'Letting the context check the type: `if (shipping instanceof Express)`. Then the pattern is gone. Ask the strategy instead.',
      'Making the strategy field `final` when you need to swap it. Use a setter, or pass the strategy as a method parameter.',
      'Writing a strategy interface with one implementation "for later". Start with plain code; extract the interface when the second algorithm comes.'
    ],
    related: ['Template Method', 'Command', 'Decorator', 'Interfaces'],
    glossary: DP.glossary
  });
})();
