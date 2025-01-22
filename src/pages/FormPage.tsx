import FormWidget from '../widgets/FormWidget/FormWidget';
import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { CourseService } from '../services/courseService';

const FormPage = () => {
  const { id } = useParams();

  return (
    <FormWidget id={id || '0'} />
  );
};

export default FormPage;