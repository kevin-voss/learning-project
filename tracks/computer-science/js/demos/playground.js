window.DS = window.DS || {};

/**
 * Shared guided + freeform playground shell (pattern from linux-terminal).
 */
DS.playground = {
  esc(s) {
    return DS.demoUI.esc(s);
  },

  shell({ title, hint, guidedHtml, playgroundHtml, inspectorRows }) {
    const UI = DS.demoUI;
    return UI.shell({
      title,
      hint,
      stage: `
        <div class="playground-demo">
          <section class="playground-guided" aria-label="Guided steps">${guidedHtml}</section>
          <section class="playground-free" aria-label="Playground">${playgroundHtml}</section>
        </div>`,
      inspector: UI.inspector('Playground', inspectorRows),
    });
  },

  guidedSteps(steps, activeIndex) {
    const s = steps[activeIndex];
    return `
      <div class="playground-guided-head">
        <span>Step ${activeIndex + 1} / ${steps.length}</span>
        <strong>${this.esc(s.title)}</strong>
      </div>
      <p>${this.esc(s.detail)}</p>
      <pre class="playground-preview">${this.esc(s.preview || '')}</pre>
      <div class="demo-controls">
        <button type="button" class="demo-btn" onclick="${s.onPrev}" ${activeIndex === 0 ? 'disabled' : ''}>Previous</button>
        <button type="button" class="demo-btn success" onclick="${s.onNext}" ${activeIndex === steps.length - 1 ? 'disabled' : ''}>Next</button>
      </div>`;
  },

  inputBar({ inputId, runHandler, placeholder, quickButtons = [] }) {
    return `
      <div class="playground-input-row">
        <input type="text" class="demo-input" id="${inputId}" placeholder="${this.esc(placeholder)}" aria-label="Playground input"
          onkeydown="if(event.key==='Enter')${runHandler}()">
        <button type="button" class="demo-btn success" onclick="${runHandler}()">Run</button>
      </div>
      ${quickButtons.length ? `
        <div class="playground-quick">
          ${quickButtons.map(b => `
            <button type="button" class="demo-btn" onclick="document.getElementById('${inputId}').value='${this.esc(b)}';${runHandler}()">${this.esc(b)}</button>
          `).join('')}
        </div>` : ''}
      <div class="playground-output" id="${inputId}-out" aria-live="polite"></div>`;
  },
};
