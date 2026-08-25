#!/usr/bin/env node
/**
 * Refresh engine/vendor from a local checkout of the PMKS+ app.
 *
 *   node engine/sync.mjs [path-to-app-checkout]
 *
 * Everything under engine/vendor is a byte-for-byte copy of the app's own
 * source, laid out in the same relative shape so the files' own imports resolve
 * untouched — the landing page's mechanisms are solved and drawn by the app's
 * code, not by a second implementation of it that can drift.
 *
 * The one exception is engine/shim/settings.service.ts, which stands in for the
 * Angular service the model reaches through for `objectScale`; sync copies it
 * into place over the real one.
 */
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(process.argv[2] ?? join(here, '../../Planar-Mechanism-Kinematic-Simulator'));
const vendor = join(here, 'vendor');

const FILES = [
  // The model layer: joints, links, solvers, mark geometry. Pure TypeScript.
  ['src/app/model', 'app/model', { dir: true }],
  // Two services the model and the mark layer need. Both are plain classes
  // wearing an @Injectable decorator, which engine/shim/angular-core.ts absorbs.
  ['src/app/services/color.service.ts', 'app/services/color.service.ts'],
  ['src/app/services/slider-mark.service.ts', 'app/services/slider-mark.service.ts'],
  // The app's own verification harness: a declarative fixture in, a fully
  // solved Mechanism out. The landing page's linkages are written against it,
  // so they are the same objects the MATLAB-checked test suite asserts on.
  ['src/test-utils/verification/fixture.ts', 'test-utils/verification/fixture.ts'],
  ['src/test-utils/verification/slot-fixtures.ts', 'test-utils/verification/slot-fixtures.ts'],
  ['src/test-utils/verification/library-fixtures.ts', 'test-utils/verification/library-fixtures.ts'],
];

rmSync(vendor, { recursive: true, force: true });
for (const [from, to, opts] of FILES) {
  const target = join(vendor, to);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(join(app, from), target, {
    recursive: !!opts?.dir,
    filter: (path) => !path.endsWith('.spec.ts'),
  });
}

// Angular's settings service, replaced by the shim. Copied rather than aliased
// so the vendored files' own relative import lands on it unchanged.
const shim = join(here, 'shim/settings.service.ts');
writeFileSync(join(vendor, 'app/services/settings.service.ts'), readFileSync(shim));

writeFileSync(
  join(vendor, 'SOURCE.txt'),
  `Copied from ${app}\nby engine/sync.mjs — do not edit these files, edit them upstream.\n`
);
console.log(`vendored the PMKS+ engine from ${app}`);
