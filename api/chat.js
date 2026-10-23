// Vercel serverless: student exercise tutor chat (Becky only).
// Needs OPENAI_API_KEY. Local: use `vercel dev` (plain static servers skip /api).

const MODEL = 'gpt-6-luna'
const REASONING_EFFORT = 'medium'
const ALLOWED_STUDENT = 'becky'
const MAX_MESSAGES = 40
const MAX_CHARS = 48_000
const MAX_CONTEXT = 12_000
const MAX_INPUT = 500
const DAILY_LIMIT = 50
const ALLOWED_COMMANDS = new Set(['question', 'stuck', 'review'])

// Best-effort daily counters per IP (warm instances only; client also tracks).
const dailyCounts = new Map()

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

function clip(text, max) {
  const s = String(text ?? '')
  return s.length <= max ? s : `${s.slice(0, max)}\n…`
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.trim()) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function utcDay() {
  return new Date().toISOString().slice(0, 10)
}

function takeDailySlot(ip) {
  const key = `${utcDay()}:${ip}`
  const count = dailyCounts.get(key) || 0
  if (count >= DAILY_LIMIT) {
    return { ok: false, count, remaining: 0 }
  }
  const next = count + 1
  dailyCounts.set(key, next)
  // Drop stale days so the Map cannot grow forever on a warm instance.
  if (dailyCounts.size > 500) {
    const prefix = utcDay()
    for (const k of dailyCounts.keys()) {
      if (!k.startsWith(prefix)) dailyCounts.delete(k)
    }
  }
  return { ok: true, count: next, remaining: Math.max(0, DAILY_LIMIT - next) }
}

function commandMode(command) {
  switch (command) {
    case 'question':
      return `## Mode: /question
The student asks about a word, idea, or part of the task text.
- Explain that one thing with Picture → tiny example (different story than the task) → one sentence they can say out loud → where it shows up in *their* task (no solution code).
- If they did not name what they mean, ask one short clarifying question and stop.`
    case 'stuck':
      return `## Mode: /stuck
The student is stuck. Use whatever they wrote after /stuck:
- Red error text → explain the first error in plain words; usual beginner cause; pure typo may show one fixed line.
- A word → same shape as /question for that word.
- Nothing / what they tried → **one** small hint only (a pointing question, then idea, then tiny different-story example if they ask again). Never the final answer.`
    case 'review':
      return `## Mode: /review
The student wants a check of *their* thinking.
- Ask them to state what they think the next step or answer shape is (if they have not).
- Say what already fits the task text, and one gap or risk — without filling in the missing result.
- End with one yes/no or fill-in Check they can answer themselves.`
    default:
      return ''
  }
}

