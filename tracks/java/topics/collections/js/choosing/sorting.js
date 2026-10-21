// Lesson: sorting lists with Collections.sort, List.sort and Comparator.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'sorting',
      title: 'Sorting Lists',
      category: 'practice',
      icon: '↕',
      tagline: 'Collections.sort, List.sort and Comparator',
      realWorld: 'Lining up the class for a photo: by height, or by first name, or the tallest at the back. Same children, different rule.',
      kid: [
        'The teacher says: "Line up from shortest to tallest!" Every child looks at the child next to them and asks one question: "Am I shorter or taller than you?" Swap, swap, swap, and soon the line is in order.',
        'Tomorrow the teacher says: "Line up by first name, A to Z!" Same children, but now the question is: "Does my name come before yours in the alphabet?"',
        'In Java the list does all the swapping for you. You only tell it the **rule**, the question to ask about two children. That rule is called a **Comparator**.'
      ],
      definition: '`Collections.sort(list)` sorts a list in its **natural order**: numbers small to big, Strings A to Z. `list.sort(comparator)` sorts by any rule you give it. A **Comparator** is that rule: it compares two elements and says which comes first.',
      explain: [
        'Sorting changes the list itself. After `Collections.sort(numbers)` the same list object is in order; nothing new is returned.',
        'The natural order is built into the class. `Integer`, `Double` and `String` know how to compare themselves through a method `compareTo`. For Strings it compares character codes, so all capital letters come before all small letters.',
        '`list.sort(...)` takes a `Comparator`. The ready-made ones cover most needs: `Comparator.naturalOrder()`, `Comparator.reverseOrder()`, `String.CASE_INSENSITIVE_ORDER`, and `Comparator.comparing(...)`.',
        '`Comparator.comparing(String::length)` reads "compare by length". You give it a way to get a **sort key** out of each element, and it compares those keys. `String::length` is a method reference: "call `length()` on each String". For your own records you write `Pupil::age`.',
        'Comparators can be combined. `.thenComparing(...)` breaks ties ("same age? then by name"), `.reversed()` turns the order around. Java sorts are **stable**: elements that compare as equal keep their old order.'
      ],
      why: 'Reports, high-score tables, alphabetical lists, "newest first": people read sorted data. Java has fast, correct sorting built in, so you never write your own swap loops.',
      whenUse: 'Use `Collections.sort(list)` for the natural order. Use `list.sort(Comparator.comparing(...))` for any other order or for your own classes.',
      syntax: 'Collections.sort(list);   list.sort(Comparator.reverseOrder());   list.sort(Comparator.comparing(Type::getter));   list.sort(Comparator.comparing(Type::a).thenComparing(Type::b).reversed());',
      fileName: 'SortDemo.java',
      code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class SortDemo {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(List.of(42, 7, 19, 3));
        Collections.sort(numbers);                       // natural order
        System.out.println("Up:   " + numbers);

        numbers.sort(Comparator.reverseOrder());         // big to small
        System.out.println("Down: " + numbers);

        List<String> fruits = new ArrayList<>(List.of("banana", "kiwi", "apple", "fig"));
        Collections.sort(fruits);                        // A to Z
        System.out.println("A-Z:       " + fruits);

        fruits.sort(Comparator.comparing(String::length));   // short to long
        System.out.println("By length: " + fruits);
    }
}`,
      output: `Up:   [3, 7, 19, 42]
