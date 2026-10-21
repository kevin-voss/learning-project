(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'adapter',
    num: '06',
    title: 'Adapter',
    category: 'structural',
    icon: '⇄',
    tagline: 'Make incompatible things work',
    realWorld: 'A travel plug adapter. Your charger has a plug from home, the wall in another country has different holes. You do not rebuild the charger or the wall. You put a small adapter in between, and both sides fit.',
    kid: [
      'You have a toy train with round wheels. Your friend has tracks with a different shape. The train does not fit on the tracks.',
      'You could saw your train apart, but you do not want to break it. So you build a little wagon that fits on the tracks below and holds your train on top. Now your train can ride on your friend\'s tracks.',
      'An **Adapter** is that little wagon. It sits between two things that do not fit, and it changes the shape so that they work together.'
    ],
    definition: 'The **Adapter** pattern wraps an object that has the wrong interface and makes it look like the interface your code expects. The adapter **translates** each call into a call the wrapped object understands.',
    explain: [
      'The **target** is the interface your code already uses (`TemperatureSensor` with `celsius()`). The **adaptee** is the class you want to use but that does not fit (`FahrenheitThermometer` with `readFahrenheit()`). Often the adaptee comes from a library, so you **cannot change** it.',
      'The **adapter** is a new class that **implements the target** and **holds the adaptee** in a field. Each target method calls the adaptee and converts what is needed: names, parameters, units or return types.',
      'The **client** keeps talking to the target interface. It does not know an adapter is involved, and none of its code changes.',
      'This is an **object adapter**: it uses composition (the adaptee is a field). There is also a class adapter that extends the adaptee, but Java has single inheritance, so the object form is the usual one.',
      'An adapter changes only the **shape** of the interface. It should not add new features. If you want to add behavior but keep the same interface, that is a Decorator (a later lesson).'
    ],
    why: 'Real programs mix code from many sources: libraries, old modules, other teams. Their interfaces rarely match. An adapter lets them work together without editing either side, and it keeps the translation in one class.',
    whenUse: 'When you want to use an existing class but its methods do not match the interface your code needs, and you cannot or should not change it. Not when you own both sides and can rename the method directly.',
    syntax: '`class Adapter implements Target { private final Adaptee adaptee; Adapter(Adaptee a) { adaptee = a; } public R targetMethod() { return convert(adaptee.otherMethod()); } }`.',
    pros: [
      'Use existing classes without changing them.',
      'Client code stays unchanged and keeps using its own interface.',
      'The translation lives in exactly one class.'
    ],
    cons: [
      'One more class and one more call per method.',
      'Many adapters can hide that two parts of a system really disagree.',
      'If the interfaces differ a lot, the adapter can get complex.'
    ],
    fileName: 'AdapterDemo.java',
    code: `import java.util.List;

interface TemperatureSensor { // target: what our code expects
    double celsius();
}

class RoomSensor implements TemperatureSensor {
    public double celsius() { return 21.5; }
}

class FahrenheitThermometer { // adaptee: from a library, cannot change
    double readFahrenheit() { return 98.6; }
}

class FahrenheitAdapter implements TemperatureSensor { // adapter
    private final FahrenheitThermometer thermometer;

    FahrenheitAdapter(FahrenheitThermometer thermometer) {
        this.thermometer = thermometer;
    }

    public double celsius() {
        double f = thermometer.readFahrenheit();
        return Math.round((f - 32) * 5 / 9 * 10) / 10.0; // translate units
    }
}

public class AdapterDemo {
    public static void main(String[] args) {
        List<TemperatureSensor> sensors = List.of(
            new RoomSensor(),
            new FahrenheitAdapter(new FahrenheitThermometer())
        );
        for (TemperatureSensor s : sensors) {
            System.out.println(s.celsius() + " C");
        }
    }
}`,
    output: `21.5 C
37.0 C`,
    codeSummary: 'The client loops over `TemperatureSensor`s. The Fahrenheit thermometer joins the list through an adapter that translates its reading into Celsius.',
    codeExplanation: [
      { label: 'Line 3', code: 'interface TemperatureSensor { // target: what our code expects', text: 'The target interface. All our code is written against it.' },
      { label: 'Line 11', code: 'class FahrenheitThermometer { // adaptee: from a library, cannot change', text: 'The adaptee. It works fine, but its method has the wrong name and the wrong unit.' },
      { label: 'Line 15', code: 'class FahrenheitAdapter implements TemperatureSensor { // adapter', text: 'The adapter implements the target, so it can go anywhere a `TemperatureSensor` is expected.' },
      { label: 'Line 16', code: 'private final FahrenheitThermometer thermometer;', text: 'It holds the adaptee in a field (composition). This is an object adapter.' },
      { label: 'Line 23', code: 'double f = thermometer.readFahrenheit();', text: 'The target method calls the adaptee\'s method: the name is translated.' },
      { label: 'Line 24', code: 'return Math.round((f - 32) * 5 / 9 * 10) / 10.0; // translate units', text: 'The value is translated too: Fahrenheit to Celsius, rounded to one decimal.' },
      { label: 'Line 30', code: 'List<TemperatureSensor> sensors = List.of(', text: 'The client only knows the target. A native sensor and an adapted one sit in the same list.' },
      { label: 'Line 32', code: 'new FahrenheitAdapter(new FahrenheitThermometer())', text: 'The adaptee is wrapped once, when it enters our code.' },
      { label: 'Line 35', code: 'System.out.println(s.celsius() + " C");', text: 'One call for every sensor. The loop has no special case for Fahrenheit.' }
    ],
    sections: [
      {
        title: 'The problem: special cases everywhere',
        text: [
          'Without an adapter, the foreign class cannot join the list of sensors. Every place that reads temperatures needs its own branch for it, and the conversion formula is copied into each one.'
        ],
        fileName: 'NoAdapter.java',
        code: `interface TemperatureSensor {
    double celsius();
}

class RoomSensor implements TemperatureSensor {
    public double celsius() { return 21.5; }
}

class FahrenheitThermometer {
    double readFahrenheit() { return 98.6; }
}

public class NoAdapter {
    public static void main(String[] args) {
        RoomSensor room = new RoomSensor();
        FahrenheitThermometer body = new FahrenheitThermometer();

        // Report 1
        System.out.println(room.celsius() + " C");
        System.out.println(Math.round((body.readFahrenheit() - 32) * 5 / 9 * 10) / 10.0 + " C");

        // Report 2, somebody forgot to convert
        System.out.println("Body: " + body.readFahrenheit() + " C");
    }
}`,
        output: `21.5 C
37.0 C
Body: 98.6 C`,
        warn: 'The pain: the conversion is copied, and the second report forgot it. "98.6 C" would be a deadly fever. An adapter puts the conversion in one place.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class TemperatureSensor {
    <<interface>>
    +celsius() double
  }
  class FahrenheitAdapter {
    -FahrenheitThermometer thermometer
    +celsius() double
  }
  class FahrenheitThermometer {
    +readFahrenheit() double
  }
  AdapterDemo --> TemperatureSensor : uses
  TemperatureSensor <|.. FahrenheitAdapter
  FahrenheitAdapter --> FahrenheitThermometer : wraps`,
        diagramNote: 'The adapter stands between the two: it implements the target (dotted triangle) and holds the adaptee (arrow). The client only has an arrow to the target.',
        text: [
          'Four roles: **client**, **target**, **adapter**, **adaptee**. The client and the adaptee never meet.'
        ]
      },
      {
        title: 'The order of calls',
        mermaid: `sequenceDiagram
  participant C as client
  participant A as FahrenheitAdapter
  participant T as FahrenheitThermometer
  C->>A: celsius()
  A->>T: readFahrenheit()
  T-->>A: 98.6
  A->>A: (98.6 - 32) * 5 / 9
  A-->>C: 37.0`,
        diagramNote: 'Each target call becomes an adaptee call plus a translation step. The client sees only the first and the last arrow.',
        text: [
          'Every call goes through the adapter: in with the target\'s words, out with the adaptee\'s words, and back with the answer translated.'
        ]
      },
      {
        title: 'Where Java itself uses it',
        text: [
          '`Arrays.asList(array)` adapts an array to the `List` interface. It does not copy: changes through the list show up in the array. `InputStreamReader` adapts a byte stream (`InputStream`) to a character stream (`Reader`), which you met in [I/O Basics](../io-basics/index.html).'
        ],
        fileName: 'JavaAdapters.java',
        code: `import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

public class JavaAdapters {
    public static void main(String[] args) throws IOException {
        String[] array = { "red", "green", "blue" };
        List<String> list = Arrays.asList(array); // array seen as a List
        list.set(0, "pink");
        System.out.println(array[0] + " " + list.size());

        InputStream bytes = new ByteArrayInputStream("first line".getBytes(StandardCharsets.UTF_8));
        BufferedReader reader = new BufferedReader(new InputStreamReader(bytes, StandardCharsets.UTF_8));
        System.out.println(reader.readLine()); // bytes adapted to text
    }
}`,
        output: `pink 3
first line`,
        tip: 'The list from `Arrays.asList` has a fixed size, because an array cannot grow. `list.add("x")` throws `UnsupportedOperationException`: the adapter cannot offer what the adaptee cannot do.'
      },
      {
        title: 'A lambda as a tiny adapter',
        text: [
          'If the target is a functional interface (one abstract method), a lambda can be the adapter. That is handy when the translation is one line.'
        ],
        fileName: 'LambdaAdapter.java',
        code: `interface TemperatureSensor {
    double celsius();
}

class FahrenheitThermometer {
    double readFahrenheit() { return 212.0; }
}

public class LambdaAdapter {
    static void report(TemperatureSensor sensor) {
        System.out.println("Now: " + sensor.celsius() + " C");
    }

    public static void main(String[] args) {
        FahrenheitThermometer kettle = new FahrenheitThermometer();
        report(() -> (kettle.readFahrenheit() - 32) * 5 / 9); // lambda adapter
    }
}`,
        output: `Now: 100.0 C`
      },
      {
        title: 'When not to use it, and how it differs from its neighbours',
        text: [
          'If you own both classes, rename the method or let the class implement the interface directly. An adapter for your own code is often a sign that the design should be fixed instead.',
          'Three structural patterns wrap objects. They differ in **why** they wrap.'
        ],
        table: {
          head: ['Pattern', 'Interface after wrapping', 'Purpose'],
          rows: [
            ['Adapter', 'a **different** interface (the target)', 'make something fit'],
            ['Decorator', 'the **same** interface', 'add behavior'],
            ['Facade', 'a **new, simpler** interface over many objects', 'hide complexity']
          ]
        }
      }
    ],
    technical: [
      'An adapter costs one extra method call per request. The JVM\'s just-in-time compiler (the part that turns hot bytecode into machine code while the program runs) usually **inlines** such small methods, so in practice the cost is close to zero.',
      'Because `FahrenheitAdapter` implements `TemperatureSensor`, the compiler accepts it anywhere a sensor is expected. That is the whole trick: type checking happens against the interface, so the client compiles without knowing the adapter exists.',
      '`Arrays.asList` returns an object of a private class inside `Arrays` that keeps a reference to your array. `get` and `set` read and write the array directly. Methods that would change the size are inherited from `AbstractList`, which throws `UnsupportedOperationException` by default.'
    ],
    tryIt: {
      steps: [
        'Copy `AdapterDemo.java` and run it with `java AdapterDemo.java`.',
        'Add a class `KelvinProbe` with a method `double kelvin()` that returns `300.15`.',
        'Write `KelvinAdapter implements TemperatureSensor` that holds a `KelvinProbe` and returns `kelvin() - 273.15`.',
        'Add `new KelvinAdapter(new KelvinProbe())` to the list and run again.'
      ],
      see: 'A third line `27.0 C`, with no change in the loop.'
    },
    check: [
      { q: 'Name the four roles of the Adapter pattern.', a: 'Client (uses the target), target (the interface the client expects), adaptee (the existing class that does not fit), adapter (implements the target and wraps the adaptee).' },
      { q: 'Why does the adapter hold the adaptee in a field instead of extending it?', a: 'Composition works even when the adaptee class is final or already has a parent, and Java allows only one superclass. It also keeps the adaptee\'s other methods hidden from the client.' },
      { q: 'What is the difference between an Adapter and a Decorator?', a: 'An adapter changes the interface so an object fits a different one. A decorator keeps the same interface and adds behavior.' }
    ],
    keyPoints: [
      'An adapter makes an existing object fit the interface your code expects.',
      'It implements the target and holds the adaptee in a field.',
      'Each target method translates names, parameters or units, then calls the adaptee.',
      'The client and the adaptee stay unchanged.',
      '`Arrays.asList` and `InputStreamReader` are adapters in the JDK.'
    ],
    commonMistakes: [
      'Copying the conversion into every caller instead of one adapter: `(f - 32) * 5 / 9` in five places. Put it in the adapter once.',
      'Letting the adapter add features such as logging or caching. Keep it a pure translation; put extra behavior in a decorator.',
      'Exposing the adaptee: a public `getThermometer()` on the adapter lets clients bypass the translation. Keep the field private.',
      'Calling `add` on the list from `Arrays.asList`. It has a fixed size. Use `new ArrayList<>(Arrays.asList(array))` when you need to grow it.'
    ],
    related: ['Decorator', 'Facade', 'Interfaces', 'IO Basics'],
    glossary: DP.glossary
  });
})();
