import styles from './editUserWidget.module.css'
import { IUserResponse } from '../../../services/userService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { UserService } from '../../../services/userService';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateUserMutation } from '../../../hooks/users/useUpdateUserMutation';
import { useDeleteUserMutation } from '../../../hooks/users/useDeleteUserMutation';

const editUserSchema = z.object({
  first_name: z.string().min(1, "Это поле обязательно для заполнения"),
  last_name: z.string(),
  username: z.string().min(1, "Это поле обязательно для заполнения").max(20, 'Не более 20 символов'),
  email: z.string(),
  role: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string(),

})

type TEditUserSchema = z.infer<typeof editUserSchema>;

const EditUserWidjet = (props: { data: IUserResponse; }) => {
  const { data } = props;
  const options = [
    { value: 'admin', text: 'Администратор' },
    { value: 'teacher', text: 'Преподаватель' }
  ]

  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit } = useForm<TEditUserSchema>({ resolver: zodResolver(editUserSchema) });

  const onSubmit = async (formData: TEditUserSchema) => {
    if (formData.password == '') {
      await updateUser({
        id: data.id,
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: formData.role
      } as IUserResponse);
    } else {
      await updateUser({ ...formData, id: data.id } as IUserResponse);
    }
  }

  const onDelete = async () => {
    await deleteUser(data.id);
  }

  const onSuccess = () => {
    notify("Пользователь успешно изменен!");
  }

  const onSuccessDelete = () => {
    notify("Пользователь успешно удален!");
  }

  const onError = (error: Error) => {
    notifyError(error.message);
  }


  const { isPending, updateUser } = useUpdateUserMutation({ onSuccess, onError })
  const { isPending: isPendingDelete, deleteUser } = useDeleteUserMutation({ onSuccess: onSuccessDelete, onError })

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
            autoComplete: "new-password",
            defaultValue: data.first_name
          }}
        />

        <Input
          label='Логин'
          inputProps={{
            id: 'create-user-username',
            ...register('username'),
            type: "text",
            placeholder: 'Введите логин...',
            autoComplete: "new-password",
            defaultValue: data.username
          }}
        />

        <Input
          label='Пароль'
          inputProps={{
            id: 'create-user-password',
            ...register('password'),
            type: "password",
            placeholder: 'Введите пароль...',
            autoComplete: "new-password",
            defaultValue: data.password
          }}
        />
        <input value={'lastname'} className={styles.inputNone} type="text" {...register('last_name')} />
        <input value={'no@mail.ru'} className={styles.inputNone} type="text" {...register('email')} />

        <SelectInput
          label='Роль'
          selectProps={{
            ...register('role'),
            defaultValue: data.role
          }}
          options={options}
        />


        <div className={styles.buttons}>
          <Button
            text='Сохранить'
            width={240}
            isPending={isPending}
            buttonProps={{
              type: 'submit'
            }}
          />
          <Button
            text='Удалить'
            width={240}
            isPending={isPendingDelete}
            buttonProps={{
              type: 'button',
              onClick: onDelete
            }}
          />
        </div>
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

export default EditUserWidjet;