import EditUserWidjet from '../../widgets/Users/EditUserWidget/EditUserWidget';
import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/userService';
import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';

const EditUserPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await UserService.getOne(Number(id)),
    queryKey: ["user", id],
    staleTime: Infinity,
  });

  if (isLoading || !data) {
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