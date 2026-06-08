window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos['hash-table'] = function (container) {
  const UI = DS.demoUI;
  const bucketCount = 8;
  const INITIAL_DATA = { name: 'Alice', age: '25', role: 'Dev' };
  const DEFAULT_KEY = 'city';
  const DEFAULT_VALUE = 'Paris';
  let data = { ...INITIAL_DATA };
  let lastBucket = null;

  const hashFn = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % bucketCount;
    return hash;
  };

  const hashSteps = (key) => {
    const chars = [...key].map(c => `'${c}'=${c.charCodeAt(0)}`).join(' + ');
    return `hash("${key}") = (${chars}) × 31 mod ${bucketCount} → bucket ${hashFn(key)}`;
  };

  const entryBytes = (key, val) => {
    const k = UI.stringInfo(key);
    const v = UI.stringInfo(String(val));
    return k.bytes + v.bytes + 8;
  };

  const inspectorRows = () => {
    const entries = Object.entries(data);
    const totalBytes = entries.reduce((s, [k, v]) => s + entryBytes(k, v), 0);
    return [
      ['Buckets', String(bucketCount), 'Fixed array of slots'],
      ['Entries stored', String(entries.length)],
      ['Est. memory', `~${totalBytes} bytes`, 'Key + value strings + pointers'],
      ['Hash function', 'charCode × 31 mod 8', 'Maps any key → bucket index'],
      ['Lookup', 'O(1) average', 'Jump to bucket, scan chain'],
      lastBucket !== null ? ['Last bucket', `[${lastBucket}]`, hashSteps(Object.keys(data).find(k => hashFn(k) === lastBucket) || '')] : ['Tip', 'Set or Get a key to see its hash path'],
    ];
  };

  const render = () => {
    const buckets = Array.from({ length: bucketCount }, () => []);
    Object.entries(data).forEach(([k, v]) => {
      buckets[hashFn(k)].push({ key: k, val: v });
    });

    const stage = `
      <div class="hash-layout">
        <div class="hash-formula"><i class="fas fa-calculator"></i> hash(key) = (char₁×31 + char₂×31 + …) mod ${bucketCount} → bucket index</div>
        <div class="hash-buckets">
          ${buckets.map((b, i) => `
            <div class="hash-bucket${lastBucket === i ? ' is-active' : ''}">
              <div class="hash-index"><span>bucket</span><strong>${i}</strong></div>
              <div class="hash-slot">
                ${b.length
                  ? b.map(e => `
                      <div class="hash-entry">
                        <span class="hash-entry-key">${UI.esc(e.key)}</span>
                        <span class="hash-entry-val">: ${UI.esc(e.val)}</span>
                        <span class="hash-entry-meta">${entryBytes(e.key, e.val)} B · hash→${i}</span>
                      </div>`).join('')
                  : '<span class="hash-empty">empty · 0 bytes</span>'}
              </div>
            </div>`).join('')}
        </div>
      </div>`;

    const stats = [
      UI.statChip('Buckets', bucketCount),
      UI.statChip('Load', `${Object.keys(data).length}/${bucketCount}`, 'Entries per bucket array'),
      UI.statChip('Collisions', buckets.filter(b => b.length > 1).length, 'Buckets with 2+ entries'),
      UI.statChip('Avg lookup', 'O(1)', 'With a good hash + few collisions'),
    ].join('');

    container.innerHTML = UI.shell({
      title: 'Hash table — key → bucket via hash function',
      hint: 'Keys are turned into a bucket number using character codes and modulo. Each bucket holds key:value pairs. Set/Get jumps straight to the bucket instead of scanning everything.',
      stage,
      inspector: UI.inspector('Hash table info', inspectorRows()),
      stats,
      controls: `
        <input class="demo-input" id="htKey" placeholder="Key" value="${DEFAULT_KEY}" aria-label="Key">
        <input class="demo-input" id="htVal" placeholder="Value" value="${DEFAULT_VALUE}" aria-label="Value">
        <button class="demo-btn success" onclick="htSet()"><i class="fas fa-plus"></i> Set</button>
        <button class="demo-btn" onclick="htGet()"><i class="fas fa-search"></i> Get</button>
        <button class="demo-btn danger" onclick="htDelete()"><i class="fas fa-trash"></i> Delete</button>
        <button class="demo-btn danger" onclick="htReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'htMsg',
    });
  };

  render();

  window.htSet = () => {
    const key = document.getElementById('htKey').value.trim();
    const val = document.getElementById('htVal').value.trim();
    if (!key || !val) return DS.showMsg('htMsg', 'Enter both key and value', 'error');
    lastBucket = hashFn(key);
    data[key] = val;
    render();
    DS.showMsg('htMsg', `Stored "${key}:${val}" in bucket [${lastBucket}] · ~${entryBytes(key, val)} B — O(1) avg`, 'success-msg');
  };
  window.htGet = () => {
    const key = document.getElementById('htKey').value.trim();
    if (!key) return DS.showMsg('htMsg', 'Enter a key to look up', 'error');
    lastBucket = hashFn(key);
    render();
    if (data[key] !== undefined) {
      DS.showMsg('htMsg', `Found "${key}: ${data[key]}" in bucket [${lastBucket}] — O(1) avg`, 'success-msg');
    } else {
      DS.showMsg('htMsg', `Key "${key}" not in bucket [${lastBucket}]`, 'error');
    }
  };
  window.htDelete = () => {
    const key = document.getElementById('htKey').value.trim();
    if (!key) return DS.showMsg('htMsg', 'Enter a key to delete', 'error');
    lastBucket = hashFn(key);
    if (data[key] !== undefined) {
      delete data[key];
      render();
      DS.showMsg('htMsg', `Deleted "${key}" from bucket [${lastBucket}] — O(1) avg`, 'info');
    } else {
      render();
      DS.showMsg('htMsg', `Key "${key}" not found`, 'error');
    }
  };
  window.htReset = () => { data = { ...INITIAL_DATA }; lastBucket = null; render(); };
};
