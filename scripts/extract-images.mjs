// One-shot: pull embedded plates out of the four reference HTML exports
// into public/images/, deduped by content hash. Not part of the app build.
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { homedir } from 'node:os';

const downloads = join(homedir(), 'Downloads');
const sources = readdirSync(downloads)
  .filter((f) => f.startsWith('Halide') && f.endsWith('.html'))
  .map((f) => join(downloads, f));

if (sources.length === 0) {
  console.error('No reference exports found in ~/Downloads');
  process.exit(1);
}

const outDir = join(process.cwd(), 'public', 'images');
mkdirSync(outDir, { recursive: true });

const pageLabel = (file) => {
  const name = basename(file);
  if (name.includes('1：20：05')) return 'home';
  if (name.includes('1：19：14')) return 'work';
  if (name.includes('1：19：30')) return 'project';
  if (name.includes('1：22：33')) return 'about';
  return 'misc';
};

const seen = new Map(); // hash -> filename
const manifest = [];

for (const file of sources) {
  const page = pageLabel(file);
  const raw = readFileSync(file, 'utf8');
  // data URIs appear raw and HTML-entity-quoted (&quot;) in the snapshot
  const re = /data:image\/(avif|png|webp|jpe?g);base64,([A-Za-z0-9+/=]+)/g;
  let m;
  let i = 0;
  while ((m = re.exec(raw)) !== null) {
    const [, ext, b64] = m;
    if (b64.length < 2000) continue; // skip favicons/tiny fragments
    const buf = Buffer.from(b64, 'base64');
    const hash = createHash('sha1').update(buf).digest('hex').slice(0, 10);
    if (seen.has(hash)) {
      manifest.push({ page, index: i, file: seen.get(hash), bytes: buf.length, dup: true });
      i += 1;
      continue;
    }
    const name = `${page}-${String(i).padStart(2, '0')}-${hash}.${ext === 'jpeg' ? 'jpg' : ext}`;
    writeFileSync(join(outDir, name), buf);
    seen.set(hash, name);
    manifest.push({ page, index: i, file: name, bytes: buf.length, dup: false });
    i += 1;
  }
}

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
for (const entry of manifest) {
  console.log(
    `${entry.page}\t#${entry.index}\t${entry.dup ? 'DUP->' : '     '}${entry.file}\t${(entry.bytes / 1024).toFixed(0)}kb`,
  );
}
console.log(`\n${seen.size} unique plates written to public/images`);
