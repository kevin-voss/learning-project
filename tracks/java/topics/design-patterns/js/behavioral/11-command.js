(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'command',
    num: '11',
    title: 'Command',
    category: 'behavioral',
    icon: '▶',
    tagline: 'Turn requests into objects',
    realWorld: 'An order slip in a restaurant. The waiter writes "table 4: one soup" on a slip and pins it on the kitchen rail. The slip can wait in a row with other slips, the cook takes them one by one, and if the guest changes their mind, the slip can be torn up. The request has become a thing you can hold.',
    kid: [
      'You have a toy robot that you program with cards. One card says "go forward", one says "turn left". You lay the cards in a row, and then you press the big button. The robot does card after card.',
      'If you made a mistake, you take the last card away. If you want the robot to do the same dance again, you keep the row of cards and press the button again.',
      'A **Command** is one such card. It is not the doing itself. It is a little object that **knows what to do**, so you can keep it, put it in a row, do it later, or take it back.'
    ],
    definition: 'The **Command** pattern turns a request ("add this text", "turn on the light") into an **object** with a method such as `execute()`. Because the request is an object, you can store it, queue it, log it, run it later and, with an `undo()` method, take it back.',
    explain: [
      'Normally a request is a method call: it happens at once and is gone. A **command object** packs the call into an object: **which** receiver, **which** action, and **which** values. Calling `execute()` on it performs the action.',
      'There are four roles. The **command** interface declares `execute()` (and often `undo()`). A **concrete command** (`AddText`) stores the receiver and the values. The **receiver** (`Document`) is the object that really does the work. The **invoker** (`Editor`) runs commands and keeps a history, without knowing what any command does.',
      'For **undo**, each command remembers what it needs to reverse itself: `AddText` remembers how many characters it added and removes them again. The invoker keeps executed commands on a **stack** (last in, first out), so `undo` always takes back the newest one first.',
      'A stack in Java is an `ArrayDeque`: `push` puts an element on top, `pop` takes the top one off. You know `Deque` from [Collections](../collections/index.html).',
      'When a command needs no undo, Java\'s own `Runnable` interface (one method `run()`) is already a command interface, and a lambda can be the command. That is how tasks are handed to queues and thread pools.'
    ],
    why: 'As long as a request is a direct method call, you cannot undo it, repeat it, delay it or list it. Turning it into an object gives you all of that, and the code that triggers requests (buttons, menus, shortcuts) no longer needs to know the code that carries them out.',
    whenUse: 'When you need undo and redo, a history or log of actions, a queue of tasks to run later, or many triggers (button, menu, keyboard) for the same action. Not for a single direct call that never needs any of this.',
    syntax: '`interface Command { void execute(); void undo(); }`, `class Concrete implements Command { private final Receiver r; … public void execute() { r.action(…); } }`, and an invoker with `Deque<Command> history = new ArrayDeque<>();`.',
    pros: [
      'Undo and redo become possible.',
      'Commands can be stored, queued, logged and repeated.',
      'Triggers (buttons, shortcuts) are decoupled from the work.',
      'Several commands can be combined into one macro.'
    ],
    cons: [
      'One class per action, unless lambdas are enough.',
      'Undo must be written carefully for each command.',
      'An extra step between the caller and the work.'
    ],
    fileName: 'EditorDemo.java',
    code: `import java.util.ArrayDeque;
import java.util.Deque;

class Document { // receiver: does the real work
    private final StringBuilder text = new StringBuilder();
    void insert(String s) { text.append(s); }
    void removeLast(int n) { text.setLength(text.length() - n); }
    String text() { return text.toString(); }
}

interface Command {
    void execute();
    void undo();
}

class AddText implements Command { // concrete command
    private final Document doc;
    private final String words;
    AddText(Document doc, String words) { this.doc = doc; this.words = words; }
    public void execute() { doc.insert(words); }
    public void undo() { doc.removeLast(words.length()); }
}

class Editor { // invoker: runs commands, keeps the history
    private final Deque<Command> history = new ArrayDeque<>();
    void run(Command c) { c.execute(); history.push(c); }
    void undo() { if (!history.isEmpty()) history.pop().undo(); }
}

public class EditorDemo {
    public static void main(String[] args) {
        Document doc = new Document();
        Editor editor = new Editor();
        editor.run(new AddText(doc, "Hello"));
        editor.run(new AddText(doc, " world"));
        editor.run(new AddText(doc, "!!!"));
        System.out.println(doc.text());
        editor.undo();
        System.out.println(doc.text());
        editor.undo();
        System.out.println(doc.text());
    }
}`,
    output: `Hello world!!!
Hello world
Hello`,
    codeSummary: 'Every edit is an `AddText` object. The editor runs it and pushes it on a stack, so `undo` can pop the newest one and reverse it.',
    codeExplanation: [
      { label: 'Line 4', code: 'class Document { // receiver: does the real work', text: 'The receiver. It knows how to insert and remove text, but nothing about commands or undo.' },
      { label: 'Line 11', code: 'interface Command {', text: 'The command interface: do it, and take it back.' },
      { label: 'Line 16', code: 'class AddText implements Command { // concrete command', text: 'One request packed into an object: the receiver and the words travel together.' },
      { label: 'Line 20', code: 'public void execute() { doc.insert(words); }', text: 'Executing the command calls the receiver. The command itself does almost nothing.' },
      { label: 'Line 21', code: 'public void undo() { doc.removeLast(words.length()); }', text: 'The command knows how to reverse itself, because it remembers what it added.' },
      { label: 'Line 26', code: 'void run(Command c) { c.execute(); history.push(c); }', text: 'The invoker runs any command and stores it on top of the stack. It never knows what the command does.' },
      { label: 'Line 27', code: 'void undo() { if (!history.isEmpty()) history.pop().undo(); }', text: 'Take the newest command off the stack and reverse it. The check avoids an error when there is nothing to undo.' },
      { label: 'Line 34', code: 'editor.run(new AddText(doc, "Hello"));', text: 'The client creates a command and hands it to the invoker instead of calling `doc.insert` directly.' },
      { label: 'Line 38', code: 'editor.undo();', text: 'Removes `!!!`, the last thing added. The second undo removes ` world`.' }
    ],
    sections: [
      {
        title: 'The problem: direct calls leave no trace',
        text: [
          'Here the program calls the document directly. It works, but after the calls nothing remembers what happened. To undo, you would need to know what was added, in which order, by whom.'
        ],
        fileName: 'NoCommand.java',
        code: `public class NoCommand {
    public static void main(String[] args) {
        StringBuilder doc = new StringBuilder();
        doc.append("Hello");
        doc.append(" world");
        doc.append("!!!");
        System.out.println(doc);

        // Undo? We would have to remember "!!!" was 3 characters...
        // ...and every other place that edits doc must remember too.
        doc.setLength(doc.length() - 3);
        System.out.println(doc);
    }
}`,
        output: `Hello world!!!
Hello world`,
        warn: 'The pain: undo needs knowledge that each call site would have to keep by itself. With many buttons and menus that edit the document, this falls apart quickly.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class Editor {
    -Deque~Command~ history
    +run(Command) void
    +undo() void
  }
  class Command {
    <<interface>>
    +execute() void
    +undo() void
  }
  class AddText {
    -Document doc
    -String words
  }
  class Document {
    +insert(String) void
    +removeLast(int) void
  }
  Editor o-- Command : history
  Command <|.. AddText
  AddText --> Document : calls`,
        diagramNote: 'The invoker (`Editor`) knows only the interface. The concrete command knows the receiver (`Document`). The invoker and the receiver never meet.',
        text: [
          'Four roles: **invoker**, **command**, **concrete command**, **receiver**. Plus the **client**, which creates the commands and hands them to the invoker.'
        ]
      },
      {
        title: 'The order of calls, including undo',
        mermaid: `sequenceDiagram
  participant C as main
  participant E as Editor
  participant A as AddText
  participant D as Document
  C->>A: new AddText(doc, "!!!")
  C->>E: run(command)
  E->>A: execute()
  A->>D: insert("!!!")
  E->>E: history.push(command)
  C->>E: undo()
  E->>E: history.pop()
  E->>A: undo()
  A->>D: removeLast(3)`,
        diagramNote: 'Creating the command and running it are two separate moments. That gap is what makes queues, logs and undo possible.',
        text: [
          'Order matters twice: a command is created before it runs, and undo always reverses the **newest** command first, because of the stack.'
        ]
      },
      {
        title: 'Commands as lambdas: a queue of tasks',
        text: [
          'Without undo, `Runnable` is all you need. Each lambda is a command object you can put in a queue and run later. A **macro** is a command made of other commands.'
        ],
        fileName: 'TaskQueue.java',
        code: `import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;

public class TaskQueue {
    public static void main(String[] args) {
        Queue<Runnable> tasks = new ArrayDeque<>();
        tasks.add(() -> System.out.println("Wash the dishes"));
        tasks.add(() -> System.out.println("Feed the cat"));

        List<Runnable> bedtime = List.of(
            () -> System.out.println("Brush teeth"),
            () -> System.out.println("Read a story"));
        Runnable macro = () -> bedtime.forEach(Runnable::run); // a command of commands
        tasks.add(macro);

        System.out.println(tasks.size() + " tasks waiting");
        while (!tasks.isEmpty()) {
            tasks.poll().run(); // run them later, in order
        }
    }
}`,
        output: `3 tasks waiting
Wash the dishes
Feed the cat
Brush teeth
Read a story`,
        tip: 'A `Queue` is first in, first out: tasks run in the order they were added. The undo history uses a stack: last in, first out. Pick the collection that matches the order you need.'
      },
      {
        title: 'Where Java itself uses it',
        text: [
          'An `ExecutorService` is an invoker for `Runnable` commands: you `submit` tasks, and it runs them on its own worker **thread** (a separate path of execution in the same program). With a single worker the tasks run one after the other, in order. User interface toolkits use the same idea for menu and button actions.'
        ],
        fileName: 'ExecutorCommands.java',
        code: `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ExecutorCommands {
    public static void main(String[] args) throws InterruptedException {
        ExecutorService worker = Executors.newSingleThreadExecutor();
        for (int i = 1; i <= 3; i++) {
            int n = i;
            worker.submit(() -> System.out.println("Task " + n + " done"));
        }
        worker.shutdown(); // accept no new tasks
        worker.awaitTermination(5, TimeUnit.SECONDS); // wait for the queue to empty
        System.out.println("All tasks finished");
    }
}`,
        output: `Task 1 done
Task 2 done
Task 3 done
All tasks finished`,
        tip: '`int n = i;` is needed because a lambda may only use local variables that never change after they are set ("effectively final"). The loop variable `i` changes, `n` does not.'
      },
      {
        title: 'When not to use it',
        text: [
          'If a button only ever calls one method once and you need no undo, no history and no queue, a command class is overhead. Call the method.',
          'Undo is harder than it looks. A command that deletes a file or sends an email cannot be reversed by code. And when commands depend on the state at the time they ran, they must save that state (for example the deleted text) to undo correctly.'
        ]
      }
    ],
    technical: [
      'A command object lives on the heap and holds references to its receiver and values. Those references keep the receiver alive as long as the command is in the history. Editors therefore often limit the history, for example to the last 100 commands.',
      '`ArrayDeque` is backed by a growable array used as a ring. `push` and `pop` work at the front in constant time, which makes it a fast stack. The old class `java.util.Stack` also works but is slower and not recommended any more.',
      'When you `submit` a lambda to an `ExecutorService`, the lambda is put into an internal queue. The worker thread takes commands from that queue and calls `run()` on each. The invoker (the executor) never knows what the task does: that is exactly the Command pattern.'
    ],
    tryIt: {
      steps: [
        'Copy `EditorDemo.java` and run it with `java EditorDemo.java`.',
        'Add a class `Shout implements Command` that, on `execute`, appends the text in upper case (`words.toUpperCase()`) and on `undo` removes it.',
        'In `main`, run `new Shout(doc, " bye")` after the three adds, print, then undo once and print again.',
        'Call `editor.undo()` five more times and print: nothing should crash.'
      ],
      see: '`Hello world!!! BYE`, then `Hello world!!!` after the undo, and an empty line at the end, without an exception.'
    },
    check: [
      { q: 'Name the four roles of the Command pattern.', a: 'Command (the interface with `execute`), concrete command (stores receiver and values), receiver (does the real work) and invoker (runs commands and keeps history).' },
      { q: 'Why does the undo history use a stack?', a: 'Undo must reverse the newest action first. A stack is last in, first out, so `pop` always returns the most recent command.' },
      { q: 'Which JDK interface is a command interface without undo?', a: '`Runnable`, with its one method `run()`. You can queue `Runnable`s or submit them to an `ExecutorService`.' }
    ],
    keyPoints: [
      'A command is a request packed into an object with `execute()`.',
      'The invoker runs commands without knowing what they do.',
      'The receiver does the real work; the command only calls it.',
      'Commands can be stored, queued, combined and undone.',
      '`Runnable` plus a lambda is the shortest command in Java.'
    ],
    commonMistakes: [
      'Putting the real work into the command: a command that builds the text itself instead of calling `doc.insert`. Keep the work in the receiver.',
      'Calling `history.pop()` on an empty stack: `NoSuchElementException`. Check `isEmpty()` first.',
      'An `undo()` that does not reverse exactly what `execute()` did, for example removing a fixed 5 characters. Save what you need in the command.',
      'Using `Queue` for undo or `Deque` as a stack with `add` and `poll`. Use `push` and `pop` for a stack, `add` and `poll` for a queue.'
    ],
    related: ['Strategy', 'Observer', 'Template Method', 'Collections'],
    glossary: DP.glossary
  });
})();
