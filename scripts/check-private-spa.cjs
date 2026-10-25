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
   assert.equal(await page.locator('.interior-card').count(),3,'All three published project pages visible initially');
   await page.locator('[data-interior-filter=commercial]').click();
   assert.equal(await page.locator('.interior-card[data-interior-id=private-spa-bathroom]').count(),0,'Removed from Commercial');
   await page.locator('[data-interior-filter=residential]').click();
   const tile=page.locator('.interior-card[data-interior-id=private-spa-bathroom]');assert.equal(await tile.count(),1);
   await tile.locator('a.interior-overlay').focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname.endsWith('/private-spa-bathroom.html'));
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('h1').innerText(),'Private Spa Bathroom');
   assert.equal(await page.locator('.spa-scope li').count(),7);
   assert.equal(await page.locator('.project-image-open').count(),10);
   assert.equal(await page.locator('.spa-documents-grid .project-image-open').count(),5);
   assert.equal(await page.locator('.spa-documents-grid img:visible').count(),0,'Raw drawings collapsed by default');
   assert.equal(await page.locator('.spa-technical .project-visual:visible').count(),1,'One curated board in the main flow');
   assert.match(await page.locator('.spa-facts').innerText(),/Gliwice/);
   assert.match(await page.locator('.spa-status').innerText(),lang==='pl'?/Wizualizacja.*Realizacja w toku/i:lang==='en'?/Design Visualization.*Implementation in progress/i:/Visualización.*Obra en curso/i);
   assert.deepEqual(await page.locator('.spa-project>section[id]').evaluateAll(sections=>sections.map(section=>section.id)),['koncepcja','materialy','stan-istniejacy','dokumentacja','zakres-projektu']);
   assert.equal(await page.locator('#koncepcja').count(),1);
   if(lang==='en')assert.equal(await page.locator('.spa-concept h2').innerText(),'An Everyday Ritual, Reimagined.');
   assert.doesNotMatch(await page.locator('main').innerText(),/Completed project|Wykonana realizacja|undefined/);
   assert.equal(await page.locator('.comparison').count(),0,'No simulated completed result');
   for(const code of ['pl','en','es']){
    const url=new URL(await page.locator('#main-nav .languages [lang='+code+']').getAttribute('href'));
    assert.ok(url.pathname.endsWith('/private-spa-bathroom.html'));assert.equal(url.searchParams.get('lang'),code);
   }
   const pdf=await page.request.get(await page.locator('.spa-technical-links a').getAttribute('href'));
   assert.ok(pdf.ok());assert.match(pdf.headers()['content-type'],/pdf/);
   await page.locator('.spa-technical-details summary').focus();await page.keyboard.press('Enter');
   assert.equal(await page.locator('.spa-technical-details').getAttribute('open'),'');
   const buttons=page.locator('.project-image-open');
   for(let i=0;i<10;i++){
    const button=buttons.nth(i),source=await button.getAttribute('data-project-image');await button.click();
    await page.locator('dialog img').evaluate(image=>image.decode());
    assert.ok((await page.locator('dialog .arrow-link').getAttribute('href')).endsWith(source));
    if(source.includes('/real-'))assert.match(await page.locator('dialog .arrow-link').innerText(),lang==='pl'?/rysunek/:lang==='en'?/drawing/:/dibujo/);
    await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
    assert.ok(await button.evaluate(element=>element===document.activeElement));lightboxChecks++;
   }
   const request=new URL(await page.locator('.spa-closing a[href*=kontakt]').getAttribute('href'));
   assert.equal(request.searchParams.get('project'),'interior');assert.equal(request.searchParams.get('artwork'),'Private Spa Bathroom');assert.equal(request.searchParams.get('lang'),lang);
  }
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   for(const lang of ['pl','en','es']){
    await page.goto(new URL('private-spa-bathroom.html?lang='+lang,base).href);
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode()));});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width+' '+lang);
    const images=await page.locator('main img').evaluateAll(images=>images.map(image=>{const r=image.getBoundingClientRect();return {src:image.src,w:image.naturalWidth,h:image.naturalHeight,ratio:r.width/r.height,detail:image.closest('.spa-material-detail')!==null,visible:!!(r.width&&r.height)}}));
    assert.equal(images.length,10);assert.equal(new Set(images.map(i=>i.src)).size,9);
    for(const image of images)if(image.visible&&!image.detail)assert.ok(Math.abs(image.ratio-image.w/image.h)<.005,'Original image proportions');
    assert.equal(await page.locator('.spa-documents-grid img:visible').count(),0,'Technical documentation remains secondary');
    const heroWidth=await page.locator('.spa-hero-image').evaluate(image=>image.getBoundingClientRect().width);
    const beforeWidth=await page.locator('.spa-existing-gallery img').first().evaluate(image=>image.getBoundingClientRect().width);
    assert.ok(beforeWidth<heroWidth*.7,'Existing photos smaller than hero');
    if(width>=768)assert.ok(Math.abs(heroWidth/width-.58)<.02,'Hero uses 58% of desktop width');
    if(lang==='pl'&&[390,1440].includes(width))await page.screenshot({path:path.join(out,'private-spa-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
    responsiveChecks++;
   }
  }
  await page.goto(new URL('wnetrza.html?lang=en',base).href);await page.locator('#more-interiors').click();
  assert.equal(await page.locator('.interior-card').count(),8);
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],residentialTile:'passed; excluded from Commercial',keyboardNavigation:'passed',editorialHierarchy:'six sections, materiality before existing photos and technical board',technicalDrawings:'five originals collapsed by default',responsiveChecks,sourceImages:9,originalTechnicalDrawings:5,lightboxChecks,projectStatus:'implementation in progress, visualisation and existing photos labelled',pdfLink:'passed',portfolioProjects:8,browserErrors:errors};
  fs.writeFileSync(path.join(out,'private-spa-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
