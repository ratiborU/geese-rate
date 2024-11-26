// import React from 'react';
import { z } from 'zod';
import styles from './editInstituteWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import { IUserRequest, IUserResponse, UserService } from '../../services/userService';

import { IInstituteResponse, InstituteService } from '../../../services/instituteService';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  rating: z.string().min(1, "Это поле обязательно для заполнения")

})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const EditInstituteWidget = (props: { data: IInstituteResponse; }) => {
  const { data } = props;
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (formData: TCreateUserSchema) => {
    await InstituteService.update(data.id, formData as unknown as TCreateUserSchema);
  }

  const onDelete = async () => {
    await InstituteService.delete(data.id);
  }

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Редактировать институт</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          className={styles.input}
          type="text"
          placeholder='Название'
          defaultValue={data.name}
        />
        <input
          {...register('rating')}
          className={styles.input}
          type="text"
          placeholder='Рейтинг'
          defaultValue={data.rating}
        />
        <div className={styles.buttons}>
          <button className={styles.button} type='submit'>Сохранить</button>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={onDelete}>Удалить</button>
        </div>
      </form>
    </div>
  );
};

export default EditInstituteWidget;