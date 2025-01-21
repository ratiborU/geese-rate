import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { IUserResponse } from '../../services/userService.ts';
import { UserService } from '../../services/userService.ts';

interface DeleteUserMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useDeleteUserMutation = (args: DeleteUserMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteUser,
  } = useMutation({
    mutationFn: async (id: string) => await UserService.delete(Number(id)),
    onSuccess: () => {
      onSuccess();

      client.invalidateQueries({
        queryKey: ['users'],
        refetchType: 'none'
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, deleteUser };
};