(function () {
  Java.addCoreTopic('interfaces', {
    label: 'Interfaces',
    headline: 'Interfaces,',
    accent: 'a promise, not a recipe.',
    intro: 'An interface lists what a class can do, without saying how. Code that uses the interface works with every class that keeps the promise.',
    overview: 'The promise → program to the interface → interface or abstract class.',
    tryIt: {
      steps: [
        'Make an interface `Greeter` with one method `String greet(String name)`.',
        'Make two classes that implement it: `FriendlyGreeter` ("Hi, Mia!") and `PoliteGreeter` ("Good morning, Mia.").',
        'In `main`, make a `List<Greeter>` with both and call `greet("Mia")` in a for-each loop.'
      ],
      see: 'two different greetings from one loop that only knows `Greeter`.'
    },
    check: [
      { q: 'What does an interface contain?', a: 'Method names with their inputs and outputs, but no body (no "how"). It is a promise.' },
      { q: 'How many interfaces can one class implement? How many classes can it extend?', a: 'Many interfaces, but only one class.' },
      { q: 'Why write `List<String> names = new ArrayList<>();` and not `ArrayList<String> names`?', a: 'The rest of the code only depends on the promise `List`. You can swap `ArrayList` for another list in one place.' }
    ]
  }, [
    {
      id: 'interface-promise',
      title: 'An Interface Is a Promise',
      category: 'concept',
      icon: 'I',
      tagline: 'What, not how',
      realWorld: 'A wall socket is a promise: "two holes, 230 volts". A lamp, a kettle and a phone charger all fit. The socket does not care which one you plug in.',
      definition: 'An `interface` lists methods without bodies. A class that writes `implements` must give every one of them a body. Mark those methods with `@Override` so the compiler checks you spelled them right.',
      why: 'Code can use any class that keeps the promise.',
      whenUse: 'When you can imagine two ways to do the same job, for example print a message or send it by e-mail.',
      fileName: 'Notify.java',
      code: `interface NotificationSender {
    void send(String to, String message);
}

class ConsoleSender implements NotificationSender {
    @Override
    public void send(String to, String message) {
        System.out.println("To " + to + ": " + message);
    }
}

public class Notify {
    public static void main(String[] args) {
        NotificationSender sender = new ConsoleSender();
        sender.send("Ava", "Your parcel is here");
    }
}`,
      tryIt: {
        steps: ['Save the code as `Notify.java`, compile and run.', 'Remove `@Override` and misspell the method as `sendd`. Compile.'],
        see: '`To Ava: Your parcel is here`. After the typo: an error that ConsoleSender does not implement send.'
      },
      keyPoints: ['interface = list of promises.', 'implements = "I keep these promises".', 'Always write @Override.'],
      commonMistakes: ['Forgetting `public` on the implementing method.'],
      related: ['Classes & Objects']
    },
    {
      id: 'program-to-interface',
      title: 'Program to the Interface',
      category: 'practice',
      icon: '⇄',
      tagline: 'Swap the class, keep the code',
      realWorld: 'A remote control works with any TV that understands its buttons. You can buy a new TV and keep your remote.',
      definition: 'Let your variables, fields and parameters use the interface type. Only the line with `new` names the real class. Then you can swap the class in one place: a fake sender for tests, an e-mail sender later.',
      why: 'Changing one class does not break the rest of your program.',
      whenUse: 'Fields and parameters that hold a helper object.',
      fileName: 'Tracker.java',
      code: `interface NotificationSender {
    void send(String to, String message);
}

class FakeSender implements NotificationSender {
    int sent = 0;
    @Override
    public void send(String to, String message) { sent++; }
}

public class Tracker {
    private final NotificationSender sender;   // the promise, not a class

    Tracker(NotificationSender sender) { this.sender = sender; }

    void deliver(String to) { sender.send(to, "Delivered!"); }

    public static void main(String[] args) {
        FakeSender fake = new FakeSender();
        new Tracker(fake).deliver("Ava");
        System.out.println("messages sent: " + fake.sent);
    }
}`,
      tryIt: {
        steps: ['Run the code.', 'Add a `ConsoleSender` that prints the message, and pass it to `new Tracker(...)` instead.'],
        see: '`messages sent: 1`. With ConsoleSender: the printed message. Tracker did not change.'
      },
      keyPoints: ['Declare with the interface. Create with the class.', 'You already do this: `List<String> x = new ArrayList<>();`.'],
      commonMistakes: ['Making an interface for every class "just in case". Make one when a second class or a test fake is real.'],
      related: ['Collections', 'Testing']
    },
    {
      id: 'interface-or-abstract',
      title: 'Interface or Abstract Class',
      category: 'habits',
      icon: '≠',
      tagline: 'Pure promise or half-built class',
      realWorld: 'An interface is a job advert: "must drive a car". An abstract class is a half-built house: the walls stand, you finish the rooms.',
      definition: 'An abstract class can have fields and finished methods, plus some `abstract` methods without a body. A class can extend only one class, but implement many interfaces. Start with an interface. Use an abstract class only when several classes share real code.',
      table: {
        label: 'Which one?',
        head: ['Question', 'Interface', 'Abstract class'],
        rows: [
          ['Shared fields or code?', 'no', 'yes'],
          ['How many per class?', 'many (`implements A, B`)', 'one (`extends`)'],
          ['Default choice?', 'yes, start here', 'only when code repeats']
        ],
        note: 'Interfaces may also have `default` methods with a body. They still cannot hold fields.'
      },
      keyPoints: ['Need only a promise: interface.', 'Need a promise plus shared code: abstract class.'],
      commonMistakes: ['A "Base" class full of helpers that unrelated classes extend.'],
      related: ['Design Patterns']
    }
  ]);
})();
