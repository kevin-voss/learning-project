// Lesson 5: calling methods, the call stack, stack frames, local variables and scope.
(function () {
  Java.addCoreLessons('methods', [{
    id: 'call-stack',
    title: 'The Call Stack and Local Variables',
    category: 'concept',
    icon: 'stk',
    tagline: 'Each call gets its own desk',
    realWorld: 'A stack of plates. You put a new plate on top, and you always take the top plate off first. Every method call is one plate.',
    kid: [
      'You are drawing a picture. Mum asks you to fetch the milk. You put down your pencil and go. In the kitchen, Dad asks you to grab a spoon too. You grab the spoon, bring the milk, and then go back to your drawing, right where you stopped.',
      'Java does the same. When `main` asks a method to do a job, `main` waits. When that method asks another one, it waits too. The newest job is always finished first. Then Java goes back, one step at a time.',
      'Every job also gets its own little notepad for its numbers. Nobody else can read it. When the job is done, the notepad goes in the bin.'
    ],
    definition: 'The **call stack** is the list of method calls that are running right now, newest on top. Each call gets a **stack frame**: a private space for its parameters and **local variables**. When the method returns, its frame is removed and those variables are gone.',
    explain: [
      'A **local variable** is a variable declared inside a method. Parameters are local variables too. They exist only while that call runs, and only that method can see them. This is the **scope** rule you met in [Types and variables](../types-and-variables/index.html): a name lives inside its `{ }`, and a method body is such a block.',
      'When `main` calls `a(3)`, Java **pushes** a new frame for `a` on top of the stack. `main` pauses on the line of the call. When `a` calls `b(4)`, a frame for `b` goes on top. Only the top frame runs.',
      'When `b` returns, its frame is **popped** (removed). `a` continues right after its call to `b` and receives the result. Then `a` returns, its frame is popped, and `main` continues. This order is called **LIFO**: last in, first out.',
      'Two methods can both have a variable named `count`. They never clash, because each lives in its own frame. Even the same method called twice gets two separate frames with separate variables.',
      'A method can never see the local variables of its caller. If it needs a value, the caller passes it as an argument. If the caller needs a value back, the method returns it.',
      'If calls go deeper and deeper without end, frames pile up until the stack is full. Java then stops with a `StackOverflowError`. [Recursion](../recursion/index.html) shows when that happens and how to avoid it.'
    ],
    why: 'The stack gives every call its own private variables, so methods cannot disturb each other. It also remembers where to go back after each call.',
    whenUse: 'When you read code with calls inside calls, and when an error message shows a list of method names (a **stack trace**): that list is the call stack at the moment of the error.',
    syntax: 'No new syntax. Every call `name(args)` pushes a frame; every `return` or closing `}` of the method pops it.',
    visualLabel: 'main calls a, a calls b, and back',
    mermaid: `sequenceDiagram
    participant main
    participant a
    participant b
    main->>a: a(3)
    activate a
    a->>b: b(4)
    activate b
    b-->>a: returns 8
    deactivate b
    a-->>main: returns 9
    deactivate a`,
    visualNote: 'Time runs from top to bottom. A solid arrow is a call, a dashed arrow is a return. A bar shows that a method is running; `main` waits while `a` runs, and `a` waits while `b` runs.',
    fileName: 'CallStack.java',
    code: `public class CallStack {
    // Real methods get better names; a and b keep the picture simple.
    static int b(int y) {
        System.out.println("    b starts with y = " + y);
        int result = y * 2;
        System.out.println("    b returns " + result);
        return result;
    }

    static int a(int x) {
        System.out.println("  a starts with x = " + x);
        int fromB = b(x + 1);
        int result = fromB + 1;
        System.out.println("  a returns " + result);
        return result;
    }

    public static void main(String[] args) {
        System.out.println("main starts");
        int answer = a(3);
        System.out.println("main got " + answer);
    }
}`,
    output: `main starts
  a starts with x = 3
    b starts with y = 4
    b returns 8
  a returns 9
main got 9`,
    codeSummary: '`main` calls `a`, and `a` calls `b`. The spaces in front of each line show how deep the call is. Both `a` and `b` have a local variable called `result`; they do not clash.',
    codeExplanation: [
      { label: 'Line 20', code: 'int answer = a(3);', text: 'Push: a frame for `a` goes on the stack with `x = 3`. `main` waits here for the result.' },
      { label: 'Line 11', code: 'System.out.println("  a starts with x = " + x);', text: '`a` runs. `x` lives in the frame of `a`.' },
      { label: 'Line 12', code: 'int fromB = b(x + 1);', text: '`x + 1` is worked out first (4). Push: a frame for `b` with `y = 4`. `a` waits.' },
      { label: 'Line 5', code: 'int result = y * 2;', text: 'A local variable of `b`. It exists only in the frame of `b`.' },
      { label: 'Line 7', code: 'return result;', text: 'Pop: the frame of `b` is removed. The value 8 goes back to line 12.' },
      { label: 'Line 13', code: 'int result = fromB + 1;', text: 'A different `result`, in the frame of `a`. The one from `b` is already gone.' },
      { label: 'Line 15', code: 'return result;', text: 'Pop: the frame of `a` is removed. 9 goes back to line 20.' },
      { label: 'Line 21', code: 'System.out.println("main got " + answer);', text: 'Only the frame of `main` is left. It prints and the program ends.' }
    ],
    sections: [
      {
        title: 'Stack frames, step by step',
        text: [
          'The table shows the stack after each step of `CallStack`. The top of the stack is written first.',
          'The picture shows the moment when `b` runs: three frames, each with its own variables.'
        ],
        table: {
          head: ['Step', 'Stack (top first)'],
          rows: [
            ['`main` starts', '`main`'],
            ['`main` calls `a(3)`', '`a`, `main`'],
            ['`a` calls `b(4)`', '`b`, `a`, `main`'],
            ['`b` returns 8', '`a`, `main`'],
            ['`a` returns 9', '`main`'],
            ['`main` ends', 'empty: the program is over']
          ]
        },
        mermaid: `flowchart TD
    B["frame of b (top, running): y = 4, result = 8"]
    A["frame of a (waiting): x = 3, fromB not set yet"]
    M["frame of main (waiting): answer not set yet"]
    B --- A
    A --- M`,
        diagramNote: 'Only the top frame runs. The others wait at the line of their call. When `b` returns, its box disappears and `a` is on top again.'
      },
      {
        title: 'Same name, different variables',
        text: [
          'All three methods below have a variable named `count`. Each one is a separate box in a separate frame. Changing one never changes another.'
        ],
        fileName: 'SameNames.java',
        code: `public class SameNames {
    static void countApples() {
        int count = 5;
        System.out.println("apples: " + count);
    }

    static void countPears() {
        int count = 2;
        count = count + 1;
        System.out.println("pears: " + count);
    }

    public static void main(String[] args) {
        int count = 100;
        countApples();
        countPears();
        System.out.println("main still has: " + count);
    }
}`,
        output: `apples: 5
pears: 3
main still has: 100`
      },
      {
        title: 'A method cannot see its caller\'s variables',
        text: [
          '`total` lives in the frame of `main`. `printTotal` has its own frame and no variable called `total`, so javac reports `cannot find symbol` (a symbol is a name).'
        ],
        fileName: 'NoAccess.java',
        noRun: true,
        code: `public class NoAccess {
    static void printTotal() {
        System.out.println("Total: " + total);   // wrong: total is not here
    }

    public static void main(String[] args) {
        int total = 42;
        printTotal();
    }
}`,
        output: `NoAccess.java:3: error: cannot find symbol
        System.out.println("Total: " + total);   // wrong: total is not here
                                       ^
  symbol:   variable total
  location: class NoAccess
1 error`,
        tip: 'This code does not compile on purpose. Fix: hand the value in as an argument. Write `static void printTotal(int total)` and call `printTotal(total);`.'
      },
      {
        title: 'Fresh variables on every call',
        text: [
          'A local variable does not remember anything between calls. Each call starts with a new frame, so `number` starts at 0 every time.',
          'To remember a value between calls, a program uses a **field**: a variable that belongs to a class or object, not to one call. [Classes and objects](../classes-and-objects/index.html) teaches fields.'
        ],
        fileName: 'FreshFrames.java',
        code: `public class FreshFrames {
    static int nextTicket() {
        int number = 0;     // new on every call
        number = number + 1;
        return number;
    }

    public static void main(String[] args) {
        System.out.println(nextTicket());
        System.out.println(nextTicket());
        System.out.println(nextTicket());
    }
}`,
        output: `1
1
1`
      },
      {
        title: 'Reading a stack trace',
        text: [
          'When a program crashes, Java prints the call stack at that moment. Here `b` divides by zero. Dividing by zero throws an **exception**: Java stops and reports an error, which you learn to handle in [Exceptions](../exceptions/index.html).',
          'Read the trace from the top: the first `at` line is where it broke (`b`, line 3). Each line below is the caller that was waiting: `a` on line 7, then `main` on line 12.'
        ],
        fileName: 'Trace.java',
        code: `public class Trace {
    static int b(int y) {
        return 10 / y;
    }

    static int a(int x) {
        return b(x - 3);
    }

    public static void main(String[] args) {
        System.out.println("start");
        System.out.println(a(3));
    }
}`,
        output: `start
Exception in thread "main" java.lang.ArithmeticException: / by zero
\tat Trace.b(Trace.java:3)
\tat Trace.a(Trace.java:7)
\tat Trace.main(Trace.java:12)`,
        tip: 'The trace is the stack, top first. The line numbers lead you straight to the code.'
      }
    ],
    technical: [
      'Each Java **thread** (a line of work that runs code; your program has one, called `main`) has its own stack. A frame holds an array of **local variable slots** (parameters first, then the other locals) and an **operand stack**, the scratch pad for values being computed.',
      'javac works out how many slots and how much scratch pad every method needs and writes it into the `.class` file. So the JVM can make a frame very fast; a call costs only a few nanoseconds. A primitive local sits directly in its slot. For an object, the slot holds only a reference (an arrow) to the object on the heap.',
      'The stack has a fixed size, usually 1 to 2 MB per thread by default. `java -Xss4m CallStack` gives it 4 MB. Endless deep calls fill it and end with `StackOverflowError`.',
      'Local variables get no default value. `int n; System.out.println(n);` does not compile: `variable n might not have been initialized`. Java wants you to set every local before you read it.'
    ],
    tryIt: {
      steps: [
        'In `CallStack.java`, add `static int c(int z)` that prints six spaces plus `c starts with z = ` + z and returns `z + 10`.',
        'In `b`, change `return result;` to `return c(result);`.',
        'Before you run it, write down what `main got` will print.',
        'Compile and run.'
      ],
      see: 'a new, deeper line `c starts with z = 8`, and `main got 19` at the end.'
    },
    check: [
      { q: '`main` calls `a`, and `a` calls `b`. Which method finishes first?', a: '`b`. It is the newest frame, on top of the stack, so it ends first.' },
      { q: 'Two methods both declare `int total`. Is that a problem?', a: 'No. Each `total` lives in its own frame. They are different variables.' },
      { q: 'A method does `int visits = 0; visits = visits + 1; return visits;`. You call it three times. What do you get?', a: '`1` every time. Each call gets a fresh frame with a fresh `visits`.' }
    ],
    keyPoints: [
      'Every call pushes a stack frame; every return pops it.',
      'Only the top frame runs; the callers wait at their call.',
      'Parameters and local variables live in the frame of their call.',
      'A method cannot see its caller\'s local variables. Pass values in, return values out.',
      'A stack trace is the call stack at the moment of an error, top first.'
    ],
    commonMistakes: [
      'Using a variable of `main` inside a helper: `System.out.println(total);` gives `cannot find symbol`. Fix: pass it in, `printTotal(total)`.',
      'Expecting a local variable to remember its value between calls. Fix: return the value and keep it in the caller, or use a field later.',
      'Reading a local before setting it: `int n; n++;` does not compile. Fix: give it a start value, `int n = 0;`.',
      'Reading a stack trace from the bottom. Fix: the top `at` line is where it broke; the lines below are the callers.'
    ],
    related: ['Parameters and Return Values', 'Pass-by-Value', 'Types & Variables', 'Recursion']
  }]);
})();
