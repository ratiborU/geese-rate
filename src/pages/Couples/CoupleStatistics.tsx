import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
// import image from '../../assets/institute.png'
// import CouplesWidget from "../../widgets/Couples/CouplesWidget/CouplesWidget";
import CoupleStatistics from "../../widgets/Couples/CoupleStatistics/CoupleStatistics";
import { useSearchParams } from "react-router-dom";
import { useGetOneCourseQuery } from "../../hooks/courses/useGetOneCourseQuery";


const CoupleStatisticsPage = () => {
  const [searchParams] = useSearchParams();
  const { data } = useGetOneCourseQuery(Number(searchParams.get('course')))
  return (
    <>
      <TitleWidget
        title={`Статистика пары`}
        description={`Метрики предмета ${data?.name || ''}`}
      // image={image}
      />
      <CoupleStatistics />
      {/* <CouplesWidget /> */}
    </>
  );
};

export default CoupleStatisticsPage;