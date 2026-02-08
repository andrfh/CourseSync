import { useQuery } from '@tanstack/react-query';
import { getCurrencyDynamic } from '../src/shared/api/currency.api';

export const useDynamic = (id, date_1, date_2) => {
  return useQuery({
    queryKey: ['currencyDynamic', id, date_1, date_2],
    queryFn: () => getCurrencyDynamic(id, date_1, date_2),
    enabled: !!id && !!date_1 && !!date_2
  });
};