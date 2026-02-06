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

export function currencyDynamic() {
  return apiFetch(endpoints.dateRange(id), {
    method: 'POST',
  })
}