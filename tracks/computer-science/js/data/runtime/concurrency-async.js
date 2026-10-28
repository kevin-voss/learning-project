window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// "Patterns, threads and design" stage. Picture: one cook vs. several cooks sharing one kitchen.
DS.curriculum.push({
  id: 'concurrency-async',
  category: 'Go Deeper',
  title: 'Concurrency, Threads, and Async',
  icon: 'fa-bolt',
  subtitle: 'Doing several things at once, and waiting without standing still.',
  demoType: 'concurrency-async',
  keywords: ['thread', 'concurrency', 'async', 'race condition'],
  relatedIds: ['stack-heap-gc', 'queues', 'os-kernel-queues'],
  subPages: [
    {
      id: 'threads',
      label: 'The picture',
      title: 'One cook or several cooks?',
      analogy: 'One cook makes soup, then salad, then cake: one after the other. Three cooks in the same kitchen can make all three at the same time. They share the stove, the fridge and the knives. That is faster, but they must not get in each other\'s way.',
      whatIsIt: 'A thread is one cook: one line of steps that runs on its own. A Java program starts with one thread, the one that runs main. You can start more threads. They run at the same time and share the same heap (the same kitchen). Doing several things at once is called concurrency.',
      demoScenario: 'threads',
      demoTitle: 'Two cooks',
      demoHint: 'Start both cooks and watch their steps mix.',
      codeTitle: 'Two threads in Java',
      codeLanguage: 'Java',
      codeText: `public class Kitchen {
    public static void main(String[] args) throws InterruptedException {
        Thread soup  = new Thread(() -> System.out.println("Cook 1: soup"));
        Thread salad = new Thread(() -> System.out.println("Cook 2: salad"));
        soup.start();     // both cooks start working
        salad.start();
        soup.join();      // main waits until both are done
        salad.join();
        System.out.println("Dinner is ready");
    }
}`,
      tryIt: {
        steps: [
          'Put the code into Kitchen.java and run it a few times.',
          'Look at the order of the first two lines.',
        ],
        result: 'Sometimes soup comes first, sometimes salad. "Dinner is ready" is always last.',
      },
      checklist: [
        'You can explain a thread with the cooks picture.',
        'You can say why two threads that change the same data need care.',
        'You can explain why await lets the page keep working while it waits.',
      ],
      check: [
        { q: 'Why can the order of "soup" and "salad" change between runs?', a: 'The two threads run at the same time. Which one prints first depends on timing.' },
        { q: 'What does join() do?', a: 'It makes main wait until that thread is finished.' },
      ],
    },
    {
      id: 'race-condition',
      label: 'Race condition',
      title: 'Race condition: two cooks, one egg',
      analogy: 'Two cooks both see one egg left in the fridge. Both think "I will take it". Both reach for it at the same moment. Now one recipe has no egg. Nobody did anything wrong alone. The problem is the timing.',
      whatIsIt: 'A race condition happens when two threads change the same data at the same time. count++ looks like one step, but it is three: read, add one, write back. If two threads read the same old value, one update is lost. The fix: let only one thread at a time do the change, for example with synchronized or an AtomicInteger.',
      demoScenario: 'race',
      demoTitle: 'Lost update',
      demoHint: 'Let both cooks add one to the counter at the same time, then the safe way.',
      codeTitle: 'A lost update, and the fix',
      codeLanguage: 'Java',
      codeText: `static int eggs = 0;
static AtomicInteger safeEggs = new AtomicInteger();

Runnable work = () -> {
    for (int i = 0; i < 100_000; i++) {
        eggs++;                       // not safe: updates get lost
        safeEggs.incrementAndGet();   // safe: one at a time
    }
};
// start two threads with 'work', join both, then print:
// eggs is often less than 200000, safeEggs is always 200000`,
      check: [
        { q: 'Why is count++ not safe with two threads?', a: 'It is read, add, write. Both threads can read the same old value, so one update is lost.' },
        { q: 'Name one fix in Java.', a: 'Use an AtomicInteger, or put the change in a synchronized method or block.' },
      ],
    },
    {
      id: 'async-await',
      label: 'Waiting with await',
      title: 'Waiting without standing still',
      analogy: 'A single cook puts water on to boil. She does not stare at the pot. She cuts vegetables, and when the water boils she comes back to it. One cook, but no time wasted.',
      whatIsIt: 'Browser JavaScript has only one main thread, one cook. Asking a server takes time. With await, the function pauses at that line and the browser keeps working: buttons still react. When the answer arrives, the function goes on from where it paused. This is called async (asynchronous) code.',
      demoScenario: 'async',
      demoTitle: 'One cook, no waiting',
      demoHint: 'Simulate a server request and watch the main thread keep working.',
      codeTitle: 'await in JavaScript',
      codeLanguage: 'JavaScript',
      codeText: `async function loadUser() {
  console.log('1. ask the server');
  const response = await fetch('https://api.github.com/users/octocat');
  const user = await response.json();
  console.log('3. answer:', user.name);
}

loadUser();
console.log('2. the page keeps working');`,
      tryIt: {
        steps: [
          'Open the browser console (F12).',
          'Paste the code and press Enter.',
        ],
        result: 'The lines in the order 1, 2, 3. Line 2 does not wait for the server.',
      },
      check: [
        { q: 'Why is "2" printed before "3"?', a: 'await pauses only loadUser. The rest of the program goes on while the server answers.' },
        { q: 'How many threads does browser JavaScript use for your code?', a: 'One main thread. It does not stand still while it waits.' },
      ],
    },
  ],
});
