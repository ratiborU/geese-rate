import { useParams } from "react-router-dom";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute.png'
import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";
import { useGetCouplesCourseQuery } from "../../hooks/couples/useGetCouplesCourse";


const CouplesPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCouplesCourseQuery(Number(id));

  if (isFetching || !data || !id) {
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