import type { RawTopic } from '@/data/normalizeCurriculum'

/** New guided topics (Phase 04) — intros + ≥2 examples each */
export const variablesTopic: RawTopic = {
  id: 'variables',
  name: 'Variables & data types',
  icon: 'fa-box',
  desc: 'Give names (like price or nickname) to values the computer can remember and reuse while your program runs.',
  intro: {
    whatItIs:
      'A program often needs to remember something for later—a price, a person’s nickname, yes or no for a toggle. A variable gives a clear nickname to one stored piece of information at a time. You introduce that nickname with words like let (you may swap in a new value later) or const (the nickname always points at the same value). The computer keeps letters and words in quoted text, counting numbers without quotes, and true/false when you need yes or no.',
    whyItMatters:
      'Nearly every lesson after this piles new ideas onto “store a value where you can find it again.” Without named values you cannot build carts, greetings, timers, or anything else.',

    realWorldExamples: [
      'SKU code and unit price on a purchase line',
      'User display name vs internal id',
      'Feature flag read from config',
    ],
    syntaxPattern: `let lineTotal = unitPrice * quantity;
const sku = 'NB-100';`,
    syntaxParts: [
      '`let` — introduces a nickname you are allowed to replace later; `const` means this nickname will always refer to the same value.',
      '`lineTotal` and `sku` — the nicknames themselves (chosen by you following normal naming rules).',
      '`=` — does not mean “equals” in math; it means “work out what is on the right, store it under the name on the left.”',
      '`unitPrice * quantity` and `"NB-100"` — the right side can be arithmetic, plain text in quotes, or other expressions you learn next.',
    ],
    technicalExample: `const taxRate = 0.0825;\nlet subtotal = 42;\nlet owed = subtotal * (1 + taxRate);`,
    everydayExample:
      'Coffee shop tab: jot the food subtotal, read the printed tax percentage from the poster, scribble how much cash to collect—each scribble matches one named stored value.',
  },
  examples: [
    {
      name: 'Retail line item',
      code: [
        `let productName = "Canvas backpack";`,
        `let unitPrice = 48;`,
        `let quantity = 2;`,
        ``,
        `let lineTotal = unitPrice * quantity;`,
        ``,
        `console.log(productName, lineTotal);`,
      ],
      steps: [
        {
          l: 0,
          vars: { productName: 'Canvas backpack' },
          out: [],
          expl: 'Declare a **string** (`productName`) describing what the shopper added.',
          changed: ['productName'],
        },
        {
          l: 1,
          vars: { productName: 'Canvas backpack', unitPrice: 48 },
          out: [],
          expl: 'Store the __unit price__ as a ==number==.',
          changed: ['unitPrice'],
        },
        {
          l: 2,
          vars: { productName: 'Canvas backpack', unitPrice: 48, quantity: 2 },
          out: [],
          expl: '*Quantity* is also numeric—here **two** units.',
          changed: ['quantity'],
        },
        {
          l: 4,
          vars: {
            productName: 'Canvas backpack',
            unitPrice: 48,
            quantity: 2,
            lineTotal: 96,
          },
          out: [],
          expl: 'Multiply **price × quantity** for the ==line subtotal==.',
          changed: ['lineTotal'],
        },
        {
          l: 6,
          vars: {
            productName: 'Canvas backpack',
            unitPrice: 48,
            quantity: 2,
            lineTotal: 96,
          },
          out: ['Canvas backpack 96'],
          expl: '`console.log` prints a quick __receipt-style__ line for QA or a demo.',
          console: true,
        },
      ],
    },
    {
      name: 'SKU and stock',
      code: [
        `const sku = 'NB-100';`,
        `let stock = 40;`,
        `stock = stock - 2;`,
        ``,
        `console.log(sku, 'on hand:', stock);`,
      ],
      steps: [
        {
          l: 0,
          vars: { sku: 'NB-100' },
          out: [],
          expl: 'Use `const` so the **SKU** binding cannot be reassigned accidentally.',
          changed: ['sku'],
        },
        {
          l: 1,
          vars: { sku: 'NB-100', stock: 40 },
          out: [],
          expl: 'Opening inventory count for the warehouse view.',
          changed: ['stock'],
        },
        {
          l: 2,
          vars: { sku: 'NB-100', stock: 38 },
          out: [],
          expl: 'Decrement when two units ship—`stock` can change because it is `let`.',
          changed: ['stock'],
        },
        {
          l: 4,
          vars: { sku: 'NB-100', stock: 38 },
          out: ['NB-100 on hand: 38'],
          expl: 'Print the stable identifier with the live count.',
          console: true,
        },
      ],
    },
  ],
}

