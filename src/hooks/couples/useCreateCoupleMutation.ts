import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';
import { ICoupleRequest } from '../../services/coupleService';

interface CreateCoupleMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useCreateCoupleMutation = (args: CreateCoupleMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createCouple,
  } = useMutation({
    mutationFn: async (data: ICoupleRequest) => await CoupleService.create(data),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({
        queryKey: ['couples'],
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, createCouple };
};