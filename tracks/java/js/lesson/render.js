// Renders a lesson topic page: roadmap lanes, sidebar, the selected lesson,
// and the topic's "Try it" + "Check yourself" practice block.
(function () {
  const L = Java.lesson;
  const { icons, escapeHtml, escapeAttribute, indexToLetters, normalizeLookup } = L;

  function isDeeper(lesson) {
    return lesson.deeper || lesson.category === 'deeper';
  }

  function renderLessonTopic(config) {
    const topic = Java.topics[config.namespace];
    const categories = topic.categories;
    const lessons = topic.lessons;
    let selectedId = lessons[0].id;

    const stepOf = lesson => indexToLetters(lessons.findIndex(item => item.id === lesson.id));
    const lessonsIn = catKey => lessons.filter(lesson => lesson.category === catKey);

    function bindSelect(root, selector) {
      root.querySelectorAll(selector).forEach(node => {
        const handler = () => selectLesson(node.dataset.id);
        node.addEventListener('click', handler);
        node.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handler();
          }
        });
      });
    }

    function renderRoadmap() {
      const container = document.getElementById('roadmap');
      container.innerHTML = Object.keys(categories).map(catKey => {
        const cat = categories[catKey];
        const items = lessonsIn(catKey);
        if (!items.length) return '';
        return `
          <div class="lane ${catKey === 'deeper' ? 'lane-deeper' : ''}" style="--lane-color: ${cat.color}; --lane-bg: ${cat.bg}; --lane-glow: ${cat.glow};">
            <div class="lane-head">
              <span class="lane-tag">${cat.name}</span>
              <span class="lane-name">${cat.desc}</span>
              <span class="lane-desc">${items.length} lesson${items.length > 1 ? 's' : ''}</span>
            </div>
            <div class="lane-track">
              ${items.map(lesson => `
                <div class="pattern-card ${lesson.id === selectedId ? 'active' : ''}" data-id="${lesson.id}" tabindex="0" role="button" aria-label="View ${escapeAttribute(lesson.title)}">
                  <div class="num">Step ${stepOf(lesson)} · ${cat.name}</div>
                  <div class="name"><span class="icon">${lesson.icon || '•'}</span>${escapeHtml(lesson.title)}</div>
                  <div class="tag">${escapeHtml(lesson.tagline)}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
      bindSelect(container, '.pattern-card');
    }

    function renderSidebar() {
      const sidebar = document.getElementById('sidebar');
      sidebar.innerHTML = Object.keys(categories).map(catKey => {
        const cat = categories[catKey];
        const items = lessonsIn(catKey);
        if (!items.length) return '';
        return `
          <div class="sidebar-group">
            <div class="sidebar-group-head" style="color: ${cat.color};">
              <span style="width:8px; height:8px; border-radius:50%; background: ${cat.color}; display:inline-block;"></span>
              ${cat.name}
            </div>
            ${items.map(lesson => `
              <div class="sidebar-item ${lesson.id === selectedId ? 'active' : ''}" data-id="${lesson.id}" tabindex="0" role="button">
                <span class="marker" style="background: ${cat.color};"></span>
                <span>${escapeHtml(lesson.title)}</span>
                <span class="num">Step ${stepOf(lesson)}</span>
              </div>
            `).join('')}
          </div>
        `;
      }).join('');
      bindSelect(sidebar, '.sidebar-item');
    }

    function renderDetail() {
      const lesson = lessons.find(item => item.id === selectedId);
      const cat = categories[lesson.category];
      const detail = document.getElementById('detail');

      detail.style.setProperty('--pattern-color', cat.color);
      detail.style.setProperty('--pattern-bg', cat.bg);

      detail.innerHTML = `
        <div class="detail-head">
          <div class="detail-cat">${cat.name} · Step ${stepOf(lesson)} of ${indexToLetters(lessons.length - 1)}</div>
          <h1 class="detail-title">${escapeHtml(lesson.title)}</h1>
          <p class="detail-tagline">${escapeHtml(lesson.tagline)}</p>
          ${isDeeper(lesson) ? '<p class="deeper-note">Deeper: you can skip this on your first pass and come back when you need it.</p>' : ''}
        </div>
        <div class="detail-body">
          ${L.renderPicture(lesson)}
          ${L.renderKid(lesson)}
          ${L.renderIdea(lesson)}
          ${L.renderSyntax(lesson)}
          ${L.renderPrimitiveTypes(lesson)}
          ${L.renderTable(lesson)}
          ${L.renderVisuals(lesson)}
          ${L.renderCodeExample(lesson)}
          ${L.renderDeepSections(lesson)}
          ${L.renderTechnical(lesson)}
          ${L.renderTryIt(lesson.tryIt, lesson)}
          ${L.renderCommands(lesson, config)}
          ${L.renderPracticePrompts(lesson)}
          ${L.renderPointsAndMistakes(lesson)}
          ${L.renderProsCons(lesson)}
          ${L.renderCheck(lesson.check, lesson)}
          ${(lesson.related || []).length ? L.section('Related', icons.link, `<div class="related">${renderRelatedChips(lesson.related)}</div>`) : ''}
        </div>
      `;

      highlight(detail);
      L.renderMermaidDiagrams(detail);
      L.attachTermTooltips(detail);
    }

    function highlight(root) {
      root.querySelectorAll('pre code').forEach(block => {
        if (window.hljs) hljs.highlightElement(block);
      });
    }

    // Topic-level Try it + Check, shown once below the lessons.
    function renderPractice() {
      if (!topic.tryIt && !topic.check) return;
      const anchor = document.getElementById('detail-section');
      if (!anchor || document.getElementById('practice-section')) return;
      const owner = { glossary: [] };
      const practice = document.createElement('section');
      practice.className = 'section';
      practice.id = 'practice-section';
      practice.innerHTML = `
        <div class="container">
          <div class="section-head">
            <div><div class="num-tag">C / PRACTICE</div><h2>Try it, then check yourself</h2></div>
            <p>Do the steps in your terminal. Then answer the questions before you open the answers.</p>
          </div>
          <div class="practice-grid">
            ${L.renderTryIt(topic.tryIt, owner)}
            ${L.renderCheck(topic.check, owner)}
          </div>
        </div>
      `;
      anchor.insertAdjacentElement('afterend', practice);
      highlight(practice);
    }

    function topicHref(target) {
      if (window.location.pathname.includes('/topics/')) return `../${target.id}/index.html`;
      return target.path;
    }

    function relatedTarget(value) {
      const foundLesson = lessons.find(lesson => normalizeLookup(lesson.id) === normalizeLookup(value) || normalizeLookup(lesson.title) === normalizeLookup(value));
      if (foundLesson) return { type: 'lesson', id: foundLesson.id };

      const aliases = {
        'build tools': 'maven and gradle',
        'collections basics': 'collections',
        'string': 'strings and text',
        'variables': 'types and variables',
        'ubuntu terminal': 'getting started on ubuntu',
        'packages': 'syntax fundamentals'
      };
      const lookup = aliases[normalizeLookup(value)] || normalizeLookup(value);
      const foundTopic = (Java.topics.registry || []).find(item => {
        const title = normalizeLookup(item.title);
        const id = normalizeLookup(item.id);
        return title === lookup || id === lookup || title.includes(lookup) || lookup.includes(title);
      });
      if (foundTopic && foundTopic.status === 'available') return { type: 'topic', topic: foundTopic };
      return { type: 'missing' };
    }

    function renderRelatedChips(items) {
      return items.map(item => {
        const target = relatedTarget(item);
        if (target.type === 'lesson') {
          return `<button class="related-chip" type="button" onclick="jumpToLesson('${escapeAttribute(target.id)}')">${escapeHtml(item)}</button>`;
        }
        if (target.type === 'topic') {
          return `<a class="related-chip related-link" href="${escapeAttribute(topicHref(target.topic))}" title="Open ${escapeAttribute(target.topic.title)}">${escapeHtml(item)}</a>`;
        }
        return `<span class="related-chip">${escapeHtml(item)}</span>`;
      }).join('');
    }

    function selectLesson(id) {
      selectedId = id;
      renderRoadmap();
      renderSidebar();
      renderDetail();
      const detailSection = document.getElementById('detail-section');
      if (detailSection) detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    window.jumpToLesson = function jumpToLesson(value) {
      const found = lessons.find(lesson => lesson.id === value || lesson.title === value);
      if (found) selectLesson(found.id);
      else L.showToast(`${value} belongs to another topic.`);
    };

    // Diagrams take their colours when drawn, so redraw them when the theme changes.
    function redrawDiagramsOnThemeChange() {
      const redraw = () => {
        const detail = document.getElementById('detail');
        if (detail && detail.querySelector('.mermaid')) renderDetail();
      };
      if (window.matchMedia) {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        if (query.addEventListener) query.addEventListener('change', redraw);
      }
      if (window.MutationObserver) {
        new MutationObserver(redraw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      }
    }

    renderRoadmap();
    renderSidebar();
    renderDetail();
    renderPractice();
    redrawDiagramsOnThemeChange();
  }

  Java.renderLessonTopic = renderLessonTopic;
})();
