import { createServer } from 'node:http';
import { charge } from './provider/paylane';

createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/charges') {
    let body = '';
    for await (const chunk of req) body += chunk;
    const { amountCents, token } = JSON.parse(body);
    try {
      res.writeHead(200).end(JSON.stringify(await charge(amountCents, token)));
    } catch {
      res.writeHead(502).end('provider unavailable');
    }
    return;
  }
  res.writeHead(404).end();
}).listen(Number(process.env.PORT ?? 8080));
