import { pool } from '../../config/db.js'

class CurrencyRepo {
    async createCurrency(currency) {
        const query = `
            INSERT INTO currencies (id, char_code, name, nominal, source)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (id) DO NOTHING
            RETURNING *
        `;

        const values = [
            currency.id,
            currency.charCode,
            currency.name,
            currency.nominal,
            currency.source,
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async getAllCurrencies() {
        const { rows } = await pool.query(
            'SELECT * FROM currencies'
        );
        return rows;
    }
}

export default new CurrencyRepo;

