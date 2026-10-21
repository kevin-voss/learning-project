window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'queues',
  category: 'Java 2: Data Structures',
  title: 'Queues',
  icon: 'fa-people-line',
  subtitle: 'A line at the ice cream van. First come, first served.',
  demoType: 'queue',
  keywords: ['queue', 'fifo', 'enqueue', 'dequeue'],
  relatedIds: ['stacks', 'hash-tables', 'concurrency-async'],
  subPages: [
    {
      id: 'picture',
      label: 'The picture',
      title: 'A line at the ice cream van',
      analogy: 'Children wait in a line at the ice cream van. A new child joins at the back. The child at the front gets served and leaves. Nobody jumps the line. The first one in is the first one out.',
      whatIsIt: 'A queue keeps values in a line. You add at the back (enqueue) and take from the front (dequeue). This rule has a name: First In, First Out (FIFO). A stack is the opposite: there the newest value leaves first.',
      realWorldExample: {
        title: 'A printer',
        desc: 'Three people press Print. The printer prints the first job first, then the second, then the third. The jobs wait in a queue.',
      },
      demoTitle: 'Join the line',
      demoHint: 'Enqueue numbers at the back, Dequeue them from the front, Peek at the front.',
      codeTitle: 'Tiny example: a queue in Java',
      codeLanguage: 'Java',
      codeText: `import java.util.ArrayDeque;
import java.util.Queue;

Queue<String> line = new ArrayDeque<>();
line.offer("Ana");                  // joins at the back
line.offer("Ben");
line.offer("Cleo");
System.out.println(line.peek());    // Ana (front)
System.out.println(line.poll());    // Ana leaves
System.out.println(line);           // [Ben, Cleo]`,
      tryIt: {
        steps: [
          'In the demo, Enqueue 1, then 2, then 3.',
          'Press Dequeue once.',
          'Press Peek Front.',
        ],
        result: 'Dequeue takes 1 out. Peek then shows 2 at the front.',
      },
      checklist: [
        'You can explain enqueue and dequeue with a line of people.',
        'You can say what First In, First Out means and how it differs from a stack.',
        'You can name two real queues: a printer, a support hotline, a list of jobs.',
      ],
      check: [
        { q: 'Ana, Ben and Cleo join a queue in that order. Who leaves first?', a: 'Ana. She was first in, so she is first out.' },
        { q: 'Push A, B, C on a stack and offer A, B, C to a queue. What comes out first in each?', a: 'The stack gives C. The queue gives A.' },
        { q: 'In Java, what does poll() do on a Queue?', a: 'It takes the value at the front out of the queue and returns it.' },
      ],
    },
    {
      id: 'where-you-meet-it',
      label: 'Where you meet it',
      title: 'Where you meet queues',
      anim: 'conveyor',
      demoType: null,
      whatIsIt: 'Queues appear whenever work must wait its turn. Servers keep incoming jobs in a queue. Big systems even send messages between programs through a queue, so a slow program can catch up later.',
      whenToUse: [
        { icon: 'fa-print', title: 'Print jobs', desc: 'The printer works through jobs in the order they arrived.' },
        { icon: 'fa-headset', title: 'Support tickets', desc: 'The customer who waited longest gets helped first.' },
        { icon: 'fa-server', title: 'Background work', desc: 'Send emails or resize photos one job after another.' },
        { icon: 'fa-envelope', title: 'Message queues', desc: 'One program drops messages in. Another program picks them up later.' },
      ],
      check: [
        { q: 'Why does an email service put emails in a queue?', a: 'So they are sent in order, one after another, even if many arrive at once.' },
      ],
    },
    {
      id: 'look-inside',
      label: 'Look inside',
      title: 'Look inside: build one yourself',
      demoType: null,
      whatIsIt: 'A queue can be a chain of nodes, like a linked list. Remember the front and the back. offer hooks a new node behind the back. poll unhooks the front. Both are quick, because nothing has to slide.',
      codeTitle: 'A tiny queue in Java',
      codeLanguage: 'Java',
      codeText: `class Line {
    private static class Node {
        String name; Node next;
        Node(String name) { this.name = name; }
    }
    private Node front, back;

    void offer(String name) {
        Node n = new Node(name);
        if (back == null) { front = n; back = n; return; }  // empty line
        back.next = n;                // hook behind the last person
        back = n;
    }

    String poll() {
        if (front == null) return null;   // nobody waiting
        String name = front.name;
        front = front.next;               // the next person moves up
        if (front == null) back = null;
        return name;
    }
}

// Line l = new Line(); l.offer("Ana"); l.offer("Ben");
// System.out.println(l.poll());   // Ana`,
      check: [
        { q: 'Why does the Line class keep both front and back?', a: 'offer needs the back to hook on a new node, and poll needs the front to take one off. Both stay quick.' },
      ],
    },
  ],
});
