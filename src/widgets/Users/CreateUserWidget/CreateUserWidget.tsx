import { z } from 'zod';
import styles from './createUserWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserRequest, UserService } from '../../../services/userService';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const createUserSchema = z.object({
  first_name: z.string().min(1, "Это поле обязательно для заполнения"),
  last_name: z.string(),
  username: z.string().min(1, "Это поле обязательно для заполнения").max(20, 'Не более 20 символов'),
  email: z.string(),
  role: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string().min(1, "Это поле обязательно для заполнения"),

})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const CreateUserWidget = () => {
  const options = [
    { value: 'admin', text: 'Администратор' },
    { value: 'teacher', text: 'Преподаватель' }
  ]

  const notify = () => toast.success("Пользователь успешно создан");

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (data: TCreateUserSchema) => {
    await UserService.create(data as unknown as IUserRequest);
    notify();
  }

  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='ФИО'
          inputProps={{
            id: 'create-user-first_name',
            ...register('first_name'),
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
            ...register('role'),
            defaultValue: 'teacher'
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        limit={8}
      />
      <img className={styles.image} src={people} alt="" />
    </div>
  );
};

export default CreateUserWidget;