import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

test('1. Search API contract & dynamic indexing', async (t) => {
  await t.test('Search returns matching documents for "variable"', async () => {
    const res = await fetch(`${BASE_URL}/api/search?query=variable`);
    assert.equal(res.status, 200, 'Search API should return 200 OK');
    const data = await res.json();
    assert.ok(Array.isArray(data), 'Response should be a JSON array');
    assert.ok(data.length > 0, 'Should find results for "variable"');
    
    const hasVariablesPage = data.some(
      (item) => item.url && item.url.includes('/docs/python/basics/variables')
    );
    assert.ok(hasVariablesPage, 'Results must include Variables & Assignment route');
  });

  await t.test('Search returns matching documents for "functions"', async () => {
    const res = await fetch(`${BASE_URL}/api/search?query=functions`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.length > 0);
    const hasFunctionsPage = data.some(
      (item) => item.url && item.url.includes('/docs/python/basics/functions')
    );
    assert.ok(hasFunctionsPage, 'Results must include Functions & Scope route');
  });

  await t.test('Search returns newly indexed collections and control flow pages', async () => {
    const res = await fetch(`${BASE_URL}/api/search?query=dictionary`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(data.length > 0, 'Should find results for "dictionary"');
    const hasDictPage = data.some(
      (item) => item.url && item.url.includes('/docs/python/collections/dictionaries')
    );
    assert.ok(hasDictPage, 'Results must include Dictionaries & Hash Tables route');
  });

  await t.test('Search returns empty array for non-matching queries', async () => {
    const res = await fetch(`${BASE_URL}/api/search?query=nonexistentxyz987654321`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.deepEqual(data, []);
  });
});

test('2. Core documentation routes reachability (HTTP 200)', async (t) => {
  const routes = [
    '/',
    '/docs/python',
    '/docs/python/getting-started',
    '/docs/python/basics/syntax-and-types',
    '/docs/python/basics/variables',
    '/docs/python/basics/operators-and-expressions',
    '/docs/python/basics/control-flow',
    '/docs/python/basics/strings',
    '/docs/python/basics/functions',
    '/docs/python/collections/lists',
    '/docs/python/collections/tuples',
    '/docs/python/collections/dictionaries',
    '/docs/python/collections/sets',
    '/docs/python/reference/built-in-functions',
    '/learn',
    '/languages',
    '/tools',
  ];

  for (const route of routes) {
    await t.test(`GET ${route} returns 200 OK`, async () => {
      const res = await fetch(`${BASE_URL}${route}`);
      assert.equal(
        res.status,
        200,
        `Expected ${route} to respond with HTTP 200, got ${res.status}`
      );
    });
  }
});

test('3. Design system tokens & dark-only posture audit', async () => {
  const css = fs.readFileSync('./src/app/globals.css', 'utf-8');
  assert.ok(css.includes('--background: #111014;'), 'Must define dark background #111014');
  assert.ok(css.includes('--accent: #c4b5fd;'), 'Must define soft violet accent #c4b5fd');
  assert.ok(css.includes('--surface: #151319;'), 'Must define surface #151319');
  assert.ok(css.includes('--code-bg: #17151c;'), 'Must define code background #17151c');
  assert.ok(css.includes('color-scheme: dark;'), 'Must enforce color-scheme: dark');
  assert.ok(!css.includes('#84cc16'), 'Must not contain old lime accent #84cc16');
});
