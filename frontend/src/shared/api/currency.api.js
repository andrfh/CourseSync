import { apiFetch } from './http'
import { endpoints } from './endpoints'

export function getCurrencies() {
  return apiFetch(endpoints.list)
}

export function getRatesByCurrency(id) {
  return apiFetch(endpoints.byCurrency(id))
}

export function syncCurrencies() {
  return apiFetch(endpoints.sync)
}

export function getCurrencyDynamic(id, date_1, date_2) {
  let body = {
      date_1: date_1,
      date_2: date_2
  }
  
  return apiFetch(endpoints.dateRange(id), {
    method: 'POST', body: JSON.stringify(body)
  })
}