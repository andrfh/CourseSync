import CurrencyRepo from '../db/repositories/currency.repository.js'

class CurrencyService {
    async getCurrencies() {
        const currencies = await CurrencyRepo.getAllCurrencies();
        console.log(currencies)
        return currencies.map(c => ({
            code: c.char_code,
            name: c.name,
        }));
    }

}

export default new CurrencyService;