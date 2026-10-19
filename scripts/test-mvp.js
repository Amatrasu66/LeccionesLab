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

  await t.test('Search returns all collection modules dynamically with Collections breadcrumbs', async () => {
    const collectionQueries = [
      { q: 'lists', route: '/docs/python/collections/lists' },
      { q: 'tuples', route: '/docs/python/collections/tuples' },
      { q: 'hash table', route: '/docs/python/collections/dictionaries' },
      { q: 'frozenset', route: '/docs/python/collections/sets' },
    ];

    for (const { q, route } of collectionQueries) {
      const res = await fetch(`${BASE_URL}/api/search?query=${encodeURIComponent(q)}`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(data.length > 0, `Should return results for "${q}"`);
      const matched = data.find((item) => item.url && item.url.includes(route));
      assert.ok(matched, `Expected to find ${route} in results for "${q}"`);
      if (matched.breadcrumbs) {
        assert.ok(
          matched.breadcrumbs.includes('Collections'),
          `Breadcrumbs for ${route} should include "Collections", got: ${JSON.stringify(matched.breadcrumbs)}`
        );
      }
    }
  });

  await t.test('Search returns Track C & Track D modules dynamically', async () => {
    const queries = [
      { q: 'argparse', route: '/docs/python/modules/cli-with-argparse' },
      { q: 'subprocess', route: '/docs/python/modules/subprocess-execution' },
      { q: 'pathlib', route: '/docs/python/modules/standard-library' },
      { q: 'itertools', route: '/docs/python/modules/iteration-utilities' },
      { q: 'pyproject.toml', route: '/docs/python/modules/environments-and-packaging' },
      { q: 'comprehensions', route: '/docs/python/intermediate/comprehensions' },
      { q: 'generators', route: '/docs/python/intermediate/iterators-and-generators' },
      { q: 'decorators', route: '/docs/python/intermediate/decorators-and-closures' },
      { q: 'context managers', route: '/docs/python/intermediate/context-managers' },
      { q: 'exception', route: '/docs/python/intermediate/exception-handling' },
      { q: 'typing', route: '/docs/python/intermediate/type-hints-and-static-typing' },
    ];

    for (const { q, route } of queries) {
      const res = await fetch(`${BASE_URL}/api/search?query=${encodeURIComponent(q)}`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(data.length > 0, `Should return results for "${q}"`);
      const matched = data.find((item) => item.url && item.url.includes(route));
      assert.ok(matched, `Expected to find ${route} in results for "${q}"`);
    }
  });

  await t.test('Search API without query returns dynamic published pages including modules and intermediate', async () => {
    const res = await fetch(`${BASE_URL}/api/search`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data), 'Response should be an array');
    assert.ok(data.length >= 24, `Should include all published documentation pages, got ${data.length}`);
    const expectedRoutes = [
      '/docs/python/modules/modules-and-imports',
      '/docs/python/modules/packages-and-namespaces',
      '/docs/python/modules/scripts-and-entrypoints',
      '/docs/python/modules/standard-library',
      '/docs/python/modules/iteration-utilities',
      '/docs/python/modules/cli-with-argparse',
      '/docs/python/modules/subprocess-execution',
      '/docs/python/modules/environments-and-packaging',
      '/docs/python/intermediate/comprehensions',
      '/docs/python/intermediate/iterators-and-generators',
      '/docs/python/intermediate/decorators-and-closures',
      '/docs/python/intermediate/context-managers',
      '/docs/python/intermediate/exception-handling',
      '/docs/python/intermediate/type-hints-and-static-typing',
    ];
    for (const route of expectedRoutes) {
      const found = data.some((item) => item.url === route);
      assert.ok(found, `Empty query dynamic index should contain ${route}`);
    }
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
    '/docs/python/modules/modules-and-imports',
    '/docs/python/modules/packages-and-namespaces',
    '/docs/python/modules/scripts-and-entrypoints',
    '/docs/python/modules/standard-library',
    '/docs/python/modules/iteration-utilities',
    '/docs/python/modules/cli-with-argparse',
    '/docs/python/modules/subprocess-execution',
    '/docs/python/modules/environments-and-packaging',
    '/docs/python/intermediate/comprehensions',
    '/docs/python/intermediate/iterators-and-generators',
    '/docs/python/intermediate/decorators-and-closures',
    '/docs/python/intermediate/context-managers',
    '/docs/python/intermediate/exception-handling',
    '/docs/python/intermediate/type-hints-and-static-typing',
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
