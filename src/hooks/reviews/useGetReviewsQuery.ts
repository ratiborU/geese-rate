import { useQuery } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';

export const useGetReviewsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await ReviewService.getAll(),
    queryKey: ['reviews'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};