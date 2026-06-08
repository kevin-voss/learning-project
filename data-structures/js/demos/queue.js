window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.queue = function (container) {
  const UI = DS.demoUI;
  const BASE = 0x4000;
  const SLOT_BYTES = 28;
  const INITIAL_QUEUE = [
    { label: 'Task 1', enqueued: 1 },
    { label: 'Task 2', enqueued: 2 },
    { label: 'Task 3', enqueued: 3 },
  ];
  let queue = INITIAL_QUEUE.map(item => ({ ...item }));
  let taskNum = 3;

  const slotAddr = (i) => UI.memAddr(BASE, i, SLOT_BYTES);

  const inspectorRows = () => {
    if (!queue.length) return [['Queue', 'empty', 'No tasks waiting']];
    const front = queue[0];
    const rear = queue[queue.length - 1];
    const fInfo = UI.stringInfo(front.label);
    return [
      ['Front (dequeue)', `"${front.label}"`, 'Next item served: O(1)'],
      ['Front address', slotAddr(0)],
      ['Rear (enqueue)', `"${rear.label}"`, 'Last item added'],
      ['Rear address', slotAddr(queue.length - 1)],
      ['Front frame', `~${SLOT_BYTES} B`, `${fInfo.chars} chars · ${fInfo.bytes} B data`],
      ['Waiting', `${queue.length} item(s)`, `~${queue.length * SLOT_BYTES} bytes`],
      ['Order', 'FIFO', 'First In, First Out'],
    ];
  };

  const render = () => {
    const stage = queue.length
      ? `<div class="queue-stage">
          <div class="queue-flow">
            <div class="queue-end front"><i class="fas fa-arrow-right"></i><br>FRONT<br>dequeue</div>
            <div class="v-queue-container">
              ${queue.map((item, i) => {
                const info = UI.stringInfo(item.label);
                const cls = i === 0 ? ' is-front' : i === queue.length - 1 ? ' is-rear' : '';
                return `
                  ${i > 0 ? '<span class="queue-arrow"><i class="fas fa-arrow-right"></i></span>' : ''}
                  <div class="queue-slot${cls}">
                    <div class="queue-slot-pos">[${i}] · #${item.enqueued}</div>
                    <div class="queue-slot-val">${UI.esc(item.label)}</div>
                    <div class="queue-slot-meta">${slotAddr(i)} · ${info.bytes} B</div>
                  </div>`;
              }).join('')}
            </div>
            <div class="queue-end rear">REAR<br>enqueue<br><i class="fas fa-arrow-right"></i></div>
          </div>
        </div>`
      : UI.emptyStage('fa-users', 'Empty queue', 'Nobody waiting. Enqueue adds at the rear; Dequeue removes from the front.');

    const stats = [
      UI.statChip('Length', queue.length),
      UI.statChip('Memory', `~${queue.length * SLOT_BYTES} B`),
      UI.statChip('Front', queue.length ? queue[0].label : ', '),
      UI.statChip('Rear', queue.length ? queue[queue.length - 1].label : ', '),
    ].join('');

    UI.mount(container, {
      title: 'Queue: first in, first out (FIFO)',
      hint: 'Like a line at a store: join at the rear, leave from the front. Each slot has an index and memory address. Enqueue and Dequeue are O(1) with head/tail pointers.',
      stage,
      inspector: UI.inspector('Queue ends', inspectorRows()),
      stats,
      controls: `
        <button class="demo-btn success" onclick="qEnqueue()"><i class="fas fa-arrow-right"></i> Enqueue</button>
        <button class="demo-btn danger" onclick="qDequeue()"><i class="fas fa-arrow-left"></i> Dequeue</button>
        <button class="demo-btn" onclick="qPeek()"><i class="fas fa-eye"></i> Peek Front</button>
        <button class="demo-btn danger" onclick="qReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'qMsg',
    });
  };

  render();

  window.qEnqueue = () => {
    taskNum++;
    queue.push({ label: `Task ${taskNum}`, enqueued: taskNum });
    render();
    DS.showMsg('qMsg', `Enqueued at rear [${queue.length - 1}] · ${slotAddr(queue.length - 1)}: O(1)`, 'success-msg');
  };
  window.qDequeue = () => {
    if (!queue.length) return DS.showMsg('qMsg', 'Queue empty: no one to serve!', 'error');
    const val = queue.shift();
    render();
    DS.showMsg('qMsg', `Dequeued "${val.label}" from front: remaining items shifted: O(1)*`, 'info');
  };
  window.qPeek = () => {
    if (!queue.length) return DS.showMsg('qMsg', 'Queue is empty!', 'error');
    DS.showMsg('qMsg', `Front: "${queue[0].label}" at ${slotAddr(0)}: next to be served`, 'info');
  };
  window.qReset = () => {
    queue = INITIAL_QUEUE.map(item => ({ ...item }));
    taskNum = INITIAL_QUEUE.length;
    render();
  };
};
