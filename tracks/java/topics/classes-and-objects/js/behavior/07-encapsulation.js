(function () {
  const terms = Java.topicDetails['classes-and-objects'].glossary;

  Java.addCoreLessons('classes-and-objects', [{
    id: 'encapsulation',
    title: 'Encapsulation: private, Getters, Setters',
    category: 'practice',
    icon: 'E',
    tagline: 'Hide the fields, guard the rules',
    glossary: terms,
    realWorld: 'A bank counter with a glass window. You cannot reach into the safe yourself. You ask the clerk: "Please put 20 in", "How much do I have?", "I want 500 out". The clerk checks every wish before anything happens.',
    kid: [
      'Your sweets jar sits on a high shelf. You cannot reach it. You have to ask Grandma.',
      'If you ask "One sweet, please", Grandma gives you one. If you ask "Fifty sweets, please", Grandma says "No, that is too many". Grandma guards the jar and its rules.',
      'In Java, the jar is a **private** field: nobody outside the class can touch it. Grandma is a **method**: you ask the method, and the method decides. Hiding the jar and letting only the methods use it is called **encapsulation**.'
    ],
    definition: '**Encapsulation** means: make the fields `private`, so only the code of the class itself can use them, and let others work with the object only through its methods. A **getter** returns a field’s value, a **setter** changes it after checking the new value.',
    explain: [
      'The keyword `private` in front of a field means "only code inside this class may read or write it". Code in `main` or in another class that writes `account.balance` no longer compiles.',
      'Others still need to read the data. For that you write a **getter**: a small public method like `int getBalance() { return balance; }`. For a `boolean` field the getter usually starts with `is`: `isLocked()`.',
      'To allow changes, you write a **setter** like `void setAge(int age)`. The big win: the setter can check the value first and refuse a bad one (a negative age, an empty name). This check is called **validation**.',
      'You do not need a setter for every field. A bank account has no `setBalance`; it has `deposit` and `withdraw`, commands that follow the rules. A field with only a getter is **read-only** for everyone outside.',
      'A rule that must always be true for an object, like "the balance is never negative", is called an **invariant**. With private fields and checking methods, the class can promise its invariants, because no other code can break them.',
      'Here a method refuses a bad value by printing a message and returning `false`. Real programs often stop with an error instead: `throw new IllegalArgumentException("age must not be negative");`. You learn `throw` in [Exceptions](../exceptions/index.html).'
    ],
    why: 'With public fields, any line anywhere in the program can put nonsense into an object, and you have to search the whole program to find out who did it. With private fields, only the class can change its data, so all the rules live in one place.',
    whenUse: 'Make fields `private` by default, in every class. Add a getter when others need to read a value. Add a setter or a command only when others really need to change it, and check the value there.',
    syntax: '`private type field;` plus `public type getField() { return field; }` and `public void setField(type value) { if (valid) field = value; }`.',
    fileName: 'BankDemo.java',
    code: `public class BankDemo {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("Ada", 100);

        account.deposit(50);
        account.deposit(-20);         // refused
        account.withdraw(500);        // refused
        account.withdraw(30);

        System.out.println(account.getOwner() + " has " + account.getBalance());
        // account.balance = -500;    // does not compile: balance is private
    }
}

class BankAccount {
    private final String owner;   // read-only: no setter
    private int balance;          // changed only by deposit and withdraw

    public BankAccount(String owner, int startBalance) {
        this.owner = owner;
        this.balance = Math.max(0, startBalance);   // never start below 0
    }

    public String getOwner() { return owner; }
    public int getBalance() { return balance; }

    public void deposit(int amount) {
        if (amount <= 0) {
            System.out.println("refused: deposit must be positive");
            return;
        }
        balance += amount;
    }

    public void withdraw(int amount) {
        if (amount <= 0 || amount > balance) {
            System.out.println("refused: cannot take " + amount);
            return;
        }
        balance -= amount;
    }
}`,
    output: `refused: deposit must be positive
refused: cannot take 500
Ada has 120`,
    codeSummary: 'The fields of `BankAccount` are private. `main` can only use the public methods, and those methods refuse every wish that would break the rule "the balance is never negative".',
    codeExplanation: [
      { label: 'Line 6', code: 'account.deposit(-20);         // refused', text: 'A bad wish. The method checks it and refuses, so the balance stays correct.' },
      { label: 'Line 10', code: 'System.out.println(account.getOwner() + " has " + account.getBalance());', text: '`main` reads the private fields only through the getters.' },
      { label: 'Line 11', code: '// account.balance = -500;    // does not compile: balance is private', text: 'Remove the `//` and `javac` says `error: balance has private access in BankAccount`.' },
      { label: 'Line 16', code: 'private final String owner;   // read-only: no setter', text: '`private`: only this class sees it. `final`: it is set once in the constructor and never changes. With only a getter, it is read-only.' },
      { label: 'Line 17', code: 'private int balance;          // changed only by deposit and withdraw', text: 'There is no `setBalance`. The only ways to change it are the two commands that check the rules.' },
      { label: 'Line 21', code: 'this.balance = Math.max(0, startBalance);   // never start below 0', text: 'The constructor protects the rule too. `Math.max(0, x)` gives `x`, or `0` if `x` is negative.' },
      { label: 'Line 24', code: 'public String getOwner() { return owner; }', text: 'A getter: public, no parameters, returns the field. Written in one line because it is so short.' },
      { label: 'Line 28', code: 'if (amount <= 0) {', text: 'Validation: check the value before it can change the state.' },
      { label: 'Line 30', code: 'return;', text: 'In a `void` method, `return;` ends the method at once. The line `balance += amount;` is not reached.' },
      { label: 'Line 36', code: 'if (amount <= 0 || amount > balance) {', text: 'The rule "never below zero" lives here, in one place, for every caller.' }
    ],
    sections: [
      {
        title: 'The problem with public fields',
        text: [
          'Without `private`, any code can write anything into the fields. The class has methods with good checks, but nobody is forced to use them.'
        ],
        fileName: 'OpenSafe.java',
        code: `public class OpenSafe {
    public static void main(String[] args) {
        Account account = new Account();
        account.deposit(100);
        account.balance = -500;     // nobody stops this
        System.out.println("balance: " + account.balance);
    }
}

class Account {
    int balance;                    // not private: everybody can change it

    void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}`,
        output: 'balance: -500',
        warn: 'The check in `deposit` is worthless when the field is open. In a big program, finding the one line that wrote `-500` can take hours.'
      },
      {
        title: 'private closes the door',
        text: [
          'Put `private` in front of the field and the compiler refuses every access from outside the class. The error appears when you compile, long before a customer sees a negative balance.'
        ],
        fileName: 'Thief.java',
        codeLanguage: 'plaintext',
        code: `$ javac Thief.java
Thief.java:4: error: balance has private access in Account
        acc.balance = -500;
           ^
1 error`,
        tip: '`private` is about **classes**, not objects. Code inside `Account` may read the private `balance` of **another** `Account` object, for example in `boolean isRicherThan(Account other) { return balance > other.balance; }`.'
      },
      {
        title: 'Getters and setters with checks',
        text: [
          'A setter is the safe door for changes. It checks the value and only then writes the field. The naming is a strong Java habit that tools and libraries rely on.'
        ],
        table: {
          head: ['Field', 'Getter', 'Setter'],
          rows: [
            ['`private String name;`', '`public String getName()`', '`public void setName(String name)`'],
            ['`private int age;`', '`public int getAge()`', '`public void setAge(int age)`'],
            ['`private boolean active;`', '`public boolean isActive()`', '`public void setActive(boolean active)`']
          ]
        },
        fileName: 'PersonDemo.java',
        code: `public class PersonDemo {
    public static void main(String[] args) {
        Person person = new Person("Mia", 7);
        person.setAge(8);
        person.setAge(-3);          // refused
        person.setName("   ");      // refused
        System.out.println(person.getName() + " is " + person.getAge());
    }
}

class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        setName(name);              // the constructor uses the same checks
        setAge(age);
    }

    public String getName() { return name; }
    public int getAge() { return age; }

    public void setName(String name) {
        if (name == null || name.isBlank()) {
            System.out.println("refused: empty name");
            return;
        }
        this.name = name;
    }

    public void setAge(int age) {
        if (age < 0 || age > 150) {
            System.out.println("refused: age " + age);
            return;
        }
        this.age = age;
    }
}`,
        output: `refused: age -3
refused: empty name
Mia is 8`,
        tip: 'Calling the setters from the constructor means the checks exist only once. `isBlank()` (a `String` method) is `true` for `""` and for text made only of spaces.'
      },
      {
        title: 'Draw it: minus is private, plus is public',
        text: [
          'In a class diagram, `-` marks a private member and `+` a public one. A well-encapsulated class has a column of `-` fields and a column of `+` methods.'
        ],
        mermaid: `classDiagram
  class BankAccount {
    -String owner
    -int balance
    +BankAccount(String owner, int startBalance)
    +getOwner() String
    +getBalance() int
    +deposit(int amount) void
    +withdraw(int amount) void
  }`,
        diagramNote: 'Everything with `-` is hidden. Other classes see only the `+` part: that public part is the **interface** of the class to the outside world.'
      },
      {
        title: 'Not every field needs a setter',
        text: [
          'Writing a getter and a setter for every field out of habit gives you public fields with extra steps. Ask for each field: who needs to change it, and how?'
        ],
        table: {
          head: ['Field', 'Good choice', 'Why'],
          rows: [
            ['`id`, `owner`, date of birth', 'Getter only, `final` field', 'It never changes after the object is made'],
            ['`balance`, `stock`, `score`', 'Getter + commands (`deposit`, `addPoints`)', 'Changes must follow rules, not "set to anything"'],
            ['`name`, `email`, `nickname`', 'Getter + setter with validation', 'It may change, but only to valid values'],
            ['A helper value like a cache', 'No getter, no setter', 'Nobody outside needs it']
          ]
        }
      }
    ],
    technical: [
      'The compiler checks `private` when you compile: every access from another class is an error. The `.class` file also stores an access flag for every field and method, and the JVM checks it again when it loads and links your classes, so even other tools cannot sneak around it by accident.',
      '`private` works per class. All code inside `BankAccount` may use the private fields of any `BankAccount` object, which is what makes methods like `isRicherThan(Account other)` and copy constructors possible.',
      'Getters cost nothing in speed. The JIT compiler (the part of the JVM that turns hot bytecode into machine code while the program runs) replaces a short method like `getBalance()` with the field read itself. This is called **inlining**.'
    ],
    tryIt: {
      steps: [
        'Copy `BankDemo.java` and run it.',
        'Remove the `//` in front of `account.balance = -500;` and compile with `javac BankDemo.java`.',
        'Put the `//` back. Add a method `public boolean isRich()` that returns `balance >= 1000`.',
        'In `main`, deposit `900` and print `account.isRich()`.'
      ],
      see: 'first the compile error `balance has private access in BankAccount`, then `true` after the deposit (120 + 900 = 1020).'
    },
    check: [
      { q: 'What does `private` on a field mean, exactly?', a: 'Only code inside the same class may read or write it. Code in other classes gets a compile error.' },
      { q: 'Why does `BankAccount` have no `setBalance(int)`?', a: 'A setter would let anybody set any balance, even a negative one. `deposit` and `withdraw` change the balance only in ways that follow the rules.' },
      { q: 'What is the name of the getter for `private boolean open;`?', a: '`isOpen()`. Boolean getters start with `is` by convention.' }
    ],
    keyPoints: [
      'Make fields `private`; others use the object only through its methods.',
      'A getter returns a field, a setter changes it after validation.',
      'Prefer meaningful commands (`deposit`) over plain setters (`setBalance`).',
      'A field with only a getter (often `final`) is read-only.',
      'Validate in the constructor too, ideally by calling the same checks.'
    ],
    commonMistakes: [
      '`public int balance;` "to keep it simple". Make it `private int balance;` and add the methods others need.',
      'A setter without a check: `void setAge(int age) { this.age = age; }` accepts `-3`. Check the value first.',
      'Generating a setter for every field. Leave out setters for values that must not change (`id`, `owner`) and make those fields `final`.',
      'Checking in the setter but not in the constructor: `new Person("Mia", -3)` slips through. Call the setter from the constructor.',
      'Getter that returns the wrong thing: `int getAge() { return age++; }` changes the state. A getter only reads.'
    ],
    related: ['Methods That Use Fields', 'Access Modifiers', 'Constructors', 'Exceptions']
  }]);
})();
