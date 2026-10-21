// Regenerate the canonical styles and preset metadata from the user-approved HTML.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const source = fs.readFileSync(process.argv[2], 'utf8');
const css = source.match(/<style>([\s\S]*?)<\/style>/)[1];
function readArray(name) {
  const value = source.match(new RegExp(`const ${name} = (\\[[\\s\\S]*?\\n\\]);`));
  if (!value) throw new Error(`Missing ${name}`);
  return vm.runInNewContext(`(${value[1]})`, {}, { timeout: 1000 });
}
const materials = readArray('MATERIALS');
const single = readArray('SINGLE');
const multi = readArray('MULTI');
const corners = ['tight', 'default', 'round'].map((id, i) => ({ id, name: ['紧致','标准','圆润'][i], scale: Number(css.match(new RegExp(`html\\[data-corner="${id}"\\]\\{--corner-scale:([.\\d]+)`))[1]) }));
const base = path.join(__dirname, '../skills/sunny-ui-design/assets/appearance');
fs.writeFileSync(path.join(base, 'preview.css'), css);
fs.writeFileSync(path.join(base, 'presets.ts'), '// Generated from the approved MediaIndex preview. Do not hand-edit.\n'+
  Object.entries({ materials, single, multi, corners }).map(([name,value]) => `export const ${name} = ${JSON.stringify(value,null,2)} as const;`).join('\n')+'\n');
fs.writeFileSync(path.join(__dirname, 'design-source.json'), JSON.stringify({
  source: 'MediaIndex-UI-Preview/index.html', captured: '2026-10-21',
  htmlSha256: crypto.createHash('sha256').update(source).digest('hex'),
  cssSha256: crypto.createHash('sha256').update(css).digest('hex'),
  materialCount: materials.length, singleCount: single.length, multiCount: multi.length, corners,
  policy: 'The complete style block is copied verbatim. React adapters may change mechanics, never the visual tokens.'
}, null, 2)+'\n');
console.log('Imported exact preview CSS and preset metadata.');
