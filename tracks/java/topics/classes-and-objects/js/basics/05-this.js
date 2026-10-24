(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'this-keyword',
    title: 'The this Keyword',
    category: 'concept',
    icon: 'T',
    tagline: 'The object that is running right now',
    glossary: terms,
    realWorld: 'The word "me". When Ana says "my name is Ana", "my" means Ana. When Ben says it, "my" means Ben. Same sentence; who "me" is depends on who speaks.',
    kid: [
      'A method is the sentence. `this` is "me". When `ana.introduce()` runs, `this` is Ana. When `ben.introduce()` runs, `this` is Ben.'
    ],
    definition: '`this` is a reference to the **current object**: the one whose method or constructor is running. In `ana.introduce()`, `this` inside points to the same object as `ana`.',
    explain: [
      'A non-`static` method always runs **on** the object before the dot. Inside, that object is `this` — you never declare it.',
      'Most often you need it when a parameter has the same name as a field. The parameter **shadows** the field, so `name` alone means the parameter. `this.name` reaches the field.',
      'Pass yourself (`teacher.help(this)`) or `return this;` to chain calls. `this(...)` with brackets calls another constructor (previous lesson). Static methods have no `this`.'
    ],
    why: 'One method’s code is shared by every object. `this` is how that code knows which object it is working on.',
    whenUse: '`this.field` when a parameter shares the field’s name. Bare `this` to pass or return the current object.',
    syntax: '`this.field` · `this.method()` · `this` alone is the reference.',
    fileName: 'ThisDemo.java',
    code: `public class ThisDemo {
    public static void main(String[] args) {
        Kid ana = new Kid("Ana", 7);
        Kid ben = new Kid("Ben", 6);

        ana.introduce();
        ben.introduce();
        ana.greet(ben);
        ben.greet(ana);
        System.out.println("older: " + ana.olderOf(ben).name);
    }
}

class Kid {
    String name;
    int age;

    Kid(String name, int age) {
        this.name = name;   // field = parameter
        this.age = age;
    }

    void introduce() {
        System.out.println("Hello, my name is " + this.name + ", I am " + this.age);
    }

    void greet(Kid other) {
        System.out.println(this.name + " says hi to " + other.name);
    }

    Kid olderOf(Kid other) {
        if (this.age >= other.age) {
            return this;    // me
        }
        return other;
    }
}`,
    output: `Hello, my name is Ana, I am 7
Hello, my name is Ben, I am 6
Ana says hi to Ben
Ben says hi to Ana
older: Ana`,
    codeSummary: 'The same methods run on two kids. Inside, `this` is whoever is before the dot; `other` is the parameter.',
    codeExplanation: [
      { label: 'Line 6', code: 'ana.introduce();', text: 'While it runs, `this` is Ana.' },
      { label: 'Line 8', code: 'ana.greet(ben);', text: '`this` = Ana, `other` = Ben.' },
      { label: 'Line 19', code: 'this.name = name;   // field = parameter', text: 'Left: field. Right: parameter.' },
      { label: 'Line 24', code: 'System.out.println("Hello, my name is " + this.name + ", I am " + this.age);', text: 'No parameter named `name` here, so `this.name` and plain `name` are the same. `this.` makes it clear.' },
      { label: 'Line 33', code: 'return this;    // me', text: 'Returns the current object (same arrow as `ana` in `main`).' }
    ],
    sections: [
      {
        title: 'The classic bug: name = name',
        text: [
          'Forget `this.` and the code still compiles. `name = name;` copies the parameter into itself. The field stays `null`.'
        ],
        fileName: 'ShadowBug.java',
        code: `public class ShadowBug {
    public static void main(String[] args) {
        Broken broken = new Broken("Ana");
        Fixed fixed = new Fixed("Ana");
        System.out.println("broken: " + broken.name);
        System.out.println("fixed:  " + fixed.name);
    }
}

class Broken {
    String name;

    Broken(String name) {
        name = name;        // parameter = parameter, the field stays null
    }
}

class Fixed {
    String name;

    Fixed(String name) {
        this.name = name;   // field = parameter
    }
}`,
        output: `broken: null
fixed:  Ana`,
        tip: 'Editors often warn "assignment to itself" on `name = name;` — read that warning.'
      },
      {
        title: 'this is the object before the dot',
        mermaid: `sequenceDiagram
  participant M as main
  participant A as Kid ana
  participant B as Kid ben
  M->>A: ana.introduce()
  Note over A: this = ana
  A-->>M: prints "my name is Ana"
  M->>B: ben.introduce()
  Note over B: this = ben
  B-->>M: prints "my name is Ben"`,
        diagramNote: '`main` calls a method on one object; inside that call, `this` is that object.',
        fileName: 'WhoAmI.java',
        code: `public class WhoAmI {
    public static void main(String[] args) {
        Kid ana = new Kid();
        Kid ben = new Kid();
        System.out.println(ana.isSameAs(ana));
        System.out.println(ana.isSameAs(ben));
        System.out.println(ana.me() == ana);
    }
}

class Kid {
    boolean isSameAs(Kid other) {
        return this == other;   // same arrow?
    }

    Kid me() {
        return this;
    }
}`,
        output: `true
false
true`
      },
      {
        title: 'Hand yourself to another object',
        text: [
          'Pass `this` to say "help **me**".'
        ],
        fileName: 'Classroom.java',
        code: `public class Classroom {
    public static void main(String[] args) {
        Teacher teacher = new Teacher();
        Kid ana = new Kid("Ana");
        Kid ben = new Kid("Ben");
        ana.askForHelp(teacher);
        ben.askForHelp(teacher);
        System.out.println("questions answered: " + teacher.answered);
    }
}

class Kid {
    String name;

    Kid(String name) {
        this.name = name;
    }

    void askForHelp(Teacher teacher) {
        teacher.help(this);   // "help me"
    }
}

class Teacher {
    int answered;

    void help(Kid kid) {
        answered++;
        System.out.println("Teacher helps " + kid.name);
    }
}`,
        output: `Teacher helps Ana
Teacher helps Ben
questions answered: 2`
      },
      {
        title: 'Return this to chain calls',
        text: [
          'Return `this` so the next method can follow right after a dot (**method chaining**). You see it in libraries like `StringBuilder` ([Strings](../strings/index.html)).'
        ],
        fileName: 'ShoppingList.java',
        code: `public class ShoppingList {
    public static void main(String[] args) {
        Order order = new Order();
        order.add("milk").add("bread").add("eggs");
        System.out.println(order.items + " (" + order.count + " items)");
    }
}

class Order {
    String items = "";
    int count;

    Order add(String item) {
        if (count > 0) {
            items = items + ", ";
        }
        items = items + item;
        count++;
        return this;   // the same order, ready for the next add
    }
}`,
        output: 'milk, bread, eggs (3 items)'
      },
      {
        title: 'When you need this',
        table: {
          head: ['Situation', 'Need `this`?', 'Example'],
          rows: [
            ['Parameter same name as field', 'Yes', '`this.age = age;`'],
            ['Nothing hides the field', 'Optional', '`return name;` ≡ `return this.name;`'],
            ['Pass or return current object', 'Yes', '`help(this);`, `return this;`'],
            ['Call another constructor', 'Yes, as `this(...)`', '`this(name, 0);`'],
            ['Inside `static`', 'Impossible', '`main` has no `this`']
          ]
        },
        warn: '`this = other;` does not compile. `this` always means the object the method was called on.'
      }
    ],
    technical: [
      'Instance methods get a hidden first parameter: the object before the dot (bytecode local slot 0 = `this`).',
      'Static methods do not get it — so `this` does not compile there.'
    ],
    tryIt: {
      steps: [
        'Copy `ThisDemo.java` and run it.',
        'In the constructor, change `this.age = age;` to `age = age;`.',
        'Run again.'
      ],
      see: '`I am 0` for both kids — ages stay at the default. Put `this.` back.'
    },
    check: [
      { q: 'In `ben.greet(ana)`, what is `this` and what is `other`?', a: '`this` is Ben. `other` is Ana.' },
      { q: 'Why does `name = name;` leave the field `null`?', a: 'The parameter shadows the field. Both sides mean the parameter. Use `this.name = name;`.' },
      { q: 'Can you use `this` inside `public static void main`?', a: 'No. Make an object with `new` and call methods on it.' }
    ],
    keyPoints: [
      '`this` is the current object (before the dot).',
      '`this.field` when a parameter has the same name.',
      'Pass `this` / `return this;` for "me" and method chaining.',
      'Static methods have no `this`.'
    ],
    commonMistakes: [
      '`name = name;` — write `this.name = name;`.',
      'Using `this` in `static void main`.',
      'Mixing `this.name` and `other.name` — read `this` as "me".',
      'Confusing `this(...)` (constructor chain) with `this.` (member).'
    ],
    related: ['Constructors', 'Methods That Use Fields', 'Instance vs static', 'Strings']
  }]);
})();
