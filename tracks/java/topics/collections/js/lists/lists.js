// Lesson: ArrayList basics.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'lists',
      title: 'ArrayList',
      category: 'concept',
      icon: 'List',
      tagline: 'A growable ordered list',
      realWorld: 'A shopping list on the fridge. You write new things at the bottom, cross things out, squeeze one in between, and you can say "the third thing on the list".',
      kid: [
        'Mum has a shopping list. Every line has a number: line 0 is milk, line 1 is bread, line 2 is eggs. Programmers start counting at 0, like the rulers in school.',
        'You can add a line at the bottom. You can squeeze a new line in between, and the lines below move down one. You can rub out a line, and the lines below move up to close the gap.',
        'You can also ask questions: "How many lines are there?", "Is eggs on the list?", "On which line is bread?". An `ArrayList` is exactly this shopping list for your program.'
      ],
      definition: '`ArrayList` is a resizable, ordered list. Every element has a position, its **index**, starting at 0. The list keeps the order you added things in and allows the same value more than once.',
      explain: [
        'You create it with `List<String> shopping = new ArrayList<>();`. The variable type is the interface `List`, the object is an `ArrayList`. This way you can swap in another kind of list later without changing the rest of the code.',
        '`add(x)` puts `x` at the end. `add(i, x)` squeezes `x` in at index `i` and moves everything behind it one place back. `get(i)` reads the element at index `i`. `set(i, x)` replaces it.',
        '`size()` tells you how many elements are in the list right now. The last index is always `size() - 1`.',
        '`contains(x)` answers true or false. `indexOf(x)` tells you the index of the first match, or `-1` if `x` is not there. Both compare with `equals`, so they work for Strings by content.',
        '`remove` comes in two kinds: `remove(i)` with an `int` removes by **position**, and `remove(x)` with an object removes by **value**. With a `List<Integer>` this gives a famous surprise, shown in step 3.'
      ],
      why: 'Most data in a program is "some things in a row": lines of a file, items in a cart, players in a game. ArrayList is the default tool for that.',
      whenUse: 'Whenever you need an ordered group that can change size, and you want to read elements by position. When in doubt, start with an ArrayList.',
      syntax: 'List<T> list = new ArrayList<>();   list.add(x);   list.add(i, x);   list.get(i);   list.set(i, x);   list.remove(i);   list.remove(x);   list.size();   list.contains(x);   list.indexOf(x);',
      fileName: 'ListDemo.java',
      code: `import java.util.ArrayList;
import java.util.List;

public class ListDemo {
    public static void main(String[] args) {
        List<String> shopping = new ArrayList<>();
        shopping.add("milk");
        shopping.add("bread");
        shopping.add("eggs");
        shopping.add(1, "apples");          // squeeze in at index 1
        System.out.println(shopping);

        System.out.println("Size: " + shopping.size());
        System.out.println("First: " + shopping.get(0));
        System.out.println("Has eggs? " + shopping.contains("eggs"));
        System.out.println("Where is bread? " + shopping.indexOf("bread"));
        System.out.println("Where is tea? " + shopping.indexOf("tea"));

        shopping.set(0, "oat milk");        // replace index 0
        shopping.remove("eggs");            // remove by value
        shopping.remove(0);                 // remove by index
        System.out.println(shopping);

        for (String item : shopping) {
            System.out.println("- " + item);
        }
    }
}`,
      output: `[milk, apples, bread, eggs]
Size: 4
First: milk
Has eggs? true
Where is bread? 2
Where is tea? -1
[apples, bread]
- apples
- bread`,
      codeSummary: 'A shopping list that grows, answers questions and shrinks again.',
      codeExplanation: [
        { label: 'Line 6', code: 'List<String> shopping = new ArrayList<>();', text: 'An empty list of Strings. Its size is 0.' },
        { label: 'Line 10', code: 'shopping.add(1, "apples");          // squeeze in at index 1', text: '"apples" goes to index 1. "bread" and "eggs" move one place back, to 2 and 3.' },
        { label: 'Line 11', code: 'System.out.println(shopping);', text: 'A list prints its elements in square brackets, in order.' },
        { label: 'Line 14', code: 'System.out.println("First: " + shopping.get(0));', text: 'Index 0 is the first element. `get` does not remove it, it only reads it.' },
        { label: 'Line 15', code: 'System.out.println("Has eggs? " + shopping.contains("eggs"));', text: '`contains` looks through the list and compares with `equals`. It returns a `boolean`.' },
        { label: 'Line 17', code: 'System.out.println("Where is tea? " + shopping.indexOf("tea"));', text: 'Tea is not on the list, so `indexOf` returns `-1`. This is the usual "not found" answer.' },
        { label: 'Line 19', code: 'shopping.set(0, "oat milk");        // replace index 0', text: '`set` overwrites the element at index 0. The size stays 4.' },
        { label: 'Line 20', code: 'shopping.remove("eggs");            // remove by value', text: 'A String argument means "remove this value". The list is now `[oat milk, apples, bread]`.' },
        { label: 'Line 21', code: 'shopping.remove(0);                 // remove by index', text: 'An `int` argument means "remove the element at this position". "oat milk" goes, the others move forward.' },
        { label: 'Line 24', code: 'for (String item : shopping) {', text: 'The for-each loop visits every element in order. Read it as "for each item in shopping".' }
      ],
      sections: [
        {
          title: 'Index positions and squeezing in',
          text: [
            'Picture the list as a row of numbered boxes. `add(1, "apples")` does not overwrite box 1. It moves bread and eggs one box to the right and puts apples into the free box.',
            '`remove` works the other way round: the elements behind the removed one slide one box to the left. Indexes of later elements change.'
          ],
          mermaid: `flowchart TB
  subgraph before["before add(1, apples)"]
    direction LR
    a0["0: milk"] --- a1["1: bread"] --- a2["2: eggs"]
  end
  subgraph after["after add(1, apples)"]
    direction LR
    b0["0: milk"] --- b1["1: apples"] --- b2["2: bread"] --- b3["3: eggs"]
  end
  before --> after`,
          diagramNote: 'Bread was at index 1 and is now at index 2. Never keep an old index after you insert or remove.'
        },
        {
          title: 'Two ways to loop',
          text: [
            'The **for-each** loop is the short way when you only need the elements. The classic **for loop with an index** is the way when you also need the position, for example to number the lines.',
            'Notice `i < list.size()`, not `i <= list.size()`. The last index is `size() - 1`.'
          ],
          fileName: 'LoopList.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class LoopList {
    public static void main(String[] args) {
        List<String> songs = new ArrayList<>();
        songs.add("Happy Birthday");
        songs.add("Twinkle Twinkle");
        songs.add("Old MacDonald");

        // for-each: only the elements
        for (String song : songs) {
            System.out.println("Playing " + song);
        }

        // index loop: position and element
        for (int i = 0; i < songs.size(); i++) {
            System.out.println((i + 1) + ". " + songs.get(i));
        }
    }
}`,
          output: `Playing Happy Birthday
Playing Twinkle Twinkle
Playing Old MacDonald
1. Happy Birthday
2. Twinkle Twinkle
3. Old MacDonald`
        },
        {
          title: 'The remove surprise with numbers',
          text: [
            '`remove` has two versions. `remove(int index)` removes by position. `remove(Object value)` removes by value. With a `List<String>` it is always clear which one you mean.',
            'With a `List<Integer>`, `numbers.remove(1)` gets the `int` version, because `1` is an `int` and Java picks the exact match first. It removes the element at **index 1**, not the number 1.',
            'To remove the **value**, give Java a real `Integer` object: `numbers.remove(Integer.valueOf(10))`.'
          ],
          fileName: 'RemoveSurprise.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class RemoveSurprise {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        numbers.add(10);
        numbers.add(20);
        numbers.add(30);
        numbers.add(1);

        numbers.remove(1);                    // index 1: removes 20!
        System.out.println(numbers);

        numbers.remove(Integer.valueOf(1));   // the value 1
        System.out.println(numbers);

        numbers.remove(Integer.valueOf(10));  // the value 10
        System.out.println(numbers);
    }
}`,
          output: `[10, 30, 1]
[10, 30]
[30]`,
          warn: 'Every `remove(someInt)` on a `List<Integer>` removes by position. If you mean a value, wrap it: `Integer.valueOf(x)`.'
        },
        {
          title: 'More useful methods',
          text: ['These methods come up again and again. All of them work on every `List`.'],
          table: {
            head: ['Method', 'What it does', 'Example result'],
            rows: [
              ['`isEmpty()`', 'true when the size is 0', '`new ArrayList<>().isEmpty()` is `true`'],
              ['`clear()`', 'removes everything', 'size becomes 0'],
              ['`addAll(other)`', 'adds all elements of another collection at the end', '`[a, b]` + `[c]` gives `[a, b, c]`'],
              ['`lastIndexOf(x)`', 'index of the last match, or -1', '`[a, b, a]` gives 2 for `a`'],
              ['`subList(from, to)`', 'a view of the part from index `from` up to, not including, `to`', '`[a, b, c, d].subList(1, 3)` is `[b, c]`'],
              ['`get(i)` with a wrong `i`', 'crashes with `IndexOutOfBoundsException`', '`get(5)` on a list of size 3']
            ],
            note: 'Valid indexes go from 0 to `size() - 1`. Anything else crashes, like with arrays. The [Exceptions](../exceptions/index.html) topic explains crashes in depth.'
          }
        },
        {
          title: 'A small real program: average score',
          text: [
            'Lists shine when you do not know how many values come. This program collects scores, then computes the average with a for-each loop.',
            'The sum is an `int`. Dividing by `(double) scores.size()` gives a decimal result instead of an integer division.'
          ],
          fileName: 'AverageScore.java',
          code: `import java.util.ArrayList;
import java.util.List;

public class AverageScore {
    public static void main(String[] args) {
        List<Integer> scores = new ArrayList<>();
        scores.add(7);
        scores.add(10);
        scores.add(8);
        scores.add(6);

        int sum = 0;
        for (int score : scores) {     // each Integer is unboxed to int
            sum += score;
        }
        double average = sum / (double) scores.size();
        System.out.println("Scores: " + scores);
        System.out.println("Average: " + average);
    }
}`,
          output: `Scores: [7, 10, 8, 6]
Average: 7.75`
        }
      ],
      technical: [
        'Inside, an `ArrayList` keeps an `Object[]` array and an `int size`. The array is often bigger than `size`; the extra slots are free room for the next `add`. The free room is called **capacity**. An empty list starts with no array at all and gets 10 slots on the first `add`.',
        '`get(i)` and `set(i, x)` are instant: Java computes where slot `i` is in memory and goes there. Programmers call this **O(1)**, "constant time": it does not depend on the size of the list.',
        '`add(x)` at the end is usually instant too. Only when the array is full does the list copy everything into a 1.5 times bigger array. `add(i, x)` and `remove(i)` near the front must shift all later elements, so they get slower the longer the list is (**O(n)**, "grows with the number of elements").',
        '`contains` and `indexOf` walk through the list from index 0 and call `equals` on each element until they find a match. For a list of a million elements that is up to a million comparisons. When you search a lot, a Set or Map (later lessons) is much faster.'
      ],
      tryIt: {
        steps: [
          'Copy `ListDemo.java`, compile and run it.',
          'Add `shopping.add("bread");` before the loop, so bread is on the list twice.',
          'Print `shopping.indexOf("bread")` and `shopping.lastIndexOf("bread")`.',
          'Add `System.out.println(shopping.get(10));` at the end and run once more.'
        ],
        see: 'bread twice in the loop, the two indexes `1` and `2`, and a crash with `Index 10 out of bounds for length 3` at the end.'
      },
      check: [
        { q: 'A list is `[a, b, c]`. What is it after `add(0, "z")`?', a: '`[z, a, b, c]`. Everything moves one place back.' },
        { q: 'What does `indexOf` return when the element is not there?', a: '`-1`.' },
        { q: '`nums` is `[4, 5, 6]` as a `List<Integer>`. What does `nums.remove(2)` remove?', a: 'The element at index 2, so `6`. The list becomes `[4, 5]`.' }
      ],
      keyPoints: [
        'Indexes start at 0; the last one is `size() - 1`.',
        '`add(x)` appends, `add(i, x)` inserts and shifts, `set(i, x)` replaces.',
        '`remove(int)` removes by position, `remove(Object)` by value.',
        '`contains` and `indexOf` compare with `equals`.',
        'Write the variable as `List<T>`, create an `ArrayList<>()`.'
      ],
      commonMistakes: [
        '`for (int i = 0; i <= list.size(); i++)` runs one step too far and crashes. Use `i < list.size()`.',
        '`numbers.remove(5)` on a `List<Integer>` when you mean the value 5. Write `numbers.remove(Integer.valueOf(5))`.',
        '`list.set(3, x)` on a list of size 3 to add at the end. `set` only replaces existing slots; use `add(x)`.',
        'Keeping an index in a variable, then inserting or removing in front of it. The index now points at a different element; look it up again with `indexOf`.'
      ],
      related: ['Arrays', 'generics-light', 'list-loop-remove', 'linked-list']
    }
  ]);
})();
