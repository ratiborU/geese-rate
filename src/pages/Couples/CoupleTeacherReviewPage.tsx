import CouplesTeacherReviewWidget from '../../widgets/Couples/CouplesTeacherReview/CouplesTeacherReview';
import { useSearchParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute people.png'
import { useGetOneCourseQuery } from '../../hooks/courses/useGetOneCourseQuery';


const CoupleTeacherReviewPage = () => {
  const [searchParams] = useSearchParams();
  const { data: course } = useGetOneCourseQuery(Number(searchParams.get('course')));

  return (
    <>
      <TitleWidget
        title={course?.name || 'Предмет'}
        description={`Список студентов оставивших отзыв`}
        image={image}
      />
      <CouplesTeacherReviewWidget />
    </>
  );
};

export default CoupleTeacherReviewPage;