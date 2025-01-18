import { useQuery } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';

export const useGetOneReviewQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await ReviewService.getOne(id),
    queryKey: ['reviews', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};