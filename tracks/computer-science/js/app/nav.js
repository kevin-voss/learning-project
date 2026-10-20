window.DS = window.DS || {};

DS.renderNav = function () {
  const navList = document.getElementById('navList');
  const esc = DS.escHtml || ((value) => String(value));
  let lastCategory = '';
  navList.innerHTML = DS.curriculum.map((ds, i) => {
    const category = ds.category || 'Data Structures';
    const subPages = Array.isArray(ds.subPages) ? ds.subPages : [];
    const isActive = i === DS.currentSection;
    const header = category !== lastCategory
      ? `<div class="nav-group-label">${category}</div>`
      : '';
    lastCategory = category;

    return `
      ${header}
      <div class="nav-item ${isActive ? 'active' : ''} ${DS.completed.has(ds.id) ? 'completed' : ''}" data-index="${i}" role="button" tabindex="0" aria-expanded="${isActive && subPages.length ? 'true' : 'false'}">
        <div class="nav-icon"><i class="fas ${ds.icon}"></i></div>
        <span class="nav-text">${esc(ds.title)}</span>
        ${DS.completed.has(ds.id) ? '<span class="nav-badge done"><i class="fas fa-check"></i></span>' : `<span class="nav-badge">${String(i + 1).padStart(2, '0')}</span>`}
      </div>
      ${isActive && subPages.length ? `
        <div class="nav-sublist" aria-label="${esc(ds.title)} topics">
          ${subPages.map((subPage, subIndex) => `
            <div class="nav-subitem ${DS.currentSubPage === subIndex ? 'active' : ''}" data-index="${i}" data-sub-index="${subIndex}" role="button" tabindex="0">
              <span class="nav-subdot"></span>
              <span class="nav-subtext">${esc(subPage.label || subPage.title || `Topic ${subIndex + 1}`)}</span>
            </div>
          `).join('')}
        </div>` : ''}
    `;
  }).join('');

  // Click handlers
  navList.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      DS.currentSection = parseInt(item.dataset.index);
      DS.currentSubPage = 0;
      DS.renderContent();
      DS.renderNav();
      // Close mobile sidebar
      document.querySelector('.sidebar').classList.remove('open');
    });
    item.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      item.click();
    });
  });

  navList.querySelectorAll('.nav-subitem').forEach(item => {
    item.addEventListener('click', () => {
      DS.currentSection = parseInt(item.dataset.index);
      DS.currentSubPage = parseInt(item.dataset.subIndex);
      DS.renderContent();
      DS.renderNav();
      document.querySelector('.sidebar').classList.remove('open');
    });
    item.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      item.click();
    });
  });

  // Update progress
  const pct = Math.round((DS.completed.size / DS.curriculum.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPercent').textContent = `${DS.completed.size} / ${DS.curriculum.length} lessons`;
}
