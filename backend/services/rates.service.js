import RateRepo from '../db/repositories/rate.repository.js'

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

}

export default new RateService;