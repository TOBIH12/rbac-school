import dotenv from 'dotenv';
import app from './index.ts';
import pool from './config/db.ts';

dotenv.config();

pool
  .connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Database connection error', err));

const PORT = Number(process.env.PORT);
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));