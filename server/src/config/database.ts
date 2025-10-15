import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration for Neon (global PostgreSQL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Connection pool settings for serverless
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

pool.on('connect', () => {
  console.log('✅ Database connected successfully to Neon');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  // Don't exit in production, just log the error
  if (process.env.NODE_ENV !== 'production') {
    process.exit(-1);
  }
});

export default pool;

