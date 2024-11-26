import { useQuery } from "@tanstack/react-query";
import EditCourseWidget from "../../widgets/Courses/EditCourseWidget/EditCourseWidget";
import { useParams } from "react-router-dom";
import { CourseService } from "../../services/courseService";

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
    <div>
      <EditCourseWidget data={data} />
    </div>
  );
};

export default EditCoursePage;