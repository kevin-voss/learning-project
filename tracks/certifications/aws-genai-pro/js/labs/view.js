window.AIP = window.AIP || {};

AIP.renderLabs = function () {
  var html = '<div class="hero"><h1>Labs</h1><p class="lede">Level 1 runs in the browser. Level 2 runs on your machine. Level 3 touches AWS only after a typed approval, and that approval also allows automatic deletion.</p></div>';
  [1, 2, 3].forEach(function (level) {
    html += '<h2>Level ' + level + '</h2>';
    (AIP.LABS || []).filter(function (lab) { return lab.level === level; }).forEach(function (lab) {
      html += '<div class="card"><h3>' + AIP.escape(lab.title) + '</h3><p>' + AIP.escape(lab.prompt || "") + '</p>';
      html += '<a class="btn" href="#/labs/' + AIP.escape(lab.id) + '">Open</a></div>';
    });
  });
  html += '<p><a href="#/micro">Back to the six projects</a></p>';
  return html;
};

AIP.renderLab = function (id) {
  var lab = AIP.labById(id);
  if (!lab) return '<div class="card"><p>That lab is not in the catalog.</p></div>';
  var html = '<div class="hero"><h1>' + AIP.escape(lab.title) + '</h1><p class="lede">' + AIP.escape(lab.prompt || "") + '</p></div>';
  if (lab.level === 1) {
    (lab.fields || []).forEach(function (field) {
      html += '<label class="exam-control"><span>' + AIP.escape(field.label) + '</span><select data-lab-field="' + AIP.escape(field.path) + '">';
      (field.options || []).forEach(function (opt) {
        html += '<option value="' + AIP.escape(opt) + '">' + AIP.escape(opt) + '</option>';
      });
      html += '</select></label>';
    });
    html += '<div class="chapter-actions"><button type="button" class="btn primary" data-lab-check="' + AIP.escape(lab.id) + '">Check</button></div>';
    html += '<div id="labResult"></div>';
  } else if (lab.level === 3) {
    html += '<div class="card"><p>Lifetime: ' + lab.hours + ' hours. Template: ' + AIP.escape(lab.template) + '.</p>';
    html += '<p>Deploy from the repo with <code>make lab-deploy</code> only after you intend to pay. This page does not call AWS.</p></div>';
  } else {
    html += '<div class="card"><p>Python ' + AIP.escape(lab.python || "3.9") + '+. From the certification folder, run <code>node scripts/tools/lab-check.mjs ' + AIP.escape(lab.id) + '</code> against your answer JSON.</p></div>';
  }
  html += '<p><a href="#/labs">All labs</a></p>';
  return html;
};
