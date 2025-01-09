import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
import { CourseService } from '../../services/courseService';
import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import image from '../../assets/institute.png'
import { InstituteService } from '../../services/instituteService';


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

  const { data: institute, isLoading: instituteIsLoading, error: isntituteError } = useQuery({
    queryFn: async () => {
      const courses = await InstituteService.getOne(Number(id))
      return courses;
    },
    queryKey: ["institute", id],
    // staleTime: Infinity,
  });

  if (isLoading || instituteIsLoading || !data || !id || !institute) {
    return <>Загрузка...</>
  }

  if (error || isntituteError) {
    return <>{error?.message} {isntituteError?.message}</>
  }

  return (
    <div>
      <TitleWidget
        title='Предметы'
        description={`Выберите необходимый вам предмет в ${institute.name}`}
        image={image}
      />
      <CoursesWidget data={data} />
    </div>
  );
};

export default CoursesPage;