export const operatorsTopic: RawTopic = {
  id: 'operators',
  name: 'Operators',
  icon: 'fa-calculator',
  desc: 'Use math signs and comparison words (+, −, comparisons, words like “and” / “or”) to combine values and answer yes-or-no questions.',
  intro: {
    buildsOn: [
      {
        topicId: 'variables',
        note:
          'Operators combine the values stored under your names (numbers, text where allowed, true/false).',
      },
    ],
    whatItIs:
      'An operator is a tiny symbol (+ − * /, === < > , && || ! …) wedged between two values. Math operators crunch numbers into a new number. Comparison operators test two values (often numbers or text) and answer with true or false. Logical glue like “and”, “or”, and “not” combine those yes-or-no answers.',
    whyItMatters:
      'Discount percents, free-shipping rules, eligibility checks—all are “crunch compare combine” spelled out step by step after you have named values.',

    realWorldExamples: [
      'Applying a percentage discount',
      'Checking free shipping against a minimum cart value',
      'Validating a PIN length with comparisons',
    ],
    syntaxPattern: `let eligible = score >= gate && !(blocked || dormant);
let total = price * (1 - discount / 100);`,
    syntaxParts: [
      '`score >= gate` — asks “is the left number at least as big as the right?” and answers true or false.',
      '`&&` — “both parts must be true.”',
      '`||` — “at least one part is true.”',
      '`!` flipped in front asks “invert this yes-or-no.”',
      'Parentheses group smaller questions so you read them in the order you intend.',
      '`price * (...)` — ordinary multiplication and division inside the grouped part.',
    ],
    technicalExample:
      `let tall = height >= gate;\nlet allowed = tall && wristbandOk;`,
    everydayExample:
      'School dance entry: taller than measuring line YES and parental form signed YES—you stack two checks.',
  },
  examples: [
    {
      name: 'Discounted price',
      code: [
        `let list = 80;`,
        `let discountPercent = 25;`,
        ``,
        `let price = list * (1 - discountPercent / 100);`,
        ``,
        `console.log('You pay', price);`,
      ],
      steps: [
        {
          l: 0,
          vars: { list: 80 },
          out: [],
          expl: 'List price before promotion.',
          changed: ['list'],
        },
        {
          l: 1,
          vars: { list: 80, discountPercent: 25 },
          out: [],
          expl: 'Percent off as a number (25 → 25%).',
          changed: ['discountPercent'],
        },
        {
          l: 3,
          vars: { list: 80, discountPercent: 25, price: 60 },
          out: [],
          expl: `Convert percent to a multiplier: 1 − 0.25 = 0.75; 80 × 0.75 = 60.`,
          changed: ['price'],
        },
        {
          l: 5,
          vars: { list: 80, discountPercent: 25, price: 60 },
          out: ['You pay 60'],
          expl: 'Echo the final payable amount for the learner.',
          console: true,
        },
      ],
    },
    {
      name: 'Eligibility flags',
      code: [
        `let age = 17;`,
        `let parentalOk = true;`,
        ``,
        `let canEnroll = age >= 18 || parentalOk;`,
        ``,
        `console.log('Enroll:', canEnroll);`,
      ],
      steps: [
        {
          l: 0,
          vars: { age: 17 },
          out: [],
          expl: 'Learner age determines default policy.',
          changed: ['age'],
        },
        {
          l: 1,
          vars: { age: 17, parentalOk: true },
          out: [],
          expl: 'Boolean tracks consent for minors.',
          changed: ['parentalOk'],
        },
        {
          l: 3,
          vars: { age: 17, parentalOk: true, canEnroll: true },
          out: [],
          expl: 'Logical OR (`||`) — under 18 still allowed when consent is true.',
          changed: ['canEnroll'],
        },
        {
          l: 5,
          vars: { age: 17, parentalOk: true, canEnroll: true },
          out: ['Enroll: true'],
          expl: 'Summarize the decision for logs or UI.',
          console: true,
        },
      ],
    },
  ],
}

