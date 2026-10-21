// Lesson: removing while looping, Iterator, removeIf and a first look at lambdas.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'list-loop-remove',
      title: 'Removing While You Loop',
      category: 'habits',
      icon: 'it',
      tagline: 'Iterator, removeIf and a first lambda',
      realWorld: 'You walk along a row of chairs and count the children. If a child stands up and leaves while you are counting, you lose your place.',
      kid: [
        'You are counting apples in a row: one, two, three. While you count, your friend takes away apple number two. All the apples slide over. Now you are confused: did you already count this one?',
        'Java gets confused in the same way. When a for-each loop walks through a list and you remove something from the list in the middle, Java stops and shouts: "Somebody changed the list while I was walking!"',
        'There are two good ways. You can tell the walker himself to take the apple away, then he knows about it. Or you give the list a rule, "take away every bad apple", and the list does the whole job alone.'
      ],
      definition: 'Removing elements from a list inside a for-each loop over that same list crashes with a `ConcurrentModificationException`. Remove through an **Iterator** with `it.remove()`, or let the list do it with `removeIf(rule)`.',
      explain: [
        'A for-each loop over a list uses a hidden helper object, an **Iterator**. The iterator remembers where it is and hands you one element after the other with `next()`.',
        'If the list changes behind the iterator back, its position no longer fits. The iterator notices this on the next `next()` and throws a `ConcurrentModificationException`, "change during the walk". This crash protects you from skipping or repeating elements.',
        'Fix 1: use the iterator yourself. `hasNext()` asks "is there one more?", `next()` gives it to you, and `remove()` removes the element you got last. Because the iterator does the removal, it stays in step with the list.',
        'Fix 2: `list.removeIf(rule)` walks the list for you and removes every element where the rule says `true`. The rule is a **lambda**: a tiny function without a name, written `x -> condition`. Read `w -> w.length() > 3` as "give me a word w, I answer whether its length is more than 3".',
        'Lambdas also power `forEach`: `list.forEach(x -> System.out.println(x))` runs the code once for each element. You meet lambdas again in sorting; this lesson only needs the simple `x -> ...` form.'
      ],
      why: 'Filtering a list ("remove all empty lines", "remove all finished tasks") is one of the most common jobs. Doing it inside a for-each loop is the most common way to get it wrong.',
      whenUse: 'Use `removeIf` for "remove everything that matches a rule". Use an `Iterator` when the decision needs several steps or you also do other work per element.',
      syntax: 'list.removeIf(x -> condition);   Iterator<T> it = list.iterator(); while (it.hasNext()) { T x = it.next(); if (condition) it.remove(); }   list.forEach(x -> statement);',
      fileName: 'SafeRemove.java',
      code: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class SafeRemove {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));

        // Fix 1: an Iterator, and remove through the iterator
        Iterator<Integer> it = numbers.iterator();
        while (it.hasNext()) {
            int n = it.next();
            if (n % 2 == 0) {
                it.remove();          // safe: the iterator knows about it
            }
        }
        System.out.println("Odd numbers: " + numbers);

        // Fix 2: removeIf with a small rule (a lambda)
        List<String> words = new ArrayList<>(List.of("cat", "elephant", "dog", "hippo"));
        words.removeIf(w -> w.length() > 3);
        System.out.println("Short words: " + words);

        // forEach: run a bit of code for every element
        words.forEach(w -> System.out.println("I see a " + w));
    }
}`,
      output: `Odd numbers: [1, 3, 5]
