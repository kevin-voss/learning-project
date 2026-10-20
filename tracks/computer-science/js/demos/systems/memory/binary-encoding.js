window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.binaryEncoding = function (container) {
  const UI = DS.demoUI;
  let text = 'Hi';
  const toBinary = (s) => [...s].map(c => UI.formatBin(c.charCodeAt(0))).join(' ');
  const toHex = (s) => [...s].map(c => UI.formatHex(c.charCodeAt(0))).join(' ');
  const toDecimal = (s) => [...s].map(c => UI.formatDec(c.charCodeAt(0))).join(' ');
  const codePoints = (s) => [...s].map(c => {
    const cp = c.charCodeAt(0);
    return `<span class="binary-cp" title="Same value in three bases">${UI.esc(c)}: ${UI.formatDec(cp)} = ${UI.formatHex(cp)} = ${UI.formatBin(cp)}</span>`;
  }).join(' ');

  const render = () => {
    UI.mount(container, {
      title: 'Text to bits',
      hint: 'One code-point number, three ways to write it. Each value is tagged with its base: dec (10), hex (16), or bin (2).',
      stage: `
        <div class="binary-demo">
          <label class="binary-input-label">
            Type text
            <input type="text" class="demo-input" id="binText" value="${UI.esc(text)}" maxlength="8" oninput="binUpdate(this.value)" aria-label="Text to encode">
          </label>
          <div class="binary-rows">
            <div><strong>Decimal:</strong> <code>${UI.esc(toDecimal(text))}</code></div>
            <div><strong>Hex:</strong> <code>${UI.esc(toHex(text))}</code></div>
            <div><strong>Binary:</strong> <code>${UI.esc(toBinary(text))}</code></div>
            <div class="binary-equiv"><strong>Per character:</strong> ${codePoints(text)}</div>
          </div>
        </div>`,
      inspector: UI.inspector('Encoding', [
        ['UTF-8', 'Variable bytes', 'Common on the web'],
        ['Bit', '0 or 1', 'Smallest unit'],
        ['Byte', '8 bits', 'Typical storage unit'],
        ['Example', '72 dec = 0x48 hex = 01001000 bin', 'H — same value, three bases'],
      ]),
    });
  };
  window.binUpdate = (v) => { text = v ?? ''; render(); };
  render();
};
