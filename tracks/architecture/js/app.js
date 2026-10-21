window.SD = window.SD || {};

function sdRenderSketchSection(sketches, z) {
  if (!sketches || !sketches.length) return '';
  return `
      <section>
        <h3 class="sd-label sd-label-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 4 15 12 5 20 5 4"/></svg>
          Watch it move
        </h3>
        <p class="sd-note">Each sketch plays in a loop. Read it left to right: what comes in, what the system decides, what comes out. The pill at the top shows the current step.</p>
        <div class="sd-stack">
          ${sketches
            .map(
              (s) => `
            <div class="sketch-shell">
              <div class="sketch-shell-head">
                <div>
                  <div class="sketch-shell-title" style="color:${z.color}">${s.title}</div>
                  <div class="sketch-shell-meta">Left to right · the pill shows the current step</div>
                </div>
                <span class="sketch-shell-tag" style="border-color:${z.line};color:${z.color}">Loop</span>
              </div>
              <canvas class="sd-sketch-canvas" data-sketch="${s.id}" width="10" height="10" aria-hidden="true"></canvas>
              <p class="sketch-shell-cap">${s.caption}</p>
            </div>`
            )
            .join('')}
        </div>
      </section>`;
}

function openModal(id) {
  const concepts = SD.concepts;
  const ZONES = SD.ZONES;
  const c = concepts.find((x) => x.id === id);
  if (!c) return;
  const z = ZONES[c.zone];
  if (!SD.explored) SD.explored = new Set();
  SD.explored.add(id);

  const nd = document.getElementById(`nd-${id}`);
  if (nd) nd.classList.add('explored');
  window.sdUpdateProgress();

  const box = document.getElementById('modalBox');
  SD.openId = id;
  if (typeof SD.stopAllSketches === 'function') SD.stopAllSketches();

  const prevIdx = concepts.findIndex((x) => x.id === id) - 1;
  const nextIdx = concepts.findIndex((x) => x.id === id) + 1;
  const prevId = prevIdx >= 0 ? concepts[prevIdx].id : null;
  const nextId = nextIdx < concepts.length ? concepts[nextIdx].id : null;

  box.innerHTML = `
        <div class="sd-modal-head">
            <div class="sd-row">
                <div class="sd-icon-box" style="background:${z.bg}">
                    <i data-lucide="${c.icon}" class="sd-icon" style="color:${z.color}"></i>
                </div>
                <div>
                    <div class="zone-tag zone-tag-sm" style="background:${z.bg};color:${z.color}">${z.label}</div>
                    <h2 class="sd-modal-title">${c.title}</h2>
                </div>
            </div>
            <button type="button" onclick="window.sdCloseModal()" class="sd-close" aria-label="Close">
                <i data-lucide="x" class="sd-icon-sm"></i>
            </button>
        </div>

        <div class="sd-modal-body">
            <section>
                <h3 class="sd-label">Overview</h3>
                <p class="sd-text">${c.overview}</p>
            </section>

            <div class="sd-diagram-box">
                ${window.sdGetDiagram(c.diagram, SD.token(z.token))}
            </div>

            ${sdRenderSketchSection(c.sketches, z)}

            <section>
                <h3 class="sd-label">Key concepts</h3>
                <div class="sd-grid-2">
                    ${c.keyConcepts
                      .map(
                        (kc) => `
                        <div class="conc-card">
                            <div class="sd-row sd-row-tight">
                                <div class="sd-icon-box sd-icon-box-sm" style="background:${z.bg}">
                                    <i data-lucide="${kc.icon}" class="sd-icon-sm" style="color:${z.color}"></i>
                                </div>
                                <span class="sd-strong">${kc.name}</span>
                            </div>
                            <p class="sd-small">${kc.desc}</p>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </section>

            <div class="sd-grid-2">
                <section>
                    <h3 class="sd-label sd-label-icon sd-good">
                        <i data-lucide="thumbs-up" class="sd-icon-sm"></i> Pros
                    </h3>
                    <ul class="sd-list">
                        ${c.pros.map((p) => `<li class="pro-i">${p}</li>`).join('')}
                    </ul>
                </section>
                <section>
                    <h3 class="sd-label sd-label-icon sd-bad">
                        <i data-lucide="thumbs-down" class="sd-icon-sm"></i> Cons
                    </h3>
                    <ul class="sd-list">
                        ${c.cons.map((co) => `<li class="con-i">${co}</li>`).join('')}
                    </ul>
                </section>
            </div>

            <section>
                <h3 class="sd-label sd-label-icon">
                    <i data-lucide="scale" class="sd-icon-sm"></i> Tradeoffs
                </h3>
                <div class="sd-stack-lg">
                    ${c.tradeoffs
                      .map(
                        (tf) => `
                        <div>
                            <div class="sd-row sd-row-between">
                                <span class="sd-tf-end" style="color:${z.color}">${tf.left}</span>
                                <span class="sd-tf-end sd-muted">${tf.right}</span>
                            </div>
                            <div class="tf-bar">
                                <div class="tf-fill" style="width:${tf.pct}%;background:${z.color}"></div>
                            </div>
                            <p class="sd-small sd-tf-label">${tf.label}</p>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </section>

            <nav class="sd-modal-nav" aria-label="Other concepts">
                ${prevId
                  ? `
                    <button type="button" onclick="window.sdNavigateModal('${prevId}')" class="sd-nav-btn">
                        <i data-lucide="arrow-left" class="sd-icon-sm"></i> ${concepts.find((x) => x.id === prevId).title}
                    </button>
                `
                  : '<div></div>'}
                ${nextId
                  ? `
                    <button type="button" onclick="window.sdNavigateModal('${nextId}')" class="sd-nav-btn">
                        ${concepts.find((x) => x.id === nextId).title} <i data-lucide="arrow-right" class="sd-icon-sm"></i>
                    </button>
                `
                  : '<div></div>'}
            </nav>
        </div>
    `;

  lucide.createIcons();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  box.scrollTop = 0;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof SD.startSketchesIn === 'function') SD.startSketchesIn(box, z.token);
    });
  });
}

