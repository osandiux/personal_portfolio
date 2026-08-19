#!/usr/bin/env node
/**
 * Asset reference guard.
 *
 * Why this exists: `vite build` does NOT validate absolute asset paths that
 * resolve into public/ -- those files are copied verbatim, never resolved. And
 * vercel.json rewrites /(.*) to /index.html, so a missing asset returns
 * HTTP 200 + HTML in production rather than a 404. A broken reference is
 * therefore invisible: green build, green deploy, silently degraded page.
 *
 * This script closes that gap. It walks the source tree, collects every
 * absolute path that looks like a file (i.e. has an asset extension), and
 * fails if the corresponding file is missing from public/.
 *
 * Route paths like "/mix1/about" are ignored -- only paths carrying a known
 * asset extension are checked, which is what keeps routes out of the results.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const PUBLIC_DIR = join(ROOT, 'public');
const SCAN_DIRS = ['src', 'public'];

const SCAN_EXTS = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.html']);

const ASSET_EXTS = new Set([
  '.woff', '.woff2', '.ttf', '.otf', '.eot',
  '.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.gif', '.ico',
  '.webm', '.mp4', '.mov', '.m4v',
  '.pdf',
]);

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.vercel']);

/** Absolute paths inside quotes, or inside a CSS url(). */
const PATTERNS = [
  /url\(\s*['"]?(\/[^)'"?#]+)/g,
  /['"`](\/[^'"`\s?#)]+)['"`]/g,
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else if (SCAN_EXTS.has(extname(entry))) out.push(full);
  }
  return out;
}

const files = SCAN_DIRS.flatMap((d) => walk(join(ROOT, d)));
const missing = [];
const seen = new Set();

for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split('\n');

  for (const pattern of PATTERNS) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const ref = match[1];
      if (!ASSET_EXTS.has(extname(ref).toLowerCase())) continue;

      const target = join(PUBLIC_DIR, decodeURIComponent(ref));
      if (existsSync(target)) continue;

      // Locate the line number for a useful error message.
      const upto = text.slice(0, match.index).split('\n').length;
      const key = `${file}:${upto}:${ref}`;
      if (seen.has(key)) continue;
      seen.add(key);

      missing.push({
        file: relative(ROOT, file),
        line: upto,
        ref,
        context: (lines[upto - 1] ?? '').trim().slice(0, 110),
      });
    }
  }
}

const checked = seen.size + missing.length;

if (missing.length === 0) {
  console.log(`✓ asset check passed — scanned ${files.length} files, every referenced asset resolves under public/`);
  process.exit(0);
}

console.error(`\n✗ asset check FAILED — ${missing.length} reference(s) do not resolve under public/\n`);
for (const m of missing) {
  console.error(`  ${m.file}:${m.line}`);
  console.error(`    missing: ${m.ref}`);
  console.error(`    context: ${m.context}\n`);
}
console.error('These would NOT fail the build, and would return HTTP 200 + HTML in production.\n');
process.exit(1);
