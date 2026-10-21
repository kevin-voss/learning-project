// UML lesson 6: sequence diagrams: lifelines, messages, returns, mapped to method calls.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'sequence-diagram',
    num: '06',
    title: 'Sequence Diagram',
    category: 'behavior',
    icon: '⇣',
    tagline: 'Who calls whom, in which order',
    realWorld: 'Ordering a pizza in a restaurant. You tell the waiter, the waiter tells the kitchen, the kitchen bakes and hands the pizza back, the waiter brings it to your table. The order of the steps is the whole story.',
    kid: [
      'Think of a comic strip that you read from top to bottom. Each person in the story has a column. When one person talks to another, an arrow goes from one column to the other.',
      'The first arrow is at the top, the next arrow is below it, and so on. So you always know what happened first.',
      'When somebody asks a question, a dashed arrow comes back with the answer. A program works the same way: one object asks another object to do something, waits, and gets an answer back.'
    ],
    definition: 'A **sequence diagram** shows how objects send **messages** to each other in time order. Each participant has a vertical **lifeline**; time runs from top to bottom; each arrow is one message, which in Java is usually one method call.',
    explain: [
      'Across the top stand the **participants**: objects (written `waiter : Waiter`) or **actors**, the people or outside systems that start things. Below each one hangs a dashed vertical line, its **lifeline**. The lower a point on the line, the later it is.',
      'A solid arrow with a filled head is a **synchronous message**: a normal method call. The caller sends it and **waits** until the called method is finished. A dashed arrow back is the **return message**: the return value. You may leave returns out when nothing interesting comes back.',
      'While a method runs, its lifeline shows a thin box, the **activation bar**. When the waiter calls the kitchen, the waiter\'s bar keeps going (it is still waiting) and a new bar starts on the kitchen. Bars that stack up are exactly the methods that are running at the same time on the call stack.',
      'An arrow from a lifeline back to itself is a **self-call**: the object calls one of its own methods, such as a private helper. An arrow with an open head is an **asynchronous message**: the sender does not wait and goes on at once.',
      'A sequence diagram shows **one scenario**: one run through the code with one set of values. It does not show every possible path. For "if" and "loop" there are frames called fragments; they are the next lesson.'
    ],
    why: 'Code spreads one story over many classes. To follow it, you jump from file to file. A sequence diagram puts the whole story on one page, in the right order, so you see who does what and where a call goes wrong.',
    whenUse: 'For a feature that crosses several classes (ordering, logging in, borrowing a book), when you plan which class gets which method, and when you hunt a bug that depends on the order of calls. Not for the fields of a class; that is a class diagram.',
    syntax: 'Mermaid: `participant W as waiter : Waiter`, then one line per message: `A->>B: method(args)` (call), `B-->>A: value` (return), `A->>A: helper()` (self-call), `A-)B: message` (asynchronous). `+` and `-` after the arrow open and close an activation bar: `A->>+B: m()` … `B-->>-A: result`.',
    mermaid: `sequenceDiagram
  participant M as main
  participant W as waiter : Waiter
  participant K as kitchen : Kitchen
  M->>+W: order("Margherita")
  W->>+K: bake("Margherita")
  K-->>-W: "hot Margherita"
  W->>W: serve("hot Margherita")
  W-->>-M: "hot Margherita on a plate"`,
    visualLabel: 'The pizza order as a sequence diagram',
    visualNote: 'Read from top to bottom. Each solid arrow is a method call in the code below, each dashed arrow is a `return`. The waiter\'s bar stays open while the kitchen works: the waiter is waiting.',
    fileName: 'PizzaOrder.java',
    code: `public class PizzaOrder {
    public static void main(String[] args) {
        Waiter waiter = new Waiter(new Kitchen());
        String plate = waiter.order("Margherita");
        System.out.println("main got: " + plate);
    }
}

class Waiter {
    private final Kitchen kitchen;

    Waiter(Kitchen kitchen) {
        this.kitchen = kitchen;
    }

    String order(String pizza) {
        System.out.println("  waiter.order(" + pizza + ") starts");
        String hot = kitchen.bake(pizza);
        String plate = serve(hot);
        System.out.println("  waiter returns: " + plate);
        return plate;
    }

    private String serve(String food) {
        System.out.println("  waiter.serve(" + food + ") is a self-call");
        return food + " on a plate";
    }
}

class Kitchen {
    String bake(String pizza) {
        System.out.println("    kitchen.bake(" + pizza + ") starts");
        String result = "hot " + pizza;
        System.out.println("    kitchen returns: " + result);
        return result;
    }
}`,
    output: `  waiter.order(Margherita) starts
    kitchen.bake(Margherita) starts
    kitchen returns: hot Margherita
  waiter.serve(hot Margherita) is a self-call
  waiter returns: hot Margherita on a plate
main got: hot Margherita on a plate`,
    codeSummary: 'Every method prints when it starts and what it returns. The indentation shows how deep the calls are nested, so the output has the same shape as the diagram: each line is one arrow, from top to bottom.',
    codeExplanation: [
      { label: 'Line 3', code: 'Waiter waiter = new Waiter(new Kitchen());', text: 'Creates the two participants before the story starts. In the diagram they are the boxes at the top.' },
      { label: 'Line 4', code: 'String plate = waiter.order("Margherita");', text: 'The first arrow: `main ->> waiter: order("Margherita")`. `main` waits on this line until `order` returns.' },
      { label: 'Line 18', code: 'String hot = kitchen.bake(pizza);', text: 'The second arrow, from waiter to kitchen. It works because the waiter has a field `kitchen`: in the class diagram that is an association `Waiter --> Kitchen`.' },
      { label: 'Line 35', code: 'return result;', text: 'The dashed arrow back from kitchen to waiter, carrying `"hot Margherita"`. The kitchen\'s activation bar ends here.' },
      { label: 'Line 19', code: 'String plate = serve(hot);', text: 'A call without an object in front calls a method of the same object: the self-call arrow that loops back to the waiter\'s lifeline.' },
      { label: 'Line 24', code: 'private String serve(String food) {', text: 'A private helper. Self-calls often go to private methods; other participants never call them.' },
      { label: 'Line 21', code: 'return plate;', text: 'The last dashed arrow, back to `main`. Now `main` stops waiting and goes on to line 5.' }
    ],
    sections: [
      {
        title: 'The parts of a sequence diagram',
        text: ['Every sequence diagram is built from the same few parts. Here is each one with its Java meaning.'],
        table: {
          head: ['Part', 'How it looks', 'Mermaid', 'Java meaning'],
          rows: [
            ['participant', 'box at the top', '`participant W as waiter : Waiter`', 'an object (or a class for static calls)'],
            ['actor', 'stick figure at the top', '`actor C as Customer`', 'a person or outside system that starts the story'],
            ['lifeline', 'dashed line down from the box', 'drawn by itself', 'the life of the object during the story'],
            ['activation bar', 'thin box on a lifeline', '`->>+` opens, `-->>-` closes', 'a method that is running'],
            ['synchronous message', 'solid line, filled arrowhead', '`A->>B: m()`', 'a method call; the caller waits'],
            ['return message', 'dashed line, arrowhead', '`B-->>A: value`', 'the `return` value'],
            ['self-call', 'arrow back to the same lifeline', '`A->>A: helper()`', 'a call to a method of the same object'],
            ['asynchronous message', 'solid line, open arrowhead', '`A-)B: m()`', 'a message the sender does not wait for']
          ]
        }
      },
      {
        title: 'One arrow is one method call',
        text: [
          'Translate a sequence diagram arrow by arrow. An arrow from A to B labelled `read()` tells you two things: the class of B has a method `read()`, and A can reach B (through a field, a parameter or a local variable).',
          'The return arrow tells you the return type: here `21` is an `int`, so `read()` returns `int`. An arrow without a return arrow is often a `void` method.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant T as sensor : Thermometer
  participant D as screen : Display
  M->>+T: read()
  T-->>-M: 21
  M->>+D: show(21)
  D-->>-M: done`,
        fileName: 'WeatherStation.java',
        code: `public class WeatherStation {
    public static void main(String[] args) {
        Thermometer sensor = new Thermometer();
        Display screen = new Display();
        int degrees = sensor.read();
        screen.show(degrees);
    }
}

class Thermometer {
    int read() {
        return 21;
    }
}

class Display {
    void show(int degrees) {
        System.out.println("Today: " + degrees + " degrees");
    }
}`,
        output: 'Today: 21 degrees',
        tip: 'The return arrow of a `void` method carries no value. Many people draw it anyway (labelled "done") to show where the bar ends; leaving it out is fine too.'
      },
      {
        title: 'Nested calls: bars stack like the call stack',
        text: [
          'When B calls C while A is still waiting for B, three bars are open at once. That stack of bars is the **call stack**: the list of methods that have started and not yet returned. You saw it in [recursion](../recursion/index.html).',
          'A bar always ends **below** the bars it started: the kitchen returns before the waiter can return. If a diagram shows the waiter returning first, it describes code that cannot exist.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant W as waiter
  participant K as kitchen
  M->>+W: order()
  W->>+K: bake()
  Note right of K: 3 methods are running now
  K-->>-W: pizza
  W-->>-M: plate`,
        diagramNote: 'At the note, `main`, `order` and `bake` are all on the call stack. `bake` is on top, so it must finish first.'
      },
      {
        title: 'Asynchronous messages: send and go on',
        text: [
          'A letter in a mailbox is an **asynchronous** message. You drop it and go on playing; you do not wait at the mailbox until the letter arrives. Later the postman picks it up and delivers it.',
          'In the code, `drop` only puts the letter into a list and returns at once. The real work (`deliverAll`) happens later, started by someone else. Real Java programs do this with message queues or with **threads**, several paths of work running at the same time; the idea in the diagram is the same.'
        ],
        mermaid: `sequenceDiagram
  actor K as Kid
  participant B as box : Mailbox
  actor P as Postman
  K-)B: drop("Dear Santa, a bike please")
  Note left of K: plays football
  K-)B: drop("PS: a red one")
  P->>+B: deliverAll()
  B-->>-P: letters delivered`,
        diagramNote: 'The open arrowheads (`-)`) say: the kid does not wait. There is no return arrow to the kid.',
        fileName: 'MailboxDemo.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class MailboxDemo {
    public static void main(String[] args) {
        Mailbox box = new Mailbox();
        box.drop("Dear Santa, a bike please");
        System.out.println("Kid plays football");
        box.drop("PS: a red one");
        System.out.println("Kid eats dinner");
        box.deliverAll();
    }
}

class Mailbox {
    private final List<String> letters = new ArrayList<>();

    void drop(String letter) {
        letters.add(letter);   // returns at once: the sender does not wait for delivery
    }

    void deliverAll() {
        for (String letter : letters) {
            System.out.println("Postman delivers: " + letter);
        }
        letters.clear();
    }
}`,
        output: `Kid plays football
Kid eats dinner
Postman delivers: Dear Santa, a bike please
Postman delivers: PS: a red one`
      },
      {
        title: 'Creating an object inside the story',
        text: [
          'Sometimes a participant does not exist at the start; the story creates it with `new`. Mermaid draws it with `create participant`: the box appears at the height of the arrow that creates it, not at the top.',
          'Here `main` creates a basket, adds two items and asks for the total. Each arrow is one line of `main`.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  create participant B as basket : Basket
  M->>B: new Basket()
  M->>B: add("apple", 2)
  M->>B: add("juice", 3)
  M->>+B: total()
  B-->>-M: 5`,
        fileName: 'ShopTrace.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class ShopTrace {
    public static void main(String[] args) {
        Basket basket = new Basket();
        basket.add("apple", 2);
        basket.add("juice", 3);
        System.out.println("Total: " + basket.total() + " euro");
    }
}

class Basket {
    private final List<Integer> prices = new ArrayList<>();

    void add(String item, int price) {
        System.out.println("added " + item);
        prices.add(price);
    }

    int total() {
        int sum = 0;
        for (int price : prices) sum += price;
        return sum;
    }
}`,
        output: `added apple
added juice
Total: 5 euro`,
        warn: 'Do not draw every tiny call (`prices.add`, `sum += price`). A sequence diagram shows the conversation between your own objects; library calls inside one method are usually left out.'
      }
    ],
    technical: [
      'A synchronous message is a real method call in the bytecode, an instruction such as `invokevirtual`. The JVM creates a new **stack frame** for the called method (its parameters and local variables) and puts it on the thread\'s call stack. The activation bar in the diagram is the lifetime of that frame; the return arrow is the moment the frame is removed and the value goes back to the caller.',
      'An asynchronous message in Java needs a second line of work: a `Thread`, an executor, or a message queue between two programs. The caller\'s thread goes on at once, and the receiver works on the message later or at the same time. That is why the diagram shows no waiting bar on the sender.',
      'A sequence diagram is one **trace**: what the program did for one input. With other input, other arrows appear. Tools can even record such traces from a running program; the printouts in the examples on this page are a hand-made version of that.'
    ],
    tryIt: {
      steps: [
        'Add a class `Cashier` with a method `int pay(String plate)` that prints `  cashier.pay(...)` and returns `9`.',
        'Give `Waiter` a second field `cashier` and call it at the end of `order`, before `return`.',
        'Draw the new arrows on paper first: `waiter ->> cashier: pay(...)` and the return `9`.',
        'Run `java PizzaOrder.java` and compare the output with your drawing.'
      ],
      see: 'a new line `  cashier.pay(hot Margherita on a plate)` right before `waiter returns`, in the same place as your new arrow.'
    },
    check: [
      { q: 'In which direction does time run in a sequence diagram?', a: 'From top to bottom. A message lower on the page happens later.' },
      { q: 'An arrow goes from `cart` to `stock` with the label `reserve(item)`. What must exist in the Java code?', a: 'The class of `stock` has a method `reserve(...)`, and the cart can reach the stock object (field, parameter or local variable).' },
      { q: 'What is the difference between `->>` and `-)` in Mermaid?', a: '`->>` is a synchronous call: the sender waits. `-)` is asynchronous: the sender goes on at once.' }
    ],
    keyPoints: [
      'Participants across the top, lifelines downward, time from top to bottom.',
      'A solid arrow is a method call; a dashed arrow back is its return value.',
      'Activation bars show running methods and stack like the call stack.',
      'Self-calls loop back to the same lifeline; asynchronous messages do not wait.',
      'One diagram shows one scenario, not every possible path.'
    ],
    commonMistakes: [
      'Drawing an arrow to a participant that the sender cannot reach. Fix: make sure there is a field, parameter or local variable, and draw it in the class diagram.',
      'Returning in the wrong order (the outer call returns before the inner one). Fix: a bar ends only after every bar it started has ended.',
      'Drawing every library call such as `list.add`. Fix: show the conversation between your own objects.',
      'Using a sequence diagram to show all if/else paths without frames. Fix: one scenario per diagram, or use `alt` frames (next lesson).'
    ],
    related: ['Sequence Fragments', 'Class Diagram', 'Methods', 'Recursion'],
    glossary: U.glossary
  });
})();
