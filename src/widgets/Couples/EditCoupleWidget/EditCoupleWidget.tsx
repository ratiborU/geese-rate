// import React from 'react';
import { z } from 'zod';
import styles from './editCouplesWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
// import { IUserRequest, IUserResponse, UserService } from '../../services/userService';

// import { InstituteService } from '../../../services/instituteService';
import { ICourseResponse, CourseService } from '../../../services/courseService';

const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  institute: z.string().min(1, "Это поле обязательно для заполнения"),
  teacher: z.string().min(1, "Это поле обязательно для заполнения"),
  schedule: z.string().min(1, "Это поле обязательно для заполнения")
})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const EditCouplesWidget = (props: { data: ICourseResponse; }) => {
  const { data } = props;
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (formData: TCreateUserSchema) => {
    await CourseService.update(data.id, formData as unknown as TCreateUserSchema);
  }

  const onDelete = async () => {
    await CourseService.delete(Number(data.id));
  }

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Редактировать пару</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          className={styles.input}
          type="text"
          placeholder='Название'
          defaultValue={data.name}
        />
        <input
          {...register('teacher')}
          className={styles.input}
          type="text"
          placeholder='Преподаватель'
          defaultValue={data.teacher}
        />
        <input
          {...register('schedule')}
          className={styles.input}
          type="text"
          placeholder='Дата'
          defaultValue={data.schedule}
        />
        <input
          {...register('institute')}
          className={styles.input}
          type="text"
          placeholder='Статус'
          defaultValue={data.institute}
        />
        <div className={styles.buttons}>
          <button className={styles.button} type='submit'>Сохранить</button>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={onDelete}>Удалить</button>
        </div>
      </form>
    </div>
  );
};

export default EditCouplesWidget;