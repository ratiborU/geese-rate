import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/userService';

export const useGetOneUserQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await UserService.getOne(id),
    queryKey: ['users', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};