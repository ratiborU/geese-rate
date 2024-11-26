import { z } from 'zod';
import styles from './createInstituteWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';

import { InstituteService } from '../../../services/instituteService';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  rating: z.string().min(1, "Это поле обязательно для заполнения")

})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateInstituteWidget = () => {
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: TCreateUserSchema) => {
    await InstituteService.create(data as unknown as TCreateUserSchema);
  }

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Создать институт</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          className={styles.input}
          type="text"
          placeholder='Название'
        />
        <input
          {...register('rating')}
          className={styles.input}
          type="text"
          placeholder='Рейтинг'
        />
        <button className={styles.button} type='submit'>Создать</button>
      </form>
    </div>
  );
};

export default CreateInstituteWidget;