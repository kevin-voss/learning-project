// The scenes for hub/theme/anim/player.js. One scene = one idea, told in small frames.
// places: name → { x, y (centre, in % of the stage), w, h (size in %), label, kind }
// frames: { say, code, light: [place names], items: { id: { at, text, cls, size } | null } }
// Each frame lists only what changes. Used by: see hub/theme/README.md.
(function () {
  const S = {}

  // Variables: labelled boxes (drills/javascript/variables, Java types-and-variables)
  S.boxes = {
    title: 'A variable is a labelled box',
    height: 220,
    places: {
      hand: { x: 12, y: 50, w: 16, h: 40, label: 'your hand', kind: 'plain' },
      age: { x: 45, y: 55, w: 22, h: 55, label: 'age', kind: 'box' },
      name: { x: 78, y: 55, w: 22, h: 55, label: 'name', kind: 'box' },
    },
    frames: [
      { say: 'Two empty boxes. Each one has a label.' },
      { code: 'let age = 9', say: 'You hold the value 9.', items: { a: { at: 'hand', text: '9' } } },
      { code: 'let age = 9', say: '= puts 9 into the box called age.', items: { a: { at: 'age' } } },
      { code: "let name = 'Sam'", say: 'Text goes in quotes.', items: { b: { at: 'hand', text: "'Sam'" } } },
      { code: "let name = 'Sam'", say: 'Now name holds Sam.', items: { b: { at: 'name' } } },
      { code: 'age = 10', say: 'Later you put a new value in.', items: { c: { at: 'hand', text: '10' } } },
      { code: 'age = 10', say: 'A box holds one value. The old 9 is gone.', items: { a: null, c: { at: 'age' } } },
      { code: 'console.log(age)', say: 'Reading the label gives what is inside: 10.', light: ['age'] },
    ],
  }

  // Arrays: a shelf with numbered cubbies (drills/javascript/arrays, CS arrays)
  const fruit = ['🍎', '🍌', '🍐', '🍒', '🍋']
  const cubbies = Object.fromEntries([...Array(6)].map((_, i) => [`c${i}`, { x: 10 + i * 16, y: 62, w: 14, h: 46, label: `[${i}]`, kind: 'box' }]))
  const pointers = Object.fromEntries([...Array(6)].map((_, i) => [`p${i}`, { x: 10 + i * 16, y: 14 }]))
  S.shelf = {
    title: 'An array is a shelf with numbered boxes',
    height: 230,
    places: { ...cubbies, ...pointers },
    frames: [
      { code: "let fruits = ['🍎', '🍌', '🍐', '🍒', '🍋']", say: 'One shelf, five things. Counting starts at 0.', items: Object.fromEntries(fruit.map((f, i) => [`f${i}`, { at: `c${i}`, text: f, cls: 'big' }])) },
      { code: 'fruits[0]', say: 'Box 0 holds the apple.', light: ['c0'], items: { ptr: { at: 'p0', text: '👇', cls: 'plain' } } },
      { code: 'fruits[2]', say: 'Box 2 holds the pear. You jump straight there.', light: ['c2'], items: { ptr: { at: 'p2' } } },
      { code: 'fruits.length', say: 'length counts the boxes in use: 5.', items: { ptr: null } },
      { code: "fruits.push('🍇')", say: 'push puts a new thing on the end, in box 5.', light: ['c5'], items: { f5: { at: 'c5', text: '🍇', cls: 'big' } } },
    ],
  }

  // Functions: a vending machine (drills/javascript/functions, Java methods)
  S.vending = {
    title: 'A function is a vending machine',
    height: 220,
    places: {
      in: { x: 12, y: 55, w: 16, h: 40, label: 'goes in', kind: 'plain' },
      machine: { x: 50, y: 55, w: 30, h: 70, label: 'double(n)', kind: 'box' },
      out: { x: 88, y: 55, w: 16, h: 40, label: 'comes out', kind: 'plain' },
    },
    frames: [
      { code: 'function double(n) {\n  return n * 2\n}', say: 'You build the machine once. It does not run yet.' },
      { code: 'double(4)', say: 'Calling it puts 4 in.', items: { a: { at: 'in', text: '4' } } },
      { code: 'double(4)', say: 'Inside, n is 4. The machine works out 4 * 2.', light: ['machine'], items: { a: { at: 'machine', text: 'n = 4' } } },
      { code: 'double(4)  // 8', say: 'return hands back one value: 8.', items: { a: null, b: { at: 'out', text: '8' } } },
      { code: 'double(10)', say: 'Same machine, new input.', items: { b: null, c: { at: 'in', text: '10' } } },
      { code: 'double(10)  // 20', say: 'Out comes 20. Build once, use many times.', items: { c: { at: 'out', text: '20' } } },
    ],
  }

  // HTTP: a letter to the server and a parcel back (CS client-server, http)
  S.request = {
    title: 'A request travels to the server and back',
    height: 240,
    places: {
      client: { x: 12, y: 55, w: 20, h: 60, label: '💻 browser', kind: 'box' },
      net: { x: 50, y: 55, w: 36, h: 18, label: 'internet', kind: 'plain' },
      server: { x: 88, y: 55, w: 20, h: 60, label: '🖥 server', kind: 'box' },
    },
    frames: [
      { say: 'You type a city and press Search.', light: ['client'] },
      { code: 'GET /forecast?city=Berlin', say: 'The browser writes a request: a letter with a method and an address.', items: { req: { at: 'client', text: '✉ GET', cls: 'note' } } },
      { say: 'The letter travels over the internet to the server.', items: { req: { at: 'net' } } },
      { say: 'The server reads it and looks up the weather.', light: ['server'], items: { req: { at: 'server' } } },
      { code: '200 OK\n{ "temp": 21 }', say: 'It answers with a status (200 = OK) and data in JSON.', items: { req: null, res: { at: 'server', text: '📦 200', cls: 'ok' } } },
      { say: 'The answer travels back.', items: { res: { at: 'net' } } },
      { say: 'The browser unpacks it and shows 21°.', light: ['client'], items: { res: { at: 'client', text: '21°' } } },
    ],
  }

  // Conditionals: a traffic light (drills/javascript/conditionals, Java control-flow)
  S.traffic = {
    title: 'if / else is a traffic light',
    height: 200,
    places: {
      light: { x: 22, y: 50, w: 14, h: 80, label: 'light', kind: 'box' },
      wait: { x: 55, y: 60 },
      gone: { x: 92, y: 60 },
    },
    frames: [
      { code: "let light = 'red'", say: 'The light is red.', items: { l: { at: 'light', text: '🔴', cls: 'big plain' }, car: { at: 'wait', text: '🚗', cls: 'big plain' } } },
      { code: "if (light === 'red') {\n  stop()\n}", say: 'The question is true, so the car stops.', light: ['light'] },
      { code: "light = 'green'", say: 'Now the light changes.', items: { l: { text: '🟢' } } },
      { code: "if (light === 'red') { stop() }\nelse { drive() }", say: 'The question is false, so the else part runs: drive!', items: { car: { at: 'gone' } } },
    ],
  }

  // Loops: laps on a running track (drills/javascript/loops)
  S.laps = {
    title: 'A loop runs the same laps again and again',
    height: 200,
    places: {
      start: { x: 12, y: 60, w: 16, h: 40, label: 'start', kind: 'plain' },
      finish: { x: 88, y: 60, w: 16, h: 40, label: 'finish', kind: 'plain' },
      count: { x: 50, y: 15 },
    },
    frames: [
      { code: 'for (let i = 0; i < 3; i++) {\n  runLap()\n}', say: 'The runner waits at the start. i begins at 0.', items: { r: { at: 'start', text: '🏃', cls: 'big plain' }, i: { at: 'count', text: 'i = 0' } } },
      { say: 'Is 0 < 3? Yes: run a lap.', items: { r: { at: 'finish' } } },
      { say: 'i++ makes i one bigger. Is 1 < 3? Yes: again.', items: { r: { at: 'start' }, i: { text: 'i = 1' } } },
      { say: 'Lap two.', items: { r: { at: 'finish' } } },
      { say: 'i is 2. Still smaller than 3: one more.', items: { r: { at: 'start' }, i: { text: 'i = 2' } } },
      { say: 'Lap three.', items: { r: { at: 'finish' } } },
      { say: 'i is 3. Is 3 < 3? No. The loop stops.', items: { i: { text: 'i = 3 ✋' } } },
    ],
  }

  // Memory: stack of plates and a toy box (CS stack-heap-gc, Java types-and-variables)
  S.memory = {
    title: 'The stack is a pile of plates, the heap is a toy box',
    height: 260,
    places: {
      stack: { x: 24, y: 55, w: 34, h: 80, label: 'stack', kind: 'box' },
      plate1: { x: 24, y: 78 },
      plate2: { x: 24, y: 58 },
      heap: { x: 72, y: 55, w: 44, h: 80, label: 'heap', kind: 'box' },
      toy: { x: 72, y: 55 },
      bin: { x: 72, y: 120 },
    },
    frames: [
      { code: 'main()', say: 'Every method call gets a plate on the stack.', items: { m: { at: 'plate1', text: 'main', cls: 'plate' } } },
      { code: 'Dog dog = new Dog("Rex")', say: 'new puts the object in the heap. The plate only keeps a label pointing to it.', items: { d: { at: 'toy', text: '🐶 Dog "Rex"' }, m: { text: 'main · dog →' } } },
      { code: 'greet(dog)', say: 'Calling greet puts a new plate on top.', light: ['stack'], items: { g: { at: 'plate2', text: 'greet · d →', cls: 'plate' } } },
      { say: 'greet is done: its plate comes off. The dog is still in the heap.', items: { g: null } },
      { say: 'main ends: its plate comes off too. Now nothing points at the dog.', items: { m: null } },
      { say: 'The garbage collector clears away what nobody points at.', items: { d: { at: 'bin', cls: 'faded' } } },
    ],
  }

  // Hash tables: a post office with numbered boxes (CS hash-tables, Java collections)
  const slots = Object.fromEntries([...Array(5)].map((_, i) => [`b${i}`, { x: 52 + i * 10, y: 62, w: 9, h: 46, label: String(i), kind: 'box' }]))
  S.postoffice = {
    title: 'A hash table is a post office',
    height: 230,
    places: { desk: { x: 10, y: 62, w: 14, h: 40, label: 'letter', kind: 'plain' }, hash: { x: 30, y: 62, w: 16, h: 50, label: 'hash()', kind: 'box' }, ...slots },
    frames: [
      { code: "map.put('Sam', '🎂 May 3')", say: 'A letter for Sam arrives.', items: { s: { at: 'desk', text: 'Sam' } } },
      { say: 'The hash machine turns the name into a box number: 3.', light: ['hash'], items: { s: { at: 'hash', text: 'Sam → 3' } } },
      { say: 'The letter goes straight into box 3.', items: { s: { at: 'b3', text: 'Sam' } } },
      { code: "map.put('Mia', '🎂 Jan 9')", say: 'Mia hashes to box 1.', items: { m: { at: 'b1', text: 'Mia' } } },
      { code: "map.get('Sam')", say: 'To find Sam, hash again: box 3. No searching through every box.', light: ['hash', 'b3'] },
    ],
  }

  // Sorting: bubble sort swaps neighbours (CS sorting)
  function bubbleFrames(values) {
    const a = [...values]
    const frames = [{ say: 'Unsorted bars. Compare neighbours, swap if the left one is taller.', items: Object.fromEntries(a.map((v) => [`v${v}`, { at: `s${a.indexOf(v)}`, text: String(v), cls: 'bar', size: 18 + v * 22 }])) }]
    for (let end = a.length - 1; end > 0; end--) {
      for (let i = 0; i < end; i++) {
        if (a[i] > a[i + 1]) {
          ;[a[i], a[i + 1]] = [a[i + 1], a[i]]
          frames.push({ say: `${a[i + 1]} is taller than ${a[i]}: swap.`, light: [`s${i}`, `s${i + 1}`], items: { [`v${a[i]}`]: { at: `s${i}` }, [`v${a[i + 1]}`]: { at: `s${i + 1}` } } })
        }
      }
      frames.push({ say: `${a[end]} is in its place.`, items: { [`v${a[end]}`]: { cls: 'bar done' } } })
    }
    frames.push({ say: 'Sorted from short to tall.', items: { [`v${a[0]}`]: { cls: 'bar done' } } })
    return frames
  }
  S.sort = {
    title: 'Bubble sort: tall ones bubble to the end',
    height: 220,
    places: Object.fromEntries([...Array(5)].map((_, i) => [`s${i}`, { x: 22 + i * 14, y: 64, w: 12, h: 1, kind: 'floor' }])),
    frames: bubbleFrames([5, 2, 4, 1, 3]),
  }

  // Server layers: a restaurant (sheets/java/server-layers, Spring ParcelPilot)
  S.restaurant = {
    title: 'A server is a restaurant with jobs',
    height: 240,
    places: {
      guest: { x: 9, y: 55, w: 14, h: 56, label: '🙋 client', kind: 'plain' },
      waiter: { x: 31, y: 55, w: 16, h: 56, label: 'Controller', kind: 'box' },
      chef: { x: 53, y: 55, w: 16, h: 56, label: 'Service', kind: 'box' },
      pantry: { x: 75, y: 55, w: 16, h: 56, label: 'Repository', kind: 'box' },
      fridge: { x: 93, y: 55, w: 10, h: 56, label: 'DB', kind: 'box' },
    },
    frames: [
      { code: 'POST /parcels', say: 'A guest orders: "please send this parcel".', items: { t: { at: 'guest', text: '🧾 order', cls: 'note' } } },
      { say: 'The waiter (controller) takes the order and checks it is readable.', light: ['waiter'], items: { t: { at: 'waiter' } } },
      { say: 'The chef (service) applies the rules: is the address valid? what does it cost?', light: ['chef'], items: { t: { at: 'chef' } } },
      { say: 'The pantry keeper (repository) is the only one who opens the fridge (database).', light: ['pantry', 'fridge'], items: { t: { at: 'pantry' } } },
      { say: 'The parcel is saved. The answer goes back the same way.', items: { t: null, r: { at: 'pantry', text: '📦 #42', cls: 'ok' } } },
      { say: 'Through the chef …', items: { r: { at: 'chef' } } },
      { say: '… and the waiter hands it to the guest: 201 Created.', items: { r: { at: 'guest', text: '201 📦 #42' } } },
    ],
  }

  // Queues: a conveyor belt with a dead-letter bin (Spring step 12, CS queues)
  S.conveyor = {
    title: 'A queue is a conveyor belt',
    height: 250,
    places: {
      desk: { x: 10, y: 40, w: 16, h: 44, label: 'parcel service', kind: 'box' },
      q3: { x: 32, y: 40 }, q2: { x: 44, y: 40 }, q1: { x: 56, y: 40 },
      belt: { x: 44, y: 40, w: 36, h: 26, label: 'queue', kind: 'plain' },
      worker: { x: 84, y: 40, w: 20, h: 44, label: 'notifier', kind: 'box' },
      dead: { x: 84, y: 88, w: 24, h: 22, label: 'dead letters', kind: 'box' },
    },
    frames: [
      { say: 'The parcel service puts a message on the belt and goes on working.', items: { a: { at: 'q1', text: '📦 A' } } },
      { say: 'More messages queue up. First in, first out.', items: { b: { at: 'q2', text: '📦 B' }, c: { at: 'q3', text: '📦 C' } } },
      { say: 'The notifier takes the first one, A, and sends the e-mail.', light: ['worker'], items: { a: { at: 'worker' }, b: { at: 'q1' }, c: { at: 'q2' } } },
      { say: 'Done with A. Next: B.', items: { a: null, b: { at: 'worker' }, c: { at: 'q1' } } },
      { say: 'B fails three times (bad address). It goes to the dead-letter bin so the belt keeps moving.', items: { b: { at: 'dead', cls: 'warn' } } },
      { say: 'C is handled. A person checks the dead letters later.', items: { c: { at: 'worker' } } },
    ],
  }

  // Git: commits are photos in an album, a branch is a second album (CS git, sheets/git)
  const shots = Object.fromEntries([...Array(4)].flatMap((_, i) => [[`m${i}`, { x: 14 + i * 22, y: 30 }], [`f${i}`, { x: 14 + i * 22, y: 78 }]]))
  S.album = {
    title: 'Git keeps photos of your project',
    height: 230,
    places: { ...shots, main: { x: 50, y: 30, w: 96, h: 34, label: 'main', kind: 'plain' }, feature: { x: 50, y: 78, w: 96, h: 34, label: 'your-branch', kind: 'plain' } },
    frames: [
      { code: 'git commit -m "start"', say: 'A commit is a photo of every file, right now.', items: { c0: { at: 'm0', text: '📸 1' } } },
      { code: 'git switch -c your-branch', say: 'A branch is a second album. It starts from the same photo.', items: { b0: { at: 'f0', text: '📸 1', cls: 'faded' } } },
      { code: 'git commit -m "add page"', say: 'You take new photos in your album. main does not change.', items: { b1: { at: 'f1', text: '📸 2' } } },
      { code: 'git commit -m "style page"', say: 'Another photo. You can always go back to an old one.', items: { b2: { at: 'f2', text: '📸 3' } } },
      { code: 'git push', say: 'push copies your album to GitHub, so your teacher can see it.', light: ['feature'] },
      { code: 'merge', say: 'When it is good, your photos are added to main.', items: { c1: { at: 'm1', text: '📸 2' }, c2: { at: 'm2', text: '📸 3' } } },
    ],
  }

  window.LP_SCENES = S
})()
