// UML lesson 3: every relationship line in a class diagram and its Java meaning.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'class-relationships',
    num: '03',
    title: 'Class Relationships',
    category: 'structure',
    icon: '⇢',
    tagline: 'Six kinds of lines, six Java meanings',
    realWorld: 'A family photo with strings between people: a thin string means "knows", a thick rope means "belongs to", a string going up means "is the child of". The kind of string tells you how two people are connected.',
    kid: [
      'You know your neighbour. You borrow a pencil from a friend for one minute. Your hand belongs to you and goes wherever you go. Your football team has players, and the players still exist when the team stops.',
      'Those are all different ways of being connected. Some are weak, like borrowing a pencil. Some are strong, like your hand.',
      'UML has a different line for each kind. When you see the line, you know how strong the connection is, and how to write it in Java.'
    ],
    definition: 'A class diagram uses six kinds of lines between classes: **association** (knows a), **dependency** (uses a for a moment), **aggregation** (has parts that can live alone), **composition** (owns parts that die with it), **inheritance** (`extends`) and **realization** (`implements`).',
    explain: [
      'A line between two class boxes is a **relationship**. The look of the line (solid or dashed) and the shape at its end (open arrowhead, hollow triangle, hollow or filled diamond) tell you which kind it is.',
      'An **association** is a solid line, usually with an open arrowhead. In Java it is a **field**: the class at the start of the arrow keeps a reference to an object of the class at the end. A **dependency** is a dashed line with an open arrowhead: the class uses the other one only for a moment, as a method parameter, a local variable or a return type, but has no field of it.',
      '**Aggregation** and **composition** are special associations for a whole and its parts. The diamond sits at the **whole**. A hollow diamond (aggregation) says: the parts come from outside and can live on when the whole is gone, like players in a team. A filled diamond (composition) says: the whole creates its parts and owns them alone, like rooms in a house.',
      '**Inheritance** (UML says **generalization**) is a solid line with a hollow triangle at the **parent**: `class Dog extends Animal`. **Realization** is the same triangle on a dashed line, pointing to an interface: `class Dog implements Sound`.',
      'Arrows point from the class that knows or uses to the class that is known or used. For `extends` and `implements` the triangle points up to the parent or interface. Read every line as a sentence from the start to the end: "Keeper knows a Dog", "Dog is an Animal".'
    ],
    why: 'The line type tells a reader how to write the code: a field, a parameter, a `new` inside the constructor, `extends` or `implements`. Without the right line, two people turn the same picture into two different programs.',
    whenUse: 'In every class diagram with more than one box. Start with plain associations and inheritance; use diamonds only when "whole and part" is the important idea, and dependencies only when a short use matters for the design.',
    syntax: 'Mermaid: `A --> B` association, `A ..> B` dependency, `Whole o-- Part` aggregation, `Whole *-- Part` composition, `Parent <|-- Child` inheritance, `Interface <|.. Class` realization. Add a label after a colon: `Keeper --> Dog : favorite`.',
    table: {
      label: 'Every line and its Java meaning',
      head: ['Relationship', 'How it looks', 'Mermaid', 'Java', 'Read it as'],
      rows: [
        ['Association', 'solid line, open arrowhead', '`A --> B`', '`A` has a field of type `B`', 'A knows a B'],
        ['Dependency', 'dashed line, open arrowhead', '`A ..> B`', '`B` only as parameter, local variable or return type, no field', 'A uses a B'],
        ['Aggregation', 'solid line, hollow diamond at the whole', '`Whole o-- Part`', 'field (often a list) filled with parts made outside', 'Whole has Parts'],
        ['Composition', 'solid line, filled diamond at the whole', '`Whole *-- Part`', 'the whole makes its parts with `new` and never gives them away', 'Whole is made of Parts'],
        ['Inheritance', 'solid line, hollow triangle at the parent', '`Parent <|-- Child`', '`class Child extends Parent`', 'Child is a Parent'],
        ['Realization', 'dashed line, hollow triangle at the interface', '`Interface <|.. Class`', '`class Class implements Interface`', 'Class keeps the promise of Interface']
      ],
      note: 'Solid line = a lasting connection (field or extends). Dashed line = a weaker one (a short use, or only a promise).'
    },
    mermaid: `classDiagram
  class Sound {
    <<interface>>
    +sound() String
  }
  class Animal {
    #String name
  }
  class Dog {
    +sound() String
  }
  class Enclosure {
    -List~Animal~ animals
    ~add(Animal animal) void
  }
  class Keeper {
    -Dog favorite
    ~feed(FoodBowl bowl) void
  }
  Animal <|-- Dog
  Sound <|.. Dog
  Zoo *-- Enclosure : dogPark
  Enclosure o-- Animal : animals
  Keeper --> Dog : favorite
  Keeper ..> FoodBowl : uses`,
    visualLabel: 'All six lines in one zoo',
    visualNote: 'Find each line in the code below: `extends` (triangle, solid), `implements` (triangle, dashed), the zoo makes its own enclosure (filled diamond), the enclosure gets animals from outside (hollow diamond), the keeper has a field `favorite` (arrow), and the keeper only gets a bowl as a parameter (dashed arrow).',
    fileName: 'ZooDemo.java',
    code: `import java.util.ArrayList;
import java.util.List;

public class ZooDemo {
    public static void main(String[] args) {
        Dog rex = new Dog("Rex");
        Zoo zoo = new Zoo();
        zoo.dogPark().add(rex);
        Keeper sam = new Keeper("Sam", rex);
        sam.feed(new FoodBowl());
        System.out.println(rex.sound());
        System.out.println("Animals in the dog park: " + zoo.dogPark().size());
    }
}

interface Sound {
    String sound();
}

class Animal {
    protected final String name;
    Animal(String name) { this.name = name; }
}

class Dog extends Animal implements Sound {
    Dog(String name) { super(name); }
    public String sound() { return name + " says woof"; }
}

class Enclosure {
    private final List<Animal> animals = new ArrayList<>();
    void add(Animal animal) { animals.add(animal); }
    int size() { return animals.size(); }
}

class Zoo {
    private final Enclosure dogPark = new Enclosure();
    Enclosure dogPark() { return dogPark; }
}

class Keeper {
    private final String name;
    private final Dog favorite;
    Keeper(String name, Dog favorite) { this.name = name; this.favorite = favorite; }
    void feed(FoodBowl bowl) {
        System.out.println(name + ": " + bowl.fill() + " for " + favorite.name);
    }
}

class FoodBowl {
    String fill() { return "bowl filled"; }
}`,
    output: `Sam: bowl filled for Rex
Rex says woof
Animals in the dog park: 1`,
    codeSummary: 'One small zoo that contains every relationship once. Short methods are written on one line so the whole program fits on a screen next to the diagram.',
    codeExplanation: [
      { label: 'Line 25', code: 'class Dog extends Animal implements Sound {', text: 'Two relationships in one line: `extends Animal` is inheritance (solid line, triangle at `Animal`), `implements Sound` is realization (dashed line, triangle at `Sound`).' },
      { label: 'Line 31', code: 'private final List<Animal> animals = new ArrayList<>();', text: 'Aggregation: the enclosure holds animals, but it does not create them. They come in through `add` and could move to another enclosure.' },
      { label: 'Line 32', code: 'void add(Animal animal) { animals.add(animal); }', text: 'The part is made outside and handed in. That is the sign of a hollow diamond.' },
      { label: 'Line 37', code: 'private final Enclosure dogPark = new Enclosure();', text: 'Composition: the zoo creates its own enclosure with `new`. No enclosure exists without its zoo. Filled diamond at `Zoo`.' },
      { label: 'Line 43', code: 'private final Dog favorite;', text: 'Association: a lasting field. The keeper knows its favorite dog for its whole life, so the solid arrow goes from `Keeper` to `Dog`.' },
      { label: 'Line 45', code: 'void feed(FoodBowl bowl) {', text: 'Dependency: `FoodBowl` is only a parameter. After `feed` returns, the keeper has no reference to the bowl any more. Dashed arrow.' },
      { label: 'Line 46', code: 'System.out.println(name + ": " + bowl.fill() + " for " + favorite.name);', text: 'Uses both: the bowl (for a moment) and the favorite dog (through the field). `name` of the dog is `protected`, and `Keeper` is in the same package, so it may read it.' },
      { label: 'Line 8', code: 'zoo.dogPark().add(rex);', text: 'The dog is created in `main` and only then put into the enclosure: the part existed before the whole knew it.' }
    ],
    sections: [
      {
        title: 'Association: a field that points to another object',
        text: [
          'An association means "knows a". In Java the class at the start of the arrow has a **field** whose type is the class at the end. The arrowhead shows the **navigability**: which side can reach the other one. Here a kid knows its bike, but the bike does not know the kid.',
          'The label next to the arrow is the **role name**: the name of the field (`bike`).'
        ],
        mermaid: `classDiagram
  direction LR
  class Kid {
    -String name
    -Bike bike
    ~ride() void
  }
  class Bike {
    -String color
  }
  Kid --> Bike : bike`,
        fileName: 'AssociationDemo.java',
        code: `public class AssociationDemo {
    public static void main(String[] args) {
        Bike red = new Bike("red");
        Kid tom = new Kid("Tom", red);
        Kid lea = new Kid("Lea", red);
        tom.ride();
        lea.ride();
    }
}

class Bike {
    private final String color;
    Bike(String color) { this.color = color; }
    String color() { return color; }
}

class Kid {
    private final String name;
    private final Bike bike;   // association: Kid knows a Bike

    Kid(String name, Bike bike) {
        this.name = name;
        this.bike = bike;
    }

    void ride() {
        System.out.println(name + " rides the " + bike.color() + " bike");
    }
}`,
        output: `Tom rides the red bike
Lea rides the red bike`,
        tip: 'Two kids share one bike here. An association allows that; it says nothing about who owns the object.'
      },
      {
        title: 'Dependency: used for a moment, no field',
        text: [
          'A dependency is the weakest line: "uses a". The class needs the other class to compile, but it does not keep a reference. Typical cases: a method parameter, a local variable, a return type, or a call to a static method such as `Math.max`.',
          'Draw it when the use matters for the design, for example "the printer only depends on letters". Most diagrams leave dependencies to helper classes out.'
        ],
        mermaid: `classDiagram
  direction LR
  class Printer {
    -int pages
    ~print(Letter letter) void
  }
  class Letter {
    -String text
  }
  Printer ..> Letter : prints`,
        fileName: 'DependencyDemo.java',
        code: `public class DependencyDemo {
    public static void main(String[] args) {
        Printer printer = new Printer();
        printer.print(new Letter("Dear Grandma, thank you!"));
        printer.print(new Letter("See you soon."));
    }
}

class Letter {
    private final String text;
    Letter(String text) { this.text = text; }
    String text() { return text; }
}

class Printer {
    private int pages = 0;

    void print(Letter letter) {   // Letter is only a parameter: dependency
        pages++;
        System.out.println("Page " + pages + ": " + letter.text());
    }
}`,
        output: `Page 1: Dear Grandma, thank you!
Page 2: See you soon.`,
        warn: 'Wrong: drawing `Printer --> Letter` (solid) for a parameter. That tells the reader to add a field `letter`. Right: a parameter is a dashed `..>`.'
      },
      {
        title: 'Aggregation or composition: the "what dies with it?" test',
        text: [
          'Both say "a whole has parts". Ask one question: **when the whole is gone, are the parts gone too?** If yes, and the whole created the parts itself, it is composition (filled diamond). If the parts came from outside and live on, it is aggregation (hollow diamond).',
          'A car builds its own engine in its constructor and never hands it out: composition. A player joins two teams; when one team disbands, the player still plays for the other: aggregation.'
        ],
        mermaid: `classDiagram
  direction LR
  Car *-- Engine : engine
  Team o-- Player : players`,
        diagramNote: 'The diamond is always at the whole: `Car` and `Team`.',
        fileName: 'WholePartDemo.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class WholePartDemo {
    public static void main(String[] args) {
        Car car = new Car("Blue");
        car.start();

        Player mia = new Player("Mia");
        Team red = new Team("Red");
        Team green = new Team("Green");
        red.add(mia);
        green.add(mia);
        red.disband();
        red.show();
        green.show();
    }
}

class Engine {
    String start() { return "vroom"; }
}

class Car {
    private final String color;
    private final Engine engine = new Engine();   // composition: the car makes its own engine

    Car(String color) { this.color = color; }

    void start() { System.out.println(color + " car: " + engine.start()); }
}

class Player {
    private final String name;
    Player(String name) { this.name = name; }
    String name() { return name; }
}

class Team {
    private final String name;
    private final List<Player> players = new ArrayList<>();   // aggregation

    Team(String name) { this.name = name; }
    void add(Player player) { players.add(player); }
    void disband() { players.clear(); System.out.println(name + " disbands"); }

    void show() {
        for (Player player : players) System.out.println(player.name() + " plays for " + name);
        if (players.isEmpty()) System.out.println(name + " has no players");
    }
}`,
        output: `Blue car: vroom
Red disbands
Red has no players
Mia plays for Green`,
        tip: 'Not sure? Draw a plain association arrow. Many teams use diamonds only when ownership is the point of the diagram.'
      },
      {
        title: 'Inheritance and realization: the triangle points up',
        text: [
          'The hollow triangle always sits at the **more general** side: the parent class or the interface. A solid line means `extends`, a dashed line means `implements`.',
          'A class extends at most one class, but it can implement many interfaces, so a box may have one solid triangle line and several dashed ones.'
        ],
        mermaid: `classDiagram
  class Swimmer {
    <<interface>>
    +swim() String
  }
  class Bird {
    <<abstract>>
    ~name()* String
    ~describe() String
  }
  Bird <|-- Penguin
  Bird <|-- Sparrow
  Swimmer <|.. Penguin`,
        fileName: 'FamilyDemo.java',
        code: `public class FamilyDemo {
    public static void main(String[] args) {
        Bird[] birds = { new Penguin(), new Sparrow() };
        for (Bird bird : birds) {
            System.out.println(bird.describe());
        }
        Swimmer swimmer = new Penguin();
        System.out.println(swimmer.swim());
    }
}

interface Swimmer {
    String swim();
}

abstract class Bird {
    abstract String name();

    String describe() {
        return name() + " is a bird with feathers";
    }
}

class Penguin extends Bird implements Swimmer {
    String name() { return "Penguin"; }
    public String swim() { return "Penguin swims fast"; }
}

class Sparrow extends Bird {
    String name() { return "Sparrow"; }
}`,
        output: `Penguin is a bird with feathers
Sparrow is a bird with feathers
Penguin swims fast`,
        warn: 'In Mermaid, `Bird <|-- Penguin` draws the triangle at `Bird`. Writing `Penguin <|-- Bird` would say "Bird extends Penguin", which is the wrong way round.'
      },
      {
        title: 'Which line do I draw? A decision path',
        text: ['Ask these questions from top to bottom about two classes A and B. The first "yes" gives you the line.'],
        mermaid: `flowchart TD
  Q1{"Does A implement interface B?"} -- yes --> R["realization: dashed line, triangle at B"]
  Q1 -- no --> Q2{"Is A a kind of B?"}
  Q2 -- yes --> I["inheritance: solid line, triangle at B"]
  Q2 -- no --> Q3{"Does A have a field of type B?"}
  Q3 -- no --> D["dependency: dashed arrow to B"]
  Q3 -- yes --> Q4{"Does A create B and own it alone?"}
  Q4 -- yes --> C["composition: filled diamond at A"]
  Q4 -- no --> Q5{"Is A a whole and B its part?"}
  Q5 -- yes --> AG["aggregation: hollow diamond at A"]
  Q5 -- no --> AS["association: solid arrow to B"]`,
        diagramNote: 'From strong to weak: inheritance and composition bind the most, dependency the least.'
      }
    ],
    technical: [
      'For the JVM, association, aggregation and composition look exactly the same: a field that holds a **reference** (an address of an object on the heap). Java has no keyword for "owns". The difference is how you use the field: who calls `new`, and whether the reference is ever handed out.',
      'This matters for the **garbage collector**, the part of the JVM that deletes objects nobody can reach any more. In a composition only the whole holds a reference to the part, so when the whole becomes unreachable, the part does too, and both are cleaned up. In an aggregation other objects still hold the part, so it stays alive.',
      '`extends` and `implements` are written into the `.class` file: it stores the name of the superclass and a list of interfaces. Run `javap Dog` after compiling and you see `class Dog extends Animal implements Sound`, the triangle lines of your diagram, read back from bytecode.'
    ],
    tryIt: {
      steps: [
        'In `ZooDemo.java`, add a class `Cat extends Animal implements Sound` that says "meow".',
        'Put a cat into the dog park in `main` and print its sound.',
        'Add the new lines to the Mermaid text of the zoo diagram: `Animal <|-- Cat` and `Sound <|.. Cat`.',
        'Run the program and paste the diagram text into [mermaid.live](https://mermaid.live).'
      ],
      see: '`Animals in the dog park: 2`, a meow line, and a diagram with a second child under `Animal`.'
    },
    check: [
      { q: 'A `Library` creates its `Shelf` objects in its constructor and never gives them out. Which line, and where is the diamond?', a: 'Composition, a filled diamond at `Library`: `Library *-- Shelf`.' },
      { q: 'A method `void pay(Wallet wallet)` is the only place where `Shop` uses `Wallet`. Which line?', a: 'A dependency, dashed arrow: `Shop ..> Wallet`. There is no field.' },
      { q: 'How do the lines for `extends` and `implements` differ?', a: 'Both have a hollow triangle at the parent or interface. `extends` uses a solid line, `implements` a dashed line.' }
    ],
    keyPoints: [
      'Association = field (knows a). Dependency = parameter or local variable (uses a).',
      'Diamonds sit at the whole: hollow = parts live on, filled = parts die with the whole.',
      'Triangles point to the parent or interface: solid = extends, dashed = implements.',
      'Solid lines are lasting connections; dashed lines are weaker ones.',
      'When in doubt, draw a plain association.'
    ],
    commonMistakes: [
      'Putting the diamond at the part: `Engine *-- Car`. Fix: the diamond belongs to the whole, `Car *-- Engine`.',
      'Drawing the triangle at the child: `Penguin <|-- Bird`. Fix: the triangle points to the parent, `Bird <|-- Penguin`.',
      'Using a solid `-->` for a method parameter. Fix: a parameter is a dependency, `..>`.',
      'Calling a shared object a composition, for example `Team *-- Player` when a player is in two teams. Fix: shared parts mean aggregation, `Team o-- Player`.'
    ],
    related: ['Class Diagram', 'Multiplicity', 'Interfaces', 'Design Patterns'],
    glossary: U.glossary
  });
})();
