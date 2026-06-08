window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.logic = function (container) {
  const UI = DS.demoUI;
  let a = true;
  let b = false;
  let op = 'AND';

  const result = () => {
    if (op === 'AND') return a && b;
    if (op === 'OR') return a || b;
    if (op === 'XOR') return a !== b;
    return !a;
  };

  const explain = () => {
    if (op === 'AND') return 'AND is true only when A and B are both true.';
    if (op === 'OR') return 'OR is true when A or B or both are true.';
    if (op === 'XOR') return 'XOR is true when exactly one side is true.';
    return 'NOT ignores B and flips A.';
  };

  const truthRows = () => {
    const bools = [false, true];
    return bools.flatMap(left => bools.map(right => {
      let value;
      if (op === 'AND') value = left && right;
      else if (op === 'OR') value = left || right;
      else if (op === 'XOR') value = left !== right;
      else value = !left;
      return [left, right, value];
    }));
  };

  const renderTruthTable = () => `
    <div class="logic-table">
      <div class="logic-row logic-head"><span>A</span><span>B</span><span>${op}</span></div>
      ${truthRows().map(([left, right, value]) => `
        <div class="logic-row${left === a && right === b ? ' is-current' : ''}">
          <span>${left}</span><span>${right}</span><strong class="${value ? 'is-true' : 'is-false'}">${value}</strong>
        </div>`).join('')}
    </div>`;

  const inspectorRows = () => [
    ['A', String(a)],
    ['B', op === 'NOT' ? 'ignored' : String(b)],
    ['Operator', op],
    ['Result', String(result()), explain()],
  ];

  const render = () => {
    UI.mount(container, {
      title: 'Logical operators: combine true/false facts',
      hint: 'Toggle A and B, then choose AND, OR, XOR, or NOT. The highlighted truth-table row shows the current inputs and final result.',
      stage: `
        <div class="logic-stage">
          <div class="logic-expression">
            <button onclick="logicToggle('a')" class="${a ? 'is-true' : 'is-false'}">A = ${a}</button>
            <strong>${op}</strong>
            <button onclick="logicToggle('b')" class="${b ? 'is-true' : 'is-false'}"${op === 'NOT' ? ' disabled' : ''}>B = ${b}</button>
            <span class="${result() ? 'is-true' : 'is-false'}">Result = ${result()}</span>
          </div>
          ${renderTruthTable()}
        </div>`,
      inspector: UI.inspector('Logic details', inspectorRows()),
      stats: [
        UI.statChip('A', String(a)),
        UI.statChip('B', op === 'NOT' ? 'ignored' : String(b)),
        UI.statChip('Result', String(result())),
      ].join(''),
      controls: `
        <button class="demo-btn" onclick="logicOp('AND')">AND</button>
        <button class="demo-btn" onclick="logicOp('OR')">OR</button>
        <button class="demo-btn" onclick="logicOp('XOR')">XOR</button>
        <button class="demo-btn" onclick="logicOp('NOT')">NOT A</button>`,
      msgId: 'logicMsg',
    });
  };

  window.logicToggle = (key) => {
    if (key === 'a') a = !a;
    if (key === 'b') b = !b;
    render();
    DS.showMsg('logicMsg', explain(), 'info');
  };

  window.logicOp = (next) => {
    op = next;
    render();
    DS.showMsg('logicMsg', explain(), 'info');
  };

  render();
};
