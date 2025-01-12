import { useQuery } from "@tanstack/react-query";
import EditCourseWidget from "../../widgets/Courses/EditCourseWidget/EditCourseWidget";
import { useParams } from "react-router-dom";
import { CourseService } from "../../services/courseService";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";

const EditCoursePage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await CourseService.getOne(Number(id)),
    queryKey: ["course", id],
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
        title={'Редактировать Предмет'}
        description={'Функции администратора'}
      />
      <EditCourseWidget data={data} />
    </>
  );
};

export default EditCoursePage;