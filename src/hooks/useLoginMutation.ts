import { useMutation } from '@tanstack/react-query';
import { AuthService, IAuthRequest } from '../services/authService.ts';

interface LoginMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useLoginMutation = (args: LoginMutationArgs) => {
  const { onSuccess, onError } = args;

  const {
    isPending,
    isError,
    error,
    mutateAsync: login,
  } = useMutation({
    mutationFn: async (data: IAuthRequest) => await AuthService.login(data),
    onSuccess: () => {
      onSuccess();
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, login, error };
};