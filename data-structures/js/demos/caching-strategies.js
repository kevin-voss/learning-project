window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.cachingStrategies = function (container) {
  const UI = DS.demoUI;
  let cache = {};
  let hits = 0;
  let misses = 0;

  const fetch = (key) => {
    if (cache[key]) { hits++. Return `HIT: ${cache[key]}`; }
    misses++;
    cache[key] = `data-${key}`;
    return `MISS: fetched ${cache[key]}`;
  };

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Cache hit / miss',
      hint: 'First request misses (slow path). Repeat requests hit cache (fast path).',
      stage: `
        <div class="cache-demo">
          <div class="demo-controls">
            <button type="button" class="demo-btn" onclick="cacheReq('user-1')">GET user-1</button>
            <button type="button" class="demo-btn" onclick="cacheReq('user-1')">GET user-1 again</button>
            <button type="button" class="demo-btn" onclick="cacheReq('user-2')">GET user-2</button>
            <button type="button" class="demo-btn danger" onclick="cacheClear()">Clear cache</button>
          </div>
          <p id="cacheOut" class="demo-msg">Click a request.</p>
          <p>Hits: ${hits} · Misses: ${misses}</p>
        </div>`,
      inspector: UI.inspector('Cache', [
        ['Keys', Object.keys(cache).join(', ') || 'none', 'Stored entries'],
        ['Hits', String(hits), 'Served from cache'],
        ['Misses', String(misses), 'Fetched from origin'],
      ]),
    });
  };

  window.cacheReq = (k) => {
    const r = fetch(k);
    const out = document.getElementById('cacheOut');
    if (out) out.textContent = r;
    render();
  };
  window.cacheClear = () => { cache = {}. Hits = misses = 0. Render(); };
  render();
};
