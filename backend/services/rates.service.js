import RateRepo from '../db/repositories/rate.repository.js'
import formatDate from '../utils/Date.js';
import { currencySymbols } from '../utils/currencySymbols.js';

class RateService {
    async createRate(currency) {
        const rates = await RateRepo.createRate(currency);
        return rates
    }

    async getAllRates() {
        const rates = await RateRepo.getAllRates();
        return rates
    }

    async getOneRate(id) {
        const rate = await RateRepo.getOneRate(id);
        return rate
    }

    async updaupdateRateteCurrency(id, newRate) {
        const rate = await RateRepo.updateRate(id, newRate);
        return rate
    }

    async deleteRate(id) {
        const rate = await RateRepo.deleteRate(id);
        return rate
    }

    async getFormatedRates() {
        const rates = await RateRepo.getFormatedRates();
        const formatedRates = rates.map((rate) => ({
            id: rate.id,
            code: rate.code,
            name: rate.name,
            nominal: rate.nominal,
            value: rate.value.slice(0, 7),
            symbol:currencySymbols[rate.code],
            date: formatDate(rate.date),
            source: rate.source,
            updated_at: formatDate(rate.updated_at)
        }))
        return formatedRates
    }

}

export default new RateService;