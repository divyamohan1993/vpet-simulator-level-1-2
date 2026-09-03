import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const assets = [
  { source: 'src/app', target: 'public/app.js' },
  { source: 'src/data', target: 'public/data.js' },
  { source: 'src/styles', target: 'public/styles.css' }
];

for (const asset of assets) {
  const sourceDirectory = resolve(root, asset.source);
  const names = (await readdir(sourceDirectory))
    .filter((name) => name.includes('.part.'))
    .sort((left, right) => left.localeCompare(right, 'en'));

  if (!names.length) {
    throw new Error(`No source fragments found in ${asset.source}`);
  }

  const fragments = await Promise.all(
    names.map((name) => readFile(resolve(sourceDirectory, name), 'utf8'))
  );
  await writeFile(resolve(root, asset.target), fragments.join(''), 'utf8');
  console.log(`Built ${asset.target} from ${names.length} fragments.`);
}
