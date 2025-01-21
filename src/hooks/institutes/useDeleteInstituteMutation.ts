import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InstituteService } from '../../services/instituteService';

interface DeleteInstituteMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useDeleteInstituteMutation = (args: DeleteInstituteMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteInstitute,
  } = useMutation({
    mutationFn: async (id: string) => await InstituteService.delete(Number(id)),
    onSuccess: () => {
      onSuccess();

      client.invalidateQueries({
        queryKey: ['institutes'],
        refetchType: 'none'
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, deleteInstitute };
};