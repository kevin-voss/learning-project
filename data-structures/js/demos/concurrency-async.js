window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.concurrencyAsync = function (container) {
  const UI = DS.demoUI;
  let log = ['Main: start'];
  let running = false;

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Async event loop',
      hint: 'Main thread runs sync code. Async tasks queue and resume later.',
      stage: `
        <div class="async-demo">
          <ol class="async-log">${log.map(l => `<li>${UI.esc(l)}</li>`).join('')}</ol>
          <div class="demo-controls">
            <button type="button" class="demo-btn success" onclick="asyncRun()" ${running ? 'disabled' : ''}>Simulate fetch</button>
            <button type="button" class="demo-btn danger" onclick="asyncReset()">Reset</button>
          </div>
        </div>`,
      inspector: UI.inspector('Concurrency', [
        ['Thread', 'Single main', 'JS event loop model'],
        ['Blocked?', running ? 'waiting' : 'no', 'During simulated I/O'],
        ['Queue', 'Task queue', 'Callbacks after I/O'],
      ]),
    });
  };

  window.asyncRun = () => {
    if (running) return;
    running = true;
    log.push('Main: call fetch()');
    log.push('Main: continue (non-blocking)');
    render();
    setTimeout(() => {
      log.push('Task queue: fetch response arrives');
      log.push('Main: callback runs');
      running = false;
      render();
    }, 800);
  };
  window.asyncReset = () => { log = ['Main: start']; running = false. Render(); };
  render();
};
