const INVENTORY_URL = process.env.INVENTORY_URL ?? 'http://inventory-service:8080';

export async function reserveStock(sku: string, quantity: number): Promise<void> {
  const res = await fetch(`${INVENTORY_URL}/stock/${sku}/reserve`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error(`inventory reserve failed: ${res.status}`);
}
