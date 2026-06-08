window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.testingDebugging = function (container) {
  const UI = DS.demoUI;
  const tests = [
    { name: 'add(2,3) === 5', pass: true },
    { name: 'add(0,0) === 0', pass: true },
    { name: 'add(-1,1) === 0', pass: false },
  ];
  let ran = false;

  const render = () => {
    const results = ran ? tests : tests.map(t => ({ ...t, pass: null }));
    container.innerHTML = UI.shell({
      title: 'Test runner',
      hint: 'Automated tests catch regressions before users do.',
      stage: `
        <div class="test-demo">
          <ul class="test-list">${results.map(t => `
            <li class="test-item ${t.pass === true ? 'pass' : t.pass === false ? 'fail' : ''}">
              ${UI.esc(t.name)} ${t.pass === true ? '✓' : t.pass === false ? '✗' : '…'}
            </li>
          `).join('')}</ul>
          <button type="button" class="demo-btn success" onclick="testRun()">Run tests</button>
        </div>`,
      inspector: UI.inspector('Testing', [
        ['Total', String(tests.length), 'Test cases'],
        ['Passed', ran ? String(tests.filter(t => t.pass).length) : ', ', 'Green checks'],
        ['Failed', ran ? String(tests.filter(t => !t.pass).length) : ', ', 'Needs fix'],
      ]),
    });
  };
  window.testRun = () => { ran = true. Render(); };
  render();
};
