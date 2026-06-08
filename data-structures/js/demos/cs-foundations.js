window.DS = window.DS || {};
DS.demos = DS.demos || {};

/**
 * Intro demo: data + data structure + algorithm working together (search box).
 */
DS.demos.csFoundations = function (container) {
  const UI = DS.demoUI;
  const songs = [
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Levitating', artist: 'Dua Lipa' },
    { title: 'Anti-Hero', artist: 'Taylor Swift' },
    { title: 'Light Switch', artist: 'Charlie Puth' },
    { title: 'Runaway', artist: 'Kanye West' },
  ];

  const phases = [
    { key: 'problem', label: 'Problem', detail: 'A user types into a search box. The app must find matching items.' },
    { key: 'structure', label: 'Data structure', detail: 'Songs live in an array — ordered, easy to display, scanned for search.' },
    { key: 'algorithm', label: 'Algorithm', detail: 'Compare each song title and artist to the query; collect matches.' },
    { key: 'complexity', label: 'Complexity', detail: 'Each comparison is one step — about n checks for n songs (O(n) scan).' },
    { key: 'ship', label: 'Ship', detail: 'Rank matches and show results. Real apps also cache, index, or use hash tables for speed.' },
  ];

  let query = 'light';
  let phaseIndex = 0;
  let scanIndex = -1;
  let comparisons = 0;
  let matches = [];

  const normalize = (s) => s.toLowerCase();

  const runScan = (q) => {
    const needle = normalize(q.trim());
    comparisons = 0;
    matches = [];
    if (!needle) return;
    songs.forEach((song, i) => {
      comparisons += 1;
      const inTitle = normalize(song.title).includes(needle);
      const inArtist = normalize(song.artist).includes(needle);
      if (inTitle || inArtist) {
        matches.push({
          ...song,
          index: i,
          score: inTitle && inArtist ? 3 : inTitle ? 2 : 1,
        });
      }
    });
    matches.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  };

  const pillarClass = (key) => {
    const active = phases[phaseIndex]?.key;
    if (key === active) return 'is-active';
    if (key === 'data' && (active === 'structure' || active === 'algorithm')) return 'is-active';
    return '';
  };

  const renderData = () => `
    <div class="cs-pillar ${pillarClass('data')}">
      <h4><i class="fas fa-database"></i> Data</h4>
      <p class="cs-pillar-note">Information the program works with</p>
      <div class="cs-data-list">
        ${songs.map((song, i) => {
          const isScanning = phases[phaseIndex]?.key === 'algorithm' && scanIndex === i;
          const isMatch = matches.some(m => m.index === i);
          const cls = [
            isScanning ? 'is-scanning' : '',
            isMatch && phases[phaseIndex]?.key === 'ship' ? 'is-match' : '',
          ].join(' ');
          return `
            <div class="cs-data-row ${cls}">
              <span class="cs-data-idx">[${i}]</span>
              <span>${UI.esc(song.title)}</span>
              <small>${UI.esc(song.artist)}</small>
            </div>`;
        }).join('')}
      </div>
    </div>`;

  const renderStructure = () => `
    <div class="cs-pillar ${pillarClass('structure')}">
      <h4><i class="fas fa-sitemap"></i> Data structure</h4>
      <p class="cs-pillar-note">Array of objects — contiguous list, index access</p>
      <pre class="cs-code-snippet">const playlist = [
  { title: "Blinding Lights", artist: "The Weeknd" },
  // ...more songs in order
];</pre>
    </div>`;

  const renderAlgorithm = () => {
    const phase = phases[phaseIndex]?.key;
    const showLoop = phase === 'algorithm' || phase === 'complexity' || phase === 'ship';
    return `
      <div class="cs-pillar ${pillarClass('algorithm')}">
        <h4><i class="fas fa-list-ol"></i> Algorithm</h4>
        <p class="cs-pillar-note">Step-by-step recipe on the data</p>
        <pre class="cs-code-snippet">${showLoop ? `for (const song of playlist) {
  comparisons++;
  if (song.title includes query
      || song.artist includes query) {
    matches.push(song);
  }
}
sort matches by relevance;` : `// Waiting for query...
// Then scan, filter, rank, display`}</pre>
      </div>`;
  };

  const renderResults = () => {
    const show = ['complexity', 'ship'].includes(phases[phaseIndex]?.key);
    if (!show) {
      return `<div class="cs-results cs-results-empty"><span>Results appear after the scan finishes</span></div>`;
    }
    if (!query.trim()) {
      return `<div class="cs-results cs-results-empty"><span>Type a search query first</span></div>`;
    }
    if (!matches.length) {
      return `<div class="cs-results cs-results-empty"><span>No matches for "${UI.esc(query)}"</span></div>`;
    }
    return `
      <div class="cs-results">
        ${matches.map(m => `
          <div class="cs-result-row">
            <strong>${UI.esc(m.title)}</strong>
            <span>${UI.esc(m.artist)}</span>
          </div>`).join('')}
      </div>`;
  };

  const inspectorRows = () => {
    const phase = phases[phaseIndex];
    return [
      ['Phase', `${phaseIndex + 1} / ${phases.length}`, phase?.label || ''],
      ['Query', query.trim() || '(empty)', 'User input — the problem to solve'],
      ['Structure', 'Array', 'How data is organized'],
      ['Comparisons', String(comparisons), 'Steps the scan took'],
      ['Matches', String(matches.length), 'Algorithm output before display'],
      ['Big picture', 'Data + structure + algorithm', 'All three appear in every feature'],
    ];
  };

  const render = () => {
    const phase = phases[phaseIndex];
    container.innerHTML = UI.shell({
      title: 'Search box — data, structure, and algorithm',
      hint: 'Walk through the same idea as the lesson: stored songs, an array structure, a filter-and-rank algorithm, and ranked results.',
      stage: `
        <div class="cs-demo">
          <div class="cs-search-bar">
            <label for="csQuery">Search playlist</label>
            <div class="playground-input-row">
              <input type="text" class="demo-input" id="csQuery" value="${UI.esc(query)}"
                placeholder="Try light, dua, or swift"
                onkeydown="if(event.key==='Enter')csRunSearch()">
              <button type="button" class="demo-btn success" onclick="csRunSearch()">Search</button>
            </div>
            <div class="playground-quick">
              ${['light', 'dua', 'swift', 'run'].map(q => `
                <button type="button" class="demo-btn" onclick="csQuickQuery('${q}')">${q}</button>
              `).join('')}
            </div>
          </div>
          <div class="cs-phase-card">
            <span class="cs-phase-label">Step ${phaseIndex + 1}: ${UI.esc(phase.label)}</span>
            <p>${UI.esc(phase.detail)}</p>
          </div>
          <div class="cs-pillars">
            ${renderData()}
            ${renderStructure()}
            ${renderAlgorithm()}
          </div>
          <div class="cs-output-block">
            <h4><i class="fas fa-display"></i> Results UI</h4>
            ${renderResults()}
          </div>
        </div>`,
      inspector: UI.inspector('CS pillars', inspectorRows()),
      stats: [
        UI.statChip('Songs', songs.length),
        UI.statChip('Phase', phase.label),
        UI.statChip('Comparisons', comparisons),
      ].join(''),
      controls: `
        <button type="button" class="demo-btn success" onclick="csNextPhase()"><i class="fas fa-forward-step"></i> Next step</button>
        <button type="button" class="demo-btn" onclick="csPrevPhase()"><i class="fas fa-backward-step"></i> Back</button>
        <button type="button" class="demo-btn danger" onclick="csReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'csFoundationsMsg',
    });
  };

  const animateScan = (onDone) => {
    scanIndex = -1;
    comparisons = 0;
    matches = [];
    const q = query.trim();
    if (!q) {
      DS.showMsg('csFoundationsMsg', 'Type a query to run the search', 'info');
      onDone();
      return;
    }
    let i = 0;
    const tick = () => {
      if (i >= songs.length) {
        runScan(q);
        scanIndex = -1;
        render();
        DS.showMsg('csFoundationsMsg', `Scan complete — ${matches.length} match(es), ${comparisons} comparison(s)`, 'success');
        onDone();
        return;
      }
      scanIndex = i;
      comparisons = i + 1;
      render();
      i += 1;
      window.setTimeout(tick, 280);
    };
    tick();
  };

  window.csQuickQuery = (q) => {
    query = q;
    const input = document.getElementById('csQuery');
    if (input) input.value = q;
    csRunSearch();
  };

  window.csRunSearch = () => {
    const input = document.getElementById('csQuery');
    query = input ? input.value : query;
    phaseIndex = 0;
    comparisons = 0;
    matches = [];
    scanIndex = -1;
    render();
    DS.showMsg('csFoundationsMsg', `Problem: find songs matching "${query.trim() || '(empty)'}"`, 'info');
  };

  window.csNextPhase = () => {
    if (phaseIndex >= phases.length - 1) {
      return DS.showMsg('csFoundationsMsg', 'Walkthrough complete — try another query or reset', 'info');
    }
    phaseIndex += 1;
    if (phases[phaseIndex].key === 'algorithm') {
      render();
      animateScan(() => {});
      return;
    }
    if (phases[phaseIndex].key === 'structure' || phases[phaseIndex].key === 'problem') {
      comparisons = 0;
      matches = [];
      scanIndex = -1;
    }
    if (phases[phaseIndex].key === 'complexity' || phases[phaseIndex].key === 'ship') {
      runScan(query);
    }
    render();
    DS.showMsg('csFoundationsMsg', phases[phaseIndex].detail, 'info');
  };

  window.csPrevPhase = () => {
    phaseIndex = Math.max(0, phaseIndex - 1);
    if (phaseIndex < 3) {
      scanIndex = -1;
      if (phaseIndex < 2) {
        comparisons = 0;
        matches = [];
      }
    }
    if (phaseIndex >= 2) runScan(query);
    render();
  };

  window.csReset = () => {
    query = 'light';
    phaseIndex = 0;
    scanIndex = -1;
    comparisons = 0;
    matches = [];
    render();
    DS.showMsg('csFoundationsMsg', 'Reset — type a query and step through data, structure, and algorithm', 'info');
  };

  render();
  DS.showMsg('csFoundationsMsg', 'Type a query, then use Next step to walk through the CS pillars', 'info');
};
