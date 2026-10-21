// UML lesson 7: combined fragments in sequence diagrams (alt, opt, loop, break, par).
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'sequence-fragments',
    num: '07',
    title: 'Sequence Fragments: alt, opt, loop',
    category: 'behavior',
    icon: '⧉',
    tagline: 'if, else and loops inside a sequence diagram',
    realWorld: 'A board game card that says: "Roll the dice three times. If you roll a six, move to the castle; otherwise stay." The card frames a part of the rules and writes the condition on top of the frame.',
    kid: [
      'At the playground your mum says: "Go down the slide three times." That is a loop: the same thing again and again.',
      'Then she says: "If it rains, we go home. Otherwise we get ice cream." That is a choice: one path or the other.',
      'In a sequence diagram you draw a frame around the arrows that repeat or that happen only sometimes. On the corner of the frame you write the rule: "loop", "alt" for a choice, or "opt" for "maybe".'
    ],
    definition: 'A **combined fragment** is a frame around some messages of a sequence diagram. Its operator says how they run: `alt` (one of several paths, like `if/else`), `opt` (maybe, like `if` without `else`), `loop` (repeat, like `for` or `while`), `break` (leave early) and `par` (at the same time). A **guard** in square brackets gives the condition.',
    explain: [
      'A plain sequence diagram shows one scenario. Real code has decisions and repetitions, and drawing one diagram per path would give dozens of diagrams. Fragments put the paths into one diagram.',
      'A fragment is a rectangle drawn across the lifelines it involves. In the top-left corner stands the **operator** (`alt`, `opt`, `loop` …). Next to it, or at the start of each part, stands the **guard**: a condition in square brackets, such as `[paid >= price]`. The messages inside run only when the guard is true.',
      '`alt` (alternatives) is split by dashed lines into parts. Each part has its own guard, and exactly one part runs: it is `if / else if / else`. `opt` (optional) has one part only: it is an `if` without `else`.',
      '`loop` repeats its messages while its guard is true: `[for each coin]`, `[while battery > 0]`, or `loop(3)` for three times. `break` means "do this and then leave the surrounding fragment", like `break` or an early `return`. `par` means "these parts run at the same time", which in Java needs threads.',
      'Fragments can be **nested**: an `opt` inside an `alt`, an `alt` inside a `loop`. They nest exactly like blocks in Java code, so the frames show you the curly braces.'
    ],
    why: 'Without fragments you need one diagram for "enough money" and another one for "not enough money". With fragments one diagram shows every path, and the frames map one to one onto `if`, `else` and loops in the code.',
    whenUse: 'When the order of messages depends on a condition or repeats. Keep the number of fragments small: if a diagram needs more than two or three nested frames, the method behind it is probably too big too.',
    syntax: 'Mermaid: `alt condition` … `else other` … `end`, `opt condition` … `end`, `loop text` … `end`, `break condition` … `end`, `par first` … `and second` … `end`. Mermaid writes the guard without square brackets; on paper write `[condition]`.',
    mermaid: `sequenceDiagram
  actor C as Customer
  participant M as machine : Machine
  participant D as display : Display
  C->>+M: buy(coins)
  loop for each coin
    M->>D: show("paid ...")
  end
  alt paid >= price
    M->>D: show("here is your snack")
    opt change > 0
      M->>D: show("change ...")
    end
  else paid < price
    M->>D: show("not enough ...")
  end
  M-->>-C: done`,
    visualLabel: 'A vending machine with three fragments',
    visualNote: 'The `loop` frame is the `for` loop. The `alt` frame is the `if / else`. The `opt` frame inside it is the inner `if`. Each guard is a condition in the code below.',
    fileName: 'VendingMachineDemo.java',
    code: `public class VendingMachineDemo {
    public static void main(String[] args) {
        Machine machine = new Machine(150);
        machine.buy(new int[] { 100, 50, 20 });
        System.out.println("---");
        machine.buy(new int[] { 50, 20 });
    }
}

class Machine {
    private final int price;
    private final Display display = new Display();

    Machine(int price) {
        this.price = price;
    }

    void buy(int[] coins) {
        int paid = 0;
        for (int coin : coins) {                  // loop [for each coin]
            paid += coin;
            display.show("paid " + paid);
        }
        if (paid >= price) {                      // alt [paid >= price]
            display.show("here is your snack");
            int change = paid - price;
            if (change > 0) {                     // opt [change > 0]
                display.show("change " + change);
            }
        } else {                                  // else [paid < price]
            display.show("not enough, returning " + paid);
        }
    }
}

class Display {
    void show(String text) {
        System.out.println("Display: " + text);
    }
}`,
    output: `Display: paid 100
Display: paid 150
Display: paid 170
Display: here is your snack
Display: change 20
---
Display: paid 50
Display: paid 70
Display: not enough, returning 70`,
    codeSummary: 'The method `buy` contains one loop and two decisions. Each one is a frame in the diagram. The first call takes the `alt` path with change; the second call takes the `else` path.',
    codeExplanation: [
      { label: 'Line 4', code: 'machine.buy(new int[] { 100, 50, 20 });', text: 'The first scenario: 170 cents for a 150 cent snack. It goes through the loop three times, then the `alt` part with the `opt` part.' },
      { label: 'Line 20', code: 'for (int coin : coins) {                  // loop [for each coin]', text: 'The `loop` frame. Everything inside the braces is inside the frame: here one `show` message per coin.' },
      { label: 'Line 22', code: 'display.show("paid " + paid);', text: 'The arrow inside the loop frame. The diagram draws it once; at runtime it happens once per coin.' },
      { label: 'Line 24', code: 'if (paid >= price) {                      // alt [paid >= price]', text: 'The first part of the `alt` frame. Its guard `[paid >= price]` is exactly this condition.' },
      { label: 'Line 27', code: 'if (change > 0) {                     // opt [change > 0]', text: 'An `if` without `else` inside the first part: an `opt` frame nested in the `alt` frame.' },
      { label: 'Line 30', code: '} else {                                  // else [paid < price]', text: 'The dashed line inside the `alt` frame. The part below it runs when the first guard is false.' },
      { label: 'Line 6', code: 'machine.buy(new int[] { 50, 20 });', text: 'The second scenario: only 70 cents. The loop runs twice, then the `else` part. One diagram covers both calls.' }
    ],
    sections: [
      {
        title: 'The fragment operators and their Java code',
        text: ['There are about a dozen operators in the UML standard. These five cover almost every diagram you will meet.'],
        table: {
          head: ['Operator', 'Means', 'Java', 'Guard example'],
          rows: [
            ['`alt`', 'exactly one of several parts runs', '`if … else if … else`, `switch`', '`[paid >= price]`, `[else]`'],
            ['`opt`', 'the part runs or not', '`if` without `else`', '`[change > 0]`'],
            ['`loop`', 'the part repeats', '`for`, `while`, for-each', '`[for each coin]`, `[while tries < 3]`'],
            ['`break`', 'run the part, then leave the surrounding frame', '`break`, early `return`, `throw`', '`[book found]`'],
            ['`par`', 'the parts run at the same time', 'threads', 'none, one part per thread']
          ],
          note: 'A guard is a boolean condition. Write it so you could paste it into an `if`.'
        }
      },
      {
        title: 'alt: if and else in one frame',
        text: [
          'A login checks the password. With the right password the app shows the home screen; with a wrong one it shows an error. One `alt` frame with two parts covers both scenarios.'
        ],
        mermaid: `sequenceDiagram
  actor U as User
  participant A as app : LoginApp
  participant S as store : PasswordStore
  U->>+A: login("mia", password)
  A->>+S: matches("mia", password)
  S-->>-A: true or false
  alt password matches
    A-->>U: "Welcome, mia"
  else wrong password
    A-->>U: "Wrong password"
  end
  deactivate A`,
        fileName: 'LoginDemo.java',
        code: `public class LoginDemo {
    public static void main(String[] args) {
        LoginApp app = new LoginApp(new PasswordStore());
        System.out.println(app.login("mia", "sun123"));
        System.out.println(app.login("mia", "moon"));
    }
}

class PasswordStore {
    boolean matches(String user, String password) {
        return user.equals("mia") && password.equals("sun123");
    }
}

class LoginApp {
    private final PasswordStore store;

    LoginApp(PasswordStore store) {
        this.store = store;
    }

    String login(String user, String password) {
        if (store.matches(user, password)) {   // alt [password matches]
            return "Welcome, " + user;
        } else {                               // else [wrong password]
            return "Wrong password";
        }
    }
}`,
        output: `Welcome, mia
Wrong password`
      },
      {
        title: 'loop and break: search until found',
        text: [
          'A librarian looks at the shelf book by book. When the right title appears, she stops looking. The search is a `loop`; stopping early is a `break` fragment inside it.',
          'In Java the `break` fragment becomes a `return` (or a `break` statement) inside the loop.'
        ],
        mermaid: `sequenceDiagram
  participant L as librarian : Librarian
  participant B as book : Book
  loop for each book on the shelf
    L->>+B: title()
    B-->>-L: title
    break title equals wanted
      L-->>L: return "found at place i"
    end
  end`,
        fileName: 'ShelfSearch.java',
        code: `public class ShelfSearch {
    public static void main(String[] args) {
        Librarian ana = new Librarian();
        String[] shelf = { "Matilda", "Heidi", "Momo", "Pippi" };
        System.out.println(ana.find(shelf, "Momo"));
        System.out.println(ana.find(shelf, "Emil"));
    }
}

class Librarian {
    String find(String[] shelf, String wanted) {
        for (int i = 0; i < shelf.length; i++) {        // loop [for each book]
            System.out.println("  looking at " + shelf[i]);
            if (shelf[i].equals(wanted)) {               // break [title equals wanted]
                return wanted + " found at place " + i;
            }
        }
        return wanted + " is not on the shelf";
    }
}`,
        output: `  looking at Matilda
  looking at Heidi
  looking at Momo
Momo found at place 2
  looking at Matilda
  looking at Heidi
  looking at Momo
  looking at Pippi
Emil is not on the shelf`,
        tip: 'To keep the example short, the books are plain strings and `title()` is `shelf[i]`. With real `Book` objects the arrow `title()` would be a method call.'
      },
      {
        title: 'Nested frames are nested braces',
        text: [
          'Turning fragments back into code is mechanical. Work from the outside in:'
        ],
        bullets: [
          'Each frame becomes one block: `loop` → `for`/`while`, `alt` → `if/else`, `opt` → `if`, `break` → `return` or `break`.',
          'Each guard becomes the condition in the round brackets.',
          'A frame inside a frame becomes a block inside a block, at the same place.',
          'Each arrow inside a frame becomes a method call inside that block.'
        ],
        mermaid: `flowchart LR
  F1["loop frame"] --> J1["for or while block"]
  F2["alt frame"] --> J2["if ... else blocks"]
  F3["opt frame"] --> J3["if block, no else"]
  F4["break frame"] --> J4["return or break"]
  F5["guard [x > 0]"] --> J5["condition x > 0"]`,
        warn: 'A guard is a condition, not an action. Wrong: `[check the money]`. Right: `[paid >= price]`. If you cannot paste the guard into an `if`, rewrite it.'
      },
      {
        title: 'par: two things at the same time',
        text: [
          'In a kitchen, one cook bakes the pizza while another one makes the salad. Neither waits for the other. A `par` frame shows such parts that run **in parallel**; each part is separated by a dashed line.',
          'In Java, real parallel work needs **threads** (several paths of work at the same time). They are not part of this course yet, so this fragment has no runnable example here; read it as "the order between these parts does not matter".'
        ],
        mermaid: `sequenceDiagram
  participant W as waiter
  participant P as pizzaCook
  participant S as saladCook
  par pizza
    W->>P: bake("Margherita")
  and salad
    W->>S: mix("green salad")
  end
  W->>W: serve both`
      }
    ],
    technical: [
      'The compiler turns `if`, `else` and loops into jump instructions in the bytecode: "if this value is false, jump to that line". A fragment is the picture of such a jump. The arrows inside an `alt` part are the instructions between the condition and the jump target.',
      'A sequence diagram with fragments is no longer one trace but a small **program in picture form**. That is why big diagrams with many nested frames get hard to read, exactly like methods with deep nesting. Split them: draw the inner part as its own diagram and refer to it (UML has a `ref` frame for this; in Mermaid write a `Note` such as "see diagram Pay").',
      'Mermaid also knows `critical` (a part that must not be interrupted) and `rect` (a coloured background without meaning). You rarely need either in a beginner diagram.'
    ],
    tryIt: {
      steps: [
        'In `VendingMachineDemo.java`, add a third case: if `paid == price`, show `exact amount, thank you` and give no change.',
        'Decide first: is it a new part of the `alt` frame or a new `opt` frame? Draw it on paper.',
        'Write the code with `else if`, then call `machine.buy(new int[] { 100, 50 });` in `main`.'
      ],
      see: '`Display: exact amount, thank you` for the third call. On paper, the `alt` frame now has three parts separated by dashed lines.'
    },
    check: [
      { q: 'Which fragment fits an `if` without `else`?', a: '`opt`.' },
      { q: 'An `alt` frame has the parts `[age < 6]`, `[age < 18]` and `[else]`. Write the Java skeleton.', a: '`if (age < 6) { … } else if (age < 18) { … } else { … }`.' },
      { q: 'Why is `[check the password]` a bad guard?', a: 'It is an action, not a condition. A guard must be true or false, such as `[password matches]`.' }
    ],
    keyPoints: [
      'A fragment is a frame with an operator and a guard.',
      '`alt` = if/else, `opt` = if, `loop` = for/while, `break` = leave early, `par` = parallel.',
      'A guard is a boolean condition in square brackets.',
      'Nested frames are nested code blocks.',
      'If you need many nested frames, split the diagram (and the method).'
    ],
    commonMistakes: [
      'Using `opt` for two paths. Fix: two paths are `alt` with an `else` part.',
      'Writing actions as guards: `[read the coins]`. Fix: write a condition, `[for each coin]` or `[paid >= price]`.',
      'Forgetting `end` in Mermaid, which breaks the whole diagram. Fix: every `alt`, `opt`, `loop`, `break` and `par` needs its own `end`.',
      'Drawing the arrows of every loop round. Fix: draw them once inside a `loop` frame.'
    ],
    related: ['Sequence Diagram', 'Activity Diagram', 'Control Flow'],
    glossary: U.glossary
  });
})();
