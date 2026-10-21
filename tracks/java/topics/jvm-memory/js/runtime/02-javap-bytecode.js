// JVM & Memory, lesson 2: reading bytecode with javap -c.
(function () {
  Java.addCoreLessons('jvm-memory', [
    {
      id: 'javap-bytecode',
      title: 'Reading Bytecode with javap',
      category: 'concept',
      icon: '01',
      tagline: 'Open the .class file and read what the JVM reads',
      realWorld: 'A cooking recipe for a robot. You write "make a sandwich". The robot gets tiny steps: "take bread", "take cheese", "put cheese on bread". `javap` shows you the robot steps.',
      kid: [
        'You tell your friend: "Add two and three." Your friend does it in one go.',
        'A robot needs tiny steps. "Pick up the 2. Pick up the 3. Put them together. Hold the answer. Give it back."',
        'The JVM is a robot like that. The `.class` file holds its tiny steps, and the tool `javap` reads them out loud for you.',
        'The robot keeps the numbers it is working on in a little pile in its hand. It always works with the top of the pile.'
      ],
      definition: '`javap -c ClassName` **disassembles** a `.class` file: it prints the bytecode instructions of every method as readable text. You see exactly what the JVM runs.',
      explain: [
        '**Disassembling** means turning machine instructions back into text that a person can read. `javap` comes with the JDK, next to `javac` and `java`. The flag `-c` means "show the code of each method".',
        'Each line of bytecode is one **instruction**: a short name like `iload_0` or `iadd`, sometimes with a value after it. The number in front (`0:`, `1:`, `2:` …) is the instruction\'s position in bytes inside the method.',
        'The JVM is a **stack machine**. Each method call has a small pile of values called the **operand stack**. Instructions push values onto it and pop values from it. `iadd` pops two `int`s, adds them and pushes the sum.',
        'Each call also has numbered **local variable slots**. Slot 0, slot 1, slot 2 … hold the parameters and local variables. In a `static` method, the first parameter is in slot 0. `iload_1` means "push the `int` from slot 1"; `istore_2` means "pop an `int` and store it in slot 2".',
        'The first letter tells the type: `i` = `int`, `l` = `long`, `d` = `double`, `a` = a reference (an "address" of an object). So `aload_0` pushes a reference and `ireturn` returns an `int`.'
      ],
      why: 'Bytecode answers questions that the source code hides: what `+` on strings really does, why `i++` is one instruction, what a constructor looks like, and how a loop becomes jumps.',
      whenUse: 'When you are curious what a line of Java really does, or when the next lessons talk about stack frames and slots and you want to see them.',
      syntax: '`javac Name.java` then `javap -c Name`. Add `-l` to see line numbers and local variable names (compile with `javac -g` for the names). Use `-p` to include `private` methods.',
      fileName: 'Add.java',
      code: `public class Add {
    static int add(int a, int b) {
        int sum = a + b;
        return sum;
    }

    public static void main(String[] args) {
        int result = add(2, 3);
        System.out.println("2 + 3 = " + result);
    }
}`,
      output: '2 + 3 = 5',
      codeSummary: 'A tiny program on purpose: one method that adds, one call, one print. The next sections show the bytecode that `javac` makes from it.',
      codeExplanation: [
        { label: 'Line 2', code: 'static int add(int a, int b) {', text: 'A `static` method with two `int` parameters. In the bytecode, `a` is slot 0 and `b` is slot 1.' },
        { label: 'Line 3', code: 'int sum = a + b;', text: 'Becomes four instructions: push `a`, push `b`, `iadd`, store the result in slot 2 (`sum`).' },
        { label: 'Line 4', code: 'return sum;', text: 'Becomes `iload_2` (push `sum`) and `ireturn` (return the `int` on top of the stack).' },
        { label: 'Line 7', code: 'public static void main(String[] args) {', text: '`args` is a reference, so it sits in slot 0 of `main`. `result` gets slot 1.' },
        { label: 'Line 8', code: 'int result = add(2, 3);', text: 'Push the constants 2 and 3, `invokestatic` calls `add`, then `istore_1` saves the answer.' },
        { label: 'Line 9', code: 'System.out.println("2 + 3 = " + result);', text: '`getstatic` fetches `System.out`, `invokedynamic` builds the string, `invokevirtual` calls `println`.' }
      ],
      sections: [
        {
          title: 'Run javap and look',
          text: ['Compile first, then disassemble. This is the real output of `javap -c Add` (JDK 25, `--release 21`).'],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ javac Add.java
$ javap -c Add
Compiled from "Add.java"
public class Add {
  public Add();
    Code:
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return

  static int add(int, int);
    Code:
         0: iload_0
         1: iload_1
         2: iadd
         3: istore_2
         4: iload_2
         5: ireturn

  public static void main(java.lang.String[]);
    Code:
         0: iconst_2
         1: iconst_3
         2: invokestatic  #7                  // Method add:(II)I
         5: istore_1
         6: getstatic     #13                 // Field java/lang/System.out:Ljava/io/PrintStream;
         9: iload_1
        10: invokedynamic #19,  0             // InvokeDynamic #0:makeConcatWithConstants:(I)Ljava/lang/String;
        15: invokevirtual #23                 // Method java/io/PrintStream.println:(Ljava/lang/String;)V
        18: return
}`,
          tip: 'There is a method `public Add();` you never wrote. It is the **default constructor** that `javac` adds. It calls the constructor of `Object` (`<init>` is the bytecode name of a constructor).'
        },
        {
          title: 'The method add, one instruction at a time',
          text: ['Follow the call `add(2, 3)`. Slot 0 holds `a = 2`, slot 1 holds `b = 3`. Watch the operand stack (the top is on the right).'],
          table: {
            head: ['Position', 'Instruction', 'What it does', 'Operand stack after', 'Slots after'],
            rows: [
              ['0', '`iload_0`', 'push the `int` from slot 0 (`a`)', '`2`', '`a=2, b=3`'],
              ['1', '`iload_1`', 'push the `int` from slot 1 (`b`)', '`2, 3`', '`a=2, b=3`'],
              ['2', '`iadd`', 'pop two ints, push their sum', '`5`', '`a=2, b=3`'],
              ['3', '`istore_2`', 'pop and store in slot 2 (`sum`)', 'empty', '`a=2, b=3, sum=5`'],
              ['4', '`iload_2`', 'push `sum`', '`5`', '`a=2, b=3, sum=5`'],
              ['5', '`ireturn`', 'pop the `int` and give it to the caller', 'empty, frame ends', 'gone']
            ],
            note: 'In `main`, `iconst_2` and `iconst_3` push the constants. `invokestatic` pops them as the parameters of `add` and later pushes the returned `5`.'
          },
          mermaid: 'flowchart LR\n  S0["empty"] -->|iload_0| S1["2"]\n  S1 -->|iload_1| S2["2, 3"]\n  S2 -->|iadd| S3["5"]\n  S3 -->|istore_2| S4["empty, sum = 5"]\n  S4 -->|iload_2| S5["5"]\n  S5 -->|ireturn| S6["5 goes to main"]',
          diagramNote: 'Each box is the operand stack after one instruction. Values go on top and come off the top.'
        },
        {
          title: 'The instruction families',
          text: ['There are about 200 instructions, but they come in families. Once you know the families, you can read most bytecode.'],
          table: {
            head: ['Family', 'Examples', 'Meaning'],
            rows: [
              ['load', '`iload_1`, `aload_0`', 'copy a local variable slot onto the operand stack'],
              ['store', '`istore_2`, `astore_1`', 'pop the top value into a slot'],
              ['constants', '`iconst_2`, `bipush 100`, `ldc "hi"`', 'push a fixed value'],
              ['math', '`iadd`, `isub`, `imul`, `iinc 2, 1`', 'calculate; `iinc` adds to a slot directly (this is `i++`)'],
              ['jumps', '`if_icmpgt 19`, `goto 4`', 'go to another position: `if` and loops'],
              ['objects', '`new`, `getfield`, `putfield`, `getstatic`', 'make objects, read and write fields'],
              ['calls', '`invokestatic`, `invokevirtual`, `invokespecial`, `invokeinterface`, `invokedynamic`', 'call a method (static, normal, constructor, interface, built at run time)'],
              ['return', '`ireturn`, `areturn`, `return`', 'leave the method with an `int`, a reference, or nothing']
            ],
            note: '`#7`, `#13` … are numbers in the **constant pool**, the table of names inside the class file. `javap` prints the name as a comment after `//`.'
          }
        },
        {
          title: 'A loop becomes jumps',
          text: [
            'Bytecode has no `for` and no `while`. A loop is a compare-and-jump at the top and a `goto` back at the bottom.',
            'In `total`, slot 0 is `n`, slot 1 is `sum` and slot 2 is `i`. Position 6, `if_icmpgt 19`, means: "if `i` is greater than `n`, jump to 19 (leave the loop)". Position 13, `iinc 2, 1`, is `i++`. Position 16, `goto 4`, jumps back to the check.'
          ],
          code: `public class CountUp {
    static int total(int n) {
        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println(total(4));
    }
}`,
          fileName: 'CountUp.java',
          output: '10'
        },
        {
          title: 'The bytecode of the loop, and the slot names',
          text: [
            'First part: `javap -c CountUp` for the method `total` (real output). Then `javac -g` keeps the names of local variables in the class file, and `javap -l` prints them in the **LocalVariableTable**: which slot holds which variable, from which position on.'
          ],
          codeLanguage: 'bash',
          fileName: 'terminal',
          code: `$ javap -c CountUp
  static int total(int);
    Code:
         0: iconst_0
         1: istore_1
         2: iconst_1
         3: istore_2
         4: iload_2
         5: iload_0
         6: if_icmpgt     19
         9: iload_1
        10: iload_2
        11: iadd
        12: istore_1
        13: iinc          2, 1
        16: goto          4
        19: iload_1
        20: ireturn

$ javac -g Add.java
$ javap -c -l Add
  static int add(int, int);
      ...
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       6     0     a   I
            0       6     1     b   I
            4       2     2   sum   I`,
          tip: 'In the `Signature` column, `I` means `int`. `(II)I` in the main output means "takes two ints, returns an int". `Ljava/lang/String;` means the class `String`, and `[` in front means an array.'
        }
      ],
      technical: [
        'Every method in a class file has a `Code` attribute with three numbers the verifier needs: `max_stack` (the deepest the operand stack ever gets), `max_locals` (how many slots) and the bytecode itself. With them the JVM knows the exact size of each stack frame before the method runs.',
        '`"2 + 3 = " + result` compiles to `invokedynamic … makeConcatWithConstants` since Java 9. The first time this line runs, the JVM builds a small piece of code that joins strings for exactly this pattern, and reuses it after that. Older compilers made a `StringBuilder` and called `append` several times.',
        '`javap` reads the class file; it never runs it. `javap -v` (verbose) also prints the constant pool, the class file version (`major version: 65` for Java 21) and `max_stack`/`max_locals` of every method.'
      ],
      tryIt: {
        steps: [
          'Save `Add.java`, then run `javac Add.java` and `javap -c Add`.',
          'In `add`, change `a + b` to `a * b`. Compile and run `javap -c Add` again.',
          'Add a line `sum = sum + 1;` before `return sum;`. Compile and look again.',
          'Change that line to `sum += 1;`. Compile and look once more.'
        ],
        see: 'First `iadd`, after the change `imul`. `sum = sum + 1` adds four instructions (`iload_2`, `iconst_1`, `iadd`, `istore_2`). `sum += 1` is one instruction: `iinc 2, 1`.'
      },
      check: [
        { q: 'What does `iload_1` do?', a: 'It pushes the `int` from local variable slot 1 onto the operand stack.' },
        { q: 'In a `static` method `f(int x, int y)`, which slot is `y`?', a: 'Slot 1. Parameters come first, from slot 0 on. (In an instance method, slot 0 is `this`, so `y` would be slot 2.)' },
        { q: 'How does a `for` loop look in bytecode?', a: 'There is no loop instruction. A compare-and-jump (like `if_icmpgt`) leaves the loop, and a `goto` at the end jumps back to the check.' }
      ],
      keyPoints: [
        '`javap -c` shows the bytecode of every method.',
        'The JVM is a stack machine: instructions push to and pop from the operand stack.',
        'Parameters and local variables live in numbered slots; `load` and `store` move values between slots and the stack.',
        'The first letter is the type: `i` int, `l` long, `d` double, `a` reference.',
        'Loops and `if` become compare-and-jump instructions.'
      ],
      commonMistakes: [
        'Running `javap -c Add.java`: `javap` reads compiled classes. Write `javap -c Add` after `javac Add.java`.',
        'Expecting variable names in the plain output: without `javac -g`, the class file has only slot numbers. Compile with `-g` and use `javap -l`.',
        'Missing a `private` method in the output: `javap` hides private members by default. Add `-p`.'
      ],
      related: ['jvm-bytecode', 'stack-frames', 'Control Flow']
    }
  ]);
})();
