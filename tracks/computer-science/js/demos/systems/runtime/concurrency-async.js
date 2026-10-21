window.DS = window.DS || {};
DS.demos = DS.demos || {};

/**
 * Concurrency demo, three scenes (sub-lesson demoScenario):
 *   threads: two cooks whose steps interleave
 *   race:    a lost update on a shared counter, then the safe version
 *   async:   one main thread that keeps working while it awaits a reply
 */
DS.demos.concurrencyAsync = function (container, scenario) {
  const UI = DS.demoUI;
  const scene = ['threads', 'race', 'async'].includes(scenario) ? scenario : 'threads';
  let log = [];
  let counter = 0;
  let busy = false;

  const later = (ms, fn) => setTimeout(() => { fn(); render(); }, ms);

  const scenes = {
    threads: {
      title: 'Two cooks',
      button: 'Start both cooks',
      start: () => {
        log = ['main: start cook 1 and cook 2'];
        const steps = [['Cook 1', 'chop onions'], ['Cook 2', 'wash salad'], ['Cook 1', 'boil soup'], ['Cook 2', 'add dressing']];
        if (Math.random() < 0.5) steps.reverse();
        steps.forEach(([who, what], i) => later(300 * (i + 1), () => log.push(`${who}: ${what}`)));
        later(1500, () => { log.push('main: join() done, dinner is ready'); busy = false; });
      },
      rows: () => [['Threads', '3 (main + 2 cooks)', 'Each one is a line of steps'], ['Order', 'changes per run', 'Timing decides who goes first']],
    },
    race: {
      title: 'Lost update',
      button: 'Both cooks: eggs++',
      start: () => {
        counter = 0;
        log = ['eggs = 0'];
        const steps = ['Cook 1 reads eggs: 0', 'Cook 2 reads eggs: 0', 'Cook 1 writes 0 + 1 = 1', 'Cook 2 writes 0 + 1 = 1'];
        steps.forEach((s, i) => later(350 * (i + 1), () => { log.push(s); if (s.includes('writes')) counter = 1; }));
        later(1700, () => { log.push('Result: eggs = 1, but 2 cooks added one each. One update was lost.'); busy = false; });
      },
      safe: () => {
        counter = 0;
        log = ['eggs = 0 (AtomicInteger: one at a time)'];
        ['Cook 1 reads 0, writes 1', 'Cook 2 waits its turn', 'Cook 2 reads 1, writes 2'].forEach((s, i) => later(350 * (i + 1), () => { log.push(s); counter = i === 0 ? 1 : i === 2 ? 2 : counter; }));
        later(1400, () => { log.push('Result: eggs = 2. Nothing lost.'); busy = false; });
      },
      rows: () => [['Shared data', `eggs = ${counter}`, 'Both threads change it'], ['Problem', 'read, add, write', 'Three steps can mix']],
    },
    async: {
      title: 'One cook, no waiting',
      button: 'Simulate fetch',
      start: () => {
        log = ['main: call fetch()', 'main: keeps working (buttons still react)'];
        later(900, () => { log.push('answer arrives, the awaiting function goes on'); busy = false; });
      },
      rows: () => [['Thread', 'one main thread', 'Browser JavaScript'], ['Waiting?', busy ? 'yes, but not blocked' : 'no', 'await pauses only one function']],
    },
  };
  const current = scenes[scene];

  const render = () => {
    UI.mount(container, {
      title: current.title,
      hint: 'Press the button and read the log from top to bottom.',
      stage: `
        <div class="async-demo">
          <ol class="async-log">${log.map(l => `<li>${UI.esc(l)}</li>`).join('') || '<li>Nothing yet.</li>'}</ol>
          <div class="demo-controls">
            <button type="button" class="demo-btn success" onclick="concRun()" ${busy ? 'disabled' : ''}>${UI.esc(current.button)}</button>
            ${current.safe ? `<button type="button" class="demo-btn" onclick="concSafe()" ${busy ? 'disabled' : ''}>Safe way</button>` : ''}
            <button type="button" class="demo-btn danger" onclick="concReset()">Reset</button>
          </div>
        </div>`,
      inspector: UI.inspector('Concurrency', current.rows()),
    });
  };

  window.concRun = () => { if (busy) return; busy = true; current.start(); render(); };
  window.concSafe = () => { if (busy || !current.safe) return; busy = true; current.safe(); render(); };
  window.concReset = () => { log = []; counter = 0; busy = false; render(); };
  render();
};
