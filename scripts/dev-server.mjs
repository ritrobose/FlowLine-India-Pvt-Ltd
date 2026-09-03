import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain'
};

const server = http.createServer(async (req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(urlObj.pathname);

  // Handle Save Page API
  if (req.method === 'POST' && pathname === '/api/save-page') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { path: reqPath, html } = JSON.parse(body);
        if (!html) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: 'HTML content missing' }));
        }

        let cleanPath = reqPath.split('?')[0];
        if (cleanPath === '/' || cleanPath === '') {
          cleanPath = '/index.html';
        } else if (!cleanPath.endsWith('.html') && !path.extname(cleanPath)) {
          cleanPath = `${cleanPath}.html`;
        }

        const relativeTarget = cleanPath.replace(/^\/+/, '');
        const fullPath = path.resolve(ROOT_DIR, relativeTarget);

        // Security check
        if (!fullPath.startsWith(ROOT_DIR)) {
          res.writeHead(403, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ success: false, message: 'Invalid target path' }));
        }

        // Create backup if source exists
        if (fs.existsSync(fullPath)) {
          const backupPath = `${fullPath}.bak`;
          fs.copyFileSync(fullPath, backupPath);
        }

        // Write updated HTML to disk
        fs.writeFileSync(fullPath, html, 'utf-8');
        console.log(`[Dev Editor] Saved changes to: ${relativeTarget}`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, file: relativeTarget }));
      } catch (err) {
        console.error('[Dev Editor] Save error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: err.message }));
      }
    });
    return;
  }

  // Serve the injected editor client script
  if (pathname === '/__editor/editor-client.js') {
    const editorScriptPath = path.join(ROOT_DIR, 'scripts', 'editor-client.js');
    if (fs.existsSync(editorScriptPath)) {
      res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
      return fs.createReadStream(editorScriptPath).pipe(res);
    } else {
      res.writeHead(404);
      return res.end('Editor script not found');
    }
  }

  // Resolve file path
  let relativePath = pathname.replace(/^\/+/, '');
  if (!relativePath || relativePath.endsWith('/')) {
    relativePath += 'index.html';
  }

  let filePath = path.resolve(ROOT_DIR, relativePath);

  // Allow clean URLs (e.g. /axial-flow-fans -> /axial-flow-fans.html)
  if (!fs.existsSync(filePath) && !path.extname(filePath)) {
    if (fs.existsSync(`${filePath}.html`)) {
      filePath = `${filePath}.html`;
    }
  }

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  // Check if file exists
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end(`File not found: ${pathname}`);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // If HTML file, dynamically inject the visual editor script before </body>
  if (ext === '.html') {
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      const injection = '<script src="/__editor/editor-client.js" defer></script>';
      if (content.includes('</body>')) {
        content = content.replace('</body>', `${injection}\n</body>`);
      } else {
        content += `\n${injection}`;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      return res.end(content);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end(`Error loading HTML: ${err.message}`);
    }
  }

  // Serve static assets
  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 [Flowline Dev Server] Running at: http://localhost:${PORT}`);
  console.log(`✏️  [Visual Editor] In-browser click-to-edit is ENABLED`);
  console.log(`======================================================\n`);
});
