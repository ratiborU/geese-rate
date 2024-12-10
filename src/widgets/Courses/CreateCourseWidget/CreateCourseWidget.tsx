import { z } from 'zod';
import styles from './createCourseWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';

// import { InstituteService } from '../../../services/instituteService';
import { CourseService } from '../../../services/courseService';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  institute: z.string().min(1, "Это поле обязательно для заполнения"),
  teacher: z.string().min(1, "Это поле обязательно для заполнения"),
  schedule: z.string().min(1, "Это поле обязательно для заполнения")
})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateCourseWidget = () => {
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: TCreateUserSchema) => {
    await CourseService.create(data as unknown as TCreateUserSchema);
  }

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Создать предмет</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          className={styles.input}
          type="text"
          placeholder='Название'
        />
        <input
          {...register('institute')}
          className={styles.input}
          type="text"
          placeholder='Институт'
        />
        <input
          {...register('teacher')}
          className={styles.input}
          type="text"
          placeholder='Преподаватель'
        />
        <input
          {...register('schedule')}
          className={styles.input}
          type="text"
          placeholder='Расписание'
        />
        <button className={styles.button} type='submit'>Создать</button>
      </form>
    </div>
  );
};

export default CreateCourseWidget;