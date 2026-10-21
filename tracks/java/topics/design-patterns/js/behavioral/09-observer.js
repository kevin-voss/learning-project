(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'observer',
    num: '09',
    title: 'Observer',
    category: 'behavioral',
    icon: '◈',
    tagline: 'Subscribe and get notified',
    realWorld: 'A magazine subscription. You write your name on the magazine\'s list once. Every time a new issue comes out, the magazine sends it to everybody on the list. You do not need to call them every day and ask "is it out yet?". If you cancel, your name comes off the list.',
    kid: [
      'In your class there is a hamster. Some children want to know when the hamster wakes up. They write their names on a paper next to the cage.',
      'When the hamster wakes up, the teacher reads the list and tells every child on it: "The hamster is awake!" The hamster does not know who the children are. It only wakes up.',
      'If a child does not care any more, they cross out their name. That is the **Observer** pattern: a list of who wants to know, and one message to everybody on it when something happens.'
    ],
    definition: 'The **Observer** pattern lets objects **subscribe** to another object. When that object (the **subject**) changes, it calls a method on every subscribed **observer**, without knowing what the observers are or what they do with the news.',
    explain: [
      'The **subject** is the object that has the interesting state (`WeatherStation`). It keeps a `List` of observers and offers two methods: `subscribe(observer)` to add one and `unsubscribe(observer)` to remove one.',
      'An **observer** implements a small interface, here `WeatherListener` with one method `onTemperature(double t)`. Any class can implement it: a display, a phone app, a logger. Since it has one method, a lambda can be an observer too.',
      'When the state changes, the subject **notifies**: it loops over its list and calls `onTemperature` on each observer. This method that the subject calls back is often named a **callback**; observers are also called **listeners**, and the whole idea is called **publish and subscribe**.',
      'The big win is **loose coupling**: the subject depends only on the small listener interface. You can add a new kind of observer without changing the subject, and observers can come and go while the program runs.',
      'There are two styles. In **push** style the subject sends the new data in the call (`onTemperature(23.5)`). In **pull** style it sends only "something changed" or itself, and the observer asks for what it needs. Push is simpler and is used here.'
    ],
    why: 'When one change must reach many places, hard-coding every receiver into the changing class makes it know everything about everybody. The observer list turns "I must call these five classes" into "I tell whoever is listening".',
    whenUse: 'When several objects must react to changes in one object, and the set of reacting objects may change: user interfaces, events in games, prices, sensor readings, chat messages. Not when there is exactly one fixed receiver: a direct method call is clearer.',
    syntax: '`interface Listener { void onEvent(Data d); }` and in the subject: `private final List<Listener> listeners = new ArrayList<>(); void subscribe(Listener l) { listeners.add(l); } void notifyAll(Data d) { for (Listener l : listeners) l.onEvent(d); }`.',
    pros: [
      'The subject does not know the concrete observers: loose coupling.',
      'Add or remove observers at run time.',
      'New kinds of observers need no change in the subject.'
    ],
    cons: [
      'The order in which observers are called is easy to rely on by accident.',
      'Forgotten `unsubscribe` calls keep objects alive (a memory leak).',
      'A chain of notifications that trigger more notifications is hard to follow.'
    ],
    fileName: 'WeatherDemo.java',
    code: `import java.util.ArrayList;
import java.util.List;

interface WeatherListener { // observer
    void onTemperature(double celsius);
}

class WeatherStation { // subject
    private final List<WeatherListener> listeners = new ArrayList<>();

    void subscribe(WeatherListener l) { listeners.add(l); }
    void unsubscribe(WeatherListener l) { listeners.remove(l); }

    void setTemperature(double celsius) {
        System.out.println("Station measures " + celsius);
        for (WeatherListener l : listeners) {
            l.onTemperature(celsius); // notify everybody
        }
    }
}

class Display implements WeatherListener {
    public void onTemperature(double celsius) {
        System.out.println("  Display shows " + celsius + " C");
    }
}

public class WeatherDemo {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        Display display = new Display();
        station.subscribe(display);
        station.subscribe(t -> {
            if (t > 30) System.out.println("  Phone: heat warning!");
        });

        station.setTemperature(24.0);
        station.setTemperature(31.5);
        station.unsubscribe(display);
        station.setTemperature(18.0);
    }
}`,
    output: `Station measures 24.0
  Display shows 24.0 C
Station measures 31.5
  Display shows 31.5 C
  Phone: heat warning!
Station measures 18.0`,
    codeSummary: 'Two observers subscribe: a `Display` object and a lambda. The station tells both about each change. After the display unsubscribes, it hears nothing more.',
    codeExplanation: [
      { label: 'Line 4', code: 'interface WeatherListener { // observer', text: 'The observer interface. The subject only knows this one method.' },
      { label: 'Line 9', code: 'private final List<WeatherListener> listeners = new ArrayList<>();', text: 'The subscription list. It holds any object that implements the interface.' },
      { label: 'Line 11', code: 'void subscribe(WeatherListener l) { listeners.add(l); }', text: 'Subscribing means "put me on the list". `unsubscribe` on the next line takes an observer off again.' },
      { label: 'Line 16', code: 'for (WeatherListener l : listeners) {', text: 'Notify: walk over the list in the order of subscription.' },
      { label: 'Line 17', code: 'l.onTemperature(celsius); // notify everybody', text: 'Push style: the new value travels in the call. The station does not know what each observer does with it.' },
      { label: 'Line 22', code: 'class Display implements WeatherListener {', text: 'A concrete observer, written as a class.' },
      { label: 'Line 33', code: 'station.subscribe(t -> {', text: 'A second observer, written as a lambda. It works because `WeatherListener` has one abstract method.' },
      { label: 'Line 39', code: 'station.unsubscribe(display);', text: 'The display leaves. The next measurement reaches only the lambda.' },
      { label: 'Line 40', code: 'station.setTemperature(18.0);', text: 'The lambda prints only above 30, and the display is gone, so only the station\'s own line appears.' }
    ],
    sections: [
      {
        title: 'The problem: the subject calls everybody by name',
        text: [
          'Without the pattern, the station holds a field for every receiver and calls each one directly. Every new receiver means editing the station, and the station must know classes it has nothing to do with.'
        ],
        fileName: 'NoObserver.java',
        code: `class Display {
    void show(double t) { System.out.println("  Display shows " + t + " C"); }
}

class PhoneApp {
    void push(double t) { System.out.println("  Phone gets " + t + " C"); }
}

class WeatherStation {
    private final Display display = new Display();
    private final PhoneApp phone = new PhoneApp();
    // A logger is wanted too: edit this class again

    void setTemperature(double t) {
        System.out.println("Station measures " + t);
        display.show(t);
        phone.push(t);
    }
}

public class NoObserver {
    public static void main(String[] args) {
        new WeatherStation().setTemperature(22.0);
    }
}`,
        output: `Station measures 22.0
  Display shows 22.0 C
  Phone gets 22.0 C`,
        warn: 'The pain: the station is tied to `Display` and `PhoneApp`. You cannot turn the phone off while the program runs, and the station must change for every new receiver.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class WeatherStation {
    -List~WeatherListener~ listeners
    +subscribe(WeatherListener) void
    +unsubscribe(WeatherListener) void
    +setTemperature(double) void
  }
  class WeatherListener {
    <<interface>>
    +onTemperature(double) void
  }
  WeatherStation o-- WeatherListener : notifies 0..many
  WeatherListener <|.. Display
  WeatherListener <|.. HeatWarning`,
        diagramNote: '`List~WeatherListener~` is how Mermaid writes `List<WeatherListener>`. The diamond line means the station keeps many listeners. It knows only the interface, never `Display`.',
        text: [
          'Two roles: **subject** and **observer**. The subject points only at the observer interface. Concrete observers can be added without touching the subject.'
        ]
      },
      {
        title: 'The order of calls',
        mermaid: `sequenceDiagram
  participant M as main
  participant W as WeatherStation
  participant D as Display
  participant P as heat lambda
  M->>W: subscribe(display)
  M->>W: subscribe(lambda)
  M->>W: setTemperature(31.5)
  W->>D: onTemperature(31.5)
  W->>P: onTemperature(31.5)
  P->>P: 31.5 > 30, print warning
  W-->>M: done`,
        diagramNote: 'Subscriptions come first. On each change, the station calls every observer in list order, then returns to `main`.',
        text: [
          'The order matters in two ways: an observer hears only changes after it subscribed, and observers are called one after the other in list order.'
        ]
      },
      {
        title: 'A trap: unsubscribing during the notification',
        text: [
          'An observer may want to leave inside its own callback ("tell me once, then stop"). If the subject loops over the real list with a for-each loop, removing an element during the loop throws `ConcurrentModificationException`; you met this in [Collections](../collections/index.html).',
          'The fix: loop over a **copy** of the list. `List.copyOf(listeners)` makes an unchangeable snapshot, so changes to the real list do not disturb the loop.'
        ],
        fileName: 'OneShot.java',
        code: `import java.util.ArrayList;
import java.util.List;

interface Listener { void onEvent(String event); }

class Bell {
    private final List<Listener> listeners = new ArrayList<>();
    void subscribe(Listener l) { listeners.add(l); }
    void unsubscribe(Listener l) { listeners.remove(l); }

    void ring(String event) {
        for (Listener l : List.copyOf(listeners)) { // loop over a snapshot
            l.onEvent(event);
        }
    }
}

public class OneShot {
    public static void main(String[] args) {
        Bell bell = new Bell();
        bell.subscribe(e -> System.out.println("Always: " + e));
        bell.subscribe(new Listener() {
            public void onEvent(String e) {
                System.out.println("Once: " + e);
                bell.unsubscribe(this); // leave during the callback
            }
        });
        bell.ring("first");
        bell.ring("second");
    }
}`,
        output: `Always: first
Once: first
Always: second`,
        tip: 'The second listener is an **anonymous class**: a class without a name, written right where it is used. It is used here because a lambda cannot refer to itself with `this`.'
      },
      {
        title: 'Where Java itself uses it',
        text: [
          'Every Java user interface toolkit is built on listeners: a button keeps a list of `ActionListener`s and calls them on each click. The JDK also has a ready subject helper, `PropertyChangeSupport`, which keeps the list and sends an event with the old and the new value.'
        ],
        fileName: 'JavaObserver.java',
        code: `import java.beans.PropertyChangeSupport;

class Account {
    private final PropertyChangeSupport listeners = new PropertyChangeSupport(this);
    private int balance = 0;

    void addListener(java.beans.PropertyChangeListener l) { listeners.addPropertyChangeListener(l); }

    void deposit(int amount) {
        int old = balance;
        balance += amount;
        listeners.firePropertyChange("balance", old, balance); // notify
    }
}

public class JavaObserver {
    public static void main(String[] args) {
        Account account = new Account();
        account.addListener(e ->
            System.out.println(e.getPropertyName() + ": " + e.getOldValue() + " -> " + e.getNewValue()));
        account.deposit(50);
        account.deposit(20);
        account.deposit(0); // no change, no event
    }
}`,
        output: `balance: 0 -> 50
balance: 50 -> 70`,
        tip: '`firePropertyChange` skips the call when old and new value are equal. That is why the deposit of 0 prints nothing.'
      },
      {
        title: 'When not to use it',
        text: [
          'If one object always talks to exactly one other object, a direct call is clearer than a list with one entry. Observer pays off when the number or kind of receivers varies.',
          'Be careful with long-lived subjects. The subject\'s list holds a reference to every observer, so an observer that is never unsubscribed can never be removed by the garbage collector (see [JVM Memory](../jvm-memory/index.html)). And observers that change the subject inside their callback can start an endless chain of notifications.'
        ]
      }
    ],
    technical: [
      'The subscription list is a normal `ArrayList` of references. Notifying is a loop of interface calls; the JVM picks each observer\'s method at run time. A lambda observer is compiled into a hidden class that implements `WeatherListener`, created the first time the lambda expression runs.',
      'All calls in this lesson are **synchronous**: `setTemperature` does not return until every observer has finished. A slow observer slows down the subject. Event systems that call observers later or on other threads are asynchronous; Java offers `java.util.concurrent.Flow` for that style.',
      '`listeners.remove(l)` uses `equals` to find the observer. A lambda has no useful `equals`, so to unsubscribe a lambda you must keep the exact reference you subscribed: `WeatherListener w = t -> …; station.subscribe(w); … station.unsubscribe(w);`.'
    ],
    tryIt: {
      steps: [
        'Copy `WeatherDemo.java` and run it with `java WeatherDemo.java`.',
        'Write a class `Logger implements WeatherListener` that prints `  Log: ` and the temperature.',
        'Subscribe a `new Logger()` before the first `setTemperature` call.',
        'Run again and see where the log lines appear.'
      ],
      see: 'A `  Log:` line after each `Station measures` line, also after `18.0`, because the logger never unsubscribed.'
    },
    check: [
      { q: 'What does the subject know about its observers?', a: 'Only that they implement the observer interface. It does not know their classes or what they do with the news.' },
      { q: 'Why can a lambda be an observer?', a: 'The observer interface has exactly one abstract method, so it is a functional interface, and a lambda can implement it.' },
      { q: 'What can go wrong when an observer unsubscribes inside its callback, and how do you fix it?', a: 'If the subject loops over the real list, the list changes during the loop and Java throws `ConcurrentModificationException`. Loop over a copy, for example `List.copyOf(listeners)`.' }
    ],
    keyPoints: [
      'The subject keeps a list of observers and offers subscribe and unsubscribe.',
      'On a change, it calls one method on every observer: notify.',
      'Observers implement a small interface, so a lambda can be one.',
      'The subject depends only on that interface: loose coupling.',
      'Unsubscribe when done, and loop over a copy if observers may leave during a notification.'
    ],
    commonMistakes: [
      'Forgetting to unsubscribe. The subject keeps the observer alive and keeps calling it. Call `unsubscribe` when the observer is no longer needed.',
      'Removing from the list inside the for-each loop: a `ConcurrentModificationException`. Loop over `List.copyOf(listeners)`.',
      'Unsubscribing a lambda by writing it again: `unsubscribe(t -> …)` is a new object and removes nothing. Keep the reference in a variable.',
      'Relying on the order of observers. If B must run after A, make that explicit instead of trusting the subscription order.'
    ],
    related: ['MVC', 'Strategy', 'Command', 'Collections'],
    glossary: DP.glossary
  });
})();
