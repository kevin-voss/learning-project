Java.topics.umlDiagrams = Java.topics.umlDiagrams || {};

const umlGlossary = [
  { term: 'UML', definition: 'Unified Modeling Language: a standard family of diagrams for visualizing software systems.' },
  { term: 'class', definition: 'A blueprint for objects: fields hold data, methods define behavior.' },
  { term: 'object', definition: 'A runtime instance created from a class.' },
  { term: 'association', definition: 'A relationship where one concept knows about or works with another.' },
  { term: 'inheritance', definition: 'A relationship where one class extends another and reuses or specializes behavior.' },
  { term: 'state', definition: 'A named condition an object can be in during its lifecycle.' },
  { term: 'actor', definition: 'A user or external system that interacts with the system.' },
  { term: 'lifeline', definition: 'The vertical timeline for a participant in a sequence diagram.' }
];

Java.topics.umlDiagrams.lessons = [
  {
    id: 'class-diagram',
    num: '01',
    title: 'Class Diagram',
    category: 'structure',
    icon: '□',
    tagline: 'Show classes and relationships',
    definition: 'A class diagram shows classes, fields, methods, and relationships such as association and inheritance.',
    realWorld: 'It is like a blueprint for a house. It does not show every person walking through the rooms, but it shows the rooms, doors, and major connections.',
    why: 'Use it to discuss the nouns in your Java program before or during coding: classes, fields, methods, and how objects know about each other.',
    howThink: 'A class is a blueprint or blank form. An object is a filled-out form at runtime. The class diagram shows the forms and their relationships, not the live objects.',
    whenUse: 'Use class diagrams for domain models and OOP design. Do not use them to explain time order, user workflows, or every tiny getter and setter.',
    syntax: 'Use a box for each class. Put fields in the middle, methods at the bottom, arrows for relationships, and + or - for public or private members.',
    exampleLabel: 'PlantUML-style Example',
    codeLanguage: 'plaintext',
    fileName: 'class-diagram.puml',
    code: `@startuml
class User {
  -id: long
  -email: String
  +changeEmail(newEmail: String): void
}

class Order {
  -id: long
  -status: OrderStatus
  +cancel(): void
}

User "1" -- "many" Order : places
@enduml`,
    visualLabel: 'Mermaid Rendered Diagram',
    mermaid: `classDiagram
direction LR
class User {
  -long id
  -String email
  +changeEmail(String newEmail) void
}
class Order {
  -long id
  -OrderStatus status
  +cancel() void
}
User "1" --> "*" Order : places`,
    keyPoints: [
      'Use class diagrams when structure matters.',
      'Fields describe stored data; methods describe behavior.',
      'Associations show collaboration between classes.',
      'Keep diagrams smaller than the whole codebase.'
    ],
    commonMistakes: [
      'Drawing every getter and setter until the diagram becomes unreadable.',
      'Confusing inheritance with simple association.',
      'Using a class diagram to explain step-by-step behavior.'
    ],
    pros: [
      'Excellent for OOP planning and code reviews.',
      'Helps beginners see fields, methods, and relationships together.',
      'Maps naturally to Java classes.'
    ],
    cons: [
      'Can become stale if not maintained.',
      'Too much detail hides the important structure.',
      'Not ideal for showing time order or user workflow.'
    ],
    related: ['Sequence Diagram', 'Use Case Diagram'],
    glossary: umlGlossary
  },
  {
    id: 'sequence-diagram',
    num: '02',
    title: 'Sequence Diagram',
    category: 'behavior',
    icon: '⇣',
    tagline: 'Show messages over time',
    definition: 'A sequence diagram shows how actors and objects send messages to each other in time order.',
    realWorld: 'It is like a chat transcript between a customer, cashier, and payment terminal. The order of messages is the whole point.',
    why: 'Use it when a bug or feature depends on who calls whom and in what order.',
    howThink: 'Participants are columns. Time flows downward. Each arrow is one message, method call, API call, or response.',
    whenUse: 'Use sequence diagrams for login, checkout, API requests, and service collaboration. Do not use them for static class fields or full database schemas.',
    syntax: 'Participants go across the top. Each lifeline goes downward. Arrows show calls or responses in the order they happen.',
    exampleLabel: 'PlantUML-style Example',
    codeLanguage: 'plaintext',
    fileName: 'sequence-diagram.puml',
    code: `@startuml
actor Customer
participant WebApp
participant OrderService
database Database

Customer -> WebApp: click checkout
WebApp -> OrderService: createOrder(cart)
OrderService -> Database: save(order)
Database --> OrderService: orderId
OrderService --> WebApp: confirmation
WebApp --> Customer: show receipt
@enduml`,
    visualLabel: 'Mermaid Rendered Diagram',
    mermaid: `sequenceDiagram
actor Customer
participant WebApp
participant OrderService
participant Database
Customer->>WebApp: click checkout
WebApp->>OrderService: createOrder(cart)
OrderService->>Database: save(order)
Database-->>OrderService: orderId
OrderService-->>WebApp: confirmation
WebApp-->>Customer: show receipt`,
    visualNote: 'Read from top to bottom: customer action, app call, service call, database save, then responses.',
    keyPoints: [
      'Use sequence diagrams for request flows and collaboration.',
      'Time moves from top to bottom.',
      'A lifeline belongs to one participant.',
      'Responses are often dashed arrows.'
    ],
    commonMistakes: [
      'Adding too many internal helper calls.',
      'Using sequence diagrams for static class structure.',
      'Forgetting the external actor or trigger.'
    ],
    pros: [
      'Great for API, checkout, login, and service-call flows.',
      'Makes hidden dependencies visible.',
      'Helps teams discuss timing and responsibility.'
    ],
    cons: [
      'Large flows can become wide and noisy.',
      'Not good for showing all possible states.',
      'Can imply more exact timing than the system guarantees.'
    ],
    related: ['Class Diagram', 'Activity Diagram'],
    glossary: umlGlossary
  },
  {
    id: 'state-diagram',
    num: '03',
    title: 'State Diagram',
    category: 'behavior',
    icon: '◎',
    tagline: 'Show valid lifecycle changes',
    definition: 'A state diagram shows the states an object can be in and the events that move it between states.',
    realWorld: 'An order can be Draft, Paid, Shipped, Delivered, or Cancelled. The diagram is the rulebook for legal moves.',
    why: 'Use it when an object has valid and invalid lifecycle moves, such as orders, tickets, accounts, jobs, or payments.',
    howThink: 'States are stable conditions. Arrows are events that move the object from one condition to another.',
    whenUse: 'Use state diagrams before writing validation if/else chains. Do not use them for objects with no meaningful lifecycle.',
    syntax: 'Draw states as rounded boxes. Use arrows for transitions. Label arrows with events such as pay, ship, cancel, or timeout.',
    exampleLabel: 'PlantUML-style Example',
    codeLanguage: 'plaintext',
    fileName: 'state-diagram.puml',
    code: `@startuml
[*] --> Draft
Draft --> Paid : pay
Draft --> Cancelled : cancel
Paid --> Shipped : ship
Shipped --> Delivered : deliver
Paid --> Refunded : refund
Cancelled --> [*]
Delivered --> [*]
Refunded --> [*]
@enduml`,
    visualLabel: 'Mermaid Rendered Diagram',
    mermaid: `stateDiagram-v2
[*] --> Draft
Draft --> Paid : pay
Draft --> Cancelled : cancel
Paid --> Shipped : ship
Shipped --> Delivered : deliver
Paid --> Refunded : refund
Cancelled --> [*]
Delivered --> [*]
Refunded --> [*]`,
    keyPoints: [
      'Use state diagrams when lifecycle rules matter.',
      'States are nouns or adjectives, events are verbs.',
      'They prevent impossible transitions such as Delivered back to Draft.',
      'They are useful for orders, tickets, accounts, and jobs.'
    ],
    commonMistakes: [
      'Drawing actions as states.',
      'Forgetting terminal states.',
      'Allowing every state to jump to every other state.'
    ],
    pros: [
      'Clarifies business rules before code is written.',
      'Excellent for validation logic and tests.',
      'Helps beginners understand why if/else rules can grow complicated.'
    ],
    cons: [
      'Can be overkill for objects with no meaningful lifecycle.',
      'Large state machines need careful naming.',
      'Parallel states and advanced notation can confuse beginners.'
    ],
    related: ['Activity Diagram', 'if/else'],
    glossary: umlGlossary
  },
  {
    id: 'activity-diagram',
    num: '04',
    title: 'Activity Diagram',
    category: 'workflow',
    icon: '↬',
    tagline: 'Show workflow decisions',
    definition: 'An activity diagram shows a workflow: actions, decisions, loops, and parallel steps.',
    realWorld: 'It is like a recipe flowchart. If the sauce is too thick, add water; otherwise continue to serving.',
    why: 'Use it to clarify business steps before turning them into Java control flow.',
    howThink: 'Actions are work steps. Diamonds are questions. Arrows show the path the work follows.',
    whenUse: 'Use activity diagrams for returns, signup flows, approvals, and processes. Do not use them to show class fields or object lifetimes.',
    syntax: 'Use actions for work, diamonds for decisions, arrows for flow, and start/end markers for boundaries.',
    exampleLabel: 'PlantUML-style Example',
    codeLanguage: 'plaintext',
    fileName: 'activity-diagram.puml',
    code: `@startuml
start
:Receive return request;
if (Within 30 days?) then (yes)
  :Create return label;
  :Refund after item arrives;
else (no)
  :Reject request;
endif
stop
@enduml`,
    visualLabel: 'Mermaid Rendered Diagram',
    mermaid: `flowchart TD
Start([Start]) --> Receive[Receive return request]
Receive --> Check{Within 30 days?}
Check -- yes --> Label[Create return label]
Label --> Refund[Refund after item arrives]
Check -- no --> Reject[Reject request]
Refund --> Stop([Stop])
Reject --> Stop`,
    keyPoints: [
      'Use activity diagrams for business processes.',
      'They pair well with if/else and loop logic.',
      'Decision labels should be clear yes/no questions.',
      'Keep one diagram focused on one workflow.'
    ],
    commonMistakes: [
      'Turning the diagram into a wall of tiny implementation steps.',
      'Leaving decision branches unlabeled.',
      'Mixing user goals, database schema, and code structure in one diagram.'
    ],
    pros: [
      'Very beginner-friendly for workflows.',
      'Good for explaining loops and branching.',
      'Useful before implementing service methods.'
    ],
    cons: [
      'Does not show class relationships well.',
      'Can duplicate written process documentation.',
      'Too many branches can become hard to follow.'
    ],
    related: ['State Diagram', 'Control Flow'],
    glossary: umlGlossary
  },
  {
    id: 'use-case-diagram',
    num: '05',
    title: 'Use Case Diagram',
    category: 'workflow',
    icon: '☺',
    tagline: 'Show user goals',
    definition: 'A use case diagram shows actors and the goals they can accomplish with a system.',
    realWorld: 'It is like a sign at a service desk: customers can return items, staff can approve refunds, managers can review reports.',
    why: 'Use it to agree on system scope before arguing about screens, classes, or database tables.',
    howThink: 'Actors stand outside the system. Use cases are goals inside the system boundary.',
    whenUse: 'Use use case diagrams early in planning. Do not use them for method logic, object state, or exact UI click paths.',
    syntax: 'Actors are outside the system boundary. Use cases are named goals inside the boundary. Lines connect actors to goals.',
    exampleLabel: 'PlantUML-style Example',
    codeLanguage: 'plaintext',
    fileName: 'use-case-diagram.puml',
    code: `@startuml
left to right direction
actor Customer
actor SupportAgent

rectangle "Shop System" {
  usecase "Place order" as PlaceOrder
  usecase "Request refund" as RequestRefund
  usecase "Approve refund" as ApproveRefund
}

Customer -- PlaceOrder
Customer -- RequestRefund
SupportAgent -- ApproveRefund
@enduml`,
    visualLabel: 'Mermaid Rendered Diagram',
    mermaid: `flowchart LR
Customer[Customer]
SupportAgent[Support Agent]
subgraph ShopSystem[Shop System]
  PlaceOrder([Place order])
  RequestRefund([Request refund])
  ApproveRefund([Approve refund])
end
Customer --- PlaceOrder
Customer --- RequestRefund
SupportAgent --- ApproveRefund`,
    visualNote: 'Mermaid does not have a dedicated use-case grammar, so this uses Mermaid flowchart syntax for the rendered view while the PUML source remains visible above.',
    keyPoints: [
      'Use cases are user goals, not button clicks.',
      'Actors can be people or external systems.',
      'The system boundary keeps scope visible.',
      'Use case diagrams are strongest early in planning.'
    ],
    commonMistakes: [
      'Naming use cases as UI actions instead of goals.',
      'Drawing internal classes as actors.',
      'Adding too many include/extend relationships too early.'
    ],
    pros: [
      'Good for scope and stakeholder conversations.',
      'Easy for non-developers to understand.',
      'Helps find missing user roles.'
    ],
    cons: [
      'Too high-level for implementation details.',
      'Can feel obvious if the system is tiny.',
      'Does not show data, timing, or state rules.'
    ],
    related: ['Activity Diagram', 'Class Diagram'],
    glossary: umlGlossary
  },
  {
    id: 'component-diagram',
    num: '06',
    title: 'Component Diagram',
    category: 'structure',
    icon: '▣',
    tagline: 'Show deployable parts',
    definition: 'A component diagram shows larger software pieces and how they depend on each other.',
    realWorld: 'It is like a map of departments in a company: Web App talks to API, API talks to Database, API also sends email through a provider.',
    why: 'Use it to explain architecture at a level larger than classes: apps, services, databases, and external providers.',
    howThink: 'Components are major boxes. Arrows show which box depends on or calls another box.',
    whenUse: 'Use component diagrams for onboarding and architecture discussions. Do not use them for individual methods or every class in a package.',
    syntax: 'Draw components as boxes. Use dependency arrows to show which component calls or relies on another.',
    exampleLabel: 'PlantUML-style Example',
    codeLanguage: 'plaintext',
    fileName: 'component-diagram.puml',
    code: `@startuml
component "React Frontend" as Frontend
component "Java API" as Api
database "PostgreSQL" as Db
component "Email Provider" as Email

Frontend --> Api : HTTPS
Api --> Db : SQL
Api --> Email : SMTP/API
@enduml`,
    visualLabel: 'Mermaid Rendered Diagram',
    mermaid: `flowchart LR
Frontend[React Frontend]
Api[Java API]
Db[(PostgreSQL)]
Email[Email Provider]
Frontend -- HTTPS --> Api
Api -- SQL --> Db
Api -- SMTP/API --> Email`,
    keyPoints: [
      'Use component diagrams for system-level structure.',
      'They are coarser than class diagrams.',
      'They help spot external dependencies.',
      'They pair well with system design docs.'
    ],
    commonMistakes: [
      'Drawing every class as a component.',
      'Forgetting external services.',
      'Leaving dependency direction ambiguous.'
    ],
    pros: [
      'Good for onboarding and architecture reviews.',
      'Shows boundaries between deployable pieces.',
      'Keeps big-picture dependencies visible.'
    ],
    cons: [
      'Too broad for method-level code questions.',
      'Can hide important runtime behavior.',
      'Needs updates when architecture changes.'
    ],
    related: ['Class Diagram', 'Sequence Diagram'],
    glossary: umlGlossary
  }
];
