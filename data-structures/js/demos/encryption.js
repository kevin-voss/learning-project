window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.encryption = function (container) {
  const UI = DS.demoUI;
  let message = 'meet at 4';
  let shift = 3;
  let mode = 'symmetric';

  const normalizeShift = (value) => {
    const n = Number.parseInt(value, 10);
    if (Number.isNaN(n)) return 3;
    return ((n % 26) + 26) % 26;
  };

  const shiftChar = (char, amount) => {
    const code = char.charCodeAt(0);
    const lower = code >= 97 && code <= 122;
    const upper = code >= 65 && code <= 90;
    if (!lower && !upper) return char;

    const base = lower ? 97 : 65;
    return String.fromCharCode(((code - base + amount + 26) % 26) + base);
  };

  const toyEncrypt = (text, amount) => text.split('').map(char => shiftChar(char, amount)).join('');
  const toyDecrypt = (text, amount) => toyEncrypt(text, -amount);

  const publicWrap = (text) => {
    const reversed = text.split('').reverse().join('');
    return `PUBLIC-LOCK(${toyEncrypt(reversed, shift)})`;
  };

  const privateUnwrap = (text) => {
    const match = text.match(/^PUBLIC-LOCK\((.*)\)$/);
    if (!match) return 'Cannot decrypt: ciphertext was not locked with this public key.';
    return toyDecrypt(match[1], shift).split('').reverse().join('');
  };

  const symmetricCiphertext = () => toyEncrypt(message, shift);
  const symmetricPlaintext = () => toyDecrypt(symmetricCiphertext(), shift);
  const asymmetricCiphertext = () => publicWrap(message);
  const asymmetricPlaintext = () => privateUnwrap(asymmetricCiphertext());

  const renderStage = () => {
    const ciphertext = mode === 'symmetric' ? symmetricCiphertext() : asymmetricCiphertext();
    const plaintext = mode === 'symmetric' ? symmetricPlaintext() : asymmetricPlaintext();
    const keyLabel = mode === 'symmetric'
      ? `Shared secret key: shift ${shift}`
      : `Public key locks, private key unlocks (toy shift ${shift})`;

    return `
      <div class="encryption-demo">
        <label class="encryption-field">
          <span>Plaintext message</span>
          <input class="demo-input" value="${UI.esc(message)}" oninput="encryptionSetMessage(this.value)" aria-label="Plaintext message">
        </label>

        <label class="encryption-field">
          <span>Toy key shift</span>
          <input class="demo-input" type="number" min="1" max="25" value="${shift}" oninput="encryptionSetShift(this.value)" aria-label="Toy key shift">
        </label>

        <div class="encryption-pipeline">
          <div class="encryption-box plaintext">
            <strong>Plaintext</strong>
            <code>${UI.esc(message || '(empty)')}</code>
          </div>
          <div class="encryption-arrow"><i class="fas fa-arrow-right"></i><span>${UI.esc(keyLabel)}</span></div>
          <div class="encryption-box ciphertext">
            <strong>Ciphertext</strong>
            <code>${UI.esc(ciphertext || '(empty)')}</code>
          </div>
          <div class="encryption-arrow"><i class="fas fa-arrow-right"></i><span>${mode === 'symmetric' ? 'Decrypt with same key' : 'Decrypt with private key'}</span></div>
          <div class="encryption-box decrypted">
            <strong>Decrypted text</strong>
            <code>${UI.esc(plaintext || '(empty)')}</code>
          </div>
        </div>

        <div class="key-pair-panel">
          <div>
            <strong><i class="fas fa-key"></i> Public key</strong>
            <p>Share this. It can lock a message for the owner.</p>
          </div>
          <div>
            <strong><i class="fas fa-user-secret"></i> Private key</strong>
            <p>Keep this secret. It unlocks messages for the owner.</p>
          </div>
          <div>
            <strong><i class="fas fa-certificate"></i> Certificate</strong>
            <p>Helps a browser trust that a public key belongs to a domain.</p>
          </div>
        </div>
      </div>`;
  };

  const inspectorRows = () => [
    ['Mode', mode === 'symmetric' ? 'Symmetric encryption' : 'Public/private key idea', 'Which encryption idea is shown'],
    ['Plaintext', UI.esc(message || '(empty)'), 'Readable input before encryption'],
    ['Ciphertext', UI.esc(mode === 'symmetric' ? symmetricCiphertext() : asymmetricCiphertext()), 'Unreadable output after encryption'],
    ['Key rule', mode === 'symmetric' ? 'Same key encrypts and decrypts' : 'Public key encrypts; private key decrypts', 'The core beginner rule'],
  ];

  const render = () => {
    container.innerHTML = UI.shell({
      title: 'Encryption playground - toy demo',
      hint: 'Type a message, change the toy key, encrypt it, and see it decrypt. This is not real security; it is a visual model for beginners.',
      stage: renderStage(),
      inspector: UI.inspector('Encryption details', inspectorRows()),
      stats: [
        UI.statChip('Plaintext chars', message.length),
        UI.statChip('Key shift', shift),
        UI.statChip('Mode', mode === 'symmetric' ? 'Symmetric' : 'Public/private'),
      ].join(''),
      controls: `
        <button class="demo-btn ${mode === 'symmetric' ? 'success' : ''}" onclick="encryptionMode('symmetric')"><i class="fas fa-key"></i> Symmetric</button>
        <button class="demo-btn ${mode === 'asymmetric' ? 'success' : ''}" onclick="encryptionMode('asymmetric')"><i class="fas fa-keycdn"></i> Public / Private</button>
        <button class="demo-btn danger" onclick="encryptionReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'encryptionMsg',
    });

    const msg = mode === 'symmetric'
      ? 'Symmetric: the same secret key locks and unlocks the message.'
      : 'Public/private: the public key can lock; only the matching private key should unlock.';
    DS.showMsg('encryptionMsg', `${msg} Toy demo only — real apps use trusted crypto libraries.`, 'info');
  };

  window.encryptionSetMessage = (value) => {
    message = value;
    render();
  };

  window.encryptionSetShift = (value) => {
    shift = normalizeShift(value);
    render();
  };

  window.encryptionMode = (nextMode) => {
    mode = nextMode;
    render();
  };

  window.encryptionReset = () => {
    message = 'meet at 4';
    shift = 3;
    mode = 'symmetric';
    render();
  };

  render();
};
