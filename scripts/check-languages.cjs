const {chromium} = require('playwright');
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');
const base = process.env.AOM_BASE_URL || 'http://127.0.0.1:4173/';
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'previews');
const normalize = value => value.replace(/\s+/g, ' ').trim();

(async () => {
  const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']});
  const errors = [];
  let spanishPages = 0;
  let mockSubmissions = 0;
  try {
    const page = await browser.newPage({reducedMotion:'reduce'});
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.text().startsWith('Missing Spanish translation:')) errors.push(message.text());
    });
    await page.route('https://www.youtube-nocookie.com/**', route => route.fulfill({contentType:'text/html',body:'<!doctype html><title>Test player</title>'}));
    await page.route('https://formsubmit.co/**', route => route.abort());
    const files = ['', 'obrazy-na-zamowienie'].flatMap(directory =>
      fs.readdirSync(path.join(root,directory)).filter(name => name.endsWith('.html')).map(name => [directory,name].filter(Boolean).join('/')));
    for (const width of [390,1440]) {
      await page.setViewportSize({width,height:1000});
      for (const file of files) {
        await page.goto(new URL(file+'?lang=es',base).href,{waitUntil:'domcontentloaded'});
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('html').getAttribute('lang'),'es');
        assert.deepEqual(await page.locator('#main-nav>a').allTextContents(),['Portfolio','Murales','Interiores','Pintura','Contacto']);
        assert.equal(await page.locator('#main-nav .languages a').count(),3);
        assert.doesNotMatch(await page.locator('main').innerText(),/undefined|Let’s talk|Zobacz więcej|Zapytaj o pracę/);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1),file+' ES overflow at '+width);
        assert.equal(await page.locator('.languages [lang=es][aria-current=true]').count(),2);
        for (const code of ['pl','en','es']) {
          const switchURL = new URL(await page.locator('#main-nav .languages a[lang='+code+']').getAttribute('href'));
          assert.equal(switchURL.pathname,new URL(file,base).pathname);
          assert.equal(switchURL.searchParams.get('lang'),code);
        }
        spanishPages++;
      }
    }
    await page.goto(new URL('obrazy-na-zamowienie/who-is-hunting.html?lang=pl&artwork=Who%20is%20hunting%3F&project=painting#main',base).href);
    for (const code of ['es','en','pl']) {
      await page.locator('.site-footer .languages a[lang='+code+']').click();
      assert.equal(new URL(page.url()).searchParams.get('project'),'painting');
      assert.equal(new URL(page.url()).searchParams.get('artwork'),'Who is hunting?');
      assert.equal(new URL(page.url()).hash,'#main');
      assert.equal(await page.locator('html').getAttribute('lang'),code);
    }
    const descriptions = [
      'Ręcznie malowane ściany, które nadają przestrzeni sens, głębię i osobisty wymiar.',
      'Unikalna sztuka do wnętrz prywatnych i komercyjnych.',
      'Artystyczne projektowanie, w którym mural lub obraz jest punktem wyjścia do stworzenia wyjątkowej przestrzeni.'
    ];
    for (const width of [390,1440]) {
      await page.setViewportSize({width,height:1000});
      for (const lang of ['pl','en','es']) {
        await page.goto(new URL('index.html?lang='+lang,base).href);
        const about = page.locator('.about');
        await about.locator('img').evaluate(image => {image.loading='eager';return image.decode();});
        assert.equal(await about.locator('img').evaluate(image => image.naturalWidth),3888);
        assert.equal(await about.locator('img').evaluate(image => image.naturalHeight),5184);
        assert.doesNotMatch(await about.innerText(),/Bielsko|Sara Folch|undergraduate|internship|Let’s talk/);
        assert.equal(await about.locator('blockquote cite').textContent(),'Magdalena Babicka');
        assert.ok((await page.locator('.areas-grid article').nth(1).locator('img').getAttribute('src')).endsWith('/business-darling.png'));
        if (lang==='pl') {
          assert.deepEqual(await page.locator('.area-copy p').allTextContents(),descriptions);
          assert.match(await about.innerText(),/Polsce i Hiszpanii/);
        } else if (lang==='en') {
          assert.match(await about.innerText(),/projects in Poland and Spain/);
          assert.equal(normalize(await about.locator('.arrow-link').innerText()),'Discuss your project →');
        } else {
          assert.match(await about.innerText(),/proyectos en Polonia y España/);
          assert.match(await about.locator('blockquote').innerText(),/el arte puede dialogar con el espacio/);
        }
        await about.scrollIntoViewIfNeeded();
        await page.evaluate(() => {
          document.activeElement?.blur();
          return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        });
        await about.screenshot({path:path.join(out,'about-'+lang+'-'+(width===390?'mobile':'desktop')+'.png')});
      }
    }
    await page.goto(new URL('obrazy-na-zamowienie.html?lang=es',base).href);
    await page.locator('[data-art-filter=available]').click();
    assert.equal(await page.locator('.art-card:visible').count(),8);
    assert.equal(await page.locator('.art-card:visible .sold-tag').count(),0);
    for (const card of await page.locator('.art-card:visible').all()) assert.match(await card.locator('.price').innerText(),/€/);
    await page.locator('[data-art-filter=archive]').click();
    assert.equal(await page.locator('.art-card:visible .sold-tag').count(),4);
    await page.goto(new URL('obrazy-na-zamowienie/joao.html?lang=es',base).href);
    assert.equal(await page.locator('.client-review blockquote').getAttribute('lang'),'es');
    assert.equal(await page.locator('.client-review figcaption small').innerText(),'Traducido del inglés');
    await page.goto(new URL('murale.html?lang=es',base).href);
    await page.locator('.video-open').first().click();
    assert.equal(new URL(await page.locator('dialog iframe').getAttribute('src')).searchParams.get('hl'),'es');
    assert.equal(await page.locator('dialog [data-local-video]').innerText(),'Reproducir la versión local →');
    await page.keyboard.press('Escape');
    await page.locator('dialog iframe').waitFor({state:'detached'});
    await page.goto(new URL('kontakt.html?lang=es&project=painting&artwork=Electric%20Embrace',base).href);
    assert.match(await page.locator('#message').inputValue(),/^Me interesa la obra:/);
    await page.locator('button[type=submit]').click();
    assert.equal(await page.locator('#firstName').evaluate(field => field.validationMessage),'Complete este campo.');
    await page.locator('#firstName').fill('Prueba');
    await page.locator('#email').fill('prueba@example.com');
    await page.locator('#message').fill('Consulta de prueba sin envío real.');
    let payload;
    await page.unroute('https://formsubmit.co/**');
    await page.route('https://formsubmit.co/**',route => {
      mockSubmissions++;
      payload=route.request().postDataJSON();
      return route.fulfill({contentType:'application/json',body:JSON.stringify({success:true})});
    });
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => document.querySelector('#form-status').dataset.state==='accepted');
    assert.equal(payload.language,'es');
    assert.equal(payload.project,'Cuadro / retrato por encargo');
    assert.match(await page.locator('#form-status').textContent(),/Su consulta se ha aceptado/);
    await page.unroute('https://formsubmit.co/**');
    await page.route('https://formsubmit.co/**',route => {
      mockSubmissions++;
      return route.fulfill({contentType:'application/json',body:JSON.stringify({success:false})});
    });
    await page.locator('#firstName').fill('Prueba');
    await page.locator('#email').fill('prueba@example.com');
    await page.locator('#project').selectOption('mural');
    await page.locator('#message').fill('Este mensaje debe conservarse.');
    await page.locator('button[type=submit]').click();
    await page.waitForFunction(() => document.querySelector('#form-status').dataset.state==='error');
    assert.equal(await page.locator('#message').inputValue(),'Este mensaje debe conservarse.');
    assert.match(await page.locator('#form-status').innerText(),/No se ha podido confirmar el envío/);
    assert.deepEqual(errors,[]);
    const reportFile=path.join(out,'checks.json');
    const report=JSON.parse(fs.readFileSync(reportFile));
    report.languageAndArtistChecks={date:new Date().toISOString(),spanishPages,activePages:files.length,languages:['pl','en','es'],languageSwitchPreservesContext:true,aboutScreenshots:6,highQualityPortrait:'3888 × 5184',categoryCopyMatchesReference:true,catCover:true,spanishFormResponses:mockSubmissions,realEmailsSent:0,browserErrors:errors};
    fs.writeFileSync(reportFile,JSON.stringify(report,null,2));
    console.log(JSON.stringify(report.languageAndArtistChecks));
  } finally {await browser.close();}
})().catch(error => {console.error(error);process.exit(1);});
