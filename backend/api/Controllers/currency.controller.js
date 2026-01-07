import currencyService from "../../services/currency.service.js";

class CurrencyController {
    async getAllCurrencies(req, res) {
        const data = await currencyService.getCurrencies();
        res.json(data);
    }
}

export default new CurrencyController