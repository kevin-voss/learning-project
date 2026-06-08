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
  whenToUse: [
    { icon: 'fa-boxes-stacked', title: 'Choosing storage', desc: 'Pick arrays, maps, sets, trees, or queues based on what the program needs to do.' },
    { icon: 'fa-route', title: 'Solving a problem', desc: 'Turn a goal into clear algorithm steps a computer can follow.' },
    { icon: 'fa-gauge-high', title: 'Thinking about speed', desc: 'Use Big-O to predict how code behaves when data grows.' },
    { icon: 'fa-microchip', title: 'Understanding the machine', desc: 'Connect code to memory, CPU cache, the OS, and kernel queues.' },
  ],
  pros: [
    'Gives beginners a map for why data structures matter',
    'Connects syntax to real problem solving',
    'Prepares learners for memory, algorithms, and OS concepts',
  ],
  cons: [
    'Abstract at first until you connect it to examples',
    'Requires practice with small problems to feel natural',
  ],
});
