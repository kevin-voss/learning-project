(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'instance-static',
    title: 'Instance vs static',
    category: 'practice',
    icon: 'S',
    tagline: 'Know what belongs where',
    glossary: terms,
    realWorld: 'A classroom. Every child has their own lunchbox with their own food. But there is only one clock on the wall, and everybody reads the same time from it.',
    kid: [
      'In your classroom each child has a lunchbox. Mia’s lunchbox has an apple, Leo’s has a sandwich. If Leo eats his sandwich, Mia still has her apple.',
      'But the clock on the wall belongs to the whole class. There is only one. When the teacher moves its hands, everybody sees the new time.',
      'In Java, a lunchbox is an **instance** field: each object has its own. The wall clock is a **static** field: one for the whole class, shared by all objects.'
    ],
    definition: '**Instance** members belong to each object: every object has its own copy of an instance field. **static** members belong to the class itself: a static field exists exactly once, shared by all objects, and a static method runs without any object.',
    explain: [
      'Every field you wrote so far was an instance field. `static` changes the owner: `static int created;` is not inside any object. There is one `created` for the class `Counter`, even if you make a thousand counters, and even if you make none.',
      'You reach a static member through the class name: `Counter.created`, `Counter.createdCount()`. Inside the class you can leave the class name out.',
      'A **static method** runs without an object, so it has no `this` (lesson "The this Keyword"). It cannot read instance fields like `value` on its own, because there is no "which object?" answer. It can use static fields, its parameters, and objects that it is given.',
      'Now `public static void main` makes sense. When your program starts, no objects exist yet. The JVM must call `main` without one, so `main` is static. From `main` you make objects with `new` and call their instance methods.',
      'A field that is `static final` is a **constant**: one shared value that never changes, like `Math.PI` or `MAX_SPEED`. Constant names are written in capitals with underscores.',
      'Classes like `Math` are full of static methods: `Math.max(3, 7)` needs no `Math` object, because the answer depends only on the parameters. Those are **utility methods**.'
    ],
    why: 'Some data is about each thing (each counter’s value) and some is about the whole kind of thing (how many counters exist). `static` lets you say which is which.',
    whenUse: 'Use instance members for anything that differs from object to object. Use `static` for shared counters, constants, and helper methods that need no object state.',
    syntax: '`static type name;` / `static returnType name(…) { … }`. Call with `ClassName.name`. Instance members are called with `object.name`.',
    fileName: 'TicketDemo.java',
    code: `public class TicketDemo {
    public static void main(String[] args) {
        System.out.println("tickets so far: " + Ticket.issued());

        Ticket a = new Ticket("Ana");
        Ticket b = new Ticket("Ben");
        Ticket c = new Ticket("Cleo");

        System.out.println(a.describe());
        System.out.println(b.describe());
        System.out.println(c.describe());
        System.out.println("tickets so far: " + Ticket.issued());
    }
}

class Ticket {
    private static int nextNumber = 1;   // ONE copy, shared by all tickets

    private final int number;            // each ticket has its own
    private final String holder;         // each ticket has its own

    Ticket(String holder) {
        this.holder = holder;
        this.number = nextNumber;        // take the shared number ...
        nextNumber++;                    // ... and move it on for the next one
    }

    String describe() {                  // instance method: uses instance fields
        return "#" + number + " for " + holder;
    }

    static int issued() {                // static method: only static data
        return nextNumber - 1;
    }
}`,
    output: `tickets so far: 0
#1 for Ana
#2 for Ben
#3 for Cleo
tickets so far: 3`,
    codeSummary: 'All tickets share one static counter `nextNumber`. Each constructor copies the current number into the ticket’s own `number` field and moves the shared counter on, so every ticket gets a different number.',
    codeExplanation: [
      { label: 'Line 3', code: 'System.out.println("tickets so far: " + Ticket.issued());', text: 'A static method, called on the class. It works before any ticket exists.' },
      { label: 'Line 5', code: 'Ticket a = new Ticket("Ana");', text: 'The first ticket. Its constructor reads the shared counter (1) and moves it to 2.' },
      { label: 'Line 9', code: 'System.out.println(a.describe());', text: 'An instance method, called on one object. It prints that ticket’s own number and holder.' },
      { label: 'Line 17', code: 'private static int nextNumber = 1;   // ONE copy, shared by all tickets', text: '`static`: the field belongs to the class. All three constructors see and change the same variable.' },
      { label: 'Line 19', code: 'private final int number;            // each ticket has its own', text: 'No `static`: every `Ticket` object has its own `number`. `final`: it never changes after the constructor.' },
      { label: 'Line 24', code: 'this.number = nextNumber;        // take the shared number ...', text: 'Copies the current shared value into this object’s own field.' },
      { label: 'Line 25', code: 'nextNumber++;                    // ... and move it on for the next one', text: 'Changes the one shared counter, so the next ticket gets the next number.' },
      { label: 'Line 32', code: 'static int issued() {                // static method: only static data', text: 'No object, no `this`. It may use `nextNumber` (static) but not `number` or `holder`.' }
    ],
    sections: [
      {
        title: 'One shared copy, many own copies',
        text: [
          'Draw the class and its objects side by side. The static field sits once, next to the class. Each object carries only its own instance fields.'
        ],
        mermaid: `flowchart LR
  subgraph K["class Ticket"]
    N["static nextNumber = 4"]
  end
  subgraph H["objects on the heap"]
    A["Ticket: number = 1, holder = Ana"]
    B["Ticket: number = 2, holder = Ben"]
    C["Ticket: number = 3, holder = Cleo"]
  end
  A -.->|"reads at birth"| N
  B -.->|"reads at birth"| N
  C -.->|"reads at birth"| N`,
        diagramNote: 'After three tickets, the shared counter is 4. Each ticket kept the number it got at birth in its own field.'
      },
      {
        title: 'static methods have no object',
        text: [
          'A static method has no `this`. If it names an instance field, the compiler asks: the field of **which** object? There is none, so it refuses.'
        ],
        fileName: 'StaticError.java',
        codeLanguage: 'plaintext',
        code: `public class StaticError {
    int score = 10;

    public static void main(String[] args) {
        System.out.println(score);
    }
}

$ javac StaticError.java
StaticError.java:5: error: non-static variable score cannot be referenced from a static context
        System.out.println(score);
                           ^
1 error`,
        tip: 'The fix is almost never "add `static` to the field". Make an object and use its field: `StaticError game = new StaticError(); System.out.println(game.score);`.'
      },
      {
        title: 'Constants: static final',
        text: [
          'A value that is the same for every object and never changes belongs in a `static final` field. `static` because one copy is enough, `final` because nobody may change it. Making it `public` is safe, since nobody can change it anyway.'
        ],
        fileName: 'CarDemo.java',
        code: `public class CarDemo {
    public static void main(String[] args) {
        Car car = new Car();
        car.speedUp(70);
        car.speedUp(80);   // would be 150, but the limit is 120
        System.out.println("speed: " + car.getSpeed() + " of max " + Car.MAX_SPEED);
        System.out.println("circle area r=2: " + Math.PI * 2 * 2);
    }
}

class Car {
    public static final int MAX_SPEED = 120;   // a constant for all cars

    private int speed;                         // each car has its own

    void speedUp(int amount) {
        speed = Math.min(speed + amount, MAX_SPEED);
    }

    int getSpeed() {
        return speed;
    }
}`,
        output: `speed: 120 of max 120
circle area r=2: 12.566370614359172`
      },
      {
        title: 'Which one do I need?',
        text: [
          'Ask one question: "Is this different for each object?" If yes, it is an instance member. If no, it can be static.'
        ],
        table: {
          head: ['Thing', 'instance or static?', 'Why'],
          rows: [
            ['A dog’s name', 'instance field', 'Every dog has a different name'],
            ['How many dogs were made', '`static` field', 'One number for the whole class'],
            ['`bark()` that prints the dog’s name', 'instance method', 'It needs the fields of one dog'],
            ['`Math.max(a, b)`, `Integer.parseInt(text)`', '`static` method', 'The answer depends only on the parameters'],
            ['`MAX_SPEED`, `Math.PI`', '`static final` constant', 'Same for all, never changes'],
            ['`main`', '`static` method', 'The JVM calls it before any object exists']
          ]
        }
      },
      {
        title: 'The static trap',
        text: [
          'When `main` complains about "static context", beginners often add `static` everywhere until it compiles. Then every object shares one field, and the program quietly does the wrong thing.'
        ],
        fileName: 'StaticTrap.java',
        code: `public class StaticTrap {
    public static void main(String[] args) {
        Dog rex = new Dog("Rex");
        Dog bella = new Dog("Bella");
        System.out.println(rex.name + " and " + bella.name);
    }
}

class Dog {
    static String name;   // BUG: one name for ALL dogs

    Dog(String name) {
        Dog.name = name;  // the second dog overwrites the first
    }
}`,
        output: 'Bella and Bella',
        warn: 'Remove `static` from `name` and write `this.name = name;`. Then each dog keeps its own name and the program prints `Rex and Bella`.'
      }
    ],
    technical: [
      'A static field is stored once, together with the class, not inside any object. The JVM sets it up when it **initializes** the class: the first time the class is used (an object is made, a static method is called, or a static field is read). Initializers like `= 1` run at that moment, once.',
      'Static calls compile to `invokestatic`, which passes no object. Instance calls compile to `invokevirtual`, which passes the object as the hidden `this` in slot 0. That is the whole technical difference, and it is why static methods have no `this`.',
      'You can call a static method through an object (`a.issued()`), and it compiles, but the object is ignored. Always write the class name (`Ticket.issued()`), so readers see that it is shared.',
      'A class can also have a `static { … }` block. It runs once when the class is initialized and is used to set up complex static fields. You will rarely need it.'
    ],
    tryIt: {
      steps: [
        'Copy `TicketDemo.java` and run it.',
        'Remove `static` from `private static int nextNumber = 1;` and compile.',
        'Read the error. Put `static` back, then remove it from `static int issued()` instead and compile again.'
      ],
      see: 'first `non-static variable nextNumber cannot be referenced from a static context` (from `issued()`); after the second change, the same kind of error for `issued()` called on the class in `main`: `non-static method issued() cannot be referenced from a static context`.'
    },
    check: [
      { q: 'You make 5 `Ticket` objects. How many `number` fields exist? How many `nextNumber` fields?', a: 'Five `number` fields, one in each object. One `nextNumber`, shared by the class.' },
      { q: 'Why can a static method not read `this.number`?', a: 'A static method runs without an object, so there is no `this`. It would not know which ticket’s number to read.' },
      { q: 'Why is `main` static?', a: 'When the program starts, no objects exist. The JVM must be able to call `main` without making an object first.' }
    ],
    keyPoints: [
      'Instance fields: one copy per object. Static fields: one copy per class.',
      'Static methods run without an object and have no `this`.',
      'Call static members through the class name: `Ticket.issued()`, `Math.max(…)`.',
      '`static final` fields are shared constants: `MAX_SPEED`, `Math.PI`.',
      '`main` is static because no object exists when the program starts.'
    ],
    commonMistakes: [
      'Adding `static` to a field to silence "static context" errors. Make an object in `main` and use its fields instead.',
      '`static String name;` in `Dog`: all dogs share one name. Remove `static` from per-object data.',
      'Calling `rex.issued()` on an object for a static method. It works, but hides that the value is shared. Write `Ticket.issued()`.',
      'A constant without `final`: `public static int MAX_SPEED = 120;` can be changed by anybody. Write `public static final int MAX_SPEED = 120;`.'
    ],
    related: ['The this Keyword', 'Methods That Use Fields', 'Access Modifiers', 'Methods', 'JVM & Memory']
  }]);
})();
