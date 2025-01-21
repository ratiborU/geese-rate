import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/userService';

export const useGetUsersOptionsQuery = (role: string, id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      if (role == 'teacher') {
        const users = await UserService.getOne(id);
        return [{ value: users.id, text: users.first_name }];
      }
      const users = await UserService.getAll()
      return users.filter(x => x.role != 'admin').map(x => ({ value: x.id, text: x.first_name }));
    },
    queryKey: ['usersOptions', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};