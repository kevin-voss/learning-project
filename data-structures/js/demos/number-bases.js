window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.numberBases = function (container) {
  const UI = DS.demoUI;
  let mode = 'explore';
  let value = 13;
  let practice = null;
  let practiceInput = '';
  let practiceFeedback = '';

  const clamp = (n) => Math.max(0, Math.min(255, Math.floor(Number(n) || 0)));

  const binarySteps = (n) => {
    const steps = [];
    let current = n;
    if (current === 0) return [{ divide: '0 ÷ 2', quotient: 0, remainder: 0 }];
    while (current > 0) {
      const remainder = current % 2;
      const quotient = Math.floor(current / 2);
      steps.push({ divide: `${current} ÷ 2`, quotient, remainder });
      current = quotient;
    }
    return steps;
  };

  const hexSteps = (n) => {
    const steps = [];
    let current = n;
    if (current === 0) return [{ divide: '0 ÷ 16', quotient: 0, remainder: 0 }];
    while (current > 0) {
      const remainder = current % 16;
      const quotient = Math.floor(current / 16);
      steps.push({ divide: `${current} ÷ 16`, quotient, remainder });
      current = quotient;
    }
    return steps;
  };

  const hexDigit = (d) => (d < 10 ? String(d) : String.fromCharCode(55 + d));

  const placeValues = (n) => {
    const bits = n.toString(2).padStart(8, '0').split('').map(Number);
    const weights = [128, 64, 32, 16, 8, 4, 2, 1];
    return weights.map((w, i) => ({ weight: w, bit: bits[i], on: bits[i] === 1, contrib: bits[i] ? w : 0 }));
  };

  const nibbleView = (n) => {
    const bin = n.toString(2).padStart(8, '0');
    const hi = bin.slice(0, 4);
    const lo = bin.slice(4);
    const hiVal = parseInt(hi, 2);
    const loVal = parseInt(lo, 2);
    return { hi, lo, hiVal, loVal, hiHex: hexDigit(hiVal), loHex: hexDigit(loVal) };
  };

  const normalizeBinary = (raw) => raw.replace(/\s+/g, '').replace(/bin$/i, '').trim();
  const normalizeHex = (raw) => raw.replace(/^0x/i, '').replace(/\s+/g, '').replace(/hex$/i, '').trim();
  const normalizeDec = (raw) => raw.replace(/\s+/g, '').replace(/dec$/i, '').trim();

  const parseAnswer = (raw, base) => {
    const text = String(raw).trim();
    if (!text) return null;
    if (base === 'dec') {
      const n = Number(normalizeDec(text));
      return Number.isInteger(n) ? n : null;
    }
    if (base === 'bin') {
      const bits = normalizeBinary(text);
      if (!/^[01]+$/.test(bits)) return null;
      return parseInt(bits, 2);
    }
    const hex = normalizeHex(text);
    if (!/^[0-9a-fA-F]+$/.test(hex)) return null;
    return parseInt(hex, 16);
  };

  const formatAnswer = (n, base) => {
    if (base === 'dec') return UI.formatDec(n);
    if (base === 'bin') return UI.formatBin(n);
    return UI.formatHex(n);
  };

  const newPractice = () => {
    const n = Math.floor(Math.random() * 256);
    const bases = ['dec', 'bin', 'hex'];
    let from = bases[Math.floor(Math.random() * bases.length)];
    let to = bases[Math.floor(Math.random() * bases.length)];
    while (to === from) to = bases[Math.floor(Math.random() * bases.length)];
    practice = { n, from, to };
    practiceInput = '';
    practiceFeedback = '';
  };

  const renderExplore = () => {
    const binSteps = binarySteps(value);
    const hxSteps = hexSteps(value);
    const remaindersBin = [...binSteps].reverse().map(s => s.remainder).join('');
    const remaindersHex = [...hxSteps].reverse().map(s => hexDigit(s.remainder)).join('');
    const places = placeValues(value);
    const nib = nibbleView(value);
    const activeSum = places.filter(p => p.on).map(p => `${p.weight} dec`).join(' + ') || '0 dec';

    return `
      <div class="nb-explore">
        <label class="nb-slider-label">
          Decimal value
          <input type="range" min="0" max="255" value="${value}" id="nbSlider" oninput="nbSetValue(this.value)" aria-label="Decimal value 0 to 255">
          <strong>${UI.formatDec(value)}</strong>
        </label>
        <div class="nb-summary">
          <span>${UI.formatDec(value)}</span>
          <span>${UI.formatHex(value)}</span>
          <span>${UI.formatBin(value)}</span>
        </div>
        <section class="nb-panel">
          <h4>Place values (one byte)</h4>
          <div class="nb-place-grid">
            ${places.map(p => `
              <div class="nb-place${p.on ? ' is-on' : ''}">
                <span class="nb-place-bit">${p.bit} bin</span>
                <span class="nb-place-weight">${p.weight} dec</span>
              </div>`).join('')}
          </div>
          <p class="nb-note">Set bits: ${activeSum} = <strong>${UI.formatDec(value)}</strong></p>
        </section>
        <section class="nb-panel">
          <h4>Decimal → binary (divide by 2, collect remainders bottom-up)</h4>
          <ol class="nb-steps">
            ${binSteps.map(s => `<li>${s.divide} → quotient ${s.quotient} dec, remainder <strong>${s.remainder} bin</strong></li>`).join('')}
          </ol>
          <p class="nb-note">Read remainders upward: <code>${remaindersBin} bin</code> = ${UI.formatBin(value)}</p>
        </section>
        <section class="nb-panel">
          <h4>Decimal → hex (divide by 16)</h4>
          <ol class="nb-steps">
            ${hxSteps.map(s => `<li>${s.divide} → quotient ${s.quotient} dec, remainder <strong>${hexDigit(s.remainder)} hex</strong> (${s.remainder} dec)</li>`).join('')}
          </ol>
          <p class="nb-note">Read remainders upward: <code>${remaindersHex} hex</code> = ${UI.formatHex(value)}</p>
        </section>
        <section class="nb-panel">
          <h4>Nibble shortcut (binary → hex)</h4>
          <p>Group bits: <code>${nib.hi} ${nib.lo} bin</code> → <code>${nib.hiHex}${nib.loHex} hex</code> = ${UI.formatHex(value)}</p>
          <p class="nb-note">${nib.hi} bin = ${UI.formatHex(nib.hiVal)} · ${nib.lo} bin = ${UI.formatHex(nib.loVal)}</p>
        </section>
      </div>`;
  };

  const renderPractice = () => {
    if (!practice) newPractice();
    const { n, from, to } = practice;
    const baseName = (b) => (b === 'dec' ? 'decimal' : b === 'bin' ? 'binary' : 'hex');
    const prompt = `Convert ${formatAnswer(n, from)} to ${baseName(to)}.`;
    const ok = practiceFeedback.startsWith('Correct');
    const bad = practiceFeedback && !ok;

    return `
      <div class="nb-practice">
        <p class="nb-prompt">${UI.esc(prompt)}</p>
        <div class="nb-practice-input">
          <input type="text" class="demo-input wide" id="nbPracticeIn" value="${UI.esc(practiceInput)}"
            placeholder="${to === 'bin' ? '1101 bin' : to === 'hex' ? '0x0D hex' : '13 dec'}"
            oninput="nbPracticeType(this.value)" aria-label="Your answer">
          <button type="button" class="demo-btn success" onclick="nbPracticeCheck()">Check</button>
          <button type="button" class="demo-btn" onclick="nbPracticeNew()">New question</button>
        </div>
        ${practiceFeedback ? `<p class="demo-msg ${ok ? 'success-msg' : 'error'}">${UI.esc(practiceFeedback)}</p>` : ''}
        ${bad ? `<p class="nb-note">Expected: ${formatAnswer(n, to)}. Try the Explore tab to walk through ${UI.formatDec(n)} step by step.</p>` : ''}
      </div>`;
  };

  const inspectorRows = () => {
    if (mode === 'practice' && practice) {
      return [
        ['Question', formatAnswer(practice.n, practice.from), 'Starting value'],
        ['Convert to', practice.to, 'Target base'],
        ['Range', '0–255 dec', 'One byte'],
        ['Tip', 'Include base tag', 'e.g. 1101 bin or 0x0D hex'],
      ];
    }
    const nib = nibbleView(value);
    return [
      ['Value', UI.formatDec(value), 'Current slider'],
      ['Hex', UI.formatHex(value), 'Two nibbles: ' + nib.hiHex + nib.loHex],
      ['Binary', UI.formatBin(value), 'Eight bits'],
      ['Max byte', '255 dec = 0xFF hex', 'All bits set'],
    ];
  };

  const render = () => {
    UI.mount(container, {
      title: mode === 'explore' ? 'Explore bases and place values' : 'Practice conversions',
      hint: mode === 'explore'
        ? 'Move the slider (0–255). Each panel shows a different conversion method — same value every time.'
        : 'Answer in the target base. You can write 13 dec, 1101 bin, or 0x0D hex — the base tag or 0x prefix helps.',
      stage: `
        <div class="number-bases-demo">
          <div class="demo-controls nb-mode-tabs">
            <button type="button" class="demo-btn ${mode === 'explore' ? 'success' : ''}" onclick="nbSetMode('explore')">Explore</button>
            <button type="button" class="demo-btn ${mode === 'practice' ? 'success' : ''}" onclick="nbSetMode('practice')">Practice</button>
          </div>
          ${mode === 'explore' ? renderExplore() : renderPractice()}
        </div>`,
      inspector: UI.inspector('Conversion', inspectorRows()),
      stats: [
        UI.statChip('Mode', mode === 'explore' ? 'Explore' : 'Practice'),
        UI.statChip('Value', mode === 'explore' ? UI.formatDec(value) : practice ? UI.formatDec(practice.n) : '—'),
        UI.statChip('Bases', 'dec · bin · hex'),
      ].join(''),
    });
  };

  window.nbSetMode = (m) => {
    mode = m;
    if (mode === 'practice' && !practice) newPractice();
    render();
  };
  window.nbSetValue = (v) => { value = clamp(v); render(); };
  window.nbPracticeType = (v) => { practiceInput = v; };
  window.nbPracticeCheck = () => {
    if (!practice) return;
    const parsed = parseAnswer(practiceInput, practice.to);
    if (parsed === null) {
      practiceFeedback = 'Could not parse that answer — use digits for the base you chose (e.g. 1101 bin or 0xFF hex).';
    } else if (parsed === practice.n) {
      practiceFeedback = `Correct! ${formatAnswer(practice.n, practice.from)} = ${formatAnswer(practice.n, practice.to)}.`;
    } else {
      practiceFeedback = `Not quite — you entered ${formatAnswer(parsed, practice.to)}, but ${formatAnswer(practice.n, practice.from)} is ${formatAnswer(practice.n, practice.to)}.`;
    }
    render();
  };
  window.nbPracticeNew = () => { newPractice(); render(); };

  newPractice();
  render();
};
