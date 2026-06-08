window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.ringBuffer = function (container) {
  const UI = DS.demoUI;
  const SIZE = 6;
  let buf = new Array(SIZE).fill(null);
  let head = 0;
  let tail = 0;
  let count = 0;
  let msg = 'Empty buffer. Head and tail both point at slot 0.';

  const full = () => count === SIZE;
  const empty = () => count === 0;

  const render = () => {
    const cells = buf.map((v, i) => {
      const isHead = i === head && !empty();
      const isTail = i === tail && !full();
      return `<div class="ring-cell ${isHead ? 'is-head' : ''} ${isTail ? 'is-tail' : ''}">
        <span class="ring-idx">${i}</span>
        <span class="ring-val">${v ?? '·'}</span>
        ${isHead ? '<small>head</small>' : ''}
        ${isTail && !isHead ? '<small>tail</small>' : ''}
      </div>`;
    }).join('');

    container.innerHTML = UI.shell({
      title: 'Ring buffer',
      hint: 'Fixed-size circular queue: tail writes, head reads, indices wrap with modulo.',
      stage: `
        <div class="ring-demo">
          <div class="ring-grid">${cells}</div>
          <p class="demo-msg">${UI.esc(msg)}</p>
          <div class="demo-controls">
            <input type="text" class="demo-input" id="ringVal" value="A" maxlength="3" aria-label="Value to enqueue">
            <button type="button" class="demo-btn success" onclick="ringEnqueue()" ${full() ? 'disabled' : ''}>Enqueue</button>
            <button type="button" class="demo-btn" onclick="ringDequeue()" ${empty() ? 'disabled' : ''}>Dequeue</button>
            <button type="button" class="demo-btn danger" onclick="ringReset()">Reset</button>
          </div>
        </div>`,
      inspector: UI.inspector('State', [
        ['Capacity', String(SIZE), 'Fixed slots'],
        ['Count', String(count), 'Items stored'],
        ['Head', String(head), 'Next dequeue index'],
        ['Tail', String(tail), 'Next enqueue index'],
        ['Full?', full() ? 'Yes' : 'No', 'Producer must wait or drop'],
      ]),
    });
  };

  window.ringEnqueue = () => {
    if (full()) { msg = 'Buffer full — cannot enqueue.'; render(); return; }
    const v = document.getElementById('ringVal')?.value || '?';
    buf[tail] = v;
    tail = (tail + 1) % SIZE;
    count++;
    msg = `Enqueued "${v}" at slot before tail advanced.`;
    render();
  };

  window.ringDequeue = () => {
    if (empty()) { msg = 'Buffer empty — cannot dequeue.'; render(); return; }
    const v = buf[head];
    buf[head] = null;
    head = (head + 1) % SIZE;
    count--;
    msg = `Dequeued "${v}" from head; slot cleared.`;
    render();
  };

  window.ringReset = () => {
    buf = new Array(SIZE).fill(null);
    head = tail = count = 0;
    msg = 'Reset empty ring buffer.';
    render();
  };

  render();
};
