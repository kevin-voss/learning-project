Java.topics.typesAndVariables = Java.topics.typesAndVariables || {};

const typeGlossary = [
  { term: 'primitive', definition: 'A built-in simple value such as int or boolean. The box holds the value itself.' },
  { term: 'String', definition: 'Java’s class for text. It is an object, not a primitive.' },
  { term: 'literal', definition: 'A value written directly in code, such as 42, true or "Java".' },
  { term: 'var', definition: 'Lets Java guess the type of a local variable. The type still never changes.' },
  { term: 'casting', definition: 'Changing a value from one type to another on purpose, like (int) 9.8.' },
  { term: 'final', definition: 'A variable that can get a value only once.' },
  { term: 'scope', definition: 'The part of the code where a variable name exists.' },
  { term: 'int', definition: 'A whole number, like 7 or -3. The usual choice for counting.' },
  { term: 'long', definition: 'A whole number that can grow much bigger than int.' },
  { term: 'double', definition: 'A number with a decimal point, like 19.99. Not exact for money.' },
  { term: 'boolean', definition: 'A value that is only true or false.' },
  { term: 'char', definition: 'One single character, written with single quotes: \'A\'.' },
  { term: 'overflow', definition: 'When a number goes past the biggest value its box can hold and wraps around.' },
  { term: 'heap', definition: 'The memory room where objects live.' },
  { term: 'stack', definition: 'The memory pile for the method that is running now and its local variables.' },
  { term: 'reference', definition: 'An arrow that points to an object on the heap.' }
];

