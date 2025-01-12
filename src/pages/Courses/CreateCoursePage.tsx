import CreateCourseWidget from "../../widgets/Courses/CreateCourseWidget/CreateCourseWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";

const CreateCoursePage = () => {
  return (
    <>
      <TitleWidget
        title={'Создать Предмет'}
        description={'Функции администратора'}
      />
      <CreateCourseWidget />
    </>
  );
};

export default CreateCoursePage;