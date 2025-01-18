import { useQuery } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';

export const useGetOneCoupleQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await CoupleService.getOne(id),
    queryKey: ['couples', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};