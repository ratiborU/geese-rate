import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { CourseService } from "../../services/courseService";
// import CoursesWidget from "../../widgets/Courses/CoursesWidget/CoursesWidget";

import { CoupleService } from "../../services/coupleService";
// import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";
import CoursesRatingWidget from "../../widgets/Couples/CouplesRatingWidget/CouplesRatingWidget";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute.png'

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
    <div>
      {/* <UsersTable data={data} /> */}
      <TitleWidget
        title={`Пары`}
        description='Выберите нужную пару'
        image={image}
      />
      <CoursesRatingWidget data={data} />
    </div>
  );
};

export default CouplesPage;