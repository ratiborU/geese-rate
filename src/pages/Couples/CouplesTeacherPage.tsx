import { useParams } from "react-router-dom";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute people.png'
import CouplesTeacherWidget from "../../widgets/Couples/CouplesTeacherWidget/CouplesTeacherWidget";
import { useGetCouplesCourseQuery } from "../../hooks/couples/useGetCouplesCourse";
import { useGetOneCourseQuery } from "../../hooks/courses/useGetOneCourseQuery";


const CouplesTeacherPage = () => {
  const { id } = useParams();

  const { data, isFetching, error } = useGetCouplesCourseQuery(Number(id));
  const { data: course, isFetching: courseIsLoading, error: courseError } = useGetOneCourseQuery(Number(id));

  if (isFetching || courseIsLoading || !data || !id || !course) {
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