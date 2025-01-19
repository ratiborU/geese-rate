import { useQuery } from '@tanstack/react-query';
import { InstituteService } from '../../services/instituteService';

export const useGetInstitutesOptionsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const users = await InstituteService.getAll()
      return users.map(x => ({ value: x.id, text: x.name }));
    },
    queryKey: ['institutesOptions'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};