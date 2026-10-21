// Enums, lesson 6: enums that implement interfaces.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-interfaces',
      title: 'Enums That Implement Interfaces',
      category: 'practice',
      icon: 'I',
      tagline: 'A fixed list that keeps a promise',
      realWorld: 'At a café, drinks come from a fixed menu, but cakes are baked fresh in any size. Both have a price tag. The cash register does not care what it is; it only reads the price tag.',
      kid: [
        'The café has a short list of drinks: water, coffee and tea. They are like enum cards.',
        'Cakes are different: the baker can make a new one any time. They are normal objects.',
        'But both promise one thing: “I have a price.” The cash register only asks for the price, so it can handle drinks and cakes in one basket.'
      ],
      definition: 'An enum can `implements` one or more interfaces, like a class. Its constants can then be used anywhere that interface type is expected, side by side with objects of normal classes.',
      explain: [
        'You know from [Interfaces](../interfaces/index.html) that an interface is a promise: “every type that implements me has these methods”. An enum can make that promise too: `enum Drink implements Priced { … }`.',
        'The enum must then implement every method of the interface. The method must be `public`, because interface methods are public. If you forget `public`, javac reports `attempting to assign weaker access privileges; was public`.',
        'Interfaces are the only way to give an enum a shared type with other classes. An enum cannot `extends` a class, because every enum already extends `java.lang.Enum`, and a Java class has exactly one superclass.',
        'Once `Drink` implements `Priced`, a `List<Priced>` can hold `Drink.COFFEE` and a `new Cake(...)` together. A method that works with `Priced` does not know or care which one it gets. That is the idea of “program to an interface” from the interfaces topic.',
        'Every enum already implements two interfaces without you writing them: `Comparable` (so enums can be sorted in declaration order) and `Serializable` (so they can be saved by Java’s built-in serialization).'
      ],
      why: 'Code that only needs one ability, like a price, can accept enum constants and normal objects alike.',
      whenUse: 'When a fixed list (an enum) and open-ended objects (classes) must be handled by the same code, or when two different enums share an ability.',
      syntax: '`enum Name implements SomeInterface { A, B; @Override public ReturnType method() { … } }`',
      fileName: 'Cafe.java',
      code: `import java.util.List;

interface Priced {
    int priceInCents();
}

enum Drink implements Priced {
    WATER(150), COFFEE(320), TEA(280);

    private final int cents;

    Drink(int cents) {
        this.cents = cents;
    }

    @Override
    public int priceInCents() {
        return cents;
    }
}

class Cake implements Priced {
    private final String name;
    private final int slices;

    Cake(String name, int slices) {
        this.name = name;
        this.slices = slices;
    }

    @Override
    public int priceInCents() {
        return slices * 250;
    }

    @Override
    public String toString() {
        return name + " x" + slices;
    }
}

public class Cafe {
    static int total(List<Priced> items) {
        int sum = 0;
        for (Priced item : items) {
            sum += item.priceInCents();
        }
        return sum;
    }

    public static void main(String[] args) {
        List<Priced> order = List.of(Drink.COFFEE, new Cake("cheesecake", 2), Drink.WATER);
        for (Priced item : order) {
            System.out.println(item + ": " + item.priceInCents() + " cents");
        }
        System.out.println("total: " + total(order) + " cents");
    }
}`,
      output: `COFFEE: 320 cents
cheesecake x2: 500 cents
WATER: 150 cents
total: 970 cents`,
      codeSummary: 'A drink enum and a cake class both implement `Priced`, so one list and one `total` method handle both.',
      codeExplanation: [
        { label: 'Line 3', code: 'interface Priced {', text: 'The promise: everything that is `Priced` can tell its price in cents.' },
        { label: 'Line 7', code: 'enum Drink implements Priced {', text: 'The enum keeps the promise. Every constant is now also a `Priced`.' },
        { label: 'Line 16', code: '@Override', text: 'Tells javac that this method comes from the interface. A typo in the name becomes a compile error.' },
        { label: 'Line 17', code: 'public int priceInCents() {', text: '`public` is required, because interface methods are public.' },
        { label: 'Line 22', code: 'class Cake implements Priced {', text: 'A normal class keeps the same promise. Cakes are not a fixed list, so they are a class.' },
        { label: 'Line 43', code: 'static int total(List<Priced> items) {', text: 'This method only knows `Priced`. It works for drinks, cakes and any future `Priced` type.' },
        { label: 'Line 52', code: 'List<Priced> order = List.of(Drink.COFFEE, new Cake("cheesecake", 2), Drink.WATER);', text: 'Enum constants and objects side by side in one list of the interface type.' },
        { label: 'Line 54', code: 'System.out.println(item + ": " + item.priceInCents() + " cents");', text: 'Each item uses its own `toString()` and its own `priceInCents()`.' }
      ],
      sections: [
        {
          title: 'The picture: who keeps the promise',
          mermaid: `classDiagram
  class Priced {
    <<interface>>
    +priceInCents() int
  }
  class Drink {
    <<enumeration>>
    WATER
    COFFEE
    TEA
    +priceInCents() int
  }
  class Cake {
    -String name
    -int slices
    +priceInCents() int
  }
  Priced <|.. Drink
  Priced <|.. Cake`,
          diagramNote: 'The dashed arrows with a hollow tip mean “implements”. `Cafe.total` only talks to `Priced`.'
        },
        {
          title: 'Why not extends?',
          text: [
            'A beginner might try to give `Drink` a common superclass `Product`. That does not work. Every enum secretly extends `java.lang.Enum` already, and Java allows only one superclass, so the grammar has no place for `extends` after an enum name. javac gets confused and prints several errors; the first one is the important one.'
          ],
          codeLanguage: 'text',
          fileName: 'javac output',
          code: `class Product { }

enum Drink extends Product { WATER, COFFEE }

Ext.java:3: error: '{' expected
enum Drink extends Product { WATER, COFFEE }
          ^
Ext.java:3: error: enum constant expected here
enum Drink extends Product { WATER, COFFEE }
           ^
... and three more errors`,
          tip: 'If you want shared behaviour, write an interface. If you need a shared method body, an interface can have a `default` method.'
        },
        {
          title: 'Two enums, one interface',
          text: [
            'Two different enums can implement the same interface. A menu printer then works with both lists, and with any list you add later. The method below takes an array of `Priced`, so it accepts `Drink.values()` and `Snack.values()`.'
          ],
          fileName: 'Menu.java',
          code: `interface Priced {
    int priceInCents();
}

enum Drink implements Priced {
    COFFEE(320), TEA(280);

    private final int cents;
    Drink(int cents) { this.cents = cents; }
    @Override public int priceInCents() { return cents; }
}

enum Snack implements Priced {
    COOKIE(180), MUFFIN(290);

    private final int cents;
    Snack(int cents) { this.cents = cents; }
    @Override public int priceInCents() { return cents; }
}

public class Menu {
    static void print(String title, Priced[] items) {
        System.out.println(title);
        for (Priced item : items) {
            System.out.println("  " + item + " " + item.priceInCents());
        }
    }

    public static void main(String[] args) {
        print("Drinks", Drink.values());
        print("Snacks", Snack.values());
    }
}`,
          output: `Drinks
  COFFEE 320
  TEA 280
Snacks
  COOKIE 180
  MUFFIN 290`
        },
        {
          title: 'The interfaces every enum already has',
          text: [
            'Because `java.lang.Enum` implements `Comparable` and `Serializable`, every enum constant is both. `Comparable` is why you can sort a list of enum constants: they come out in declaration order, not in alphabetical order.'
          ],
          fileName: 'SortSizes.java',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

enum Size { SMALL, MEDIUM, LARGE }

public class SortSizes {
    public static void main(String[] args) {
        List<Size> sizes = new ArrayList<>(List.of(Size.LARGE, Size.SMALL, Size.MEDIUM, Size.SMALL));
        Collections.sort(sizes);
        System.out.println(sizes);
        System.out.println(Size.SMALL instanceof Comparable);
        System.out.println(Size.SMALL instanceof java.io.Serializable);
    }
}`,
          output: `[SMALL, SMALL, MEDIUM, LARGE]
true
true`
        }
      ],
      technical: [
        'javac generates `final class Drink extends Enum<Drink> implements Priced`. The interface becomes part of the class file like for any class, so `Drink.COFFEE instanceof Priced` is `true`.',
        'A call like `item.priceInCents()` on a `Priced` variable is an **interface call**. At run time the JVM looks at the real class of the object (`Drink` or `Cake`) and runs that class’s method. The calling code was compiled once and works for every class that implements the interface.',
        '`Enum` is declared as `Enum<E extends Enum<E>> implements Comparable<E>, Serializable`. That generic type makes sure you can only compare a `Size` with another `Size`, never with a `Drink`.'
      ],
      tryIt: {
        steps: [
          'Copy `Cafe.java` and run it.',
          'Add `JUICE(390)` to `Drink` and put `Drink.JUICE` into the order.',
          'Remove `public` from `priceInCents()` in `Drink` and compile.',
          'Put `public` back and run again.'
        ],
        see: 'The total grows to 1360 cents. Without `public`: `attempting to assign weaker access privileges; was public`.'
      },
      check: [
        { q: 'Can an enum extend a class?', a: 'No. Every enum already extends `java.lang.Enum`, and Java allows only one superclass. Use an interface instead.' },
        { q: 'Why must `priceInCents()` in the enum be `public`?', a: 'Interface methods are public. An implementation may not make a method less visible.' },
        { q: 'In what order does `Collections.sort` put enum constants?', a: 'In declaration order, because `compareTo` of an enum compares the ordinals.' }
      ],
      keyPoints: [
        'An enum can implement any number of interfaces.',
        'Implemented methods must be `public`.',
        'An enum cannot extend a class; it already extends `Enum`.',
        'Enum constants and class objects can share one interface type.',
        'Every enum is already `Comparable` and `Serializable`.'
      ],
      commonMistakes: [
        '`enum Drink extends Product`: does not compile. Write an interface `Product` and use `implements`.',
        '`int priceInCents()` without `public` in the enum: weaker access error. Add `public`.',
        'Making a fixed menu a class with public constructor. Anyone can then create new drinks. If the list is fixed, use an enum; if it is open, use a class; let both implement the interface.'
      ],
      related: ['Interfaces', 'Collections']
    }
  ]);
})();
