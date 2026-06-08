window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.heap = function (container) {
  const UI = DS.demoUI;
  let heap = [null, 10, 15, 20, 25, 30];
  let msg = 'Min-heap stored in array index 1..n. Parent at i, children at 2i and 2i+1.';

  const parent = (i) => Math.floor(i / 2);
  const left = (i) => i * 2;
  const right = (i) => i * 2 + 1;

  const bubbleUp = (i) => {
    while (i > 1 && heap[parent(i)] > heap[i]) {
      [heap[parent(i)], heap[i]] = [heap[i], heap[parent(i)]];
      i = parent(i);
    }
  };

  const bubbleDown = (i) => {
    const n = heap.length - 1;
    while (true) {
      let smallest = i;
      const l = left(i);
      const r = right(i);
      if (l <= n && heap[l] < heap[smallest]) smallest = l;
      if (r <= n && heap[r] < heap[smallest]) smallest = r;
      if (smallest === i) break;
      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  };

  const treeHtml = () => {
    const levels = [[1], [2, 3], [4, 5]];
    return levels.map(row => `
      <div class="heap-row">
        ${row.map(i => i < heap.length
          ? `<div class="heap-node ${i === 1 ? 'is-root' : ''}"><span>${heap[i]}</span><small>[${i}]</small></div>`
          : '').join('')}
      </div>`).join('');
  };

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Min-heap visualizer',
      hint: 'Insert bubbles up; extract-min swaps root with last item then bubbles down.',
      stage: `
        <div class="heap-demo">
          <div class="heap-tree">${treeHtml()}</div>
          <div class="heap-array">Array: [${heap.slice(1).join(', ')}]</div>
          <p class="demo-msg">${UI.esc(msg)}</p>
          <div class="demo-controls">
            <input type="number" class="demo-input" id="heapVal" value="12" min="1" max="99" aria-label="Value to insert">
            <button type="button" class="demo-btn success" onclick="heapInsert()">Insert</button>
            <button type="button" class="demo-btn" onclick="heapExtract()">Extract min</button>
            <button type="button" class="demo-btn danger" onclick="heapReset()">Reset</button>
          </div>
        </div>`,
      inspector: UI.inspector('Heap rules', [
        ['Type', 'Min-heap', 'Parent ≤ children'],
        ['Size', String(heap.length - 1), 'Elements in heap'],
        ['Root', String(heap[1] ?? '—'), 'Smallest value'],
        ['Insert', 'O(log n)', 'Bubble up after append'],
        ['Extract', 'O(log n)', 'Bubble down after swap'],
      ]),
    });
  };

  window.heapInsert = () => {
    const el = document.getElementById('heapVal');
    const v = Number(el?.value || 0);
    if (!v) return;
    heap.push(v);
    bubbleUp(heap.length - 1);
    msg = `Inserted ${v} and bubbled up to restore heap property.`;
    render();
  };

  window.heapExtract = () => {
    if (heap.length <= 1) { msg = 'Heap is empty.'; render(); return; }
    const min = heap[1];
    heap[1] = heap[heap.length - 1];
    heap.pop();
    if (heap.length > 1) bubbleDown(1);
    msg = `Extracted min value ${min}; last item moved to root and bubbled down.`;
    render();
  };

  window.heapReset = () => {
    heap = [null, 10, 15, 20, 25, 30];
    msg = 'Reset to sample min-heap.';
    render();
  };

  render();
};
