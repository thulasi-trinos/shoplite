import { createServer } from 'node:http';
import { getProduct, reserve } from './stock';

createServer(async (req, res) => {
  const reserveMatch = /^\/stock\/([\w-]+)\/reserve$/.exec(req.url ?? '');
  if (req.method === 'POST' && reserveMatch) {
    let body = '';
    for await (const chunk of req) body += chunk;
    const ok = await reserve(reserveMatch[1], JSON.parse(body).quantity);
    res.writeHead(ok ? 200 : 409).end();
    return;
  }
  const getMatch = /^\/stock\/([\w-]+)$/.exec(req.url ?? '');
  if (req.method === 'GET' && getMatch) {
    const product = await getProduct(getMatch[1]);
    res.writeHead(product ? 200 : 404).end(JSON.stringify(product ?? {}));
    return;
  }
  res.writeHead(404).end();
}).listen(Number(process.env.PORT ?? 8080));
