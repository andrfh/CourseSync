import CurrencyRepo from '../db/repositories/currency.repository.js'
import fetchCBR from '../clients/cbr.client.js';
import XMLparseToJson from '../utils/XMLParser.js';

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

    async currencyDynamic(date_1, date_2, currency_id) {
        const CBRdata = await fetchCBR.fetchCurrencyDynamic(date_1, date_2, currency_id);
        const jsonCBRdata = await XMLparseToJson(CBRdata);   
        const formatedCurrencyRecords = jsonCBRdata.ValCurs.Record.map((rate, index) => ({
            id: index,
            date: rate.$?.Date,
            value: rate.Value[0]
            }));
        const formatedResponse = {
            currency_info: jsonCBRdata.ValCurs.$,
            Records: formatedCurrencyRecords,
            source: "www.cbr.ru"
        }
        if (formatedResponse) { 
            console.log("Succesfull to get currency dynamic")
            return formatedResponse
        } else {
            console.log(formatedResponse)
            throw new Error(`Dynamic fetch failed`);
        } 
        
        return jsonCBRdata
    }

}

export default new CurrencyService;