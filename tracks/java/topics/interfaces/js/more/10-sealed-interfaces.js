// Interfaces, lesson 10 (Deeper): sealed interfaces (Java 17+) and exhaustive switch.
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'sealed-interfaces',
      title: 'Sealed Interfaces',
      category: 'deeper',
      icon: '🔒',
      tagline: 'A promise with a closed guest list',
      realWorld: 'A birthday party with a guest list at the door: only Mia, Leo and Ava may come in. Because the list is closed, the host knows exactly how many party bags to prepare.',
      kid: [
        'A normal interface is like a playground: any child may come and play, also children you have never met.',
        'A **sealed** interface is like a party with a list on the door. Only the names on the list may join.',
        'Because you know every guest, you can check: "Did I give a present to **everyone**?" Java can check that for you too.'
      ],
      definition: 'A **sealed interface** (Java 17 and later) names all classes that may implement it with `permits`. No other class can implement it. The compiler then knows every possible kind, so a `switch` over it can be checked for completeness.',
      explain: [
        'Normally anyone can implement your interface, at any time. That is the point of polymorphism. But sometimes the set of kinds is fixed by nature: a traffic light is red, yellow or green; a payment is cash, card or voucher. Then you want to say "these, and only these".',
        'You write `sealed interface Payment permits Cash, Card, Voucher`. Every permitted class must implement `Payment` and must itself say how it may be extended: `final` (no subclasses), `sealed` (its own closed list) or `non-sealed` (open again). A **record** is automatically `final`, so records are the usual choice.',
        'The reward is the **exhaustive switch**. "Exhaustive" means "covers everything". In `switch (payment) { case Cash c -> …; case Card c -> …; case Voucher v -> …; }` the compiler sees that all three kinds are covered, so you need no `default`. If you forget one, it does not compile: `the switch expression does not cover all possible input values`.',
        'Better still: when you add a fourth kind to the `permits` list later, every switch that forgot it stops compiling. The compiler shows you every place you must update. With an open interface and a `default` branch, the new kind would slip through silently.',
        'A `case` can also take a record apart: `case Circle(double r) -> …` gives you the component `r` directly. This is a **record pattern** (Java 21).'
      ],
      why: 'When the list of kinds is fixed, a sealed interface lets the compiler check that every `switch` handles every kind, now and after future changes.',
      whenUse: 'For a small, fixed family of data types: shapes in a drawing app, results that are "success or error", commands in a game. Not for plugin-style interfaces that others should implement.',
      syntax: '`sealed interface Name permits A, B, C { … }` · `record A(…) implements Name { }` · `switch (x) { case A a -> …; case B b -> …; case C c -> …; }`',
      fileName: 'Payments.java',
      code: `sealed interface Payment permits Cash, Card, Voucher {}

record Cash(int cents) implements Payment {}
record Card(int cents, String last4) implements Payment {}
record Voucher(String code) implements Payment {}

public class Payments {
    static String describe(Payment p) {
        return switch (p) {                 // no default needed
            case Cash c -> "cash: " + c.cents() + " cents";
            case Card c -> "card ending " + c.last4() + ": " + c.cents() + " cents";
            case Voucher v -> "voucher " + v.code();
        };
    }

    static int fee(Payment p) {
        return switch (p) {
            case Cash c -> 0;
            case Card(int cents, String last4) -> cents / 100;   // record pattern
            case Voucher v -> 0;
        };
    }

    public static void main(String[] args) {
        Payment[] today = { new Cash(500), new Card(2500, "4242"), new Voucher("SUMMER") };
        for (Payment p : today) {
            System.out.println(describe(p) + " (fee " + fee(p) + ")");
        }
    }
}`,
      output: `cash: 500 cents (fee 0)
card ending 4242: 2500 cents (fee 25)
voucher SUMMER (fee 0)`,
      codeSummary: 'A sealed interface with exactly three records. Two switch expressions handle all three kinds without a `default`, and the compiler checks that none is missing.',
      codeExplanation: [
        { label: 'Line 1', code: 'sealed interface Payment permits Cash, Card, Voucher {}', text: '`sealed` closes the list, `permits` names every allowed class. The interface has no methods here; it only groups the kinds.' },
        { label: 'Line 3', code: 'record Cash(int cents) implements Payment {}', text: 'A permitted kind. Records are automatically `final`, which a sealed hierarchy requires.' },
        { label: 'Line 4', code: 'record Card(int cents, String last4) implements Payment {}', text: 'Each kind may carry different data. A card also knows its last four digits.' },
        { label: 'Line 9', code: 'return switch (p) {                 // no default needed', text: 'A switch expression over the sealed type. It returns a value, so it must cover every case.' },
        { label: 'Line 10', code: 'case Cash c -> "cash: " + c.cents() + " cents";', text: 'A type pattern: if `p` is a `Cash`, it is available as `c` with the type `Cash`.' },
        { label: 'Line 12', code: 'case Voucher v -> "voucher " + v.code();', text: 'The third and last kind. All permitted classes are covered, so the compiler is happy without `default`.' },
        { label: 'Line 19', code: 'case Card(int cents, String last4) -> cents / 100;   // record pattern', text: 'A record pattern takes the card apart and gives you `cents` and `last4` as variables directly.' },
        { label: 'Line 25', code: 'Payment[] today = { new Cash(500), new Card(2500, "4242"), new Voucher("SUMMER") };', text: 'Polymorphism as usual: an array of the interface type holds all three kinds.' }
      ],
      mermaid: `classDiagram
  class Payment {
    <<sealed interface>>
  }
  class Cash {
    <<record>>
    int cents
  }
  class Card {
    <<record>>
    int cents
    String last4
  }
  class Voucher {
    <<record>>
    String code
  }
  Payment <|.. Cash
  Payment <|.. Card
  Payment <|.. Voucher`,
      visualLabel: 'A closed family',
      visualNote: 'These three arrows are **all** the arrows there can ever be. Any other `implements Payment` is a compile error.',
      sections: [
        {
          title: 'Open vs sealed',
          table: {
            head: ['', 'Normal interface', 'Sealed interface'],
            rows: [
              ['Who may implement it?', 'any class, anywhere, any time', 'only the classes after `permits`'],
              ['Switch over it', 'needs a `default` branch', 'no `default` if all kinds are covered'],
              ['Adding a new kind', 'old switches silently use `default`', 'old switches stop compiling until updated'],
              ['Good for', 'plugins, strategies, things others extend', 'a fixed family of data types']
            ],
            note: 'If all permitted classes are in the same file as the sealed interface, you may even leave out `permits`; Java collects them for you.'
          }
        },
        {
          title: 'The compiler guards the list',
          text: [
            'Two things are checked: nobody outside the list implements the interface, and every switch covers every kind.'
          ],
          mermaid: `flowchart TD
  A["record Hexagon implements Payment"] --> B{"Is Hexagon in permits?"}
  B -- no --> C["error: class is not allowed to extend sealed class"]
  D["switch over Payment"] --> E{"Cash, Card and Voucher all covered?"}
  E -- yes --> F["compiles, no default needed"]
  E -- no --> G["error: the switch does not cover all possible input values"]`,
          diagramNote: 'Both checks happen at compile time. A forgotten kind never reaches the user.'
        },
        {
          title: 'Wrong vs right: the forgotten case',
          text: [
            'Below, the `Triangle` case is missing. `javac` refuses the file. The fix: add `case Triangle t -> t.base() * t.height() / 2;`.'
          ],
          fileName: 'Areas.java',
          noRun: true,
          code: `sealed interface Shape permits Circle, Square, Triangle {}
record Circle(double radius) implements Shape {}
record Square(double side) implements Shape {}
record Triangle(double base, double height) implements Shape {}

public class Areas {
    static double area(Shape shape) {
        return switch (shape) {
            case Circle c -> Math.PI * c.radius() * c.radius();
            case Square s -> s.side() * s.side();
            // Triangle forgotten!
        };
    }

    public static void main(String[] args) {
        System.out.println(area(new Square(2)));
    }
}`,
          output: `Areas.java:8: error: the switch expression does not cover all possible input values
        return switch (shape) {
               ^
1 error`,
          warn: 'Do not "fix" this with `default -> 0;`. It compiles, but then a new kind gets area 0 without any warning. Without `default` the compiler keeps guarding you.'
        },
        {
          title: 'Sealed with methods, and final, sealed or non-sealed',
          text: [
            'A sealed interface can still promise methods like any interface. Here every light promises `next()`. `Green` is a normal `final class` instead of a record, to show that classes work too.'
          ],
          fileName: 'TrafficLight.java',
          code: `sealed interface Light permits Red, Yellow, Green {
    Light next();
}

record Red() implements Light {
    @Override public Light next() { return new Green(); }
}

record Yellow() implements Light {
    @Override public Light next() { return new Red(); }
}

final class Green implements Light {          // a class must say final, sealed or non-sealed
    @Override public Light next() { return new Yellow(); }
    @Override public String toString() { return "Green[]"; }
}

public class TrafficLight {
    public static void main(String[] args) {
        Light light = new Red();
        for (int i = 0; i < 4; i++) {
            String action = switch (light) {
                case Red r -> "stop";
                case Yellow y -> "wait";
                case Green g -> "go";
            };
            System.out.println(light + " -> " + action);
            light = light.next();
        }
    }
}`,
          output: `Red[] -> stop
Green[] -> go
Yellow[] -> wait
Red[] -> stop`,
          tip: 'If the kinds carry no data at all, like these lights, an [enum](../enums/index.html) (the next topic) is often simpler. Sealed interfaces shine when each kind has its own fields.'
        }
      ],
      technical: [
        'The class file of a sealed interface gets a `PermittedSubclasses` attribute with the list from `permits`. The JVM checks it when it loads a class: a class that implements `Payment` but is not on the list fails to load, even if someone compiled it separately.',
        'For a switch over a sealed type the compiler proves coverage from that list. It still adds a hidden safety net: if a new kind sneaks in without recompiling the switch, the switch throws `MatchException` at run time instead of doing something wrong.',
        'Pattern matching switches compile to an `invokedynamic` call to `SwitchBootstraps.typeSwitch`, which finds the matching `case` by the class of the object. Record patterns then call the record accessors (`cents()`, `last4()`) to fill the variables.',
        '`sealed`, `non-sealed` and `permits` are **contextual keywords**: they only have a special meaning in a class or interface header, so old code that used `permits` as a variable name still compiles.'
      ],
      tryIt: {
        steps: [
          'Run `Payments.java`.',
          'Add `record GiftCard(int cents) implements Payment {}` without changing `permits`. Compile and read the error.',
          'Add `GiftCard` to the `permits` list. Compile again and read the new errors.',
          'Add a `case GiftCard g -> …` to both switches and run.'
        ],
        see: 'first `class is not allowed to extend sealed class: Payment`, then `the switch expression does not cover all possible input values` twice, once per switch. After adding the cases, the program runs again.'
      },
      check: [
        { q: 'What does `permits` do in `sealed interface Payment permits Cash, Card, Voucher`?', a: 'It lists the only classes that may implement `Payment`. Any other class that tries is a compile error.' },
        { q: 'Why does the switch over a sealed type need no `default`?', a: 'The compiler knows every permitted kind. If every kind has a `case`, nothing else can arrive.' },
        { q: 'Why are records a good fit for the permitted classes?', a: 'A permitted class must be `final`, `sealed` or `non-sealed`, and records are automatically `final`. They are also short and carry data.' }
      ],
      keyPoints: [
        '`sealed … permits A, B, C` closes the list of implementing classes (Java 17+).',
        'Permitted classes must be `final`, `sealed` or `non-sealed`; records are final automatically.',
        'A switch over a sealed type is checked for completeness: no `default` needed.',
        'Adding a new kind makes every incomplete switch fail to compile, which shows you what to update.',
        'Record patterns like `case Card(int cents, String last4)` take the data apart in the `case`.'
      ],
      commonMistakes: [
        'Adding `default -> …` to a switch over a sealed type. Fix: list every kind, so the compiler can warn you about new ones.',
        'A permitted class without `final`, `sealed` or `non-sealed`: `class Green implements Light`. Fix: `final class Green implements Light`, or use a record.',
        'Forgetting to add a new class to `permits`. Fix: list it, or keep all kinds in the same file and leave `permits` out.',
        'Sealing an interface that others should extend (a plugin interface). Fix: keep it open; sealed is for fixed families.'
      ],
      related: ['interface-polymorphism', 'lambdas', 'Enums']
    }
  ]);
})();
