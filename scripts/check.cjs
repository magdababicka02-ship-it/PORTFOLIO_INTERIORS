const { chromium } = require('playwright');
const fs = require('fs');
const assert = require('assert/strict');
const base = process.env.AOM_BASE_URL || 'http://127.0.0.1:4173/';
const out = require('path').resolve(__dirname, '../previews');
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', args: ['--no-sandbox'] });
  const errors=[];const results=[];
  const routes=['index.html','murale.html','wnetrza.html','obrazy-na-zamowienie.html','kontakt.html'];
  for(const mobile of [false,true]) {
    const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:1000},isMobile:mobile,hasTouch:mobile,reducedMotion:'reduce'});
    const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
    for(const lang of ['pl','en']) for(const route of routes) {
      await page.goto(base+route+'?lang='+lang,{waitUntil:'domcontentloaded'});
      await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));document.querySelectorAll('video').forEach(v=>v.pause());});
      assert.equal(await page.locator('html').getAttribute('lang'),lang);
      assert.equal(await page.locator('h1').count(),1,route+' h1');
      assert.equal(await page.locator('#main-nav>a').count(),5,route+' nav');
      assert.equal(await page.locator('a[href="#"]').count(),0,route+' empty links');
      const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,window:innerWidth}));
      assert.ok(overflow.doc<=(mobile?390:1440)+1,`${route} ${lang} ${mobile} horizontal overflow ${JSON.stringify(overflow)}`);
      const broken=await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
      assert.deepEqual(broken,[],route+' broken images');
      const headerColor=await page.locator('.site-header').evaluate(e=>getComputedStyle(e).backgroundColor);
      assert.equal(headerColor,'rgb(7, 23, 44)');
      const otherLang=lang==='pl'?'en':'pl';const switchUrl=await page.locator('#main-nav .languages a[lang="'+otherLang+'"]').getAttribute('href');
      assert.equal(new URL(switchUrl).pathname,'/'+route);assert.equal(new URL(switchUrl).searchParams.get('lang'),otherLang);
      const emails=await page.locator('a[href^="mailto:"]').evaluateAll(els=>els.map(e=>e.href));
      assert.ok(emails.every(x=>x.startsWith('mailto:contact@artofmeaning.art')));
      if(mobile){assert.equal(await page.locator('#main-nav').isVisible(),false);await page.locator('.menu-toggle').click();assert.equal(await page.locator('#main-nav').isVisible(),true);await page.keyboard.press('Escape');assert.equal(await page.locator('#main-nav').isVisible(),false);}
      if(lang==='pl')await page.screenshot({path:out+'/'+route.replace('.html','')+'-'+(mobile?'mobile':'desktop')+'.png',fullPage:true});
      results.push({route,lang,viewport:mobile?'390':'1440',result:'pass'});
    }
    await context.close();
  }
  const context=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:'reduce'});const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'obrazy-na-zamowienie.html?lang=pl');
  assert.equal(await page.locator('.art-card:visible').count(),4);
  await page.locator('#more-art').click();assert.equal(await page.locator('.art-card:visible').count(),12);
  await page.locator('[data-art-filter="archive"]').click();assert.equal(await page.locator('.art-card:visible').count(),4);
  await page.locator('[data-art-filter="available"]').click();assert.equal(await page.locator('.art-card:visible').count(),8);assert.equal(await page.locator('.art-card:visible .sold-tag').count(),0);assert.equal(await page.locator('#art-empty').isVisible(),false);
  await page.locator('[data-art-filter="all"]').click();
  const card=page.locator('.art-card').first();await card.scrollIntoViewIfNeeded();const box1=await card.boundingBox();await card.hover();const box2=await card.boundingBox();assert.deepEqual(box1,box2,'hover layout shift');
  await card.locator('.art-overlay a').focus();assert.equal(await card.locator('.art-overlay').evaluate(e=>getComputedStyle(e).opacity),'1');
  await page.goto(base+'wnetrza.html?lang=en');await page.locator('[data-interior-filter="residential"]').click();assert.equal(await page.locator('.interior-card').count(),3);await page.locator('.interior-open').first().click();assert.ok(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').isVisible(),false);
  await page.locator('[data-interior-filter="all"]').click();await page.locator('#more-interiors').click();assert.equal(await page.locator('.interior-card').count(),6);
  await page.locator('#comparison-range').focus();await page.keyboard.press('ArrowRight');assert.equal(await page.locator('#comparison-range').inputValue(),'51');assert.equal(await page.locator('.comparison').evaluate(e=>e.style.getPropertyValue('--position')),'51%');
  await page.route('https://www.youtube-nocookie.com/**',route=>route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>YouTube test stub</title>'}));await page.goto(base+'murale.html?lang=pl');await page.locator('.video-open').first().click();assert.ok((await page.locator('dialog iframe').getAttribute('src')).includes('/embed/Xp5XuBZqBsw'));await page.locator('[data-local-video]').click();assert.ok(await page.locator('dialog').isVisible());await page.locator('dialog video').evaluate(v=>new Promise((resolve,reject)=>{if(v.readyState>=1)resolve();else{v.addEventListener('loadedmetadata',resolve,{once:true});v.addEventListener('error',()=>reject(Error('Video load failed')),{once:true});}}));assert.ok(await page.locator('dialog video').evaluate(v=>v.duration>0));await page.keyboard.press('Escape');await page.locator('#dialog-content video').waitFor({state:'detached'});assert.equal(await page.locator('#dialog-content video').count(),0);
  await page.goto(base+'kontakt.html?lang=pl');await page.locator('button[type=submit]').click();assert.equal(await page.locator('#form-status').textContent(),'');assert.equal(await page.locator('input:invalid,select:invalid,textarea:invalid').count(),4);
  let submitted=null;
  await page.route('https://formsubmit.co/ajax/**',async route=>{submitted=route.request().postDataJSON();await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:'true',message:'Accepted'})});});
  await page.locator('#firstName').fill('Test');await page.locator('#email').fill('not-an-email');await page.locator('#project').selectOption('mural');await page.locator('#message').fill('Test podglądu — bez wysyłania.');
  await page.locator('button[type=submit]').click();assert.equal(await page.locator('#form-status').textContent(),'');assert.equal(submitted,null);
  await page.locator('#email').fill('test@example.com');await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#form-status').dataset.state==='accepted');
  assert.match(await page.locator('#form-status').textContent(),/przyjęte do wysyłki/);assert.equal(submitted.email,'test@example.com');assert.equal(submitted.project,'Mural / malowanie sufitu');
  assert.equal(await page.locator('#message').inputValue(),'');
  await page.unroute('https://formsubmit.co/ajax/**');
  await page.route('https://formsubmit.co/ajax/**',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({success:'false'})}));
  await page.locator('#firstName').fill('Test');await page.locator('#email').fill('test@example.com');await page.locator('#project').selectOption('painting');await page.locator('#message').fill('Treść musi pozostać po błędzie.');
  await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#form-status').dataset.state==='error');assert.match(await page.locator('#form-status').textContent(),/Nie udało się/);assert.equal(await page.locator('#message').inputValue(),'Treść musi pozostać po błędzie.');
  await page.unroute('https://formsubmit.co/ajax/**');
  await page.route('https://formsubmit.co/ajax/**',route=>route.abort('failed'));
  await page.locator('button[type=submit]').click();await page.waitForFunction(()=>document.querySelector('#form-status').dataset.state==='error');assert.equal(await page.locator('#message').inputValue(),'Treść musi pozostać po błędzie.');
  await page.unroute('https://formsubmit.co/ajax/**');
  await page.goto(base+'kontakt.html?lang=en&project=painting&artwork=Electric%20Embrace');assert.equal(await page.locator('#project').inputValue(),'painting');assert.match(await page.locator('#message').inputValue(),/Electric Embrace/);
  const detailPaths=['ornamentalne-niebo','magiczny-las-zwierzat','sztuka-ktora-uwalnia-przestrzen',...['meduza','unfrozen','miasto-sukcesu','red-temptation','electric-embrace','joao','silent-horizon','terracotta-muse','michalek','arc-de-triomf---barcelona','business-darling','who-is-hunting'].map(x=>'obrazy-na-zamowienie/'+x),'polityka-prywatnosci'];
  for(const path of detailPaths){await page.goto(base+path+'.html?lang=en');assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('#main-nav>a').count(),5);const switches=await page.locator('.languages a[lang=pl]').first().getAttribute('href');assert.equal(new URL(switches).pathname,'/'+path+'.html');}
  const urls=new Set();for(const route of routes){await page.goto(base+route+'?lang=pl');for(const url of await page.locator('a[href]').evaluateAll(els=>els.map(e=>e.href)))if(url.startsWith(base))urls.add(url);}
  for(const url of urls){const response=await page.request.get(url);assert.ok(response.ok(),url+' broken local link '+response.status());}
  assert.deepEqual(errors,[],'browser errors');
  results.push({interactions:'filters, full collections, hover stability, keyboard reveal, menu, modal focus, local video metadata, keyboard slider, required fields, invalid email, HTTP form success, rejection and network failure with retained content (service mocked; no email sent), preserved detailed paths, local links',result:'pass'});
  fs.writeFileSync(out+'/checks.json',JSON.stringify({date:new Date().toISOString(),results,localLinksChecked:urls.size,detailRoutesChecked:detailPaths.length,externalLinks:'Recovered from original HTML; live availability unverified due to network HTTP 403.',form:'No message sent. FormSubmit POST acceptance, 503 and network failure tested with interception. No real email sent. Recipient activation and inbox delivery remain unverified.'},null,2));
  console.log(JSON.stringify({pageChecks:results.length-1,detailRoutes:detailPaths.length,localLinks:urls.size,browserErrors:errors,screenshots:10,interactions:'pass'}));
  await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
