import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { resolve, join, extname } from 'path';
const DIST = resolve('dist');
const mt = { '.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon' };
const server = createServer((req,res)=>{ let p=join(DIST,decodeURIComponent(req.url.split('?')[0]==='/'?'index.html':req.url.split('?')[0])); if(existsSync(p)&&statSync(p).isDirectory())p=join(p,'index.html'); if(!existsSync(p))p=join(DIST,'index.html'); res.writeHead(200,{'Content-Type':mt[extname(p)]||'application/octet-stream'}); res.end(readFileSync(p)); });
server.listen(45679, async () => {
  const b = await launch({ headless:true, args:['--no-sandbox'] });
  const page = await b.newPage();
  const failed = [];
  page.on('requestfailed', r => failed.push(r.url()));
  page.on('response', r => { if (r.url().includes('/assets/') && r.status() >= 400) failed.push(r.status()+' '+r.url()); });
  await page.setViewport({ width:1280, height:1000 });
  await page.goto('http://localhost:45679/', { waitUntil:'networkidle0', timeout:45000 }).catch(()=>{});
  await new Promise(s=>setTimeout(s,1500));
  await page.evaluate(()=>{document.querySelectorAll('h2').forEach(h=>{if(h.textContent.includes('出版著作'))h.scrollIntoView();});});
  await new Promise(s=>setTimeout(s,1500));
  await page.screenshot({ path:'bk.png' });
  // check each img natural size
  const imgs = await page.evaluate(() => Array.from(document.querySelectorAll('img')).filter(i=>i.src.includes('book-')||i.alt.includes('權證小哥')).map(i=>({alt:i.alt,w:i.naturalWidth,h:i.naturalHeight,src:i.src.split('/').pop()})));
  console.log('FAILED:', JSON.stringify(failed));
  console.log('IMGS:', JSON.stringify(imgs));
  await b.close(); server.close();
});