export const functionsTopic: RawTopic = {
  id: 'functions',
  name: 'Functions',
  icon: 'fa-code',
  desc: 'Write a reusable set of instructions with a name—then call that name wherever you need the same calculation or wording.',
  intro: {
    buildsOn: [
      {
        topicId: 'variables',
        note: 'Parameters behave like freshly created variables each time someone calls your function.',
      },
      {
        topicId: 'operators',
        note: 'The insides of a function freely use arithmetic and comparisons.',
      },
    ],
    whatItIs:
      'A function is one named bundle of instructions. You declare it once with the word function, give it inputs in parentheses “placeholders”, run steps inside curly braces, and optionally send back one answer using return.',
    whyItMatters:
      'Copy-pasting identical math invites mistakes; naming the recipe once lets checkout, invoices, and reports share the exact same rounding rules.',

    realWorldExamples: [
      'VAT helper used at checkout and receipts',
      'Formatter for ISO dates in dashboards',
      'Pure math helpers for simulations',
    ],
    syntaxPattern: `function linePrice(unitCents, qty) {
  return unitCents * qty;
}`,
    syntaxParts: [
      '`function` — starts the reusable recipe.',
      '`linePrice` — the name callers type when they want that recipe.',
      '`(unitCents, qty)` — placeholder nicknames separated by commas.',
      '`{ … }` — concrete steps belonging to one call.',
      '`return expr` — optional—the value handed back wherever the caller was waiting.',
    ],
    technicalExample:
      `function fmtIso(d) {\n  return d.toISOString();\n}`,
    everydayExample:
      'A conversion chart on a recipe card: multiply ingredients by servings—every cook reuses one procedure with different numeric inputs.',
  },
  examples: [
    {
      name: 'Line total helper',
      code: [
        `function lineTotal(unit, qty) {`,
        `  return unit * qty;`,
        `}`,
        ``,
        `let total = lineTotal(9.5, 4);`,
        ``,
        `console.log(total);`,
      ],
      steps: [
        {
          l: 0,
          vars: {},
          out: [],
          expl: 'Define `lineTotal` once—call it anywhere you need price × quantity.',
        },
        {
          l: 4,
          vars: { total: 38 },
          out: [],
          expl: `Pass arguments 9.5 and 4; multiply inside the function.`,
          changed: ['total'],
        },
        {
          l: 6,
          vars: { total: 38 },
          out: ['38'],
          expl: 'Returned value becomes your single source of truth.',
          console: true,
        },
      ],
    },
    {
      name: 'Greeting builder',
      code: [
        `function greet(first, last) {`,
        `  return 'Hi ' + first + ' ' + last + '!';`,
        `}`,
        ``,
        `console.log(greet('Ada', 'Lovelace'));`,
      ],
      steps: [
        {
          l: 0,
          vars: {},
          out: [],
          expl: 'Concatenate strings inside the function boundary.',
        },
        {
          l: 4,
          vars: {},
          out: ['Hi Ada Lovelace!'],
          expl: 'Reuse the same helper for any customer name.',
          console: true,
        },
      ],
    },
  ],
}

export const objectsTopic: RawTopic = {
  id: 'objects',
  name: 'Objects',
  icon: 'fa-database',
  desc: 'One value that groups labeled fields—a row of related facts instead of scattering loose variables.',
  intro: {
    buildsOn: [
      {
        topicId: 'variables',
        note:
          'Each field name works like naming a value sitting inside one bigger bundled value.',
      },
      {
        topicId: 'functions',
        note: 'You pass whole grouped values into functions inside one argument whenever that helps readability.',
      },
      {
        topicId: 'arrays',
        note: 'A field inside an object can itself point at a whole list—a topic you already practiced.',
      },
    ],
    whatItIs:
      'Imagine a paper form with labeled blanks: Title, Borrower due date—the whole page is one lump you can slide across the desk instead of juggling six loose slips. In code, an object is that idea: curly braces `{ }` glue named fields (“keys”) each pointing at whatever value belongs there—even another nested miniature form underneath.',
    whyItMatters:
      'Servers send JSON lumps, settings files store nested toggles bundling dozens of knobs—objects match how paperwork already groups related facts.',

    realWorldExamples: [
      'User profile with id, email and plan columns',
      'Shipment record linking carrier tracking code ETA',
      'Feature flags listing toggles tied to each customer',
    ],
    syntaxPattern: `let ship = {
  id: 'ord-771',
  to: { city: 'Austin', tz: 'US/Central' }
};`,
    syntaxParts: [
      '`{ }` — outer shell meaning “everything inside belongs together”.',
      '`id:` lines — pattern “label colon expression” stores one field.',
      '`to:` nests another `{}` miniature form underneath.',
      '`ship.to.city` — reads left-to-right stepping deeper into layered layers.',
    ],
    technicalExample: `let order = {
  id: 99,
  shipTo: { city: 'Eugene' }
};
console.log(order.shipTo.city);`,
    everydayExample:
      'Shipment folder: carton label pulls customer name, dock door, ETA—distinct fields glued into one dossier.',
  },
  examples: [
    {
      name: 'Account snapshot',
      code: [
        `let user = {`,
        `  handle: 'neo',`,
        `  plan: 'team',`,
        `  active: true`,
        `};`,
        ``,
        `user.plan = 'enterprise';`,
        ``,
        `console.log(user.handle, user.plan);`,
      ],
      steps: [
        {
          l: 0,
          vars: { user: { handle: 'neo', plan: 'team', active: true } },
          out: [],
          expl: 'Group related fields in one value you can pass around.',
          changed: ['user'],
        },
        {
          l: 6,
          vars: { user: { handle: 'neo', plan: 'enterprise', active: true } },
          out: [],
          expl: 'Update a property when the customer upgrades mid-session.',
          changed: ['user'],
        },
        {
          l: 8,
          vars: { user: { handle: 'neo', plan: 'enterprise', active: true } },
          out: ['neo enterprise'],
          expl: 'Read properties with dot notation for labels or UI.',
          console: true,
        },
      ],
    },
    {
      name: 'Nested address',
      code: [
        `let order = {`,
        `  id: 901,`,
        `  shipTo: { city: 'Oslo', country: 'NO' }`,
        `};`,
        ``,
        `console.log(order.shipTo.city);`,
      ],
      steps: [
        {
          l: 0,
          vars: { order: { id: 901, shipTo: { city: 'Oslo', country: 'NO' } } },
          out: [],
          expl: 'Objects nest—`shipTo` is its own miniature record.',
          changed: ['order'],
        },
        {
          l: 6,
          vars: { order: { id: 901, shipTo: { city: 'Oslo', country: 'NO' } } },
          out: ['Oslo'],
          expl: 'Chain property access to drill into nested data.',
          console: true,
        },
      ],
    },
  ],
}

