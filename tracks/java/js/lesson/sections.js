// One function per block of a lesson page. The page shape is:
// Picture → Idea → Code → Try it → Check (see docs/STYLE.md).
(function () {
  const L = Java.lesson;
  const { icons, escapeHtml, escapeAttribute, renderText, renderList, renderTextBlock } = L;

  function section(label, icon, body) {
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icon}${label}</div>
        ${body}
      </div>
    `;
  }

  // lesson.anim names a scene from hub/theme/anim/scenes.js (boxes, shelf, vending …).
  // The theme's player finds the host and brings it to life.
  function renderAnim(lesson) {
    if (!lesson.anim) return '';
    return `<div class="lesson-anim" data-anim="${escapeAttribute(lesson.anim)}"></div>`;
  }

  function renderPicture(lesson) {
    if (!lesson.realWorld && !lesson.anim) return '';
    return section('Picture', icons.picture, `
      ${lesson.realWorld ? `
      <div class="real-world">
        <div class="emoji">${lesson.icon || 'J'}</div>
        <div class="content">
          <div class="label">Think of it like this</div>
          <div class="text">${renderText(lesson.realWorld, lesson)}</div>
        </div>
      </div>` : ''}
      ${renderAnim(lesson)}
    `);
  }

  function renderIdea(lesson) {
    const why = lesson.why || (lesson.pros && lesson.pros[0]);
    const when = lesson.whenUse || (lesson.keyPoints && lesson.keyPoints[0]);
    const cards = [
      why ? `<div class="map-card"><div class="map-label">Why it exists</div>${renderTextBlock(why, lesson)}</div>` : '',
      when ? `<div class="map-card"><div class="map-label">When you use it</div>${renderTextBlock(when, lesson)}</div>` : ''
    ].join('');
    return section('The idea', icons.info, `
      <p class="def-text">${renderText(lesson.definition, lesson)}</p>
      ${cards ? `<div class="beginner-map">${cards}</div>` : ''}
    `);
  }

  function renderSyntax(lesson) {
    if (!lesson.syntax) return '';
    return section('How to write it', icons.syntax, `<div class="syntax-note">${renderText(lesson.syntax, lesson)}</div>`);
  }

  function renderPrimitiveTypes(lesson) {
    if (!lesson.primitiveTypes || !lesson.primitiveTypes.length) return '';
    return section('Primitive Type Cards', icons.syntax, `
      <div class="primitive-grid">
        ${lesson.primitiveTypes.map(type => `
          <article class="primitive-card ${type.emphasis ? 'emphasis' : ''}">
            <div class="primitive-top">
              <h3>${escapeHtml(type.name)}</h3>
              ${type.emphasis ? '<span>use this first</span>' : ''}
            </div>
            <dl>
              <div><dt>Size</dt><dd>${escapeHtml(type.size)}</dd></div>
              <div><dt>Range</dt><dd>${escapeHtml(type.range)}</dd></div>
              <div><dt>Default</dt><dd>${escapeHtml(type.defaultValue)}</dd></div>
            </dl>
            <div class="primitive-code">${escapeHtml(type.literalExamples)}</div>
            <p><strong>Use:</strong> ${renderText(type.whenUse, lesson)}</p>
            <p><strong>Watch:</strong> ${renderText(type.mistake, lesson)}</p>
          </article>
        `).join('')}
      </div>
    `);
  }

  function renderTable(lesson) {
    const table = lesson.table;
    if (!table || !table.rows || !table.rows.length) return '';
    return section(table.label || 'Table', icons.syntax, `
      <div class="lesson-table-wrap">
        <table class="lesson-table">
          <thead><tr>${table.head.map(cell => `<th>${renderText(cell, lesson)}</th>`).join('')}</tr></thead>
          <tbody>${table.rows.map(row => `<tr>${row.map(cell => `<td>${renderText(cell, lesson)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
      ${table.note ? `<p class="table-note">${renderText(table.note, lesson)}</p>` : ''}
    `);
  }

  function renderVisuals(lesson) {
    if (!lesson.visualHtml && !lesson.mermaid) return '';
    return section(lesson.visualLabel || 'Visual Model', icons.world, `
      <div class="visual-panel">
        ${lesson.mermaid ? `<pre class="mermaid">${escapeHtml(lesson.mermaid)}</pre>` : lesson.visualHtml}
        ${lesson.visualNote ? `<div class="diagram-note">${renderText(lesson.visualNote, lesson)}</div>` : ''}
      </div>
    `);
  }

  function renderPracticePrompts(lesson) {
    if (!lesson.practicePrompts || !lesson.practicePrompts.length) return '';
    return section('Practice Prompts', icons.check, `
      <div class="prompt-grid">
        ${lesson.practicePrompts.map(prompt => `
          <article class="prompt-card">
            <div class="prompt-level">${escapeHtml(prompt.level || 'Beginner')}</div>
            <h3>${renderText(prompt.title, lesson)}</h3>
            <p>${renderText(prompt.goal, lesson)}</p>
            ${prompt.checks && prompt.checks.length ? `<div class="prompt-subhead">Checks</div><ul>${renderList(prompt.checks, lesson)}</ul>` : ''}
            ${prompt.stretch ? `<div class="prompt-stretch">${renderText(prompt.stretch, lesson)}</div>` : ''}
          </article>
        `).join('')}
      </div>
    `);
  }

  function renderCodeExample(lesson) {
    if (!lesson.code) return '';
    const items = L.codeExplanationItems(lesson);
    return section(lesson.exampleLabel || 'Tiny example', icons.code, `
      <div class="code-summary">${renderText(L.summarizeCode(lesson), lesson)}</div>
      <div class="code-wrap">
        <div class="code-head">
          <div class="file">
            <div class="dots"><span></span><span></span><span></span></div>
            <span>${escapeHtml(lesson.fileName || `${lesson.title.replace(/\W+/g, '')}.java`)}</span>
          </div>
          <button class="copy-btn" onclick="copyCode(this)">copy</button>
        </div>
        <pre><code class="language-${lesson.codeLanguage || 'java'}">${escapeHtml(lesson.code)}</code></pre>
      </div>
      <details class="code-explain">
        <summary class="code-explain-title">Line by line</summary>
        <ol>
          ${items.map(item => `
            <li>
              <div class="walk-label">${escapeHtml(item.label || 'Step')}</div>
              ${item.code ? `<code>${escapeHtml(item.code)}</code>` : ''}
              <p>${renderText(item.text || '', lesson)}</p>
            </li>
          `).join('')}
        </ol>
      </details>
    `);
  }

  function renderCommands(lesson, config) {
    const commands = L.generatedJavaCommands(lesson, config);
    if (!commands.length) return '';
    return section(lesson.commandsLabel || 'Run it in the terminal', icons.code, `
      <div class="command-steps">
        ${commands.map(command => `
          <div class="command-step">
            <div>
              <div class="command-name">${renderText(command.label, lesson)}</div>
              <p>${renderText(command.note, lesson)}</p>
            </div>
            <pre><code>${escapeHtml(command.command)}</code></pre>
          </div>
        `).join('')}
      </div>
    `);
  }

  // tryIt: { steps: ['...'], see: '...', code?: '...', fileName?: '...' }
  function renderTryIt(tryIt, owner) {
    if (!tryIt || !tryIt.steps || !tryIt.steps.length) return '';
    return `
      <div class="box box-try">
        <div class="box-label">${icons.play}Try it</div>
        <ol>${renderList(tryIt.steps, owner)}</ol>
        ${tryIt.code ? `<pre class="box-code"><code class="language-${tryIt.codeLanguage || 'java'}">${escapeHtml(tryIt.code)}</code></pre>` : ''}
        ${tryIt.see ? `<p class="box-see"><strong>You should see:</strong> ${renderText(tryIt.see, owner)}</p>` : ''}
      </div>
    `;
  }

  // check: [{ q: '...', a: '...' }]
  function renderCheck(check, owner) {
    if (!check || !check.length) return '';
    return `
      <div class="box box-check">
        <div class="box-label">${icons.question}Check yourself</div>
        <ol>
          ${check.map(item => `
            <li>
              <p>${renderText(item.q, owner)}</p>
              <details><summary>Answer</summary><p>${renderText(item.a, owner)}</p></details>
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  }

  function renderPointsAndMistakes(lesson) {
    if (!(lesson.keyPoints || []).length && !(lesson.commonMistakes || []).length) return '';
    return `
      <div class="detail-section">
        <div class="pros-cons">
          <div class="pc-box pros">
            <div class="lbl">${icons.check}Remember</div>
            <ul>${renderList(lesson.keyPoints, lesson)}</ul>
          </div>
          <div class="pc-box cons">
            <div class="lbl">${icons.alert}Common Mistakes</div>
            <ul>${renderList(lesson.commonMistakes, lesson)}</ul>
          </div>
        </div>
      </div>
    `;
  }

  function renderProsCons(lesson) {
    if (!lesson.pros && !lesson.cons) return '';
    return `
      <div class="detail-section">
        <div class="pros-cons">
          <div class="pc-box pros"><div class="lbl">${icons.check}Pros</div><ul>${renderList(lesson.pros, lesson)}</ul></div>
          <div class="pc-box cons"><div class="lbl">${icons.alert}Cons</div><ul>${renderList(lesson.cons, lesson)}</ul></div>
        </div>
      </div>
    `;
  }

  Java.lesson = Object.assign(Java.lesson || {}, {
    section,
    renderAnim,
    renderPicture,
    renderIdea,
    renderSyntax,
    renderPrimitiveTypes,
    renderTable,
    renderVisuals,
    renderPracticePrompts,
    renderCodeExample,
    renderCommands,
    renderTryIt,
    renderCheck,
    renderPointsAndMistakes,
    renderProsCons
  });
})();
