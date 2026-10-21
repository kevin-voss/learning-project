// Lesson 6: pass-by-value for primitives and references, with memory diagrams.
(function () {
  Java.addCoreLessons('methods', [{
    id: 'pass-by-value',
    title: 'Pass-by-Value',
    category: 'concept',
    icon: '=',
    tagline: 'Java always passes a copy',
    realWorld: 'A photocopy of your drawing. Your friend can scribble on the copy, and your drawing stays clean. But if you give a friend a copy of your home address, they can go to your house and paint the door.',
    kid: [
      'When you give a method a number, Java makes a copy of the number and gives it the copy. If the method changes its copy, your number stays the same.',
      'Some things are too big to copy, like a whole toy box. Then Java gives the method a card with the address of the toy box. The card is a copy too.',
      'With that card, the method can walk to your toy box and move the toys around. You will see the change. But if the method crosses out the address and writes a new one, your toy box does not care.'
    ],
    definition: 'Java is always **pass-by-value**: every argument is copied into its parameter. For a primitive, the copy is the value itself. For an array or object, the copy is the **reference** (the arrow), so both arrows point to the same thing.',
    explain: [
      'Recall from [Types and variables](../types-and-variables/index.html): a primitive variable (`int`, `double`, `boolean` …) holds its value directly. A variable of an object type holds a **reference**: an arrow to the object, which lives on the **heap** (the memory area for objects).',
      'When you call `addTen(score)`, Java copies the value of `score` into the parameter `n`. Inside, `n = n + 10;` changes only the copy. When the method returns, its frame and the copy are gone. `score` is unchanged.',
      'The next example needs an **array**: a row of numbered boxes under one name, like `int[] scores = {10, 20, 30};`, where `scores[0]` is the first box. [Arrays](../arrays/index.html), the next topic, teaches them fully.',
      'An array variable holds a reference. Passing it copies the arrow, not the boxes. Now the caller and the method point to the **same** array. If the method writes `numbers[0] = 99;`, the caller sees 99 too.',
      'If the method gives its parameter a new arrow (`numbers = new int[] {7, 7, 7};`), only its own copy of the arrow changes. The caller still points to the old array. The rule: a method can change the object an argument points to, but never the caller\'s variable.',
      'A `String` is an object too, but it can never be changed (it is **immutable**). So a method cannot change a caller\'s text at all; it can only return new text. [Strings](../strings/index.html) explains why.'
    ],
    why: 'Copying keeps the caller safe: no method can secretly change your `int`. Copying only the arrow for objects keeps calls fast, even for an array with a million boxes.',
    whenUse: 'Whenever you ask "will this method change my variable?". A primitive: never. An array or object: its contents may change, the variable itself never.',
    syntax: '`static void change(int n)`: the caller\'s value is safe. `static void change(int[] arr)`: `arr[0] = …` changes the caller\'s array; `arr = …` does not.',
    visualLabel: 'Memory while setFirst runs',
    mermaid: `flowchart LR
    subgraph stack["Stack"]
        S1["frame of main: scores = arrow"]
        S2["frame of setFirst: numbers = arrow (a copy)"]
    end
    subgraph heap["Heap"]
        H["int array: 99, 20, 30"]
    end
    S1 --> H
    S2 --> H`,
    visualNote: 'Two arrows, one array. `setFirst` follows its copy of the arrow and changes box 0. When `main` looks later, it follows its own arrow to the same array and sees 99.',
    fileName: 'PassByValue.java',
    code: `public class PassByValue {
    static void addTen(int n) {
        n = n + 10;                       // changes only the copy
        System.out.println("inside addTen: n = " + n);
    }

    static void setFirst(int[] numbers) {
        numbers[0] = 99;                  // follows the arrow: changes the shared array
    }

    static void replace(int[] numbers) {
        numbers = new int[] {7, 7, 7};    // points the copy of the arrow elsewhere
        numbers[0] = 0;                   // changes the new array only
    }

    public static void main(String[] args) {
        int score = 5;
        addTen(score);
        System.out.println("after addTen: score = " + score);

        int[] scores = {10, 20, 30};
        setFirst(scores);
        System.out.println("after setFirst: scores[0] = " + scores[0]);

        replace(scores);
        System.out.println("after replace: scores[0] = " + scores[0]);
    }
}`,
    output: `inside addTen: n = 15
after addTen: score = 5
after setFirst: scores[0] = 99
after replace: scores[0] = 99`,
    codeSummary: 'Three methods, three results: changing a primitive parameter does nothing outside; changing a box of a passed array is seen outside; pointing the parameter to a new array does nothing outside.',
    codeExplanation: [
      { label: 'Line 18', code: 'addTen(score);', text: 'The value 5 is copied into `n`. `score` and `n` are two separate boxes.' },
      { label: 'Line 3', code: 'n = n + 10;', text: 'Only `n` becomes 15. `score` in the frame of `main` is not touched.' },
      { label: 'Line 19', code: 'System.out.println("after addTen: score = " + score);', text: 'Still 5. The copy is gone with the frame of `addTen`.' },
      { label: 'Line 21', code: 'int[] scores = {10, 20, 30};', text: 'An array on the heap. `scores` holds the arrow to it.' },
      { label: 'Line 22', code: 'setFirst(scores);', text: 'The arrow is copied into `numbers`. Now two arrows point to one array.' },
      { label: 'Line 8', code: 'numbers[0] = 99;', text: 'Follows the arrow and changes the first box of the shared array.' },
      { label: 'Line 23', code: 'System.out.println("after setFirst: scores[0] = " + scores[0]);', text: '`main` follows its own arrow to the same array: 99.' },
      { label: 'Line 12', code: 'numbers = new int[] {7, 7, 7};', text: 'A new array. Only the copy of the arrow now points to it; `scores` in `main` still points to the old one.' },
      { label: 'Line 26', code: 'System.out.println("after replace: scores[0] = " + scores[0]);', text: 'Still 99: `replace` changed a different array.' }
    ],
    sections: [
      {
        title: 'Primitives: the method gets a copy',
        text: [
          'For `int`, `double`, `boolean`, `char` and the other primitives, the call copies the number itself. The method works on its copy.'
        ],
        mermaid: `flowchart LR
    subgraph mainframe["frame of main"]
        S["score = 5"]
    end
    subgraph addframe["frame of addTen"]
        N["n = 5, then 15"]
    end
    S -->|"value copied at the call"| N`,
        diagramNote: 'Two separate boxes. After the copy, nothing connects them any more.',
        table: {
          head: ['Moment', '`score` (main)', '`n` (addTen)'],
          rows: [
            ['before the call', '5', 'does not exist'],
            ['call starts', '5', '5 (copy)'],
            ['after `n = n + 10`', '5', '15'],
            ['after the return', '5', 'gone']
          ]
        }
      },
      {
        title: 'References: a new arrow does not reach the caller',
        text: [
          'In `replace`, the line `numbers = new int[] {7, 7, 7};` makes a second array and points the parameter to it. The picture shows the moment after `numbers[0] = 0;`.'
        ],
        mermaid: `flowchart LR
    M["main: scores"] --> A1["old array: 99, 20, 30"]
    R["replace: numbers"] --> A2["new array: 0, 7, 7"]`,
        diagramNote: 'The arrow of `main` still points to the old array. When `replace` returns, nothing points to the new array any more, and Java will clean it up.'
      },
      {
        title: 'The classic trap: swap',
        text: [
          'Many beginners write a `swap` method for two `int` values. It swaps the copies, and the caller sees nothing.',
          'Two fixes work: swap the boxes inside an array (the method follows the arrow), or return the new value and let the caller assign it.'
        ],
        fileName: 'Swap.java',
        code: `public class Swap {
    static void swapInts(int a, int b) {     // swaps only the copies
        int temp = a;
        a = b;
        b = temp;
    }

    static void swapInArray(int[] pair) {    // swaps the boxes of the shared array
        int temp = pair[0];
        pair[0] = pair[1];
        pair[1] = temp;
    }

    public static void main(String[] args) {
        int x = 1;
        int y = 2;
        swapInts(x, y);
        System.out.println("x = " + x + ", y = " + y);

        int[] pair = {1, 2};
        swapInArray(pair);
        System.out.println("pair = " + pair[0] + ", " + pair[1]);
    }
}`,
        output: `x = 1, y = 2
pair = 2, 1`
      },
      {
        title: 'Strings: return the new text',
        text: [
          'A `String` cannot be changed. `text = text + "!";` makes a new `String` and points the parameter to it, like `replace` above. The caller still has the old text.',
          'The fix is to return the new text and assign it in the caller.'
        ],
        fileName: 'Shout.java',
        code: `public class Shout {
    static void shoutWrong(String text) {
        text = text + "!";            // new String, only the copy points to it
    }

    static String shout(String text) {
        return text + "!";            // hand the new String back
    }

    public static void main(String[] args) {
        String word = "Hello";
        shoutWrong(word);
        System.out.println(word);

        word = shout(word);
        System.out.println(word);
    }
}`,
        output: `Hello
Hello!`
      },
      {
        title: 'The whole rule in one table',
        table: {
          head: ['You pass', 'What is copied', 'Can the method change your variable?', 'Can it change what your variable points to?'],
          rows: [
            ['`int`, `double`, `boolean` …', 'the value', 'no', 'nothing to point to'],
            ['an array', 'the arrow', 'no', 'yes: `arr[0] = …`'],
            ['a `String`', 'the arrow', 'no', 'no: a String never changes'],
            ['another object', 'the arrow', 'no', 'yes, if the object can be changed']
          ],
          note: 'The third column is always "no". That is what pass-by-value means.'
        }
      }
    ],
    technical: [
      'At the bytecode level, the caller pushes each argument on its operand stack, and the JVM copies it into a local variable slot of the new frame. For an `int` the slot holds the 32-bit number. For an array or object it holds a reference, which the JVM uses to find the object on the heap.',
      'Java has no way to pass "the variable itself". Some languages can (that is called pass-by-reference, like `ref` in C# or `&` in C++). Because Java cannot, a method can never make the caller\'s variable point somewhere else.',
      'An object on the heap lives as long as some reference points to it. In `replace`, the new array is reachable only through the parameter. When the frame is popped, nothing points to it, and the **garbage collector** (the part of the JVM that frees unused objects) can reclaim the memory later.'
    ],
    tryIt: {
      steps: [
        'Make `DoubleAll.java` with `static void doubleAll(int[] values)`.',
        'Inside, use `for (int i = 0; i < values.length; i++)` and set `values[i] = values[i] * 2;`.',
        'In `main`, make `int[] nums = {1, 2, 3};`, call `doubleAll(nums);`, then print `nums[0]`, `nums[1]` and `nums[2]`.',
        'Compile and run.'
      ],
      see: '`2`, `4` and `6`: the method changed the shared array.'
    },
    check: [
      { q: '`static void reset(int x) { x = 0; }`. After `int a = 8; reset(a);`, what is `a`?', a: '`8`. The method changed only its copy.' },
      { q: '`static void reset(int[] x) { x[0] = 0; }`. After `int[] a = {8}; reset(a);`, what is `a[0]`?', a: '`0`. Both arrows point to the same array, and the method changed its first box.' },
      { q: 'Is Java pass-by-reference for arrays and objects?', a: 'No. Java copies the reference, which is still pass-by-value. The method can change the object, but never the caller\'s variable.' }
    ],
    keyPoints: [
      'Every argument is copied into its parameter. Always.',
      'Primitive: the value is copied; the caller\'s variable is safe.',
      'Array or object: the arrow is copied; both point to the same thing.',
      'Changing the contents through the arrow is visible to the caller.',
      'Pointing the parameter to something new is not.'
    ],
    commonMistakes: [
      'Expecting `swapInts(x, y)` to swap the caller\'s `int` variables. Fix: swap inside an array, or return the new value.',
      'Expecting `text = text + "!";` in a method to change the caller\'s `String`. Fix: `return text + "!";` and write `word = shout(word);`.',
      'Being surprised that `setFirst(scores)` changed `scores`. Fix: if the original must stay untouched, pass a copy: `setFirst(scores.clone())`.',
      'Expecting `numbers = new int[3];` in a method to give the caller a new array. Fix: return the new array and assign it: `scores = makeArray();`.'
    ],
    related: ['The Call Stack and Local Variables', 'Types & Variables', 'Arrays']
  }]);
})();
