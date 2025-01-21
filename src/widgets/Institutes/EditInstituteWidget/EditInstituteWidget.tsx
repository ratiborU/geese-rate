import { z } from 'zod';
import styles from './editInstituteWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import Input from '../../../components/UI/Inputs/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateInstituteMutation } from '../../../hooks/institutes/useUpdateInstituteMutation';
import { useDeleteInstituteMutation } from '../../../hooks/institutes/useDeleteInstituteMutation';
import { IInstituteResponse } from '../../../services/instituteService';

const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  rating: z.string().min(1, "Это поле обязательно для заполнения")

})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const EditInstituteWidget = (props: { data: IInstituteResponse; }) => {
  const { data } = props;
  const notify = (text: string) => toast.success(text);
  const notifyError = (text: string) => toast.error(`Произошла ошибка! ${text}`);

  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (formData: TCreateUserSchema) => {
    await updateInstitute({ ...formData, id: data.id } as IInstituteResponse);
  }

  const onDelete = async () => {
    await deleteInstitute(data.id)
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

  const { isPending, updateInstitute } = useUpdateInstituteMutation({ onSuccess, onError })
  const { isPending: isPendingDelete, deleteInstitute } = useDeleteInstituteMutation({ onSuccess: onSuccessDelete, onError })

  return (
    <div className={styles.block}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Название инстиута'
          inputProps={{
            id: 'create-institute-name',
            ...register('name'),
            type: "text",
            placeholder: 'Введите название института...',
            defaultValue: data.name,
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Полное название инстиута'
          inputProps={{
            id: 'create-institute-fullname',
            type: "text",
            placeholder: 'Введите полное название института...',
            autoComplete: "new-password"
          }}
        />
        <Input
          label='Адрес инстиута'
          inputProps={{
            id: 'create-institute-address',
            type: "text",
            placeholder: 'Введите адрес института...',
            autoComplete: "new-password"
          }}
        />
        <input value={'0'} className={styles.inputNone} type="text" {...register('rating')} />
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

export default EditInstituteWidget;