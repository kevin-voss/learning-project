// Recursion, part 1: what recursion is (countdown, base case) and the call stack.
(function () {
  Java.addCoreTopic('recursion', {
    label: 'Recursion',
    headline: 'Recursion,',
    accent: 'dolls inside dolls.',
    intro: 'A recursive method calls itself with a smaller problem, until the problem is so small that the answer is clear without more work. That smallest case is the base case.',
    overview: 'Countdown and the base case → the call stack → factorial and the sum of a list → StackOverflowError → recursion or a loop → strings, arrays and binary search → the Fibonacci call tree → walking a folder tree. Deeper: memoization. A second view of the call stack lives in [Computer Science](../../../computer-science/index.html#recursion-call-stack).',
    tryIt: {
      steps: [
        'Create `CountLetters.java` with a `public class CountLetters` and a `main` method.',
        'Write `static int countLetters(String text)`. Base case: if `text.isEmpty()`, return `0`.',
        'Recursive case: return `1 + countLetters(text.substring(1))`.',
        'Add a first line to the method: `System.out.println("countLetters(\\"" + text + "\\")");`.',
        'In `main`, print `countLetters("doll")`, then `countLetters("")`. Compile and run with `java CountLetters.java`.'
      ],
      see: 'Five trace lines for `"doll"`, `"oll"`, `"ll"`, `"l"` and `""`, then `4`. Then one trace line for `""` and `0`.'
    },
    check: [
      { q: 'What are the two parts every recursive method needs?', a: 'A **base case**, where it answers without calling itself, and a **recursive case**, where it calls itself with a smaller input.' },
      { q: 'What happens if the base case is missing?', a: 'The method calls itself again and again. Each call adds a frame to the call stack until the stack is full and Java throws `StackOverflowError`.' },
      { q: 'What is `factorial(4)` and how do the answers travel?', a: 'The calls go down: 4 → 3 → 2 → 1. Then the answers come back up: 1, 2 × 1 = 2, 3 × 2 = 6, 4 × 6 = **24**.' },
      { q: 'Why is the plain recursive `fib(40)` so slow?', a: 'Each call starts two more calls, so the calls form a tree. The same values (like `fib(2)`) are computed again and again: more than 300 million calls. Memoization stores each answer once.' },
      { q: 'When is recursion a better choice than a loop?', a: 'When the data is nested like a tree: folders inside folders, a menu with submenus, a family tree. For a flat list or counting, a loop is usually simpler and cannot overflow the stack.' }
    ]
  }, [
    {
      id: 'base-case',
      title: 'What Recursion Is: Countdown and the Base Case',
      category: 'concept',
      icon: '🪆',
      tagline: 'Open the doll, find a smaller one, stop at the smallest',
      realWorld: 'Russian nesting dolls. You open a doll and find a smaller doll inside. You do the same thing again. When you reach the smallest doll, which does not open, you stop.',
      kid: [
        'Imagine a big wooden doll. You twist it open and inside is a smaller doll. You twist that one open too. Inside is an even smaller doll.',
        'You do the same thing every time: open the doll. The only thing that changes is the size. It gets smaller each time.',
        'Then you find a tiny doll that does not open. Now you stop. That tiny doll is the **base case**: the moment you know you are done.',
        'A recursive method is like that. It does a little bit of work, then asks a copy of itself to do the rest of the job, a smaller one.'
      ],
      definition: 'A **recursive method** is a method that calls itself. It has a **base case**, where it stops, and a **recursive case**, where it calls itself with a smaller input.',
      explain: [
        'You already know [methods](../methods/index.html): a method can call another method. Recursion means the method calls **itself**. Java allows this. To Java it is an ordinary method call.',
        'The **base case** is the smallest input. There the method answers directly, without calling itself. In a countdown, the base case is `n == 0`: you print "Liftoff!" and stop.',
        'The **recursive case** is every other input. The method does a small piece of work (print one number) and then calls itself with an input that is one step closer to the base case (`n - 1`).',
        'Each call is a new, separate run of the method. Each run has its own copy of the parameter `n`. The call `countdown(3)` has `n = 3`. Inside it, `countdown(2)` has its own `n = 2`. They do not overwrite each other.',
        'Think of two mirrors facing each other: you see a picture inside a picture inside a picture. Without a base case, recursion is like those mirrors: it never ends. The base case is what makes it stop.'
      ],
      why: 'Some problems are made of smaller copies of themselves. Recursion lets you write the solution for one step and let the method handle the rest.',
      whenUse: 'When you can say "the same job, but smaller": a countdown, a list without its first item, a folder inside a folder.',
      syntax: '`returnType name(parameters) { if (baseCase) { return answer; } … return name(smallerInput); }`',
      fileName: 'Countdown.java',
      code: `public class Countdown {
    static void countdown(int n) {
        if (n == 0) {                 // base case: the smallest doll
            System.out.println("Liftoff!");
            return;                   // stop here, no more calls
        }
        System.out.println(n);        // a little work
        countdown(n - 1);             // the same job, one smaller
    }

    public static void main(String[] args) {
        countdown(3);
    }
}`,
      output: `3
2
1
Liftoff!`,
      codeSummary: 'The method prints one number and then asks a smaller copy of itself to print the rest. At 0 it prints "Liftoff!" and stops.',
      codeExplanation: [
        { label: 'Line 2', code: 'static void countdown(int n) {', text: 'A normal `static` method with one `int` parameter. It returns nothing (`void`).' },
        { label: 'Line 3', code: 'if (n == 0) {', text: 'The **base case** comes first. Before you do anything else, you check: am I at the smallest doll?' },
        { label: 'Line 4', code: 'System.out.println("Liftoff!");', text: 'The answer for the smallest input. No more calls are needed.' },
        { label: 'Line 5', code: 'return;', text: 'Leaves this call right away. Without it, the code below would run with `n = 0` and call `countdown(-1)`.' },
        { label: 'Line 7', code: 'System.out.println(n);', text: 'The small piece of work for this one call: print the current number.' },
        { label: 'Line 8', code: 'countdown(n - 1);', text: 'The **recursive case**. The method calls itself with `n - 1`, one step closer to the base case.' },
        { label: 'Line 12', code: 'countdown(3);', text: 'The first call. It starts the chain 3 → 2 → 1 → 0.' }
      ],
      sections: [
        {
          title: 'The two parts of every recursive method',
          text: ['Every recursive method has the same two parts. If one is missing, it does not work.'],
          table: {
            head: ['Part', 'What it does', 'In `countdown`'],
            rows: [
              ['Base case', 'Answers the smallest input directly. Stops the calls.', '`if (n == 0)` → print "Liftoff!" and `return`'],
              ['Recursive case', 'Does a little work, then calls itself with a smaller input.', 'print `n`, then `countdown(n - 1)`'],
              ['Progress', 'Every call must move closer to the base case.', '`n - 1` makes `n` smaller each time']
            ],
            note: 'Write the base case first. It is the first `if` in the method.'
          }
        },
        {
          title: 'The countdown, call by call',
          text: ['Follow `countdown(3)` one call at a time. Each row is a separate run of the method with its own `n`.'],
          table: {
            head: ['Call', '`n`', '`n == 0`?', 'Prints', 'Then'],
            rows: [
              ['`countdown(3)`', '3', 'no', '`3`', 'calls `countdown(2)`'],
              ['`countdown(2)`', '2', 'no', '`2`', 'calls `countdown(1)`'],
              ['`countdown(1)`', '1', 'no', '`1`', 'calls `countdown(0)`'],
              ['`countdown(0)`', '0', '**yes**', '`Liftoff!`', '`return`: no more calls']
            ]
          },
          mermaid: 'flowchart LR\n  A["countdown(3)<br>prints 3"] --> B["countdown(2)<br>prints 2"]\n  B --> C["countdown(1)<br>prints 1"]\n  C --> D["countdown(0)<br>base case"]\n  D --> E["prints Liftoff!"]',
          diagramNote: 'Each box is one call. The arrow means "calls". The chain stops at the base case.'
        },
        {
          title: 'Three questions before you write one',
          text: ['Ask these three questions every time. The answers are your method.'],
          bullets: [
            '**What is the smallest input?** That is the base case. For a countdown: 0. For a text: the empty string `""`.',
            '**How do I make the input smaller?** `n - 1`, `text.substring(1)`, the list without its first item.',
            '**What small work does one call do?** Print one star, add one number, look at one letter.'
          ],
          code: `public class Stars {
    // prints n stars on one line
    static void stars(int n) {
        if (n == 0) {              // smallest input: no stars left
            System.out.println();  // end the line
            return;
        }
        System.out.print("*");     // one call prints one star
        stars(n - 1);              // the rest is a smaller job
    }

    public static void main(String[] args) {
        stars(5);
        stars(2);
        stars(0);
        System.out.println("done");
    }
}`,
          fileName: 'Stars.java',
          output: `*****
**

done`,
          tip: '`stars(0)` prints an empty line. The base case is a real answer too, not only a stop sign.'
        },
        {
          title: 'Each call has its own n',
          text: [
            'A common worry: "If `countdown` changes `n`, does it break the outer call?" No. `n - 1` does not change `n`. It computes a new value and passes it to a **new** call.',
            'Every call gets its own box of local variables. The next lesson shows where those boxes live: the call stack.'
          ],
          warn: 'Do not write `countdown(n--)`. `n--` passes the **old** value and then lowers `n`, so the call gets the same number again and never reaches 0.'
        }
      ],
      technical: [
        'The compiler treats a call to the same method like any other call. In the bytecode it is the same instruction (`invokestatic` for a `static` method) that calls any other method.',
        'Each time the method is called, the JVM makes a new **stack frame**: a small block of memory for that call\'s parameters and local variables. So `countdown(3)` and `countdown(2)` each have their own `n`.',
        'When a call reaches `return` (or the end of a `void` method), its frame is removed and Java goes back to the line after the call in the caller.'
      ],
      tryIt: {
        steps: [
          'Save the example as `Countdown.java` and run `java Countdown.java`.',
          'Change `countdown(3)` in `main` to `countdown(5)` and run again.',
          'Change the base case to `if (n == 2)` and run again.'
        ],
        see: '`3 2 1 Liftoff!`, then `5 4 3 2 1 Liftoff!`. With `n == 2`: `5 4 3 Liftoff!`, because the chain stops earlier.'
      },
      check: [
        { q: 'What is the base case in `countdown`?', a: '`n == 0`. There it prints "Liftoff!" and returns without calling itself.' },
        { q: 'Why does `countdown(n - 1)` eventually stop?', a: 'Each call passes a number one smaller. Starting from a positive number, it reaches 0, the base case.' },
        { q: 'Does `countdown(2)` change the `n` of `countdown(3)`?', a: 'No. Each call has its own `n`. `countdown(3)` still has `n = 3`.' }
      ],
      keyPoints: [
        'A recursive method calls itself.',
        'Base case: the smallest input, answered directly. Write it first.',
        'Recursive case: a little work plus a call with a smaller input.',
        'Every call has its own parameters and local variables.'
      ],
      commonMistakes: [
        'No base case: `static void countdown(int n) { System.out.println(n); countdown(n - 1); }` never stops. Add `if (n == 0) { … return; }` first.',
        'Same input again: `countdown(n)` instead of `countdown(n - 1)` never gets closer. Make the input smaller.',
        'Forgetting `return` in the base case: the code below it still runs. End the base case with `return`.',
        'Using `countdown(n--)`: passes the old value. Use `countdown(n - 1)`.'
      ],
      related: ['Methods', 'Control Flow', 'call-stack']
    },
    {
      id: 'call-stack',
      title: 'The Call Stack: Going Down and Coming Back',
      category: 'concept',
      icon: '📚',
      tagline: 'Each call puts a plate on the pile, each return takes one off',
      realWorld: 'A pile of plates. You put a new plate on top. You always take the top plate first. The plate at the bottom comes off last.',
      kid: [
        'Every time a method is called, Java puts a plate on a pile. On the plate it writes: "I am `dive(2)`, my number is 2, I stopped at this line."',
        'When that method calls itself, a new plate goes on top. The old plate waits underneath.',
        'When the top method is finished, Java takes its plate away. Now the plate below is on top again, and that method goes on where it stopped.',
        'So recursion has two trips: going **down** (plates pile up) and coming **back up** (plates come off).'
      ],
      definition: 'The **call stack** is the pile of method calls that are running right now. Each call adds a **stack frame** on top. When the call returns, its frame is removed and the caller goes on.',
      explain: [
        'A **stack** is a pile where you add and remove only at the top. "Last in, first out": the newest call finishes first. You met the stack in [Types & Variables](../types-and-variables/index.html) as the place where local variables live.',
        'A **stack frame** is one entry on that pile. It holds one call\'s parameters, its local variables and the **return address**: the place in the caller where Java continues when the call is done.',
        'With recursion the same method has many frames on the stack at once. `dive(2)`, `dive(1)` and `dive(0)` are all "open" at the same time. Only the top one runs. The others wait.',
        'Code **before** the recursive call runs on the way down. Code **after** the recursive call runs on the way back up, in reverse order. This is the key to reading any recursive method.',
        'When the base case returns, the frames come off one by one. Each caller wakes up at the line after its call, with its own variables still in place.'
      ],
      why: 'If you can picture the call stack, you can predict what any recursive method prints and returns.',
      whenUse: 'Every time you read or debug a recursive method. Draw the frames on paper.',
      syntax: 'Work **before** the call runs going down. Work **after** the call runs coming back up: `before(); recurse(smaller); after();`',
      fileName: 'CallStack.java',
      code: `public class CallStack {
    static void dive(int n, int depth) {
        String indent = "  ".repeat(depth);       // deeper call, more spaces
        System.out.println(indent + "enter dive(" + n + ")");
        if (n > 0) {                              // recursive case
            dive(n - 1, depth + 1);
        }
        // runs after the deeper call has returned
        System.out.println(indent + "leave dive(" + n + ")");
    }

    public static void main(String[] args) {
        System.out.println("main starts");
        dive(2, 1);
        System.out.println("main ends");
    }
}`,
      output: `main starts
  enter dive(2)
    enter dive(1)
      enter dive(0)
      leave dive(0)
    leave dive(1)
  leave dive(2)
main ends`,
      codeSummary: 'Every call prints "enter" when it starts and "leave" when it ends. The indent shows how deep the stack is.',
      codeExplanation: [
        { label: 'Line 2', code: 'static void dive(int n, int depth) {', text: '`n` gets smaller each call. `depth` only counts how deep we are, for the indent.' },
        { label: 'Line 3', code: 'String indent = "  ".repeat(depth);', text: '`repeat` makes two spaces per level. Each frame has its own `indent`.' },
        { label: 'Line 4', code: 'System.out.println(indent + "enter dive(" + n + ")");', text: 'Runs on the way **down**, as soon as the call starts.' },
        { label: 'Line 5', code: 'if (n > 0) {', text: 'Base case is `n == 0`: then the `if` is skipped and no deeper call happens.' },
        { label: 'Line 6', code: 'dive(n - 1, depth + 1);', text: 'A new frame goes on top. This frame pauses here and waits.' },
        { label: 'Line 9', code: 'System.out.println(indent + "leave dive(" + n + ")");', text: 'Runs on the way **back up**, after the deeper call returned. That is why the "leave" lines come in reverse order.' },
        { label: 'Line 14', code: 'dive(2, 1);', text: '`main` has its own frame at the bottom of the stack. It waits until `dive(2)` is done.' }
      ],
      sections: [
        {
          title: 'The stack at its deepest point',
          text: ['When `dive(0)` runs, four frames are on the stack. The top one runs. The others wait at the line where they made their call.'],
          table: {
            head: ['Frame (top first)', '`n`', '`indent`', 'Waiting at'],
            rows: [
              ['`dive(0)` ← running', '0', '6 spaces', 'running now'],
              ['`dive(1)`', '1', '4 spaces', 'line 6, the call `dive(0, 3)`'],
              ['`dive(2)`', '2', '2 spaces', 'line 6, the call `dive(1, 2)`'],
              ['`main`', '-', '-', 'line 14, the call `dive(2, 1)`']
            ],
            note: 'Three frames of the same method, each with its own `n` and `indent`.'
          }
        },
        {
          title: 'The calls as a sequence',
          text: ['A **sequence diagram** shows who calls whom over time, from top to bottom. Solid arrows are calls. Dashed arrows are returns.'],
          mermaid: 'sequenceDiagram\n  participant M as main\n  participant D2 as dive(2)\n  participant D1 as dive(1)\n  participant D0 as dive(0)\n  M->>D2: call\n  D2->>D1: call\n  D1->>D0: call\n  Note over D0: base case, n is 0\n  D0-->>D1: return\n  D1-->>D2: return\n  D2-->>M: return',
          diagramNote: 'The calls go right (down the stack). The returns come back left in reverse order.'
        },
        {
          title: 'The stack grows and shrinks',
          text: ['Here is the pile after each step. The top of the stack is written first.'],
          table: {
            head: ['Step', 'What happens', 'Stack (top first)', 'Size'],
            rows: [
              ['1', '`main` calls `dive(2)`', '`dive(2)`, `main`', '2'],
              ['2', '`dive(2)` calls `dive(1)`', '`dive(1)`, `dive(2)`, `main`', '3'],
              ['3', '`dive(1)` calls `dive(0)`', '`dive(0)`, `dive(1)`, `dive(2)`, `main`', '4'],
              ['4', '`dive(0)` returns', '`dive(1)`, `dive(2)`, `main`', '3'],
              ['5', '`dive(1)` returns', '`dive(2)`, `main`', '2'],
              ['6', '`dive(2)` returns', '`main`', '1']
            ]
          }
        },
        {
          title: 'Before the call or after the call',
          text: [
            'Move the print line from before the recursive call to after it, and the order flips. Before: the numbers print going down. After: they print coming back up.',
            '`countUp` prints after the call, so the first number printed comes from the deepest frame.'
          ],
          code: `public class BeforeAfter {
    static void countDown(int n) {
        if (n == 0) {
            return;
        }
        System.out.print(n + " ");   // before the call: on the way down
        countDown(n - 1);
    }

    static void countUp(int n) {
        if (n == 0) {
            return;
        }
        countUp(n - 1);
        System.out.print(n + " ");   // after the call: on the way back up
    }

    public static void main(String[] args) {
        countDown(3);
        System.out.println("| down");
        countUp(3);
        System.out.println("| up");
    }
}`,
          fileName: 'BeforeAfter.java',
          output: `3 2 1 | down
1 2 3 | up`,
          tip: 'To read a recursive method, mark each line "down" (before the call) or "up" (after the call).'
        }
      ],
      technical: [
        'Each thread in the JVM has its own call stack. The `main` method runs on the main thread, so its frame is at the bottom.',
        'A frame holds the method\'s local variables, the values it is working with right now, and the return address. When the method returns, the whole frame is dropped at once. That is why local variables disappear when a method ends.',
        'The stack has a fixed maximum size (often around 512 KB to 1 MB per thread by default). Each frame takes some bytes, so the number of frames is limited. Too many frames give `StackOverflowError`, as you see in a later lesson.',
        'A stack trace, which you met in [Exceptions](../exceptions/index.html), is a printout of the call stack at one moment: the top frame first, `main` last.'
      ],
      tryIt: {
        steps: [
          'Run `CallStack.java` with `dive(2, 1)`.',
          'Change it to `dive(4, 1)` and run again.',
          'Remove the "enter" line and run again.'
        ],
        see: 'With 4: five "enter" lines going deeper, then five "leave" lines coming back. Without "enter": only `leave dive(0)` up to `leave dive(4)`, deepest first.'
      },
      check: [
        { q: 'Which frame is removed first?', a: 'The top one, the newest call. Last in, first out.' },
        { q: 'When does code after the recursive call run?', a: 'On the way back up, after the deeper call has returned.' },
        { q: 'How many frames are on the stack while `dive(0)` runs, starting from `dive(2, 1)`?', a: 'Four: `dive(0)`, `dive(1)`, `dive(2)` and `main`.' }
      ],
      keyPoints: [
        'Each call adds a stack frame. Each return removes one.',
        'Only the top frame runs. The others wait at their call line.',
        'Code before the call runs going down. Code after the call runs coming back up.',
        'The stack has a limited size.'
      ],
      commonMistakes: [
        'Thinking `countUp` prints `3 2 1` because it starts at 3: the print is after the call, so it prints `1 2 3`.',
        'Expecting one shared `n` for all calls: each frame has its own copy.',
        'Reading only the way down: the lines after `dive(n - 1, depth + 1);` still run for every frame, in reverse.'
      ],
      related: ['base-case', 'factorial', 'Exceptions', 'Types & Variables']
    }
  ]);
})();
