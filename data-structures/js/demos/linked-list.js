window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos['linked-list'] = function (container) {
  const UI = DS.demoUI;
  const BASE = 0x2000;
  const INITIAL_NODES = [{ value: 10 }, { value: 20 }, { value: 30 }];
  const DEFAULT_INPUT = 5;
  let nodes = INITIAL_NODES.map(node => ({ ...node }));
  let selectedIdx = 0;

  const nodeAddr = (i) => UI.memAddr(BASE, i, 16);

  const inspectorRows = () => {
    if (nodes.length === 0) {
      return [['Head', 'null', 'No nodes yet — list is empty']];
    }
    if (selectedIdx === null) {
      return [['Tip', 'Click a node to see its pointer and memory details.']];
    }
    const n = nodes[selectedIdx];
    const info = UI.numberInfo(n.value);
    const next = selectedIdx < nodes.length - 1 ? nodeAddr(selectedIdx + 1) : 'null';
    return [
      ['Role', selectedIdx === 0 ? 'HEAD node' : selectedIdx === nodes.length - 1 ? 'TAIL node' : 'Middle node'],
      ['Value', String(n.value), `${info.bytes} bytes stored here`],
      ['Node address', nodeAddr(selectedIdx), 'Scattered in memory — not next to neighbors'],
      ['next pointer', next, '8-byte reference to the next node (or null)'],
      ['Node size', '~16 bytes', '8 value + 8 pointer (simplified model)'],
      ['Total list', `${nodes.length} nodes · ~${nodes.length * 16} bytes`],
    ];
  };

  const render = () => {
    const stage = nodes.length
      ? `<div class="ll-chain">
          <div class="ll-arrow"><span>head</span><i class="fas fa-arrow-right"></i></div>
          ${nodes.map((n, i) => {
            const info = UI.numberInfo(n.value);
            const head = i === 0 ? ' is-head' : '';
            const tail = i === nodes.length - 1 ? ' is-tail' : '';
            const sel = selectedIdx === i ? ' is-selected' : '';
            const next = i < nodes.length - 1 ? nodeAddr(i + 1) : 'null';
            return `
              <button type="button" class="ll-node-card${head}${tail}${sel}" onclick="llSelect(${i})">
                <div class="ll-node-head">${i === 0 ? 'HEAD' : `node ${i}`}</div>
                <div class="ll-node-value">${n.value}</div>
                <div class="ll-node-detail">${info.bytes} B · ${info.binary}</div>
                <div class="ll-node-foot">@ ${nodeAddr(i)} → ${next}</div>
              </button>
              ${i < nodes.length - 1 ? '<div class="ll-arrow"><span>next</span><i class="fas fa-arrow-right"></i></div>' : ''}`;
          }).join('')}
          <div class="ll-null">null</div>
        </div>`
      : UI.emptyStage('fa-link', 'Empty linked list', 'head = null. Prepend adds a node in O(1) — only the head pointer changes.');

    const stats = [
      UI.statChip('Nodes', nodes.length),
      UI.statChip('Memory', `~${nodes.length * 16} B`, 'Non-contiguous — nodes anywhere in RAM'),
      UI.statChip('Head', nodes.length ? nodeAddr(0) : 'null'),
      UI.statChip('Tail', nodes.length ? nodeAddr(nodes.length - 1) : 'null'),
    ].join('');

    container.innerHTML = UI.shell({
      title: 'Linked list — scattered nodes with pointers',
      hint: 'Unlike arrays, nodes are NOT side-by-side in memory. Each node stores a value plus a pointer (next) to the following node. Follow the arrows from head to tail.',
      stage,
      inspector: UI.inspector('Selected node', inspectorRows()),
      stats,
      controls: `
        <input class="demo-input" id="llInput" placeholder="Number" type="number" value="${DEFAULT_INPUT}" aria-label="Value">
        <button class="demo-btn success" onclick="llPrepend()"><i class="fas fa-arrow-left"></i> Prepend</button>
        <button class="demo-btn" onclick="llAppend()">Append <i class="fas fa-arrow-right"></i></button>
        <button class="demo-btn danger" onclick="llDelete()"><i class="fas fa-trash"></i> Delete</button>
        <button class="demo-btn danger" onclick="llReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'llMsg',
    });
  };

  render();

  window.llSelect = (i) => { selectedIdx = i; render(); };

  window.llPrepend = () => {
    const val = document.getElementById('llInput').value;
    if (val === '') return DS.showMsg('llMsg', 'Enter a number first', 'error');
    nodes.unshift({ value: Number(val) });
    selectedIdx = 0;
    render();
    DS.showMsg('llMsg', `New HEAD at ${nodeAddr(0)} — old head becomes second node — O(1)`, 'success-msg');
  };
  window.llAppend = () => {
    const val = document.getElementById('llInput').value;
    if (val === '') return DS.showMsg('llMsg', 'Enter a number first', 'error');
    nodes.push({ value: Number(val) });
    selectedIdx = nodes.length - 1;
    render();
    DS.showMsg('llMsg', `Walked entire chain to find tail — appended at ${nodeAddr(nodes.length - 1)} — O(n)`, 'info');
  };
  window.llDelete = () => {
    const val = document.getElementById('llInput').value;
    if (val === '') return DS.showMsg('llMsg', 'Enter the value to delete', 'error');
    const idx = nodes.findIndex(n => n.value === Number(val));
    if (idx === -1) return DS.showMsg('llMsg', `Value ${val} not found`, 'error');
    nodes.splice(idx, 1);
    selectedIdx = null;
    render();
    DS.showMsg('llMsg', `Rewired pointer past node ${idx} — freed ~16 bytes — O(n) search`, 'info');
  };
  window.llReset = () => {
    nodes = INITIAL_NODES.map(node => ({ ...node }));
    selectedIdx = 0;
    render();
  };
};
