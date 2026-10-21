(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'builder',
    num: '05',
    title: 'Builder',
    category: 'creational',
    icon: '▦',
    tagline: 'Step by step, not all at once',
    realWorld: 'Ordering at a burger counter. You do not shout twelve words at once in a fixed order. You say: "a burger, with cheese, no onions, extra pickles, that is all." Each wish is one clear step, and "that is all" tells the cook to make it.',
    kid: [
      'Imagine you build a snowman with a friend. First the big ball. Then the middle ball. Then the head. Then you can add a carrot nose, a hat or a scarf, if you want.',
      'You do not need to say everything at the start. You add one thing after the other, and each thing has a clear name: "now the hat". When you are happy, you say "done!"',
      'A **Builder** works like that. You tell it the parts one by one, by name, and at the end you say `build()`. Then you get the finished object.'
    ],
    definition: 'The **Builder** pattern creates a complex object **step by step** through a separate builder object. Each step is a named method, and a final `build()` call checks the parts and returns the finished, usually **immutable**, object.',
    explain: [
      'Some objects have many fields, and most of them are optional. A constructor with eight parameters is hard to call: you must remember the order, and `new Pizza("thin", "tomato", true, false, true)` does not say what `true` means.',
      'A **builder** is a helper object that collects the values. It has one method per part, named after the part: `cheese()`, `size(30)`. Each method stores the value and returns the builder itself (`return this;`). That is why you can chain the calls: `builder.cheese().mushrooms()`. Such a chain is called a **fluent interface**.',
      'The last call is `build()`. It can **validate** the parts (is the size positive? is a required part missing?) and then creates the real object in one go, through a private constructor that takes the builder.',
      'The finished object is often **immutable**: its fields are `final`, and it has no setters. A half-built pizza never exists outside the builder, so nobody can see an object in a broken, half-filled state.',
      'In Java the builder is usually a `static` nested class inside the product: `Pizza.Builder`. Nested means it is written inside the other class; `static` means you can create it without a `Pizza` object first.'
    ],
    why: 'It replaces long, unreadable constructors and lets you name every value at the call site. It also lets you build an immutable object from many optional parts and check them in one place.',
    whenUse: 'When an object has many parameters, especially optional ones or several of the same type, or when you want an immutable object with a validation step. Not for an object with two or three required fields: a constructor or a record is shorter.',
    syntax: '`Product p = new Product.Builder(required).optionA(x).optionB(y).build();` with `static class Builder { Builder optionA(T x) { this.a = x; return this; } Product build() { return new Product(this); } }`.',
    pros: [
      'The call site names every value, so it reads like a sentence.',
      'Optional parts can be left out without many constructors.',
      'The product can be immutable and is never half-built.',
      'One place (`build()`) checks that the parts make sense.'
    ],
    cons: [
      'Every field is written twice: in the product and in the builder.',
      'More code than a plain constructor.',
      'Forgetting `build()` gives you a builder, not the product.'
    ],
    fileName: 'PizzaOrder.java',
    code: `class Pizza {
    private final int size; // required
    private final String sauce; // optional, with a default
    private final boolean cheese;
    private final boolean mushrooms;

    private Pizza(Builder b) { // only the builder can call this
        this.size = b.size;
        this.sauce = b.sauce;
        this.cheese = b.cheese;
        this.mushrooms = b.mushrooms;
    }

    public String toString() {
        return size + " cm, " + sauce + (cheese ? ", cheese" : "") + (mushrooms ? ", mushrooms" : "");
    }

    static class Builder {
        private final int size;
        private String sauce = "tomato";
        private boolean cheese;
        private boolean mushrooms;

        Builder(int size) { this.size = size; }

        Builder sauce(String sauce) { this.sauce = sauce; return this; }
        Builder cheese() { this.cheese = true; return this; }
        Builder mushrooms() { this.mushrooms = true; return this; }

        Pizza build() { return new Pizza(this); }
    }
}

public class PizzaOrder {
    public static void main(String[] args) {
        Pizza big = new Pizza.Builder(32).cheese().mushrooms().build();
        Pizza small = new Pizza.Builder(20).sauce("pesto").build();
        System.out.println(big);
        System.out.println(small);
    }
}`,
    output: `32 cm, tomato, cheese, mushrooms
20 cm, pesto`,
    codeSummary: 'Each order names only the parts it wants. The builder collects them, and `build()` creates an immutable `Pizza` in one step.',
    codeExplanation: [
      { label: 'Line 2', code: 'private final int size; // required', text: 'All product fields are `final`: once a pizza exists, it cannot change.' },
      { label: 'Line 7', code: 'private Pizza(Builder b) { // only the builder can call this', text: 'The private constructor takes the builder and copies its values. Nobody can make a pizza without going through the builder.' },
      { label: 'Line 18', code: 'static class Builder {', text: 'A static nested class. You create it with `new Pizza.Builder(…)`, no pizza needed first.' },
      { label: 'Line 20', code: 'private String sauce = "tomato";', text: 'Optional parts get their default value here. If the caller never calls `sauce(…)`, tomato stays.' },
      { label: 'Line 24', code: 'Builder(int size) { this.size = size; }', text: 'Required parts go into the builder\'s constructor, so you cannot forget them.' },
      { label: 'Line 26', code: 'Builder sauce(String sauce) { this.sauce = sauce; return this; }', text: 'A step method: store the value, then `return this` so the next call can follow with a dot.' },
      { label: 'Line 30', code: 'Pizza build() { return new Pizza(this); }', text: 'The last step. It hands the whole builder to the private constructor.' },
      { label: 'Line 36', code: 'Pizza big = new Pizza.Builder(32).cheese().mushrooms().build();', text: 'The fluent chain: each method returns the same builder, and `build()` returns the pizza.' },
      { label: 'Line 38', code: 'System.out.println(big);', text: '`println` calls `toString()`, which shows only the parts that are set.' }
    ],
    sections: [
      {
        title: 'The problem: a constructor nobody can read',
        text: [
          'With many parameters of the same type, the call site is a row of `true` and `false`. Swap two of them and the compiler cannot help: both are `boolean`.',
          'People then add more constructors for the common cases. This is called **telescoping constructors**: each one calls the next with one more parameter. It does not fix the readability.'
        ],
        fileName: 'LongConstructor.java',
        code: `class Pizza {
    private final int size;
    private final String sauce;
    private final boolean cheese;
    private final boolean mushrooms;
    private final boolean olives;

    Pizza(int size, String sauce, boolean cheese, boolean mushrooms, boolean olives) {
        this.size = size;
        this.sauce = sauce;
        this.cheese = cheese;
        this.mushrooms = mushrooms;
        this.olives = olives;
    }

    public String toString() {
        return size + " cm, " + sauce + (cheese ? ", cheese" : "")
            + (mushrooms ? ", mushrooms" : "") + (olives ? ", olives" : "");
    }
}

public class LongConstructor {
    public static void main(String[] args) {
        // I wanted cheese and olives. Which true is which?
        Pizza p = new Pizza(30, "tomato", true, true, false);
        System.out.println(p);
    }
}`,
        output: `30 cm, tomato, cheese, mushrooms`,
        warn: 'The pain: the customer wanted olives and got mushrooms. The code compiles, and nothing tells you the order was wrong.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class Pizza {
    -int size
    -String sauce
    -boolean cheese
    -Pizza(Builder b)
    +toString() String
  }
  class Builder {
    -int size
    -String sauce
    -boolean cheese
    +Builder(int size)
    +sauce(String) Builder
    +cheese() Builder
    +build() Pizza
  }
  Builder ..> Pizza : creates
  Pizza -- Builder : nested inside`,
        diagramNote: 'The builder mirrors the product\'s fields. Its step methods return `Builder` (that makes chaining possible), and only `build()` returns `Pizza`. The plain line marks that `Builder` is written inside `Pizza`.',
        text: [
          'The pattern has two roles: the **product** (`Pizza`) and the **builder** that collects its parts. In the Gang of Four book there is also a **director**, an object that calls the steps in a fixed order. In Java code the client usually plays the director itself.'
        ]
      },
      {
        title: 'The order of calls in a chain',
        mermaid: `sequenceDiagram
  participant M as main
  participant B as Builder
  participant P as Pizza
  M->>B: new Builder(32)
  M->>B: cheese()
  B-->>M: this (same builder)
  M->>B: mushrooms()
  B-->>M: this (same builder)
  M->>B: build()
  B->>P: new Pizza(this)
  P-->>M: the finished pizza`,
        diagramNote: 'Every step returns the same builder, so the next call in the chain goes to it again. The pizza is created only at the very end.',
        text: [
          'The chain is read left to right. The `Pizza` object does not exist until `build()` runs.'
        ]
      },
      {
        title: 'Checking the parts in build()',
        text: [
          '`build()` is the one place to check rules that involve several parts. If a rule is broken, it throws an exception, so a wrong object is never created. You know exceptions from [Exceptions](../exceptions/index.html).'
        ],
        fileName: 'BuilderCheck.java',
        code: `class Ticket {
    private final String name;
    private final int age;
    private final boolean student;

    private Ticket(Builder b) {
        name = b.name;
        age = b.age;
        student = b.student;
    }

    public String toString() { return name + " (" + age + ")" + (student ? " student" : ""); }

    static class Builder {
        private String name;
        private int age = -1;
        private boolean student;

        Builder name(String name) { this.name = name; return this; }
        Builder age(int age) { this.age = age; return this; }
        Builder student() { this.student = true; return this; }

        Ticket build() {
            if (name == null) throw new IllegalStateException("name is missing");
            if (age < 0) throw new IllegalStateException("age is missing");
            if (student && age > 30) throw new IllegalStateException("student tickets are up to age 30");
            return new Ticket(this);
        }
    }
}

public class BuilderCheck {
    public static void main(String[] args) {
        System.out.println(new Ticket.Builder().name("Ada").age(19).student().build());
        try {
            new Ticket.Builder().name("Bob").age(45).student().build();
        } catch (IllegalStateException e) {
            System.out.println("Rejected: " + e.getMessage());
        }
        try {
            new Ticket.Builder().age(10).build();
        } catch (IllegalStateException e) {
            System.out.println("Rejected: " + e.getMessage());
        }
    }
}`,
        output: `Ada (19) student
Rejected: student tickets are up to age 30
Rejected: name is missing`
      },
      {
        title: 'Where Java itself uses it',
        text: [
          '`StringBuilder` is the builder you already know: `append` steps that return the builder, and `toString()` as the final step. `HttpRequest.newBuilder()` from [REST and HTTP](../rest-and-http/index.html) builds an immutable request. `Stream.builder()` and `Locale.Builder` follow the same shape.'
        ],
        fileName: 'JavaBuilders.java',
        code: `import java.net.URI;
import java.net.http.HttpRequest;

public class JavaBuilders {
    public static void main(String[] args) {
        String text = new StringBuilder()
            .append("Hello")
            .append(", ")
            .append("builder")
            .toString(); // the "build" step
        System.out.println(text);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://example.com/api/items"))
            .header("Accept", "application/json")
            .GET()
            .build(); // nothing is sent, the request is only built
        System.out.println(request.method() + " " + request.uri());
        System.out.println(request.headers().firstValue("Accept").orElse("none"));
    }
}`,
        output: `Hello, builder
GET https://example.com/api/items
application/json`
      },
      {
        title: 'When not to use it: small objects',
        text: [
          'For two or three required fields, a builder doubles the code for no gain. A **record** with a check in its compact constructor is shorter and still immutable. You met records in [Classes and Objects](../classes-and-objects/index.html).'
        ],
        fileName: 'SmallRecord.java',
        code: `record Point(int x, int y) {
    Point { // compact constructor: runs before the fields are set
        if (x < 0 || y < 0) throw new IllegalArgumentException("no negative points");
    }
}

public class SmallRecord {
    public static void main(String[] args) {
        Point p = new Point(3, 4); // clear enough without a builder
        System.out.println(p);
    }
}`,
        output: `Point[x=3, y=4]`,
        tip: 'Rule of thumb: think about a builder at four or more parameters, or as soon as several of them are optional or have the same type.'
      }
    ],
    technical: [
      'A nested `static` class compiles to its own class file, `Pizza$Builder.class`. Because it is nested, it may call the private constructor `Pizza(Builder)`; since Java 11 the JVM allows this directly between "nest mates" without hidden helper methods.',
      'Each chain step returns the same builder reference, so a chain of five calls creates exactly two objects: one builder and, at the end, one product. The builder becomes garbage once `build()` has returned and nothing points to it.',
      'Immutability matters for safety: an object whose fields are all `final` and set in the constructor can be shared freely, even between threads, without anyone seeing it half-built. The builder is the mutable part, and it stays local to the code that fills it.'
    ],
    tryIt: {
      steps: [
        'Copy `PizzaOrder.java` and run it with `java PizzaOrder.java`.',
        'Add an optional part `olives` to both `Pizza` and `Builder`, with a step method `olives()`.',
        'Show it in `toString()` and order `new Pizza.Builder(26).olives().cheese().build()`.',
        'Add a check in `build()`: throw an `IllegalStateException` when `size` is below 20, and try `new Pizza.Builder(10).build()`.'
      ],
      see: 'A line `26 cm, tomato, cheese, olives`, and an exception with your message for the 10 cm pizza.'
    },
    check: [
      { q: 'Why does every step method end with `return this;`?', a: 'So the call returns the same builder, and the next step can follow with a dot. That makes the chain `builder.cheese().mushrooms().build()` possible.' },
      { q: 'Where do required and optional parts go in a builder?', a: 'Required parts go into the builder\'s constructor, so they cannot be forgotten. Optional parts get default values in the builder fields and a step method each.' },
      { q: 'What does `build()` do besides creating the object?', a: 'It is the place to check the parts together, for example that a required value is set or that two values fit each other. If not, it throws an exception and no object is created.' }
    ],
    keyPoints: [
      'A builder collects the parts with named step methods and creates the product in `build()`.',
      'Step methods return `this`, so the calls chain.',
      'The product has a private constructor and `final` fields: immutable and never half-built.',
      '`build()` validates the parts.',
      '`StringBuilder` and `HttpRequest.newBuilder()` are builders in the JDK.'
    ],
    commonMistakes: [
      'Forgetting `build()`: `Pizza p = new Pizza.Builder(30).cheese();` does not compile, because the result is a `Builder`. Add `.build()`.',
      'A step method that returns `void`: `void cheese() { … }` breaks the chain. Return `Builder` and end with `return this;`.',
      'Giving the product public setters as well. Then the immutability is gone. Keep the fields `final` and set them only in the private constructor.',
      'Using a builder for a two-field value. Use a constructor or a record.'
    ],
    related: ['Factory Method', 'Abstract Factory', 'Strings', 'Exceptions'],
    glossary: DP.glossary
  });
})();
