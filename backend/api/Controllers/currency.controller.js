import currencyService from "../../services/currency.service.js";

class CurrencyController {
    async createCurrency (req, res) {
        console.log(req.body)
        const data = await currencyService.createCurrency(req.body)
        res.json(data)
    }

    async getAllCurrencies(req, res) {
        const data = await currencyService.getCurrencies();
        res.json(data);
    }

    async getOneCurrency(req, res) {
        const data = await currencyService.getOneCurrency(req.params.id);
        res.json(data)
    }

     async updateCurrency(req, res) {
        const data = await currencyService.updateCurrency(req.params.id, req.body);
        res.json(data)
    }

    async deleteCurrency(req, res) {
        const data = await currencyService.deleteCurrency(req.params.id);
        res.json(data)
    }
}

export default new CurrencyController