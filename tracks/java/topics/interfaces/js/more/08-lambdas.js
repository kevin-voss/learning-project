// Interfaces, lesson 8: functional interfaces and lambdas as the short form.
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'lambdas',
      title: 'Functional Interfaces and Lambdas',
      category: 'practice',
      icon: 'λ',
      tagline: 'A whole class in one line',
      realWorld: 'A sticky note on the fridge: "water the plants". You do not write a full letter with an address and a signature. The note is the job, nothing more.',
      kid: [
        'Your friend wants a rule for a game: "Who wins, the bigger number or the smaller?"',
        'You could write a whole letter: "Dear friend, here is my rule, it is called BiggerWins, it has one part, the part says…" Or you could write on a sticky note: "bigger wins".',
        'When a promise has only **one** job, Java lets you write the sticky note. That note is a **lambda**.'
      ],
      definition: 'A **functional interface** is an interface with exactly **one** abstract method. A **lambda** like `(a, b) -> Integer.compare(a.length(), b.length())` is a short way to create an object of such an interface: you write only the parameters and the body of that one method.',
      explain: [
        'In the last lesson you wrote a whole class `ByName implements Comparator<Player>` only to hold one `compare` method. Because `Comparator` has only one abstract method, Java knows which method you mean. So you may leave out everything except the important part.',
        'A lambda has three parts: the **parameters** in brackets, the arrow `->`, and the **body**. `(a, b) -> a + b` takes `a` and `b` and returns `a + b`. With one parameter you may drop the brackets: `w -> w.length()`. With none you write `()`: `() -> System.out.println("hi")`.',
        'A lambda has no type of its own. It gets its type from where you put it, the **target type**. In `Comparator<String> byLength = (a, b) -> …`, the target is `Comparator<String>`, so Java knows that `a` and `b` are Strings and that the body must return an `int`.',
        'The JDK has a package `java.util.function` full of ready functional interfaces: `Predicate<T>` (a yes/no test), `Function<T, R>` (turn a T into an R), `Consumer<T>` (do something with a T), `Supplier<T>` (make a T). Methods like `list.removeIf(…)` and `list.forEach(…)` take them as parameters.',
        'Mark your own functional interfaces with `@FunctionalInterface`. Then the compiler makes sure it keeps exactly one abstract method. (`default` and `static` methods do not count.)'
      ],
      why: 'Many JDK methods want a small piece of behaviour: a sort rule, a test, a job. A lambda passes that behaviour in one line instead of a whole class.',
      whenUse: 'Whenever a method takes a functional interface: `sort`, `removeIf`, `forEach`, `new Thread(…)`, `Comparator.comparing(…)`, and your own one-method interfaces.',
      syntax: '`(parameters) -> expression` · `(parameters) -> { statements; return value; }` · `x -> x * 2` · `() -> doSomething()`',
      fileName: 'Lambdas.java',
      code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Lambdas {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(List.of("banana", "fig", "cherry", "kiwi"));

        // A Comparator written as a lambda: (a, b) -> an int
        Comparator<String> byLength = (a, b) -> Integer.compare(a.length(), b.length());
        words.sort(byLength);
        System.out.println("by length: " + words);

        words.sort(byLength.reversed());       // default method, still works
        System.out.println("longest first: " + words);

        // A Runnable written as a lambda: () -> no result
        Runnable hello = () -> System.out.println("Hello from a lambda");
        hello.run();

        // removeIf takes a Predicate: w -> true or false
        words.removeIf(w -> w.length() < 4);
        System.out.println("4 letters or more: " + words);

        // forEach takes a Consumer: w -> do something
        words.forEach(w -> System.out.println("- " + w.toUpperCase()));
    }
}`,
      output: `by length: [fig, kiwi, banana, cherry]
