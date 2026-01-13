import { pool } from '../../db/db.js'

class RateRepo {
    async createRate(rates) {
        const query = `
            INSERT INTO rates (currency_id, rate, date)
            VALUES ($1, $2, $3)
            ON CONFLICT (currency_id, date)
            DO UPDATE SET 
                rate = EXCLUDED.rate,
                updated_at = now()
        `;

        const values = [
            rates.currency_id,
            rates.rate,
            rates.date
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

    async getOneRate(id) {
        const { rows } = await pool.query(
            `
            SELECT * FROM rates
            WHERE id = '${id}'
            `
        );
        return rows;
    }

    async updateRate(id, newRate) {
        const query = `
            UPDATE rates
            SET
                currency_id = $1,
                rate = $2,
                date = $3
            WHERE id = '${id}'
            `

        const values = [
            newRate.currency_id,
            newRate.rate,
            newRate.date,
        ];

        const { rows } = await pool.query(query, values);
        return rows;
    }

    async deleteRate(id) {
        const { rows } = await pool.query(
            `
            DELETE FROM rates
            WHERE id = '${id}'
            `
        )
        return rows
    }
}

export default new RateRepo;

