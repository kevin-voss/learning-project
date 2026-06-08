window.DS = window.DS || {};

DS.goTo = function (index) {
  DS.currentSection = index;
  DS.currentSubPage = 0;
  DS.renderContent();
  DS.renderNav();
};

DS.goToSubPage = function (index) {
  const ds = DS.curriculum[DS.currentSection];
  const count = ds.subPages?.length ?? 0;
  if (!count) return;
  DS.currentSubPage = Math.max(0, Math.min(index, count - 1));
  DS.renderContent();
  DS.renderNav();
};

DS.markComplete = function (id) {
  if (DS.completed.has(id)) return;
  DS.completed.add(id);
  localStorage.setItem('dsCompleted', JSON.stringify([...DS.completed]));
  DS.renderNav();
  DS.renderContent();
  DS.showToast(`${id.replace('-', ' ')} completed!`, 'success');
  // Auto-advance after a moment
  if (DS.currentSection < DS.curriculum.length - 1) {
    setTimeout(() => DS.goTo(DS.currentSection + 1), 1200);
  }
}

DS.copyCode = function (btn) {
  const code = btn.closest('.code-block').querySelector('.code-body').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 2000);
  });
}

DS.showToast = function (msg, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
