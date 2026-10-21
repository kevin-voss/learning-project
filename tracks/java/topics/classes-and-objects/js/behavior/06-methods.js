(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'instance-methods',
    title: 'Methods That Use Fields',
    category: 'practice',
    icon: 'M',
    tagline: 'Behavior that knows its own data',
    glossary: terms,
    realWorld: 'A piggy bank. You can drop coins in, shake it to hear how full it is, and take coins out. The piggy bank remembers its coins between each of these things you do.',
    kid: [
      'Your piggy bank can do three things. "Eat a coin": a coin goes in. "How much is inside?": it tells you. "Give me coins": some coins come out, but only if there are enough.',
      'You never count the coins yourself. You ask the piggy bank, and the piggy bank looks at its own coins.',
      'In Java, these "things it can do" are **methods**. They live inside the class and use the object’s own fields, like the piggy bank uses its own coins.'
    ],
    definition: 'An **instance method** is a method without `static`. It always runs on one object, can read and change that object’s fields, and can call the object’s other methods. Instance methods are the **behavior** of an object.',
    explain: [
      'In [Methods](../methods/index.html) you wrote `static` methods: all the data they need comes in through parameters, and they forget everything after they return. An instance method has one extra source of data: the fields of the object it runs on.',
      'You call an instance method with the dot: `bank.add(5)`. Inside `add`, the field `coins` means `bank`’s coins (it is short for `this.coins`, see "The this Keyword"). Call `otherBank.add(5)` and the same code changes the other bank’s coins.',
      'Methods come in two kinds. A **query** answers a question and changes nothing: `total()`, `canBuy(3)`. It returns a value. A **command** changes the state of the object: `add(5)`, `spend(3)`. It is often `void`, or returns whether it worked.',
      'A change made by a command stays in the object. The next call sees the new value, because fields live as long as the object does. That is the big difference to local variables.',
      'Methods of one object can call each other. `spend(3)` asks `canBuy(3)` first. Inside the class you write the name alone: `canBuy(price)` means `this.canBuy(price)`.'
    ],
    why: 'Code that works on an object’s data belongs next to that data. Then the rules (no spending more than you have) live in one place, and every caller uses them.',
    whenUse: 'Write an instance method whenever an action or a question is about one object: deposit into this account, move this player, is this box empty?',
    syntax: '`returnType name(parameters) { … uses fields … }` inside the class, without `static`. Call it with `object.name(arguments)`.',
    fileName: 'PiggyBankDemo.java',
    code: `public class PiggyBankDemo {
    public static void main(String[] args) {
        PiggyBank bank = new PiggyBank();
        bank.add(5);
        bank.add(3);
        System.out.println("inside: " + bank.total());

        System.out.println("buy for 6? " + bank.spend(6));
        System.out.println("buy for 6 again? " + bank.spend(6));
        System.out.println("inside: " + bank.total());
    }
}

class PiggyBank {
    int coins;   // the state

    void add(int amount) {             // command: changes the state
        coins = coins + amount;
    }

    int total() {                      // query: only reads
        return coins;
    }

    boolean canBuy(int price) {        // query
        return coins >= price;
    }

    boolean spend(int price) {         // command that uses a query
        if (!canBuy(price)) {
            return false;
        }
        coins = coins - price;
        return true;
    }
}`,
    output: `inside: 8
buy for 6? true
buy for 6 again? false
inside: 2`,
    codeSummary: 'The piggy bank keeps its coins in one field. `add` and `spend` change it, `total` and `canBuy` read it. `spend` asks `canBuy` before it takes coins out, so the bank never goes below zero.',
    codeExplanation: [
      { label: 'Line 4', code: 'bank.add(5);', text: 'Calls the instance method `add` on the object `bank`. The field `coins` of this bank goes from 0 to 5.' },
      { label: 'Line 6', code: 'System.out.println("inside: " + bank.total());', text: 'The field kept its value between calls: after two adds, `total()` returns 8.' },
      { label: 'Line 8', code: 'System.out.println("buy for 6? " + bank.spend(6));', text: '8 coins are enough, so `spend` takes 6 and returns `true`.' },
      { label: 'Line 9', code: 'System.out.println("buy for 6 again? " + bank.spend(6));', text: 'Only 2 coins are left. `spend` refuses and returns `false`; nothing changes.' },
      { label: 'Line 15', code: 'int coins;   // the state', text: 'The one field. Every method of the class can read and change it.' },
      { label: 'Line 17', code: 'void add(int amount) {             // command: changes the state', text: 'No `static`, so it belongs to each object. `void` because it only changes something.' },
      { label: 'Line 18', code: 'coins = coins + amount;', text: '`coins` is the field of the object the method runs on, the same as `this.coins`.' },
      { label: 'Line 26', code: 'return coins >= price;', text: 'A question about the state. It returns `true` or `false` and changes nothing.' },
      { label: 'Line 30', code: 'if (!canBuy(price)) {', text: 'A method calling another method of the same object. `canBuy(price)` means `this.canBuy(price)`.' }
    ],
    sections: [
      {
        title: 'static method or instance method?',
        text: [
          'Here is the same job done two ways. The static method needs the width and the height as parameters each time. The `Rectangle` object knows its own width and height, so its `area()` needs no parameters at all.'
        ],
        fileName: 'AreaTwoWays.java',
        code: `public class AreaTwoWays {
    public static void main(String[] args) {
        System.out.println("static:   " + area(4, 3));

        Rectangle box = new Rectangle(4, 3);
        System.out.println("instance: " + box.area());
        box.width = 10;
        System.out.println("instance: " + box.area());
    }

    static int area(int width, int height) {   // all data comes in as parameters
        return width * height;
    }
}

class Rectangle {
    int width;
    int height;

    Rectangle(int width, int height) {
        this.width = width;
        this.height = height;
    }

    int area() {                                // the data is in the fields
        return width * height;
    }
}`,
        output: `static:   12
instance: 12
instance: 30`,
        table: {
          head: ['', '`static` method', 'Instance method'],
          rows: [
            ['Belongs to', 'The class', 'Each object'],
            ['Call it with', '`ClassName.name(...)` or `name(...)` in the same class', '`object.name(...)`'],
            ['Where its data comes from', 'Only parameters', 'Fields of the object + parameters'],
            ['Remembers between calls', 'No', 'Yes, in the fields']
          ]
        }
      },
      {
        title: 'Questions and commands',
        text: [
          'A clear habit: a method either **asks** (query) or **does** (command). A query returns an answer and leaves the object as it was. A command changes the object.',
          'Mixing both is allowed when it helps, like `spend` returning whether it worked. But a method called `total()` that secretly changes `coins` would surprise every reader.'
        ],
        table: {
          head: ['Kind', 'Changes fields?', 'Returns', 'Typical names'],
          rows: [
            ['Query', 'No', 'An answer (`int`, `boolean`, `String` …)', '`total()`, `isEmpty()`, `canBuy(p)`, `getName()`'],
            ['Command', 'Yes', 'Often `void`, sometimes `boolean` "did it work?"', '`add(x)`, `spend(p)`, `reset()`, `move(dx)`']
          ]
        },
        tip: 'Names help: queries often start with `is`, `has`, `can` or `get`; commands are verbs like `add`, `move`, `open`.'
      },
      {
        title: 'State that changes from call to call',
        text: [
          'Because fields survive between calls, an object can move from one state to the next. A traffic light has one field, `color`. Each call to `next()` moves it on.'
        ],
        mermaid: `stateDiagram-v2
  [*] --> RED
  RED --> GREEN: next()
  GREEN --> YELLOW: next()
  YELLOW --> RED: next()`,
        diagramNote: 'Each box is a value of the field `color`. Each arrow is one call to `next()`.',
        fileName: 'LightDemo.java',
        code: `public class LightDemo {
    public static void main(String[] args) {
        TrafficLight light = new TrafficLight();
        for (int i = 0; i < 4; i++) {
            System.out.println(light.color + " -> may I go? " + light.mayGo());
            light.next();
        }
    }
}

class TrafficLight {
    String color = "RED";

    void next() {
        color = switch (color) {
            case "RED" -> "GREEN";
            case "GREEN" -> "YELLOW";
            default -> "RED";
        };
    }

    boolean mayGo() {
        return color.equals("GREEN");
    }
}`,
        output: `RED -> may I go? false
GREEN -> may I go? true
YELLOW -> may I go? false
RED -> may I go? false`
      },
      {
        title: 'One method calls another',
        text: [
          'In the piggy bank, `spend` does not repeat the check; it asks `canBuy`. The diagram shows the calls for `bank.spend(6)` when 8 coins are inside.'
        ],
        mermaid: `sequenceDiagram
  participant M as main
  participant B as PiggyBank bank
  M->>B: spend(6)
  B->>B: canBuy(6)
  Note over B: coins = 8, 8 >= 6
  B-->>B: true
  Note over B: coins = 8 - 6 = 2
  B-->>M: true`,
        diagramNote: 'The arrow from `bank` to itself is a call to another method of the same object. Both run with the same `this`.'
      },
      {
        title: 'Methods that work with a second object',
        text: [
          'A method can take another object of the same class as a parameter. Inside it, the plain field names are "mine", and `other.field` is the other object’s field.'
        ],
        fileName: 'TransferDemo.java',
        code: `public class TransferDemo {
    public static void main(String[] args) {
        PiggyBank mine = new PiggyBank();
        PiggyBank sisters = new PiggyBank();
        mine.coins = 10;

        mine.giveTo(sisters, 4);
        System.out.println("mine: " + mine.coins + ", sister's: " + sisters.coins);
        System.out.println("I have more: " + mine.hasMoreThan(sisters));
    }
}

class PiggyBank {
    int coins;

    void giveTo(PiggyBank other, int amount) {
        if (amount <= coins) {
            coins = coins - amount;              // my coins
            other.coins = other.coins + amount;  // the other bank's coins
        }
    }

    boolean hasMoreThan(PiggyBank other) {
        return coins > other.coins;
    }
}`,
        output: `mine: 6, sister's: 4
I have more: true`,
        warn: 'In these first lessons, `main` still writes fields directly (`mine.coins = 10`). That lets callers break the rules, for example `mine.coins = -50`. The next lesson, "Encapsulation", closes that door.'
      }
    ],
    technical: [
      'An instance method call `bank.add(5)` compiles to: load the reference in `bank`, load `5`, then `invokevirtual PiggyBank.add`. The JVM makes a new stack frame with `this` (the bank) and `amount` (5) and runs the shared code of `add`.',
      '`coins = coins + amount;` becomes "load `this`, read its field `coins`, add `amount`, write the field of `this`". The field is on the heap inside the object, so the new value is still there after the frame is gone.',
      'Calling a method on a variable that holds `null` (`PiggyBank bank = null; bank.add(5);`) has no object to run on. The JVM stops with a `NullPointerException`; see the lesson "null and NullPointerException".'
    ],
    tryIt: {
      steps: [
        'Copy `PiggyBankDemo.java` and run it.',
        'Add a query `boolean isEmpty()` that returns `coins == 0`.',
        'Add a command `void smash()` that prints `"Out come " + coins + " coins!"` and sets `coins` to 0.',
        'At the end of `main`, call `bank.smash();` and print `bank.isEmpty()`.'
      ],
      see: '`Out come 2 coins!` and then `true`.'
    },
    check: [
      { q: 'What is the difference between `static int area(int w, int h)` and `int area()` in a `Rectangle` class?', a: 'The static one gets all data through parameters and belongs to the class. The instance method belongs to each rectangle and reads that object’s own `width` and `height` fields.' },
      { q: 'Is `boolean canBuy(int price)` a query or a command? And `void add(int amount)`?', a: '`canBuy` is a query: it only answers. `add` is a command: it changes the field `coins`.' },
      { q: 'Inside `spend`, why can you write `canBuy(price)` without an object and a dot?', a: 'Inside an instance method, a call without an object means "on this object": `canBuy(price)` is `this.canBuy(price)`.' }
    ],
    keyPoints: [
      'An instance method has no `static` and always runs on one object.',
      'It reads and changes that object’s fields; changes stay for the next call.',
      'Queries answer and change nothing; commands change the state.',
      'Inside the class, call your own methods without a dot: `canBuy(p)`.',
      'Keep the rules (like "never below zero") inside the methods of the class.'
    ],
    commonMistakes: [
      'Calling an instance method on the class: `PiggyBank.add(5)`. Make an object and call it on that: `bank.add(5)`.',
      'Passing the object’s own data as parameters: `bank.add(bank.coins, 5)`. The method already knows `coins`; write `bank.add(5)`.',
      'A query that changes the state, like a `total()` that also resets `coins`. Keep queries free of side effects.',
      'Forgetting to use the return value of a query: `bank.canBuy(6);` alone does nothing visible. Use it: `if (bank.canBuy(6)) { … }`.'
    ],
    related: ['The this Keyword', 'Encapsulation: private, Getters, Setters', 'Instance vs static', 'Methods']
  }]);
})();
