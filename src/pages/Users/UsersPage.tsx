import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import UsersWidget from '../../widgets/Users/UsersWidget/UsersWidget';
import { useGetUsersQuery } from '../../hooks/users/useGetUsersQuery';

const UsersPage = () => {
  const { data, isFetching, error } = useGetUsersQuery();

  if (isFetching || !data) {
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
    </div>
  );
};

export default UsersPage;