import { useMutation } from '@tanstack/react-query';
import { AuthService, IAuthRequest } from '../services/authService.ts';

interface LoginMutationArgs {
    onSuccess: () => void;
}

export const useLoginMutation = (args: LoginMutationArgs) => {
    const { onSuccess } = args;

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
    });

    return { isPending, isError, login, error };
};