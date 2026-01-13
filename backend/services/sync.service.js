import SyncRepo from '../db/repositories/sync.repository.js'
import fetchDailyRates from '../clients/cbr.client.js';
import XMLparseToJson from '../utils/XMLParser.js';
import fetchCBR from '../clients/cbr.client.js';

class SyncService {
    async updateRatesFromCBR() {
        const CBRdata = await fetchCBR.fetchDailyRates();
        const jsonCBRdata = await XMLparseToJson(CBRdata);   
        const formattedCBRdata = jsonCBRdata.ValCurs.Valute.map((valute) => ({
            id: valute.$?.ID,
            charCode: valute.CharCode[0],
            name: valute.Name[0],
            nominal: Number(valute.Nominal[0]),
            source: 'www.cbr.ru',
            value: valute.Value[0].replace(',', '.'),
            date: result.ValCurs.$.Date,
            }));
            
        const updateCurrencies = await SyncRepo.updateNewCurrencies(formattedCBRdata)
        if (updateCurrencies) { 
            SyncRepo.syncWithCBR(formattedCBRdata)
            console.log("succesfull updated")
            return {msg: "succesfull updated"}
        } else {
            console.log(updateCurrencies)
            throw new Error(`DB writting failed`);
        }       
    }

}

export default new SyncService;