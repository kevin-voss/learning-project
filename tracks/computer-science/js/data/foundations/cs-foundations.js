window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

// Opens the stage "Java 3 · Algorithms" on the path: a friendly map, not a syllabus.
DS.curriculum.push({
  id: 'cs-foundations',
  category: 'Java 3: Smart Code',
  title: 'The Big Map of Computer Science',
  icon: 'fa-seedling',
  subtitle: 'Look back at what you know, and see where the next steps go.',
  analogy: 'Think of cooking. The ingredients are your data. The kitchen tools are your data structures: a bowl, a pan, a fridge. The recipe is your algorithm: the steps you follow. A good cook picks the right tool for each recipe. So does a good programmer.',
  realWorldExample: {
    title: 'A search box',
    desc: 'You type "light" into a music app. The app keeps songs in a list (data structure). It checks every song for the word (algorithm). Then it shows the matches. Every app feature is data, a structure and an algorithm working together.',
  },
  whatIsIt: 'Computer science is the study of how to store information and how to solve problems step by step. You already know a lot of it: arrays, lists, stacks, queues and hash maps are data structures. Your loops and methods are algorithms. Now you learn to ask: which way is faster, and why?',
  conceptSections: [
    { icon: 'fa-database', title: 'Data', desc: 'The information your program works with.', example: 'Song titles, prices, user names.' },
    { icon: 'fa-sitemap', title: 'Data structures (you know these)', desc: 'Ways to keep data in order.', example: 'Array, linked list, stack, queue, hash map.' },
    { icon: 'fa-list-ol', title: 'Algorithms (next)', desc: 'Step-by-step recipes that work on the data.', example: 'Search for a song. Sort a list by name.' },
    { icon: 'fa-gauge-high', title: 'Speed (next)', desc: 'How much more work when the data gets bigger?', example: 'Big-O gives this a short name.' },
  ],
  conceptFlow: ['A problem', 'Pick a data structure', 'Write the algorithm', 'Ask: how fast is it?'],
  demoType: 'cs-foundations',
  demoTitle: 'A search box: data, structure and recipe',
  demoHint: 'Type a word and step through how the songs, the list and the search recipe work together.',
  relatedIds: ['big-o-notation', 'searching-algorithms', 'sorting-algorithms'],
  keywords: ['algorithm', 'data structure', 'computer science'],
  tryIt: {
    steps: [
      'In the demo, type "light" and step through the phases.',
      'Count how many songs the search had to check.',
    ],
    result: 'Every song was checked once: 5 songs, 5 checks.',
  },
  checklist: [
    'You can say what data, a data structure and an algorithm are, with the kitchen picture.',
    'You can name three data structures you already used.',
    'You can say what the next lessons in this stage are about: speed, searching, sorting.',
  ],
  check: [
    { q: 'Is a HashMap a data structure or an algorithm?', a: 'A data structure. It keeps data in order so you can find it fast.' },
    { q: 'A list has 1 million songs. The search checks every song. Why is that a problem?', a: 'It has to do 1 million checks. The next lesson, Big-O, is about exactly this.' },
  ],
});
