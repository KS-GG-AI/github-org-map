import { test } from 'node:test';
import assert from 'node:assert/strict';

import { resolveVariant } from '../scripts/generate.js';

// This repository only ever generates the "public" variant. resolveVariant
// exists purely as a guard against a stray private-variant flag/env var
// (e.g. copy-pasted from tooling that knows about a private mode) — it must
// throw rather than silently doing something unexpected.

test('resolveVariant: defaults to "public" with no flag and no env var', () => {
  assert.equal(resolveVariant([], {}), 'public');
});

test('resolveVariant: accepts an explicit --variant=public flag', () => {
  assert.equal(resolveVariant(['--variant=public'], {}), 'public');
});

test('resolveVariant: accepts ORG_MAP_VARIANT=public', () => {
  assert.equal(resolveVariant([], { ORG_MAP_VARIANT: 'public' }), 'public');
});

test('resolveVariant: throws on --variant=private', () => {
  assert.throws(() => resolveVariant(['--variant=private'], {}), /private/);
});

test('resolveVariant: throws on ORG_MAP_VARIANT=private', () => {
  assert.throws(() => resolveVariant([], { ORG_MAP_VARIANT: 'private' }), /private/);
});

test('resolveVariant: throws on any other value', () => {
  assert.throws(() => resolveVariant(['--variant=staging'], {}), /staging/);
});

test('resolveVariant: the CLI flag takes precedence over the env var', () => {
  assert.throws(() => resolveVariant(['--variant=private'], { ORG_MAP_VARIANT: 'public' }));
});
