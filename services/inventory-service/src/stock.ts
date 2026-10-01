import { Pool } from 'pg';
import { productCache, type Product } from './cache';

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 10 });

export async function getProduct(sku: string): Promise<Product | undefined> {
  const cached = productCache.get(sku);
  if (cached) return cached;
  const { rows } = await pool.query<Product>('SELECT sku, name, stock FROM products WHERE sku = $1', [sku]);
  if (rows[0]) productCache.set(sku, rows[0]);
  return rows[0];
}

export async function reserve(sku: string, quantity: number): Promise<boolean> {
  const { rowCount } = await pool.query('UPDATE products SET stock = stock - $2 WHERE sku = $1 AND stock >= $2', [
    sku,
    quantity,
  ]);
  productCache.delete(sku);
  return rowCount === 1;
}

export async function getStockBulk(skus: string[]): Promise<Record<string, number>> {
  const { rows } = await pool.query<{ sku: string; stock: number }>(
    'SELECT sku, stock FROM products WHERE sku = ANY($1)',
    [skus],
  );
  return Object.fromEntries(rows.map((r) => [r.sku, r.stock]));
}
