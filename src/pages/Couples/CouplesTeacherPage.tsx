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


  if (isLoading || !data || !id) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <>
      <TitleWidget
        title={`Пары`}
        description='Выберите нужную пару'
        image={image}
      />
      <CouplesTeacherWidget data={data} />
    </>
  );
};

export default CouplesTeacherPage;