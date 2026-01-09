import { pool } from '../../config/db.js'

class SyncRepo {
    async syncWithCBR(data) {
        const values = [];
        const placeholders = [];

        data.forEach((r, i) => {
            const idx = i * 3;
            placeholders.push(`($${idx + 1}, $${idx + 2}, $${idx + 3})`);
            values.push(r.id, r.value, r.date);
        });

        const query = `
            INSERT INTO rates (currency_id, rate, date)
            VALUES ${placeholders.join(',')}
            ON CONFLICT (currency_id)
            DO UPDATE SET
                rate = EXCLUDED.rate,
                date = EXCLUDED.date
            `;
        try {
            const { rows } = await pool.query(query, values);
            console.log('Succesfull to sync rates with DB')
            return rows;
        } catch (e) {
            throw new Error(`DB rates proccess failed`);
        }
    }

    async updateNewCurrencies(data) {
        const values = [];
        const placeholders = [];

        data.forEach((r, i) => {
            const idx = i * 5;
            placeholders.push(`($${idx + 1}, $${idx + 2}, $${idx + 3}, $${idx + 4}, $${idx + 5})`);
            values.push(r.id, r.charCode, r.name, r.nominal, r.source);
        });

        const query = `
            INSERT INTO currencies (id, char_code, name, nominal, source)
            VALUES ${placeholders.join(',')}
            ON CONFLICT (id)
            DO UPDATE SET
            char_code = EXCLUDED.char_code,
            name = EXCLUDED.name,
            nominal = EXCLUDED.nominal,
            source = EXCLUDED.source
            `;
        try {
            const { rows } = await pool.query(query, values);
            console.log('Succesfull to sync currencies with DB')
            return rows;
        } catch (e) {
            throw new Error(`DB currencies proccess failed`);
        }
    }

    
}

export default new SyncRepo;