longest first: [banana, cherry, kiwi, fig]
Hello from a lambda
4 letters or more: [banana, cherry, kiwi]
- BANANA
- CHERRY
- KIWI`,
      codeSummary: 'Four lambdas for four different functional interfaces: a `Comparator`, a `Runnable`, a `Predicate` (for `removeIf`) and a `Consumer` (for `forEach`).',
      codeExplanation: [
        { label: 'Line 10', code: 'Comparator<String> byLength = (a, b) -> Integer.compare(a.length(), b.length());', text: 'The target type `Comparator<String>` tells Java: this lambda is `compare(String a, String b)` and returns an `int`.' },
        { label: 'Line 11', code: 'words.sort(byLength);', text: '`sort` calls the lambda whenever it must compare two words. Words of the same length keep their old order (the sort is stable).' },
        { label: 'Line 14', code: 'words.sort(byLength.reversed());       // default method, still works', text: 'A lambda is a real `Comparator` object, so its default methods like `reversed()` work.' },
        { label: 'Line 18', code: 'Runnable hello = () -> System.out.println("Hello from a lambda");', text: '`()` means no parameters. The body runs only when somebody calls `run()`.' },
        { label: 'Line 19', code: 'hello.run();', text: 'Now the body runs. Creating a lambda does not run it.' },
        { label: 'Line 22', code: 'words.removeIf(w -> w.length() < 4);', text: 'One parameter, no brackets needed. `removeIf` wants a `Predicate<String>`: a test that returns `true` for words to remove.' },
        { label: 'Line 26', code: 'words.forEach(w -> System.out.println("- " + w.toUpperCase()));', text: '`forEach` (a default method of `Iterable`) calls the lambda once per element.' }
      ],
      sections: [
        {
          title: 'From a class to a lambda in three steps',
          text: [
            'Both objects below do exactly the same. The lambda is what is left when you remove everything Java can guess.'
          ],
          bullets: [
            'Step 1, the full class: `class ByLength implements Comparator<String> { public int compare(String a, String b) { return Integer.compare(a.length(), b.length()); } }`',
            'Step 2, drop the class name, `implements`, the method name and the types: Java knows them from the target type.',
            'Step 3, one expression in the body? Drop `{ }` and `return`: `(a, b) -> Integer.compare(a.length(), b.length())`.'
          ],
          mermaid: `flowchart TD
  A["(a, b) -> Integer.compare(a.length(), b.length())"] --> B["target type: Comparator of String"]
  B --> C["its one abstract method: int compare(String a, String b)"]
  C --> D["a and b are Strings, the body must give an int"]
  D --> E["Java builds an object whose compare runs the body"]
  E --> F["words.sort(byLength) calls compare again and again"]`,
          diagramNote: 'The lambda text alone says nothing about types. The variable or parameter it is assigned to fills in everything else.',
          fileName: 'ClassVsLambda.java',
          code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class ByLength implements Comparator<String> {
    @Override
    public int compare(String a, String b) {
        return Integer.compare(a.length(), b.length());
    }
}

public class ClassVsLambda {
    public static void main(String[] args) {
        Comparator<String> long1 = new ByLength();
        Comparator<String> short1 = (a, b) -> Integer.compare(a.length(), b.length());

        List<String> one = new ArrayList<>(List.of("ccc", "a", "bb"));
        List<String> two = new ArrayList<>(one);
        one.sort(long1);
        two.sort(short1);
        System.out.println(one + " " + two);
    }
}`,
          output: '[a, bb, ccc] [a, bb, ccc]'
        },
        {
          title: 'The shapes of a lambda',
          table: {
            head: ['Lambda', 'Parameters', 'Fits for example'],
            rows: [
              ['`() -> System.out.println("hi")`', 'none', '`Runnable`'],
              ['`w -> w.length() > 3`', 'one (no brackets)', '`Predicate<String>`'],
              ['`(a, b) -> a + b`', 'two', '`BinaryOperator<Integer>`, your `Calculator`'],
              ['`(String a, String b) -> a.compareTo(b)`', 'two, types written', '`Comparator<String>`'],
              ['`x -> { int y = x * 2; return y + 1; }`', 'one, block body', '`Function<Integer, Integer>`']
            ],
            note: 'A block body `{ … }` needs `return` (unless the method is `void`). An expression body has no `return` and no `;` inside.'
          }
        },
        {
          title: 'Your own functional interface',
          text: [
            'Any interface with exactly one abstract method takes lambdas, also your own. `@FunctionalInterface` is optional but protects you: add a second abstract method and the compiler says `Unexpected @FunctionalInterface annotation … multiple non-overriding abstract methods found`.',
            'Here the `Calculator` from the first lesson comes back, without the classes `Adder` and `Multiplier`.'
          ],
          fileName: 'TinyCalc.java',
          code: `@FunctionalInterface
interface Calculator {
    int apply(int a, int b);

    default String explain(int a, int b) {   // defaults are allowed
        return a + " and " + b + " give " + apply(a, b);
    }
}

public class TinyCalc {
    public static void main(String[] args) {
        Calculator add = (a, b) -> a + b;
        Calculator times = (a, b) -> a * b;
        Calculator biggest = (a, b) -> {
            if (a > b) return a;
            return b;
        };
        System.out.println(add.explain(6, 7));
        System.out.println(times.explain(6, 7));
        System.out.println(biggest.explain(6, 7));
    }
}`,
          output: `6 and 7 give 13
6 and 7 give 42
6 and 7 give 7`
        },
        {
          title: 'Ready-made functional interfaces',
          text: [
            'Before you write your own, look in `java.util.function`. Each interface has a different method name, which you call to run the lambda.'
          ],
          table: {
            head: ['Interface', 'Method', 'In → out', 'Example lambda'],
            rows: [
              ['`Predicate<T>`', '`test(t)`', 'T → boolean', '`n -> n % 2 == 0`'],
              ['`Function<T, R>`', '`apply(t)`', 'T → R', '`s -> s.length()`'],
              ['`Consumer<T>`', '`accept(t)`', 'T → nothing', '`s -> System.out.println(s)`'],
              ['`Supplier<T>`', '`get()`', 'nothing → T', '`() -> "default name"`'],
              ['`UnaryOperator<T>`', '`apply(t)`', 'T → T', '`s -> s.trim()`'],
              ['`BinaryOperator<T>`', '`apply(a, b)`', 'T, T → T', '`(a, b) -> a + b`']
            ]
          },
          fileName: 'Toolbox.java',
          code: `import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class Toolbox {
    public static void main(String[] args) {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Function<String, Integer> length = s -> s.length();
        Supplier<String> guest = () -> "anonymous";

        System.out.println(isEven.test(4) + " " + isEven.test(7));
        System.out.println(length.apply("lambda"));
        System.out.println("Hello, " + guest.get());
        System.out.println(isEven.negate().test(7));   // a default method of Predicate
    }
}`,
          output: `true false
6
Hello, anonymous
true`
        },
        {
          title: 'Wrong vs right: changing a local variable',
          text: [
            'A lambda may **read** local variables from around it, but only if they never change after they get their value. Java calls such a variable **effectively final**.',
            'Wrong: `int count = 0; Runnable tick = () -> count++;` gives `error: local variables referenced from a lambda expression must be final or effectively final`.',
            'Right: keep changing data inside an object, for example an array of one element or a field, or (better) let the lambda return a value instead of changing one.'
          ],
          fileName: 'Counter.java',
          code: `import java.util.List;

public class Counter {
    public static void main(String[] args) {
        List<String> words = List.of("sun", "moon", "star", "sky");
        int minLength = 4;                     // never changed: effectively final

        int[] count = { 0 };                   // the array variable never changes
        words.forEach(w -> {
            if (w.length() >= minLength) count[0]++;
        });
        System.out.println(count[0] + " words with " + minLength + "+ letters");
    }
}`,
          output: '2 words with 4+ letters'
        }
      ],
      technical: [
        'For a lambda the compiler does **not** write a separate `.class` file. It moves the body into a hidden private method of your class (named like `lambda$main$0`) and puts an `invokedynamic` instruction where the lambda stands.',
        'The first time that `invokedynamic` runs, the JVM asks a helper called `LambdaMetafactory` to build a small class at run time that implements the target interface and calls the hidden method. Later runs reuse it. A lambda that captures no variables is usually created only once and shared.',
        'Captured local variables are **copied** into the lambda object. That is why they must be effectively final: if the variable could still change, the copy and the original could disagree.',
        'The target type is decided by the compiler. The same text `(a, b) -> a + b` can be a `Calculator`, a `BinaryOperator<Integer>` or a `BiFunction<Integer, Integer, Integer>`, depending only on where you assign it.'
      ],
      tryIt: {
        steps: [
          'Run `Lambdas.java`.',
          'Write a comparator `Comparator<String> alphabetical = (a, b) -> a.compareTo(b);` and sort `words` with it.',
          'Write `Predicate<String> hasA = w -> w.contains("a");` and use `words.removeIf(hasA);`.',
          'Change `byLength` into a block body with `{ … return …; }` and check that the output stays the same.'
        ],
        see: 'the words in alphabetical order, then only the words without the letter "a". The block-body version prints the same as before.'
      },
      check: [
        { q: 'Why can `Comparator<String>` be written as a lambda, but not an interface with two abstract methods?', a: 'A lambda gives a body for exactly one method. With two abstract methods Java would not know which one the lambda is.' },
        { q: 'Write `Comparator<String> byLength` as a lambda.', a: '`Comparator<String> byLength = (a, b) -> Integer.compare(a.length(), b.length());`' },
        { q: 'Why does `int count = 0; Runnable r = () -> count++;` not compile?', a: 'A lambda may only use local variables that never change (effectively final). `count++` changes it.' }
      ],
      keyPoints: [
        'Functional interface = exactly one abstract method (defaults and statics do not count).',
        'Lambda = parameters, `->`, body. It is an object of the target interface.',
        'The target type gives the lambda its parameter types and its return type.',
        '`java.util.function` has ready ones: `Predicate`, `Function`, `Consumer`, `Supplier`.',
        'Creating a lambda does not run it; calling its method (`run`, `test`, `apply`, `compare`) does.'
      ],
      commonMistakes: [
        'A lambda without a target type: `var f = x -> x * 2;` does not compile. Fix: `Function<Integer, Integer> f = x -> x * 2;`.',
        'Forgetting `return` in a block body: `(a, b) -> { a + b; }`. Fix: `(a, b) -> { return a + b; }` or `(a, b) -> a + b`.',
        'Changing a captured local variable: `() -> count++`. Fix: return a value, or use a field or an object that holds the count.',
        'Expecting the lambda to run where it is written: `Runnable r = () -> save();` saves nothing yet. Fix: call `r.run()`.'
      ],
      related: ['builtin-interfaces', 'method-references', 'interface-promise']
    }
  ]);
})();
