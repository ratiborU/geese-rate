import CreateInstituteWidget from '../../widgets/Institutes/CreateInstituteWidget/CreateInstituteWidget';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';

const CreateIstitutePage = () => {
  return (
    <>
      <TitleWidget
        title={'Создать Институт'}
        description={'Функции администратора'}
      />
      <CreateInstituteWidget />
    </>

  );
};

export default CreateIstitutePage;