/* Stable topic-page entry point. Runtime modules resolve from this script's own URL. */
(() => {
  const scriptUrl = document.currentScript && document.currentScript.src;
  if (!scriptUrl) return;
  import(new URL('./runtime/index.js', scriptUrl).href)
    .then(({ start }) => start())
    .catch((error) => console.error('AI guide runtime failed to load.', error));
})();
