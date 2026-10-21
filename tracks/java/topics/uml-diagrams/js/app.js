// Topic-level practice, shown below the lessons.
Java.topics.umlDiagrams.tryIt = {
  steps: [
    'Pick a small idea: a pet shelter where people adopt pets. On paper, draw a class diagram with `Shelter`, `Pet` and `Person`. Give every box two fields and one method, with `+` or `-` in front.',
    'Draw the lines: the shelter has many pets (`Shelter "1" o-- "*" Pet`), a pet has `0..1` owner (`Pet "*" --> "0..1" Person`).',
    'Draw a state diagram for `Pet`: `WAITING --> ADOPTED : adopt` and `ADOPTED --> WAITING : bringBack`.',
    'Turn the drawings into one file `Shelter.java`: an enum for the states, a `List` for the pets, a field for the owner, and the methods `adopt` and `bringBack` that refuse moves without an arrow.',
    'In `main`, adopt one pet twice and print what happens. Then paste your class diagram as Mermaid text into [mermaid.live](https://mermaid.live) to check it.'
  ],
  see: 'the first adoption works and the second one is refused, and a Mermaid picture that matches your paper drawing box for box.'
};

Java.topics.umlDiagrams.check = [
  { q: 'What are the three parts of a class box, and what does `-` in front of a member mean?', a: 'Name on top, attributes (fields) in the middle, operations (methods) at the bottom. `-` means `private`.' },
  { q: 'Which line do you draw for `class Penguin extends Bird`, and which for `class Penguin implements Swimmer`?', a: 'A solid line with a hollow triangle at `Bird`; a dashed line with a hollow triangle at `Swimmer`.' },
  { q: 'A line says `Team "1" o-- "1..*" Player`. Which field does `Team` get, and which check?', a: 'A `List<Player>` (upper bound `*`), and a check that the list is never empty (lower bound 1). The hollow diamond says the players come from outside.' },
  { q: 'Which diagram shows messages between objects in time order, and what is an `alt` frame in Java?', a: 'A sequence diagram. An `alt` frame is an `if / else`.' },
  { q: 'An order can be NEW, PAID or SHIPPED. Which diagram fits, and how does it look in Java?', a: 'A state machine diagram. In Java: an enum with the three states, a field for the current state, and one method per event that refuses moves without an arrow.' }
];

(function () {
  Java.renderLessonTopic({ namespace: 'umlDiagrams' });
})();
