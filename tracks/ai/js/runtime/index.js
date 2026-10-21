import { wireNavigation } from './navigation.js';
import { wireContent } from './content.js';
import { wireDiagrams } from './diagrams.js';
import { wireSearch } from './search.js';
import { wireWidgets } from './widgets.js';

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
