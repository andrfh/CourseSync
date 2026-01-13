import RateService from "../../services/rates.service.js";

class RatesController {
    async createRate (req, res) {
        try{
            const data = await RateService.createRate(req.body)
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    async getAllRates(req, res) {
        try {
            const data = await RateService.getAllRates();
            res.json(data);
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    async getOneRate(req, res) {
        try {
            const data = await RateService.getOneRate(req.params.id);
            if (data[0]) {
                res.json(data)
            } else {
                return res.status(404).json({ error: 'Rate not found' });
            }
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

     async updateRate(req, res) {
        try {   
            const data = await RateService.updateRate(req.params.id, req.body);
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    async deleteRate(req, res) {
        try {
            const data = await RateService.deleteRate(req.params.id);
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    async getFormatedRates(req, res) {
        try {
            const data = await RateService.getFormatedRates();
            res.json(data);
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }
}

export default new RatesController