window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.stack = function (container) {
  const UI = DS.demoUI;
  const BASE = 0x3000;
  const FRAME_BYTES = 24;
  const INITIAL_STACK = [
    { label: 'Plate A', added: 1 },
    { label: 'Plate B', added: 2 },
  ];
  let stack = INITIAL_STACK.map(item => ({ ...item }));
  let counter = 2;

  const frameAddr = (i) => UI.memAddr(BASE, i, FRAME_BYTES);

  const inspectorRows = () => {
    if (!stack.length) return [['Stack pointer (SP)', '∅ empty', 'Nothing on the stack']];
    const top = stack[stack.length - 1];
    const info = UI.stringInfo(top.label);
    return [
      ['Top item', `"${top.label}"`, 'Last in: first out (LIFO)'],
      ['Stack index', `[${stack.length - 1}]`, '0 = bottom, grows upward'],
      ['SP address', frameAddr(stack.length - 1)],
      ['Frame size', `~${FRAME_BYTES} bytes`, `${info.chars} chars · ${info.bytes} B string data`],
      ['Depth', `${stack.length} frame(s)`, `~${stack.length * FRAME_BYTES} bytes total`],
      ['Push/Pop', 'O(1)', 'Only the top pointer moves'],
    ];
  };

  const render = () => {
    const stage = stack.length
      ? `<div class="stack-stage">
          <div class="stack-pointer"><i class="fas fa-arrow-down"></i> SP → top of stack</div>
          <div class="v-stack-container">
            ${[...stack].reverse().map((item, revI) => {
              const i = stack.length - 1 - revI;
              const info = UI.stringInfo(item.label);
              const isTop = i === stack.length - 1;
              return `
                <div class="stack-frame${isTop ? ' is-top' : ''}">
                  <div class="stack-frame-label">${isTop ? 'TOP · SP' : `frame [${i}]`}</div>
                  <div class="stack-frame-value">${UI.esc(item.label)}</div>
                  <div class="stack-frame-meta">@ ${frameAddr(i)} · ${info.bytes} B · added #${item.added}</div>
                </div>`;
            }).join('')}
          </div>
          <div class="stack-base">STACK BASE · index [0] @ ${frameAddr(0)}</div>
        </div>`
      : UI.emptyStage('fa-layer-group', 'Empty stack', 'Stack underflow: push a plate to place a new frame on top.');

    const stats = [
      UI.statChip('Depth', stack.length),
      UI.statChip('Memory', `~${stack.length * FRAME_BYTES} B`),
      UI.statChip('Top', stack.length ? `"${stack[stack.length - 1].label}"` : ', '),
      UI.statChip('Order', 'LIFO', 'Last In, First Out'),
    ].join('');

    container.innerHTML = UI.shell({
      title: 'Stack: last in, first out (LIFO)',
      hint: 'Like a stack of plates: you add and remove only from the top. The stack pointer (SP) tracks the top frame. Push grows the stack; Pop shrinks it: both O(1).',
      stage,
      inspector: UI.inspector('Top of stack', inspectorRows()),
      stats,
      controls: `
        <button class="demo-btn success" onclick="stkPush()"><i class="fas fa-arrow-up"></i> Push</button>
        <button class="demo-btn danger" onclick="stkPop()"><i class="fas fa-arrow-down"></i> Pop</button>
        <button class="demo-btn" onclick="stkPeek()"><i class="fas fa-eye"></i> Peek</button>
        <button class="demo-btn danger" onclick="stkReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'stkMsg',
    });
  };

  render();

  window.stkPush = () => {
    counter++;
    stack.push({ label: `Plate ${String.fromCharCode(64 + counter)}`, added: counter });
    render();
    DS.showMsg('stkMsg', `Pushed frame at ${frameAddr(stack.length - 1)}: SP moved up: O(1)`, 'success-msg');
  };
  window.stkPop = () => {
    if (!stack.length) return DS.showMsg('stkMsg', 'Stack underflow: nothing to pop!', 'error');
    const val = stack.pop();
    render();
    DS.showMsg('stkMsg', `Popped "${val.label}": SP moved down: O(1)`, 'info');
  };
  window.stkPeek = () => {
    if (!stack.length) return DS.showMsg('stkMsg', 'Stack is empty!', 'error');
    const top = stack[stack.length - 1];
    DS.showMsg('stkMsg', `Peek: "${top.label}" at ${frameAddr(stack.length - 1)}: read only, no pop`, 'info');
  };
  window.stkReset = () => {
    stack = INITIAL_STACK.map(item => ({ ...item }));
    counter = INITIAL_STACK.length;
    render();
  };
};
