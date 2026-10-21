import { wireNavigation } from './nav/navigation.js';
import { wireContent } from './page/content.js';
import { wireDiagrams } from './page/diagrams.js';
import { wireSearch } from './nav/search.js';
import { wireWidgets } from './page/widgets.js';

export function start() {
  const ready = () => {
    document.body.classList.add('js-enhanced');
    wireNavigation();
    wireContent();
    wireDiagrams();
    wireSearch();
    wireWidgets();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
}
