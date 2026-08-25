import dotenv from 'dotenv';
import app from './index.js';
import pool from './config/db.js';

dotenv.config();

pool.query('SELECT 1')
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch((err) => console.error('Database connection error:', err));

const PORT = Number(process.env.PORT || 8080);
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));