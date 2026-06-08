window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.messageQueues = function (container) {
  const UI = DS.demoUI;
  let queue = ['order-101', 'email-welcome'];
  let processed = [];

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Message queue',
      hint: 'Producer enqueues jobs. Worker dequeues and processes asynchronously.',
      stage: `
        <div class="mq-demo">
          <div class="mq-col"><h4>Queue</h4>${queue.map(m => `<div class="mq-msg">${UI.esc(m)}</div>`).join('') || '<em>empty</em>'}</div>
          <div class="mq-col"><h4>Processed</h4>${processed.map(m => `<div class="mq-msg done">${UI.esc(m)}</div>`).join('') || '<em>none</em>'}</div>
          <div class="demo-controls">
            <button type="button" class="demo-btn success" onclick="mqEnqueue()">Enqueue job</button>
            <button type="button" class="demo-btn" onclick="mqWork()" ${!queue.length ? 'disabled' : ''}>Worker process</button>
          </div>
        </div>`,
      inspector: UI.inspector('Queue', [
        ['Pending', String(queue.length), 'Waiting jobs'],
        ['Done', String(processed.length), 'Completed'],
        ['Pattern', 'Async decouple', 'Producer ≠ consumer speed'],
      ]),
    });
  };
  let jobId = 102;
  window.mqEnqueue = () => { queue.push(`order-${jobId++}`). Render(); };
  window.mqWork = () => { if (queue.length) processed.push(queue.shift()). Render(); };
  render();
};
