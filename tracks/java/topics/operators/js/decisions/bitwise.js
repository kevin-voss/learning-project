Java.topics.operators.lessons.push(
  {
    id: 'bitwise-basics',
    num: '11',
    title: 'Bitwise Basics',
    category: 'deeper',
    icon: '&',
    tagline: 'Work with the single bits inside a number',
    realWorld: 'A row of light switches on a wall. Each switch is on or off. Together the row of switches makes a pattern, and you can change one switch without touching the others.',
    kid: [
      'Inside the computer, every number is a row of tiny switches called **bits**. Each bit is 0 (off) or 1 (on).',
      'The number 5 is the pattern `101`: on, off, on. The number 6 is `110`.',
      'Bitwise operators look at two rows of switches, one pair at a time. `&` says: "on only if both are on". `|` says: "on if one of them is on". `^` says: "on if they are different". And `~` flips every switch.'
    ],
    definition: 'Bitwise operators work on the binary digits (**bits**) of whole numbers: `&` (AND), `|` (OR), `^` (XOR) and `~` (NOT) combine or flip bits position by position, and the shift operators `<<`, `>>`, `>>>` move all bits left or right.',
    explain: [
      'A whole number is stored in **binary**: base 2, with only the digits 0 and 1. Each position is worth twice the position to its right: 1, 2, 4, 8, 16, and so on. `12` is `8 + 4`, so in binary it is `1100`.',
      'An `int` has 32 bits. The leftmost bit is the **sign bit**: 1 means negative. Java stores negative numbers in **two\'s complement** form, where `-1` is 32 ones. That is why `~12` (all bits flipped) is `-13`.',
      '`&`, `|` and `^` take two numbers and work on each bit position separately, like the truth tables in **Logical Operators**, with 1 for `true` and 0 for `false`.',
      'Shift operators move the whole bit pattern. `x << n` moves it `n` places to the left and fills with zeros; each place doubles the value. `x >> n` moves it right and keeps the sign; each place halves the value (rounding down). `x >>> n` moves right and fills with zeros, also for negative numbers.',
      'In everyday programs you rarely need these. You meet them with **flags** (many on/off settings packed into one number), file permissions, colours, network protocols and fast low-level code.'
    ],
    why: 'One `int` can hold 32 yes-or-no settings. Bit operators read and change single settings fast, without extra memory.',
    whenUse: 'Use them for flags and masks, when a file format or protocol defines bits, and to read code that does. For normal conditions use `&&` and `||`.',
    syntax: '`a & b`, `a | b`, `a ^ b`, `~a`, `a << n`, `a >> n`, `a >>> n`, and the compound forms `&=`, `|=`, `^=`, `<<=`, `>>=`, `>>>=`.',
    fileName: 'BitwiseBasics.java',
    code: `public class BitwiseBasics {
    public static void main(String[] args) {
        int a = 0b1100;   // 12, written as a binary literal
        int b = 0b1010;   // 10

        System.out.println("a & b  = " + (a & b));    // 1000
        System.out.println("a | b  = " + (a | b));    // 1110
        System.out.println("a ^ b  = " + (a ^ b));    // 0110
        System.out.println("~a     = " + (~a));       // all 32 bits flipped
        System.out.println("a << 1 = " + (a << 1));   // 11000
        System.out.println("a >> 2 = " + (a >> 2));   // 11

        // See the bits as text
        System.out.println("bits of a & b: " + Integer.toBinaryString(a & b));

        // Flags: one bit per permission
        final int READ = 0b001;
        final int WRITE = 0b010;
        final int RUN = 0b100;
        int permissions = READ | WRITE;
        System.out.println("can write: " + ((permissions & WRITE) != 0));
        System.out.println("can run:   " + ((permissions & RUN) != 0));
    }
}`,
    output: `a & b  = 8
a | b  = 14
a ^ b  = 6
~a     = -13
a << 1 = 24
a >> 2 = 3
bits of a & b: 1000
can write: true
can run:   false`,
    codeSummary: 'The four bit operators and two shifts on the same two numbers, then a small permission system that packs three flags into one `int`.',
    codeExplanation: [
      { label: 'Line 3', code: `int a = 0b1100;   // 12, written as a binary literal`, text: 'A literal that starts with `0b` is written in binary. `0b1100` is 8 + 4 = 12.' },
      { label: 'Line 6', code: `System.out.println("a & b  = " + (a & b));    // 1000`, text: 'Only the 8-bit is on in both numbers, so the result is 8.' },
      { label: 'Line 7', code: `System.out.println("a | b  = " + (a | b));    // 1110`, text: 'Every bit that is on in at least one number: 8 + 4 + 2 = 14.' },
      { label: 'Line 8', code: `System.out.println("a ^ b  = " + (a ^ b));    // 0110`, text: 'Bits that differ: 4 + 2 = 6.' },
      { label: 'Line 9', code: `System.out.println("~a     = " + (~a));       // all 32 bits flipped`, text: 'In two\'s complement, flipping all bits gives `-x - 1`, so `~12` is `-13`.' },
      { label: 'Line 10', code: `System.out.println("a << 1 = " + (a << 1));   // 11000`, text: 'Shift left by one: every bit moves up one place, which doubles the value.' },
      { label: 'Line 14', code: `System.out.println("bits of a & b: " + Integer.toBinaryString(a & b));`, text: '`Integer.toBinaryString` returns the bits as text, without leading zeros. Very useful for checking.' },
      { label: 'Line 17', code: `final int READ = 0b001;`, text: 'A constant with exactly one bit on. `final` means it cannot change; constants are written in capital letters.' },
      { label: 'Line 20', code: `int permissions = READ | WRITE;`, text: '`|` switches on both bits: `011`.' },
      { label: 'Line 21', code: `System.out.println("can write: " + ((permissions & WRITE) != 0));`, text: '`&` with a one-bit mask keeps only that bit. If the result is not 0, the flag is set.' }
    ],
    sections: [
      {
        title: 'Binary in one minute',
        text: [
          'In decimal, places are worth 1, 10, 100, 1000. In binary, places are worth 1, 2, 4, 8, 16. A 1 in a place means "add this value"; a 0 means "skip it".',
          'Read `1101` from the right: 1 × 1, 0 × 2, 1 × 4, 1 × 8. Sum: 13.'
        ],
        table: {
          head: ['Decimal', '8', '4', '2', '1', 'Binary literal'],
          rows: [
            ['`1`', '0', '0', '0', '1', '`0b0001`'],
            ['`5`', '0', '1', '0', '1', '`0b0101`'],
            ['`10`', '1', '0', '1', '0', '`0b1010`'],
            ['`12`', '1', '1', '0', '0', '`0b1100`'],
            ['`15`', '1', '1', '1', '1', '`0b1111`']
          ],
          note: 'Java also has hexadecimal literals with `0x` (base 16): `0xFF` is 255, eight bits all on.'
        }
      },
      {
        title: 'AND, OR, XOR and NOT bit by bit',
        text: [
          'Write the two numbers above each other and look at one column at a time. Each column follows the truth table of its operator.'
        ],
        table: {
          head: ['', 'bit 8', 'bit 4', 'bit 2', 'bit 1', 'value'],
          rows: [
            ['`a`', '1', '1', '0', '0', '`12`'],
            ['`b`', '1', '0', '1', '0', '`10`'],
            ['`a & b` (both 1)', '1', '0', '0', '0', '`8`'],
            ['`a | b` (at least one 1)', '1', '1', '1', '0', '`14`'],
            ['`a ^ b` (different)', '0', '1', '1', '0', '`6`'],
            ['`~a` (flip; all 32 bits)', '0', '0', '1', '1', '`-13`']
          ],
          note: 'For `~a` only the last four bits are shown. The 28 bits to the left, including the sign bit, flip from 0 to 1, which makes the number negative.'
        },
        warn: '`2 ^ 3` is not "2 to the power of 3". It is XOR: `010 ^ 011` = `001` = `1`. For powers use `Math.pow`.'
      },
      {
        title: 'Shifts',
        text: [
          '`<<` moves bits to the left. New bits on the right are 0. Each step multiplies by 2: `1 << 10` is 1024.',
          '`>>` moves bits to the right and copies the sign bit into the new places, so negative numbers stay negative. Each step divides by 2, rounding down: `-16 >> 2` is `-4`.',
          '`>>>` moves bits to the right and always fills with 0. On a negative number the result becomes a big positive number.'
        ],
        mermaid: 'flowchart LR\n  A["0000 0110 (6)"] -->|"<< 1"| B["0000 1100 (12)"]\n  B -->|"<< 1"| C["0001 1000 (24)"]\n  C -->|">> 2"| D["0000 0110 (6)"]',
        diagramNote: 'Shifting left doubles, shifting right halves. Bits that fall off the end are lost.',
        fileName: 'Shifts.java',
        code: `public class Shifts {
    public static void main(String[] args) {
        System.out.println(1 << 10);        // 1024
        System.out.println(5 << 2);         // 5 * 4
        System.out.println(100 >> 3);       // 100 / 8, rounded down
        System.out.println(-16 >> 2);       // sign is kept
        System.out.println(-16 >>> 28);     // zeros come in from the left
        System.out.println(1 << 33);        // shift distance is taken % 32
    }
}`,
        output: `1024
20
12
-4
15
2`,
        tip: 'For an `int`, only the lowest 5 bits of the shift distance count. So `1 << 33` is `1 << 1`. For `long` it is the lowest 6 bits.'
      },
      {
        title: 'Flags: set, clear, toggle, check',
        text: [
          'A **flag** is one bit that means one yes-or-no setting. A **mask** is a number with exactly the bits on that you want to look at or change.',
          'Four patterns cover almost everything you do with flags.'
        ],
        table: {
          head: ['Job', 'Code', 'Why it works'],
          rows: [
            ['set a flag', '`p |= RUN`', '`| 1` turns a bit on, `| 0` leaves it'],
            ['clear a flag', '`p &= ~WRITE`', '`~WRITE` has every bit on except WRITE; `&` keeps all others'],
            ['toggle a flag', '`p ^= READ`', '`^ 1` flips a bit, `^ 0` leaves it'],
            ['check a flag', '`(p & RUN) != 0`', '`&` keeps only the RUN bit']
          ]
        },
        fileName: 'Flags.java',
        code: `public class Flags {
    public static void main(String[] args) {
        final int READ = 1;      // 001
        final int WRITE = 2;     // 010
        final int RUN = 4;       // 100

        int p = READ | WRITE;
        System.out.println("start:        " + Integer.toBinaryString(p));

        p |= RUN;
        System.out.println("set RUN:      " + Integer.toBinaryString(p));

        p &= ~WRITE;
        System.out.println("clear WRITE:  " + Integer.toBinaryString(p));

        p ^= READ;
        System.out.println("toggle READ:  " + Integer.toBinaryString(p));

        System.out.println("has RUN:      " + ((p & RUN) != 0));
        System.out.println("has READ:     " + ((p & READ) != 0));
    }
}`,
        output: `start:        11
set RUN:      111
clear WRITE:  101
toggle READ:  100
has RUN:      true
has READ:     false`
      },
      {
        title: '& versus && and the precedence trap',
        text: [
          'On `boolean` values, `&` and `|` are logical operators without short-circuit (see **Logical Operators**). On whole numbers they are bit operators. `&&` and `||` work only on `boolean`.',
          'The bit operators have a **lower** precedence than `==`. So `n & 1 == 0` means `n & (1 == 0)`, which is `int & boolean` and does not compile. Always put parentheses around a bit operation inside a comparison.'
        ],
        fileName: 'EvenWithBits.java',
        code: `public class EvenWithBits {
    public static void main(String[] args) {
        int n = 14;
        // The lowest bit is 1 for odd numbers, 0 for even numbers
        System.out.println(n + " is even: " + ((n & 1) == 0));

        int m = -7;
        System.out.println(m + " is even: " + ((m & 1) == 0));

        boolean x = true;
        boolean y = false;
        System.out.println("x & y on booleans: " + (x & y));
    }
}`,
        output: `14 is even: true
-7 is even: false
x & y on booleans: false`,
        warn: 'Write `(n & 1) == 0`, never `n & 1 == 0`. For normal code, `n % 2 == 0` is clearer and as fast.'
      }
    ],
    technical: [
      '`javac` maps the operators to single bytecode instructions: `iand`, `ior`, `ixor`, `ishl` (`<<`), `ishr` (`>>`), `iushr` (`>>>`), and the `l…` versions for `long`. There is no NOT instruction: `~x` is compiled as `x ^ -1`, because `-1` has all 32 bits on.',
      '**Two\'s complement**: to get `-x`, flip all bits of `x` and add 1. That is why `~x == -x - 1`. It also means there is one more negative number than positive ones: the `int` range is -2147483648 to 2147483647.',
      'Like arithmetic, bit operators apply numeric promotion: `byte` and `short` operands become `int` first. `byte b = 1; b = b << 1;` does not compile, but `b <<= 1` does (the hidden cast of compound assignment, see **Assignment**).',
      'The JDK has helpers so you do not need tricks: `Integer.bitCount(x)` counts the 1 bits, `Integer.highestOneBit(x)`, `Integer.toHexString(x)`. For sets of flags with names, Java has `EnumSet`, which the topic [Enums](../enums/index.html) introduces; it uses bits inside.'
    ],
    tryIt: {
      steps: [
        'Create `Bits.java`.',
        'Print `Integer.toBinaryString(42)`.',
        'Print `42 & 15`, `42 | 1` and `42 >> 1`.',
        'Print `2 ^ 3` and `Math.pow(2, 3)` to see the difference.'
      ],
      see: '`101010`, then `10`, `43` and `21`, then `1` and `8.0`.'
    },
    check: [
      { q: 'What is `6 & 3`?', a: '`2`. `110 & 011` = `010`.' },
      { q: 'How do you check if bit `WRITE` is set in `p`?', a: '`(p & WRITE) != 0`. The parentheses are needed because `&` has a lower precedence than `!=`.' },
      { q: 'What is the difference between `>>` and `>>>`?', a: '`>>` fills the new left bits with the sign bit, so negative numbers stay negative. `>>>` always fills with 0.' }
    ],
    keyPoints: [
      'Bits are the binary digits of a number; place values are 1, 2, 4, 8, ….',
      '`&` both, `|` at least one, `^` different, `~` flip all, bit by bit.',
      '`<<` doubles per step; `>>` halves and keeps the sign; `>>>` fills with 0.',
      'Flags: set with `|=`, clear with `&= ~`, toggle with `^=`, check with `(p & FLAG) != 0`.',
      'Bit operators bind more weakly than `==`: use parentheses.'
    ],
    commonMistakes: [
      'Using `^` as a power: `2 ^ 3` is `1`. Use `Math.pow(2, 3)`.',
      'Writing `n & 1 == 0`. Write `(n & 1) == 0`.',
      'Using `&` instead of `&&` in a condition. `&` does not short-circuit.',
      'Expecting `-16 >>> 2` to be `-4`. `>>>` fills with zeros and gives a big positive number. Use `>>` for division by powers of two.'
    ],
    related: ['Logical Operators', 'Assignment', 'Precedence and Associativity', 'Types and Variables'],
    glossary: [
      { term: 'bit', definition: 'One binary digit: 0 or 1. An int has 32 of them.' },
      { term: 'mask', definition: 'A number with exactly the bits on that you want to read or change.' },
      { term: 'flag', definition: 'One bit that stands for one yes-or-no setting.' },
      { term: 'two\'s complement', definition: 'How Java stores negative whole numbers: flip all bits of x and add 1 to get -x.' }
    ]
  }
);
