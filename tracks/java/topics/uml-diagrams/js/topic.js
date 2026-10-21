// UML Diagrams: shared glossary and the empty lesson list.
// Every lesson file in structure/, behavior/ and workflow/ pushes one lesson onto
// Java.topics.umlDiagrams.lessons, in page order.
Java.topics.umlDiagrams = Java.topics.umlDiagrams || {};

Java.topics.umlDiagrams.glossary = [
  { term: 'UML', definition: 'Unified Modeling Language: one standard set of picture types for software, so every developer reads the same symbols the same way.' },
  { term: 'Mermaid', definition: 'A JavaScript tool that turns short diagram text into a picture. This page uses it to draw every diagram.' },
  { term: 'PlantUML', definition: 'Another text-to-diagram tool, popular in Java projects. Its text starts with @startuml.' },
  { term: 'class diagram', definition: 'A diagram of classes with their fields, methods and relationships. It shows what exists, not what happens.' },
  { term: 'compartment', definition: 'One of the three parts of a class box: name, attributes (fields), operations (methods).' },
  { term: 'attribute', definition: 'UML word for a field: data an object stores.' },
  { term: 'operation', definition: 'UML word for a method: something an object can do.' },
  { term: 'visibility', definition: 'Who may use a member: + public, - private, # protected, ~ package-private.' },
  { term: 'stereotype', definition: 'A label in double angle brackets, such as <<interface>>, that gives a box a special kind.' },
  { term: 'association', definition: 'A "knows a" relationship: one class keeps a reference to another one in a field.' },
  { term: 'dependency', definition: 'A "uses a" relationship for a short time: a parameter, a local variable or a static call, but no field.' },
  { term: 'aggregation', definition: 'A "has a" relationship where the parts can live on without the whole (hollow diamond).' },
  { term: 'composition', definition: 'A strong "owns a" relationship: the whole creates its parts, and they die with it (filled diamond).' },
  { term: 'inheritance', definition: 'A "is a" relationship: a subclass extends a superclass (hollow triangle, solid line).' },
  { term: 'generalization', definition: 'The UML name for inheritance.' },
  { term: 'realization', definition: 'A class keeps the promise of an interface: implements (hollow triangle, dashed line).' },
  { term: 'multiplicity', definition: 'The numbers at the end of a line, such as 1, 0..1 or *, that say how many objects take part.' },
  { term: 'navigability', definition: 'The arrowhead on an association: it shows which class can reach the other one through a field.' },
  { term: 'role name', definition: 'A name at the end of an association line. In Java it becomes the name of the field.' },
  { term: 'object diagram', definition: 'A snapshot of real objects at one moment: their names, field values and links.' },
  { term: 'sequence diagram', definition: 'A diagram of messages between objects in time order, from top to bottom.' },
  { term: 'lifeline', definition: 'The vertical dashed line under a participant in a sequence diagram. Time runs down it.' },
  { term: 'activation bar', definition: 'A thin box on a lifeline that shows while a method of that participant is running.' },
  { term: 'synchronous message', definition: 'A message where the sender waits for the answer, like a normal Java method call.' },
  { term: 'asynchronous message', definition: 'A message where the sender does not wait and goes on at once, like dropping a letter in a mailbox.' },
  { term: 'return message', definition: 'The dashed arrow back to the caller: the return value of a method.' },
  { term: 'combined fragment', definition: 'A frame in a sequence diagram such as alt, opt or loop that groups messages under a condition.' },
  { term: 'guard', definition: 'A condition in square brackets, such as [money >= price]. The part runs only when it is true.' },
  { term: 'use case diagram', definition: 'A diagram of the goals that users can reach with a system.' },
  { term: 'use case', definition: 'One goal a user reaches with the system, such as "Rent a bike". Drawn as an oval.' },
  { term: 'actor', definition: 'A person or another system outside your system that uses it. Drawn as a stick figure.' },
  { term: 'system boundary', definition: 'The box around the use cases. Inside is your system, outside are the actors.' },
  { term: 'activity diagram', definition: 'A flowchart of steps, decisions and loops in one process.' },
  { term: 'decision node', definition: 'A diamond in an activity diagram where the flow splits by a condition.' },
  { term: 'merge node', definition: 'A diamond where several paths come together again.' },
  { term: 'fork', definition: 'A thick bar where one flow splits into parallel flows that run at the same time.' },
  { term: 'join', definition: 'A thick bar where parallel flows wait for each other and become one flow again.' },
  { term: 'swimlane', definition: 'A column in an activity diagram that shows who does the steps inside it.' },
  { term: 'state machine diagram', definition: 'A diagram of the states one object can be in and the events that move it between them.' },
  { term: 'transition', definition: 'An arrow from one state to another, caused by an event.' },
  { term: 'component diagram', definition: 'A diagram of big replaceable parts of a system and the interfaces between them.' },
  { term: 'deployment diagram', definition: 'A diagram of the machines and programs where the software runs.' },
  { term: 'artifact', definition: 'In a deployment diagram: a real file that is deployed, such as shop.jar.' }
];

Java.topics.umlDiagrams.lessons = [];
