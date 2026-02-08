import { useMutation, useQueryClient } from '@tanstack/react-query'
import { syncCurrencies } from '../src/shared/api/currency.api'

export const useSync = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: syncCurrencies,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currencies'] })
    }
  })
}