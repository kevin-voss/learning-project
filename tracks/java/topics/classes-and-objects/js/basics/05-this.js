(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'this-keyword',
    title: 'The this Keyword',
    category: 'concept',
    icon: 'T',
    tagline: 'The object that is running right now',
    glossary: terms,
    realWorld: 'The word "me". When Ana says "my name is Ana", "my" means Ana. When Ben says the same sentence, "my" means Ben. The sentence is the same; who "me" is depends on who speaks.',
    kid: [
      'In class every child stands up and says the same sentence: "Hello, my name is …, and I am … years old."',
      'The sentence is the same for everybody. But "my" and "I" mean a different child each time, because a different child is talking.',
      'In Java, a method is the sentence, and `this` is the word "me". When `ana.introduce()` runs, `this` is Ana. When `ben.introduce()` runs, `this` is Ben.'
    ],
    definition: '`this` is a reference to the **current object**: the object whose method or constructor is running right now. In `ana.introduce()`, `this` inside `introduce` points to the same object as `ana`.',
    explain: [
      'A method without `static` always runs **on** an object: the one before the dot. Inside the method, Java gives you that object under the name `this`. You do not declare it; it is always there in constructors and instance methods.',
      'Most often you need `this` when a parameter has the same name as a field. In `Kid(String name)`, the word `name` alone means the parameter, because the closer name wins. People say the parameter **shadows** (hides) the field. `this.name` reaches past the parameter to the field of the object.',
      'You can also hand the current object to someone else: `teacher.help(this)` means "help me". And a method can `return this;` so the caller gets the same object back and can call the next method on it right away.',
      'The form `this(...)` with brackets is something different: it calls another constructor of the same class. You met it in the lesson "Constructors".',
      'A `static` method does not run on an object, so it has no `this`. The lesson "Instance vs static" explains why.'
    ],
    why: 'One method’s code is shared by every object of a class. `this` is how that shared code knows which object it is working on at this moment.',
    whenUse: 'Write `this.field` when a parameter or local variable has the same name as a field (constructors and setters). Use `this` alone to pass or return the current object.',
    syntax: '`this.field` reads or writes a field of the current object. `this.method()` calls a method on it. `this` alone is the reference itself.',
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
    codeSummary: 'The same three methods run on two different kids. Inside them, `this` is whichever kid is before the dot, and `other` is the kid passed in as a parameter.',
    codeExplanation: [
      { label: 'Line 6', code: 'ana.introduce();', text: 'Calls `introduce` on `ana`. While it runs, `this` points to the Ana object.' },
      { label: 'Line 8', code: 'ana.greet(ben);', text: '`this` is Ana (before the dot), and the parameter `other` is Ben (inside the brackets).' },
      { label: 'Line 10', code: 'System.out.println("older: " + ana.olderOf(ben).name);', text: '`olderOf` returns a `Kid`. You can read `.name` of the returned object at once.' },
      { label: 'Line 18', code: 'Kid(String name, int age) {', text: 'The parameters have the same names as the fields. Inside this constructor, `name` alone means the parameter.' },
      { label: 'Line 19', code: 'this.name = name;   // field = parameter', text: 'Left: the field of the new object. Right: the parameter. This copies the value in.' },
      { label: 'Line 24', code: 'System.out.println("Hello, my name is " + this.name + ", I am " + this.age);', text: 'No parameter is called `name` here, so `this.name` and plain `name` mean the same field. Writing `this.` makes it extra clear.' },
      { label: 'Line 28', code: 'System.out.println(this.name + " says hi to " + other.name);', text: 'Two kids in one line: `this` is the one running the method, `other` is the one passed in.' },
      { label: 'Line 33', code: 'return this;    // me', text: 'Returns the current object itself, the same arrow that `ana` holds in `main`.' }
    ],
    sections: [
      {
        title: 'The classic bug: name = name',
        text: [
          'Forget `this.` in a constructor and the code still compiles. But `name = name;` copies the parameter into **itself**. The field never changes and keeps its default, `null`.'
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
        tip: 'Many editors grey out or warn about `name = name;` ("assignment to itself"). Read such warnings: they often point at this exact bug.'
      },
      {
        title: 'this is the object before the dot',
        text: [
          'Every call `object.method()` sends the object along. The diagram shows two calls to the same method. The code is the same; `this` is different each time.'
        ],
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
        diagramNote: 'Read from top to bottom: `main` calls a method on one object, and inside that call `this` is that object.',
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
          'Sometimes an object asks another object for help and must say who it is. It passes `this` as an argument: "please help **me**".'
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
          'When a method changes the object and then returns `this`, the caller gets the same object back. Then the next method can follow right after a dot. This is called **method chaining**. You will see it in many Java libraries, for example with `StringBuilder` from [Strings](../strings/index.html).'
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
        title: 'When you need this, and when not',
        text: [
          'Inside an instance method, a plain field name already means "the field of this object". So `this.` is optional when nothing hides the field.'
        ],
        table: {
          head: ['Situation', 'Need `this`?', 'Example'],
          rows: [
            ['A parameter has the same name as a field', 'Yes, for the field', '`this.age = age;`'],
            ['No other variable has that name', 'No (allowed, but optional)', '`return name;` is the same as `return this.name;`'],
            ['Pass or return the current object', 'Yes', '`teacher.help(this);`, `return this;`'],
            ['Call another constructor', 'Yes, as `this(...)`', '`this(name, 0);`'],
            ['Inside a `static` method', 'Not possible: there is no current object', '`static void main(...)` has no `this`']
          ]
        },
        warn: '`this` cannot be changed. `this = other;` does not compile. It always means the object the method was called on.'
      }
    ],
    technical: [
      'There is only one copy of the code of `introduce()`, shared by all kids. To know which kid to work on, the compiler gives every instance method a hidden first parameter: the object before the dot. In the bytecode it sits in local slot 0, and `this` is its name in your source code.',
      '`ana.introduce()` compiles to: load the reference in `ana`, then `invokevirtual Kid.introduce`. The JVM puts that reference into slot 0 of the new stack frame. Every `this.name` inside becomes "load slot 0, read field `name`".',
      'Constructors get the same hidden parameter: the fresh object that `new` made a moment before. Static methods do not get it, which is why `this` does not compile inside them.'
    ],
    tryIt: {
      steps: [
        'Copy `ThisDemo.java` and run it.',
        'In the constructor, change `this.age = age;` to `age = age;`.',
        'Run again and look at the first two lines and the last line.'
      ],
      see: '`I am 0` for both kids, and `older: Ana`, because both ages stay at the default `0` and `0 >= 0` is true. Put `this.` back and the ages return.'
    },
    check: [
      { q: 'In `ben.greet(ana)`, what is `this` and what is `other`?', a: '`this` is Ben, the object before the dot. `other` is Ana, the argument.' },
      { q: 'Why does `name = name;` in a constructor leave the field `null`?', a: 'The parameter `name` shadows the field. Both sides mean the parameter, so it is assigned to itself. `this.name = name;` writes the field.' },
      { q: 'Can you use `this` inside `public static void main`?', a: 'No. A static method does not run on an object, so there is no current object and no `this`. Make an object with `new` and use that.' }
    ],
    keyPoints: [
      '`this` is the current object: the one before the dot in the call.',
      '`this.field` reaches the field when a parameter has the same name.',
      'Pass `this` to give the current object to another method.',
      '`return this;` lets callers chain calls: `order.add("a").add("b")`.',
      'Static methods have no `this`.'
    ],
    commonMistakes: [
      '`name = name;` in a constructor or setter. Write `this.name = name;`.',
      'Using `this` in `static void main`. Make an object first (`Kid ana = new Kid("Ana", 7);`) and call methods on it.',
      'Mixing up `this.name` and `other.name` in a method with a parameter of the same class. Read `this` as "me" and the parameter as "the other one".',
      'Confusing `this(...)` (call another constructor) with `this.` (reach a member). `this(...)` works only as the first line of a constructor.'
    ],
    related: ['Constructors', 'Methods That Use Fields', 'Instance vs static', 'Strings']
  }]);
})();
