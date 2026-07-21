import pkg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'dev';

const { Pool } = pkg;

const configs: Record<string, any> = {
  dev: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
  }
};

const pool = new Pool(configs[env]);

export default pool;
