Java.topics.designPatterns = Java.topics.designPatterns || {};

Java.topics.designPatterns.patterns = [
  {
    id: 'singleton',
    num: '01',
    name: 'Singleton',
    category: 'creational',
    icon: '◉',
    tagline: 'One instance to rule them all',
    realWorld: 'The President of a country. There can only be one at a time, and every reference to "the President" points to the exact same person — not a clone, not a copy.',
    definition: 'Ensures a class has only one instance and provides a global point of access to it.',
    code: `public class Database {
    // volatile — visible across threads
    private static volatile Database instance;
    
    // private constructor — no external "new"
    private Database() {
        System.out.println("Initializing DB connection...");
    }
    
    // double-checked locking
    public static Database getInstance() {
        if (instance == null) {
            synchronized (Database.class) {
                if (instance == null) {
                    instance = new Database();
                }
            }
        }
        return instance;
    }
    
    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// Usage
Database db1 = Database.getInstance();
Database db2 = Database.getInstance();
System.out.println(db1 == db2); // true — same object`,
    whenToUse: [
      'You need exactly one instance shared across the entire app',
      'For expensive resources: DB connections, loggers, cache',
      'When global configuration or state must be consistent',
      'You want lazy initialization (create only when needed)'
    ],
    whyUse: 'Avoids the cost of repeatedly creating expensive objects. Provides a single source of truth for shared state. Gives a controlled, single access point.',
    pros: [
      'Guarantees a single instance',
      'Lazy initialization — saves resources',
      'Global access point',
      'Thread-safe with proper implementation'
    ],
    cons: [
      'Acts like a global variable — hides dependencies',
      'Makes unit testing harder (hard to mock)',
      'Violates Single Responsibility Principle',
      'Multithreading bugs if implemented wrong'
    ],
    related: ['Factory Method', 'Abstract Factory']
  },
  {
    id: 'factory-method',
    num: '02',
    name: 'Factory Method',
    category: 'creational',
    icon: '⬡',
    tagline: 'Let subclasses decide what to create',
    realWorld: 'A logistics company. Road logistics uses trucks. Sea logistics uses ships. The company doesn\'t hard-code "Truck" everywhere — each branch decides which vehicle fits.',
    definition: 'Defines an interface for creating objects, but lets subclasses decide which class to instantiate.',
    code: `// Product
interface Transport {
    void deliver(String cargo);
}

// Concrete products
class Truck implements Transport {
    public void deliver(String cargo) {
        System.out.println("Truck delivering " + cargo + " by road");
    }
}

class Ship implements Transport {
    public void deliver(String cargo) {
        System.out.println("Ship delivering " + cargo + " by sea");
    }
}

// Creator — defines the factory method
abstract class Logistics {
    abstract Transport createTransport(); // factory method
    
    public void planDelivery(String cargo) {
        Transport t = createTransport();
        t.deliver(cargo);
    }
}

// Concrete creators
class RoadLogistics extends Logistics {
    Transport createTransport() { return new Truck(); }
}

class SeaLogistics extends Logistics {
    Transport createTransport() { return new Ship(); }
}

// Usage
Logistics logistics = new RoadLogistics();
logistics.planDelivery("Laptops");`,
    whenToUse: [
      'You don\'t know the exact types of objects your code will need',
      'You want to let users extend your library with new types',
      'You want to centralize object creation in one place',
      'Subclasses should choose what to create'
    ],
    whyUse: 'Decouples client code from concrete classes. Adding a new type doesn\'t break existing code. Puts creation logic where it belongs.',
    pros: [
      'Avoids tight coupling to concrete classes',
      'Single Responsibility — creation in one place',
      'Open/Closed — add types without changing client',
      'Reuses existing objects easily'
    ],
    cons: [
      'More classes and boilerplate',
      'Need a new subclass for every product variant',
      'Can be overkill for simple object creation'
    ],
    related: ['Abstract Factory', 'Singleton', 'Builder']
  },
  {
    id: 'abstract-factory',
    num: '03',
    name: 'Abstract Factory',
    category: 'creational',
    icon: '⊞',
    tagline: 'Families of objects that match',
    realWorld: 'A furniture store. You order "Victorian": chair, sofa, and table all match the Victorian style. Switch to "Modern" and all three change together. The store never mixes styles.',
    definition: 'Lets you produce families of related objects without specifying their concrete classes.',
    code: `// Products — chair and sofa, multiple families
interface Chair { void sit(); }
interface Sofa { void lie(); }

// Victorian family
class VictorianChair implements Chair {
    public void sit() { System.out.println("Sitting on Victorian chair"); }
}
class VictorianSofa implements Sofa {
    public void lie() { System.out.println("Lying on Victorian sofa"); }
}

// Modern family
class ModernChair implements Chair {
    public void sit() { System.out.println("Sitting on Modern chair"); }
}
class ModernSofa implements Sofa {
    public void lie() { System.out.println("Lying on Modern sofa"); }
}

// Abstract factory — creates families
interface FurnitureFactory {
    Chair createChair();
    Sofa createSofa();
}

class VictorianFactory implements FurnitureFactory {
    public Chair createChair() { return new VictorianChair(); }
    public Sofa createSofa() { return new VictorianSofa(); }
}

class ModernFactory implements FurnitureFactory {
    public Chair createChair() { return new ModernChair(); }
    public Sofa createSofa() { return new ModernSofa(); }
}`,
    whenToUse: [
      'Your code needs to work with families of related objects',
      'You want to swap an entire family at runtime',
      'Products must be consistent — never mixed',
      'You have multiple product variants that pair together'
    ],
    whyUse: 'Guarantees products from the same family work together. Lets you switch families without touching client code. Centralizes family rules.',
    pros: [
      'Products always match — no mixing',
      'Loose coupling — client doesn\'t know concrete classes',
      'Easy to add new families (Open/Closed)',
      'Consistent interfaces across families'
    ],
    cons: [
      'Hard to add new product types (must edit every factory)',
      'More interfaces and classes',
      'Can be overkill if only one product type'
    ],
    related: ['Factory Method', 'Builder']
  },
  {
    id: 'builder',
    num: '04',
    name: 'Builder',
    category: 'creational',
    icon: '▦',
    tagline: 'Step by step, not all at once',
    realWorld: 'Ordering a custom burger: "Burger, no onions, extra cheese, no pickles, well done." You build it step by step rather than passing 12 parameters to a single constructor.',
    definition: 'Lets you construct complex objects step by step. The same process can create different representations.',
    code: `// Product with many optional parts
class Pizza {
    String dough, sauce;
    boolean cheese, pepperoni, mushrooms;
    
    private Pizza() {}
    
    static class Builder {
        private Pizza pizza = new Pizza();
        
        Builder dough(String d)    { pizza.dough = d; return this; }
        Builder sauce(String s)    { pizza.sauce = s; return this; }
        Builder cheese()           { pizza.cheese = true; return this; }
        Builder pepperoni()        { pizza.pepperoni = true; return this; }
        Builder mushrooms()        { pizza.mushrooms = true; return this; }
        
        Pizza build() { return pizza; }
    }
    
    public String toString() {
        return "Pizza{" + dough + ", " + sauce + 
               (cheese ? ", cheese" : "") +
               (pepperoni ? ", pepperoni" : "") + "}";
    }
}

// Usage — clean, readable, flexible
Pizza p = new Pizza.Builder()
    .dough("thin")
    .sauce("tomato")
    .cheese()
    .pepperoni()
    .build();`,
    whenToUse: [
      'Many optional parameters or configurations',
      'You want to avoid "telescoping constructors"',
      'You need immutable objects built step by step',
      'The same construction should produce different results'
    ],
    whyUse: 'Replaces ugly multi-argument constructors with readable, fluent code. Makes object construction explicit and self-documenting.',
    pros: [
      'Readable construction of complex objects',
      'Step-by-step, fluent API',
      'Reusable builders — same process, different results',
      'Allows immutable products'
    ],
    cons: [
      'More classes and code',
      'Builder code duplicates product fields',
      'Overkill for simple objects'
    ],
    related: ['Factory Method', 'Abstract Factory', 'Singleton']
  },
  {
    id: 'adapter',
    num: '05',
    name: 'Adapter',
    category: 'structural',
    icon: '⇄',
    tagline: 'Make incompatible things work',
    realWorld: 'A travel power adapter. Your US laptop plug won\'t fit a European outlet. The adapter sits between them, translating one shape to another without changing either side.',
    definition: 'Allows incompatible interfaces to work together by wrapping one object with an adapter that translates calls.',
    code: `// Target — what the client expects
interface Target {
    void request();
}

// Adaptee — has useful behavior but wrong interface
class Adaptee {
    public void specificRequest() {
        System.out.println("Doing the actual work...");
    }
}

// Adapter — wraps Adaptee, makes it look like Target
class Adapter implements Target {
    private Adaptee adaptee;
    
    public Adapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }
    
    public void request() {
        // translate the call
        adaptee.specificRequest();
    }
}

// Usage — client only knows Target
Target target = new Adapter(new Adaptee());
target.request(); // works!`,
    whenToUse: [
      'You want to use an existing class with an incompatible interface',
      'You need to integrate third-party or legacy code',
      'You can\'t modify the existing class',
      'Several classes do similar things but with different method names'
    ],
    whyUse: 'Lets you reuse existing code without modification. Bridges new and old systems cleanly. Solves interface mismatch problems.',
    pros: [
      'Single Responsibility — separates interface conversion',
      'Open/Closed — add adapters without changing existing code',
      'Reuse legacy code easily',
      'Can adapt multiple sources to one target'
    ],
    cons: [
      'Adds complexity and extra classes',
      'Sometimes easier to just rewrite',
      'Many adapters can clutter the codebase'
    ],
    related: ['Facade', 'Decorator']
  },
  {
    id: 'facade',
    num: '06',
    name: 'Facade',
    category: 'structural',
    icon: '▤',
    tagline: 'A friendly front for a complex system',
    realWorld: 'A universal remote. One "Watch Movie" button turns on the TV, sets the receiver, dims the lights, starts the player. You don\'t need to know about each device — the facade hides them.',
    definition: 'Provides a simplified interface to a complex subsystem of classes, libraries, or frameworks.',
    code: `// Complex subsystem
class CPU {
    void freeze() { System.out.println("CPU freeze"); }
    void jump(long position) { System.out.println("CPU jump to " + position); }
    void execute() { System.out.println("CPU execute"); }
}
class Memory {
    void load(long position, byte[] data) {
        System.out.println("Memory load at " + position);
    }
}
class HardDrive {
    byte[] read(long lba, int size) {
        System.out.println("HDD read " + size + " bytes");
        return new byte[size];
    }
}

// Facade — one simple interface
class Computer {
    private CPU cpu = new CPU();
    private Memory memory = new Memory();
    private HardDrive hd = new HardDrive();
    
    public void start() {
        cpu.freeze();
        memory.load(0, hd.read(0, 1024));
        cpu.jump(0);
        cpu.execute();
    }
}

// Usage — client doesn\'t see the complexity
Computer computer = new Computer();
computer.start();`,
    whenToUse: [
      'A subsystem is too complex to use directly',
      'You want to layer your architecture',
      'Multiple clients need the same simplified entry point',
      'You\'re integrating with a complex library or framework'
    ],
    whyUse: 'Simplifies client code. Reduces coupling to subsystem internals. Gives you a clear, narrow API surface to maintain.',
    pros: [
      'Isolates client from subsystem complexity',
      'Simplified, focused API',
      'Loose coupling — subsystem can change freely',
      'Can add multiple facades for different use cases'
    ],
    cons: [
      'Facade can become a "god object"',
      'Tight coupling if clients bypass facade',
      'Extra layer of abstraction'
    ],
    related: ['Adapter', 'Decorator']
  },
  {
    id: 'decorator',
    num: '07',
    name: 'Decorator',
    category: 'structural',
    icon: '⬚',
    tagline: 'Wrap, don\'t subclass',
    realWorld: 'Ordering coffee. Start with a basic coffee. Add milk (+$0.50). Add sugar (+$0.20). Add whipped cream (+$1.00). Each topping wraps the previous — you stack behaviors dynamically.',
    definition: 'Attaches new behaviors to objects dynamically by wrapping them in special wrapper objects.',
    code: `// Component
interface Coffee {
    double cost();
    String description();
}

// Concrete component
class SimpleCoffee implements Coffee {
    public double cost() { return 2.0; }
    public String description() { return "Simple coffee"; }
}

// Base decorator — wraps a Coffee
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    public CoffeeDecorator(Coffee c) { this.coffee = c; }
}

// Concrete decorators — add behavior
class Milk extends CoffeeDecorator {
    public Milk(Coffee c) { super(c); }
    public double cost() { return coffee.cost() + 0.5; }
    public String description() { return coffee.description() + ", milk"; }
}

class Sugar extends CoffeeDecorator {
    public Sugar(Coffee c) { super(c); }
    public double cost() { return coffee.cost() + 0.2; }
    public String description() { return coffee.description() + ", sugar"; }
}

// Usage — stack dynamically
Coffee order = new Sugar(new Milk(new SimpleCoffee()));
System.out.println(order.description()); // Simple coffee, milk, sugar
System.out.println("$" + order.cost());  // 2.7`,
    whenToUse: [
      'Add behavior at runtime without modifying code',
      'Subclassing would explode (too many combinations)',
      'You want to compose behaviors freely',
      'You need to add responsibilities to specific objects, not all'
    ],
    whyUse: 'Composition over inheritance. Add or remove behaviors at runtime. Avoids the combinatorial explosion of subclasses.',
    pros: [
      'More flexible than static inheritance',
      'Compose behaviors at runtime',
      'Single Responsibility — each decorator does one thing',
      'Open/Closed — new decorators without changing code'
    ],
    cons: [
      'Many small objects, hard to track',
      'Hard to remove a decorator mid-stack',
      'Order of decorators matters',
      'Initialization code can get verbose'
    ],
    related: ['Adapter', 'Strategy']
  },
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
];
