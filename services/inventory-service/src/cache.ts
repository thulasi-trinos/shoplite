import { LRUCache } from 'lru-cache';

export interface Product {
  sku: string;
  name: string;
  stock: number;
}

// Product lookups are cached for 60 s; at most 5,000 products are kept in memory.
export const productCache = new LRUCache<string, Product>({ max: 5000, ttl: 60_000 });
