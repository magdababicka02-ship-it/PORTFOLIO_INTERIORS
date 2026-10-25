const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const out=path.resolve(__dirname,'../previews');
const featured=['nocturne','puerto-banus','atmosphere-driven-apartment','private-spa-bathroom'];
const ids=page=>page.locator('.interior-card').evaluateAll(cards=>cards.map(card=>card.dataset.interiorId));
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];let responsiveChecks=0,lightboxChecks=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.text().startsWith('Missing Spanish translation:'))errors.push(message.text());});
  for(const lang of ['pl','en','es']){
   await page.goto(new URL('wnetrza.html?lang='+lang,base).href);
   assert.deepEqual(await ids(page),[...featured,'spisak-studio','ceremonial-arrival']);
   assert.deepEqual(await page.locator('[data-curated-group]').evaluateAll(groups=>groups.map(group=>group.dataset.curatedGroup)),['featured','creative','studies']);
   assert.equal(await page.locator('.interior-hero-figure .media-meta a').textContent(),'Midnight Garden');
   await page.locator('[data-interior-filter=residential]').click();
   assert.equal(await page.locator('.interior-card[data-interior-id=spisak-studio]').count(),0);
   await page.locator('[data-interior-filter=commercial]').click();
   const tile=page.locator('.interior-card[data-interior-id=spisak-studio]');assert.equal(await tile.count(),1);
   await tile.locator('a.interior-overlay').focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname.endsWith('/spisak-studio.html'));
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal((await page.locator('h1').textContent()).replace(/\s+/g,' ').trim(),'SPISAK STUDIO');
   assert.equal(await page.locator('.studio-project').count(),1);
   assert.equal(await page.locator('.studio-scope li').count(),5);
   assert.equal(await page.locator('.studio-photo .project-image-open').count(),7);
   assert.equal(await page.locator('.studio-mood').count(),3);
   assert.deepEqual(await page.locator('.studio-mood h3').allTextContents(),['The Soft Set','The Evening Set','The Dark Set']);
   assert.match(await page.locator('.studio-location').innerText(),/Katowice/);
   assert.match(await page.locator('.studio-byline').innerText(),/Magdalena Babicka/);
   assert.doesNotMatch(await page.locator('main').innerText(),/construction management|turnkey|dokumentacja techniczna|zarządzanie budową|undefined/i);
   assert.equal(await page.locator('main details, main .comparison').count(),0,'No technical documentation or before/after');
   assert.deepEqual(await page.locator('.studio-project>section[id]').evaluateAll(sections=>sections.map(section=>section.id)),['koncepcja','swiatlo','trzy-nastroje','atmosfera','kierunek-kreatywny']);
   assert.equal(await page.locator('.studio-overview img').getAttribute('loading'),'eager');
   for(const code of ['pl','en','es']){
    const url=new URL(await page.locator('#main-nav .languages [lang='+code+']').getAttribute('href'));
    assert.ok(url.pathname.endsWith('/spisak-studio.html'));assert.equal(url.searchParams.get('lang'),code);
   }
   const buttons=page.locator('.studio-photo .project-image-open');
   for(let i=0;i<7;i++){
    const button=buttons.nth(i),source=await button.getAttribute('data-project-image');await button.click();
    await page.locator('dialog img').evaluate(image=>image.decode());
    assert.ok((await page.locator('dialog .arrow-link').getAttribute('href')).endsWith(source));
    assert.equal(await page.locator('dialog .studio-viewer').count(),1);
    assert.ok(await page.locator('dialog img').evaluate(image=>image.getBoundingClientRect().width<=image.naturalWidth+1),'No enlargement beyond native photo width in the lightbox');
    await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
    assert.ok(await button.evaluate(element=>element===document.activeElement));lightboxChecks++;
   }
   const request=new URL(await page.locator('.studio-contribution a[href*=kontakt]').getAttribute('href'));
   assert.equal(request.searchParams.get('project'),'interior');assert.equal(request.searchParams.get('artwork'),'SPISAK STUDIO');assert.equal(request.searchParams.get('lang'),lang);
  }
  for(const width of [320,390,768,1024,1440,1920]){
   await page.setViewportSize({width,height:1000});
   for(const lang of ['pl','en','es']){
    await page.goto(new URL('spisak-studio.html?lang='+lang,base).href);
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode()));});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width+' '+lang);
    const images=await page.locator('main img').evaluateAll(images=>images.map(image=>{const r=image.getBoundingClientRect();return {src:image.src,w:image.naturalWidth,h:image.naturalHeight,ratio:r.width/r.height,displayWidth:r.width,alt:image.alt}}));
    assert.equal(images.length,7);assert.equal(new Set(images.map(i=>i.src)).size,7);
    for(const image of images){assert.ok(image.alt);assert.ok(Math.abs(image.ratio-image.w/image.h)<.005,'Original photo proportions');assert.ok(image.displayWidth<=image.w+1,'No enlargement beyond native photo width');}
    if(width>=1024){
     const sizes=await page.locator('.studio-mood img').evaluateAll(images=>images.map(image=>image.getBoundingClientRect().width));
     assert.ok(sizes[0]>sizes[2]&&sizes[2]>sizes[1],'Three genuinely different scales');
    }
    if(lang==='pl'&&[390,1440].includes(width))await page.screenshot({path:path.join(out,'spisak-studio-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
    responsiveChecks++;
   }
  }
  await page.goto(new URL('wnetrza.html?lang=en',base).href);await page.locator('#more-interiors').click();
  assert.equal(await page.locator('.interior-card').count(),11);
  assert.equal(await page.locator('.interior-open').count(),5,'Five design studies retained');
  assert.equal(await page.locator('[data-curated-group=studies]').count(),1);
  await page.route('**/catalog.js?*',async route=>{
   const response=await route.fetch();await route.fulfill({response,body:await response.text()+'\nwindow.AOM.interiors.reverse();'});
  });
  await page.goto(new URL('wnetrza.html?lang=en',base).href);
  assert.deepEqual(await ids(page),[...featured,'spisak-studio','ceremonial-arrival'],'Curation is independent of catalogue insertion order');
  await page.unroute('**/catalog.js?*');
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],commercialTile:'passed',explicitFeaturedOrder:featured,catalogueReverseOrder:'passed',keyboardNavigation:'passed',responsiveChecks,originalPhotos:7,nativePhotoSizesPreserved:true,asymmetricMoodScales:'passed',lightboxChecks,claimedScope:'concept, zones, furnishings, colours, lighting concept and styling',designStudiesRetained:5,portfolioProjects:11,browserErrors:errors};
  fs.writeFileSync(path.join(out,'spisak-studio-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