Short words: [cat, dog]
I see a cat
I see a dog`,
      codeSummary: 'Two safe ways to remove elements while walking through a list, plus forEach.',
      codeExplanation: [
        { label: 'Line 7', code: 'List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5, 6));', text: '`List.of(...)` makes a fixed list in one line. `new ArrayList<>(...)` copies it into a list you are allowed to change. The lesson "Immutable Lists and Maps" explains why.' },
        { label: 'Line 10', code: 'Iterator<Integer> it = numbers.iterator();', text: 'Asks the list for its walker. `Iterator` is in `java.util` too, so it needs an import.' },
        { label: 'Line 11', code: 'while (it.hasNext()) {', text: '`hasNext()` is true as long as there is one more element to visit.' },
        { label: 'Line 12', code: 'int n = it.next();', text: '`next()` hands you the next element and moves the walker forward. The `Integer` is unboxed into `n`.' },
        { label: 'Line 14', code: 'it.remove();          // safe: the iterator knows about it', text: 'Removes the element that `next()` returned last. The iterator updates its own position, so nothing is skipped.' },
        { label: 'Line 21', code: 'words.removeIf(w -> w.length() > 3);', text: 'The lambda gets each word as `w` and answers true or false. Every word with an answer `true` is removed.' },
        { label: 'Line 25', code: 'words.forEach(w -> System.out.println("I see a " + w));', text: '`forEach` calls the lambda once for each element, in order. Here the lambda prints a line.' }
      ],
      sections: [
        {
          title: 'The crash: removing inside for-each',
          text: [
            'This program tries to remove the even numbers inside a for-each loop. It checks 1, checks 2, removes 2, and then the loop asks for the next element.',
            'The output below is real. The lines starting with `at` are the **stack trace**: which methods were running when the crash happened. The last line points at your code, line 8, the `for` line. The line numbers inside `java.base` depend on your Java version.'
          ],
          fileName: 'RemoveCrash.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class RemoveCrash {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>(List.of(1, 2, 3, 4, 5));

        for (int n : numbers) {
            System.out.println("checking " + n);
            if (n % 2 == 0) {
                numbers.remove(Integer.valueOf(n));   // changes the list during the loop
            }
        }
        System.out.println(numbers);
    }
}`,
          output: `checking 1
checking 2
Exception in thread "main" java.util.ConcurrentModificationException
	at java.base/java.util.ArrayList$Itr.checkForComodification(ArrayList.java:1096)
	at java.base/java.util.ArrayList$Itr.next(ArrayList.java:1050)
	at RemoveCrash.main(RemoveCrash.java:8)`
        },
        {
          title: 'Why Java stops',
          text: [
            'Every `ArrayList` counts how often it was changed. The iterator writes down that count when the loop starts. On every `next()` it compares the two numbers. If they differ, someone changed the list behind its back, and it throws.',
            'When you call `it.remove()` instead, the iterator changes the list **and** updates its own copy of the count, so the numbers stay equal.'
          ],
          mermaid: `sequenceDiagram
  participant L as for-each loop
  participant I as Iterator
  participant A as ArrayList
  L->>I: next()
  I->>A: change count still 0?
  A-->>I: yes, here is 2
  L->>A: remove(2)
  Note over A: change count is now 1
  L->>I: next()
  I->>A: change count still 0?
  A-->>I: no, it is 1
  I-->>L: ConcurrentModificationException`,
          diagramNote: 'The loop removed the element directly on the list. The iterator finds out on the very next `next()` call.'
        },
        {
          title: 'Reading a lambda',
          text: [
            'A lambda is a small piece of code you hand to a method, so the method can run it later, once per element. The arrow `->` separates the input on the left from the answer or action on the right.',
            'You choose the name on the left. `w -> w.length() > 3` and `word -> word.length() > 3` do the same thing. Java knows from the list type that `w` is a String.'
          ],
          table: {
            head: ['Lambda', 'Read it as', 'Used with'],
            rows: [
              ['`n -> n % 2 == 0`', 'is n even?', '`removeIf` on a `List<Integer>`'],
              ['`w -> w.isEmpty()`', 'is the word empty?', '`removeIf` on a `List<String>`'],
              ['`w -> w.startsWith("A")`', 'does it start with A?', '`removeIf`'],
              ['`x -> System.out.println(x)`', 'print x', '`forEach`'],
              ['`System.out::println`', 'same as the line above, shorter', '`forEach`']
            ],
            note: 'The last row is a **method reference**: `Class::method` names an existing method instead of writing a lambda that only calls it.'
          }
        },
        {
          title: 'Wrong vs right: removing by index',
          text: [
            'You can also remove with an index loop. Going **forwards** is a quiet bug: after a removal, the next element slides into the current index, and `i++` jumps over it. No crash, wrong result.',
            'Going **backwards**, from the last index down to 0, is safe: a removal only moves elements you have already looked at.'
          ],
          fileName: 'IndexRemove.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class IndexRemove {
    public static void main(String[] args) {
        // Wrong: forwards skips the element after each removal
        List<String> a = new ArrayList<>(List.of("Ada", "Ann", "Bob", "Avi"));
        for (int i = 0; i < a.size(); i++) {
            if (a.get(i).startsWith("A")) {
                a.remove(i);
            }
        }
        System.out.println("Forwards:  " + a);

        // Right: backwards never skips
        List<String> b = new ArrayList<>(List.of("Ada", "Ann", "Bob", "Avi"));
        for (int i = b.size() - 1; i >= 0; i--) {
            if (b.get(i).startsWith("A")) {
                b.remove(i);
            }
        }
        System.out.println("Backwards: " + b);
    }
}`,
          output: `Forwards:  [Ann, Bob]
