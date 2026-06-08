window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.greedyAlgorithms = function (container) {
  const UI = DS.demoUI;
  const coins = [25, 10, 5, 1];
  let amount = 67;
  const greedy = (a) => {
    const out = [];
    let left = a;
    for (const c of coins) {
      const n = Math.floor(left / c);
      if (n) { out.push({ c, n }); left -= n * c; }
    }
    return out;
  };

  const render = () => {
    const picks = greedy(amount);
    container.innerHTML = UI.shell({
      title: 'Coin change (greedy)',
      hint: 'Always take the largest coin that fits — works for US coins, not all coin systems.',
      stage: `
        <div class="greedy-demo">
          <label>Amount: <input type="number" class="demo-input" id="greedyAmt" value="${amount}" min="1" max="99" onchange="greedySetAmt(this.value)"></label>
          <div class="greedy-picks">${picks.map(p => `<span class="greedy-chip">${p.n}×${p.c}¢</span>`).join('')}</div>
          <p>Total coins: ${picks.reduce((s, p) => s + p.n, 0)}</p>
        </div>`,
      inspector: UI.inspector('Greedy', [
        ['Amount', String(amount) + '¢', 'Target'],
        ['Strategy', 'Largest first', 'Local optimum each step'],
        ['Coins used', String(picks.reduce((s, p) => s + p.n, 0)), 'Count'],
      ]),
    });
  };
  window.greedySetAmt = (v) => { amount = Math.max(1, Number(v) || 1); render(); };
  render();
};
