// Lesson 1: why methods exist (reuse, names, smaller problems).
(function () {
  Java.addCoreLessons('methods', [{
    id: 'why-methods',
    title: 'Why Methods Exist',
    category: 'concept',
    icon: '?',
    tagline: 'Name a job once, use it many times',
    realWorld: 'A recipe card. You write "how to make pancakes" on it once. Every Sunday you read the card. You never have to invent pancakes again.',
    kid: [
      'Imagine you teach your little brother to brush his teeth. Every morning you say all the steps again: take the brush, put on paste, brush up and down, rinse. That is a lot of talking.',
      'Now you give all those steps one name: "brush teeth". The next morning you only say "brush teeth", and he knows every step.',
      'A method is that name. You write the steps one time. Then you say the name as often as you like, and the steps happen.'
    ],
    definition: 'A **method** is a named block of code that does one job. You write it once and **call** it (run it by its name) wherever you need that job.',
    explain: [
      'You already know one method: `main`. Java starts every program there. Until now all your code lived inside `main`. That works for ten lines. At a hundred lines it gets hard to read.',
      'Methods help in three ways. **Reuse**: you write the steps once and use them many times. **Names**: a line like `printWeather();` tells the reader what happens, without showing every step. **Smaller problems**: you split a big task into small jobs and solve one at a time.',
      'When you **call** a method, Java jumps into it, runs its lines from top to bottom, and then comes back to the line after the call. The rest of `main` waits in the meantime.',
      'Java already ships with many methods. `System.out.println` is a method: someone wrote the steps for printing a line, and you call it by its name. `Math.max(3, 9)` is a method that gives back the larger number. In this topic you learn to write your own.',
      'In other languages a method is often called a **function**. In Java every method lives inside a class, so Java says "method".'
    ],
    why: 'Without methods you copy the same lines again and again. A bug in those lines then lives in five places, and you have to fix all five.',
    whenUse: 'As soon as you write the same lines a second time, or a part of `main` needs a comment to say what it does.',
    syntax: '`static void name() { … }` makes a method. `name();` calls it.',
    fileName: 'WhyMethods.java',
    code: `public class WhyMethods {
    // A method that prints a line of stars.
    static void printStars() {
        System.out.println("**********");
    }

    // A method that prints a short weather report.
    // It calls printStars twice.
    static void printWeather() {
        printStars();
        System.out.println("Today: sunny, 21 degrees");
        printStars();
    }

    public static void main(String[] args) {
        System.out.println("Good morning!");
        printWeather();
        System.out.println("Have a nice day.");
        printWeather();
    }
}`,
    output: `Good morning!
**********
Today: sunny, 21 degrees
**********
Have a nice day.
**********
Today: sunny, 21 degrees
**********`,
    codeSummary: 'Two small methods. `main` calls `printWeather` twice, and `printWeather` calls `printStars` twice each time. So the star line prints four times, but it is written only once.',
    codeExplanation: [
      { label: 'Line 1', code: 'public class WhyMethods {', text: 'Every method lives inside a class. The file is called `WhyMethods.java`.' },
      { label: 'Line 3', code: 'static void printStars() {', text: 'The header of a new method named `printStars`. `static` and `void` are explained in the next lessons. The empty `()` means it needs no input.' },
      { label: 'Line 4', code: 'System.out.println("**********");', text: 'The body: the steps that run on every call. Here it is one line.' },
      { label: 'Line 5', code: '}', text: 'The method ends here. It sits inside the class, next to `main`, not inside `main`.' },
      { label: 'Line 9', code: 'static void printWeather() {', text: 'A second method. A method may call other methods.' },
      { label: 'Line 10', code: 'printStars();', text: 'A **call**. Java jumps into `printStars`, prints the stars and comes back here.' },
      { label: 'Line 15', code: 'public static void main(String[] args) {', text: 'Java always starts here. The other methods run only when a line calls them.' },
      { label: 'Line 17', code: 'printWeather();', text: 'The first call of `printWeather`. Four lines get printed.' },
      { label: 'Line 19', code: 'printWeather();', text: 'The same job again, with one short line instead of four.' }
    ],
    sections: [
      {
        title: 'The same program without methods',
        text: [
          'Here is the same output with all lines inside `main`. It works. But the star line appears four times, and the weather line twice.',
          'Now your teacher says: "Use dashes instead of stars." Without methods you change four lines and hope you found all of them. With `printStars` you change one.'
        ],
        fileName: 'WithoutMethods.java',
        code: `public class WithoutMethods {
    public static void main(String[] args) {
        System.out.println("Good morning!");
        System.out.println("**********");
        System.out.println("Today: sunny, 21 degrees");
        System.out.println("**********");
        System.out.println("Have a nice day.");
        System.out.println("**********");
        System.out.println("Today: sunny, 21 degrees");
        System.out.println("**********");
    }
}`,
        output: `Good morning!
**********
Today: sunny, 21 degrees
**********
Have a nice day.
**********
Today: sunny, 21 degrees
**********`,
        tip: 'A good rule: when you paste the same lines a second time, stop and make a method.'
      },
      {
        title: 'What happens when you call a method',
        text: [
          'A call is a jump with a way back. Java remembers where it was, runs the method, and returns to the next line.',
          'The picture follows the first call of `printWeather` in the example.'
        ],
        mermaid: `flowchart TD
    A["main: print Good morning!"] --> B["main: printWeather()"]
    B --> C["printWeather: printStars()"]
    C --> D["printStars: print stars"]
    D --> E["back in printWeather: print the weather"]
    E --> F["printWeather: printStars()"]
    F --> G["printStars: print stars"]
    G --> H["back in main: print Have a nice day."]`,
        diagramNote: 'Read from top to bottom. Each call goes one step deeper. When a method reaches its closing `}`, Java goes back to the line after the call.'
      },
      {
        title: 'Split a big job into small jobs',
        text: [
          'Methods also help you think. A big job like "get ready for school" is hard to write in one go. Split it into small jobs with names. Then write each small job on its own.',
          'Look at `main` below. It reads like a list of steps. You understand the program without reading the details.'
        ],
        mermaid: `flowchart TD
    M["main"] --> W["wakeUp"]
    M --> B["eatBreakfast"]
    M --> S["walkToSchool"]
    B --> C["pourCereal"]
    B --> K["pourMilk"]`,
        diagramNote: 'Each box is one method. An arrow means "calls". `eatBreakfast` is split again into two even smaller jobs.',
        fileName: 'MorningRoutine.java',
        code: `public class MorningRoutine {
    static void wakeUp() {
        System.out.println("Open eyes, stretch.");
    }

    static void pourCereal() {
        System.out.println("Pour cereal into the bowl.");
    }

    static void pourMilk() {
        System.out.println("Pour milk on top.");
    }

    static void eatBreakfast() {
        pourCereal();
        pourMilk();
        System.out.println("Eat it all up.");
    }

    static void walkToSchool() {
        System.out.println("Walk to school.");
    }

    public static void main(String[] args) {
        wakeUp();
        eatBreakfast();
        walkToSchool();
    }
}`,
        output: `Open eyes, stretch.
Pour cereal into the bowl.
Pour milk on top.
Eat it all up.
Walk to school.`
      },
      {
        title: 'Methods you already use',
        text: [
          'Java comes with thousands of ready methods. You call them the same way as your own: name, brackets, and the values they need inside the brackets.'
        ],
        table: {
          head: ['Call', 'What it does', 'Result'],
          rows: [
            ['`System.out.println("Hi")`', 'Prints a line', 'nothing comes back'],
            ['`Math.max(3, 9)`', 'Picks the larger number', '`9`'],
            ['`Math.abs(-4)`', 'Removes the minus sign', '`4`'],
            ['`Math.sqrt(16)`', 'Square root', '`4.0`']
          ],
          note: 'The part before the dot (`Math`, `System.out`) says where the method lives.'
        },
        fileName: 'ReadyMethods.java',
        code: `public class ReadyMethods {
    public static void main(String[] args) {
        System.out.println(Math.max(3, 9));
        System.out.println(Math.abs(-4));
        System.out.println(Math.sqrt(16));
    }
}`,
        output: `9
4
4.0`
      },
      {
        title: 'Where a method goes in the file',
        text: [
          'A method goes inside the class, next to `main`. It never goes inside another method. If you put it inside `main`, javac (the Java compiler) gets confused and prints several errors at once.'
        ],
        fileName: 'Nested.java',
        noRun: true,
        code: `public class Nested {
    public static void main(String[] args) {
        static void hello() {           // wrong: inside main
            System.out.println("Hello");
        }
        hello();
    }
}`,
        output: `Nested.java:3: error: illegal start of expression
        static void hello() {           // wrong: inside main
        ^
Nested.java:6: error: invalid method declaration; return type required
        hello();
        ^
Nested.java:8: error: class, interface, enum, or record expected
}
^
3 errors`,
        warn: 'The output above is what `javac Nested.java` prints. This code does not compile on purpose. The fix: move `hello` out of `main`, so both methods sit side by side inside the class.'
      }
    ],
    technical: [
      'javac turns each method into its own piece of **bytecode** (the instructions the JVM runs) inside `WhyMethods.class`. The method name and its parameter types are stored with it, so the JVM can find it.',
      'A call like `printWeather();` compiles to one instruction, `invokestatic`, which names the method. At run time the JVM jumps to that bytecode, runs it, and continues with the instruction after the call. Run `javap -c WhyMethods` after compiling to see it.',
      'The code of a method exists only once in memory, no matter how often you call it. Ten calls do not make ten copies. Only the small bookkeeping for each call (you meet it in the call stack lesson) is new each time.'
    ],
    tryIt: {
      steps: [
        'Save the example as `WhyMethods.java`.',
        'Compile with `javac WhyMethods.java` and run with `java WhyMethods`.',
        'Change the line in `printStars` to print `----------` instead of stars.',
        'Compile and run again.'
      ],
      see: 'all four star lines are now dashes, though you changed only one line.'
    },
    check: [
      { q: 'Which method does Java run first?', a: '`main`. Every other method runs only when a line calls it.' },
      { q: 'You write a method `printLogo()` but no line calls it. What does it print?', a: 'Nothing. A method waits until something calls it by name.' },
      { q: 'Why is `printStars();` better than copying the star line four times?', a: 'You change it in one place, and the name tells the reader what the line does.' }
    ],
    keyPoints: [
      'A method is a named block of code with one job.',
      'You write it once and call it by name as often as you like.',
      'A call jumps into the method and comes back to the next line.',
      'Methods sit inside the class, next to `main`, never inside another method.',
      '`System.out.println` and `Math.max` are methods someone else wrote.'
    ],
    commonMistakes: [
      'Writing a method that no line calls. Fix: add the call, for example `printStars();` in `main`.',
      'Putting a method inside `main`. Fix: move it out, so it sits next to `main` in the class.',
      'Forgetting the brackets: `printStars;` gives `not a statement`. Fix: `printStars();`. The brackets make it a call.',
      'Copying lines again instead of making a method. Fix: when you paste code a second time, turn it into a method.'
    ],
    related: ['Control Flow', 'Anatomy of a Method']
  }]);
})();