export const domTopic: RawTopic = {
  id: 'dom',
  name: 'DOM manipulation',
  icon: 'fa-html5',
  desc: 'The visible webpage lives in memory as a tree of titles, boxes, and buttons—your script can jump to one branch and read or change it.',
  intro: {
    buildsOn: [
      {
        topicId: 'variables',
        note: 'You store the thing you found in an ordinary name before reading or changing it.',
      },
      {
        topicId: 'objects',
        note: 'Each tag you grab behaves like a bundle of fields—text, classes, nested children.',
      },
      {
        topicId: 'functions',
        note: 'Small functions later poke this tree when someone clicks.',
      },
    ],
    whatItIs:
      'The browser hangs headings, paragraphs, and buttons along a branching outline you can traverse from “whole page down to one lone cell.” Scripts pick exactly one knot with a miniature address string resembling what you learned for styling—that returns a handle exposing readable text through `.textContent`, style toggles via `.classList`, and room for attaching child snippets—without rewriting the entire markup string each time.',
    whyItMatters:
      'Every visible interaction—toast banners, glowing buttons, tucked validation lines—means updating whichever branch viewers focus on rather than reloading a giant static sheet whenever data refreshes.',

    realWorldExamples: [
      'Showing validation messages directly under each field',
      'Sliding drawers open while toggling styles on page root',
      'Listing rows fetched from server data',
    ],
    syntaxPattern: `const el = document.querySelector('#toast');
el.textContent = 'Saved!';
el.classList.add('toast--show');`,
    syntaxParts: [
      '`document` — doorway into highest root of webpage tree shaped after finished HTML scaffold.',
      'Selectors starting with a hash pick the one element stamped with that id in the markup.',
      '`.textContent` — read or replace visible letters stripping angle-bracket fluff.',
      '`.classList.add` — flipping named style badges without rewriting whole tag wrappers.',
    ],
    technicalExample: `let headline = document.querySelector('h1');
console.log(headline.textContent);`,
    everydayExample:
      'Wall-mounted directory board swapping names or lighting “occupied” LEDs—changing one placard without rewriting the entire board.',
  },
  examples: [
    {
      name: 'Mock document record',
      code: [
        `let document = {`,
        `  title: 'Invoices',`,
        `  querySelector(sel) {`,
        `    if (sel === 'h1') return { textContent: this.title };`,
        `    return null;`,
        `  }`,
        `};`,
        ``,
        `let heading = document.querySelector('h1');`,
        `console.log(heading.textContent);`,
      ],
      steps: [
        {
          l: 0,
          vars: {},
          out: [],
          expl: 'The real DOM is richer—here a tiny mock shows the selection API shape.',
        },
        {
          l: 7,
          vars: { heading: { textContent: 'Invoices' } },
          out: [],
          expl: 'Store the matched node to read `textContent`—what screen readers and layout use.',
          changed: ['heading'],
        },
        {
          l: 8,
          vars: { heading: { textContent: 'Invoices' } },
          out: ['Invoices'],
          expl: 'Log the headline string you might bind into a SPA view.',
          console: true,
        },
      ],
    },
    {
      name: 'Class toggle intent',
      code: [
        `let panel = { className: 'drawer', open: false };`,
        ``,
        `function toggle(p) {`,
        `  p.open = !p.open;`,
        `  return p.open ? 'is-open' : '';`,
        `}`,
        ``,
        `console.log(toggle(panel));`,
      ],
      steps: [
        {
          l: 0,
          vars: { panel: { className: 'drawer', open: false } },
          out: [],
          expl: 'Model minimal state you would track before applying a real `.classList` change.',
          changed: ['panel'],
        },
        {
          l: 7,
          vars: {
            panel: { className: 'drawer', open: true },
          },
          out: ['is-open'],
          expl: 'Return a sentinel class token you would attach to markup in production.',
          console: true,
        },
      ],
    },
  ],
}

