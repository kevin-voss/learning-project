window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'os-kernel-queues',
  category: 'Computer Internals',
  title: 'OS and Kernel Data Structures',
  icon: 'fa-microchip',
  number: '18',
  subtitle: 'Operating systems use queues, stacks, trees, maps, and buffers to manage programs and hardware.',
  analogy: 'The kernel is like an airport control tower. Planes, luggage, gates, and passengers all need coordination. The tower keeps lists, queues, priorities, maps, and schedules so everything moves safely.',
  realWorldExample: {
    title: 'The ready queue',
    desc: 'When many programs want CPU time, the OS keeps runnable tasks in a ready queue. The scheduler chooses which task runs next. Some systems use priority queues so urgent work can run sooner.',
  },
  whatIsIt: 'The operating system is software that manages hardware and running programs. The kernel is the core part of the OS. It uses data structures everywhere: queues for tasks and events, stacks for function calls, trees for file systems, maps for process IDs, buffers for devices, and page tables for virtual memory.',
  whyUse: 'Learning OS data structures shows that arrays, queues, trees, and hash tables are not just classroom topics. They are used to schedule CPU time, track memory, store files, handle keyboard input, receive network packets, and isolate programs from each other.',
  conceptSections: [
    {
      icon: 'fa-window-restore',
      title: 'Process',
      desc: 'A process is a running program with its own memory space. Your browser, editor, and music app are separate processes so they do not freely overwrite each other.',
      example: 'The OS tracks each process with a process ID, often called a PID.',
    },
    {
      icon: 'fa-code-branch',
      title: 'Thread',
      desc: 'A thread is one path of execution inside a process. A process can have one thread or many threads doing different work.',
      example: 'A browser may use different threads for UI work, networking, and background tasks.',
    },
    {
      icon: 'fa-microchip',
      title: 'Kernel',
      desc: 'The kernel is the protected core of the operating system. It talks to hardware, manages memory, schedules CPU time, and handles device events.',
      example: 'When you press a key, the kernel receives the event before your app reads it.',
    },
    {
      icon: 'fa-list-check',
      title: 'Scheduler',
      desc: 'The scheduler decides which thread or process gets CPU time next. It uses queues and priorities so many programs can appear to run at once.',
      example: 'A ready queue stores tasks that are ready to run but waiting for CPU time.',
    },
    {
      icon: 'fa-table',
      title: 'Virtual memory',
      desc: 'Virtual memory lets each process act like it has its own memory. The OS maps virtual addresses to real RAM using page tables.',
      example: 'Two processes can both use an address that looks similar, while the OS maps them to different real memory.',
    },
  ],
  conceptFlow: ['Process has threads', 'Scheduler queues ready work', 'Kernel gives CPU time', 'Events and buffers wait', 'Memory maps through page tables'],
});
