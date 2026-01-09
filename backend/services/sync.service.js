import SyncRepo from '../db/repositories/sync.repository.js'
import fetchDailyRates from '../clients/cbr.client.js';
import XMLparseToJson from '../utils/XMLParser.js';

class SyncService {
    async updateRatesFromCBR() {
        const CBRdata = await fetchDailyRates();
        const formattedCBRdata = await XMLparseToJson(CBRdata);   
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