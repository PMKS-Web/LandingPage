#!/usr/bin/env node
/**
 * Bundle engine/src/precompute.ts and run it.
 *
 * esbuild rather than ts-node because the vendored app sources are TypeScript
 * with their own module cycles, and one bundle resolves them the way the app's
 * own build does. The Angular decorator on the two vendored services is
 * absorbed by engine/shim/angular-core.ts.
 */
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';

const here = dirname(fileURLToPath(import.meta.url));
const outdir = mkdtempSync(join(tmpdir(), 'pmks-engine-'));
const outfile = join(outdir, 'precompute.cjs');

await build({
  entryPoints: [join(here, 'src/precompute.ts')],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  target: 'node20',
  outfile,
  alias: { '@angular/core': join(here, 'shim/angular-core.ts') },
  logLevel: 'warning',
});

execFileSync(process.execPath, [outfile], { stdio: 'inherit', cwd: join(here, '..') });
