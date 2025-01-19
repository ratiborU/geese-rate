import EditCourseWidget from "../../widgets/Courses/EditCourseWidget/EditCourseWidget";
import { useParams } from "react-router-dom";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import { useGetOneCourseQuery } from "../../hooks/courses/useGetOneCourseQuery";

const EditCoursePage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetOneCourseQuery(Number(id));

  if (isFetching || !data) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <TitleWidget
        title={'Редактировать Предмет'}
        description={'Функции администратора'}
      />
      <EditCourseWidget data={data} />
    </>
  );
};

export default EditCoursePage;