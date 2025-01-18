import { useQuery } from '@tanstack/react-query';
import { InstituteService } from '../../services/instituteService';

export const useGetOneUserQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await InstituteService.getOne(id),
    queryKey: ['institutes', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};