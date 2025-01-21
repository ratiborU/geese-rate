import { useQuery } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';

export const useGetCouplesQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await CoupleService.getAll(),
    queryKey: ['couples'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};