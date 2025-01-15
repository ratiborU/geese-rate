import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserResponse } from '../../services/userService.ts';
import { UserService } from '../../services/userService.ts';

interface UpdateUserMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useUpdateUserMutation = (args: UpdateUserMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateUser,
  } = useMutation({
    mutationFn: async (data: IUserResponse) => await UserService.update(data.id, data),
    onSuccess: () => {
      onSuccess();

      client.invalidateQueries({
        queryKey: ['users'],
        refetchType: 'none'
      });
      // client.setQueryData(['users', id], {})
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, updateUser };
};