window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.array = function (container) {
  const UI = DS.demoUI;
  const BASE = 0x1000;
  const ELEM_BYTES = 8;
  const INITIAL_ARRAY = [15, 42, 8, 23, 61];
  const DEFAULT_INPUT = 34;
  let arr = [...INITIAL_ARRAY];
  let selectedIdx = null;

  const inspectorRows = () => {
    if (selectedIdx === null || selectedIdx >= arr.length) {
      return [['Tip', 'Click any cell to inspect its memory address, bits, and index.']];
    }
    const v = arr[selectedIdx];
    const info = UI.numberInfo(v);
    return [
      ['Index', `[${selectedIdx}]`, 'Zero-based position: O(1) access'],
      ['Value', info.decimal],
      ['Memory address', UI.memAddr(BASE, selectedIdx, ELEM_BYTES), 'Contiguous: each slot is 8 bytes apart'],
      ['Storage', `${info.bytes} bytes · ${info.bits} bits`, info.type],
      ['Binary', info.binary, 'Bit pattern (integers only)'],
      ['Hex', info.hex, 'Base-16 shorthand'],
      ['Access cost', 'O(1)', 'CPU jumps directly: no scanning'],
    ];
  };

  const render = () => {
    const totalBytes = arr.length * ELEM_BYTES;
    const stage = arr.length
      ? `
        <div class="mem-strip-label">
          <span>Contiguous memory block</span>
          <span class="tag">cache-friendly</span>
        </div>
        <div class="mem-strip">
          ${arr.map((v, i) => {
            const info = UI.numberInfo(v);
            const sel = selectedIdx === i ? ' is-selected' : '';
            return `
              <button type="button" class="mem-cell${sel}" onclick="arrSelect(${i})">
                <span class="mem-cell-addr">${UI.memAddr(BASE, i, ELEM_BYTES)}</span>
                <span class="mem-cell-value">${v}</span>
                <span class="mem-cell-meta">index [${i}]</span>
                <span class="mem-cell-bytes">${info.bytes} B · ${info.bits} bit</span>
                <span class="mem-cell-binary">${info.binary}</span>
              </button>`;
          }).join('<span class="mem-connector">→</span>')}
        </div>`
      : UI.emptyStage('fa-layer-group', 'Empty array', 'Push a number: it will land at index 0 in contiguous memory.');

    const stats = [
      UI.statChip('Length', arr.length, 'Number of elements'),
      UI.statChip('Memory used', `~${totalBytes} bytes`, `${arr.length} × ${ELEM_BYTES} bytes per Number`),
      UI.statChip('Layout', 'Contiguous', 'All elements sit next to each other in RAM'),
      UI.statChip('.length', arr.length, 'Array property: O(1) to read'),
    ].join('');

    UI.mount(container, {
      title: 'Array: contiguous memory lockers',
      hint: 'Each box is one slot in RAM. Numbers in JavaScript use 8 bytes (64 bits). Click a cell to inspect it. Try Push/Pop at the end (fast) vs Shift/Unshift at the start (slow: everything moves).',
      stage,
      inspector: UI.inspector('Selected cell', inspectorRows()),
      stats,
      controls: `
        <input class="demo-input" id="arrInput" placeholder="Number" type="number" value="${DEFAULT_INPUT}" aria-label="Value to add">
        <button class="demo-btn success" onclick="arrPush()"><i class="fas fa-arrow-right"></i> Push</button>
        <button class="demo-btn danger" onclick="arrPop()"><i class="fas fa-arrow-left"></i> Pop</button>
        <button class="demo-btn" onclick="arrUnshift()"><i class="fas fa-arrow-left"></i> Unshift</button>
        <button class="demo-btn danger" onclick="arrShift()">Shift <i class="fas fa-arrow-right"></i></button>
        <button class="demo-btn danger" onclick="arrReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'arrMsg',
    });
  };

  render();

  window.arrSelect = (i) => { selectedIdx = i; render(); };

  window.arrPush = () => {
    const val = document.getElementById('arrInput').value;
    if (val === '') return DS.showMsg('arrMsg', 'Enter a number first', 'error');
    arr.push(Number(val));
    selectedIdx = arr.length - 1;
    render();
    DS.showMsg('arrMsg', `Pushed ${val} → index [${arr.length - 1}] at ${UI.memAddr(BASE, arr.length - 1, ELEM_BYTES)}: O(1)`, 'success-msg');
  };
  window.arrPop = () => {
    if (!arr.length) return DS.showMsg('arrMsg', 'Array is empty!', 'error');
    const val = arr.pop();
    selectedIdx = arr.length ? arr.length - 1 : null;
    render();
    DS.showMsg('arrMsg', `Popped ${val} from end: freed 8 bytes: O(1)`, 'info');
  };
  window.arrUnshift = () => {
    const val = document.getElementById('arrInput').value;
    if (val === '') return DS.showMsg('arrMsg', 'Enter a number first', 'error');
    arr.unshift(Number(val));
    selectedIdx = 0;
    render();
    DS.showMsg('arrMsg', `Unshifted ${val} → every index shifted right (+8 bytes each moved): O(n)`, 'info');
  };
  window.arrShift = () => {
    if (!arr.length) return DS.showMsg('arrMsg', 'Array is empty!', 'error');
    const val = arr.shift();
    selectedIdx = 0;
    render();
    DS.showMsg('arrMsg', `Shifted ${val} off index [0]: remaining cells slid left: O(n)`, 'info');
  };
  window.arrReset = () => {
    arr = [...INITIAL_ARRAY];
    selectedIdx = null;
    render();
  };
};
