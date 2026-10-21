// Lesson 10 (Deeper): varargs, any number of arguments.
(function () {
  Java.addCoreLessons('methods', [{
    id: 'varargs',
    title: 'Varargs: Any Number of Arguments',
    category: 'deeper',
    icon: '...',
    tagline: 'One parameter, many values',
    realWorld: 'A shopping bag. You can put in one apple, five apples, or none at all. It is still one bag.',
    kid: [
      'Some jobs work with any number of things. "Add these up" works for two numbers, for five numbers, even for none (then the answer is 0).',
      'Java has a special bag parameter for that. You write three dots after the type. Then the caller can put in as many values as they like.',
      'Inside the method, the bag is a row of boxes. You look into each box, one after the other.'
    ],
    definition: 'A **varargs** parameter (short for "variable number of arguments") is written `type... name`. It accepts zero or more arguments of that type. Inside the method it is an array.',
    explain: [
      'For `static int sum(int... numbers)`, all these calls are fine: `sum()`, `sum(5)`, `sum(1, 2, 3, 4)`. javac packs the arguments into a new array and passes that array as `numbers`.',
      'Inside the method, `numbers` is an `int[]`: `numbers.length` is how many values came in, and `numbers[0]` is the first one. A for-each loop from [Control flow](../control-flow/index.html), `for (int n : numbers)`, visits each value. [Arrays](../arrays/index.html) explains arrays fully.',
      'Two rules: a method has **at most one** varargs parameter, and it must be the **last** one. `join(String separator, String... words)` is fine; `log(String... words, int level)` is not, because javac could not tell where the words end.',
      'You may also pass a ready array: `sum(prices)` with `int[] prices`. It is used as it is, without packing.',
      'You already know a varargs method: `System.out.printf(String format, Object... args)`. That is why `printf` takes any number of values after the format text.'
    ],
    why: 'Without varargs you would write `sum(int a, int b)`, `sum(int a, int b, int c)` and so on, or make the caller build an array first.',
    whenUse: 'For "any number of the same kind": sum, max, join, a log line with details. Not when the method needs an exact number of inputs.',
    syntax: '`static returnType name(otherParams, type... name) { … }`, called as `name(a, b, c)` or `name()` or `name(array)`.',
    fileName: 'VarargsDemo.java',
    code: `public class VarargsDemo {
    static int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) {
            total = total + n;
        }
        return total;
    }

    static String join(String separator, String... words) {
        String result = "";
        for (int i = 0; i < words.length; i++) {
            if (i > 0) {
                result = result + separator;
            }
            result = result + words[i];
        }
        return result;
    }

    public static void main(String[] args) {
        System.out.println(sum());
        System.out.println(sum(5));
        System.out.println(sum(1, 2, 3, 4));
        int[] prices = {10, 20, 30};
        System.out.println(sum(prices));
        System.out.println(join(", ", "red", "green", "blue"));
        System.out.println("[" + join("-") + "]");
        System.out.printf("%s has %d points%n", "Ada", 12);
    }
}`,
    output: `0
5
10
60
red, green, blue
[]
Ada has 12 points`,
    codeSummary: '`sum` adds any number of `int` values. `join` takes one fixed parameter and then any number of words. `printf` from Java is varargs too.',
    codeExplanation: [
      { label: 'Line 2', code: 'static int sum(int... numbers) {', text: 'The three dots make `numbers` a varargs parameter. Inside, it is an `int[]`.' },
      { label: 'Line 4', code: 'for (int n : numbers) {', text: 'Visit every value that came in. With `sum()` the array is empty, so the loop does not run.' },
      { label: 'Line 10', code: 'static String join(String separator, String... words) {', text: 'A normal parameter first, the varargs last.' },
      { label: 'Line 12', code: 'for (int i = 0; i < words.length; i++) {', text: '`words.length` is the number of words passed.' },
      { label: 'Line 22', code: 'System.out.println(sum());', text: 'Zero arguments: an empty array, so the result is 0.' },
      { label: 'Line 24', code: 'System.out.println(sum(1, 2, 3, 4));', text: 'javac packs the four values into `new int[] {1, 2, 3, 4}`.' },
      { label: 'Line 26', code: 'System.out.println(sum(prices));', text: 'A ready `int[]` goes in as it is.' },
      { label: 'Line 28', code: 'System.out.println("[" + join("-") + "]");', text: 'No words: `join` returns empty text, so the brackets show nothing between them.' },
      { label: 'Line 29', code: 'System.out.printf("%s has %d points%n", "Ada", 12);', text: '`printf` takes a format and then any number of values. `%s` is replaced by text, `%d` by a whole number, `%n` is a line break.' }
    ],
    sections: [
      {
        title: 'What javac makes of a varargs call',
        text: [
          'A varargs call is a short way of writing an array. javac rewrites it for you before the program runs.'
        ],
        mermaid: `flowchart LR
    C["you write: sum(1, 2, 3)"] --> J["javac packs the values"]
    J --> A["sum(new int[] of 1, 2, 3)"]
    A --> P["numbers = that array"]`,
        diagramNote: 'So `sum(1, 2, 3)` and `sum(new int[] {1, 2, 3})` are the same call in the end.'
      },
      {
        title: 'The rules',
        table: {
          head: ['Header', 'Allowed?', 'Why'],
          rows: [
            ['`sum(int... n)`', 'yes', 'one varargs parameter'],
            ['`join(String sep, String... words)`', 'yes', 'varargs comes last'],
            ['`log(String... words, int level)`', 'no', 'varargs must be last'],
            ['`mix(int... a, String... b)`', 'no', 'at most one varargs'],
            ['`sum(int... n)` and `sum(int[] n)` together', 'no', 'both are `sum(int[])` inside']
          ]
        },
        fileName: 'VarargsLast.java',
        noRun: true,
        code: `public class VarargsLast {
    static void log(String... words, int level) {     // wrong: not last
        System.out.println(level);
    }

    public static void main(String[] args) {
        log("a", "b", 1);
    }
}`,
        output: `VarargsLast.java:2: error: varargs parameter must be the last parameter
    static void log(String... words, int level) {     // wrong: not last
                              ^
1 error`,
        warn: 'This code does not compile on purpose. Fix: `static void log(int level, String... words)`.'
      },
      {
        title: 'Varargs and overloading',
        text: [
          'When a fixed method and a varargs method both fit, the fixed one wins. javac tries varargs only in its last round, when nothing else fits.'
        ],
        fileName: 'VarargsOverload.java',
        code: `public class VarargsOverload {
    static void show(int a, int b) {
        System.out.println("two ints");
    }

    static void show(int... all) {
        System.out.println("varargs with " + all.length + " values");
    }

    public static void main(String[] args) {
        show(1, 2);        // the fixed version fits: it wins
        show(1, 2, 3);     // only varargs fits
        show();            // only varargs fits
    }
}`,
        output: `two ints
varargs with 3 values
varargs with 0 values`
      },
      {
        title: 'At least one value',
        text: [
          'What is the largest of no numbers? There is no good answer. When a method needs at least one value, write one normal parameter and then the varargs. Now `max()` does not even compile.'
        ],
        fileName: 'MaxOfMany.java',
        code: `public class MaxOfMany {
    static int max(int first, int... rest) {
        int best = first;
        for (int n : rest) {
            if (n > best) {
                best = n;
            }
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(max(4));
        System.out.println(max(4, 9, 2));
        System.out.println(max(-5, -1, -8));
    }
}`,
        output: `4
9
-1`,
        tip: 'Use varargs for "any number of the same kind". If the values have different meanings (a name, an age, a city), use normal parameters.'
      }
    ],
    technical: [
      'In bytecode a varargs method is an ordinary method with an array parameter and a flag called `ACC_VARARGS`. `sum(int...)` has the descriptor `([I)I`, exactly like `sum(int[])`. That is why both cannot exist in one class.',
      'At every varargs call, javac writes code that creates a new array. In a loop that runs millions of times this makes many small arrays. It is usually fine, but it is why some library methods offer fixed versions for a few arguments next to the varargs one.',
      'Overload choice tries varargs last (round 3, see the overloading lesson). So adding a varargs method never changes which method an existing call picks.'
    ],
    tryIt: {
      steps: [
        'Make `Average.java` with `static double average(int... values)`.',
        'If `values.length` is 0, return `0.0`. Otherwise add all values and return the sum divided by `values.length` (use `(double)` before the sum).',
        'In `main`, print `average()`, `average(4)` and `average(1, 2, 3, 4)`.',
        'Compile and run.'
      ],
      see: '`0.0`, `4.0` and `2.5`.'
    },
    check: [
      { q: 'Inside `static int sum(int... numbers)`, what type is `numbers`?', a: 'An `int[]`, an array of `int`.' },
      { q: 'Is `static void log(String... parts, int level)` allowed?', a: 'No. The varargs parameter must be the last one: `log(int level, String... parts)`.' },
      { q: 'With `show(int a, int b)` and `show(int... all)`, which one does `show(1, 2)` call?', a: '`show(int a, int b)`. A fixed method that fits always wins over varargs.' }
    ],
    keyPoints: [
      '`type... name` accepts zero or more arguments.',
      'Inside the method it is an array: use `.length` and a loop.',
      'Only one varargs parameter, and it must be last.',
      'A fixed overload that fits beats varargs.',
      '`printf` is a varargs method you already know.'
    ],
    commonMistakes: [
      'Varargs not last: `log(String... words, int level)`. Fix: `log(int level, String... words)`.',
      'Forgetting that zero arguments are allowed: `numbers[0]` in `sum()` crashes. Fix: check `numbers.length`, or use `(int first, int... rest)`.',
      'Using varargs for values of different meaning: `user(String... data)` for name, age and city. Fix: `user(String name, int age, String city)`.',
      'Writing both `sum(int... n)` and `sum(int[] n)`. Fix: keep one; they are the same method inside.'
    ],
    related: ['Overloading', 'Arrays', 'Control Flow']
  }]);
})();
