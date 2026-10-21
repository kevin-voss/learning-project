import test from 'node:test';
import assert from 'node:assert/strict';
import { READABLE_MAX, READABLE_MIN, autoScale, fitScale, zoomDimensions } from '../../js/runtime/page/diagrams.js';
import { sidebarExpanded } from '../../js/runtime/nav/navigation.js';
import { fuzzyScore, solId } from '../../js/runtime/nav/search.js';

test('auto scale fits slightly wide diagrams but never shrinks labels below the readable floor', () => {
  assert.equal(autoScale(1100, 200, 1000), 1000 / 1100);
  assert.equal(autoScale(2200, 200, 1000), READABLE_MIN);
});

test('auto scale never blows small diagrams up past the readable ceiling', () => {
  assert.equal(autoScale(400, 300, 1000), READABLE_MAX);
  assert.equal(autoScale(400, 300, 1000, { max: 1.8 }), 1.8);
});

test('auto scale caps tall diagrams to the available height within readable limits', () => {
  assert.equal(autoScale(500, 1000, 1000, { maxHeight: 900 }), .9);
  assert.equal(autoScale(500, 2000, 1000, { maxHeight: 900 }), READABLE_MIN);
});

test('Fit shows the whole diagram and zoom keeps the aspect ratio', () => {
  assert.equal(fitScale(2000, 400, 1000), .5);
  assert.equal(fitScale(800, 1600, 1000, 800), .5);
  const zoomed = zoomDimensions(1200, 600, 1.2);
  assert.equal(zoomed.height / zoomed.width, .5);
  assert.equal(zoomed.width, 1440);
});

test('sidebar accessibility state follows desktop preference and mobile drawer state', () => {
  assert.equal(sidebarExpanded(true, false, false), true);
  assert.equal(sidebarExpanded(true, true, true), false);
  assert.equal(sidebarExpanded(false, false, false), false);
  assert.equal(sidebarExpanded(false, true, true), true);
});

test('fuzzy search tolerates gaps and typos-by-omission but rejects scattered letters', () => {
  assert.ok(fuzzyScore('kv cach', 'KV cache memory math'));
  assert.ok(fuzzyScore('rrf', 'Reciprocal rank fusion (RRF)'));
  assert.ok(fuzzyScore('trnsfrmr', 'Transformer architecture'));
  assert.equal(fuzzyScore('xyz', 'Transformer architecture'), null);
  assert.equal(fuzzyScore('agent card', 'Tool calling'), null);
});

test('fuzzy search ranks contiguous word-start matches above scattered ones', () => {
  const direct = fuzzyScore('rag', 'RAG the big picture').score;
  const scattered = fuzzyScore('rag', 'Reranking at grade').score;
  assert.ok(direct > scattered);
});

test('accordion anchors are stable slugs scoped to the page', () => {
  assert.equal(solId('mcp', 'MCP remote · Streamable HTTP'), 'mcp--sol-mcp-remote-streamable-http');
});
