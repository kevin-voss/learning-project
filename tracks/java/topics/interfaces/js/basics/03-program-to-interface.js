// Interfaces, lesson 3: program to the interface (swap implementations, test with fakes).
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'program-to-interface',
      title: 'Program to the Interface',
      category: 'practice',
      icon: '⇄',
      tagline: 'Swap the class, keep the code',
      realWorld: 'A remote control works with any TV that understands its buttons. You can buy a new TV and keep your remote. You can even test the remote with a toy TV that only blinks a light.',
      kid: [
        'Your bike has a bell holder. Any bell that fits the holder works: a loud bell, a funny horn, a quiet "ding".',
        'When the loud bell breaks, you do not build a new bike. You click in another bell.',
        'Programs work the same way. If the big part only knows "something that rings", you can swap what rings in one second.'
      ],
      definition: '**Program to the interface** means: let your fields, parameters and variables use the interface type. Only the line with `new` names the real class. Then you can swap the class in one place.',
      explain: [
        'A class that needs a helper object has a **dependency**: it depends on that helper. If the field type is a concrete class like `ConsoleSender`, the class is stuck with it. If the field type is the interface `NotificationSender`, any sender fits.',
        'The helper usually comes in through the **constructor**. Someone outside creates the real sender and hands it in. This is called **dependency injection** ("inject" means "put in from outside"). It sounds big, but it is only a constructor parameter.',
        'Now you can swap the helper: a console sender while you learn, an e-mail sender in the real app, a **fake** in a test. A fake is a tiny class that keeps the promise but only records what happened, so you can check it. The class that uses the helper never changes.',
        'You already do this with collections: `List<String> names = new ArrayList<>();`. The rest of the code only uses `List` methods. If you later want a `LinkedList`, you change one word.',
        'Do not make an interface for every class "in case I need it later". Make one when a second implementation or a test fake is real. Until then a plain class is fine.'
      ],
      why: 'Changing or replacing one class does not break the rest of the program, and you can test a class without its real helpers (no real e-mails in a test).',
      whenUse: 'Fields and constructor parameters that hold a helper object; method parameters and return types of collections (`List`, `Map`, `Set`).',
      syntax: '`private final InterfaceType helper;` · `ClassName(InterfaceType helper) { this.helper = helper; }` · `List<T> x = new ArrayList<>();`',
      fileName: 'Tracker.java',
      code: `interface NotificationSender {
    void send(String to, String message);
}

class ConsoleSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("[console] " + to + ": " + message);
    }
}

class CountingSender implements NotificationSender {
    int sent = 0;
    @Override
    public void send(String to, String message) {
        sent++;   // no printing, only counting
    }
}

public class Tracker {
    private final NotificationSender sender;   // the promise, not a class

    Tracker(NotificationSender sender) {
        this.sender = sender;
    }

    void deliver(String customer) {
        sender.send(customer, "Your parcel was delivered");
    }

    public static void main(String[] args) {
        Tracker real = new Tracker(new ConsoleSender());
        real.deliver("Ava");

        CountingSender counter = new CountingSender();
        Tracker counted = new Tracker(counter);
        counted.deliver("Ben");
        counted.deliver("Cleo");
        System.out.println("messages counted: " + counter.sent);
    }
}`,
      output: `[console] Ava: Your parcel was delivered
messages counted: 2`,
      codeSummary: 'Tracker only knows the interface. `main` plugs in a printing sender once and a counting sender once. Tracker itself never changes.',
      codeExplanation: [
        { label: 'Line 12', code: 'class CountingSender implements NotificationSender {', text: 'A second way to keep the promise: it does not print, it only counts. Perfect to check that Tracker really sends.' },
        { label: 'Line 21', code: 'private final NotificationSender sender;   // the promise, not a class', text: 'The field has the interface type. Tracker does not know or care which sender it gets.' },
        { label: 'Line 23', code: 'Tracker(NotificationSender sender) {', text: 'The sender comes in from outside through the constructor (dependency injection).' },
        { label: 'Line 28', code: 'sender.send(customer, "Your parcel was delivered");', text: 'Tracker uses only the promised method. It works with every sender.' },
        { label: 'Line 32', code: 'Tracker real = new Tracker(new ConsoleSender());', text: 'The only place that names `ConsoleSender`. To switch to e-mail later, you change this line only.' },
        { label: 'Line 35', code: 'CountingSender counter = new CountingSender();', text: 'Here the variable type is the class, because `main` wants to read `counter.sent`, which the interface does not promise.' },
        { label: 'Line 36', code: 'Tracker counted = new Tracker(counter);', text: 'The same Tracker class, now with the counting sender plugged in.' },
        { label: 'Line 39', code: 'System.out.println("messages counted: " + counter.sent);', text: 'Two deliveries, two counted messages, nothing printed by the sender. You checked Tracker without any real messages.' }
      ],
      sections: [
        {
          title: 'Who depends on whom',
          text: [
            'Draw arrows from "who uses" to "what is used". With the interface in the middle, Tracker has one arrow, and all senders point to the same promise.'
          ],
          mermaid: `flowchart LR
  T["Tracker"] -->|uses| I["NotificationSender (interface)"]
  C["ConsoleSender"] -.->|implements| I
  E["EmailSender (later)"] -.->|implements| I
  F["CountingSender (for checks)"] -.->|implements| I
  M["main"] -->|creates and plugs in| C`,
          diagramNote: 'No arrow goes from Tracker to a concrete sender. That is what makes the swap safe: adding EmailSender touches only `main` and the new class.'
        },
        {
          title: 'Swap in one place: List and ArrayList',
          text: [
            '`List` is an interface from the JDK. `ArrayList` and `LinkedList` are two classes that implement it. If the variable and the method parameter say `List`, you can swap the class by changing one word.'
          ],
          fileName: 'SwapList.java',
          code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class SwapList {
    // Works with every List: ArrayList, LinkedList, List.of(...)
    static int totalLength(List<String> words) {
        int total = 0;
        for (String w : words) {
            total += w.length();
        }
        return total;
    }

    public static void main(String[] args) {
        List<String> a = new ArrayList<>(List.of("tea", "cake"));
        List<String> b = new LinkedList<>(List.of("tea", "cake"));
        System.out.println(totalLength(a));
        System.out.println(totalLength(b));
        System.out.println(totalLength(List.of("a", "bc", "def")));
        System.out.println(a.getClass().getSimpleName() + " / " + b.getClass().getSimpleName());
    }
}`,
          output: `7
7
6
ArrayList / LinkedList`,
          warn: 'If the parameter were `ArrayList<String> words`, then `totalLength(List.of("a"))` would not compile. A narrow parameter type makes the method less useful.'
        },
        {
          title: 'Check a class with a fake',
          text: [
            'A fake that **remembers** every message lets you check exactly what Tracker did. Later, in [Testing](../testing/index.html), you write such checks with JUnit; the idea is the same.',
            'Here the check is a plain `if`. Tracker is the same class as before; it does not know it is being checked.'
          ],
          fileName: 'FakeCheck.java',
          code: `import java.util.ArrayList;
import java.util.List;

interface NotificationSender {
    void send(String to, String message);
}

class FakeSender implements NotificationSender {
    final List<String> log = new ArrayList<>();
    @Override
    public void send(String to, String message) {
        log.add(to + "|" + message);
    }
}

class Tracker {
    private final NotificationSender sender;
    Tracker(NotificationSender sender) { this.sender = sender; }
    void deliver(String customer) { sender.send(customer, "Delivered"); }
}

public class FakeCheck {
    public static void main(String[] args) {
        FakeSender fake = new FakeSender();
        new Tracker(fake).deliver("Ava");

        System.out.println("log: " + fake.log);
        if (fake.log.equals(List.of("Ava|Delivered"))) {
            System.out.println("check passed");
        } else {
            System.out.println("check FAILED");
        }
    }
}`,
          output: `log: [Ava|Delivered]
check passed`
        },
        {
          title: 'Wrong vs right',
          text: [
            'The left column ties the code to one class. The right column only depends on the promise.'
          ],
          table: {
            head: ['Tied to a class (avoid)', 'Programs to the interface (prefer)'],
            rows: [
              ['`private final ConsoleSender sender;`', '`private final NotificationSender sender;`'],
              ['`Tracker() { sender = new ConsoleSender(); }`', '`Tracker(NotificationSender sender) { this.sender = sender; }`'],
              ['`ArrayList<String> names = new ArrayList<>();`', '`List<String> names = new ArrayList<>();`'],
              ['`static HashMap<String, Integer> count(…)`', '`static Map<String, Integer> count(…)`']
            ],
            note: 'A constructor that calls `new ConsoleSender()` itself hides the dependency. Nobody can plug in a fake from outside.'
          },
          tip: 'Keep the class type only where you need its extra methods, like `counter.sent` in the main example.'
        }
      ],
      technical: [
        'For the compiler, `Tracker` depends only on `NotificationSender`. If you change `ConsoleSender` and recompile it, `Tracker.class` does not need to be recompiled, because its bytecode only mentions the interface (`invokeinterface NotificationSender.send`).',
        'The JVM loads classes lazily: a class is loaded the first time it is needed. If your program only ever plugs in `CountingSender`, `ConsoleSender` may never be loaded at all.',
        'Frameworks such as Spring do the plugging in for you: they read which classes implement which interfaces and call the constructors themselves. That is the same constructor injection you wrote here by hand.'
      ],
      tryIt: {
        steps: [
          'Run `Tracker.java`.',
          'Add a class `UpperSender implements NotificationSender` that prints the message in capital letters.',
          'In `main`, change only the line `new Tracker(new ConsoleSender())` to use `new UpperSender()`.',
          'Check that you did not change one line inside the `Tracker` class.'
        ],
        see: 'the delivery message in capital letters, `messages counted: 2` below it, and no change inside Tracker.'
      },
      check: [
        { q: 'What does "program to the interface" mean in one sentence?', a: 'Fields, parameters and variables use the interface type; only the `new` line names the real class.' },
        { q: 'Why is a fake sender useful?', a: 'You can check what your class does (for example, that it sent one message to Ava) without printing or sending anything real.' },
        { q: 'Why is `static int totalLength(List<String> words)` better than `totalLength(ArrayList<String> words)`?', a: 'It accepts every list: `ArrayList`, `LinkedList` and `List.of(…)`. The narrow version accepts only `ArrayList`.' }
      ],
      keyPoints: [
        'Declare with the interface, create with the class.',
        'Hand helpers in through the constructor (dependency injection).',
        'A fake implementation lets you check a class without real side effects.',
        'You already do this: `List<String> x = new ArrayList<>();`.',
        'Make an interface when a second implementation or a fake is real, not "in case I need it later".'
      ],
      commonMistakes: [
        'Creating the helper inside the class: `sender = new ConsoleSender();`. Fix: take a `NotificationSender` as a constructor parameter.',
        'Parameters of a concrete collection type: `void print(ArrayList<String> x)`. Fix: `void print(List<String> x)`.',
        'An interface for every class with exactly one implementation and no test fake. Fix: start with a class; extract an interface when you need a second one.',
        'Casting back to the class everywhere: `((ConsoleSender) sender).something()`. Fix: if Tracker needs it, it belongs in the interface.'
      ],
      related: ['interface-polymorphism', 'Collections', 'Testing', 'Design Patterns']
    }
  ]);
})();
