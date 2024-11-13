import { z } from 'zod';
import styles from './createUserWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
import { IUserRequest, UserService } from '../../services/userService';


const createUserSchema = z.object({
  first_name: z.string().min(1, "Это поле обязательно для заполнения"),
  last_name: z.string().min(1, "Это поле обязательно для заполнения"),
  username: z.string().min(1, "Это поле обязательно для заполнения").max(20, 'Не более 20 символов'),
  email: z.string().min(1, "Это поле обязательно для заполнения"),
  role: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string().min(1, "Это поле обязательно для заполнения"),

})
// .refine(data => {
//   return data.role == 'student' || data.role == 'admin' || data.role == 'teacher';
// }, {
//   message: "Некорректный ввод роли",
//   path: ["role"]
// });

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateUserWidget = () => {
  // const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });
  // const { register, handleSubmit, formState: { errors } } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: TCreateUserSchema) => {
    await UserService.create(data as unknown as IUserRequest);
  }

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>Создать пользователя</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('first_name')}
          className={styles.input}
          type="text"
          placeholder='Имя'
        />
        <input
          {...register('last_name')}
          className={styles.input}
          type="text"
          placeholder='Фамилия'
        />
        <input
          {...register('username')}
          className={styles.input}
          type="text"
          placeholder='username'
        />
        <input
          {...register('email')}
          className={styles.input}
          type="text"
          placeholder='Логин'
        />
        <input
          {...register('password')}
          className={styles.input}
          type="text"
          placeholder='пароль'
        />
        <input
          {...register('role')}
          className={styles.input}
          type="text"
          placeholder='роль'
        />
        <button className={styles.button} type='submit'>Создать</button>
      </form>
    </div>
  );
};

export default CreateUserWidget;