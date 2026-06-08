window.DS = window.DS || {};

DS.renderNav = function () {
  const navList = document.getElementById('navList');
  let lastCategory = '';
  navList.innerHTML = DS.curriculum.map((ds, i) => {
    const category = ds.category || 'Data Structures';
    const header = category !== lastCategory
      ? `<div class="nav-group-label">${category}</div>`
      : '';
    lastCategory = category;

    return `
      ${header}
      <div class="nav-item ${i === DS.currentSection ? 'active' : ''} ${DS.completed.has(ds.id) ? 'completed' : ''}" data-index="${i}" role="button" tabindex="0">
        <div class="nav-icon"><i class="fas ${ds.icon}"></i></div>
        <span class="nav-text">${ds.title}</span>
        ${DS.completed.has(ds.id) ? '<span class="nav-badge done"><i class="fas fa-check"></i></span>' : `<span class="nav-badge">${String(i + 1).padStart(2, '0')}</span>`}
      </div>
    `;
  }).join('');

  // Click handlers
  navList.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      DS.currentSection = parseInt(item.dataset.index);
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

  // Update progress
  const pct = Math.round((DS.completed.size / DS.curriculum.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPercent').textContent = `${DS.completed.size} / ${DS.curriculum.length} lessons`;
}
