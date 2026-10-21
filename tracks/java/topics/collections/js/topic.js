// Collections topic: details + lesson 1. More lessons load from js/lists/, js/sets-maps/ and js/choosing/.
(function () {
  Java.addCoreTopic('collections', {
    label: 'Collections',
    headline: 'Collections,',
    accent: 'flexible groups.',
    intro: 'Arrays have a fixed size. Collections grow, shrink, drop duplicates and find values by a key. You learn List, Set and Map step by step.',
    overview: 'Almost every real Java program keeps groups of things in collections. REST data, tests and projects all build on this topic.',
    tryIt: {
      steps: [
        'Make a file `FoodPrices.java` with a `public class FoodPrices` and a `main` method.',
        'Make a `List<String>` with three foods, for example `apple`, `bread` and `apple` again.',
        'Make a `Map<String, Integer>` that maps each food to a price with `put`.',
        'Loop over the list and print each food with its price from the map: `food + ": " + prices.get(food)`.',
        'Put the list into a `new HashSet<>(foods)` and print its `size()`.'
      ],
      see: 'three lines like `apple: 2`, and the set size `2`, because the set keeps `apple` only once.'
    },
    check: [
      { q: 'You need "all names, no duplicates". List, Set or Map?', a: 'A Set, for example `Set<String> names = new HashSet<>();`.' },
      { q: 'Why `List<Integer>` and not `List<int>`?', a: 'Collections hold objects only. `int` is a primitive, so you use its wrapper class `Integer`. Java boxes and unboxes for you.' },
      { q: 'What does `map.get("pear")` give when there is no pear?', a: '`null`. Use `getOrDefault("pear", 0)` or check `containsKey("pear")` first.' },
      { q: 'You have `List<Integer> nums = [5, 6, 7]`. What is left after `nums.remove(1)`?', a: '`[5, 7]`. `remove(1)` removes the element at **position** 1. To remove the value 1, write `nums.remove(Integer.valueOf(1))`.' },
      { q: 'Your loop removes elements with `list.remove(x)` inside a for-each and crashes. What is the safe way?', a: 'Use `list.removeIf(x -> rule)` or an `Iterator` and call `it.remove()`.' }
    ]
  }, [
    {
      id: 'why-collections',
      title: 'Why Collections?',
      category: 'concept',
      icon: '[ ]',
      tagline: 'Arrays have a fixed size',
      realWorld: 'An egg carton has exactly 12 holes. A bag of marbles takes as many marbles as you put in. An array is the egg carton. A collection is the bag.',
      kid: [
        'Imagine an egg carton with 3 holes. You put in 3 eggs. Now Grandma brings a fourth egg. There is no hole for it! You need a new, bigger carton and you must move every egg over.',
        'A bag is different. You drop in one marble, two marbles, ten marbles. The bag stretches. You can also take a marble out and the bag shrinks.',
        'Java has both. The array is the carton. A **collection** is the stretchy bag. Java even has different bags: one that keeps things in a line, one that never holds the same thing twice, and one with name tags, so you find things by their name.'
      ],
      definition: 'A **collection** is an object that holds a group of other objects and can grow and shrink while the program runs. Java ships a whole family of them in the package `java.util`, called the **Collections Framework**.',
      explain: [
        'You know [arrays](../arrays/index.html): `new String[3]` makes room for exactly 3 Strings. The size is fixed when you create the array. If you need a fourth slot, you must create a new array and copy everything over.',
        'A collection does that work for you. `ArrayList` is the most used one. You call `add` and it grows. You call `remove` and it shrinks. You ask `size()` how many elements it holds right now.',
        'The family has three big members. A **List** keeps elements in order and allows duplicates. A **Set** never holds the same element twice. A **Map** stores pairs: a **key** (like a name) and a **value** (like a phone number).',
        'Each member is an **interface**: a promise of which methods exist, like `add` and `size`. Real classes such as `ArrayList` or `HashSet` keep that promise. You meet interfaces properly in [Interfaces](../interfaces/index.html). For now: the interface is the job title, the class is the worker who does the job.',
        'All of them live in `java.util`, so a file that uses them starts with an `import` line such as `import java.util.ArrayList;`.'
      ],
      why: 'Real data rarely has a size you know in advance: users sign up, items land in a cart, words come from a file. Collections let your program handle any amount.',
      whenUse: 'Whenever the number of elements can change, when you need "no duplicates", or when you want to look things up by a key.',
      syntax: 'import java.util.ArrayList;   ArrayList<ElementType> name = new ArrayList<>();   name.add(value);   name.size();',
      fileName: 'WhyCollections.java',
      code: `import java.util.ArrayList;
import java.util.Arrays;

public class WhyCollections {
    public static void main(String[] args) {
        // An array: you choose the size once, and it never changes.
        String[] seats = new String[3];
        seats[0] = "Ada";
        seats[1] = "Kai";
        seats[2] = "Mina";
        System.out.println("Array: " + Arrays.toString(seats) + " length " + seats.length);
        // seats[3] = "Leo";   would crash: there is no seat 3

        // An ArrayList: it grows when you add more.
        ArrayList<String> guests = new ArrayList<>();
        guests.add("Ada");
        guests.add("Kai");
        guests.add("Mina");
        guests.add("Leo");          // no problem, the list grows
        System.out.println("List: " + guests + " size " + guests.size());

        guests.remove("Kai");       // and it shrinks again
        System.out.println("List: " + guests + " size " + guests.size());
    }
}`,
      output: `Array: [Ada, Kai, Mina] length 3
List: [Ada, Kai, Mina, Leo] size 4
List: [Ada, Mina, Leo] size 3`,
      codeSummary: 'The same guests, once in a fixed array and once in a growing ArrayList.',
      codeExplanation: [
        { label: 'Line 1', code: 'import java.util.ArrayList;', text: 'ArrayList lives in the package `java.util`. The import lets you write the short name `ArrayList`.' },
        { label: 'Line 7', code: 'String[] seats = new String[3];', text: 'An array with exactly 3 slots. This number can never change for this array.' },
        { label: 'Line 11', code: 'System.out.println("Array: " + Arrays.toString(seats) + " length " + seats.length);', text: '`Arrays.toString` turns the array into readable text. `length` is a field of every array, without parentheses.' },
        { label: 'Line 12', code: '// seats[3] = "Leo";   would crash: there is no seat 3', text: 'Index 3 does not exist. Java stops with an `ArrayIndexOutOfBoundsException`. The array cannot grow.' },
        { label: 'Line 15', code: 'ArrayList<String> guests = new ArrayList<>();', text: 'A new, empty list that holds Strings. `<String>` says what goes in. The next lesson explains the angle brackets.' },
        { label: 'Line 19', code: 'guests.add("Leo");          // no problem, the list grows', text: '`add` puts the element at the end. The list makes room by itself.' },
        { label: 'Line 20', code: 'System.out.println("List: " + guests + " size " + guests.size());', text: 'A list prints nicely by itself, as `[Ada, Kai, Mina, Leo]`. For a list you ask `size()`, a method with parentheses.' },
        { label: 'Line 22', code: 'guests.remove("Kai");       // and it shrinks again', text: '`remove` finds "Kai", takes it out and closes the gap. Mina and Leo move one place forward.' }
      ],
      sections: [
        {
          title: 'Growing an array by hand',
          text: [
            'To see what a collection saves you, grow an array yourself. You need a new, bigger array, you copy the old values over, and you point your variable at the new array.',
            '`Arrays.copyOf(old, newLength)` makes the bigger copy. The empty new slot gets the default value `0`.'
          ],
          fileName: 'GrowByHand.java',
          code: `import java.util.Arrays;

public class GrowByHand {
    public static void main(String[] args) {
        int[] scores = {7, 9, 4};
        System.out.println(Arrays.toString(scores));

        // To add a fourth score you need a NEW, bigger array.
        int[] bigger = Arrays.copyOf(scores, scores.length + 1);
        System.out.println(Arrays.toString(bigger));
        bigger[3] = 8;
        scores = bigger;   // the variable now points to the new array
        System.out.println(Arrays.toString(scores));
    }
}`,
          output: `[7, 9, 4]
[7, 9, 4, 0]
[7, 9, 4, 8]`,
          tip: 'An `ArrayList` does exactly this inside, every time it runs out of room. You never write it yourself.'
        },
        {
          title: 'The family: List, Set and Map',
          text: [
            'The picture shows the most common types. The words with `interface` are the job titles. The boxes below them are the classes that do the work.',
            '`List` and `Set` are both a kind of `Collection`: a plain group of elements. `Map` stands on its own, because it holds **pairs** of key and value, not single elements.'
          ],
          mermaid: `classDiagram
  direction TB
  class Collection
  <<interface>> Collection
  class List
  <<interface>> List
  class Set
  <<interface>> Set
  class Map
  <<interface>> Map
  Collection <|-- List
  Collection <|-- Set
  List <|.. ArrayList
  List <|.. LinkedList
  Set <|.. HashSet
  Set <|.. TreeSet
  Map <|.. HashMap
  Map <|.. TreeMap`,
          diagramNote: 'A solid arrow means "is a kind of": a List is a kind of Collection. A dotted arrow means "does the job of": ArrayList does the job of a List. Map has no arrow to Collection.'
        },
        {
          title: 'Three questions pick the type',
          text: ['Each family member answers a different question. The table puts them side by side. The last lesson, "Which Collection?", goes deeper.'],
          table: {
            head: ['Type', 'Picture', 'Order?', 'Duplicates?', 'Find by'],
            rows: [
              ['`List`', 'a shopping list', 'yes, the order you added', 'yes', 'position: `get(0)`'],
              ['`Set`', 'a sticker album', 'no (for `HashSet`)', 'no', 'asking `contains(x)`'],
              ['`Map`', 'a phone book', 'no (for `HashMap`)', 'keys no, values yes', 'key: `get("Ada")`']
            ],
            note: 'Start with a List. Switch to a Set when duplicates are wrong. Switch to a Map when you look things up by a name or id.'
          }
        },
        {
          title: 'The import lines',
          text: [
            'Every collection type is a class or interface in `java.util`. Without an import, javac says `cannot find symbol` for `ArrayList`.',
            'You can import each type on its own (`import java.util.ArrayList;`) or the whole package at once (`import java.util.*;`). Single imports show the reader exactly what the file uses, so this topic uses them.'
          ],
          warn: '`java.lang` (where `String` and `System` live) is imported for you. `java.util` is not. Forgetting the import is the most common first error with collections.'
        }
      ],
      technical: [
        'An `ArrayList` is a class with an ordinary array inside, a field called `elementData`. When you call `add` and that array is full, the list creates a new array about 1.5 times as big, copies all elements over, and throws the old array away. That is the code from "Growing an array by hand", written once by the Java team.',
        'A collection never stores the objects themselves, only **references** to them (arrows to objects on the heap, the memory area where objects live). Two lists can point to the same String object. This is also why collections cannot hold `int` values directly: an `int` is not an object, so there is nothing to point to.',
        'The Collections Framework is part of the module `java.base`, which every Java program has. You do not need to download anything.'
      ],
      tryIt: {
        steps: [
          'Copy `WhyCollections.java`, compile it with `javac WhyCollections.java` and run it with `java WhyCollections`.',
          'Remove the `//` in front of `seats[3] = "Leo";` and run again.',
          'Put the `//` back. Add `guests.add("Zoe");` before the last print.'
        ],
        see: 'the crash `ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3` in step 2, and `[Ada, Mina, Leo, Zoe] size 4` in step 3.'
      },
      check: [
        { q: 'Can an array of length 3 hold 4 elements later?', a: 'No. Its length is fixed. You need a new array or a collection.' },
        { q: 'Which family member keeps pairs of key and value?', a: 'The `Map`. It is not a `Collection`, it stands on its own.' },
        { q: 'For an `ArrayList`, is it `length` or `size()`?', a: '`size()`, a method. `length` belongs to arrays.' }
      ],
      keyPoints: [
        'Arrays have a fixed length; collections grow and shrink.',
        'List: ordered, duplicates allowed. Set: no duplicates. Map: key to value.',
        'The interface (List) is the job title, the class (ArrayList) does the work.',
        'Every collection type needs an `import java.util...` line.',
        'A list prints itself readably: `[a, b, c]`.'
      ],
      commonMistakes: [
        'Writing `guests.length` for a list. Lists use `guests.size()`.',
        'Forgetting `import java.util.ArrayList;`. javac then says `cannot find symbol`.',
        'Growing an array by hand in every program. Use an `ArrayList` when the size changes.',
        'Printing an array with `System.out.println(seats)`. That prints something like `[Ljava.lang.String;@1b6d3586`. Use `Arrays.toString(seats)`, or a list.'
      ],
      related: ['Arrays', 'generics-light', 'lists', 'which-collection']
    }
  ]);
})();
