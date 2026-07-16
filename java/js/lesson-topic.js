(function () {
  const icons = {
    info: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    world: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    code: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    syntax: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5M8 17h7"/></svg>',
    check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    alert: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    link: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
  };

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttribute(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function renderText(str, lesson) {
    const glossary = (lesson.glossary || []).concat(Java.glossary || []);
    if (!glossary.length) return escapeHtml(str);

    const terms = glossary
      .slice()
      .sort((a, b) => b.term.length - a.term.length);
    let html = '';
    let index = 0;

    while (index < str.length) {
      const match = terms.find(item => {
        const candidate = str.slice(index, index + item.term.length);
        const before = str[index - 1] || '';
        const after = str[index + item.term.length] || '';
        return candidate.toLowerCase() === item.term.toLowerCase()
          && !/[\w-]/.test(before)
          && !/[\w-]/.test(after);
      });

      if (match) {
        const found = str.slice(index, index + match.term.length);
        html += `<span class="term" tabindex="0" data-tip="${escapeAttribute(match.definition)}">${escapeHtml(found)}</span>`;
        index += match.term.length;
      } else {
        html += escapeHtml(str[index]);
        index += 1;
      }
    }

    return html;
  }

  function renderList(items, lesson) {
    return items.map(item => `<li>${renderText(item, lesson)}</li>`).join('');
  }

  function renderSyntax(lesson) {
    if (!lesson.syntax) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.syntax}Syntax</div>
        <div class="syntax-note">${renderText(lesson.syntax, lesson)}</div>
      </div>
    `;
  }

  function renderProsCons(lesson) {
    if (!lesson.pros && !lesson.cons) return '';
    return `
      <div class="detail-section">
        <div class="pros-cons">
          <div class="pc-box pros">
            <div class="lbl">${icons.check}Pros</div>
            <ul>${renderList(lesson.pros || [], lesson)}</ul>
          </div>
          <div class="pc-box cons">
            <div class="lbl">${icons.alert}Cons</div>
            <ul>${renderList(lesson.cons || [], lesson)}</ul>
          </div>
        </div>
      </div>
    `;
  }

  function renderTextBlock(value, lesson) {
    if (!value) return '';
    if (Array.isArray(value)) return `<ul>${renderList(value, lesson)}</ul>`;
    return `<p>${renderText(value, lesson)}</p>`;
  }

  function lessonWhy(lesson) {
    if (lesson.why) return lesson.why;
    if (lesson.pros && lesson.pros.length) return lesson.pros[0];
    return 'It gives the program a clear rule, shape, or tool so the next person reading the code can predict what will happen.';
  }

  function lessonWhen(lesson) {
    if (lesson.whenUse) return lesson.whenUse;
    if (lesson.keyPoints && lesson.keyPoints.length) return lesson.keyPoints[0];
    return 'Use it when the problem matches the idea and the code becomes easier to explain, not just shorter.';
  }

  function renderBeginnerMap(lesson) {
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.info}Beginner Map</div>
        <div class="beginner-map">
          <div class="map-card">
            <div class="map-label">What it is</div>
            ${renderTextBlock(lesson.what || lesson.definition, lesson)}
          </div>
          <div class="map-card">
            <div class="map-label">Why it exists</div>
            ${renderTextBlock(lessonWhy(lesson), lesson)}
          </div>
          <div class="map-card">
            <div class="map-label">How to think about it</div>
            ${renderTextBlock(lesson.howThink || lesson.realWorld, lesson)}
          </div>
          <div class="map-card">
            <div class="map-label">When beginners use it</div>
            ${renderTextBlock(lessonWhen(lesson), lesson)}
          </div>
        </div>
      </div>
    `;
  }

  function renderCommands(lesson) {
    if (!lesson.commands || !lesson.commands.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.code}Ubuntu Terminal Commands</div>
        <div class="command-steps">
          ${lesson.commands.map(command => `
            <div class="command-step">
              <div>
                <div class="command-name">${renderText(command.label, lesson)}</div>
                <p>${renderText(command.note, lesson)}</p>
              </div>
              <pre><code>${escapeHtml(command.command)}</code></pre>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderPrimitiveTypes(lesson) {
    if (!lesson.primitiveTypes || !lesson.primitiveTypes.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.syntax}Primitive Type Cards</div>
        <div class="primitive-grid">
          ${lesson.primitiveTypes.map(type => `
            <article class="primitive-card ${type.emphasis ? 'emphasis' : ''}">
              <div class="primitive-top">
                <h3>${escapeHtml(type.name)}</h3>
                ${type.emphasis ? '<span>beginner-practical</span>' : ''}
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
      </div>
    `;
  }

  function renderStatusCodes(lesson) {
    if (!lesson.statusCodes || !lesson.statusCodes.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.world}Common Practical Status Codes</div>
        <div class="status-grid">
          ${lesson.statusCodes.map(status => `
            <article class="status-card status-${String(status.code)[0]}xx">
              <div class="status-code">${status.code} <span>${escapeHtml(status.name)}</span></div>
              <p>${renderText(status.happened, lesson)}</p>
              <code>${escapeHtml(status.example)}</code>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderVisuals(lesson) {
    if (!lesson.visualHtml && !lesson.mermaid) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.world}${lesson.visualLabel || 'Visual Model'}</div>
        <div class="visual-panel">
          ${lesson.mermaid ? `<pre class="mermaid">${escapeHtml(lesson.mermaid)}</pre>` : lesson.visualHtml}
          ${lesson.visualNote ? `<div class="diagram-note">${renderText(lesson.visualNote, lesson)}</div>` : ''}
        </div>
      </div>
    `;
  }

  function renderPracticePrompts(lesson) {
    if (!lesson.practicePrompts || !lesson.practicePrompts.length) return '';
    return `
      <div class="detail-section">
        <div class="detail-section-label">${icons.check}Practice Prompts</div>
        <div class="prompt-grid">
          ${lesson.practicePrompts.map(prompt => `
            <article class="prompt-card">
              <div class="prompt-level">${escapeHtml(prompt.level || 'Beginner')}</div>
              <h3>${renderText(prompt.title, lesson)}</h3>
              <p>${renderText(prompt.goal, lesson)}</p>
              ${prompt.checks && prompt.checks.length ? `
                <div class="prompt-subhead">Checks</div>
                <ul>${renderList(prompt.checks, lesson)}</ul>
              ` : ''}
              ${prompt.stretch ? `<div class="prompt-stretch">${renderText(prompt.stretch, lesson)}</div>` : ''}
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderMermaidDiagrams(root) {
    if (!window.mermaid) return;

    if (!window._javaHubMermaidReady) {
      window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'strict',
        themeVariables: {
          background: '#0a0d18',
          primaryColor: '#111827',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#475569',
          lineColor: '#2dd4bf',
          secondaryColor: '#1e293b',
          tertiaryColor: '#111827',
          fontFamily: 'Manrope, sans-serif'
        }
      });
      window._javaHubMermaidReady = true;
    }

    const nodes = root.querySelectorAll('.mermaid');
    if (!nodes.length) return;

    window.mermaid.run({ nodes }).catch(() => {
      nodes.forEach(node => {
        node.classList.add('mermaid-error');
      });
    });
  }

  function ensureTermPopover() {
    let popover = document.getElementById('termPopover');
    if (!popover) {
      popover = document.createElement('div');
      popover.id = 'termPopover';
      popover.className = 'term-popover';
      document.body.appendChild(popover);
    }
    return popover;
  }

  function placeTermPopover(term, popover) {
    const gap = 10;
    const rect = term.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - popRect.width / 2;
    let top = rect.top - popRect.height - gap;

    left = Math.max(12, Math.min(left, window.innerWidth - popRect.width - 12));
    if (top < 12) top = rect.bottom + gap;
    if (top + popRect.height > window.innerHeight - 12) {
      top = Math.max(12, window.innerHeight - popRect.height - 12);
    }

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function attachTermTooltips(root) {
    const popover = ensureTermPopover();
    const show = event => {
      const term = event.currentTarget;
      popover.textContent = term.dataset.tip;
      popover.classList.add('show');
      placeTermPopover(term, popover);
    };
    const hide = () => popover.classList.remove('show');

    root.querySelectorAll('.term').forEach(term => {
      term.addEventListener('mouseenter', show);
      term.addEventListener('focus', show);
      term.addEventListener('click', show);
      term.addEventListener('mouseleave', hide);
      term.addEventListener('blur', hide);
    });
  }

  function renderLessonTopic(config) {
    const topic = Java.topics[config.namespace];
    const categories = topic.categories;
    const lessons = topic.lessons;
    let selectedId = lessons[0].id;

    function groupedLessons() {
      return lessons.reduce((groups, lesson) => {
        if (!groups[lesson.category]) groups[lesson.category] = [];
        groups[lesson.category].push(lesson);
        return groups;
      }, {});
    }

    function renderRoadmap() {
      const container = document.getElementById('roadmap');
      const byCategory = groupedLessons();
      let html = '';

      Object.keys(categories).forEach(catKey => {
        const cat = categories[catKey];
        const items = byCategory[catKey] || [];
        if (!items.length) return;

        html += `
          <div class="lane" style="--lane-color: ${cat.color}; --lane-bg: ${cat.bg}; --lane-glow: ${cat.glow};">
            <div class="lane-head">
              <span class="lane-tag">${cat.name}</span>
              <span class="lane-name">${cat.desc}</span>
              <span class="lane-desc">${items.length} lesson${items.length > 1 ? 's' : ''}</span>
            </div>
            <div class="lane-track">
              ${items.map(lesson => `
                <div class="pattern-card ${lesson.id === selectedId ? 'active' : ''}"
                     data-id="${lesson.id}"
                     tabindex="0"
                     role="button"
                     aria-label="View ${lesson.title}">
                  <div class="num">${lesson.num} · ${cat.name}</div>
                  <div class="name"><span class="icon">${lesson.icon || '•'}</span>${lesson.title}</div>
                  <div class="tag">${lesson.tagline}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      container.querySelectorAll('.pattern-card').forEach(card => {
        const handler = () => selectLesson(card.dataset.id);
        card.addEventListener('click', handler);
        card.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
          }
        });
      });
    }

    function renderSidebar() {
      const sidebar = document.getElementById('sidebar');
      let html = '';

      Object.keys(categories).forEach(catKey => {
        const cat = categories[catKey];
        const items = lessons.filter(lesson => lesson.category === catKey);
        if (!items.length) return;

        html += `
          <div class="sidebar-group">
            <div class="sidebar-group-head" style="color: ${cat.color};">
              <span style="width:8px; height:8px; border-radius:50%; background: ${cat.color}; display:inline-block;"></span>
              ${cat.name}
            </div>
            ${items.map(lesson => `
              <div class="sidebar-item ${lesson.id === selectedId ? 'active' : ''}"
                   data-id="${lesson.id}"
                   tabindex="0"
                   role="button">
                <span class="marker" style="background: ${cat.color};"></span>
                <span>${lesson.title}</span>
                <span class="num">${lesson.num}</span>
              </div>
            `).join('')}
          </div>
        `;
      });

      sidebar.innerHTML = html;
      sidebar.querySelectorAll('.sidebar-item').forEach(item => {
        const handler = () => selectLesson(item.dataset.id);
        item.addEventListener('click', handler);
        item.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
          }
        });
      });
    }

    function renderDetail() {
      const lesson = lessons.find(item => item.id === selectedId);
      const cat = categories[lesson.category];
      const detail = document.getElementById('detail');

      detail.style.setProperty('--pattern-color', cat.color);
      detail.style.setProperty('--pattern-bg', cat.bg);

      detail.innerHTML = `
        <div class="detail-head">
          <div class="detail-cat">${cat.name} · ${lesson.num} / ${lessons.length}</div>
          <h1 class="detail-title">${lesson.title}</h1>
          <p class="detail-tagline">${lesson.tagline}</p>
        </div>
        <div class="detail-body">
          <div class="detail-section">
            <div class="detail-section-label">${icons.info}Definition</div>
            <p class="def-text">${renderText(lesson.definition, lesson)}</p>
          </div>

          ${renderBeginnerMap(lesson)}

          <div class="detail-section">
            <div class="detail-section-label">${icons.world}Real-World Analogy</div>
            <div class="real-world">
              <div class="emoji">${lesson.icon || 'J'}</div>
              <div class="content">
                <div class="label">Think of it like this</div>
                <div class="text">${renderText(lesson.realWorld, lesson)}</div>
              </div>
            </div>
          </div>

          ${renderSyntax(lesson)}

          ${renderCommands(lesson)}

          ${renderPrimitiveTypes(lesson)}

          ${renderStatusCodes(lesson)}

          ${renderVisuals(lesson)}

          ${renderPracticePrompts(lesson)}

          <div class="detail-section">
            <div class="detail-section-label">${icons.code}${lesson.exampleLabel || 'Java 21 LTS Example'}</div>
            <div class="code-wrap">
              <div class="code-head">
                <div class="file">
                  <div class="dots"><span></span><span></span><span></span></div>
                  <span>${lesson.fileName || `${lesson.title.replace(/\W+/g, '')}.java`}</span>
                </div>
                <button class="copy-btn" onclick="copyCode(this)">copy</button>
              </div>
              <pre><code class="language-${lesson.codeLanguage || 'java'}">${escapeHtml(lesson.code)}</code></pre>
            </div>
          </div>

          <div class="detail-section">
            <div class="pros-cons">
              <div class="pc-box pros">
                <div class="lbl">${icons.check}Key Points</div>
                <ul>${renderList(lesson.keyPoints, lesson)}</ul>
              </div>
              <div class="pc-box cons">
                <div class="lbl">${icons.alert}Common Mistakes</div>
                <ul>${renderList(lesson.commonMistakes, lesson)}</ul>
              </div>
            </div>
          </div>

          ${renderProsCons(lesson)}

          <div class="detail-section">
            <div class="detail-section-label">${icons.link}Related Lessons</div>
            <div class="related">
              ${lesson.related.map(item => `<span class="related-chip" onclick="jumpToLesson('${item}')">${item}</span>`).join('')}
            </div>
          </div>
        </div>
      `;

      detail.querySelectorAll('pre code').forEach(block => {
        if (window.hljs) hljs.highlightElement(block);
      });
      renderMermaidDiagrams(detail);
      attachTermTooltips(detail);
    }

    function selectLesson(id) {
      selectedId = id;
      renderRoadmap();
      renderSidebar();
      renderDetail();

      const detailSection = document.getElementById('detail-section');
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    window.jumpToLesson = function jumpToLesson(value) {
      const found = lessons.find(lesson => lesson.id === value || lesson.title === value);
      if (found) {
        selectLesson(found.id);
      } else {
        showToast(`${value} belongs to another topic in the basics path.`);
      }
    };

    renderRoadmap();
    renderSidebar();
    renderDetail();
  }

  window.copyCode = function copyCode(btn) {
    const code = btn.closest('.code-wrap').querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = 'copied!';
      btn.classList.add('copied');
      showToast('Code copied to clipboard');
      setTimeout(() => {
        btn.textContent = 'copy';
        btn.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      showToast('Copy failed — select manually');
    });
  };

  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.querySelector('span').textContent = msg;
    toast.classList.add('show');
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  Java.renderLessonTopic = renderLessonTopic;
})();
