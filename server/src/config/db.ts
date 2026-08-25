import pkg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const isProduction = process.env.NODE_ENV === 'production';

// Prioritize DATABASE_URL (Render standard), fallback to discrete env vars for local dev
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
      }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || 5432,
      }
);

export default pool;
