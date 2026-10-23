// Vercel serverless: student exercise tutor chat.
// Needs OPENAI_API_KEY. Local: use `vercel dev` (plain static servers skip /api).

const MODEL = 'gpt-5.6-luna-medium'
const MAX_MESSAGES = 40
const MAX_CHARS = 48_000
const MAX_CONTEXT = 12_000

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

function buildSystemPrompt(scope, context) {
  const title = scope?.title || 'this exercise'
  const parts = [
    scope?.student && `Student folder: ${scope.student}`,
    scope?.subject && `Subject: ${scope.subject}`,
    scope?.exercise && `Exercise: ${scope.exercise}`,
    scope?.task && `Task: ${scope.task}`,
  ].filter(Boolean)

  return `You are the Learning Project helper — a small tutor on a beginner coding/learning site.

## Where the student is
They are looking at: **${title}**
${parts.length ? parts.join('\n') : ''}

## How to talk
- Short and compact. Simple words. Explain like for a 6-year-old.
- Picture or metaphor first, then one idea. End with one thing to try.
- Focus on the **thinking process** so they understand — not on dumping the finished answer.
- Answer in the language the student writes in.
- A few short paragraphs or bullets max. No long essays.

## Never give the solution
- Do not write the full answer, final number, finished code, or a complete walkthrough that finishes the task for them.
- Do not quote or invent the sample solution.
- Hints, questions, and the next thinking step only. If they ask you to "just write it", refuse kindly and give the next small step instead.

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
    out.push({ role: m.role, content: clip(content, 8000) })
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

  const messages = normalizeMessages(body.messages)
  if (!messages.length || messages.at(-1)?.role !== 'user') {
    return json(res, 400, { error: 'Send at least one user message.' })
  }

  const payload = JSON.stringify({
    scope: body.scope,
    context: body.context,
    messages,
  })
  if (payload.length > MAX_CHARS) {
    return json(res, 413, { error: 'Conversation too long. Start a new chat.' })
  }

  const system = buildSystemPrompt(body.scope || {}, body.context || {})

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
        temperature: 0.4,
        max_tokens: 500,
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
  return json(res, 200, { reply })
}
