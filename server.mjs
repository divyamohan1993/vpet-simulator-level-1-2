import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./public/', import.meta.url)));
const port = Number.parseInt(process.env.PORT ?? '8080', 10);

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff2': 'font/woff2'
};

function securityHeaders(contentType) {
  return {
    'Cache-Control': contentType.startsWith('text/html') ? 'no-cache' : 'public, max-age=3600',
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "media-src 'self' blob:",
      "connect-src 'self'",
      "font-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "form-action 'self'"
    ].join('; '),
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Permissions-Policy': 'camera=(), geolocation=(), microphone=(self)',
    'Referrer-Policy': 'no-referrer',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY'
  };
}

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '');
  const absolute = resolve(join(root, normalized));
  return absolute.startsWith(root) ? absolute : null;
}

const server = createServer((request, response) => {
  if (request.url === '/healthz' || request.url?.startsWith('/healthz?')) {
    response.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    response.end(JSON.stringify({ status: 'ok', service: 'vpet-level-2-simulator' }));
    return;
  }

  if (!['GET', 'HEAD'].includes(request.method ?? 'GET')) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  let filePath = safePath(request.url ?? '/');
  if (!filePath) {
    response.writeHead(400);
    response.end('Bad Request');
    return;
  }

  if (filePath === root || (existsSync(filePath) && statSync(filePath).isDirectory())) {
    filePath = join(filePath, 'index.html');
  }

  // The application is a client-side single-page app. Unknown routes return index.html.
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    filePath = join(root, 'index.html');
  }

  const contentType = mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  response.writeHead(200, {
    'Content-Type': contentType,
    ...securityHeaders(contentType)
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`VPET Level 2 simulator listening on http://0.0.0.0:${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received; closing server.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
