// Plain inputs for a written desk. One step at a time. No code editor.

export function createForm(parent, options) {
  const fields = options.fields || []
  const root = document.createElement('div')
  root.className = 'lp-form'
  const steps = document.createElement('div')
  steps.className = 'lp-steps'
  steps.setAttribute('role', 'tablist')

  for (const tab of options.tabs || []) {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'lp-step'
    button.setAttribute('role', 'tab')
    button.setAttribute('aria-selected', tab.current ? 'true' : 'false')
    if (tab.current) button.classList.add('is-active')
    if (tab.done) button.classList.add('is-done')
    else if (tab.dirty) button.classList.add('is-dirty')
    button.append(document.createTextNode(tab.label || 'Step'))
    if (tab.done) {
      const saved = document.createElement('span')
      saved.className = 'lp-editor-saved'
      saved.textContent = ' ✓'
      button.append(saved)
    }
    button.addEventListener('click', () => options.onTab?.(tab.id))
    steps.append(button)
  }
  if ((options.tabs || []).length > 1) root.append(steps)

  const list = document.createElement('div')
  list.className = 'lp-fields'
  const inputs = []
  fields.forEach((field) => {
    const wrap = document.createElement('label')
    wrap.className = 'lp-field'
    wrap.dataset.field = field.id
    const name = document.createElement('span')
    name.textContent = field.label || 'Answer'
    const input = document.createElement('input')
    input.type = 'text'
    input.spellcheck = false
    input.autocomplete = 'off'
    input.autocapitalize = 'off'
    input.placeholder = field.placeholder || ''
    input.value = options.values?.[field.id] || ''
    input.setAttribute('aria-label', field.label || 'Answer')
    input.addEventListener('input', () => options.onChange?.(read()))
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      const index = inputs.indexOf(input)
      if (index < inputs.length - 1) inputs[index + 1].focus()
      else options.onSubmit?.()
    })
    wrap.append(name, input)
    list.append(wrap)
    inputs.push(input)
  })
  root.append(list)
  parent.replaceChildren(root)

  function read() {
    const values = {}
    fields.forEach((field, index) => { values[field.id] = inputs[index].value })
    return values
  }

  return {
    focus() {
      const index = inputs.findIndex((input) => !input.value.trim())
      ;(inputs[index === -1 ? 0 : index] || inputs[0])?.focus()
    },
    setMarks(marks) {
      for (const wrap of list.children) {
        const mark = marks?.[wrap.dataset.field] || ''
        wrap.classList.toggle('is-ok', mark === 'ok')
        wrap.classList.toggle('is-bad', mark === 'bad')
      }
    },
    getValues: read,
  }
}
