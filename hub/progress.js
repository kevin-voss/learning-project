// Learning-path progress, saved in this browser (localStorage).
// On the landing page: ticks, stage and level counts, the "next step" card, student picker.
// On every other page of the site: a small bar that says which step this is,
// with "I did this" (steps come from /hub/path.json, written by build-site.mjs).
// On every page: the site header's "Continue" button and progress ([data-continue],
// [data-progress-pill], see hub/scripts/header.mjs) and the light/dark toggle ([data-theme-toggle]).
(function () {
  const KEY = 'learning-project:done'
  const STUDENT_KEY = 'learning-project:student'
  const THEME_KEY = 'learning-project:theme'

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

  // The site header: progress in percent and a button to the next unfinished step.
  function header(count, total, next) {
    for (const pill of document.querySelectorAll('[data-progress-pill]')) {
      pill.textContent = `${Math.round((count / total) * 100)}%`
      pill.title = `${count} of ${total} steps done`
      pill.hidden = count === 0
    }
    for (const button of document.querySelectorAll('[data-continue]')) {
      button.textContent = !next ? 'All done ✓' : count === 0 ? 'Start →' : `Step ${next.n} →`
      button.title = next ? `Continue with step ${next.n}: ${next.title}` : 'You finished the path'
      button.href = next ? next.href : '/hub/#path'
    }
  }

  // Light or dark: the reader's choice wins, otherwise the system decides.
  function theme() {
    const root = document.documentElement
    const saved = load(THEME_KEY, null)
    if (saved) root.dataset.theme = saved
    const isDark = () => root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)
    for (const button of document.querySelectorAll('[data-theme-toggle]')) {
      button.addEventListener('click', () => {
        root.dataset.theme = isDark() ? 'light' : 'dark'
        save(THEME_KEY, root.dataset.theme)
      })
    }
  }

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
      for (const level of document.querySelectorAll('[data-level]')) {
        const steps = [...level.querySelectorAll('[data-step]')]
        const count = steps.filter((row) => done.has(row.dataset.step)).length
        level.querySelector('.level-count').textContent = `${count} / ${steps.length} steps`
        level.classList.toggle('complete', count === steps.length)
      }

      const count = main.filter((row) => done.has(row.dataset.step)).length
      const percent = Math.round((count / main.length) * 100)
      document.getElementById('progress-bar').style.width = `${percent}%`
      document.getElementById('progress-text').textContent = `${count} of ${main.length} steps done`
      document.getElementById('hero-progress').hidden = count === 0

      const text = (id, value) => { document.getElementById(id).textContent = value }
      if (!current) {
        text('next-label', 'Path complete 🎉')
        text('next-where', 'You finished every level.')
        text('next-title', 'Pick an extra, or go back to any step.')
        document.getElementById('next-type').hidden = true
        text('next-time', '')
        continueButton.textContent = 'See the extras →'
        continueButton.href = '#path'
        header(count, main.length, null)
        return
      }
      const link = current.querySelector('.step-title a')
      const title = current.querySelector('.step-title').textContent.trim()
      const number = current.querySelector('.step-num').textContent
      const stage = current.closest('.stage')
      const level = current.closest('[data-level]')
      text('next-label', count === 0 ? 'Your first step' : 'Your next step')
      text('next-where', [level?.dataset.levelTitle, `${stage.querySelector('.stage-num').textContent} · ${stage.querySelector('.stage-title').textContent}`].filter(Boolean).join(' · '))
      text('next-title', title)
      const tag = document.getElementById('next-type')
      tag.hidden = false
      tag.className = `lp-tag ${current.dataset.type}`
      tag.textContent = current.querySelector('.step-type').textContent
      text('next-time', current.dataset.time ?? '')
      continueButton.textContent = `${count === 0 ? 'Start' : 'Continue with'} step ${number} →`
      continueButton.href = link ? link.getAttribute('href') : `#${current.id}`
      header(count, main.length, { n: number, title, href: continueButton.href })
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

  function stepBar(steps) {
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

  theme()
  if (document.querySelector('[data-step]')) {
    landing()
  } else if (location.protocol.startsWith('http')) {
    fetch('/hub/path.json')
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.statusText))))
      .then((steps) => {
        const main = steps.filter((step) => step.n)
        const next = main.find((step) => !done.has(step.id))
        header(main.filter((step) => done.has(step.id)).length, main.length, next && { n: next.n, title: next.title, href: next.url || `/hub/#${next.id}` })
        stepBar(steps)
      })
      .catch(() => {})
  }
})()
