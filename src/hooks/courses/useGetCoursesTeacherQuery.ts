import { useQuery } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';

export const useGetCoursesTeacherQuery = (id: string) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const courses = await CourseService.getAll();
      return courses.filter(course => course.teacher == id);
    },
    queryKey: ['courses', `teacher ${id}`],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};