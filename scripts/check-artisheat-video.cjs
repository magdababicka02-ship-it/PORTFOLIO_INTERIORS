const {chromium}=require('playwright');
const assert=require('assert/strict');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const base=process.env.AOM_BASE_URL||'http://127.0.0.1:4173/';
const data=fs.readFileSync(path.join(root,'assets/videos/artisheat/intro-9x16.mp4'));
const sourceSha256='19519ad33cb88b3d0a9f9853dddcdab45252278cec830656a63f0abcd922a4c6';
(async()=>{
 assert.equal(crypto.createHash('sha256').update(data).digest('hex'),sourceSha256);
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({reducedMotion:'reduce'}),errors=[],results=[];
  page.on('pageerror',e=>errors.push(e.message));
  // Python's basic preview server lacks HTTP Range. Serve the actual uploaded bytes
  // with standard byte ranges so seeking is tested under normal media-host conditions.
  await page.route('**/assets/videos/artisheat/intro-9x16.mp4',route=>{
   const range=route.request().headers().range?.match(/bytes=(\d+)-(\d*)/);
   const start=range?Number(range[1]):0,end=range&&range[2]?Math.min(Number(range[2]),data.length-1):data.length-1;
   return route.fulfill({status:range?206:200,headers:{'Content-Type':'video/mp4','Accept-Ranges':'bytes','Content-Length':String(end-start+1),...(range?{'Content-Range':`bytes ${start}-${end}/${data.length}`}:{})},body:data.subarray(start,end+1)});
  });
  for(const width of [390,1440])for(const lang of ['pl','en','es']){
   await page.setViewportSize({width,height:1000});
   await page.goto(new URL('murale-3d-z-funkcja-ogrzewania.html?lang='+lang,base).href);
   const video=page.locator('main video');await video.scrollIntoViewIfNeeded();
   assert.equal(await video.count(),1);assert.equal(await page.locator('.heat-film video[controls][playsinline]').count(),1);
   assert.equal(await page.locator('main video[autoplay]').count(),0);
   await page.waitForFunction(()=>document.querySelector('main video').readyState>=1);
   const initial=await video.evaluate(v=>({paused:v.paused,width:v.videoWidth,height:v.videoHeight,duration:v.duration,src:v.currentSrc}));
   assert.ok(initial.paused);assert.equal(initial.width,576);assert.equal(initial.height,1024);
   assert.ok(Math.abs(initial.duration-19.458322)<.1);assert.ok(initial.src.endsWith('/assets/videos/artisheat/intro-9x16.mp4'));
   const box=await page.locator('.heat-film').boundingBox();assert.ok(Math.abs(box.width/box.height-9/16)<.005);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await video.evaluate(async v=>{v.muted=true;await v.play();});
   await page.waitForFunction(()=>document.querySelector('main video').currentTime>.3);
   await video.evaluate(v=>{v.pause();v.currentTime=2;});
   await page.waitForFunction(()=>Math.abs(document.querySelector('main video').currentTime-2)<.1&&!document.querySelector('main video').seeking);
   if(lang==='pl')await page.locator('.heat-introduction').screenshot({path:path.join(root,'previews/artisheat-video-'+(width===390?'mobile':'desktop')+'.png')});
   results.push({width,lang,duration:initial.duration,playback:'passed',seeking:'passed',noAutoplay:true});
  }
  await page.goto(new URL('natura-w-reliefie.html?lang=pl',base).href);
  assert.equal(await page.locator('main video').count(),0);assert.equal(await page.locator('.nature-film img').count(),1);
  assert.deepEqual(errors,[]);
  const report={date:new Date().toISOString(),sourceSha256,byteIdentical:true,sizeBytes:data.length,rangeHandling:'actual file bytes served with HTTP Range in test',results,naturePosterPreserved:true,browserErrors:errors};
  fs.writeFileSync(path.join(root,'previews/artisheat-video-checks.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({videoChecks:results.length,playback:'passed',seeking:'passed',sourceBytes:'unchanged',naturePoster:'unchanged',browserErrors:errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
