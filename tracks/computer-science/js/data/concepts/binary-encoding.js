window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'binary-encoding',
  category: 'Foundations',
  title: 'Binary, Hex, and Text Encoding',
  icon: 'fa-1',
  number: '03',
  subtitle: 'Computers store text and numbers as bits: encoding maps human symbols to bytes.',
  analogy: 'Encoding is like a phone keypad: pressing 2 once is "A", twice is "B". The computer uses agreed rules (ASCII, UTF-8) so everyone reads the same character from the same bits.',
  realWorldExample: { title: 'Emoji in chat', desc: 'An emoji is several UTF-8 bytes. If encoding is wrong, you see mojibake instead of the smiley.' },
  whatIsIt: 'Binary uses 0 and 1. Hex is a compact way to write bytes (two hex digits per byte). Text encoding maps characters to byte sequences: ASCII for English basics, UTF-8 for nearly all languages and emoji.',
  whyUse: 'Debugging network data, files, crypto, and memory dumps all require reading bytes. Understanding encoding prevents mojibake, security bugs, and wrong string lengths.',
  conceptSections: [
    { icon: 'fa-0', title: 'Bits and bytes', desc: 'One byte = 8 bits. Values 0–255.', example: 'Letter "A" is often 65 decimal or 0x41 hex.' },
    { icon: 'fa-language', title: 'UTF-8', desc: 'Variable-length encoding that stays ASCII-compatible for English.', example: 'Common on the web and in JSON.' },
    { icon: 'fa-hashtag', title: 'Hex dumps', desc: 'Debuggers show memory as hex pairs.', example: '0x48 0x69 hex spells "Hi" (72 dec, 105 dec).' },
  ],
  demoType: 'binary-encoding',
  relatedIds: ['number-bases', 'memory-model', 'compiler-runtime'],
  keywords: ['binary', 'hex', 'ascii', 'utf-8', 'encoding', 'bit', 'byte', 'mojibake'],
  checklist: ['Convert a character to its byte value.', 'Explain why UTF-8 is common on the web.', 'Describe what mojibake means.'],
});
