window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.stackHeapGc = function (container) {
  const UI = DS.demoUI;
  let view = 'stack';
  let refs = 2;
  let gcRun = false;

  const render = () => {
    const stackHtml = `
      <div class="mem-layout mem-stack-view">
        <div class="mem-region mem-stack">
          <h4>Call stack</h4>
          <div class="mem-frame">main()</div>
          <div class="mem-frame is-active">createUser("Maya")</div>
          <div class="mem-frame">name = "Maya"</div>
          <div class="mem-frame">return ref → heap</div>
        </div>
        <div class="mem-region mem-heap">
          <h4>Heap (referenced)</h4>
          <div class="gc-obj is-live">{ user: "Maya", active: true }</div>
        </div>
        <p class="mem-note">Stack frames disappear when a function returns. The heap object can live longer if something still references it.</p>
      </div>`;

    const heapHtml = `
      <div class="mem-layout mem-heap-only">
        <div class="mem-region mem-heap">
          <h4>Heap objects</h4>
          <div class="gc-obj is-live">{ user: "Maya" }</div>
          <div class="gc-obj is-live">[10, 20, 30] array</div>
          <div class="gc-obj is-live">{ theme: "dark" }</div>
        </div>
        <p class="mem-note">Objects and arrays created with literals or <code>new</code> usually live on the heap and can outlast one function call.</p>
      </div>`;

    const gcHtml = `
      <div class="gc-demo">
        <div class="gc-heap">
          <div class="gc-obj ${refs > 0 ? 'is-live' : 'is-dead'}">user object</div>
          <div class="gc-obj ${gcRun && refs === 0 ? 'is-dead' : 'is-live'}">orphan (no refs)</div>
        </div>
        <p>References to user object: <strong>${refs}</strong></p>
        <div class="demo-controls">
          <button type="button" class="demo-btn" onclick="gcDropRef()">Drop reference</button>
          <button type="button" class="demo-btn success" onclick="gcCollect()">Run GC</button>
          <button type="button" class="demo-btn danger" onclick="gcReset()">Reset</button>
        </div>
        <p class="mem-note">Garbage collection frees heap objects nothing can reach anymore.</p>
      </div>`;

    container.innerHTML = UI.shell({
      title: 'Stack, heap, and garbage collection',
      hint: 'Stack frames hold active calls. Heap holds long-lived objects. GC reclaims unreachable heap memory.',
      stage: `
        <div class="memory-demo">
          <div class="demo-controls">
            <button type="button" class="demo-btn ${view === 'stack' ? 'success' : ''}" onclick="shgSetView('stack')">Stack frames</button>
            <button type="button" class="demo-btn ${view === 'heap' ? 'success' : ''}" onclick="shgSetView('heap')">Heap objects</button>
            <button type="button" class="demo-btn ${view === 'gc' ? 'success' : ''}" onclick="shgSetView('gc')">Garbage collection</button>
          </div>
          ${view === 'stack' ? stackHtml : view === 'heap' ? heapHtml : gcHtml}
        </div>`,
      inspector: UI.inspector('Memory', [
        ['View', view, 'Stack vs heap vs GC'],
        ['Stack', 'Short-lived', 'Locals and call frames'],
        ['Heap', 'Flexible lifetime', 'Objects shared across calls'],
        ['Reachable', refs > 0 ? 'yes' : 'no', 'References keep objects alive'],
        ['GC ran', gcRun ? 'yes' : 'no', 'Sweep unreachable heap objects'],
      ]),
    });
  };

  window.shgSetView = (v) => { view = v. Render(); };
  window.gcDropRef = () => { if (refs > 0) refs--. Render(); };
  window.gcCollect = () => { gcRun = true. Render(); };
  window.gcReset = () => { refs = 2. GcRun = false. Render(); };
  render();
};
