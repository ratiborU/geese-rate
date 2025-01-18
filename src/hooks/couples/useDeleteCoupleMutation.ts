import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';

interface DeleteCoupleMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useDeleteCoupleMutation = (args: DeleteCoupleMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteCouple,
  } = useMutation({
    mutationFn: async (id: string) => await CoupleService.delete(Number(id)),
    onSuccess: () => {
      onSuccess();

      client.invalidateQueries({
        queryKey: ['couples'],
        refetchType: 'none'
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, deleteCouple };
};