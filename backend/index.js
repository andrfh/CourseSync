import express from 'express'
import router from './api/router.js'
import { pool } from './config/db.js'

const PORT = 5000;

const app = express();

app.use(express.json())

app.use('/api', router)

async function start() {
  try {
    await pool.query('SELECT 1');
    console.log('DB connected');

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