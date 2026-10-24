const {chromium}=require('playwright');
const assert=require('assert/strict');
const original=require('./fixtures/original-content.json');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const normalize=s=>s.replace(/\s+/g,' ').trim();
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const unmocked=[];await page.route('https://formsubmit.co/**',route=>{unmocked.push(route.request().method());return route.abort();});
  await page.goto(new URL('obrazy-na-zamowienie.html?lang=pl',base).href,{waitUntil:'domcontentloaded'});
  assert.ok(normalize(await page.locator('.painting-intro').innerText()).includes(original.introduction));
  assert.equal(await page.locator('.reviews-grid .client-review').count(),3);
  await page.locator('[data-art-filter=archive]').click();assert.equal(await page.locator('.art-card:visible .sold-tag').count(),4);
  const archive=await page.locator('.art-card:visible').evaluateAll(cards=>cards.map(c=>c.querySelector('h3').textContent));
  assert.deepEqual(archive.sort(),['Miasto sukcesu','João','Terracotta Muse','Michałek'].sort());
  for(const [id,source] of Object.entries(original.paintings)){
   await page.goto(new URL('obrazy-na-zamowienie/'+id+'.html?lang=pl',base).href,{waitUntil:'domcontentloaded'});
   assert.equal(normalize(await page.locator('.detail-copy').innerText()),source.description,id+' complete original description');
   if(source.testimonial){assert.equal(normalize(await page.locator('.client-review blockquote').innerText()),source.testimonial.quote,id+' original review');assert.ok((await page.locator('.client-review figcaption').innerText()).includes(source.testimonial.author));}
  }
  for(const id of ['business-darling','who-is-hunting']){
   await page.goto(new URL('obrazy-na-zamowienie/'+id+'.html?lang=en',base).href,{waitUntil:'domcontentloaded'});
   assert.ok((await page.locator('.detail .eyebrow').textContent()).includes('100 × 70 cm'));
   assert.ok((await page.locator('.detail-copy').innerText()).length>800);
  }
  const prices={'business-darling':2600,meduza:2400,'who-is-hunting':2400,unfrozen:2200,'electric-embrace':2100,'silent-horizon':2000,'red-temptation':900,'arc-de-triomf---barcelona':450};
  for(const lang of ['pl','en']){
   await page.goto(new URL('obrazy-na-zamowienie.html?lang='+lang,base).href,{waitUntil:'domcontentloaded'});
   await page.locator('.collection-more button').click();
   for(const [id,price] of Object.entries(prices)){
    const expected=new Intl.NumberFormat(lang==='pl'?'pl-PL':'en-GB',{style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:'always'}).format(price);
    const actual=await page.evaluate(id=>{const p=AOM.paintings.find(p=>p.id===id);return {price:p.price,currency:p.currency,status:p.status};},id);
    assert.deepEqual(actual,{price,currency:'EUR',status:null});
    const card=page.locator('.art-card').filter({has:page.locator('a[href*="/'+id+'.html"]')});
    assert.equal(await card.locator('span.price').textContent(),expected);
    await card.locator('span.price').scrollIntoViewIfNeeded();
    assert.ok(await card.locator('span.price').isVisible());
   }
   for(const [id,price] of Object.entries(prices)){
    await page.goto(new URL('obrazy-na-zamowienie/'+id+'.html?lang='+lang,base).href,{waitUntil:'domcontentloaded'});
    const expected=new Intl.NumberFormat(lang==='pl'?'pl-PL':'en-GB',{style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:'always'}).format(price);
    assert.equal(await page.locator('.detail-price').textContent(),expected);
   }
  }
  for(const [id,source] of Object.entries(original.murals)){
   await page.goto(new URL(id+'.html?lang=pl',base).href,{waitUntil:'domcontentloaded'});
   assert.equal(normalize(await page.locator('.client-review blockquote').innerText()),source.testimonial.quote);
   assert.equal(await page.locator('.detail-copy p').count(),3);
  }
  for(const lang of ['pl','en'])for(const path of ['index.html','murale.html','wnetrza.html','obrazy-na-zamowienie.html','kontakt.html','polityka-prywatnosci.html']){
   await page.goto(new URL(path+'?lang='+lang,base).href,{waitUntil:'domcontentloaded'});
   assert.equal(await page.locator('a[href*="tally.so"],iframe[src*="tally.so"]').count(),0);
   assert.equal(await page.locator('.site-header .brand-name').evaluate(e=>getComputedStyle(e).color),'rgb(255, 255, 255)');
   assert.ok((await page.locator('.site-header .brand-name small').evaluate(e=>getComputedStyle(e).fontFamily)).includes('Cinzel'));
  }
  await page.goto(new URL('kontakt.html?lang=pl',base).href,{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('form').count(),1);
  await page.goto(new URL('kontakt.html?lang=pl&activate=1',base).href,{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.activation-panel form').getAttribute('action'),'https://formsubmit.co/contact@artofmeaning.art');
  assert.equal(await page.locator('.activation-panel input[name=email]').inputValue(),'contact@artofmeaning.art');
  assert.deepEqual(unmocked,[],'No real email or activation requests during tests');
  console.log(JSON.stringify({completeOriginalDescriptions:10,originalPaintingReviews:3,originalMuralReviews:3,expandedNewWorks:2,pricesCheckedInBothLanguages:8,soldWorks:archive,emailAndActivationRequestsSent:0,status:'passed'}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
