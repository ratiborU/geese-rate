import styles from './editUserWidget.module.css'
import { IUserResponse } from '../../../services/userService';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { UserService } from '../../../services/userService';
import Input from '../../../components/UI/Inputs/Input/Input';
import SelectInput from '../../../components/UI/Inputs/SelectInput/SelectInput';
import Button from '../../../components/UI/Button/Button';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'

const editUserSchema = z.object({
  first_name: z.string().min(1, "Это поле обязательно для заполнения"),
  last_name: z.string(),
  username: z.string().min(1, "Это поле обязательно для заполнения").max(20, 'Не более 20 символов'),
  email: z.string(),
  role: z.string().min(1, "Это поле обязательно для заполнения"),
  password: z.string().min(1, "Это поле обязательно для заполнения"),

})

type TEditUserSchema = z.infer<typeof editUserSchema>;

const EditUserWidjet = (props: { data: IUserResponse; }) => {
  const { data } = props;
  const options = [
    { value: 'admin', text: 'Администратор' },
    { value: 'teacher', text: 'Преподаватель' }
  ]

  const { register, handleSubmit } = useForm<TEditUserSchema>({ resolver: zodResolver(editUserSchema) });

  const onSubmit = async (formData: TEditUserSchema) => {
    await UserService.update(data.id, formData as IUserResponse);
  }

  const onDelete = async () => {
    await UserService.delete(Number(data.id));
  }


  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='ФИО'
          inputProps={{
            id: 'create-user-first_name',
            ...register('first_name'),
            className: styles.input,
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
            className: styles.input,
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
            className: styles.input,
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
            buttonProps={{
              type: 'submit'
            }}
          />
          <Button
            text='Удалить'
            width={240}
            buttonProps={{
              type: 'button',
              onClick: onDelete
            }}
          />
        </div>
      </form>
      <img className={styles.image} src={people} alt="" />
    </div>
  );
};

export default EditUserWidjet;