Down: [42, 19, 7, 3]
A-Z:       [apple, banana, fig, kiwi]
By length: [fig, kiwi, apple, banana]`,
      codeSummary: 'Numbers and fruits, sorted three different ways.',
      codeExplanation: [
        { label: 'Line 2', code: 'import java.util.Collections;', text: '`Collections` (with an s) is a helper class full of static methods for collections, like `sort`, `max` and `min`.' },
        { label: 'Line 3', code: 'import java.util.Comparator;', text: '`Comparator` is the type of a sorting rule.' },
        { label: 'Line 8', code: 'List<Integer> numbers = new ArrayList<>(List.of(42, 7, 19, 3));', text: 'A changeable copy. A `List.of` list itself cannot be sorted, because sorting changes it.' },
        { label: 'Line 9', code: 'Collections.sort(numbers);                       // natural order', text: 'Sorts the list in place, small to big. It returns nothing.' },
        { label: 'Line 12', code: 'numbers.sort(Comparator.reverseOrder());         // big to small', text: '`List.sort` takes a rule. `reverseOrder()` is the natural order turned around.' },
        { label: 'Line 16', code: 'Collections.sort(fruits);                        // A to Z', text: 'Strings sort alphabetically by their character codes.' },
        { label: 'Line 19', code: 'fruits.sort(Comparator.comparing(String::length));   // short to long', text: 'The sort key is the length. `fig` (3) comes first, `banana` (6) last.' }
      ],
      sections: [
        {
          title: 'The capital letter surprise',
          text: [
            'Strings compare by character codes. Every capital letter (A = 65 … Z = 90) has a smaller code than every small letter (a = 97 … z = 122). So `"Cherry"` comes before `"apple"`.',
            '`String.CASE_INSENSITIVE_ORDER` compares as if all letters were small. That is usually what people expect.'
          ],
          fileName: 'CaseSort.java',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CaseSort {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>(List.of("banana", "Cherry", "apple", "Date"));

        Collections.sort(names);
        System.out.println("Natural:          " + names);

        names.sort(String.CASE_INSENSITIVE_ORDER);
        System.out.println("Case-insensitive: " + names);
    }
}`,
          output: `Natural:          [Cherry, Date, apple, banana]
Case-insensitive: [apple, banana, Cherry, Date]`
        },
        {
          title: 'What a Comparator answers',
          text: [
            'A Comparator gets two elements, `a` and `b`, and returns an `int`. **Negative** means "a comes first", **zero** means "equal for sorting", **positive** means "b comes first". `compareTo` on Strings and numbers follows the same rule.',
            'You can write a Comparator as a lambda with two inputs: `(a, b) -> Integer.compare(a.length(), b.length())`. The ready-made `Comparator.comparing(String::length)` does exactly the same and is easier to read.'
          ],
          mermaid: `flowchart TD
  A["compare(a, b)"] --> B{"result?"}
  B -->|"negative"| C["a goes before b"]
  B -->|"zero"| D["keep their old order"]
  B -->|"positive"| E["b goes before a"]`,
          fileName: 'CompareRule.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class CompareRule {
    public static void main(String[] args) {
        System.out.println("apple".compareTo("banana"));   // negative: apple first
        System.out.println("banana".compareTo("apple"));   // positive: apple first
        System.out.println("kiwi".compareTo("kiwi"));      // zero: equal

        List<String> words = new ArrayList<>(List.of("pear", "fig", "banana", "kiwi"));
        words.sort((a, b) -> Integer.compare(a.length(), b.length()));
        System.out.println("Short first: " + words);

        words.sort((a, b) -> b.compareTo(a));               // b and a swapped: Z to A
        System.out.println("Z to A:      " + words);
    }
}`,
          output: `-1
