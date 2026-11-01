import assert from 'node:assert/strict'
import { test } from 'node:test'
import { grade, questionProblem } from './quiz.js'

const question = {
  id: 'q1',
  prompt: 'Which of these are primary colours of light?',
  explain: 'Screens mix red, green and blue light.',
  options: [
    { id: 'a', text: 'Red', correct: true, why: 'Red is one of the three.' },
    { id: 'b', text: 'Green', correct: true, why: 'Green is one of the three.' },
    { id: 'c', text: 'Yellow', correct: false, why: 'Yellow is a mix, not a primary of light.' },
  ],
}

test('every right option and no extra pick counts as right', () => {
  assert.equal(grade(question, ['b', 'a']).right, true)
})

test('a missing right option counts as wrong', () => {
  assert.equal(grade(question, ['a']).right, false)
})

test('an extra wrong pick counts as wrong', () => {
  assert.equal(grade(question, ['a', 'b', 'c']).right, false)
})

test('a complete question has no problem', () => {
  assert.equal(questionProblem(question), '')
})

test('a question with no wrong option is rejected', () => {
  const onlyRight = {
    ...question,
    options: question.options.filter((option) => option.correct),
  }
  assert.match(questionProblem(onlyRight), /wrong option/)
})
