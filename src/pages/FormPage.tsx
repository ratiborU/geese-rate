import FormWidget from '../widgets/FormWidget/FormWidget';
import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { CourseService } from '../services/courseService';

const FormPage = () => {
  const { id } = useParams();
  // const { data, isLoading, error } = useQuery({
  //   queryFn: async () => await CourseService.getOne(Number(id)),
  //   queryKey: ["course", id],
  //   // staleTime: Infinity,
  // });

  // if (isLoading || !data || !id) {
  //   return <>Загрузка...</>
  // }

  if (!id) {
    return <>Произошла ошибка</>
  }

  return (
    <FormWidget id={id} />
  );
};

export default FormPage;