1
0
Short first: [fig, pear, kiwi, banana]
Z to A:      [pear, kiwi, fig, banana]`,
          warn: 'You may see `(a, b) -> a - b` for numbers. It breaks for very big or very negative values because the subtraction overflows. Use `Integer.compare(a, b)`.'
        },
        {
          title: 'Sorting your own records',
          text: [
            'Your own classes have no natural order, so `Collections.sort` does not compile for them. Give a rule instead. `Comparator.comparing(Pupil::age)` reads "compare pupils by their age".',
            'The record here also overrides `toString()`, the method `println` calls to turn an object into text, so the output stays short.'
          ],
          fileName: 'SortPupils.java',
          code: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

record Pupil(String name, int age) {
    @Override
    public String toString() {
        return name + "(" + age + ")";
    }
}

public class SortPupils {
    public static void main(String[] args) {
        List<Pupil> pupils = new ArrayList<>(List.of(
            new Pupil("Mina", 8), new Pupil("Ada", 9), new Pupil("Kai", 8), new Pupil("Leo", 7)));

        pupils.sort(Comparator.comparing(Pupil::age));
        System.out.println("By age:          " + pupils);

        pupils.sort(Comparator.comparing(Pupil::age).thenComparing(Pupil::name));
        System.out.println("Age, then name:  " + pupils);

        pupils.sort(Comparator.comparing(Pupil::age).reversed());
        System.out.println("Oldest first:    " + pupils);
    }
}`,
          output: `By age:          [Leo(7), Mina(8), Kai(8), Ada(9)]
Age, then name:  [Leo(7), Kai(8), Mina(8), Ada(9)]
Oldest first:    [Ada(9), Kai(8), Mina(8), Leo(7)]`,
          tip: 'Look at Mina and Kai in the first line: both are 8, so the stable sort keeps them in their old order. `thenComparing` decides the tie by name.'
        },
        {
          title: 'Keep the original, find min and max',
          text: [
            'Sorting changes the list. To keep the original order, sort a copy: `new ArrayList<>(original)`.',
            'If you only need the smallest or the biggest element, do not sort at all: `Collections.min` and `Collections.max` look through the list once. Both also take a Comparator.'
          ],
          fileName: 'MinMax.java',
          code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MinMax {
    public static void main(String[] args) {
        List<Integer> temps = List.of(12, 19, 7, 23, 15);

        List<Integer> sorted = new ArrayList<>(temps);
        Collections.sort(sorted);
        System.out.println("Original: " + temps);
        System.out.println("Sorted:   " + sorted);

        System.out.println("Coldest: " + Collections.min(temps));
        System.out.println("Warmest: " + Collections.max(temps));

        List<String> words = List.of("sun", "rainbow", "sky");
        System.out.println("Longest word: " + Collections.max(words, Comparator.comparing(String::length)));
    }
}`,
          output: `Original: [12, 19, 7, 23, 15]
Sorted:   [7, 12, 15, 19, 23]
Coldest: 7
Warmest: 23
Longest word: rainbow`
        },
        {
          title: 'Cheat sheet',
          text: ['All of these return a `Comparator` you can pass to `list.sort(...)`, `Collections.max(...)` or a `TreeSet` / `TreeMap` constructor.'],
          table: {
            head: ['You want', 'Write'],
            rows: [
              ['natural order', '`Collections.sort(list)` or `list.sort(null)`'],
              ['natural order, reversed', '`Comparator.reverseOrder()`'],
              ['Strings, ignore capitals', '`String.CASE_INSENSITIVE_ORDER`'],
              ['by one property', '`Comparator.comparing(Pupil::age)`'],
              ['by a number property, no boxing', '`Comparator.comparingInt(Pupil::age)`'],
              ['tie-breaker', '`.thenComparing(Pupil::name)`'],
              ['turn any rule around', '`.reversed()`'],
              ['always sorted while you add', '`new TreeSet<>(rule)` or `new TreeMap<>(rule)`']
            ]
          }
        }
      ],
      technical: [
        '`Collections.sort(list)` calls `list.sort(null)`; `null` means "use the natural order". An `ArrayList` sorts its inner array directly with `Arrays.sort`.',
        'For objects Java uses **TimSort**, a mix of merge sort and insertion sort. It needs at most about n·log(n) comparisons (for a million elements around 20 million), is very fast on lists that are already partly sorted, and is stable.',
        'The natural order comes from the interface `Comparable` with its method `compareTo`. `String`, `Integer` and the other wrappers implement it. A record does not, so `Collections.sort(pupils)` is a compile error until you pass a Comparator (or make the record implement `Comparable<Pupil>`, which the [Interfaces](../interfaces/index.html) topic explains).',
        '`Comparator.comparing(Pupil::age)` builds a Comparator object that calls `age()` on both pupils and compares the results. Because `age()` returns an `int`, every call boxes it into an `Integer`; `comparingInt` avoids that, which matters only for very large lists.'
      ],
      tryIt: {
        steps: [
          'Copy `SortPupils.java`, compile and run it.',
          'Add `new Pupil("Zoe", 9)` and `new Pupil("ben", 7)` (small b) to the list.',
          'Change the second sort to `Comparator.comparing(Pupil::age).thenComparing(Pupil::name, String.CASE_INSENSITIVE_ORDER)`.'
        ],
        see: '`ben(7)` before `Leo(7)` in the second line only after step 3, because without it the small `b` sorts after the capital `L`.'
      },
      check: [
        { q: 'Does `Collections.sort(list)` return a new sorted list?', a: 'No. It sorts the same list in place and returns nothing.' },
        { q: 'A Comparator returns a negative number for `compare(a, b)`. What does that mean?', a: '`a` comes before `b`.' },
        { q: 'How do you sort records `Pupil` by name, Z to A?', a: '`pupils.sort(Comparator.comparing(Pupil::name).reversed());`' }
      ],
      keyPoints: [
        '`Collections.sort(list)` sorts in natural order, in place.',
        '`list.sort(rule)` sorts by any `Comparator`.',
        '`Comparator.comparing(Type::getter)` sorts by one property.',
        '`thenComparing` breaks ties, `reversed()` flips the order.',
        'Capital letters sort before small letters unless you use `CASE_INSENSITIVE_ORDER`.'
      ],
      commonMistakes: [
        '`List<Integer> sorted = Collections.sort(list);` does not compile: `sort` returns `void`. Call `Collections.sort(list);` and use `list`.',
        '`Collections.sort(List.of(3, 1, 2))` crashes with `UnsupportedOperationException`. Sort a copy: `new ArrayList<>(List.of(...))`.',
        '`Collections.sort(pupils)` for a record without natural order does not compile. Use `pupils.sort(Comparator.comparing(Pupil::age))`.',
        'Writing `(a, b) -> a - b`. Use `Integer.compare(a, b)` or `Comparator.naturalOrder()`.'
      ],
      related: ['list-loop-remove', 'immutable', 'sets', 'Interfaces']
    }
  ]);
})();
