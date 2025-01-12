import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { CourseService } from "../../services/courseService";
// import CoursesWidget from "../../widgets/Courses/CoursesWidget/CoursesWidget";

import { CoupleService } from "../../services/coupleService";
// import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute people.png'
// import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";
import CouplesTeacherWidget from "../../widgets/Couples/CouplesTeacherWidget/CouplesTeacherWidget";
import { CourseService } from "../../services/courseService";

const CouplesTeacherPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const couples = await CoupleService.getAll()
      return couples.filter(couple => couple.course == id);
    },
    queryKey: ["couplesTeacher", id],
    // staleTime: Infinity,
  });

  const { data: course, isLoading: courseIsLoading, error: courseError } = useQuery({
    queryFn: async () => {
      const couples = await CourseService.getOne(Number(id))
      return couples;
    },
    queryKey: ["courseTeacher", id],
    // staleTime: Infinity,
  });


  if (isLoading || courseIsLoading || !data || !id || !course) {
    return <>Загрузка...</>
  }

  if (error || courseError) {
    return <>{error?.message} {courseError?.message}</>
  }

  return (
    <>
      <TitleWidget
        title={`${course.name}`}
        description='Выберите нужную пару'
        image={image}
      />
      <CouplesTeacherWidget data={data} />
    </>
  );
};

export default CouplesTeacherPage;