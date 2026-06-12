import { launch } from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'fs';
import { resolve, join, extname, dirname } from 'path';

const DIST = resolve('dist');
const ROUTES = ['/', '/course', '/about/DispositionGod', '/software', '/software/omni-monitor', '/software/day-trade', '/media'];
const PORT = 45678;

// Simple static file server for dist/
const mimeTypes = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };

const server = createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
  // Directory (e.g. /about after /about/DispositionGod was written) → its index.html
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html');
  if (!existsSync(filePath)) filePath = join(DIST, 'index.html'); // SPA fallback
  const ext = extname(filePath);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  res.end(readFileSync(filePath));
});

server.listen(PORT, async () => {
  console.log(`[prerender] Static server on http://localhost:${PORT}`);
  const browser = await launch({ headless: true, args: ['--no-sandbox'] });

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`[prerender] Rendering ${url} ...`);
    const page = await browser.newPage();
    // Block external tracking scripts to avoid timeout
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      const u = req.url();
      if (u.includes('googletagmanager') || u.includes('facebook.com/tr') || u.includes('google-analytics') || u.includes('firestore.googleapis.com')) {
        req.abort();
      } else {
        req.continue();
      }
    });
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait a bit for any async rendering
    await new Promise(r => setTimeout(r, 2000));

    const html = await page.content();
    const outFile = join(DIST, route === '/' ? 'index.html' : `${route}/index.html`);
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html, 'utf-8');
    console.log(`[prerender] Wrote ${outFile} (${(html.length / 1024).toFixed(1)} KB)`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('[prerender] Done!');
});
