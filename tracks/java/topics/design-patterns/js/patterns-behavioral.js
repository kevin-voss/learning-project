// Behavioral and architectural patterns.
Java.topics.designPatterns = Java.topics.designPatterns || {};
Java.topics.designPatterns.patterns = (Java.topics.designPatterns.patterns || []).concat([
  {
    id: 'observer',
    num: '08',
    name: 'Observer',
    category: 'behavioral',
    icon: '◈',
    tagline: 'Subscribe and get notified',
    realWorld: 'A newsletter. You subscribe → new issues arrive automatically. You unsubscribe → they stop. The publisher doesn\'t need to know who you are — just that you\'re subscribed.',
    definition: 'Defines a subscription mechanism to notify multiple objects (observers) about events happening in the object they\'re observing (subject).',
    code: `// Observer — gets notified
interface Observer {
    void update(String event);
}

// Subject — sends notifications
class Newsletter {
    private List<Observer> subscribers = new ArrayList<>();
    private String name;
    
    public Newsletter(String name) { this.name = name; }
    
    public void subscribe(Observer o) {
        subscribers.add(o);
        System.out.println("New subscriber to " + name);
    }
    
    public void unsubscribe(Observer o) {
        subscribers.remove(o);
    }
    
    public void publish(String issue) {
        System.out.println("\\n" + name + " — Issue: " + issue);
        for (Observer o : subscribers) {
            o.update(issue);
        }
    }
}

// Concrete observer
class Reader implements Observer {
    private String name;
    public Reader(String n) { name = n; }
    public void update(String issue) {
        System.out.println(name + " received: " + issue);
    }
}

// Usage
Newsletter news = new Newsletter("Tech Daily");
Reader alice = new Reader("Alice");
Reader bob = new Reader("Bob");
news.subscribe(alice);
news.subscribe(bob);
news.publish("Java 21 Released");`,
    whenToUse: [
      'Changes in one object require updating others',
      'An object should notify others without knowing who they are',
      'You need broadcast communication',
      'You want loose coupling between publisher and subscribers'
    ],
    whyUse: 'Loose coupling — the subject doesn\'t need to know about subscribers. Easy to add/remove subscribers at runtime. Natural fit for event-driven systems.',
    pros: [
      'Open/Closed — add observers without changing subject',
      'Runtime subscribe/unsubscribe',
      'Loose coupling between subject and observers',
      'Broadcast to many at once'
    ],
    cons: [
      'Unexpected update order',
      'Memory leaks if observers aren\'t removed (lapsed listener)',
      'Performance hit with many observers',
      'Hard to debug chains of updates'
    ],
    related: ['Strategy', 'Command', 'MVC']
  },
  {
    id: 'strategy',
    num: '09',
    name: 'Strategy',
    category: 'behavioral',
    icon: '⇆',
    tagline: 'Swap algorithms at runtime',
    realWorld: 'A navigation app. Choose walking, driving, cycling, or transit — each is a strategy. The app doesn\'t hard-code one route algorithm; you pick the right one at runtime.',
    definition: 'Defines a family of algorithms, encapsulates each, and makes them interchangeable at runtime.',
    code: `// Strategy — the algorithm interface
interface RouteStrategy {
    void buildRoute(String from, String to);
}

// Concrete strategies
class WalkingRoute implements RouteStrategy {
    public void buildRoute(String from, String to) {
        System.out.println("Walking route: " + from + " -> " + to);
    }
}

class DrivingRoute implements RouteStrategy {
    public void buildRoute(String from, String to) {
        System.out.println("Driving route: " + from + " -> " + to);
    }
}

class TransitRoute implements RouteStrategy {
    public void buildRoute(String from, String to) {
        System.out.println("Transit route: " + from + " -> " + to);
    }
}

// Context — uses a strategy
class Navigator {
    private RouteStrategy strategy;
    
    public void setStrategy(RouteStrategy s) {
        this.strategy = s;
    }
    
    public void navigate(String from, String to) {
        strategy.buildRoute(from, to);
    }
}

// Usage — swap strategies at runtime
Navigator nav = new Navigator();
nav.setStrategy(new WalkingRoute());
nav.navigate("Home", "Park");
nav.setStrategy(new DrivingRoute());
nav.navigate("Home", "Office");`,
    whenToUse: [
      'Multiple variants of an algorithm exist',
      'You want to switch algorithms at runtime',
      'You have lots of conditionals doing similar things',
      'Algorithms should be isolated from the client'
    ],
    whyUse: 'Replaces messy if/else chains with swappable objects. Makes algorithms testable, replaceable, and reusable. Each algorithm lives in its own class.',
    pros: [
      'Open/Closed — add strategies without context changes',
      'Swaps at runtime',
      'Isolates algorithm code from client',
      'Replaces inheritance with composition'
    ],
    cons: [
      'Client must know about strategies to choose',
      'More classes and objects',
      'Overkill if only a couple of variants exist'
    ],
    related: ['Command', 'Observer']
  },
  {
    id: 'command',
    num: '10',
    name: 'Command',
    category: 'behavioral',
    icon: '▶',
    tagline: 'Turn requests into objects',
    realWorld: 'A restaurant. The customer writes an order on a slip (the command). The waiter takes the slip to the kitchen. The chef executes it. The slip can be queued, modified, even cancelled — decoupling customer from cook.',
    definition: 'Turns a request into a standalone object. Lets you queue, log, undo, and parameterize requests.',
    code: `// Receiver — does the actual work
class Light {
    public void turnOn() { System.out.println("Light ON"); }
    public void turnOff() { System.out.println("Light OFF"); }
}

// Command — encapsulates a request
interface Command {
    void execute();
    void undo();
}

class TurnOnCommand implements Command {
    private Light light;
    public TurnOnCommand(Light l) { light = l; }
    public void execute() { light.turnOn(); }
    public void undo() { light.turnOff(); }
}

class TurnOffCommand implements Command {
    private Light light;
    public TurnOffCommand(Light l) { light = l; }
    public void execute() { light.turnOff(); }
    public void undo() { light.turnOn(); }
}

// Invoker — doesn\'t know what commands do
class RemoteControl {
    private Stack<Command> history = new Stack<>();
    
    public void pressButton(Command cmd) {
        cmd.execute();
        history.push(cmd);
    }
    
    public void pressUndo() {
        if (!history.isEmpty()) {
            history.pop().undo();
        }
    }
}

// Usage
Light light = new Light();
RemoteControl remote = new RemoteControl();
remote.pressButton(new TurnOnCommand(light));
remote.pressButton(new TurnOffCommand(light));
remote.pressUndo(); // light back on`,
    whenToUse: [
      'You need undo/redo functionality',
      'You want to queue, schedule, or log operations',
      'You need to parameterize objects with operations',
      'You want to decouple the sender from the receiver'
    ],
    whyUse: 'Decouples sender from receiver. Enables undo, queuing, logging, and transactions. Turns "do this" into a first-class object you can manipulate.',
    pros: [
      'Open/Closed — add commands without changing existing code',
      'Undo, redo, queue, and log become trivial',
      'Decouples invoker from receiver',
      'Composable — macro commands'
    ],
    cons: [
      'More classes for every command',
      'Adds complexity for simple operations',
      'Undo logic can get tricky'
    ],
    related: ['Strategy', 'Observer']
  },
  {
    id: 'template-method',
    num: '11',
    name: 'Template Method',
    category: 'behavioral',
    icon: '⌗',
    tagline: 'Skeleton in base, details in subclasses',
    realWorld: 'A cooking recipe. Steps are fixed: prep, cook, season, serve. But each dish varies the details: pasta boils, steak grills, salad tosses. The skeleton stays the same; the steps change.',
    definition: 'Defines the skeleton of an algorithm in a base class, letting subclasses override specific steps without changing the structure.',
    code: `// Abstract base — defines the algorithm skeleton
abstract class Game {
    // Template method — final, can\'t be overridden
    public final void play() {
        initialize();
        startPlay();
        endPlay();
    }
    
    // Steps — implemented by subclasses
    abstract void initialize();
    abstract void startPlay();
    
    // Hook — optional override
    void endPlay() {
        System.out.println("Game over");
    }
}

class Chess extends Game {
    void initialize() { System.out.println("Setting up chess board"); }
    void startPlay()  { System.out.println("White moves first"); }
}

class Football extends Game {
    void initialize() { System.out.println("Setting up football field"); }
    void startPlay()  { System.out.println("Kickoff!"); }
    void endPlay()    { System.out.println("Match ended — 90 minutes"); }
}

// Usage — same flow, different details
Game chess = new Chess();
chess.play();
Game football = new Football();
football.play();`,
    whenToUse: [
      'Algorithms have a fixed structure but variable steps',
      'Common code with hooks for customization',
      'Subclasses should extend only certain parts of an algorithm',
      'You want to enforce a process flow'
    ],
    whyUse: 'Code reuse — common steps live in the base class. Forces a consistent algorithm structure while allowing step customization. Reduces duplication.',
    pros: [
      'Code reuse — common parts in base class',
      'Open/Closed — add new variants as subclasses',
      'Consistent algorithm structure',
      'Hooks let subclasses fine-tune behavior'
    ],
    cons: [
      'Limited by inheritance (not composition)',
      'Can violate Liskov Substitution if steps misused',
      'Hard to maintain as subclasses grow',
      'Algorithm structure can become rigid'
    ],
    related: ['Strategy', 'Factory Method']
  },
  {
    id: 'mvc',
    num: '12',
    name: 'MVC',
    category: 'architectural',
    icon: '∭',
    tagline: 'Model · View · Controller',
    realWorld: 'A restaurant. Model = kitchen and ingredients (data). View = the menu and plates (presentation). Controller = the waiter (takes orders, coordinates). Each has its own job, and they don\'t overlap.',
    definition: 'Separates an application into three connected components: Model (data and logic), View (UI), and Controller (input handling and coordination).',
    code: `// Model — data and business logic
class Student {
    private String name;
    private int grade;
    
    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
    
    public String getName()  { return name; }
    public int getGrade()    { return grade; }
    public void setGrade(int g) { grade = g; }
}

// View — presentation only
class StudentView {
    public void show(Student student) {
        System.out.println("Student: " + student.getName());
        System.out.println("Grade: " + student.getGrade());
        System.out.println("------");
    }
}

// Controller — coordinates Model and View
class StudentController {
    private Student model;
    private StudentView view;
    
    public StudentController(Student m, StudentView v) {
        model = m;
        view = v;
    }
    
    public void updateGrade(int newGrade) {
        model.setGrade(newGrade);
        view.show(model); // refresh view
    }
}

// Usage
Student student = new Student("Alice", 85);
StudentView view = new StudentView();
StudentController controller = new StudentController(student, view);
controller.updateGrade(92); // updates model, refreshes view`,
    whenToUse: [
      'Any app with a user interface',
      'When you want separation of concerns',
      'Multiple views of the same data',
      'Teams need to work on UI and logic in parallel'
    ],
    whyUse: 'Separation of concerns. Models stay focused on data. Views stay focused on presentation. Controllers orchestrate. Makes code testable and maintainable.',
    pros: [
      'Clear separation of concerns',
      'Parallel development — UI and logic teams',
      'Multiple views for one model',
      'Easier to test components in isolation'
    ],
    cons: [
      'Overkill for small apps',
      'Controller can become bloated ("fat controllers")',
      'Tight coupling between M, V, and C if not careful',
      'Learning curve for newcomers'
    ],
    related: ['Observer', 'Strategy']
  }
]);
