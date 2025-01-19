import { useQuery } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';

export const useGetCoursesInstituteQuery = (id: string) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const courses = await CourseService.getAll();
      return courses.filter(course => course.institute == id);
    },
    queryKey: ['courses', `institute ${id}`],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};