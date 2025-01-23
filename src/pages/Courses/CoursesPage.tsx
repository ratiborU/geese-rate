// import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
// import { CourseService } from '../../services/courseService';
import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import { useGetOneInstituteQuery } from '../../hooks/institutes/useGetOneInstituteQuery';


const CoursesPage = () => {
  const { id } = useParams();
  const { data: institute } = useGetOneInstituteQuery(Number(id));

  return (
    <div>
      <TitleWidget
        title='Предметы'
        description={`Выберите необходимый вам предмет в ${institute?.name || ''}`}
        image={image}
      />
      <CoursesWidget />
    </div>
  );
};

export default CoursesPage;