// import React from 'react';
import CouplesTeacherReviewWidget from '../../widgets/Couples/CouplesTeacherReview/CouplesTeacherReview';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// import { CoupleService } from '../../services/coupleService';
import { ReviewService } from '../../services/reviewsService';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute people.png'


const CoupleTeacherReviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const couples = await ReviewService.getAll()
      return couples.filter(review => review.lesson == id);
    },
    queryKey: ["reviewsByLesson", id],
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
        title='Отзывы'
        description={`Список студентов оставивших отзыв`}
        image={image}
      />
      <CouplesTeacherReviewWidget data={data} />
    </>
  );
};

export default CoupleTeacherReviewPage;