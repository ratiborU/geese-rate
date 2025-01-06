import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import CreateUserWidget from '../../widgets/Users/CreateUserWidget/CreateUserWidget';

const CreateUserPage = () => {
  return (
    <>
      <TitleWidget title={'Создать пользователя'} description={'Функции администратора'} />
      <CreateUserWidget />
    </>

  );
};

export default CreateUserPage;