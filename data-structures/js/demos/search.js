window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.search = function (container) {
  const UI = DS.demoUI;
  const values = [4, 8, 15, 23, 42, 61, 80];
  const target = 42;
  let mode = 'linear';
  let steps = [];
  let stepIndex = 0;
  let active = [];
  let range = [];

  const linearSteps = () => values.map((value, i) => ({
    active: [i],
    range: [],
    msg: value === target
      ? `Found ${target} at index ${i}`
      : `Index ${i}: ${value} is not ${target}, keep scanning`,
  }));

  const binarySteps = () => {
    const out = [];
    let left = 0;
    let right = values.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const value = values[mid];
      out.push({
        active: [mid],
        range: [left, right],
        msg: value === target
          ? `Middle index ${mid} is ${target}. Found it!`
          : value < target
            ? `${value} is too small, ignore the left half`
            : `${value} is too large, ignore the right half`,
      });
      if (value === target) break;
      if (value < target) left = mid + 1;
      else right = mid - 1;
    }
    return out;
  };

  const resetSteps = (nextMode = mode) => {
    mode = nextMode;
    steps = mode === 'linear' ? linearSteps() : binarySteps();
    stepIndex = 0;
    active = [];
    range = [];
  };

  const renderCells = () => `
    <div class="search-stage">
      ${values.map((value, i) => {
        const inRange = range.length && i >= range[0] && i <= range[1];
        const cls = [
          active.includes(i) ? ' is-active' : '',
          inRange ? ' is-range' : '',
          value === target && active.includes(i) ? ' is-found' : '',
        ].join('');
        return `
          <div class="search-cell${cls}">
            <span class="search-index">[${i}]</span>
            <strong>${value}</strong>
          </div>`;
      }).join('')}
    </div>`;

  const inspectorRows = () => [
    ['Mode', mode === 'linear' ? 'Linear search' : 'Binary search'],
    ['Target', String(target)],
    ['Step', `${stepIndex} / ${steps.length}`],
    ['Rule', mode === 'linear' ? 'Check one by one' : 'Check middle, discard half'],
    ['Needs sorted data?', mode === 'linear' ? 'no' : 'yes'],
  ];

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Search visual: one-by-one vs cut-in-half',
      hint: 'Linear search scans from left to right. Binary search only works on sorted data: check the middle, then throw away the half that cannot contain the target.',
      stage: renderCells(),
      inspector: UI.inspector('Search details', inspectorRows()),
      stats: [
        UI.statChip('Items', values.length),
        UI.statChip('Target', target),
        UI.statChip('Mode', mode === 'linear' ? 'Linear' : 'Binary'),
      ].join(''),
      controls: `
        <button class="demo-btn success" onclick="searchStep()"><i class="fas fa-forward-step"></i> Step</button>
        <button class="demo-btn" onclick="searchMode('linear')"><i class="fas fa-list"></i> Linear</button>
        <button class="demo-btn" onclick="searchMode('binary')"><i class="fas fa-divide"></i> Binary</button>
        <button class="demo-btn danger" onclick="searchReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'searchMsg',
    });
  };

  window.searchStep = () => {
    if (stepIndex >= steps.length) return DS.showMsg('searchMsg', 'Search is finished: reset or switch mode', 'info');
    const step = steps[stepIndex];
    active = step.active;
    range = step.range;
    stepIndex++;
    render();
    DS.showMsg('searchMsg', step.msg, step.msg.includes('Found') || step.msg.includes('Found it') ? 'success-msg' : 'info');
  };

  window.searchMode = (nextMode) => {
    resetSteps(nextMode);
    render();
    DS.showMsg('searchMsg', `${nextMode === 'linear' ? 'Linear' : 'Binary'} search selected`, 'info');
  };

  window.searchReset = () => {
    resetSteps(mode);
    render();
  };

  resetSteps();
  render();
};
