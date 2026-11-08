window.AIP = window.AIP || {};

AIP.renderMicro = function () {
  var html = '<div class="hero"><h1>Microcredentials</h1><p class="lede">Six credentials support the exam. MLOps is optional. Incident Response is only a link. Each official prerequisite page asks you to sign in. There is no formal prerequisite.</p></div>';
  (AIP.MICRO || []).forEach(function (item) {
    html += '<div class="card"><h3>' + AIP.escape(item.title) + (item.optional ? " (optional)" : "") + '</h3><p>' + AIP.escape(item.note) + '</p>';
    if (item.linkOnly) html += '<p><a href="' + AIP.escape(item.href) + '">Open the AWS page</a></p>';
    else {
      html += '<p>Chapters: ' + (item.chapters || []).map(function (id) {
        return '<a href="#/chapter/' + id + '">' + id + '</a>';
      }).join(", ") + '</p>';
    }
    html += '</div>';
  });
  return html;
};

AIP.renderFde = function () {
  var fde = AIP.FDE || { verified: false, validated: [], advanced: [], you: "", note: "" };
  var html = '<div class="hero"><h1>FDE preparation</h1><p class="lede">' + AIP.escape(fde.note) + '</p></div>';
  html += '<div class="card"><h3>Validated</h3><ul>' + fde.validated.map(function (line) { return '<li>' + AIP.escape(line) + '</li>'; }).join('') + '</ul></div>';
  html += '<div class="card"><h3>Advanced</h3><ul>' + fde.advanced.map(function (line) { return '<li>' + AIP.escape(line) + '</li>'; }).join('') + '</ul></div>';
  html += '<div class="card"><p>' + AIP.escape(fde.you) + '</p><p>Enrollment, activities, points, which microcredentials count, renewal, and membership checks need APN access. They stay off this page until that access exists.</p></div>';
  return html;
};

AIP.renderCapstones = function () {
  var html = '<div class="hero"><h1>Capstones</h1><p class="lede">Each project reuses the last skill and adds one. Real AWS waits for a typed approval. The bill is about $30–110 across the labs, capstones, safety stack, and drill, plus $3–8 if you add the optional pieces. Cleanup never promises zero charges.</p></div>';
  (AIP.CAPSTONES || []).forEach(function (item) {
    html += '<div class="card"><h3>' + AIP.escape(item.id) + ' · ' + AIP.escape(item.title) + '</h3><p>' + AIP.escape(item.summary) + '</p>';
    html += '<p>Lifetime ' + item.hours + ' hours. ' + AIP.escape(item.cost) + '.</p></div>';
  });
  return html;
};
