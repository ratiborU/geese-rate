import { useQuery } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';

export const useGetReviewsCoupleQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const couples = await ReviewService.getAll()
      return couples.filter(review => Number(review.lesson) == id);
    },
    queryKey: ['reviews', `couple ${id}`],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};