export const eventsTopic: RawTopic = {
  id: 'events',
  name: 'Events',
  icon: 'fa-bolt',
  desc: 'The browser tells your code whenever something happens—clicks keys form submissions—so you can react in order.',
  intro: {
    buildsOn: [
      {
        topicId: 'variables',
        note: 'Handlers keep running counters or latest field text using names you declare outside listener.',
      },
      {
        topicId: 'functions',
        note: 'Listening uses small functions you register once and call many times automatically.',
      },
      {
        topicId: 'dom',
        note: 'Events fire on specific page pieces you already learned to pick out.',
      },
    ],
    whatItIs:
      'The browser watches the page quietly; when visitors press tap type submit it packages a tiny report describing where on the page fired what kind of poke. Your job is registering one miniature function once—`addEventListener`—whose job runs each matching poke carrying extra fields like which button got pressed so you tweak variables refresh panels validate forms accordingly.',
    whyItMatters:
      'Without responders the nicest layout stays rigid museum plaque—listening unlocks dashboards carts editors feeling alive.',

    realWorldExamples: [
      'Submitting checkout forms only after simple checks approve',
      'Waiting briefly after typing pauses before running a search helper',
      'Spreadsheet shortcuts jumping focus along grid squares',
    ],
    syntaxPattern: `button.addEventListener('click', (event) => {
  event.preventDefault();
  totals.refresh();
});`,
    syntaxParts: [
      '`addEventListener` — politely attach “tiny recipe executes whenever poke matches.”',
      '`"click"` (and siblings) selects which poke family wakes listener.',
      'Packet handed inward includes pointer toward exact element triggering poke plus knobs blocking default browser jump—you learn those names gradually.',
    ],
    technicalExample:
      `form.addEventListener('submit', guard);`,
    everydayExample:
      'Bell button by the door: bell circuit rings (event), concierge logs visitor (listener side effect).',
  },
  examples: [
    {
      name: 'Click tally (simulated)',
      code: [
        `let clicks = 0;`,
        ``,
        `function onClick() {`,
        `  clicks = clicks + 1;`,
        `  console.log('Clicks', clicks);`,
        `}`,
        ``,
        `onClick();`,
        `onClick();`,
      ],
      steps: [
        {
          l: 0,
          vars: { clicks: 0 },
          out: [],
          expl: 'Start an interaction counter—real apps wire this from a DOM click handler.',
          changed: ['clicks'],
        },
        {
          l: 7,
          vars: { clicks: 1 },
          out: ['Clicks 1'],
          expl: 'Each synthetic call mirrors one user gesture.',
          changed: ['clicks'],
        },
        {
          l: 8,
          vars: { clicks: 2 },
          out: ['Clicks 1', 'Clicks 2'],
          expl: 'Handlers can run repeatedly; keep state outside the listener.',
          changed: ['clicks'],
        },
      ],
    },
    {
      name: 'Form field merge',
      code: [
        `let first = 'Ada';`,
        `let last = 'Lovelace';`,
        ``,
        `function fullName(a, b) {`,
        `  return a + ' ' + b;`,
        `}`,
        ``,
        `console.log(fullName(first, last));`,
      ],
      steps: [
        {
          l: 8,
          vars: { first: 'Ada', last: 'Lovelace' },
          out: ['Ada Lovelace'],
          expl: 'Handlers often consolidate partial inputs before submit.',
          console: true,
        },
      ],
    },
  ],
}

