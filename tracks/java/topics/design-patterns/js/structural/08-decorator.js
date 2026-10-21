(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'decorator',
    num: '08',
    title: 'Decorator',
    category: 'structural',
    icon: '⬚',
    tagline: 'Wrap, don\'t subclass',
    realWorld: 'Getting dressed on a cold day. You are still you, but you put on a shirt, then a sweater, then a coat. Each piece adds warmth, you can pick any mix, and you can take one piece off again. Nobody has to sew a special "shirt-sweater-coat" for you.',
    kid: [
      'You buy a scoop of ice cream. Then you say: "with sprinkles, please". Then: "and chocolate sauce". Each extra goes on top of what is already there, and each one costs a bit more.',
      'It is still an ice cream. You can eat it the same way. It only got more things on top.',
      'A **Decorator** works like that. It wraps an object, keeps it the same kind of thing, and adds one little extra. You can stack as many extras as you like.'
    ],
    definition: 'The **Decorator** pattern adds behavior to an object by **wrapping** it in another object that has the **same interface**. The wrapper does its extra work and **delegates** the rest to the wrapped object, so wrappers can be stacked in any combination.',
    explain: [
      'The **component** is the interface (`Drink` with `describe()` and `cents()`). The **concrete component** is the plain object (`Coffee`). A **decorator** implements the same interface **and** holds a component in a field.',
      'Each decorator method calls the same method on the wrapped object and adds its part: `Milk.cents()` returns `inner.cents() + 50`. Handing the call on like that is called **delegation**.',
      'Because a decorator is itself a `Drink`, it can wrap another decorator: `new Sugar(new Milk(new Coffee()))`. The calls travel inward through every wrapper and the results come back outward, like the skins of an onion.',
      'With inheritance, every combination needs its own subclass: coffee with milk, coffee with sugar, coffee with milk and sugar, and so on. Three extras already give eight classes. With decorators you write one class per extra and combine them when you create the object, at run time.',
      'A decorator keeps the interface the same. That is the difference to an Adapter, which changes the interface. Java\'s I/O classes are the most famous decorators: `new BufferedReader(new InputStreamReader(in))`.'
    ],
    why: 'It adds features without touching the original class and without a subclass for every combination. Each feature is one small class with one job, and you choose the mix when you build the object.',
    whenUse: 'When you need optional extras that can be combined freely (toppings, logging, buffering, checks, read-only views), or when you cannot change or subclass the original class. Not when there are one or two fixed variants: a subclass or a parameter is simpler.',
    syntax: '`abstract class Decorator implements Component { protected final Component inner; Decorator(Component inner) { this.inner = inner; } }` and `class Extra extends Decorator { public R op() { return addSomething(inner.op()); } }`.',
    pros: [
      'Add features without changing the original class.',
      'Combine features freely at run time, in any order.',
      'One small class per feature instead of one per combination.'
    ],
    cons: [
      'Many small objects; a stack of wrappers is harder to debug.',
      'The order of wrapping can change the result.',
      'A decorated object is not `==` to the original, and code that checks the concrete class breaks.'
    ],
    fileName: 'CoffeeShop.java',
    code: `interface Drink { // component
    String describe();
    int cents();
}

class Coffee implements Drink { // concrete component
    public String describe() { return "coffee"; }
    public int cents() { return 200; }
}

abstract class DrinkDecorator implements Drink { // decorator base
    protected final Drink inner;
    DrinkDecorator(Drink inner) { this.inner = inner; }
}

class Milk extends DrinkDecorator {
    Milk(Drink inner) { super(inner); }
    public String describe() { return inner.describe() + " + milk"; }
    public int cents() { return inner.cents() + 50; }
}

class Sugar extends DrinkDecorator {
    Sugar(Drink inner) { super(inner); }
    public String describe() { return inner.describe() + " + sugar"; }
    public int cents() { return inner.cents() + 20; }
}

public class CoffeeShop {
    static void print(Drink d) {
        System.out.println(d.describe() + ": " + d.cents() + " cents");
    }

    public static void main(String[] args) {
        print(new Coffee());
        print(new Milk(new Coffee()));
        print(new Sugar(new Milk(new Coffee())));
        print(new Milk(new Milk(new Coffee()))); // double milk
    }
}`,
    output: `coffee: 200 cents
coffee + milk: 250 cents
coffee + milk + sugar: 270 cents
coffee + milk + milk: 300 cents`,
    codeSummary: 'Two decorator classes give every combination, even double milk. `print` works with all of them because every wrapper is still a `Drink`.',
    codeExplanation: [
      { label: 'Line 1', code: 'interface Drink { // component', text: 'The component interface. The plain coffee and every wrapper implement it.' },
      { label: 'Line 6', code: 'class Coffee implements Drink { // concrete component', text: 'The object at the core. It knows nothing about milk or sugar.' },
      { label: 'Line 11', code: 'abstract class DrinkDecorator implements Drink { // decorator base', text: 'The base of all decorators: it is a `Drink` and it holds a `Drink`. Both facts together are the pattern.' },
      { label: 'Line 12', code: 'protected final Drink inner;', text: 'The wrapped object. Its type is the interface, so it can be a coffee or another decorator.' },
      { label: 'Line 18', code: 'public String describe() { return inner.describe() + " + milk"; }', text: 'Delegate first, then add: ask the inner drink for its text and append this wrapper\'s part.' },
      { label: 'Line 19', code: 'public int cents() { return inner.cents() + 50; }', text: 'Same idea for the price. Each wrapper adds its own amount.' },
      { label: 'Line 29', code: 'static void print(Drink d) {', text: 'The client only knows `Drink`. It cannot tell, and does not need to know, how many wrappers there are.' },
      { label: 'Line 36', code: 'print(new Sugar(new Milk(new Coffee())));', text: 'Read from the inside out: a coffee, wrapped in milk, wrapped in sugar. Three objects, one drink.' },
      { label: 'Line 37', code: 'print(new Milk(new Milk(new Coffee()))); // double milk', text: 'The same decorator twice. With subclasses you would need a `CoffeeWithDoubleMilk` class.' }
    ],
    sections: [
      {
        title: 'The problem: one subclass per combination',
        text: [
          'Using inheritance, each mix of extras becomes a class. Two extras already need four classes, and the prices are copied between them.'
        ],
        fileName: 'SubclassExplosion.java',
        code: `class Coffee {
    String describe() { return "coffee"; }
    int cents() { return 200; }
}

class CoffeeWithMilk extends Coffee {
    String describe() { return "coffee + milk"; }
    int cents() { return 250; }
}

class CoffeeWithSugar extends Coffee {
    String describe() { return "coffee + sugar"; }
    int cents() { return 220; }
}

class CoffeeWithMilkAndSugar extends Coffee {
    String describe() { return "coffee + milk + sugar"; }
    int cents() { return 270; }
}

public class SubclassExplosion {
    public static void main(String[] args) {
        Coffee[] menu = { new Coffee(), new CoffeeWithMilk(), new CoffeeWithSugar(), new CoffeeWithMilkAndSugar() };
        for (Coffee c : menu) {
            System.out.println(c.describe() + ": " + c.cents());
        }
        System.out.println("Classes for 2 extras: " + (1 << 2));
        System.out.println("Classes for 5 extras: " + (1 << 5));
    }
}`,
        output: `coffee: 200
coffee + milk: 250
coffee + sugar: 220
coffee + milk + sugar: 270
Classes for 2 extras: 4
Classes for 5 extras: 32`,
        warn: 'The pain: n extras need 2 to the power n classes (`1 << n`). If milk gets more expensive, you must fix every class that contains milk. And "double milk" needs yet another class.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class Drink {
    <<interface>>
    +describe() String
    +cents() int
  }
  class DrinkDecorator {
    <<abstract>>
    #Drink inner
  }
  Drink <|.. Coffee
  Drink <|.. DrinkDecorator
  DrinkDecorator o-- Drink : wraps
  DrinkDecorator <|-- Milk
  DrinkDecorator <|-- Sugar`,
        diagramNote: 'The key shape: `DrinkDecorator` both implements `Drink` (triangle) and holds a `Drink` (diamond line). That loop is what allows wrapping a wrapper. `#` means protected.',
        text: [
          'Four roles: **component** (interface), **concrete component** (the core object), **decorator** (abstract base that wraps a component), **concrete decorators** (one per extra).'
        ]
      },
      {
        title: 'The order of calls: in through the wrappers, out with the result',
        mermaid: `sequenceDiagram
  participant C as client
  participant S as Sugar
  participant M as Milk
  participant K as Coffee
  C->>S: cents()
  S->>M: cents()
  M->>K: cents()
  K-->>M: 200
  M-->>S: 250
  S-->>C: 270`,
        diagramNote: 'The call goes all the way to the core, then each wrapper adds its part on the way back. The outermost decorator answers the client.',
        text: [
          'Because each wrapper works on the result of the wrapper inside, the **order of wrapping** can matter. Here a shop adds shipping and offers half price. Which comes first changes the bill.'
        ],
        fileName: 'OrderMatters.java',
        code: `interface Price { int cents(); }

record Base(int cents) implements Price {}

record PlusShipping(Price inner) implements Price {
    public int cents() { return inner.cents() + 500; }
}

record HalfOff(Price inner) implements Price {
    public int cents() { return inner.cents() / 2; }
}

public class OrderMatters {
    public static void main(String[] args) {
        Price a = new HalfOff(new PlusShipping(new Base(1000)));
        Price b = new PlusShipping(new HalfOff(new Base(1000)));
        System.out.println("Half off everything: " + a.cents());
        System.out.println("Half off goods only: " + b.cents());
    }
}`,
        output: `Half off everything: 750
Half off goods only: 1000`,
        tip: 'Records can be decorators too: a record component like `Price inner` is the wrapped object. That keeps tiny decorators very short.'
      },
      {
        title: 'Where Java itself uses it',
        text: [
          'Java I/O is built from decorators. `LineNumberReader` wraps any `Reader` and adds line counting; `BufferedReader` adds buffering. You met them in [I/O Basics](../io-basics/index.html).',
          '`Collections.unmodifiableList(list)` is a decorator that adds a restriction: it is still a `List`, it reads from your list, but it refuses changes. Because it is a wrapper, not a copy, changes to the original list show through.'
        ],
        fileName: 'JavaDecorators.java',
        code: `import java.io.IOException;
import java.io.LineNumberReader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class JavaDecorators {
    public static void main(String[] args) throws IOException {
        LineNumberReader reader = new LineNumberReader(new StringReader("red\\ngreen\\nblue"));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(reader.getLineNumber() + ": " + line);
        }

        List<String> names = new ArrayList<>(List.of("Ada"));
        List<String> readOnly = Collections.unmodifiableList(names);
        names.add("Linus"); // change the original
        System.out.println(readOnly);
        try {
            readOnly.add("Grace");
        } catch (UnsupportedOperationException e) {
            System.out.println("The wrapper refuses changes");
        }
    }
}`,
        output: `1: red
2: green
3: blue
[Ada, Linus]
The wrapper refuses changes`
      },
      {
        title: 'When not to use it',
        text: [
          'If there are only one or two fixed variants that never combine, a subclass or a constructor parameter is easier to read than a stack of wrappers.',
          'Deep stacks are hard to debug: a stack trace shows ten `cents()` calls in ten classes. And a decorator has a different identity: `new Milk(coffee) == coffee` is `false`, and code that asks `drink instanceof Coffee` stops working once the coffee is wrapped.'
        ],
        table: {
          head: ['Question', 'Subclass', 'Decorator'],
          rows: [
            ['When is the feature chosen?', 'when you write the code', 'when you create the object'],
            ['Combinations of n features', 'up to 2^n classes', 'n classes'],
            ['Can it work on a `final` class?', 'no', 'yes, if it has an interface'],
            ['Same feature twice?', 'needs another class', 'wrap twice']
          ]
        }
      }
    ],
    technical: [
      'Each wrapper is a separate object on the heap with one reference field to the next. `new Sugar(new Milk(new Coffee()))` creates three objects forming a chain. A call on the outer one becomes a chain of three method calls, each a virtual call resolved at run time.',
      'Since a decorator stores its inner object with the interface type, the compiler does not know how deep the chain is. Any `Drink` is accepted, including another decorator. That is why the number of combinations is unlimited without new classes.',
      '`Collections.unmodifiableList` returns an object of a hidden class that implements `List`, keeps a reference to your list, forwards every read method and throws `UnsupportedOperationException` from every write method. It is the same shape as `DrinkDecorator`, written by the JDK team.'
    ],
    tryIt: {
      steps: [
        'Copy `CoffeeShop.java` and run it with `java CoffeeShop.java`.',
        'Add a decorator `Caramel extends DrinkDecorator` that adds `" + caramel"` and 70 cents.',
        'In `main`, print `new Caramel(new Sugar(new Coffee()))`.',
        'Change the order to `new Sugar(new Caramel(new Coffee()))` and compare the text.'
      ],
      see: '`coffee + sugar + caramel: 290 cents` and then `coffee + caramel + sugar: 290 cents`: the same price, but the description follows the wrapping order.'
    },
    check: [
      { q: 'Which two facts about the decorator class make the pattern work?', a: 'It implements the component interface, and it holds a component in a field. So it can stand in for the original and also wrap another decorator.' },
      { q: 'Why can `new Milk(new Milk(new Coffee()))` work without a new class?', a: 'A `Milk` is a `Drink`, so another `Milk` can wrap it. Each wrapper adds its part to the result of the inner one.' },
      { q: 'Name a decorator in the JDK and what it adds.', a: 'For example `BufferedReader` (adds buffering and `readLine`), `LineNumberReader` (adds line counting) or `Collections.unmodifiableList` (adds a read-only restriction).' }
    ],
    keyPoints: [
      'A decorator implements the same interface as the object it wraps and holds it in a field.',
      'Each method delegates to the inner object and adds its own part.',
      'Decorators stack: wrap a wrapper, in any order and any number.',
      'n features need n classes instead of 2^n subclasses.',
      'Java I/O streams and `Collections.unmodifiableList` are decorators.'
    ],
    commonMistakes: [
      'Forgetting to delegate: `public int cents() { return 50; }` in `Milk` loses the coffee\'s price. Write `inner.cents() + 50`.',
      'Giving the decorator a different interface than the component. Then it cannot be wrapped again and is really an adapter.',
      'Checking the concrete class: `if (drink instanceof Coffee)` fails once the coffee is wrapped. Ask through the interface instead.',
      'Thinking `unmodifiableList` makes a frozen copy. It is a view: changes to the original still show. Use `List.copyOf(list)` for a real unchangeable copy.'
    ],
    related: ['Adapter', 'Facade', 'Strategy', 'IO Basics'],
    glossary: DP.glossary
  });
})();
