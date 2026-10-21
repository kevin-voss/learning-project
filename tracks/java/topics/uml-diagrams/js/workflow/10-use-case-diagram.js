// UML lesson 10: use case diagrams: actors, goals, system boundary, include and extend.
(function () {
  const U = Java.topics.umlDiagrams;

  U.lessons.push({
    id: 'use-case-diagram',
    num: '10',
    title: 'Use Case Diagram',
    category: 'workflow',
    icon: '☺',
    tagline: 'Who uses the system, and for what',
    realWorld: 'The sign at the entrance of a swimming pool: "Swimmers can buy a ticket, rent a locker, take a swimming lesson. Staff can clean the pool." It lists who comes and what each of them wants, not how the cash register works inside.',
    kid: [
      'Imagine an ice cream truck. Children come to buy ice cream. Parents come to pay. The driver comes to fill up the freezer.',
      'If you draw the truck as a big box, the people stand outside it. Inside the box you write what each person wants to do: "buy ice cream", "pay", "fill freezer". A line connects each person to their wish.',
      'That drawing does not show how the freezer works. It only shows who wants what. That is a use case diagram.'
    ],
    definition: 'A **use case diagram** shows the **actors** (people or other systems outside your program) and the **use cases**: the goals they reach with your system. A box, the **system boundary**, separates what is inside your system from who is outside.',
    explain: [
      'An **actor** is a **role**, not a person. Mia can be a "Rider" today and "Staff" tomorrow. Actors stand outside the system: a stick figure, labelled with the role. A **primary actor** starts a use case (the rider rents a bike). A **secondary actor** helps (a payment service that charges the card). Another program can be an actor too.',
      'A **use case** is an oval with one goal, named from the actor\'s point of view, as a verb plus a noun: "Rent a bike", "Return a bike". It is a whole goal the actor cares about, not a single click. A line connects an actor with each use case it takes part in.',
      'The **system boundary** is a rectangle with the name of the system. Everything inside is what you build. Drawing it forces the big early question: what is our job, and what is not?',
      'Two dashed arrows connect use cases. `«include»` means "always does this too": renting **always includes** paying. The arrow points from the base use case to the included one. `«extend»` means "sometimes adds this": returning a bike late **is extended by** paying a late fee. The arrow points from the extension to the base, and the condition ("bike is late") belongs to it.',
      'Use case diagrams contain no classes, no methods and no order of steps. They come first: from them you write use case descriptions, then activity or sequence diagrams for each goal, and only then classes. In code a use case often becomes one public method of a class that stands for the system.'
    ],
    why: 'Before anybody draws classes, the team must agree on what the system is for. A use case diagram is short enough to show to a customer or a teacher who does not read code, and it makes missing goals and missing user roles obvious.',
    whenUse: 'At the very start of a project, to agree on the scope; when you read a task sheet and want to list what the program must do; and to plan tests (each use case needs at least one). Not for the order of steps or for data; other diagrams do that.',
    syntax: 'On paper: stick figures outside a labelled rectangle, ovals inside, solid lines from actors to ovals, dashed arrows `«include»` (base → included) and `«extend»` (extension → base). Mermaid has no use case type, so this page uses `flowchart`: `U1(["Rent a bike"])` for ovals and `subgraph` for the boundary.',
    mermaid: `flowchart LR
  R["Rider (actor)"]
  ST["Staff (actor)"]
  subgraph SYS["Bike Rental system"]
    U1(["Rent a bike"])
    U2(["Return a bike"])
    U3(["Repair a bike"])
    U4(["Pay"])
    U5(["Pay late fee"])
  end
  PS["Payment Service (actor)"]
  R --- U1
  R --- U2
  ST --- U3
  U1 -. "«include»" .-> U4
  U5 -. "«extend»" .-> U2
  U4 --- PS`,
    visualLabel: 'A bike rental station',
    visualNote: 'Two primary actors on the left start use cases. The payment service on the right is a secondary actor. Renting always includes paying; paying a late fee extends returning, but only when the bike comes back late.',
    fileName: 'BikeRental.java',
    code: `public class BikeRental {
    private int freeBikes = 2;

    void rentBike(String rider) {                   // use case "Rent a bike"
        if (freeBikes == 0) {
            System.out.println(rider + ": sorry, no bike free");
            return;
        }
        freeBikes--;
        pay(rider, 3);                              // «include»: always
        System.out.println(rider + " rides away, free bikes: " + freeBikes);
    }

    void returnBike(String rider, int hoursLate) {  // use case "Return a bike"
        freeBikes++;
        if (hoursLate > 0) {
            payLateFee(rider, hoursLate);           // «extend»: only when late
        }
        System.out.println(rider + " returned a bike, free bikes: " + freeBikes);
    }

    void repairBike(String staff) {                 // use case "Repair a bike"
        System.out.println(staff + " repairs a bike");
    }

    private void pay(String rider, int euro) {      // included use case "Pay"
        System.out.println("  payment service charges " + rider + " " + euro + " euro");
    }

    private void payLateFee(String rider, int hours) {   // extending use case
        pay(rider, 2 * hours);
    }

    public static void main(String[] args) {
        BikeRental station = new BikeRental();
        station.rentBike("Mia");
        station.rentBike("Leo");
        station.rentBike("Ali");
        station.returnBike("Mia", 0);
        station.returnBike("Leo", 2);
        station.repairBike("Sam");
    }
}`,
    output: `  payment service charges Mia 3 euro
Mia rides away, free bikes: 1
  payment service charges Leo 3 euro
Leo rides away, free bikes: 0
Ali: sorry, no bike free
Mia returned a bike, free bikes: 1
  payment service charges Leo 4 euro
Leo returned a bike, free bikes: 2
Sam repairs a bike`,
    codeSummary: 'The class `BikeRental` stands for the whole system: each oval of the diagram is one method. The actors are the callers in `main`. «include» is a call that always happens, «extend» is a call inside an `if`.',
    codeExplanation: [
      { label: 'Line 4', code: 'void rentBike(String rider) {                   // use case "Rent a bike"', text: 'One use case, one method. The actor (`rider`) is a parameter here: an actor is whoever calls, not a field.' },
      { label: 'Line 6', code: 'System.out.println(rider + ": sorry, no bike free");', text: 'An alternative path of the use case: the goal cannot be reached. The diagram does not show this; a use case description or an activity diagram does.' },
      { label: 'Line 10', code: 'pay(rider, 3);                              // «include»: always', text: '«include»: every successful rental calls `pay`. No condition.' },
      { label: 'Line 16', code: 'if (hoursLate > 0) {', text: 'The condition of the «extend» relation ("bike is late"). Without it, returning works on its own.' },
      { label: 'Line 17', code: 'payLateFee(rider, hoursLate);           // «extend»: only when late', text: 'The extension is called only when the condition holds. Leo is 2 hours late and pays 4 euro.' },
      { label: 'Line 26', code: 'private void pay(String rider, int euro) {      // included use case "Pay"', text: 'Private: no actor starts "Pay" alone. It only runs as part of other use cases. The secondary actor (payment service) is represented by the printed line.' },
      { label: 'Line 35', code: 'BikeRental station = new BikeRental();', text: '`main` plays the actors. It calls the use cases in the order of a little story.' },
      { label: 'Line 41', code: 'station.repairBike("Sam");', text: 'The other primary actor, Staff, reaches its own goal.' }
    ],
    sections: [
      {
        title: 'Good and bad use case names',
        text: [
          'A use case is a goal the actor would tell a friend about: "I rented a bike". Nobody says "I clicked the OK button" or "I inserted a row into the database". Name use cases as **verb + noun**, from the actor\'s view, and as a whole goal.'
        ],
        table: {
          head: ['Bad name', 'Why it is bad', 'Better name'],
          rows: [
            ['Click "Rent"', 'a single click, not a goal', 'Rent a bike'],
            ['Database update', 'inside the system, the actor does not care', '(not a use case)'],
            ['Bike', 'a thing, not a goal', 'Return a bike'],
            ['Login', 'only a step towards a real goal', 'often included: «include» Log in'],
            ['Manage bikes', 'too vague: which goals exactly?', 'Add a bike, Repair a bike, Remove a bike']
          ]
        }
      },
      {
        title: 'include and extend: always or sometimes',
        text: [
          'Both arrows are dashed and point between two use cases, but in opposite directions. Remember: **include** points to the part that is always included. **Extend** points to the use case that gets extended, from the optional extra.'
        ],
        table: {
          head: ['', '«include»', '«extend»'],
          rows: [
            ['means', 'the base always does it too', 'the extra happens only sometimes'],
            ['arrow', 'from base to included', 'from extension to base'],
            ['example', '"Rent a bike" → "Pay"', '"Pay late fee" → "Return a bike"'],
            ['condition', 'none', 'yes: "bike returned late"'],
            ['Java', 'a call without `if`', 'a call inside an `if`']
          ],
          note: 'Use them rarely. A diagram full of include and extend arrows is usually too detailed. When unsure, leave them out.'
        }
      },
      {
        title: 'Behind each oval: the use case description',
        text: [
          'The oval only names the goal. The steps are written in a short text, the **use case description**. Its main flow later becomes a sequence or activity diagram, and its alternative flows become the `alt` frames or the `else` paths.'
        ],
        table: {
          head: ['Field', 'Rent a bike'],
          rows: [
            ['Primary actor', 'Rider'],
            ['Precondition', 'the rider has an account'],
            ['Main flow', '1. Rider chooses a station. 2. System finds a free bike. 3. System charges 3 euro (include Pay). 4. System unlocks the bike.'],
            ['Alternative flow', '2a. No bike is free: the system says sorry, the use case ends.'],
            ['Result', 'the rider rides a bike, the station has one bike less']
          ],
          note: 'Compare it with `rentBike` in the code: step 2a is the `if (freeBikes == 0)` block.'
        }
      },
      {
        title: 'From the use case diagram to code',
        text: [
          'The use case diagram is the first link in a chain. Each later diagram adds detail, until the code is the last step.'
        ],
        mermaid: `flowchart LR
  A["Use case diagram: who wants what"] --> B["Use case description: the steps"]
  B --> C["Activity or sequence diagram: the flow"]
  C --> D["Class diagram: the parts"]
  D --> E["Java code"]
  E --> F["Tests: one per use case"]`,
        bullets: [
          'The **system boundary** becomes the public methods of the class (or classes) that stand for the system.',
          'Each **use case** is usually one public method.',
          'An **included** use case is a helper method called every time; an **extending** one is called inside an `if`.',
          'An **actor** is a caller: `main`, a user interface, or another program. It is often not a class in your code at all.'
        ],
        tip: 'Every use case is also a test: "rent a bike when one is free" and "rent a bike when none is free". The [testing](../testing/index.html) topic shows how to write such tests with JUnit.'
      }
    ],
    technical: [
      'The Java compiler never sees a use case diagram. Its value is in the project, not in the program: it is a list of requirements (what the program must be able to do) drawn as a picture. Many teams number the use cases and refer to the numbers in task tickets, tests and commit messages.',
      'The system boundary has a code counterpart: the **public API**, the set of public methods other code may call. Anything inside the boundary but not a use case (like `pay` above) is usually `private` or hidden behind an interface.',
      'Mermaid has no use case diagram type. This page draws use cases as stadium-shaped nodes `([ ])` inside a `subgraph`. In PlantUML you would write `actor Rider`, `usecase "Rent a bike"` and `rectangle "Bike Rental" { … }`, which draws real stick figures and ovals.'
    ],
    tryIt: {
      steps: [
        'Add a new actor "Manager" with the use case "See daily report".',
        'Draw it on paper: where is the actor, where is the oval, where is the line?',
        'Add a method `void dailyReport(String manager)` to `BikeRental.java` that prints how many bikes are free, and call it at the end of `main`.',
        'Run `java BikeRental.java`.'
      ],
      see: 'a new last line such as `Report for Kim: 2 free bikes`, and a third actor on your drawing.'
    },
    check: [
      { q: 'Is "Press the OK button" a good use case? Why?', a: 'No. It is a single step, not a goal. A use case is a whole goal like "Rent a bike".' },
      { q: 'Renting a bike always requires paying. Which relation, and which way does the arrow point?', a: '«include», from "Rent a bike" to "Pay".' },
      { q: 'Is an actor always a person?', a: 'No. An actor is a role outside the system; it can be another system, such as a payment service.' }
    ],
    keyPoints: [
      'Actors are roles outside the system; use cases are their goals inside it.',
      'The system boundary shows what you build and what you do not.',
      'Name use cases verb + noun, as whole goals.',
      '«include» = always (base → included); «extend» = sometimes (extension → base).',
      'In code: often one public method per use case; actors are the callers.'
    ],
    commonMistakes: [
      'Drawing classes or database tables as actors. Fix: actors are outside the system; classes are inside.',
      'Naming use cases after screens or clicks. Fix: name the goal, "Return a bike".',
      'Turning the arrows of include and extend around. Fix: include points to the included part, extend points to the base.',
      'Trying to show the order of steps with lines between ovals. Fix: use a description, an activity or a sequence diagram for the order.'
    ],
    related: ['Activity Diagram', 'Sequence Diagram', 'Reading a Diagram into Code', 'Testing'],
    glossary: U.glossary
  });
})();
