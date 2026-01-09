import CurrencyRepo from '../db/repositories/currency.repository.js'

class CurrencyService {
    async createCurrency(currency) {
        const currencies = await CurrencyRepo.createCurrency(currency);
        return currencies
    }

    async getCurrencies() {
        const currencies = await CurrencyRepo.getAllCurrencies();
        return currencies
    }

    async getOneCurrency(id) {
        const currency = await CurrencyRepo.getOneCurrency(id);
        return currency
    }

    async updateCurrency(id, newCurrency) {
        const currency = await CurrencyRepo.updateCurrency(id, newCurrency);
        return currency
    }

    async deleteCurrency(id) {
        const currency = await CurrencyRepo.deleteCurrency(id);
        return currency
    }

}

export default new CurrencyService;