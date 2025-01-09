import { z } from 'zod';
import styles from './editInstituteWidget.module.css'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import people from '../../../assets/people-fill-svgrepo-com 1.svg'
import Input from '../../../components/UI/Inputs/Input/Input';
import Button from '../../../components/UI/Button/Button';
import { IInstituteResponse, InstituteService } from '../../../services/instituteService';


const createUserSchema = z.object({
  name: z.string().min(1, "Это поле обязательно для заполнения"),
  rating: z.string().min(1, "Это поле обязательно для заполнения")

})

type TCreateUserSchema = z.infer<typeof createUserSchema>;

const EditInstituteWidget = (props: { data: IInstituteResponse; }) => {
  const { data } = props;
  const { register, handleSubmit } = useForm<TCreateUserSchema>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (formData: TCreateUserSchema) => {
    await InstituteService.update(data.id, formData as unknown as TCreateUserSchema);
  }

  const onDelete = async () => {
    await InstituteService.delete(data.id);
  }

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

export default EditInstituteWidget;