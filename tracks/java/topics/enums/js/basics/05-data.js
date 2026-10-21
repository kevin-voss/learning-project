// Enums, lesson 5: enums with fields, constructors and methods.
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-data',
      title: 'Enums That Carry Data',
      category: 'habits',
      icon: '+',
      tagline: 'Each constant is a small object',
      realWorld: 'Each coin has a name and a value stamped on it: a dime always says 10 cents. You never need a separate list to look the value up. An enum constant can carry its own values in the same way.',
      kid: [
        'Think of a box of coins. Each coin knows its own value. The small one says 1, the big one says 25.',
        'In Java, every enum card can have little facts written on its back. The PENNY card says “1 cent”. The QUARTER card says “25 cents”.',
        'You can also teach the cards tricks. A planet card can tell you how strong gravity is on that planet, because it knows how heavy and how big the planet is.'
      ],
      definition: 'An enum is a class with a fixed set of objects. So it can have **fields**, a **constructor** and **methods**. Each constant passes its own values to the constructor in round brackets: `DIME(10)`.',
      explain: [
        'Everything you know about classes from [Classes & Objects](../classes-and-objects/index.html) also works in an enum. The only difference: you do not create the objects with `new`. The list of constants at the top is the list of objects, and Java creates them for you.',
        'When a constant has values in brackets, like `DIME(10)`, Java calls the enum’s constructor with these values when it creates the `DIME` object. The constructor stores them in fields. After the last constant you need a semicolon `;`, then the fields, the constructor and the methods follow.',
        'The constructor of an enum is always **private**, even when you do not write `private`. Only the enum itself can call it, and only for the constants in its list. `new Coin(3)` anywhere else is a compile error: `enum classes may not be instantiated`. Writing `public` in front of the constructor is an error too.',
        'Make the fields `private final`. A constant exists once for the whole program, so its fields are shared by every part of the code. If a field could change, one part of the program could change it for all the others. With `final` the data is fixed, like the value stamped on a coin.',
        'Methods can use the fields to compute things. You call them on a constant like on any object: `Coin.DIME.cents()` or `planet.surfaceGravity()`.'
      ],
      why: 'The data lives right next to the choice. No separate lookup table, no `switch` that has to stay in sync with the list.',
      whenUse: 'When each choice has a label, a price, a size, a limit or a rule that belongs to it and never changes.',
      syntax: '`enum Name { A(value), B(value); private final Type field; Name(Type field) { this.field = field; } Type field() { return field; } }`',
      fileName: 'Coins.java',
      code: `enum Coin {
    PENNY(1, "penny"),
    NICKEL(5, "nickel"),
    DIME(10, "dime"),
    QUARTER(25, "quarter");

    private final int cents;
    private final String label;

    Coin(int cents, String label) {
        this.cents = cents;
        this.label = label;
    }

    int cents() {
        return cents;
    }

    String label() {
        return label;
    }
}

public class Coins {
    public static void main(String[] args) {
        for (Coin coin : Coin.values()) {
            System.out.println(coin + " is a " + coin.label() + ": " + coin.cents() + " cents");
        }

        Coin[] pocket = { Coin.DIME, Coin.QUARTER, Coin.QUARTER, Coin.PENNY };
        int total = 0;
        for (Coin coin : pocket) {
            total += coin.cents();
        }
        System.out.println("In my pocket: " + total + " cents");
    }
}`,
      output: `PENNY is a penny: 1 cents
NICKEL is a nickel: 5 cents
DIME is a dime: 10 cents
QUARTER is a quarter: 25 cents
In my pocket: 61 cents`,
      codeSummary: 'Each coin constant carries its value and a label. The program prints all coins and adds up a pocket full of them.',
      codeExplanation: [
        { label: 'Line 2', code: 'PENNY(1, "penny"),', text: 'A constant with arguments. When Java creates `PENNY`, it calls the constructor with `1` and `"penny"`.' },
        { label: 'Line 5', code: 'QUARTER(25, "quarter");', text: 'The semicolon ends the list of constants. It is required because more code follows.' },
        { label: 'Line 7', code: 'private final int cents;', text: 'Every constant has its own `cents` field. `final` means it is set once and never changes.' },
        { label: 'Line 10', code: 'Coin(int cents, String label) {', text: 'The constructor. No `public`: an enum constructor is always private.' },
        { label: 'Line 11', code: 'this.cents = cents;', text: '`this.cents` is the field, `cents` is the parameter. The same pattern as in any class.' },
        { label: 'Line 15', code: 'int cents() {', text: 'A normal method. It returns the field of the constant it is called on.' },
        { label: 'Line 27', code: 'System.out.println(coin + " is a " + coin.label() + ": " + coin.cents() + " cents");', text: '`coin` prints its name, `label()` and `cents()` read its fields.' },
        { label: 'Line 30', code: 'Coin[] pocket = { Coin.DIME, Coin.QUARTER, Coin.QUARTER, Coin.PENNY };', text: 'An array can hold the same constant twice. It holds two references to the one `QUARTER` object.' },
        { label: 'Line 33', code: 'total += coin.cents();', text: 'Adds up the values: 10 + 25 + 25 + 1 = 61.' }
      ],
      sections: [
        {
          title: 'The parts of an enum with data',
          text: [
            'An enum with data has a fixed order: first the constants, then a semicolon, then fields, constructor and methods. The diagram shows the `Coin` enum as a class with its four objects.'
          ],
          mermaid: `classDiagram
  class Coin {
    <<enumeration>>
    PENNY
    NICKEL
    DIME
    QUARTER
    -int cents
    -String label
    -Coin(int cents, String label)
    +cents() int
    +label() String
  }`,
          diagramNote: 'In a class diagram, `<<enumeration>>` marks an enum. The constants come first, then the private fields (`-`) and the methods.'
        },
        {
          title: 'A method that computes: the planets',
          text: [
            'Methods can do more than return a field. Here each planet knows its **mass** (in kilograms) and **radius** (in metres), and the method `surfaceGravity()` computes how strongly the planet pulls, with Newton’s formula g = G · m / r².',
            'A second method uses the first one to answer a question a child might ask: “How heavy would my 30 kg feel there?” `Math.round` rounds the numbers so the output stays short.'
          ],
          fileName: 'Planets.java',
          code: `enum Planet {
    MERCURY(3.303e23, 2.4397e6),
    EARTH(5.976e24, 6.37814e6),
    MARS(6.421e23, 3.3972e6),
    JUPITER(1.9e27, 7.1492e7);

    private static final double G = 6.673e-11;   // gravity constant

    private final double mass;     // kilograms
    private final double radius;   // metres

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() {
        return G * mass / (radius * radius);
    }

    long feelsLike(double kilos) {
        return Math.round(kilos * surfaceGravity() / EARTH.surfaceGravity());
    }
}

public class Planets {
    public static void main(String[] args) {
        for (Planet p : Planet.values()) {
            double g = Math.round(p.surfaceGravity() * 10) / 10.0;
            System.out.println(p + ": g = " + g + " m/s2, 30 kg feel like " + p.feelsLike(30) + " kg");
        }
    }
}`,
          output: `MERCURY: g = 3.7 m/s2, 30 kg feel like 11 kg
EARTH: g = 9.8 m/s2, 30 kg feel like 30 kg
MARS: g = 3.7 m/s2, 30 kg feel like 11 kg
JUPITER: g = 24.8 m/s2, 30 kg feel like 76 kg`,
          tip: 'A `static final` field like `G` belongs to the enum type, not to each constant. It is the right place for a value that all constants share.'
        },
        {
          title: 'Rules for the constructor',
          text: [
            'You cannot create a new enum object from outside, and you cannot make the constructor public. Both are compile errors. This is what keeps the list of constants fixed.'
          ],
          codeLanguage: 'text',
          fileName: 'javac output',
          code: `Coin c = new Coin(3, "three");
error: enum classes may not be instantiated

public Coin(int cents, String label) { ... }
error: modifier public not allowed here`,
          bullets: [
            'The constructor runs once per constant, when the enum is first used.',
            'Leave out `private`; it is there anyway. Writing it is allowed but adds nothing.',
            'A constant without brackets, like `PENNY`, calls a constructor without parameters. If the enum only has a constructor with parameters, every constant needs arguments.'
          ]
        },
        {
          title: 'Finding a constant by its data',
          text: [
            '`valueOf` finds a constant by its name. To find one by a field, write a small **static** method that loops over `values()` and compares. Return `null`, or throw an exception, when nothing matches.'
          ],
          fileName: 'CoinLookup.java',
          code: `enum Coin {
    PENNY(1), NICKEL(5), DIME(10), QUARTER(25);

    private final int cents;

    Coin(int cents) {
        this.cents = cents;
    }

    static Coin fromCents(int cents) {
        for (Coin coin : values()) {
            if (coin.cents == cents) {
                return coin;
            }
        }
        throw new IllegalArgumentException("no coin worth " + cents + " cents");
    }
}

public class CoinLookup {
    public static void main(String[] args) {
        System.out.println(Coin.fromCents(10));
        System.out.println(Coin.fromCents(25));
        try {
            Coin.fromCents(3);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
          output: `DIME
QUARTER
no coin worth 3 cents`
        },
        {
          title: 'Wrong vs right: a field that can change',
          text: [
            'Here a programmer stores a stock count inside the enum and changes it in one shop. Because `COFFEE` exists only once, the other shop sees the change too. Enum fields are shared by the whole program, so keep them `final` and store changing data somewhere else, like in an `EnumMap` (a lesson further down).'
          ],
          fileName: 'SharedStock.java',
          code: `enum Drink {
    COFFEE, TEA;

    int stock = 10;   // wrong: not final, shared by everyone
}

public class SharedStock {
    static void sellOne(String shop, Drink drink) {
        drink.stock = drink.stock - 1;
        System.out.println(shop + " sold one " + drink + ", stock now " + drink.stock);
    }

    public static void main(String[] args) {
        sellOne("Shop North", Drink.COFFEE);
        sellOne("Shop North", Drink.COFFEE);
        sellOne("Shop South", Drink.COFFEE);   // South never sold before
    }
}`,
          output: `Shop North sold one COFFEE, stock now 9
Shop North sold one COFFEE, stock now 8
Shop South sold one COFFEE, stock now 7`,
          warn: 'Shop South starts at 8, not 10, because both shops change the same object. Right: `private final` fields for fixed facts only. Keep counts in an `EnumMap<Drink, Integer>` per shop.'
        }
      ],
      technical: [
        'For `PENNY(1, "penny")` javac writes code into the enum’s static initializer that does `PENNY = new Coin("PENNY", 0, 1, "penny");`. The first two arguments, the name and the ordinal, are added by the compiler and go to the constructor of `java.lang.Enum`. Your own arguments come after them.',
        'This is the only place where `new Coin(...)` is allowed: inside the generated code of the enum. The JVM checks this too. Even with tricks like reflection (code that inspects and calls classes at run time), creating a new enum object fails with an exception.',
        'Each constant is a normal object on the **heap** (the memory area for objects) with its own copy of the instance fields. Static fields like `G` exist once for the type. The constants are created before the other static fields get their values. That is why javac forbids reading a static field of the enum in its constructor (`illegal reference to static field from initializer`), unless the field is a compile-time constant like `G`.'
      ],
      tryIt: {
        steps: [
          'Copy `Coins.java` and run it.',
          'Add a constant `HALF_DOLLAR(50, "half dollar")` before the semicolon.',
          'Put a `HALF_DOLLAR` into the `pocket` array and run again.',
          'Write `Coin extra = new Coin(3, "three");` in `main` and compile.'
        ],
        see: 'Five coins are listed and the pocket total grows by 50. The `new` line fails with `enum classes may not be instantiated`.'
      },
      check: [
        { q: 'Why does the list of constants need a `;` in `Coins.java`?', a: 'Because fields, a constructor and methods follow. The semicolon ends the list so Java knows where the rest of the class starts.' },
        { q: 'Who calls the enum constructor, and how often?', a: 'Java does, once for each constant, when the enum is first used. Your code never calls it with `new`.' },
        { q: 'Why should enum fields be `final`?', a: 'Each constant exists once and is shared by the whole program. A field that can change is changed for everyone at once.' }
      ],
      keyPoints: [
        'Constants can pass values to a constructor: `DIME(10)`.',
        'A `;` ends the constant list when more code follows.',
        'The enum constructor is always private; `new` is not allowed.',
        'Keep fields `private final`; constants are shared everywhere.',
        'Methods can compute with the fields, like `surfaceGravity()`.'
      ],
      commonMistakes: [
        '`PENNY(1), NICKEL(5) private final int cents;` without `;` after the last constant. Add the semicolon.',
        '`public Coin(int cents)`: `modifier public not allowed here`. Remove `public`.',
        '`int stock = 10;` as a changing field in an enum. Every user of the constant shares it. Keep enum fields final and store counts outside.',
        'Fields first, constants after them. The constants must be the first thing inside the enum body.'
      ],
      related: ['Classes & Objects', 'Collections']
    }
  ]);
})();
