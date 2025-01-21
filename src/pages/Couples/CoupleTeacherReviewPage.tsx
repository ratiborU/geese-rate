import CouplesTeacherReviewWidget from '../../widgets/Couples/CouplesTeacherReview/CouplesTeacherReview';
import { useParams, useSearchParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute people.png'
import { useGetReviewsCoupleQuery } from '../../hooks/reviews/useGetReviesCouple';
import { useGetOneCourseQuery } from '../../hooks/courses/useGetOneCourseQuery';


const CoupleTeacherReviewPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data, isFetching, error } = useGetReviewsCoupleQuery(Number(id));

  const { data: course, isFetching: courseIsLoading, error: courseError } = useGetOneCourseQuery(Number(searchParams.get('course')));

  if (isFetching || courseIsLoading || !data || !course || !id) {
    return <>Загрузка...</>
  }

  if (error || courseError) {
    return <>{error?.message} {error?.message}</>
  }

  return (
    <>
      <TitleWidget
        title={course?.name}
        description={`Список студентов оставивших отзыв`}
        image={image}
      />
      <CouplesTeacherReviewWidget data={data} />
    </>
  );
};

export default CoupleTeacherReviewPage;