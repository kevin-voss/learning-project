window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// Java 1: comes right after Java classes, so the examples use Java.
DS.curriculum.push({
  id: 'memory-model',
  category: 'Java 1: Memory',
  title: 'Where Do My Variables Live?',
  icon: 'fa-memory',
  subtitle: 'Memory is a kitchen full of numbered shelf spots.',
  demoType: 'memory-model',
  keywords: ['ram', 'byte', 'memory address', 'reference'],
  relatedIds: ['stack-heap-gc', 'arrays', 'linked-lists'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'A kitchen full of numbered shelf spots',
      analogy: 'Think of a big kitchen. Every spot on every shelf has a number. While you cook, you put things on spots and take them off again. When you go home, the kitchen is cleaned out. That kitchen is RAM, the working memory of your computer.',
      whatIsIt: 'RAM is where a running program keeps its data. It is a very long row of tiny spots. Each spot holds one byte (8 bits, each bit a 0 or a 1). Each spot has a number, its memory address. A Java int takes 4 spots. When the program ends, its RAM is given back.',
      demoTitle: 'Look into memory',
      demoHint: 'Switch between the views. Each box shows a value and its address.',
      codeTitle: 'How much room does it take?',
      codeLanguage: 'Java',
      codeText: `int age = 9;          // 4 bytes
long stars = 400L;    // 8 bytes
boolean done = true;  // 1 byte (in practice)
char letter = 'A';    // 2 bytes

System.out.println(Integer.BYTES);  // 4`,
      checklist: [
        'You can explain RAM, byte and memory address with the kitchen picture.',
        'You can say why the data of a program is gone after it ends.',
        'You can say how many bytes a Java int uses.',
      ],
      check: [
        { q: 'What is a memory address?', a: 'The number of a spot in memory, like the number on a shelf spot.' },
        { q: 'You close your program. What happens to its variables in RAM?', a: 'They are gone. RAM is only working memory.' },
      ],
    },
    {
      id: 'values-and-references',
      label: 'Values and references',
      title: 'Values and references: labels on strings',
      analogy: 'A small value, like the number 9, fits right in its box. A big object, like a Parcel, does not. It sits on a shelf in the storage room. Your variable only holds a label with a string that leads to it. Two labels can lead to the same parcel.',
      whatIsIt: 'Variables of type int, double, boolean and char hold the value itself. Variables of a class type, like Parcel or String, hold a reference: the address of the object. Copying an int copies the number. Copying a reference copies the label, not the object.',
      demoType: null,
      codeTitle: 'Copy a value, copy a reference',
      codeLanguage: 'Java',
      codeText: `int a = 5;
int b = a;          // b gets its own copy of 5
b = 7;
System.out.println(a);           // 5

Parcel p1 = new Parcel("Maya");
Parcel p2 = p1;     // a second label on the SAME parcel
p2.name = "Leo";
System.out.println(p1.name);     // Leo`,
      tryIt: {
        steps: [
          'Make a class Parcel with a public String name and a constructor.',
          'Paste the code above into main and run it.',
        ],
        result: '5, then Leo. p1 and p2 lead to the same object.',
      },
      check: [
        { q: 'int x = 3; int y = x; y = 4; What is x?', a: '3. y got its own copy.' },
        { q: 'Why does p1.name change when you change p2.name?', a: 'p1 and p2 hold the same reference, so they lead to one and the same object.' },
      ],
    },
    {
      id: 'deeper-cpu-cache',
      label: 'Deeper: CPU cache',
      title: 'Deeper: the CPU cache',
      analogy: 'The shelves (RAM) are big but a few steps away. The workbench (CPU cache) is tiny but right under your hands. When things you need sit next to each other, you carry many at once.',
      whatIsIt: 'The CPU does the work. It is much faster than RAM, so it keeps a small, very fast copy of recent data: the cache. Array values sit side by side, so one trip fills the cache with the next values too. Linked list nodes can be spread all over memory, so the cache helps less.',
      conceptSections: [
        { icon: 'fa-microchip', title: 'CPU', desc: 'Runs instructions: add, compare, jump.', example: 'A loop repeats the same instructions.' },
        { icon: 'fa-bolt', title: 'Cache', desc: 'Tiny, very fast memory next to the CPU.', example: 'Holds the values you used last.' },
        { icon: 'fa-memory', title: 'RAM', desc: 'Big, slower working memory.', example: 'All your objects live here.' },
      ],
      checklist: ['Explain why looping over an array is usually fast.'],
    },
  ],
});
