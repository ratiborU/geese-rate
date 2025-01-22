import { useParams } from "react-router-dom";
import TitleWidget from "../../widgets/TitleWidget/TitleWidget";
import image from '../../assets/institute people.png'
import CouplesTeacherWidget from "../../widgets/Couples/CouplesTeacherWidget/CouplesTeacherWidget";
import { useGetOneCourseQuery } from "../../hooks/courses/useGetOneCourseQuery";


const CouplesTeacherPage = () => {
  const { id } = useParams();
  const { data: course } = useGetOneCourseQuery(Number(id));
  return (
    <>
      <TitleWidget
        title={`${course?.name || 'Предмет'}`}
        description='Выберите нужную пару'
        image={image}
      />
      <CouplesTeacherWidget />
    </>
  );
};

export default CouplesTeacherPage;