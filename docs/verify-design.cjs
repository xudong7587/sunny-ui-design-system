// NODE_PATH must include Playwright; run against pnpm dev and the approved HTML.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
(async () => {
 const source = fs.readFileSync(process.argv[2], 'utf8');
 const css = source.match(/<style>([\s\S]*?)<\/style>/)[1];
 const canonical = fs.readFileSync(path.join(__dirname,'../skills/sunny-ui-design/assets/appearance/preview.css'),'utf8');
 assert.equal(canonical,css,'CSS must match the approved source exactly');
 const browser = await chromium.launch({ channel:'msedge', headless:true });
 const context = await browser.newContext({viewport:{width:1440,height:1000}});
 const page = await context.newPage();
 const reference = await context.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:5198');
 await reference.goto(pathToFileURL(path.resolve(process.argv[2])).href);
 const module = await page.evaluate(async()=>{const {materials,accents,corners}=await import('/src/index.ts');return {materials:materials.map(x=>x.id),colors:accents.map(x=>x.id),corners:corners.map(x=>x.id)};});
 assert.equal(module.materials.length,16);assert.equal(module.colors.length,26);assert.equal(module.corners.length,3);
 // Same geometry and content probes on both pages; compare actual computed styles,
 // including all 2496 combinations, rather than only checking copied token text.
 async function matrix(target) {
  await target.addStyleTag({content:'*{transition:none!important;animation:none!important}'});
  return target.evaluate(({materials,colors,corners})=>{
   const probe=document.createElement('div');probe.style.cssText='position:fixed;left:-1000px;top:0;width:200px';
   probe.innerHTML='<div class="panel">Panel</div><input class="input"><button class="btn primary">Action</button><div class="entry-card">Inner</div>';
   document.body.append(probe);
   const records=[];
   for(const theme of ['light','dark'])for(const material of materials)for(const color of colors)for(const corner of corners){
    Object.assign(document.documentElement.dataset,{theme,material,color,corner});
    records.push([...probe.children,document.body].map(el=>{
     const s=getComputedStyle(el);
     return ['backgroundColor','backgroundImage','color','borderTopColor','borderTopLeftRadius','boxShadow','backdropFilter','fontFamily'].map(p=>s[p]);
    }));
   }
   probe.remove();return records;
  },module);
 }
 const expected=await matrix(reference);
 const actual=await matrix(page);
 assert.deepEqual(actual,expected,'Rendered style matrix differs from preview');
 console.log(`Computed styles match for ${actual.length} combinations.`);
 await page.reload();
 await page.getByRole('button',{name:'外观',exact:true}).click();
 await page.getByRole('radio',{name:'拉丝金属',exact:true}).click();
 await page.getByRole('radio',{name:'北境极光',exact:true}).click();
 await page.getByRole('button',{name:'圆润',exact:true}).click();
 await page.getByRole('button',{name:'深色',exact:true}).click();
 const expectedState={theme:'dark',material:'metal',color:'nord',corner:'round'};
 const state=()=>page.evaluate(()=>({theme:document.documentElement.dataset.theme,material:document.documentElement.dataset.material,color:document.documentElement.dataset.color,corner:document.documentElement.dataset.corner}));
 assert.deepEqual(await state(),expectedState);
 await page.keyboard.press('Escape');
 assert.equal(await page.locator('.sunny-picker').evaluate(el=>el.matches(':popover-open')),false);
 await page.reload();assert.deepEqual(await state(),expectedState);
 const other=await context.newPage();await other.goto('http://127.0.0.1:5198');
 await other.getByRole('button',{name:'外观',exact:true}).click();
 await other.getByRole('radio',{name:'陶土哑光',exact:true}).click();
 await page.waitForFunction(()=>document.documentElement.dataset.material==='clay');
 await other.close();
 const widths=[];
 for(const width of [320,390,700,1440]){
  await page.setViewportSize({width,height:1000});
  await page.getByRole('button',{name:'外观',exact:true}).click();
  const bounds=await page.locator('.sunny-picker').boundingBox();
  assert(bounds.x>=0&&bounds.x+bounds.width<=width+1,'Picker exceeds viewport');
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  assert.equal(overflow,false,`Page overflow at ${width}`);
  widths.push(width);
  await page.waitForTimeout(400);
  if(width===390)await page.screenshot({path:path.join(__dirname,'images/sunny-2.0-mobile.png')});
  await page.keyboard.press('Escape');
 }
 await page.getByRole('button',{name:'确认操作',exact:true}).click();
 assert.equal(await page.locator('dialog').evaluate(el=>el.open),true);
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'外观',exact:true}).click();
 await page.getByRole('radio',{name:'柔软浮雕',exact:true}).click();
 await page.getByRole('radio',{name:'奶霜花园',exact:true}).click();
 await page.getByRole('button',{name:'标准',exact:true}).click();
 await page.getByRole('button',{name:'浅色',exact:true}).click();
 await page.waitForTimeout(400);
 assert.equal((await state()).theme,'light');
 await page.screenshot({path:path.join(__dirname,'images/sunny-2.0-desktop.png')});
 await page.keyboard.press('Escape');
 await page.evaluate(()=>{localStorage.setItem('sunny-ui-demo-material','default');localStorage.setItem('sunny-ui-demo-corner','unknown');});
 await page.reload();assert.equal((await state()).material,'clear');assert.equal((await state()).corner,'default');
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(__dirname,'2.0.0-checks.json'),JSON.stringify({cssSha256:crypto.createHash('sha256').update(css).digest('hex'),computedStyleCombinations:actual.length,viewportWidths:widths,uiSelection:true,reload:true,crossTab:true,escape:true,dialog:true,legacyFallback:true,pageErrors:errors},null,2)+'\n');
 await browser.close();
 console.log('Interaction, persistence, cross-tab, viewport and legacy checks passed.');
})().catch(error=>{console.error(error);process.exit(1);});
