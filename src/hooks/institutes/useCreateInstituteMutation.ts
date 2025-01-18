import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InstituteService } from '../../services/instituteService';
import { IInstituteRequest } from '../../services/instituteService';

interface CreateInstituteMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useCreateInstituteMutation = (args: CreateInstituteMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createInstitute,
  } = useMutation({
    mutationFn: async (data: IInstituteRequest) => await InstituteService.create(data),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({
        queryKey: ['institutes'],
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, createInstitute };
};