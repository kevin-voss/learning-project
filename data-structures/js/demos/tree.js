window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.tree = function (container) {
  const UI = DS.demoUI;
  const NODE_BYTES = 24;
  const BASE = 0x5000;
  const INITIAL_TREE = [50, 30, 70, 20, 40, 60, 80];
  const DEFAULT_INPUT = 65;
  let treeValues = [...INITIAL_TREE];
  let selectedVal = 50;

  const buildBST = (vals) => {
    if (!vals.length) return null;
    const insert = (node, val) => {
      if (!node) return { val, left: null, right: null, addr: UI.memAddr(BASE, val, NODE_BYTES) };
      if (val < node.val) node.left = insert(node.left, val);
      else if (val > node.val) node.right = insert(node.right, val);
      return node;
    };
    let root = null;
    vals.forEach(v => { root = insert(root, v); });
    return root;
  };

  const treeHeight = (node) => {
    if (!node) return 0;
    return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
  };

  const searchPath = (node, val, path = []) => {
    if (!node) return path;
    path.push(node.val);
    if (node.val === val) return path;
    return searchPath(val < node.val ? node.left : node.right, val, path);
  };

  const findNode = (node, val) => {
    if (!node) return null;
    if (node.val === val) return node;
    return val < node.val ? findNode(node.left, val) : findNode(node.right, val);
  };

  const layerRender = (root) => {
    const layers = [];
    const queue = root ? [{ node: root, level: 0 }] : [];
    while (queue.length) {
      const { node, level } = queue.shift();
      if (!layers[level]) layers[level] = [];
      layers[level].push(node.val);
      if (node.left) queue.push({ node: node.left, level: level + 1 });
      if (node.right) queue.push({ node: node.right, level: level + 1 });
    }
    return layers.map((layer, li) => `
      <div class="tree-row">
        ${layer.map(v => `
          <button type="button" class="tree-node-card${selectedVal === v ? ' is-selected' : ''}" onclick="treeSelect(${v})">
              <span class="tree-node-val">${v}</span>
              <span class="tree-node-depth">depth ${li}</span>
          </button>`).join('')}
      </div>
      ${li < layers.length - 1 ? '<div class="tree-level-sep">|</div>' : ''}`).join('');
  };

  const inspectorRows = (root) => {
    if (!treeValues.length) return [['Tree', 'empty']];
    if (selectedVal === null) {
      return [['Rule', 'left < parent < right', 'BST property'], ['Tip', 'Click a node to inspect']];
    }
    const node = findNode(root, selectedVal);
    const info = UI.numberInfo(selectedVal);
    const left = node?.left?.val ?? ', ';
    const right = node?.right?.val ?? ', ';
    const path = searchPath(root, selectedVal).join(' → ');
    return [
      ['Value', info.decimal, `${info.bytes} B · ${info.binary}`],
      ['Left child', String(left), 'Must be smaller than parent'],
      ['Right child', String(right), 'Must be larger than parent'],
      ['Search path', path, 'Compare once per level from the root'],
      ['Node address', UI.memAddr(BASE, selectedVal, NODE_BYTES)],
      ['Node size', `~${NODE_BYTES} B`, 'Value + left ptr + right ptr'],
      ['Nodes total', String(treeValues.length), `~${treeValues.length * NODE_BYTES} B`],
      ['Search', 'O(log n) avg', 'Halve the tree each step'],
    ];
  };

  const render = () => {
    const root = buildBST(treeValues);
    const stage = treeValues.length
      ? `<div class="tree-stage">
          ${layerRender(root)}
          <div class="tree-legend">
            <span><i class="fas fa-circle" style="color:var(--green)"></i> Click a node for details</span>
            <span><i class="fas fa-code-branch"></i> Left &lt; Parent &lt; Right</span>
          </div>
        </div>`
      : UI.emptyStage('fa-tree', 'Empty tree', 'Insert values: each node stores a number and two child pointers.');

    const stats = [
      UI.statChip('Nodes', treeValues.length),
      UI.statChip('Memory', `~${treeValues.length * NODE_BYTES} B`),
      UI.statChip('Height', treeValues.length ? treeHeight(root) : '0', 'Levels from root to deepest leaf'),
      UI.statChip('Type', 'BST', 'Binary Search Tree'),
    ].join('');

    UI.mount(container, {
      title: 'Binary search tree: sorted hierarchy',
      hint: 'Each node has at most two children. Smaller values go left, larger values go right. Searching starts at the root and discards half the remaining tree each step when the tree is balanced.',
      stage,
      inspector: UI.inspector('Selected node', inspectorRows(root)),
      stats,
      controls: `
        <input class="demo-input" id="treeInput" placeholder="Number" type="number" value="${DEFAULT_INPUT}" aria-label="Value to insert">
        <button class="demo-btn success" onclick="treeInsert()"><i class="fas fa-plus"></i> Insert</button>
        <button class="demo-btn" onclick="treeInOrder()"><i class="fas fa-list"></i> In-Order</button>
        <button class="demo-btn danger" onclick="treeReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'treeMsg',
    });
  };

  render();

  window.treeSelect = (v) => { selectedVal = v; render(); };

  window.treeInsert = () => {
    const val = document.getElementById('treeInput').value;
    if (val === '') return DS.showMsg('treeMsg', 'Enter a value first', 'error');
    const num = Number(val);
    if (treeValues.includes(num)) return DS.showMsg('treeMsg', `${val} already exists: BST rejects duplicates`, 'error');
    treeValues.push(num);
    selectedVal = num;
    render();
    DS.showMsg('treeMsg', `Inserted ${val} at ${UI.memAddr(BASE, num, NODE_BYTES)}: O(log n) average`, 'success-msg');
  };
  window.treeInOrder = () => {
    const sorted = [...treeValues].sort((a, b) => a - b);
    DS.showMsg('treeMsg', `In-order traversal: [${sorted.join(' → ')}]: always ascending!`, 'info');
  };
  window.treeReset = () => {
    treeValues = [...INITIAL_TREE];
    selectedVal = 50;
    render();
  };
};
