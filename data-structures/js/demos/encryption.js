window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.encryption = function (container, initialScenario) {
  const UI = DS.demoUI;
  let message = 'meet at 4';
  let keySeed = 'blue-key';
  let method = initialScenario || 'tls';
  let activeStep = 0;

  const simpleHash = (text) => {
    let hash = 2166136261;
    for (let i = 0. I < text.length. I += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, '0');
  };

  const seedShift = () => {
    const hex = simpleHash(keySeed);
    return (Number.parseInt(hex.slice(0, 2), 16) % 25) + 1;
  };

  const shiftChar = (char, amount) => {
    const code = char.charCodeAt(0);
    const lower = code >= 97 && code <= 122;
    const upper = code >= 65 && code <= 90;
    if (!lower && !upper) return char;

    const base = lower ? 97 : 65;
    return String.fromCharCode(((code - base + amount + 26) % 26) + base);
  };

  const toyEncrypt = (text, amount = seedShift()) => text.split('').map(char => shiftChar(char, amount)).join('');
  const toyDecrypt = (text, amount = seedShift()) => toyEncrypt(text, -amount);
  const toyBytes = (text) => Array.from(text).map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
  const short = (text, prefix) => `${prefix}-${simpleHash(text).slice(0, 10)}`;

  const buildMethods = () => {
    const nonce = `nonce-${simpleHash(`${keySeed}:${message}`).slice(0, 6)}`;
    const cipher = `aes-gcm:${nonce}:${toyBytes(toyEncrypt(message))}`;
    const sessionKey = short(`${message}:${keySeed}:session`, 'session-key');
    const wrappedKey = `rsa-oaep(${toyEncrypt(sessionKey).split('').reverse().join('')})`;
    const digest = `sha256:${simpleHash(message)}${simpleHash(`${message}:more`).slice(0, 8)}`;
    const salt = `salt-${simpleHash(`${message}:salt`).slice(0, 6)}`;
    const passwordHash = `argon2id$${salt}$${simpleHash(`${salt}:${message}:${keySeed}`).repeat(2)}`;
    const signature = `ed25519-sig:${simpleHash(`private:${message}:${keySeed}`)}${simpleHash(message).slice(0, 6)}`;

    return {
      symmetric: {
        label: 'AES-GCM',
        icon: 'fa-lock',
        summary: 'Fast symmetric encryption for files, records, backups, and HTTPS data after setup.',
        resultLabel: 'Ciphertext + nonce + auth tag',
        result: `${cipher}\ntag:${simpleHash(`${cipher}:tag`).slice(0, 12)}`,
        important: 'Same secret key decrypts it. Reusing a nonce with the same key is dangerous in real AES-GCM.',
        steps: [
          { title: 'Plaintext', detail: 'Start with readable data.', artifact: message || '(empty)' },
          { title: 'Secret key', detail: 'Load or derive a secret key known only to allowed readers.', artifact: short(keySeed, 'aes-key') },
          { title: 'Fresh nonce', detail: 'Create a unique nonce so repeated messages do not encrypt the same way.', artifact: nonce },
          { title: 'Encrypt and tag', detail: 'AES-GCM turns text into ciphertext and adds an auth tag to detect tampering.', artifact: `${cipher}\ntag:${simpleHash(`${cipher}:tag`).slice(0, 12)}` },
          { title: 'Decrypt', detail: 'Later, the same key plus the nonce and tag recover the plaintext if nothing changed.', artifact: toyDecrypt(toyEncrypt(message)) || '(empty)' },
        ],
      },
      asymmetric: {
        label: 'RSA / ECC',
        icon: 'fa-keycdn',
        summary: 'Public/private key cryptography for key exchange, small secret wrapping, and identity.',
        resultLabel: 'Wrapped session key',
        result: wrappedKey,
        important: 'Public-key crypto is usually used for small values or key setup, then AES/ChaCha20 handles bulk data.',
        steps: [
          { title: 'Key pair', detail: 'The public key can be shared. The private key stays secret.', artifact: `public:${short(keySeed, 'pub')}\nprivate:${short(keySeed, 'priv')}` },
          { title: 'Create session key', detail: 'Make a temporary symmetric key for the actual data.', artifact: sessionKey },
          { title: 'Wrap with public key', detail: 'Encrypt the small session key for the private-key owner.', artifact: wrappedKey },
          { title: 'Unwrap with private key', detail: 'Only the matching private key should recover the session key.', artifact: sessionKey },
          { title: 'Encrypt data fast', detail: 'Use the recovered session key with symmetric encryption for the message.', artifact: `aes-gcm:${toyBytes(toyEncrypt(message, 7))}` },
        ],
      },
      tls: {
        label: 'TLS / HTTPS',
        icon: 'fa-certificate',
        summary: 'Hybrid protection for web traffic: certificates, public-key key exchange, then fast symmetric encryption.',
        resultLabel: 'Encrypted HTTP request',
        result: `TLS record\nkey=${sessionKey}\nbody=${toyBytes(toyEncrypt(message, 9))}`,
        important: 'HTTPS protects data in transit. The server still sees the plaintext after TLS delivers it.',
        steps: [
          { title: 'Browser connects', detail: 'The browser asks for https://example.com.', artifact: 'ClientHello: supported TLS versions and ciphers' },
          { title: 'Certificate check', detail: 'The server sends a certificate proving its public key belongs to the domain.', artifact: 'Certificate: example.com, public key, issuer, expiry' },
          { title: 'Key exchange', detail: 'Browser and server use ECDHE-style public values to derive a fresh shared secret.', artifact: sessionKey },
          { title: 'Symmetric traffic', detail: 'Normal HTTP requests now travel inside encrypted TLS records.', artifact: `POST /login\nciphertext=${toyBytes(toyEncrypt(message, 9))}` },
          { title: 'Server reads safely', detail: 'The server decrypts inside the TLS connection and handles the request.', artifact: message || '(empty)' },
        ],
      },
      hash: {
        label: 'SHA-256 Hash',
        icon: 'fa-fingerprint',
        summary: 'A fast one-way fingerprint for integrity checks. It is not encryption.',
        resultLabel: 'Digest',
        result: digest,
        important: 'Hashes cannot be decrypted. If you need the original later, hash is the wrong tool.',
        steps: [
          { title: 'Input', detail: 'Start with any message or file.', artifact: message || '(empty)' },
          { title: 'Process bytes', detail: 'The hash function mixes every byte into fixed-size internal state.', artifact: toyBytes(message || ' ') },
          { title: 'Digest', detail: 'Output a fixed-size fingerprint.', artifact: digest },
          { title: 'Compare later', detail: 'Hash the later copy and compare digests to detect changes.', artifact: simpleHash(message) === simpleHash(message) ? 'match: unchanged' : 'mismatch: changed' },
        ],
      },
      password: {
        label: 'Argon2 / bcrypt',
        icon: 'fa-user-lock',
        summary: 'Slow salted password hashing for login checks.',
        resultLabel: 'Stored password hash',
        result: passwordHash,
        important: 'Do not encrypt passwords for storage. Store slow salted password hashes and verify attempts.',
        steps: [
          { title: 'Password attempt', detail: 'The user types a password. The server should not store this plaintext.', artifact: message || '(empty)' },
          { title: 'Random salt', detail: 'Salt keeps identical passwords from producing identical stored hashes.', artifact: salt },
          { title: 'Slow hash', detail: 'Argon2id, bcrypt, or scrypt spends time and memory to slow down guessing.', artifact: passwordHash },
          { title: 'Store hash only', detail: 'The database stores algorithm, salt, settings, and hash, not the password.', artifact: 'users.password_hash = argon2id$...' },
          { title: 'Verify login', detail: 'Hash the new attempt with the stored settings and compare safely.', artifact: 'attempt matches stored hash: yes' },
        ],
      },
      signature: {
        label: 'Signature',
        icon: 'fa-signature',
        summary: 'Proof that a message was approved by the private-key holder and was not changed.',
        resultLabel: 'Signature',
        result: signature,
        important: 'Signatures do not hide the message. They prove integrity and identity.',
        steps: [
          { title: 'Message', detail: 'Start with data that may be public but must be trusted.', artifact: message || '(empty)' },
          { title: 'Hash message', detail: 'Create a fingerprint of exactly what will be signed.', artifact: digest },
          { title: 'Sign privately', detail: 'The private key creates a signature over the message or digest.', artifact: signature },
          { title: 'Share public key', detail: 'Anyone with the public key can check the signature.', artifact: short(keySeed, 'public-key') },
          { title: 'Verify', detail: 'If the message changes, verification fails.', artifact: 'signature valid for this message: yes' },
        ],
      },
    };
  };

  const methods = () => buildMethods();

  const renderMethodTabs = (allMethods) => `
    <div class="encryption-method-tabs">
      ${Object.entries(allMethods).map(([key, item]) => `
        <button type="button" class="demo-btn ${method === key ? 'success' : ''}" onclick="encryptionMethod('${key}')">
          <i class="fas ${item.icon}"></i> ${UI.esc(item.label)}
        </button>
      `).join('')}
    </div>`;

  const renderStepList = (steps) => `
    <div class="encryption-steps">
      ${steps.map((step, index) => `
        <button type="button" class="encryption-step ${index === activeStep ? 'active' : ''}" onclick="encryptionStep(${index})">
          <span>${index + 1}</span>
          <strong>${UI.esc(step.title)}</strong>
        </button>
      `).join('')}
    </div>`;

  const renderStage = () => {
    const allMethods = methods();
    const current = allMethods[method] || allMethods.tls;
    const step = current.steps[activeStep] || current.steps[0];

    return `
      <div class="encryption-demo">
        ${renderMethodTabs(allMethods)}

        <div class="encryption-input-grid">
          <label class="encryption-field">
            <span>Message or password</span>
            <input class="demo-input wide" value="${UI.esc(message)}" oninput="encryptionSetMessage(this.value)" aria-label="Message or password">
          </label>
          <label class="encryption-field">
            <span>Toy key seed</span>
            <input class="demo-input wide" value="${UI.esc(keySeed)}" oninput="encryptionSetKey(this.value)" aria-label="Toy key seed">
          </label>
        </div>

        <div class="encryption-method-card">
          <div>
            <strong><i class="fas ${current.icon}"></i> ${UI.esc(current.label)}</strong>
            <p>${UI.esc(current.summary)}</p>
          </div>
          <div class="encryption-method-result">
            <span>${UI.esc(current.resultLabel)}</span>
            <code>${UI.esc(current.result)}</code>
          </div>
        </div>

        ${renderStepList(current.steps)}

        <div class="encryption-step-detail">
          <div class="encryption-step-number">Step ${activeStep + 1} of ${current.steps.length}</div>
          <h4>${UI.esc(step.title)}</h4>
          <p>${UI.esc(step.detail)}</p>
          <code>${UI.esc(step.artifact)}</code>
        </div>

        <div class="key-pair-panel">
          <div>
            <strong><i class="fas fa-triangle-exclamation"></i> Toy demo only</strong>
            <p>This visualizes ideas with tiny fake transformations. Real apps use Web Crypto, libsodium, framework helpers, KMS, and audited libraries.</p>
          </div>
          <div>
            <strong><i class="fas fa-lightbulb"></i> Beginner rule</strong>
            <p>${UI.esc(current.important)}</p>
          </div>
          <div>
            <strong><i class="fas fa-toolbox"></i> Common choices</strong>
            <p>AES-GCM, ChaCha20-Poly1305, RSA-OAEP, ECDHE, Ed25519, ECDSA, SHA-256, Argon2id, bcrypt, and scrypt.</p>
          </div>
        </div>
      </div>`;
  };

  const inspectorRows = () => {
    const current = methods()[method] || methods().tls;
    const step = current.steps[activeStep] || current.steps[0];
    return [
      ['Method', current.label, 'Which security tool you are exploring'],
      ['Current step', `${activeStep + 1}. ${UI.esc(step.title)}`, 'Where you are in the process'],
      ['Input length', String(message.length), 'Characters in the message or password'],
      ['Recover original?', method === 'hash' || method === 'password' || method === 'signature' ? 'No decrypt step' : 'Yes, with the right key', 'Some tools verify instead of decrypting'],
    ];
  };

  const render = () => {
    const current = methods()[method] || methods().tls;
    container.innerHTML = UI.shell({
      title: 'Encryption method explorer',
      hint: 'Pick a popular method, type a message, and move step by step. The outputs are toy visuals, not real cryptography.',
      stage: renderStage(),
      inspector: UI.inspector('Method details', inspectorRows()),
      stats: [
        UI.statChip('Method', current.label),
        UI.statChip('Step', `${activeStep + 1}/${current.steps.length}`),
        UI.statChip('Chars', message.length),
      ].join(''),
      controls: `
        <button class="demo-btn" onclick="encryptionPrevStep()"><i class="fas fa-arrow-left"></i> Previous step</button>
        <button class="demo-btn success" onclick="encryptionNextStep()"><i class="fas fa-arrow-right"></i> Next step</button>
        <button class="demo-btn danger" onclick="encryptionReset()"><i class="fas fa-rotate"></i> Reset</button>`,
      msgId: 'encryptionMsg',
    });

    DS.showMsg('encryptionMsg', current.important, 'info');
  };

  window.encryptionSetMessage = (value) => {
    message = value;
    render();
  };

  window.encryptionSetKey = (value) => {
    keySeed = value || 'blue-key';
    render();
  };

  window.encryptionMethod = (nextMethod) => {
    if (!methods()[nextMethod]) return;
    method = nextMethod;
    activeStep = 0;
    render();
  };

  window.encryptionStep = (index) => {
    const current = methods()[method] || methods().tls;
    activeStep = Math.max(0, Math.min(index, current.steps.length - 1));
    render();
  };

  window.encryptionNextStep = () => {
    const current = methods()[method] || methods().tls;
    activeStep = (activeStep + 1) % current.steps.length;
    render();
  };

  window.encryptionPrevStep = () => {
    const current = methods()[method] || methods().tls;
    activeStep = activeStep === 0 ? current.steps.length - 1 : activeStep - 1;
    render();
  };

  window.encryptionReset = () => {
    message = 'meet at 4';
    keySeed = 'blue-key';
    method = initialScenario || 'tls';
    activeStep = 0;
    render();
  };

  render();
};
