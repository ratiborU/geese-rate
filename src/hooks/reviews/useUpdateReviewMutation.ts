import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';
import { IReviewResponse } from '../../services/reviewsService';

interface UpdateReviewMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useUpdateReviewMutation = (args: UpdateReviewMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateReview,
  } = useMutation({
    mutationFn: async (data: IReviewResponse) => await ReviewService.update(data.id, data),
    onSuccess: () => {
      onSuccess();

      client.invalidateQueries({
        queryKey: ['reviews'],
        refetchType: 'none'
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, updateReview };
};