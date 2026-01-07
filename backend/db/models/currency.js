import { pool } from '../config/db.js';

const { rows } = pool.query(
    `
    CREATE TABLE currencies (
        id TEXT PRIMARY KEY,
        char_code TEXT NOT NULL,
        name TEXT NOT NULL,
        nominal INTEGER NOT NULL,
        source TEXT NOT NULL
    );
    `
);
