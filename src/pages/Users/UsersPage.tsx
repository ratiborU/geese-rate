import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/userService';
import UsersTable from '../../components/Tables/UsersTable/UsersTable';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import UsersWidget from '../../widgets/Users/UsersWidget/UsersWidget';

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
      <TitleWidget
        title='Пользователи'
        description='Выберите нужного пользователя для редактирвоания'
        image={image}
      />
      <UsersWidget data={data} />
      {/* <UsersTable data={data} /> */}
    </div>
  );
};

export default UsersPage;