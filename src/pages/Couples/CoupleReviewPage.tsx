import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import CouplesReviewWidget from '../../widgets/Couples/CouplesReviewWidget/CouplesReviewWidget';


const CoupleReviewPage = () => {

  return (
    <>
      <TitleWidget
        title='Отзывы'
        description={`Список студентов оставивших отзыв`}
        image={image}
      />
      <CouplesReviewWidget />
    </>
  );
};

export default CoupleReviewPage;