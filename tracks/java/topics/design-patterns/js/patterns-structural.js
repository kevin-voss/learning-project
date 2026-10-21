// Structural patterns.
Java.topics.designPatterns = Java.topics.designPatterns || {};
Java.topics.designPatterns.patterns = (Java.topics.designPatterns.patterns || []).concat([
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
  }
]);
