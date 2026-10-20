window.DS = window.DS || {};

DS.showMsg = function (id, text, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className = `demo-msg show ${type}`;
}
