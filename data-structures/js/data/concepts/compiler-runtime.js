window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'compiler-runtime',
  category: 'Computer Internals',
  title: 'Compiler, Runtime, and Machine Code',
  icon: 'fa-gears',
  number: '19',
  subtitle: 'Code must be translated and managed before the CPU can run it.',
  analogy: 'Writing code is like writing a recipe in English. The CPU does not understand English. A compiler or interpreter translates your recipe into tiny kitchen commands the machine can follow.',
  realWorldExample: {
    title: 'JavaScript in the browser',
    desc: 'When a browser loads JavaScript, the JavaScript engine parses it, optimizes hot code, allocates memory for objects, and runs instructions on the CPU. The runtime also manages things like the call stack and garbage collection.',
  },
  whatIsIt: 'A compiler translates source code into lower-level code. An interpreter runs code more directly, often step by step. Many modern runtimes use JIT compilation, which means "just in time": code starts running, then frequently used parts are optimized. Machine code is the low-level instruction format the CPU understands.',
  whyUse: 'This explains why high-level code still depends on hardware and memory. Arrays, objects, functions, stacks, heaps, and closures all need runtime support. The compiler or runtime decides how values are represented, where objects live, when memory is reused, and which instructions the CPU runs.',
  conceptSections: [
    {
      icon: 'fa-file-code',
      title: 'Source code',
      desc: 'Source code is what humans write, such as JavaScript, TypeScript, C, Go, or Rust. It is readable by people but not directly executed by the CPU.',
      example: 'const total = prices[0] + prices[1] is source code.',
    },
    {
      icon: 'fa-language',
      title: 'Parsing',
      desc: 'Parsing checks the structure of the code and turns text into a tree-like representation the compiler can understand.',
      example: 'The expression 1 + 2 becomes a small tree with + at the root and 1 and 2 as children.',
    },
    {
      icon: 'fa-gears',
      title: 'Compilation or interpretation',
      desc: 'A compiler translates code before or during execution. An interpreter runs instructions more directly. JavaScript engines often combine both approaches.',
      example: 'Hot code inside a loop may be optimized by the JavaScript engine while the app runs.',
    },
    {
      icon: 'fa-memory',
      title: 'Runtime memory',
      desc: 'The runtime manages the call stack, heap memory, objects, arrays, and garbage collection.',
      example: 'Calling a function pushes a stack frame. Creating an object usually places data on the heap.',
    },
  ],
  conceptFlow: ['Source code', 'Parse into structure', 'Compile / interpret', 'Runtime manages memory', 'CPU runs instructions'],
  whenToUse: [
    { icon: 'fa-layer-group', title: 'Call stack', desc: 'Function calls use stack frames while running.' },
    { icon: 'fa-box-open', title: 'Heap memory', desc: 'Objects and arrays usually live in heap-managed memory.' },
    { icon: 'fa-broom', title: 'Garbage collection', desc: 'The runtime frees memory that is no longer reachable.' },
    { icon: 'fa-bolt', title: 'Optimization', desc: 'Hot code can be optimized so repeated operations run faster.' },
  ],
  pros: [
    'Connects code to CPU, memory, stack, and heap',
    'Explains why runtimes matter for high-level languages',
    'Makes recursion and object references easier to understand',
  ],
  cons: [
    'Real compilers are deep and complex',
    'JavaScript engines hide many low-level details',
    'Different languages compile and run differently',
  ],
});
