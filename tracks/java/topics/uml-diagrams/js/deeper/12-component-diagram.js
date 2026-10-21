// UML lesson 12 (Deeper): component and deployment diagrams, the big picture above classes.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'component-diagram',
    num: '12',
    title: 'Component and Deployment Diagrams',
    category: 'deeper',
    icon: '▣',
    tagline: 'Big replaceable parts, and the machines they run on',
    realWorld: 'A games console with plug-in controllers. The console has a socket, the controller has a plug that fits. You can swap a red controller for a blue one, because both fit the same socket. And the whole thing stands on a shelf next to the TV it is cabled to.',
    kid: [
      'Think of a toy train set. There are big parts: the station, the tracks, the engine, the remote control. Each part does one job, and you can swap the engine for another one if it fits the tracks.',
      'A component diagram draws those big parts and the plugs between them. It does not care about every screw inside the engine.',
      'A deployment diagram shows where the parts stand: the station on the table, the remote control in your hand, the cable to the wall. For software, it shows which program runs on which computer.'
    ],
    definition: 'A **component diagram** shows the big, replaceable parts of a system (**components**) and the **interfaces** through which they work together. A **deployment diagram** shows the machines and runtimes (**nodes**) and which files (**artifacts**, such as `shop.jar`) run on them.',
    explain: [
      'A **component** is a part of a system that you can build, test and replace on its own: "Shop", "Payments", "Storage". In Java it is usually a package or a group of packages, often built into its own `.jar` file. It is drawn as a box with the stereotype `«component»`.',
      'A component **provides** an interface when it implements it: it offers that service to others (a "lollipop", a circle on a stick). It **requires** an interface when it needs some other component to implement it (a "socket", a half circle). A component that requires `PaymentGateway` works with **any** component that provides it. This is the same idea as [programming to an interface](../interfaces/index.html), one size bigger.',
      'A **deployment diagram** answers "where does it run?". A **node** is a box for a device (a phone, a server) or an execution environment inside it (the JVM, a database system). An **artifact** is a real file that is deployed onto a node: `shop.jar`, a configuration file. Lines between nodes are communication paths, labelled with the protocol, such as HTTPS.',
      'Both diagrams sit above classes. One component may contain twenty classes, and none of them appears in the picture. Use them to explain a system to someone new, not to plan a single class.',
      'This lesson is **Deeper**: you rarely draw these for an exercise, but you will meet them in projects and in documentation.'
    ],
    why: 'In a big system nobody can see all the classes at once. Component and deployment diagrams show the few big parts, how they can be swapped, and where they run, which is exactly what a new team member asks first.',
    whenUse: 'For architecture: which parts does the system have, which can be replaced (a fake payment service for tests, a real one in production), and what runs on which machine. Not for the inside of one part; that is a class diagram.',
    syntax: 'On paper: boxes with `«component»`, lollipops for provided and sockets for required interfaces; nodes as 3D boxes with `«device»` or `«execution environment»`, artifacts with `«artifact»`. Mermaid has neither type, so this page uses `flowchart` with `subgraph` boxes and a circle node `(( ))` for an interface.',
    mermaid: `flowchart LR
  subgraph SHOP["«component» Shop"]
    S["Shop"]
  end
  I(("PaymentGateway"))
  subgraph FAKE["«component» Test payments"]
    F["FakePayment"]
  end
  subgraph CARD["«component» Card payments"]
    C["CardPayment"]
  end
  S -- "requires" --> I
  F -- "provides" --> I
  C -- "provides" --> I`,
    visualLabel: 'One interface, two components that provide it',
    visualNote: 'The circle is the interface between the parts. `Shop` only knows the circle. Either payment component can be plugged in, which is exactly what `main` does below.',
    fileName: 'ComponentDemo.java',
    code: `public class ComponentDemo {
    public static void main(String[] args) {
        Shop testShop = new Shop(new FakePayment());
        testShop.checkout("kite", 12);
        Shop realShop = new Shop(new CardPayment());
        realShop.checkout("bike", 15);
    }
}

// the interface between the components
interface PaymentGateway {
    boolean charge(int euro);
}

// component "Shop": requires PaymentGateway
class Shop {
    private final PaymentGateway payments;

    Shop(PaymentGateway payments) {
        this.payments = payments;
    }

    void checkout(String item, int euro) {
        if (payments.charge(euro)) System.out.println("Shop: " + item + " sold");
        else System.out.println("Shop: payment for " + item + " failed");
    }
}

// component "Test payments": provides PaymentGateway
class FakePayment implements PaymentGateway {
    public boolean charge(int euro) {
        System.out.println("FakePayment: pretend to charge " + euro + " euro");
        return true;
    }
}

// component "Card payments": provides PaymentGateway
class CardPayment implements PaymentGateway {
    public boolean charge(int euro) {
        System.out.println("CardPayment: charge " + euro + " euro, card limit is 10");
        return euro <= 10;
    }
}`,
    output: `FakePayment: pretend to charge 12 euro
Shop: kite sold
CardPayment: charge 15 euro, card limit is 10
Shop: payment for bike failed`,
    codeSummary: 'In a real project each comment block would be its own package or `.jar`. Here they share one file, but the rule is the same: `Shop` depends only on the interface, so the payment component can be swapped without changing `Shop`.',
    codeExplanation: [
      { label: 'Line 11', code: 'interface PaymentGateway {', text: 'The circle in the diagram: the contract between the components. It is the only thing `Shop` knows about payments.' },
      { label: 'Line 17', code: 'private final PaymentGateway payments;', text: 'The required interface: `Shop` needs some object that can `charge`. The field type is the interface, never a concrete payment class.' },
      { label: 'Line 19', code: 'Shop(PaymentGateway payments) {', text: 'The provider is plugged in from outside, through the constructor. This is how you swap components.' },
      { label: 'Line 24', code: 'if (payments.charge(euro)) System.out.println("Shop: " + item + " sold");', text: 'A call across the component border. `Shop` does not know or care which component answers.' },
      { label: 'Line 30', code: 'class FakePayment implements PaymentGateway {', text: 'A provided interface: `implements` is the lollipop. A fake like this is perfect for tests, because it never touches a real card.' },
      { label: 'Line 38', code: 'class CardPayment implements PaymentGateway {', text: 'A second provider of the same interface. In production this component would talk to a bank.' },
      { label: 'Line 3', code: 'Shop testShop = new Shop(new FakePayment());', text: 'The assembly: which component is plugged into which socket. In big projects a configuration file or a framework does this.' }
    ],
    sections: [
      {
        title: 'Provided and required interfaces',
        text: ['Every line between components goes through an interface. Read it from both sides.'],
        table: {
          head: ['', 'Provided interface', 'Required interface'],
          rows: [
            ['UML shape', 'lollipop: a circle on a stick', 'socket: a half circle on a stick'],
            ['means', '"I offer this service"', '"I need someone who offers this service"'],
            ['Java', '`class CardPayment implements PaymentGateway`', 'a field or constructor parameter of type `PaymentGateway`'],
            ['in the example', 'Test payments, Card payments', 'Shop']
          ],
          note: 'A component diagram that connects components directly, without an interface, says: "these two cannot be swapped". Sometimes that is fine; often it is a design smell.'
        }
      },
      {
        title: 'A whole system on one page',
        text: [
          'A small online shop has four big parts. The web user interface calls the shop through an interface; the shop needs a payment service and a storage service. Every component can be built, tested and replaced on its own.'
        ],
        mermaid: `flowchart LR
  WEB["«component» Web UI"] -- "requires" --> OA(("OrderApi"))
  SH["«component» Shop"] -- "provides" --> OA
  SH -- "requires" --> PG(("PaymentGateway"))
  SH -- "requires" --> ST(("Storage"))
  PAY["«component» Payments"] -- "provides" --> PG
  DB["«component» Database access"] -- "provides" --> ST`,
        diagramNote: 'Four components, three interfaces. To test the shop alone, you plug in fake payments and a fake storage, as in the code example.'
      },
      {
        title: 'Deployment: where does it run?',
        text: [
          'The deployment diagram shows the real machines. The shop is built into one file, `shop.jar` (Maven does this with `mvn package`, see [build tools](../build-tools/index.html)). That artifact runs inside a JVM on a server. Browsers on laptops talk to it over HTTPS (see [REST and HTTP](../rest-and-http/index.html)), and it talks to a database on another server.'
        ],
        mermaid: `flowchart LR
  subgraph LAPTOP["«device» Laptop"]
    BR["Web browser"]
  end
  subgraph SERVER["«device» App server"]
    subgraph JVM["«execution environment» JVM 21"]
      JAR["«artifact» shop.jar"]
    end
  end
  subgraph DBS["«device» Database server"]
    DB[("shop database")]
  end
  BR -- "HTTPS" --> JAR
  JAR -- "SQL over TCP" --> DB`,
        table: {
          head: ['Element', 'Means', 'Example'],
          rows: [
            ['node «device»', 'a physical or virtual machine', 'Laptop, App server'],
            ['node «execution environment»', 'software that runs other software', 'JVM 21, a database system'],
            ['«artifact»', 'a file that is deployed', '`shop.jar`, `application.properties`'],
            ['communication path', 'a line between nodes, with the protocol', 'HTTPS, SQL over TCP']
          ]
        }
      },
      {
        title: 'Which big-picture diagram for which question',
        text: ['Class diagrams zoom in, component and deployment diagrams zoom out. Pick the zoom level by the question.'],
        table: {
          head: ['Question', 'Diagram', 'Typical size'],
          rows: [
            ['Which classes, fields and methods?', 'Class diagram', '3–10 classes'],
            ['Which packages depend on which?', 'Package diagram (folders with dependency arrows)', '3–8 packages'],
            ['Which replaceable parts, connected through which interfaces?', 'Component diagram', '3–8 components'],
            ['Which file runs on which machine, talking how?', 'Deployment diagram', '2–5 nodes']
          ],
          note: 'A **package diagram** is the simplest of them: one folder-shaped box per Java package, and dashed dependency arrows where one package imports from another.'
        },
        tip: 'Many teams use a simpler cousin of these diagrams called the C4 model (context, containers, components, code). The idea is the same: draw the system at several zoom levels, never everything at once.'
      }
    ],
    technical: [
      'Java supports components at several sizes. A **package** groups classes and controls `package-private` access. A `.jar` file bundles compiled classes into one deployable artifact. Since Java 9, a **module** (a `module-info.java` file) can even declare which packages it `exports` (provides) and which modules it `requires`, which is a component diagram written in code.',
      'The plug-in moment ("which component goes into which socket") is called **dependency injection**: the object a class needs is passed in from outside instead of being created inside. Frameworks such as Spring do it automatically at startup, reading which classes provide which interfaces.',
      'At runtime a deployment node is very concrete. `java -jar shop.jar` starts a JVM process on the server; that process is the execution environment node, and the jar is the artifact. In cloud systems the node is often a container, a packaged mini machine that holds the JVM and the jar together.'
    ],
    tryIt: {
      steps: [
        'Add a third provider, `class PiggyBankPayment implements PaymentGateway`, that has 20 euro, prints how much is left and returns `false` when the money runs out.',
        'Plug it into a third `Shop` in `main` and buy two things for 12 euro each.',
        'Add the new component to the Mermaid text of the first diagram with a `provides` arrow to the interface.'
      ],
      see: 'the first purchase works, the second fails with `Shop: payment for … failed`, and `Shop` itself did not change at all.'
    },
    check: [
      { q: 'What is the difference between a provided and a required interface in Java?', a: 'Provided: the component has a class that `implements` the interface. Required: the component has a field or parameter of the interface type and needs someone else to implement it.' },
      { q: 'In a deployment diagram, what is `shop.jar`, and what is the JVM?', a: '`shop.jar` is an artifact (a deployed file). The JVM is an execution environment node that runs it.' },
      { q: 'Why does a component diagram not show the classes inside a component?', a: 'It shows the big picture: parts and their interfaces. The classes inside belong in a class diagram of that one component.' }
    ],
    keyPoints: [
      'A component is a big, replaceable part; it talks to others through interfaces.',
      'Provided interface = implements (lollipop); required interface = needs it as a field or parameter (socket).',
      'A deployment diagram shows nodes (devices, runtimes) and artifacts (files such as a `.jar`).',
      'These diagrams zoom out; class diagrams zoom in.',
      'Swappable components are the reason to program against interfaces.'
    ],
    commonMistakes: [
      'Drawing every class as a component. Fix: a component is a group of classes with one job, such as "Payments".',
      'Connecting components directly instead of through an interface. Fix: put the interface (a circle) between them, so either side can be replaced.',
      'Mixing deployment and components in one picture. Fix: one diagram for the parts, one for where they run.',
      'Forgetting the protocol on deployment lines. Fix: label each path, for example `HTTPS` or `SQL over TCP`.'
    ],
    related: ['Interfaces', 'Class Relationships', 'Build Tools', 'REST and HTTP'],
    glossary: U.glossary
  });
})();
