import { useMutation } from '@tanstack/react-query';
import { AuthService } from '../services/authService.ts';

interface LogoutMutationArgs {
    onSuccess: () => void;
}

export const useLogoutMutation = (args: LogoutMutationArgs) => {
    const { onSuccess } = args;

    const {
        isPending,
        isError,
        error,
        mutateAsync: logout,
    } = useMutation({
        mutationFn: async () => await AuthService.logout(),
        onSuccess: () => {
            onSuccess();
        },
    });

    return { isPending, isError, logout, error };
};