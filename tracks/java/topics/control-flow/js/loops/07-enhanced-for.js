(function () {
  const CF = Java.topics.controlFlow;

  CF.lessons.push({
    id: 'enhanced-for',
    num: '07',
    title: 'Enhanced for',
    category: 'loops',
    icon: ':',
    tagline: 'Visit every item, one after another',
    realWorld: 'Handing out party invitations to every child in a row. You walk from the first to the last and give one to each. You do not need to know their seat numbers.',
    kid: [
      'You have a bag of marbles. You take out one marble, look at it, put it aside. Then the next one. Then the next, until the bag is empty.',
      'You never count "marble number 1, marble number 2". You only say "the next marble, please".',
      'The enhanced for loop does the same with a list of values: "for each marble in the bag, do this".'
    ],
    definition: 'The **enhanced for** loop (also called for-each) visits every item of an array or a list, from the first to the last: `for (int score : scores) { … }`. In each round, the loop variable holds the next item. You do not handle an index.',
    explain: [
      'An **array** is a numbered row of boxes that all hold the same type, written like `int[] scores = {7, 9, 4, 10, 6};`. `scores[0]` is the first box and `scores.length` is the number of boxes. Arrays get their own topic, [Arrays](../arrays/index.html); here you only need to walk through one.',
      'Read the header `for (int score : scores)` as "for each int score in scores". Left of the colon is a new variable with the item type. Right of the colon is the array (or list) to walk through.',
      'In round 1, `score` is the first item (7). In round 2, it is the second item (9), and so on. After the last item, the loop ends by itself. There is no condition to write and no counter to update, so the classic off-by-one bugs cannot happen.',
      'The loop variable is a **copy** of the item. Changing `score` inside the body does not change the array.',
      'The price for this comfort: you do not know the position of the item, you cannot skip items or walk backwards, and you cannot change the array boxes. For those jobs, use a counting `for` loop with an index.'
    ],
    why: 'Most loops over a collection need every item once, in order. The enhanced for says exactly that, with less code and no index to get wrong.',
    whenUse: 'When you need every item of an array or list and you do not need its position. Sums, searches, printing, counting.',
    syntax: '`for (Type item : arrayOrList) { body }` for example `for (String name : names) { System.out.println(name); }`',
    mermaid: `flowchart TD
  S["scores = 7, 9, 4, 10, 6"] --> Q{"another item left?"}
  Q -- yes --> N["score = next item"]
  N --> B["body: add to total, check best"]
  B --> Q
  Q -- no --> E["after the loop: print results"]`,
    visualLabel: 'For each item',
    visualNote: 'The question "another item left?" is asked by Java for you. You never write it.',
    fileName: 'ScoreReport.java',
    code: `public class ScoreReport {
    public static void main(String[] args) {
        int[] scores = {7, 9, 4, 10, 6};
        int total = 0;
        int best = scores[0];

        for (int score : scores) {
            total = total + score;
            if (score > best) {
                best = score;
            }
            System.out.println("score " + score + " -> total " + total + ", best " + best);
        }

        System.out.println("Number of scores: " + scores.length);
        System.out.println("Total: " + total);
        System.out.println("Best: " + best);
    }
}`,
    output: `score 7 -> total 7, best 7
score 9 -> total 16, best 9
score 4 -> total 20, best 9
score 10 -> total 30, best 10
score 6 -> total 36, best 10
Number of scores: 5
Total: 36
Best: 10`,
    codeSummary: 'The loop walks through five scores once and builds two results at the same time: the total and the best score.',
    codeExplanation: [
      { label: 'Line 3', code: 'int[] scores = {7, 9, 4, 10, 6};', text: 'An array of five ints. The braces list the items in order.' },
      { label: 'Line 5', code: 'int best = scores[0];', text: 'Start the best with the first item. `scores[0]` reads box number 0.' },
      { label: 'Line 7', code: 'for (int score : scores) {', text: 'For each int in `scores`, put it into `score` and run the body. Five items, five rounds.' },
      { label: 'Line 8', code: 'total = total + score;', text: 'Add this round\'s item to the sum.' },
      { label: 'Line 9', code: 'if (score > best) {', text: 'An if inside a loop: a decision in every round. Only bigger scores replace the best.' },
      { label: 'Line 12', code: 'System.out.println("score " + score + " -> total " + total + ", best " + best);', text: 'Prints the trace of each round.' },
      { label: 'Line 15', code: 'System.out.println("Number of scores: " + scores.length);', text: '`length` is the number of items in the array. The loop used it without you writing it.' }
    ],
    sections: [
      {
        title: 'Trace: which item is in score?',
        text: [
          'The loop variable takes each item in turn. The index exists, but Java keeps it hidden from you.'
        ],
        table: {
          head: ['Round', 'hidden index', '`score`', 'total', 'best'],
          rows: [
            ['1', '0', '7', '7', '7'],
            ['2', '1', '9', '16', '9'],
            ['3', '2', '4', '20', '9'],
            ['4', '3', '10', '30', '10'],
            ['5', '4', '6', '36', '10']
          ],
          note: 'After round 5 no item is left and the loop ends.'
        }
      },
      {
        title: 'With an index, or without?',
        text: [
          'Both loops below print the same names. The counting `for` needs a start, a condition with `length`, an update and `names[i]`. The enhanced for needs none of that. But only the counting loop knows that Mina is at position 1.'
        ],
        fileName: 'TwoWays.java',
        code: `public class TwoWays {
    public static void main(String[] args) {
        String[] names = {"Ari", "Mina", "Sol"};

        for (int i = 0; i < names.length; i++) {
            System.out.println(i + ": " + names[i]);
        }

        for (String name : names) {
            System.out.println("Hello, " + name);
        }
    }
}`,
        output: `0: Ari
1: Mina
2: Sol
Hello, Ari
Hello, Mina
Hello, Sol`,
        table: {
          head: ['You need …', 'Counting `for`', 'Enhanced for'],
          rows: [
            ['every item, in order', 'works', 'best choice'],
            ['the position (index)', 'yes', 'no'],
            ['only every second item, or backwards', 'yes', 'no'],
            ['to change the boxes of the array', 'yes, `names[i] = …`', 'no'],
            ['protection from off-by-one bugs', 'no', 'yes']
          ]
        }
      },
      {
        title: 'Walk through the letters of a word',
        text: [
          '`word.toCharArray()` turns a String into an array of its characters (Strings get their own topic later). Then the enhanced for can visit every letter.',
          'The body uses a switch with arrows from this topic to count vowels.'
        ],
        fileName: 'Vowels.java',
        code: `public class Vowels {
    public static void main(String[] args) {
        String word = "programming";
        int vowels = 0;

        for (char letter : word.toCharArray()) {
            switch (letter) {
                case 'a', 'e', 'i', 'o', 'u' -> vowels++;
                default -> { }
            }
        }

        System.out.println(word + " has " + vowels + " vowels");
    }
}`,
        output: 'programming has 3 vowels'
      },
      {
        title: 'The loop variable is a copy',
        text: [
          'In each round, Java copies the item into the loop variable. Changing the copy does not touch the array. To change the boxes, you need their index.'
        ],
        fileName: 'DoubleThem.java',
        code: `public class DoubleThem {
    public static void main(String[] args) {
        int[] values = {1, 2, 3};

        // Wrong: changes only the copy
        for (int v : values) {
            v = v * 2;
        }
        System.out.println("After enhanced for: " + values[0] + " " + values[1] + " " + values[2]);

        // Right: change the box at each index
        for (int i = 0; i < values.length; i++) {
            values[i] = values[i] * 2;
        }
        System.out.println("After counting for: " + values[0] + " " + values[1] + " " + values[2]);
    }
}`,
        output: `After enhanced for: 1 2 3
After counting for: 2 4 6`,
        warn: 'Java does not warn you about the wrong version. It compiles and runs, and the array stays the same.'
      },
      {
        title: 'Lists work the same way',
        text: [
          'The enhanced for also walks through lists. `List.of(…)` makes a fixed list; lists are taught in [Collections](../collections/index.html). The loop looks exactly like the array loop.'
        ],
        fileName: 'Shopping.java',
        code: `import java.util.List;

public class Shopping {
    public static void main(String[] args) {
        List<String> items = List.of("bread", "milk", "apples");
        int count = 0;

        for (String item : items) {
            count++;
            System.out.println(count + ". " + item);
        }
    }
}`,
        output: `1. bread
2. milk
3. apples`
      }
    ],
    technical: [
      'For an array, `javac` rewrites `for (int score : scores)` into a counting loop with a hidden index: `for (int $i = 0; $i < scores.length; $i++) { int score = scores[$i]; … }`. So it is exactly as fast as the counting loop you would write yourself.',
      'For a list (and anything else that is `Iterable`), `javac` rewrites it to use an **iterator**: an object that knows the current position and has the methods `hasNext()` and `next()`. The loop asks `hasNext()` before each round and `next()` gives the item.',
      'If you add or remove items of a list while an enhanced for walks through it, the iterator notices and throws a `ConcurrentModificationException`. Collect the changes and apply them after the loop.'
    ],
    tryIt: {
      steps: [
        'Copy `ScoreReport.java` and run it.',
        'Add a score of 12 at the end of the array and run it again.',
        'Add a counter `int passed = 0;` and count the scores that are 6 or more.',
        'Print the counter after the loop.'
      ],
      see: 'Number of scores 6, total 48, best 12, and passed 5.'
    },
    check: [
      { q: 'How do you read `for (String name : names)` out loud?', a: '"For each String name in names." In each round `name` is the next item.' },
      { q: 'Does `v = v * 2;` inside `for (int v : values)` change the array?', a: 'No. `v` is a copy of the item. Use a counting loop and `values[i] = …` to change the array.' },
      { q: 'When do you need a counting `for` instead?', a: 'When you need the position, want to skip items or go backwards, or want to change the boxes of the array.' }
    ],
    keyPoints: [
      '`for (Type item : array)` visits every item, first to last.',
      'No counter, no condition, no update: no off-by-one bugs.',
      'The loop variable is a copy of the item.',
      'Use a counting `for` when you need the index.',
      'It works with arrays and with lists.'
    ],
    commonMistakes: [
      '`for (int i : scores) { total += scores[i]; }` uses the item as an index. Write `total += i;`, or better name it `score`.',
      'Changing the loop variable to change the array. Use `values[i] = …` in a counting loop.',
      '`for (score : scores)` without a type. Write `for (int score : scores)`.',
      'Using a `;` instead of the colon: `for (int s ; scores)`. Write `:`.'
    ],
    related: ['for Loop', 'Choosing the Right Loop', 'Arrays', 'Collections'],
    glossary: CF.glossary
  });
})();
