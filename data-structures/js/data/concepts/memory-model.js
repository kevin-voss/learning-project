window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'memory-model',
  category: 'Foundations',
  title: 'Memory, RAM, and CPU Cache',
  icon: 'fa-memory',
  number: '02',
  subtitle: 'Programs run by placing bits in memory, then asking the CPU to read and change them.',
  analogy: 'Imagine a workshop. The storage room is RAM: bigger, but farther away. The workbench is CPU cache: tiny, but very close to your hands. If tools are lined up together, you work faster. If every tool is hidden in a different room, you waste time walking around.',
  realWorldExample: {
    title: 'Why arrays often feel fast',
    desc: 'Array values usually sit close together in memory. When the CPU reads one value, it often brings nearby values into cache too. That makes looping through an array fast. A linked list may jump from one memory address to another, so the CPU cache helps less.',
  },
  whatIsIt: 'Memory is where a running program keeps data. A bit is a single 0 or 1. A byte is 8 bits. RAM is the main working memory. A memory address is a number that tells the computer where a value lives. CPU cache is very small, very fast memory close to the CPU. Cache locality means data is stored close together, so the CPU can read it efficiently.',
  whyUse: 'Data structures are not just shapes in diagrams. They have real memory behavior. Arrays are cache-friendly because items are stored next to each other. Linked lists are flexible, but each node may live somewhere else. Hash tables use buckets. Trees and graphs use many references. Understanding memory explains why two structures with the same Big-O can still feel different in practice.',
  conceptSections: [
    {
      icon: 'fa-microchip',
      title: 'CPU',
      desc: 'The CPU is the part that runs instructions: add these numbers, compare these values, jump to this function, read this memory address. It is very fast, so waiting for memory can become the slow part.',
      example: 'When a loop compares every array item, the CPU repeats the same simple instruction many times.',
    },
    {
      icon: 'fa-memory',
      title: 'RAM',
      desc: 'RAM is the main working memory for running programs. Arrays, objects, nodes, stacks, queues, and buffers all need space in RAM while the program is running.',
      example: 'A 1,000 item array uses RAM for the values plus extra bookkeeping the language runtime needs.',
    },
    {
      icon: 'fa-bolt',
      title: 'CPU cache',
      desc: 'CPU cache is tiny but much faster than RAM. When data is stored next to nearby data, the CPU can often load a chunk once and reuse it quickly.',
      example: 'Looping through an array is usually cache-friendly because indexes 0, 1, 2, and 3 live near each other.',
    },
    {
      icon: 'fa-map-marker-alt',
      title: 'Memory address',
      desc: 'A memory address is like a house number for data. A pointer or reference stores enough information for the program to find another object.',
      example: 'A linked list node stores a value plus a reference to the next node address.',
    },
  ],
  conceptFlow: ['CPU asks for data', 'CPU cache checks nearby fast memory', 'RAM returns data if cache missed', 'CPU runs instruction'],
});
