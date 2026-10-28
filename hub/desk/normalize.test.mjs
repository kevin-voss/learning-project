import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { checkField, normalize } from './normalize.mjs'
import { highlightJava, highlightSource } from './java/editor.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '../..')

test('bits ignore spaces and the b suffix', () => {
  assert.equal(normalize('bits', '1010 0110b'), '10100110')
  assert.equal(normalize('bits', '0b10100110'), '10100110')
  assert.equal(checkField({ kind: 'bits', accept: ['10100110b'] }, '1010 0110').ok, true)
})

test('hex ignores spaces, case, and h', () => {
  assert.equal(normalize('hex', '48 61 6C 6C 6F 00h'), '48616c6c6f00')
  assert.equal(checkField({ kind: 'hex', accept: ['6Ch'] }, '6c').ok, true)
})

test('numbers accept powers, suffixes, and leading zeros on the digit', () => {
  assert.equal(normalize('number', '2¹⁰'), '2^10')
  assert.equal(normalize('number', '2 ** 10 Byte'), '2^10')
  assert.equal(normalize('number', '1 048 576'), '1048576')
  assert.equal(normalize('number', '04 bytes'), '4')
  assert.equal(normalize('number', '0100'), '100')
  const field = { kind: 'number', accept: ['4', '2^10', '1024'] }
  assert.equal(checkField(field, '2¹⁰').ok, true)
  assert.equal(checkField(field, '1,024').ok, true)
  assert.equal(checkField(field, '0100').ok, false)
})

test('text keeps case and strips one pair of quotes', () => {
  assert.equal(normalize('text', '"WI@HsH"'), 'WI@HsH')
  assert.equal(normalize('text', "'7'"), '7')
  assert.equal(checkField({ kind: 'text', accept: ['WI@HsH'] }, 'wi@hsh').ok, false)
})

test('word takes the first word', () => {
  assert.equal(normalize('word', 'End (not printed)'), 'end')
  assert.equal(checkField({ kind: 'word', accept: ['end', 'null'] }, '(null)').ok, true)
})

test('a known mistake beats the generic hint and never counts as right', () => {
  const field = {
    kind: 'bits',
    accept: ['10100110'],
    hint: 'Flip each bit.',
    traps: [{ accept: ['10011010b'], hint: 'That row is mirrored.' }],
  }
  const trap = checkField(field, '1001 1010')
  assert.equal(trap.ok, false)
  assert.equal(trap.hint, 'That row is mirrored.')
  assert.equal(checkField(field, '').hint, 'Type an answer in the editor.')
})

test('Java highlighting colours keywords, hex, strings and comments', () => {
  const html = highlightJava('int x = 10100110b; <tag>')
  assert.match(html, /hljs-keyword">int</)
  assert.match(html, /hljs-number">10100110b</)
  assert.match(html, /&lt;tag&gt;/)
  assert.doesNotMatch(html, /<tag>/)
  const hex = highlightJava('48 61 6C 6Ch 00h FFh')
  assert.match(hex, /hljs-number">48</)
  assert.match(hex, /hljs-number">6C</)
  assert.match(hex, /hljs-number">6Ch</)
  assert.match(hex, /hljs-number">00h</)
  assert.match(hex, /hljs-number">FFh</)
  const java = highlightJava('String s = "Hi"; // end')
  assert.match(java, /hljs-title">String</)
  assert.match(java, /hljs-string">"Hi"</)
  assert.match(java, /hljs-comment">\/\/ end</)
  assert.equal(highlightJava('each the').includes('hljs'), false)
  const block = highlightSource('int x;\n/* keep\ngoing */\nreturn x;')
  assert.match(block, /hljs-comment">\/\* keep</)
  assert.match(block, /hljs-comment">going \*\/</)
  assert.match(block, /hljs-keyword">return</)
})

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue
    const path = join(dir, name)
    if (statSync(path).isDirectory()) walk(path, out)
    else if (name === 'checks.json') out.push(path)
  }
  return out
}

test('every checks.json answer matches, and traps do not', () => {
  const files = walk(join(root, 'students'))
  assert.ok(files.length >= 7, 'expected the Informatik exercise 01 desks')
  for (const file of files) {
    const spec = JSON.parse(readFileSync(file, 'utf8'))
    for (const part of spec.parts) {
      assert.ok(part.id && part.fields?.length, file)
      for (const field of part.fields) {
        const ok = new Set((field.accept || []).map((item) => normalize(field.kind, item)))
        for (const item of field.accept || []) {
          assert.equal(checkField(field, item).ok, true, `${file} ${part.id} ${field.id} ${item}`)
        }
        for (const trap of field.traps || []) {
          assert.ok(trap.hint, `${file} trap needs a hint`)
          for (const item of trap.accept || []) {
            const got = normalize(field.kind, item)
            assert.equal(ok.has(got), false, `${file} trap overlaps accept: ${item}`)
            const result = checkField(field, item)
            assert.equal(result.ok, false)
            assert.equal(result.hint, trap.hint)
          }
        }
      }
    }
  }
})
