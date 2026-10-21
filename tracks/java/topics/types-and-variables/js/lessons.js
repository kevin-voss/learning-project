// Types & Variables: shared glossary, the empty lesson list and the topic practice.
// The lessons live one per file in js/values/, js/variables/ and js/deeper/.
// Each file pushes its lesson onto Java.topics.typesAndVariables.lessons, in page order.
Java.topics.typesAndVariables = Java.topics.typesAndVariables || {};

Java.topics.typesAndVariables.glossary = [
  { term: 'declare', definition: 'Tell Java a new variable exists: its type and its name, like int age;' },
  { term: 'initialize', definition: 'Give a variable its very first value, like int age = 9;' },
  { term: 'reassign', definition: 'Put a new value into a variable that already has one. The old value is gone.' },
  { term: 'primitive', definition: 'One of the 8 built-in simple types. The box holds the value itself.' },
  { term: 'reference type', definition: 'Every type that is not a primitive, such as String. The box holds an arrow to an object.' },
  { term: 'reference', definition: 'An arrow that points to an object on the heap.' },
  { term: 'literal', definition: 'A value written directly in code, such as 42, 3.5, true, \'A\' or "Java".' },
  { term: 'suffix', definition: 'A letter at the end of a number literal that sets its type: L for long, f for float.' },
  { term: 'var', definition: 'Lets the compiler work out the type of a local variable. The type is still fixed.' },
  { term: 'cast', definition: 'Changing a value to another type on purpose, written like (int) 9.8.' },
  { term: 'widening', definition: 'Converting a value to a bigger type, like int to long. Java does it for you.' },
  { term: 'narrowing', definition: 'Converting a value to a smaller type, like double to int. You must write a cast.' },
  { term: 'constant', definition: 'A value that never changes, usually written static final with a NAME_IN_CAPITALS.' },
  { term: 'scope', definition: 'The part of the code where a variable name exists.' },
  { term: 'overflow', definition: 'When a number goes past the biggest value its type can hold and wraps around.' },
  { term: 'stack', definition: 'The memory pile with one frame per running method. Local variables live there.' },
  { term: 'heap', definition: 'The big memory room where all objects live.' },
  { term: 'frame', definition: 'The space on the stack for one method call: its local variables.' },
  { term: 'garbage collector', definition: 'The part of the JVM that removes objects no reference points to.' },
  { term: 'null', definition: 'The value of a reference that points to no object at all.' },
  { term: 'NullPointerException', definition: 'The crash you get when you use a reference that is null.' },
  { term: 'wrapper class', definition: 'The object twin of a primitive: Integer for int, Double for double, and so on.' },
  { term: 'autoboxing', definition: 'Java turns a primitive into its wrapper object for you, like int 5 into Integer 5.' },
  { term: 'unboxing', definition: 'Java takes the primitive out of a wrapper object for you, like Integer 5 into int 5.' },
  { term: 'field', definition: 'A variable that belongs to a class or object, declared outside any method.' },
  { term: 'local variable', definition: 'A variable declared inside a method. It has no default value.' }
];

Java.topics.typesAndVariables.lessons = [];

Java.topics.typesAndVariables.tryIt = {
  steps: [
    'Make a file `AboutMe.java` with `public class AboutMe` and a `main` method.',
    'Declare four variables: your age (`int`), your height in metres (`double`), whether you like pizza (`boolean`) and your first letter (`char`).',
    'Add a `String name` and a constant `static final int BIRTH_YEAR` above `main`.',
    'Print everything in one line with `+`. Then reassign `age = age + 1;` and print the line again.',
    'Add `int half = age / 2;` and `double exactHalf = age / 2.0;` and print both.',
    'Compile with `javac AboutMe.java` and run with `java AboutMe`.'
  ],
  see: 'two lines with your values (the second with the new age), then a whole number half and a decimal half, for example `5` and `5.5`.'
};

Java.topics.typesAndVariables.check = [
  { q: 'Which type fits "how many apples are in the basket": `int`, `double` or `boolean`?', a: '`int`. You count apples in whole numbers, and `int` is the normal type for whole numbers.' },
  { q: 'What is wrong with `char letter = "A";`?', a: 'Double quotes make a `String`. A `char` needs single quotes: `char letter = \'A\';`.' },
  { q: 'What does `System.out.println(7 / 2);` print, and why?', a: '`3`. Both numbers are `int`, so Java does whole-number division and drops the `.5`. Write `7 / 2.0` to get `3.5`.' },
  { q: 'After `Box b = a; b.marbles = 9;` what is `a.marbles`?', a: '`9`. `a` and `b` are two references (arrows) to the same object. Only the arrow was copied.' },
  { q: 'Why does `Integer count = null; int n = count;` crash?', a: 'Unboxing calls `count.intValue()`, but `count` points to no object. That throws a `NullPointerException`.' }
];
