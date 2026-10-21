// Interfaces, lesson 9 (Deeper): method references, the even shorter form of a lambda.
(function () {
  Java.addCoreLessons('interfaces', [
    {
      id: 'method-references',
      title: 'Method References',
      category: 'deeper',
      icon: '::',
      tagline: 'Point at a method instead of writing a lambda',
      realWorld: 'Instead of telling a friend the whole recipe again, you say: "Do it like page 12 of Grandma\'s cookbook." You point at instructions that already exist.',
      kid: [
        'Your sticky note says: "take the word and tell me its length". But there is already a button for that on every word: the **length** button.',
        'So you write a shorter note: "use the length button". That is a **method reference**: you point at a method that already exists, with two colons `::`.'
      ],
      definition: 'A **method reference** like `String::length` or `System.out::println` is a short form of a lambda that only calls one existing method. It creates an object of a functional interface, exactly like the lambda it replaces.',
      explain: [
        'Many lambdas only pass their parameters on to one method: `w -> w.length()`, `s -> System.out.println(s)`. Java lets you write only the method: `String::length`, `System.out::println`. The `::` means "this method, as a function object".',
        'There are four kinds. A **static method**: `Integer::parseInt` means `s -> Integer.parseInt(s)`. A method of **a particular object**: `System.out::println` means `x -> System.out.println(x)`. A method of **any object of a type**: `String::length` means `s -> s.length()` (the first parameter becomes the object). A **constructor**: `ArrayList::new` means `() -> new ArrayList<>()`.',
        'Like a lambda, a method reference needs a target type. `Function<String, Integer> f = String::length;` works because `length()` takes a String (as the object) and returns an int.',
        'Method references shine together with the static and default methods of `Comparator`: `Comparator.comparing(Player::score)` builds a comparator that compares scores, and `.thenComparing(Player::name)` breaks ties by name. This reads almost like English.'
      ],
      why: 'When a lambda only forwards to one method, the reference is shorter and names the action directly.',
      whenUse: 'Whenever your lambda is "call this one method with these arguments". Keep a lambda when it does anything more (two calls, maths, a condition).',
      syntax: '`ClassName::staticMethod` · `object::method` · `ClassName::instanceMethod` · `ClassName::new`',
      fileName: 'References.java',
      code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;

record Player(String name, int score) {}

public class References {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>(List.of("pear", "fig", "apple"));

        words.forEach(System.out::println);           // x -> System.out.println(x)

        Function<String, Integer> length = String::length;   // s -> s.length()
        System.out.println("apple has " + length.apply("apple") + " letters");

        Function<String, Integer> parse = Integer::parseInt; // s -> Integer.parseInt(s)
        System.out.println(parse.apply("41") + 1);

        List<Player> players = new ArrayList<>(List.of(
            new Player("Mia", 42), new Player("Ava", 17), new Player("Leo", 42)));
        players.sort(Comparator.comparing(Player::score).thenComparing(Player::name));
        players.forEach(p -> System.out.println(p.score() + " " + p.name()));
    }
}`,
      output: `pear
fig
apple
apple has 5 letters
42
17 Ava
42 Leo
42 Mia`,
      codeSummary: 'Each `::` replaces a lambda that only calls one method. The last sort uses method references to build a comparator: by score, then by name.',
      codeExplanation: [
        { label: 'Line 12', code: 'words.forEach(System.out::println);           // x -> System.out.println(x)', text: 'A method of one particular object, `System.out`. `forEach` hands each word to `println`.' },
        { label: 'Line 14', code: 'Function<String, Integer> length = String::length;   // s -> s.length()', text: 'A method of any String: the parameter becomes the object the method is called on.' },
        { label: 'Line 15', code: 'System.out.println("apple has " + length.apply("apple") + " letters");', text: '`apply` runs the reference, so `"apple".length()` is called.' },
        { label: 'Line 17', code: 'Function<String, Integer> parse = Integer::parseInt; // s -> Integer.parseInt(s)', text: 'A static method. The parameter is passed as the argument.' },
        { label: 'Line 18', code: 'System.out.println(parse.apply("41") + 1);', text: 'The text `"41"` becomes the number 41, plus 1 prints `42`.' },
        { label: 'Line 22', code: 'players.sort(Comparator.comparing(Player::score).thenComparing(Player::name));', text: '`comparing` (a static method of Comparator) takes a function that picks the sort key. `thenComparing` (a default method) breaks ties.' },
        { label: 'Line 23', code: 'players.forEach(p -> System.out.println(p.score() + " " + p.name()));', text: 'This one stays a lambda: it does more than call one method, so there is no reference for it.' }
      ],
      sections: [
        {
          title: 'The four kinds side by side',
          table: {
            head: ['Kind', 'Method reference', 'Same as the lambda'],
            rows: [
              ['static method', '`Integer::parseInt`', '`s -> Integer.parseInt(s)`'],
              ['method of one object', '`System.out::println`', '`x -> System.out.println(x)`'],
              ['method of any object of a type', '`String::toUpperCase`', '`s -> s.toUpperCase()`'],
              ['two parameters, first is the object', '`String::compareTo`', '`(a, b) -> a.compareTo(b)`'],
              ['constructor', '`ArrayList::new`', '`() -> new ArrayList<>()`']
            ],
            note: 'You never write the brackets: `String::length`, not `String::length()`.'
          }
        },
        {
          title: 'How Java matches a reference to the interface',
          mermaid: `flowchart TD
  A["f = String::length (a Function from String to Integer)"] --> B["target method: Integer apply(String s)"]
  B --> C{"Is length static?"}
  C -- no --> D["use s as the object: s.length()"]
  D --> E["returns int, boxed to Integer"]
  E --> F["f.apply(s) means s.length()"]`,
          diagramNote: 'The compiler reads the one abstract method of the target interface and checks that the referenced method fits its parameters and its return type.'
        },
        {
          title: 'Constructor references and Supplier',
          text: [
            'A `Supplier<T>` makes a new value each time `get()` is called. `ArrayList::new` is a constructor reference that fits it. `Player::new` would fit a `BiFunction<String, Integer, Player>`, because the record constructor takes a String and an int.'
          ],
          fileName: 'Factories.java',
          code: `import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Supplier;

record Player(String name, int score) {}

public class Factories {
    public static void main(String[] args) {
        Supplier<List<String>> newList = ArrayList::new;
        List<String> a = newList.get();
        List<String> b = newList.get();
        a.add("only in a");
        System.out.println(a + " " + b);

        BiFunction<String, Integer, Player> make = Player::new;
        System.out.println(make.apply("Zoe", 7));
    }
}`,
          output: `[only in a] []
Player[name=Zoe, score=7]`
        },
        {
          title: 'When a lambda reads better',
          text: [
            'A method reference is not always clearer. Use it when it names the action; keep the lambda when it would hide what happens.'
          ],
          table: {
            head: ['Lambda', 'Reference', 'Pick'],
            rows: [
              ['`s -> s.trim()`', '`String::trim`', 'reference'],
              ['`p -> p.score()`', '`Player::score`', 'reference'],
              ['`s -> s.length() > 3`', 'none possible', 'lambda'],
              ['`x -> System.out.println("- " + x)`', 'none possible', 'lambda']
            ]
          },
          tip: 'Your IDE (IntelliJ, VS Code) offers "Replace lambda with method reference" when it fits. Accept it only if the result reads better to you.'
        }
      ],
      technical: [
        'A method reference compiles to the same `invokedynamic` instruction as a lambda. The difference: no hidden `lambda$…` method is needed, because the target method already exists. `LambdaMetafactory` links the interface method straight to it.',
        '`System.out::println` evaluates `System.out` **once**, when the reference is created, and keeps that object. A lambda `x -> System.out.println(x)` reads `System.out` again on every call.',
        '`Comparator.comparing(Player::score)` is a static interface method. It returns a new comparator, a lambda inside the JDK that calls your key function on both players and compares the results. Because `score()` returns an `int`, Java boxes it to `Integer`; `Comparator.comparingInt` avoids that boxing.'
      ],
      tryIt: {
        steps: [
          'Run `References.java`.',
          'Replace `words.forEach(System.out::println);` with `words.sort(String::compareTo);` followed by the print line again.',
          'Change the player sort to `Comparator.comparing(Player::name)` and run.',
          'Add `.reversed()` after `comparing(Player::score)` and run once more.'
        ],
        see: 'the words in alphabetical order (apple, fig, pear), then the players sorted by name (Ava, Leo, Mia), and with `reversed()` the score 42 first.'
      },
      check: [
        { q: 'Write `s -> s.toUpperCase()` as a method reference.', a: '`String::toUpperCase`' },
        { q: 'What does `Comparator.comparing(Player::score)` give you?', a: 'A `Comparator<Player>` that orders players by their score.' },
        { q: 'Why is there no method reference for `s -> s.length() > 3`?', a: 'The lambda does more than call one method: it also compares with 3. A method reference can only point at one method.' }
      ],
      keyPoints: [
        '`::` points at an existing method and turns it into a functional interface object.',
        'Four kinds: static, one object, any object of a type, constructor (`::new`).',
        'It needs a target type, like a lambda.',
        '`Comparator.comparing(X::key).thenComparing(X::other)` builds sort rules that read like English.'
      ],
      commonMistakes: [
        'Writing brackets: `String::length()`. Fix: `String::length`.',
        'Using a reference whose parameters do not fit: `Runnable r = String::length;` does not compile (no String to call it on). Fix: pick a matching interface such as `Function<String, Integer>`.',
        'Forcing a reference when a lambda is clearer. Fix: keep the lambda when it does more than one call.'
      ],
      related: ['lambdas', 'builtin-interfaces']
    }
  ]);
})();
