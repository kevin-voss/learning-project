window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.bigO = function (container) {
  const UI = DS.demoUI;
  let n = 10;
  let mode = 'constant';

  const ops = () => {
    if (mode === 'constant') return 1;
    if (mode === 'linear') return n;
    if (mode === 'quadratic') return n * n;
    if (mode === 'logarithmic') return Math.max(1, Math.ceil(Math.log2(n)));
    return 1;
  };

  const label = () => ({
    constant: 'O(1): one step no matter the size',
    linear: 'O(n): work grows with n',
    quadratic: 'O(n²): nested loops over n',
    logarithmic: 'O(log n): halve the problem each step',
  }[mode]);

  const render = () => {
    const count = ops();
    const bars = Math.min(count, 80);
    UI.mount(container, {
      title: 'Big-O growth explorer',
      hint: 'Slide input size n and compare how operation counts grow for different complexity classes.',
      stage: `
        <div class="bigo-demo">
          <div class="bigo-controls">
            <label>n = <input type="range" min="1" max="50" value="${n}" id="bigoN" oninput="bigoUpdateN(this.value)"> <strong id="bigoNVal">${n}</strong></label>
            <div class="demo-controls">
              <button type="button" class="demo-btn ${mode === 'constant' ? 'success' : ''}" onclick="bigoSetMode('constant')">O(1)</button>
              <button type="button" class="demo-btn ${mode === 'logarithmic' ? 'success' : ''}" onclick="bigoSetMode('logarithmic')">O(log n)</button>
              <button type="button" class="demo-btn ${mode === 'linear' ? 'success' : ''}" onclick="bigoSetMode('linear')">O(n)</button>
              <button type="button" class="demo-btn ${mode === 'quadratic' ? 'success' : ''}" onclick="bigoSetMode('quadratic')">O(n²)</button>
            </div>
          </div>
          <p class="bigo-caption">${UI.esc(label())}</p>
          <div class="bigo-bars" aria-label="Operation count visualization">
            ${Array.from({ length: bars }, (_, i) => `<div class="bigo-bar" style="--h:${Math.max(4, 100 - i * (80 / bars))}%"></div>`).join('')}
          </div>
          <p class="bigo-count"><strong>${count}</strong> operations at n = ${n}</p>
        </div>`,
      inspector: UI.inspector('Inspector', [
        ['Input size n', String(n), 'Number of items in the problem'],
        ['Complexity', mode, 'Growth class being simulated'],
        ['Operations', String(count), 'Rough step count for this n'],
        ['At n=50', String(mode === 'constant' ? 1 : mode === 'linear' ? 50 : mode === 'quadratic' ? 2500 : 6), 'Preview at max slider'],
      ]),
    });
  };

  window.bigoUpdateN = (val) => { n = Number(val); render(); };
  window.bigoSetMode = (m) => { mode = m; render(); };
  render();
};
