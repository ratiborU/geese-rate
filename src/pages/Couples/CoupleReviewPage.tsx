import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ReviewService } from '../../services/reviewsService';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import CouplesReviewWidget from '../../widgets/Couples/CouplesReviewWidget/CouplesReviewWidget';


const CoupleReviewPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const couples = await ReviewService.getAll()
      return couples.filter(review => review.lesson == id);
    },
    queryKey: ["reviewsByLesson", id],
    // staleTime: Infinity,
  });
  console.log(data);

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
      <CouplesReviewWidget data={data} />
    </>
  );
};

export default CoupleReviewPage;