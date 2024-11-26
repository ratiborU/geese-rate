import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
import { CourseService } from '../../services/courseService';
import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';


const CoursesPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => await CourseService.getAll(),
    queryKey: ["courses"],
    // staleTime: Infinity,
  });

  if (isLoading || !data || !id) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <div>
      {/* <UsersTable data={data} /> */}
      <CoursesWidget id={id} data={data} />
    </div>
  );
};

export default CoursesPage;