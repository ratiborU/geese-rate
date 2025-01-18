import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';
import { ICourseRequest } from '../../services/courseService';

interface CreateCourseMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useCreateCourseMutation = (args: CreateCourseMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: createCourse,
  } = useMutation({
    mutationFn: async (data: ICourseRequest) => await CourseService.create(data),
    onSuccess: () => {
      onSuccess();
      client.invalidateQueries({
        queryKey: ['courses'],
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, createCourse };
};