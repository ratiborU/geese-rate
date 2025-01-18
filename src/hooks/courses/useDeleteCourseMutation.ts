import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CourseService } from '../../services/courseService';

interface DeleteCourseMutationArgs {
  onSuccess: () => void;
  onError: (error: Error) => void;
}

export const useDeleteCourseMutation = (args: DeleteCourseMutationArgs) => {
  const { onSuccess, onError } = args;
  const client = useQueryClient();

  const {
    isPending,
    isError,
    mutateAsync: deleteCourse,
  } = useMutation({
    mutationFn: async (id: string) => await CourseService.delete(Number(id)),
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

  return { isPending, isError, deleteCourse };
};