import { createServer } from 'node:http';
import { checkout } from './checkout';

const server = createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/checkout') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { customerId, lines } = JSON.parse(body);
      res.writeHead(200, { 'content-type': 'application/json' }).end(JSON.stringify(await checkout(customerId, lines)));
    } catch (err) {
      console.error(err);
      res.writeHead(500).end('db unavailable');
    }
    return;
  }
  res.writeHead(404).end();
});

server.listen(Number(process.env.PORT ?? 8080));
