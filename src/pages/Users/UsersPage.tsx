import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import UsersWidget from '../../widgets/Users/UsersWidget/UsersWidget';

const UsersPage = () => {
  return (
    <div>
      <TitleWidget
        title='Пользователи'
        description='Выберите нужного пользователя для редактирвоания'
        image={image}
      />
      <UsersWidget />
    </div>
  );
};

export default UsersPage;