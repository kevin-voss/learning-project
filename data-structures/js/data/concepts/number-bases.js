window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'number-bases',
  category: 'Foundations',
  title: 'Number Bases and Conversion',
  icon: 'fa-calculator',
  number: '03b',
  subtitle: 'Decimal, binary, and hex are different ways to write the same value — learn to convert between them.',
  analogy: 'Think of telling time: "90 minutes" and "1.5 hours" describe the same duration. Decimal, binary, and hex are like that for numbers: different notation, same quantity.',
  realWorldExample: {
    title: 'Reading a hex dump',
    desc: 'A debugger shows 0xFF hex in memory. That is 255 dec — the maximum value in one byte. Knowing base conversion lets you read memory, colors (#FF0000), and network addresses without guessing.',
  },
  whatIsIt: 'A number base tells you how many digits you have and what each place is worth. Decimal (base 10) uses digits 0–9 and places of 1, 10, 100. Binary (base 2) uses 0–1 and places of 1, 2, 4, 8. Hex (base 16) uses 0–9 and A–F with places of 1, 16, 256. Any whole number can be written in any of these bases.',
  whyUse: 'Developers constantly jump between bases: file sizes, color codes, memory addresses, bit masks, and protocol fields. Manual conversion builds intuition for bitwise operations, overflow, and why one byte holds 0–255.',
  conceptSections: [
    {
      icon: 'fa-hashtag',
      title: 'Place value',
      desc: 'Each digit position has a weight. In binary, the bits (right to left) are worth 1, 2, 4, 8, 16, 32, 64, 128 for one byte.',
      example: '11000000 bin = 128 + 64 = 192 dec = 0xC0 hex.',
    },
    {
      icon: 'fa-divide',
      title: 'Divide-and-remainder',
      desc: 'To convert decimal to binary or hex, repeatedly divide by the target base and collect remainders from bottom to top.',
      example: '13 dec ÷ 2 → remainders 1,0,1,1 → 1101 bin. 13 dec ÷ 16 → 13 rem → 0x0D hex.',
    },
    {
      icon: 'fa-table-cells',
      title: 'Nibbles link bin and hex',
      desc: 'One hex digit equals exactly four binary digits (a nibble). Group binary bits from the right in fours to read hex quickly.',
      example: '1111 1111 bin → 1111=0xF and 1111=0xF → 0xFF hex = 255 dec.',
    },
    {
      icon: 'fa-shuffle',
      title: 'Bitwise (preview)',
      desc: 'Once you read binary, bitwise AND/OR/XOR operate on individual bits. 5 dec & 3 dec = 101 bin & 011 bin = 001 bin = 1 dec.',
      example: 'Masking with 0x0F hex keeps the lowest four bits.',
    },
  ],
  demoType: 'number-bases',
  demoTitle: 'Base converter and practice',
  demoHint: 'Explore place values and division steps, then quiz yourself on decimal ↔ binary ↔ hex.',
  relatedIds: ['binary-encoding', 'memory-model', 'logical-operators'],
  keywords: ['decimal', 'binary', 'hex', 'base conversion', 'place value', 'nibble', 'bitwise', 'byte'],
  checklist: [
    'Convert a decimal number to binary using divide-by-2.',
    'Convert a decimal number to hex using divide-by-16 or nibble grouping.',
    'Explain why 0xFF hex equals 255 dec.',
    'Read a binary place-value row and compute the decimal total.',
  ],
});
