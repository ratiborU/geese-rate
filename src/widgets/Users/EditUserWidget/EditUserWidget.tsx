// import React from 'react';
import styles from './editUserWidget.module.css'
import { IUserResponse } from '../../../services/userService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../../services/userService';

const editUserSchema = z.object({
  // id: z.string(),
  first_name: z.string().min(1, "Это поле обязательно для заполнения"),
  last_name: z.string().min(1, "Это поле обязательно для заполнения"),
  username: z.string().min(1, "Это поле обязательно для заполнения").max(20, 'Не более 20 символов'),
  email: z.string().min(1, "Это поле обязательно для заполнения"),
  role: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string().min(1, "Это поле обязательно для заполнения"),

})

type TEditUserSchema = z.infer<typeof editUserSchema>;

const EditUserWidjet = (props: { data: IUserResponse; }) => {
  const { data } = props;
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TEditUserSchema>({ resolver: zodResolver(editUserSchema) });
  // const { register, handleSubmit, formState: { errors } } = useForm<TEditUserSchema>({ resolver: zodResolver(editUserSchema) });

  // const mutation = useMutation({
  //   mutationFn: async (data: IUserResponse) => {
  //     await UserService.update(data);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //     alert('Изменения сохранены');
  //   }
  // });

  const onSubmit = async (formData: TEditUserSchema) => {
    await UserService.update(data.id, formData as IUserResponse);
  }

  const onDelete = async () => {
    await UserService.delete(Number(data.id));
  }


  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Редактировать пользователя</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('first_name')}
          className={styles.input}
          type="text"
          placeholder='Имя'
          defaultValue={data.first_name}
        />
        <input
          {...register('last_name')}
          className={styles.input}
          type="text"
          placeholder='Фамилия'
          defaultValue={data.last_name}
        />
        <input
          {...register('username')}
          className={styles.input}
          type="text"
          placeholder='username'
          defaultValue={data.username}
        />
        <input
          {...register('email')}
          className={styles.input}
          type="text"
          placeholder='Логин'
          defaultValue={data.email}
        />
        <input
          {...register('password')}
          className={styles.input}
          type="text"
          placeholder='пароль'
          defaultValue={data.password}
        />
        <input
          {...register('role')}
          className={styles.input}
          type="text"
          placeholder='роль'
          defaultValue={data.role}
        />
        <div className={styles.buttons}>
          <button className={styles.button} type='submit'>Сохранить</button>
          <button className={`${styles.button} ${styles.deleteButton}`} onClick={onDelete}>Удалить</button>
        </div>
      </form>

    </div>
  );
};

export default EditUserWidjet;