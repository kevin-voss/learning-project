// Creational patterns.
Java.topics.designPatterns = Java.topics.designPatterns || {};
Java.topics.designPatterns.patterns = (Java.topics.designPatterns.patterns || []).concat([
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
  }
]);
