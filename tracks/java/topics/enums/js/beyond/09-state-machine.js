// Enums, lesson 9: a state machine with an enum (traffic light, parcel).
(function () {
  Java.addCoreLessons('enums', [
    {
      id: 'enum-state-machine',
      title: 'A State Machine: the Traffic Light',
      category: 'practice',
      icon: '◉',
      tagline: 'One state at a time, clear rules for the next',
      realWorld: 'A traffic light. It is always in exactly one state: red, green or yellow. It never jumps from green straight to red without yellow in between, and it never shows two colours at once.',
      kid: [
        'A traffic light shows one colour at a time. That colour is its **state**: how it is right now.',
        'After a while it changes to the next colour, always in the same order: red, then green, then yellow, then red again.',
        'A program can work the same way. It is in one state, and there are rules that say which state comes next. Java enums are perfect for writing those states down.'
      ],
      definition: 'A **state machine** is a thing that is always in exactly one of a fixed list of **states** and moves from one state to another by fixed rules, called **transitions**. An enum holds the states; a method like `next()` holds the rules.',
      explain: [
        'Many things in programs have a life story with clear steps: a traffic light, a parcel (created, picked up, delivered), an order (new, paid, shipped), a game character (standing, running, jumping). At any moment the thing is in exactly one **state**.',
        'A **transition** is a move from one state to another: RED → GREEN. Often a transition is triggered by an **event**, something that happens: a timer runs out, a button is pressed, the courier scans the parcel.',
        'An enum is the natural type for the state, because the list of states is fixed and known. A single variable `TrafficLight light` can only be in one state at a time. Compare that with three `boolean` variables `isRed`, `isGreen`, `isYellow`: nothing stops two of them from being `true` together.',
        'The rules go into the enum too. A method `next()` with a `switch (this)` returns the following state. Because it is a switch expression, the compiler checks that every state has a rule. Data per state, like how long it lasts, goes into a field.',
        'For things with choices, not only one fixed next step, the enum can list the **allowed** next states. A method then refuses every other move with an exception, so the program can never reach a state that makes no sense, like “delivered” before “picked up”.'
      ],
      why: 'The states and the rules are written down in one place, checked by the compiler, and impossible states cannot happen.',
      whenUse: 'Whenever something moves through a fixed set of steps: lights, orders, parcels, games, menus, connections.',
      syntax: '`enum State { A, B, C; State next() { return switch (this) { case A -> B; case B -> C; case C -> A; }; } }`',
      fileName: 'Crossing.java',
      code: `enum TrafficLight {
    RED(30), GREEN(25), YELLOW(5);

    private final int seconds;

    TrafficLight(int seconds) {
        this.seconds = seconds;
    }

    int seconds() {
        return seconds;
    }

    TrafficLight next() {
        return switch (this) {
            case RED -> GREEN;
            case GREEN -> YELLOW;
            case YELLOW -> RED;
        };
    }
}

public class Crossing {
    public static void main(String[] args) {
        TrafficLight light = TrafficLight.RED;
        int clock = 0;
        for (int step = 0; step < 5; step++) {
            System.out.println("at " + clock + "s: " + light + " for " + light.seconds() + "s");
            clock += light.seconds();
            light = light.next();
        }
    }
}`,
      output: `at 0s: RED for 30s
at 30s: GREEN for 25s
at 55s: YELLOW for 5s
at 60s: RED for 30s
at 90s: GREEN for 25s`,
      codeSummary: 'Three states with a duration each, and one `next()` rule. The loop plays five steps of the traffic light.',
      codeExplanation: [
        { label: 'Line 2', code: 'RED(30), GREEN(25), YELLOW(5);', text: 'The three states. Each one carries how many seconds it lasts.' },
        { label: 'Line 14', code: 'TrafficLight next() {', text: 'The transition rule. It is called on the current state and returns the next one.' },
        { label: 'Line 15', code: 'return switch (this) {', text: '`this` is the state the method is called on, for example `RED`.' },
        { label: 'Line 16', code: 'case RED -> GREEN;', text: 'One transition: after RED comes GREEN. Inside the enum you can write `GREEN` without `TrafficLight.`.' },
        { label: 'Line 25', code: 'TrafficLight light = TrafficLight.RED;', text: 'The current state. One variable, so the light is always in exactly one state.' },
        { label: 'Line 29', code: 'clock += light.seconds();', text: 'Time moves forward by the length of the current state.' },
        { label: 'Line 30', code: 'light = light.next();', text: 'The transition: the variable now holds the next state.' }
      ],
      sections: [
        {
          title: 'The picture: a state diagram',
          text: [
            'A **state diagram** draws each state as a box and each transition as an arrow. The text on an arrow says what triggers it. The black dot `[*]` marks where the machine starts.'
          ],
          mermaid: `stateDiagram-v2
  [*] --> RED
  RED --> GREEN : after 30 s
  GREEN --> YELLOW : after 25 s
  YELLOW --> RED : after 5 s`,
          diagramNote: 'Every state has exactly one arrow going out, so `next()` needs no parameter. The diagram and the `switch` in `next()` say the same thing.'
        },
        {
          title: 'Why not three booleans?',
          text: [
            'Before enums, a programmer might store the light in three `boolean` variables. The program below has a bug in one line, and the light ends up red and green at once. With one enum variable that state cannot exist.'
          ],
          fileName: 'BooleanLight.java',
          code: `public class BooleanLight {
    public static void main(String[] args) {
        boolean isRed = true;
        boolean isGreen = false;
        boolean isYellow = false;

        // switch to green, but someone forgot to turn red off
        isGreen = true;

        System.out.println("red: " + isRed + ", green: " + isGreen + ", yellow: " + isYellow);
        if (isRed && isGreen) {
            System.out.println("Impossible state: red and green together!");
        }
    }
}`,
          output: `red: true, green: true, yellow: false
Impossible state: red and green together!`,
          tip: 'Three booleans have 2 × 2 × 2 = 8 combinations, but only 3 of them are real states. An enum with three constants has exactly the 3 real ones.'
        },
        {
          title: 'States with choices: the parcel',
          text: [
            'A parcel has more than one possible next step. When nobody is home, it goes back to the depot. Here each state lists its **allowed** next states in an `EnumSet` (see the previous lesson). `moveTo` checks the rule and throws an `IllegalStateException` for any other move.'
          ],
          mermaid: `stateDiagram-v2
  [*] --> CREATED
  CREATED --> PICKED_UP : courier scans
  PICKED_UP --> IN_DEPOT : unloaded
  IN_DEPOT --> OUT_FOR_DELIVERY : loaded in van
  OUT_FOR_DELIVERY --> DELIVERED : signed
  OUT_FOR_DELIVERY --> IN_DEPOT : nobody home
  DELIVERED --> [*]`,
          diagramNote: '`OUT_FOR_DELIVERY` has two arrows going out. `DELIVERED` has none: it is a **final state**, the end of the story.'
        },
        {
          title: 'The parcel in code',
          text: [
            'The rules live in the enum (`allowedNext`), the current state lives in the `Parcel` object. Every move goes through `moveTo`, so the rules are checked every time.'
          ],
          fileName: 'ParcelTracking.java',
          code: `import java.util.EnumSet;
import java.util.Set;

enum Status {
    CREATED, PICKED_UP, IN_DEPOT, OUT_FOR_DELIVERY, DELIVERED;

    Set<Status> allowedNext() {
        return switch (this) {
            case CREATED -> EnumSet.of(PICKED_UP);
            case PICKED_UP -> EnumSet.of(IN_DEPOT);
            case IN_DEPOT -> EnumSet.of(OUT_FOR_DELIVERY);
            case OUT_FOR_DELIVERY -> EnumSet.of(DELIVERED, IN_DEPOT);
            case DELIVERED -> EnumSet.noneOf(Status.class);
        };
    }
}

class Parcel {
    private Status status = Status.CREATED;

    void moveTo(Status target) {
        if (!status.allowedNext().contains(target)) {
            throw new IllegalStateException(status + " -> " + target + " is not allowed");
        }
        System.out.println(status + " -> " + target);
        status = target;
    }
}

public class ParcelTracking {
    public static void main(String[] args) {
        Parcel parcel = new Parcel();
        parcel.moveTo(Status.PICKED_UP);
        parcel.moveTo(Status.IN_DEPOT);
        parcel.moveTo(Status.OUT_FOR_DELIVERY);
        parcel.moveTo(Status.IN_DEPOT);           // nobody home
        parcel.moveTo(Status.OUT_FOR_DELIVERY);
        parcel.moveTo(Status.DELIVERED);
        try {
            parcel.moveTo(Status.PICKED_UP);
        } catch (IllegalStateException e) {
            System.out.println("Refused: " + e.getMessage());
        }
    }
}`,
          output: `CREATED -> PICKED_UP
PICKED_UP -> IN_DEPOT
IN_DEPOT -> OUT_FOR_DELIVERY
OUT_FOR_DELIVERY -> IN_DEPOT
IN_DEPOT -> OUT_FOR_DELIVERY
OUT_FOR_DELIVERY -> DELIVERED
Refused: DELIVERED -> PICKED_UP is not allowed`,
          warn: 'Keep `status` private and change it only in `moveTo`. If other code could write `parcel.status = Status.DELIVERED`, it could skip the rules.'
        },
        {
          title: 'The rules as a table',
          text: ['A **transition table** is a third way to write the same rules, handy for checking them with a teammate. Each row is a state, the last column its allowed next states.'],
          table: {
            head: ['State', 'Event', 'Allowed next states'],
            rows: [
              ['`CREATED`', 'courier scans', '`PICKED_UP`'],
              ['`PICKED_UP`', 'unloaded', '`IN_DEPOT`'],
              ['`IN_DEPOT`', 'loaded in van', '`OUT_FOR_DELIVERY`'],
              ['`OUT_FOR_DELIVERY`', 'signed / nobody home', '`DELIVERED`, `IN_DEPOT`'],
              ['`DELIVERED`', '—', 'none (final state)']
            ],
            note: 'Diagram, table and `allowedNext()` must always agree. When you add a state, update all three.'
          }
        }
      ],
      technical: [
        '`next()` and `allowedNext()` are instance methods of the enum. When you call `light.next()`, `this` is the constant in `light`, and the switch picks its branch by the ordinal of `this` (see the switch lesson).',
        'The constants `GREEN` or `PICKED_UP` inside the enum’s own methods are the `static final` fields of the enum class. Inside the enum you may leave out the type name, like with any static field in its own class.',
        '`allowedNext()` creates a new small `EnumSet` on every call. That is cheap: an `EnumSet` of this enum is one object with one `long` inside. If it ever matters, you can build the sets once and keep them in an `EnumMap<Status, Set<Status>>`.',
        'The current state is only a reference to one of the constant objects. Changing state means pointing the variable at another constant; no object is created or destroyed.'
      ],
      tryIt: {
        steps: [
          'Copy `Crossing.java` and run it.',
          'Add a state `RED_YELLOW(2)` (red and yellow together, as in some countries before green).',
          'Change `next()` so that RED → RED_YELLOW → GREEN. Compile before you change the switch, then after.',
          'Run it with 6 steps.'
        ],
        see: 'Before you update the switch: `the switch expression does not cover all possible input values`. After: `RED`, `RED_YELLOW`, `GREEN`, `YELLOW`, `RED`, `RED_YELLOW`.'
      },
      check: [
        { q: 'What is a state, and what is a transition?', a: 'A state is how the thing is right now (RED). A transition is a move from one state to another (RED → GREEN), often triggered by an event.' },
        { q: 'Why is one enum variable better than three booleans for a traffic light?', a: 'Three booleans allow 8 combinations, including impossible ones like red and green together. One enum variable can only hold one of the three real states.' },
        { q: 'What does `DELIVERED --> [*]` mean in the state diagram?', a: 'DELIVERED is a final state: the story ends there and no transition leaves it.' }
      ],
      keyPoints: [
        'A state machine is always in exactly one state.',
        'An enum lists the states; methods like `next()` hold the transitions.',
        'A switch expression in `next()` makes the compiler check every state.',
        'For choices, list the allowed next states and refuse every other move.',
        'Draw it as a `stateDiagram-v2`; keep diagram and code in sync.'
      ],
      commonMistakes: [
        '`boolean isRed, isGreen, isYellow;` for one light. Impossible combinations can happen. Use one enum variable.',
        '`parcel.status = Status.DELIVERED;` from outside. It skips the rules. Make the field private and change it only in one method that checks the transition.',
        'Adding `default -> RED;` to `next()`. A new state then silently jumps to RED. Leave out `default` so the compiler shows the missing rule.',
        'Writing the order of states only as ordinals (`values()[ordinal() + 1]`). It breaks when someone reorders the constants. Write each transition explicitly.'
      ],
      related: ['Control Flow', 'Exceptions', 'Collections']
    }
  ]);
})();
