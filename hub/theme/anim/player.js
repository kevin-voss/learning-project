// Small step-by-step animations that explain one idea (a value filling a box,
// a request travelling to a server, a parcel riding a queue …).
//
// Use in any page:   <div data-anim="boxes"></div>
// Scenes live in hub/theme/anim/scenes.js (window.LP_SCENES). A scene has fixed
// places and a list of frames; each frame moves items between places and says
// one sentence. The reader steps with Back / Next or presses Play.
// With prefers-reduced-motion the items jump instead of gliding and Play is off.
// Pages that render their content later (the track apps) are watched, so a
// [data-anim] element added afterwards still comes alive.
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function el(tag, className, text) {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    return node
  }

  function at(scene, where) {
    if (Array.isArray(where)) return { x: where[0], y: where[1] }
    const place = scene.places[where]
    if (!place) throw new Error(`anim: no place "${where}"`)
    return { x: place.x, y: place.y }
  }

  // Item state after frame n: frames only list what changes.
  function stateAt(scene, n) {
    const items = {}
    for (const frame of scene.frames.slice(0, n + 1)) {
      for (const [id, change] of Object.entries(frame.items ?? {})) {
        items[id] = change === null ? null : { ...(items[id] ?? {}), ...change }
      }
    }
    return items
  }

  function mount(host) {
    if (host.dataset.animReady) return
    const scene = window.LP_SCENES?.[host.dataset.anim]
    if (!scene) return
    host.dataset.animReady = '1'
    host.classList.add('lp-anim')
    if (reduced) host.classList.add('reduced')

    const title = el('p', 'lp-anim-title', scene.title)
    const stage = el('div', 'lp-anim-stage')
    stage.style.height = `${scene.height ?? 220}px`
    const caption = el('p', 'lp-anim-say')
    caption.setAttribute('aria-live', 'polite')
    const code = el('pre', 'lp-anim-code')
    const controls = el('div', 'lp-anim-controls')
    const back = el('button', 'lp-anim-btn', '← Back')
    const play = el('button', 'lp-anim-btn', '▶ Play')
    const next = el('button', 'lp-anim-btn primary', 'Next →')
    const counter = el('span', 'lp-anim-count')
    for (const button of [back, play, next]) button.type = 'button'
    if (reduced) play.hidden = true
    controls.append(back, play, next, counter)

    for (const [name, place] of Object.entries(scene.places)) {
      if (!place.label && !place.w) continue
      const box = el('div', `lp-anim-place ${place.kind ?? 'zone'}`)
      box.dataset.place = name
      box.style.left = `${place.x}%`
      box.style.top = `${place.y}%`
      box.style.width = `${place.w ?? 18}%`
      box.style.height = `${place.h ?? 30}%`
      if (place.label) box.append(el('span', 'lp-anim-place-label', place.label))
      stage.append(box)
    }

    const nodes = {}
    let n = 0
    let timer = null

    function render() {
      const items = stateAt(scene, n)
      for (const [id, item] of Object.entries(items)) {
        let node = nodes[id]
        if (!item) {
          if (node) node.classList.add('gone')
          continue
        }
        if (!node) {
          node = nodes[id] = el('div', 'lp-anim-item')
          stage.append(node)
        }
        const { x, y } = at(scene, item.at)
        node.className = `lp-anim-item ${item.cls ?? ''}`
        node.textContent = item.text ?? ''
        node.style.left = `${x + (item.dx ?? 0)}%`
        node.style.top = `${y + (item.dy ?? 0)}%`
        node.style.height = item.size ? `${item.size}px` : ''
      }
      for (const [id, node] of Object.entries(nodes)) if (!(id in items)) node.classList.add('gone')
      const frame = scene.frames[n]
      for (const place of stage.querySelectorAll('.lp-anim-place')) {
        place.classList.toggle('lit', (frame.light ?? []).includes(place.dataset.place))
      }
      caption.textContent = frame.say ?? ''
      code.textContent = frame.code ?? ''
      code.hidden = !frame.code
      counter.textContent = `${n + 1} / ${scene.frames.length}`
      back.disabled = n === 0
      next.disabled = n === scene.frames.length - 1
    }

    function go(to) {
      n = Math.max(0, Math.min(scene.frames.length - 1, to))
      render()
    }

    function stop() {
      clearInterval(timer)
      timer = null
      play.textContent = '▶ Play'
    }

    back.addEventListener('click', () => { stop(); go(n - 1) })
    next.addEventListener('click', () => { stop(); go(n + 1) })
    play.addEventListener('click', () => {
      if (timer) return stop()
      if (n === scene.frames.length - 1) go(0)
      play.textContent = '❚❚ Pause'
      timer = setInterval(() => (n === scene.frames.length - 1 ? stop() : go(n + 1)), 1600)
    })

    host.replaceChildren(title, stage, caption, code, controls)
    render()
  }

  function scan(root = document) {
    for (const host of root.querySelectorAll('[data-anim]')) mount(host)
  }

  function start() {
    scan()
    new MutationObserver(() => scan()).observe(document.body, { childList: true, subtree: true })
  }

  window.LP_ANIM = { scan }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
})()
