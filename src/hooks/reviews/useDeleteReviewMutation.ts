import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';

interface DeleteReviewMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useDeleteReviewMutation = (args: DeleteReviewMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteReview,
  } = useMutation({
    mutationFn: async (id: string) => await ReviewService.delete(Number(id)),
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

  return { isPending, isError, deleteReview };
};