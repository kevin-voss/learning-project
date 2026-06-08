window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'logical-operators',
  category: 'Foundations',
  title: 'Logical Operators',
  icon: 'fa-toggle-on',
  number: '06',
  subtitle: 'AND, OR, NOT, and XOR help programs make yes/no decisions.',
  analogy: 'Think of a security door. It may open only when you have a badge AND the building is open. A help desk may respond when you email OR call. A light switch uses NOT because flipping it changes on to off or off to on.',
  realWorldExample: {
    title: 'Login checks',
    desc: 'A website may allow login only if the password is correct AND the account is not locked. It may show a warning if the password is wrong OR the account is locked. These are logical operators in plain language.',
  },
  whatIsIt: 'A logical operator combines true/false values. AND is true only when both sides are true. OR is true when at least one side is true. NOT flips true to false or false to true. XOR means exclusive OR: exactly one side must be true, but not both.',
  whyUse: 'Programs constantly make decisions. Should the button be enabled? Should this user access the page? Should this item be included in search results? Logical operators let code combine small yes/no facts into one final decision.',
  conceptSections: [
    {
      icon: 'fa-check-double',
      title: 'AND',
      desc: 'AND requires every condition to be true. If one condition is false, the whole result is false.',
      example: 'Can enter = has ticket AND event is open.',
    },
    {
      icon: 'fa-plus',
      title: 'OR',
      desc: 'OR needs at least one condition to be true. It is false only when every condition is false.',
      example: 'Notify user = email enabled OR SMS enabled.',
    },
    {
      icon: 'fa-rotate',
      title: 'NOT',
      desc: 'NOT flips the answer. true becomes false, and false becomes true.',
      example: 'Can edit = NOT read-only.',
    },
    {
      icon: 'fa-code-branch',
      title: 'XOR',
      desc: 'XOR means exactly one side is true. If both are true or both are false, the result is false.',
      example: 'A simple toggle can think in XOR terms: current state differs from requested state.',
    },
  ],
  conceptFlow: ['Start with facts', 'Combine with logical operator', 'Get one true/false answer', 'Choose what the program does next'],
  whenToUse: [
    { icon: 'fa-lock', title: 'Permissions', desc: 'Allow access when role and account state pass checks.' },
    { icon: 'fa-filter', title: 'Filtering', desc: 'Include items that match one or more conditions.' },
    { icon: 'fa-bug', title: 'Guard clauses', desc: 'Stop early when required facts are missing.' },
    { icon: 'fa-microchip', title: 'Bit logic', desc: 'XOR and AND are also used at lower hardware and binary levels.' },
  ],
  pros: [
    'Makes program decisions precise',
    'Connects everyday yes/no thinking to code',
    'Also appears in hardware, permissions, filters, and algorithms',
  ],
  cons: [
    'Nested logic can become hard to read',
    'AND vs OR mistakes can create bugs',
    'XOR is useful but less common for beginners than AND, OR, and NOT',
  ],
  demoType: 'logic',
});
