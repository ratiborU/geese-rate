import { z } from 'zod';
import styles from './createUserWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// import { useQueryClient } from '@tanstack/react-query';
import { IUserRequest, UserService } from '../../../services/userService';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';


const createUserSchema = z.object({
  first_name: z.string().min(1, "Это поле обязательно для заполнения"),
  last_name: z.string(),
  username: z.string().min(1, "Это поле обязательно для заполнения").max(20, 'Не более 20 символов'),
  email: z.string(),
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
  const options = [
    { value: 'admin', text: 'Администратор' },
    { value: 'teacher', text: 'Преподаватель' }
  ]

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: TCreateUserSchema) => {
    await UserService.create(data as unknown as IUserRequest);
  }

  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='ФИО'
          inputProps={{
            id: 'create-user-first_name',
            ...register('first_name'),
            // className: styles.input,
            type: "text",
            placeholder: 'Введите ФИО...',
            autoComplete: "new-password"
          }}
        />

        <Input
          label='Логин'
          inputProps={{
            id: 'create-user-username',
            ...register('username'),
            // className: styles.input,
            type: "text",
            placeholder: 'Введите логин...',
            autoComplete: "new-password"
          }}
        />

        <Input
          label='Пароль'
          inputProps={{
            id: 'create-user-password',
            ...register('password'),
            // className: styles.input,
            type: "password",
            placeholder: 'Введите пароль...',
            autoComplete: "new-password"
          }}
        />
        <input value={'lastname'} className={styles.inputNone} type="text" {...register('last_name')} />
        <input value={'no@mail.ru'} className={styles.inputNone} type="text" {...register('email')} />
        <SelectInput
          label='Роль'
          selectProps={{
            ...register('role')
          }}
          options={options}
        />

        <Button
          text='Создать'
          width={320}
          buttonProps={{
            type: 'submit'
          }}
        />
      </form>
      <img className={styles.image} src={people} alt="" />
    </div>
  );
};

export default CreateUserWidget;