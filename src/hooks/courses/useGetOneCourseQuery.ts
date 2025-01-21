import { useQuery } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';

export const useGetOneCourseQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => await CourseService.getOne(id),
    queryKey: ['courses', id],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};