export const modernJsTopic: RawTopic = {
  id: 'modern-js',
  name: 'Modern JavaScript',
  icon: 'fa-wand-magic-sparkles',
  desc: 'Shorter sweeter spellings—fill strings with live values unwrap grouped data copy objects without hand-copy headaches.',
  intro: {
    buildsOn: [
      { topicId: 'variables', note: 'New patterns still tuck answers into predictable nicknames afterward.' },
      {
        topicId: 'objects',
        note: 'Destructuring only abbreviates fetching fields you already modeled as grouped lumps.',
      },
      {
        topicId: 'functions',
        note: 'Spread often pairs with helpers receiving partial settings objects.',
      },
    ],
    whatItIs:
      'Older lessons forced endless quote-plus-variable glue for sentences; newer backtick strings tuck `${nickname}` blanks inline. Another pain—copying twelve fields manually—drops to `let { fieldA, nested } = bigValue` unpacking exactly what headlines need. Sprinkle `...spread` merges when you want cloned defaults tweaked slightly.',
    whyItMatters:
      'Real teams almost exclusively author these spellings—you read libraries faster once shorthand feels familiar.',
    realWorldExamples: [
      'Customer-facing receipts embedding live prices titles',
      'Unpacking just id and tier from chunky server lumps',
      'Duplicating prefilled worksheets before adjusting one knob',
    ],
    syntaxPattern: 'const { id, profile } = billing;\nconst msg = `Acct ${profile.plan}`;',
    syntaxParts: [
      '`let { … } = obj` unpacks neatly named slices without repeating dot chains.',
      'Nested placeholders mirror nesting inside inbound object—you match shapes thoughtfully.',
      'Backticks frame strings permitting `${nickname}` blanks instead of juggling plus-sign text stitching.',
      '`{ ...defaults, qty }` — spread copies most fields then overrides qty.',
    ],
    technicalExample:
      `let next = { ...prev, qty: prev.qty + 1 };`,
    everydayExample:
      'Printed fill-in invitation: blanks for guest name/date—template slots instead of handwritten glue words.',
  },
  examples: [
    {
      name: 'Template receipt',
      code: [
        `let item = 'Lens';`,
        `let price = 129;`,
        ``,
        `let msg = \`You added \${item} for \${price}.\`;`,
        ``,
        `console.log(msg);`,
      ],
      steps: [
        {
          l: 0,
          vars: { item: 'Lens', price: 129 },
          out: [],
          expl: 'Hold business data you will embed in user-facing text.',
          changed: ['item', 'price'],
        },
        {
          l: 3,
          vars: { item: 'Lens', price: 129, msg: 'You added Lens for 129.' },
          out: [],
          expl: 'Template literals embed expressions without awkward concatenation.',
          changed: ['msg'],
        },
        {
          l: 5,
          vars: { item: 'Lens', price: 129, msg: 'You added Lens for 129.' },
          out: ['You added Lens for 129.'],
          expl: 'Ship the final line to console or UI.',
          console: true,
        },
      ],
    },
    {
      name: 'Destructuring',
      code: [
        `let user = { name: 'Lin', role: 'editor' };`,
        ``,
        `let { name, role } = user;`,
        ``,
        `console.log(name, role);`,
      ],
      steps: [
        {
          l: 0,
          vars: { user: { name: 'Lin', role: 'editor' } },
          out: [],
          expl: 'API results often arrive as one object—unpack what you need.',
          changed: ['user'],
        },
        {
          l: 2,
          vars: { user: { name: 'Lin', role: 'editor' }, name: 'Lin', role: 'editor' },
          out: [],
          expl: 'Destructuring binds `name` and `role` as locals in one line.',
          changed: ['name', 'role'],
        },
        {
          l: 4,
          vars: { user: { name: 'Lin', role: 'editor' }, name: 'Lin', role: 'editor' },
          out: ['Lin editor'],
          expl: 'Use the locals for rendering or logging without dot noise.',
          console: true,
        },
      ],
    },
  ],
}

export const asyncTopic: RawTopic = {
  id: 'async',
  name: 'Async JavaScript',
  icon: 'fa-clock',
  desc: 'Some steps take noticeable time—asking the network for data should not freeze the scrolling page; this topic shows waiting politely.',
  intro: {
    buildsOn: [
      { topicId: 'functions', note: 'Slow tasks still wrap inside familiar `function` wrappers—now they can pause mid-body.' },
      { topicId: 'objects', note: 'Fetched answers usually arrive as lumps you already know how to peel.' },
      { topicId: 'modern-js', note: 'Tiny arrow helpers often feed into promise chains cleanly.' },
    ],
    whatItIs:
      'When JavaScript asks the network for data or waits on a timer the work can take noticeable time. Ordinary step-by-step scripts would freeze scrolling while they wait. Promises are little IOU notes meaning “answer coming soon”; `async function` lets you pause inside with `await`, and the browser keeps the page alive between those pauses.',
    whyItMatters:
      'Snappy pages still load while background requests finish—users scroll click read instead of staring frozen glass.',
    realWorldExamples: [
      'Browser calling simple JSON service then painting table rows',
      'Retrying stubborn upload after flaky Wi-Fi drops',
      'Fetching two lookups then combining results once both arrive',
    ],
    syntaxPattern: `async function load() {\n  const rows = await fetch('/api/items');\n  return rows.json();\n}`,
    syntaxParts: [
      '`async function` sticker meaning “this body may await slow steps.”',
      '`await fetch(...)` pauses only this function until network packet returns—page still breathes.',
      '`.json()` turns response text into friendly object you already practice unpacking.',
    ],
    technicalExample:
      `async function load() {\n  const res = await fetch('/api/health');\n  return res.ok;\n}`,
    everydayExample:

      'Coffee shop: place order (async tap), wait near pickup counter while batch brews—you do not freeze the hallway during the wait.',
  },
  examples: [
    {
      name: 'Sync stand-in for data',
      code: [
        `function fetchUserSync() {`,
        `  return { id: 7, name: 'Sam' };`,
        `}`,
        ``,
        `let user = fetchUserSync();`,
        ``,
        `console.log(user.name);`,
      ],
      steps: [
        {
          l: 4,
          vars: { user: { id: 7, name: 'Sam' } },
          out: [],
          expl: 'Real `fetch` is async—this shapes the data you would `await` later.',
          changed: ['user'],
        },
        {
          l: 6,
          vars: { user: { id: 7, name: 'Sam' } },
          out: ['Sam'],
          expl: 'Once resolved, use the value like any other object.',
          console: true,
        },
      ],
    },
    {
      name: 'Chained steps (sync)',
      code: [
        `let step = 1;`,
        `step = step + 1;`,
        `step = step + 1;`,
        ``,
        `console.log('Done after', step, 'steps');`,
      ],
      steps: [
        {
          l: 4,
          vars: { step: 3 },
          out: ['Done after 3 steps'],
          expl: 'Async flows often mirror sequential checkpoints—here shown with integers.',
          console: true,
        },
      ],
    },
  ],
}

