window.SD = window.SD || {};

function sdRenderSketchSection(sketches, accent) {
  if (!sketches || !sketches.length) return '';
  return `
      <div>
        <h3 class="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity:.7"><polygon points="5 4 15 12 5 20 5 4"/></svg>
          End-to-end animated process flows
        </h3>
        <p class="text-neutral-500 text-xs mb-4 leading-relaxed">Each sketch is paced as a loop you can read without extra context: left-side input, middle system decision, right-side outcome, plus the UI signal worth showing.</p>
        <div class="space-y-4">
          ${sketches
            .map(
              (s) => `
            <div class="sketch-shell">
              <div class="sketch-shell-head">
                <div>
                  <div class="sketch-shell-title" style="color:${accent}">${s.title}</div>
                  <div class="sketch-shell-meta">Flow reads left to right · phase pill shows current step</div>
                </div>
                <span class="sketch-shell-tag" style="border-color:${accent}55;color:${accent}">E2E loop</span>
              </div>
              <canvas class="sd-sketch-canvas" data-sketch="${s.id}" width="10" height="10" aria-hidden="true"></canvas>
              <p class="sketch-shell-cap">${s.caption}</p>
            </div>`
            )
            .join('')}
        </div>
      </div>`;
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
  if (typeof SD.stopAllSketches === 'function') SD.stopAllSketches();

  const prevIdx = concepts.findIndex((x) => x.id === id) - 1;
  const nextIdx = concepts.findIndex((x) => x.id === id) + 1;
  const prevId = prevIdx >= 0 ? concepts[prevIdx].id : null;
  const nextId = nextIdx < concepts.length ? concepts[nextIdx].id : null;

  box.innerHTML = `
        <div class="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/[.06]" style="background:#0a0a0a">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center" style="background:${z.bg}">
                    <i data-lucide="${c.icon}" class="w-4.5 h-4.5" style="color:${z.color}"></i>
                </div>
                <div>
                    <div class="zone-tag" style="background:${z.bg};color:${z.color};margin-bottom:0;font-size:.55rem">${z.label}</div>
                    <h2 class="text-lg font-semibold tracking-tight">${c.title}</h2>
                </div>
            </div>
            <button type="button" onclick="window.sdCloseModal()" class="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                <i data-lucide="x" class="w-4 h-4 text-neutral-400"></i>
            </button>
        </div>

        <div class="px-6 py-6 space-y-8">
            <div>
                <h3 class="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">Overview</h3>
                <p class="text-neutral-300 text-sm leading-relaxed">${c.overview}</p>
            </div>

            <div class="rounded-xl border border-white/[.06] bg-white/[.02] p-5">
                ${window.sdGetDiagram(c.diagram, z.color)}
            </div>

            ${sdRenderSketchSection(c.sketches, z.color)}

            <div>
                <h3 class="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Key concepts</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    ${c.keyConcepts
                      .map(
                        (kc) => `
                        <div class="conc-card">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-6 h-6 rounded-md flex items-center justify-center" style="background:${z.bg}">
                                    <i data-lucide="${kc.icon}" class="w-3.5 h-3.5" style="color:${z.color}"></i>
                                </div>
                                <span class="text-sm font-medium">${kc.name}</span>
                            </div>
                            <p class="text-neutral-400 text-xs leading-relaxed">${kc.desc}</p>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <h3 class="text-xs font-semibold tracking-widest uppercase text-emerald-400/70 mb-3 flex items-center gap-2">
                        <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i> Pros
                    </h3>
                    <ul class="space-y-2">
                        ${c.pros.map((p) => `<li class="pro-i text-sm text-neutral-300 leading-relaxed">${p}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="text-xs font-semibold tracking-widest uppercase text-red-400/70 mb-3 flex items-center gap-2">
                        <i data-lucide="thumbs-down" class="w-3.5 h-3.5"></i> Cons
                    </h3>
                    <ul class="space-y-2">
                        ${c.cons.map((co) => `<li class="con-i text-sm text-neutral-300 leading-relaxed">${co}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div>
                <h3 class="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4 flex items-center gap-2">
                    <i data-lucide="scale" class="w-3.5 h-3.5"></i> Tradeoffs
                </h3>
                <div class="space-y-5">
                    ${c.tradeoffs
                      .map(
                        (tf) => `
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-xs font-medium" style="color:${z.color}">${tf.left}</span>
                                <span class="text-xs font-medium text-neutral-500">${tf.right}</span>
                            </div>
                            <div class="tf-bar">
                                <div class="tf-fill" style="width:${tf.pct}%;background:${z.color}"></div>
                            </div>
                            <p class="text-neutral-500 text-xs mt-2 leading-relaxed">${tf.label}</p>
                        </div>
                    `
                      )
                      .join('')}
                </div>
            </div>

            <div class="flex items-center justify-between pt-4 border-t border-white/[.06]">
                ${prevId
                  ? `
                    <button type="button" onclick="window.sdNavigateModal('${prevId}')" class="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
                        <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i> ${concepts.find((x) => x.id === prevId).title}
                    </button>
                `
                  : '<div></div>'}
                ${nextId
                  ? `
                    <button type="button" onclick="window.sdNavigateModal('${nextId}')" class="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5">
                        ${concepts.find((x) => x.id === nextId).title} <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                    </button>
                `
                  : '<div></div>'}
            </div>
        </div>
    `;

  lucide.createIcons();
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  box.scrollTop = 0;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof SD.startSketchesIn === 'function') SD.startSketchesIn(box, z.color);
    });
  });
}

function sdCloseModal() {
  if (typeof SD.stopAllSketches === 'function') SD.stopAllSketches();
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
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
  if (pf) pf.style.borderColor = n === concepts.length ? 'rgba(52,211,153,.3)' : 'rgba(255,255,255,.1)';
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
    el.className = `rm-item ${side} mb-16`;
    el.id = `rm-${c.id}`;
    el.innerHTML = `
        <div class="rm-card ${side === 'left' ? '' : 'rm-spacer'}" style="${side === 'left' ? '' : 'display:none'}">
            ${side === 'left' ? `
            <div class="rm-card-inner" role="button" tabindex="0" data-open="${c.id}">
                <div class="accent" style="background:${z.color}"></div>
                <div class="zone-tag" style="background:${z.bg};color:${z.color}">${z.label}</div>
                <h3 class="text-lg font-semibold tracking-tight mb-1">${c.title}</h3>
                <p class="text-neutral-400 text-sm leading-relaxed mb-3">${c.tagline}</p>
                <span class="inline-flex items-center gap-1 text-xs font-medium" style="color:${z.color}">
                    Explore <i data-lucide="arrow-right" class="w-3 h-3"></i>
                </span>
            </div>` : ''}
        </div>
        <div class="rm-node">
            <div class="nd" id="nd-${c.id}" style="border-color:${z.color}40" data-open="${c.id}">
                <div class="pulse" style="border-color:${z.color}"></div>
                <i data-lucide="${c.icon}" class="w-5 h-5" style="color:${z.color}"></i>
            </div>
        </div>
        <div class="${side === 'right' ? 'rm-card' : 'rm-spacer'}" style="${side === 'right' ? '' : 'display:none'}">
            ${side === 'right' ? `
            <div class="rm-card-inner" role="button" tabindex="0" data-open="${c.id}">
                <div class="accent" style="background:${z.color}"></div>
                <div class="zone-tag" style="background:${z.bg};color:${z.color}">${z.label}</div>
                <h3 class="text-lg font-semibold tracking-tight mb-1">${c.title}</h3>
                <p class="text-neutral-400 text-sm leading-relaxed mb-3">${c.tagline}</p>
                <span class="inline-flex items-center gap-1 text-xs font-medium" style="color:${z.color}">
                    Explore <i data-lucide="arrow-right" class="w-3 h-3"></i>
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
