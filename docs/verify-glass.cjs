// NODE_PATH points to the existing runtime's Playwright/pngjs. No browser/library install required.
const {chromium}=require('playwright');
const {PNG}=require('pngjs');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const output=path.resolve('.local-tests/glass-2.1');fs.mkdirSync(output,{recursive:true});
const base=process.env.SUNNY_UI_TEST_URL||'http://127.0.0.1:5198';
function pixels(buffer){return PNG.sync.read(buffer)}
function rgb(image,x,y){const i=(Math.floor(y)*image.width+Math.floor(x))*4;return [...image.data.subarray(i,i+3)]}
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.goto(base);await page.locator('.sunny-glass-toolbar[data-glass-renderer="refracted"]').waitFor();
 const concentric=await page.locator('.sunny-glass-toolbar').evaluate(el=>{
  const outer=el.getBoundingClientRect(),child=el.querySelector('button'),inner=child.getBoundingClientRect();
  const style=getComputedStyle(el),childStyle=getComputedStyle(child);
  return {outer:Math.min(parseFloat(style.borderTopLeftRadius),outer.height/2,outer.width/2),inner:Math.min(parseFloat(childStyle.borderTopLeftRadius),inner.height/2),inset:inner.y-outer.y};
 });
 assert(Math.abs(concentric.outer-concentric.inner-concentric.inset)<1,'Focused face must have concentric inner/outer corners');
 await page.evaluate(async()=>{
  const {enhanceLiquidGlass}=await import('/skills/sunny-ui-design/assets/appearance/liquid-glass.ts');
  const stage=document.createElement('div');stage.id='optical-probe';stage.style.cssText='position:fixed;left:80px;top:120px;width:600px;height:220px;z-index:999;background:repeating-conic-gradient(#a83863 0% 25%,#c9dba1 25% 50%) 0 0/28px 28px';
  const lens=document.createElement('div');lens.id='probe-lens';lens.style.cssText='position:absolute;left:60px;top:65px;width:480px;height:90px;border-radius:45px';
  lens.innerHTML='<span style="position:absolute;left:210px;top:25px;width:40px;height:40px;background:#fff"><svg viewBox="0 0 24 24" style="width:24px;height:24px;margin:8px"><path fill="#000" d="M3 3h18v6H3zm0 12h18v6H3z"/></svg></span>';
  stage.append(lens);document.body.append(stage);window.glassProbe={stage,lens,dispose:enhanceLiquidGlass(lens,{renderer:'refracted'})};
 });
 await page.waitForTimeout(250);
 const refracted=pixels(await page.locator('#probe-lens').screenshot({path:path.join(output,'refracted.png')}));
 await page.evaluate(async()=>{const {enhanceLiquidGlass}=await import('/skills/sunny-ui-design/assets/appearance/liquid-glass.ts');const p=window.glassProbe;p.dispose();p.dispose=enhanceLiquidGlass(p.lens,{renderer:'blur'})});
 await page.waitForTimeout(200);
 const diffused=pixels(await page.locator('#probe-lens').screenshot({path:path.join(output,'blur-fallback.png')}));
 let rimDifference=0,samples=0;
 for(let y=3;y<15;y++)for(let x=90;x<390;x++){
  const a=rgb(refracted,x,y),b=rgb(diffused,x,y);rimDifference+=a.reduce((n,c,i)=>n+Math.abs(c-b[i]),0);samples+=3;
 }
 assert(rimDifference/samples>8,'SVG URL must alter actual backdrop pixels, not only report a filter string');
 for(const image of [refracted,diffused]){
  assert.deepEqual(rgb(image,214,29),[255,255,255],'Foreground white must stay crisp');
  assert.deepEqual(rgb(image,230,40),[0,0,0],'Foreground glyph must bypass the lens');
 }
 await page.evaluate(()=>{window.glassProbe.stage.style.background='#2077c8'});await page.waitForTimeout(100);
 const blue=pixels(await page.locator('#probe-lens').screenshot());assert(rgb(blue,120,45)[2]>150 && rgb(blue,120,45)[0]<70,'Glass must sample updated DOM');
 await page.evaluate(()=>{window.glassProbe.dispose();window.glassProbe.stage.remove()});
 // Existing preferences and ordinary components remain independent of the glass extension.
 await page.getByRole('button',{name:'外观',exact:true}).click();
 await page.getByRole('radio',{name:'iOS 玻璃',exact:true}).click();
 await page.getByRole('button',{name:'圆润',exact:true}).click();
 await page.locator('.sunny-picker[data-sunny-glass="glass"]').waitFor();
 assert.equal(await page.locator('.sunny-picker').evaluate(el=>getComputedStyle(el).borderTopLeftRadius),'24px');
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'确认操作',exact:true}).click();
 assert(await page.locator('dialog').evaluate(el=>el.open));
 const before=pixels(await page.screenshot());
 await page.keyboard.press('Escape');
 const after=pixels(await page.screenshot());
 for(const [x,y] of [[15,100],[100,300],[1430,100]])assert.deepEqual(rgb(before,x,y),rgb(after,x,y),'Dialog must not dim outside pixels');
 const other=await context.newPage();await other.goto(base);await other.getByRole('button',{name:'外观',exact:true}).click();
 await other.getByRole('button',{name:'深色',exact:true}).click();
 await page.waitForFunction(()=>document.documentElement.dataset.theme==='dark');
 await other.close();await page.reload();assert.equal(await page.evaluate(()=>document.documentElement.dataset.material),'glass');
 const widths=[];
 for(const width of [320,390,700,1440]){
  await page.setViewportSize({width,height:1000});await page.getByRole('button',{name:'外观',exact:true}).click();
  const box=await page.locator('.sunny-picker').boundingBox();assert(box.x>=-1 && box.x+box.width<=width+1);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  await page.waitForTimeout(250);await page.screenshot({path:path.join(output,`glass-${width}.png`)});widths.push(width);
  await page.keyboard.press('Escape');
 }
 await page.emulateMedia({forcedColors:'active'});await page.waitForFunction(()=>document.querySelector('.sunny-glass-toolbar').dataset.glassRenderer==='solid');
 await page.emulateMedia({forcedColors:'none',reducedMotion:'reduce'});
 await page.waitForFunction(()=>document.querySelector('.sunny-glass-toolbar').dataset.glassRenderer==='refracted');
 await page.waitForTimeout(250);
 await page.evaluate(()=>{window.glassFrames=0;const old=window.requestAnimationFrame;window.requestAnimationFrame=callback=>{window.glassFrames++;return old(callback)}});
 await page.waitForTimeout(400);assert.equal(await page.evaluate(()=>window.glassFrames),0,'Idle glass must not run a frame loop');
 const fallback=await browser.newContext({userAgent:'Mozilla/5.0 Version/18.0 Safari/605.1.15'});const fallbackPage=await fallback.newPage();await fallbackPage.goto(base);
 await fallbackPage.locator('.sunny-glass-toolbar[data-glass-renderer="blur"]').waitFor();await fallback.close();
 assert.deepEqual(errors,[]);
 fs.writeFileSync(path.join(output,'checks.json'),JSON.stringify({browser:'Microsoft Edge (Chromium)',concentric,realPixelRefractionMeanDifference:rimDifference/samples,foregroundCrisp:true,liveDom:true,dialogUndimmed:true,cornerCap:24,persistence:true,crossTab:true,widths,forcedColors:true,idleFrameLoop:false,simulatedOtherEngineFallback:true,errors},null,2)+'\n');
 console.log('PASS: real backdrop refraction, crisp foreground, live DOM, undimmed dialog, corners, persistence, cross-tab, widths and fallbacks');
 await context.close();
 }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1});
