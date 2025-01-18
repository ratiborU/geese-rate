import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';
import { IReviewRequest } from '../../services/reviewsService';

interface CreateReviewMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useCreateReviewMutation = (args: CreateReviewMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createReview,
  } = useMutation({
    mutationFn: async (data: IReviewRequest) => await ReviewService.create(data),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({
        queryKey: ['reviews'],
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, createReview };
};