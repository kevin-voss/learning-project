// Lesson 06: scope (blocks, nested blocks, loops, fields vs locals, shadowing) and lifetime.
(function () {
  const topic = Java.topics.typesAndVariables;

  topic.lessons.push({
    num: '06',
    id: 'scope',
    title: 'Scope',
    category: 'variables',
    icon: '{}',
    tagline: 'Where a name lives',
    realWorld: 'A house has rooms. A toy you leave in the kitchen is known in the kitchen. From the hallway you can walk into the kitchen, but a toy left in a cupboard inside the kitchen stays in the cupboard.',
    kid: [
      'Every pair of curly brackets `{ }` is like a room. A box you make inside a room belongs to that room.',
      'When you leave the room, the box is thrown away. Nobody outside even knows its name.',
      'But from a small room you can see the boxes of the big room around it, like a child in a tent inside the living room can still see the sofa.'
    ],
    definition: 'The **scope** of a variable is the part of the code where its name exists. A local variable lives from its declaration to the closing `}` of the **block** it was declared in. Inner blocks can see variables of outer blocks, never the other way round.',
    explain: [
      'A **block** is code between `{` and `}`. The body of `main` is a block. You can also write a bare block, and every `if` and every loop has its own block. Blocks were introduced in [Syntax Fundamentals](../syntax-fundamentals/index.html).',
      'A **local variable** is a variable declared inside a method. Its scope starts at the line where it is declared and ends at the `}` that closes its block. Before the declaration and after the closing brace, the name does not exist, and using it is a compile error: `cannot find symbol`.',
      'Blocks nest like rooms in a house. Code in an inner block can read and change variables of the blocks around it. Code in an outer block cannot see into an inner block.',
      'Two blocks side by side may each declare a variable with the same name: they are two different boxes. But an inner block may not declare a local with the same name as a local of an outer block that is still alive. Java forbids this to avoid confusion.',
      'A **field** is a variable declared directly in the class, outside every method. Its scope is the whole class. The **lifetime** of a variable (how long the box exists while the program runs) usually matches its scope for locals. A `static` field lives as long as the program runs.'
    ],
    why: 'Small scopes keep names from getting mixed up, and the reader sees every place where a variable can change.',
    whenUse: 'Always. Declare each variable in the smallest block that needs it, as close as possible to where you first use it.',
    syntax: '`{ int x = 1; /* x exists here */ } /* x is gone here */` · a field: `static int count = 0;` inside the class, outside methods',
    fileName: 'ScopeRooms.java',
    code: `public class ScopeRooms {
    // A field: every method of the class can see it
    static int visitors = 0;

    public static void main(String[] args) {
        int total = 10;                 // lives until main ends

        {                               // a block: a small room
            int bonus = 5;              // lives only in this room
            total = total + bonus;      // the room can see total
            visitors = visitors + 1;
            System.out.println("Inside: total=" + total + ", bonus=" + bonus);
        }                               // bonus is gone here

        if (total > 12) {               // runs the block only if total > 12
            String message = "Big total!";
            System.out.println(message);
            visitors = visitors + 1;
        }

        {                               // a new room may reuse the name
            int bonus = 100;
            System.out.println("Second room bonus=" + bonus);
        }

        System.out.println("Outside: total=" + total);
        System.out.println("Visitors: " + visitors);
        // System.out.println(bonus);   would not compile: bonus is gone
    }
}`,
    output: `Inside: total=15, bonus=5
Big total!
Second room bonus=100
Outside: total=15
Visitors: 2`,
    codeSummary: 'One field, one variable for all of `main`, and three small blocks with their own variables.',
    codeExplanation: [
      { label: 'Line 3', code: 'static int visitors = 0;', text: 'A field. Its scope is the whole class, so `main` and every block inside it can use it.' },
      { label: 'Line 6', code: 'int total = 10;                 // lives until main ends', text: 'A local variable of `main`. It exists from here to the last `}` of `main`.' },
      { label: 'Line 9', code: 'int bonus = 5;              // lives only in this room', text: '`bonus` is declared inside the bare block, so it exists only until line 13.' },
      { label: 'Line 10', code: 'total = total + bonus;      // the room can see total', text: 'An inner block can read and change a variable of the outer block. `total` becomes 15.' },
      { label: 'Line 13', code: '}                               // bonus is gone here', text: 'The block ends, and with it the name `bonus` and its box.' },
      { label: 'Line 15', code: 'if (total > 12) {               // runs the block only if total > 12', text: '`if` runs its block only when the condition is true. You learn it in [Control Flow](../control-flow/index.html). Here 15 > 12, so it runs.' },
      { label: 'Line 16', code: 'String message = "Big total!";', text: '`message` belongs to the `if` block and is gone after line 19.' },
      { label: 'Line 22', code: 'int bonus = 100;', text: 'Allowed: the first `bonus` is already gone, so this is a brand new box with the same name.' },
      { label: 'Line 28', code: '// System.out.println(bonus);   would not compile: bonus is gone', text: 'Out here no `bonus` exists. Remove the `//` and the compiler says `cannot find symbol`.' }
    ],
    sections: [
      {
        title: 'Rooms inside rooms',
        text: 'Here is the example as a house plan. Each box is a scope. Code can look outward (to the boxes around it), never inward.',
        mermaid: `flowchart TB
  subgraph C["class ScopeRooms: field visitors"]
    subgraph M["main: total"]
      B1["block 1: bonus = 5"]
      B2["if block: message"]
      B3["block 2: bonus = 100"]
    end
  end`,
        diagramNote: 'Block 1 sees `bonus`, `total` and `visitors`. `main` sees `total` and `visitors`, but not `bonus` or `message`.'
      },
      {
        title: 'Using a name after its block',
        text: 'The most common scope error. The box was made inside a block, and the code tries to use it after the block ended.',
        fileName: 'GoneVar.java',
        code: `public class GoneVar {
    public static void main(String[] args) {
        {
            int inside = 5;
        }
        System.out.println(inside);
    }
}`,
        noRun: true,
        output: `GoneVar.java:6: error: cannot find symbol
        System.out.println(inside);
                           ^
  symbol:   variable inside
  location: class GoneVar
1 error`,
        tip: 'Fix: declare the variable before the block (`int inside = 0;`), then assign it inside the block. Then it survives the block.'
      },
      {
        title: 'Same name: when is it allowed?',
        text: 'Java is stricter than some other languages here. A name may be reused only when the first box is already gone.',
        table: {
          head: ['Situation', 'Allowed?', 'Why'],
          rows: [
            ['Two blocks side by side, both declare `bonus`', 'yes', 'the first `bonus` is gone before the second is made'],
            ['Outer `total`, inner block declares `int total`', 'no', '`variable total is already defined in method main(String[])`'],
            ['Same block, `int age` twice', 'no', 'same error: two boxes with one name'],
            ['Field `count`, local `int count` in a method', 'yes, but confusing', 'the local hides the field (shadowing, see below)']
          ]
        }
      },
      {
        title: 'Loops: a fresh box every round',
        text: [
          'A `for` loop repeats its block. `for (int round = 1; round <= 3; round++)` runs the block three times, with `round` being 1, 2 and 3. You learn loops in [Control Flow](../control-flow/index.html).',
          'A variable declared inside the loop block is made new in every round and thrown away at the end of the round. A variable that must survive the rounds, like a running sum, is declared before the loop.'
        ],
        fileName: 'LoopScope.java',
        code: `public class LoopScope {
    public static void main(String[] args) {
        int sum = 0;                          // outside: survives the loop
        for (int round = 1; round <= 3; round++) {
            int doubled = round * 2;          // a new box each round
            sum = sum + doubled;
            System.out.println("round " + round + ": doubled=" + doubled + ", sum=" + sum);
        }
        System.out.println("sum after the loop: " + sum);
        // round and doubled do not exist here
    }
}`,
        output: `round 1: doubled=2, sum=2
round 2: doubled=4, sum=6
round 3: doubled=6, sum=12
sum after the loop: 12`,
        warn: 'If you move `int sum = 0;` into the loop block, `sum` starts at 0 in every round, and you cannot print it after the loop.'
      },
      {
        title: 'Fields, locals and shadowing',
        text: [
          'A local variable may have the same name as a field. Inside its scope, the local **shadows** (hides) the field: the plain name means the local. The field is still there. You reach it by its full name, `ClassName.fieldName`.',
          'Shadowing is legal, but it confuses readers. Give locals and fields different names unless you have a good reason.'
        ],
        fileName: 'Shadowing.java',
        code: `public class Shadowing {
    static int count = 100;                   // a field

    public static void main(String[] args) {
        System.out.println(count);            // the field
        int count = 5;                        // a local with the same name
        System.out.println(count);            // the local wins
        System.out.println(Shadowing.count);  // the field, by its full name
    }
}`,
        output: `100
5
100`
      }
    ],
    technical: [
      'Scope is a compile-time idea. `javac` keeps a table of names for every block. When it reaches a `}`, it drops the names declared in that block. A name that is not in any table around the current line is reported as `cannot find symbol`.',
      'At run time, local variables are numbered slots in the method’s frame on the stack. When a block ends, `javac` may reuse its slots for the variables of the next block, so `bonus` in block 1 and `bonus` in block 2 can share the same slot. The frame itself disappears when the method returns.',
      'Fields are not on the stack. A `static` field belongs to the class and lives as long as the class is loaded, usually until the program ends. Fields of objects live as long as their object (more in Stack, Heap, References).'
    ],
    tryIt: {
      steps: [
        'Copy `ScopeRooms.java` and run it.',
        'Remove the `//` in front of the last `System.out.println(bonus);` and compile.',
        'Put the `//` back. Inside the first block, add `int total = 1;` and compile again.'
      ],
      see: 'first `cannot find symbol ... variable bonus`, then `variable total is already defined in method main(String[])`.'
    },
    check: [
      { q: 'A variable is declared inside an `if` block. Can you print it after the block?', a: 'No. Its scope ends at the closing `}` of the `if` block. Declare it before the `if` if you need it later.' },
      { q: 'Can two blocks side by side both declare `int x`?', a: 'Yes. The first `x` is gone when the second block starts, so they never exist at the same time.' },
      { q: 'Where should you declare a sum that grows inside a loop?', a: 'Before the loop. Inside the loop it would start again at 0 in every round.' }
    ],
    keyPoints: [
      'A local variable lives from its declaration to the `}` of its block.',
      'Inner blocks see outer variables. Outer blocks never see inner ones.',
      'Side-by-side blocks may reuse a name. Nested blocks may not.',
      'Fields live in the class and are visible in all its methods.',
      'Declare each variable in the smallest block that needs it.'
    ],
    commonMistakes: [
      'Using a variable after its block: `{ int x = 1; } System.out.println(x);`. Fix: declare `x` before the block.',
      'Resetting a total every round: `for (...) { int sum = 0; ... }`. Fix: declare `int sum = 0;` before the loop.',
      'Redeclaring an outer name in an inner block: `int total = 1;` inside a block of `main`. Fix: pick a new name, or drop `int` to reuse the outer box.',
      'Hiding a field by accident with a local of the same name. Fix: use different names.'
    ],
    related: ['What a Variable Is', 'Default Values', 'Control Flow'],
    glossary: topic.glossary
  });
})();
