window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.dynamicProgramming = function (container) {
  const UI = DS.demoUI;
  const fib = [0, 1, 1, 2, 3, 5, 8];
  let n = 6;

  const render = () => {
    const table = fib.slice(0, n + 1).map((v, i) => `<div class="dp-cell"><small>f(${i})</small><strong>${v}</strong></div>`).join('');
    container.innerHTML = UI.shell({
      title: 'Fibonacci DP table',
      hint: 'Store sub-answers instead of recomputing: each cell uses prior cells.',
      stage: `
        <div class="dp-demo">
          <label>n = <input type="range" min="2" max="6" value="${n}" oninput="dpSetN(this.value)"> ${n}</label>
          <div class="dp-table">${table}</div>
          <p>f(n) = f(n-1) + f(n-2): build bottom-up in O(n) time.</p>
        </div>`,
      inspector: UI.inspector('DP', [
        ['f(n)', String(fib[n]), 'Result'],
        ['Subproblems', String(n + 1), 'Table entries'],
        ['Naive', 'O(2^n)', 'Without memo'],
      ]),
    });
  };
  window.dpSetN = (v) => { n = Number(v). Render(); };
  render();
};
