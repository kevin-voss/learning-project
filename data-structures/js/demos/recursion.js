window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.recursion = function (container) {
  const UI = DS.demoUI;
  const max = 4;
  let stack = [];
  let phase = 'ready';
  let nextN = max;
  let result = 1;
  let timer = null;

  const renderStack = () => `
    <div class="recursion-stage">
      <div class="recursion-stack">
        ${stack.length ? [...stack].reverse().map(frame => `
          <div class="recursion-frame${frame.done ? ' is-done' : ''}">
            <strong>factorial(${frame.n})</strong>
            <span>${frame.done ? `returns ${frame.value}` : 'waiting...'}</span>
          </div>
        `).join('') : '<div class="recursion-empty">Call stack is empty</div>'}
      </div>
      <div class="recursion-note">
        <strong>${phase === 'unwind' ? 'Returning back up' : phase === 'done' ? 'Done' : 'Going deeper'}</strong>
        <span>${phase === 'unwind' ? 'Each stack frame receives the answer from the deeper call.' : 'Each recursive call pushes a new stack frame.'}</span>
      </div>
    </div>`;

  const inspectorRows = () => [
    ['Base case', 'factorial(1)', 'Stop recursion here'],
    ['Recursive case', 'n * factorial(n - 1)', 'Make the problem smaller'],
    ['Stack depth', String(stack.length), 'How many calls are waiting'],
    ['Current result', String(result), 'Value built while unwinding'],
  ];

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Recursion visual — call stack grows, then unwinds',
      hint: 'Watch factorial(4). First, calls go deeper and push stack frames. At the base case, recursion stops. Then each frame returns a value back to the caller above it.',
      stage: renderStack(),
      inspector: UI.inspector('Call stack details', inspectorRows()),
      stats: [
        UI.statChip('Target', 'factorial(4)'),
        UI.statChip('Frames', stack.length),
        UI.statChip('Phase', phase),
      ].join(''),
      controls: `
        <button class="demo-btn success" onclick="recStep()"><i class="fas fa-forward-step"></i> Step</button>
        <button class="demo-btn" onclick="recRun()"><i class="fas fa-play"></i> Run</button>
        <button class="demo-btn danger" onclick="recReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'recMsg',
    });
  };

  const step = () => {
    if (phase === 'done') return false;
    if (phase === 'ready') phase = 'deeper';

    if (phase === 'deeper') {
      stack.push({ n: nextN, done: false });
      DS.showMsg('recMsg', `Push factorial(${nextN}) onto the call stack`, 'info');
      nextN--;
      if (nextN === 0) phase = 'unwind';
      render();
      return true;
    }

    const frame = stack[stack.length - 1];
    result *= frame.n;
    frame.done = true;
    frame.value = result;
    DS.showMsg('recMsg', `Return from factorial(${frame.n}) with running result ${result}`, 'success-msg');
    stack.pop();
    if (!stack.length) phase = 'done';
    render();
    return true;
  };

  window.recStep = step;

  window.recRun = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      if (!step()) {
        clearInterval(timer);
        timer = null;
      }
    }, 800);
  };

  window.recReset = () => {
    if (timer) clearInterval(timer);
    timer = null;
    stack = [];
    phase = 'ready';
    nextN = max;
    result = 1;
    render();
  };

  render();
};
