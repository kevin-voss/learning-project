// UML lesson 2: the class box: compartments, visibility, types, static, abstract.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'class-diagram',
    num: '02',
    title: 'Class Diagram',
    category: 'structure',
    icon: '□',
    tagline: 'One box per class: name, fields, methods',
    realWorld: 'A trading card for a football player. On top is the name. In the middle are the facts: age, team, goals. At the bottom are the special moves the player can do. Every card of the same set has the same three parts.',
    kid: [
      'Think of a toy box with a label. The label says what is inside: "Robot". Under the name, a list says what the robot has: two arms, a battery. Under that, another list says what the robot can do: walk, talk, light up.',
      'A class box in UML is that label. The name is on top, what it has is in the middle, and what it can do is at the bottom.',
      'Some things are secret, like the battery inside. You mark secret things with a minus. Things everybody may touch, like the on-button, get a plus.'
    ],
    definition: 'A **class diagram** shows classes as boxes with three **compartments**: the class name, the **attributes** (fields) and the **operations** (methods). Symbols in front of each member show its **visibility**, and the lines between boxes show how classes are related.',
    explain: [
      'The **name compartment** holds the class name, written like in Java: `Player`, starting with a capital letter. An abstract class name is written in italics (or marked `<<abstract>>`), and a special kind of class gets a **stereotype** above the name, such as `<<interface>>` or `<<enumeration>>`.',
      'The **attribute compartment** lists the fields. UML writes `visibility name : Type`, for example `- score : int`. The type comes after the name, the reverse of Java. A starting value may follow: `# level : int = 1`.',
      'The **operation compartment** lists the methods: `visibility name(parameter : Type) : ReturnType`, for example `+ addPoints(points : int) : void`. Constructors are often left out; if you show them, they have the class name and no return type.',
      'The **visibility** symbol says who may use a member. `+` is `public`, `-` is `private`, `#` is `protected` and `~` is package-private (no keyword). You met the four levels in [access modifiers](../classes-and-objects/index.html).',
      'A **static** member (one that belongs to the class, not to each object) is **underlined** in UML; Mermaid marks it with `$` at the end. An **abstract** method (one without a body) is written in italics; Mermaid marks it with `*` at the end.'
    ],
    why: 'A class box shows a whole class on a few lines, without method bodies. You see at a glance what an object stores, what it offers to others and what it keeps secret.',
    whenUse: 'When you plan the classes of a program, when you explain a design, and when a task sheet gives you a class diagram that you must turn into code. Do not use it to show the order of steps; that is the job of sequence and activity diagrams.',
    syntax: 'Attribute: `visibility name : Type [= start value]`. Operation: `visibility name(param : Type, …) : ReturnType`. In Mermaid the order is Java-like: `-int score` and `+addPoints(int points) void`.',
    mermaid: `classDiagram
  class Player {
    +int playerCount$
    -String name
    -int score
    #int level
    +Player(String name)
    +addPoints(int points) void
    +getScore() int
    -updateLevel() void
    ~reset() void
    +toString() String
  }`,
    visualLabel: 'The class box of Player',
    visualNote: 'Top: the name. Middle: four fields. Bottom: the constructor and five methods. `playerCount` is underlined because it is static (`$` in Mermaid). Each symbol in front matches the Java modifier in the code below.',
    fileName: 'GameDemo.java',
    code: `public class GameDemo {
    public static void main(String[] args) {
        Player ana = new Player("Ana");
        Player ben = new Player("Ben");
        ana.addPoints(250);
        ben.addPoints(80);
        System.out.println(ana);
        System.out.println(ben);
        System.out.println("Ben's score: " + ben.getScore());
        System.out.println("Players created: " + Player.playerCount);
        ana.reset();
        System.out.println(ana);
    }
}

class Player {
    public static int playerCount = 0;
    private final String name;
    private int score;
    protected int level = 1;

    public Player(String name) {
        this.name = name;
        playerCount++;
    }

    public void addPoints(int points) {
        score += points;
        updateLevel();
    }

    public int getScore() {
        return score;
    }

    private void updateLevel() {
        level = 1 + score / 100;
    }

    void reset() {
        score = 0;
        updateLevel();
    }

    @Override
    public String toString() {
        return name + ": " + score + " points, level " + level;
    }
}`,
    output: `Ana: 250 points, level 3
Ben: 80 points, level 1
Ben's score: 80
Players created: 2
Ana: 0 points, level 1`,
    codeSummary: 'The class `Player` uses all four visibility levels and one static field. Read it next to the class box above: every field and method appears there once, with the matching symbol.',
    codeExplanation: [
      { label: 'Line 17', code: 'public static int playerCount = 0;', text: '`public static`: in the box it is `+int playerCount$` and drawn underlined. There is one counter for the whole class, not one per player.' },
      { label: 'Line 18', code: 'private final String name;', text: '`private` becomes `-`. UML can add `{readOnly}` for `final`; most sketches leave it out.' },
      { label: 'Line 20', code: 'protected int level = 1;', text: '`protected` becomes `#`. On paper you may add the start value: `# level : int = 1`.' },
      { label: 'Line 22', code: 'public Player(String name) {', text: 'The constructor. If you show it, it has the class name and no return type: `+Player(String name)`.' },
      { label: 'Line 24', code: 'playerCount++;', text: 'Every new object raises the shared static counter. That is why the output says 2 after two `new Player(…)`.' },
      { label: 'Line 27', code: 'public void addPoints(int points) {', text: 'A public method with one parameter: `+addPoints(int points) void` in Mermaid, `+ addPoints(points : int) : void` on paper.' },
      { label: 'Line 36', code: 'private void updateLevel() {', text: 'A private helper: `-updateLevel() void`. Others cannot call it; it only keeps `level` correct.' },
      { label: 'Line 40', code: 'void reset() {', text: 'No modifier means package-private: `~reset() void`. Classes in the same package may call it, as `main` does here.' },
      { label: 'Line 46', code: 'public String toString() {', text: '`println(ana)` calls `toString()` automatically. Many diagrams leave `toString` out because every class has one.' }
    ],
    sections: [
      {
        title: 'The three compartments',
        text: [
          'Every class box has up to three parts, from top to bottom: **name**, **attributes**, **operations**. Only the name is required. When the other parts do not matter for your question, you leave them out, and the box shows the name only.',
          'Here is the same class `Robot` twice: once as a full box and once as a name-only box. Both are correct UML.'
        ],
        mermaid: `classDiagram
  direction LR
  class Robot {
    -int battery
    -String name
    +walk(int steps) void
    +talk() String
  }
  class RobotShort["Robot (name only)"]`,
        diagramNote: 'Left: the full box. Right: the short form you use in big diagrams, where only the relationships matter.'
      },
      {
        title: 'The four visibility symbols',
        text: ['The symbol in front of a member is the Java access modifier in short form. Learn this table by heart; it is in every class diagram you will read.'],
        table: {
          head: ['Symbol', 'Java keyword', 'Who may use the member', 'Typical use'],
          rows: [
            ['`+`', '`public`', 'every class', 'methods other classes call'],
            ['`-`', '`private`', 'only the same class', 'fields (data stays hidden)'],
            ['`#`', '`protected`', 'the same package and subclasses', 'members a subclass needs'],
            ['`~`', 'no keyword (package-private)', 'only classes in the same package', 'helpers inside one package']
          ],
          note: 'A good default: fields `-`, the methods others need `+`, everything else `-`. This is encapsulation, drawn as a picture.'
        }
      },
      {
        title: 'Writing a member: paper, Mermaid and Java',
        text: [
          'The UML standard puts the **type after the name**, with a colon. Mermaid and Java put the type first. The meaning is the same.',
          'Generic types such as `List<String>` are written with tildes in Mermaid, `List~String~`, because `<` and `>` have other jobs there.'
        ],
        table: {
          head: ['Member', 'UML on paper', 'Mermaid', 'Java'],
          rows: [
            ['private field', '`- score : int`', '`-int score`', '`private int score;`'],
            ['field with start value', '`# level : int = 1`', '`#int level`', '`protected int level = 1;`'],
            ['static field', '`+ playerCount : int` (underlined)', '`+int playerCount$`', '`public static int playerCount;`'],
            ['list field', '`- pets : List<Pet>`', '`-List~Pet~ pets`', '`private List<Pet> pets;`'],
            ['array field', '`- marks : int[]`', '`-int[] marks`', '`private int[] marks;`'],
            ['method', '`+ addPoints(points : int) : void`', '`+addPoints(int points) void`', '`public void addPoints(int points)`'],
            ['constructor', '`+ Player(name : String)`', '`+Player(String name)`', '`public Player(String name)`'],
            ['abstract method', '`+ area() : double` (in italics)', '`+area()* double`', '`public abstract double area();`']
          ]
        }
      },
      {
        title: 'static and abstract in a box',
        text: [
          'An **abstract** class cannot be created with `new`; subclasses fill in its abstract methods (see [interface or abstract class](../interfaces/index.html)). In the box the class name is in italics or carries `<<abstract>>`, and each abstract method is in italics (`*` in Mermaid).',
          'A **static** member belongs to the class itself. It is underlined (`$` in Mermaid). The triangle arrows from `Circle` and `Square` mean `extends`; the next lesson explains every arrow.'
        ],
        mermaid: `classDiagram
  class Shape {
    <<abstract>>
    ~int created$
    #String name
    ~area()* double
    ~describe() String
  }
  class Circle {
    -double radius
    ~area() double
  }
  class Square {
    -double side
    ~area() double
  }
  Shape <|-- Circle
  Shape <|-- Square`,
        diagramNote: '`area()*` is abstract in `Shape` and has a body in each subclass, so it is not in italics there. `created$` is one shared counter.',
        fileName: 'ShapeDemo.java',
        code: `public class ShapeDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(1.0), new Square(2.0) };
        for (Shape shape : shapes) {
            System.out.println(shape.describe());
        }
        System.out.println("Shapes created: " + Shape.created);
    }
}

abstract class Shape {
    static int created = 0;
    protected final String name;

    Shape(String name) {
        this.name = name;
        created++;
    }

    abstract double area();

    String describe() {
        return name + " with area " + Math.round(area() * 100) / 100.0;
    }
}

class Circle extends Shape {
    private final double radius;

    Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    double area() {
        return Math.PI * radius * radius;
    }
}

class Square extends Shape {
    private final double side;

    Square(double side) {
        super("Square");
        this.side = side;
    }

    double area() {
        return side * side;
    }
}`,
        output: `Circle with area 3.14
Square with area 4.0
Shapes created: 2`
      },
      {
        title: 'Interfaces and enums get a stereotype',
        text: [
          'An interface is drawn as a class box with `<<interface>>` above the name. It usually has no attribute compartment, because an interface stores no data.',
          'An enum is drawn with `<<enumeration>>`, and its constants are listed in the middle compartment, one per line. The dashed line with a hollow triangle means `implements`.'
        ],
        mermaid: `classDiagram
  direction LR
  class Playable {
    <<interface>>
    +play() void
  }
  class Mood {
    <<enumeration>>
    HAPPY
    CALM
    SAD
  }
  class Song {
    -String title
    -Mood mood
    +play() void
  }
  Playable <|.. Song
  Song --> Mood`,
        fileName: 'MusicDemo.java',
        code: `public class MusicDemo {
    public static void main(String[] args) {
        Playable song = new Song("Twinkle Twinkle", Mood.CALM);
        song.play();
        System.out.println("Moods: " + Mood.values().length);
    }
}

interface Playable {
    void play();
}

enum Mood { HAPPY, CALM, SAD }

class Song implements Playable {
    private final String title;
    private final Mood mood;

    Song(String title, Mood mood) {
        this.title = title;
        this.mood = mood;
    }

    public void play() {
        System.out.println("Playing " + title + " (" + mood + ")");
    }
}`,
        output: `Playing Twinkle Twinkle (CALM)
Moods: 3`
      },
      {
        title: 'How much to show: wrong vs right',
        text: [
          'A box with twenty getters and setters hides the two methods that matter. Show what helps the question of the diagram, and leave out the rest.',
          '**Wrong:** `getName()`, `setName()`, `getScore()`, `setScore()`, `getLevel()`, `setLevel()`, `toString()`, `equals()`, `hashCode()` all in one box. **Right:** the fields, plus `addPoints()` and `reset()`, the methods that carry the rules of the game.'
        ],
        tip: 'A useful rule: if a reader could guess a member (a getter for every field, `toString`), you may leave it out. If a reader could not guess it (`updateLevel` raises the level every 100 points), show it.'
      }
    ],
    technical: [
      'A class box describes exactly what `javac` reads from your class declaration: the field declarations, the method signatures and the modifiers. The method bodies are not part of the diagram. That is why a class diagram stays short while the code grows.',
      'Visibility is checked by the compiler. If the diagram says `-score` and another class writes `ana.score`, `javac` stops with `score has private access in Player`. The `-` in the box is a promise that the compiler keeps for you.',
      'A static field exists once per class in memory, no matter how many objects you create; each object has its own copy of every non-static field. Underlining (or `$`) is the picture of that difference. The JVM topic shows where both live: [JVM and memory](../jvm-memory/index.html).'
    ],
    tryIt: {
      steps: [
        'On paper, draw the class box for `Square` from step 4, including the inherited parts you think belong to `Shape`.',
        'Add a method `+ perimeter() : double` to `Square` on paper, in UML order.',
        'Add the method to `ShapeDemo.java`: `double perimeter() { return 4 * side; }` and print it in `main` for a `Square` of side 2.',
        'Run `java ShapeDemo.java`.'
      ],
      see: 'the three old lines and a new line with `8.0`. Your drawing and your code now show the same method.'
    },
    check: [
      { q: 'Write the UML attribute for `private double balance = 0.0;`.', a: '`- balance : double = 0.0` (Mermaid: `-double balance`).' },
      { q: 'A method is shown as `~reset() void`. Which Java modifier does it have?', a: 'None: `~` is package-private, so it is written `void reset()`.' },
      { q: 'How do you see in a class box that a member is static, and that a method is abstract?', a: 'Static is underlined (`$` in Mermaid). Abstract is in italics (`*` in Mermaid).' }
    ],
    keyPoints: [
      'A class box has three compartments: name, attributes, operations.',
      'Visibility: `+` public, `-` private, `#` protected, `~` package-private.',
      'On paper: `name : Type`. In Mermaid and Java: type first.',
      'Static is underlined (`$`), abstract is italic (`*`), interfaces and enums get a stereotype.',
      'Show what matters for the question; leave out obvious getters and setters.'
    ],
    commonMistakes: [
      'Writing `+ score : int` for a private field. Fix: fields are almost always `-`; check the Java modifier.',
      'Putting the return type in front on paper: `+ void addPoints(int)`. Fix: UML writes it last: `+ addPoints(points : int) : void`.',
      'Writing `List<Pet>` in Mermaid, which breaks the diagram. Fix: use tildes, `List~Pet~`.',
      'Forgetting that an interface box needs `<<interface>>`. Fix: add the stereotype, otherwise readers think it is a normal class.'
    ],
    related: ['Class Relationships', 'Multiplicity', 'Classes and Objects', 'Interfaces'],
    glossary: U.glossary
  });
})();
