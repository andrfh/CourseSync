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

    async getOneCurrency(id) {
        const { rows } = await pool.query(
            `
            SELECT * FROM currencies
            WHERE id = '${id}'
            `
        );
        return rows;
    }

    async updateCurrency(id, newCurrency) {
        const query = `
            UPDATE currencies
            SET
                id = $1,
                char_code = $2,
                name = $3,
                nominal = $4,
                source = $5
            WHERE id = '${id}'
            `

        const values = [
            newCurrency.id,
            newCurrency.charCode,
            newCurrency.name,
            newCurrency.nominal,
            newCurrency.source,
        ];

        const { rows } = await pool.query(query, values);
        return rows;
    }

    async deleteCurrency(id) {
        const { rows } = await pool.query(
            `
            DELETE FROM currencies
            WHERE id = '${id}'
            `
        )
        return rows
    }
}

export default new CurrencyRepo;

