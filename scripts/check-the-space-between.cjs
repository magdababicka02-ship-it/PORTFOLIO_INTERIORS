const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const vm=require('vm');
const crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const out=path.join(root,'previews');
const source=path.join(root,'archive/the-space-between-originals');
const copy=JSON.parse(fs.readFileSync(path.join(source,'project-content.pl-en-es.json')));
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const normalize=value=>value.replace(/\s+/g,' ').trim();
const ordered=['the-space-between','nocturne','puerto-banus','atmosphere-driven-apartment','private-spa-bathroom','spisak-studio','ceremonial-arrival'];
const loadCatalog=source=>{const context={window:{}};vm.runInNewContext(source,context);return JSON.parse(JSON.stringify(context.window.AOM));};
(async()=>{
 const catalog=loadCatalog(fs.readFileSync(path.join(root,'catalog.js'),'utf8'));
 const project=catalog.interiors.find(p=>p.id===copy.projectId);
 assert.deepEqual(project.project.editorial,copy,'All approved copy preserved');
 const suppliedHashes=JSON.parse(fs.readFileSync(path.join(source,'web-integrity.json')));
 const integrity=copy.images.map(image=>{
  const file=fs.readFileSync(path.join(root,'assets/images/the-space-between',image.id+'.webp'));
  assert.equal(hash(file),suppliedHashes[image.id+'.webp'],'Supplied WebP bytes preserved');
  return {file:image.id+'.webp',sha256:hash(file),width:image.width,height:image.height};
 });
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];let responsiveChecks=0,lightboxChecks=0,localLinks=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.text().startsWith('Missing Spanish translation:'))errors.push(message.text());});
  for(const lang of ['pl','en','es']){
   await page.setViewportSize({width:1440,height:1000});
   await page.goto(new URL('wnetrza.html?lang='+lang,base).href);
   assert.deepEqual(await page.locator('.interior-card').evaluateAll(cards=>cards.map(card=>card.dataset.interiorId)),ordered);
   const tile=page.locator('[data-interior-id=the-space-between]');
   assert.equal(await tile.locator('small').textContent(),copy.category[lang]);
   await page.locator('[data-interior-filter=commercial]').click();
   assert.equal(await tile.count(),0,'Not categorised as commercial');
   await page.locator('[data-interior-filter=residential]').click();
   assert.equal(await tile.count(),1);assert.equal(await page.locator('.interior-card').count(),7);
   await tile.locator('a.interior-overlay').focus();await page.keyboard.press('Enter');
   await page.waitForURL(url=>url.pathname.endsWith('/the-space-between.html'));
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('h1').textContent(),copy.title[lang]);
   for(const [key,selector] of Object.entries({subtitle:'.space-subtitle',heroLead:'.space-lead',intro:'.space-manifesto-copy .space-body',statement:'.space-statement p',artSectionTitle:'.space-art-reading h2',artSection:'.space-art-reading .space-body',materialsTitle:'.space-material-copy h2',materials:'.space-material-copy .space-body',closingTitle:'.space-closing-copy h2',closing:'.space-closing-copy .space-body',cta:'.space-invitation h2',footerDisclosure:'.space-disclosure'}))assert.equal(await page.locator(selector).textContent(),copy[key][lang],key+' approved copy');
   assert.deepEqual(await page.locator('.space-scope li').allTextContents(),copy.scope[lang]);
   assert.equal(await page.locator('meta[name=description]').getAttribute('content'),copy.seoDescription[lang]);
   assert.equal(await page.locator('meta[property="og:description"]').getAttribute('content'),copy.seoDescription[lang]);
   assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'),await page.title());
   assert.ok((await page.locator('meta[property="og:image"]').getAttribute('content')).endsWith('/the-space-between/01_hero_master.webp'));
   const request=new URL(await page.locator('.space-actions a[href*=kontakt]').getAttribute('href'));
   assert.equal(request.searchParams.get('artwork'),copy.title[lang]);assert.equal(request.searchParams.get('project'),'interior');assert.equal(request.searchParams.get('lang'),lang);
   assert.equal(normalize(await page.locator('.space-actions .outline').innerText()),copy.ctaAction[lang]+' →');
   for(const code of ['en','es','pl']){
    await page.locator('.site-footer .languages [lang='+code+']').click();
    assert.ok(new URL(page.url()).pathname.endsWith('/the-space-between.html'));
    assert.equal(await page.locator('h1').textContent(),copy.title[code]);
   }
   await page.goto(new URL('the-space-between.html?lang='+lang,base).href);
   assert.deepEqual(await page.locator('main img').evaluateAll(images=>images.map(image=>image.getAttribute('loading'))),['eager','lazy','lazy','lazy','lazy']);
   for(let i=0;i<5;i++){
    const button=page.locator('.project-image-open').nth(i);
    await button.focus();await page.keyboard.press('Enter');
    await page.locator('dialog img').evaluate(image=>image.decode());
    assert.equal(await page.locator('dialog[open] .native-viewer').count(),1);
    assert.ok((await page.locator('dialog .arrow-link').getAttribute('href')).endsWith(copy.recommendedSequence[i].asset+'.webp'));
    await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});
    assert.ok(await button.evaluate(button=>button===document.activeElement));lightboxChecks++;
   }
  }
  for(const width of [320,375,390,768,1440,1920])for(const lang of ['pl','en','es']){
   await page.setViewportSize({width,height:1000});
   await page.goto(new URL('the-space-between.html?lang='+lang,base).href);
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Overflow '+width+' '+lang);
   assert.equal(await page.locator('h1').count(),1);
   const images=await page.locator('main img').evaluateAll(images=>images.map(i=>{const r=i.getBoundingClientRect(),s=getComputedStyle(i);return {src:i.src,width:i.naturalWidth,height:i.naturalHeight,displayWidth:r.width,displayHeight:r.height,w:i.width,h:i.height,alt:i.alt,loading:i.loading,fit:s.objectFit,filter:s.filter,priority:i.fetchPriority};}));
   assert.equal(images.length,5);assert.equal(new Set(images.map(i=>i.src)).size,5);
   for(let i=0;i<5;i++){
    const expected=copy.images.find(a=>a.id===copy.recommendedSequence[i].asset),actual=images[i];
    assert.ok(actual.src.endsWith(expected.id+'.webp'),'Editorial image sequence');
    assert.equal(actual.width,expected.width);assert.equal(actual.height,expected.height);assert.equal(actual.alt,expected.alt[lang]);
    assert.ok(Math.abs(actual.displayWidth/actual.displayHeight-expected.width/expected.height)<.005,'Original proportions');
    assert.equal(actual.fit,'contain');assert.equal(actual.filter,'none');
    assert.ok(actual.displayWidth<=actual.width+1,'No enlargement above native source');
   }
   assert.equal(images[0].priority,'high');
   assert.ok(await page.locator('h1').evaluate(title=>title.getBoundingClientRect().top>=document.querySelector('.space-hero img').getBoundingClientRect().bottom),'Title outside the artwork');
   assert.equal(await page.locator('.comparison,iframe,video').count(),0);
   assert.equal(await page.locator('a[href="#"]').count(),0);
   assert.doesNotMatch(await page.locator('main').innerText(),/undefined|file pending|coming soon|Marbella|Gliwice|NOVA KASYANOV|m²|completed photograph|Execution Support/i);
   if(width===375){await page.locator('.menu-toggle').click();assert.ok(await page.locator('#main-nav').isVisible());await page.keyboard.press('Escape');assert.ok(!(await page.locator('#main-nav').isVisible()));}
   if(lang==='pl'&&[390,1440].includes(width))await page.screenshot({path:path.join(out,'the-space-between-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
   responsiveChecks++;
  }
  await page.goto(new URL('wnetrza.html?lang=en',base).href);await page.locator('#more-interiors').click();
  assert.equal(await page.locator('.interior-card').count(),12);assert.equal(await page.locator('.interior-open').count(),5);
  const urls=new Set();
  for(const lang of ['pl','en','es']){
   await page.goto(new URL('the-space-between.html?lang='+lang,base).href);
   for(const url of await page.locator('a[href]').evaluateAll(links=>links.map(link=>link.href)))if(url.startsWith(base))urls.add(url);
  }
  for(const url of urls){const response=await page.request.get(url);assert.ok(response.ok(),url+' returns '+response.status());localLinks++;}
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],responsiveChecks,lightboxChecks,approvedCopy:'exact PL/EN/ES',approvedSequence:copy.recommendedSequence.map(i=>i.asset),assets:integrity,source:'Supplied WebP files; light package contains no original PNG files',fullFrames:true,heroPriority:'high',conceptStatus:'visible in opening, card and disclosure',individualLayout:true,featuredOrder:ordered,portfolioEntries:12,existingModalStudies:5,localLinks,browserErrors:errors};
  fs.writeFileSync(path.join(out,'the-space-between-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
