import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import CouplesReviewWidget from '../../widgets/Couples/CouplesReviewWidget/CouplesReviewWidget';
import { useGetReviewsCoupleQuery } from '../../hooks/reviews/useGetReviesCouple';


const CoupleReviewPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetReviewsCoupleQuery(Number(id));

  if (isFetching || !data || !id) {
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