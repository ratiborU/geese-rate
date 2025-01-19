// import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
// import { CourseService } from '../../services/courseService';
import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
// import { InstituteService } from '../../services/instituteService';
import { useGetCoursesInstituteQuery } from '../../hooks/courses/useGetCoursesInstituteQuery';
import { useGetOneInstituteQuery } from '../../hooks/institutes/useGetOneInstituteQuery';


const CoursesPage = () => {
  const { id } = useParams();

  const { data, isFetching, error } = useGetCoursesInstituteQuery(id || '')
  const { data: institute, isFetching: instituteIsFetching, error: isntituteError } = useGetOneInstituteQuery(Number(id));

  if (isFetching || instituteIsFetching || !data) {
    return <>Загрузка...</>
  }

  if (error || isntituteError) {
    return <>{error?.message} {isntituteError?.message}</>
  }

  return (
    <div>
      <TitleWidget
        title='Предметы'
        description={`Выберите необходимый вам предмет в ${institute?.name || ''}`}
        image={image}
      />
      <CoursesWidget data={data} />
    </div>
  );
};

export default CoursesPage;