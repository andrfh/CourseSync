import { pool } from '../../config/db.js'

class RateRepo {
    async createRate(rates) {
        const query = `
            INSERT INTO rates (id, char_code, name, nominal, source)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO NOTHING
            RETURNING *
        `;

        const values = [
            rates.id,
            rates.charCode,
            rates.name,
            rates.nominal,
            rates.source,
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async getAllRates() {
        const { rows } = await pool.query(
            'SELECT * FROM rates'
        );
        return rows;
    }
}

export default new RateRepo;

