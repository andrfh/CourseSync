import RateService from "../../services/rates.service.js";

class RatesController {
    async createRate (req, res) {
        const data = await RateService.createRate(req.body)
        res.json(data)
    }

    async getAllRates(req, res) {
        const data = await RateService.getAllRates();
        res.json(data);
    }

    async getOneRate(req, res) {
        const data = await RateService.getOneRate(req.params.id);
        res.json(data)
    }

     async updateRate(req, res) {
        const data = await RateService.updateRate(req.params.id, req.body);
        res.json(data)
    }

    async deleteRate(req, res) {
        const data = await RateService.deleteRate(req.params.id);
        res.json(data)
    }
}

export default new RatesController