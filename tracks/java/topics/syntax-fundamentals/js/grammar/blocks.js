// Lesson 02: blocks, braces and scope.
Java.topics.syntaxFundamentals.lessons.push({
  id: 'blocks',
  num: '02',
  title: 'Blocks and Braces',
  category: 'grammar',
  icon: '{}',
  tagline: 'Boxes inside boxes',
  realWorld: 'A toy box with a pencil case inside. You open the big lid, then the small zip. You close the small zip before you close the big lid.',
  kid: [
    'Think of a big toy box. Inside it sits a pencil case, and inside the pencil case are crayons. Every box has a lid that opens and a lid that closes.',
    'In Java, `{` opens a box and `}` closes it. A box can hold other boxes. You always close the inner box first.',
    'A crayon inside the pencil case is not lying loose in the toy box. When you close the pencil case, you cannot grab that crayon from outside. Java names work the same way: a name made inside a box only exists inside that box.'
  ],
  definition: 'A **block** is a group of statements between a pair of curly braces `{` and `}`. Blocks give a program its shape, and each block limits where the names declared in it can be used.',
  explain: [
    'The symbols `{` and `}` are called **braces** or curly brackets. Every `{` needs exactly one matching `}`. The compiler pairs them from the inside out, like matching lids to boxes.',
    'Every Java program has at least two blocks. The **class body** `public class Blocks { ... }` holds everything. Inside it, the **method body** `main(...) { ... }` holds the statements that run.',
    'More blocks appear inside a method: the block after an `if`, the block of a loop, or a plain block that you open with `{` on its own. Blocks inside blocks are called **nested** blocks.',
    'The **scope** of a variable is the part of the code where its name is known. A variable declared inside a block is a **local variable**: its scope starts at the declaration and ends at the `}` of that block. Inner blocks can see the names of outer blocks, but not the other way round.',
    'Indentation, the spaces at the start of a line, shows the shape of the blocks to you. The compiler does not read it. Only the braces count.'
  ],
  why: 'Blocks tell the compiler which statements belong together: which ones form a method, which ones run when a condition is true, and how long a variable lives.',
  whenUse: 'Every class and every method has a block. Give every `if`, `else` and loop a block too, even when it holds only one statement.',
  syntax: '`{ statement; statement; ... }` · `public class Name { ... }` · `if (condition) { ... }`',
  fileName: 'Blocks.java',
  code: `public class Blocks {                           // class block opens
    public static void main(String[] args) {    // method block opens
        int apples = 3;
        System.out.println("Apples: " + apples);

        {                                       // a plain inner block opens
            int pears = 2;
            System.out.println("Pears inside: " + pears);
            System.out.println("Apples inside: " + apples);
        }                                       // pears is gone now

        if (apples > 2) {                       // if block opens
            String message = "Many apples";
            System.out.println(message);
        }                                       // if block closes

        System.out.println("End of main");
    }                                           // method block closes
}                                               // class block closes`,
  output: `Apples: 3
Pears inside: 2
Apples inside: 3
Many apples
End of main`,
  codeSummary: 'Four blocks nest inside each other: the class, the method, a plain block and an `if` block. The inner blocks can read `apples`, but `pears` and `message` only live inside their own block.',
  codeExplanation: [
    { label: 'Line 1', code: 'public class Blocks {', text: 'The class block opens. Its matching `}` is the very last line.' },
    { label: 'Line 2', code: 'public static void main(String[] args) {', text: 'The method block opens inside the class block. It is indented by 4 spaces to show that it is inside.' },
    { label: 'Line 3', code: 'int apples = 3;', text: 'Declares `apples` in the method block. Its scope runs until the `}` on line 18, so every inner block can use it.' },
    { label: 'Line 6', code: '{', text: 'A plain block with no keyword in front. It is rare in real code, but it shows scope clearly.' },
    { label: 'Line 7', code: 'int pears = 2;', text: 'Declares `pears` inside the plain block. It exists only until the `}` on line 10.' },
    { label: 'Line 9', code: 'System.out.println("Apples inside: " + apples);', text: 'An inner block can read a variable of an outer block.' },
    { label: 'Line 12', code: 'if (apples > 2) {', text: 'An `if` runs its block only when the condition is true. Here 3 > 2, so the block runs.' },
    { label: 'Line 13', code: 'String message = "Many apples";', text: '`message` is local to the `if` block. After line 15 the name is unknown.' },
    { label: 'Lines 18–19', code: '}', text: 'The method block closes, then the class block. Each `}` closes the most recent `{` that is still open.' }
  ],
  sections: [
    {
      title: 'Braces come in pairs',
      text: [
        'Read the example as boxes inside boxes. The class box holds the method box. The method box holds a plain box and an `if` box.',
        'A `}` always closes the most recent `{` that is still open. So you close the inner box before the outer box.'
      ],
      mermaid: 'flowchart TD\n  C["class block: Blocks"] --> M["method block: main"]\n  M --> P["plain block: pears lives here"]\n  M --> I["if block: message lives here"]\n  M --> A["apples lives in main"]',
      diagramNote: 'Each arrow means "is inside". A name lives in the box where it is declared and in every box below it.'
    },
    {
      title: 'Scope: names live inside their block',
      text: [
        'Here `pears` is declared inside the inner block. After the `}`, the name is gone. The compiler reports `cannot find symbol`, which means "I do not know this name here".',
        'Fix it in one of two ways: declare `pears` in the outer block, or use it only inside the inner block.'
      ],
      fileName: 'OutOfScope.java',
      noRun: true,
      code: `public class OutOfScope {
    public static void main(String[] args) {
        {
            int pears = 2;
        }
        System.out.println(pears);
    }
}`,
      output: `OutOfScope.java:6: error: cannot find symbol
        System.out.println(pears);
                           ^
  symbol:   variable pears
  location: class OutOfScope
1 error`
    },
    {
      title: 'Four kinds of brackets',
      text: ['Java uses four bracket pairs. Each one has its own job. Mixing them up is a common syntax error.'],
      table: {
        head: ['Symbols', 'Name', 'Job', 'Example'],
        rows: [
          ['`{ }`', 'braces', 'blocks: class body, method body, `if` body', '`if (ok) { ... }`'],
          ['`( )`', 'parentheses', 'method parameters and arguments, conditions, grouping in math', '`println(score * (2 + 1))`'],
          ['`[ ]`', 'square brackets', 'arrays', '`String[] args`'],
          ['`< >`', 'angle brackets', 'type parameters (generics)', '`List<String>`']
        ],
        note: 'You meet arrays in [Arrays](../arrays/index.html) and `List<String>` in [Collections](../collections/index.html).'
      }
    },
    {
      title: 'A missing closing brace',
      text: [
        'Here the `}` of the `main` method is missing. The compiler reaches the end of the file while a box is still open, and says `reached end of file while parsing`. **Parsing** means reading the code by the grammar rules.',
        'The error points at the last line, not at the spot where the brace is missing. Count your braces, or let your editor highlight the matching pair: put the cursor next to a brace.'
      ],
      fileName: 'MissingBrace.java',
      noRun: true,
      code: `public class MissingBrace {
    public static void main(String[] args) {
        System.out.println("Hello");

}`,
      output: `MissingBrace.java:5: error: reached end of file while parsing
}
 ^
1 error`
    },
    {
      title: 'Indentation can lie, braces cannot',
      text: [
        'An `if` without braces controls only the one statement right after it. The indentation below suggests that both lines belong to the `if`. They do not.',
        'apples is 1, so the condition is false and the first message is skipped. The second message is a normal statement after the `if`, so it always prints.'
      ],
      fileName: 'NoBraces.java',
      code: `public class NoBraces {
    public static void main(String[] args) {
        int apples = 1;

        if (apples > 2)
            System.out.println("Many apples");
            System.out.println("Time to bake a pie");

        System.out.println("End");
    }
}`,
      output: `Time to bake a pie
End`,
      tip: 'Always write braces after `if`, `else`, `for` and `while`, even for one statement. Then the code does what it looks like.'
    },
    {
      title: 'No name twice in nested blocks',
      text: [
        'Inside one method, an inner block may not declare a name that an outer block already uses. Java forbids it so you never wonder which `apples` you mean.',
        'Two blocks side by side (not nested) may each have their own `pears`, because their scopes do not overlap.'
      ],
      fileName: 'SameName.java',
      noRun: true,
      code: `public class SameName {
    public static void main(String[] args) {
        int apples = 3;
        {
            int apples = 5;
        }
    }
}`,
      output: `SameName.java:5: error: variable apples is already defined in method main(String[])
            int apples = 5;
                ^
1 error`
    }
  ],
  technical: [
    'The parser keeps a stack of open blocks. Each `{` pushes a new level, each `}` pops one. When the file ends and the stack is not empty, you get `reached end of file while parsing`. A `}` with nothing open gives `class, interface, enum, or record expected`.',
    'For every block, the compiler keeps a **symbol table**: a list of the names declared there. To look up a name, it searches the current block, then the block around it, and so on outward. If no table has the name, you get `cannot find symbol`.',
    'When the program runs, each method call gets a **stack frame**, a small piece of memory with numbered slots for its local variables. Braces do not exist in bytecode. javac reuses the slot of `pears` for a later variable once the block of `pears` has ended. You learn more about the stack in [Types and Variables](../types-and-variables/index.html).'
  ],
  tryIt: {
    steps: [
      'Create `Blocks.java`, paste the example, compile with `javac Blocks.java` and run with `java Blocks`.',
      'Add `System.out.println(pears);` right before `System.out.println("End of main");`. Compile and read the error.',
      'Remove that line. Then change `int apples = 3;` to `int apples = 1;`, compile and run again.'
    ],
    see: 'first five lines of output; then `error: cannot find symbol` with `symbol: variable pears`; after the last change, `Many apples` is missing from the output.'
  },
  check: [
    { q: 'Which `{` does a `}` close?', a: 'The most recent `{` that is still open. Blocks close from the inside out.' },
    { q: 'A variable is declared inside an `if` block. Can you print it after the block?', a: 'No. Its scope ends at the `}` of the `if` block. Declare it before the `if` if you need it later.' },
    { q: 'Does indentation change what a Java program does?', a: 'No. The compiler ignores indentation. Only braces decide which statements belong to a block.' }
  ],
  keyPoints: [
    'A block is a group of statements between `{` and `}`.',
    'Every `{` needs one matching `}`; blocks close from the inside out.',
    'A local variable lives from its declaration to the `}` of its block.',
    'Inner blocks see outer names; outer blocks do not see inner names.',
    'Indentation is for humans. Always use braces after `if`, `else` and loops.'
  ],
  commonMistakes: [
    'Forgetting a closing brace, which gives `reached end of file while parsing`. Fix: count `{` and `}`, or let the editor highlight pairs.',
    'Using a variable after its block: `{ int pears = 2; } System.out.println(pears);`. Fix: declare `pears` before the block.',
    'Trusting indentation: `if (apples > 2)` followed by two indented lines. Fix: wrap both lines in `{ }`.',
    'Writing `(` where `{` belongs: `public class Dog (`. Fix: classes and methods open with `{`.'
  ],
  related: ['Statements and Semicolons', 'Whitespace and Indentation', 'Control Flow'],
  glossary: [
    { term: 'block', definition: 'A group of statements between { and }. It gives the code its shape and limits the scope of its variables.' },
    { term: 'scope', definition: 'The part of the code where a name is known. A local variable is in scope from its declaration to the end of its block.' },
    { term: 'local variable', definition: 'A variable declared inside a method or a block. It only exists inside that block.' }
  ]
});
