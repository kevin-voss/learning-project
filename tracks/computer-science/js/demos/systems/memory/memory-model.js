window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.memoryModel = function (container) {
  const UI = DS.demoUI;
  let view = 'stack';

  const render = () => {
    const stackHtml = `
      <div class="mem-layout mem-stack-view">
        <div class="mem-region mem-stack">
          <h4>Stack (method calls)</h4>
          <div class="mem-frame">main(String[] args)</div>
          <div class="mem-frame is-active">greet(user)</div>
          <div class="mem-frame">user → Parcel object</div>
        </div>
        <div class="mem-region mem-heap">
          <h4>Heap (objects)</h4>
          <div class="mem-heap-obj">Parcel { name = "Maya", weight = 2 }</div>
        </div>
      </div>`;
    const arrayHtml = `
      <div class="mem-layout mem-array-view">
        <div class="mem-strip">
          ${[10, 20, 30, 40].map((v, i) => `
            <div class="mem-cell is-active">
              <span class="mem-idx">${i}</span>
              <span class="mem-val">${v}</span>
              <span class="mem-addr">${UI.memAddr(0x1000, i)}</span>
            </div>`).join('')}
        </div>
        <p class="mem-note">Contiguous: cache-friendly when looping</p>
      </div>`;
    const linkedHtml = `
      <div class="mem-layout mem-linked-view">
        <div class="ll-node"><span>10</span><small>0x2040 hex</small></div>
        <span class="ll-arrow">→</span>
        <div class="ll-node"><span>20</span><small>0x3090 hex</small></div>
        <span class="ll-arrow">→</span>
        <div class="ll-node"><span>30</span><small>0x1120 hex</small></div>
        <p class="mem-note">Scattered nodes: flexible insert, less cache-friendly</p>
      </div>`;

    UI.mount(container, {
      title: 'Memory layout explorer',
      hint: 'Stack and heap, then an array (boxes side by side) and a linked list (nodes spread out).',
      stage: `
        <div class="memory-demo">
          <div class="demo-controls">
            <button type="button" class="demo-btn ${view === 'stack' ? 'success' : ''}" onclick="memSetView('stack')">Stack vs heap</button>
            <button type="button" class="demo-btn ${view === 'array' ? 'success' : ''}" onclick="memSetView('array')">Array layout</button>
            <button type="button" class="demo-btn ${view === 'linked' ? 'success' : ''}" onclick="memSetView('linked')">Linked list layout</button>
          </div>
          ${view === 'stack' ? stackHtml : view === 'array' ? arrayHtml : linkedHtml}
        </div>`,
      inspector: UI.inspector('Inspector', [
        ['View', view, 'Current memory visualization'],
        ['Stack', 'Pile of plates', 'One frame per running method'],
        ['Heap', 'Storage room', 'Objects made with new'],
        ['Cache', view === 'array' ? 'Friendly' : view === 'linked' ? 'Less friendly' : '-', 'CPU prefetch behavior'],
      ]),
    });
  };

  window.memSetView = (v) => { view = v; render(); };
  render();
};
