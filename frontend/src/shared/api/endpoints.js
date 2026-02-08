export const endpoints = {
    list: '/api/ratesFormated',
    byCurrency: (id) => `/api/ratesFormated/${id}`,
    sync: '/api/sync',
    dateRange: (id) => `/api/currency/${id}/dynamic`
}