// Lesson (deeper): LinkedList vs ArrayList, and ArrayDeque for queues and stacks.
(function () {
  Java.addCoreLessons('collections', [
    {
      id: 'linked-list',
      title: 'LinkedList vs ArrayList',
      category: 'deeper',
      icon: 'o-o',
      tagline: 'A chain of nodes instead of a row of slots',
      realWorld: 'A row of seats in a cinema versus children holding hands in a chain. To find seat 7 you look at seat 7. To find child 7 in the chain you start at the first child and count along the hands.',
      kid: [
        'An `ArrayList` is like a row of seats bolted to the floor. Every seat has a number, so you go straight to seat 7. But if a new child wants to sit in seat 1, everybody from seat 1 on must stand up and move one seat further.',
        'A `LinkedList` is like children holding hands. Each child only knows the hand on the left and the hand on the right. A new child can join at the front: he takes the first child by the hand, done. Nobody else moves.',
        'But if you want child number 7, you must start at one end and walk along the chain, hand by hand. So each kind of list is fast at different things.'
      ],
      definition: '`LinkedList` is another `List` class. It stores each element in its own small **node** object that points to the next and the previous node. Adding or removing at the ends is fast, but reaching index `i` means walking from one end.',
      explain: [
        'Both classes keep the promise of the `List` interface. `add`, `get`, `remove`, `size` and the for-each loop work the same way, and both print as `[a, b, c]`.',
        'The difference is how they store things. `ArrayList` uses one array, a single block of slots next to each other in memory. `LinkedList` uses separate **nodes**. Each node holds the element plus two references: `next` and `prev` (previous). The list itself only remembers the `first` and the `last` node.',
        'For the two ends there are `addFirst`, `addLast`, `getFirst`, `getLast`, `removeFirst` and `removeLast`. Since Java 21 every `List` has them, but only a `LinkedList` does them at the front without moving the other elements. With them it works as a **queue** (first in, first out, like a line at the bakery).',
        'In practice `ArrayList` wins almost always: it uses less memory and the computer reads a block of slots very fast. For a queue or a **stack** (last in, first out, like a pile of plates) Java has `ArrayDeque`, which is usually faster than `LinkedList` too.'
      ],
      why: 'Knowing how a class stores data tells you which operations are cheap. This is the first time you pick a class by its inside, a skill you need for Sets and Maps next.',
      whenUse: 'Use `ArrayList` as your normal list. Reach for `ArrayDeque` (or `LinkedList`) when you mainly add and remove at the front and back, like a waiting line.',
      syntax: 'LinkedList<T> q = new LinkedList<>();   q.addFirst(x);   q.addLast(x);   q.getFirst();   q.removeFirst();   Deque<T> d = new ArrayDeque<>();',
      fileName: 'LinkedListDemo.java',
      code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class LinkedListDemo {
    public static void main(String[] args) {
        LinkedList<String> queue = new LinkedList<>();
        queue.addLast("Ada");      // join at the back
        queue.addLast("Kai");
        queue.addLast("Mina");
        queue.addFirst("VIP");     // jumps to the front
        System.out.println("Queue: " + queue);

        System.out.println("First: " + queue.getFirst());
        System.out.println("Last: " + queue.getLast());

        String served = queue.removeFirst();
        System.out.println("Served: " + served);
        System.out.println("Queue: " + queue);

        // Both are Lists, so the same List methods work on both
        List<String> a = new ArrayList<>(queue);
        List<String> b = new LinkedList<>(queue);
        System.out.println(a.get(1) + " " + b.get(1));
        System.out.println(a.equals(b));
    }
}`,
      output: `Queue: [VIP, Ada, Kai, Mina]
First: VIP
Last: Mina
Served: VIP
Queue: [Ada, Kai, Mina]
Kai Kai
true`,
      codeSummary: 'A waiting line built with LinkedList, then the same data in an ArrayList and a LinkedList.',
      codeExplanation: [
        { label: 'Line 7', code: 'LinkedList<String> queue = new LinkedList<>();', text: 'An empty LinkedList of Strings. It has no array inside, only a reference to its first and last node (both empty for now).' },
        { label: 'Line 8', code: 'queue.addLast("Ada");      // join at the back', text: 'Puts Ada at the end. For a LinkedList this only links one new node to the last one.' },
        { label: 'Line 11', code: 'queue.addFirst("VIP");     // jumps to the front', text: 'Adds a node before the first one. No other element has to move.' },
        { label: 'Line 14', code: 'System.out.println("First: " + queue.getFirst());', text: '`getFirst` reads the front element without removing it.' },
        { label: 'Line 17', code: 'String served = queue.removeFirst();', text: 'Takes the front element out and returns it. The next node becomes the new first.' },
        { label: 'Line 22', code: 'List<String> a = new ArrayList<>(queue);', text: 'Every collection class has a constructor that copies another collection.' },
        { label: 'Line 24', code: 'System.out.println(a.get(1) + " " + b.get(1));', text: 'The same call works on both. The ArrayList jumps to slot 1; the LinkedList walks one step from the first node.' },
        { label: 'Line 25', code: 'System.out.println(a.equals(b));', text: 'Two lists are equal when they hold equal elements in the same order, whatever their class.' }
      ],
      sections: [
        {
          title: 'Slots versus nodes',
          text: [
            'The picture shows the same three names in both lists. The ArrayList keeps them side by side, with free slots for later. The LinkedList keeps three separate nodes that point at each other.',
            'To insert at the front of the ArrayList, every slot must move one place. In the LinkedList you make one new node and change two arrows.'
          ],
          mermaid: `flowchart LR
  subgraph AL["ArrayList: one block of slots"]
    direction LR
    s0["0: Ada"] --- s1["1: Kai"] --- s2["2: Mina"] --- s3["3: free"]
  end
  subgraph LL["LinkedList: nodes with arrows"]
    direction LR
    F["first"] --> n1["Ada"]
    n1 <--> n2["Kai"]
    n2 <--> n3["Mina"]
    L["last"] --> n3
  end`,
          diagramNote: 'Each double arrow is a `next` and a `prev` reference. The LinkedList object itself only stores `first`, `last` and `size`.'
        },
        {
          title: 'Which one is fast at what',
          text: ['"Fast" here means the time does not grow with the list. "Slow" means it grows with the number of elements, so it hurts for big lists.'],
          table: {
            head: ['Operation', 'ArrayList', 'LinkedList'],
            rows: [
              ['`get(i)` / `set(i, x)`', 'fast: jump to slot i', 'slow: walk node by node'],
              ['`add(x)` at the end', 'fast (sometimes copies to grow)', 'fast'],
              ['add or remove at the front', 'slow: shift every element', 'fast: change two arrows'],
              ['add or remove in the middle', 'slow: shift the rest', 'slow: walk there first, then fast'],
              ['`contains(x)`', 'slow: check each element', 'slow: check each element'],
              ['memory per element', 'one reference (4 to 8 bytes)', 'a whole node object (about 24 bytes)']
            ],
            note: 'Real measurements show ArrayList faster in most programs, even in some cases where the table says "slow", because a block of slots is very friendly to the computer memory cache.'
          }
        },
        {
          title: 'Queues and stacks with ArrayDeque',
          text: [
            'A **queue** serves the oldest element first, like a bakery line. A **stack** serves the newest first, like a pile of plates: you put a plate on top and take the top one off.',
            '`ArrayDeque` ("deck", double-ended queue) does both. `push` and `pop` work on the top of a stack. `offerLast` and `pollFirst` make a queue. `peek` looks at the next element without removing it. Its variable type is the interface `Deque`.'
          ],
          fileName: 'DequeDemo.java',
          code: `import java.util.ArrayDeque;
import java.util.Deque;

public class DequeDemo {
    public static void main(String[] args) {
        // A stack of plates: last in, first out
        Deque<String> stack = new ArrayDeque<>();
        stack.push("plate 1");
        stack.push("plate 2");
        stack.push("plate 3");
        System.out.println("Take: " + stack.pop());
        System.out.println("Now on top: " + stack.peek());

        // A waiting line: first in, first out
        Deque<String> line = new ArrayDeque<>();
        line.offerLast("Ada");
        line.offerLast("Kai");
        line.offerLast("Mina");
        System.out.println("Serve: " + line.pollFirst());
        System.out.println("Still waiting: " + line);
    }
}`,
          output: `Take: plate 3
Now on top: plate 2
Serve: Ada
Still waiting: [Kai, Mina]`,
          tip: '`pollFirst()` returns `null` on an empty queue, while `removeFirst()` crashes. Use `poll` when "nobody waiting" is a normal case.'
        },
        {
          title: 'What get(2) costs in a LinkedList',
          text: [
            'A LinkedList cannot compute where element 2 lives. It starts at a node it knows and follows `next` arrows. Inside a loop like `for (int i = 0; i < list.size(); i++) list.get(i)` this walk happens again for every `i`.',
            'So always loop over a LinkedList with for-each (it walks the chain once), never with `get(i)`.'
          ],
          mermaid: `sequenceDiagram
  participant You
  participant LL as LinkedList
  participant N0 as node 0
  participant N1 as node 1
  participant N2 as node 2
  You->>LL: get(2)
  LL->>N0: start at first
  N0->>N1: follow next
  N1->>N2: follow next
  N2-->>You: element of node 2`,
          diagramNote: 'Three steps for index 2; ten thousand steps for index 10000. An ArrayList needs one step for any index.'
        }
      ],
      technical: [
        'A `LinkedList` node is a tiny private class `Node<E>` with three fields: `item`, `next` and `prev`. Each node is its own object on the heap with an object header, so one element costs about 24 bytes plus the element itself. An `ArrayList` stores only one reference per element in its array.',
        '`get(i)` in `LinkedList` is a little clever: if `i` is in the first half, it walks from `first`, otherwise backwards from `last`. It is still slow for big lists, because it must touch every node on the way.',
        'Modern processors read memory in blocks called **cache lines**. The slots of an array lie next to each other, so one read brings several of them at once. Linked nodes lie anywhere on the heap, so each step can be a slow trip to main memory. This is why ArrayList usually wins even when the theory says it should not.',
        '`ArrayDeque` is a **circular array**: it keeps a `head` and a `tail` index into one array, and both ends can grow without shifting elements. That gives fast front and back operations without the per-node cost.'
      ],
      tryIt: {
        steps: [
          'Copy `LinkedListDemo.java`, compile and run it.',
          'Add `queue.addFirst("Zoe");` and `queue.removeLast();` before the last print of `Queue:`.',
          'In `DequeDemo.java`, call `stack.pop()` four times in a row, and see what happens on the fourth.'
        ],
        see: '`Queue: [Zoe, Ada, Kai]` after step 2, and a `NoSuchElementException` on the fourth `pop()` because the stack is empty.'
      },
      check: [
        { q: 'Which is faster for `get(5000)` on a big list: ArrayList or LinkedList?', a: 'ArrayList. It jumps to slot 5000; a LinkedList walks thousands of nodes.' },
        { q: 'What does a LinkedList node store?', a: 'The element and two references: `next` and `prev`.' },
        { q: 'Which class do you use for a pile of plates (last in, first out)?', a: '`ArrayDeque`, with `push`, `pop` and `peek`.' }
      ],
      keyPoints: [
        'ArrayList: one block of slots, fast `get(i)`, the normal choice.',
        'LinkedList: a chain of nodes, fast at both ends, slow `get(i)`.',
        'Both are `List`s, so the same code works with either.',
        'For queues and stacks prefer `ArrayDeque` with the `Deque` interface.'
      ],
      commonMistakes: [
        'Choosing `LinkedList` "because inserting is fast". In the middle it must walk there first. Measure, or use `ArrayList`.',
        '`for (int i = 0; i < linked.size(); i++) linked.get(i)` walks the chain again and again. Use `for (String x : linked)`.',
        '`arrayList.addFirst(x)` in a loop. Since Java 21 every `List` has `addFirst`, but on an `ArrayList` it still shifts every element. For many front inserts use an `ArrayDeque`.'
      ],
      related: ['lists', 'which-collection', 'JVM Memory']
    }
  ]);
})();
