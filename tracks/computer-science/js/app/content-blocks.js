window.DS = window.DS || {};

// Small render helpers for lesson blocks. DS.renderContent (content.js) puts them together.
DS.escHtml = function (value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

DS.explainTerms = function (text) {
  const terms = Object.keys(DS.glossaryTerms).sort((a, b) => b.length - a.length);
  const pattern = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const boundary = '(^|[^A-Za-z0-9])';
  const matcher = new RegExp(`${boundary}(${pattern})(?=$|[^A-Za-z0-9])`, 'gi');

  return DS.escHtml(text).replace(matcher, (full, prefix, term) => {
    const explanation = DS.glossaryTerms[term.toLowerCase()];
    if (!explanation) return full;
    return `${prefix}<span class="glossary-term" tabindex="0" data-tooltip="${DS.escHtml(explanation)}">${term}</span>`;
  });
};

DS.complexityGuide = function () {
  const intro = 'Big-O is not exact stopwatch time. It is a simple way to ask: if the input gets bigger, how much more work does this operation do? In Big-O, n means the number of items. For graphs, V means vertices and E means edges.';
  const cards = [
    { label: 'O(1)', name: 'constant', desc: 'One quick step. Reading array[3] is still one lookup whether the array has 5 items or 5,000.' },
    { label: 'O(log n)', name: 'divide and conquer', desc: 'Each step cuts the problem down a lot. A balanced tree search goes left or right and ignores the other side.' },
    { label: 'O(n)', name: 'linear', desc: 'Check items one by one. If the list doubles, the work can roughly double too.' },
    { label: 'O(V + E)', name: 'graph walk', desc: 'For BFS or DFS, visit every vertex and every edge once.' },
  ];

  return `
    <div class="complexity-guide">
      <p>${DS.explainTerms(intro)}</p>
      <div class="complexity-guide-grid">
        ${cards.map(card => `
          <div class="complexity-guide-card">
            <strong>${DS.explainTerms(card.label)}</strong>
            <span>${DS.escHtml(card.name)}</span>
            <p>${DS.explainTerms(card.desc)}</p>
          </div>
        `).join('')}
      </div>
    </div>`;
};

DS.complexityMeaning = function (time) {
  const normalized = time.toLowerCase().replace(/\s+/g, ' ');
  if (normalized.includes('o(v + e)')) {
    return 'For graphs, this may touch every node and every connection once.';
  }
  if (normalized.includes('o(n squared)') || normalized.includes('o(n²)')) {
    return 'Nested work: as input grows, the work can grow much faster.';
  }
  if (normalized.includes('o(n log n)')) {
    return 'Common efficient sorting time: split work plus process every item.';
  }
  if (normalized.includes('o(log n)')) {
    return 'Each step removes a big chunk of work, so it grows slowly.';
  }
  if (normalized.includes('o(1)')) {
    return normalized.includes('avg')
      ? 'Usually one quick step, assuming hashing stays well spread out.'
      : 'About one quick step, even when the collection gets bigger.';
  }
  if (normalized.includes('o(e)')) {
    return 'May scan through the graph connections.';
  }
  if (normalized.includes('o(n)')) {
    return 'May check every item once, so bigger input means more work.';
  }
  return 'The work grows based on how much data the operation must inspect.';
};

DS.renderConceptSections = function (sections = []) {
  if (!sections.length) return '';
  return `
    <div class="block">
      <h3 class="block-title"><i class="fas fa-map"></i> Beginner Breakdown</h3>
      <div class="concept-section-grid">
        ${sections.map((section, i) => `
          <article class="concept-section-card">
            <div class="concept-section-kicker">Step ${i + 1}</div>
            <h4><i class="fas ${section.icon || 'fa-circle-dot'}"></i> ${DS.explainTerms(section.title)}</h4>
            <p>${DS.explainTerms(section.desc)}</p>
            ${section.example ? `<div class="concept-mini-example">${DS.explainTerms(section.example)}</div>` : ''}
          </article>
        `).join('')}
      </div>
    </div>`;
};

DS.updateSectionCode = function (sectionId, key) {
  const ds = DS.curriculum.find(item => item.id === sectionId);
  const html = ds?.codeExamples?.[key] ?? ds?.codeExample;
  if (!html) return;
  const body = document.querySelector(`#code-${sectionId} .code-body`);
  if (body) body.innerHTML = html;
};

DS.renderConceptFlow = function (flow = []) {
  if (!flow.length) return '';
  return `
    <div class="block">
      <h3 class="block-title"><i class="fas fa-diagram-project"></i> Flow Diagram</h3>
      <div class="concept-flow" aria-label="Concept flow diagram">
        ${flow.map((item, i) => `
          <div class="concept-flow-item">
            <span>${DS.explainTerms(item)}</span>
          </div>
          ${i < flow.length - 1 ? '<div class="concept-flow-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
        `).join('')}
      </div>
    </div>`;
};

DS.renderSectionSubnav = function (ds, anchors = []) {
  if (!anchors.length) return '';
  return `
    <nav class="section-subnav" aria-label="${DS.escHtml(ds.title)} section navigation">
      <span><i class="fas fa-list"></i> In this lesson</span>
      ${anchors.map(anchor => `<a href="#${anchor.id}">${DS.escHtml(anchor.label)}</a>`).join('')}
    </nav>`;
};

DS.renderSubPageCode = function (label, code) {
  if (!code) return '';
  return `
    <div class="subpage-code">
      <div class="subpage-code-label">${DS.escHtml(label)}</div>
      <pre class="subpage-code-body">${DS.escHtml(code)}</pre>
    </div>`;
};

DS.renderSubPageBlocks = function (subPages = []) {
  if (!subPages.length) return '';
  return subPages.map(page => `
    <div class="block lesson-subpage" id="${page.id}">
      <h3 class="block-title"><i class="fas ${page.icon || 'fa-circle-dot'}"></i> ${DS.explainTerms(page.title)}</h3>
      <p class="block-text">${DS.explainTerms(page.summary || '')}</p>
      ${Array.isArray(page.bullets) && page.bullets.length ? `
        <ul class="lesson-checklist subpage-bullets">
          ${page.bullets.map(item => `<li>${DS.explainTerms(item)}</li>`).join('')}
        </ul>` : ''}
      <div class="subpage-code-grid">
        ${DS.renderSubPageCode('Raw HTTP', page.codeHttp)}
        ${DS.renderSubPageCode('fetch example', page.codeFetch)}
      </div>
    </div>
  `).join('');
};

DS.renderLessonSubnav = function (ds, subPages = [], activeIndex = 0) {
  if (!subPages.length) return '';
  return `
    <nav class="lesson-subnav" aria-label="${DS.escHtml(ds.title)} topics">
      <span><i class="fas fa-book-open"></i> Topics</span>
      ${subPages.map((subPage, i) => `
        <button type="button" class="lesson-subnav-btn ${i === activeIndex ? 'active' : ''}" onclick="goToSubPage(${i})">
          ${DS.escHtml(subPage.label)}
        </button>
      `).join('')}
    </nav>`;
};

DS.pickLessonField = function (lesson, subPage, activeIndex, key, altKey) {
  // A sub-lesson may use the main key (whatIsIt) or the short alias (body).
  if (subPage && altKey && subPage[altKey] !== undefined) return subPage[altKey];
  if (subPage && subPage[key] !== undefined) return subPage[key];
  if (key === 'demoType' && lesson[key]) return lesson[key];
  if (activeIndex === 0) return lesson[key];
  return null;
};

DS.resolveLessonView = function (lesson) {
  const subPages = Array.isArray(lesson.subPages) ? lesson.subPages : [];
  const hasSubPages = subPages.length > 0;
  const activeIndex = hasSubPages
    ? Math.max(0, Math.min(DS.currentSubPage ?? 0, subPages.length - 1))
    : 0;
  const subPage = hasSubPages ? subPages[activeIndex] : null;
  const pick = (key, altKey) => DS.pickLessonField(lesson, subPage, activeIndex, key, altKey);

  return {
    subPages,
    activeIndex,
    hasSubPages,
    view: {
      id: lesson.id,
      category: lesson.category,
      title: lesson.title,
      subtitle: pick('subtitle') ?? lesson.subtitle,
      subPageTitle: subPage?.title || subPage?.label || null,
      demoScenario: subPage?.demoScenario || subPage?.demoExample || null,
      analogy: pick('analogy'),
      realWorldExample: pick('realWorldExample'),
      resourceLinks: pick('resourceLinks'),
      whatIsIt: pick('whatIsIt', 'body'),
      whyUse: pick('whyUse'),
      conceptSections: pick('conceptSections'),
      conceptFlow: pick('conceptFlow'),
      mermaidDiagram: pick('mermaidDiagram'),
      whenToUse: pick('whenToUse'),
      demoType: pick('demoType'),
      demoTitle: pick('demoTitle') ?? lesson.demoTitle,
      demoHint: pick('demoHint') ?? lesson.demoHint,
      demoSteps: pick('demoSteps') ?? lesson.demoSteps,
      codeTitle: pick('codeTitle') ?? lesson.codeTitle,
      codeLanguage: pick('codeLanguage') ?? lesson.codeLanguage,
      codeText: pick('codeText'),
      codeExample: pick('codeExample'),
      codeHttp: pick('codeHttp'),
      codeFetch: pick('codeFetch'),
      complexity: pick('complexity'),
      pros: pick('pros'),
      cons: pick('cons'),
      checklist: pick('checklist'),
      tryIt: pick('tryIt'),
      check: pick('check'),
      relatedIds: pick('relatedIds') ?? lesson.relatedIds,
      keywords: pick('keywords') ?? lesson.keywords,
    },
  };
};

DS.findLessonIndex = function (id) {
  return DS.curriculum.findIndex(l => l.id === id);
};

DS.goToLessonId = function (id) {
  const idx = DS.findLessonIndex(id);
  if (idx >= 0) DS.goTo(idx);
};

DS.renderRelatedLessons = function (relatedIds = []) {
  if (!relatedIds?.length) return '';
  const links = relatedIds
    .map(rid => {
      const idx = DS.findLessonIndex(rid);
      if (idx < 0) return null;
      const l = DS.curriculum[idx];
      return `<button type="button" class="related-lesson-btn" onclick="goTo(${idx})"><i class="fas ${l.icon || 'fa-book'}"></i> ${DS.escHtml(l.title)}</button>`;
    })
    .filter(Boolean);
  if (!links.length) return '';
  return `
    <div class="block" id="related-lessons">
      <h3 class="block-title"><i class="fas fa-link"></i> Related Lessons</h3>
      <div class="related-lessons">${links.join('')}</div>
    </div>`;
};

DS.renderKeywordChips = function (keywords = []) {
  if (!keywords?.length) return '';
  return `
    <div class="keyword-chips" aria-label="Terms in this lesson">
      ${keywords.map(k => `<span class="keyword-chip" title="Glossary term">${DS.explainTerms(k)}</span>`).join('')}
    </div>`;
};

DS.renderDualCodeExamples = function (view) {
  if (!view.codeHttp && !view.codeFetch) return '';
  return `
    <div class="subpage-code-grid">
      ${DS.renderSubPageCode('Raw HTTP', view.codeHttp)}
      ${DS.renderSubPageCode('fetch example', view.codeFetch)}
    </div>`;
};

DS.buildSectionAnchors = function (view) {
  const hasDemo = Boolean(view.demoType);
  const hasCode = Boolean(view.codeExample || view.codeText || view.codeHttp || view.codeFetch);
  const hasComplexity = Array.isArray(view.complexity) && view.complexity.length > 0;
  const hasProsCons = Array.isArray(view.pros) && Array.isArray(view.cons);
  const hasDiagram = Boolean(view.mermaidDiagram);

  return [
    ['analogy', 'Picture', Boolean(view.analogy)],
    ['real-world', 'Real World', Boolean(view.realWorldExample)],
    ['what-is-it', 'What Is It', Boolean(view.whatIsIt)],
    ['why-use-it', 'Why Use It', Boolean(view.whyUse)],
    ['breakdown', 'Breakdown', Array.isArray(view.conceptSections) && view.conceptSections.length > 0],
    ['flow', 'Flow', Array.isArray(view.conceptFlow) && view.conceptFlow.length > 0],
    ['diagram', 'Mermaid', hasDiagram],
    ['when-to-use', 'When To Use', Array.isArray(view.whenToUse) && view.whenToUse.length > 0],
    ['demo-block', 'Demo', hasDemo],
    ['code', 'Code', hasCode],
    ['complexity', 'Complexity', hasComplexity],
    ['pros-cons', 'Pros / Cons', hasProsCons],
    ['try-it', 'Try It', Boolean(view.tryIt)],
    ['checklist', 'Checklist', Array.isArray(view.checklist) && view.checklist.length > 0],
    ['check', 'Check', Array.isArray(view.check) && view.check.length > 0],
  ].filter(([, , show]) => show).map(([id, label]) => ({ id, label }));
};

DS.renderMermaidDiagram = function (diagram) {
  if (!diagram) return '';
  return `
    <div class="block" id="diagram">
      <h3 class="block-title"><i class="fas fa-chart-diagram"></i> Mermaid Diagram</h3>
      <div class="mermaid-wrap">
        <pre class="mermaid">${DS.escHtml(diagram)}</pre>
      </div>
    </div>`;
};

DS.renderChecklist = function (items = []) {
  if (!items.length) return '';
  return `
    <div class="block" id="checklist">
      <h3 class="block-title"><i class="fas fa-list-check"></i> You Understand This When</h3>
      <ul class="lesson-checklist">
        ${items.map(item => `<li>${DS.explainTerms(item)}</li>`).join('')}
      </ul>
    </div>`;
};

// "Try it": numbered steps the student does now, ending with "You should see ...".
DS.renderTryIt = function (tryIt) {
  if (!tryIt || !Array.isArray(tryIt.steps)) return '';
  return `
    <div class="block" id="try-it">
      <h3 class="block-title"><i class="fas fa-hand-pointer"></i> Try It</h3>
      <ol class="try-steps">
        ${tryIt.steps.map(step => `<li>${DS.explainTerms(step)}</li>`).join('')}
      </ol>
      ${tryIt.result ? `<p class="block-text"><span class="try-result">You should see:</span> ${DS.explainTerms(tryIt.result)}</p>` : ''}
    </div>`;
};

// "Check yourself": questions with hidden answers ({ q, a }).
DS.renderCheck = function (items = []) {
  if (!items.length) return '';
  return `
    <div class="block" id="check">
      <h3 class="block-title"><i class="fas fa-circle-question"></i> Check Yourself</h3>
      <ol class="check-list">
        ${items.map(item => `
          <li>${DS.explainTerms(item.q)}
            <details><summary>Answer</summary><p>${DS.explainTerms(item.a)}</p></details>
          </li>`).join('')}
      </ol>
    </div>`;
};

DS.renderMermaid = function () {
  if (!window.mermaid) return;
  window.mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    themeVariables: {
      background: '#0d120f',
      primaryColor: '#17231d',
      primaryTextColor: '#e8ede9',
      primaryBorderColor: '#f0b429',
      lineColor: '#4cc9f0',
      secondaryColor: '#111a15',
      tertiaryColor: '#0f1712',
    },
  });
  window.mermaid.run({ querySelector: '.mermaid' });
};
