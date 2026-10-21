// UML lesson 9: activity diagrams: actions, decisions, loops, swimlanes, fork/join, mapped to Java control flow.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'activity-diagram',
    num: '09',
    title: 'Activity Diagram',
    category: 'workflow',
    icon: '↬',
    tagline: 'Steps, decisions and loops of one process',
    realWorld: 'A recipe card for pancakes: mix flour and milk; is the batter too thick? Add milk and stir again; otherwise heat the pan; fry until all the batter is used up. Steps, questions and "again" in one picture.',
    kid: [
      'Think of a board game path. You start at the start square. You walk forward step by step. At some squares there is a question: "Did you roll a six? Go left. No? Go right."',
      'Some arrows lead back, so you walk the same squares again, like a loop. At the end there is a goal square.',
      'An activity diagram is that game board for a job a program does: start, steps, questions, paths back, and the end.'
    ],
    definition: 'An **activity diagram** shows the flow of one process: **actions** (steps of work), **decision nodes** (questions that split the flow), loops (arrows that lead back), parallel parts (**fork** and **join**) and who does each step (**swimlanes**). It maps directly to `if`, `switch` and loops in Java.',
    explain: [
      'The flow starts at a filled black dot (**initial node**) and follows the arrows (**control flow**). Each **action** is a rounded box with one step of work, written as a verb: "add price to total". The flow ends at a dot inside a ring (**final node**).',
      'A **decision node** is a diamond with one arrow in and several arrows out. Each outgoing arrow carries a **guard** in square brackets, such as `[in stock]` and `[else]`. Exactly one guard must be true. A **merge node** is a diamond where several paths come together again; in code it is the line after the closing brace of the `if`.',
      'A **loop** is an arrow that leads back to an earlier node. If the question comes before the action, it is a `while` loop; if the action comes first and the question afterwards, it is a `do … while` loop. Counting loops (`for`) look the same with a counter as the question.',
      'A **fork** is a thick bar where one flow splits into several flows that run at the same time. A **join** is a thick bar where they wait for each other and become one flow again. **Swimlanes** are columns or rows labelled with a person or a class; every action inside a lane is done by that one.',
      'Activity diagrams are flowcharts with UML rules. You already used flowcharts in [control flow](../control-flow/index.html). On this page they are drawn with Mermaid `flowchart`: `(( ))` for the start and end, rounded `( )` boxes for actions, `{ }` diamonds for decisions.'
    ],
    why: 'A process with many decisions is hard to agree on in words. A picture shows every path, so you can ask: "what happens if the item is out of stock?" before you write code that forgets it.',
    whenUse: 'For the body of one method with several decisions and loops, for business processes (checkout, sign-up, returning a book), and to explain an algorithm. Use a state diagram instead when you care about the states of one object rather than the steps.',
    syntax: 'Mermaid flowchart: `S(("start"))`, actions `A("verb something")`, decisions `D{"question?"}`, guarded arrows `D -- "yes" --> A`, a loop is an arrow back: `A --> D`. Swimlanes: `subgraph Customer … end`.',
    mermaid: `flowchart TD
  S(("start")) --> M{"more items?"}
  M -- yes --> C{"in stock?"}
  C -- yes --> A("add price to total")
  C -- no --> K("skip item")
  A --> M
  K --> M
  M -- no --> F{"total >= 50?"}
  F -- yes --> FR("free shipping")
  F -- no --> SH("add 5 for shipping")
  FR --> P("pay total")
  SH --> P
  P --> E(("end"))`,
    visualLabel: 'Checkout as an activity diagram',
    visualNote: 'The arrows from "add price" and "skip item" back to "more items?" form the loop. "in stock?" is the `if` inside the loop. "total >= 50?" is the `if / else` after it, and "pay total" is where both paths merge.',
    fileName: 'CheckoutFlow.java',
    code: `public class CheckoutFlow {
    public static void main(String[] args) {
        String[] items = { "book", "kite", "ball" };
        int[] prices = { 20, 25, 15 };
        boolean[] inStock = { true, false, true };

        int total = 0;
        for (int i = 0; i < items.length; i++) {      // decision "more items?" + arrow back
            if (inStock[i]) {                           // decision "in stock?"
                total += prices[i];                     // action "add price to total"
                System.out.println("add " + items[i] + " (" + prices[i] + ")");
            } else {
                System.out.println("skip " + items[i] + ": out of stock");
            }
        }

        if (total >= 50) {                              // decision "total >= 50?"
            System.out.println("free shipping");
        } else {
            total += 5;
            System.out.println("shipping 5");
        }
        System.out.println("pay " + total);           // merge, then action "pay total"
    }
}`,
    output: `add book (20)
skip kite: out of stock
add ball (15)
shipping 5
pay 40`,
    codeSummary: 'Every node of the diagram has a place in `main`: the `for` is the loop with its question, the inner `if` is the "in stock?" diamond, the second `if / else` is the shipping decision, and the last line runs after both paths merge.',
    codeExplanation: [
      { label: 'Line 7', code: 'int total = 0;', text: 'Preparation before the flow starts. Diagrams often leave out such setup steps.' },
      { label: 'Line 8', code: 'for (int i = 0; i < items.length; i++) {      // decision "more items?" + arrow back', text: 'The loop. Its condition `i < items.length` is the question "more items?". The closing brace on line 15 is the arrow back to the question.' },
      { label: 'Line 9', code: 'if (inStock[i]) {                           // decision "in stock?"', text: 'A decision inside the loop. `[yes]` is the `if` block, `[no]` is the `else` block.' },
      { label: 'Line 10', code: 'total += prices[i];                     // action "add price to total"', text: 'An action: one rounded box in the diagram.' },
      { label: 'Line 13', code: 'System.out.println("skip " + items[i] + ": out of stock");', text: 'The other path of the decision. The kite costs 25 but is out of stock, so it is skipped.' },
      { label: 'Line 17', code: 'if (total >= 50) {                              // decision "total >= 50?"', text: 'The second decision, after the loop ends ("more items?" answered no). The total is 35, so the `else` path runs.' },
      { label: 'Line 23', code: 'System.out.println("pay " + total);           // merge, then action "pay total"', text: 'Both paths of the second decision meet here: the merge node. Then the last action, and the flow reaches the end.' }
    ],
    sections: [
      {
        title: 'The symbols of an activity diagram',
        text: ['Here is each symbol, how this page draws it with Mermaid, and its Java meaning.'],
        table: {
          head: ['Symbol', 'UML shape', 'Mermaid', 'Java'],
          rows: [
            ['initial node', 'filled black dot', '`S(("start"))`', 'start of the method'],
            ['action', 'rounded box', '`A("add price")`', 'a statement or a method call'],
            ['control flow', 'arrow', '`A --> B`', 'the next line runs'],
            ['decision node', 'diamond, guards on the arrows out', '`D{"in stock?"}` and `D -- yes --> A`', '`if`, `else`, `switch`'],
            ['merge node', 'diamond with several arrows in', 'two arrows into one node', 'the line after the `if` block'],
            ['loop', 'an arrow back to an earlier node', '`A --> D`', '`while`, `do … while`, `for`'],
            ['fork and join', 'thick bars', '`<<fork>>` / `<<join>>` in a state diagram', 'parallel work (threads)'],
            ['swimlane', 'column or row with a name', '`subgraph Shop … end`', 'the class whose method does the step'],
            ['final node', 'dot inside a ring', '`E(("end"))`', '`return`, end of the method']
          ]
        }
      },
      {
        title: 'Decision and merge: if, else if, else',
        text: [
          'A ticket costs 0 for children under 6, 5 for children under 18 and 10 for everybody else. One diamond with three guarded arrows is one `if / else if / else` chain, and the merge is the line after it.',
          'The guards must not overlap and must cover every case. `[else]` is a safe way to cover "everything left".'
        ],
        mermaid: `flowchart TD
  S(("start")) --> D{"age?"}
  D -- "[age < 6]" --> F("price = 0")
  D -- "[age < 18]" --> C("price = 5")
  D -- "[else]" --> A("price = 10")
  F --> M{" "}
  C --> M
  A --> M
  M --> P("print price")
  P --> E(("end"))`,
        diagramNote: 'The empty diamond is the merge node. Many diagrams leave it out and draw the three arrows straight into "print price"; both are fine.',
        fileName: 'TicketPrice.java',
        code: `public class TicketPrice {
    public static void main(String[] args) {
        int[] ages = { 4, 12, 35 };
        for (int age : ages) {
            System.out.println("age " + age + ": price " + price(age));
        }
    }

    static int price(int age) {
        int price;
        if (age < 6) {
            price = 0;
        } else if (age < 18) {
            price = 5;
        } else {
            price = 10;
        }
        return price;   // merge: all three paths arrive here
    }
}`,
        output: `age 4: price 0
age 12: price 5
age 35: price 10`
      },
      {
        title: 'Loops: where does the question stand?',
        text: [
          'In a loop, look where the decision is. **Question first, then action** is a `while` loop: it may run zero times. **Action first, then question** is a `do … while` loop: it runs at least once.',
          'Filling a glass: you look first ("is the glass full?") and pour only when it is not. Tasting soup: you always taste once, then ask "salty enough?".'
        ],
        mermaid: `flowchart LR
  subgraph W["while: question first"]
    Q1{"glass full?"} -- no --> P1("pour 50 ml")
    P1 --> Q1
  end
  subgraph D["do-while: action first"]
    T2("taste soup") --> Q2{"salty enough?"}
    Q2 -- no --> S2("add salt")
    S2 --> T2
  end`,
        fileName: 'LoopShapes.java',
        code: `public class LoopShapes {
    public static void main(String[] args) {
        int glass = 0;
        while (glass < 200) {        // question first
            glass += 50;
            System.out.println("pour, glass has " + glass + " ml");
        }

        int salt = 0;
        do {                         // action first
            System.out.println("taste with " + salt + " pinches of salt");
            salt++;
        } while (salt < 2);          // question after the action
    }
}`,
        output: `pour, glass has 50 ml
pour, glass has 100 ml
pour, glass has 150 ml
pour, glass has 200 ml
taste with 0 pinches of salt
taste with 1 pinches of salt`
      },
      {
        title: 'Swimlanes: who does which step',
        text: [
          'A swimlane groups the actions that one person, system or class does. The flow crosses lanes when the work moves from one to the other. In code, each lane is often a class, and each action in the lane is a method of that class.',
          'This is also a bridge to sequence diagrams: every arrow that crosses a lane is a call from one object to another.'
        ],
        mermaid: `flowchart LR
  subgraph C["Customer"]
    S(("start")) --> O("place order")
  end
  subgraph SH["Shop"]
    CH{"paid?"}
    CH -- yes --> SE("send to warehouse")
    CH -- no --> R("remind customer")
  end
  subgraph WH["Warehouse"]
    PK("pack parcel") --> E(("end"))
  end
  O --> CH
  SE --> PK`,
        fileName: 'SwimlaneOrder.java',
        code: `public class SwimlaneOrder {
    public static void main(String[] args) {
        Customer mia = new Customer(new Shop(new Warehouse()));
        mia.placeOrder("kite", true);
        mia.placeOrder("ball", false);
    }
}

class Customer {                         // lane "Customer"
    private final Shop shop;
    Customer(Shop shop) { this.shop = shop; }
    void placeOrder(String item, boolean paid) {
        System.out.println("Customer orders " + item);
        shop.check(item, paid);
    }
}

class Shop {                             // lane "Shop"
    private final Warehouse warehouse;
    Shop(Warehouse warehouse) { this.warehouse = warehouse; }
    void check(String item, boolean paid) {
        if (paid) warehouse.pack(item);
        else System.out.println("Shop reminds the customer to pay for " + item);
    }
}

class Warehouse {                        // lane "Warehouse"
    void pack(String item) {
        System.out.println("Warehouse packs " + item);
    }
}`,
        output: `Customer orders kite
Warehouse packs kite
Customer orders ball
Shop reminds the customer to pay for ball`
      },
      {
        title: 'Fork and join: two things at once',
        text: [
          'Making breakfast: after you get up, you can boil the egg and toast the bread at the same time. A **fork** bar splits the flow; a **join** bar waits until **both** are done before "eat breakfast" starts.',
          'Mermaid draws real fork and join bars only in state diagrams, so this picture uses `stateDiagram-v2` with actions as boxes. In Java, true parallel work needs threads. A normal program may also do the two steps one after the other: the fork only says that their order does not matter.'
        ],
        mermaid: `stateDiagram-v2
  state fork_state <<fork>>
  state join_state <<join>>
  [*] --> GetUp
  GetUp --> fork_state
  fork_state --> BoilEgg
  fork_state --> ToastBread
  BoilEgg --> join_state
  ToastBread --> join_state
  join_state --> EatBreakfast
  EatBreakfast --> [*]`,
        warn: 'A join waits for every incoming flow. A merge diamond lets any one flow pass. Mixing them up describes a different program: with a merge, "eat breakfast" would start after the first of the two steps.'
      }
    ],
    technical: [
      'UML explains activity diagrams with **tokens**: picture a coin that moves along the arrows. An action runs when the coin arrives. A decision sends the coin along one arrow. A fork copies the coin, one per outgoing arrow. A join waits until a coin has arrived on every incoming arrow, then sends one coin on.',
      'The compiler turns `if` and loops into conditional jumps in the bytecode: "if `inStock[i]` is false, jump to the else part". An activity diagram is very close to that: each diamond is a conditional jump, each arrow back is a jump to an earlier instruction.',
      'Not every drawing becomes clean code. If arrows jump into the middle of a loop from outside, you cannot write it with plain `if` and `while` without changing the picture. Diagrams built only from nested decisions and loops (structured flow) always translate one to one.'
    ],
    tryIt: {
      steps: [
        'Change `CheckoutFlow.java` so that the kite is in stock (`true`).',
        'Before you run it, follow the diagram with your finger and predict each line of output.',
        'Run `java CheckoutFlow.java` and compare.'
      ],
      see: '`add kite (25)` instead of the skip line, `free shipping` (the total is 60) and `pay 60`.'
    },
    check: [
      { q: 'Which Java statement fits a decision diamond with the guards `[yes]` and `[no]`?', a: 'An `if / else`.' },
      { q: 'An arrow leads from an action back to a decision that comes before it. Which loop is it?', a: 'A `while` loop (or `for`): the question comes first, then the action.' },
      { q: 'What is the difference between a join bar and a merge diamond?', a: 'A join waits for all incoming flows; a merge lets each incoming flow pass on its own.' }
    ],
    keyPoints: [
      'Start dot → actions → end dot, connected by arrows.',
      'A diamond with guards is an `if`, `else if` or `switch`; a merge diamond is the line after it.',
      'An arrow back is a loop: question first = `while`, action first = `do … while`.',
      'Swimlanes show who does a step; in code, often which class.',
      'Fork and join show parallel work; a join waits for all paths.'
    ],
    commonMistakes: [
      'Leaving guards off the arrows out of a diamond. Fix: label every arrow, for example `[in stock]` and `[else]`.',
      'Overlapping guards such as `[age < 18]` and `[age < 6]` without order. Fix: make guards exclusive, or order them like an `else if` chain.',
      'Writing states into action boxes ("paid"). Fix: actions are verbs, "pay the order"; states belong into a state diagram.',
      'Drawing one huge diagram for a whole program. Fix: one diagram per process or method.'
    ],
    related: ['Control Flow', 'State Machine Diagram', 'Sequence Fragments', 'Use Case Diagram'],
    glossary: U.glossary
  });
})();
