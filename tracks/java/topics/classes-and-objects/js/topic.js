// Classes & Objects (topic 9). This file holds the topic details and its glossary.
// The lessons live in js/basics, js/behavior, js/identity and js/deeper (one lesson per file).
(function () {
  const glossary = [
    { term: 'instance', definition: 'One object made from a class. "An instance of Dog" means one Dog object.' },
    { term: 'constructor', definition: 'A special block with the class name that runs once when you write new. It fills the fields of the new object.' },
    { term: 'reference', definition: 'The arrow a variable holds to an object on the heap. The variable does not hold the object itself.' },
    { term: 'heap', definition: 'The big memory area where the JVM keeps every object made with new.' },
    { term: 'encapsulation', definition: 'Hiding the fields of a class behind methods, so only the class decides how its data changes.' },
    { term: 'getter', definition: 'A small method that returns the value of one private field, for example getName().' },
    { term: 'setter', definition: 'A small method that changes one private field, often after it checks the new value, for example setAge(int age).' },
    { term: 'immutable', definition: 'Cannot change after it is made. A record is immutable: its fields are final.' },
    { term: 'composition', definition: 'Building an object out of other objects: a Library has Books. Also called a has-a relationship.' },
    { term: 'polymorphism', definition: 'One variable type, many object types: an Animal variable can hold a Dog or a Cat, and each answers in its own way.' },
    { term: 'NullPointerException', definition: 'The error Java throws when you use a variable that holds null as if it pointed to an object.' }
  ];

  Java.addCoreTopic('classes-and-objects', {
    label: 'Objects',
    headline: 'Classes and objects,',
    accent: 'state with behavior.',
    intro: 'Move from loose variables to small models: a class is the cookie cutter, every object is one cookie with its own fields and methods.',
    overview: 'Start with why classes exist, then fields, `new`, constructors and `this`. Add behavior and protect it with `private`. Learn `static`, `toString`, `equals`/`hashCode` and records. Finish with objects working together, `null`, and (deeper) inheritance and polymorphism.',
    glossary,
    tryIt: {
      steps: [
        'Make a file `PetShop.java` with `public class PetShop` and its `main` first. Below it, write a class `Pet` with two `private` fields: `String name` and `int age`.',
        'Give `Pet` a constructor `Pet(String name, int age)` that uses `this.name = name;` and `this.age = age;`.',
        'Add a method `void birthday()` that adds 1 to `age`, and a `toString()` with `@Override` that returns `name + " (" + age + ")"`.',
        'In `main`, make two pets with `new`, call `birthday()` on only one of them, and print both with `System.out.println(pet)`.',
        'Run `java PetShop.java` in the terminal.'
      ],
      see: 'two lines, for example `Rex (4)` and `Mia (2)`. Only the pet that had a birthday is one year older, because each object has its own `age` field.'
    },
    check: [
      { q: 'What is the difference between a class and an object?', a: 'The class is the cookie cutter: the plan that says which fields and methods exist. An object is one cookie made with `new`. One class, many objects, each with its own field values.' },
      { q: 'You write `Dog a = new Dog("Rex"); Dog b = a; b.name = "Max";`. What does `a.name` print?', a: '`Max`. `b = a` copies the reference (the arrow), not the object. Both variables point to the same one `Dog` on the heap.' },
      { q: 'What does `this.name = name;` do in a constructor?', a: 'The parameter `name` hides the field. `this.name` means "the field `name` of this object". The line copies the parameter into the object’s own field.' },
      { q: 'Why are fields usually `private`, with getters and setters?', a: 'So only the class can change its own data. A setter can check the new value (no negative age, no empty name) before it stores it. This is called encapsulation.' },
      { q: 'Why do you override `equals` and `hashCode` together?', a: 'Without them, two objects with the same values are "not equal" because `==` and the default `equals` compare references. A `HashSet` or `HashMap` uses `hashCode` first and `equals` second, so both must agree: equal objects must have the same hash code.' }
    ]
  }, []);
})();
