window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push(
  {
    id: 'encryption-concepts',
    category: 'More: Security',
    title: 'Encryption, Keys, and Certificates',
    icon: 'fa-key',
    subtitle: 'Learn the most common encryption methods, what each one protects, and how data changes step by step.',
    analogy: 'Encryption is like using different kinds of locks. AES is a fast lock for lots of data, RSA and ECC help people agree on keys or protect tiny secrets, TLS combines both for HTTPS, hashes make fingerprints, and signatures prove who approved a message.',
    realWorldExample: {
      title: 'Sending a password over HTTPS',
      desc: 'When you log in, HTTPS uses TLS to protect the request in transit. Someone on the same Wi-Fi may see packets moving, but encryption makes the password unreadable. The server can read the password only after the protected connection delivers it.',
    },
    whatIsIt: 'Encryption changes plaintext into ciphertext using a key. The most common real-world pattern is hybrid encryption: public-key cryptography helps agree on or wrap a temporary key, then fast symmetric encryption protects the actual data. Hashing, password hashing, and digital signatures are related tools that often appear beside encryption, but each solves a different problem.',
    whyUse: 'Encryption protects private data in transit and at rest. It is the foundation behind HTTPS, encrypted backups, database encryption, password managers, cloud secrets, secure messaging, signed software downloads, and password storage checks.',
    conceptSections: [
      { icon: 'fa-file-lines', title: 'Plaintext and ciphertext', desc: 'Plaintext is readable data. Ciphertext is the scrambled result that should look useless without the right key.', example: 'Plaintext: meet at 4. Ciphertext: unreadable bytes.' },
      { icon: 'fa-key', title: 'AES symmetric encryption', desc: 'AES-GCM and ChaCha20-Poly1305 use one shared secret key and are popular for files, disks, databases, and HTTPS data after setup.', example: 'A backup file is encrypted and decrypted with the same secret key.' },
      { icon: 'fa-keycdn', title: 'RSA and ECC public-key crypto', desc: 'Public/private key pairs solve key exchange, small secret wrapping, signatures, and identity. ECC is common in modern TLS because keys are smaller and fast.', example: 'ECDHE helps a browser and server agree on a fresh session key.' },
      { icon: 'fa-certificate', title: 'TLS and certificates', desc: 'TLS is the protocol behind HTTPS. Certificates help the browser trust the server public key before creating encrypted traffic.', example: 'https://example.com presents a certificate for example.com.' },
      { icon: 'fa-fingerprint', title: 'Hashes and password hashes', desc: 'SHA-256 makes a one-way fingerprint. bcrypt, scrypt, and Argon2 are deliberately slow password hashing methods.', example: 'Store password hashes, not encrypted passwords.' },
      { icon: 'fa-signature', title: 'Digital signatures', desc: 'Ed25519, ECDSA, RSA-PSS, and HMAC-style message authentication prove a message was not changed and came from someone with the right secret.', example: 'Package managers verify signed releases.' },
    ],
    conceptFlow: ['Start with plaintext', 'Pick the right tool', 'Create or load keys', 'Encrypt, hash, or sign', 'Send or store the result', 'Decrypt or verify later'],
    mermaidDiagram: `flowchart LR
  A[Plaintext] --> B{Goal}
  B --> C[Fast private data: AES or ChaCha20]
  B --> D[Key setup or identity: RSA or ECC]
  B --> E[Fingerprint: SHA-256]
  B --> F[Password check: Argon2, bcrypt, or scrypt]
  B --> G[Proof: digital signature]
  D --> H[TLS hybrid session key]
  H --> C`,
    whenToUse: [
      { icon: 'fa-lock', title: 'Data in transit', desc: 'Use HTTPS/TLS to protect data moving between client and server.' },
      { icon: 'fa-database', title: 'Data at rest', desc: 'Encrypt sensitive stored data, disks, backups, or secrets.' },
      { icon: 'fa-user-secret', title: 'Keys and secrets', desc: 'Use key managers and environment secrets to protect API keys, private keys, signing keys, and tokens.' },
      { icon: 'fa-fingerprint', title: 'Verification', desc: 'Use hashes, password hashes, MACs, and signatures when you need proof rather than secrecy.' },
    ],
    demoType: 'encryption',
    demoScenario: 'tls',
    demoTitle: 'Encryption Method Explorer',
    demoHint: 'Pick a popular method, type a message, and step through what changes at each stage.',
    codeTitle: 'Encryption Shape Example',
    codeLanguage: 'Pseudocode',
    codeText: `// Real apps use trusted libraries and managed keys.
// This is the common high-level shape.
plaintext = "meet at 4"
secretKey = loadSecretKey()

ciphertext = aesGcmEncrypt(plaintext, secretKey, randomNonce())
store(ciphertext)

later = readFromStorage()
original = aesGcmDecrypt(later, secretKey)

// HTTPS/TLS idea:
// certificate proves the server identity,
// public-key key exchange creates a temporary session key,
// symmetric encryption protects the data.`,
    checklist: ['Explain plaintext vs ciphertext.', 'Choose AES/ChaCha20 for bulk encryption and RSA/ECC for key setup or signatures.', 'Explain why TLS uses certificates plus fast symmetric encryption.', 'Describe why password hashing is not the same as encryption.'],
    subPages: [
      {
        id: 'encryption-overview',
        label: 'Overview',
        title: 'Encryption Overview',
        subtitle: 'Pick the security tool based on the job.',
        body: 'Beginners often say encryption when they mean several different tools. Encryption hides data so it can be read later with the right key. Hashing creates a fingerprint that cannot be decrypted. Password hashing is slow hashing for login checks. Signatures prove integrity and identity. TLS combines several of these ideas to protect HTTPS.',
        demoType: 'encryption',
        demoScenario: 'tls',
        conceptSections: [
          { icon: 'fa-lock', title: 'Hide data', desc: 'Use symmetric encryption for private data that must be recovered later.', example: 'AES-GCM for encrypted records or backups.' },
          { icon: 'fa-handshake', title: 'Agree on keys', desc: 'Use public-key methods to set up trust or share a temporary key.', example: 'ECDHE during a TLS handshake.' },
          { icon: 'fa-check-double', title: 'Verify data', desc: 'Use hashes, MACs, signatures, and password hashes when you need proof.', example: 'Verify a release signature before installing.' },
        ],
        checklist: ['Explain the difference between hiding, fingerprinting, and proving.', 'Name one real use of TLS.', 'Say why toy ciphers are for learning only.'],
      },
      {
        id: 'aes-symmetric-encryption',
        label: 'AES / Symmetric',
        title: 'AES and Symmetric Encryption',
        subtitle: 'One shared secret key protects lots of data quickly.',
        body: 'Symmetric encryption uses the same secret key to encrypt and decrypt. AES-GCM and ChaCha20-Poly1305 are popular authenticated encryption choices: they protect confidentiality and detect tampering. Real encryption also needs a fresh nonce or IV for each message.',
        demoType: 'encryption',
        demoScenario: 'symmetric',
        conceptSections: [
          { icon: 'fa-key', title: 'Secret key', desc: 'Both sides need the same secret key.', example: 'A server loads a data-encryption key from a key manager.' },
          { icon: 'fa-dice', title: 'Nonce or IV', desc: 'A unique value keeps repeated messages from producing repeated ciphertext.', example: 'AES-GCM requires a fresh nonce for each encryption.' },
          { icon: 'fa-shield-halved', title: 'Auth tag', desc: 'Authenticated encryption detects if ciphertext was changed.', example: 'Wrong tag means reject instead of decrypting garbage.' },
        ],
        codeTitle: 'AES-GCM Shape',
        codeLanguage: 'Pseudocode',
        codeText: `key = keyManager.load("customer-data-key")
nonce = randomBytes(12)
ciphertext, tag = AES_GCM.encrypt(key, nonce, plaintext)

plaintext = AES_GCM.decrypt(key, nonce, ciphertext, tag)`,
        checklist: ['Explain why the key is secret.', 'Explain why a nonce must not repeat with the same key.', 'Name AES-GCM as a common modern choice.'],
      },
      {
        id: 'rsa-ecc-asymmetric',
        label: 'RSA / ECC',
        title: 'RSA, ECC, and Public-Key Cryptography',
        subtitle: 'A public key can be shared. The private key stays secret.',
        body: 'Public-key cryptography uses a key pair. RSA is older and still common. ECC uses elliptic curves and is popular in modern TLS and signatures because it can provide strong security with smaller keys. Public-key operations are slower than AES, so they usually protect small values or help create a symmetric session key.',
        demoType: 'encryption',
        demoScenario: 'asymmetric',
        conceptSections: [
          { icon: 'fa-share-nodes', title: 'Public key', desc: 'Safe to share. Others can use it to encrypt to you or verify your signature.', example: 'A server certificate contains a public key.' },
          { icon: 'fa-user-secret', title: 'Private key', desc: 'Must stay secret. It decrypts or signs depending on the algorithm.', example: 'A server stores its private key outside the browser.' },
          { icon: 'fa-bolt', title: 'Used sparingly', desc: 'Public-key crypto is powerful but slower, so apps combine it with symmetric encryption.', example: 'TLS creates an AES session key for the rest of the connection.' },
        ],
        codeTitle: 'Public-Key Shape',
        codeLanguage: 'Pseudocode',
        codeText: `// Small secret wrapping idea
wrappedKey = RSA_OAEP.encrypt(recipientPublicKey, randomSessionKey)
sessionKey = RSA_OAEP.decrypt(recipientPrivateKey, wrappedKey)

// Modern TLS often uses ECDHE to agree on a fresh session key.`,
        checklist: ['Explain public key vs private key.', 'Say why RSA/ECC usually do not encrypt large files directly.', 'Connect ECC to modern TLS key exchange.'],
      },
      {
        id: 'tls-certificates',
        label: 'TLS / HTTPS',
        title: 'TLS, HTTPS, and Certificates',
        subtitle: 'HTTPS uses certificates, public-key setup, and fast symmetric encryption together.',
        body: 'TLS is the protocol behind HTTPS. The browser checks the server certificate, uses public-key cryptography to establish a fresh shared session key, then sends normal HTTP data through fast symmetric encryption. This is why HTTPS can be both trusted and fast.',
        demoType: 'encryption',
        demoScenario: 'tls',
        conceptSections: [
          { icon: 'fa-certificate', title: 'Certificate check', desc: 'The browser checks the certificate domain, expiration, and issuer chain.', example: 'Certificate says the public key belongs to example.com.' },
          { icon: 'fa-handshake', title: 'Key exchange', desc: 'Browser and server create a temporary shared session key.', example: 'ECDHE gives forward secrecy.' },
          { icon: 'fa-lock', title: 'Encrypted HTTP', desc: 'After setup, requests and responses use fast symmetric encryption.', example: 'POST /login body is encrypted on the wire.' },
        ],
        codeTitle: 'TLS Mental Model',
        codeLanguage: 'Pseudocode',
        codeText: `browser checks server certificate
browser and server run ECDHE key exchange
sessionKey = derived shared secret
send AES-GCM encrypted HTTP requests and responses`,
        checklist: ['Explain why certificates matter.', 'Describe TLS as a hybrid system.', 'Say what HTTPS protects in transit.'],
      },
      {
        id: 'hashing-passwords',
        label: 'Hashes / Passwords',
        title: 'Hashes and Password Hashing',
        subtitle: 'Hashes verify data. Password hashes slow down guessing.',
        body: 'SHA-256 and SHA-3 produce fixed-size fingerprints. You cannot decrypt a hash back to the original. Passwords need special slow, salted hashing algorithms such as Argon2, bcrypt, or scrypt because attackers can guess common passwords very quickly if hashes are cheap to compute.',
        demoType: 'encryption',
        demoScenario: 'password',
        conceptSections: [
          { icon: 'fa-fingerprint', title: 'Normal hash', desc: 'Fast one-way fingerprint for files and messages.', example: 'Download page publishes a SHA-256 checksum.' },
          { icon: 'fa-salt-shaker', title: 'Salt', desc: 'Random data added so identical passwords do not have identical stored hashes.', example: 'Two users with password123 get different hashes.' },
          { icon: 'fa-hourglass-half', title: 'Slow work factor', desc: 'Password hashing intentionally costs time and memory.', example: 'Argon2id, bcrypt, and scrypt slow brute-force guessing.' },
        ],
        codeTitle: 'Password Hash Shape',
        codeLanguage: 'Pseudocode',
        codeText: `// At signup
salt = randomBytes(16)
storedHash = Argon2id.hash(password, salt, workFactor)

// At login
ok = Argon2id.verify(attemptedPassword, storedHash)`,
        checklist: ['Explain why hashes cannot be decrypted.', 'Say why password hashing needs salt.', 'Name Argon2, bcrypt, or scrypt as password hashing methods.'],
      },
      {
        id: 'digital-signatures',
        label: 'Signatures',
        title: 'Digital Signatures and Integrity',
        subtitle: 'Signatures prove who approved data and whether it changed.',
        body: 'Digital signatures use a private key to sign and a public key to verify. They do not hide the message. Instead, they tell the receiver that the message was approved by someone with the private key and has not changed since signing.',
        demoType: 'encryption',
        demoScenario: 'signature',
        conceptSections: [
          { icon: 'fa-file-signature', title: 'Sign with private key', desc: 'The owner creates a signature over the message or its hash.', example: 'A release maintainer signs a package.' },
          { icon: 'fa-eye', title: 'Verify with public key', desc: 'Anyone with the public key can check the signature.', example: 'Installer verifies the package before running it.' },
          { icon: 'fa-ban', title: 'Not secrecy', desc: 'Signing does not hide the message. Pair it with encryption when privacy is needed.', example: 'A public changelog can still be signed.' },
        ],
        codeTitle: 'Signature Shape',
        codeLanguage: 'Pseudocode',
        codeText: `signature = Ed25519.sign(privateKey, message)

if Ed25519.verify(publicKey, message, signature):
  trust that message was not changed
else:
  reject`,
        checklist: ['Explain signing vs encrypting.', 'Say which key signs and which key verifies.', 'Name one place signatures are useful.'],
      },
    ],
  },
);
