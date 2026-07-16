(function () {
  const { categories, patterns } = Java.topics.designPatterns;
  let selectedId = patterns[0].id;

  // Render the visual roadmap
function renderRoadmap() {
  const container = document.getElementById('roadmap');
  const byCategory = {};
  patterns.forEach(p => {
    if (!byCategory[p.category]) byCategory[p.category] = [];
    byCategory[p.category].push(p);
  });
  
  let html = '';
  Object.keys(categories).forEach(catKey => {
    const cat = categories[catKey];
    const items = byCategory[catKey] || [];
    if (items.length === 0) return;
    
    html += `
      <div class="lane" style="--lane-color: ${cat.color}; --lane-bg: ${cat.bg}; --lane-glow: ${cat.glow};">
        <div class="lane-head">
          <span class="lane-tag">${cat.name}</span>
          <span class="lane-name">${cat.desc}</span>
          <span class="lane-desc">${items.length} pattern${items.length > 1 ? 's' : ''}</span>
        </div>
        <div class="lane-track">
          ${items.map(p => `
            <div class="pattern-card ${p.id === selectedId ? 'active' : ''}" 
                 data-id="${p.id}"
                 tabindex="0"
                 role="button"
                 aria-label="View ${p.name} pattern">
              <div class="num">${p.num} · ${cat.name}</div>
              <div class="name"><span class="icon">${p.icon}</span>${p.name}</div>
              <div class="tag">${p.tagline}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });
  container.innerHTML = html;
  
  container.querySelectorAll('.pattern-card').forEach(card => {
    const handler = () => selectPattern(card.dataset.id);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });
}

// Render the sidebar pattern list
function renderSidebar() {
  const sidebar = document.getElementById('sidebar');
  let html = '';
  Object.keys(categories).forEach(catKey => {
    const cat = categories[catKey];
    const items = patterns.filter(p => p.category === catKey);
    if (items.length === 0) return;
    
    html += `
      <div class="sidebar-group">
        <div class="sidebar-group-head" style="color: ${cat.color};">
          <span style="width:8px; height:8px; border-radius:50%; background: ${cat.color}; display:inline-block;"></span>
          ${cat.name}
        </div>
        ${items.map(p => `
          <div class="sidebar-item ${p.id === selectedId ? 'active' : ''}" 
               data-id="${p.id}"
               tabindex="0"
               role="button">
            <span class="marker" style="background: ${cat.color};"></span>
            <span>${p.name}</span>
            <span class="num">${p.num}</span>
          </div>
        `).join('')}
      </div>
    `;
  });
  sidebar.innerHTML = html;
  
  sidebar.querySelectorAll('.sidebar-item').forEach(item => {
    const handler = () => selectPattern(item.dataset.id);
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handler();
      }
    });
  });
}

// SVG icon helper
const icons = {
  info: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  world: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  code: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  clock: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  sun: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>',
  pros: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>',
  cons: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
  link: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
};

// Render the detail panel for the selected pattern
function renderDetail() {
  const p = patterns.find(x => x.id === selectedId);
  const cat = categories[p.category];
  const detail = document.getElementById('detail');
  
  detail.style.setProperty('--pattern-color', cat.color);
  detail.style.setProperty('--pattern-bg', cat.bg);
  
  detail.innerHTML = `
    <div class="detail-head">
      <div class="detail-cat">${cat.name} · ${p.num} / 12</div>
      <h1 class="detail-title">${p.name}</h1>
      <p class="detail-tagline">${p.tagline}</p>
    </div>
    <div class="detail-body">
      <div class="detail-section">
        <div class="detail-section-label">${icons.info}Definition</div>
        <p class="def-text">${p.definition}</p>
      </div>
      
      <div class="detail-section">
        <div class="detail-section-label">${icons.world}Real-World Analogy</div>
        <div class="real-world">
          <div class="emoji">${p.icon}</div>
          <div class="content">
            <div class="label">Think of it like this</div>
            <div class="text">${p.realWorld}</div>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <div class="detail-section-label">${icons.code}Java Pattern Sketch</div>
        <div class="code-wrap">
          <div class="code-head">
            <div class="file">
              <div class="dots"><span></span><span></span><span></span></div>
              <span>${p.name.replace(/\s+/g, '')}.java</span>
            </div>
            <button class="copy-btn" onclick="copyCode(this)">copy</button>
          </div>
          <pre><code class="language-plaintext">${escapeHtml(p.code)}</code></pre>
        </div>
      </div>
      
      <div class="detail-section">
        <div class="two-col">
          <div class="info-box when">
            <div class="lbl">${icons.clock}When to Use</div>
            <ul>
              ${p.whenToUse.map(w => `<li>${w}</li>`).join('')}
            </ul>
          </div>
          <div class="info-box why">
            <div class="lbl">${icons.check}Why Use It</div>
            <p>${p.whyUse}</p>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <div class="detail-section-label">${icons.sun}Pros &amp; Cons</div>
        <div class="pros-cons">
          <div class="pc-box pros">
            <div class="lbl">${icons.pros}Pros</div>
            <ul>
              ${p.pros.map(x => `<li>${x}</li>`).join('')}
            </ul>
          </div>
          <div class="pc-box cons">
            <div class="lbl">${icons.cons}Cons</div>
            <ul>
              ${p.cons.map(x => `<li>${x}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      
      <div class="detail-section">
        <div class="detail-section-label">${icons.link}Related Patterns</div>
        <div class="related">
          ${p.related.map(r => `<span class="related-chip" onclick="jumpToRelated('${r}')">${r}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
  
  // Re-highlight code blocks
  detail.querySelectorAll('pre code').forEach(block => {
    if (window.hljs) hljs.highlightElement(block);
  });
}

// Select a pattern and update everything
function selectPattern(id) {
  selectedId = id;
  renderRoadmap();
  renderSidebar();
  renderDetail();
  
  // Scroll to detail section
  const detailSection = document.getElementById('detail-section');
  if (detailSection) {
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Jump to a related pattern by name (handles chips for not-yet-covered patterns)
window.jumpToRelated = function jumpToRelated(name) {
  const found = patterns.find(p => p.name === name);
  if (found) {
    selectPattern(found.id);
  } else {
    showToast(`${name} isn't covered in this roadmap (yet) — but it's worth a Google!`);
  }
}

// Escape HTML special chars so code displays correctly
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

// Copy code to clipboard with feedback
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
}

// Show a toast notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.querySelector('span').textContent = msg;
  toast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// Initialize the page
renderRoadmap();
renderSidebar();
renderDetail();
})();
