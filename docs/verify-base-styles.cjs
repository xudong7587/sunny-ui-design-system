const {chromium}=require('playwright');
const fs=require('node:fs');const crypto=require('node:crypto');const assert=require('node:assert/strict');
(async()=>{
 const css=fs.readFileSync('skills/sunny-ui-design/assets/appearance/preview.css','utf8');
 const fingerprint=JSON.parse(fs.readFileSync('docs/design-source.json','utf8'));
 assert.equal(crypto.createHash('sha256').update(css).digest('hex'),fingerprint.cssSha256,'Approved generated CSS must remain unchanged');
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
  const page=await browser.newPage();const reference=await browser.newPage();
  await page.goto('http://127.0.0.1:5198');await reference.setContent(`<style>${css}</style>`);
  for(const target of [page,reference])await target.addStyleTag({content:'*{transition:none!important;animation:none!important}'});
  const catalog=await page.evaluate(async()=>{const {materials,accents,corners}=await import('/src/index.ts');return {materials:materials.map(x=>x.id),colors:accents.map(x=>x.id),corners:corners.map(x=>x.id)}});
  async function matrix(target){return target.evaluate(({materials,colors,corners})=>{
   const probe=document.createElement('div');probe.style.cssText='position:fixed;left:-1000px;top:0;width:200px';
   probe.innerHTML='<div class="panel">Panel</div><input class="input"><button class="btn primary">Action</button><div class="entry-card">Inner</div>';
   document.body.append(probe);const records=[];
   for(const theme of ['light','dark'])for(const material of materials)for(const color of colors)for(const corner of corners){
    Object.assign(document.documentElement.dataset,{theme,material,color,corner});
    records.push([...probe.children,document.body].map(el=>{const s=getComputedStyle(el);return ['backgroundColor','backgroundImage','color','borderTopColor','borderTopLeftRadius','boxShadow','backdropFilter','fontFamily'].map(p=>s[p])}));
   }return records;
  },catalog)}
  // The source HTML is not available in this checkout. Reference uses its exact fingerprinted CSS.
  const actual=await matrix(page),expected=await matrix(reference);assert.deepEqual(actual,expected);
  fs.writeFileSync('.local-tests/glass-2.1/base-styles.json',JSON.stringify({reference:'Fingerprint-verified 2.0 preview.css, isolated HTML probes',cssSha256:fingerprint.cssSha256,computedStyleCombinations:actual.length,propertiesPerProbe:8,unchanged:true},null,2)+'\n');
  console.log(`PASS ${actual.length} original panel/control/body combinations; targeted 2.1 glass is checked separately.`);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
