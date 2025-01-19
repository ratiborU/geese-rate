import { LocalStorageService } from "../lib/helpers/localStorageService";
import { IUserResponse } from "../services/userService";
import TitleWidget from "../widgets/TitleWidget/TitleWidget";
import image from '../assets/institute people.png'
import TeacherWidget from "../widgets/Teacher/TeacherWidget/TeacherWidget";
import { useGetCoursesTeacherQuery } from "../hooks/courses/useGetCoursesTeacherQuery";


const TeacherPage = () => {
  const teacher: IUserResponse = LocalStorageService.get('user')!;
  const { data: coursesData, isFetching: coursesIsLoading, error: coursesError } = useGetCoursesTeacherQuery(teacher.id);

  // не красиво
  if (coursesIsLoading || !coursesData) {
    return <>Загрузка...</>
  }

  if (coursesError) {
    return <>{coursesError.message}</>
  }

  return (
    <div>
      <TitleWidget
        title='Student Voice'
        description={`Добро пожаловать, ${teacher.first_name}`}
        image={image}
      />
      <TeacherWidget data={coursesData} />
    </div>
  );
};

export default TeacherPage;