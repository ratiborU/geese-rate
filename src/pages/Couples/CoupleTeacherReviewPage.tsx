// import React from 'react';
import CouplesTeacherReviewWidget from '../../widgets/Couples/CouplesTeacherReview/CouplesTeacherReview';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { CoupleService } from '../../services/coupleService';
import { ReviewService } from '../../services/reviewsService';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute people.png'
import { CourseService } from '../../services/courseService';


const CoupleTeacherReviewPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const couples = await ReviewService.getAll()
      return couples.filter(review => review.lesson == id);
    },
    queryKey: ["reviewsByLesson", id],
    // staleTime: Infinity,
  });

  const { data: course, isLoading: courseIsLoading, error: courseError } = useQuery({
    queryFn: async () => {
      const couples = await CourseService.getOne(Number(searchParams.get('course')))
      return couples;
    },
    queryKey: ["course", searchParams.get('course')],
    // staleTime: Infinity,
  });

  if (isLoading || courseIsLoading || !data || !course || !id) {
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