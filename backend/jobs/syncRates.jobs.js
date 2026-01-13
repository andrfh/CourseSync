import cron from 'node-cron'
import SyncService from '../services/sync.service.js'

export default function startSyncJob() {
  cron.schedule('0 18 * * *', async () => {
    try {
      await SyncService.updateRatesFromCBR(new Date())
      console.log('Succesfull to sync by CRON')
    } catch (err) {
      console.error('CRON sync failed:', err.message)
    }
  })
}
