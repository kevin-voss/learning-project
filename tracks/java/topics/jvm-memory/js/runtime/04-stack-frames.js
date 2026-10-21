// JVM & Memory, lesson 4: stack frames and local variables.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'stack-frames',
      title: 'Stack Frames and Local Variables',
      category: 'concept',
      icon: '▤',
      tagline: 'One frame per call, gone at return',
      realWorld: 'A pile of sticky notes. When you start a task you put a fresh note on top and write your numbers on it. When the task is done you tear the note off and throw it away. The note below is on top again.',
      kid: [
        'Every time a method starts, Java takes a fresh sticky note and puts it on top of the pile. That note is the method\'s **frame**.',
        'On its note, the method writes its numbers: the parameters it got and the local variables it makes. Nobody else writes on that note.',
        'If the method asks another method for help, a new note goes on top. The first note waits underneath.',
        'When a method is done, its note is torn off and thrown away. All the numbers on it are gone. Only the answer goes back to the note below.'
      ],
      definition: 'A **stack frame** is the block of stack memory for one method call. It holds the call\'s **local variable slots** (parameters and locals), its **operand stack** for calculations, and the **return address**. The JVM pushes a frame when a method is called and pops it when the method returns.',
      explain: [
        'You saw the call stack in [Recursion](../recursion/index.html) as a pile of plates. Here you see what is written on each plate, in the words the JVM uses.',
        'The **local variable slots** are numbered: 0, 1, 2 … In a `static` method the parameters come first; in a normal (instance) method slot 0 is `this`, the object the method was called on. `javap` showed you these slots as `iload_1`, `istore_2` and so on.',
        'The **operand stack** is a small scratch pile inside the frame for calculations, like `a + b`. The **return address** tells the JVM where to continue in the caller when the method is done.',
        'Only the frame on top is active. Every frame below it belongs to a method that is waiting for the method above it to return. The order of the frames is the **call chain**: who called whom.',
        'When a method returns, its frame is popped and every local variable in it disappears. If a local held a reference, the reference is gone, but the object on the heap is not removed by this. It stays as long as something else still points to it.'
      ],
      why: 'Frames explain why locals of different calls never mix, why a local is gone after `return`, why a stack trace lists methods in that order, and why too many calls end in `StackOverflowError`.',
      whenUse: 'When you read a stack trace, when you wonder why a change to a parameter "did not work", and when recursion goes deep.',
      syntax: 'Call → push a frame (parameters in the first slots). `return value;` → pop the frame, hand `value` to the caller. The top frame is the method that runs now.',
      fileName: 'Frames.java',
      code: `public class Frames {
    static void printStack(String where) {
        StackTraceElement[] frames = Thread.currentThread().getStackTrace();
        System.out.print(where + ": ");
        // frames[0] is getStackTrace itself, frames[1] is printStack, so start at 2
        for (int i = 2; i < frames.length; i++) {
            System.out.print(frames[i].getMethodName());
            if (i < frames.length - 1) {
                System.out.print(" <- ");
            }
        }
        System.out.println();
    }

    static int square(int x) {
        int result = x * x;
        printStack("inside square");
        return result;
    }

    static int sumOfSquares(int a, int b) {
        printStack("inside sumOfSquares");
        int total = square(a) + square(b);
        return total;
    }

    public static void main(String[] args) {
        printStack("inside main");
        int answer = sumOfSquares(2, 3);
        printStack("back in main");
        System.out.println("answer = " + answer);
    }
}`,
      output: `inside main: main
inside sumOfSquares: sumOfSquares <- main
inside square: square <- sumOfSquares <- main
inside square: square <- sumOfSquares <- main
back in main: main
answer = 13`,
      codeSummary: '`printStack` asks the JVM for the frames of the current thread and prints their method names, the top frame first. You see the pile grow with each call and shrink with each return.',
      codeExplanation: [
        { label: 'Line 3', code: 'StackTraceElement[] frames = Thread.currentThread().getStackTrace();', text: 'Asks the JVM for a snapshot of the current thread\'s stack. Each element describes one frame: class, method and line.' },
        { label: 'Line 6', code: 'for (int i = 2; i < frames.length; i++) {', text: 'Skips the two frames of the measuring itself (`getStackTrace` and `printStack`), so you see only the frames that matter.' },
        { label: 'Line 7', code: 'System.out.print(frames[i].getMethodName());', text: 'Prints the method of each frame. Index 2 is the method that called `printStack`, the last one is `main`.' },
        { label: 'Line 16', code: 'int result = x * x;', text: '`x` and `result` live in the frame of this one call of `square`. The second call of `square` gets a brand-new frame with its own `x`.' },
        { label: 'Line 23', code: 'int total = square(a) + square(b);', text: 'Two calls, one after the other. Each pushes a frame on top of `sumOfSquares` and pops it again. That is why "inside square" appears twice with the same pile.' },
        { label: 'Line 24', code: 'return total;', text: 'The frame of `sumOfSquares` is popped. `a`, `b` and `total` are gone. Only the value `13` travels to `main`.' },
        { label: 'Line 29', code: 'int answer = sumOfSquares(2, 3);', text: 'Pushes the frame for `sumOfSquares` with `a = 2` in slot 0 and `b = 3` in slot 1.' },
        { label: 'Line 30', code: 'printStack("back in main");', text: 'All helper frames are popped again: only `main` is left.' }
      ],
      sections: [
        {
          title: 'What is inside one frame',
          text: ['Take the call `square(3)`. Its frame has three parts.'],
          table: {
            head: ['Part', 'Holds', 'For `square(3)`'],
            rows: [
              ['Local variable slots', 'parameters first, then locals; slot 0 is `this` in an instance method', 'slot 0: `x = 3`, slot 1: `result = 9`'],
              ['Operand stack', 'values in the middle of a calculation', '`3`, `3` before `imul`, then `9`'],
              ['Return address and links', 'where to continue in the caller, plus a link to the class\'s constant pool', 'the middle of line 23 in `sumOfSquares`']
            ],
            note: '`javac` already knows how big each frame must be. `javap -v` prints it per method, for example `stack=2, locals=3, args_size=2` for `add(int, int)` in the lesson on `javap`.'
          }
        },
        {
          title: 'The pile grows and shrinks',
          text: ['This is the example as a sequence of calls and returns. Read it from top to bottom like a timeline.'],
          mermaid: 'sequenceDiagram\n  participant M as main\n  participant S as sumOfSquares\n  participant Q as square\n  M->>S: sumOfSquares(2, 3), push frame\n  S->>Q: square(2), push frame\n  Q-->>S: return 4, pop frame\n  S->>Q: square(3), push a NEW frame\n  Q-->>S: return 9, pop frame\n  S-->>M: return 13, pop frame\n  Note over M: only the main frame is left',
          diagramNote: 'At its highest, the pile has three frames: `main`, `sumOfSquares` and `square`. The two calls of `square` never exist at the same time.'
        },
        {
          title: 'Each frame has its own copy',
          text: [
            'Java copies the value of every argument into the new frame\'s slots. For an `int` the number is copied. For an array or object, the **reference** is copied: both frames now hold an arrow to the same object on the heap.',
            'So `count = 99` changes only the copy in the frame of `change`. But `box[0] = 99` follows the copied arrow to the one shared array. [Methods](../methods/index.html) calls this "Java passes by value".'
          ],
          code: `public class OwnLocals {
    static void change(int count, int[] box) {
        count = 99;          // changes only this frame's copy
        box[0] = 99;         // follows the copied arrow to the shared array
        System.out.println("in change: count = " + count + ", box[0] = " + box[0]);
    }

    public static void main(String[] args) {
        int count = 1;
        int[] box = {1};
        change(count, box);
        System.out.println("in main:   count = " + count + ", box[0] = " + box[0]);
    }
}`,
          fileName: 'OwnLocals.java',
          output: `in change: count = 99, box[0] = 99
in main:   count = 1, box[0] = 99`,
          mermaid: 'flowchart LR\n  subgraph F2["frame of change"]\n    C2["count = 99"]\n    B2["box"]\n  end\n  subgraph F1["frame of main"]\n    C1["count = 1"]\n    B1["box"]\n  end\n  subgraph H["Heap"]\n    ARR["int array: 99"]\n  end\n  B1 --> ARR\n  B2 --> ARR',
          diagramNote: 'Two frames, two `count` variables, two `box` references, but only one array.'
        },
        {
          title: 'A stack trace is a photo of the frames',
          text: [
            'When an exception is thrown, it records the frames of the moment: the top frame first. That list is the **stack trace** you learned to read in [Exceptions](../exceptions/index.html). Here we print it ourselves, frame by frame.'
          ],
          code: `public class TraceFrames {
    static int divide(int a, int b) {
        return a / b;                      // b is 0: ArithmeticException
    }

    static int average(int total, int count) {
        return divide(total, count);
    }

    public static void main(String[] args) {
        try {
            System.out.println(average(10, 0));
        } catch (ArithmeticException e) {
            System.out.println("error: " + e.getMessage());
            // The stack trace is a photo of the frames at the moment of the error.
            for (StackTraceElement frame : e.getStackTrace()) {
                System.out.println("  frame: " + frame.getMethodName() + " (line " + frame.getLineNumber() + ")");
            }
        }
    }
}`,
          fileName: 'TraceFrames.java',
          output: `error: / by zero
  frame: divide (line 3)
  frame: average (line 7)
  frame: main (line 12)`,
          tip: 'Read a stack trace from the top: the first frame is where it broke, the frames below are the callers that led there.'
        },
        {
          title: 'When frames pile up too high',
          text: [
            'The stack of a thread has a fixed size. Every call needs room for one more frame. A method that calls itself without stopping fills the stack, and the JVM throws `StackOverflowError`.',
            'The [Recursion](../recursion/index.html) topic shows how to avoid it with a base case. The lesson "OutOfMemoryError and StackOverflowError" in this topic shows how to catch it safely and what the stack size has to do with it.'
          ],
          warn: 'A big local array does **not** make a frame big: the frame holds only the reference. The array is on the heap. Deep calls fill the stack, big objects fill the heap.'
        }
      ],
      technical: [
        'HotSpot does not make a separate memory block for each frame. All frames of a thread sit back to back in that thread\'s stack, and a pointer marks the top. Pushing and popping a frame only moves that pointer, which is why method calls are so cheap.',
        'When the JIT compiles a method, the frame layout changes: values often live in processor **registers** instead of slots, and small methods are **inlined** (copied into the caller), so they need no frame at all. The JVM can still rebuild the "normal" frames when you ask for a stack trace or when the debugger stops.',
        '`Thread.currentThread().getStackTrace()` and `exception.getStackTrace()` both walk the frames of a thread and turn each one into a `StackTraceElement` with class, method, file and line number. The line numbers come from the `LineNumberTable` that `javac` writes into the class file.'
      ],
      tryIt: {
        steps: [
          'Save the example as `Frames.java` and run `java Frames.java`.',
          'Add a method `static int cube(int x) { printStack("inside cube"); return x * square(x); }`.',
          'In `main`, add `System.out.println(cube(2));` and run again.'
        ],
        see: 'New lines `inside cube: cube <- main` and `inside square: square <- cube <- main`, then `8`.'
      },
      check: [
        { q: 'What are the three parts of a stack frame?', a: 'The local variable slots (parameters and locals), the operand stack (for calculations) and the return address with links back to the caller and the class.' },
        { q: 'A method changes its `int` parameter. Does the caller see the change?', a: 'No. The parameter is a copy in the method\'s own frame. The caller\'s variable is in another frame.' },
        { q: 'After `return`, what happens to an object that a local variable pointed to?', a: 'The local variable is gone with the frame. The object stays on the heap. If nothing else points to it, the garbage collector may free it later.' }
      ],
      keyPoints: [
        'One frame per method call, pushed at the call and popped at the return.',
        'A frame holds local variable slots, an operand stack and the return address.',
        'Arguments are copied into the new frame: numbers by value, objects as a copied reference.',
        'Only the top frame runs; the frames below wait for it.',
        'A stack trace lists the frames, the top frame first.'
      ],
      commonMistakes: [
        'Expecting `static void reset(int n) { n = 0; }` to change the caller\'s variable: it changes the frame\'s copy. Return the new value: `n = reset(n);` with `static int reset(int n) { return 0; }`.',
        'Using a local variable after its method returned: it no longer exists. Return the value or store it in a field.',
        'Reading a stack trace from the bottom: the top line is where the error happened.',
        'Thinking a big array in a local variable fills the stack: only the reference is in the frame; the array is on the heap.'
      ],
      related: ['memory-areas', 'Recursion', 'Exceptions']
    }
  ]);
})();
