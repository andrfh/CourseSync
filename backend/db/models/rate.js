import { pool } from '../config/db.js';

const { rows } = pool.query(
    `
    CREATE TABLE rates (
        id SERIAL PRIMARY KEY,
        currency_id TEXT REFERENCES currencies(id),
        rate NUMERIC(12,6) NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT now(),

        UNIQUE (currency_id, date)
    );
    `
);
