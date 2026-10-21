// Usage: NODE_PATH=<directory containing playwright> node docs/capture-preview.cjs <preview.html>
// Only sanitized screenshots are written; the source page is never changed.
const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
const fs = require('node:fs');
(async () => {
  if (!process.argv[2]) throw new Error('Pass the MediaIndex preview HTML path');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const shots = [
    ['discover', 'light', 'soft', 'catppuccin'],
    ['workspace', 'dark', 'metal', 'nord'],
    ['system', 'light', 'glass', 'macaron'],
  ];
  const manifest = [];
  for (const [route, theme, material, color] of shots) {
    await page.goto(`${pathToFileURL(path.resolve(process.argv[2])).href}?theme=${theme}&material=${material}&color=${color}&corner=default#${route}`);
    await page.waitForTimeout(700);
    // CSS blur uses a Gaussian kernel. Blur artwork, including gradient placeholders,
    // while keeping surrounding UI text, controls and panel edges readable.
    const selectors = '.poster,.hero-art,.detail-poster,.rank-thumb,.sub-poster,[class*="art-"],img';
    await page.addStyleTag({ content: `${selectors}{filter:blur(24px)!important;pointer-events:none!important} *{animation-play-state:paused!important;transition:none!important}` });
    await page.waitForTimeout(100);
    const redacted = await page.locator(selectors).count();
    const file = `mediaindex-2.0-${route}.png`;
    await page.screenshot({ path: path.join(__dirname, 'images', file) });
    manifest.push({ file, route, theme, material, color, corner: 'default', gaussianBlurPx: 24, redactedElements: redacted });
  }
  fs.writeFileSync(path.join(__dirname, 'images', 'mediaindex-2.0-captures.json'), JSON.stringify(manifest, null, 2)+'\n');
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