export const errorsTopic: RawTopic = {
  id: 'errors',
  name: 'Error handling',
  icon: 'fa-shield-alt',
  desc: 'Wrap risky steps so mistakes become friendly messages instead of mysterious blank screens.',
  intro: {
    buildsOn: [
      { topicId: 'variables', note: 'Errors often land in ordinary names you inspect before showing users.' },
      { topicId: 'conditionals', note: 'You still branch on whether something looked valid before continuing.' },
      { topicId: 'functions', note: 'Helpers `throw` problems upward for outer wrappers to catch.' },
    ],
    whatItIs:
      'Sometimes math breaks network vanishes visitors mis-type—JavaScript can fling special error objects; `try` runs fragile lines, `catch` receives description when fling happens, optional `finally` runs cleanup either way (hide spinner). Later async lessons add promise-specific catchers—same comfort mindset.',
    whyItMatters:
      'Customers deserve readable apology plus next steps instead of silent failure plus console jargon only engineers read.',
    realWorldExamples: [
      'Billing site offline—catch shows gentle banner still records incident id',
      'Bad form input—catch parks helpful tip near field',
      'Closing spinners sockets after failure so ghost overlays vanish',
    ],
    syntaxPattern: `try {\n  save(payload);\n} catch (err) {\n  logFailure(err);\n} finally {\n  hideSpinner();\n}`,
    syntaxParts: [
      '`try { ... }` zone attempts normal happy path.',
      '`catch (err) { ... }` runs only when something inside `try` signals failure—`err` carries human-readable story.',
      '`finally { ... }` runs after either path—handy hiding spinners.',
    ],
    technicalExample:
      `try {\n  totals = riskyMath();\n} catch (oops) {\n  totals = fallback;\n}`,
    everydayExample:

      'Airport kiosk: swipe fails → catch prints friendly apology and keeps queue moving (fallback path).',
  },
  examples: [
    {
      name: 'Safe divide',
      code: [
        `function divide(a, b) {`,
        `  try {`,
        `    if (b === 0) throw new Error('zero');`,
        `    return a / b;`,
        `  } catch (e) {`,
        `    return null;`,
        `  }`,
        `}`,
        ``,
        `console.log(divide(10, 2), divide(4, 0));`,
      ],
      steps: [
        {
          l: 9,
          vars: {},
          out: ['5 null'],
          expl: 'Catch converts a thrown error into a neutral `null` for the caller.',
          console: true,
        },
      ],
    },
    {
      name: 'Invalid parse',
      code: [
        `let raw = 'abc';`,
        ``,
        `let value = NaN;`,
        `try {`,
        `  value = Number.parseInt(raw, 10);`,
        `  if (!Number.isFinite(value)) throw new Error('bad');`,
        `} catch (err) {`,
        `  value = 0;`,
        `}`,
        ``,
        `console.log('parsed', value);`,
      ],
      steps: [
        {
          l: 10,
          vars: {
            raw: 'abc',
            value: 0,
          },
          out: ['parsed 0'],
          expl: 'When parsing fails validation, bail out with a safe default.',
          console: true,
        },
      ],
    },
  ],
}

