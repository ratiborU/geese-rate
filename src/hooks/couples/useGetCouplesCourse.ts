import { useQuery } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';

export const useGetCouplesCourseQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const couples = await CoupleService.getAll()
      return couples.filter(couples => Number(couples.course) == id);
    },
    queryKey: ['couples', `course ${id}`],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};
