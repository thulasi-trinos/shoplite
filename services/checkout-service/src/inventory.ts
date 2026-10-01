const INVENTORY_URL = process.env.INVENTORY_URL ?? 'http://inventory-service:8080';

async function post(sku: string, quantity: number): Promise<Response> {
  return fetch(`${INVENTORY_URL}/stock/${sku}/reserve`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
}

export async function reserveStock(sku: string, quantity: number): Promise<void> {
  let res: Response;
  try {
    res = await post(sku, quantity);
  } catch (err) {
    // Connection resets from inventory-service happen during its deploys; retry once.
    console.warn('ECONNRESET calling inventory-service (retried)', err);
    res = await post(sku, quantity);
  }
  if (!res.ok) throw new Error(`inventory reserve failed: ${res.status}`);
}
