const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const data=fs.readFileSync(path.join(root,'assets/videos/nature-relief/intro-slow.mp4'));
const processedSha256='a2b2fe539d18d7f7a6d231d8844d3055d2a0fa0cc2446529eec9d29fc329b474';
(async()=>{
 assert.equal(crypto.createHash('sha256').update(data).digest('hex'),processedSha256);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'archive/nature-relief-originals/video/intro-original.mp4'))).digest('hex'),'1a447eaa6033a90646c18d48ec2b003d036e35c00dafc81f94859bc16c452991');
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'}),errors=[],results=[];
  page.on('pageerror',e=>errors.push(e.message));
  // Python's basic preview server lacks HTTP Range. Serve the actual processed bytes
  // with standard byte ranges so seeking is tested under normal media-host conditions.
  await page.route('**/assets/videos/nature-relief/intro-slow.mp4',route=>{
   const range=route.request().headers().range?.match(/bytes=(\d+)-(\d*)/);
   const start=range?Number(range[1]):0,end=range&&range[2]?Math.min(Number(range[2]),data.length-1):data.length-1;
   return route.fulfill({status:range?206:200,headers:{'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':String(end-start+1),...(range?{'Content-Range':`bytes ${start}-${end}/${data.length}`}:{})},body:data.subarray(start,end+1)});
  });
  for(const width of [390,1440])for(const lang of ['pl','en','es']){
   await page.setViewportSize({width,height:1000});
   await page.goto(new URL('natura-w-reliefie.html?lang='+lang,base).href);
   const video=page.locator('main video');await video.scrollIntoViewIfNeeded();
   assert.equal(await video.count(),1);assert.equal(await page.locator('.nature-film video[controls][playsinline]').count(),1);
   assert.equal(await page.locator('main video[autoplay]').count(),0);
   await page.waitForFunction(()=>document.querySelector('main video').readyState>=1);
   const initial=await video.evaluate(v=>({paused:v.paused,width:v.videoWidth,height:v.videoHeight,duration:v.duration,src:v.currentSrc}));
   assert.ok(initial.paused);assert.equal(initial.width,1440);assert.equal(initial.height,1440);
   assert.ok(Math.abs(initial.duration-6.458333)<.1);assert.ok(initial.src.endsWith('/assets/videos/nature-relief/intro-slow.mp4'));
   const box=await page.locator('.nature-film').boundingBox();assert.ok(Math.abs(box.width/box.height-1)<.005);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await video.evaluate(async v=>{v.muted=true;await v.play();});
   await page.waitForFunction(()=>document.querySelector('main video').currentTime>.3);
   await video.evaluate(v=>{v.pause();v.currentTime=2;});
   await page.waitForFunction(()=>Math.abs(document.querySelector('main video').currentTime-2)<.1&&!document.querySelector('main video').seeking);
   if(lang==='pl')await page.locator('.nature-introduction').screenshot({path:path.join(root,'previews/nature-video-'+(width===390?'mobile':'desktop')+'.png')});
   results.push({width,lang,duration:initial.duration,playback:'passed',seeking:'passed',noAutoplay:true});
  }
  await page.goto(new URL('murale-3d-z-funkcja-ogrzewania.html?lang=pl',base).href);
  assert.equal(await page.locator('.heat-film video[controls][playsinline]').count(),1);
  assert.deepEqual(errors,[]);
  const report={date:new Date().toISOString(),processedSha256,originalRetained:true,encodedSpeed:0.8,fullFrame:true,sizeBytes:data.length,rangeHandling:'actual file bytes served with HTTP Range in test',results,artisHeatVideo:'unchanged',browserErrors:errors};
  fs.writeFileSync(path.join(root,'previews/nature-video-checks.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({videoChecks:results.length,playback:'passed',seeking:'passed',slowdown:'0.8×, original retained',artisHeatVideo:'unchanged',browserErrors:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
