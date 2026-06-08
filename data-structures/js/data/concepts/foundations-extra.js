window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'testing-debugging',
    category: 'Foundations',
    title: 'Testing and Debugging Basics',
    icon: 'fa-vial',
    number: '07',
    subtitle: 'Tests catch regressions; debuggers help you see what code actually does.',
    analogy: 'Tests are rehearsal before opening night. Debugging is rewinding the tape frame by frame when a scene fails.',
    realWorldExample: { title: 'Broken login', desc: 'A unit test fails on empty password; the debugger shows validation never ran because of a typo in the condition.' },
    whatIsIt: 'Unit tests check small functions in isolation. Integration tests check components together. Debugging uses breakpoints, logs, and stack traces to find wrong assumptions.',
    whyUse: 'Beginners ship faster when feedback is automatic. Tests document expected behavior; debuggers shorten guess-and-check cycles.',
    demoType: 'testing-debugging',
    demoTitle: 'Test runner playground',
    demoHint: 'Run sample tests and see pass/fail output — then tweak assertions to watch regressions appear.',
    relatedIds: ['logical-operators', 'recursion-call-stack'],
    keywords: ['unit test', 'debugger', 'regression'],
    checklist: ['Write one test case in plain language.', 'Explain assert / expect style checks.', 'Name three debugging tools: log, breakpoint, stack trace.'],
  },
  {
    id: 'abstraction-apis',
    category: 'Foundations',
    title: 'Abstraction, APIs, and Interfaces',
    icon: 'fa-plug',
    number: '08',
    subtitle: 'Hide complexity behind a stable contract so callers do not need every detail.',
    analogy: 'A car steering wheel is an interface — you turn left without knowing rack-and-pinion geometry.',
    realWorldExample: { title: 'Weather widget', desc: 'Your app calls weather.api.com; you do not parse satellites — you trust JSON fields temperature and city.' },
    whatIsIt: 'Abstraction simplifies. An API (Application Programming Interface) is the surface others call — HTTP endpoints, library functions, or OS syscalls. Interfaces define allowed operations without exposing internals.',
    whyUse: 'Teams split work: frontend uses API contracts while backend changes databases. Good abstractions reduce coupling and bugs.',
    demoType: 'abstraction-apis',
    demoTitle: 'Abstraction layers',
    demoHint: 'Switch between app, API, and database views to see what each layer hides.',
    relatedIds: ['client-server', 'rest-api-design'],
    keywords: ['api', 'abstraction', 'interface'],
    checklist: ['Define API in one sentence.', 'Give an example of hiding implementation detail.', 'Explain why contracts matter for frontend/backend teams.'],
  }
);
