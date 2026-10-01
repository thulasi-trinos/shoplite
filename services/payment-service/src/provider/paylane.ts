import { request } from 'undici';

const PAYLANE_URL = process.env.PAYLANE_URL ?? 'https://api.paylane.example';

export async function charge(amountCents: number, token: string): Promise<{ id: string }> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await request(`${PAYLANE_URL}/v2/charges`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ amount: amountCents, source: token }),
      bodyTimeout: 3000,
    });
    if (res.statusCode < 500) return (await res.body.json()) as { id: string };
    console.warn(`provider=paylane status=${res.statusCode} retry=${attempt}`);
  }
  throw new Error('charge failed after 3 retries');
}
