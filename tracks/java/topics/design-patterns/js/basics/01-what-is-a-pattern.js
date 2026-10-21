(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'what-is-a-pattern',
    num: '01',
    title: 'What a design pattern is',
    category: 'basics',
    icon: '◇',
    tagline: 'A name for a solution that keeps coming back',
    realWorld: 'A recipe for pancakes. You did not invent pancakes, and you do not need to. Somebody found a way that works, gave it a name, and now everybody says "let us make pancakes" and knows what that means. You still mix the eggs and the flour yourself.',
    kid: [
      'Imagine you build with toy bricks. Every time you build a house, you need a door. After a while you notice: there is a good way to build a door that never falls down. You give it a name: "the strong door".',
      'Now your friend builds a house too. You do not need to show her every brick. You say "use the strong door here", and she knows what to do.',
      'Programmers do the same. They had the same problems again and again, found good ways to solve them, and gave those ways names. Those names are **design patterns**.'
    ],
    definition: 'A **design pattern** is a named, well-known solution to a problem that comes up again and again when you design classes and objects. It describes **roles** (which classes exist and who calls whom), not finished code.',
    explain: [
      'You already know the building blocks: classes, interfaces, inheritance, composition, enums and collections. A pattern is a proven way to **combine** those blocks for one kind of problem. You write the code yourself, with your own class names.',
      'Every pattern has four parts: a **name** (so people can talk about it), a **problem** (when it helps), a **solution** (the roles and how they work together) and **consequences** (what you win and what it costs).',
      'Most patterns on this page come from the 1994 book "Design Patterns" by four authors, often called the **Gang of Four** (GoF). The book sorts patterns into three families: **creational** (how objects are made), **structural** (how objects are put together) and **behavioral** (how objects talk to each other). MVC is a fourth kind: an **architectural** pattern that organises a whole program.',
      'Two short rules sit under almost every pattern. **Program to an interface**: declare variables and parameters with an interface type, so the concrete class can change. **Prefer composition over inheritance**: give an object a helper in a field ("has a") instead of making a subclass ("is a") for every variation.',
      'A pattern is a tool, not a goal. Good code uses a pattern when the problem is really there. Code that uses patterns "in case we need it some day" gets more classes and is harder to read. Each lesson on this page therefore starts with the **problem**, shows the **pattern**, and ends with **when not to use it**.'
    ],
    why: 'Patterns give you two things. First, ready ideas: you do not need to find a good design from scratch. Second, a shared vocabulary: "this is an Observer" tells a colleague in three words what would take a page to explain.',
    whenUse: 'When you see a problem a pattern was made for: many `if`s choosing a behavior, code that must not know which class it creates, an object that must tell others about changes. Not when the code is small and clear without it.',
    syntax: 'A pattern has no syntax of its own. It is a shape built from what you know: `interface Role { … }`, `class Concrete implements Role { … }`, `class User { private final Role helper; … }`.',
    mermaid: `flowchart TD
  P["Design patterns"] --> C["Creational: how objects are made"]
  P --> S["Structural: how objects are put together"]
  P --> B["Behavioral: how objects talk"]
  P --> A["Architectural: how a program is organised"]
  C --> C1["Singleton, Factory Method, Abstract Factory, Builder"]
  S --> S1["Adapter, Facade, Decorator"]
  B --> B1["Observer, Strategy, Command, Template Method"]
  A --> A1["MVC"]`,
    visualLabel: 'The families on this page',
    visualNote: 'Twelve patterns in four families. The first three families are from the Gang of Four book. MVC organises a whole program and uses some of the others inside.',
    fileName: 'PatternIdeas.java',
    code: `import java.util.List;

interface Notifier {
    void send(String message);
}

class EmailNotifier implements Notifier {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsNotifier implements Notifier {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

// OrderService HAS a Notifier (composition) and knows only the interface.
class OrderService {
    private final Notifier notifier;

    OrderService(Notifier notifier) {
        this.notifier = notifier;
    }

    void placeOrder(String item) {
        System.out.println("Order placed: " + item);
        notifier.send("Your " + item + " is on its way");
    }
}

public class PatternIdeas {
    public static void main(String[] args) {
        OrderService byEmail = new OrderService(new EmailNotifier());
        OrderService bySms = new OrderService(new SmsNotifier());
        byEmail.placeOrder("book");
        bySms.placeOrder("lamp");

        List<Notifier> all = List.of(new EmailNotifier(), new SmsNotifier());
        for (Notifier n : all) {
            n.send("Shop opens at 9");
        }
    }
}`,
    output: `Order placed: book
Email: Your book is on its way
Order placed: lamp
SMS: Your lamp is on its way
Email: Shop opens at 9
SMS: Shop opens at 9`,
    codeSummary: 'No named pattern yet, only the two rules under all of them: `OrderService` talks to the interface `Notifier`, and it gets its notifier from outside through the constructor.',
    codeExplanation: [
      { label: 'Line 3', code: 'interface Notifier {', text: 'The **role**: "something that can send a message". It says what, not how.' },
      { label: 'Line 7', code: 'class EmailNotifier implements Notifier {', text: 'One concrete way to play the role. `SmsNotifier` is a second one. More can come later without changing anything else.' },
      { label: 'Line 21', code: 'private final Notifier notifier;', text: 'Composition: the service **has a** notifier. The field type is the interface, not `EmailNotifier`. That is "program to an interface".' },
      { label: 'Line 23', code: 'OrderService(Notifier notifier) {', text: 'The notifier comes in from outside. This is called **dependency injection**: the class does not pick its helper, the caller does.' },
      { label: 'Line 29', code: 'notifier.send("Your " + item + " is on its way");', text: 'The service calls the role. Which `send` runs depends on the object inside the field. That is polymorphism at work.' },
      { label: 'Line 35', code: 'OrderService byEmail = new OrderService(new EmailNotifier());', text: '`main` decides which notifier to plug in. Swapping email for SMS changes one word here and nothing in `OrderService`.' },
      { label: 'Line 40', code: 'List<Notifier> all = List.of(new EmailNotifier(), new SmsNotifier());', text: 'A list of the interface type can hold any notifier. The loop below treats them all the same.' },
      { label: 'Line 42', code: 'n.send("Shop opens at 9");', text: 'One call, two different results. No `if (type == EMAIL)` is needed anywhere.' }
    ],
    sections: [
      {
        title: 'The four parts of every pattern',
        text: [
          'Each lesson on this page describes a pattern with the same four parts. When you meet a new pattern anywhere, ask these four questions.'
        ],
        table: {
          head: ['Part', 'Question it answers', 'Example: Observer'],
          rows: [
            ['Name', 'What do we call it?', '"Observer" (also "listener", "publish and subscribe")'],
            ['Problem', 'When does it help?', 'Many objects must react when one object changes.'],
            ['Solution', 'Which roles, who calls whom?', 'The subject keeps a list of observers and calls `update` on each one.'],
            ['Consequences', 'What do you win, what does it cost?', 'Win: the subject does not know the observers. Cost: the order of calls is harder to follow.']
          ],
          note: 'A **role** is the part a class plays inside a pattern. Your own class `PriceDisplay` can play the role "observer".'
        }
      },
      {
        title: 'Rule 1: program to an interface',
        text: [
          'If a class names a concrete class everywhere, you must edit it each time you want another one. If it names an interface, you can plug in any class that implements it.',
          'You met this rule in [Interfaces](../interfaces/index.html). Almost every pattern on this page is built on it.'
        ],
        fileName: 'InterfaceRule.java',
        code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class InterfaceRule {
    // The parameter is the interface List, so any list works.
    static int countLong(List<String> words) {
        int count = 0;
        for (String w : words) {
            if (w.length() > 4) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        List<String> a = new ArrayList<>(List.of("tree", "flower", "sun"));
        List<String> b = new LinkedList<>(List.of("planet", "comet", "moon"));
        System.out.println(countLong(a));
        System.out.println(countLong(b));
    }
}`,
        output: `1
2`,
        tip: 'Ask "what does my code need?" If it only needs "something I can loop over and add to", the type is `List`, not `ArrayList`.'
      },
      {
        title: 'Rule 2: prefer composition over inheritance',
        text: [
          'Inheritance ("is a") fixes the behavior when you write the class. If robots can walk or fly and talk or beep, you need a subclass for each mix: four classes for two choices, nine for three, and so on. This is called a **class explosion**.',
          'With composition ("has a") the robot holds a `Mover` in a field. You combine the parts when you create the object, and you can even swap them later.'
        ],
        mermaid: `classDiagram
  class Robot {
    -Mover mover
    +move() void
  }
  class Mover {
    <<interface>>
    +move() String
  }
  Robot --> Mover : has a
  Mover <|.. Walking
  Mover <|.. Flying`,
        diagramNote: 'How to read the class diagrams on this page: a box is a class, `<<interface>>` marks an interface, `+` is public and `-` is private. A dotted line with a hollow triangle means "implements". A plain arrow means "has a field of this type".',
        fileName: 'RobotParts.java',
        code: `interface Mover {
    String move();
}

class Walking implements Mover {
    public String move() { return "walks on two legs"; }
}

class Flying implements Mover {
    public String move() { return "flies with a propeller"; }
}

class Robot {
    private final String name;
    private Mover mover;

    Robot(String name, Mover mover) {
        this.name = name;
        this.mover = mover;
    }

    void setMover(Mover mover) { this.mover = mover; }

    void move() { System.out.println(name + " " + mover.move()); }
}

public class RobotParts {
    public static void main(String[] args) {
        Robot robo = new Robot("Robo", new Walking());
        robo.move();
        robo.setMover(new Flying()); // swap the part at run time
        robo.move();
    }
}`,
        output: `Robo walks on two legs
Robo flies with a propeller`,
        warn: 'Inheritance is not bad. It fits when the subclass really **is a** kind of the base class and you want to reuse its code. It hurts when you use it to combine features.'
      },
      {
        title: 'Patterns are not the goal',
        text: [
          'A pattern adds classes and indirection. **Indirection** means a call goes through one more object before it reaches the real work. That costs reading time.',
          'Use a pattern when it removes real pain: repeated `if` chains, code you must edit for every new case, classes that know too much about each other. If none of that is there, the plain code is the better code.'
        ],
        table: {
          head: ['Sign in your code', 'Pattern that may help'],
          rows: [
            ['An `if` or `switch` that picks a behavior, repeated in many places', 'Strategy'],
            ['A constructor with many parameters, most of them optional', 'Builder'],
            ['A class you cannot change has the wrong method names', 'Adapter'],
            ['Many objects must react when one object changes', 'Observer'],
            ['You want to undo actions or put them in a queue', 'Command'],
            ['You want to add features to an object without new subclasses', 'Decorator']
          ],
          note: 'This table is a first guide. Each lesson below shows the problem in code, so you can recognise it.'
        }
      }
    ],
    technical: [
      'For the compiler a pattern is invisible: it sees ordinary classes, interfaces and method calls. The pattern lives only in how you arranged them. That is why the same pattern looks a bit different in every code base.',
      'Most patterns rely on **dynamic dispatch**: when you call `notifier.send(…)` on a variable of an interface type, the JVM looks at the real object at run time and runs its method. The call site does not change when you add a new class. This is what makes "add a class, do not edit old code" possible.',
      'Modern Java makes some patterns shorter. A one-method interface such as `Notifier` is a **functional interface**, so a lambda `msg -> System.out.println(msg)` can play the role instead of a whole class. You will see this in Strategy, Observer and Command.'
    ],
    tryIt: {
      steps: [
        'Copy `PatternIdeas.java` and run it with `java PatternIdeas.java`.',
        'Add a third class `PushNotifier implements Notifier` that prints `Push: ` and the message.',
        'In `main`, create `new OrderService(new PushNotifier())` and place an order for `"chair"`.',
        'Check that you did not need to change `OrderService` at all.'
      ],
      see: 'The new lines `Order placed: chair` and `Push: Your chair is on its way`, with `OrderService` unchanged.'
    },
    check: [
      { q: 'What are the four parts that describe a pattern?', a: 'Name, problem, solution (the roles and how they work together) and consequences (benefits and costs).' },
      { q: 'What does "program to an interface" mean in one line of Java?', a: 'Declare with the interface type, for example `List<String> names = new ArrayList<>();` or a parameter `Notifier notifier`, so the concrete class can be swapped.' },
      { q: 'Why can composition avoid a "class explosion"?', a: 'Each feature becomes its own small object in a field. You combine them when you create the object, instead of writing one subclass for every combination.' }
    ],
    keyPoints: [
      'A design pattern is a named solution to a problem that keeps coming back. It is an idea, not a library.',
      'Every pattern has a name, a problem, a solution with roles, and consequences.',
      'Families: creational (making objects), structural (putting them together), behavioral (talking), architectural (whole program).',
      'Program to an interface, and prefer composition over inheritance.',
      'Use a pattern only when the problem is really there.'
    ],
    commonMistakes: [
      'Copying pattern code without the problem. A `ShapeFactoryProviderSingleton` for two shapes is harder than `new Circle()`. Start with plain code and add a pattern when it hurts.',
      'Declaring with the concrete class: `ArrayList<String> list = …` in a parameter. Use `List<String>` so callers can pass any list.',
      'Using inheritance to combine features: `class FlyingTalkingRobot extends FlyingRobot`. Put each feature in its own object and hold it in a field.',
      'Thinking a pattern must look exactly like the book. The roles matter, the class names and small details may differ.'
    ],
    related: ['Strategy', 'Interfaces', 'Classes and Objects', 'Singleton'],
    glossary: DP.glossary
  });
})();
