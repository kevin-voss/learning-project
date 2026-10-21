// UML lesson 8: state machine diagrams, mapped to an enum and checked transitions.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'state-diagram',
    num: '08',
    title: 'State Machine Diagram',
    category: 'behavior',
    icon: '◎',
    tagline: 'The states of one object and the moves between them',
    realWorld: 'A traffic light. It is always in exactly one state: red, green or yellow. It never jumps from green straight to red without yellow in between. The rules for the moves are fixed.',
    kid: [
      'You are asleep, then you are awake, then you are at school, then you are at home, then asleep again. You are always in exactly one of these. You cannot be asleep and at school at the same time (well, almost never).',
      'Something must happen to move you from one to the next: the alarm clock rings, the school bell rings. Those are events.',
      'A state machine diagram draws each state as a rounded box and each move as an arrow. On the arrow it writes what has to happen. If there is no arrow, that move is not allowed.'
    ],
    definition: 'A **state machine diagram** (often called a state diagram) shows the **states** one object can be in and the **transitions** between them. Each transition is triggered by an **event** and may have a **guard** (a condition) and an **action**. In Java the states usually become an `enum`.',
    explain: [
      'A **state** is a situation that lasts for a while: an order is `NEW`, `PAID`, `SHIPPED`. It is drawn as a rounded box. At any moment the object is in exactly one state.',
      'A **transition** is an arrow from one state to another. Its label has up to three parts: `event [guard] / action`. The **event** is what happens (`pay`), the **guard** is a condition that must be true (`[amount >= total]`), and the **action** is what the object does while it moves (`/ send mail`). Usually you only need the event.',
      'A filled black dot is the **initial state**: where every new object starts. A dot with a ring around it is the **final state**: after it, nothing more can happen. Mermaid writes both as `[*]`. An arrow from a state back to itself is a **self-transition**: something happens, but the state stays the same.',
      'The most important rule is the one you cannot see: **no arrow means not allowed**. There is no arrow from `SHIPPED` to `CANCELLED`, so a shipped order cannot be cancelled, and the code must refuse it.',
      'In Java you store the current state in one field whose type is an `enum` (see [enums](../enums/index.html)). Each event becomes a method. The method checks the current state, and either changes it or refuses.'
    ],
    why: 'Lifecycle rules hide in many `if` statements spread over the code. A state diagram shows all of them on one page, so you can spot a missing or forbidden move before a customer finds it.',
    whenUse: 'For objects with a lifecycle: orders, tickets, accounts, game characters, traffic lights, downloads, doors. Not for objects that only hold data and never change their "mode".',
    syntax: 'Mermaid `stateDiagram-v2`: `[*] --> NEW` (start), `NEW --> PAID : pay` (transition with event), `A --> B : event [guard] / action`, `DELIVERED --> [*]` (end). In Java: `enum State { … }`, a field `private State state = State.NEW;`, one method per event.',
    mermaid: `stateDiagram-v2
  [*] --> NEW
  NEW --> PAID : pay
  PAID --> SHIPPED : ship
  SHIPPED --> DELIVERED : deliver
  NEW --> CANCELLED : cancel
  PAID --> CANCELLED : cancel
  DELIVERED --> [*]
  CANCELLED --> [*]`,
    visualLabel: 'The life of an order',
    visualNote: 'Five states, six transitions. `cancel` has two arrows (from `NEW` and from `PAID`) and none from `SHIPPED`. The code below refuses every move that has no arrow.',
    fileName: 'OrderLifecycle.java',
    code: `public class OrderLifecycle {
    public static void main(String[] args) {
        Order order = new Order();
        order.pay();
        order.ship();
        order.cancel();
        order.deliver();
        Order second = new Order();
        second.cancel();
        second.pay();
    }
}

enum OrderState { NEW, PAID, SHIPPED, DELIVERED, CANCELLED }

class Order {
    private OrderState state = OrderState.NEW;

    void pay()     { move(OrderState.NEW, OrderState.PAID, "pay"); }
    void ship()    { move(OrderState.PAID, OrderState.SHIPPED, "ship"); }
    void deliver() { move(OrderState.SHIPPED, OrderState.DELIVERED, "deliver"); }

    void cancel() {
        if (state == OrderState.NEW || state == OrderState.PAID) {
            change(OrderState.CANCELLED, "cancel");
        } else {
            refuse("cancel");
        }
    }

    private void move(OrderState from, OrderState to, String event) {
        if (state == from) change(to, event);
        else refuse(event);
    }

    private void change(OrderState to, String event) {
        System.out.println(event + ": " + state + " -> " + to);
        state = to;
    }

    private void refuse(String event) {
        System.out.println(event + ": not allowed in state " + state);
    }
}`,
    output: `pay: NEW -> PAID
ship: PAID -> SHIPPED
cancel: not allowed in state SHIPPED
deliver: SHIPPED -> DELIVERED
cancel: NEW -> CANCELLED
pay: not allowed in state CANCELLED`,
    codeSummary: 'The enum holds the five states, the field holds the current one, and each event is a method. Every arrow of the diagram is one allowed `from → to` pair; everything else is refused.',
    codeExplanation: [
      { label: 'Line 14', code: 'enum OrderState { NEW, PAID, SHIPPED, DELIVERED, CANCELLED }', text: 'One enum constant per rounded box. An enum is the natural type: an order can only ever be one of these five values.' },
      { label: 'Line 17', code: 'private OrderState state = OrderState.NEW;', text: 'The initial state: the arrow from the black dot `[*] --> NEW`. Every new order starts here.' },
      { label: 'Line 19', code: 'void pay()     { move(OrderState.NEW, OrderState.PAID, "pay"); }', text: 'The event `pay` is a method. The arrow `NEW --> PAID : pay` becomes "if the state is NEW, go to PAID".' },
      { label: 'Line 24', code: 'if (state == OrderState.NEW || state == OrderState.PAID) {', text: '`cancel` has two arrows in the diagram, so the method allows two starting states.' },
      { label: 'Line 27', code: 'refuse("cancel");', text: 'No arrow from `SHIPPED` or `DELIVERED` with `cancel`: the code refuses. That is where the third output line comes from.' },
      { label: 'Line 32', code: 'if (state == from) change(to, event);', text: 'A shared helper for events with exactly one arrow. It keeps the methods short and the rules easy to compare with the picture.' },
      { label: 'Line 38', code: 'state = to;', text: 'The only place where the state changes. One place means one place to log, test or debug every transition.' },
      { label: 'Line 6', code: 'order.cancel();', text: 'Tries a move that has no arrow. The order stays `SHIPPED`, so `deliver()` on the next line still works.' }
    ],
    sections: [
      {
        title: 'The parts of a state machine diagram',
        text: ['These are all the symbols you need for most state diagrams.'],
        table: {
          head: ['Part', 'How it looks', 'Mermaid', 'Java'],
          rows: [
            ['initial state', 'filled black dot', '`[*] --> NEW`', 'start value of the state field'],
            ['state', 'rounded box with a name', '`NEW`', 'one enum constant'],
            ['transition', 'arrow between two states', '`NEW --> PAID : pay`', 'a check plus `state = PAID`'],
            ['event', 'first word on the arrow', '`pay`', 'a method name, or a constant of an `Event` enum'],
            ['guard', '`[condition]` on the arrow', '`: pay [amount >= total]`', 'an extra `if` condition'],
            ['action', '`/ action` on the arrow', '`: pay / sendReceipt()`', 'a statement that runs during the move'],
            ['self-transition', 'arrow back to the same state', '`PAID --> PAID : remind`', 'do something, keep the state'],
            ['final state', 'dot inside a ring', '`DELIVERED --> [*]`', 'a state with no way out']
          ]
        }
      },
      {
        title: 'A traffic light: a state machine that loops',
        text: [
          'A traffic light has no final state: it goes round and round. It has one event, `next`, and every state has exactly one arrow for it.',
          'With one event, the whole diagram fits into one `switch` expression inside the enum: each `case` is one arrow.'
        ],
        mermaid: `stateDiagram-v2
  [*] --> RED
  RED --> GREEN : next
  GREEN --> YELLOW : next
  YELLOW --> RED : next`,
        fileName: 'TrafficLight.java',
        code: `public class TrafficLight {
    public static void main(String[] args) {
        Light light = Light.RED;
        for (int step = 1; step <= 4; step++) {
            Light after = light.next();
            System.out.println("step " + step + ": " + light + " -> " + after);
            light = after;
        }
    }
}

enum Light {
    RED, GREEN, YELLOW;

    Light next() {
        return switch (this) {
            case RED -> GREEN;      // RED --> GREEN : next
            case GREEN -> YELLOW;   // GREEN --> YELLOW : next
            case YELLOW -> RED;     // YELLOW --> RED : next
        };
    }
}`,
        output: `step 1: RED -> GREEN
step 2: GREEN -> YELLOW
step 3: YELLOW -> RED
step 4: RED -> GREEN`,
        tip: 'The `switch` expression has no `default`. If you add a new state such as `BLINKING` and forget its arrow, the compiler stops with an error. The diagram and the code cannot drift apart silently.'
      },
      {
        title: 'Guards and actions: a door with a code lock',
        text: [
          'One event can lead to different states, depending on a guard. Typing a code into a door lock is the event `enterCode`. With the right code the door opens; with a wrong code it stays locked (a self-transition with the action "count a try"); after three wrong tries it blocks.',
          'Each guard becomes a condition, each action a statement inside the method.'
        ],
        mermaid: `stateDiagram-v2
  [*] --> LOCKED
  LOCKED --> OPEN : enterCode [right code] / beep
  LOCKED --> LOCKED : enterCode [wrong, tries < 3] / tries++
  LOCKED --> BLOCKED : enterCode [wrong, third try] / tries++
  OPEN --> LOCKED : close
  BLOCKED --> [*]`,
        fileName: 'DoorLock.java',
        code: `public class DoorLock {
    enum State { LOCKED, OPEN, BLOCKED }

    private State state = State.LOCKED;
    private int tries = 0;

    void enterCode(int code) {
        if (state != State.LOCKED) {
            System.out.println("enterCode ignored, door is " + state);
        } else if (code == 1234) {          // guard [right code]
            System.out.println("beep");     // action / beep
            state = State.OPEN;
        } else {
            tries++;                        // action / tries++
            state = (tries == 3) ? State.BLOCKED : State.LOCKED;
            System.out.println("wrong code, try " + tries + ", door is " + state);
        }
    }

    public static void main(String[] args) {
        DoorLock door = new DoorLock();
        door.enterCode(1111);
        door.enterCode(1234);
        System.out.println("door is " + door.state);
        DoorLock other = new DoorLock();
        other.enterCode(1);
        other.enterCode(2);
        other.enterCode(3);
        other.enterCode(1234);
    }
}`,
        output: `wrong code, try 1, door is LOCKED
beep
door is OPEN
wrong code, try 1, door is LOCKED
wrong code, try 2, door is LOCKED
wrong code, try 3, door is BLOCKED
enterCode ignored, door is BLOCKED`,
        diagramNote: 'Three arrows leave `LOCKED` with the same event. Their guards decide which one is taken, exactly like the `if / else if / else` in `enterCode`.'
      },
      {
        title: 'Wrong vs right: flags instead of one state',
        text: [
          '**Wrong:** three booleans `isPaid`, `isShipped`, `isCancelled`. They allow 8 combinations, and some are nonsense: paid, shipped **and** cancelled at once. Every method has to guard against them.',
          '**Right:** one field of an enum type. It can hold exactly one state at a time, so impossible combinations cannot exist. The diagram then reads straight into code.'
        ],
        table: {
          head: ['In the diagram', 'In Java'],
          rows: [
            ['each state', 'one enum constant'],
            ['the initial state', 'the start value of the field'],
            ['each event', 'one method (or one constant of an `Event` enum)'],
            ['each transition', 'a check of the current state plus `state = NEW_STATE;`'],
            ['each guard', 'an extra condition in the `if`'],
            ['each action', 'a statement during the change'],
            ['a missing arrow', 'refuse: print an error or `throw new IllegalStateException(...)`']
          ],
          note: '`IllegalStateException` is the Java exception made for exactly this: "this call is not allowed in the current state".'
        }
      },
      {
        title: 'States inside a state',
        text: [
          'Big state machines group states. A music player is `OFF` or `ON`, and while it is `ON` it is either `PLAYING` or `PAUSED`. The box `ON` is a **composite state**: it contains its own small state machine with its own start dot.',
          'In code this is often an outer enum plus an inner one, or one enum with the inner states only. Use composite states when one event (here `powerOff`) leaves every inner state the same way.'
        ],
        mermaid: `stateDiagram-v2
  [*] --> OFF
  OFF --> ON : powerOn
  ON --> OFF : powerOff
  state ON {
    [*] --> PAUSED
    PAUSED --> PLAYING : play
    PLAYING --> PAUSED : pause
  }`
      }
    ],
    technical: [
      'Each enum constant is one object, created once when the JVM loads the enum class. The field `state` holds a reference to one of those objects. Changing the state does not create anything new; it only points the field at another constant. Comparing with `==` is therefore safe and fast.',
      'A `switch` on an enum is compiled into a jump table that uses the constant\'s position number (its **ordinal**). That makes a state machine with dozens of states as fast as one with three.',
      'When each state needs a lot of its own behavior, the **State pattern** gives every state its own class with the event methods. That is the same diagram, turned into classes instead of `switch` cases; see [design patterns](../design-patterns/index.html).'
    ],
    tryIt: {
      steps: [
        'Add a state `RETURNED` to the order diagram with the transition `DELIVERED --> RETURNED : giveBack`.',
        'Add `RETURNED` to the enum and write `void giveBack() { move(OrderState.DELIVERED, OrderState.RETURNED, "giveBack"); }`.',
        'In `main`, call `order.giveBack();` after `deliver()` and `second.giveBack();` at the end.',
        'Run `java OrderLifecycle.java`.'
      ],
      see: '`giveBack: DELIVERED -> RETURNED` for the first order and `giveBack: not allowed in state CANCELLED` for the second.'
    },
    check: [
      { q: 'What does it mean when there is no arrow from `SHIPPED` with the event `cancel`?', a: 'A shipped order cannot be cancelled. The code must refuse the call.' },
      { q: 'Read the label `enterCode [tries == 3] / alarm()`.', a: 'Event `enterCode`, guard: only when `tries == 3`, action: call `alarm()` during the move.' },
      { q: 'Why is one enum field better than several boolean flags?', a: 'The enum can hold only one state at a time, so impossible combinations such as "paid and cancelled" cannot happen.' }
    ],
    keyPoints: [
      'A state is a lasting situation; a transition is an arrow caused by an event.',
      'Labels read `event [guard] / action`.',
      '`[*]` marks start and end. No arrow means not allowed.',
      'In Java: an enum for the states, a field for the current state, a method per event.',
      'The code refuses every move that has no arrow.'
    ],
    commonMistakes: [
      'Naming states like actions: `PAY`, `SHIP`. Fix: states are situations, `PAID`, `SHIPPED`; events are verbs, `pay`, `ship`.',
      'Changing `state` in many places. Fix: change it in one method such as `change(...)`.',
      'Forgetting to refuse forbidden moves, so `cancel()` on a shipped order silently works. Fix: check the current state and refuse or `throw new IllegalStateException(...)`.',
      'Using booleans `isPaid`, `isShipped` instead of one state. Fix: one enum field.'
    ],
    related: ['Enums', 'Activity Diagram', 'Sequence Fragments', 'Design Patterns'],
    glossary: U.glossary
  });
})();
