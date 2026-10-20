window.DS = window.DS || {};
DS.demos = DS.demos || {};

DS.demos.roadmapExplorer = function (container) {
  const UI = DS.demoUI;
  const categories = {};
  DS.curriculum.forEach((lesson, index) => {
    const cat = lesson.category || 'Data Structures';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ ...lesson, index });
  });

  const render = () => {
    const html = Object.entries(categories).map(([cat, lessons]) => `
      <div class="roadmap-category">
        <h4>${UI.esc(cat)} <span class="roadmap-count">${lessons.length}</span></h4>
        <div class="roadmap-lessons">
          ${lessons.map(l => `
            <button type="button" class="roadmap-lesson-btn" onclick="roadmapGo(${l.index})" title="${UI.esc(l.subtitle || '')}">
              <i class="fas ${l.icon || 'fa-book'}"></i>
              <span>${UI.esc(l.title)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `).join('');

    UI.mount(container, {
      title: 'Curriculum roadmap',
      hint: `Click any lesson to jump there. ${DS.curriculum.length} lessons across ${Object.keys(categories).length} categories.`,
      stage: `<div class="roadmap-demo">${html}</div>`,
      inspector: UI.inspector('Your path', [
        ['Total lessons', String(DS.curriculum.length), 'Full roadmap'],
        ['Categories', String(Object.keys(categories).length), 'Sidebar groups'],
        ['Completed', String(DS.completed?.size ?? 0), 'Marked in localStorage'],
        ['Tip', 'Follow order', 'Foundations → DS → algorithms → web'],
      ]),
    });
  };

  window.roadmapGo = (index) => {
    DS.goTo(index);
    document.getElementById('contentArea')?.scrollIntoView({ behavior: 'smooth' });
  };

  render();
};
