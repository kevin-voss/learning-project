window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.graph = function (container) {
  const UI = DS.demoUI;
  const canvas = document.createElement('canvas');
  canvas.className = 'graph-canvas';
  canvas.id = 'graphCanvas';

  const nodeMeta = {
    A: { label: 'Start node', role: 'Hub' },
    B: { label: 'Branch left', role: 'Vertex' },
    C: { label: 'Branch right', role: 'Vertex' },
    D: { label: 'Leaf', role: 'Vertex' },
    E: { label: 'Center connector', role: 'Hub' },
    F: { label: 'Leaf', role: 'Vertex' },
  };

  const nodes = [
    { id: 'A', x: 0.5, y: 0.15 },
    { id: 'B', x: 0.25, y: 0.45 },
    { id: 'C', x: 0.75, y: 0.45 },
    { id: 'D', x: 0.15, y: 0.8 },
    { id: 'E', x: 0.5, y: 0.8 },
    { id: 'F', x: 0.85, y: 0.8 },
  ];
  const edges = [
    ['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'E'], ['C', 'F'], ['D', 'E'], ['E', 'F'],
  ];

  const adjacency = {};
  nodes.forEach(n => { adjacency[n.id] = []; });
  edges.forEach(([from, to]) => {
    if (!adjacency[from].includes(to)) adjacency[from].push(to);
    if (!adjacency[to].includes(from)) adjacency[to].push(from);
  });

  let highlightNodes = new Set();
  let highlightEdges = new Set();
  let animInterval = null;
  let visitOrder = [];
  let selectedNode = 'A';
  let startNode = 'A';

  const degree = (id) => adjacency[id].length;
  const edgeBytes = edges.length * 16;
  const vertexBytes = nodes.length * 32;

  const inspectorRows = () => {
    const meta = nodeMeta[selectedNode] || {};
    const neighbors = adjacency[selectedNode].join(', ') || 'none';
    const visited = visitOrder.length ? visitOrder.join(' → ') : ', ';
    return [
      ['Selected vertex', selectedNode, meta.label || ''],
      ['Degree', String(degree(selectedNode)), 'Number of edges touching this node'],
      ['Neighbors', neighbors, 'Directly connected vertices'],
      ['Role', meta.role || 'Vertex'],
      ['Vertices (V)', String(nodes.length), `~${vertexBytes} B (simplified)`],
      ['Edges (E)', String(edges.length), `~${edgeBytes} B (simplified)`],
      ['Start node', startNode, 'Traversals begin here by default'],
      ['Traversal', visited, 'BFS uses a queue; DFS goes deep then backtracks'],
      ['Complexity', 'O(V + E)', 'Visit every vertex and edge once'],
    ];
  };

  const adjListHtml = () => nodes.map(n => `
    <div><strong>${n.id}</strong> → [${adjacency[n.id].join(', ')}] <span style="color:var(--muted)">deg ${degree(n.id)}</span></div>`
  ).join('');

  const draw = () => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(2, 2);
    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    edges.forEach(([from, to]) => {
      const a = nodes.find(n => n.id === from);
      const b = nodes.find(n => n.id === to);
      const key = `${from}-${to}`;
      const lit = highlightEdges.has(key);
      ctx.beginPath();
      ctx.moveTo(a.x * w, a.y * h);
      ctx.lineTo(b.x * w, b.y * h);
      ctx.strokeStyle = lit ? '#f0b429' : '#2a3330';
      ctx.lineWidth = lit ? 3 : 1.5;
      ctx.stroke();
    });

    nodes.forEach(n => {
      const lit = highlightNodes.has(n.id);
      const sel = selectedNode === n.id;
      ctx.beginPath();
      ctx.arc(n.x * w, n.y * h, sel ? 26 : 22, 0, Math.PI * 2);
      ctx.fillStyle = lit ? 'rgba(240,180,41,0.25)' : sel ? 'rgba(76,201,240,0.15)' : '#1c2120';
      ctx.fill();
      ctx.strokeStyle = lit ? '#f0b429' : sel ? '#4cc9f0' : '#2a3330';
      ctx.lineWidth = lit || sel ? 3 : 2;
      ctx.stroke();
      ctx.fillStyle = lit ? '#f0b429' : '#e8ede9';
      ctx.font = 'bold 14px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.id, n.x * w, n.y * h);
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillStyle = '#5e6e63';
      ctx.fillText(`d${degree(n.id)}`, n.x * w, n.y * h + 18);
    });
  };

  const clearAnim = () => {
    if (animInterval) clearInterval(animInterval);
    animInterval = null;
  };

  const updateInspector = () => {
    const body = container.querySelector('.inspector-body');
    if (body) body.innerHTML = UI.inspectorRowsHtml(inspectorRows());
  };

  const animateTraversal = (order) => {
    clearAnim();
    highlightNodes.clear();
    highlightEdges.clear();
    visitOrder = [];
    draw();
    let step = 0;
    animInterval = setInterval(() => {
      if (step >= order.length) {
        clearAnim();
        updateInspector();
        return;
      }
      const current = order[step];
      visitOrder.push(current);
      selectedNode = current;
      highlightNodes.add(current);
      if (step > 0) {
        const prev = order[step - 1];
        highlightEdges.add(`${prev}-${current}`);
        highlightEdges.add(`${current}-${prev}`);
      }
      draw();
      updateInspector();
      step++;
    }, 700);
  };

  const bfs = (start) => {
    const queue = [start];
    const visited = new Set([start]);
    const result = [];
    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);
      for (const neighbor of adjacency[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    return result;
  };

  const dfs = (start) => {
    const visited = new Set();
    const result = [];
    const explore = (v) => {
      visited.add(v);
      result.push(v);
      for (const neighbor of adjacency[v]) {
        if (!visited.has(neighbor)) explore(neighbor);
      }
    };
    explore(start);
    return result;
  };

  const render = () => {
    const stats = [
      UI.statChip('Vertices', nodes.length, 'V'),
      UI.statChip('Edges', edges.length, 'E'),
      UI.statChip('Memory', `~${vertexBytes + edgeBytes} B`, 'Adjacency list model'),
      UI.statChip('BFS/DFS', 'O(V+E)'),
    ].join('');

    container.innerHTML = UI.shell({
      title: 'Graph: vertices connected by edges',
      hint: 'Circles are vertices and lines are edges. BFS explores closest neighbors first, like ripples spreading from the start. DFS follows one path as deep as possible, then backtracks to try another path.',
      stage: `
        <div class="graph-stage">
          <div id="graphCanvasWrap"></div>
          <div class="graph-legend">
            <span><i class="fas fa-circle" style="color:var(--blue)"></i> Selected vertex</span>
            <span><i class="fas fa-circle" style="color:var(--accent)"></i> Visited in traversal</span>
            <span><code>d3</code> = degree (3 edges)</span>
          </div>
          <div class="graph-adj"><strong>Adjacency list:</strong><br>${adjListHtml()}</div>
        </div>`,
      inspector: UI.inspector('Graph details', inspectorRows()),
      stats,
      controls: `
        <select class="demo-input" id="graphStart" aria-label="Start vertex" onchange="graphSetStart()">
          ${nodes.map(n => `<option value="${n.id}"${n.id === startNode ? ' selected' : ''}>Start: ${n.id}</option>`).join('')}
        </select>
        <button class="demo-btn success" onclick="graphBfs()"><i class="fas fa-layer-group"></i> BFS</button>
        <button class="demo-btn" onclick="graphDfs()"><i class="fas fa-code-branch"></i> DFS</button>
        <button class="demo-btn danger" onclick="graphReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'graphMsg',
    });

    document.getElementById('graphCanvasWrap').appendChild(canvas);
    canvas.onclick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      let best = null;
      let bestD = Infinity;
      nodes.forEach(n => {
        const d = Math.hypot(n.x - x, n.y - y);
        if (d < 0.08 && d < bestD) { best = n.id. BestD = d; }
      });
      if (best) {
        selectedNode = best;
        startNode = best;
        draw();
        updateInspector();
      }
    };
    draw();
  };

  render();

  window.graphSetStart = () => {
    const val = document.getElementById('graphStart').value;
    startNode = val;
    selectedNode = val;
    visitOrder = [];
    highlightNodes.clear();
    highlightEdges.clear();
    draw();
    updateInspector();
    DS.showMsg('graphMsg', `Start node set to ${val}. BFS and DFS will begin there.`, 'info');
  };

  window.graphBfs = () => {
    const order = bfs(startNode);
    animateTraversal(order);
    DS.showMsg('graphMsg', `BFS from ${startNode}: ${order.join(' → ')}: queue explores nearby neighbors first`, 'info');
  };
  window.graphDfs = () => {
    const order = dfs(startNode);
    animateTraversal(order);
    DS.showMsg('graphMsg', `DFS from ${startNode}: ${order.join(' → ')}: goes deep before backtracking`, 'info');
  };
  window.graphReset = () => {
    clearAnim();
    highlightNodes.clear();
    highlightEdges.clear();
    visitOrder = [];
    selectedNode = 'A';
    startNode = 'A';
    render();
    draw();
    updateInspector();
    DS.showMsg('graphMsg', 'Traversal reset to start at A: click a node to inspect it or make it the start', 'info');
  };

  window.addEventListener('resize', draw);
};
