import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { CourseService } from "../../services/courseService";
// import CoursesWidget from "../../widgets/Courses/CoursesWidget/CoursesWidget";

import { CoupleService } from "../../services/coupleService";
// import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute.png'
import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";

const CouplesPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const couples = await CoupleService.getAll()
      return couples.filter(couples => couples.course == id);
    },
    queryKey: ["couples", id],
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
      <CouplesWidget data={data} />
    </>
  );
};

export default CouplesPage;