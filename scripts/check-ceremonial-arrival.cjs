const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const out=path.resolve(__dirname,'../previews');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];let responsiveChecks=0,lightboxChecks=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.text().startsWith('Missing Spanish translation:'))errors.push(message.text());});
  for(const lang of ['pl','en','es']){
   await page.goto(new URL('wnetrza.html?lang='+lang,base).href);
   assert.deepEqual(await page.locator('.interior-card').evaluateAll(cards=>cards.map(card=>card.dataset.interiorId)),['the-space-between','nocturne','puerto-banus','atmosphere-driven-apartment','private-spa-bathroom','spisak-studio','ceremonial-arrival']);
   assert.equal(await page.locator('[data-curated-group=studies]').count(),1);
   await page.locator('[data-interior-filter=commercial]').click();
   assert.equal(await page.locator('.interior-card[data-interior-id=ceremonial-arrival]').count(),0);
   await page.locator('[data-interior-filter=residential]').click();
   const tile=page.locator('.interior-card[data-interior-id=ceremonial-arrival]');assert.equal(await tile.count(),1);
   await tile.locator('a.interior-overlay').focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname.endsWith('/ceremonial-arrival.html'));
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('h1').textContent(),'Ceremonial Arrival');
   assert.equal(await page.locator('.arrival-scope li').count(),5);
   assert.equal(await page.locator('.project-image-open').count(),6);
   assert.equal(await page.locator('.arrival-proposal').count(),3);
   assert.match(await page.locator('.arrival-hero .arrival-credit').innerText(),/NOVA KASYANOV/);
   assert.match(await page.locator('.arrival-authorship .arrival-credit').innerText(),/NOVA KASYANOV/);
   assert.match(await page.locator('.arrival-facts').innerText(),/Marbella/);
   assert.match(await page.locator('.arrival-index').first().innerText(),/koncepcyjne|Concept|conceptual/i);
   assert.match(await page.locator('.arrival-schematic-note').innerText(),/bez skali|not to scale|sin escala/i);
   assert.match(await page.locator('.arrival-affiliation').innerText(),/Versace/);
   assert.equal(await page.locator('.arrival-reference img:visible').count(),0);
   assert.equal(await page.locator('.comparison').count(),0,'Alternative concepts, no before/after');
   assert.deepEqual(await page.locator('.arrival-project>section[id]').evaluateAll(sections=>sections.map(section=>section.id)),['koncepcja','trzy-interpretacje','relacje-przestrzenne','zakres-i-wspolpraca']);
   assert.equal(await page.locator('.arrival-hero-visual img').getAttribute('loading'),'eager');
   for(const code of ['pl','en','es']){
    const url=new URL(await page.locator('#main-nav .languages [lang='+code+']').getAttribute('href'));
    assert.ok(url.pathname.endsWith('/ceremonial-arrival.html'));assert.equal(url.searchParams.get('lang'),code);
   }
   await page.locator('.arrival-reference summary').focus();await page.keyboard.press('Enter');
   assert.equal(await page.locator('.arrival-reference').getAttribute('open'),'');
   const buttons=page.locator('.project-image-open');
   for(let i=0;i<6;i++){
    const button=buttons.nth(i),source=await button.getAttribute('data-project-image');await button.click();
    await page.locator('dialog img').evaluate(image=>image.decode());
    assert.ok((await page.locator('dialog .arrow-link').getAttribute('href')).endsWith(source));
    assert.equal(await page.locator('dialog .native-viewer').count(),1);
    assert.ok(await page.locator('dialog img').evaluate(image=>image.getBoundingClientRect().width<=image.naturalWidth+1),'No low-resolution reference enlargement');
    await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
    assert.ok(await button.evaluate(element=>element===document.activeElement));lightboxChecks++;
   }
   const request=new URL(await page.locator('.arrival-authorship a[href*=kontakt]').getAttribute('href'));
   assert.equal(request.searchParams.get('project'),'interior');assert.equal(request.searchParams.get('artwork'),'Ceremonial Arrival');assert.equal(request.searchParams.get('lang'),lang);
  }
  for(const width of [320,390,768,1024,1440,1920]){
   await page.setViewportSize({width,height:1000});
   for(const lang of ['pl','en','es']){
    await page.goto(new URL('ceremonial-arrival.html?lang='+lang,base).href);
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode()));});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width+' '+lang);
    const images=await page.locator('main img').evaluateAll(images=>images.map(image=>{const r=image.getBoundingClientRect();return {src:image.src,w:image.naturalWidth,h:image.naturalHeight,ratio:r.width/r.height,visible:!!(r.width&&r.height),alt:image.alt}}));
    assert.equal(images.length,6);assert.equal(new Set(images.map(i=>i.src)).size,5);
    for(const image of images){assert.ok(image.alt);if(image.visible)assert.ok(Math.abs(image.ratio-image.w/image.h)<.005,'Original frame proportions');}
    if(width>=1024){
     const widths=await page.locator('.arrival-proposal img').evaluateAll(images=>images.map(image=>image.getBoundingClientRect().width));
     assert.ok(Math.max(...widths)-Math.min(...widths)<1,'All three proposals have equal visual weight');
    }
    assert.equal(await page.locator('.arrival-reference img:visible').count(),0);
    assert.doesNotMatch(await page.locator('main').innerText(),/undefined|file pending|coming soon|turnkey|general contractor/i);
    if(lang==='pl'&&[390,1440].includes(width))await page.screenshot({path:path.join(out,'ceremonial-arrival-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
    responsiveChecks++;
   }
  }
  await page.goto(new URL('wnetrza.html?lang=en',base).href);await page.locator('#more-interiors').click();
  assert.equal(await page.locator('.interior-card').count(),12);
  assert.equal(await page.locator('.interior-open').count(),5,'Existing studies retained');
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],residentialStudy:'passed',existingRelativeOrderPreserved:true,responsiveChecks,alternativeProposals:3,equalTriptychWeight:true,sourceAssets:5,lightboxChecks,conceptStatusAndNovaCredit:'visible',spatialDiagram:'schematic, not to scale',lowResolutionReference:'collapsed and native width capped',existingStudiesRetained:5,portfolioEntries:12,browserErrors:errors};
  fs.writeFileSync(path.join(out,'ceremonial-arrival-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
