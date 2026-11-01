// Lecture quizzes on the landing page (My tasks).
// Questions come from students/<student>/<subject>/quizzes/quiz-NN-…/quiz.json.
// Answers stay in this browser under learning-project:quiz:
//   { [anchor]: { picks: { [questionId]: [optionId] }, checked: { [questionId]: true } } }
// anchor is quiz-<student>-<subject>-<NN>, listed in #quiz-index.

const KEY = 'learning-project:quiz'

export function questionProblem(question) {
  if (!question || typeof question !== 'object') return 'is not an object'
  if (typeof question.id !== 'string' || !question.id.trim()) return 'needs an id'
  if (typeof question.prompt !== 'string' || !question.prompt.trim()) return 'needs a prompt'
  if (typeof question.explain !== 'string' || !question.explain.trim()) return 'needs an explain'
  if (!Array.isArray(question.options) || question.options.length < 2) return 'needs at least two options'
  const ids = new Set()
  let correct = 0
  let wrong = 0
  for (const option of question.options) {
    if (!option || typeof option !== 'object') return 'has an option that is not an object'
    if (typeof option.id !== 'string' || !option.id.trim()) return 'has an option with no id'
    if (ids.has(option.id)) return `has two options with id ${option.id}`
    ids.add(option.id)
    if (typeof option.text !== 'string' || !option.text.trim()) return `option ${option.id} needs text`
    if (typeof option.why !== 'string' || !option.why.trim()) return `option ${option.id} needs a why`
    if (typeof option.correct !== 'boolean') return `option ${option.id} needs correct true or false`
    if (option.correct) correct += 1
    else wrong += 1
  }
  if (!correct) return 'needs a right option'
  if (!wrong) return 'needs a wrong option'
  return ''
}

export function grade(question, picks) {
  const correct = (question?.options ?? []).filter((option) => option.correct).map((option) => option.id).sort()
  const chosen = [...new Set(picks ?? [])].sort()
  const right = chosen.length === correct.length && chosen.every((id, index) => id === correct[index])
  return { right, correct }
}

function loadAll() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '{}')
    return value && typeof value === 'object' ? value : {}
  } catch {
    return {}
  }
}

function saveAll(value) {
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Private mode: answers last until this tab closes.
  }
}

function slotOf(all, anchor) {
  const slot = all[anchor]
  if (!slot || typeof slot !== 'object') all[anchor] = { picks: {}, checked: {} }
  if (!all[anchor].picks || typeof all[anchor].picks !== 'object') all[anchor].picks = {}
  if (!all[anchor].checked || typeof all[anchor].checked !== 'object') all[anchor].checked = {}
  return all[anchor]
}

function picksOf(slot, id) {
  const value = slot.picks[id]
  return Array.isArray(value) ? value.filter((pick) => typeof pick === 'string') : []
}

function el(tag, className, text) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (text != null) node.textContent = text
  return node
}

function button(label, className, onClick) {
  const node = el('button', className, label)
  node.type = 'button'
  node.addEventListener('click', onClick)
  return node
}

