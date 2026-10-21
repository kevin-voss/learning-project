// Interfaces, lesson 2: one variable of interface type, many kinds of objects (polymorphism).
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'interface-polymorphism',
      title: 'One Variable, Many Objects',
      category: 'concept',
      icon: '◇',
      tagline: 'Same call, different behaviour',
      realWorld: 'A "play" button on a music box, a radio and a phone. You press the same button on each one. The music box plays a tune, the radio plays the news, the phone plays a video.',
      kid: [
        'You have a bag with the label "things that roll". Inside are a ball, a toy car and a marble.',
        'You reach in without looking and push whatever you grab. You do not need to know what it is. It rolls, because everything in the bag can roll.',
        'The ball bounces while it rolls, the car goes straight, the marble goes fast. Same push, different rolling. That is **polymorphism**: one word for "many shapes".'
      ],
      definition: 'A variable, parameter or list of an **interface type** can hold an object of **any** class that implements the interface. When you call a method on it, Java runs the version of the real object. This is called **polymorphism**.',
      explain: [
        'In the last lesson you stored a `ConsoleSender` in a variable of type `NotificationSender`. That works for **every** class that implements the interface. One variable can even hold a different object later: first a circle, then a rectangle.',
        'Java now has two types to think about. The **declared type** (also called static type) is the type you wrote for the variable, here `Shape`. The **runtime type** is the class of the real object, here `Circle` or `Rectangle`.',
        'The declared type decides **which methods you may call**. A `Shape` variable only offers `name()` and `area()`, even if the object has more methods. The runtime type decides **which code runs**. `shape.area()` runs the circle formula for a circle and the rectangle formula for a rectangle.',
        'This choice happens while the program runs, so it is called **dynamic dispatch** ("dispatch" means "send to the right place"). You write one loop over a `List<Shape>`, and every shape answers in its own way.',
        'The big win: the method `describe(Shape shape)` does not need an `if` for every kind of shape. When you add a `Triangle` class later, `describe` works with it without a single change.'
      ],
      why: 'You write code once for the promise, and it works for every class that keeps it, also for classes you add next year.',
      whenUse: 'Whenever a method or a list should accept several kinds of objects that can do the same job.',
      syntax: '`InterfaceType name = new SomeClass(…);` · `List<InterfaceType> list = List.of(new A(), new B());` · `void use(InterfaceType x) { x.method(); }`',
      fileName: 'Shapes.java',
      code: `import java.util.List;

interface Shape {
    String name();
    double area();
}

class Circle implements Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    @Override public String name() { return "circle"; }
    @Override public double area() { return Math.PI * radius * radius; }
}

class Rectangle implements Shape {
    private final double width;
    private final double height;
    Rectangle(double width, double height) { this.width = width; this.height = height; }
    @Override public String name() { return "rectangle"; }
    @Override public double area() { return width * height; }
}

public class Shapes {
    // This method only knows the promise Shape.
    static void describe(Shape shape) {
        System.out.println(shape.name() + " with area " + round2(shape.area()));
    }

    static double round2(double x) {
        return Math.round(x * 100) / 100.0;   // keep 2 decimals
    }

    public static void main(String[] args) {
        Shape s = new Circle(1);
        describe(s);
        s = new Rectangle(2, 3);   // same variable, a different object
        describe(s);

        List<Shape> all = List.of(new Circle(2), new Rectangle(4, 5), new Circle(0.5));
        double total = 0;
        for (Shape shape : all) {
            total += shape.area();
        }
        System.out.println("total area " + round2(total));
    }
}`,
      output: `circle with area 3.14
rectangle with area 6.0
total area 33.35`,
      codeSummary: 'Two classes keep the `Shape` promise. One variable, one method and one list work with both.',
      codeExplanation: [
        { label: 'Line 3', code: 'interface Shape {', text: 'The promise: every shape can tell its name and its area.' },
        { label: 'Line 11', code: '@Override public String name() { return "circle"; }', text: 'Circle keeps the promise. Short methods may sit on one line; `@Override` and `public` stay.' },
        { label: 'Line 12', code: '@Override public double area() { return Math.PI * radius * radius; }', text: 'The circle formula. `Math.PI` is the number pi (3.14159…).' },
        { label: 'Line 20', code: '@Override public double area() { return width * height; }', text: 'Rectangle keeps the same promise with a different formula.' },
        { label: 'Line 25', code: 'static void describe(Shape shape) {', text: 'The parameter has the interface type. Every object whose class implements `Shape` may be passed in.' },
        { label: 'Line 26', code: 'System.out.println(shape.name() + " with area " + round2(shape.area()));', text: 'Calls two promised methods. `describe` has no idea whether it talks to a circle or a rectangle.' },
        { label: 'Line 30', code: 'return Math.round(x * 100) / 100.0;   // keep 2 decimals', text: 'A small helper that rounds to two decimals, so pi does not print as 3.141592653589793.' },
        { label: 'Line 34', code: 'Shape s = new Circle(1);', text: 'Declared type `Shape`, runtime type `Circle`.' },
        { label: 'Line 36', code: 's = new Rectangle(2, 3);   // same variable, a different object', text: 'The same variable now points to a rectangle. That is allowed, because a Rectangle is also a Shape.' },
        { label: 'Line 39', code: 'List<Shape> all = List.of(new Circle(2), new Rectangle(4, 5), new Circle(0.5));', text: 'A list of the interface type can mix different classes ([Collections](../collections/index.html)).' },
        { label: 'Line 42', code: 'total += shape.area();', text: 'One line, three different formulas: Java picks the `area` of each real object (dynamic dispatch).' }
      ],
      mermaid: `classDiagram
  class Shape {
    <<interface>>
    +name() String
    +area() double
  }
  class Circle {
    -double radius
    +name() String
    +area() double
  }
  class Rectangle {
    -double width
    -double height
    +name() String
    +area() double
  }
  Shape <|.. Circle
  Shape <|.. Rectangle
  Shapes ..> Shape : uses`,
      visualLabel: 'Class diagram',
      visualNote: 'The dashed arrow with a hollow triangle means **implements** (UML calls it "realization"). `Shapes` only points to `Shape`, never to `Circle` or `Rectangle`: it depends on the promise alone. `+` means public, `-` means private.',
      sections: [
        {
          title: 'Two types for one variable',
          text: [
            'Look at `Shape s = new Circle(1);`. The left side and the right side name different types. Both matter, for different questions.'
          ],
          table: {
            head: ['', 'Declared type (left)', 'Runtime type (right)'],
            rows: [
              ['In the example', '`Shape`', '`Circle`'],
              ['Who knows it?', 'the compiler', 'the JVM, while the program runs'],
              ['It decides…', 'which methods you **may call**', 'which method body **runs**'],
              ['Can it change?', 'no, fixed when you write the code', 'yes, `s = new Rectangle(2, 3);`']
            ],
            note: 'Rule of thumb: the variable type is the menu, the object is the cook.'
          }
        },
        {
          title: 'How a call finds its code',
          text: [
            'When `describe` calls `shape.area()`, it does not know the class. The JVM looks at the object, finds its class and runs that class\'s `area`.'
          ],
          mermaid: `sequenceDiagram
  participant M as main
  participant D as describe(Shape)
  participant C as Circle object
  participant R as Rectangle object
  M->>D: describe(circle)
  D->>C: area()
  C-->>D: 3.14
  M->>D: describe(rectangle)
  D->>R: area()
  R-->>D: 6.0`,
          diagramNote: 'The same line of code in `describe` talks to a different object each time. `describe` never changes.'
        },
        {
          title: 'Wrong vs right: calling a method the promise does not have',
          text: [
            'Suppose `Circle` gets an extra method `radius()`. The object has it, but the variable type `Shape` does not promise it. The compiler only looks at the declared type, so `s.radius()` fails:',
            '`error: cannot find symbol … symbol: method radius() … location: variable s of type Shape`',
            'If you really need the circle, ask first with `instanceof`. `s instanceof Circle c` checks the runtime type and, if it matches, gives you a new variable `c` of type `Circle`. This is called **pattern matching**.'
          ],
          fileName: 'AskFirst.java',
          code: `interface Shape {
    double area();
}

class Circle implements Shape {
    private final double radius;
    Circle(double radius) { this.radius = radius; }
    double radius() { return radius; }
    @Override public double area() { return Math.PI * radius * radius; }
}

class Square implements Shape {
    private final double side;
    Square(double side) { this.side = side; }
    @Override public double area() { return side * side; }
}

public class AskFirst {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Square(3) };
        for (Shape s : shapes) {
            // s.radius() would not compile: Shape does not promise radius()
            if (s instanceof Circle c) {
                System.out.println("a circle with radius " + c.radius());
            } else {
                System.out.println("not a circle, area " + s.area());
            }
        }
    }
}`,
          output: `a circle with radius 2.0
not a circle, area 9.0`,
          tip: 'If you write `instanceof` checks for many classes, the interface is probably missing a method. Add it to the promise instead.'
        },
        {
          title: 'Records can keep a promise too',
          text: [
            'A [record](../classes-and-objects/index.html) is a short class for data. It can implement an interface like any class. Its accessor methods (like `radius()`) are made for you, so you only write the promised method.'
          ],
          fileName: 'RecordShapes.java',
          code: `import java.util.List;

interface Shape {
    double area();
}

record Circle(double radius) implements Shape {
    @Override public double area() { return Math.PI * radius * radius; }
}

record Square(double side) implements Shape {
    @Override public double area() { return side * side; }
}

public class RecordShapes {
    public static void main(String[] args) {
        List<Shape> shapes = List.of(new Circle(1), new Square(2), new Square(0.5));
        for (Shape s : shapes) {
            System.out.println(s + " -> " + Math.round(s.area() * 100) / 100.0);
        }
    }
}`,
          output: `Circle[radius=1.0] -> 3.14
Square[side=2.0] -> 4.0
Square[side=0.5] -> 0.25`
        }
      ],
      technical: [
        'The compiler checks every call against the **declared** type. For `shape.area()` it finds `area()` in `Shape` and writes the bytecode `invokeinterface Shape.area()D` (`D` means it returns a double). It never mentions `Circle`.',
        'At run time every object carries a pointer to its class. To run `invokeinterface`, the JVM takes the object, looks up its class (for example `Circle`) and finds the method that implements `Shape.area()` there. The JIT compiler (the part of the JVM that turns hot bytecode into machine code) caches this lookup, so the call is about as fast as a normal one.',
        'Assigning `Shape s = new Circle(1);` copies only a reference, the address of the object. The object itself does not change and does not get smaller. It is still a full `Circle` with its `radius` field; the variable only shows you the `Shape` part of it.',
        'An `instanceof` check reads the class pointer of the object. With a pattern like `s instanceof Circle c`, the compiler adds a cast for you, so `c` has the type `Circle`.'
      ],
      tryIt: {
        steps: [
          'Run `Shapes.java` from the main example.',
          'Add a class `Triangle implements Shape` with `base` and `height` and area `base * height / 2`.',
          'Add `new Triangle(3, 4)` to the list in `main`. Do not touch `describe`.',
          'Call `describe(new Triangle(3, 4));` once more.'
        ],
        see: '`triangle with area 6.0` and a total area of `39.35`. `describe` and the loop work for the new class without any change.'
      },
      check: [
        { q: 'In `Shape s = new Circle(1);`, what is the declared type and what is the runtime type?', a: 'Declared type `Shape` (the variable), runtime type `Circle` (the object).' },
        { q: 'Why does `s.radius()` not compile, although the object is a circle?', a: 'The compiler only knows the declared type `Shape`, and `Shape` does not promise `radius()`. Use `if (s instanceof Circle c)` and call `c.radius()`.' },
        { q: 'What does "dynamic dispatch" mean?', a: 'When the program runs, Java looks at the real object and runs the method of its class. The same call can run different code.' }
      ],
      keyPoints: [
        'A variable, parameter or list of an interface type accepts every class that implements it.',
        'The declared type decides what you may call. The object decides what runs.',
        'Polymorphism lets one method or loop handle many classes without `if` chains.',
        'New classes that keep the promise work with old code without changes.',
        'In a class diagram, a dashed arrow with a hollow triangle means "implements".'
      ],
      commonMistakes: [
        'Calling a class-only method through the interface: `shape.radius()`. Fix: add it to the interface if every shape has it, or check with `instanceof Circle c` first.',
        'Long `if (s instanceof Circle) … else if (s instanceof Square) …` chains. Fix: put the behaviour into the interface method and let each class answer.',
        'Declaring the list as `List<Circle>` and then trying to add a `Square`. Fix: use `List<Shape>`.',
        'Thinking the object turns into a "Shape" and loses its fields. It stays a full `Circle`; only the view through the variable is smaller.'
      ],
      related: ['interface-promise', 'program-to-interface', 'Collections', 'UML Diagrams']
    }
  ]);
})();
