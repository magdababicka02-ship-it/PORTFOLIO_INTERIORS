const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const vm=require('vm');
const crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const out=path.join(root,'previews');
const load=file=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(file,'utf8'),c);return JSON.parse(JSON.stringify(c.window.AOM));};
const data=load(path.join(root,'catalog.js'));
const before=load(path.join(root,'archive/portfolio-reorganisation/catalog-before.js'));
const expected={
 selected:['the-space-between','nocturne','living','art-of-meaning-artisheat','natura-w-reliefie'],
 all:['the-space-between','nocturne','living','art-of-meaning-artisheat','natura-w-reliefie','puerto-banus','private-spa-bathroom','atmosphere-driven-apartment','spisak-studio','ceremonial-arrival','reception','fresco'],
 residential:['the-space-between','living','puerto-banus','private-spa-bathroom','atmosphere-driven-apartment','ceremonial-arrival','fresco'],
 hospitality:['nocturne','reception'],
 'art-design':['art-of-meaning-artisheat','natura-w-reliefie','spisak-studio']
};
const ids=page=>page.locator('.interior-card').evaluateAll(cards=>cards.map(c=>c.dataset.interiorId));
(async()=>{
 for(const key of ['paintings','murals','social','email','phone','artistPortrait','contact'])assert.deepEqual(data[key],before[key],key+' preserved');
 for(const p of before.interiors.filter(p=>p.project))assert.deepEqual(data.interiors.find(n=>n.id===p.id).project,p.project,'Existing detail data preserved: '+p.id);
 assert.equal(data.interiors.length,12);assert.deepEqual(data.interiors.filter(p=>p.featured).map(p=>p.id).sort(),[...expected.selected].sort());
 assert.ok(data.interiors.every(p=>typeof p.featured==='boolean'&&['residential','hospitality','art-design'].includes(p.category)));
 assert.equal(data.interiorDrafts.length,0);
 const source=JSON.parse(fs.readFileSync(path.join(root,'archive/artisheat-originals/content/project.json')));
 const natureSource=JSON.parse(fs.readFileSync(path.join(root,'archive/nature-relief-originals/content/project.json')));
 const nature=data.interiors.find(p=>p.id===natureSource.id);
 assert.equal(nature.project.price,null);assert.equal(nature.project.productionLeadTime,null);assert.equal(nature.project.technicalSpecification,null);assert.equal(nature.project.introVideo.src,'videos/nature-relief/intro-slow.mp4');assert.ok(!nature.project.partner);
 const heat=data.interiors.find(p=>p.id===source.id);
 assert.equal(heat.project.introVideo.src,'videos/artisheat/intro-9x16.mp4');assert.equal(heat.project.pricing.compositionFrom,10000);assert.equal(heat.project.pricing.taxTreatment,null);
 assert.ok(Object.values(heat.project.technicalParameters).every(value=>value===null));
 const csv=fs.readFileSync(path.join(root,'archive/artisheat-originals/MAPA_PLIKOW.csv'),'utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/).slice(1);
 const hashes=[];
 for(const row of csv){const parts=row.split(','),file=parts[1].split('/').pop(),sum=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets/images/artisheat',file))).digest('hex');assert.equal(sum,parts[4]);hashes.push({file,sha256:sum});}
 const natureHashes=[];
 for(const row of fs.readFileSync(path.join(root,'archive/nature-relief-originals/MAPA_PLIKOW.csv'),'utf8').replace(/^\uFEFF/,'').trim().split(/\r?\n/).slice(1)){const parts=row.split(','),file=parts[1].split('/').pop(),sum=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets/images/nature-relief',file))).digest('hex');assert.equal(sum,parts[4]);natureHashes.push({file,sha256:sum});}
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];let filterChecks=0,responsiveChecks=0,lightboxChecks=0,localLinks=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));page.on('console',m=>{if(m.text().startsWith('Missing Spanish translation:'))errors.push(m.text());});
  for(const width of [390,1440])for(const lang of ['pl','en','es']){
   await page.setViewportSize({width,height:1000});await page.goto(new URL('wnetrza.html?lang='+lang+'#portfolio',base).href);
   assert.deepEqual(await ids(page),expected.selected);assert.equal(await page.locator('[data-interior-filter=selected]').getAttribute('aria-pressed'),'true');
   assert.equal(await page.locator('[data-interior-filter]').count(),5);assert.equal(await page.locator('#more-interiors').count(),0);
   if(lang==='pl')assert.deepEqual(await page.locator('[data-interior-filter]').allTextContents(),['Wybrane','Wszystkie','Wnętrza prywatne','Hospitality','Sztuka i design']);
   if(lang==='en')assert.deepEqual(await page.locator('[data-interior-filter]').allTextContents(),['Selected','All','Residential','Hospitality','Art & Design']);
   for(const [filter,list] of Object.entries(expected)){
    await page.locator('[data-interior-filter="'+filter+'"]').focus();await page.keyboard.press('Enter');
    assert.deepEqual(await ids(page),list);assert.equal(new Set(await ids(page)).size,list.length);
    assert.equal(await page.locator('[data-interior-filter][aria-pressed=true]').count(),1);
    assert.equal(new URL(page.url()).searchParams.get('filter'),filter);
    assert.equal(await page.locator('[data-interior-id=patio],[data-interior-id=dressing],[data-interior-id=wood-and-moss]').count(),0);
    for(const code of ['pl','en','es']){
     const url=new URL(await page.locator('.site-footer .languages [lang='+code+']').getAttribute('href'));
     assert.equal(url.searchParams.get('filter'),filter);assert.equal(url.searchParams.get('lang'),code);assert.equal(url.hash,'#portfolio');
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));if(width<=390)assert.equal(await page.locator('.interior-grid').evaluate(grid=>getComputedStyle(grid).gridTemplateColumns.split(' ').length),1);filterChecks++;
   }
   await page.locator('.site-footer .languages [lang=en]').click();
   assert.deepEqual(await ids(page),expected['art-design']);assert.equal(await page.locator('[data-interior-filter=art-design]').getAttribute('aria-pressed'),'true');
  }
  for(const lang of ['pl','en','es']){
   await page.goto(new URL('wnetrza.html?lang='+lang,base).href);
   await page.locator('[data-interior-id=living] .interior-overlay').focus();await page.keyboard.press('Enter');await page.waitForURL(u=>u.pathname.endsWith('/light-and-matter.html'));
   assert.equal(await page.locator('h1').textContent(),{pl:'Światło i materia',en:'Light & Matter',es:'Luz y materia'}[lang]);
   assert.deepEqual(await page.locator('main img').evaluateAll(images=>images.map(i=>new URL(i.src).pathname.split('/').pop())),['interior-living.png','interior-dressing.png']);
   for(const slug of ['light-and-matter','murale-3d-z-funkcja-ogrzewania']){
    await page.goto(new URL(slug+'.html?lang='+lang,base).href);
    const buttons=page.locator('.project-image-open'),count=await buttons.count();assert.equal(count,slug.startsWith('light')?2:6);
    for(let i=0;i<count;i++){
     const button=buttons.nth(i),src=await button.getAttribute('data-project-image');await button.focus();await page.keyboard.press('Enter');
     await page.locator('dialog img').evaluate(i=>i.decode());
     assert.ok((await page.locator('dialog .arrow-link').getAttribute('href')).endsWith(src));assert.equal(await page.locator('dialog .native-viewer').count(),1);
     await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});assert.ok(await button.evaluate(b=>b===document.activeElement));lightboxChecks++;
    }
    const contact=new URL(await page.locator('main a[href*=kontakt]').first().getAttribute('href'));
    assert.equal(contact.searchParams.get('project'),'interior');assert.equal(contact.searchParams.get('lang'),lang);assert.ok(contact.searchParams.get('artwork'));
   }
   assert.equal(await page.locator('.heat-film').count(),1);assert.equal(await page.locator('.heat-film video[controls][playsinline]').count(),1);assert.equal(await page.locator('.heat-film button,.heat-film video[autoplay]').count(),0);
   assert.deepEqual(await page.locator('.heat-gallery img').evaluateAll(images=>images.map(i=>new URL(i.src).pathname.split('/').pop())),source.gallery.map(i=>i.src.split('/').pop()));
   assert.equal(await page.locator('.heat-functions-grid>div').count(),3);assert.equal(await page.locator('.heat-process li').count(),4);
   assert.match(await page.locator('.heat-price').innerText(),/10[\s,.]?000/);
   assert.match(await page.locator('.heat-index').first().textContent(),/koncepcje|concepts|conceptos/i);
   assert.match(await page.locator('.heat-collaboration').innerText(),/ArtisHeat®/);
   const pdf=page.locator('.heat-enquiry a[href$=".pdf"]');if(lang==='en')assert.match(await pdf.innerText(),/Polish/);
   const response=await page.request.get(await pdf.getAttribute('href'));assert.ok(response.ok());assert.match(response.headers()['content-type'],/pdf/);
   assert.doesNotMatch(await page.locator('main').innerText(),/netto|brutto|VAT|5[\s,.]?000|certified|gwarancj|warranty|prototyp|completed installation/i);
  }
  for(const lang of ['pl','en','es']){
   await page.goto(new URL('natura-w-reliefie.html?lang='+lang,base).href);
   assert.equal(await page.locator('.nature-credit').textContent(),nature.project.credit[{pl:0,en:1,es:2}[lang]]);
   assert.equal(await page.locator('.nature-film video[controls][playsinline]').count(),1);assert.equal(await page.locator('.nature-film button,.nature-film video[autoplay]').count(),0);
   assert.equal(await page.locator('main a[href$=".pdf"]').count(),0);
   assert.doesNotMatch(await page.locator('main').innerText(),/ArtisHeat|NOVA KASYANOV|€|netto|brutto|acoustic|akust|certyf|stabiliz|gwarancj|warranty|turnkey/i);
   assert.deepEqual(await page.locator('.nature-gallery img').evaluateAll(images=>images.map(i=>new URL(i.src).pathname.split('/').pop())),natureSource.gallery.slice(0,4).map(i=>i.src.split('/').pop()));
   for(let i=0;i<4;i++){const button=page.locator('.project-image-open').nth(i);await button.focus();await page.keyboard.press('Enter');await page.locator('dialog img').evaluate(i=>i.decode());assert.ok((await page.locator('dialog img').getAttribute('src')).endsWith(natureSource.gallery[i].src.split('/').pop()));await page.keyboard.press('Escape');await page.locator('dialog img').waitFor({state:'detached'});assert.ok(await button.evaluate(b=>b===document.activeElement));lightboxChecks++;}
  }
  for(const width of [320,390,768,1440,1920])for(const lang of ['pl','en','es'])for(const slug of ['wnetrza','light-and-matter','murale-3d-z-funkcja-ogrzewania','natura-w-reliefie']){
   await page.setViewportSize({width,height:1000});await page.goto(new URL(slug+'.html?lang='+lang,base).href);
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),slug+' '+lang+' '+width+' overflow');
   assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('a[href="#"]').count(),0);
   assert.doesNotMatch(await page.locator('main').innerText(),/undefined|coming soon|Video pending|Film w przygotowaniu/);
   if(slug!=='wnetrza'){
    for(const image of await page.locator('.project-visual img').evaluateAll(images=>images.map(i=>{const r=i.getBoundingClientRect();return{alt:i.alt,w:i.naturalWidth,h:i.naturalHeight,ratio:r.width/r.height,fit:getComputedStyle(i).objectFit,width:r.width};}))){assert.ok(image.alt);assert.equal(image.fit,'contain');assert.ok(Math.abs(image.ratio-image.w/image.h)<.005);assert.ok(image.width<=image.w+1);}
   }
   if(slug.startsWith('murale-3d')||slug==='natura-w-reliefie'){
    const r=await page.locator('.heat-film,.nature-film').boundingBox();assert.ok(Math.abs(r.width/r.height-(slug==='natura-w-reliefie'?1:9/16))<.005);assert.ok(r.width<=(slug==='natura-w-reliefie'?720:360));if(slug==='natura-w-reliefie'&&width>=1440)assert.ok(r.width>=600,'Nature film enlarged on desktop');
   }
   if(lang==='pl'&&[390,1440].includes(width)){
    await page.evaluate(()=>{document.activeElement.blur();window.scrollTo(0,0);});await page.mouse.move(0,0);
    await page.screenshot({path:path.join(out,'organised-'+slug+'-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
   }
   responsiveChecks++;
  }
  // Verify the future video branch using a real existing local clip; no new or substitute public film is created.
  await page.route('**/catalog.js?*',async route=>{
   const source=fs.readFileSync(path.join(root,'catalog.js'),'utf8');
   await route.fulfill({contentType:'application/javascript',body:source+'\nwindow.AOM.interiors.find(p=>p.id==="art-of-meaning-artisheat").project.introVideo.src="videos/0731.mp4";window.AOM.interiors.find(p=>p.id==="natura-w-reliefie").project.introVideo.src="videos/0731.mp4";'});
  });
  await page.goto(new URL('murale-3d-z-funkcja-ogrzewania.html?lang=en',base).href);
  assert.equal(await page.locator('.heat-film video').count(),1);assert.equal(await page.locator('.heat-film video[controls][playsinline]').count(),1);assert.equal(await page.locator('.heat-film video[autoplay]').count(),0);
  await page.goto(new URL('natura-w-reliefie.html?lang=en',base).href);
  assert.equal(await page.locator('.nature-film video[controls][playsinline]').count(),1);assert.equal(await page.locator('.nature-film video[autoplay]').count(),0);
  await page.unroute('**/catalog.js?*');
  const urls=new Set();
  for(const slug of ['light-and-matter','murale-3d-z-funkcja-ogrzewania','natura-w-reliefie']){
   await page.goto(new URL(slug+'.html?lang=en',base).href);for(const url of await page.locator('a[href]').evaluateAll(links=>links.map(a=>a.href)))if(url.startsWith(base))urls.add(url);
  }
  for(const url of urls){assert.ok((await page.request.get(url)).ok(),url);localLinks++;}
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),languages:['pl','en','es'],featuredSeparateFromCategory:true,filterChecks,expected,visibleProjectCount:12,natureRelief:'four selected concepts, original photographs retained, enlarged film, neutral collaboration credit, no price or PDF',removedTile:'patio',mergedTile:'dressing → living / light-and-matter.html',existingProjectData:'all seven existing detail records unchanged',artisHeatAssets:hashes,natureAssets:natureHashes,price:'composition from EUR 10,000; no invented tax or technical parameters',video:'Both collections use supplied films; Nature is encoded at 0.8×. Controls and playsinline checked.',responsiveChecks,lightboxChecks,localLinks,browserErrors:errors};
  fs.writeFileSync(path.join(out,'portfolio-organisation-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
