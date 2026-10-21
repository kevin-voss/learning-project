window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// Java 1: after classes and memory-model. Kitchen picture: plates = stack,
// storage room = heap, labels on strings = references.
DS.curriculum.push({
  id: 'stack-heap-gc',
  category: 'Java 1: Memory',
  title: 'Stack, Heap, and Garbage Collection',
  icon: 'fa-recycle',
  subtitle: 'A pile of plates, a storage room, and a cleaner.',
  demoType: 'stack-heap-gc',
  keywords: ['stack memory', 'heap memory', 'garbage collection', 'reference', 'stack overflow'],
  relatedIds: ['memory-model', 'stacks', 'recursion-call-stack'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'Plates and a storage room',
      analogy: 'In the kitchen, every job gets a plate on a pile. The plate holds the small things for that job. When the job is done, the top plate goes away. Big things, like a box of toys, go into the storage room. On the plate there is only a label with a string that leads to the box.',
      whatIsIt: 'Java uses two parts of memory. The stack is the pile of plates: every method call gets one plate (a frame) with its local variables. When the method ends, its plate is removed. The heap is the storage room: every object made with new lives there. A local variable like Parcel p is on the plate. The Parcel object is in the heap.',
      demoTitle: 'Stack, heap and the cleaner',
      demoHint: 'Look at the plates, then at the storage room, then let the cleaner run.',
      codeTitle: 'Who lives where?',
      codeLanguage: 'Java',
      codeText: `public class Main {
    static Parcel pack(String name) {
        int weight = 2;                  // stack: on pack()'s plate
        Parcel p = new Parcel(name);     // p on the plate, the object in the heap
        return p;                        // the plate goes, the object stays
    }

    public static void main(String[] args) {
        Parcel mine = pack("Maya");      // mine is a label to the same object
        System.out.println(mine.name);   // Maya
    }
}`,
      checklist: [
        'You can say what goes on the stack (frames with local variables) and what goes in the heap (objects).',
        'You can explain why an object can live longer than the method that made it.',
        'You can draw a variable on a plate with a string to an object in the heap.',
      ],
      check: [
        { q: 'Where does int weight = 2; inside a method live?', a: 'On the stack, in the frame of that method.' },
        { q: 'Where does new Parcel("Maya") live?', a: 'In the heap. Only the reference to it is in the frame.' },
        { q: 'pack() has ended. Why is the parcel still there?', a: 'main still has a label (the reference mine) that leads to it.' },
      ],
    },
    {
      id: 'garbage-collection',
      label: 'Garbage collection',
      title: 'Garbage collection: the cleaner',
      analogy: 'Every night a cleaner walks through the storage room. He follows every string from every plate. A box that no string leads to is not needed anymore, so he throws it away.',
      whatIsIt: 'In Java you never free memory yourself. The garbage collector (GC) does it. It starts from the references that are still in use and marks every object it can reach. Objects that nobody can reach are removed. An object stays alive as long as at least one reference leads to it.',
      codeTitle: 'When is an object garbage?',
      codeLanguage: 'Java',
      codeText: `Parcel a = new Parcel("Maya");
Parcel b = a;       // two labels on one parcel
a = null;           // one string cut, still reachable through b
b = new Parcel("Leo");
// Now no label leads to "Maya". The GC may remove it.`,
      tryIt: {
        steps: [
          'In the demo, open "Garbage collection".',
          'Press "Drop reference" until the count is 0.',
          'Press "Run GC".',
        ],
        result: 'The object with no references is marked as removed.',
      },
      check: [
        { q: 'When can the GC remove an object?', a: 'When no reference leads to it anymore.' },
        { q: 'Do you call a method to free memory in Java?', a: 'No. The garbage collector does it for you.' },
      ],
    },
    {
      id: 'deeper-problems',
      label: 'Deeper: overflow and leaks',
      title: 'Deeper: StackOverflowError and memory leaks',
      demoType: null,
      whatIsIt: 'The pile of plates has a limit. A method that calls itself forever adds plates until Java stops with a StackOverflowError. The heap has a limit too. If you keep references to objects you no longer need, for example in a list that only grows, the GC can never clean them. That is a memory leak. In the end Java stops with an OutOfMemoryError.',
      codeTitle: 'Two classic mistakes',
      codeLanguage: 'Java',
      codeText: `// 1. No stop condition: StackOverflowError
static int countDown(int n) {
    return countDown(n - 1);       // forgot: if (n == 0) return 0;
}

// 2. A list that only grows: memory leak
static List<byte[]> history = new ArrayList<>();
static void remember() {
    history.add(new byte[1_000_000]);  // never removed
}`,
      checklist: ['Name the cause of a StackOverflowError.', 'Explain how a list that only grows causes a leak.'],
      relatedIds: ['recursion-call-stack'],
    },
  ],
});
