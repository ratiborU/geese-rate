import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';
import { ICoupleResponse } from '../../services/coupleService';

interface UpdateCoupleMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useUpdateCoupleMutation = (args: UpdateCoupleMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateCouple,
  } = useMutation({
    mutationFn: async (data: ICoupleResponse) => await CoupleService.update(data.id, data),
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

  return { isPending, isError, updateCouple };
};