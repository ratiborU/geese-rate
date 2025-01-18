import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';
import { ICourseResponse } from '../../services/courseService';

interface UpdateCourseMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useUpdateCourseMutation = (args: UpdateCourseMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: updateCourse,
  } = useMutation({
    mutationFn: async (data: ICourseResponse) => await CourseService.update(data.id, data),
    onSuccess: () => {
      onSuccess();

      client.invalidateQueries({
        queryKey: ['courses'],
        refetchType: 'none'
      });
    },
    onError: (error) => {
      onError(error);
    },
  });

  return { isPending, isError, updateCourse };
};