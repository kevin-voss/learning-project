(function () {
  const accents = {
    amber: '',
    teal: 'teal',
    coral: 'coral',
    violet: 'violet'
  };

  const tierLabels = {
    foundation: 'Foundation',
    core: 'Core Java',
    workflow: 'Workflow',
    applied: 'Applied Java',
    advanced: 'Advanced',
    projects: 'Projects'
  };

  function byOrder(a, b) {
    return (a.order || 99) - (b.order || 99);
  }

  function statusLabel(status) {
    if (status === 'available') return 'Available';
    if (status === 'in-progress') return 'In progress';
    return 'Planned';
  }

  function statusText(topic) {
    if (topic.status === 'available') return 'Open lesson';
    if (topic.status === 'in-progress') return 'Preview soon';
    return 'Coming later';
  }

  function explicitPath(path) {
    if (!path || path === '#') return '#';
    if (path.endsWith('/')) return `${path}index.html`;
    return path;
  }

  function prerequisitesText(topic) {
    if (!topic.prerequisites || !topic.prerequisites.length) return 'None';
    return topic.prerequisites.map(id => {
      const prereq = Java.topics.registry.find(t => t.id === id);
      return prereq ? prereq.title : id;
    }).join(', ');
  }

  function renderPathStep(topic, index, total) {
    const accentClass = accents[topic.accent] || '';
    const tag = topic.status === 'available' ? 'a' : 'div';
    const href = topic.status === 'available' ? ` href="${explicitPath(topic.path)}"` : '';

    return `
      <${tag} class="path-step accent-vars ${accentClass} ${topic.status}"${href}>
        <div class="path-index">
          <span>${String(topic.order).padStart(2, '0')}</span>
          ${index < total - 1 ? '<i></i>' : ''}
        </div>
        <div class="path-card">
          <div class="path-topline">
            <span class="status">${statusLabel(topic.status)}</span>
            <span class="lts">${tierLabels[topic.tier] || topic.tier} · ${topic.ltsNote || 'Java 21 LTS'}</span>
          </div>
          <h3>${topic.title}</h3>
          <p>${topic.description}</p>
          <div class="path-meta">
            <span>Prereq: ${prerequisitesText(topic)}</span>
            <span>${statusText(topic)} →</span>
          </div>
        </div>
      </${tag}>
    `;
  }

  function renderTopicCard(topic) {
    const accentClass = accents[topic.accent] || '';
    const tag = topic.status === 'available' ? 'a' : 'div';
    const href = topic.status === 'available' ? ` href="${explicitPath(topic.path)}"` : '';
    const cta = topic.status === 'available' ? 'Open topic →' : 'Planned';

    return `
      <${tag} class="topic-card accent-vars ${accentClass} ${topic.status}"${href}>
        <span class="status">${statusLabel(topic.status)}</span>
        <h3>${topic.title}</h3>
        <p class="tagline">${topic.tagline}</p>
        <p class="description">${topic.description}</p>
        <div class="topic-stats">
          ${topic.stats.map(s => `
            <div class="topic-stat">
              <div class="num">${s.value}</div>
              <div class="lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>
        <span class="cta">${cta}</span>
      </${tag}>
    `;
  }

  function renderHubStats(topics) {
    const stats = document.getElementById('hubStats');
    if (!stats) return;

    const available = topics.filter(topic => topic.status === 'available');
    const projectCount = topics.filter(topic => topic.tier === 'projects').length;

    stats.innerHTML = `
      <div class="hero-stat">
        <div class="num">${available.length}/${topics.length}</div>
        <div class="lbl">Topics live</div>
      </div>
      <div class="hero-stat">
        <div class="num">21</div>
        <div class="lbl">Java LTS</div>
      </div>
      <div class="hero-stat">
        <div class="num">${projectCount}</div>
        <div class="lbl">Project track</div>
      </div>
    `;
  }

  function renderTrackGrid(topics) {
    const trackGrid = document.getElementById('trackGrid');
    if (!trackGrid) return;

    const byTier = topics.reduce((groups, topic) => {
      const key = topic.tier || 'foundation';
      if (!groups[key]) groups[key] = [];
      groups[key].push(topic);
      return groups;
    }, {});

    trackGrid.innerHTML = Object.keys(tierLabels).map(tier => {
      const items = (byTier[tier] || []).sort(byOrder);
      if (!items.length) return '';
      return `
        <section class="track-group">
          <div class="track-head">
            <span>${tierLabels[tier]}</span>
            <small>${items.length} topic${items.length > 1 ? 's' : ''}</small>
          </div>
          <div class="topic-grid compact">${items.map(renderTopicCard).join('')}</div>
        </section>
      `;
    }).join('');
  }

  function renderGlossary() {
    const glossary = document.getElementById('glossaryGrid');
    if (!glossary || !Java.glossary) return;

    glossary.innerHTML = Java.glossary.map(entry => `
      <button class="glossary-pill term" data-tip="${entry.definition}" type="button">
        ${entry.term}
      </button>
    `).join('');

    const popover = ensureTermPopover();
    const show = event => {
      const term = event.currentTarget;
      popover.textContent = term.dataset.tip;
      popover.classList.add('show');
      placeTermPopover(term, popover);
    };
    const hide = () => popover.classList.remove('show');

    glossary.querySelectorAll('.term').forEach(term => {
      term.addEventListener('mouseenter', show);
      term.addEventListener('focus', show);
      term.addEventListener('click', show);
      term.addEventListener('mouseleave', hide);
      term.addEventListener('blur', hide);
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

  function renderHub() {
    const registry = (Java.topics.registry || []).slice().sort(byOrder);
    const path = document.getElementById('learningPath');
    if (!path || !registry.length) return;

    renderHubStats(registry);
    path.innerHTML = registry.map((topic, index) => renderPathStep(topic, index, registry.length)).join('');
    renderTrackGrid(registry);
    renderGlossary();

    const pathLabel = document.getElementById('pathCount');
    const trackLabel = document.getElementById('trackCount');
    if (pathLabel) pathLabel.textContent = `${registry.length} ordered topics`;
    if (trackLabel) trackLabel.textContent = `${Object.keys(tierLabels).length} structured stages`;
  }

  renderHub();
})();
