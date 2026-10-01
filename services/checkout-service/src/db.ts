import { Pool } from 'pg';
import { dbConfig } from './config/db';

export const pool = new Pool({
  host: dbConfig.host,
  database: dbConfig.database,
  user: dbConfig.user,
  password: dbConfig.password,
  max: dbConfig.poolMax,
  connectionTimeoutMillis: dbConfig.acquireTimeoutMs,
});
