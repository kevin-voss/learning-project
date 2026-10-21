// The one site header, on every page: home, the three landing sections,
// "Continue" to the next unfinished step, progress and the light/dark toggle.
// catalog.mjs writes it into hub/index.html; build-site.mjs puts it at the top
// of every other page. hub/progress.js fills [data-continue] and [data-progress-pill].
// Styles: .lp-global in hub/theme/components.css.

export const HEADER = `<header class="lp-global">
    <a class="lp-global-brand" href="/hub/" aria-label="Learning Project: back to the start page"><span class="lp-global-mark">LP</span><span class="lp-global-name">Learning Project</span><span class="lp-global-home">Home</span></a>
    <nav class="lp-global-nav" aria-label="Site">
      <a href="/hub/#path">The path</a>
      <a href="/hub/#tasks">My tasks</a>
      <a href="/hub/#lookup">Look it up</a>
    </nav>
    <span class="lp-global-progress" data-progress-pill hidden></span>
    <a class="lp-global-continue" data-continue href="/hub/#path">Start →</a>
    <button type="button" class="lp-theme-toggle" data-theme-toggle aria-label="Switch light or dark">◐</button>
  </header>`
