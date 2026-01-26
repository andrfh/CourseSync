import express from 'express'
import router from './api/router.js'
import { pool } from './db/db.js'
import startSyncJob from './jobs/syncRates.jobs.js';

const PORT = 5000;

const app = express();

app.use(express.json())

app.use('/api', router)

async function start() {
  try {
    await pool.query('SELECT 1'); // Проверка подключения к БД
    console.log('DB connected');
    startSyncJob(); // Ежедневная синхронизация данных
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

  } catch (e) {
    console.error('Failed to connect to DB');
    console.error(e);
    process.exit(1);
  }
}

start();