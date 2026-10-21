(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'factory-method',
    num: '03',
    title: 'Factory Method',
    category: 'creational',
    icon: '⬡',
    tagline: 'Let subclasses decide what to create',
    realWorld: 'A delivery company with two offices. The boss tells every office the same thing: "plan this delivery". The road office picks a truck, the harbour office picks a ship. The boss never needs to know which vehicle each office uses.',
    kid: [
      'Think of a toy factory with two machines. Both machines have the same button: "make a toy". The red machine makes cars. The blue machine makes boats.',
      'The person who wraps the toys does not care which machine she stands next to. She presses the button, gets a toy, wraps it, and puts a bow on it. The wrapping is always the same.',
      'A **Factory Method** is that button. The wrapping steps are written once. Which toy comes out depends on which machine you have.'
    ],
    definition: 'The **Factory Method** pattern puts object creation into a method (the **factory method**). A base class calls that method in its normal work, and each **subclass** overrides it to decide which concrete class is created.',
    explain: [
      'There are four roles. The **product** is the interface of the things being made (`Transport`). The **concrete products** are the real classes (`Truck`, `Ship`). The **creator** is a base class that needs a product for its work (`Logistics`). The **concrete creators** are subclasses that decide which product to make (`RoadLogistics`, `SeaLogistics`).',
      'The creator declares the factory method, often `abstract`: `abstract Transport createTransport();`. Its other methods call it, for example `planDelivery` calls `createTransport()` and then uses the result. The creator never writes `new Truck()` itself.',
      'Each concrete creator overrides the factory method with one line: `return new Truck();`. Because of polymorphism, `planDelivery` written in the base class runs the subclass\'s `createTransport()`. You learned this in [Classes and Objects](../classes-and-objects/index.html) (inheritance and polymorphism).',
      'The win: to support a new kind of transport you **add** two classes (a product and a creator) and **edit** none. This follows the **open/closed principle**: open for extension, closed for modification.',
      'In everyday Java the word "factory method" is also used for a simpler idea: a **static method** that creates objects instead of a constructor, such as `List.of(…)` or `Integer.valueOf(…)`. That is not the subclass pattern, but it shares the goal: the caller asks for an object and does not call `new` on a concrete class. Both forms are shown below.'
    ],
    why: 'When code writes `new Truck()` directly, it is tied to that class. Each new vehicle means editing every place that creates one, usually in a growing `if` chain. A factory method keeps the creation in one overridable spot.',
    whenUse: 'When a class has a fixed workflow but the object it works with should vary, or when a library should let its users plug in their own classes. Not when there is one product and no sign of a second: then `new` is clearer.',
    syntax: '`abstract class Creator { abstract Product create(); void work() { Product p = create(); … } }` and `class ConcreteCreator extends Creator { Product create() { return new ConcreteProduct(); } }`.',
    pros: [
      'The workflow code does not depend on concrete classes.',
      'Add a new product by adding classes, without editing tested code.',
      'Creation lives in one place per variant.'
    ],
    cons: [
      'One extra creator subclass for each product.',
      'More classes to read for a beginner.',
      'Overkill when there is only one product.'
    ],
    fileName: 'FactoryMethodDemo.java',
    code: `import java.util.List;

interface Transport { // product
    String deliver(String cargo);
}

class Truck implements Transport {
    public String deliver(String cargo) { return "Truck drives " + cargo + " by road"; }
}

class Ship implements Transport {
    public String deliver(String cargo) { return "Ship carries " + cargo + " by sea"; }
}

abstract class Logistics { // creator
    abstract Transport createTransport(); // the factory method

    void planDelivery(String cargo) {
        Transport t = createTransport();
        System.out.println(t.deliver(cargo));
    }
}

class RoadLogistics extends Logistics {
    Transport createTransport() { return new Truck(); }
}

class SeaLogistics extends Logistics {
    Transport createTransport() { return new Ship(); }
}

public class FactoryMethodDemo {
    public static void main(String[] args) {
        List<Logistics> offices = List.of(new RoadLogistics(), new SeaLogistics());
        for (Logistics office : offices) {
            office.planDelivery("laptops");
        }
    }
}`,
    output: `Truck drives laptops by road
Ship carries laptops by sea`,
    codeSummary: '`planDelivery` is written once in the base class. Which transport it uses depends on the subclass, because each subclass overrides `createTransport()`.',
    codeExplanation: [
      { label: 'Line 3', code: 'interface Transport { // product', text: 'The product role. The workflow code only knows this interface.' },
      { label: 'Line 7', code: 'class Truck implements Transport {', text: 'A concrete product. `Ship` is the second one.' },
      { label: 'Line 15', code: 'abstract class Logistics { // creator', text: 'The creator. It is abstract because it does not know which product to make.' },
      { label: 'Line 16', code: 'abstract Transport createTransport(); // the factory method', text: 'The factory method: no body here. Each subclass must fill it in. Its return type is the interface.' },
      { label: 'Line 19', code: 'Transport t = createTransport();', text: 'The base class asks for a product without naming a class. At run time Java calls the subclass\'s version.' },
      { label: 'Line 20', code: 'System.out.println(t.deliver(cargo));', text: 'The shared workflow uses the product through the interface.' },
      { label: 'Line 25', code: 'Transport createTransport() { return new Truck(); }', text: 'The only place where `new Truck()` appears. The concrete creator decides.' },
      { label: 'Line 34', code: 'List<Logistics> offices = List.of(new RoadLogistics(), new SeaLogistics());', text: 'The client holds creators by their base type. `List.of` is itself a static factory method.' },
      { label: 'Line 36', code: 'office.planDelivery("laptops");', text: 'Same call for both offices, different vehicles. No `if` on a type name anywhere.' }
    ],
    sections: [
      {
        title: 'The problem: a growing if chain around new',
        text: [
          'Without the pattern, the workflow decides the class itself with a string and an `if` chain. Every method that needs a vehicle repeats that chain.',
          'To add planes you must find and edit every chain. Forget one, and that method silently does the wrong thing.'
        ],
        fileName: 'NoFactory.java',
        code: `class Truck {
    String deliver(String cargo) { return "Truck drives " + cargo + " by road"; }
}

class Ship {
    String deliver(String cargo) { return "Ship carries " + cargo + " by sea"; }
}

public class NoFactory {
    static void planDelivery(String type, String cargo) {
        if (type.equals("road")) {
            System.out.println(new Truck().deliver(cargo));
        } else if (type.equals("sea")) {
            System.out.println(new Ship().deliver(cargo));
        } else {
            System.out.println("Unknown transport: " + type);
        }
    }

    public static void main(String[] args) {
        planDelivery("road", "laptops");
        planDelivery("sea", "laptops");
        planDelivery("air", "laptops"); // new type, old code
    }
}`,
        output: `Truck drives laptops by road
Ship carries laptops by sea
Unknown transport: air`,
        warn: 'The pain: `planDelivery` knows every vehicle class. Each new vehicle means editing it, and a typo like `"Road"` falls through to "Unknown" at run time, not at compile time.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class Logistics {
    <<abstract>>
    +createTransport()* Transport
    +planDelivery(String) void
  }
  class Transport {
    <<interface>>
    +deliver(String) String
  }
  Logistics <|-- RoadLogistics
  Logistics <|-- SeaLogistics
  Transport <|.. Truck
  Transport <|.. Ship
  Logistics ..> Transport : uses
  RoadLogistics ..> Truck : creates
  SeaLogistics ..> Ship : creates`,
        diagramNote: 'A solid line with a hollow triangle means "extends". A `*` after a method means abstract. Dashed arrows mean "uses" or "creates". Two parallel families: creators on the left, products on the right.',
        text: [
          'The creators form one class hierarchy, the products another. Each concrete creator is paired with one concrete product.'
        ]
      },
      {
        title: 'The order of calls',
        text: [
          'The order is the point of this pattern: the base class method starts, calls down into the subclass to create, then goes on with the result.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant R as RoadLogistics
  participant T as Truck
  M->>R: planDelivery("laptops")
  R->>R: createTransport(), overridden here
  R->>T: new Truck()
  R->>T: deliver("laptops")
  T-->>R: "Truck drives laptops by road"
  R-->>M: prints the line`,
        diagramNote: '`planDelivery` is inherited from `Logistics`, but it runs on the `RoadLogistics` object, so its `createTransport()` is the one that runs.'
      },
      {
        title: 'Adding a new product without editing old code',
        text: [
          'Planes arrive. You add `Plane` and `AirLogistics`. `Logistics`, `Truck`, `Ship` and the two old creators stay exactly as they were.'
        ],
        fileName: 'AddPlane.java',
        code: `interface Transport {
    String deliver(String cargo);
}

class Truck implements Transport {
    public String deliver(String cargo) { return "Truck drives " + cargo + " by road"; }
}

abstract class Logistics {
    abstract Transport createTransport();

    void planDelivery(String cargo) {
        System.out.println(createTransport().deliver(cargo));
    }
}

class RoadLogistics extends Logistics {
    Transport createTransport() { return new Truck(); }
}

// New: two classes added, nothing above was changed.
class Plane implements Transport {
    public String deliver(String cargo) { return "Plane flies " + cargo + " through the air"; }
}

class AirLogistics extends Logistics {
    Transport createTransport() { return new Plane(); }
}

public class AddPlane {
    public static void main(String[] args) {
        new RoadLogistics().planDelivery("books");
        new AirLogistics().planDelivery("medicine");
    }
}`,
        output: `Truck drives books by road
Plane flies medicine through the air`
      },
      {
        title: 'The everyday cousin: a static factory method',
        text: [
          'Often you do not need subclasses. A **static factory method** is a static method that returns a new object, chosen by its parameter. The `if` chain now lives in **one** method, and callers depend only on the interface.',
          'Java is full of them: `List.of`, `Integer.valueOf`, `LocalDate.of`. And `iterator()` on every collection is a real subclass factory method: each collection class overrides it and returns its own iterator class.'
        ],
        fileName: 'StaticFactory.java',
        code: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

interface Shape {
    double area();

    static Shape of(String kind, double size) { // static factory method
        return switch (kind) {
            case "square" -> new Square(size);
            case "circle" -> new Circle(size);
            default -> throw new IllegalArgumentException("Unknown shape: " + kind);
        };
    }
}

record Square(double side) implements Shape {
    public double area() { return side * side; }
}

record Circle(double radius) implements Shape {
    public double area() { return Math.round(Math.PI * radius * radius * 100) / 100.0; }
}

public class StaticFactory {
    public static void main(String[] args) {
        System.out.println(Shape.of("square", 3).area());
        System.out.println(Shape.of("circle", 1).area());

        // Java's own factory methods
        System.out.println(Integer.valueOf(127) == Integer.valueOf(127));
        System.out.println(new ArrayList<String>().iterator().getClass().getName());
        System.out.println(new HashSet<String>().iterator().getClass().getName());
    }
}`,
        output: `9.0
3.14
true
java.util.ArrayList$Itr
java.util.HashMap$KeyIterator`,
        tip: '`Integer.valueOf(127)` returns a cached object, so `==` is `true` for small numbers. A constructor must always make a new object; a factory method may reuse one. That freedom is a big reason to prefer factory methods.'
      },
      {
        title: 'When not to use it',
        text: [
          'If there is one product and no real second one in sight, `new Truck()` is the clearest code. Adding an abstract creator "for later" means more classes to read today.',
          'If the variants differ only in a small behavior and not in the class they create, pass a strategy object instead (see the Strategy lesson below). And if you need several related products that must match, look at Abstract Factory next.'
        ],
        table: {
          head: ['Situation', 'Better choice'],
          rows: [
            ['One product, no variants', 'Plain `new`'],
            ['Pick one class from a parameter, in one spot', 'Static factory method'],
            ['A workflow in a base class, subclasses pick the product', 'Factory Method'],
            ['Several products that must belong together', 'Abstract Factory']
          ]
        }
      }
    ],
    technical: [
      'The call `createTransport()` inside `planDelivery` is a virtual call: the compiler writes an `invokevirtual` instruction, and at run time the JVM looks up the method in the class of the real object. That lookup is what lets code in the base class run code from a subclass it has never heard of.',
      'An abstract method has no body in the `.class` file, only its signature. The compiler forces every non-abstract subclass to implement it, so `planDelivery` can never call a missing method.',
      'A static factory method is an ordinary static method; it has a name (constructors do not), it can return a subtype, and it can return a cached object. The JDK uses these freedoms: `Integer.valueOf` caches the values from -128 to 127, and `List.of` returns hidden, unchangeable list classes you never name.'
    ],
    tryIt: {
      steps: [
        'Copy `FactoryMethodDemo.java` and run it with `java FactoryMethodDemo.java`.',
        'Add a class `Bike implements Transport` whose `deliver` returns `"Bike rides " + cargo + " through the city"`.',
        'Add a class `CityLogistics extends Logistics` whose `createTransport()` returns `new Bike()`.',
        'Add `new CityLogistics()` to the list in `main` and run again.'
      ],
      see: 'A third line `Bike rides laptops through the city`, while `Logistics`, `Truck` and `Ship` stay unchanged.'
    },
    check: [
      { q: 'Which class calls the factory method, and which class implements it?', a: 'The creator base class (`Logistics`) calls it inside its workflow (`planDelivery`). Each concrete creator subclass (`RoadLogistics`) implements it and returns its concrete product.' },
      { q: 'What do you need to change to add a new product type?', a: 'Nothing in the old code. You add a new concrete product class and a new concrete creator subclass.' },
      { q: 'Is `List.of(1, 2, 3)` the Gang of Four Factory Method pattern?', a: 'Not exactly. It is a static factory method: one static method that creates and returns an object. It shares the idea (no `new` on a concrete class for the caller), but there is no subclass that overrides it.' }
    ],
    keyPoints: [
      'A factory method is a method whose job is to create an object.',
      'In the pattern, the base class calls it and subclasses override it to pick the class.',
      'The workflow depends only on the product interface.',
      'New products mean new classes, not edits in old ones.',
      'Static factory methods (`List.of`, `Integer.valueOf`) are the everyday cousin.'
    ],
    commonMistakes: [
      'Calling `new Truck()` inside the base class "only this once". Then the base class is tied to `Truck` again. Always go through `createTransport()`.',
      'Making the factory method return the concrete type: `Truck createTransport()`. Return the interface `Transport`, so callers stay independent.',
      'Calling an overridable factory method from the base class constructor. The subclass fields are not set yet at that moment. Call it later, in a normal method.',
      'Building a creator hierarchy for a single product. Use `new` or a static factory method until a second product really appears.'
    ],
    related: ['Abstract Factory', 'Singleton', 'Builder', 'Template Method'],
    glossary: DP.glossary
  });
})();
