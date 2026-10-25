const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const out=path.resolve(__dirname,'../previews');
const languages=['pl','en','es'];
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];let responsiveChecks=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.text().startsWith('Missing Spanish translation:'))errors.push(message.text());});
  for(const lang of languages){
   await page.goto(new URL('wnetrza.html?lang='+lang,base).href,{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('.interior-card').first().locator('p>a').textContent(),'Midnight Garden');
   assert.equal(await page.locator('.interior-card').first().locator('.interior-open').count(),0,'Midnight Garden uses a real project link');
   await page.locator('[data-interior-filter=commercial]').click();
   const tile=page.locator('.interior-card[data-interior-id=nocturne]');
   assert.equal(await tile.count(),1);
   const anchor=tile.locator('a.interior-overlay');
   assert.equal(new URL(await anchor.getAttribute('href')).pathname,new URL('midnight-garden.html',base).pathname);
   await anchor.focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname===new URL('midnight-garden.html',base).pathname);
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('dialog[open]').count(),0);
   assert.equal(await page.locator('h1').innerText(),'Midnight Garden');
   assert.ok((await page.title()).startsWith('Midnight Garden |'));
   assert.equal(new URL(await page.locator('#main-nav>a[aria-current=page]').getAttribute('href')).pathname,new URL('wnetrza.html',base).pathname);
   assert.equal(await page.locator('.site-footer .brand-gold').count(),1);
   assert.equal(await page.locator('.project-image-open').count(),3);
   assert.equal(await page.locator('.comparison img').count(),2);
   assert.equal(await page.locator('.comparison-missing').count(),0);
   assert.match(await page.locator('.interior-project-facts').innerText(),/2026/);
   assert.match(await page.locator('.project-hero-copy .eyebrow').innerText(),/AI|IA/);
   for(const code of languages){
    const url=new URL(await page.locator('#main-nav .languages [lang='+code+']').getAttribute('href'));
    assert.equal(url.pathname,new URL('midnight-garden.html',base).pathname);assert.equal(url.searchParams.get('lang'),code);
   }
   if(lang==='pl')assert.ok((await page.locator('.project-art').innerText()).includes('Ornament nie stanowi jedynie dekoracji. Prowadzi wzrok, buduje rytm wnętrza i nawiązuje do otaczającego krajobrazu.'));
   if(lang==='en')assert.ok((await page.locator('.project-landscape').innerText()).includes('The result is a space designed not simply to be seen, but to be experienced.'));
   if(lang==='es')assert.ok((await page.locator('.project-art').innerText()).includes('sitúa la expresión artística en el centro del proceso de diseño'));
   await page.locator('.project-image-open').first().click();
   assert.equal(await page.locator('dialog').isVisible(),true);
   await page.locator('dialog img').evaluate(image=>image.decode());
   assert.equal(await page.locator('dialog img').evaluate(image=>image.naturalWidth),1086);
   const fullSize=new URL(await page.locator('dialog .arrow-link').getAttribute('href'));
   assert.ok(fullSize.pathname.endsWith('/midnight-garden/view-5.webp'));
   await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
   assert.ok(await page.locator('.project-image-open').first().evaluate(element=>element===document.activeElement));
   await page.locator('#comparison-range').focus();await page.keyboard.press('ArrowRight');
   assert.equal(await page.locator('#comparison-range').inputValue(),'51');
   assert.equal(await page.locator('.comparison').evaluate(element=>element.style.getPropertyValue('--position')),'51%');
   for(const value of ['0','100','50']){
    await page.locator('#comparison-range').fill(value);
    assert.equal(await page.locator('.comparison').evaluate(element=>element.style.getPropertyValue('--position')),value+'%');
   }
   const contactURLs=await page.locator('.project-enquiry a[href*="kontakt.html"]').evaluateAll(anchors=>anchors.map(a=>a.href));
   assert.equal(contactURLs.length,2);
   assert.deepEqual(contactURLs.map(url=>new URL(url).searchParams.get('project')).sort(),['interior','mural']);
   assert.ok(contactURLs.every(url=>new URL(url).searchParams.get('artwork')==='Midnight Garden'&&new URL(url).searchParams.get('lang')===lang));
  }
  for(const width of [320,390,768,1024,1440]){
   await page.setViewportSize({width,height:1000});
   for(const lang of languages){
    await page.goto(new URL('midnight-garden.html?lang='+lang,base).href,{waitUntil:'domcontentloaded'});
    await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(image=>image.loading='eager');await Promise.all([...document.images].map(image=>image.decode()));});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Project overflow '+width+' '+lang);
    assert.equal(await page.locator('h1').count(),1);
    assert.equal(await page.locator('main img').count(),6);
    const broken=await page.locator('main img').evaluateAll(images=>images.filter(image=>!image.naturalWidth).map(image=>image.src));
    assert.deepEqual(broken,[]);
    assert.doesNotMatch(await page.locator('main').innerText(),/undefined|file pending|brak pliku|Nocturne in a Mediterranean lounge/);
    for(const selector of ['.project-arrival img','.project-materials img','.project-landscape img']){
     const ratio=await page.locator(selector).evaluate(image=>{const b=image.getBoundingClientRect();return [b.width/b.height,image.naturalWidth/image.naturalHeight]});
     assert.ok(Math.abs(ratio[0]-ratio[1])<.005,'Visualisation proportions preserved');
    }
    if(lang==='pl'&&[390,1440].includes(width)){
     await page.evaluate(()=>{document.activeElement?.blur();return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
     await page.screenshot({path:path.join(out,'midnight-garden-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
    }
    responsiveChecks++;
   }
  }
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:1000});await page.goto(new URL('wnetrza.html?lang=pl',base).href);
   assert.equal(await page.locator('.comparison-missing').count(),0);
   await page.locator('.comparison').scrollIntoViewIfNeeded();
   await page.locator('.comparison img').evaluateAll(images=>Promise.all(images.map(image=>{image.loading='eager';return image.decode()})));
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   await page.locator('.comparison-section').screenshot({path:path.join(out,'midnight-comparison-'+(width===390?'mobile':'desktop')+'.png')});
   await page.locator('#more-interiors').click();assert.equal(await page.locator('.interior-card').count(),7,'Other projects retained alongside Puerto Banús');
  }
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages,projectLinkNavigation:'passed, including keyboard',responsiveChecks,sourceVisuals:5,projectImages:6,conceptStatusVisible:true,lightboxAndFocus:'passed',comparisonKeyboardAndExtremes:'passed',portfolioProjects:7,contactLinks:2,browserErrors:errors};
  fs.writeFileSync(path.join(out,'midnight-garden-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
