import { useQuery } from '@tanstack/react-query';
import { CoupleService } from '../../services/coupleService';
import { ICoupleResponse } from '../../services/coupleService';


function sortFunction(a: ICoupleResponse, b: ICoupleResponse) {
  const ad = new Date(`${a.date}T${a.time}`);
  const bd = new Date(`${b.date}T${b.time}`);
  return bd.getTime() - ad.getTime();
}

export const useGetCouplesCourseQuery = (id: number) => {
  const { data, isFetching, error } = useQuery({
    queryFn: async () => {
      const couples = await CoupleService.getAll()
      const res = couples
        .filter(couples => Number(couples.course) == id)
        .sort(sortFunction);
      return res;
    },
    queryKey: ['couples', `course ${id}`],
    staleTime: Infinity,
  });

  return { data, isFetching, error };
};
