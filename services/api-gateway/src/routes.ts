// Public routes and the upstream service that serves them. TLS terminates here for api.shoplite.dev.
export const routes = [
  { prefix: '/api/checkout', upstream: 'http://checkout-service:8080', timeoutMs: 10_000 },
  { prefix: '/api/cart', upstream: 'http://checkout-service:8080', timeoutMs: 5_000 },
  { prefix: '/api/payments', upstream: 'http://payment-service:8080', timeoutMs: 10_000 },
  { prefix: '/api/stock', upstream: 'http://inventory-service:8080', timeoutMs: 5_000 },
  { prefix: '/search', upstream: 'http://search:8080', timeoutMs: 30_000 },
  { prefix: '/', upstream: 'http://web:8080', timeoutMs: 5_000 },
];