function sdCloseModal() {
  if (typeof SD.stopAllSketches === 'function') SD.stopAllSketches();
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  SD.openId = null;
}

function sdNavigateModal(id) {
  const box = document.getElementById('modalBox');
  box.style.opacity = '0';
  box.style.transform = 'translateY(10px)';
  setTimeout(() => {
    openModal(id);
    box.style.opacity = '1';
    box.style.transform = '';
  }, 150);
}

function sdUpdateProgress() {
  const concepts = SD.concepts;
  const explored = SD.explored || new Set();
  const n = explored.size;
  const el = document.getElementById('progText');
  if (el) el.textContent = `${n} / ${concepts.length} explored`;
  const pf = document.getElementById('progFloat');
  if (pf) pf.classList.toggle('done', n === concepts.length);
}

function sdInitRoadmap() {
  const concepts = SD.concepts;
  const ZONES = SD.ZONES;
  const container = document.getElementById('roadmapItems');
  if (!container) return;

  concepts.forEach((c, i) => {
    const side = i % 2 === 0 ? 'left' : 'right';
    const z = ZONES[c.zone];
    const el = document.createElement('div');
    el.className = `rm-item ${side}`;
    el.id = `rm-${c.id}`;
    el.innerHTML = `
        <div class="rm-card ${side === 'left' ? '' : 'rm-spacer'}" style="${side === 'left' ? '' : 'display:none'}">
            ${side === 'left' ? `
            <div class="rm-card-inner" role="button" tabindex="0" data-open="${c.id}">
                <div class="accent" style="background:${z.color}"></div>
                <div class="zone-tag" style="background:${z.bg};color:${z.color}">${z.label}</div>
                <h3 class="rm-title">${c.title}</h3>
                <p class="rm-tagline">${c.tagline}</p>
                <span class="rm-explore" style="color:${z.color}">
                    Explore <i data-lucide="arrow-right" class="sd-icon-xs"></i>
                </span>
            </div>` : ''}
        </div>
        <div class="rm-node">
            <div class="nd" id="nd-${c.id}" style="border-color:${z.line}" data-open="${c.id}">
                <div class="pulse" style="border-color:${z.color}"></div>
                <i data-lucide="${c.icon}" class="sd-icon-md" style="color:${z.color}"></i>
            </div>
        </div>
        <div class="${side === 'right' ? 'rm-card' : 'rm-spacer'}" style="${side === 'right' ? '' : 'display:none'}">
            ${side === 'right' ? `
            <div class="rm-card-inner" role="button" tabindex="0" data-open="${c.id}">
                <div class="accent" style="background:${z.color}"></div>
                <div class="zone-tag" style="background:${z.bg};color:${z.color}">${z.label}</div>
                <h3 class="rm-title">${c.title}</h3>
                <p class="rm-tagline">${c.tagline}</p>
                <span class="rm-explore" style="color:${z.color}">
                    Explore <i data-lucide="arrow-right" class="sd-icon-xs"></i>
                </span>
            </div>` : ''}
        </div>
    `;
    container.appendChild(el);
  });

  lucide.createIcons();

  container.querySelectorAll('[data-open]').forEach((node) => {
    const cid = node.getAttribute('data-open');
    node.addEventListener('click', () => openModal(cid));
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(cid);
      }
    });
  });

  SD.explored = SD.explored || new Set();
  sdUpdateProgress();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('vis');
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.rm-item').forEach((el) => observer.observe(el));

  function updateLine() {
    const roadmap = document.getElementById('roadmap');
    if (!roadmap) return;
    const rect = roadmap.getBoundingClientRect();
    const h = roadmap.offsetHeight;
    const scrolled = Math.max(0, -rect.top + window.innerHeight * 0.4);
    const pct = Math.min(100, Math.max(0, (scrolled / h) * 100));
    const lineFill = document.getElementById('lineFill');
    if (lineFill) lineFill.style.height = pct + '%';
  }
  window.addEventListener('scroll', updateLine, { passive: true });
  updateLine();

  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) sdCloseModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') sdCloseModal();
  });

  const jr = document.querySelector('a[href="#roadmap"]');
  if (jr)
    jr.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('roadmap').scrollIntoView({ behavior: 'smooth' });
    });
}

window.openModal = openModal;
window.sdCloseModal = sdCloseModal;
window.sdNavigateModal = sdNavigateModal;
window.sdUpdateProgress = sdUpdateProgress;
window.sdInitRoadmap = sdInitRoadmap;

document.addEventListener('DOMContentLoaded', sdInitRoadmap);

// SVG diagrams and canvas sketches hold real colours, so redraw them when the theme changes.
SD.onThemeChange(() => {
  if (!SD.openId) return;
  const box = document.getElementById('modalBox');
  const y = box.scrollTop;
  openModal(SD.openId);
  box.scrollTop = y;
});
