// import { useQuery } from '@tanstack/react-query';
// import UsersTable from '../components/UsersTable/UsersTable';
// import { CourseService } from '../../services/courseService';
// import CoursesWidget from '../../widgets/Courses/CoursesWidget/CoursesWidget';
import { useParams } from 'react-router-dom';
import CoursesTeacherWidget from '../../widgets/Courses/CoursesTeacherWidget/CoursesTeacherWidget';
import TitleWidget from '../../widgets/TitleWidget/TitleWidget';
// import { UserService } from '../../services/userService';
import image from '../../assets/institute.png'
import { useGetOneUserQuery } from '../../hooks/users/useGetOneUserQuery';
// import { useGetCoursesInstituteQuery } from '../../hooks/courses/useGetCoursesInstituteQuery';
import { useGetCoursesTeacherQuery } from '../../hooks/courses/useGetCoursesTeacherQuery';


const CoursesTeacherPage = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetCoursesTeacherQuery(id || '')
  const { data: teacher, isFetching: isLoadingTeacher, error: isntituteError } = useGetOneUserQuery(Number(id));

  if (isFetching || isLoadingTeacher || !data || !id) {
    return <>Загрузка...</>
  }

  if (error || isntituteError) {
    return <>{error?.message} {isntituteError?.message}</>
  }

  return (
    <div>
      {/* <UsersTable data={data} /> */}
      <TitleWidget
        title='Предметы'
        description={`Предметы преподавателя: ${teacher?.first_name}`}
        image={image}
      />
      {/* <TitleWidget title={`Предметы ${teacher?.first_name} ${teacher?.last_name}`} description='' /> */}
      <CoursesTeacherWidget data={data} />
    </div>
  );
};

export default CoursesTeacherPage;