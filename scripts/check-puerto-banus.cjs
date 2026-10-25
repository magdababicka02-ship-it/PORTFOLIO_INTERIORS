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
   assert.equal(await page.locator('.interior-card[data-interior-id=puerto-banus]').count(),1,'Visible without expanding portfolio');
   await page.locator('[data-interior-filter=commercial]').click();
   const tile=page.locator('.interior-card[data-interior-id=puerto-banus]');
   assert.equal(await tile.count(),1,'Included in Commercial');
   assert.equal(await page.locator('.interior-card[data-interior-id=nocturne]').count(),1,'Midnight Garden retained');
   await tile.locator('a.interior-overlay').focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname.endsWith('/puerto-banus-residence.html'));
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('h1').innerText(),'Puerto Banús Residence');
   assert.equal(await page.locator('.project-image-open').count(),10);
   assert.equal(await page.locator('.comparison').count(),0,'No invented before/after');
   assert.match(await page.locator('.interior-project-facts').innerText(),/NOVA KASYANOV/);
   assert.match(await page.locator('.project-credit').innerText(),/NOVA KASYANOV/);
   assert.doesNotMatch(await page.locator('main').innerText(),/AI-assisted|wizualizacja|visualisation|visualización|2026|undefined/);
   const role=await page.locator('.interior-project-facts>div').last().innerText();
   assert.match(role,lang==='pl'?/rzutów.*meblowych.*sypialni/:lang==='en'?/Floor plan.*furniture layouts.*master bedroom/:/planos.*mobiliario.*dormitorio/);
   for(const code of ['pl','en','es']){
    const url=new URL(await page.locator('#main-nav .languages [lang='+code+']').getAttribute('href'));
    assert.ok(url.pathname.endsWith('/puerto-banus-residence.html'));assert.equal(url.searchParams.get('lang'),code);
   }
   const buttons=page.locator('.project-image-open');
   for(let i=0;i<10;i++){
    const button=buttons.nth(i);await button.click();
    await page.locator('dialog img').evaluate(image=>image.decode());
    assert.equal(await page.locator('dialog img').evaluate(image=>image.naturalWidth),1920);
    const full=new URL(await page.locator('dialog .arrow-link').getAttribute('href'));
    assert.ok(full.pathname.includes('/puerto-banus/view-'));
    await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
    assert.ok(await button.evaluate(element=>element===document.activeElement));lightboxChecks++;
   }
   const request=new URL(await page.locator('.project-enquiry a[href*=kontakt]').getAttribute('href'));
   assert.equal(request.searchParams.get('project'),'interior');assert.equal(request.searchParams.get('artwork'),'Puerto Banús Residence');assert.equal(request.searchParams.get('lang'),lang);
  }
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   for(const lang of ['pl','en','es']){
    await page.goto(new URL('puerto-banus-residence.html?lang='+lang,base).href);
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode()));});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width+' '+lang);
    const photos=await page.locator('main img').evaluateAll(images=>images.map(image=>{const rect=image.getBoundingClientRect();return {url:image.src,natural:[image.naturalWidth,image.naturalHeight],ratio:rect.width/rect.height}}));
    assert.equal(photos.length,11);assert.equal(new Set(photos.map(p=>p.url)).size,11);
    for(const photo of photos){assert.equal(photo.natural[0],1920);assert.ok(Math.abs(photo.ratio-photo.natural[0]/photo.natural[1])<.005,'Original proportions');}
    if(lang==='pl'&&[390,1440].includes(width))await page.screenshot({path:path.join(out,'puerto-banus-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
    responsiveChecks++;
   }
  }
  await page.goto(new URL('wnetrza.html?lang=en',base).href);await page.locator('#more-interiors').click();
  assert.equal(await page.locator('.interior-card').count(),11,'Existing projects and both additions retained');
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],commercialTile:'passed',keyboardNavigation:'passed',responsiveChecks,originalPhotos:11,lightboxChecks,teamAndIndividualCredit:'passed',portfolioProjects:11,browserErrors:errors};
  fs.writeFileSync(path.join(out,'puerto-banus-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
