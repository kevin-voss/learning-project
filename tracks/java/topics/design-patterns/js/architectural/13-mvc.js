(function () {
  const DP = Java.topics.designPatterns;

  DP.lessons.push({
    id: 'mvc',
    num: '13',
    title: 'MVC',
    category: 'architectural',
    icon: '∭',
    tagline: 'Model · View · Controller',
    realWorld: 'The scoreboard at a football match. Somewhere a notebook holds the real score (the model). The big board and the TV show the score to people (the views). A person at a desk types in each goal (the controller). The notebook does not care how the board looks, and the board never decides the score.',
    kid: [
      'Think of a puppet show. There is the story book: it says what happens. There are the puppets on the stage: they show the story to the children. And there is the puppeteer: she listens to the children shouting "look behind you!" and moves the story along.',
      'The book does not know about puppets. The puppets do not decide the story. The puppeteer connects them.',
      '**MVC** splits a program the same way into three parts: the **Model** (the story and its rules), the **View** (what you see) and the **Controller** (who listens to you and tells the others what to do).'
    ],
    definition: '**MVC** (Model-View-Controller) is an **architectural pattern**: it splits a program with a user interface into three parts. The **model** holds the data and its rules, the **view** shows the data, and the **controller** turns user input into changes of the model.',
    explain: [
      'The **model** is plain Java: classes with data and rules, such as a todo list that can add an item and mark it done. It has **no** printing and no input code. Because of that you can test it without any screen.',
      'The **view** only shows things. It gets data from the model and turns it into text, a web page or a window. It contains no rules: it never decides whether a todo may be marked done.',
      'The **controller** receives the user\'s input (a typed command, a click, a web request), checks it, and calls the right model method. It decides **what** happens, not **how** it looks.',
      'The parts are often glued with an **Observer** (see the Observer lesson): the model notifies its listeners when it changes, and the view, as a listener, redraws itself. So the model never needs to know which views exist, and you can have several views of one model.',
      'MVC is called architectural because it organises a whole program, not a few classes. It uses smaller patterns inside: Observer between model and view, often Strategy for interchangeable controllers. Web frameworks such as Spring MVC use the same three roles; the "view" there is an HTML page or the JSON of a [REST](../rest-and-http/index.html) response.'
    ],
    why: 'When data, rules, input and output are mixed in one class, every change touches everything: a new screen means rewriting the rules, and the rules cannot be tested without a screen. MVC gives each concern its own home.',
    whenUse: 'In any program with a user interface that is more than a few lines: desktop apps, web applications, games, command-line tools with menus. Not for a tiny script that reads one value and prints one answer.',
    syntax: '`class Model { void change(…) { …; notifyListeners(); } }`, `class View { void render(Data d) { … } }`, `class Controller { Controller(Model m, View v) { m.onChange(() -> v.render(m.data())); } void handle(String input) { m.change(…); } }`.',
    pros: [
      'Rules (model) can be tested without any screen.',
      'Several views can show the same model.',
      'A new view (web, phone) does not touch the rules.',
      'Teams can work on the parts separately.'
    ],
    cons: [
      'More classes and wiring for small programs.',
      'Where a piece of logic belongs is not always obvious.',
      'Controllers easily grow too fat if rules leak into them.'
    ],
    fileName: 'TodoApp.java',
    code: `import java.util.ArrayList;
import java.util.List;

record Todo(String text, boolean done) {}

class TodoModel { // model: data and rules, no printing
    private final List<Todo> todos = new ArrayList<>();
    private final List<Runnable> listeners = new ArrayList<>();

    void onChange(Runnable listener) { listeners.add(listener); }
    void add(String text) { todos.add(new Todo(text, false)); changed(); }
    void complete(int number) {
        Todo t = todos.get(number - 1);
        todos.set(number - 1, new Todo(t.text(), true));
        changed();
    }
    List<Todo> todos() { return List.copyOf(todos); }
    private void changed() { listeners.forEach(Runnable::run); }
}

class TodoView { // view: only shows
    void render(List<Todo> todos) {
        System.out.println("Todo list:");
        for (int i = 0; i < todos.size(); i++) {
            Todo t = todos.get(i);
            System.out.println("  " + (i + 1) + ". [" + (t.done() ? "x" : " ") + "] " + t.text());
        }
    }
    void error(String message) { System.out.println("! " + message); }
}

class TodoController { // controller: turns input into model calls
    private final TodoModel model;
    private final TodoView view;

    TodoController(TodoModel model, TodoView view) {
        this.model = model;
        this.view = view;
        model.onChange(() -> view.render(model.todos())); // observer glue
    }

    void handle(String input) {
        System.out.println("> " + input);
        if (input.startsWith("add ")) {
            model.add(input.substring(4));
        } else if (input.startsWith("done ")) {
            model.complete(Integer.parseInt(input.substring(5)));
        } else {
            view.error("Unknown command: " + input);
        }
    }
}

public class TodoApp {
    public static void main(String[] args) {
        TodoController controller = new TodoController(new TodoModel(), new TodoView());
        String[] userInput = { "add buy milk", "add call grandma", "done 1", "dance" };
        for (String line : userInput) {
            controller.handle(line);
        }
    }
}`,
    output: `> add buy milk
Todo list:
  1. [ ] buy milk
> add call grandma
Todo list:
  1. [ ] buy milk
  2. [ ] call grandma
> done 1
Todo list:
  1. [x] buy milk
  2. [ ] call grandma
> dance
! Unknown command: dance`,
    codeSummary: 'The controller reads each command and calls the model. The model changes and notifies; the view, subscribed by the controller, prints the new list. Wrong input goes to the view as an error.',
    codeExplanation: [
      { label: 'Line 6', code: 'class TodoModel { // model: data and rules, no printing', text: 'The model. Look through it: not a single `System.out`. It only stores todos and knows how to change them.' },
      { label: 'Line 10', code: 'void onChange(Runnable listener) { listeners.add(listener); }', text: 'The Observer part: anyone can ask to be told about changes. The model does not know who listens.' },
      { label: 'Line 13', code: 'Todo t = todos.get(number - 1);', text: 'Users count from 1, lists from 0. The model translates. A bad number throws `IndexOutOfBoundsException` here.' },
      { label: 'Line 17', code: 'List<Todo> todos() { return List.copyOf(todos); }', text: 'The model hands out a copy, so a view cannot change the data behind the model\'s back.' },
      { label: 'Line 21', code: 'class TodoView { // view: only shows', text: 'The view. It turns a list into text and has no rules at all.' },
      { label: 'Line 39', code: 'model.onChange(() -> view.render(model.todos())); // observer glue', text: 'The controller connects the parts: every model change makes the view render the fresh list.' },
      { label: 'Line 42', code: 'void handle(String input) {', text: 'The controller\'s main job: understand one piece of user input.' },
      { label: 'Line 45', code: 'model.add(input.substring(4));', text: 'The controller does not print the list itself. It changes the model, and the update reaches the view through the listener.' },
      { label: 'Line 49', code: 'view.error("Unknown command: " + input);', text: 'Input the controller cannot understand goes straight to the view; the model is not involved.' },
      { label: 'Line 57', code: 'String[] userInput = { "add buy milk", "add call grandma", "done 1", "dance" };', text: 'Stands in for typed input. In a real program these lines would come from a `Scanner` or from button clicks.' }
    ],
    sections: [
      {
        title: 'The problem: everything in one place',
        text: [
          'Small programs often start like this: the list, the printing and the input handling all live in one class. It works until you want a second screen, a web version, or a test for the rules without the printing.'
        ],
        fileName: 'AllInOne.java',
        code: `import java.util.ArrayList;
import java.util.List;

public class AllInOne {
    static List<String> todos = new ArrayList<>();

    static void handle(String input) {
        if (input.startsWith("add ")) {
            todos.add(input.substring(4));
            System.out.println("Todo list: " + todos); // printing mixed in
        } else if (input.startsWith("done ")) {
            int i = Integer.parseInt(input.substring(5)) - 1;
            todos.set(i, todos.get(i) + " (done)"); // rule mixed with text
            System.out.println("Todo list: " + todos);
        }
    }

    public static void main(String[] args) {
        handle("add buy milk");
        handle("done 1");
        handle("done 1"); // the rule breaks: done twice
    }
}`,
        output: `Todo list: [buy milk]
Todo list: [buy milk (done)]
Todo list: [buy milk (done) (done)]`,
        warn: 'The pain: "done" is stored as text, so the rule "an item is done or not" lives in the display string and breaks. To show the list as a web page, you would have to rewrite `handle` completely.'
      },
      {
        title: 'The roles in a class diagram',
        mermaid: `classDiagram
  class TodoModel {
    -List~Todo~ todos
    +add(String) void
    +complete(int) void
    +todos() List~Todo~
    +onChange(Runnable) void
  }
  class TodoView {
    +render(List~Todo~) void
    +error(String) void
  }
  class TodoController {
    +handle(String) void
  }
  TodoController --> TodoModel : changes
  TodoController --> TodoView : reports errors
  TodoModel ..> TodoView : notifies through a listener`,
        diagramNote: 'The controller knows both other parts. The model knows neither: it only calls the listeners it was given, shown as a dashed arrow. The view knows nothing but the data it receives.',
        text: [
          'Three roles, with a clear direction of knowledge: controller → model, controller → view, model → (only) its listeners.'
        ]
      },
      {
        title: 'The order of calls for one command',
        mermaid: `sequenceDiagram
  actor U as user
  participant C as TodoController
  participant M as TodoModel
  participant V as TodoView
  U->>C: "add buy milk"
  C->>M: add("buy milk")
  M->>M: store the todo
  M->>V: listener runs: render(todos)
  V-->>U: prints the list
  U->>C: "dance"
  C->>V: error("Unknown command: dance")`,
        diagramNote: 'For a valid command the path is user → controller → model → view. For invalid input the controller goes to the view directly.',
        text: [
          'This order is MVC\'s heartbeat: input flows in through the controller, the model changes, and the view updates because the model said so.'
        ]
      },
      {
        title: 'Two views of one model',
        text: [
          'Because the model only knows listeners, you can attach as many views as you like. Here one counter has a number view and a bar view, and both update on every change.'
        ],
        fileName: 'TwoViews.java',
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.function.IntConsumer;

class CounterModel {
    private int value;
    private final List<IntConsumer> views = new ArrayList<>();
    void onChange(IntConsumer view) { views.add(view); }
    void add(int delta) {
        value = Math.max(0, value + delta); // rule: never below zero
        views.forEach(v -> v.accept(value));
    }
}

public class TwoViews {
    public static void main(String[] args) {
        CounterModel model = new CounterModel();
        model.onChange(n -> System.out.println("Number view: " + n));
        model.onChange(n -> System.out.println("Bar view:    " + "#".repeat(n)));

        for (String key : new String[] { "+", "+", "+", "-", "-", "-", "-" }) {
            model.add(key.equals("+") ? 1 : -1); // a tiny controller
        }
    }
}`,
        output: `Number view: 1
Bar view:    #
Number view: 2
Bar view:    ##
Number view: 3
Bar view:    ###
Number view: 2
Bar view:    ##
Number view: 1
Bar view:    #
Number view: 0
Bar view:
Number view: 0
Bar view:`,
        tip: 'The rule "never below zero" sits in the model. Both views show 0 for the last key, and neither of them had to know the rule.'
      },
      {
        title: 'MVC on the web',
        text: [
          'In a web application the input is an HTTP request and the view is the response: an HTML page or JSON. A web framework finds the right controller method for each request. The roles stay the same, as this small simulation shows.'
        ],
        fileName: 'WebStyle.java',
        code: `import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class TodoStore { // model
    private final List<String> todos = new ArrayList<>(List.of("buy milk"));
    void add(String text) { todos.add(text); }
    List<String> all() { return List.copyOf(todos); }
}

class JsonView { // view: data to JSON text
    String render(List<String> todos) {
        return todos.stream().map(t -> "\\"" + t + "\\"").collect(Collectors.joining(",", "[", "]"));
    }
}

class TodoWebController { // controller: one method per request
    private final TodoStore store = new TodoStore();
    private final JsonView view = new JsonView();

    String handle(String method, String path, String body) {
        if (method.equals("GET") && path.equals("/todos")) return "200 " + view.render(store.all());
        if (method.equals("POST") && path.equals("/todos")) { store.add(body); return "201 Created"; }
        return "404 Not Found";
    }
}

public class WebStyle {
    public static void main(String[] args) {
        TodoWebController c = new TodoWebController();
        System.out.println(c.handle("GET", "/todos", ""));
        System.out.println(c.handle("POST", "/todos", "call grandma"));
        System.out.println(c.handle("GET", "/todos", ""));
        System.out.println(c.handle("GET", "/cats", ""));
    }
}`,
        output: `200 ["buy milk"]
201 Created
200 ["buy milk","call grandma"]
404 Not Found`,
        tip: 'In Spring MVC you would write the controller method with annotations like `@GetMapping("/todos")`, and the framework would do the `if` on method and path for you. The model and the view stay the same idea.'
      },
      {
        title: 'When not to use it',
        text: [
          'A script that reads two numbers and prints their sum does not need three classes. MVC pays off once there is real state, several screens or input paths, or rules you want to test.',
          'Watch where the rules go. "Never below zero" or "done only once" belong in the model. If they slip into the controller, every new controller (web, phone, test) must copy them; if they slip into the view, they get lost when the view changes.'
        ],
        table: {
          head: ['Code', 'Belongs in'],
          rows: [
            ['`if (value < 0) value = 0;`', 'model'],
            ['`System.out.println("Count: " + n);`', 'view'],
            ['`if (input.startsWith("add "))`', 'controller'],
            ['Saving todos to a file', 'model (or a helper the model uses)']
          ]
        }
      }
    ],
    technical: [
      'MVC is a way to arrange ordinary classes, so the JVM sees nothing special. What matters is the **dependency direction**: the model has no references to view or controller classes, which you can check by reading its `import` lines and fields. That one-way dependency is what keeps the model reusable and testable.',
      'The model notifies through `Runnable` listeners. When the controller registers `() -> view.render(model.todos())`, the lambda captures references to the view and the model. Each change runs that lambda, which reads a fresh copy of the data and hands it to the view.',
      'Real user interfaces run the view on a special **UI thread**: only that thread may draw. Frameworks therefore pass model events over to the UI thread before the view renders. In web MVC each request usually gets its own thread, so models shared between requests must be designed for that.'
    ],
    tryIt: {
      steps: [
        'Copy `TodoApp.java` and run it with `java TodoApp.java`.',
        'Add a command `remove 2` to the controller that calls a new model method `remove(int number)`.',
        'Add `"remove 2"` to the `userInput` array and run again.',
        'Then add `"done 1"` once more and decide: should marking a done item again be an error? Put that rule in the model, not in the controller.'
      ],
      see: 'After `remove 2` the list shows only `1. [x] buy milk`, and the view updated without any print in the controller.'
    },
    check: [
      { q: 'What does each of the three parts do?', a: 'The model holds the data and the rules. The view shows the data. The controller takes user input and calls the model (or reports errors through the view).' },
      { q: 'How does the view learn that the model changed, without the model knowing the view?', a: 'Through the Observer pattern: the model keeps a list of listeners and calls them on each change. The controller registers a listener that tells the view to render.' },
      { q: 'With `TodoApp`, the input `done 9` crashes with `IndexOutOfBoundsException`. Where would you handle that, and why?', a: 'The model should check the number and throw a clear exception (it owns the rule "the item must exist"). The controller catches it and asks the view to show the error, because talking to the user is the view\'s job.' }
    ],
    keyPoints: [
      'MVC splits a program into model (data and rules), view (display) and controller (input).',
      'The model knows neither the view nor the controller.',
      'Model changes reach the views through listeners: Observer inside MVC.',
      'One model can have many views.',
      'Web frameworks use the same roles: requests in, JSON or HTML out.'
    ],
    commonMistakes: [
      'Printing in the model: `System.out.println` inside `TodoModel.add`. Then the model is tied to the console. Notify listeners instead.',
      'Rules in the controller: `if (count > 0) model.add(-1)` in the controller. Put the rule into the model so every controller gets it.',
      'Letting the view change the data: the view calls `model.add(…)` itself. Views only show; input goes through the controller.',
      'Handing out the internal list: `return todos;`. A view could then change it. Return `List.copyOf(todos)`.'
    ],
    related: ['Observer', 'Strategy', 'Facade', 'REST and HTTP'],
    glossary: DP.glossary
  });
})();
