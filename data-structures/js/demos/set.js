window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.set = function (container) {
  const UI = DS.demoUI;
  const ENTRY_BYTES = 20;
  const BASE = 0x7000;
  const INITIAL_ITEMS = ['javascript', 'python', 'rust'];
  const DEFAULT_INPUT = 'javascript';
  let items = new Set(INITIAL_ITEMS);
  let selectedItem = DEFAULT_INPUT;

  const entryAddr = (item, i) => UI.memAddr(BASE, i, ENTRY_BYTES);

  const inspectorRows = () => {
    const arr = [...items].sort();
    const totalBytes = arr.reduce((s, item) => s + UI.stringInfo(item).bytes + 8, 0);
    if (selectedItem && items.has(selectedItem)) {
      const info = UI.stringInfo(selectedItem);
      const idx = arr.indexOf(selectedItem);
      return [
        ['Member', `"${selectedItem}"`],
        ['In set?', 'true', 'O(1) average lookup via hash'],
        ['Storage', `${info.bytes} B string`, `${info.chars} chars · ${info.bits} bits`],
        ['Slot', `internal #${idx}`, entryAddr(selectedItem, idx)],
        ['Duplicates', 'rejected', 'Sets enforce uniqueness'],
      ];
    }
    return [
      ['Size', String(items.size), '.size property: O(1)'],
      ['Memory', `~${totalBytes} B`, 'Hash table under the hood in JS'],
      ['Set vs Map', 'values only', 'Use Map/hash table for key → value data'],
      ['Order', 'insertion order', 'JS Set preserves add order'],
      ['Tip', 'Click a member or use Has? to test membership'],
    ];
  };

  const render = () => {
    const sorted = [...items].sort();
    const stage = sorted.length
      ? `<div class="set-grid">
          ${sorted.map((v, i) => {
            const info = UI.stringInfo(v);
            const sel = selectedItem === v ? ' is-selected' : '';
            return `
              <button type="button" class="set-member${sel}" onclick="setSelect(${i})">
                <div class="set-member-val">${UI.esc(v)}</div>
                <div class="set-member-meta">${entryAddr(v, i)} · ${info.bytes} B · unique</div>
              </button>`;
          }).join('')}
        </div>`
      : UI.emptyStage('fa-circle-dot', 'Empty set', 'No members yet. Add a value: duplicates are silently rejected.');

    const stats = [
      UI.statChip('Size', items.size, 'Count of unique members'),
      UI.statChip('Memory', `~${sorted.reduce((s, x) => s + UI.stringInfo(x).bytes + 8, 0)} B`),
      UI.statChip('Duplicates', '0 allowed'),
      UI.statChip('has()', 'O(1) avg', 'Fast membership test'),
    ].join('');

    container.innerHTML = UI.shell({
      title: 'Set: unique members only',
      hint: 'A Set is like a VIP list: each value appears once. It may use hashing internally, but you do not store key:value pairs. Use Set for uniqueness and membership. Use Map/hash table when each key needs a value.',
      stage,
      inspector: UI.inspector('Set details', inspectorRows()),
      stats,
      controls: `
        <input class="demo-input wide" id="setInput" placeholder="e.g. golang" value="${DEFAULT_INPUT}" aria-label="Value">
        <button class="demo-btn success" onclick="setAdd()"><i class="fas fa-plus"></i> Add</button>
        <button class="demo-btn" onclick="setHas()"><i class="fas fa-question"></i> Has?</button>
        <button class="demo-btn danger" onclick="setDelete()"><i class="fas fa-trash"></i> Delete</button>
        <button class="demo-btn danger" onclick="setReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'setMsg',
    });
  };

  render();

  window.setSelect = (i) => {
    selectedItem = [...items].sort()[i];
    render();
  };

  window.setAdd = () => {
    const val = document.getElementById('setInput').value.trim().toLowerCase();
    if (!val) return DS.showMsg('setMsg', 'Enter a value first', 'error');
    if (items.has(val)) return DS.showMsg('setMsg', `"${val}" already in set: duplicate blocked (~0 extra bytes)`, 'error');
    items.add(val);
    selectedItem = val;
    render();
    const b = UI.stringInfo(val).bytes + 8;
    DS.showMsg('setMsg', `Added "${val}" · ~${b} B allocated: O(1) avg`, 'success-msg');
  };
  window.setHas = () => {
    const val = document.getElementById('setInput').value.trim().toLowerCase();
    if (!val) return DS.showMsg('setMsg', 'Enter a value to check', 'error');
    selectedItem = val;
    render();
    if (items.has(val)) {
      DS.showMsg('setMsg', `"${val}" ∈ set: membership true: O(1) hash lookup`, 'success-msg');
    } else {
      DS.showMsg('setMsg', `"${val}" ∉ set: not a member`, 'error');
    }
  };
  window.setDelete = () => {
    const val = document.getElementById('setInput').value.trim().toLowerCase();
    if (!val) return DS.showMsg('setMsg', 'Enter a value to delete', 'error');
    if (!items.has(val)) return DS.showMsg('setMsg', `"${val}" not in set`, 'error');
    items.delete(val);
    selectedItem = null;
    render();
    DS.showMsg('setMsg', `Removed "${val}": slot freed: O(1) avg`, 'info');
  };
  window.setReset = () => {
    items = new Set(INITIAL_ITEMS);
    selectedItem = DEFAULT_INPUT;
    render();
  };
};
