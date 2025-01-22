import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QrService } from '../../services/qrService';
import { IQrRequest } from '../../services/qrService';

interface CreateQrMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useCreateQrMutation = (args: CreateQrMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createQr,
  } = useMutation({
    mutationFn: async (data: IQrRequest) => await QrService.create(data),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({
        queryKey: ['qr'],
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, createQr };
};