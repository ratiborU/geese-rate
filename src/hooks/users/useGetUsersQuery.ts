import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/userService';

export const useGetUsersQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await UserService.getAll(),
    queryKey: ['users'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};