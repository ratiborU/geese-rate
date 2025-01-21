import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InstituteService } from '../../services/instituteService';
import { IInstituteResponse } from '../../services/instituteService';

interface UpdateInstituteMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useUpdateInstituteMutation = (args: UpdateInstituteMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateInstitute,
  } = useMutation({
    mutationFn: async (data: IInstituteResponse) => await InstituteService.update(data.id, data),
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

  return { isPending, isError, updateInstitute };
};