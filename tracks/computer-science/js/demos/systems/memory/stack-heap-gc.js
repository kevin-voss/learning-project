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
          <div class="mem-frame">main(String[] args)</div>
          <div class="mem-frame is-active">pack("Maya")</div>
          <div class="mem-frame">int weight = 2</div>
          <div class="mem-frame">Parcel p → heap</div>
        </div>
        <div class="mem-region mem-heap">
          <h4>Heap (referenced)</h4>
          <div class="gc-obj is-live">Parcel { name = "Maya" }</div>
        </div>
        <p class="mem-note">A plate (frame) goes away when its method returns. The object stays in the heap while a reference still leads to it.</p>
      </div>`;

    const heapHtml = `
      <div class="mem-layout mem-heap-only">
        <div class="mem-region mem-heap">
          <h4>Heap objects</h4>
          <div class="gc-obj is-live">Parcel { name = "Maya" }</div>
          <div class="gc-obj is-live">int[] { 10, 20, 30 }</div>
          <div class="gc-obj is-live">"dark" (a String)</div>
        </div>
        <p class="mem-note">Every object made with <code>new</code> (and every array and String) lives in the heap. It can outlast the method that made it.</p>
      </div>`;

    const gcHtml = `
      <div class="gc-demo">
        <div class="gc-heap">
          <div class="gc-obj ${refs > 0 ? 'is-live' : 'is-dead'}">Parcel "Maya"</div>
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

    UI.mount(container, {
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
        ['Stack', 'Short-lived', 'Local variables in method frames'],
        ['Heap', 'Lives while reachable', 'Objects made with new'],
        ['Reachable', refs > 0 ? 'yes' : 'no', 'References keep objects alive'],
        ['GC ran', gcRun ? 'yes' : 'no', 'Sweep unreachable heap objects'],
      ]),
    });
  };

  window.shgSetView = (v) => { view = v; render(); };
  window.gcDropRef = () => { if (refs > 0) refs--; render(); };
  window.gcCollect = () => { gcRun = true; render(); };
  window.gcReset = () => { refs = 2; gcRun = false; render(); };
  render();
};
