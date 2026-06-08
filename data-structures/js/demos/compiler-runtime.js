window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.compilerRuntime = function (container) {
  const UI = DS.demoUI;
  const STEPS = [
    { label: 'Source code', detail: 'You write greet.js in JavaScript.', code: 'function greet(name) {\n  return "Hi " + name;\n}' },
    { label: 'Parse', detail: 'The engine reads text and builds a syntax tree (AST).', code: 'AST: Function greet\n  └─ return BinaryExpression' },
    { label: 'Compile / JIT', detail: 'Hot functions compile to optimized machine code.', code: 'Bytecode → native code (when reused)' },
    { label: 'Execute', detail: 'CPU runs instructions; stack holds frames, heap holds objects.', code: 'Call stack: main → greet' },
    { label: 'Garbage collection', detail: 'Unreachable objects are reclaimed automatically.', code: 'GC marks live refs, sweeps the rest' },
  ];
  let step = 0;

  const render = () => {
    const s = STEPS[step];
    container.innerHTML = UI.shell({
      title: 'Run a program — step by step',
      hint: 'What happens when you run node greet.js',
      stage: `
        <div class="compiler-demo">
          <div class="compiler-steps">
            ${STEPS.map((st, i) => `
              <button type="button" class="compiler-step-btn ${i === step ? 'is-active' : ''}" onclick="compilerGo(${i})">${UI.esc(st.label)}</button>
            `).join('')}
          </div>
          <div class="compiler-card">
            <h4>${UI.esc(s.label)}</h4>
            <p>${UI.esc(s.detail)}</p>
            <pre class="compiler-code">${UI.esc(s.code)}</pre>
          </div>
          <div class="demo-controls">
            <button type="button" class="demo-btn" onclick="compilerPrev()" ${step === 0 ? 'disabled' : ''}>Previous</button>
            <button type="button" class="demo-btn success" onclick="compilerNext()" ${step === STEPS.length - 1 ? 'disabled' : ''}>Next</button>
          </div>
        </div>`,
      inspector: UI.inspector('Pipeline', [
        ['Step', `${step + 1} / ${STEPS.length}`, s.label],
        ['Runtime', 'Node / V8', 'Parse, compile, execute, GC'],
        ['Stack', 'Per call', 'Function frames'],
        ['Heap', 'Objects', 'Long-lived data'],
      ]),
    });
  };

  window.compilerGo = (i) => { step = i; render(); };
  window.compilerPrev = () => { if (step > 0) { step--; render(); } };
  window.compilerNext = () => { if (step < STEPS.length - 1) { step++; render(); } };
  render();
};
