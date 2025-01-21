import { useQuery } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';

export const useGetCoursesQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await CourseService.getAll(),
    queryKey: ['courses'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};