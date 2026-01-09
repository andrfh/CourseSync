import currencyService from "../../services/currency.service.js";

class CurrencyController {
    async createCurrency (req, res) {
        try{
            const data = await currencyService.createCurrency(req.body)
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
        
    }

    async getAllCurrencies(req, res) {
        try {
            const data = await currencyService.getCurrencies();
            res.json(data);
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    async getOneCurrency(req, res) {
        try {
            const data = await currencyService.getOneCurrency(req.params.id);
            if (data[0]) {
                res.json(data)
            } else {
                return res.status(404).json({ error: 'Currency not found' });
            }
            
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
        
    }

     async updateCurrency(req, res) {
        try {
            const data = await currencyService.updateCurrency(req.params.id, req.body);
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    async deleteCurrency(req, res) {
        try {
            const data = await currencyService.deleteCurrency(req.params.id);
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }

    
}

export default new CurrencyController