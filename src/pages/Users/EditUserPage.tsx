import EditUserWidjet from '../../widgets/Users/EditUserWidget/EditUserWidget';
// import { useQuery } from '@tanstack/react-query';
// import { UserService } from '../../services/userService';
import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import { useGetOneUserQuery } from '../../hooks/users/useGetOneUserQuery';

const EditUserPage = () => {
  const { id } = useParams();
  // при пустой строке id вернет user id 0
  const { data, isFetching, error } = useGetOneUserQuery(Number(id));

  if (isFetching || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <TitleWidget
        title={'Редактировать пользователя'}
        description={'Функции администратора'}
      />
      <EditUserWidjet data={data} />
    </>

  );
};

export default EditUserPage;