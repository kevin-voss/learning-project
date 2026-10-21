(function () {
  Java.addCoreTopic('debugging', {
    label: 'Debugging',
    headline: 'Debugging,',
    accent: 'small calm steps.',
    intro: 'Learn how to read compiler messages, inspect values, and use Ubuntu terminal tools to narrow problems.',
    overview: 'Debugging is a workflow topic: some examples are Java code, and command examples are marked as Bash.',
    tryIt: {
      steps: [
        'Copy the "Find the Bug Three Ways" example. Run it.',
        'Add a labelled print: `System.out.println("DEBUG i = " + i);` inside the loop.',
        'Find the wrong line, fix it, and remove the DEBUG print.'
      ],
      see: 'only two names first, `DEBUG i = 0` and `DEBUG i = 1`, then all three names after the fix.'
    },
    check: [
      { q: 'The program prints a wrong answer but does not crash. What is your first step?', a: 'Compare the output with what you expected. Then print or pause to see the values on the way.' },
      { q: 'What does a breakpoint do?', a: 'It pauses the program on that line so you can look at every variable.' },
      { q: 'Why label your debug prints?', a: 'So you know which value each line shows. `size = 3` beats a bare `3`.' }
    ]
  }, [
    {
      id: 'compiler-errors',
      title: 'Read Compiler Errors',
      category: 'concept',
      icon: 'javac',
      tagline: 'Start at the first error',
      definition: 'javac reports file names, line numbers, and messages. Fix the first clear error before chasing later ones.',
      realWorld: 'One missing semicolon can make the rest of a page look wrong; repair the first broken brick first.',
      syntax: 'On Ubuntu, run javac FileName.java from the folder containing the source file.',
      codeLanguage: 'bash',
      fileName: 'debug-compile.sh',
      code: `javac BrokenExample.java
javac -Xlint:all BrokenExample.java
java BrokenExample`,
      keyPoints: [
        'Read the file name and line number.',
        'Fix one issue, compile again, then continue.',
        '-Xlint:all shows helpful warnings.'
      ],
      commonMistakes: [
        'Starting with the last compiler message.',
        'Changing many things before recompiling.',
        'Running java when javac did not succeed.'
      ],
      related: ['Syntax Fundamentals', 'Getting Started on Ubuntu']
    },
    {
      id: 'print-debugging',
      title: 'Print Debugging',
      category: 'practice',
      icon: 'log',
      tagline: 'Inspect values simply',
      definition: 'Temporary print statements help beginners inspect values and control flow before learning a full debugger.',
      realWorld: 'It is like placing sticky notes along a route to see where the program actually traveled.',
      syntax: 'Print labels with values so the output is easy to read.',
      fileName: 'PrintDebugDemo.java',
      code: `public class PrintDebugDemo {
    static int discount(int cents, boolean member) {
        System.out.println("before discount: " + cents);
        if (member) {
            cents = cents - 100;
            System.out.println("member discount applied");
        }
        System.out.println("after discount: " + cents);
        return cents;
    }

    public static void main(String[] args) {
        System.out.println(discount(1299, true));
    }
}`,
      keyPoints: [
        'Label your debug output.',
        'Remove noisy debug prints after the bug is understood.',
        'Prefer tests for behavior you want to keep checking.'
      ],
      commonMistakes: [
        'Leaving unclear print statements in final code.',
        'Printing too much at once.',
        'Using prints instead of understanding the failing input.'
      ],
      related: ['Testing', 'Methods']
    },
    {
      id: 'jshell',
      title: 'jshell Experiments',
      category: 'habits',
      icon: 'jshell',
      tagline: 'Try tiny ideas fast',
      definition: 'jshell is the Java REPL included with the JDK. It lets you try snippets in an Ubuntu terminal.',
      realWorld: 'jshell is scratch paper for Java expressions.',
      syntax: 'Run jshell, type Java expressions, then type /exit when done.',
      codeLanguage: 'bash',
      fileName: 'jshell-session.sh',
      code: `jshell
jshell> int total = 7 + 5
jshell> "Java".toLowerCase()
jshell> /exit`,
      keyPoints: [
        'jshell is installed with the JDK.',
        'It is useful for expressions and API experiments.',
        'Full programs still belong in .java files.'
      ],
      commonMistakes: [
        'Thinking jshell replaces compiling real source files.',
        'Pasting shell prompts into Java files.',
        'Forgetting /exit.'
      ],
      related: ['Strings & Text', 'JVM & Memory']
    },
    {
      id: 'ide-debugger',
      title: 'The IDE Debugger',
      category: 'practice',
      icon: '⏸',
      tagline: 'Pause the program and look inside',
      realWorld: 'A pause button for a film. You stop on one frame and look at every detail before you play on.',
      definition: 'IntelliJ and VS Code have a debugger. Click left of a line number to set a breakpoint (a red dot). Start with Debug instead of Run. The program stops at the dot. A panel shows every variable. Step over (F8 in IntelliJ, F10 in VS Code) runs one line and stops again.',
      why: 'You see all values at once, without editing your code.',
      whenUse: 'When you do not know what to print, or the values are big objects.',
      table: {
        label: 'Print or debugger?',
        head: ['', 'Print lines', 'Debugger'],
        rows: [
          ['Setup', 'none', 'start in Debug mode'],
          ['Best for', '"Did this line run?"', 'many values, step by step'],
          ['Cleanup', 'delete the prints', 'nothing to clean']
        ]
      },
      keyPoints: ['Breakpoint = where to stop.', 'Step over = run one line.', 'Watch the variables panel change.'],
      commonMistakes: ['Pressing Run instead of Debug. Then the program never stops.'],
      related: ['Exceptions']
    },
    {
      id: 'bug-three-ways',
      title: 'Find the Bug Three Ways',
      category: 'habits',
      icon: '3×',
      tagline: 'Think, print, pause',
      realWorld: 'A detective has three tools: thinking about clues, asking witnesses, and looking at the camera recording.',
      definition: 'This program should print three names but prints two. Find it by thinking (what controls how often the loop runs?), by printing `i`, or with a breakpoint on the `for` line. All three roads lead to the same line.',
      why: 'The computer does exactly what the code says. Your job is to find where that differs from what you meant.',
      whenUse: 'Output is wrong but nothing crashes.',
      fileName: 'Names.java',
      code: `import java.util.List;

public class Names {
    public static void main(String[] args) {
        List<String> names = List.of("Ava", "Ben", "Cara");

        for (int i = 0; i < names.size() - 1; i++) {   // bug
            System.out.println(names.get(i));
        }
    }
}`,
      keyPoints: ['`i < size` already stops at the last index. The `- 1` is one too few.', 'This is called an off-by-one bug.'],
      commonMistakes: ['Changing random lines until it works.'],
      related: ['Control Flow']
    }
  ]);
})();