Backwards: [Bob]`,
          tip: 'The shortest right answer is still `b.removeIf(name -> name.startsWith("A"));`.'
        },
        {
          title: 'Which way to choose',
          text: ['All three safe ways give the same result. Pick the one that reads best for the job.'],
          table: {
            head: ['Way', 'Good for', 'Watch out'],
            rows: [
              ['`list.removeIf(x -> ...)`', 'one clear rule', 'none, it is the first choice'],
              ['`Iterator` + `it.remove()`', 'several steps per element, or printing what you remove', 'call `next()` before `remove()`'],
              ['index loop backwards', 'when you need the index anyway', 'start at `size() - 1`, stop at `i >= 0`'],
              ['for-each + `list.remove`', 'never', '`ConcurrentModificationException`']
            ],
            note: 'Reading or changing the **elements** inside a for-each is fine. Only adding or removing elements of the same list is a problem.'
          }
        }
      ],
      technical: [
        'The for-each loop `for (int n : numbers)` is compiled into iterator code: `Iterator<Integer> it = numbers.iterator(); while (it.hasNext()) { int n = it.next(); ... }`. That is why a crash in a for-each loop shows `ArrayList$Itr.next` in the stack trace. `Itr` is the iterator class hidden inside `ArrayList`.',
        'Every `ArrayList` has an `int` field `modCount` that grows by one on every structural change (add, remove, clear). The iterator copies it into `expectedModCount` when it starts. `next()` calls `checkForComodification()`, which compares the two and throws if they differ. This "fail-fast" check is a best effort to catch bugs early, not a guarantee.',
        'A lambda like `w -> w.length() > 3` is compiled into a small hidden method. `removeIf` expects an object of type `Predicate<String>`, an interface with one method `test` that returns a boolean. Java turns your lambda into such an object. `forEach` expects a `Consumer`, whose one method `accept` returns nothing.',
        '`ArrayList.removeIf` is also faster than removing one by one: it first marks all elements to remove, then shifts the survivors forward in a single pass, instead of shifting the rest of the list after every single removal.'
      ],
      tryIt: {
        steps: [
          'Copy `RemoveCrash.java`, compile and run it. Read the stack trace from the bottom line.',
          'Replace the whole for loop by `numbers.removeIf(n -> n % 2 == 0);` and run again.',
          'Add `numbers.forEach(n -> System.out.println("left: " + n));` at the end.'
        ],
        see: 'the `ConcurrentModificationException` first, then `[1, 3, 5]`, then three lines `left: 1`, `left: 3`, `left: 5`.'
      },
      check: [
        { q: 'Why is `list.remove(x)` inside `for (String x : list)` a problem?', a: 'The hidden iterator notices the change on its next `next()` and throws a `ConcurrentModificationException`.' },
        { q: 'What does `names.removeIf(n -> n.isEmpty())` do?', a: 'It removes every empty String from `names`.' },
        { q: 'Why does a forwards index loop with `remove(i)` skip elements?', a: 'After a removal the next element slides into index `i`, and `i++` moves past it without checking it.' }
      ],
      keyPoints: [
        'Never add or remove elements of a list inside a for-each loop over that same list.',
        '`removeIf(x -> rule)` is the shortest safe way to filter a list.',
        'With an `Iterator`, remove through `it.remove()`, never through the list.',
        'A lambda `x -> ...` is a tiny nameless function: input left, answer right.',
        '`forEach(x -> ...)` runs code once per element.'
      ],
      commonMistakes: [
        '`for (String s : list) { if (s.isEmpty()) list.remove(s); }` crashes. Write `list.removeIf(s -> s.isEmpty());`.',
        '`it.remove()` before `it.next()` throws an `IllegalStateException`. Call `next()` first, then `remove()` at most once per `next()`.',
        'A forwards loop with `list.remove(i)` skips elements without any error. Loop backwards or use `removeIf`.',
        '`List.of(1, 2, 3).removeIf(...)` crashes because `List.of` cannot change. Copy it first: `new ArrayList<>(List.of(1, 2, 3))`.'
      ],
      related: ['lists', 'immutable', 'sorting', 'Exceptions']
    }
  ]);
})();
