window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.binaryEncoding = function (container) {
  const UI = DS.demoUI;
  let text = 'Hi';
  const toBinary = (s) => [...s].map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  const toHex = (s) => [...s].map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ');

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Text to bits',
      hint: 'Characters map to numbers (Unicode); numbers map to binary and hex.',
      stage: `
        <div class="binary-demo">
          <input type="text" class="demo-input" id="binText" value="${UI.esc(text)}" maxlength="8" oninput="binUpdate(this.value)" aria-label="Text to encode">
          <div class="binary-rows">
            <div><strong>Binary:</strong> <code>${UI.esc(toBinary(text))}</code></div>
            <div><strong>Hex:</strong> <code>${UI.esc(toHex(text))}</code></div>
            <div><strong>Chars:</strong> ${[...text].map(c => `${UI.esc(c)}=${c.charCodeAt(0)}`).join(', ')}</div>
          </div>
        </div>`,
      inspector: UI.inspector('Encoding', [
        ['UTF-8', 'Variable bytes', 'Common on the web'],
        ['Bit', '0 or 1', 'Smallest unit'],
        ['Byte', '8 bits', 'Typical storage unit'],
      ]),
    });
  };
  window.binUpdate = (v) => { text = v || ''; render(); };
  render();
};
