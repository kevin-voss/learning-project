window.DS = window.DS || {};

DS.buildHash = function () {
  const lesson = DS.curriculum[DS.currentSection];
  if (!lesson) return '';
  const subPages = lesson.subPages || [];
  const sub = subPages[DS.currentSubPage];
  const subSlug = sub?.id || (subPages.length ? String(DS.currentSubPage) : '');
  return subSlug ? `#${lesson.id}/${subSlug}` : `#${lesson.id}`;
};

DS.parseHash = function (hash) {
  const raw = (hash || location.hash || '').replace(/^#/, '');
  if (!raw) return null;
  const [lessonId, subSlug] = raw.split('/');
  const section = DS.curriculum.findIndex(l => l.id === lessonId);
  if (section < 0) return null;
  const lesson = DS.curriculum[section];
  let subPage = 0;
  if (subSlug && lesson.subPages?.length) {
    const byId = lesson.subPages.findIndex(s => s.id === subSlug);
    const byIdx = Number(subSlug);
    subPage = byId >= 0 ? byId : (Number.isFinite(byIdx) ? Math.max(0, Math.min(byIdx, lesson.subPages.length - 1)) : 0);
  }
  return { section, subPage };
};

DS.persistLastVisited = function () {
  localStorage.setItem('dsLastVisited', DS.buildHash());
};

DS.restoreLastVisited = function () {
  const parsed = DS.parseHash(localStorage.getItem('dsLastVisited') || '');
  if (parsed) {
    DS.currentSection = parsed.section;
    DS.currentSubPage = parsed.subPage;
    return true;
  }
  const fromUrl = DS.parseHash(location.hash);
  if (fromUrl) {
    DS.currentSection = fromUrl.section;
    DS.currentSubPage = fromUrl.subPage;
    return true;
  }
  return false;
};

DS.syncHash = function () {
  const next = DS.buildHash();
  if (location.hash !== next) history.replaceState(null, '', next);
  DS.persistLastVisited();
};

DS.goTo = function (index) {
  DS.currentSection = index;
  DS.currentSubPage = 0;
  DS.renderContent();
  DS.renderNav();
  DS.syncHash();
};

DS.goToSubPage = function (index) {
  const ds = DS.curriculum[DS.currentSection];
  const count = ds.subPages?.length ?? 0;
  if (!count) return;
  DS.currentSubPage = Math.max(0, Math.min(index, count - 1));
  DS.renderContent();
  DS.renderNav();
  DS.syncHash();
};

DS.markComplete = function (id) {
  if (DS.completed.has(id)) return;
  DS.completed.add(id);
  localStorage.setItem('dsCompleted', JSON.stringify([...DS.completed]));
  DS.renderNav();
  DS.renderContent();
  DS.showToast(`${id.replace(/-/g, ' ')} completed!`, 'success');
  if (DS.currentSection < DS.curriculum.length - 1) {
    setTimeout(() => DS.goTo(DS.currentSection + 1), 1200);
  }
};

DS.copyCode = function (btn) {
  const code = btn.closest('.code-block').querySelector('.code-body').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
  });
};

DS.showToast = function (msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};