function boot() {
  if (typeof document === 'undefined') return
  const player = document.getElementById('quiz-player')
  const indexNode = document.getElementById('quiz-index')
  if (!player || !indexNode) return

  let catalog = []
  try {
    catalog = JSON.parse(indexNode.textContent)
  } catch {
    catalog = []
  }
  const byAnchor = new Map((Array.isArray(catalog) ? catalog : []).map((item) => [item.anchor, item]))

  let request = 0
  let current = null

  document.addEventListener('click', (event) => {
    const opener = event.target.closest?.('[data-quiz-open]')
    if (!opener) return
    const item = byAnchor.get(opener.dataset.quizOpen)
    if (item) open(item)
  })

  const select = document.getElementById('student-select')
  if (select) {
    select.addEventListener('change', () => {
      if (select.value && player.dataset.student && player.dataset.student !== select.value) close()
    })
  }

  window.addEventListener('hashchange', openFromHash)
  openFromHash()

  function openFromHash() {
    const item = byAnchor.get(location.hash.slice(1))
    if (item) open(item)
  }

  function close() {
    request += 1
    current = null
    player.hidden = true
    delete player.dataset.student
    player.replaceChildren()
  }

  async function open(item) {
    const ticket = ++request
    current = null
    player.hidden = false
    player.dataset.student = item.student
    player.replaceChildren(el('p', null, 'Loading this lecture…'))
    if (select && select.value !== item.student) {
      select.value = item.student
      select.dispatchEvent(new Event('change'))
    }
    if (location.hash.slice(1) !== item.anchor) {
      history.replaceState(null, '', `${location.pathname}${location.search}#${item.anchor}`)
    }

    let quiz
    try {
      const response = await fetch(item.src)
      if (!response.ok) throw new Error(String(response.status))
      quiz = await response.json()
    } catch {
      if (ticket !== request) return
      player.replaceChildren(el('p', null, 'This lecture could not be loaded.'))
      return
    }
    if (ticket !== request) return

    const raw = Array.isArray(quiz?.questions) ? quiz.questions : []
    if (!raw.length) {
      player.replaceChildren(el('p', null, 'This lecture has no questions yet.'))
      return
    }
    const problems = raw.flatMap((question, index) => {
      const problem = questionProblem(question)
      return problem ? [`Question ${index + 1}: ${problem}`] : []
    })
    if (problems.length) {
      player.replaceChildren(
        el('p', null, 'This lecture quiz needs a fix before it can be played.'),
        ...problems.map((text) => el('p', null, text)),
      )
      return
    }

    const questions = raw
    const stored = slotOf(loadAll(), item.anchor)
    const cursor = questions.findIndex((question) => !stored.checked[question.id])
    current = {
      item,
      title: typeof quiz.title === 'string' && quiz.title.trim() ? quiz.title.trim() : item.title,
      questions,
      cursor: cursor === -1 ? questions.length : cursor,
      fromSummary: false,
    }
    if (current.cursor === questions.length) renderSummary()
    else renderQuestion()
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    player.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' })
  }

  function storedSlot() {
    const all = loadAll()
    return { all, slot: slotOf(all, current.item.anchor) }
  }

  function rightCount(slot) {
    return current.questions.filter((question) => slot.checked[question.id] && grade(question, picksOf(slot, question.id)).right).length
  }

  function renderQuestion() {
    const { item, title, questions, cursor } = current
    const question = questions[cursor]
    const { slot } = storedSlot()
    const checked = Boolean(slot.checked[question.id])
    const picks = picksOf(slot, question.id)
    const multiple = question.options.filter((option) => option.correct).length > 1
    const result = grade(question, picks)

    player.replaceChildren()
    player.append(el('p', 'quiz-kicker', item.subject))
    player.append(el('h3', null, title))
    player.append(el('p', 'quiz-progress', `Question ${cursor + 1} of ${questions.length} · ${rightCount(slot)} right so far`))

    if (checked) {
      const banner = el('p', `quiz-banner ${result.right ? 'is-right' : 'is-wrong'}`, result.right ? 'Right.' : 'Not yet.')
      player.append(banner)
    }

    const field = el('fieldset', 'quiz-options')
    field.append(el('legend', 'quiz-prompt', question.prompt))
    field.append(el('p', 'quiz-hint', multiple ? 'Pick every right answer.' : 'Pick one answer.'))

    for (const option of question.options) {
      const picked = picks.includes(option.id)
      const label = el('label', 'quiz-option')
      if (checked && option.correct && picked) label.classList.add('is-right')
      else if (checked && option.correct) label.classList.add('is-missed')
      else if (checked && picked) label.classList.add('is-wrong')
      const input = document.createElement('input')
      input.type = multiple ? 'checkbox' : 'radio'
      input.name = question.id
      input.value = option.id
      input.checked = picked
      input.disabled = checked
      const body = el('span', 'quiz-option-body')
      body.append(el('span', null, option.text))
      if (checked) body.append(el('span', 'quiz-why', option.why))
      label.append(input, body)
      field.append(label)
    }
    player.append(field)

    if (checked) {
      const more = el('div', 'quiz-explain')
      more.append(el('h4', null, 'More about this'), el('p', null, question.explain))
      player.append(more)
    }

    const actions = el('div', 'quiz-actions')
    if (!checked) {
      const check = button('Check', null, () => {
        const chosen = [...field.querySelectorAll('input:checked')].map((input) => input.value)
        if (!chosen.length) return
        const next = storedSlot()
        next.slot.picks[question.id] = chosen
        next.slot.checked[question.id] = true
        saveAll(next.all)
        renderQuestion()
      })
      check.disabled = picks.length === 0
      field.addEventListener('change', () => {
        const chosen = [...field.querySelectorAll('input:checked')].map((input) => input.value)
        check.disabled = chosen.length === 0
        const next = storedSlot()
        next.slot.picks[question.id] = chosen
        saveAll(next.all)
      })
      actions.append(check)
    }
    if (cursor > 0) actions.append(button('Previous', 'quiz-quiet', () => go(-1)))
    if (checked && cursor < questions.length - 1) actions.append(button('Next question', null, () => go(1)))
    if (checked && cursor === questions.length - 1 && !current.fromSummary) actions.append(button('See your score', null, renderSummary))
    if (current.fromSummary) actions.append(button('Back to score', 'quiz-quiet', renderSummary))
    if (actions.childElementCount) player.append(actions)
  }

  function go(delta) {
    const next = current.cursor + delta
    if (next < 0 || next >= current.questions.length) return
    current.cursor = next
    current.fromSummary = false
    renderQuestion()
  }

  function renderSummary() {
    const { slot } = storedSlot()
    const total = current.questions.length
    const right = rightCount(slot)
    player.replaceChildren()
    player.append(el('p', 'quiz-kicker', current.item.subject))
    player.append(el('h3', null, current.title))
    player.append(el('p', 'quiz-banner', `${right} of ${total} right.`))
    const list = el('ul', 'quiz-summary')
    current.questions.forEach((question, index) => {
      const row = el('li')
      const result = grade(question, picksOf(slot, question.id))
      row.append(button(`Question ${index + 1}`, null, () => {
        current.cursor = index
        current.fromSummary = true
        renderQuestion()
      }))
      row.append(el('span', result.right ? 'status done' : 'status', result.right ? 'Right' : 'Not yet'))
      list.append(row)
    })
    player.append(list)
    const actions = el('div', 'quiz-actions')
    actions.append(button('Try this lecture again', 'quiz-quiet', () => {
      if (!confirm('Clear your answers for this lecture and start again?')) return
      const all = loadAll()
      delete all[current.item.anchor]
      saveAll(all)
      current.cursor = 0
      current.fromSummary = false
      renderQuestion()
    }))
    actions.append(button('Close', 'quiz-quiet', () => {
      close()
      if (location.hash) history.replaceState(null, '', location.pathname + location.search)
    }))
    player.append(actions)
  }
}

boot()
