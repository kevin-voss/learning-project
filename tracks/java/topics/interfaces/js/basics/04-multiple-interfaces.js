// Interfaces, lesson 4: one class, many interfaces; interfaces that extend interfaces.
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'multiple-interfaces',
      title: 'One Class, Many Interfaces',
      category: 'practice',
      icon: '⊕',
      tagline: 'Many skills, one object',
      realWorld: 'A swimming badge, a bike licence and a first-aid badge on one jacket. The same child can show each badge to a different teacher. The swimming teacher only cares about the swimming badge.',
      kid: [
        'A duck can swim **and** fly. A fish can only swim. A paper plane can only fly.',
        'At the pool, the lifeguard calls everyone who can swim: the duck and the fish come. At the air show, the pilot calls everyone who can fly: the duck and the paper plane come.',
        'The duck has two badges, so it is invited to both parties. In Java, each badge is an interface, and a class can wear as many badges as it likes.'
      ],
      definition: 'A class can implement **several interfaces** at once: `class Duck implements Swimmer, Flyer`. It must then write every method of every interface. An object of that class fits in a variable of each of those types.',
      explain: [
        'Each interface describes one **role** or ability: "can swim", "can fly", "can be compared". Small interfaces with one or two methods are easy to keep and easy to combine.',
        'You list the interfaces after `implements`, separated by commas. The compiler checks each promise separately. If `Duck` forgets `fly()`, you get the same "does not override abstract method" error as in the first lesson.',
        'A `Duck` object now has several types at the same time. It **is a** `Duck`, **is a** `Swimmer` and **is a** `Flyer`. You can pass it to a method that wants a `Swimmer` and to a method that wants a `Flyer`. Each method only sees the part it asked for.',
        'An interface can also **extend** another interface: `interface Pet extends Animal`. Then `Pet` contains every method of `Animal` plus its own. A class that implements `Pet` must write all of them. An interface may even extend several interfaces: `interface Amphibian extends Swimmer, Walker`.',
        'Why many interfaces but only one parent class? A class can `extend` only one other class (you see `extends` in the lesson on abstract classes). Interfaces carry no fields, so combining many of them cannot mix up any stored data. That makes "many interfaces" safe.'
      ],
      why: 'Real things have several abilities. Small interfaces let each method ask for exactly the ability it needs, nothing more.',
      whenUse: 'When one class plays several roles, for example it can be saved, printed and compared.',
      syntax: '`class Name implements A, B, C { … }` · `interface Child extends Parent1, Parent2 { … }`',
      fileName: 'Abilities.java',
      code: `interface Swimmer {
    String swim();
}

interface Flyer {
    String fly();
}

class Duck implements Swimmer, Flyer {
    @Override public String swim() { return "Duck paddles across the pond"; }
    @Override public String fly() { return "Duck flaps up into the sky"; }
}

class Fish implements Swimmer {
    @Override public String swim() { return "Fish wiggles through the water"; }
}

class PaperPlane implements Flyer {
    @Override public String fly() { return "Paper plane glides over the desk"; }
}

public class Abilities {
    static void poolParty(Swimmer[] guests) {
        for (Swimmer s : guests) System.out.println("pool: " + s.swim());
    }

    static void airShow(Flyer[] guests) {
        for (Flyer f : guests) System.out.println("air:  " + f.fly());
    }

    public static void main(String[] args) {
        Duck duck = new Duck();
        poolParty(new Swimmer[] { duck, new Fish() });
        airShow(new Flyer[] { duck, new PaperPlane() });
        System.out.println("duck is a Swimmer: " + (duck instanceof Swimmer));
        System.out.println("duck is a Flyer:   " + (duck instanceof Flyer));
    }
}`,
      output: `pool: Duck paddles across the pond
pool: Fish wiggles through the water
air:  Duck flaps up into the sky
air:  Paper plane glides over the desk
duck is a Swimmer: true
duck is a Flyer:   true`,
      codeSummary: 'Duck wears two badges (Swimmer and Flyer). The same duck object goes to the pool party and to the air show.',
      codeExplanation: [
        { label: 'Line 9', code: 'class Duck implements Swimmer, Flyer {', text: 'Two interfaces after `implements`, separated by a comma. Duck must keep both promises.' },
        { label: 'Line 10', code: '@Override public String swim() { return "Duck paddles across the pond"; }', text: 'The method for the `Swimmer` promise.' },
        { label: 'Line 11', code: '@Override public String fly() { return "Duck flaps up into the sky"; }', text: 'The method for the `Flyer` promise. Without it the class would not compile.' },
        { label: 'Line 14', code: 'class Fish implements Swimmer {', text: 'Fish has only one badge. It cannot go to the air show.' },
        { label: 'Line 23', code: 'static void poolParty(Swimmer[] guests) {', text: 'This method asks only for the swimming ability. Inside, it cannot call `fly()`, even on the duck.' },
        { label: 'Line 24', code: 'for (Swimmer s : guests) System.out.println("pool: " + s.swim());', text: 'A for-each loop with a one-line body. Each guest swims in its own way.' },
        { label: 'Line 32', code: 'Duck duck = new Duck();', text: 'One object. It is a Duck, a Swimmer and a Flyer at the same time.' },
        { label: 'Line 33', code: 'poolParty(new Swimmer[] { duck, new Fish() });', text: 'An array of `Swimmer` made on the spot. The duck fits because it implements `Swimmer`.' },
        { label: 'Line 34', code: 'airShow(new Flyer[] { duck, new PaperPlane() });', text: 'The same duck object again, now seen as a `Flyer`.' },
        { label: 'Line 35', code: 'System.out.println("duck is a Swimmer: " + (duck instanceof Swimmer));', text: '`instanceof` checks if an object fits a type. Both checks print `true`.' }
      ],
      mermaid: `classDiagram
  class Swimmer {
    <<interface>>
    +swim() String
  }
  class Flyer {
    <<interface>>
    +fly() String
  }
  Swimmer <|.. Duck
  Flyer <|.. Duck
  Swimmer <|.. Fish
  Flyer <|.. PaperPlane`,
      visualLabel: 'Class diagram',
      visualNote: 'Duck has two dashed "implements" arrows, one to each interface. Fish and PaperPlane have one each.',
      sections: [
        {
          title: 'An interface can extend an interface',
          text: [
            '`interface Pet extends Animal` means: "a Pet is an Animal plus more". A `Dog` that implements `Pet` must write `sound()` from Animal **and** `ownerName()` from Pet.',
            'A `Dog` then fits in a `Pet` variable and also in an `Animal` variable.'
          ],
          fileName: 'Pets.java',
          code: `interface Animal {
    String sound();
}

interface Pet extends Animal {
    String ownerName();
}

class Dog implements Pet {
    @Override public String sound() { return "Woof"; }
    @Override public String ownerName() { return "Sam"; }
}

public class Pets {
    public static void main(String[] args) {
        Pet rex = new Dog();
        Animal sameDog = rex;   // every Pet is also an Animal
        System.out.println(rex.ownerName() + "'s dog says " + rex.sound());
        System.out.println("as an Animal: " + sameDog.sound());
    }
}`,
          output: `Sam's dog says Woof
as an Animal: Woof`,
          mermaid: `classDiagram
  class Animal {
    <<interface>>
    +sound() String
  }
  class Pet {
    <<interface>>
    +ownerName() String
  }
  Animal <|-- Pet
  Pet <|.. Dog`,
          diagramNote: 'Between two interfaces the arrow is **solid** (`extends`). From a class to an interface it is **dashed** (`implements`).'
        },
        {
          title: 'The same method in two interfaces',
          text: [
            'What if two interfaces promise the same method, with the same name and parameters? Then one method in the class keeps both promises at once. There is nothing to choose, because neither interface has a body.',
            '(If both interfaces bring a ready-made `default` body, you must choose yourself. The next lesson shows how.)'
          ],
          fileName: 'Gadgets.java',
          code: `interface Camera {
    String powerOn();
    String takePhoto();
}

interface MusicPlayer {
    String powerOn();
    String play(String song);
}

class SmartPhone implements Camera, MusicPlayer {
    @Override public String powerOn() { return "phone screen lights up"; }
    @Override public String takePhoto() { return "click"; }
    @Override public String play(String song) { return "playing " + song; }
}

public class Gadgets {
    public static void main(String[] args) {
        Camera cam = new SmartPhone();
        MusicPlayer music = new SmartPhone();
        System.out.println(cam.powerOn() + ", " + cam.takePhoto());
        System.out.println(music.powerOn() + ", " + music.play("Happy Song"));
    }
}`,
          output: `phone screen lights up, click
phone screen lights up, playing Happy Song`
        },
        {
          title: 'Badges compared: extends vs implements',
          table: {
            head: ['', '`extends` a class', '`implements` interfaces'],
            rows: [
              ['How many?', 'one', 'as many as you like'],
              ['Brings fields (stored data)?', 'yes', 'no (only constants)'],
              ['Brings finished code?', 'yes', 'only `default` methods'],
              ['Reads like…', '"is a kind of"', '"can do" / "plays the role of"'],
              ['Order in the header', 'first: `class Dog extends Animal …`', 'after it: `… implements Pet, Comparable<Dog>`']
            ],
            note: 'Many interface names end in "-able": `Comparable`, `Runnable`, `Iterable`. That is a hint they describe an ability.'
          },
          tip: 'Prefer several small interfaces over one big one. A method that needs only `swim()` should not ask for an interface with ten methods.'
        }
      ],
      technical: [
        'In the class file, the "interfaces" table of `Duck` lists both `Swimmer` and `Flyer`. When the JVM checks `duck instanceof Flyer`, it looks at this table (and at the tables of all parent types).',
        'Because interfaces have no instance fields, an object of `Duck` has the same memory layout no matter how many interfaces it implements. Only the class gains entries in its method tables, so the JVM can find `swim` and `fly` quickly.',
        'For `interface Pet extends Animal`, the class file of `Pet` lists `Animal` as a super-interface. The compiler collects all abstract methods of the whole chain and requires `Dog` to implement every one.'
      ],
      tryIt: {
        steps: [
          'Run `Abilities.java`.',
          'Add an interface `Walker` with `String walk();`.',
          'Make `Duck` implement `Swimmer, Flyer, Walker` and add a `walk()` method.',
          'In `main`, write `Walker w = duck;` and print `w.walk()`.',
          'Try `w.swim()` and read the compiler message, then remove that line.'
        ],
        see: 'your walking line printed. `w.swim()` fails with `cannot find symbol`, because a `Walker` variable only offers `walk()`.'
      },
      check: [
        { q: 'How do you write a class that implements both `Comparable<Card>` and `Printable`?', a: '`class Card implements Comparable<Card>, Printable { … }` with every method of both interfaces.' },
        { q: 'What does `interface Pet extends Animal` mean for a class that implements `Pet`?', a: 'It must write the methods of `Pet` and of `Animal`. Its objects fit in `Pet` and in `Animal` variables.' },
        { q: 'Two interfaces both promise `String powerOn();` without a body. How many `powerOn` methods does the class write?', a: 'One. It keeps both promises at once.' }
      ],
      keyPoints: [
        'A class can implement many interfaces: `implements A, B, C`.',
        'It must write every method of every interface it lists.',
        'One object fits in a variable of each of its interface types.',
        'Interfaces can extend other interfaces, even several.',
        'Small, focused interfaces are easier to combine than one big one.'
      ],
      commonMistakes: [
        'Writing `implements` twice: `class Duck implements Swimmer implements Flyer`. Fix: one `implements` with commas: `implements Swimmer, Flyer`.',
        'Using `implements` between interfaces: `interface Pet implements Animal`. Fix: `interface Pet extends Animal`.',
        'Putting `implements` before `extends`: `class Dog implements Pet extends Animal`. Fix: `class Dog extends Animal implements Pet`.',
        'One huge interface `Bird` with `swim`, `fly`, `walk`, `sing`, so a penguin must fake `fly()`. Fix: split it into small interfaces.'
      ],
      related: ['interface-polymorphism', 'default-static-methods', 'interface-or-abstract']
    }
  ]);
})();
