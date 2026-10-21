// Learning-path progress, saved in this browser (localStorage).
// On the landing page: ticks, stage counts, "Continue" button, student picker.
// On every other page of the site: a small bar that says which step this is,
// with "Done, next step" (steps come from /hub/path.json, written by build-site.mjs).
(function () {
  const KEY = 'learning-project:done'
  const STUDENT_KEY = 'learning-project:student'

  function load(key, fallback) {
    try {
      const value = localStorage.getItem(key)
      return value === null ? fallback : JSON.parse(value)
    } catch {
      return fallback
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Private mode or blocked storage: progress lasts until the tab closes.
    }
  }

  const done = new Set(load(KEY, []))
  const persist = () => save(KEY, [...done])

  // "/tracks/java/topics/arrays/index.html" and "/tracks/java/topics/arrays/" are one page.
  function normalize(url) {
    const u = new URL(url, location.href)
    return { path: u.pathname.replace(/(index|README)\.html$/, ''), lesson: u.hash.slice(1).split('/')[0] }
  }

  function landing() {
    const rows = [...document.querySelectorAll('[data-step]')]
    const main = rows.filter((row) => !row.hasAttribute('data-optional'))
    const continueButton = document.getElementById('continue')

    function render(openCurrent) {
      const current = main.find((row) => !done.has(row.dataset.step))
      for (const row of rows) {
        row.querySelector('input').checked = done.has(row.dataset.step)
        row.classList.toggle('done', done.has(row.dataset.step))
        row.classList.toggle('current', row === current)
      }
      for (const stage of document.querySelectorAll('[data-stage]')) {
        const steps = [...stage.querySelectorAll('[data-step]')]
        const count = steps.filter((row) => done.has(row.dataset.step)).length
        stage.querySelector('.stage-count').textContent = `${count} / ${steps.length}`
        stage.classList.toggle('complete', count === steps.length)
        if (openCurrent) stage.open = stage.contains(current) || (!current && stage.hasAttribute('data-optional'))
      }

      const count = main.filter((row) => done.has(row.dataset.step)).length
      const percent = Math.round((count / main.length) * 100)
      document.getElementById('progress-bar').style.width = `${percent}%`
      document.getElementById('progress-text').textContent = `${count} of ${main.length} steps done`
      document.getElementById('hero-progress').hidden = count === 0
      const pill = document.getElementById('progress-pill')
      pill.textContent = `${percent}%`
      pill.hidden = count === 0

      if (!current) {
        continueButton.textContent = 'Path complete. Pick an extra'
        continueButton.href = '#path'
        return
      }
      const link = current.querySelector('.step-title a')
      const title = current.querySelector('.step-title').textContent.trim()
      const number = current.querySelector('.step-num').textContent
      continueButton.textContent = count === 0 ? `Start with step 1: ${title}` : `Continue with step ${number}: ${title}`
      continueButton.href = link ? link.getAttribute('href') : `#${current.id}`
    }

    for (const row of rows) {
      row.querySelector('input').addEventListener('change', (event) => {
        if (event.target.checked) done.add(row.dataset.step)
        else done.delete(row.dataset.step)
        persist()
        render(false)
      })
    }

    document.getElementById('reset-progress').addEventListener('click', () => {
      if (!confirm('Untick every step and start again at step 1?')) return
      done.clear()
      persist()
      render(true)
      document.getElementById('path').scrollIntoView()
    })

    const select = document.getElementById('student-select')
    if (select) {
      const showStudent = () => {
        for (const card of document.querySelectorAll('[data-student]')) card.hidden = Boolean(select.value) && card.dataset.student !== select.value
        save(STUDENT_KEY, select.value)
      }
      select.value = load(STUDENT_KEY, '')
      if (select.selectedIndex < 0) select.value = ''
      select.addEventListener('change', showStudent)
      showStudent()
    }

    render(true)
  }

  const BAR_CSS = `
    .lp-bar { position: fixed; left: 12px; bottom: 12px; z-index: 9999; display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
      max-width: calc(100vw - 24px); padding: 8px 10px 8px 14px; border-radius: 14px; background: #172033; color: #fff;
      font: 500 13px/1.3 system-ui, -apple-system, "Segoe UI", sans-serif; box-shadow: 0 6px 24px rgba(0,0,0,.25); }
    .lp-bar a { color: #fff; }
    .lp-bar .lp-step { opacity: .8; }
    .lp-bar button, .lp-bar .lp-next { border: 0; border-radius: 999px; padding: 6px 12px; font: 700 13px/1 system-ui, sans-serif;
      cursor: pointer; text-decoration: none; background: #22c55e; color: #052e16; }
    .lp-bar .lp-next { background: #fff; color: #172033; }
    @media print { .lp-bar { display: none; } }`

  function stepBar(steps) {
    const style = document.createElement('style')
    style.textContent = BAR_CSS
    document.head.appendChild(style)
    const bar = document.createElement('div')
    bar.className = 'lp-bar'
    document.body.appendChild(bar)

    function render() {
      const here = normalize(location.href)
      const matches = steps.filter((step) => {
        if (!step.url) return false
        const target = normalize(step.url)
        return target.path === here.path && (!target.lesson || target.lesson === here.lesson)
      })
      const step = matches.find((s) => !done.has(s.id)) ?? matches[0]
      bar.textContent = ''
      const home = document.createElement('a')
      home.href = step ? `/hub/#${step.id}` : '/hub/#path'
      home.textContent = '← Path'
      bar.append(home)
      if (!step) return

      const label = document.createElement('span')
      label.className = 'lp-step'
      label.textContent = step.n ? `Step ${step.n} of ${steps.filter((s) => s.n).length}` : 'Extra'
      bar.append(label)

      const next = steps[steps.indexOf(step) + 1]
      const nextHref = next && next.optional === step.optional ? next.url || `/hub/#${next.id}` : '/hub/#path'
      if (done.has(step.id)) {
        const link = document.createElement('a')
        link.className = 'lp-next'
        link.href = nextHref
        link.textContent = 'Done ✓ · Next step →'
        bar.append(link)
      } else {
        const button = document.createElement('button')
        button.type = 'button'
        button.textContent = 'I did this ✓'
        button.addEventListener('click', () => {
          done.add(step.id)
          persist()
          location.href = nextHref
        })
        bar.append(button)
      }
    }

    window.addEventListener('hashchange', render)
    render()
  }

  if (document.querySelector('[data-step]')) {
    landing()
  } else if (location.protocol.startsWith('http')) {
    fetch('/hub/path.json')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.statusText))))
      .then(stepBar)
      .catch(() => {})
  }
})()
