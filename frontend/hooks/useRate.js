import { useQuery } from '@tanstack/react-query'
import { getRatesByCurrency } from '../src/shared/api/currency.api'

export function useRate(id) {
  return useQuery({
    queryKey: ['formatedRate', id],
    queryFn: () => getRatesByCurrency(id),
    staleTime: 1000 * 60 * 5,
  })
}