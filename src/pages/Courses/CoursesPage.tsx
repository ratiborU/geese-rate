import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
import { CourseService } from '../../services/courseService';
import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'


const CoursesPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const courses = await CourseService.getAll()
      return courses.filter(course => course.institute == id);
    },
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
      <TitleWidget
        title='Предметы'
        description='Выберите необходимый вам предмет'
        image={image}
      />
      {/* <TitleWidget title='Предметы' description='Выберите нужный предмет' /> */}
      <CoursesWidget data={data} />
    </div>
  );
};

export default CoursesPage;