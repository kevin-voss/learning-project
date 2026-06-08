window.DS = window.DS || {};
DS.curriculum = DS.curriculum || [];

DS.curriculum.push({
  id: 'buffers-ring-buffers',
  category: 'Computer Internals',
  title: 'Buffers and Ring Buffers',
  icon: 'fa-compact-disc',
  number: '17',
  subtitle: 'A buffer is temporary storage used when data arrives at a different speed than it is processed.',
  analogy: 'A buffer is like a waiting tray at a restaurant. The kitchen may finish dishes before the waiter is ready. The tray holds dishes temporarily so nothing gets lost.',
  realWorldExample: {
    title: 'Keyboard input buffer',
    desc: 'You can type several keys quickly while an app is busy. The operating system keeps those key events in a buffer so the app can read them when it is ready.',
  },
  whatIsIt: 'A buffer is a temporary memory area. A ring buffer is a fixed-size buffer that wraps around to the beginning when it reaches the end. Instead of moving all items, it moves head and tail indexes. This makes it useful for streams like keyboard events, audio samples, logs, and network packets.',
  whyUse: 'Buffers connect data structures to hardware and the operating system. Devices and programs rarely run at exactly the same speed. A network card may receive packets while your app is still processing old ones. Audio needs steady samples. A ring buffer uses fixed memory and avoids shifting items around.',
  whenToUse: [
    { icon: 'fa-keyboard', title: 'Input events', desc: 'Keyboard and mouse events wait until a program reads them.' },
    { icon: 'fa-volume-high', title: 'Audio streaming', desc: 'Audio samples need a steady queue to avoid glitches.' },
    { icon: 'fa-network-wired', title: 'Network packets', desc: 'Packets wait in buffers before the OS or app processes them.' },
    { icon: 'fa-scroll', title: 'Logs', desc: 'Keep only the most recent N events in fixed memory.' },
  ],
  codeExample: `<span class="cm">// Ring buffer idea</span>
<span class="kw">const</span> buffer <span class="op">=</span> <span class="kw">new</span> <span class="cls">Array</span>(<span class="num">4</span>);
<span class="kw">let</span> head <span class="op">=</span> <span class="num">0</span>;
<span class="kw">let</span> tail <span class="op">=</span> <span class="num">0</span>;

<span class="kw">function</span> <span class="fn">write</span>(value) {
  buffer[tail] <span class="op">=</span> value;
  tail <span class="op">=</span> (tail <span class="op">+</span> <span class="num">1</span>) <span class="op">%</span> buffer.length; <span class="cm">// wrap around</span>
}

<span class="kw">function</span> <span class="fn">read</span>() {
  <span class="kw">const</span> value <span class="op">=</span> buffer[head];
  head <span class="op">=</span> (head <span class="op">+</span> <span class="num">1</span>) <span class="op">%</span> buffer.length;
  <span class="kw">return</span> value;
}`,
  complexity: [
    { op: 'Write one item', time: 'O(1)', badge: 'fast' },
    { op: 'Read one item', time: 'O(1)', badge: 'fast' },
    { op: 'Scan buffer contents', time: 'O(n)', badge: 'slow' },
  ],
  pros: [
    'Avoids shifting items in memory',
    'Uses fixed memory, which is useful near hardware',
    'Explains queues in audio, input, networking, and logs',
  ],
  cons: [
    'Fixed size means it can overflow',
    'Head and tail wraparound can be confusing',
    'Needs careful handling when full or empty',
  ],
});
