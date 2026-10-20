window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.osKernelQueues = function (container) {
  const UI = DS.demoUI;
  let ready = ['Browser', 'Music', 'Terminal', 'Backup'];
  let running = null;
  let tick = 0;
  let msg = 'Scheduler picks from the ready queue. Click "Schedule next" to simulate.';

  const render = () => {
    UI.mount(container, {
      title: 'OS ready queue',
      hint: 'The kernel keeps runnable processes in a queue. The scheduler picks who gets CPU time next.',
      stage: `
        <div class="os-queue-demo">
          <div class="os-cpu">
            <h4>CPU</h4>
            <div class="os-running">${running ? UI.esc(running) : '(idle)'}</div>
          </div>
          <div class="os-ready">
            <h4>Ready queue (FIFO)</h4>
            <div class="os-queue-list">
              ${ready.length
                ? ready.map((p, i) => `<div class="os-queue-item ${i === 0 ? 'is-next' : ''}">${UI.esc(p)}</div>`).join('')
                : '<p class="demo-empty-text">Queue empty</p>'}
            </div>
          </div>
          <p class="demo-msg">${UI.esc(msg)}</p>
          <div class="demo-controls">
            <button type="button" class="demo-btn success" onclick="osSchedule()" ${!ready.length ? 'disabled' : ''}>Schedule next</button>
            <button type="button" class="demo-btn" onclick="osFinish()" ${!running ? 'disabled' : ''}>Finish time slice</button>
            <button type="button" class="demo-btn danger" onclick="osReset()">Reset</button>
          </div>
          <p class="os-tick">Scheduler ticks: ${tick}</p>
        </div>`,
      inspector: UI.inspector('Kernel structures', [
        ['Ready queue', 'FIFO', 'Processes waiting for CPU'],
        ['Running', running || 'none', 'Current time slice holder'],
        ['Waiting', 'Not shown', 'Blocked on I/O'],
        ['Related', 'linux-terminal-os', 'See processes lesson'],
      ]),
    });
  };

  window.osSchedule = () => {
    if (!ready.length) return;
    running = ready.shift();
    tick++;
    msg = `Scheduled "${running}" onto CPU (dequeued from front of ready queue).`;
    render();
  };

  window.osFinish = () => {
    if (!running) return;
    msg = `Time slice ended for "${running}"; process may re-enter ready queue or exit.`;
    running = null;
    tick++;
    render();
  };

  window.osReset = () => {
    ready = ['Browser', 'Music', 'Terminal', 'Backup'];
    running = null;
    tick = 0;
    msg = 'Reset scheduler simulation.';
    render();
  };

  render();
};
