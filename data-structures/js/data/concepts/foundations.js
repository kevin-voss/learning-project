window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'cs-foundations',
  category: 'Foundations',
  title: 'What Is Computer Science?',
  icon: 'fa-seedling',
  number: '01',
  subtitle: 'Computer science is the study of how to represent information and solve problems step by step.',
  analogy: 'Think of cooking. Ingredients are your data, recipes are your algorithms, and kitchen tools are your data structures. A good cook chooses the right tool: a bowl for mixing, a pan for frying, and a container for storing leftovers. A good programmer does the same with arrays, queues, trees, and graphs.',
  realWorldExample: {
    title: 'A search box in an app',
    desc: 'When you type into a search box, the app stores your text, searches through data, ranks the results, and shows them in order. That one feature uses data, algorithms, memory, and data structures together.',
  },
  whatIsIt: 'Computer science is not just "using computers." It is learning how computers store information, move information, and transform information into useful answers. A data structure organizes data. An algorithm is a step-by-step method that does something with that data. Together, they decide whether a program feels fast, slow, simple, or messy.',
  whyUse: 'Beginners often learn syntax first, like variables and loops. But real programming becomes easier when you understand the ideas underneath: where data lives, how long operations take, why one structure is faster than another, and how the operating system helps programs run.',
  conceptSections: [
    {
      icon: 'fa-database',
      title: 'Data',
      desc: 'Data is the information your program works with: numbers, text, user profiles, images, sensor readings, and more.',
      example: 'A to-do list app stores task titles, due dates, and done/not-done flags.',
    },
    {
      icon: 'fa-list-ol',
      title: 'Algorithms',
      desc: 'An algorithm is a clear recipe: a finite sequence of steps that transforms input into output.',
      example: 'Sorting a playlist alphabetically is an algorithm — compare names, swap when out of order, repeat.',
    },
    {
      icon: 'fa-sitemap',
      title: 'Data structures',
      desc: 'Data structures are ways to organize data so common operations are efficient.',
      example: 'A hash table helps you find a user by email quickly instead of scanning every account.',
    },
    {
      icon: 'fa-road',
      title: 'This roadmap',
      desc: 'You will move from foundations (memory, Big-O) through classic structures and algorithms, then into how computers, the web, security, and databases work in practice.',
      example: 'Follow the sidebar order, use demos and checklists, and mark lessons complete to track progress.',
    },
  ],
  conceptFlow: ['Problem appears', 'Choose data structure', 'Write algorithm', 'Measure complexity', 'Ship and iterate'],
  demoType: 'cs-foundations',
  demoTitle: 'Search box — data, structure, and algorithm',
  demoHint: 'Type a playlist query and step through how stored data, an array structure, and a filter algorithm produce ranked results.',
  relatedIds: ['memory-model', 'big-o-notation', 'arrays'],
  keywords: ['algorithm', 'data structure', 'computer science'],
  checklist: [
    'Explain the difference between data, algorithms, and data structures.',
    'Give a real-world example where all three appear together.',
    'Describe why Big-O and memory matter even before advanced topics.',
    'Skim the roadmap and pick your next three lessons.',
  ],
});