export const modulesTopic: RawTopic = {
  id: 'modules',
  name: 'Modules',
  icon: 'fa-boxes-stacked',
  desc: 'Split big programs across files—share small recipes without copy-pasting whole blocks manually.',
  intro: {
    buildsOn: [
      { topicId: 'functions', note: 'Exported items are still functions—you simply park them neatly on disk edges.' },
      { topicId: 'arrays', note: 'Shared helpers commonly loop or fold lists—you already practiced those patterns.' },
    ],
    whatItIs:
      'Huge apps become sprawling—each file declares `export function helpMe` buddies elsewhere request through `import { helpMe } from "./nearby-file.js"` string path. Toolchains stitch files together—you focus on expressive names mirrored between export import lists.',
    whyItMatters:
      'Checkout team ships pricing helpers once—report team imports same truths—nobody forks divergent calculators accidentally.',
    realWorldExamples: [
      'One date-format helper imported into invoices dashboards alike',
      'Optional features loaded lazily shrinking first paint payload',
      'Tests swapping fake servers without touching checkout UI guts',
    ],
    syntaxPattern: `import { formatMoney } from './currency.js';`,
    syntaxParts: [
      "Curly import lists name the exact recipes you want from another file.",
      "The quoted path tells tooling which neighbor file to load—dot-slash means “start from this folder.”",
      "Sometimes a file exports one main gift—then you import it without curly braces using the default pattern you will see in snippets.",
    ],

    technicalExample:
      `export function sum(xs) {\n  return xs.reduce((a,x)=>a+x,0);\n}`,
    everydayExample:
      'Library annexing catalog drawers: geography section imports atlas references without copying whole shelves.',
  },
  examples: [
    {
      name: 'Simulated export object',
      code: [
        `let pricing = {`,
        `  vat(rate, amount) {`,
        `    return amount * (1 + rate);`,
        `  }`,
        `};`,
        ``,
        `let gross = pricing.vat(0.2, 100);`,
        ``,
        `console.log(gross);`,
      ],
      steps: [
        {
          l: 0,
          vars: {},
          out: [],
          expl: 'Bundlers wrap real modules—this object stands in for `import { vat } from "./tax"`.',
        },
        {
          l: 6,
          vars: { gross: 120 },
          out: [],
          expl: 'Call the shared helper exactly like an imported function.',
          changed: ['gross'],
        },
        {
          l: 8,
          vars: { gross: 120 },
          out: ['120'],
          expl: 'Log the result you would wire into UI after a real import.',
          console: true,
        },
      ],
    },
    {
      name: 'Named vs default idea',
      code: [
        `let api = {`,
        `  defaultBase: 'https://api.example.com',`,
        `  health() { return 'ok'; }`,
        `};`,
        ``,
        `console.log(api.defaultBase, api.health());`,
      ],
      steps: [
        {
          l: 5,
          vars: { api: { defaultBase: 'https://api.example.com' } },
          out: ['https://api.example.com ok'],
          expl: 'Default exports bundle a primary value; named exports expose many symbols—both compose app layers.',
          console: true,
        },
      ],
    },
  ],
}

export const classesTopic: RawTopic = {
  id: 'classes',
  name: 'Classes & OOP',
  icon: 'fa-cube',
  desc: 'Describe a reusable blueprint for things in your app—each concrete item can share behavior while storing its own bits of data.',
  intro: {
    buildsOn: [
      { topicId: 'objects', note: 'Instances still feel like structured lumps with named fields.' },
      { topicId: 'functions', note: 'Methods tucked inside behave like functions that secretly know which concrete item they belong to.' },
    ],
    whatItIs:
      'Earlier topics stored facts in plain objects and kept separate functions loosely nearby. Classes bring the two together: one blueprint defines both the remembered fields (`this`) and the small actions that know how to use them. `new` stamps out fresh instances; constructors run once when an instance is created; optional `extends` + `super` let a specialized version start from a general one.',
    whyItMatters:
      'Product lists game pieces preference centers—all read cleaner when verbs hang next to nouns describing business objects.',
    realWorldExamples: [
      'Invoice rows knowing politely how they should render themselves',
      'Game sprites sharing motion logic while remembering coordinates',
      'Preference panels juggling toggles with user-specific snapshots',
    ],
    syntaxPattern: `class Row extends Record {\n  constructor(id) {\n    super();\n    this.id = id;\n  }\n}`,
    syntaxParts: [
      "`class RecipeName` declares a fresh blueprint teammates can stamp with `new`.",
      '`extends Parent` means the child starts from the parent version then layers edits.',
      '`constructor(...)` runs once per `new`, usually copying arguments into `this` fields.',
      '`this.field` points at data living on the stamped object—methods read it with the same word `this`.',
    ],
    technicalExample:
      `const row = new Line('Kit', 24);`,
    everydayExample:
      'Vehicle registration card: blueprint (class), your car (instance), trim package inheritance over base model.',
  },
  examples: [
    {
      name: 'Invoice line',
      code: [
        `class Line {`,
        `  constructor(desc, amount) {`,
        `    this.desc = desc;`,
        `    this.amount = amount;`,
        `  }`,
        `  label() {`,
        `    return this.desc + ': ' + this.amount;`,
        `  }`,
        `}`,
        ``,
        `let row = new Line('Support', 120);`,
        ``,
        `console.log(row.label());`,
      ],
      steps: [
        {
          l: 10,
          vars: { row: { desc: 'Support', amount: 120 } },
          out: [],
          expl: '`new` invokes the constructor to shape the instance.',
          changed: ['row'],
        },
        {
          l: 12,
          vars: { row: { desc: 'Support', amount: 120 } },
          out: ['Support: 120'],
          expl: 'Methods read `this` to combine internal state for display.',
          console: true,
        },
      ],
    },
    {
      name: 'Subclass sketch',
      code: [
        `class Base {`,
        `  tag() { return 'base'; }`,
        `}`,
        `class Premium extends Base {`,
        `  tag() { return 'premium'; }`,
        `}`,
        ``,
        `let p = new Premium();`,
        ``,
        `console.log(p.tag());`,
      ],
      steps: [
        {
          l: 10,
          vars: { p: { tag: 'premium' } },
          out: ['premium'],
          expl: 'Subclasses override behavior while sharing the same interface.',
          console: true,
        },
      ],
    },
  ],
}
