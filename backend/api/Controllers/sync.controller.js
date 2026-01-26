import SyncService from "../../services/sync.service.js";

class RatesController {
    async syncWithCBR (req, res) {
        try{
            const data = await SyncService.updateRatesFromCBR()
            res.json(data)
        } catch (e) {
            return res.status(e.status || 500).json({ error: e.message || 'Internal Server Error' });
        }
    }
}

export default new RatesController