Java.topics.typesAndVariables.lessons = [
  {
    id: 'primitives',
    anim: 'boxes',
    title: 'Variables and Primitives',
    category: 'values',
    icon: 'int',
    tagline: 'A labelled box for one value',
    realWorld: 'A variable is a labelled box. The label is the name. The type is the shape of the box: a number box cannot hold text.',
    definition: 'You make a variable with a type, a name and a value: `int age = 9;`. Four types cover almost everything at the start: `int` for whole numbers, `double` for decimals, `boolean` for true/false and `char` for one letter.',
    why: 'Java checks the type before the program runs. A wrong value is caught early.',
    whenUse: 'Every time you need to remember a value for later.',
    syntax: 'type name = value;  For example `double price = 19.99;` or `boolean done = false;`.',
    primitiveTypes: [
      { name: 'int', size: '32 bits', range: 'about ±2 billion', defaultValue: '0', literalExamples: 'int age = 9;\nint score = 98;', whenUse: 'Counting things: age, score, number of items.', mistake: 'Very big numbers do not fit. See the Deeper part.', emphasis: true },
      { name: 'double', size: '64 bits', range: 'about 15 digits', defaultValue: '0.0', literalExamples: 'double price = 19.99;\ndouble height = 1.42;', whenUse: 'Measurements and averages.', mistake: 'Not exact. 0.1 + 0.2 is not exactly 0.3.', emphasis: true },
      { name: 'boolean', size: '1 yes/no', range: 'true or false', defaultValue: 'false', literalExamples: 'boolean done = false;\nboolean isAdult = age >= 18;', whenUse: 'Answers to yes/no questions.', mistake: 'Writing True. Java wants lowercase true.', emphasis: true },
      { name: 'char', size: '16 bits', range: 'one character', defaultValue: "'\\u0000'", literalExamples: "char grade = 'A';", whenUse: 'One letter or symbol.', mistake: 'Double quotes make a String, not a char.', emphasis: true }
    ],
    fileName: 'Primitives.java',
    code: `public class Primitives {
    public static void main(String[] args) {
        int age = 9;
        double height = 1.42;
        boolean likesPizza = true;
        char firstLetter = 'M';

        System.out.println(age);
        System.out.println(height);
        System.out.println(likesPizza);
        System.out.println(firstLetter);
    }
}`,
    keyPoints: ['Start with int, double, boolean and char.', 'Change a value with `age = 10;` (no type the second time).'],
    commonMistakes: ['Putting text in a number box: `int age = "nine";` does not compile.', 'Writing the type again when you change a value.'],
    related: ['Literals', 'Ranges and Overflow'],
    glossary: typeGlossary
  },
  {
    id: 'string',
    title: 'String',
    category: 'values',
    icon: '""',
    tagline: 'Text in double quotes',
    realWorld: 'A String is a printed label. You can read it, and you can print a new label from it. The old label never changes.',
    definition: '`String` holds text. Text goes in double quotes: `"Hi"`. The `+` sign glues texts together. A String is an object, so it has methods like `length()`.',
    why: 'Almost every program shows text to a person.',
    whenUse: 'Names, messages, anything a person reads.',
    syntax: '`String name = "Mia";` then `name.length()` gives 3.',
    fileName: 'StringsIntro.java',
    code: `public class StringsIntro {
    public static void main(String[] args) {
        String name = "Mia";
        String message = "Hello, " + name + "!";

        System.out.println(message);
        System.out.println(message.length());
    }
}`,
    keyPoints: ['String starts with a capital S.', 'Compare texts with `.equals(...)`, not `==`.'],
    commonMistakes: ['Single quotes around text. Those are for one char.'],
    related: ['Strings & Text'],
    glossary: typeGlossary
  },
  {
    id: 'literals',
    title: 'Literals',
    category: 'values',
    icon: '42',
    tagline: 'Values you type straight into code',
    realWorld: 'Writing 42 on a form is a literal. Looking the number up in another paper is a variable.',
    definition: 'A literal is a fixed value in your code: `42`, `3.14`, `true`, `\'A\'`, `"Java"`. The way you write it tells Java its type.',
    whenUse: 'Starting values and fixed numbers in your code.',
    syntax: 'Underscores make big numbers easier to read: `1_000_000`. Java ignores them.',
    fileName: 'Literals.java',
    code: `public class Literals {
    public static void main(String[] args) {
        int count = 42;
        int million = 1_000_000;
        double ratio = 0.75;
        boolean ready = true;
        String text = "Java 21";

        System.out.println(count + " " + million + " " + ratio + " " + ready + " " + text);
    }
}`,
    keyPoints: ['Decimals are double unless you say otherwise.', 'true and false are lowercase.'],
    commonMistakes: ['Writing 1,000 with a comma. Use 1_000.'],
    related: ['Variables and Primitives'],
    glossary: typeGlossary
  },
  {
    id: 'final',
    title: 'final',
    category: 'variables',
    icon: '!',
    tagline: 'Write it in ink',
    realWorld: 'Pencil can be erased. Ink cannot. A `final` variable is written in ink.',
    definition: 'A `final` variable gets a value once. After that, Java refuses to change it. Constants shared by a whole class are `static final` and written in CAPITALS.',
    why: 'It stops you from changing a value by accident.',
    whenUse: 'Values that should never change, like the number of lives in a game.',
    syntax: '`final int MAX_LIVES = 3;`',
    fileName: 'FinalVariables.java',
    code: `public class FinalVariables {
    static final int MAX_LIVES = 3;

    public static void main(String[] args) {
        final String player = "Mia";
        int lives = MAX_LIVES;
        lives = lives - 1;
        System.out.println(player + " has " + lives + " of " + MAX_LIVES + " lives");
    }
}`,
    keyPoints: ['final means: assign once.', 'Use CAPITALS for class constants.'],
    commonMistakes: ['Writing `MAX_LIVES = 4;` later. It does not compile.'],
    related: ['Scope'],
    glossary: typeGlossary
  },
  {
    id: 'scope',
    title: 'Scope',
    category: 'variables',
    icon: '{}',
    tagline: 'Where a name lives',
    realWorld: 'A name tag that only works inside one room. Outside the room, nobody knows that name.',
    definition: 'A variable lives only inside the `{ }` where you made it. When the block ends, the name is gone. A variable made inside a loop is new for each round.',
    why: 'Small rooms keep names from getting mixed up.',
    whenUse: 'Make each variable in the smallest block that needs it.',
    fileName: 'ScopeExample.java',
    code: `public class ScopeExample {
    public static void main(String[] args) {
        int total = 0;

        for (int i = 1; i <= 3; i++) {
            int doubled = i * 2;
            total = total + doubled;
        }

        System.out.println("Total: " + total);
        // System.out.println(doubled);  <- does not compile: doubled is gone
    }
}`,
    keyPoints: ['A variable lives inside its { }.', 'Declare it where you first need it.'],
    commonMistakes: ['Using a loop variable after the loop ended.'],
    related: ['Blocks', 'Control Flow'],
    glossary: typeGlossary
  },
  {
    id: 'stack-heap-references',
    title: 'Stack, Heap, References',
    category: 'variables',
    icon: 'mem',
    tagline: 'Where values really live',
    realWorld: 'The stack is your desk: sticky notes for the job you are doing right now. The heap is a storage room for big things (objects). A reference is a sticky note that says "the bike is on shelf 7".',
    definition: 'Local variables sit on the stack. Objects live on the heap. An object variable does not hold the object. It holds a reference, an arrow to the object. Copying a primitive copies the value. Copying an object variable copies only the arrow.',
    why: 'It explains why changing an object through one variable also changes it for the other.',
    whenUse: 'When object changes, `==` on objects, or `null` errors surprise you.',
    syntax: '`int b = a;` makes a second box with the same number. `Student b = a;` makes a second arrow to the same student.',
    fileName: 'StackHeapReferences.java',
    code: `public class StackHeapReferences {
    static class Student {
        String name;
        Student(String name) { this.name = name; }
    }

    public static void main(String[] args) {
        int firstCount = 3;
        int secondCount = firstCount;
        secondCount = 9;

        Student first = new Student("Ari");
        Student second = first;
        second.name = "Mina";

        System.out.println(firstCount);  // 3
        System.out.println(first.name);  // Mina
    }
}`,
    visualLabel: 'Stack and heap',
    visualHtml: `
          <div class="reference-diagram">
            <div class="memory-zone">
              <div class="memory-title">Stack: main</div>
              <div class="memory-box"><strong>firstCount</strong><span>3</span></div>
              <div class="memory-box"><strong>secondCount</strong><span>9 (its own copy)</span></div>
              <div class="memory-ref">
                <div class="memory-box"><strong>first</strong><span>arrow</span></div>
                <div class="memory-arrow">-></div>
                <div class="memory-box"><strong>Student</strong><span>name = "Mina"</span></div>
              </div>
              <div class="memory-ref">
                <div class="memory-box"><strong>second</strong><span>same arrow</span></div>
                <div class="memory-arrow">-></div>
                <div class="memory-box"><strong>same Student</strong><span>no copy was made</span></div>
              </div>
            </div>
          </div>`,
    keyPoints: ['Primitive copy: the value is copied.', 'Object copy: only the arrow is copied.', 'The garbage collector cleans objects nobody points to.'],
    commonMistakes: ['Expecting `Student second = first;` to make a new student.'],
    related: ['Classes & Objects', 'JVM & Memory'],
    glossary: typeGlossary
  }
];

Java.topics.typesAndVariables.tryIt = {
  steps: [
    'Make `AboutMe.java` with a `main` method.',
    'Make four variables: your age (`int`), your height in metres (`double`), whether you like pizza (`boolean`) and your first letter (`char`).',
    'Print them in one line with `+`. Then change the age and print again.'
  ],
  see: 'one line with your four values, then the same line with the new age.'
};

Java.topics.typesAndVariables.check = [
  { q: 'Which type fits "how many apples": `int`, `double` or `boolean`?', a: '`int`. Apples are counted in whole numbers.' },
  { q: 'What is wrong with `char letter = "A";`?', a: 'Double quotes make a String. A char needs single quotes: `\'A\'`.' },
  { q: 'After `Student b = a; b.name = "Zoe";` what is `a.name`?', a: '"Zoe". `a` and `b` are two arrows to the same student.' }
];
