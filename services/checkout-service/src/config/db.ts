// Database settings for checkout-service. Production values come from the environment.
export const dbConfig = {
  host: process.env.DB_HOST ?? 'postgres-checkout',
  database: process.env.DB_NAME ?? 'checkout',
  user: process.env.DB_USER ?? 'checkout',
  password: process.env.DB_PASSWORD,
  // Keep connections low: the staging database only allows 20 in total.
  poolMax: Number(process.env.DB_POOL_MAX ?? 5),
  acquireTimeoutMs: 5000,
};
