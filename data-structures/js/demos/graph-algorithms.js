window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.graphAlgorithms = function (container) {
  const UI = DS.demoUI;
  const nodes = ['A', 'B', 'C', 'D'];
  const edges = [['A', 'B', 1], ['B', 'C', 2], ['A', 'D', 4], ['D', 'C', 1]];
  let path = [];
  let step = 0;
  const dijkstraSteps = [
    'Start at A with distance 0',
    'Visit B (dist 1): shortest from A',
    'Visit D (dist 4) or C via B (dist 3)',
    'Shortest A→C: A→B→C cost 3',
  ];

  const render = () => {
    UI.mount(container, {
      title: 'Dijkstra step-through',
      hint: 'Greedy: always extend the closest unvisited node.',
      stage: `
        <div class="graph-algo-demo">
          <div class="graph-algo-nodes">${nodes.map(n => `<span class="graph-algo-node">${n}</span>`).join('')}</div>
          <p>${UI.esc(dijkstraSteps[step])}</p>
          <div class="demo-controls">
            <button type="button" class="demo-btn" onclick="graphAlgoPrev()" ${step === 0 ? 'disabled' : ''}>Previous</button>
            <button type="button" class="demo-btn success" onclick="graphAlgoNext()" ${step === dijkstraSteps.length - 1 ? 'disabled' : ''}>Next</button>
          </div>
        </div>`,
      inspector: UI.inspector('Graph algo', [
        ['Algorithm', 'Dijkstra', 'Shortest path weighted'],
        ['Step', `${step + 1}/${dijkstraSteps.length}`, ''],
        ['Edges', String(edges.length), 'Weighted connections'],
      ]),
    });
  };
  window.graphAlgoPrev = () => { if (step > 0) { step--; render(); } };
  window.graphAlgoNext = () => { if (step < dijkstraSteps.length - 1) { step++; render(); } };
  render();
};
