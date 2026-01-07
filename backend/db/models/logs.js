import { pool } from '../config/db.js';

const { rows } = pool.query(
    `
    CREATE TABLE logs (
        id SERIAL PRIMARY KEY,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        meta JSONB,
        created_at TIMESTAMP DEFAULT now()
    );
    `
);
