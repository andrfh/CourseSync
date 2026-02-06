import { useQuery } from '@tanstack/react-query'
import { getCurrencies } from '../src/shared/api/currency.api'

export function useCurrency() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    staleTime: 1000 * 60 * 5,
  })
}