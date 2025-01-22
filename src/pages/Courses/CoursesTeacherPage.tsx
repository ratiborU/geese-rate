import { useParams } from 'react-router-dom';
import CoursesTeacherWidget from '../../widgets/Courses/CoursesTeacherWidget/CoursesTeacherWidget';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import { useGetOneUserQuery } from '../../hooks/users/useGetOneUserQuery';


const CoursesTeacherPage = () => {
  const { id } = useParams();
  const { data: teacher } = useGetOneUserQuery(Number(id));

  return (
    <div>
      <TitleWidget
        title='Предметы'
        description={`Предметы преподавателя: ${teacher?.first_name || ''}`}
        image={image}
      />
      <CoursesTeacherWidget />
    </div>
  );
};

export default CoursesTeacherPage;