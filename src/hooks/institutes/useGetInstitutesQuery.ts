import { useQuery } from '@tanstack/react-query';
import { InstituteService } from '../../services/instituteService';

export const useGetInstitutesQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await InstituteService.getAll(),
    queryKey: ['institutes'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};