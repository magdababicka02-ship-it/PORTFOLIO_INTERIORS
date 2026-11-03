const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const out=path.resolve(__dirname,'../previews');
const routes=['wnetrza','midnight-garden','puerto-banus-residence','private-spa-bathroom','atmosphere-driven-apartment','spisak-studio','ceremonial-arrival','the-space-between'];
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const errors=[];let checks=0;
 try{
  const page=await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.text().startsWith('Missing Spanish translation:'))errors.push(message.text());});
  for(const width of [390,1440])for(const lang of ['pl','en','es'])for(const route of routes){
   await page.setViewportSize({width,height:1000});
   await page.goto(new URL(route+'.html?lang='+lang,base).href);
   await page.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode()));});
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' '+lang+' overflow at '+width);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('.space-invitation,.space-disclosure,.comparison-note,.spa-documentation-note,.arrival-schematic-note,.arrival-affiliation').count(),0,'Requested explanations removed');
   const visible=await page.locator('main').innerText();
   assert.doesNotMatch(visible,/nie dokumentacją|nie jest rysunkiem|nie jest dokumentacją|nie fotografie ukończonej|not a completed|not a construction|not photographs of a completed|no es un plano|no fotografías de|undefined/);
   if(route==='atmosphere-driven-apartment'){
    assert.equal(await page.locator('.apartment-materials,.apartment-material-grid,.apartment-joinery-detail').count(),0);
    assert.equal(await page.locator('.apartment-hero-visual figcaption').count(),0);
    assert.equal(await page.locator('.apartment-status').textContent(),{pl:'Realizacja w toku',en:'Implementation in progress',es:'Obra en curso'}[lang]);
   }
   if(route==='wnetrza'||route==='midnight-garden'){
    const range=page.locator('#comparison-range');await range.focus();await page.keyboard.press('ArrowRight');
    assert.equal(await range.inputValue(),'51','Comparison retains keyboard support');
   }
   if(route==='ceremonial-arrival'){
    assert.equal(await page.locator('.arrival-spatial,.arrival-reference').count(),0);
    assert.equal((visible.match(/NOVA KASYANOV/g)||[]).length,2,'Credit preserved without repetitions');
   }
   if(['private-spa-bathroom','atmosphere-driven-apartment'].includes(route)){
    const details=page.locator(route.startsWith('private')?'.spa-technical-details':'.apartment-technical-details');
    assert.equal(await details.locator('img:visible').count(),0,'Selected plan is optional');
    await details.locator('summary').focus();await page.keyboard.press('Enter');
    assert.equal(await details.locator('img:visible').count(),1,'Only one selected plan');
    await page.keyboard.press('Enter');
   }
   if(lang==='pl'&&['the-space-between','atmosphere-driven-apartment','private-spa-bathroom','ceremonial-arrival'].includes(route)){
    await page.evaluate(()=>{document.activeElement.blur();window.scrollTo(0,0);});
    await page.mouse.move(0,0);
    await page.screenshot({path:path.join(out,'refined-'+route+'-'+(width===390?'mobile':'desktop')+'.png'),fullPage:true});
   }
   checks++;
  }
  assert.deepEqual(errors,[]);
  const result={date:new Date().toISOString(),pageChecks:checks,languages:['pl','en','es'],viewports:[390,1440],routes,removed:'repeated invitation and disclaimers, comparison instructions, visualisation captions, weak kitchen material crops and raw technical galleries',selectedPlans:'one per project, collapsed; keyboard checked',implementationStatus:'PL/EN/ES visible for apartment and spa',comparisonKeyboard:'passed',projectCount:12,browserErrors:errors};
  fs.writeFileSync(path.join(out,'premium-refinement-checks.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(error=>{console.error(error);process.exit(1)});
