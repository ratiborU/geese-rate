// import { useParams } from "react-router-dom";
// import CoursesWidget from "../widgets/Courses/CoursesWidget/CoursesWidget";
import { useQuery } from "@tanstack/react-query";
import { CourseService } from "../services/courseService";
import { LocalStorageService } from "../lib/helpers/localStorageService";
import { IUserResponse } from "../services/userService";
import CouplesWidget from "../widgets/Couples/CouplesWidget/CouplesWidget";
import { CoupleService } from "../services/coupleService";
import TitleWidget from "../widgets/TitleWidget/TitleWidget";
import image from '../assets/institute people.png'
import CoursesTeacherWidget from "../widgets/Courses/CoursesTeacherWidget/CoursesTeacherWidget";

// import CoursesWidget from "../widgets/Courses/CoursesWidget/CoursesWidget";

const TeacherPage = () => {
  const teacher: IUserResponse = LocalStorageService.get('user')!;
  const { data: coursesData, isLoading: coursesIsLoading, error: coursesError } = useQuery({
    queryFn: async () => {
      const courses = await CourseService.getAll()
      return courses.filter(course => course.teacher == teacher.id);
    },
    queryKey: ["coursesTeacher", teacher.id],
    // staleTime: Infinity,
  });

  const { data: couplesData, isLoading: couplesIsLoading, error: couplesError } = useQuery({
    queryFn: async () => {
      const couples = await CoupleService.getAll()
      return couples.filter(couples => couples.teacher == teacher.id);
    },
    queryKey: ["couples", teacher.id],
    // staleTime: Infinity,
  });

  // не красиво
  if (coursesIsLoading || couplesIsLoading || !coursesData || !couplesData) {
    return <>Загрузка...</>
  }

  if (coursesError) {
    return <>{coursesError.message}</>
  }
  if (couplesError) {
    return <>{couplesError.message}</>
  }

  return (
    <div>
      {/* Страница преподавателя */}
      {/* <CoursesWidget data={coursesData} /> */}
      <TitleWidget
        title='Student Voice'
        description={`Добро пожаловать, ${teacher.first_name}`}
        image={image}
      />
      <CoursesTeacherWidget data={coursesData} />
      {/* <CouplesWidget data={couplesData} /> */}

    </div>
  );
};

export default TeacherPage;