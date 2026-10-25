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
   assert.equal(await page.locator('.interior-card').count(),4);
   await page.locator('[data-interior-filter=commercial]').click();
   assert.equal(await page.locator('.interior-card[data-interior-id=atmosphere-driven-apartment]').count(),0);
   await page.locator('[data-interior-filter=residential]').click();
   const tile=page.locator('.interior-card[data-interior-id=atmosphere-driven-apartment]');assert.equal(await tile.count(),1);
   await tile.locator('a.interior-overlay').focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname.endsWith('/atmosphere-driven-apartment.html'));
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('h1').textContent(),'Atmosphere-Driven Apartment');
   assert.equal(await page.locator('.apartment-scope li').count(),7);
   assert.equal(await page.locator('.project-image-open').count(),10);
   assert.equal(await page.locator('.apartment-technical-details img:visible').count(),0);
   assert.equal(await page.locator('.apartment-development-board').count(),1);
   assert.equal(await page.locator('.apartment-development-board .project-visual:visible').count(),2);
   assert.match(await page.locator('.apartment-facts').innerText(),/60 m²/);
   assert.match(await page.locator('.apartment-facts').innerText(),/Magdalena Babicka/);
   assert.match(await page.locator('.apartment-status').innerText(),lang==='pl'?/Koncepcja.*Wsparcie realizacji/i:lang==='en'?/Technical Development.*Execution Support/i:/desarrollo técnico.*Apoyo/i);
   const hero=page.locator('.apartment-hero-visual img');
   assert.ok((await hero.getAttribute('src')).endsWith('/01_approved_kitchen_white_wood_dark_stone.jpg'));
   assert.equal(await hero.getAttribute('loading'),'eager');
   assert.equal(await page.locator('.comparison').count(),0);
   assert.deepEqual(await page.locator('.apartment-project>section[id]').evaluateAll(sections=>sections.map(section=>section.id)),['koncepcja','materialy','przestrzenie','rozwoj-projektu','stan-istniejacy','zakres-projektu']);
   for(const code of ['pl','en','es']){
    const url=new URL(await page.locator('#main-nav .languages [lang='+code+']').getAttribute('href'));
    assert.ok(url.pathname.endsWith('/atmosphere-driven-apartment.html'));assert.equal(url.searchParams.get('lang'),code);
   }
   await page.locator('.apartment-technical-details summary').focus();await page.keyboard.press('Enter');
   assert.equal(await page.locator('.apartment-technical-details').getAttribute('open'),'');
   const buttons=page.locator('.project-image-open');
   for(let i=0;i<10;i++){
    const button=buttons.nth(i),source=await button.getAttribute('data-project-image');await button.click();
    await page.locator('dialog img').evaluate(image=>image.decode());
    assert.ok((await page.locator('dialog .arrow-link').getAttribute('href')).endsWith(source));
    await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
    assert.ok(await button.evaluate(element=>element===document.activeElement));lightboxChecks++;
   }
   const request=new URL(await page.locator('.apartment-closing a[href*=kontakt]').getAttribute('href'));
   assert.equal(request.searchParams.get('project'),'interior');assert.equal(request.searchParams.get('artwork'),'Atmosphere-Driven Apartment');assert.equal(request.searchParams.get('lang'),lang);
   assert.equal(await page.locator('.brand-mark').first().evaluate(e=>getComputedStyle(e).outlineColor),'rgb(255, 255, 255)');
   assert.equal(await page.locator('.brand-secondary').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)');
  }
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   for(const lang of ['pl','en','es']){
    await page.goto(new URL('atmosphere-driven-apartment.html?lang='+lang,base).href);
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode()));});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width+' '+lang);
    const images=await page.locator('main img').evaluateAll(images=>images.map(image=>{const r=image.getBoundingClientRect();return {src:image.src,w:image.naturalWidth,h:image.naturalHeight,ratio:r.width/r.height,visible:!!(r.width&&r.height)}}));
    assert.equal(images.length,10);assert.equal(new Set(images.map(i=>i.src)).size,9);
    for(const image of images)if(image.visible)assert.ok(Math.abs(image.ratio-image.w/image.h)<.005,'Original image proportions');
    assert.equal(await page.locator('.apartment-technical-details img:visible').count(),0);
    assert.doesNotMatch(await page.locator('main').innerText(),/undefined|coming soon|wkrótce|Full Construction Management/);
    if(lang==='pl'&&[390,1440].includes(width))await page.screenshot({path:path.join(out,'atmosphere-apartment-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
    responsiveChecks++;
   }
  }
  await page.goto(new URL('wnetrza.html?lang=en',base).href);await page.locator('#more-interiors').click();
  assert.equal(await page.locator('.interior-card').count(),9);
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],residentialTile:'passed; excluded from Commercial',approvedKitchen:'passed',keyboardNavigation:'passed',responsiveChecks,sourceImages:9,lightboxChecks,projectStatus:'design concept, technical development and Execution Support',curatedBoard:'one group with real plan and joinery',optionalCoordinationDetail:'collapsed by default',brandRefinements:'passed',portfolioProjects:9,browserErrors:errors};
  fs.writeFileSync(path.join(out,'atmosphere-apartment-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
