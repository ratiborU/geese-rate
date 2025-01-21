import { useQuery } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';

export const useGetCoursesOptionsQuery = () => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      // добавить функционал для учителя
      // он должен видеть только те предметы
      // которые ведет он
      const users = await CourseService.getAll()
      return users.map(x => ({ value: x.id, text: x.name }));
    },
    queryKey: ['coursesOptions'],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};