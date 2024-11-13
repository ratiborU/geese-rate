import { useQuery } from '@tanstack/react-query';
import { UserService } from '../services/userService';
import UsersTable from '../components/UsersTable/UsersTable';


const UsersPage = () => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await UserService.getAll(),
    queryKey: ["users"],
    // staleTime: Infinity,
  });

  if (isLoading || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <div>
      <UsersTable data={data} />
    </div>
  );
};

export default UsersPage;