import { pool } from './db';
import { reserveStock } from './inventory';

export interface CartLine {
  sku: string;
  quantity: number;
  priceCents: number;
}

export async function checkout(customerId: string, lines: CartLine[]): Promise<{ orderId: string }> {
  for (const line of lines) await reserveStock(line.sku, line.quantity);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const total = lines.reduce((sum, l) => sum + l.quantity * l.priceCents, 0);
    const { rows } = await client.query<{ id: string }>(
      'INSERT INTO orders (customer_id, total_cents) VALUES ($1, $2) RETURNING id',
      [customerId, total],
    );
    for (const line of lines) {
      await client.query('INSERT INTO order_lines (order_id, sku, quantity, price_cents) VALUES ($1, $2, $3, $4)', [
        rows[0].id,
        line.sku,
        line.quantity,
        line.priceCents,
      ]);
    }
    await client.query('COMMIT');
    return { orderId: rows[0].id };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
