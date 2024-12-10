import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
import { CourseService } from '../../services/courseService';
// import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';
import CoursesTeacherWidget from '../../widgets/Courses/CoursesTeacherWidget/CoursesTeacherWidget';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
import { UserService } from '../../services/userService';


const CoursesTeacherPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryFn: async () => {
      const courses = await CourseService.getAll()
      return courses.filter(course => course.teacher == id);
    },
    queryKey: ["coursesTeacher", id],
    // staleTime: Infinity,
  });

  const { data: teacher, isLoading: isLoadingTeacher } = useQuery({
    queryFn: async () => {
      const teacher = await UserService.getOne(Number(id))
      console.log(teacher);
      return teacher;
    },
    queryKey: ["user", id],
    // staleTime: Infinity,
  });

  if (isLoading || isLoadingTeacher || !data || !id) {
    return <>Загрузка...</>
  }

  if (error) {
    return <>{error.message}</>
  }

  return (
    <div>
      {/* <UsersTable data={data} /> */}
      <TitleWidget title={`Предметы ${teacher?.first_name} ${teacher?.last_name}`} description='' />
      <CoursesTeacherWidget data={data} />
    </div>
  );
};

export default CoursesTeacherPage;