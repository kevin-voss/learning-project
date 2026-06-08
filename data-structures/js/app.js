DS.restoreLastVisited();
DS.renderNav();
DS.renderContent();

window.addEventListener('hashchange', () => {
  const parsed = DS.parseHash(location.hash);
  if (!parsed) return;
  if (parsed.section !== DS.currentSection || parsed.subPage !== DS.currentSubPage) {
    DS.currentSection = parsed.section;
    DS.currentSubPage = parsed.subPage;
    DS.renderContent();
    DS.renderNav();
    DS.persistLastVisited();
  }
});
