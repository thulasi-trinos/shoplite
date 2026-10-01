// Database settings for checkout-service. Production values come from the environment.
export const dbConfig = {
  host: process.env.DB_HOST ?? 'postgres-checkout',
  database: process.env.DB_NAME ?? 'checkout',
  user: process.env.DB_USER ?? 'checkout',
  password: process.env.DB_PASSWORD,
  // Connections kept open per instance. Production runs 3 instances at ~1,200 requests/min.
  poolMax: Number(process.env.DB_POOL_MAX ?? 20),
  acquireTimeoutMs: 5000,
};
