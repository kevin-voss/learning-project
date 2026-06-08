window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.sorting = function (container) {
  const UI = DS.demoUI;
  const INITIAL = [42, 15, 61, 23, 8];
  const ALGORITHMS = {
    bubble: {
      label: 'Bubble',
      idea: 'Compare neighbors. If they are in the wrong order, swap them.',
    },
    insertion: {
      label: 'Insertion',
      idea: 'Take one value and insert it into the already-sorted left side.',
    },
    selection: {
      label: 'Selection',
      idea: 'Find the smallest remaining value and swap it into the front.',
    },
    merge: {
      label: 'Merge',
      idea: 'Split into smaller parts, then merge sorted pieces back together.',
    },
  };
  let arr = [...INITIAL];
  let algorithm = 'bubble';
  let frames = [];
  let frameIndex = 0;
  let compareCount = 0;
  let writeCount = 0;
  let swapCount = 0;
  let active = [];
  let range = [];
  let timer = null;

  const maxVal = () => Math.max(...arr, 1);

  const makeBubbleFrames = (values) => {
    const work = [...values];
    const out = [];
    for (let i = 0; i < work.length - 1; i++) {
      for (let j = 0; j < work.length - 1 - i; j++) {
        out.push({ type: 'compare', a: j, b: j + 1, msg: `Compare index ${j} and ${j + 1}` });
        if (work[j] > work[j + 1]) {
          const left = work[j];
          work[j] = work[j + 1];
          work[j + 1] = left;
          out.push({ type: 'swap', a: j, b: j + 1, arr: [...work], msg: `Swap ${work[j]} and ${work[j + 1]}` });
        }
      }
      out.push({ type: 'sorted', index: work.length - 1 - i, msg: `Largest remaining value is fixed at index ${work.length - 1 - i}` });
    }
    out.push({ type: 'sorted', index: 0, msg: 'Sorting complete' });
    return out;
  };

  const makeInsertionFrames = (values) => {
    const work = [...values];
    const out = [];
    for (let i = 1; i < work.length; i++) {
      const key = work[i];
      let j = i - 1;
      out.push({ type: 'range', active: [i], msg: `Pick ${key} as the key value` });
      while (j >= 0) {
        out.push({ type: 'compare', a: j, b: j + 1, msg: `Compare ${work[j]} with key ${key}` });
        if (work[j] <= key) break;
        work[j + 1] = work[j];
        out.push({ type: 'write', arr: [...work], active: [j, j + 1], msg: `Shift ${work[j + 1]} one position right` });
        j--;
      }
      work[j + 1] = key;
      out.push({ type: 'write', arr: [...work], active: [j + 1], msg: `Place key ${key} at index ${j + 1}` });
    }
    out.push({ type: 'sorted', msg: 'Insertion sort complete' });
    return out;
  };

  const makeSelectionFrames = (values) => {
    const work = [...values];
    const out = [];
    for (let i = 0; i < work.length - 1; i++) {
      let min = i;
      out.push({ type: 'range', active: [i], msg: `Start position ${i}; look for the smallest remaining value` });
      for (let j = i + 1; j < work.length; j++) {
        out.push({ type: 'compare', a: min, b: j, msg: `Compare current min ${work[min]} with ${work[j]}` });
        if (work[j] < work[min]) {
          min = j;
          out.push({ type: 'range', active: [min], msg: `New smallest value is ${work[min]} at index ${min}` });
        }
      }
      if (min !== i) {
        const tmp = work[i];
        work[i] = work[min];
        work[min] = tmp;
        out.push({ type: 'swap', a: i, b: min, arr: [...work], msg: `Swap smallest value into index ${i}` });
      }
      out.push({ type: 'sorted', index: i, msg: `Index ${i} is now fixed` });
    }
    out.push({ type: 'sorted', index: work.length - 1, msg: 'Selection sort complete' });
    return out;
  };

  const makeMergeFrames = (values) => {
    const work = [...values];
    const out = [];

    const merge = (left, mid, right) => {
      out.push({ type: 'range', active: [], range: [left, right], msg: `Merge indexes ${left}..${mid} and ${mid + 1}..${right}` });
      const leftPart = work.slice(left, mid + 1);
      const rightPart = work.slice(mid + 1, right + 1);
      let i = 0;
      let j = 0;
      let k = left;
      while (i < leftPart.length && j < rightPart.length) {
        out.push({ type: 'compare', a: left + i, b: mid + 1 + j, range: [left, right], msg: `Compare ${leftPart[i]} and ${rightPart[j]}` });
        const value = leftPart[i] <= rightPart[j] ? leftPart[i++] : rightPart[j++];
        work[k] = value;
        out.push({ type: 'write', arr: [...work], active: [k], range: [left, right], msg: `Write ${value} into index ${k}` });
        k++;
      }
      while (i < leftPart.length) {
        work[k] = leftPart[i++];
        out.push({ type: 'write', arr: [...work], active: [k], range: [left, right], msg: `Write remaining value into index ${k}` });
        k++;
      }
      while (j < rightPart.length) {
        work[k] = rightPart[j++];
        out.push({ type: 'write', arr: [...work], active: [k], range: [left, right], msg: `Write remaining value into index ${k}` });
        k++;
      }
    };

    const split = (left, right) => {
      if (left >= right) return;
      const mid = Math.floor((left + right) / 2);
      out.push({ type: 'range', active: [mid], range: [left, right], msg: `Split ${left}..${right} at middle index ${mid}` });
      split(left, mid);
      split(mid + 1, right);
      merge(left, mid, right);
    };

    split(0, work.length - 1);
    out.push({ type: 'sorted', msg: 'Merge sort complete' });
    return out;
  };

  const makeFrames = (values) => {
    if (algorithm === 'insertion') return makeInsertionFrames(values);
    if (algorithm === 'selection') return makeSelectionFrames(values);
    if (algorithm === 'merge') return makeMergeFrames(values);
    return makeBubbleFrames(values);
  };

  const renderBars = () => {
    const max = maxVal();
    return `
      <div class="sort-bars">
        ${arr.map((value, i) => {
          const state = active.includes(i) ? ' is-active' : '';
          const inRange = range.length && i >= range[0] && i <= range[1] ? ' is-range' : '';
          return `
            <div class="sort-bar-wrap${state}${inRange}">
              <div class="sort-bar" style="height:${Math.max(8, (value / max) * 100)}%"></div>
              <span>${value}</span>
            </div>`;
        }).join('')}
      </div>`;
  };

  const inspectorRows = () => [
    ['Frame', `${frameIndex} / ${frames.length}`, 'One animation step'],
    ['Compares', String(compareCount), 'How often two values were checked'],
    ['Writes', String(writeCount), 'How often values were assigned into indexes'],
    ['Swaps', String(swapCount), 'How often two values traded places'],
    ['Algorithm', `${ALGORITHMS[algorithm].label} sort`, ALGORITHMS[algorithm].idea],
  ];

  const render = () => {
    const stats = [
      UI.statChip('Items', arr.length),
      UI.statChip('Frames', `${frameIndex}/${frames.length}`),
      UI.statChip('Compares', compareCount),
      UI.statChip('Writes', writeCount),
      UI.statChip('Swaps', swapCount),
    ].join('');

    container.innerHTML = UI.shell({
      title: 'Sorting visualizer — frames, compares, writes, swaps',
      hint: 'Sorting algorithms are easier to understand when you see each tiny step. Compare means checking two values. Swap means two values trade places. Write means a value was assigned into an array index.',
      stage: renderBars(),
      inspector: UI.inspector('Sorting metrics', inspectorRows()),
      stats,
      controls: `
        <select class="demo-input wide" id="sortAlgo" onchange="sortChoose()" aria-label="Sorting algorithm">
          ${Object.entries(ALGORITHMS).map(([key, meta]) => `<option value="${key}"${key === algorithm ? ' selected' : ''}>${meta.label}</option>`).join('')}
        </select>
        <button class="demo-btn success" onclick="sortStart()"><i class="fas fa-play"></i> Start</button>
        <button class="demo-btn" onclick="sortStep()"><i class="fas fa-forward-step"></i> Step</button>
        <button class="demo-btn danger" onclick="sortReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'sortMsg',
    });
  };

  const applyFrame = (frame) => {
    active = frame.active || [frame.a, frame.b, frame.index].filter(v => Number.isInteger(v));
    range = frame.range || [];
    if (frame.type === 'compare') compareCount++;
    if (frame.type === 'write') {
      arr = [...frame.arr];
      writeCount++;
    }
    if (frame.type === 'swap') {
      arr = [...frame.arr];
      swapCount++;
      writeCount += 2;
    }
    frameIndex++;
    render();
    DS.showMsg('sortMsg', frame.msg, frame.type === 'swap' ? 'success-msg' : 'info');
  };

  const ensureFrames = () => {
    if (!frames.length || frameIndex >= frames.length) {
      frames = makeFrames(arr);
      frameIndex = 0;
      compareCount = 0;
      writeCount = 0;
      swapCount = 0;
    }
  };

  const stop = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  const syncCodeExample = () => {
    DS.updateSectionCode('sorting-algorithms', algorithm);
  };

  window.sortChoose = () => {
    stop();
    algorithm = document.getElementById('sortAlgo').value;
    arr = [...INITIAL];
    frames = [];
    frameIndex = 0;
    compareCount = 0;
    writeCount = 0;
    swapCount = 0;
    active = [];
    range = [];
    render();
    syncCodeExample();
    DS.showMsg('sortMsg', `${ALGORITHMS[algorithm].label} sort selected — ${ALGORITHMS[algorithm].idea}`, 'info');
  };

  window.sortStep = () => {
    ensureFrames();
    if (frameIndex >= frames.length) return DS.showMsg('sortMsg', 'Already sorted — reset to try again', 'info');
    applyFrame(frames[frameIndex]);
  };

  window.sortStart = () => {
    ensureFrames();
    stop();
    timer = setInterval(() => {
      if (frameIndex >= frames.length) {
        stop();
        return DS.showMsg('sortMsg', 'Sorting complete', 'success-msg');
      }
      applyFrame(frames[frameIndex]);
    }, 700);
  };

  window.sortReset = () => {
    stop();
    arr = [...INITIAL];
    frames = [];
    frameIndex = 0;
    compareCount = 0;
    writeCount = 0;
    swapCount = 0;
    active = [];
    range = [];
    render();
  };

  render();
  syncCodeExample();
};
