window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'linked-lists',
  category: 'Java 2: Data Structures',
  title: 'Linked Lists',
  icon: 'fa-link',
  subtitle: 'A chain of wagons. Each wagon knows only the next one.',
  demoType: 'linkedlist',
  keywords: ['linked list', 'node', 'head', 'null'],
  relatedIds: ['arrays', 'stacks', 'queues', 'memory-model'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'A train of wagons',
      analogy: 'Think of a toy train. Each wagon holds one thing and has a hook to the next wagon. The engine is the start. To reach wagon 5, you walk along from the engine: 1, 2, 3, 4, 5. To add a wagon in the middle, you unhook two wagons and hook the new one in between. No other wagon moves.',
      whatIsIt: 'A linked list is a chain of nodes. A node holds one value and a link to the next node. The first node is the head. The last node links to null, which means "no more wagons". There are no box numbers like in an array.',
      demoTitle: 'Build a chain',
      demoHint: 'Prepend adds a node at the front. Append adds one at the end. Delete removes a value.',
      codeTitle: 'Tiny example: Java\'s LinkedList',
      codeLanguage: 'Java',
      codeText: `import java.util.LinkedList;

LinkedList<String> train = new LinkedList<>();
train.add("coal");          // at the end
train.add("wood");
train.addFirst("mail");     // at the front, nothing slides
System.out.println(train);  // [mail, coal, wood]
train.removeFirst();        // unhook the first wagon
System.out.println(train);  // [coal, wood]`,
      tryIt: {
        steps: [
          'In the demo, Append three numbers.',
          'Prepend one more number.',
          'Type the middle number and press Delete.',
        ],
        result: 'Only the arrows next to the change move. The other nodes stay where they are.',
      },
      checklist: [
        'You can draw a linked list as boxes with arrows and name the head and null.',
        'You can explain why adding at the front is quick but reaching item 100 is slow.',
        'You can say when you would pick a list of wagons over a shelf of boxes (an array).',
      ],
      check: [
        { q: 'A list is A -> B -> C -> null. How do you reach C?', a: 'Start at the head A, follow the link to B, then follow the link to C.' },
        { q: 'You add X at the front of A -> B. What changes?', a: 'X links to A, and the head now points at X. A and B do not move.' },
        { q: 'Why is reading item 100 slow in a linked list?', a: 'There are no box numbers. You must follow 99 links from the head first.' },
      ],
    },
    {
      id: 'where-you-meet-it',
      label: 'Where you meet it',
      title: 'Where you meet linked lists',
      demoType: null,
      whatIsIt: 'You rarely write a linked list by hand. You use one inside other tools. In Java, ArrayList is the everyday choice. LinkedList is good when you add and remove at both ends a lot.',
      whenToUse: [
        { icon: 'fa-music', title: 'Playlists', desc: 'Each song links to the next. Removing one song only changes two links.' },
        { icon: 'fa-clock-rotate-left', title: 'Back and forward', desc: 'Browser history can link each page to the previous and next page.' },
        { icon: 'fa-layer-group', title: 'Inside other structures', desc: 'Stacks, queues and hash table buckets often use a chain of nodes.' },
      ],
      check: [
        { q: 'Which is the everyday list in Java: ArrayList or LinkedList?', a: 'ArrayList. Pick LinkedList when you add and remove at the ends a lot.' },
      ],
    },
    {
      id: 'look-inside',
      label: 'Look inside',
      title: 'Look inside: build one yourself',
      demoType: null,
      whatIsIt: 'You know Java classes now, so you can build your own chain. A Node class holds a value and a next link. The list only remembers its head. Read the code top to bottom, then type it into a Main.java and run it.',
      codeTitle: 'A tiny linked list in Java',
      codeLanguage: 'Java',
      codeText: `class Node {
    String value;
    Node next;                    // link to the next wagon, or null
    Node(String value) { this.value = value; }
}

class Train {
    Node head;                    // the engine

    void addFirst(String value) {
        Node wagon = new Node(value);
        wagon.next = head;        // hook the new wagon to the old first one
        head = wagon;
    }

    void print() {
        Node current = head;
        while (current != null) { // walk until there are no more wagons
            System.out.print(current.value + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
}

// In main: Train t = new Train(); t.addFirst("wood"); t.addFirst("coal"); t.print();
// Output:  coal -> wood -> null`,
      check: [
        { q: 'In print(), why does the loop stop?', a: 'The last node\'s next is null, so current becomes null and the while condition is false.' },
        { q: 'How would you add a method size()?', a: 'Walk from head to null like print() does and count the nodes.' },
      ],
    },
  ],
});
