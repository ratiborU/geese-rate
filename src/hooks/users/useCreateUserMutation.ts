import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IUserRequest } from '../../services/userService.ts';
import { UserService } from '../../services/userService.ts';

interface CreateUserMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useCreateUserMutation = (args: CreateUserMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createUser,
  } = useMutation({
    mutationFn: async (data: IUserRequest) => await UserService.create(data),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({
        queryKey: ['users'],
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, createUser };
};