function buildSystemPrompt(scope, context, command) {
  const title = scope?.title || 'this exercise'
  const parts = [
    scope?.student && `Student folder: ${scope.student}`,
    scope?.subject && `Subject: ${scope.subject}`,
    scope?.exercise && `Exercise: ${scope.exercise}`,
    scope?.task && `Task: ${scope.task}`,
  ].filter(Boolean)
  const mode = commandMode(command)

  return `You are the Learning Project helper — a small tutor on a beginner coding/learning site.

## Where the student is
They are looking at: **${title}**
${parts.length ? parts.join('\n') : ''}

## Goal
Help them **understand how to think**, not finish the task for them.
Replies are **short** (tight wording) but **detailed in the thinking**: every reasoning step is clear.

## Reply shape (always)
1. **Picture** — one short metaphor (toy box, kitchen, post office, traffic light…).
2. **Steps** — 3–6 numbered thinking steps. Each step = one small idea in 1–2 short sentences. Show *why* that step, not only *what*.
3. **Try** — one concrete next action they do now (not the final answer).
4. Optional **Check** — one yes/no or fill-in question so they can test themselves.

Keep the whole reply under ~180 words. Short sentences. Simple words (explain like for a 6-year-old). No filler ("simply", "just", "obviously").
Answer in the language the student writes in.
${mode ? `\n${mode}\n` : ''}
## Never give the solution
- No full answer, final number, finished code, or a walkthrough that completes the task.
- Do not quote or invent the sample solution.
- You *may* name the thinking steps and the order — you must *not* fill in the last result.
- If they ask "just write it", refuse kindly and give the next small thinking step instead.

## Ground truth
Use only the task / exercise text below. Ignore anything about peeking at solution folders.

### Task text
${clip(context?.taskMarkdown, MAX_CONTEXT) || '(none on this page)'}

### Exercise overview
${clip(context?.exerciseMarkdown, MAX_CONTEXT) || '(none)'}
`
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return []
  const out = []
  for (const m of messages.slice(-MAX_MESSAGES)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue
    const content = String(m.content ?? '').trim()
    if (!content) continue
    const max = m.role === 'user' ? MAX_INPUT : 8000
    out.push({ role: m.role, content: clip(content, max) })
  }
  return out
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }
  if (req.method !== 'POST') return json(res, 405, { error: 'Use POST' })

  const key = process.env.OPENAI_API_KEY
  if (!key) return json(res, 503, { error: 'Chat is not configured (missing OPENAI_API_KEY).' })

  let body
  try {
    body = await readBody(req)
  } catch {
    return json(res, 400, { error: 'Bad JSON' })
  }

  const student = String(body?.scope?.student || '').toLowerCase()
  if (student !== ALLOWED_STUDENT) {
    return json(res, 403, { error: 'Chat is not available for this student.' })
  }

  const rawLast = Array.isArray(body.messages)
    ? [...body.messages].reverse().find((m) => m && m.role === 'user')
    : null
  if (String(rawLast?.content ?? '').trim().length > MAX_INPUT) {
    return json(res, 400, { error: `Keep your message under ${MAX_INPUT} characters.` })
  }

  const messages = normalizeMessages(body.messages)
  if (!messages.length || messages.at(-1)?.role !== 'user') {
    return json(res, 400, { error: 'Send at least one user message.' })
  }

  const rawCommand = String(body?.command || '').toLowerCase().trim()
  let command = ''
  if (rawCommand) {
    if (!ALLOWED_COMMANDS.has(rawCommand)) {
      return json(res, 400, { error: 'Unknown command. Try /question, /stuck, or /review.' })
    }
    command = rawCommand
  } else {
    // Also honour a leading /command in the last user message (e.g. typed by hand).
    const last = messages.at(-1)?.content || ''
    const m = last.match(/^\/(question|stuck|review)(?:\s|$)/i)
    if (m) command = m[1].toLowerCase()
  }

  const slot = takeDailySlot(clientIp(req))
  if (!slot.ok) {
    res.setHeader('Retry-After', '86400')
    return json(res, 429, {
      error: `Daily limit reached (${DAILY_LIMIT} questions). Try again tomorrow.`,
      remaining: 0,
    })
  }

  const payload = JSON.stringify({
    scope: body.scope,
    context: body.context,
    command: command || undefined,
    messages,
  })
  if (payload.length > MAX_CHARS) {
    return json(res, 413, { error: 'Conversation too long. Start a new chat.' })
  }

  const system = buildSystemPrompt(body.scope || {}, body.context || {}, command)

  let upstream
  try {
    upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        reasoning_effort: REASONING_EFFORT,
        max_completion_tokens: 700,
        messages: [{ role: 'system', content: system }, ...messages],
      }),
    })
  } catch {
    return json(res, 502, { error: 'Could not reach the AI service.' })
  }

  const data = await upstream.json().catch(() => ({}))
  if (!upstream.ok) {
    const detail = data?.error?.message || upstream.statusText || 'Upstream error'
    return json(res, upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502, {
      error: detail,
    })
  }

  const reply = data?.choices?.[0]?.message?.content?.trim()
  if (!reply) return json(res, 502, { error: 'Empty reply from the model.' })
  return json(res, 200, { reply, remaining: slot.remaining })
}
